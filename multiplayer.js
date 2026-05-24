var Multiplayer = (function () {
    'use strict';

    function handleError(fnName, err) {
        var msg = err && err.message ? err.message : String(err || '未知错误');
        console.error('[Multiplayer:' + fnName + '] 错误:', err);
        alert('联机操作失败: ' + msg);
    }

    var peer = null;
    var conn = null;
    var myRole = null;
    var isHostFlag = false;
    var isConnectedFlag = false;
    var roomId = null;

    var listeners = {};
    var msgQueue = [];
    var sentMessagesCache = [];
    var lastSentSeq = 0;
    var lastReceivedSeq = 0;
    var pendingSyncRequest = null;
    var gameStateSnapshot = null;
    var lastMissingRequestTime = 0;
    var MISSING_REQUEST_COOLDOWN = 3000;

    var heartbeatInterval = null;
    var heartbeatTimeout = null;
    var lastHeartbeatTime = 0;
    var HEARTBEAT_INTERVAL = 5000;
    var HEARTBEAT_TIMEOUT = 8000;

    var reconnectTimer = null;
    var reconnectAttempts = 0;
    var MAX_RECONNECT_ATTEMPTS = 5;
    var RECONNECT_DELAY = 3000;
    var targetRoomId = null;
    var isReconnecting = false;
    var localDisconnected = false;
    var peerAlsoLeft = false;

    function getIceServers() {
        return {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun.stunprotocol.org:3478' },
                {
                    urls: 'turn:openrelay.metered.ca:80',
                    username: 'openrelayproject',
                    credential: 'openrelayproject'
                },
                {
                    urls: 'turn:openrelay.metered.ca:443',
                    username: 'openrelayproject',
                    credential: 'openrelayproject'
                }
            ]
        };
    }

    function on(event, callback) {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(callback);
    }

    function emit(event, data) {
        if (listeners[event]) {
            listeners[event].forEach(function (cb) { cb(data); });
        }
    }

    function send(type, data) {
        if (!conn || conn.open !== true) {
            console.warn('[Multiplayer.send] ❌ 连接未开放，无法发送 type:', type);
            return false;
        }
        try {
            lastSentSeq++;
            var msg = { type: type, data: data, from: myRole, seq: lastSentSeq };
            if (type === 'game:action') {
                console.log('[Multiplayer.send] ✅ 发送游戏动作:', data.action, 'seq:', lastSentSeq);
            }
            conn.send(msg);
            if (type === 'game:action' || type === 'game:sync') {
                sentMessagesCache.push({ seq: lastSentSeq, type: type, data: data, timestamp: Date.now() });
                if (sentMessagesCache.length > 100) sentMessagesCache.shift();
            }
            return true;
        } catch (e) { 
            console.error('[Multiplayer.send] ❌ 发送异常:', e);
            return false; 
        }
    }

    function sendRaw(type, data) {
        var ok = send(type, data);
        if (!ok) msgQueue.push({ type: type, data: data });
        return ok;
    }

    function flushQueue() {
        while (msgQueue.length > 0 && isConnected()) {
            var item = msgQueue.shift();
            if (!send(item.type, item.data)) { msgQueue.unshift(item); break; }
        }
    }

    function requestMissingMessages(fromSeq) {
        var missing = sentMessagesCache.filter(function(m) { return m.seq > fromSeq; });
        console.log('[联机] 对方请求缺失消息，从序号', fromSeq, '开始，找到', missing.length, '条');
        if (missing.length === 0) {
            send('system:sync-complete', { count: 0, message: '无缺失消息' });
            return;
        }
        missing.forEach(function(msg) {
            try {
                var resendData = Object.assign({}, msg.data, { __resent: true });
                var resendMsg = { type: msg.type, data: resendData, from: myRole, seq: msg.seq };
                if (conn && conn.open) {
                    conn.send(resendMsg);
                }
            } catch(e) {
                console.error('[联机] 补发消息失败:', e);
            }
        });
        setTimeout(function() {
            send('system:sync-complete', { count: missing.length });
        }, 100);
    }

    function saveGameStateSnapshot(snapshot) {
        gameStateSnapshot = snapshot;
        console.log('[联机] 已保存游戏状态快照');
    }

    function getGameStateSnapshot() {
        return gameStateSnapshot;
    }

    function startHeartbeat() {
        stopHeartbeat();
        lastHeartbeatTime = Date.now();
        heartbeatInterval = setInterval(function () {
            if (isConnectedFlag && conn && conn.open) {
                send('system:heartbeat', { time: Date.now() });
                checkHeartbeatTimeout();
            }
        }, HEARTBEAT_INTERVAL);
    }

    function stopHeartbeat() {
        if (heartbeatInterval) {
            clearInterval(heartbeatInterval);
            heartbeatInterval = null;
        }
        if (heartbeatTimeout) {
            clearTimeout(heartbeatTimeout);
            heartbeatTimeout = null;
        }
    }

    function checkHeartbeatTimeout() {
        if (heartbeatTimeout) clearTimeout(heartbeatTimeout);
        var elapsed = Date.now() - lastHeartbeatTime;
        if (elapsed > HEARTBEAT_TIMEOUT * 3) {
            console.warn('[联机] 心跳严重超时 (' + Math.round(elapsed / 1000) + 's)，触发重连');
            emit('peer-timeout');
            if (!isReconnecting && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                attemptPeerReconnect();
            }
            return;
        }
        heartbeatTimeout = setTimeout(function () {
            if (isConnectedFlag && !isReconnecting) {
                var currentElapsed = Date.now() - lastHeartbeatTime;
                if (currentElapsed > HEARTBEAT_TIMEOUT) {
                    console.warn('[联机] 心跳超时 (' + Math.round(currentElapsed / 1000) + 's)，对方可能已掉线');
                    emit('peer-timeout');
                    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                        attemptPeerReconnect();
                    }
                }
            }
        }, HEARTBEAT_TIMEOUT);
    }

    function onPeerHeartbeat(time) {
        lastHeartbeatTime = Date.now();
    }

    function sendLeaveNotice() {
        send('system:leaving', { reason: 'page-close' });
    }

    function createRoom(customId) {
        try {
            return new Promise(function (resolve, reject) {
                if (peer) { try { peer.destroy(); } catch(e) {} peer = null; }
                isHostFlag = true; myRole = 'A';
                var peerId = customId || 'CG_' + generateRoomCode();
                targetRoomId = peerId;
                reconnectAttempts = 0;

                peer = new Peer(peerId, {
                    debug: 0,
                    config: getIceServers()
                });

                peer.on('open', function (id) {
                    try {
                        roomId = id;
                        emit('room-created', id);
                        resolve(id);

                        peer.on('connection', function (connection) {
                            if (conn && conn.open) { connection.close(); return; }
                            setupConnection(connection);
                        });
                    } catch (e) {
                        handleError('createRoom-open', e);
                        reject({ type: 'error', message: e.message || '创建房间失败' });
                    }
                });

                peer.on('error', function (err) {
                    console.error('[联机] Peer error:', err.type);
                    if (err.type === 'unavailable-id') reject({ type: 'room-taken', message: '房间号已被占用' });
                    else if (err.type === 'server-error' || err.type === 'network') reject({ type: 'network-error', message: '网络错误，请检查网络后重试' });
                    else if (err.type === 'peer-unavailable') reject({ type: 'room-not-found', message: '房间不存在' });
                    else reject({ type: err.type, message: err.message || '连接失败，请重试' });
                });

                peer.on('disconnected', function () {
                    emit('signal-lost');
                    attemptSignalReconnect();
                });
            });
        } catch (e) {
            handleError('createRoom', e);
            return Promise.reject({ type: 'error', message: e.message || '创建房间失败' });
        }
    }

    function joinRoom(targetId) {
        try {
            return new Promise(function (resolve, reject) {
                if (peer) { try { peer.destroy(); } catch(e) {} peer = null; }
                isHostFlag = false; myRole = 'B';
                roomId = targetId;
                targetRoomId = targetId;
                reconnectAttempts = 0;

                peer = new Peer({
                    debug: 0,
                    config: getIceServers()
                });

                peer.on('open', function () {
                    try {
                        var connection = peer.connect(targetId, { reliable: true });
                        setupConnection(connection, resolve, reject);

                        setTimeout(function () {
                            if (!isConnectedFlag) {
                                reject({ type: 'timeout', message: '连接超时（15秒），请确认房间号正确且对方在线' });
                                cleanup();
                            }
                        }, 15000);
                    } catch (e) {
                        handleError('joinRoom-open', e);
                        reject({ type: 'error', message: e.message || '加入房间失败' });
                    }
                });

                peer.on('error', function (err) {
                    console.error('[联机] Peer error:', err.type);
                    if (err.type === 'peer-unavailable') reject({ type: 'room-not-found', message: '房间不存在或房主已离线' });
                    else reject({ type: err.type, message: err.message || '连接失败' });
                });

                peer.on('disconnected', function () { emit('signal-lost'); attemptSignalReconnect(); });
            });
        } catch (e) {
            handleError('joinRoom', e);
            return Promise.reject({ type: 'error', message: e.message || '加入房间失败' });
        }
    }

    function setupConnection(connection, resolve, reject) {
        try {
            conn = connection;

            conn.on('open', function () {
                try {
                    isConnectedFlag = true;
                    localDisconnected = false;
                    peerAlsoLeft = false;
                    reconnectAttempts = 0;
                    isReconnecting = false;
                    emit('connected', { role: myRole, isHost: isHostFlag });
                    send('system:hello', { role: myRole, lastSeq: lastReceivedSeq });
                    startHeartbeat();
                    flushQueue();
                    if (resolve) resolve({ role: myRole });
                } catch (e) {
                    handleError('setupConnection-open', e);
                }
            });

            conn.on('data', function (msg) {
                try {
                    if (typeof msg === 'string') {
                        try { msg = JSON.parse(msg); } catch (e) { return; }
                    }
                    if (msg && msg.type) {
                        if (msg.type === 'game:action') {
                            console.log('[Multiplayer.data] 📥 收到游戏动作:', msg.data ? msg.data.action : '?', 'from:', msg.from, 'seq:', msg.seq);
                        }
                        handleIncoming(msg.type, msg.data, msg.from, msg.seq);
                    }
                } catch (e) {
                    handleError('setupConnection-data', e);
                }
            });

            conn.on('close', function () {
                isConnectedFlag = false;
                localDisconnected = true;
                stopHeartbeat();
                emit('disconnected');
                if (!isReconnecting && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    attemptPeerReconnect();
                }
            });

            conn.on('error', function (err) {
                emit('connection-error', err);
            });
        } catch (e) {
            handleError('setupConnection', e);
        }
    }

    function handleIncoming(type, data, from, seq) {
        try {
            if (seq && type === 'game:action') {
                if (seq <= lastReceivedSeq) {
                    console.log('[联机] 收到重复/旧消息，序号:', seq, '，当前:', lastReceivedSeq, '，忽略');
                    return;
                }
                lastReceivedSeq = Math.max(lastReceivedSeq, seq);
            }

            switch (type) {
                case 'system:hello':
                    emit('peer-joined', data);
                    break;
                case 'system:heartbeat': onPeerHeartbeat(data.time); break;
                case 'system:leaving': peerAlsoLeft = true; emit('peer-left', data); checkBothDisconnected(); break;
                case 'system:request-missing':
                    console.log('[联机] 收到缺失请求，准备补发');
                    requestMissingMessages(data.fromSeq); 
                    break;
                case 'system:sync-complete': 
                    console.log('[联机] 补发完成确认');
                    emit('sync-complete', data); 
                    break;
                case 'system:request-full-sync':
                    console.log('[联机] 收到完整状态同步请求');
                    emit('request-full-sync', { requesterRole: from });
                    break;
                case 'game:action':
                    console.log('[联机] ✅ 处理游戏动作:', data.action ? data.action : 'unknown', 'from:', from, 'seq:', seq);
                    emit('game:action', { action: data.action, payload: data.payload, from: from }); 
                    break;
                case 'game:sync': emit('game:sync', data); break;
                default: emit(type, data); break;
            }
        } catch (e) {
            handleError('handleIncoming', e);
        }
    }

    function checkBothDisconnected() {
        if (localDisconnected && (peerAlsoLeft || !isConnectedFlag)) {
            cancelReconnect();
            emit('both-disconnected', { reason: 'both-offline' });
        }
    }

    function sendGameAction(action, payload) { return sendRaw('game:action', { action: action, payload: payload }); }
    function sendSync(data) { return sendRaw('game:sync', data); }
    function sendChat(text) { return send('game:chat', { text: text }); }

    function generateRoomCode() {
        var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        var code = '';
        for (var i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
        return code;
    }

    function attemptSignalReconnect() {
        if (isReconnecting || !peer || reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
            if (reconnectAttempts >= MAX_RECONNECT_ATTEMPS) {
                emit('reconnect-failed', { reason: 'max-attempts-reached' });
            }
            return;
        }
        isReconnecting = true;
        reconnectAttempts++;
        console.log('[联机] 信号服务器断开，尝试重连 (' + reconnectAttempts + '/' + MAX_RECONNECT_ATTEMPTS + ')...');
        emit('reconnecting', { attempt: reconnectAttempts, max: MAX_RECONNECT_ATTEMPTS });

        try {
            peer.reconnect();
            var checkReconnect = setInterval(function () {
                if (peer && !peer.destroyed && peer.id) {
                    clearInterval(checkReconnect);
                    isReconnecting = false;
                    console.log('[联机] 信号服务器重连成功');
                    emit('signal-restored');
                    if (isHostFlag && !isConnectedFlag) {
                        console.log('[联机] 等待对方重新连接...');
                    } else if (!isHostFlag && targetRoomId && !isConnectedFlag) {
                        attemptPeerReconnect();
                    }
                }
            }, 1000);
            setTimeout(function () {
                clearInterval(checkReconnect);
                if (isReconnecting) {
                    isReconnecting = false;
                    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                        reconnectTimer = setTimeout(function () {
                            attemptSignalReconnect();
                        }, RECONNECT_DELAY);
                    } else {
                        emit('reconnect-failed', { reason: 'max-attempts-reached' });
                    }
                }
            }, 10000);
        } catch (e) {
            isReconnecting = false;
            console.error('[联机] 重连失败:', e);
        }
    }

    function attemptPeerReconnect() {
        if (isReconnecting || !targetRoomId || reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) return;
        isReconnecting = true;
        reconnectAttempts++;
        console.log('[联机] P2P连接断开，尝试重连 (' + reconnectAttempts + '/' + MAX_RECONNECT_ATTEMPTS + ')...');
        emit('reconnecting', { attempt: reconnectAttempts, max: MAX_RECONNECT_ATTEMPTS });

        try {
            stopHeartbeat();
            if (conn) { try { conn.close(); } catch(e) {} conn = null; }

            if (isHostFlag) {
                emit('waiting-for-peer');
                isReconnecting = false;
            } else if (peer && peer.open && !peer.destroyed) {
                var newConn = peer.connect(targetRoomId, { reliable: true });
                setupConnection(newConn);

                var reconnectTimeout = setTimeout(function () {
                    if (!isConnectedFlag && isReconnecting) {
                        isReconnecting = false;
                        conn = null;
                        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                            reconnectTimer = setTimeout(function () {
                                attemptPeerReconnect();
                            }, RECONNECT_DELAY);
                        } else {
                            if (peerAlsoLeft) {
                                emit('both-disconnected', { reason: 'both-offline' });
                            } else {
                                emit('reconnect-failed', { reason: 'max-attempts-reached' });
                            }
                        }
                    }
                }, 10000);
            } else {
                isReconnecting = false;
                attemptSignalReconnect();
            }
        } catch (e) {
            isReconnecting = false;
            console.error('[联机] P2P重连失败:', e);
        }
    }

    function cancelReconnect() {
        if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }
        isReconnecting = false;
        reconnectAttempts = 0;
    }

    function cleanup() {
        cancelReconnect();
        stopHeartbeat();
        if (conn) { try { conn.close(); } catch(e) {} conn = null; }
        if (peer) { try { peer.destroy(); } catch(e) {} peer = null; }
        isConnectedFlag = false; isHostFlag = false; myRole = null; roomId = null; msgQueue = [];
        sentMessagesCache = []; lastSentSeq = 0; lastReceivedSeq = 0;
        targetRoomId = null;
        localDisconnected = false;
        peerAlsoLeft = false;
        reconnectAttempts = 0;
        isReconnecting = false;
        gameStateSnapshot = null;
        pendingSyncRequest = null;
        lastMissingRequestTime = 0;
    }

    function getMyRole() { return myRole; }
    function isHost() { return isHostFlag; }
    function isGuest() { return !isHostFlag; }
    function isConnected() { return isConnectedFlag; }
    function getRoomId() { return roomId; }
    function amIPlayer(pid) { return myRole === pid; }

    return {
        on: on, emit: emit, createRoom: createRoom, joinRoom: joinRoom,
        send: send, sendGameAction: sendGameAction, sendSync: sendSync, sendChat: sendChat,
        cleanup: cleanup, getMyRole: getMyRole, isHost: isHost, isGuest: isGuest,
        isConnected: isConnected, getRoomId: getRoomId, amIPlayer: amIPlayer,
        sendLeaveNotice: sendLeaveNotice, attemptPeerReconnect: attemptPeerReconnect,
        saveGameStateSnapshot: saveGameStateSnapshot, getGameStateSnapshot: getGameStateSnapshot
    };
})();
