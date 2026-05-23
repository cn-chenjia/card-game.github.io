var Multiplayer = (function () {
    'use strict';

    var peer = null;
    var conn = null;
    var myRole = null;
    var isHostFlag = false;
    var isConnectedFlag = false;
    var roomId = null;

    var listeners = {};
    var msgQueue = [];

    var heartbeatInterval = null;
    var heartbeatTimeout = null;
    var lastHeartbeatTime = 0;
    var HEARTBEAT_INTERVAL = 5000;
    var HEARTBEAT_TIMEOUT = 8000;

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
        if (!conn || conn.open !== true) return false;
        try {
            conn.send({ type: type, data: data, from: myRole });
            return true;
        } catch (e) { return false; }
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
        if (elapsed > HEARTBEAT_TIMEOUT * 2) {
            emit('peer-timeout');
            return;
        }
        heartbeatTimeout = setTimeout(function () {
            if (isConnectedFlag) {
                console.warn('[联机] 心跳超时，对方可能已掉线');
                emit('peer-timeout');
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
        return new Promise(function (resolve, reject) {
            if (peer) { try { peer.destroy(); } catch(e) {} peer = null; }
            isHostFlag = true; myRole = 'A';
            var peerId = customId || 'CG_' + generateRoomCode();

            peer = new Peer(peerId, {
                debug: 0,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                        { urls: 'stun:stun2.l.google.com:19302' },
                        { urls: 'stun:stun.stunprotocol.org:3478' }
                    ]
                }
            });

            peer.on('open', function (id) {
                roomId = id;
                emit('room-created', id);
                resolve(id);

                peer.on('connection', function (connection) {
                    if (conn && conn.open) { connection.close(); return; }
                    setupConnection(connection);
                });
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
            });
        });
    }

    function joinRoom(targetId) {
        return new Promise(function (resolve, reject) {
            if (peer) { try { peer.destroy(); } catch(e) {} peer = null; }
            isHostFlag = false; myRole = 'B';
            roomId = targetId;

            peer = new Peer({
                debug: 0,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                        { urls: 'stun:stun2.l.google.com:19302' },
                        { urls: 'stun:stun.stunprotocol.org:3478' }
                    ]
                }
            });

            peer.on('open', function () {
                var connection = peer.connect(targetId, { reliable: true });
                setupConnection(connection, resolve, reject);

                setTimeout(function () {
                    if (!isConnectedFlag) {
                        reject({ type: 'timeout', message: '连接超时（15秒），请确认房间号正确且对方在线' });
                        cleanup();
                    }
                }, 15000);
            });

            peer.on('error', function (err) {
                console.error('[联机] Peer error:', err.type);
                if (err.type === 'peer-unavailable') reject({ type: 'room-not-found', message: '房间不存在或房主已离线' });
                else reject({ type: err.type, message: err.message || '连接失败' });
            });

            peer.on('disconnected', function () { emit('signal-lost'); });
        });
    }

    function setupConnection(connection, resolve, reject) {
        conn = connection;

        conn.on('open', function () {
            isConnectedFlag = true;
            emit('connected', { role: myRole, isHost: isHostFlag });
            send('system:hello', { role: myRole });
            startHeartbeat();
            flushQueue();
            if (resolve) resolve({ role: myRole });
        });

        conn.on('data', function (msg) {
            if (typeof msg === 'string') {
                try { msg = JSON.parse(msg); } catch (e) { return; }
            }
            if (msg && msg.type) handleIncoming(msg.type, msg.data, msg.from);
        });

        conn.on('close', function () {
            isConnectedFlag = false;
            stopHeartbeat();
            emit('disconnected');
        });

        conn.on('error', function (err) {
            emit('connection-error', err);
        });
    }

    function handleIncoming(type, data, from) {
        switch (type) {
            case 'system:hello': emit('peer-joined', data); break;
            case 'system:heartbeat': onPeerHeartbeat(data.time); break;
            case 'system:leaving': emit('peer-left', data); break;
            case 'game:action': emit('game:action', { action: data.action, payload: data.payload, from: from }); break;
            case 'game:sync': emit('game:sync', data); break;
            default: emit(type, data); break;
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

    function cleanup() {
        stopHeartbeat();
        if (conn) { try { conn.close(); } catch(e) {} conn = null; }
        if (peer) { try { peer.destroy(); } catch(e) {} peer = null; }
        isConnectedFlag = false; isHostFlag = false; myRole = null; roomId = null; msgQueue = [];
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
        sendLeaveNotice: sendLeaveNotice
    };
})();
