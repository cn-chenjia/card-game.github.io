(function () {
    'use strict';

    var CHARACTERS = [
        { id: 'guanyu', name: '关羽', emoji: '⚔️', hp: 5, maxHp: 5, atkBonus: 0.15, defBonus: 0, abilityDesc: '攻击加成15%' },
        { id: 'zhugeliang', name: '诸葛亮', emoji: '🪶', hp: 4, maxHp: 4, atkBonus: 0, defBonus: 0.20, abilityDesc: '防御加成20%' },
        { id: 'caocao', name: '曹操', emoji: '👑', hp: 5, maxHp: 5, atkBonus: 0.10, defBonus: 0.10, abilityDesc: '攻击+10% 防御+10%' },
        { id: 'daqiao', name: '大乔', emoji: '🌸', hp: 3, maxHp: 3, atkBonus: 0, defBonus: 0.25, abilityDesc: '防御加成25%' },
        { id: 'zhaoyun', name: '赵云', emoji: '🐉', hp: 4, maxHp: 4, atkBonus: 0.20, defBonus: 0, abilityDesc: '攻击加成20%' }
    ];

    var WEAPONS = [
        { id: 'dagger', name: '短刀', type: 'attack', rarity: 'common', price: 100, value: 10, icon: '🗡️' },
        { id: 'club', name: '木棒', type: 'attack', rarity: 'common', price: 100, value: 8, icon: '🏏' },
        { id: 'spear', name: '长枪', type: 'attack', rarity: 'elite', price: 200, value: 18, icon: '🔱' },
        { id: 'sword', name: '铁剑', type: 'attack', rarity: 'elite', price: 200, value: 16, icon: '⚔️' },
        { id: 'bow', name: '弓箭', type: 'attack', rarity: 'rare', price: 350, value: 28, icon: '🏹' },
        { id: 'axe', name: '战斧', type: 'attack', rarity: 'rare', price: 350, value: 25, icon: '🪓' },
        { id: 'cannon', name: '火炮', type: 'attack', rarity: 'epic', price: 500, value: 40, icon: '💥' },
        { id: 'halberd', name: '方天画戟', type: 'attack', rarity: 'epic', price: 500, value: 38, icon: '🔱' },
        { id: 'laser', name: '激光炮', type: 'attack', rarity: 'legend', price: 800, value: 60, icon: '⚡' },
        { id: 'dragonblade', name: '青龙偃月刀', type: 'attack', rarity: 'legend', price: 800, value: 55, icon: '🐉' },
        { id: 'leather', name: '皮甲', type: 'defend', rarity: 'common', price: 100, value: 8, icon: '🛡️' },
        { id: 'woodshield', name: '木盾', type: 'defend', rarity: 'common', price: 100, value: 10, icon: '🪵' },
        { id: 'armor', name: '铠甲', type: 'defend', rarity: 'elite', price: 200, value: 15, icon: '🛡️' },
        { id: 'chainmail', name: '锁子甲', type: 'defend', rarity: 'elite', price: 200, value: 18, icon: '⛓️' },
        { id: 'shield', name: '护盾', type: 'defend', rarity: 'rare', price: 350, value: 25, icon: '🔰' },
        { id: 'magicshield', name: '法盾', type: 'defend', rarity: 'rare', price: 350, value: 28, icon: '✨' },
        { id: 'tankarmor', name: '坦克装甲', type: 'defend', rarity: 'epic', price: 500, value: 38, icon: '🛡️' },
        { id: 'fortress', name: '城壁', type: 'defend', rarity: 'epic', price: 500, value: 35, icon: '🏰' },
        { id: 'barrier', name: '能量屏障', type: 'defend', rarity: 'legend', price: 800, value: 55, icon: '🔮' },
        { id: 'divine', name: '天罡护体', type: 'defend', rarity: 'legend', price: 800, value: 50, icon: '🌟' }
    ];

    var BLACK_MARKET_WEAPONS = [
        { id: 'bm_soulreaper', name: '噬魂镰刀', type: 'attack', rarity: 'legend', price: 1200, value: 70, icon: '💀' },
        { id: 'bm_thunder', name: '雷霆之怒', type: 'attack', rarity: 'legend', price: 1300, value: 75, icon: '⛈️' },
        { id: 'bm_dragon', name: '龙牙剑', type: 'attack', rarity: 'legend', price: 1100, value: 65, icon: '🐲' },
        { id: 'bm_void', name: '虚空之刃', type: 'attack', rarity: 'legend', price: 1400, value: 80, icon: '🌀' },
        { id: 'bm_inferno', name: '炼狱火弓', type: 'attack', rarity: 'legend', price: 1250, value: 72, icon: '🔥' },
        { id: 'bm_storm', name: '风暴战锤', type: 'attack', rarity: 'legend', price: 1150, value: 68, icon: '🔨' },
        { id: 'bm_shadow', name: '暗影匕首', type: 'attack', rarity: 'legend', price: 1050, value: 62, icon: '🌑' },
        { id: 'bm_phoenix', name: '凤凰羽扇', type: 'attack', rarity: 'legend', price: 1350, value: 78, icon: '🦅' },
        { id: 'bm_abyss', name: '深渊巨剑', type: 'attack', rarity: 'legend', price: 1500, value: 85, icon: '🗡️' },
        { id: 'bm_titan', name: '泰坦之拳', type: 'attack', rarity: 'legend', price: 1200, value: 70, icon: '✊' },
        { id: 'bm_doomaxe', name: '毁灭战斧', type: 'attack', rarity: 'legend', price: 1300, value: 76, icon: '🪓' },
        { id: 'bm_starbow', name: '星辰之弓', type: 'attack', rarity: 'legend', price: 1400, value: 82, icon: '🌟' },
        { id: 'bm_divinewall', name: '神圣壁垒', type: 'defend', rarity: 'legend', price: 1200, value: 70, icon: '🏛️' },
        { id: 'bm_dragonshield', name: '龙鳞护盾', type: 'defend', rarity: 'legend', price: 1300, value: 75, icon: '🐉' },
        { id: 'bm_cosmic', name: '宇宙护甲', type: 'defend', rarity: 'legend', price: 1400, value: 80, icon: '🌌' },
        { id: 'bm_eternal', name: '永恒之盾', type: 'defend', rarity: 'legend', price: 1100, value: 65, icon: '♾️' },
        { id: 'bm_icebarrier', name: '冰霜结界', type: 'defend', rarity: 'legend', price: 1250, value: 72, icon: '❄️' },
        { id: 'bm_holy', name: '圣光守护', type: 'defend', rarity: 'legend', price: 1350, value: 78, icon: '👼' },
        { id: 'bm_voidwall', name: '虚空壁垒', type: 'defend', rarity: 'legend', price: 1500, value: 85, icon: '🕳️' },
        { id: 'bm_nature', name: '自然之怒', type: 'defend', rarity: 'legend', price: 1150, value: 68, icon: '🌿' }
    ];

    var RARITY_NAMES = { common: '普通', elite: '精英', rare: '稀有', epic: '史诗', legend: '传说' };
    var MAX_ROUNDS = 10;
    var BASE_MAX_ATTACKS = 3;
    var cardUidCounter = 0;

    function newCardUid() { return 'card_' + (++cardUidCounter) + '_' + Date.now(); }

    var game = {
        mode: 'dual', phase: 'start', currentPlayer: 'A', round: 1,
        playerA: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 1000 },
        playerB: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 1000 },
        firstAttacker: null, secondAttacker: null,
        weaponDrawCount: 0, weaponDrawPlayer: 'A',
        selectedCardUid: null, soundEnabled: true, voiceEnabled: true,
        totalDamageA: 0, totalDamageB: 0, usedCharIds: [],
        currentDrawnCard: null,
        currentAttackIndex: 0,
        bonusAttacks: 0,
        phaseAttacker: null,
        phaseDefender: null,
        isCounterPhase: false,
        currentAttackCard: null,
        currentDefendCard: null,
        roundLog: [],
        allRoundLogs: [],
        tableCards: []
    };

    var audioCtx = null;

    function getAudioCtx() {
        if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
        return audioCtx;
    }

    function playSound(type) {
        if (!game.soundEnabled) return;
        try {
            var ctx = getAudioCtx(); if (!ctx) return;
            if (ctx.state === 'suspended') ctx.resume();
            var osc = ctx.createOscillator(), gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            switch (type) {
                case 'click': osc.frequency.value = 800; osc.type = 'sine'; gain.gain.value = 0.08; osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.05); break;
                case 'spin': osc.frequency.value = 400; osc.type = 'sawtooth'; gain.gain.value = 0.06; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.3); osc.stop(ctx.currentTime + 0.35); break;
                case 'result': osc.frequency.value = 523; osc.type = 'sine'; gain.gain.value = 0.1; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12); osc.frequency.setValueAtTime(784, ctx.currentTime + 0.24); osc.stop(ctx.currentTime + 0.4); break;
                case 'attack': osc.frequency.value = 200; osc.type = 'sawtooth'; gain.gain.value = 0.12; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.15); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25); osc.stop(ctx.currentTime + 0.25); break;
                case 'defend': osc.frequency.value = 600; osc.type = 'triangle'; gain.gain.value = 0.08; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.12); osc.stop(ctx.currentTime + 0.15); break;
                case 'damage': osc.frequency.value = 150; osc.type = 'square'; gain.gain.value = 0.1; osc.start(ctx.currentTime); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25); osc.stop(ctx.currentTime + 0.25); break;
                case 'dice': osc.frequency.value = 300; osc.type = 'triangle'; gain.gain.value = 0.08; osc.start(ctx.currentTime); for (var i = 0; i < 6; i++) osc.frequency.setValueAtTime(300 + Math.random() * 400, ctx.currentTime + i * 0.06); osc.stop(ctx.currentTime + 0.4); break;
                case 'win': osc.frequency.value = 523; osc.type = 'sine'; gain.gain.value = 0.1; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(659, ctx.currentTime + 0.15); osc.frequency.setValueAtTime(784, ctx.currentTime + 0.3); osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.45); osc.stop(ctx.currentTime + 0.7); break;
                case 'lose': osc.frequency.value = 400; osc.type = 'sine'; gain.gain.value = 0.08; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.4); osc.stop(ctx.currentTime + 0.5); break;
                case 'pk': osc.frequency.value = 300; osc.type = 'sawtooth'; gain.gain.value = 0.15; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.1); osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.3); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4); osc.stop(ctx.currentTime + 0.4); break;
                case 'rare': osc.frequency.value = 660; osc.type = 'sine'; gain.gain.value = 0.1; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.3); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); osc.stop(ctx.currentTime + 0.5); break;
                case 'epic': osc.frequency.value = 440; osc.type = 'sine'; gain.gain.value = 0.12; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1); osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2); osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.35); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6); osc.stop(ctx.currentTime + 0.6); break;
                case 'bonus': osc.frequency.value = 880; osc.type = 'triangle'; gain.gain.value = 0.1; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1); osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.2); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4); osc.stop(ctx.currentTime + 0.4); break;
                case 'coin': osc.frequency.value = 1200; osc.type = 'sine'; gain.gain.value = 0.08; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(1400, ctx.currentTime + 0.08); osc.frequency.setValueAtTime(1600, ctx.currentTime + 0.15); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25); osc.stop(ctx.currentTime + 0.25); break;
                default: osc.frequency.value = 440; osc.type = 'sine'; gain.gain.value = 0.05; osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.08);
            }
        } catch (e) { }
    }

    function speak(text) {
        if (!game.voiceEnabled) return;
        try {
            if (!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            var utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'zh-CN'; utter.rate = 1.1; utter.pitch = 1.0; utter.volume = 0.9;
            var voices = window.speechSynthesis.getVoices();
            var zhVoice = voices.find(function (v) { return v.lang.indexOf('zh') >= 0; });
            if (zhVoice) utter.voice = zhVoice;
            window.speechSynthesis.speak(utter);
        } catch (e) { }
    }

    function $(id) { return document.getElementById(id); }
    function showScreen(id) { document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); }); $(id).classList.add('active'); }
    function showSection(id) { document.querySelectorAll('.battle-section').forEach(function (s) { s.classList.add('hidden'); }); $(id).classList.remove('hidden'); var ca = $('center-actions'); if (ca) ca.innerHTML = ''; }
    function showModal(html) { $('modal-content').innerHTML = html; $('modal-overlay').classList.remove('hidden'); }
    function hideModal() { $('modal-overlay').classList.add('hidden'); }

    function showCardPreview(card) {
        var typeLabel = card.type === 'attack' ? '攻击' : '防御';
        var valueLabel = card.type === 'attack' ? '伤害' : '防御';
        var rarityName = RARITY_NAMES[card.rarity] || card.rarity;
        $('card-preview').innerHTML =
            '<div class="weapon-card rarity-' + card.rarity + '" style="transform:scale(2);margin:60px auto;">' +
            '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
            '<span class="card-icon">' + card.icon + '</span>' +
            '<span class="card-name">' + card.name + '</span>' +
            '<span class="card-value">' + valueLabel + ':' + card.value + '</span>' +
            '<span class="card-price">💰' + card.price + ' · ' + rarityName + '</span></div>';
        $('card-preview-overlay').classList.remove('hidden');
    }

    function createCardHTML(card, selectable) {
        var cls = 'weapon-card rarity-' + card.rarity;
        if (selectable) cls += ' selectable';
        var typeLabel = card.type === 'attack' ? '攻击' : '防御';
        var valueLabel = card.type === 'attack' ? '伤害' : '防御';
        return '<div class="' + cls + '" data-uid="' + card.uid + '">' +
            '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
            '<span class="card-icon">' + card.icon + '</span>' +
            '<span class="card-name">' + card.name + '</span>' +
            '<span class="card-value">' + valueLabel + ':' + card.value + '</span>' +
            '<span class="card-price">💰' + card.price + '</span></div>';
    }

    function createMiniCardHTML(card, isNew) {
        var extraCls = isNew ? ' library-new' : '';
        return '<div class="weapon-card mini rarity-' + card.rarity + extraCls + '" data-uid="' + card.uid + '" title="' + card.name + ' ' + (card.type === 'attack' ? '伤害' : '防御') + ':' + card.value + '">' +
            '<span class="card-icon">' + card.icon + '</span><span class="card-value">' + card.value + '</span></div>';
    }

    function getPlayer(pid) { return pid === 'A' ? game.playerA : game.playerB; }
    function findCardByUid(player, uid) { return player.library.find(function (c) { return c.uid === uid; }); }
    function playerLabel(pid) { return pid === 'A' ? '玩家A' : '玩家B'; }
    function pPrefix(pid) { return pid === 'A' ? 'a' : 'b'; }

    function opBtn(pid, btnId) { return $('btn-' + pPrefix(pid) + '-' + btnId); }

    function getWeaponWeight(wp) {
        var maxVal = 60;
        var rarityMultiplier = wp.rarity === 'rare' ? 0.4 : wp.rarity === 'epic' ? 0.25 : wp.rarity === 'legend' ? 0.15 : 1;
        return Math.max(1, Math.round((maxVal - wp.value + 5) * 1.5 * rarityMultiplier));
    }

    function weightedRandomWeapon() {
        var totalWeight = 0;
        var weights = WEAPONS.map(function (w) { var wt = getWeaponWeight(w); totalWeight += wt; return wt; });
        var rand = Math.random() * totalWeight;
        var cum = 0;
        for (var i = 0; i < WEAPONS.length; i++) {
            cum += weights[i];
            if (rand < cum) return WEAPONS[i];
        }
        return WEAPONS[0];
    }

    function randomWeapon() {
        var wp = weightedRandomWeapon();
        var drawn = Object.assign({}, wp); drawn.uid = newCardUid(); return drawn;
    }

    function hideAllOps() {
        ['a', 'b'].forEach(function (p) {
            ['spin-weapon', 'confirm-card', 'skip-defend', 'continue-attack', 'end-attack', 'continue', 'sell', 'buy'].forEach(function (b) {
                var el = $('btn-' + p + '-' + b);
                if (el) el.style.display = 'none';
            });
            var status = $('ops-' + p + '-status');
            if (status) status.textContent = '';
        });
    }

    function showOp(pid, btnId, opts) {
        opts = opts || {};
        var el = opBtn(pid, btnId);
        if (el) {
            el.style.display = 'block';
            el.disabled = !!opts.disabled;
            if (opts.text !== undefined) el.textContent = opts.text;
        }
    }

    function setOpsStatus(pid, text) {
        var el = $('ops-' + pPrefix(pid) + '-status');
        if (el) el.textContent = text;
    }

    function updateGoldDisplay() {
        var a = game.playerA, b = game.playerB;
        var elA = $('player-a-gold'), elB = $('player-b-gold');
        if (elA) elA.textContent = a.gold;
        if (elB) elB.textContent = b.gold;
    }

    function updatePlayerInfo() {
        var a = game.playerA, b = game.playerB;
        if (a.char) { $('player-a-avatar').textContent = a.char.emoji; $('player-a-char').textContent = a.char.name; $('player-a-hp-text').textContent = a.hp.toFixed(1) + '/' + a.maxHp; $('player-a-hp-bar').style.width = (a.hp / a.maxHp * 100) + '%'; $('player-a-ability').textContent = a.char.abilityDesc; }
        if (b.char) { $('player-b-avatar').textContent = b.char.emoji; $('player-b-char').textContent = b.char.name; $('player-b-hp-text').textContent = b.hp.toFixed(1) + '/' + b.maxHp; $('player-b-hp-bar').style.width = (b.hp / b.maxHp * 100) + '%'; $('player-b-ability').textContent = b.char.abilityDesc; }
        $('round-number').textContent = '第' + game.round + '轮';
        updateGoldDisplay();
        updateLibraryDisplay();
    }

    function updateLibraryDisplay(newCardUids) {
        newCardUids = newCardUids || [];
        updateSideLibrary('A', newCardUids); updateSideLibrary('B', newCardUids);
    }

    function updateSideLibrary(playerId, newCardUids) {
        var player = getPlayer(playerId);
        var prefix = 'player-' + playerId.toLowerCase();
        var atkC = $(prefix + '-attack-library'), defC = $(prefix + '-defend-library');
        if (!atkC || !defC) return;
        var atkCards = player.library.filter(function (c) { return c.type === 'attack'; });
        var defCards = player.library.filter(function (c) { return c.type === 'defend'; });
        atkC.innerHTML = ''; defC.innerHTML = '';
        atkCards.forEach(function (c) { atkC.innerHTML += createMiniCardHTML(c, newCardUids.indexOf(c.uid) >= 0); });
        defCards.forEach(function (c) { defC.innerHTML += createMiniCardHTML(c, newCardUids.indexOf(c.uid) >= 0); });
        [atkC, defC].forEach(function (container) {
            container.querySelectorAll('.weapon-card.mini').forEach(function (el) {
                el.addEventListener('click', function () { var card = findCardByUid(player, el.getAttribute('data-uid')); if (card) showCardPreview(card); });
            });
        });
    }

    function setActivePlayer(pid) {
        game.currentPlayer = pid;
        var panelA = $('panel-a'), panelB = $('panel-b');
        if (panelA) { panelA.classList.toggle('active-panel', pid === 'A'); panelA.classList.toggle('inactive-panel', pid !== 'A'); }
        if (panelB) { panelB.classList.toggle('active-panel', pid === 'B'); panelB.classList.toggle('inactive-panel', pid !== 'B'); }
        $('player-a-info').classList.toggle('active-turn', pid === 'A');
        $('player-b-info').classList.toggle('active-turn', pid === 'B');
    }

    function announcePlayerTurn(pid, action) { var p = getPlayer(pid); speak(playerLabel(pid) + '，' + (p.char ? p.char.name : '') + '，' + action); }
    function switchPlayer() { var next = game.currentPlayer === 'A' ? 'B' : 'A'; setActivePlayer(next); $('action-hint').textContent = '已切换至' + playerLabel(next) + '操作'; }
    function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function getMaxAttacks() { return BASE_MAX_ATTACKS + game.bonusAttacks; }

    function updateAttackProgress() {
        var el = $('attack-progress');
        var bar = $('attack-progress-bar');
        var text = $('attack-progress-text');
        if (!el || !bar || !text) return;

        var show = game.phase === 'attack-select' || game.phase === 'defend-select';
        if (show) {
            el.style.display = 'flex';
            var maxAtk = getMaxAttacks();
            var current = game.currentAttackIndex;
            var pct = maxAtk > 0 ? Math.min((current / maxAtk) * 100, 100) : 0;
            bar.style.width = pct + '%';
            text.textContent = current + '/' + maxAtk;
        } else {
            el.style.display = 'none';
        }
    }

    function addTableCard(card, playerPid) {
        game.tableCards.push({ card: card, playerPid: playerPid });
        renderTableCards();
    }

    function clearTableCards() {
        game.tableCards = [];
        renderTableCards();
    }

    function renderTableCards() {
        var el = $('table-cards-area');
        if (!el) return;
        if (game.tableCards.length === 0) {
            el.innerHTML = '<div class="table-cards-empty">牌桌</div>';
            return;
        }
        var html = '';
        game.tableCards.forEach(function (entry) {
            var c = entry.card;
            var typeLabel = c.type === 'attack' ? '攻击' : '防御';
            var valueLabel = c.type === 'attack' ? '伤害' : '防御';
            html += '<div class="table-card-item">' +
                '<div class="table-card-player">' + (entry.playerPid === 'A' ? 'A' : 'B') + '</div>' +
                '<div class="weapon-card rarity-' + c.rarity + ' table-card">' +
                '<span class="card-type ' + c.type + '">' + typeLabel + '</span>' +
                '<span class="card-icon">' + c.icon + '</span>' +
                '<span class="card-name">' + c.name + '</span>' +
                '<span class="card-value">' + valueLabel + ':' + c.value + '</span>' +
                '</div></div>';
        });
        el.innerHTML = html;
    }

    var wheelAngle = 0, wheelSpinning = false;

    function drawWheel(canvasId, items) {
        var canvas = $(canvasId); if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2, r = Math.min(cx, cy) - 10;
        var n = items.length; if (n === 0) return; var arc = (2 * Math.PI) / n;
        ctx.clearRect(0, 0, w, h); ctx.save(); ctx.translate(cx, cy); ctx.rotate(wheelAngle);
        var colors = ['#c0392b', '#2980b9', '#27ae60', '#8e44ad', '#d35400', '#16a085', '#2c3e50', '#f39c12', '#1abc9c', '#e74c3c', '#3498db', '#9b59b6', '#1abc9c', '#e67e22', '#2ecc71'];
        for (var i = 0; i < n; i++) {
            var sa = i * arc - Math.PI / 2, ea = sa + arc;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, sa, ea); ctx.closePath();
            ctx.fillStyle = colors[i % colors.length]; ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2; ctx.stroke();
            ctx.save(); ctx.rotate(sa + arc / 2);
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff';
            ctx.font = 'bold 13px "Noto Sans SC", sans-serif'; ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 3;
            var label = items[i].name || items[i]; if (label.length > 4) label = label.substring(0, 4);
            ctx.fillText(label, r * 0.58, 0); ctx.restore();
        }
        ctx.beginPath(); ctx.arc(0, 0, 22, 0, 2 * Math.PI); ctx.fillStyle = '#d4a843'; ctx.fill();
        ctx.strokeStyle = '#8b6914'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#1a1a2e'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowBlur = 0;
        ctx.fillText('GO', 0, 0); ctx.restore();
    }

    function spinWheel(canvasId, items, targetIndex, callback) {
        if (wheelSpinning) return; wheelSpinning = true; playSound('spin');
        var n = items.length;
        var arc = (2 * Math.PI) / n;
        var targetAngle = (2 * Math.PI) - (targetIndex * arc + arc / 2);
        var fullRotations = Math.PI * 2 * randomInt(5, 10);
        var totalRot = fullRotations + targetAngle - (wheelAngle % (Math.PI * 2));
        if (totalRot < fullRotations) totalRot += Math.PI * 2;
        var dur = 3000, st = null, sa = wheelAngle;
        function anim(ts) {
            if (!st) st = ts; var el = ts - st; var pr = Math.min(el / dur, 1);
            var eased = 1 - Math.pow(1 - pr, 3); wheelAngle = sa + totalRot * eased; drawWheel(canvasId, items);
            if (pr < 1) { requestAnimationFrame(anim); }
            else { wheelSpinning = false; playSound('result'); callback(items[targetIndex], targetIndex); }
        }
        requestAnimationFrame(anim);
    }

    function initStartScreen() {
        $('btn-dual').addEventListener('click', function () { playSound('click'); game.mode = 'dual'; startCharacterSelect(); });
        $('btn-sound').addEventListener('click', function () { game.soundEnabled = !game.soundEnabled; game.voiceEnabled = game.soundEnabled; $('btn-sound').textContent = game.soundEnabled ? '🔊 音效：开' : '🔇 音效：关'; if (game.soundEnabled) playSound('click'); });
    }

    function startCharacterSelect() {
        game.phase = 'character-select'; game.currentPlayer = 'A'; game.usedCharIds = [];
        showScreen('screen-character'); $('char-result').classList.add('hidden'); $('btn-spin-char').disabled = false;
        $('char-select-title').textContent = '角色抽取'; $('char-select-hint').textContent = '请玩家A点击转盘抽取角色';
        $('btn-switch-player').style.display = 'none';
        var ci = CHARACTERS.map(function (c) { return { name: c.name, id: c.id }; });
        wheelAngle = 0; drawWheel('character-wheel', ci); speak('请玩家A点击转盘抽取角色');
    }

    function initCharacterSelect() {
        $('btn-spin-char').addEventListener('click', function () {
            if (wheelSpinning) return; $('btn-spin-char').disabled = true;
            var ac = CHARACTERS.filter(function (c) { return game.usedCharIds.indexOf(c.id) === -1; });
            var ci = ac.map(function (c) { return { name: c.name, id: c.id }; });
            var targetIdx = randomInt(0, ac.length - 1);
            spinWheel('character-wheel', ci, targetIdx, function (sel) {
                var ch = CHARACTERS.find(function (c) { return c.id === sel.id; });
                var p = game.currentPlayer === 'A' ? game.playerA : game.playerB;
                p.char = ch; p.hp = ch.hp; p.maxHp = ch.maxHp; game.usedCharIds.push(ch.id);
                $('char-info-display').innerHTML = '<div class="char-emoji">' + ch.emoji + '</div><div class="char-name">' + ch.name + '</div><div class="char-stat">血量：' + ch.hp + '点（' + (ch.hp * 10) + '伤害值）</div><div class="char-ability">特殊能力：' + ch.abilityDesc + '</div>';
                $('char-result').classList.remove('hidden');
                $('char-select-hint').textContent = playerLabel(game.currentPlayer) + '抽取到了 ' + ch.name + '！';
                speak(playerLabel(game.currentPlayer) + '抽到了' + ch.name);
            });
        });
        $('btn-char-confirm').addEventListener('click', function () {
            playSound('click');
            if (game.currentPlayer === 'A') {
                game.currentPlayer = 'B'; $('char-result').classList.add('hidden'); $('btn-spin-char').disabled = false;
                $('char-select-hint').textContent = '请玩家B点击转盘抽取角色';
                var ac = CHARACTERS.filter(function (c) { return game.usedCharIds.indexOf(c.id) === -1; });
                var ci = ac.map(function (c) { return { name: c.name, id: c.id }; });
                wheelAngle = 0; drawWheel('character-wheel', ci); speak('请玩家B点击转盘抽取角色');
            } else { showVSAnimation(); }
        });
    }

    function showVSAnimation() {
        var a = game.playerA, b = game.playerB;
        $('vs-container').innerHTML =
            '<div class="vs-fighter vs-left">' +
            '<div class="vs-emoji">' + a.char.emoji + '</div>' +
            '<div class="vs-name">' + a.char.name + '</div>' +
            '<div class="vs-player">玩家A</div>' +
            '<div class="vs-hp">血量 ' + a.char.hp + ' · ' + a.char.abilityDesc + '</div>' +
            '</div>' +
            '<div class="vs-text">VS</div>' +
            '<div class="vs-fighter vs-right">' +
            '<div class="vs-emoji">' + b.char.emoji + '</div>' +
            '<div class="vs-name">' + b.char.name + '</div>' +
            '<div class="vs-player">玩家B</div>' +
            '<div class="vs-hp">血量 ' + b.char.hp + ' · ' + b.char.abilityDesc + '</div>' +
            '</div>';
        showScreen('screen-vs');
        playSound('pk');
        speak(a.char.name + ' 对阵 ' + b.char.name);
        setTimeout(function () { startBattle(); }, 3000);
    }

    function startBattle() {
        game.phase = 'battle'; game.round = 1;
        game.playerA.library = []; game.playerB.library = [];
        game.playerA.gold = 1000; game.playerB.gold = 1000;
        var atkWeapons = WEAPONS.filter(function (w) { return w.type === 'attack'; });
        var defWeapons = WEAPONS.filter(function (w) { return w.type === 'defend'; });
        ['A', 'B'].forEach(function (pid) {
            var player = getPlayer(pid);
            for (var i = 0; i < 3; i++) {
                var aw = atkWeapons[Math.floor(Math.random() * atkWeapons.length)];
                var ac = Object.assign({}, aw); ac.uid = newCardUid();
                player.library.push(ac);
            }
            for (var j = 0; j < 3; j++) {
                var dw = defWeapons[Math.floor(Math.random() * defWeapons.length)];
                var dc = Object.assign({}, dw); dc.uid = newCardUid();
                player.library.push(dc);
            }
        });
        game.totalDamageA = 0; game.totalDamageB = 0;
        game.allRoundLogs = [];
        clearTableCards();
        showScreen('screen-battle'); updatePlayerInfo();
        $('btn-switch-player').style.display = 'none';
        speak('对战开始'); startWeaponDrawPhase();
    }

    function startWeaponDrawPhase() {
        game.phase = 'weapon-draw'; game.weaponDrawPlayer = 'A'; game.weaponDrawCount = 0;
        game.playerA.roundCards = []; game.playerB.roundCards = []; game.selectedCardUid = null;
        clearBattleLog();
        clearTableCards();
        setActivePlayer('A'); showSection('weapon-draw-area');
        updateAttackProgress();
        hideAllOps();
        showOp('A', 'spin-weapon');
        showOp('A', 'sell');
        showOp('A', 'buy');
        setOpsStatus('A', '请抽取武器');
        $('action-hint').textContent = '第' + game.round + '轮 - 武器抽取阶段';
        updateWeaponDrawHint(); wheelAngle = 0; drawWeaponWheel();
        $('drawn-cards').innerHTML = '';
        announcePlayerTurn('A', '请抽取武器');
    }

    function updateWeaponDrawHint() {
        var pn = playerLabel(game.weaponDrawPlayer), cn = getPlayer(game.weaponDrawPlayer).char.name;
        $('weapon-draw-hint').textContent = pn + '（' + cn + '）还有' + (5 - game.weaponDrawCount) + '次抽取机会';
    }

    function drawWeaponWheel() { drawWheel('weapon-wheel', WEAPONS.map(function (w) { return { name: w.name, id: w.id }; })); }

    function handleSpinWeapon() {
        if (wheelSpinning) return;
        var btn = opBtn(game.weaponDrawPlayer, 'spin-weapon');
        if (btn) btn.disabled = true;
        var wi = WEAPONS.map(function (w) { return { name: w.name, id: w.id }; });
        var selectedWp = weightedRandomWeapon();
        var targetIdx = WEAPONS.findIndex(function (w) { return w.id === selectedWp.id; });
        spinWheel('weapon-wheel', wi, targetIdx, function (sel) {
            var wp = selectedWp;
            var drawn = Object.assign({}, wp); drawn.uid = newCardUid();
            var player = getPlayer(game.weaponDrawPlayer);
            player.roundCards.push(drawn); player.library.push(drawn); game.weaponDrawCount++;
            var isRare = drawn.rarity === 'rare' || drawn.rarity === 'epic' || drawn.rarity === 'legend';
            var cardCls = 'weapon-card rarity-' + drawn.rarity;
            if (isRare) cardCls += ' rarity-highlight';
            var typeLabel = drawn.type === 'attack' ? '攻击' : '防御';
            var valueLabel = drawn.type === 'attack' ? '伤害' : '防御';
            var highlightTag = '';
            if (drawn.rarity === 'rare') { highlightTag = '<div class="rarity-tag rare-tag">✨ 稀有装备 ✨</div>'; playSound('rare'); speak('恭喜获得稀有装备' + drawn.name); }
            else if (drawn.rarity === 'epic') { highlightTag = '<div class="rarity-tag epic-tag">💥 史诗装备 💥</div>'; playSound('epic'); speak('恭喜获得史诗装备' + drawn.name); }
            else if (drawn.rarity === 'legend') { highlightTag = '<div class="rarity-tag legend-tag">👑 传说装备 👑</div>'; playSound('epic'); speak('恭喜获得传说装备' + drawn.name); }
            else { speak('获得' + drawn.name); }
            $('drawn-cards').innerHTML = highlightTag + '<div class="' + cardCls + '" data-uid="' + drawn.uid + '">' +
                '<span class="card-type ' + drawn.type + '">' + typeLabel + '</span>' +
                '<span class="card-icon">' + drawn.icon + '</span>' +
                '<span class="card-name">' + drawn.name + '</span>' +
                '<span class="card-value">' + valueLabel + ':' + drawn.value + '</span>' +
                '<span class="card-price">💰' + drawn.price + '</span></div>';
            var cardEl = $('drawn-cards').querySelector('.weapon-card');
            if (cardEl) cardEl.addEventListener('click', function () { showCardPreview(drawn); });
            updateLibraryDisplay([drawn.uid]);
            var delay = isRare ? 2500 : 1200;
            setTimeout(function () { $('drawn-cards').innerHTML = ''; afterWeaponDrawAction(); }, delay);
        });
    }

    function afterWeaponDrawAction() {
        if (game.weaponDrawCount < 5) {
            updateWeaponDrawHint();
            var btn = opBtn(game.weaponDrawPlayer, 'spin-weapon');
            if (btn) { btn.style.display = 'block'; btn.disabled = false; }
            drawWeaponWheel();
        } else if (game.weaponDrawPlayer === 'A') {
            game.weaponDrawPlayer = 'B'; game.weaponDrawCount = 0;
            setActivePlayer('B'); updateWeaponDrawHint();
            hideAllOps();
            showOp('B', 'spin-weapon');
            showOp('B', 'sell');
            showOp('B', 'buy');
            setOpsStatus('B', '请抽取武器');
            wheelAngle = 0; drawWeaponWheel(); $('drawn-cards').innerHTML = '';
            announcePlayerTurn('B', '请抽取武器');
        } else { finishWeaponDraw(); }
    }

    function finishWeaponDraw() {
        hideAllOps();
        updatePlayerInfo();
        var al = game.playerA.roundCards.map(function (c) { return c.name; }).join('、');
        var bl = game.playerB.roundCards.map(function (c) { return c.name; }).join('、');
        showModal('<h3>武器抽取完成</h3><p>玩家A获得 ' + game.playerA.roundCards.length + ' 张：' + (al || '无') + '</p><p>玩家B获得 ' + game.playerB.roundCards.length + ' 张：' + (bl || '无') + '</p><button class="btn btn-primary modal-btn" id="btn-td">投掷骰子</button>');
        $('btn-td').addEventListener('click', function () { hideModal(); startDicePhase(); });
    }

    function startDicePhase() {
        game.phase = 'dice'; showSection('dice-area');
        hideAllOps();
        $('action-hint').textContent = '投掷骰子决定攻击顺序';
        $('dice-hint').textContent = '';
        $('dice-face').textContent = '?'; $('dice-result').classList.add('hidden');
        $('btn-roll-dice').style.display = 'block';
        $('btn-roll-dice').disabled = true; $('dice').classList.remove('rolling');
        setTimeout(function () {
            $('dice').classList.add('rolling'); playSound('dice');
            var result = randomInt(1, 6), cnt = 0;
            var iv = setInterval(function () {
                $('dice-face').textContent = randomInt(1, 6); cnt++;
                if (cnt >= 12) {
                    clearInterval(iv); $('dice-face').textContent = result; $('dice').classList.remove('rolling');
                    $('btn-roll-dice').style.display = 'none'; // 1. 骰子点数出来后立即隐藏按钮
                    var isOdd = result % 2 === 1;
                    game.firstAttacker = isOdd ? 'A' : 'B'; game.secondAttacker = isOdd ? 'B' : 'A';
                    $('dice-result').classList.remove('hidden');
                    var fl = playerLabel(game.firstAttacker), fn = getPlayer(game.firstAttacker).char.name;
                    $('dice-result').innerHTML = '点数：<strong style="font-size:24px;">' + result + '</strong>（' + (isOdd ? '单数' : '双数') + '）<br><span style="color:var(--gold-light);font-size:18px;">' + fl + '（' + fn + '）先攻！</span>';
                    playSound('result'); speak('点数' + result + '，' + fl + fn + '先攻');
                    // 2. 骰子点数出来后停个2秒，然后桌面移除骰子和文描
                    setTimeout(function () {
                        $('dice-area').innerHTML = ''; // 清空骰子区域
                        setTimeout(function () { startAttackPhase(false); }, 200); // 再等待一下再进入下阶段
                    }, 2000); // 2秒
                }
            }, 80);
        }, 800);
    }

    function startAttackPhase(isCounter) {
        game.phase = 'attack-select';
        game.isCounterPhase = !!isCounter;
        game.phaseAttacker = isCounter ? game.secondAttacker : game.firstAttacker;
        game.phaseDefender = isCounter ? game.firstAttacker : game.secondAttacker;
        game.currentAttackIndex = 0;
        game.bonusAttacks = 0;
        game.selectedCardUid = null;
        game.currentAttackCard = null;
        game.currentDefendCard = null;

        updateAttackProgress();
        clearTableCards();

        var atkChar = getPlayer(game.phaseAttacker).char;
        var atkCards = getPlayer(game.phaseAttacker).library.filter(function (c) { return c.type === 'attack'; });

        if (atkCards.length === 0) {
            setActivePlayer(game.phaseAttacker); showSection('damage-area');
            hideAllOps();
            $('damage-display').innerHTML = '<div class="damage-number" style="color:var(--text-dim);">0</div><div class="damage-result">' + playerLabel(game.phaseAttacker) + '（' + atkChar.name + '）没有攻击卡牌，无法攻击</div>';
            speak(atkChar.name + '没有攻击卡牌');
            if (isCounter) {
                $('center-actions').innerHTML = '<button class="btn btn-primary" id="btn-center-nr">进入下一轮 →</button>';
                $('btn-center-nr').addEventListener('click', function () { playSound('click'); $('center-actions').innerHTML = ''; nextRound(); });
            } else {
                $('center-actions').innerHTML = '<button class="btn btn-primary" id="btn-center-counter">后攻方反击 →</button>';
                $('btn-center-counter').addEventListener('click', function () { playSound('click'); $('center-actions').innerHTML = ''; startAttackPhase(true); });
            }
            return;
        }

        showAttackCardSelect();
    }

    function showAttackCardSelect() {
        var atkChar = getPlayer(game.phaseAttacker).char;
        var atkCards = getPlayer(game.phaseAttacker).library.filter(function (c) { return c.type === 'attack'; });

        if (atkCards.length === 0) {
            afterAttackPhaseEnds(); return;
        }

        game.phase = 'attack-select'; game.selectedCardUid = null;
        setActivePlayer(game.phaseAttacker);
        updateAttackProgress();
        hideAllOps();

        var phaseLabel = game.isCounterPhase ? '反击' : '攻击';
        var attackNum = game.currentAttackIndex + 1;
        var maxAtk = getMaxAttacks();
        $('action-hint').textContent = phaseLabel + '阶段（已攻击 ' + game.currentAttackIndex + '/' + maxAtk + ' 次）';
        showOp(game.phaseAttacker, 'confirm-card', { disabled: true });
        showOp(game.phaseAttacker, 'sell');
        showOp(game.phaseAttacker, 'buy');
        setOpsStatus(game.phaseAttacker, phaseLabel + '阶段');
        renderCardHand(game.phaseAttacker, 'attack');
        announcePlayerTurn(game.phaseAttacker, '请选择第' + attackNum + '次攻击卡牌');
    }

    function showDefendCardSelect() {
        var defChar = getPlayer(game.phaseDefender).char;
        var defCards = getPlayer(game.phaseDefender).library.filter(function (c) { return c.type === 'defend'; });

        if (defCards.length === 0) {
            game.currentDefendCard = null;
            resolveSingleAttack();
            return;
        }

        game.phase = 'defend-select'; game.selectedCardUid = null;
        setActivePlayer(game.phaseDefender);
        updateAttackProgress();
        hideAllOps();

        var maxAtk = getMaxAttacks();
        $('action-hint').textContent = '防御阶段（攻击 ' + game.currentAttackIndex + '/' + maxAtk + ' 次）';
        showOp(game.phaseDefender, 'confirm-card', { disabled: true });
        showOp(game.phaseDefender, 'skip-defend');
        setOpsStatus(game.phaseDefender, '防御阶段');
        renderCardHand(game.phaseDefender, 'defend');
        announcePlayerTurn(game.phaseDefender, '请选择防御卡牌');
    }

    function renderCardHand(playerId, cardType) {
        var player = getPlayer(playerId);
        var prefix = 'player-' + playerId.toLowerCase();
        var selectArea = $(prefix + '-select-area');
        var selectCards = $(prefix + '-select-cards');
        var selectTitle = $(prefix + '-select-title');

        ['a', 'b'].forEach(function (p) {
            var sa = $('player-' + p + '-select-area');
            if (sa) sa.classList.add('hidden');
        });

        var cards = player.library.filter(function (c) { return c.type === cardType; });

        if (cards.length === 0) {
            if (selectArea) selectArea.classList.remove('hidden');
            if (selectTitle) selectTitle.textContent = '没有可用的' + (cardType === 'attack' ? '攻击' : '防御') + '卡牌';
            if (selectCards) selectCards.innerHTML = '';
            if (cardType === 'defend') {
                showOp(playerId, 'skip-defend');
            }
            var confirmBtn = opBtn(playerId, 'confirm-card');
            if (confirmBtn) confirmBtn.disabled = true;
            game.selectedCardUid = null; return;
        }

        if (selectArea) selectArea.classList.remove('hidden');
        if (selectTitle) selectTitle.textContent = (cardType === 'attack' ? '⚔️ 选择攻击卡牌' : '🛡️ 选择防御卡牌');
        if (selectCards) {
            selectCards.innerHTML = '';
            cards.forEach(function (card) { selectCards.innerHTML += createCardHTML(card, true); });
            selectCards.querySelectorAll('.weapon-card.selectable').forEach(function (el) {
                el.addEventListener('click', function () {
                    playSound('click');
                    selectCards.querySelectorAll('.weapon-card').forEach(function (c) { c.classList.remove('selected'); });
                    el.classList.add('selected'); game.selectedCardUid = el.getAttribute('data-uid');
                    var confirmBtn = opBtn(playerId, 'confirm-card');
                    if (confirmBtn) confirmBtn.disabled = false;
                });
            });
            var firstCard = selectCards.querySelector('.weapon-card.selectable');
            if (firstCard) {
                firstCard.classList.add('selected');
                game.selectedCardUid = firstCard.getAttribute('data-uid');
                var confirmBtn = opBtn(playerId, 'confirm-card');
                if (confirmBtn) confirmBtn.disabled = false;
            }
        }
    }

    function getSelectedCard(playerId) { return findCardByUid(getPlayer(playerId), game.selectedCardUid); }
    function removeFromLibrary(playerId, card) {
        if (!card) return; var p = getPlayer(playerId);
        var idx = p.library.findIndex(function (c) { return c.uid === card.uid; });
        if (idx >= 0) p.library.splice(idx, 1);
    }

    function hideSelectAreas() {
        ['a', 'b'].forEach(function (p) {
            var sa = $('player-' + p + '-select-area');
            if (sa) sa.classList.add('hidden');
        });
    }

    function addBattleLogEntry(atkCard, atkWithBonus, defCard, defWithBonus, finalDamage, attackerPid, defenderPid) {
        game.roundLog.push({
            atkCard: atkCard, atkWithBonus: atkWithBonus,
            defCard: defCard, defWithBonus: defWithBonus,
            finalDamage: finalDamage,
            attackerPid: attackerPid, defenderPid: defenderPid,
            isCounter: game.isCounterPhase
        });
        renderBattleLog();
    }

    function renderBattleLog() {
        var logEl = $('battle-log');
        var listEl = $('battle-log-list');
        if (!logEl || !listEl) return;

        if (game.roundLog.length === 0) {
            logEl.classList.add('hidden');
            return;
        }
        logEl.classList.remove('hidden');

        var html = '';
        var currentGroup = '';
        game.roundLog.forEach(function (entry) {
            var phaseLabel = entry.isCounter ? '反击' : '攻击';
            var groupLabel = playerLabel(entry.attackerPid) + '（' + getPlayer(entry.attackerPid).char.name + '）' + phaseLabel;
            var firstInGroup = currentGroup !== groupLabel;
            if (firstInGroup) {
                if (currentGroup) html += '</div>';
                html += '<div class="battle-log-round"><div class="battle-log-round-title">' + groupLabel + '</div>';
                currentGroup = groupLabel;
            }
            var atkHtml = '<span class="battle-log-atk">' + entry.atkCard.icon + entry.atkCard.name + '(' + entry.atkWithBonus + ')</span>';
            var defHtml = entry.defCard
                ? '<span class="battle-log-def">' + entry.defCard.icon + entry.defCard.name + '(' + entry.defWithBonus + ')</span>'
                : '<span class="battle-log-def" style="color:var(--text-dim)">无防御</span>';
            var dmgCls = entry.finalDamage > 0 ? '' : ' zero';
            html += '<div class="battle-log-pair">' +
                atkHtml + '<span class="battle-log-vs">vs</span>' + defHtml +
                '<span class="battle-log-dmg' + dmgCls + '">伤害' + entry.finalDamage + '</span></div>';
        });
        if (currentGroup) html += '</div>';
        listEl.innerHTML = html;
        listEl.scrollTop = listEl.scrollHeight;
    }

    function clearBattleLog() {
        game.roundLog = [];
        var logEl = $('battle-log');
        if (logEl) logEl.classList.add('hidden');
    }

    var CARD_VOICE = {
        dagger: '掏出小短刀，捅你一下！疼不疼？',
        club: '大棒子来啦！敲你脑壳！咚咚咚！',
        spear: '长枪一挺，谁敢挡我！突突突！',
        sword: '铁剑出鞘，亮瞎你的眼！',
        bow: '弓箭上弦，嗖嗖嗖！跑不掉的！',
        axe: '战斧劈下来啦！快跑啊！',
        cannon: '火炮轰鸣！砰砰砰！灰飞烟灭！',
        halberd: '方天画戟，吕布同款！怕不怕！',
        laser: '激光炮发射！哔哔哔！未来战士驾到！',
        dragonblade: '青龙偃月刀！关二爷附体！一刀999！',
        leather: '穿上皮甲，刀枪不入！嗯...大概吧',
        woodshield: '木盾举起！别打脸！',
        armor: '铠甲加身！我就是铁桶！',
        chainmail: '锁子甲套上！叮叮当当！',
        shield: '护盾展开！你打不动我！',
        magicshield: '法盾加持！魔法护体！闪闪发光！',
        tankarmor: '坦克装甲！我就是移动堡垒！',
        fortress: '城壁矗立！来攻城啊！',
        barrier: '能量屏障！高科技防御！',
        divine: '天罡护体！神仙保佑！刀枪不入！'
    };

    function getCardVoice(card) {
        return CARD_VOICE[card.id] || (card.type === 'attack' ? '攻击！' : '防御！');
    }

    function showCardPlayAnimation(card, playerPid, callback) {
        var overlay = document.createElement('div');
        overlay.className = 'card-play-overlay';
        var typeLabel = card.type === 'attack' ? '攻击' : '防御';
        var valueLabel = card.type === 'attack' ? '伤害' : '防御';
        var rarityName = RARITY_NAMES[card.rarity] || '';
        var rarityCls = 'rarity-' + card.rarity;

        overlay.innerHTML =
            '<div class="card-play-scene">' +
            '<div class="card-play-player">' + playerLabel(playerPid) + '</div>' +
            '<div class="card-play-card weapon-card ' + rarityCls + '">' +
            '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
            '<span class="card-icon">' + card.icon + '</span>' +
            '<span class="card-name">' + card.name + '</span>' +
            '<span class="card-value">' + valueLabel + ':' + card.value + '</span>' +
            '<span class="card-price">' + rarityName + '</span>' +
            '</div>' +
            '<div class="card-play-desc">' + getCardVoice(card) + '</div>' +
            '</div>';

        document.body.appendChild(overlay);

        if (card.rarity === 'legend') playSound('epic');
        else if (card.rarity === 'epic') playSound('rare');
        else if (card.rarity === 'rare') playSound('rare');
        else playSound(card.type === 'attack' ? 'attack' : 'defend');

        setTimeout(function () { speak(getCardVoice(card)); }, 500);

        var duration = (card.rarity === 'legend' || card.rarity === 'epic') ? 4500 : 3800;
        setTimeout(function () {
            overlay.classList.add('card-play-fadeout');
            setTimeout(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                if (callback) callback();
            }, 400);
        }, duration);
    }

    function handleConfirmCard() {
        var pid = game.phase === 'attack-select' ? game.phaseAttacker : game.phaseDefender;
        var card = getSelectedCard(pid);
        if (!card) return; playSound('click');
        hideSelectAreas();

        if (game.phase === 'attack-select') {
            game.currentAttackCard = card;
            removeFromLibrary(game.phaseAttacker, card);
            updatePlayerInfo();
            addTableCard(card, game.phaseAttacker);
            showCardPlayAnimation(card, pid, function () { showDefendCardSelect(); });
        } else if (game.phase === 'defend-select') {
            game.currentDefendCard = card;
            removeFromLibrary(game.phaseDefender, card);
            updatePlayerInfo();
            addTableCard(card, game.phaseDefender);
            showCardPlayAnimation(card, pid, function () { resolveSingleAttack(); });
        }
    }

    function handleSkipDefend() {
        playSound('click');
        hideSelectAreas();
        game.currentDefendCard = null;
        resolveSingleAttack();
    }

    function resolveSingleAttack() {
        var attacker = getPlayer(game.phaseAttacker);
        var defender = getPlayer(game.phaseDefender);
        var atkCard = game.currentAttackCard;
        var defCard = game.currentDefendCard;

        var atkVal = atkCard.value;
        var atkWithBonus = Math.round(atkVal * (1 + attacker.char.atkBonus));
        var defVal = defCard ? defCard.value : 0;
        var defWithBonus = defCard ? Math.round(defVal * (1 + defender.char.defBonus)) : 0;
        var finalDamage = Math.max(0, atkWithBonus - defWithBonus);
        var hpLoss = finalDamage / 10;

        if (hpLoss > 0) {
            defender.hp = Math.max(0, defender.hp - hpLoss);
            if (game.phaseAttacker === 'A') game.totalDamageA += finalDamage; else game.totalDamageB += finalDamage;
        }

        game.currentAttackIndex++;
        updatePlayerInfo();
        updateAttackProgress();

        addBattleLogEntry(atkCard, atkWithBonus, defCard, defWithBonus, finalDamage, game.phaseAttacker, game.phaseDefender);

        var bonusInfo = checkRarityBonus(atkCard, finalDamage);
        updateAttackProgress();

        var abilityText = '';
        if (attacker.char.atkBonus > 0) abilityText += '<div style="color:var(--gold-light);font-size:13px;margin:4px 0;">⚡ 触发特殊能力：' + attacker.char.abilityDesc + '</div>';
        if (defCard && defender.char.defBonus > 0) abilityText += '<div style="color:var(--gold-light);font-size:13px;margin:4px 0;">🛡️ 触发特殊能力：' + defender.char.abilityDesc + '</div>';

        var maxAtk = getMaxAttacks();
        var phaseLabel = game.isCounterPhase ? '反击' : '攻击';

        var html = '<div style="font-size:14px;color:var(--text-dim);margin-bottom:6px;">' + phaseLabel + '进度：已攻击 ' + game.currentAttackIndex + '/' + maxAtk + ' 次</div>' +
            '<div style="font-size:14px;color:var(--text-dim);margin-bottom:8px;">' + atkCard.icon + atkCard.name + ' ' + atkWithBonus + ' vs ' + (defCard ? defCard.icon + defCard.name + ' ' + defWithBonus : '无防御') + '</div>' +
            abilityText +
            '<div class="damage-number">' + (finalDamage > 0 ? '-' + finalDamage : '0') + '</div>' +
            '<div class="damage-detail">攻击 ' + atkWithBonus + ' - 防御 ' + defWithBonus + ' = 伤害 ' + finalDamage + '</div>' +
            '<div class="damage-result">' + playerLabel(game.phaseDefender) + '（' + defender.char.name + '）受到 <span style="color:var(--red-light)">' + finalDamage + '</span> 点伤害' +
            (hpLoss > 0 ? '，扣除 <span style="color:var(--red-light)">' + hpLoss.toFixed(1) + '</span> 点血量' : '，未造成伤害') + '</div>' +
            '<div style="margin-top:8px;font-size:14px;">' + playerLabel(game.phaseDefender) + '（' + defender.char.name + '）剩余血量：<strong style="color:var(--gold-light)">' + defender.hp.toFixed(1) + '/' + defender.maxHp + '</strong></div>' +
            bonusInfo;

        showSection('damage-area');
        $('damage-display').innerHTML = html;
        $('center-actions').innerHTML = '';
        hideAllOps();

        if (finalDamage > 0) {
            playSound('damage');
            var defInfo = game.phaseDefender === 'A' ? $('player-a-info') : $('player-b-info');
            defInfo.classList.add('shake'); setTimeout(function () { defInfo.classList.remove('shake'); }, 500);
            speak(defender.char.name + '受到' + finalDamage + '点伤害，剩余血量' + defender.hp.toFixed(1));
        } else { playSound('defend'); speak('攻击被完全防御'); }

        if (defender.hp <= 0) {
            setTimeout(function () { endGame(game.phaseAttacker); }, 1500);
        } else {
            setTimeout(function () {
                showContinueChoice();
            }, 1500);
        }
    }

    function checkRarityBonus(atkCard, finalDamage) {
        if (finalDamage <= 0) return '';
        if (atkCard.rarity !== 'rare' && atkCard.rarity !== 'epic') return '';

        var bonusCards = [];
        var bonusAtks = 0;
        var attacker = getPlayer(game.phaseAttacker);

        if (atkCard.rarity === 'rare') {
            var c = randomWeapon(); c.uid = newCardUid();
            attacker.library.push(c); bonusCards.push(c);
            bonusAtks += 1; game.bonusAttacks += 1;
        } else if (atkCard.rarity === 'epic') {
            for (var j = 0; j < 2; j++) {
                var c2 = randomWeapon(); c2.uid = newCardUid();
                attacker.library.push(c2); bonusCards.push(c2);
            }
            bonusAtks += 2; game.bonusAttacks += 2;
        }

        if (bonusCards.length === 0) return '';

        updatePlayerInfo();
        var cardNames = bonusCards.map(function (c) { return c.icon + c.name; }).join('、');
        playSound('bonus');

        var bonusText = '<div style="margin-top:12px;padding:10px;background:rgba(212,168,67,0.15);border:1px solid var(--gold);border-radius:8px;">' +
            '<div style="color:var(--gold-light);font-size:15px;font-weight:700;">🎁 ' + RARITY_NAMES[atkCard.rarity] + '装备特效触发！</div>' +
            '<div style="color:var(--text-light);font-size:13px;margin:4px 0;">奖励卡牌：' + cardNames + '</div>' +
            '<div style="color:var(--red-light);font-size:14px;font-weight:700;">额外增加 ' + bonusAtks + ' 次攻击机会！（当前上限：' + getMaxAttacks() + '次）</div>' +
            '</div>';

        setTimeout(function () {
            speak(RARITY_NAMES[atkCard.rarity] + '装备特效触发，奖励' + bonusCards.length + '张卡牌，额外增加' + bonusAtks + '次攻击');
        }, 800);

        return bonusText;
    }

    function showContinueChoice() {
        var atkCards = getPlayer(game.phaseAttacker).library.filter(function (c) { return c.type === 'attack'; });
        var maxAtk = getMaxAttacks();

        if (game.currentAttackIndex >= maxAtk || atkCards.length === 0) {
            afterAttackPhaseEnds();
            return;
        }

        setActivePlayer(game.phaseAttacker);
        updateAttackProgress();
        hideAllOps();

        var phaseLabel = game.isCounterPhase ? '反击' : '攻击';
        $('action-hint').textContent = phaseLabel + '阶段（已攻击 ' + game.currentAttackIndex + '/' + maxAtk + ' 次）';

        showOp(game.phaseAttacker, 'continue-attack', { text: '⚔️ 继续攻击（' + (game.currentAttackIndex + 1) + '/' + maxAtk + '）' });
        showOp(game.phaseAttacker, 'end-attack');
        setOpsStatus(game.phaseAttacker, phaseLabel + ' ' + game.currentAttackIndex + '/' + maxAtk + ' 次');

        announcePlayerTurn(game.phaseAttacker, '已完成' + game.currentAttackIndex + '次攻击，是否继续');
    }

    function afterAttackPhaseEnds() {
        hideAllOps();
        var el = $('attack-progress');
        if (el) el.style.display = 'none';
        if (!game.isCounterPhase) {
            startAttackPhase(true);
        } else {
            nextRound();
        }
    }

    function nextRound() {
        game.allRoundLogs.push({ round: game.round, log: game.roundLog.slice() });
        game.round++;
        if (game.round > MAX_ROUNDS) {
            if (game.playerA.hp > game.playerB.hp) endGame('A');
            else if (game.playerB.hp > game.playerA.hp) endGame('B');
            else endGame('draw'); return;
        }
        showModal('<h3>第' + (game.round - 1) + '轮结束</h3>' +
            '<p>玩家A（' + game.playerA.char.name + '）剩余血量：' + game.playerA.hp.toFixed(1) + '/' + game.playerA.maxHp + '</p>' +
            '<p>玩家B（' + game.playerB.char.name + '）剩余血量：' + game.playerB.hp.toFixed(1) + '/' + game.playerB.maxHp + '</p>' +
            '<p style="color:var(--text-dim);font-size:12px;margin-top:8px;">未使用的卡牌将保留至下一轮</p>' +
            '<button class="btn btn-primary modal-btn" id="btn-nr">开始第' + game.round + '轮</button>');
        $('btn-nr').addEventListener('click', function () { hideModal(); startWeaponDrawPhase(); });
    }

    function endGame(winner) {
        game.allRoundLogs.push({ round: game.round, log: game.roundLog.slice() });
        game.phase = 'gameover'; playSound(winner === 'draw' ? 'lose' : 'win');
        showScreen('screen-gameover');
        if (winner === 'draw') {
            $('gameover-title').textContent = '平局！';
            $('winner-display').innerHTML = '<div class="winner-char">⚔️ 势均力敌 ⚔️</div><div class="winner-player">双方血量相同</div>';
            speak('游戏结束，平局');
        } else {
            var wp = getPlayer(winner);
            $('gameover-title').textContent = '游戏结束！';
            $('winner-display').innerHTML = '<div class="winner-char">' + wp.char.emoji + ' ' + wp.char.name + '</div><div class="winner-player">' + playerLabel(winner) + ' 获胜！🎉</div>';
            speak('游戏结束，' + playerLabel(winner) + wp.char.name + '获胜');
        }
        $('game-stats').innerHTML =
            '<div class="stat-row"><span class="stat-label">总轮数</span><span class="stat-value">' + game.round + '</span></div>' +
            '<div class="stat-row"><span class="stat-label">玩家A（' + game.playerA.char.name + '）造成伤害</span><span class="stat-value">' + game.totalDamageA + '</span></div>' +
            '<div class="stat-row"><span class="stat-label">玩家B（' + game.playerB.char.name + '）造成伤害</span><span class="stat-value">' + game.totalDamageB + '</span></div>' +
            '<div class="stat-row"><span class="stat-label">玩家A剩余血量</span><span class="stat-value">' + game.playerA.hp.toFixed(1) + '/' + game.playerA.maxHp + '</span></div>' +
            '<div class="stat-row"><span class="stat-label">玩家B剩余血量</span><span class="stat-value">' + game.playerB.hp.toFixed(1) + '/' + game.playerB.maxHp + '</span></div>' +
            buildRoundDetailHTML();
    }

    function buildRoundDetailHTML() {
        if (!game.allRoundLogs || game.allRoundLogs.length === 0) return '';
        var html = '<div class="round-detail-section"><div class="round-detail-title">📜 每轮战况详情</div>';
        game.allRoundLogs.forEach(function (rd) {
            if (!rd.log || rd.log.length === 0) return;
            html += '<div class="round-detail-round"><div class="round-detail-round-title">第' + rd.round + '轮</div>';
            var currentGroup = '';
            rd.log.forEach(function (entry) {
                var phaseLabel = entry.isCounter ? '反击' : '攻击';
                var groupLabel = playerLabel(entry.attackerPid) + '（' + (entry.attackerPid === 'A' ? game.playerA.char.name : game.playerB.char.name) + '）' + phaseLabel;
                var firstInGroup = currentGroup !== groupLabel;
                if (firstInGroup) {
                    if (currentGroup) html += '</div>';
                    html += '<div class="round-detail-group"><div class="round-detail-group-title">' + groupLabel + '</div>';
                    currentGroup = groupLabel;
                }
                var atkHtml = '<span style="color:var(--red-light)">' + entry.atkCard.icon + entry.atkCard.name + '(' + entry.atkWithBonus + ')</span>';
                var defHtml = entry.defCard
                    ? '<span style="color:var(--blue-light)">' + entry.defCard.icon + entry.defCard.name + '(' + entry.defWithBonus + ')</span>'
                    : '<span style="color:var(--text-dim)">无防御</span>';
                var dmgCls = entry.finalDamage > 0 ? 'color:var(--gold-light)' : 'color:var(--text-dim)';
                html += '<div class="round-detail-pair">' + atkHtml + ' <span style="color:var(--text-dim)">vs</span> ' + defHtml + ' <span style="' + dmgCls + ';margin-left:auto;font-weight:700">伤害' + entry.finalDamage + '</span></div>';
            });
            if (currentGroup) html += '</div>';
            html += '</div>';
        });
        html += '</div>';
        return html;
    }

    function refreshCurrentCardSelect() {
        if (game.phase === 'attack-select') {
            renderCardHand(game.phaseAttacker, 'attack');
        } else if (game.phase === 'defend-select') {
            renderCardHand(game.phaseDefender, 'defend');
        }
    }

    function showSellModal(pid) {
        var player = getPlayer(pid);
        if (player.library.length === 0) {
            showModal('<h3>出售卡牌</h3><p style="color:var(--text-dim);">没有可出售的卡牌</p><button class="btn btn-primary modal-btn" id="btn-close-sell">关闭</button>');
            $('btn-close-sell').addEventListener('click', function () { hideModal(); refreshCurrentCardSelect(); });
            return;
        }
        var html = '<h3>🔄 出售卡牌</h3>' +
            '<p class="hint-text">当前金币: 💰' + player.gold + '</p>' +
            '<div class="sell-cards-list">';
        player.library.forEach(function (card) {
            var typeLabel = card.type === 'attack' ? '攻击' : '防御';
            var valueLabel = card.type === 'attack' ? '伤害' : '防御';
            var sellPrice = Math.round(card.price * 0.8);
            html += '<div class="sell-card-item" data-uid="' + card.uid + '">' +
                '<div class="sell-card-info">' +
                '<span class="sell-card-icon">' + card.icon + '</span>' +
                '<span class="sell-card-name">' + card.name + '</span>' +
                '<span class="sell-card-type ' + card.type + '">' + typeLabel + '</span>' +
                '<span class="sell-card-value">' + valueLabel + ':' + card.value + '</span>' +
                '</div>' +
                '<div class="sell-card-action">' +
                '<span class="sell-price">💰' + sellPrice + '</span>' +
                '<button class="btn btn-small btn-sell-one" data-uid="' + card.uid + '">出售</button>' +
                '</div></div>';
        });
        html += '</div>' +
            '<div class="modal-actions">' +
            '<button class="btn btn-secondary modal-btn" id="btn-close-sell">关闭</button>' +
            '</div>';
        showModal(html);

        document.querySelectorAll('.btn-sell-one').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var uid = btn.getAttribute('data-uid');
                var card = findCardByUid(player, uid);
                if (!card) return;
                var sellPrice = Math.round(card.price * 0.8);
                player.gold += sellPrice;
                var idx = player.library.findIndex(function (c) { return c.uid === uid; });
                if (idx >= 0) player.library.splice(idx, 1);
                playSound('coin');
                updatePlayerInfo();
                hideModal();
                showSellModal(pid);
            });
        });
        $('btn-close-sell').addEventListener('click', function () { hideModal(); refreshCurrentCardSelect(); });
    }

    function showBuyModal(pid) {
        var player = getPlayer(pid);
        var html = '<h3>🛒 购买</h3>' +
            '<p class="hint-text">当前金币: 💰' + player.gold + '</p>' +
            '<div class="buy-tabs">' +
            '<button class="btn btn-small buy-tab active" data-tab="cards">卡牌商店</button>' +
            '<button class="btn btn-small buy-tab" data-tab="rare-wheel">稀有转盘</button>' +
            '<button class="btn btn-small buy-tab" data-tab="black-market">黑市</button>' +
            '</div>' +
            '<div class="buy-tab-content" id="buy-tab-content"></div>' +
            '<div class="modal-actions">' +
            '<button class="btn btn-secondary modal-btn" id="btn-close-buy">关闭</button>' +
            '</div>';
        showModal(html);

        function renderBuyTab(tabName) {
            document.querySelectorAll('.buy-tab').forEach(function (t) { t.classList.toggle('active', t.getAttribute('data-tab') === tabName); });
            var content = $('buy-tab-content');
            if (!content) return;

            if (tabName === 'cards') {
                var cardsHtml = '<div class="shop-cards">';
                WEAPONS.forEach(function (wp) {
                    var typeLabel = wp.type === 'attack' ? '攻击' : '防御';
                    var valueLabel = wp.type === 'attack' ? '伤害' : '防御';
                    var canBuy = player.gold >= wp.price;
                    cardsHtml += '<div class="shop-card-item">' +
                        '<div class="weapon-card rarity-' + wp.rarity + ' shop-card">' +
                        '<span class="card-type ' + wp.type + '">' + typeLabel + '</span>' +
                        '<span class="card-icon">' + wp.icon + '</span>' +
                        '<span class="card-name">' + wp.name + '</span>' +
                        '<span class="card-value">' + valueLabel + ':' + wp.value + '</span>' +
                        '<span class="card-price">💰' + wp.price + '</span>' +
                        '</div>' +
                        '<button class="btn btn-small btn-buy-card' + (canBuy ? '' : ' disabled-btn') + '" data-id="' + wp.id + '"' + (canBuy ? '' : ' disabled') + '>' +
                        (canBuy ? '购买' : '金币不足') + '</button></div>';
                });
                cardsHtml += '</div>';
                content.innerHTML = cardsHtml;

                content.querySelectorAll('.btn-buy-card:not([disabled])').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        var wpId = btn.getAttribute('data-id');
                        var wp = WEAPONS.find(function (w) { return w.id === wpId; });
                        if (!wp || player.gold < wp.price) return;
                        player.gold -= wp.price;
                        var newCard = Object.assign({}, wp); newCard.uid = newCardUid();
                        player.library.push(newCard);
                        playSound('coin');
                        updatePlayerInfo();
                        hideModal();
                        showCardPreview(newCard);
                        setTimeout(function () {
                            $('card-preview-overlay').classList.add('hidden');
                            showBuyModal(pid);
                        }, 1500);
                    });
                });
            } else if (tabName === 'rare-wheel') {
                var rareWheelPrice = 300;
                var canSpin = player.gold >= rareWheelPrice;
                var rareWheelHtml = '<div class="rare-wheel-section">' +
                    '<p style="color:var(--gold-light);font-size:14px;margin:8px 0;">转动稀有转盘，获取稀有或史诗卡牌！</p>' +
                    '<p style="color:var(--text-dim);font-size:12px;margin-bottom:12px;">每次转动消耗 💰' + rareWheelPrice + '</p>' +
                    '<div class="wheel-container small rare-wheel-container">' +
                    '<canvas id="rare-wheel-canvas" width="280" height="280"></canvas>' +
                    '<div class="wheel-pointer small"></div>' +
                    '</div>' +
                    '<button class="btn btn-primary' + (canSpin ? '' : ' disabled-btn') + '" id="btn-spin-rare-wheel"' + (canSpin ? '' : ' disabled') + '>' +
                    '🎰 转动稀有转盘 (💰' + rareWheelPrice + ')</button>' +
                    '</div>';
                content.innerHTML = rareWheelHtml;

                var rareWeapons = WEAPONS.filter(function (w) { return w.rarity === 'rare' || w.rarity === 'epic'; });
                var rareWheelItems = rareWeapons.map(function (w) { return { name: w.name, id: w.id }; });
                var rareWheelAngle = 0;

                function drawRareWheel() {
                    var canvas = $('rare-wheel-canvas');
                    if (!canvas) return;
                    var ctx = canvas.getContext('2d');
                    var w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2, r = Math.min(cx, cy) - 10;
                    var n = rareWheelItems.length; if (n === 0) return; var arc = (2 * Math.PI) / n;
                    ctx.clearRect(0, 0, w, h); ctx.save(); ctx.translate(cx, cy); ctx.rotate(rareWheelAngle);
                    var colors = ['#1565c0', '#7b1fa2', '#0d47a1', '#4a148c', '#1976d2', '#6a1b9a', '#0d47a1', '#4a148c'];
                    for (var i = 0; i < n; i++) {
                        var sa = i * arc - Math.PI / 2, ea = sa + arc;
                        ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, sa, ea); ctx.closePath();
                        ctx.fillStyle = colors[i % colors.length]; ctx.fill();
                        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2; ctx.stroke();
                        ctx.save(); ctx.rotate(sa + arc / 2);
                        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff';
                        ctx.font = 'bold 12px "Noto Sans SC", sans-serif'; ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 3;
                        var label = rareWheelItems[i].name; if (label.length > 4) label = label.substring(0, 4);
                        ctx.fillText(label, r * 0.58, 0); ctx.restore();
                    }
                    ctx.beginPath(); ctx.arc(0, 0, 20, 0, 2 * Math.PI); ctx.fillStyle = '#d4a843'; ctx.fill();
                    ctx.strokeStyle = '#8b6914'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = '#1a1a2e'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowBlur = 0;
                    ctx.fillText('GO', 0, 0); ctx.restore();
                }

                drawRareWheel();

                var spinRareBtn = $('btn-spin-rare-wheel');
                if (spinRareBtn && canSpin) {
                    spinRareBtn.addEventListener('click', function () {
                        if (player.gold < rareWheelPrice) return;
                        player.gold -= rareWheelPrice;
                        updateGoldDisplay();
                        spinRareBtn.disabled = true;
                        spinRareBtn.textContent = '转动中...';

                        var totalWeight = 0;
                        var weights = rareWeapons.map(function (w) {
                            var wt = w.rarity === 'epic' ? 30 : 70;
                            totalWeight += wt; return wt;
                        });
                        var rand = Math.random() * totalWeight;
                        var cum = 0;
                        var selectedIdx = 0;
                        for (var i = 0; i < rareWeapons.length; i++) {
                            cum += weights[i];
                            if (rand < cum) { selectedIdx = i; break; }
                        }

                        var targetAngle = (2 * Math.PI) - (selectedIdx * ((2 * Math.PI) / rareWheelItems.length) + ((2 * Math.PI) / rareWheelItems.length) / 2);
                        var fullRot = Math.PI * 2 * randomInt(5, 8);
                        var totalRot = fullRot + targetAngle - (rareWheelAngle % (Math.PI * 2));
                        if (totalRot < fullRot) totalRot += Math.PI * 2;
                        var dur = 3000, st = null, sa = rareWheelAngle;
                        playSound('spin');

                        function animRare(ts) {
                            if (!st) st = ts; var el = ts - st; var pr = Math.min(el / dur, 1);
                            var eased = 1 - Math.pow(1 - pr, 3); rareWheelAngle = sa + totalRot * eased; drawRareWheel();
                            if (pr < 1) { requestAnimationFrame(animRare); }
                            else {
                                playSound('rare');
                                var wp = rareWeapons[selectedIdx];
                                var newCard = Object.assign({}, wp); newCard.uid = newCardUid();
                                player.library.push(newCard);
                                updatePlayerInfo();
                                var rarityName = RARITY_NAMES[wp.rarity];
                                speak('恭喜获得' + rarityName + '装备' + wp.name);
                                hideModal();
                                showCardPreview(newCard);
                                setTimeout(function () {
                                    $('card-preview-overlay').classList.add('hidden');
                                    showBuyModal(pid);
                                }, 1500);
                            }
                        }
                        requestAnimationFrame(animRare);
                    });
                }
            } else if (tabName === 'black-market') {
                var shuffled = BLACK_MARKET_WEAPONS.slice().sort(function () { return Math.random() - 0.5; });
                var displayItems = shuffled.slice(0, 5);
                var bmHtml = '<div class="black-market-section">' +
                    '<p style="color:var(--red-light);font-size:14px;margin:8px 0;">🌑 黑市 - 稀有强力武器，售价更高</p>' +
                    '<div class="shop-cards">';
                displayItems.forEach(function (wp) {
                    var typeLabel = wp.type === 'attack' ? '攻击' : '防御';
                    var valueLabel = wp.type === 'attack' ? '伤害' : '防御';
                    var canBuy = player.gold >= wp.price;
                    bmHtml += '<div class="shop-card-item black-market-item">' +
                        '<div class="weapon-card rarity-' + wp.rarity + ' shop-card">' +
                        '<span class="card-type ' + wp.type + '">' + typeLabel + '</span>' +
                        '<span class="card-icon">' + wp.icon + '</span>' +
                        '<span class="card-name">' + wp.name + '</span>' +
                        '<span class="card-value">' + valueLabel + ':' + wp.value + '</span>' +
                        '<span class="card-price">💰' + wp.price + '</span>' +
                        '</div>' +
                        '<button class="btn btn-small btn-buy-bm' + (canBuy ? '' : ' disabled-btn') + '" data-id="' + wp.id + '"' + (canBuy ? '' : ' disabled') + '>' +
                        (canBuy ? '购买' : '金币不足') + '</button></div>';
                });
                bmHtml += '</div></div>';
                content.innerHTML = bmHtml;

                content.querySelectorAll('.btn-buy-bm:not([disabled])').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        var wpId = btn.getAttribute('data-id');
                        var wp = BLACK_MARKET_WEAPONS.find(function (w) { return w.id === wpId; });
                        if (!wp || player.gold < wp.price) return;
                        player.gold -= wp.price;
                        var newCard = Object.assign({}, wp); newCard.uid = newCardUid();
                        player.library.push(newCard);
                        playSound('coin');
                        updatePlayerInfo();
                        speak('购买成功，获得' + wp.name);
                        hideModal();
                        showCardPreview(newCard);
                        setTimeout(function () {
                            $('card-preview-overlay').classList.add('hidden');
                            showBuyModal(pid);
                        }, 1500);
                    });
                });
            }
        }

        document.querySelectorAll('.buy-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                renderBuyTab(tab.getAttribute('data-tab'));
            });
        });

        renderBuyTab('cards');
        $('btn-close-buy').addEventListener('click', function () { hideModal(); refreshCurrentCardSelect(); });
    }

    function initGameOver() {
        $('btn-restart').addEventListener('click', function () {
            playSound('click');
            var sm = game.mode, ss = game.soundEnabled;
            game = {
                mode: sm, phase: 'start', currentPlayer: 'A', round: 1,
                playerA: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 1000 },
                playerB: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 1000 },
                firstAttacker: null, secondAttacker: null,
                weaponDrawCount: 0, weaponDrawPlayer: 'A',
                selectedCardUid: null, soundEnabled: ss, voiceEnabled: ss,
                totalDamageA: 0, totalDamageB: 0, usedCharIds: [],
                currentDrawnCard: null, currentAttackIndex: 0, bonusAttacks: 0,
                phaseAttacker: null, phaseDefender: null, isCounterPhase: false,
                currentAttackCard: null, currentDefendCard: null, roundLog: [],
                allRoundLogs: [], tableCards: []
            };
            wheelAngle = 0; cardUidCounter = 0; showScreen('screen-start');
        });
    }

    function initSwitchPlayer() { $('btn-switch-player').addEventListener('click', function () { playSound('click'); switchPlayer(); }); }
    function initCardPreview() { $('card-preview-overlay').addEventListener('click', function () { $('card-preview-overlay').classList.add('hidden'); }); }

    function initWeaponDraw() {
        ['a', 'b'].forEach(function (p) {
            $('btn-' + p + '-spin-weapon').addEventListener('click', function () {
                if (game.phase !== 'weapon-draw' || game.weaponDrawPlayer !== (p === 'a' ? 'A' : 'B')) return;
                handleSpinWeapon();
            });
        });
    }

    function initCardSelect() {
        ['a', 'b'].forEach(function (p) {
            $('btn-' + p + '-confirm-card').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.phase !== 'attack-select' && game.phase !== 'defend-select') return;
                if (game.phase === 'attack-select' && game.phaseAttacker !== pid) return;
                if (game.phase === 'defend-select' && game.phaseDefender !== pid) return;
                handleConfirmCard();
            });
            $('btn-' + p + '-skip-defend').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.phase !== 'defend-select' || game.phaseDefender !== pid) return;
                handleSkipDefend();
            });
        });
    }

    function initContinueChoice() {
        ['a', 'b'].forEach(function (p) {
            $('btn-' + p + '-continue-attack').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.phaseAttacker !== pid) return;
                playSound('click'); showAttackCardSelect();
            });
            $('btn-' + p + '-end-attack').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.phaseAttacker !== pid) return;
                playSound('click'); afterAttackPhaseEnds();
            });
        });
    }

    function initSellBuy() {
        ['a', 'b'].forEach(function (p) {
            $('btn-' + p + '-sell').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.currentPlayer !== pid) return;
                playSound('click');
                showSellModal(pid);
            });
            $('btn-' + p + '-buy').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.currentPlayer !== pid) return;
                playSound('click');
                showBuyModal(pid);
            });
        });
    }

    function init() {
        if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
        initStartScreen(); initCharacterSelect(); initWeaponDraw();
        initCardSelect(); initContinueChoice();
        initGameOver(); initCardPreview(); initSellBuy();
        showScreen('screen-start');
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
