(function () {
    'use strict';

    function handleError(fnName, err) {
        var msg = err && err.message ? err.message : String(err || '未知错误');
        console.error('[' + fnName + '] 错误:', err);
        alert('操作失败: ' + msg);
    }

    function safeRun(fnName, fn) {
        return function () {
            try {
                return fn.apply(this, arguments);
            } catch (e) {
                handleError(fnName, e);
            }
        };
    }

    function renderEmoji(val, isThumbnail) {
        if (val && /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(val)) {
            if (isThumbnail) {
                return '<img src="' + val + '" alt="" class="thumbnail-img">';
            }
            return '<img src="' + val + '" alt="" style="width:1.6em;height:1.6em;object-fit:contain;border-radius:inherit;">';
        }
        return val;
    }
    function isImageEmoji(val) {
        return val && /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(val);
    }

    var CHARACTERS = [
        { id: 'guojing', name: '郭靖', emoji: 'resources/rules/郭靖.jpeg', hp: 5, maxHp: 5, atkBonus: 0.15, defBonus: 0.10, signatureArt: { name: '降龙十八掌', icon: '🐉' }, voiceLine: '心怀天下，侠之大者' },
        { id: 'huangyaoshi', name: '黄药师', emoji: 'resources/rules/黄药师.jpeg', hp: 4, maxHp: 4, atkBonus: 0.20, defBonus: 0.05, signatureArt: { name: '碧海潮生曲', icon: '🎵' }, voiceLine: '东邪孤傲，不羁凡尘' },
        { id: 'hongqigong', name: '洪七公', emoji: 'resources/rules/洪七公.jpeg', hp: 5, maxHp: 5, atkBonus: 0.18, defBonus: 0, signatureArt: { name: '打狗棒法', icon: '🏏' }, voiceLine: '丐帮之主，侠义坦荡' },
        { id: 'duanyu', name: '段誉', emoji: 'resources/rules/段誉.jpeg', hp: 3, maxHp: 3, atkBonus: 0, defBonus: 0.25, signatureArt: { name: '凌波微步', icon: '✨' }, voiceLine: '温润痴情，翩翩公子' },
        { id: 'xuzhu', name: '虚竹', emoji: 'resources/rules/虚竹.jpeg', hp: 4, maxHp: 4, atkBonus: 0.10, defBonus: 0.15, signatureArt: { name: '天山六阳掌', icon: '☀️' }, voiceLine: '质朴纯粹，身怀绝学' },
        { id: 'qiaofeng', name: '乔峰', emoji: 'resources/rules/乔峰.jpeg', hp: 6, maxHp: 6, atkBonus: 0.22, defBonus: 0, signatureArt: { name: '降龙十八掌', icon: '🐉' }, voiceLine: '豪情盖世，顶天立地' },
        { id: 'yangguo', name: '杨过', emoji: 'resources/rules/杨过.jpeg', hp: 4, maxHp: 4, atkBonus: 0.20, defBonus: 0.05, signatureArt: { name: '玄铁重剑', icon: '⚔️' }, voiceLine: '白衣绝尘，情深不渝' },
        { id: 'zhangwuji', name: '张无忌', emoji: 'resources/rules/张无忌.jpeg', hp: 5, maxHp: 5, atkBonus: 0.12, defBonus: 0.13, signatureArt: { name: '九阳神功', icon: '☀️' }, voiceLine: '仁厚包容，与世无争' },
        { id: 'linghuchong', name: '令狐冲', emoji: 'resources/rules/令狐冲.jpeg', hp: 4, maxHp: 4, atkBonus: 0.18, defBonus: 0.07, signatureArt: { name: '独孤九剑', icon: '🗡️' }, voiceLine: '潇洒随性，笑傲江湖' },
        { id: 'renwoxing', name: '任我行', emoji: 'resources/rules/任我行.jpeg', hp: 5, maxHp: 5, atkBonus: 0.19, defBonus: 0.03, signatureArt: { name: '吸星大法', icon: '🌀' }, voiceLine: '雄才大略，霸气冲天' },
        { id: 'dongfangbubai', name: '东方不败', emoji: 'resources/rules/东方不败.jpeg', hp: 3, maxHp: 3, atkBonus: 0.25, defBonus: 0, signatureArt: { name: '葵花宝典', icon: '🌹' }, voiceLine: '傲视天下，绝代枭雄' },
        { id: 'niefeng', name: '聂风', emoji: 'resources/rules/聂风.jpeg', hp: 5, maxHp: 5, atkBonus: 0.18, defBonus: 0.12, signatureArt: { name: '魔刀', icon: '⚔️' }, voiceLine: '风神飘逸，心善仁厚' },
        { id: 'bujingyun', name: '步惊云', emoji: 'resources/rules/步惊云.jpeg', hp: 4, maxHp: 4, atkBonus: 0.24, defBonus: 0.06, signatureArt: { name: '绝世好剑', icon: '⚔️' }, voiceLine: '冷面战神，一往无前' },
        { id: 'wuming', name: '无名', emoji: 'resources/rules/无名.jpeg', hp: 6, maxHp: 6, atkBonus: 0.20, defBonus: 0.10, signatureArt: { name: '英雄剑', icon: '🗡️' }, voiceLine: '天剑隐世，大道无形' },
        { id: 'xiongba', name: '雄霸', emoji: 'resources/rules/雄霸.jpeg', hp: 5, maxHp: 5, atkBonus: 0.22, defBonus: 0.08, signatureArt: { name: '三分归元气', icon: '🌀' }, voiceLine: '雄霸天下，气吞山河' },
        { id: 'zhaomin', name: '赵敏', emoji: 'resources/rules/赵敏.jpeg', hp: 4, maxHp: 4, atkBonus: 0.15, defBonus: 0.12, signatureArt: { name: '九阴白骨爪', icon: '🦴' }, voiceLine: '敢爱敢恨，率性而为' },
        { id: 'zhouzhiruo', name: '周芷若', emoji: 'resources/rules/周芷若.jpeg', hp: 4, maxHp: 4, atkBonus: 0.19, defBonus: 0.06, signatureArt: { name: '九阴真经', icon: '📖' }, voiceLine: '温婉外表，心事浮沉' },
        { id: 'yangxiao', name: '杨逍', emoji: 'resources/rules/杨逍.jpeg', hp: 4, maxHp: 4, atkBonus: 0.17, defBonus: 0.08, signatureArt: { name: '乾坤大挪移', icon: '🌀' }, voiceLine: '风流傲骨，洒脱不羁' },
        { id: 'zhangsanfeng', name: '张三丰', emoji: 'resources/rules/张三丰.jpeg', hp: 6, maxHp: 6, atkBonus: 0.16, defBonus: 0.18, signatureArt: { name: '太极拳', icon: '☯️' }, voiceLine: '武当始祖，道骨仙风' },
        { id: 'lixunhuan', name: '李寻欢', emoji: 'resources/rules/李寻欢.jpeg', hp: 4, maxHp: 4, atkBonus: 0.26, defBonus: 0.04, signatureArt: { name: '小李飞刀', icon: '🔪' }, voiceLine: '飞刀出手，例无虚发' },
        { id: 'afei', name: '阿飞', emoji: 'resources/rules/阿飞.jpeg', hp: 4, maxHp: 4, atkBonus: 0.23, defBonus: 0.05, signatureArt: { name: '快剑', icon: '⚡' }, voiceLine: '快剑少年，赤子之心' },
        { id: 'shangguanjinhong', name: '上官金虹', emoji: 'resources/rules/上官金虹.jpeg', hp: 5, maxHp: 5, atkBonus: 0.21, defBonus: 0.09, signatureArt: { name: '龙凤双环', icon: '💫' }, voiceLine: '金环称霸，野心滔天' },
        { id: 'shipotian', name: '石破天', emoji: 'resources/rules/石破天.jpeg', hp: 6, maxHp: 6, atkBonus: 0.20, defBonus: 0.15, signatureArt: { name: '太玄经', icon: '📖' }, voiceLine: '纯真质朴，内力通天' },
        { id: 'dingdang', name: '丁当', emoji: 'resources/rules/丁当.jpeg', hp: 4, maxHp: 4, atkBonus: 0.14, defBonus: 0.12, signatureArt: { name: '叮当响', icon: '🔔' }, voiceLine: '娇俏灵动，活泼率真' },
        { id: 'xiaoshiyilang', name: '萧十一郎', emoji: 'resources/rules/萧十一郎.jpeg', hp: 5, maxHp: 5, atkBonus: 0.20, defBonus: 0.10, signatureArt: { name: '割鹿刀', icon: '⚔️' }, voiceLine: '浪迹江湖，孤勇前行' },
        { id: 'shenbijun', name: '沈璧君', emoji: 'resources/rules/沈璧君.jpeg', hp: 4, maxHp: 4, atkBonus: 0.12, defBonus: 0.15, signatureArt: { name: '洗妆剑法', icon: '🗡️' }, voiceLine: '温婉娴静，一往情深' },
        { id: 'lianchengbi', name: '连城璧', emoji: 'resources/rules/连城璧.jpeg', hp: 5, maxHp: 5, atkBonus: 0.22, defBonus: 0.08, signatureArt: { name: '天外飞仙', icon: '⚡' }, voiceLine: '名门翘楚，执念难破' },
        { id: 'huangrong', name: '黄蓉', emoji: 'resources/rules/黄蓉.jpeg', hp: 4, maxHp: 4, atkBonus: 0.16, defBonus: 0.14, signatureArt: { name: '落英神剑掌', icon: '🌸' }, voiceLine: '慧黠灵动，巧智无双' },
        { id: 'ouyangfeng', name: '欧阳锋', emoji: 'resources/rules/欧阳锋.jpeg', hp: 5, maxHp: 5, atkBonus: 0.24, defBonus: 0.04, signatureArt: { name: '蛤蟆功', icon: '🐸' }, voiceLine: '西毒枭雄，武痴狂傲' },
        { id: 'xiaolongnv', name: '小龙女', emoji: 'resources/rules/小龙女.jpeg', hp: 4, maxHp: 4, atkBonus: 0.19, defBonus: 0.11, signatureArt: { name: '玉女剑法', icon: '🌙' }, voiceLine: '白衣绝尘，情深不渝' }
    ];

    var EPIC_SKILLS = [
        { id: 'steal_card', name: '偷取', desc: '偷取对方一张卡牌', icon: '🤚', target: 'opponent', timing: 'current', condition: 'always' },
        { id: 'no_defend', name: '破防', desc: '对方本次不能使用防御', icon: '💥', target: 'opponent', timing: 'current', condition: 'always' },
        { id: 'reduce_attack', name: '削弱', desc: '对方本次防御值减少20%', icon: '⬇️', target: 'opponent', timing: 'current', condition: 'always' },
        { id: 'replace_epic', name: '降级', desc: '将对方一张史诗卡牌替换为普通卡牌', icon: '🔄', target: 'opponent', timing: 'current', condition: 'always' },
        { id: 'block_ability', name: '封技', desc: '限制对方角色技能下一次不能使用', icon: '🚫', target: 'opponent', timing: 'next', condition: 'always' }
    ];

    var WEAPONS = [
        { id: 'qinggaingjian', name: '青钢剑', type: 'attack', rarity: 'common', price: 100, value: 10, icon: 'resources/equipments/青钢剑.png', desc: '最基本的江湖佩剑' },
        { id: 'panguanbi', name: '判官笔', type: 'attack', rarity: 'common', price: 100, value: 9, icon: 'resources/equipments/判官笔.png', desc: '文人墨客的防身利器' },
        { id: 'tongluo', name: '铜锣', type: 'attack', rarity: 'common', price: 100, value: 8, icon: 'resources/equipments/铜锣.png', desc: '威慑用的响铜乐器' },
        { id: 'liuxingchui', name: '流星锤', type: 'attack', rarity: 'common', price: 100, value: 7, icon: 'resources/equipments/流星锤.png', desc: '暗藏机括的链锤' },
        { id: 'bianzi', name: '鞭子', type: 'attack', rarity: 'common', price: 100, value: 8, icon: 'resources/equipments/软鞭.png', desc: '软硬兼施的软兵器' },
        { id: 'xuantiejian', name: '玄铁剑', type: 'attack', rarity: 'elite', price: 200, value: 18, icon: 'resources/equipments/玄铁剑.png', desc: '重剑无锋大巧不工' },
        { id: 'dagoubang', name: '打狗棒', type: 'attack', rarity: 'elite', price: 200, value: 16, icon: 'resources/equipments/打狗棒.png', desc: '丐帮镇帮之宝' },
        { id: 'bixuejian', name: '碧血剑', type: 'attack', rarity: 'elite', price: 200, value: 17, icon: 'resources/equipments/碧血剑.png', desc: '碧血染沙场之剑' },
        { id: 'yuanyangdao', name: '鸳鸯刀', type: 'attack', rarity: 'elite', price: 200, value: 15, icon: 'resources/equipments/鸳鸯刀.png', desc: '雌雄双刀合璧' },
        { id: 'zhugeliannu', name: '诸葛连弩', type: 'attack', rarity: 'elite', price: 200, value: 14, icon: 'resources/equipments/诸葛连弩.png', desc: '连珠箭法' },
        { id: 'yitianjian', name: '倚天剑', type: 'attack', rarity: 'rare', price: 350, value: 28, icon: 'resources/equipments/倚天剑.png', desc: '号称武林至尊' },
        { id: 'tulongdao', name: '屠龙刀', type: 'attack', rarity: 'rare', price: 350, value: 25, icon: 'resources/equipments/屠龙刀.png', desc: '号称武林至尊' },
        { id: 'tulong_steal', name: '屠龙刀·偷取', type: 'attack', rarity: 'epic', price: 500, value: 40, icon: 'resources/equipments/屠龙刀.png', desc: '屠龙刀出谁与争锋', skill: EPIC_SKILLS[0] },
        { id: 'dagou_break', name: '打狗棒·破防', type: 'attack', rarity: 'epic', price: 500, value: 38, icon: 'resources/equipments/打狗棒.png', desc: '打狗棒法天下无敌', skill: EPIC_SKILLS[1] },
        { id: 'xuantie_reduce', name: '玄铁重剑·削弱', type: 'attack', rarity: 'epic', price: 500, value: 36, icon: 'resources/equipments/玄铁剑.png', desc: '重剑无锋大巧不工', skill: EPIC_SKILLS[2] },
        { id: 'bixue_replace', name: '碧血剑·降级', type: 'attack', rarity: 'epic', price: 500, value: 42, icon: 'resources/equipments/碧血剑.png', desc: '碧血染沙场威震江湖', skill: EPIC_SKILLS[3] },
        { id: 'yuxiao_block', name: '玉箫·封技', type: 'attack', rarity: 'epic', price: 500, value: 37, icon: 'resources/equipments/玉箫.png', desc: '玉箫吹奏乱人心智', skill: EPIC_SKILLS[4] },
        { id: 'xueyindao', name: '雪饮刀', type: 'attack', rarity: 'legend', price: 800, value: 55, icon: 'resources/equipments/雪饮刀.png', desc: '聂风佩刀寒冰之气' },
        { id: 'jueshihaojian', name: '绝世好剑', type: 'attack', rarity: 'legend', price: 800, value: 58, icon: 'resources/equipments/绝世好剑.png', desc: '步惊云佩剑天下第一' },
        { id: 'yingxiongjian', name: '英雄剑', type: 'attack', rarity: 'rare', price: 350, value: 30, icon: 'resources/equipments/英雄剑.png', desc: '无名佩剑武林神话' },
        { id: 'shenghuoling', name: '圣火令', type: 'attack', rarity: 'rare', price: 350, value: 26, icon: 'resources/equipments/圣火令.png', desc: '明教圣物至高无上' },
        { id: 'xiaolifeidao', name: '小李飞刀', type: 'attack', rarity: 'legend', price: 800, value: 60, icon: 'resources/equipments/小李飞刀.png', desc: '例不虚发天下第一暗器' },
        { id: 'longfengshuanghuan', name: '龙凤双环', type: 'defend', rarity: 'rare', price: 350, value: 24, icon: 'resources/equipments/龙凤双环.png', desc: '上官金虹兵器攻防一体' },
        { id: 'geludao', name: '割鹿刀', type: 'attack', rarity: 'legend', price: 800, value: 56, icon: 'resources/equipments/割鹿刀.png', desc: '天下第一神刀传说之兵' },
        { id: 'buyi', name: '布衣', type: 'defend', rarity: 'common', price: 100, value: 8, icon: 'resources/equipments/布衣.png', desc: '粗布麻衣遮体' },
        { id: 'zhulian', name: '竹帘', type: 'defend', rarity: 'common', price: 100, value: 10, icon: 'resources/equipments/竹帘.png', desc: '简易的竹制帘幕' },
        { id: 'mianpao', name: '棉袍', type: 'defend', rarity: 'common', price: 100, value: 7, icon: 'resources/equipments/棉袍.png', desc: '御寒的棉布长袍' },
        { id: 'tengjia', name: '藤甲', type: 'defend', rarity: 'common', price: 100, value: 9, icon: 'resources/equipments/藤甲.png', desc: '藤条编织的轻甲' },
        { id: 'doulì', name: '斗笠', type: 'defend', rarity: 'common', price: 100, value: 7, icon: 'resources/equipments/斗笠.png', desc: '遮阳挡雨的竹笠' },
        { id: 'jinisiruanjia', name: '金丝软甲', type: 'defend', rarity: 'elite', price: 200, value: 18, icon: 'resources/equipments/金丝软甲.png', desc: '金丝编织的软猬甲' },
        { id: 'tajitu', name: '太极图', type: 'defend', rarity: 'elite', price: 200, value: 15, icon: 'resources/equipments/太极图.png', desc: '太极双鱼图案护身' },
        { id: 'tieluohan', name: '铁罗汉', type: 'defend', rarity: 'elite', price: 200, value: 16, icon: 'resources/equipments/铁罗汉.png', desc: '十八铜人阵法' },
        { id: 'huxinjing', name: '护心镜', type: 'defend', rarity: 'elite', price: 200, value: 14, icon: 'resources/equipments/护心镜.png', desc: '保护心口的铜镜' },
        { id: 'hunyuansan', name: '混元伞', type: 'defend', rarity: 'elite', price: 200, value: 13, icon: 'resources/equipments/混元伞.png', desc: '周伯通的宝贝' },
        { id: 'xuantiejia', name: '玄铁重甲', type: 'defend', rarity: 'rare', price: 350, value: 22, icon: 'resources/equipments/玄铁重甲.png', desc: '玄铁打造的重型铠甲坚不可摧' },
        { id: 'jinsibaojia', name: '金丝宝甲', type: 'defend', rarity: 'rare', price: 350, value: 24, icon: 'resources/equipments/金丝宝甲.png', desc: '金丝银线编织刀枪不入' },
        { id: 'tiancanbaojia', name: '天蚕宝甲', type: 'defend', rarity: 'epic', price: 500, value: 35, icon: 'resources/equipments/天蚕宝甲.png', desc: '天蚕丝织就水火不侵' },
        { id: 'linlinjia', name: '鳞鳞甲', type: 'defend', rarity: 'epic', price: 500, value: 33, icon: 'resources/equipments/龙鳞战甲.png', desc: '龙鳞镶嵌的战甲威武霸气' },
        { id: 'bujuejinshen', name: '不灭金身', type: 'defend', rarity: 'epic', price: 500, value: 38, icon: 'resources/equipments/不灭金身.png', desc: '金刚不坏之体万法不侵' },
        { id: 'tiancanshenjia', name: '天蚕神甲', type: 'defend', rarity: 'legend', price: 800, value: 52, icon: 'resources/equipments/天蚕宝甲.png', desc: '天下第一宝甲刀剑难伤' },
        { id: 'ruanweijia', name: '软猬甲', type: 'defend', rarity: 'legend', price: 800, value: 50, icon: 'resources/equipments/软猬甲.png', desc: '黄蓉宝甲内藏尖刺反伤敌人' },
        { id: 'hutishenggang', name: '护体神罡', type: 'defend', rarity: 'legend', price: 800, value: 54, icon: 'resources/equipments/护体罡气.png', desc: '先天真气护体百邪不侵' }
    ];

    var MARTIAL_ARTS = [
        { id: 'xl18z', name: '降龙十八掌', icon: '🐉', type: 'attack', atkBonus: 0.22, defBonus: 0, rarity: 'legend', difficulty: 5, desc: '丐帮镇帮神功，刚猛无俦天下第一掌法', source: '射雕英雄传' },
        { id: 'lmsj', name: '六脉神剑', icon: '⚡', type: 'attack', atkBonus: 0.20, defBonus: 0.05, rarity: 'legend', difficulty: 5, desc: '大理段氏绝学，无形剑气伤敌于无形', source: '天龙八部' },
        { id: 'dg9j', name: '独孤九剑', icon: '🗡️', type: 'attack', atkBonus: 0.18, defBonus: 0.07, rarity: 'legend', difficulty: 4, desc: '独孤求败所创，无招胜有招破尽天下武功', source: '笑傲江湖' },
        { id: 'dgbf', name: '打狗棒法', icon: '🏏', type: 'attack', atkBonus: 0.14, defBonus: 0.03, rarity: 'epic', difficulty: 3, desc: '丐帮三十六路打狗棒法，精妙绝伦', source: '射雕英雄传' },
        { id: 'qkdny', name: '乾坤大挪移', icon: '🌀', type: 'attack', atkBonus: 0.12, defBonus: 0.08, rarity: 'epic', difficulty: 4, desc: '明教护教神功，借力打力化敌于无形', source: '倚天屠龙记' },
        { id: 'jygf', name: '九阳真经', icon: '☀️', type: 'defend', atkBonus: 0, defBonus: 0.22, rarity: 'legend', difficulty: 5, desc: '九阳神功护体，万邪不侵百毒不侵', source: '倚天屠龙记' },
        { id: 'yjyjg', name: '易筋经', icon: '📿', type: 'defend', atkBonus: 0.05, defBonus: 0.18, rarity: 'legend', difficulty: 5, desc: '达摩祖师所创少林至高内功', source: '天龙八部' },
        { id: 'lbwb', name: '凌波微步', icon: '✨', type: 'defend', atkBonus: 0, defBonus: 0.20, rarity: 'epic', difficulty: 3, desc: '逍遥派绝学，闪避攻击如凌波微步', source: '天龙八部' },
        { id: 'bxgf', name: '北冥神功', icon: '🌬️', type: 'defend', atkBonus: 0.08, defBonus: 0.15, rarity: 'epic', difficulty: 4, desc: '吸人内力化为己用，逍遥派绝学', source: '天龙八部' },
        { id: 'zxgf', name: '紫霞神功', icon: '🌙', type: 'defend', atkBonus: 0.03, defBonus: 0.16, rarity: 'rare', difficulty: 2, desc: '华山派绝顶内功，紫霞照影', source: '笑傲江湖' },
        { id: 'tjtaiji', name: '武当太极', icon: '☯️', type: 'defend', atkBonus: 0.06, defBonus: 0.14, rarity: 'rare', difficulty: 2, desc: '张三丰所创以柔克刚太极心法', source: '倚天屠龙记' },
        { id: 'taijijianfa', name: '太极剑法', icon: '⚔️', type: 'attack', atkBonus: 0.12, defBonus: 0.08, rarity: 'epic', difficulty: 3, desc: '武当派镇派剑法，以静制动后发制人', source: '倚天屠龙记' },
        { id: 'shaolin72jueji', name: '少林七十二绝技', icon: '🏯', type: 'attack', atkBonus: 0.15, defBonus: 0.10, rarity: 'legend', difficulty: 5, desc: '少林寺千年武学精华七十二种绝技总称', source: '天龙八部' },
        { id: 'mohewuliang', name: '摩诃无量', icon: '🌊', type: 'attack', atkBonus: 0.25, defBonus: 0.05, rarity: 'legend', difficulty: 5, desc: '风云合璧天下无敌，聂风步惊云联手绝学', source: '风云' },
        { id: 'paiyunzhang', name: '排云掌', icon: '☁️', type: 'attack', atkBonus: 0.16, defBonus: 0.08, rarity: 'epic', difficulty: 4, desc: '步惊云绝学掌法刚柔并济', source: '风云' },
        { id: 'fengshentui', name: '风神腿', icon: '🌪️', type: 'attack', atkBonus: 0.18, defBonus: 0.05, rarity: 'epic', difficulty: 4, desc: '聂风绝学腿法快如疾风', source: '风云' },
        { id: 'tianshuangquan', name: '天霜拳', icon: '❄️', type: 'attack', atkBonus: 0.14, defBonus: 0.10, rarity: 'epic', difficulty: 3, desc: '雄霸绝学拳法寒冰之气', source: '风云' },
        { id: 'jianersan', name: '剑二十三', icon: '⚡', type: 'attack', atkBonus: 0.22, defBonus: 0, rarity: 'legend', difficulty: 5, desc: '无名终极剑招时间静止空间破碎', source: '风云' },
        { id: 'jiuyinbaiguzhao', name: '九阴白骨爪', icon: '🦴', type: 'attack', atkBonus: 0.18, defBonus: 0.05, rarity: 'epic', difficulty: 4, desc: '梅超风周芷若绝学五指如钩', source: '倚天屠龙记' },
        { id: 'taijiquan', name: '太极拳', icon: '☯️', type: 'defend', atkBonus: 0.08, defBonus: 0.20, rarity: 'legend', difficulty: 5, desc: '张三丰所创以柔克刚太极拳法', source: '倚天屠龙记' },
        { id: 'shenghuolingfa', name: '圣火令神功', icon: '🔥', type: 'attack', atkBonus: 0.16, defBonus: 0.08, rarity: 'epic', difficulty: 3, desc: '明教波斯总教失传武学', source: '倚天屠龙记' },
        { id: 'xiaolifeidao_art', name: '小李飞刀', icon: '🔪', type: 'attack', atkBonus: 0.28, defBonus: 0, rarity: 'legend', difficulty: 5, desc: '李寻欢绝技例不虚发出必中', source: '小李飞刀' },
        { id: 'kuaijian', name: '快剑', icon: '⚡', type: 'attack', atkBonus: 0.24, defBonus: 0.03, rarity: 'legend', difficulty: 5, desc: '阿飞剑法快如闪电无招无式', source: '小李飞刀' },
        { id: 'taixuanjing', name: '太玄经', icon: '📖', type: 'defend', atkBonus: 0.10, defBonus: 0.25, rarity: 'legend', difficulty: 5, desc: '石破天领悟的绝世内功武学巅峰', source: '侠客行' },
        { id: 'luohanfumogong', name: '罗汉伏魔功', icon: '🗿', type: 'defend', atkBonus: 0.06, defBonus: 0.20, rarity: 'epic', difficulty: 4, desc: '少林绝学伏魔神功刚柔并济', source: '侠客行' },
        { id: 'xixingdafa', name: '吸星大法', icon: '🌀', type: 'defend', atkBonus: 0.10, defBonus: 0.14, rarity: 'epic', difficulty: 4, desc: '任我行绝学吸人内力化为己用', source: '笑傲江湖' },
        { id: 'xiaowuxianggong', name: '小无相功', icon: '🌫️', type: 'defend', atkBonus: 0.05, defBonus: 0.18, rarity: 'epic', difficulty: 4, desc: '逍遥派绝学模仿天下武学', source: '天龙八部' },
        { id: 'changchungong', name: '长春功', icon: '♾️', type: 'defend', atkBonus: 0.04, defBonus: 0.16, rarity: 'rare', difficulty: 3, desc: '全真教长春真人王重阳所创内功', source: '射雕英雄传' },
        { id: 'zhuangong', name: '庄功', icon: '⛰️', type: 'defend', atkBonus: 0.02, defBonus: 0.15, rarity: 'rare', difficulty: 2, desc: '少林基础功法稳扎稳打', source: '天龙八部' },
        { id: 'babangliuhe', name: '八荒六合唯我独尊功', icon: '👑', type: 'defend', atkBonus: 0.12, defBonus: 0.22, rarity: 'legend', difficulty: 5, desc: '天山童姥绝学返老还童容颜永驻', source: '天龙八部' },
        { id: 'shenzhaojing', name: '神照经', icon: '💡', type: 'defend', atkBonus: 0.08, defBonus: 0.24, rarity: 'legend', difficulty: 5, desc: '金庸笔下最强疗伤神功起死回生', source: '碧血剑' },
        { id: 'hamagong', name: '蛤蟆功', icon: '🐸', type: 'defend', atkBonus: 0.10, defBonus: 0.20, rarity: 'legend', difficulty: 5, desc: '欧阳锋绝学蓄势待发以静制动', source: '射雕英雄传' },
        { id: 'qiankunerceng', name: '乾坤大挪移·二成', icon: '🌀', type: 'defend', atkBonus: 0.06, defBonus: 0.17, rarity: 'rare', difficulty: 3, desc: '阳顶天所悟乾坤大挪移残本', source: '倚天屠龙记' },
        { id: 'geludaofa', name: '割鹿刀法', icon: '⚔️', type: 'attack', atkBonus: 0.20, defBonus: 0.06, rarity: 'legend', difficulty: 5, desc: '萧十一郎绝学刀法天下第一', source: '萧十一郎' },
        { id: 'tianwaifeixian', name: '天外飞仙', icon: '⚡', type: 'attack', atkBonus: 0.23, defBonus: 0.04, rarity: 'legend', difficulty: 5, desc: '连城璧终极剑招快若闪电', source: '萧十一郎' }
    ];

    var BLACK_MARKET_WEAPONS = [
        { id: 'bm_dragon_slayer', name: '屠龙者', type: 'attack', rarity: 'rare', price: 500, value: 32, icon: 'resources/equipments/屠龙者·荣耀之剑.png', desc: '屠龙勇士的荣耀之剑' },
        { id: 'bm_shadow_blade', name: '影刃', type: 'attack', rarity: 'rare', price: 500, value: 30, icon: 'resources/equipments/影刃.png', desc: '暗影中的致命一击' },
        { id: 'bm_frost_armor', name: '寒冰甲', type: 'defend', rarity: 'rare', price: 500, value: 28, icon: 'resources/equipments/寒冰甲.png', desc: '冰封万里的防御' },
        { id: 'bm_phantom_shield', name: '幻影盾', type: 'defend', rarity: 'rare', price: 500, value: 26, icon: 'resources/equipments/幻影盾.png', desc: '虚幻莫测的防护' },
        { id: 'bm_inferno_sword', name: '烈焰剑', type: 'attack', rarity: 'epic', price: 700, value: 45, icon: 'resources/equipments/烈焰剑.png', desc: '焚烧一切的火焰之剑' },
        { id: 'bm_thunder_hammer', name: '雷神锤', type: 'attack', rarity: 'epic', price: 700, value: 43, icon: 'resources/equipments/雷神锤.png', desc: '雷霆万钧的神力' },
        { id: 'bm_divine_protection', name: '神圣庇护', type: 'defend', rarity: 'epic', price: 700, value: 40, icon: 'resources/equipments/神圣庇护.png', desc: '神明赐予的守护' },
        { id: 'bm_abyssal_guard', name: '深渊守卫', type: 'defend', rarity: 'epic', price: 700, value: 38, icon: 'resources/equipments/深渊守卫.png', desc: '来自深渊的强大防护' },
        { id: 'bm_void_blade', name: '虚空之刃', type: 'attack', rarity: 'epic', price: 750, value: 48, icon: 'resources/equipments/虚空之刃.png', desc: '撕裂空间的虚空之力' },
        { id: 'bm_time_dial', name: '时光之轮', type: 'defend', rarity: 'epic', price: 750, value: 42, icon: 'resources/equipments/时光之轮.png', desc: '时间停滞的绝对防御' },
        { id: 'bm_soul_reaper', name: '死神镰刀', type: 'attack', rarity: 'epic', price: 750, value: 50, icon: 'resources/equipments/死神镰刀.png', desc: '收割灵魂的恐怖武器' },
        { id: 'bm_angel_wings', name: '天使之翼', type: 'defend', rarity: 'epic', price: 750, value: 45, icon: 'resources/equipments/天使之翼.png', desc: '神圣天使的庇护之翼' },
        { id: 'bm_dragon_scale_armor', name: '龙鳞战甲', type: 'defend', rarity: 'legend', price: 900, value: 55, icon: 'resources/equipments/龙鳞战甲.png', desc: '远古巨龙遗落的鳞甲坚不可摧' },
        { id: 'bm_eternal_shield', name: '永恒之盾', type: 'defend', rarity: 'legend', price: 900, value: 58, icon: 'resources/equipments/永恒之盾.png', desc: '传说中永不破碎的神圣护盾' },
        { id: 'bm_void_barrier', name: '虚空屏障', type: 'defend', rarity: 'epic', price: 750, value: 44, icon: 'resources/equipments/虚空屏障.png', desc: '虚空之力构筑的绝对防御场' },
        { id: 'bm_crystal_mirror', name: '水晶魔镜', type: 'defend', rarity: 'rare', price: 500, value: 30, icon: 'resources/equipments/水晶魔镜.png', desc: '反射一切攻击的神秘魔镜' }
    ];

    var RARITY_NAMES = { common: '普通', elite: '精英', rare: '稀有', epic: '史诗', legend: '传说' };
    var MAX_ROUNDS = 10;
    var BASE_MAX_ATTACKS = 3;
    var cardUidCounter = 0;
    var isOnlineMode = false;
    var vsAnimationShown = false;

    function newCardUid() { return 'card_' + (++cardUidCounter) + '_' + Date.now(); }

    var game = {
        mode: 'dual', phase: 'start', currentPlayer: 'A', round: 1,
        playerA: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 1000 },
        playerB: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 1000 },
        firstAttacker: null, secondAttacker: null,
        weaponDrawCountA: 0, weaponDrawCountB: 0,
        selectedCardUid: null, soundEnabled: true, voiceEnabled: true, bgmEnabled: false,
        bgmVolume: 0, sfxVolume: 80,
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
        tableCards: [],
        noDefendFlag: false,
        noDefendUsedThisRound: false,
        usedSkillsThisRound: {},
        blockAbilityA: false,
        blockAbilityB: false,
        attackReduction: 0,
        tempDefenseReduction: 0,
        pendingSkills: [],
        nextTurnNoDefend: { A: false, B: false },
        currentTurnIndex: 0,
        characterBonus: { A: { atkBonus: 0, defBonus: 0 }, B: { atkBonus: 0, defBonus: 0 } },
        martialArts: { A: [], B: [] },
        synthesisState: { slotA: null, slotB: null, isProcessing: false, playerPid: null },
        cultivationState: { selectedArtId: null, isProcessing: false, playerPid: null }
    };

    var audioCtx = null;
    var bgMusic = null;
    var battleBgMusic = null;
    var bgMusicPlaying = false;

    function getAudioCtx() {
        if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
        return audioCtx;
    }

    function playBgMusic() {
        if (bgMusicPlaying && bgMusic) return;
        try {
            if (!bgMusic) {
                bgMusic = new Audio('resources/music/偷功.flac');
                bgMusic.loop = true;
                bgMusic.volume = 0.4;
            }
            bgMusic.play().then(function() {
                bgMusicPlaying = true;
                console.log('[音乐] ✅ 背景音乐开始播放（偷功）');
            }).catch(function(e) {
                console.warn('[音乐] ⚠️ 自动播放被阻止:', e);
            });
        } catch (e) {
            console.error('[音乐] ❌ 播放失败:', e);
        }
    }

    function playBattleBgMusic() {
        try {
            if (!battleBgMusic) {
                battleBgMusic = new Audio('resources/music/清心普善咒.flac');
                battleBgMusic.loop = true;
                battleBgMusic.volume = 0.4;
            }
            battleBgMusic.play().then(function() {
                bgMusicPlaying = true;
                console.log('[音乐] ✅ 对战背景音乐开始播放（清心普善咒）');
            }).catch(function(e) {
                console.warn('[音乐] ⚠️ 自动播放被阻止:', e);
            });
        } catch (e) {
            console.error('[音乐] ❌ 播放失败:', e);
        }
    }

    function switchToBattleMusic() {
        stopBgMusic();
        setTimeout(function() {
            if (game.bgmEnabled) playBattleBgMusic();
        }, 100);
    }

    function stopBgMusic() {
        var stopped = false;
        if (bgMusic) {
            try {
                bgMusic.pause();
                bgMusic.currentTime = 0;
                stopped = true;
                console.log('[音乐] ⏹️ 角色选择背景音乐已停止');
            } catch (e) {
                console.error('[音乐] ⚠️ 停止失败:', e);
            }
        }
        if (battleBgMusic) {
            try {
                battleBgMusic.pause();
                battleBgMusic.currentTime = 0;
                stopped = true;
                console.log('[音乐] ⏹️ 对战背景音乐已停止');
            } catch (e) {
                console.error('[音乐] ⚠️ 停止失败:', e);
            }
        }
        if (stopped) bgMusicPlaying = false;
    }

    function toggleBgMusic(shouldPlay) {
        if (shouldPlay) {
            if (game.phase === 'battle') {
                playBattleBgMusic();
            } else {
                playBgMusic();
            }
        } else {
            stopBgMusic();
        }
    }

    function updateBgmVolume(vol) {
        var volume = vol / 100;
        if (bgMusic) bgMusic.volume = volume;
        if (battleBgMusic) battleBgMusic.volume = volume;
        console.log('[音乐] 🎵 背景音乐音量调整为：' + vol + '%');
    }

    function updateSfxVolume(vol) {
        game.sfxVolumeMultiplier = vol / 80;
        console.log('[音效] 🔊 音效音量调整为：' + vol + '%');
    }

    function playSound(type) {
        if (!game.soundEnabled) return;
        try {
            var ctx = getAudioCtx(); if (!ctx) return;
            if (ctx.state === 'suspended') ctx.resume().catch(function() {});
            var osc = ctx.createOscillator(), gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            var multiplier = game.sfxVolumeMultiplier || 1;
            switch (type) {
                case 'click': osc.frequency.value = 800; osc.type = 'sine'; gain.gain.value = 0.08 * multiplier; osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.05); break;
                case 'spin': osc.frequency.value = 400; osc.type = 'sawtooth'; gain.gain.value = 0.06 * multiplier; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.3); osc.stop(ctx.currentTime + 0.35); break;
                case 'result': osc.frequency.value = 523; osc.type = 'sine'; gain.gain.value = 0.1 * multiplier; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12); osc.frequency.setValueAtTime(784, ctx.currentTime + 0.24); osc.stop(ctx.currentTime + 0.4); break;
                case 'attack': osc.frequency.value = 200; osc.type = 'sawtooth'; gain.gain.value = 0.12 * multiplier; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.15); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25); osc.stop(ctx.currentTime + 0.25); break;
                case 'defend': osc.frequency.value = 600; osc.type = 'triangle'; gain.gain.value = 0.08 * multiplier; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.12); osc.stop(ctx.currentTime + 0.15); break;
                case 'damage': osc.frequency.value = 150; osc.type = 'square'; gain.gain.value = 0.1 * multiplier; osc.start(ctx.currentTime); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25); osc.stop(ctx.currentTime + 0.25); break;
                case 'dice': osc.frequency.value = 300; osc.type = 'triangle'; gain.gain.value = 0.08 * multiplier; osc.start(ctx.currentTime); for (var i = 0; i < 6; i++) osc.frequency.setValueAtTime(300 + Math.random() * 400, ctx.currentTime + i * 0.06); osc.stop(ctx.currentTime + 0.4); break;
                case 'win': osc.frequency.value = 523; osc.type = 'sine'; gain.gain.value = 0.1 * multiplier; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(659, ctx.currentTime + 0.15); osc.frequency.setValueAtTime(784, ctx.currentTime + 0.3); osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.45); osc.stop(ctx.currentTime + 0.7); break;
                case 'lose': osc.frequency.value = 400; osc.type = 'sine'; gain.gain.value = 0.08 * multiplier; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.4); osc.stop(ctx.currentTime + 0.5); break;
                case 'pk': osc.frequency.value = 300; osc.type = 'sawtooth'; gain.gain.value = 0.15 * multiplier; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.1); osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.3); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4); osc.stop(ctx.currentTime + 0.4); break;
                case 'rare': osc.frequency.value = 660; osc.type = 'sine'; gain.gain.value = 0.1 * multiplier; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.3); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); osc.stop(ctx.currentTime + 0.5); break;
                case 'epic': osc.frequency.value = 440; osc.type = 'sine'; gain.gain.value = 0.12 * multiplier; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1); osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2); osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.35); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6); osc.stop(ctx.currentTime + 0.6); break;
                case 'bonus': osc.frequency.value = 880; osc.type = 'triangle'; gain.gain.value = 0.1 * multiplier; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1); osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.2); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4); osc.stop(ctx.currentTime + 0.4); break;
                case 'coin': osc.frequency.value = 1200; osc.type = 'sine'; gain.gain.value = 0.08 * multiplier; osc.start(ctx.currentTime); osc.frequency.setValueAtTime(1400, ctx.currentTime + 0.08); osc.frequency.setValueAtTime(1600, ctx.currentTime + 0.15); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25); osc.stop(ctx.currentTime + 0.25); break;
                case 'skill': osc.frequency.value = 300; osc.type = 'sawtooth'; gain.gain.value = 0.12 * multiplier; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.2); osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.4); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); osc.stop(ctx.currentTime + 0.5); break;
                default: osc.frequency.value = 440; osc.type = 'sine'; gain.gain.value = 0.05 * multiplier; osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.08);
            }
        } catch (e) { }
    }

    var zhVoiceCached = null;
    var voicesLoaded = false;

    function loadVoices() {
        if (!('speechSynthesis' in window)) return;
        try {
            var voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                voicesLoaded = true;
                zhVoiceCached = voices.find(function (v) { return v.lang.indexOf('zh') >= 0; }) || voices[0];
            }
        } catch (e) {}
    }

    var speakQueue = [];
    var isSpeaking = false;

    function speak(text) {
        if (!game.voiceEnabled) return;
        try {
            if (!('speechSynthesis' in window)) return;
            var synth = window.speechSynthesis;
            var utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'zh-CN'; utter.rate = 1.1; utter.pitch = 1.0; utter.volume = 0.9;
            if (zhVoiceCached) {
                utter.voice = zhVoiceCached;
            } else {
                var voices = synth.getVoices();
                var zhVoice = voices.find(function (v) { return v.lang.indexOf('zh') >= 0; });
                if (zhVoice) { utter.voice = zhVoice; zhVoiceCached = zhVoice; }
            }
            utter.onend = function () {
                isSpeaking = false;
                if (speakQueue.length > 0) {
                    var next = speakQueue.shift();
                    doSpeak(next);
                }
            };
            utter.onerror = function () {
                isSpeaking = false;
                if (speakQueue.length > 0) {
                    var next = speakQueue.shift();
                    doSpeak(next);
                }
            };
            if (isSpeaking) {
                synth.cancel();
                isSpeaking = false;
            }
            doSpeak(utter);
        } catch (e) {}
    }

    function doSpeak(utter) {
        try {
            var synth = window.speechSynthesis;
            var ctx = getAudioCtx();
            if (ctx && ctx.state === 'suspended') ctx.resume();
            isSpeaking = true;
            synth.speak(utter);
        } catch (e) {
            isSpeaking = false;
        }
    }

    function waitForSpeech(callback, minDelay) {
        minDelay = minDelay || 0;
        if (!isSpeaking) {
            setTimeout(callback, minDelay);
            return;
        }
        var startTime = Date.now();
        var checkInterval = setInterval(function () {
            if (!isSpeaking || Date.now() - startTime > 5000) {
                clearInterval(checkInterval);
                var elapsed = Date.now() - startTime;
                var remaining = minDelay - elapsed;
                setTimeout(callback, Math.max(0, remaining));
            }
        }, 100);
    }

    function stopSpeech() {
        try {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        } catch (e) {}
        isSpeaking = false;
        speakQueue = [];
    }

    function $(id) { return document.getElementById(id); }
    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(function (s) {
            s.classList.remove('active');
            s.style.display = 'none';
        });
        var target = $(id);
        if (target) {
            target.classList.add('active');
            target.style.display = 'flex';
        }
    }
    function showSection(id) { document.querySelectorAll('.battle-section').forEach(function (s) { s.classList.add('hidden'); }); $(id).classList.remove('hidden'); var ca = $('center-actions'); if (ca) ca.innerHTML = ''; }
    function showModal(html) { $('modal-content').innerHTML = html; $('modal-overlay').classList.remove('hidden'); }
    function hideModal() { $('modal-overlay').classList.add('hidden'); }

    function showCardPreview(card) {
        var typeLabel = card.type === 'attack' ? '攻击' : '防御';
        var valueLabel = card.type === 'attack' ? '伤害' : '防御';
        var rarityName = RARITY_NAMES[card.rarity] || card.rarity;
        var desc = card.desc || '';
        var valueColor = card.type === 'attack' ? (card.rarity === 'legendary' ? '#ffffff' : '#e74c3c') : (card.rarity === 'legendary' ? '#ffffff' : '#3498db');
        var skillHtml = '';
        if (card.skill) {
            skillHtml = '<div style="margin-top:16px;padding:10px 16px;background:rgba(156,39,176,0.2);border:1px solid rgba(156,39,176,0.5);border-radius:8px;font-size:13px;color:#ce93d8;line-height:1.6;">' +
                '<span style="font-size:16px;">' + card.skill.icon + '</span> <strong style="font-size:14px;">' + card.skill.name + '</strong>：<br/>' + card.skill.desc + '</div>';
        }
        var iconFontSize = isImageEmoji(card.icon) ? '70px' : '56px';
        $('card-preview').innerHTML =
            '<div class="weapon-card rarity-' + card.rarity + '" style="transform:scale(1.7);margin:20px auto;min-width:220px;min-height:340px;padding-bottom:15px;">' +
            '<span class="card-type ' + card.type + '" style="font-size:12px;padding:2px 6px;border-radius:4px;">' + typeLabel + '</span>' +
            '<span class="card-icon" style="font-size:' + iconFontSize + ';margin:2px 0;display:block;">' + renderEmoji(card.icon).replace(/<img /, '<img style="width:2.2em!important;height:2.2em!important;object-fit:contain;" ') + '</span>' +
            '<span class="card-name" style="font-size:15px;font-weight:800;display:block;margin-top:6px;' + (card.rarity === 'legendary' ? 'color:#ffffff;text-shadow:0 1px 4px rgba(0,0,0,0.8);' : '') + '">' + card.name + '</span>' +
            '<span class="card-value" style="font-size:18px;font-weight:900;color:' + valueColor + ';text-shadow:0 0 8px ' + valueColor + '66;margin:2px 0;display:block;">⚔ ' + valueLabel + ' <strong>' + card.value + '</strong></span>' +
            '<span class="card-price" style="font-size:11px;font-weight:600;display:block;margin-top:4px;' + (card.rarity === 'legendary' ? 'color:#ffe082;text-shadow:0 1px 3px rgba(0,0,0,0.6);' : '') + '">💰' + card.price + ' · ' + rarityName + '</span></div>' +
            '<div style="margin-top:28px;padding:14px 20px;max-width:400px;text-align:center;">' +
            (desc ? '<div style="font-size:14px;color:var(--text-dim);margin-bottom:12px;line-height:1.5;border-bottom:1px solid rgba(212,168,67,0.2);padding-bottom:10px;">' + desc + '</div>' : '') +
            skillHtml +
            '<div style="margin-top:18px;font-size:12px;color:rgba(255,255,255,0.25);">点击任意位置关闭</div>' +
            '</div>';
        $('card-preview-overlay').classList.remove('hidden');
    }

    function showSelectCardPreview(card) {
        var el = $('select-card-preview');
        if (!el || !card) return;
        var typeLabel = card.type === 'attack' ? '攻击' : '防御';
        var valueLabel = card.type === 'attack' ? '伤害' : '防御';
        var rarityName = RARITY_NAMES[card.rarity] || card.rarity;
        var desc = card.desc || '';
        var valueColor = card.type === 'attack' ? '#e74c3c' : '#3498db';
        var nameStyle = card.rarity === 'legendary' ? 'color:#ffffff;text-shadow:0 1px 4px rgba(0,0,0,0.8);' : '';
        var iconFontSize = isImageEmoji(card.icon) ? '28px' : '24px';
        var skillHtml = '';
        if (card.skill) {
            skillHtml = '<div class="scp-skill"><span class="scp-skill-name">' + card.skill.icon + ' ' + card.skill.name + '</span>：' + card.skill.desc + '</div>';
        }
        el.innerHTML =
            '<div class="scp-card">' +
                '<div class="scp-icon-wrap weapon-card rarity-' + card.rarity + '">' +
                    '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
                    '<span class="card-icon" style="font-size:' + iconFontSize + ';">' + renderEmoji(card.icon).replace(/<img /, '<img style="width:1.6em!important;height:1.6em!important;object-fit:contain;" ') + '</span>' +
                    '<span class="card-name" style="' + nameStyle + '">' + card.name + '</span>' +
                    '<span class="card-value" style="color:' + valueColor + ';text-shadow:0 0 6px ' + valueColor + '44;">⚔ ' + valueLabel + ' <strong>' + card.value + '</strong></span>' +
                '</div>' +
                '<div class="scp-info">' +
                    '<div class="scp-name-row"><span class="scp-name" style="' + nameStyle + '">' + card.name + '</span><span class="scp-rarity">' + rarityName + '</span></div>' +
                    '<div class="scp-value-row" style="color:' + valueColor + ';">💰 ' + card.price + ' · ⚔ ' + valueLabel + ': <strong>' + card.value + '</strong></div>' +
                    (desc ? '<div class="scp-desc">' + desc + '</div>' : '') +
                    skillHtml +
                '</div>' +
            '</div>' +
            '<div class="scp-hint">点击桌面任意处关闭</div>';
        el.classList.remove('hidden');
    }
    function hideSelectCardPreview() {
        var el = $('select-card-preview');
        if (el) el.classList.add('hidden');
    }

    function createCardHTML(card, selectable) {
        var cls = 'weapon-card rarity-' + card.rarity;
        if (selectable) cls += ' selectable';
        var typeLabel = card.type === 'attack' ? '攻击' : '防御';
        var valueLabel = card.type === 'attack' ? '伤害' : '防御';
        var skillIcon = card.skill ? ' ' + card.skill.icon : '';
        return '<div class="' + cls + '" data-uid="' + card.uid + '">' +
            '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
            '<span class="card-icon">' + renderEmoji(card.icon) + '</span>' +
            '<span class="card-name">' + card.name + skillIcon + '</span>' +
            '<span class="card-value">' + valueLabel + ':' + card.value + '</span>' +
            '<span class="card-price">💰' + card.price + '</span></div>';
    }

    function createMiniCardHTML(card, isNew) {
        var extraCls = isNew ? ' library-new' : '';
        var skillIcon = card.skill ? card.skill.icon : '';
        return '<div class="weapon-card mini rarity-' + card.rarity + extraCls + '" data-uid="' + card.uid + '" title="' + card.name + ' ' + (card.type === 'attack' ? '伤害' : '防御') + ':' + card.value + (card.skill ? ' 技能:' + card.skill.name : '') + '">' +
'<span class="card-icon">' + renderEmoji(card.icon) + '</span><span class="card-value">' + card.value + '</span>' +
            (card.skill ? '<span class="card-skill-icon">' + skillIcon + '</span>' : '') +
            '</div>';
    }

    function getPlayer(pid) { return pid === 'A' ? game.playerA : game.playerB; }
    function findCardByUid(player, uid) { return player.library.find(function (c) { return c.uid === uid; }); }
    function playerLabel(pid) { return pid === 'A' ? '玩家A' : '玩家B'; }
    function pPrefix(pid) { return pid === 'A' ? 'a' : 'b'; }

    function opBtn(pid, btnId) { return $('btn-' + pPrefix(pid) + '-' + btnId); }

    function getWeaponWeight(wp) {
        var rarityWeights = { common: 25, elite: 20, rare: 15, epic: 10, legend: 5 };
        var baseWeight = rarityWeights[wp.rarity] || 20;
        var valueFactor = Math.max(5, 30 - wp.value);
        return Math.max(1, baseWeight + valueFactor);
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

    function hideAllOps(keepButtons) {
        clearTradeActiveState();
        keepButtons = keepButtons || [];
        ['a', 'b'].forEach(function (p) {
            var pid = p.toUpperCase();
            ['spin-weapon', 'confirm-card', 'skip-defend', 'continue-attack', 'end-attack', 'continue', 'sell', 'buy', 'synthesis', 'cultivation'].forEach(function (b) {
                var btnId = 'btn-' + p + '-' + b;
                var el = $(btnId);
                if (el) {
                    if (keepButtons.indexOf(btnId) > -1) return;
                    el.style.display = 'none';
                    el.disabled = false;
                }
            });
            var status = $('ops-' + p + '-status');
            if (status) {
                if (isOnlineMode && !canIOperate(pid)) {
                    status.textContent = '⏳ 等待对方操作...';
                } else {
                    status.textContent = '';
                }
            }
        });
    }

    function showOp(pid, btnId, opts) {
        if (isOnlineMode && !canIOperate(pid)) {
            setOpsStatus(pid, '⏳ 等待对方操作...');
            return;
        }
        opts = opts || {};
        var el = opBtn(pid, btnId);
        if (el) {
            el.style.display = 'block';
            el.disabled = !!opts.disabled;
            if (opts.text !== undefined) {
                if (opts.html) {
                    el.innerHTML = opts.text;
                } else {
                    el.textContent = opts.text;
                }
            }
            if (btnId === 'spin-weapon') {
                ['confirm-card', 'skip-defend', 'continue-attack', 'end-attack', 'continue'].forEach(function (b) {
                    var btn = opBtn(pid, b);
                    if (btn) { btn.style.display = 'none'; btn.disabled = false; }
                });
            }
        }
    }

    function setOpsStatus(pid, text) {
        var el = $('ops-' + pPrefix(pid) + '-status');
        if (el) {
            if (isOnlineMode && !canIOperate(pid)) {
                el.textContent = '⏳ 等待对方操作...';
            } else {
                el.textContent = text;
            }
        }
    }

    function updateGoldDisplay() {
        var a = game.playerA, b = game.playerB;
        var elA = $('player-a-gold'), elB = $('player-b-gold');
        if (elA) elA.textContent = a.gold;
        if (elB) elB.textContent = b.gold;
    }

    function updatePlayerInfo() {
        var a = game.playerA, b = game.playerB;
        if (a.char) {
            $('player-a-avatar').innerHTML = renderEmoji(a.char.emoji);
            $('player-a-char').textContent = a.char.name;
            $('player-a-hp-text').innerHTML = a.hp.toFixed(1) + '/' + a.maxHp + ' <span class="hp-heart-icon">❤️</span>';
            $('player-a-hp-bar').style.width = (a.hp / a.maxHp * 100) + '%';
            var aAbility = game.blockAbilityA ? '🚫 技能被封印' : generateAbilityDesc(a.char);
            $('player-a-ability').textContent = aAbility;
        }
        if (b.char) {
            $('player-b-avatar').innerHTML = renderEmoji(b.char.emoji);
            $('player-b-char').textContent = b.char.name;
            $('player-b-hp-text').innerHTML = b.hp.toFixed(1) + '/' + b.maxHp + ' <span class="hp-heart-icon">❤️</span>';
            $('player-b-hp-bar').style.width = (b.hp / b.maxHp * 100) + '%';
            var bAbility = game.blockAbilityB ? '🚫 技能被封印' : generateAbilityDesc(b.char);
            $('player-b-ability').textContent = bAbility;
        }
        $('round-number').textContent = '第' + game.round + '轮';
        updateGoldDisplay();
        updateLibraryDisplay();
        renderLearnedMartialArts('A');
        renderLearnedMartialArts('B');

        if (isOnlineMode) {
            var myPid = Multiplayer.getMyRole();
            var otherPid = myPid === 'A' ? 'B' : 'A';
            var myPanel = $('panel-' + myPid.toLowerCase());
            var otherPanel = $('panel-' + otherPid.toLowerCase());
            if (myPanel) myPanel.classList.remove('hidden');
            if (otherPanel) otherPanel.classList.add('hidden');
            var opponentInfoEl = $('opponent-char-info');
            var opponent = otherPid === 'A' ? game.playerA : game.playerB;
            if (opponentInfoEl && opponent && opponent.char) {
                opponentInfoEl.innerHTML = '<span class="opponent-char-name">' + renderEmoji(opponent.char.emoji) + ' ' + opponent.char.name + '</span> HP:' + opponent.hp.toFixed(1) + '/' + opponent.maxHp + ' <span class="hp-heart-icon">❤️</span>';
            }
        } else {
            $('panel-a').classList.remove('hidden');
            $('panel-b').classList.remove('hidden');
        }
    }

    function generateAbilityDesc(char) {
        if (!char) return '';
        var art = char.signatureArt;
        if (!art) return '无特殊加成';
        var parts = [art.icon + ' ' + art.name];
        if (char.atkBonus > 0) parts.push('攻+' + Math.round(char.atkBonus * 100) + '%');
        if (char.defBonus > 0) parts.push('防+' + Math.round(char.defBonus * 100) + '%');
        return parts.join(' ');
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

        function setupHoverDelegate(container) {
            container.onmouseenter = function (e) {
                var target = e.target.closest('.weapon-card.mini');
                if (target) {
                    var card = findCardByUid(player, target.getAttribute('data-uid'));
                    if (card) showCardPreview(card);
                }
            };
            container.onmouseleave = function (e) {
                var target = e.target.closest('.weapon-card.mini');
                if (target) {
                    $('card-preview-overlay').classList.add('hidden');
                }
            };
            container.onclick = function (e) {
                var target = e.target.closest('.weapon-card.mini');
                if (target) {
                    var card = findCardByUid(player, target.getAttribute('data-uid'));
                    if (card) showCardPreview(card);
                    e.stopPropagation();
                }
            };
        }

        setupHoverDelegate(atkC);
        setupHoverDelegate(defC);
    }

    function setActivePlayer(pid) {
        game.currentPlayer = pid;
        var panelA = $('panel-a'), panelB = $('panel-b');
        if (panelA) { panelA.classList.toggle('active-panel', pid === 'A'); panelA.classList.toggle('inactive-panel', pid !== 'A'); }
        if (panelB) { panelB.classList.toggle('active-panel', pid === 'B'); panelB.classList.toggle('inactive-panel', pid !== 'B'); }
        $('player-a-info').classList.toggle('active-turn', pid === 'A');
        $('player-b-info').classList.toggle('active-turn', pid === 'B');
        if (isOnlineMode) {
            var myPid = Multiplayer.getMyRole();
            if (pid === myPid) {
                $('action-hint').textContent = '🎯 轮到你操作 - ' + playerLabel(pid);
            } else {
                $('action-hint').textContent = '⏳ 等待 ' + playerLabel(pid) + ' 操作...';
            }
        }
    }

    function announcePlayerTurn(pid, action) { var p = getPlayer(pid); speak(playerLabel(pid) + '，' + (p.char ? p.char.name : '') + '，' + action); }
    function switchPlayer() { var next = game.currentPlayer === 'A' ? 'B' : 'A'; setActivePlayer(next); $('action-hint').textContent = '已切换至' + playerLabel(next) + '操作'; }
    function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function getMaxAttacks() { return Math.max(1, BASE_MAX_ATTACKS + game.bonusAttacks - game.attackReduction); }

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
            html += '<div class="table-card-item" data-uid="' + c.uid + '">' +
                '<div class="table-card-player">' + (entry.playerPid === 'A' ? 'A' : 'B') + '</div>' +
                '<div class="weapon-card rarity-' + c.rarity + ' table-card">' +
                '<span class="card-type ' + c.type + '">' + typeLabel + '</span>' +
                '<span class="card-icon">' + renderEmoji(c.icon) + '</span>' +
                '<span class="card-name">' + c.name + '</span>' +
                '<span class="card-value">' + valueLabel + ':' + c.value + '</span>' +
                '</div></div>';
        });
        el.innerHTML = html;

        el.querySelectorAll('.table-card-item').forEach(function (itemEl) {
            itemEl.style.cursor = 'pointer';
            itemEl.addEventListener('click', function () {
                var uid = itemEl.getAttribute('data-uid');
                var entry = game.tableCards.find(function (e) { return e.card.uid === uid; });
                if (entry) showCardPreview(entry.card);
            });
        });
    }

    var wheelAngle = 0, wheelSpinning = false, wheelBlinkFrame = 0, diceRolled = false, autoSpinning = false;
    var countdownTimer = null, countdownSeconds = 0, countdownMaxSeconds = 0;

    function showCountdown(seconds, onTimeout) {
        clearCountdown();
        countdownMaxSeconds = seconds;
        countdownSeconds = seconds;
        var existingEl = document.getElementById('countdown-display');
        if (!existingEl) {
            var el = document.createElement('div');
            el.id = 'countdown-display';
            el.style.cssText = 'position:fixed;top:16px;right:20px;background:rgba(0,0,0,0.9);color:#fff;padding:6px 16px;border-radius:10px;font-size:18px;font-weight:bold;z-index:9999;border:2px solid #ffd700;min-width:76px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.5);font-family:inherit;';
            document.body.appendChild(el);
        }
        updateCountdownDisplay();
        countdownTimer = setInterval(function () {
            countdownSeconds--;
            updateCountdownDisplay();
            if (countdownSeconds <= 0) {
                clearCountdown();
                if (onTimeout) onTimeout();
            }
        }, 1000);
    }

    function updateCountdownDisplay() {
        var el = document.getElementById('countdown-display');
        if (!el) return;
        var pct = countdownSeconds / countdownMaxSeconds;
        var color = pct > 0.5 ? '#4caf50' : (pct > 0.2 ? '#ff9800' : '#f44336');
        el.style.borderColor = color;
        el.textContent = '⏱️ ' + countdownSeconds + 's';
    }

    function clearCountdown() {
        if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
        var el = document.getElementById('countdown-display');
        if (el) { el.remove(); }
    }

    var opponentWaitTimer = null, opponentWaitSeconds = 0, opponentWaitMaxSeconds = 0;
    function showOpponentWaitCountdown(seconds) {
        clearOpponentWaitCountdown();
        opponentWaitMaxSeconds = seconds;
        opponentWaitSeconds = seconds;
        var existingEl = document.getElementById('opponent-wait-display');
        if (!existingEl) {
            var el = document.createElement('div');
            el.id = 'opponent-wait-display';
            el.style.cssText = 'position:absolute;top:10px;left:12px;background:rgba(0,0,0,0.85);color:#fff;padding:6px 14px;border-radius:8px;font-size:15px;font-weight:bold;z-index:100;border:2px solid #e53935;min-width:140px;text-align:center;box-shadow:0 3px 10px rgba(0,0,0,0.5);font-family:inherit;pointer-events:none;';
            document.body.appendChild(el);
            positionOpponentWaitDisplay(el);
        }
        updateOpponentWaitDisplay();
        opponentWaitTimer = setInterval(function () {
            opponentWaitSeconds--;
            updateOpponentWaitDisplay();
            if (opponentWaitSeconds <= 0) {
                clearOpponentWaitCountdown();
            }
        }, 1000);
    }
    function positionOpponentWaitDisplay(el) {
        var area = $('card-select-area');
        if (area && area.offsetParent !== null) {
            var rect = area.getBoundingClientRect();
            el.style.position = 'fixed';
            el.style.top = (rect.top + 10) + 'px';
            el.style.left = (rect.left + 12) + 'px';
        } else {
            var tableArea = $('table-cards-area');
            if (tableArea && tableArea.offsetParent !== null) {
                var tRect = tableArea.getBoundingClientRect();
                el.style.position = 'fixed';
                el.style.top = (tRect.top + 10) + 'px';
                el.style.left = (tRect.left + 12) + 'px';
            } else {
                el.style.position = 'fixed';
                el.style.top = '70px';
                el.style.left = '20px';
            }
        }
    }
    function updateOpponentWaitDisplay() {
        var el = document.getElementById('opponent-wait-display');
        if (!el) return;
        positionOpponentWaitDisplay(el);
        var pct = opponentWaitSeconds / opponentWaitMaxSeconds;
        var color = pct > 0.5 ? '#e53935' : (pct > 0.2 ? '#ff9800' : '#f44336');
        el.style.borderColor = color;
        el.textContent = '⏳ 等待对方出牌 ' + opponentWaitSeconds + 's';
    }
    function clearOpponentWaitCountdown() {
        if (opponentWaitTimer) { clearInterval(opponentWaitTimer); opponentWaitTimer = null; }
        var el = document.getElementById('opponent-wait-display');
        if (el) { el.remove(); }
    }

    function drawWheel(canvasId, items) {
        var canvas = $(canvasId); if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2;
        var outerR = Math.min(cx, cy);
        var rimW = outerR * 0.08;
        var r = outerR - rimW - 4;
        var n = items.length; if (n === 0) return; var arc = (2 * Math.PI) / n;
        ctx.clearRect(0, 0, w, h);

        ctx.save(); ctx.translate(cx, cy); ctx.rotate(wheelAngle);

        var segColorsA = '#ffffff', segColorsB = '#f0f0f0';
        var rarityColors = {
            rare: { fill: '#1565c0', stroke: 'rgba(255,255,255,0.4)', glow: 'rgba(21,101,192,0.4)' },
            epic: { fill: '#7b1fa2', stroke: 'rgba(255,255,255,0.5)', glow: 'rgba(123,31,162,0.5)' },
            legend: { fill: '#e65100', stroke: 'rgba(255,215,0,0.6)', glow: 'rgba(230,81,0,0.6)' }
        };
        for (var i = 0; i < n; i++) {
            var sa = i * arc - Math.PI / 2, ea = sa + arc;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, sa, ea); ctx.closePath();
            if (items[i].rarity && rarityColors[items[i].rarity]) {
                var rc = rarityColors[items[i].rarity];
                ctx.fillStyle = rc.fill;
                ctx.shadowColor = rc.glow; ctx.shadowBlur = 15;
                ctx.fill(); ctx.shadowBlur = 0;
                ctx.strokeStyle = rc.stroke; ctx.lineWidth = 2; ctx.stroke();
            } else {
                ctx.fillStyle = i % 2 === 0 ? segColorsA : segColorsB; ctx.fill();
                ctx.strokeStyle = 'rgba(210,150,80,0.25)'; ctx.lineWidth = 1.5; ctx.stroke();
            }
            ctx.save(); ctx.rotate(sa + arc / 2);
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            if (items[i].rarity && rarityColors[items[i].rarity]) {
                ctx.fillStyle = '#ffffff'; ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 3;
            } else {
                ctx.fillStyle = '#4a2c17'; ctx.shadowColor = 'rgba(74,44,23,0.5)'; ctx.shadowBlur = 3;
            }
            var nameFontSize = n > 12 ? 26 : n > 8 ? 32 : 40;
            ctx.font = 'bold ' + nameFontSize + 'px "Noto Sans SC", sans-serif';
            var label = items[i].name || items[i]; if (label.length > 5) label = label.substring(0, 5);
            ctx.fillText(label, r * 0.82, 0);
            ctx.restore();
        }

        var centerR = w > 400 ? outerR * 0.16 : outerR * 0.14;
        ctx.beginPath(); ctx.arc(0, 0, centerR + 3, 0, 2 * Math.PI); ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill();
        ctx.beginPath(); ctx.arc(0, 0, centerR, 0, 2 * Math.PI);
        var cGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, centerR);
        cGrad.addColorStop(0, '#ff6b5b'); cGrad.addColorStop(1, '#e74c3c');
        ctx.fillStyle = cGrad; ctx.fill();
        ctx.strokeStyle = 'rgba(255,220,200,0.7)'; ctx.lineWidth = 3; ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.font = 'bold ' + (w > 400 ? 20 : 15) + 'px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowBlur = 0;
        ctx.fillText('幸运抽', 0, 0);
        ctx.restore();

        ctx.save(); ctx.translate(cx, cy);
        ctx.beginPath(); ctx.arc(0, 0, outerR, 0, 2 * Math.PI);
        ctx.arc(0, 0, outerR - rimW, 0, 2 * Math.PI, true);
        var rimGrad = ctx.createLinearGradient(-outerR, -outerR, outerR, outerR);
        rimGrad.addColorStop(0, '#f5a623'); rimGrad.addColorStop(0.35, '#ffd27a'); rimGrad.addColorStop(0.65, '#f5a623'); rimGrad.addColorStop(1, '#d4881a');
        ctx.fillStyle = rimGrad; ctx.fill();

        var dotCount = n > 12 ? 24 : n > 8 ? 20 : 16;
        for (var d = 0; d < dotCount; d++) {
            var da = (d / dotCount) * Math.PI * 2 - Math.PI / 2;
            var dr = outerR - rimW / 2;
            var dotR = rimW * 0.32;
            ctx.beginPath(); ctx.arc(Math.cos(da) * dr, Math.sin(da) * dr, dotR, 0, 2 * Math.PI);
            if (wheelSpinning) {
                var blinkPhase = Math.floor(wheelBlinkFrame / 6);
                var isLit = (d + blinkPhase) % 2 === 0;
                ctx.fillStyle = isLit ? '#fff9e6' : '#a8e6cf';
                ctx.globalAlpha = isLit ? 0.95 : 0.3;
            } else {
                var dotColors = ['#fff9e6', '#a8e6cf', '#fff9e6', '#a8e6cf'];
                ctx.fillStyle = dotColors[d % dotColors.length]; ctx.globalAlpha = 0.85;
            }
            ctx.fill(); ctx.globalAlpha = 1;
        }
        ctx.restore();
    }

    function spinWheel(canvasId, items, targetIndex, callback, angleOffset) {
        if (wheelSpinning) return; wheelSpinning = true; playSound('spin');
        var n = items.length;
        var arc = (2 * Math.PI) / n;
        var offset = angleOffset || 0;
        var targetAngle = (2 * Math.PI) - (targetIndex * arc + arc / 2) + Math.PI / 2 + offset;
        var fullRotations = Math.PI * 2 * randomInt(8, 14);
        var totalRot = fullRotations + targetAngle - (wheelAngle % (Math.PI * 2));
        if (totalRot < fullRotations) totalRot += Math.PI * 2;
        var dur = 5500, st = null, sa = wheelAngle;
        var lastTickAngle = sa;

        function anim(ts) {
            if (!st) st = ts; var el = ts - st; var pr = Math.min(el / dur, 1);
            var eased = 1 - Math.pow(1 - pr, 4);
            wheelAngle = sa + totalRot * eased;
            wheelBlinkFrame++;
            drawWheel(canvasId, items);

            var currentTickAngle = wheelAngle % (Math.PI * 2);
            var tickArc = arc;
            if (Math.floor(currentTickAngle / tickArc) !== Math.floor(lastTickAngle / tickArc)) {
                if (game.soundEnabled) {
                    try {
                        var ctx2 = getAudioCtx(); if (ctx2) {
                            if (ctx2.state === 'suspended') ctx2.resume().catch(function() {});
                            var o = ctx2.createOscillator(), g = ctx2.createGain();
                            o.connect(g); g.connect(ctx2.destination);
                            o.frequency.value = 600 + Math.random() * 200; o.type = 'sine'; g.gain.value = 0.03;
                            o.start(ctx2.currentTime); o.stop(ctx2.currentTime + 0.02);
                        }
                    } catch (e) { }
                }
            }
            lastTickAngle = currentTickAngle;

            if (pr < 1) { requestAnimationFrame(anim); }
            else { wheelSpinning = false; wheelBlinkFrame = 0; playSound('result'); callback(items[targetIndex], targetIndex); }
        }
        requestAnimationFrame(anim);
    }

    function initStartScreen() {
        $('btn-dual').addEventListener('click', function () { playSound('click'); game.mode = 'dual'; isOnlineMode = false; startCharacterSelect(); });
        $('btn-online').addEventListener('click', function () {
            playSound('click');
            initLobby();
            showScreen('screen-lobby');
        });
        $('btn-sound').addEventListener('click', function () {
            game.soundEnabled = !game.soundEnabled;
            game.voiceEnabled = game.soundEnabled;
            $('btn-sound').textContent = game.soundEnabled ? '🔊 音效：开' : '🔇 音效：关';
            if (game.soundEnabled) playSound('click');
            syncSoundButtons();
        });
        $('btn-bgm').addEventListener('click', function () {
            game.bgmEnabled = !game.bgmEnabled;
            $('btn-bgm').textContent = game.bgmEnabled ? '🎵 音乐：开' : '🔇 音乐：关';
            toggleBgMusic(game.bgmEnabled);
            if (game.soundEnabled) playSound('click');
            syncSoundSliders();
        });
        initBattleSoundSliders();
        syncSoundSliders();
    }

    function syncSoundSliders() {
        var bgmBtn = $('btn-bgm'), sfxBtn = $('btn-sound');
        if (bgmBtn) {
            bgmBtn.textContent = game.bgmEnabled ? '🎵 音乐：开' : '🔇 音乐：关';
        }
        if (sfxBtn) {
            sfxBtn.textContent = game.soundEnabled ? '🔊 音效：开' : '🔇 音效：关';
        }

        var sliders = [
            { slider: $('slider-bgm-a'), value: $('value-bgm-a') },
            { slider: $('slider-bgm-b'), value: $('value-bgm-b') },
            { slider: $('slider-sfx-a'), value: $('value-sfx-a') },
            { slider: $('slider-sfx-b'), value: $('value-sfx-b') }
        ];

        sliders.forEach(function(item) {
            if (item.slider) {
                if (item.slider.id.indexOf('bgm') >= 0) {
                    item.slider.value = game.bgmVolume;
                    if (item.value) item.value.textContent = game.bgmVolume + '%';
                    item.slider.disabled = !game.bgmEnabled;
                } else {
                    item.slider.value = game.sfxVolume;
                    if (item.value) item.value.textContent = game.sfxVolume + '%';
                    item.slider.disabled = !game.soundEnabled;
                }
            }
        });
    }

    function initBattleSoundSliders() {
        var bgmSliders = ['slider-bgm-a', 'slider-bgm-b'];
        var sfxSliders = ['slider-sfx-a', 'slider-sfx-b'];

        bgmSliders.forEach(function(id) {
            var slider = $(id);
            if (slider) {
                slider.addEventListener('input', function() {
                    var vol = parseInt(this.value);
                    game.bgmVolume = vol;
                    updateBgmVolume(vol);
                    syncSoundSliders();
                });
            }
        });

        sfxSliders.forEach(function(id) {
            var slider = $(id);
            if (slider) {
                slider.addEventListener('input', function() {
                    var vol = parseInt(this.value);
                    game.sfxVolume = vol;
                    updateSfxVolume(vol);
                    syncSoundSliders();
                });
            }
        });
    }

    var charSelectState = {
        phase: 'scrolling',
        selectedA: null,
        selectedB: null,
        cardElements: []
    };

    function startCharacterSelect() {
        try {
        game.phase = 'character-select'; game.currentPlayer = 'A'; game.usedCharIds = [];
        vsAnimationShown = false;
        charSelectState = { phase: 'scrolling', selectedA: null, selectedB: null, cardElements: [] };
        showScreen('screen-character');
        $('char-select-title').textContent = '⚔️ 侠客卡牌';
        $('char-result-old').classList.add('hidden');
        $('char-grid-area').classList.add('hidden');
        $('char-selection-info').classList.add('hidden');
        $('char-scroll-area').classList.remove('hidden');
        buildScrollingCards();
        showFlipButton();
        speak('侠客卡牌巡礼中');
        if (game.bgmEnabled) playBgMusic();
        clearCountdown();
        clearOpponentWaitCountdown();
        setTimeout(function () {
            var btn = document.getElementById('btn-flip-cards');
            if (btn) btn.click();
        }, 10000);
        } catch (e) { handleError('startCharacterSelect', e); }
    }

    function showFlipButton() {
        var existing = document.getElementById('btn-flip-cards');
        if (existing) existing.remove();
        var btn = document.createElement('button');
        btn.id = 'btn-flip-cards';
        btn.className = 'btn btn-primary btn-large';
        btn.textContent = '🎴 翻面选卡 (10s)';
        btn.style.cssText = 'position:absolute;bottom:30px;left:50%;transform:translateX(-50%);z-index:20;animation:fadeInUp 0.4s ease;';
        var countdown = 10;
        var timer = setInterval(function () {
            countdown--;
            if (countdown <= 0) { clearInterval(timer); return; }
            if (btn && btn.parentNode) btn.textContent = '🎴 翻面选卡 (' + countdown + 's)';
        }, 1000);
        btn.addEventListener('click', function () {
            clearInterval(timer);
            playSound('click');
            startFlipAndShuffle();
        });
        $('char-card-stage').appendChild(btn);
    }

    function hideFlipButton() {
        var btn = document.getElementById('btn-flip-cards');
        if (btn) { btn.remove(); }
    }

    function buildScrollingCards() {
        var topRow = $('char-scroll-top');
        var bottomRow = $('char-scroll-bottom');
        topRow.innerHTML = ''; bottomRow.innerHTML = '';
        charSelectState.cardElements = [];
        var shuffled = CHARACTERS.slice().sort(function () { return Math.random() - 0.5; });
        var topChars = [];
        var bottomChars = [];
        shuffled.forEach(function (c, i) {
            if (i % 2 === 0) topChars.push(c);
            else bottomChars.push(c);
        });

        topChars.forEach(function (c) { topRow.appendChild(createCharCardEl(c)); });
        bottomChars.forEach(function (c) { bottomRow.appendChild(createCharCardEl(c)); });

        var cloneCount = 3;
        for (var c = 0; c < cloneCount; c++) {
            topChars.forEach(function (ch) { topRow.appendChild(createCharCardEl(ch, true)); });
            bottomChars.forEach(function (ch) { bottomRow.appendChild(createCharCardEl(ch, true)); });
        }
    }

    function createCharCardEl(charData, isClone) {
        var card = document.createElement('div');
        card.className = 'char-card' + (isClone ? ' clone-card' : '');
        card.dataset.charId = charData.id;
        if (!isClone) charSelectState.cardElements.push(card);

        var bgImageStyle = isImageEmoji(charData.emoji) ? ' style="background-image:url(' + charData.emoji + ')" class="char-card-front has-bg-image"' : ' class="char-card-front"';
        card.innerHTML =
            '<div class="char-card-inner">' +
            '<div' + bgImageStyle + '>' +
            '<div class="card-rarity-bar"></div>' +
            '<div class="card-emoji">' + renderEmoji(charData.emoji, true) + '</div>' +
            '<div class="card-char-name">' + charData.name + '</div>' +
            '<div class="card-hp-badge">❤️ ' + charData.hp + ' HP</div>' +
            '<div class="card-sig-art">' + charData.signatureArt.icon + ' ' + charData.signatureArt.name + '</div>' +
            '</div>' +
            '<div class="char-card-back"></div>' +
            '</div>';

        return card;
    }

    function startFlipAndShuffle() {
        hideFlipButton();
        $('char-select-hint').textContent = '🔄 卡牌翻面中...';
        var scrollArea = $('char-scroll-area');
        scrollArea.classList.add('scrolling-paused');

        var topCards = document.querySelectorAll('#char-scroll-top .char-card');
        var bottomCards = document.querySelectorAll('#char-scroll-bottom .char-card');

        var flipDelay = 50;
        topCards.forEach(function (card, idx) {
            setTimeout(function () {
                card.classList.add('flipped');
            }, idx * flipDelay);
        });

        bottomCards.forEach(function (card, idx) {
            setTimeout(function () {
                card.classList.add('flipped');
            }, (topCards.length * flipDelay) + (idx * flipDelay));
        });

        var totalCards = topCards.length + bottomCards.length;
        var totalFlipTime = totalCards * flipDelay + 1200;
        setTimeout(function () {
            transitionToGrid();
        }, totalFlipTime);
    }

    function transitionToGrid() {
        $('char-select-hint').textContent = '🎴 请选择你的侠客！';
        $('char-scroll-area').classList.add('hidden');

        var grid = $('char-grid');
        grid.innerHTML = '';
        $('char-grid-area').classList.remove('hidden');

        var shuffledForGrid = CHARACTERS.slice().sort(function () { return Math.random() - 0.5; });

        shuffledForGrid.forEach(function (c, idx) {
            var card = createCharCardEl(c);
            card.classList.add('grid-deal-anim');
            card.style.setProperty('--deal-rotate', ((Math.random() - 0.5) * 60) + 'deg');
            card.style.setProperty('--deal-x', ((Math.random() - 0.5) * 400) + 'px');
            card.style.setProperty('--deal-y', ((Math.random() - 0.5) * 300) + 'px');
            grid.appendChild(card);

            setTimeout(function () {
                card.classList.add('flipped');
                card.classList.add('dealt');
            }, idx * 70);
        });

        setTimeout(function () {
            enableCardSelection();
        }, shuffledForGrid.length * 70 + 400);
    }

    function enableCardSelection() {
        charSelectState.phase = isOnlineMode ? 'select-both' : 'select-A';
        $('char-selection-info').classList.remove('hidden');
        updateSelectionUI();
        bindCardClickEvents();
        if (!isOnlineMode) {
            speak('请玩家A选择一张侠客卡牌');
        } else if (canIOperate('A') || canIOperate('B')) {
            speak('请选择你的侠客卡牌');
            highlightSelectableCards();
            $('char-select-hint').textContent = '🎴 请选择你的侠客！';
        } else {
            $('char-select-hint').textContent = '⏳ 等待其他玩家...';
        }
    }

    function updateSelectionUI() {
        var dispA = $('char-selected-a');
        var dispB = $('char-selected-b');
        dispA.classList.remove('player-a-turn', 'player-b-turn');
        dispB.classList.remove('player-a-turn', 'player-b-turn');

        if (isOnlineMode && charSelectState.phase === 'select-both') {
            var myRole = Multiplayer.getMyRole();
            if (!charSelectState.selectedA || !charSelectState.selectedB) {
                if (myRole === 'A' && !charSelectState.selectedA) {
                    $('char-select-hint').textContent = '🔴 玩家A 请选择你的侠客';
                    dispA.classList.add('player-a-turn');
                } else if (myRole === 'B' && !charSelectState.selectedB) {
                    $('char-select-hint').textContent = '🔵 玩家B 请选择你的侠客';
                    dispB.classList.add('player-b-turn');
                } else if (!charSelectState.selectedA && !charSelectState.selectedB) {
                    $('char-select-hint').textContent = '🎴 双方请同时选择侠客';
                    dispA.classList.add('player-a-turn');
                    dispB.classList.add('player-b-turn');
                } else {
                    $('char-select-hint').textContent = '⏳ 等待对方选择...';
                    if (charSelectState.selectedA) dispB.classList.add('player-b-turn');
                    else dispA.classList.add('player-a-turn');
                }
            }
        } else if (charSelectState.phase === 'select-A') {
            $('char-select-hint').textContent = isOnlineMode && !canIOperate('A') ? '⏳ 等待房主(A)选择...' : '🔴 玩家A 请选择你的侠客';
            dispA.classList.add('player-a-turn');
        } else if (charSelectState.phase === 'select-B') {
            $('char-select-hint').textContent = isOnlineMode && !canIOperate('B') ? '⏳ 等待访客(B)选择...' : '🔵 玩家B 请选择你的侠客';
            dispB.classList.add('player-b-turn');
        } else if (charSelectState.phase === 'done') {
            $('char-select-hint').textContent = '✨ 选择完成！进入对战...';
        }
    }

    function bindCardClickEvents() {
        var cards = document.querySelectorAll('.char-grid .char-card');
        cards.forEach(function (card) {
            card.removeEventListener('click', handleCardClick);
            card.addEventListener('click', handleCardClick);
        });
    }

    function handleCardClick(e) {
        var card = e.currentTarget;
        if (charSelectState.phase !== 'select-A' && charSelectState.phase !== 'select-B' && charSelectState.phase !== 'select-both') return;
        if (card.classList.contains('disabled') || card.classList.contains('selected')) return;

        if (isOnlineMode) {
            if (charSelectState.phase === 'select-A' && !canIOperate('A')) return;
            if (charSelectState.phase === 'select-B' && !canIOperate('B')) return;
            if (charSelectState.phase === 'select-both') {
                var myRole = Multiplayer.getMyRole();
                if (myRole === 'A' && charSelectState.selectedA) return;
                if (myRole === 'B' && charSelectState.selectedB) return;
                if (myRole !== 'A' && myRole !== 'B') return;
            }
        }

        var charId = card.dataset.charId;
        var ch = CHARACTERS.find(function (c) { return c.id === charId; });
        if (!ch) return;

        playSound('pk');
        card.classList.remove('selectable-glow');

        showCardSpotlight(card, ch, function () {
            card.classList.add('selected', 'flipped');
            card.style.transform = 'none';
            var inner = card.querySelector('.char-card-inner');
            if (inner) {
                inner.style.transform = 'rotateY(180deg)';
                inner.style.webkitTransform = 'rotateY(180deg)';
            }

            var myRole = Multiplayer.getMyRole();
            if ((charSelectState.phase === 'select-A' || (charSelectState.phase === 'select-both' && myRole === 'A')) && !charSelectState.selectedA) {
                charSelectState.selectedA = ch;
                game.playerA.char = ch; game.playerA.hp = ch.hp; game.playerA.maxHp = ch.maxHp;
                game.usedCharIds.push(ch.id);
                showSelectedChar('char-selected-a', ch);

                if (!isOnlineMode) {
                    charSelectState.phase = 'select-B';
                    disableOtherCards();
                    updateSelectionUI();
                    setTimeout(function () {
                        var remaining = document.querySelectorAll('.char-grid .char-card:not(.selected)');
                        remaining.forEach(function (c) { c.classList.remove('disabled'); c.classList.add('selectable-glow'); });
                        updateSelectionUI();
                        speak(ch.name + '，' + ch.voiceLine + '。请玩家B选择');
                    }, 300);
                } else {
                    speak(ch.name + '，' + ch.voiceLine);
                    notifyPeer('char-spin-result', { charId: charId, phase: 'selected-A' });
                    checkBothSelected();
                }
            } else if ((charSelectState.phase === 'select-B' || (charSelectState.phase === 'select-both' && myRole === 'B')) && !charSelectState.selectedB) {
                charSelectState.selectedB = ch;
                game.playerB.char = ch; game.playerB.hp = ch.hp; game.playerB.maxHp = ch.maxHp;
                game.usedCharIds.push(ch.id);
                showSelectedChar('char-selected-b', ch);

                if (!isOnlineMode) {
                    charSelectState.phase = 'done';
                    disableAllCards();
                    updateSelectionUI();
                    speak(ch.name + '，' + ch.voiceLine);
                    waitForSpeech(function () { clearCountdown(); showVSAnimation(); }, 3000);
                } else {
                    speak(ch.name + '，' + ch.voiceLine);
                    notifyPeer('char-spin-result', { charId: charId, phase: 'selected-B' });
                    checkBothSelected();
                }
            }
        });
    }

    function checkBothSelected() {
        if (isOnlineMode && charSelectState.selectedA && charSelectState.selectedB) {
            charSelectState.phase = 'done';
            disableAllCards();
            updateSelectionUI();
            waitForSpeech(function () { clearCountdown(); showVSAnimation(); }, 800);
        } else {
            updateSelectionUI();
        }
    }

    function showCardSpotlight(cardEl, charData, callback) {
        var stage = $('char-grid-area');
        if (!stage) { if (callback) callback(); return; }

        var overlay = document.createElement('div');
        overlay.className = 'card-spotlight-overlay';
        var spotClass = isImageEmoji(charData.emoji) ? 'card-spotlight-card has-bg-image' : 'card-spotlight-card';
        var spotStyle = isImageEmoji(charData.emoji) ? ' style="background-image:url(' + charData.emoji + ')"' : '';
        overlay.innerHTML =
            '<div class="card-spotlight-content">' +
            '<div class="' + spotClass + '"' + spotStyle + '>' +
            '<div class="card-rarity-bar"></div>' +
            '<div class="card-emoji">' + renderEmoji(charData.emoji) + '</div>' +
            '<div class="card-char-name">' + charData.name + '</div>' +
            '<div class="card-hp-badge">❤️ ' + charData.hp + ' HP</div>' +
            '<div class="card-sig-art">' + charData.signatureArt.icon + ' ' + charData.signatureArt.name + '</div>' +
            '</div>' +
            '<div class="card-spotlight-name">✨ ' + charData.name + ' ✨</div>' +
            '</div>';

        document.body.appendChild(overlay);
        playSound('rare');

        setTimeout(function () {
            overlay.classList.add('spotlight-fadeout');
            setTimeout(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                if (callback) callback();
            }, 400);
        }, 2000);
    }

    function showSelectedChar(containerId, ch) {
        var container = document.querySelector('#' + containerId + ' .selected-char-card');
        container.className = 'selected-char-card filled';
        if (isImageEmoji(ch.emoji)) {
            container.innerHTML =
                '<div style="display:flex;flex-direction:column;align-items:center;width:100%;height:100%;background-image:url(' + ch.emoji + ');background-size:cover;background-position:top center;border-radius:8px;position:relative;">' +
                '<div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(180deg,rgba(15,23,41,0.7) 0%,rgba(15,23,41,0.2) 40%,transparent 55%,rgba(15,23,41,0.75) 100%);border-radius:8px;"></div>' +
                '<span style="font-family:\'Ma Shan Zheng\',cursive;font-size:13px;color:#ffd700;margin-top:4px;position:relative;z-index:1;text-shadow:0 1px 5px rgba(0,0,0,0.95);letter-spacing:1px;">' + ch.name + '</span>' +
                '</div>';
        } else {
            container.innerHTML =
                '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;background:linear-gradient(145deg,#2a1f4e,#1a1a3e);border-radius:8px;">' +
                '<span style="font-size:28px;">' + renderEmoji(ch.emoji) + '</span>' +
                '<span style="font-family:\'Ma Shan Zheng\',cursive;font-size:13px;color:var(--gold-light);margin-top:2px;">' + ch.name + '</span>' +
                '</div>';
        }
    }

    function disableOtherCards() {
        var cards = document.querySelectorAll('.char-grid .char-card');
        cards.forEach(function (c) {
            if (!c.classList.contains('selected')) c.classList.add('disabled');
        });
    }

    function disableAllCards() {
        var cards = document.querySelectorAll('.char-grid .char-card');
        cards.forEach(function (c) { c.classList.add('disabled'); c.classList.remove('selectable-glow'); });
    }

    function highlightSelectableCards() {
        var cards = document.querySelectorAll('.char-grid .char-card:not(.selected):not(.disabled)');
        cards.forEach(function (c) { c.classList.add('selectable-glow'); });
    }

    function updateCharSelectUI() {
        if (charSelectState.phase === 'scrolling') {
            $('char-select-hint').textContent = '⚔️ 侠客卡牌巡礼中...';
        } else if (charSelectState.phase === 'flipping') {
            $('char-select-hint').textContent = '🔄 翻面洗牌...';
        } else if (charSelectState.phase === 'select-both') {
            $('char-select-hint').textContent = '🎴 双方请同时选择侠客';
        } else if (charSelectState.phase === 'select-A') {
            $('char-select-hint').textContent = '🔴 玩家A 请选择你的侠客';
        } else if (charSelectState.phase === 'select-B') {
            $('char-select-hint').textContent = '🔵 玩家B 请选择你的侠客';
        } else if (charSelectState.phase === 'done') {
            $('char-select-hint').textContent = '✨ 选择完成！';
        }
    }

    function initCharacterSelect() {
        $('btn-char-confirm').addEventListener('click', function () {
            playSound('click');
            if (isOnlineMode && !canIOperate(game.currentPlayer)) return;
        });
    }

    function autoConfirmChar() {
        if (charSelectState.phase === 'done' && game.playerA.char && game.playerB.char) {
            clearCountdown(); showVSAnimation(); notifyPeer('char-confirm', { from: game.currentPlayer });
        }
    }

    function showVSAnimation() {
        console.log('[ VS ] showVSAnimation 被调用');
        stopBgMusic();

        if (vsAnimationShown) {
            console.warn('[ VS ] VS动画已经显示过，跳过重复调用');
            return;
        }

        var a = game.playerA, b = game.playerB;
        console.log('[ VS ] 玩家A角色:', a.char ? a.char.name : 'null', '玩家B角色:', b.char ? b.char.name : 'null');

        if (!a.char || !b.char) {
            console.warn('[ VS ] 角色数据不完整，延迟执行');
            setTimeout(function () { showVSAnimation(); }, 500);
            return;
        }

        vsAnimationShown = true;
        console.log('[ VS ] 设置 vsAnimationShown = true，开始显示VS动画');

        $('vs-container').innerHTML =
            '<div class="vs-fighter vs-left">' +
            '<div class="vs-emoji">' + renderEmoji(a.char.emoji) + '</div>' +
            '<div class="vs-name">' + a.char.name + '</div>' +
            '<div class="vs-player">玩家A</div>' +
            '<div class="vs-hp">' + generateAbilityDesc(a.char) + '</div>' +
            '</div>' +
            '<div class="vs-text">PK</div>' +
            '<div class="vs-fighter vs-right">' +
            '<div class="vs-emoji">' + renderEmoji(b.char.emoji) + '</div>' +
            '<div class="vs-name">' + b.char.name + '</div>' +
            '<div class="vs-player">玩家B</div>' +
            '<div class="vs-hp">' + generateAbilityDesc(b.char) + '</div>' +
            '</div>';
        showScreen('screen-vs');
        playSound('pk');
        speak(a.char.name + ' 对阵 ' + b.char.name);
        console.log('[ VS ] isOnlineMode:', isOnlineMode, 'isGuest():', Multiplayer.isGuest());
        if (isOnlineMode && Multiplayer.isGuest()) {
            waitForSpeech(function () {
                $('vs-container').innerHTML = '<p style="color:var(--text-dim);font-size:16px;">等待房主同步游戏数据...</p>';
                console.log('[ VS ] 显示等待房主同步...');
            }, 3000);
        } else {
            waitForSpeech(function () {
                console.log('[ VS ] 语音播完后调用 startBattle()');
                startBattle();
            }, 3000);
        }
    }

    function updateSingleStatusBar(statusBarId, roomIdElId, peerStatusElId, peerTextElId, customText) {
        var statusBar = $(statusBarId);
        if (!statusBar) return;

        var hasRoom = !!Multiplayer.getRoomId();
        if (!isOnlineMode && !hasRoom) {
            statusBar.classList.add('hidden');
            return;
        }

        statusBar.classList.remove('hidden');

        var roomIdEl = $(roomIdElId);
        var peerStatusEl = $(peerStatusElId);
        var peerTextEl = $(peerTextElId);
        var peerDotEl = peerStatusEl ? peerStatusEl.querySelector('.peer-status-dot-small') : null;

        if (roomIdEl) {
            roomIdEl.textContent = Multiplayer.getRoomId() || '未知';
        }

        if (customText) {
            if (peerTextEl) peerTextEl.textContent = customText;
            if (peerDotEl) { peerDotEl.classList.remove('connected'); peerDotEl.classList.add('reconnecting'); }
        } else if (Multiplayer.isConnected()) {
            if (peerDotEl) { peerDotEl.classList.add('connected'); peerDotEl.classList.remove('reconnecting'); }
            if (peerTextEl) {
                peerTextEl.textContent = '对方已连接';
                peerTextEl.classList.add('connected');
            }
        } else {
            if (peerDotEl) { peerDotEl.classList.remove('connected', 'reconnecting'); }
            if (peerTextEl) {
                peerTextEl.textContent = hasRoom ? '等待连接...' : '未连接';
                peerTextEl.classList.remove('connected');
            }
        }
    }

    function updateOnlineStatusBar(customText) {
        updateSingleStatusBar('online-status-bar', 'battle-room-id', 'battle-peer-status', 'battle-peer-text', customText);
        updateSingleStatusBar('char-online-status-bar', 'char-room-id', 'char-peer-status', 'char-peer-text', customText);
    }

    function startBattle() {
        try {
        console.log('[ Battle ] startBattle 被调用');
        game.phase = 'battle'; game.round = 1;
        game.playerA.library = []; game.playerB.library = [];
        game.playerA.roundCards = []; game.playerB.roundCards = [];
        game.playerA.gold = 3000; game.playerB.gold = 3000;
        var atkWeapons = WEAPONS.filter(function (w) { return w.type === 'attack'; });
        var defWeapons = WEAPONS.filter(function (w) { return w.type === 'defend'; });
        ['A', 'B'].forEach(function (pid) {
            var player = getPlayer(pid);
            for (var i = 0; i < 5; i++) {
                var aw = atkWeapons[Math.floor(Math.random() * atkWeapons.length)];
                var ac = Object.assign({}, aw); ac.uid = newCardUid();
                player.library.push(ac);
            }
            for (var j = 0; j < 5; j++) {
                var dw = defWeapons[Math.floor(Math.random() * defWeapons.length)];
                var dc = Object.assign({}, dw); dc.uid = newCardUid();
                player.library.push(dc);
            }
        });
        game.totalDamageA = 0; game.totalDamageB = 0;
        game.allRoundLogs = []; game.roundLog = [];
        game.noDefendFlag = false; game.noDefendUsedThisRound = false; game.usedSkillsThisRound = {};
        game.weaponDrawCountA = 0; game.weaponDrawCountB = 0;
        game.currentAttackIndex = 0; game.bonusAttacks = 0;
        game.phaseAttacker = null; game.phaseDefender = null; game.isCounterPhase = false;
        game.currentAttackCard = null; game.currentDefendCard = null; game.selectedCardUid = null;

        updateAttackProgress();
        game.blockAbilityA = false; game.blockAbilityB = false;
        game.attackReduction = 0; game.tempDefenseReduction = 0;
        clearTableCards(); clearBattleLog();
        showScreen('screen-battle'); updatePlayerInfo(); updateLibraryDisplay([]);
        switchToBattleMusic();
        $('btn-switch-player').style.display = 'none';
        updateOnlineStatusBar();
        speak('对战开始');
        if (isOnlineMode && Multiplayer.isHost()) {
            var initState = {
                libraryA: game.playerA.library.map(function (c) { return { id: c.id, uid: c.uid, type: c.type }; }),
                libraryB: game.playerB.library.map(function (c) { return { id: c.id, uid: c.uid, type: c.type }; }),
                goldA: game.playerA.gold,
                goldB: game.playerB.gold
            };
            console.log('[ Battle ] 发送 battle-init 消息给对方');
            console.log('[ Battle ] libraryA 长度:', initState.libraryA.length, 'libraryB 长度:', initState.libraryB.length);
            console.log('[ Battle ] libraryA 示例:', initState.libraryA.slice(0, 2));
            console.log('[ Battle ] libraryB 示例:', initState.libraryB.slice(0, 2));
            notifyPeer('battle-init', initState);
        } else {
            console.log('[ Battle ] 不是房主，不发送 battle-init');
        }
        startWeaponDrawPhase();
        } catch (e) { handleError('startBattle', e); }
    }

    function startWeaponDrawPhase() {
        game.phase = 'weapon-draw';
        game._weaponDrawDone = false;
        game.weaponDrawCountA = 0; game.weaponDrawCountB = 0;
        game.playerA.roundCards = []; game.playerB.roundCards = []; game.selectedCardUid = null;
        clearBattleLog();
        clearTableCards();
        showSection('weapon-draw-area');
        updateAttackProgress();
        hideAllOps();
        var panelA = $('panel-a'), panelB = $('panel-b');
        if (!isOnlineMode) {
            if (panelA) { panelA.style.display = 'flex'; }
            if (panelB) { panelB.style.display = 'none'; }
            game.currentPlayer = 'A';
        } else {
            if (panelA) { panelA.classList.remove('inactive-panel'); panelA.classList.add('active-panel'); }
            if (panelB) { panelB.classList.remove('inactive-panel'); panelB.classList.add('active-panel'); }
        }
        updateWeaponDrawUI();
        $('action-hint').textContent = '第' + game.round + '轮 - 武器抽取阶段（玩家A先抽取）';
        updateWeaponDrawHint(); wheelAngle = 0; drawWeaponWheel();
        $('drawn-cards').innerHTML = '';
        clearCountdown();
        var needCountdown = (!isOnlineMode || canIOperate('A') || canIOperate('B'));
        if (needCountdown) {
            showCountdown(10, function () {
                if (game.phase !== 'weapon-draw' || wheelSpinning) return;
                if ((!isOnlineMode || canIOperate('A')) && game.weaponDrawCountA < 3) {
                    spinWheelForPlayer('A');
                } else if ((!isOnlineMode || canIOperate('B')) && game.weaponDrawCountB < 3) {
                    spinWheelForPlayer('B');
                }
            });
        }
    }

    function updateWeaponDrawUI() {
        var weaponWheelEl = document.querySelector('#weapon-draw-area .wheel-container');
        var panelA = $('panel-a'), panelB = $('panel-b');

        if (!isOnlineMode) {
            var currentPid = game.currentPlayer || 'A';
            if (currentPid === 'A') {
                if (game.weaponDrawCountA >= 3) { showOp('A', 'spin-weapon', { disabled: true }); }
                else { showOp('A', 'spin-weapon'); }
                setOpsStatus('A', game.weaponDrawCountA >= 3 ? '✅ 已完成' : '请抽取武器');
                if (panelA) { panelA.style.display = 'flex'; }
                if (panelB) { panelB.style.display = 'none'; }
            } else if (currentPid === 'B') {
                if (game.weaponDrawCountB >= 3) { showOp('B', 'spin-weapon', { disabled: true }); }
                else { showOp('B', 'spin-weapon'); }
                setOpsStatus('B', game.weaponDrawCountB >= 3 ? '✅ 已完成' : '请抽取武器');
                if (panelB) { panelB.style.display = 'flex'; }
                if (panelA) { panelA.style.display = 'none'; }
            }
            if (weaponWheelEl) { weaponWheelEl.style.opacity = '1'; weaponWheelEl.style.pointerEvents = 'auto'; }
            if (currentPid === 'A' && game.weaponDrawCountA < 3) {
                $('action-hint').textContent = '🎯 第' + game.round + '轮 - 玩家A抽取武器（' + (3 - game.weaponDrawCountA) + '次剩余）';
            } else if (currentPid === 'B' && game.weaponDrawCountB < 3) {
                $('action-hint').textContent = '🎯 第' + game.round + '轮 - 玩家B抽取武器（' + (3 - game.weaponDrawCountB) + '次剩余）';
            } else if (game.weaponDrawCountA >= 3 && game.weaponDrawCountB >= 3) {
                $('action-hint').textContent = ' 第' + game.round + '轮 - 武器抽取完成';
            }
        } else {
            if (canIOperate('A')) {
                if (game.weaponDrawCountA >= 3) { showOp('A', 'spin-weapon', { disabled: true }); }
                else { showOp('A', 'spin-weapon'); }
                setOpsStatus('A', game.weaponDrawCountA >= 3 ? '✅ 已完成' : '请抽取武器');
            } else {
                if (game.weaponDrawCountA >= 3) { showOp('A', 'spin-weapon', { disabled: true }); }
                setOpsStatus('A', game.weaponDrawCountA >= 3 ? '✅ 已完成' : '⏳ 对方抽取中...');
            }
            if (canIOperate('B')) {
                if (game.weaponDrawCountB >= 3) { showOp('B', 'spin-weapon', { disabled: true }); }
                else { showOp('B', 'spin-weapon'); }
                setOpsStatus('B', game.weaponDrawCountB >= 3 ? '✅ 已完成' : '请抽取武器');
            } else {
                if (game.weaponDrawCountB >= 3) { showOp('B', 'spin-weapon', { disabled: true }); }
                setOpsStatus('B', game.weaponDrawCountB >= 3 ? '✅ 已完成' : '⏳ 对方抽取中...');
            }
            if (weaponWheelEl) { weaponWheelEl.style.opacity = '1'; weaponWheelEl.style.pointerEvents = 'auto'; }
        }

        var myPid = isOnlineMode ? (Multiplayer.isHost() ? 'A' : 'B') : null;
        var myCount = myPid === 'A' ? game.weaponDrawCountA : (myPid === 'B' ? game.weaponDrawCountB : null);
        if (myPid && myCount !== null) {
            if (myCount >= 3) {
                $('action-hint').textContent = '🎯 第' + game.round + '轮 - 你已完成抽取，等待对方...';
            } else {
                $('action-hint').textContent = '🎯 第' + game.round + '轮 - 请抽取武器（' + (3 - myCount) + '次剩余）';
            }
        }
    }

    function updateWeaponDrawHint() {
        var aName = getPlayer('A').char.name;
        var bName = getPlayer('B').char.name;
        $('weapon-draw-hint').textContent = '玩家A（' + aName + '）：' + game.weaponDrawCountA + '/3  |  玩家B（' + bName + '）：' + game.weaponDrawCountB + '/3';
    }

    function drawWeaponWheel() {
        var mapped = WEAPONS.map(function (w) { return { name: w.name, id: w.id, icon: w.icon, rarity: w.rarity }; });
        var groups = {}; for (var g = 0; g < mapped.length; g++) {
            var rk = mapped[g].rarity || 'common';
            if (!groups[rk]) groups[rk] = []; groups[rk].push(mapped[g]);
        }
        var rarityOrder = ['common', 'elite', 'rare', 'epic', 'legend'];
        var spread = []; var maxLen = 0;
        for (var ro = 0; ro < rarityOrder.length; ro++) if (groups[rarityOrder[ro]] && groups[rarityOrder[ro]].length > maxLen) maxLen = groups[rarityOrder[ro]].length;
        for (var idx = 0; idx < maxLen; idx++) {
            for (var ri = 0; ri < rarityOrder.length; ri++) {
                if (groups[rarityOrder[ri]] && idx < groups[rarityOrder[ri]].length) spread.push(groups[rarityOrder[ri]][idx]);
            }
        }
        drawWheel('weapon-wheel', spread);
    }

    function spinWheelForPlayer(pid) {
        try {
            if (wheelSpinning) return;
            if (isOnlineMode && !canIOperate(pid)) return;
            var countVar = pid === 'A' ? 'weaponDrawCountA' : 'weaponDrawCountB';
            if (game[countVar] >= 3) return;
            clearCountdown();
            var btn = opBtn(pid, 'spin-weapon');
            if (btn) btn.disabled = true;
            var mapped = WEAPONS.map(function (w) { return { name: w.name, id: w.id, icon: w.icon, rarity: w.rarity }; });
            var groups = {}; for (var g2 = 0; g2 < mapped.length; g2++) {
                var rk2 = mapped[g2].rarity || 'common';
                if (!groups[rk2]) groups[rk2] = []; groups[rk2].push(mapped[g2]);
            }
            var rarityOrder2 = ['common', 'elite', 'rare', 'epic', 'legend'];
            var wi = []; var maxLen2 = 0;
            for (var ro2 = 0; ro2 < rarityOrder2.length; ro2++) if (groups[rarityOrder2[ro2]] && groups[rarityOrder2[ro2]].length > maxLen2) maxLen2 = groups[rarityOrder2[ro2]].length;
            for (var idx2 = 0; idx2 < maxLen2; idx2++) {
                for (var ri2 = 0; ri2 < rarityOrder2.length; ri2++) {
                    if (groups[rarityOrder2[ri2]] && idx2 < groups[rarityOrder2[ri2]].length) wi.push(groups[rarityOrder2[ri2]][idx2]);
                }
            }
            var selectedWp = weightedRandomWeapon();
            var targetIdx = wi.findIndex(function (item) { return item.id === selectedWp.id; });
            spinWheel('weapon-wheel', wi, targetIdx, function (sel) {
                try {
                    var wp = selectedWp;
                    var drawn = Object.assign({}, wp); drawn.uid = newCardUid();
                    var player = getPlayer(pid);
                    player.roundCards.push(drawn); player.library.push(drawn);
                    game[countVar]++;
                    console.log('[ Weapon ] 本地抽取武器:', drawn.name, 'uid:', drawn.uid, 'player:', pid, 'count:', game[countVar]);
                    console.log('[ Weapon ] 玩家', pid, '库大小:', player.library.length);
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
                    var skillTag = '';
                    if (drawn.skill) {
                        skillTag = '<div style="margin-top:6px;padding:4px 8px;background:rgba(156,39,176,0.2);border:1px solid rgba(156,39,176,0.5);border-radius:4px;font-size:11px;color:#ce93d8;">' + drawn.skill.icon + ' ' + drawn.skill.name + '：' + drawn.skill.desc + '</div>';
                    }
                    $('drawn-cards').innerHTML = highlightTag + '<div class="' + cardCls + '" data-uid="' + drawn.uid + '">' +
                        '<span class="card-type ' + drawn.type + '">' + typeLabel + '</span>' +
                        '<span class="card-icon">' + renderEmoji(drawn.icon) + '</span>' +
                        '<span class="card-name">' + drawn.name + '</span>' +
                        '<span class="card-value">' + valueLabel + ':' + drawn.value + '</span>' +
                        '<span class="card-price">💰' + drawn.price + '</span></div>' + skillTag;
                    var cardEl = $('drawn-cards').querySelector('.weapon-card');
                    if (cardEl) cardEl.addEventListener('click', function () { showCardPreview(drawn); });
                    updateLibraryDisplay([drawn.uid]);
                    console.log('[ Weapon ] 联机模式仅同步抽卡进度(不暴露卡牌内容)');
                    notifyPeer('weapon-draw-progress', { player: pid });
                    var delay = isRare ? 2500 : 1200;
                    waitForSpeech(function () {
                        try {
                            $('drawn-cards').innerHTML = '';
                            afterWeaponDrawAction(pid);
                        } catch (e) {
                            handleError('spinWheelForPlayer-delay', e);
                        }
                    }, delay);
                } catch (e) {
                    handleError('spinWheelForPlayer-callback', e);
                }
            });
        } catch (e) {
            handleError('spinWheelForPlayer', e);
        }
    }

    function handleSpinWeapon() {
        var myPid = isOnlineMode ? (Multiplayer.isHost() ? 'A' : 'B') : game.currentPlayer;
        spinWheelForPlayer(myPid);
    }

    function afterWeaponDrawAction(pid) {
        console.log('[ Weapon ] afterWeaponDrawAction - player:', pid, 'countA:', game.weaponDrawCountA, 'countB:', game.weaponDrawCountB, 'phase:', game.phase);
        
        updateWeaponDrawHint();
        
        if (!isOnlineMode) {
            if (game.weaponDrawCountA >= 3 && game.weaponDrawCountB < 3) {
                game.currentPlayer = 'B';
                updateWeaponDrawUI();
                drawWeaponWheel();
                showCountdown(10, function () {
                    if (game.phase === 'weapon-draw' && !wheelSpinning && game.weaponDrawCountB < 3) {
                        spinWheelForPlayer('B');
                    }
                });
            } else if (game.weaponDrawCountA < 3) {
                updateWeaponDrawUI();
                drawWeaponWheel();
                showCountdown(10, function () {
                    if (game.phase === 'weapon-draw' && !wheelSpinning && game.weaponDrawCountA < 3) {
                        spinWheelForPlayer('A');
                    }
                });
            }
        } else {
            updateWeaponDrawUI();
            if (game.weaponDrawCountA < 3 || game.weaponDrawCountB < 3) {
                var btn = opBtn(pid, 'spin-weapon');
                if (btn && game[(pid === 'A' ? 'weaponDrawCountA' : 'weaponDrawCountB')] < 3) { btn.style.display = 'block'; btn.disabled = false; }
                drawWeaponWheel();
                var countVar = pid === 'A' ? 'weaponDrawCountA' : 'weaponDrawCountB';
                if ((!isOnlineMode || canIOperate(pid)) && game[countVar] < 3) {
                    showCountdown(10, function () {
                        if (game.phase === 'weapon-draw' && !wheelSpinning && game[countVar] < 3) {
                            spinWheelForPlayer(pid);
                        }
                    });
                }
            }
        }
        
        if (game.weaponDrawCountA >= 3 && game.weaponDrawCountB >= 3) {
            clearCountdown();
            console.log('[ Weapon ] ✅ 双方都抽完了');
            notifyPeer('weapon-draw-both-done', {});
            
            if (!isOnlineMode || Multiplayer.isHost()) {
                finishWeaponDraw();
            }
        }
    }

    function finishWeaponDraw() {
        if (game._weaponDrawDone) { console.log('[ Weapon ] ⚠️ finishWeaponDraw 防重入，跳过'); return; }
        game._weaponDrawDone = true;
        console.log('[ Weapon ] 🎯 finishWeaponDraw 被调用, isOnlineMode:', isOnlineMode, 'isHost:', Multiplayer.isHost());
        
        var panelA = $('panel-a'), panelB = $('panel-b');
        if (panelA) { panelA.style.display = ''; }
        if (panelB) { panelB.style.display = ''; }
        
        hideAllOps();
        updatePlayerInfo();
        
        var al = game.playerA.roundCards.map(function (c) { return c.name; }).join('、');
        var bl = game.playerB.roundCards.map(function (c) { return c.name; }).join('、');
        
        console.log('[ Weapon ] 武器抽取完成');
        console.log('[ Weapon ] 玩家A库大小:', game.playerA.library.length, 'roundCards:', game.playerA.roundCards.length);
        console.log('[ Weapon ] 玩家B库大小:', game.playerB.library.length, 'roundCards:', game.playerB.roundCards.length);

        if (isOnlineMode && Multiplayer.isHost()) {
            var syncData = {
                libraryA: game.playerA.library.map(function (c) { return { id: c.id, uid: c.uid, type: c.type }; }),
                libraryB: game.playerB.library.map(function (c) { return { id: c.id, uid: c.uid, type: c.type }; }),
                roundCardsA: game.playerA.roundCards.map(function (c) { return c.uid; }),
                roundCardsB: game.playerB.roundCards.map(function (c) { return c.uid; })
            };
            console.log('[ Weapon ] 发送 weapon-draw-complete 同步消息');
            notifyPeer('weapon-draw-complete', syncData);
        }

        console.log('[ Weapon ] 显示完成弹窗(2秒自动消失)');
        showModal('<h3>⚔️ 武器抽取完成</h3>' +
            '<p style="font-size:14px;color:var(--text-light);margin:8px 0;">玩家A获得 ' + game.playerA.roundCards.length + ' 张：' + (al || '无') + '</p>' +
            '<p style="font-size:14px;color:var(--text-light);margin:8px 0;">玩家B获得 ' + game.playerB.roundCards.length + ' 张：' + (bl || '无') + '</p>' +
            '<p style="color:var(--gold-light);font-size:13px;margin-top:12px;">⏳ 2秒后进入整理阶段...</p>');

        setTimeout(function () {
            console.log('[ Weapon ] 2秒后进入整理阶段');
            hideModal();
            startOrganizePhase();
        }, 2000);
    }

    function startOrganizePhase() {
        console.log('[ Organize ] 📋 进入整理阶段');
        
        clearTableCards();
        game.phase = 'organize';
        
        var tableArea = $('table-cards-area');
        if (tableArea) {
            tableArea.innerHTML = '';
        }
        
        $('weapon-draw-area').classList.add('hidden');
        
        var organizeArea = $('organize-phase-area');
        if (organizeArea) {
            organizeArea.classList.remove('hidden');
        }
        
        var readyBtn = $('btn-ready');
        if (readyBtn) {
            readyBtn.disabled = false;
            readyBtn.textContent = '✅ 准备就绪';
            readyBtn.classList.remove('ready-clicked');
            organizeReadyState = { A: false, B: false };
            readyBtn.onclick = onReadyClick;
        }
        
        $('action-hint').textContent = '⏱️ 整理阶段 - 请准备卡牌';
        
        var panelA = document.getElementById('panel-a');
        var panelB = document.getElementById('panel-b');
        panelA.classList.remove('inactive-panel');
        panelA.classList.add('active-panel', 'organize-active');
        panelB.classList.remove('inactive-panel');
        panelB.classList.add('active-panel', 'organize-active');
        
        hideAllOps(['btn-a-sell', 'btn-a-buy', 'btn-a-synthesis', 'btn-a-cultivation', 'btn-b-sell', 'btn-b-buy', 'btn-b-synthesis', 'btn-b-cultivation']);
        
        showOp('A', 'sell');
        showOp('A', 'buy');
        showOp('A', 'synthesis');
        showOp('A', 'cultivation');
        showOp('B', 'sell');
        showOp('B', 'buy');
        showOp('B', 'synthesis');
        showOp('B', 'cultivation');
        
        updateLibraryDisplay();
        updatePlayerInfo();
        
        showCountdown(600, function () {
            console.log('[ Organize ] ⏰ 倒计时结束，进入骰子阶段');
            exitOrganizePhase();
            startDicePhase();
        });
    }

    var organizeReadyState = { A: false, B: false };

    function onReadyClick() {
        var btn = $('btn-ready');
        if (!btn || btn.disabled && btn.classList.contains('ready-clicked')) return;

        playSound('click');
        var currentPid = isOnlineMode ? Multiplayer.getMyRole() : game.currentPlayer;
        organizeReadyState[currentPid] = true;

        var otherReady = organizeReadyState[currentPid === 'A' ? 'B' : 'A'];

        if (otherReady) {
            btn.textContent = '✅ 双方已准备';
            btn.classList.add('ready-clicked');
            btn.disabled = true;
            console.log('[ Organize ] 双方都已准备，立即开始！');
            $('action-hint').textContent = '✅ 双方都已准备！即将开始...';

            clearCountdown();

            if (isOnlineMode) {
                notifyPeer('organize-ready', { from: currentPid });
            }

            setTimeout(function () {
                exitOrganizePhase();
                startDicePhase();
            }, 800);
        } else {
            var otherPid = currentPid === 'A' ? 'B' : 'A';
            if (!isOnlineMode) {
                game.currentPlayer = otherPid;
                btn.textContent = '⏳ ' + playerLabel(currentPid) + ' 已准备，请' + playerLabel(otherPid) + ' 点击';
                btn.disabled = false;
                btn.classList.remove('ready-clicked');
                $('action-hint').textContent = '⏳ ' + playerLabel(currentPid) + ' 已准备，等待' + playerLabel(otherPid) + ' 准备...';

                var panelA = document.getElementById('panel-a');
                var panelB = document.getElementById('panel-b');
                if (otherPid === 'B') {
                    panelA.classList.remove('active-panel', 'organize-active');
                    panelA.classList.add('inactive-panel');
                    panelB.classList.remove('inactive-panel');
                    panelB.classList.add('active-panel', 'organize-active');
                } else {
                    panelB.classList.remove('active-panel', 'organize-active');
                    panelB.classList.add('inactive-panel');
                    panelA.classList.remove('inactive-panel');
                    panelA.classList.add('active-panel', 'organize-active');
                }
            } else {
                btn.textContent = '✅ 已准备';
                btn.classList.add('ready-clicked');
                btn.disabled = true;
                $('action-hint').textContent = '⏱️ ' + playerLabel(currentPid) + ' 已准备，等待对方...';
                notifyPeer('organize-ready', { from: currentPid });
            }

            if (countdownSeconds > 65) {
                var oldTime = countdownSeconds;
                clearCountdown();
                showCountdown(60, function () {
                    exitOrganizePhase();
                    startDicePhase();
                });
                $('action-hint').textContent = '⏱️ ' + playerLabel(currentPid) + ' 已准备！倒计时已从 ' + oldTime + 's 缩短至 60s';
                showFloatTip('⏰ 倒计时已缩短至 60 秒！');
            } else {
                $('action-hint').textContent = '⏱️ ' + playerLabel(currentPid) + ' 已准备，等待对方...';
            }
        }
    }

    function showFloatTip(text) {
        var tip = document.createElement('div');
        tip.className = 'float-tip';
        tip.textContent = text;
        tip.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#FFD700,#FFA500);color:#333;padding:16px 32px;border-radius:12px;font-size:18px;font-weight:bold;z-index:10000;box-shadow:0 6px 24px rgba(255,165,0,0.5),0 2px 8px rgba(0,0,0,0.2);opacity:0;transition:opacity 0.3s ease,transform 0.3s ease;';
        document.body.appendChild(tip);
        requestAnimationFrame(function() {
            tip.style.opacity = '1';
            tip.style.transform = 'translate(-50%,-50%) scale(1.05)';
        });
        setTimeout(function() {
            tip.style.opacity = '0';
            tip.style.transform = 'translate(-50%,-60%) scale(0.95)';
            setTimeout(function() { if (tip.parentNode) tip.parentNode.removeChild(tip); }, 300);
        }, 1700);
    }

    function exitOrganizePhase() {
        var organizeArea = $('organize-phase-area');
        if (organizeArea) {
            organizeArea.classList.add('hidden');
        }
        var panelA = document.getElementById('panel-a');
        var panelB = document.getElementById('panel-b');
        if (panelA) panelA.classList.remove('organize-active');
        if (panelB) panelB.classList.remove('organize-active');
        hideAllOps();
        clearCountdown();
    }

    function startDicePhase() {
        console.log('[ Dice ] 🎲 进入骰子阶段, isOnlineMode:', isOnlineMode, 'isHost:', Multiplayer.isHost());
        
        game.phase = 'dice'; 
        showSection('dice-area');
        hideAllOps();
        $('action-hint').textContent = '投掷骰子决定攻击顺序';
        
        if ($('dice-face')) $('dice-face').textContent = '?'; 
        if ($('dice-result')) $('dice-result').classList.add('hidden');
        if ($('btn-roll-dice')) $('btn-roll-dice').style.display = 'none';
        diceRolled = false;

        if (isOnlineMode) {
            console.log('[ Dice ] 联机模式 - 房主投骰子');
            if (Multiplayer.isHost()) {
                $('dice-hint').textContent = '正在自动投掷骰子...';
                $('action-hint').textContent = '🎯 正在投掷骰子...';
                setTimeout(function () { 
                    console.log('[ Dice ] 房主开始投骰子');
                    doRollDice(); 
                }, 500);
            } else {
                $('dice-hint').textContent = '⏳ 等待房主投掷骰子...';
                $('action-hint').textContent = '⏳ 等待房主投掷骰子...';
                console.log('[ Dice ] 等待房主投骰子');
            }
        } else {
            console.log('[ Dice ] 单机模式 - 自动投掷骰子');
            $('dice-hint').textContent = '正在自动投掷骰子...';
            $('action-hint').textContent = '🎯 正在投掷骰子...';
            setTimeout(function () { 
                console.log('[ Dice ] 单机模式开始投骰子');
                doRollDice(); 
            }, 500);
        }
    }

    function doRollDice() {
        try {
            if (diceRolled || game.phase !== 'dice') {
                console.log('[ Dice ] ❌ 无法投骰子 - diceRolled:', diceRolled, 'phase:', game.phase);
                return;
            }
            if (isOnlineMode && !Multiplayer.isHost()) {
                console.log('[ Dice ] ❌ 联机模式下非房主不能投骰子');
                return;
            }
            diceRolled = true;
            var btn = $('btn-roll-dice');
            if (btn) btn.style.display = 'none';
            playSound('click');
            var hintEl = $('dice-hint');
            if (hintEl) hintEl.textContent = '';
            var diceEl = $('dice');
            if (diceEl) diceEl.classList.add('rolling');
            playSound('dice');
            var result = randomInt(1, 6), cnt = 0;
            console.log('[ Dice ] 本地投掷骰子，结果:', result);
            
            var iv = setInterval(function () {
                try {
                    $('dice-face').textContent = randomInt(1, 6); cnt++;
                    if (cnt >= 12) {
                        clearInterval(iv); 
                        $('dice-face').textContent = result; 
                        $('dice').classList.remove('rolling');
                        var isOdd = result % 2 === 1;
                        game.firstAttacker = isOdd ? 'A' : 'B'; 
                        game.secondAttacker = isOdd ? 'B' : 'A';
                        game.diceResult = result;
                        
                        $('dice-result').classList.remove('hidden');
                        var fl = playerLabel(game.firstAttacker), fn = getPlayer(game.firstAttacker).char.name;
                        $('dice-result').innerHTML = '点数：<strong style="font-size:24px;">' + result + '</strong>（' + (isOdd ? '单数' : '双数') + '）<br><span style="color:var(--gold-light);font-size:18px;">' + fl + '（' + fn + '）先攻！</span>';
                        playSound('result'); 
                        speak('点数' + result + '，' + fl + fn + '先攻');
                        
                        console.log('[ Dice ] 发送 dice-roll 消息, value:', result);
                        notifyPeer('dice-roll', { value: result, firstAttacker: game.firstAttacker, secondAttacker: game.secondAttacker });
                        
                        setTimeout(function () {
                            try {
                                console.log('[ Dice ] 2秒后进入攻击阶段');
                                var diceArea = $('dice-area');
                                if (diceArea) {
                                    diceArea.classList.add('hidden');
                                }
                                waitForSpeech(function () { startAttackPhase(false); }, 500);
                            } catch (e2) {
                                handleError('doRollDice-timeout', e2);
                            }
                        }, 2000);
                    }
                } catch (e) {
                    handleError('doRollDice-interval', e);
                    clearInterval(iv);
                }
            }, 80);
        } catch (e) {
            handleError('doRollDice', e);
        }
    }
    window.doRollDice = doRollDice;

    function startAttackPhase(isCounter) {
        try {
            console.log('[ startAttackPhase ] isCounter:', isCounter, 'firstAttacker:', game.firstAttacker, 'secondAttacker:', game.secondAttacker);
            game.phase = 'attack-select';
            game.isCounterPhase = !!isCounter;
            game.phaseAttacker = isCounter ? game.secondAttacker : game.firstAttacker;
            game.phaseDefender = isCounter ? game.firstAttacker : game.secondAttacker;
            console.log('[ startAttackPhase ] 设置完成 - isCounterPhase:', game.isCounterPhase, 'phaseAttacker:', game.phaseAttacker, 'phaseDefender:', game.phaseDefender);
            game.currentAttackIndex = 0;
            game.bonusAttacks = 0;
            game.attackReduction = 0;
            game.tempDefenseReduction = 0;
            game.selectedCardUid = null;
            game.currentAttackCard = null;
            game.currentDefendCard = null;
            game.noDefendFlag = false;
            game.noDefendUsedThisRound = false;
            game.usedSkillsThisRound = {};
            clearTableCards();

            var atkChar = getPlayer(game.phaseAttacker).char;
            var atkCards = getPlayer(game.phaseAttacker).library.filter(function (c) { return c.type === 'attack'; });

            if (atkCards.length === 0) {
                setActivePlayer(game.phaseAttacker); showSection('damage-area');
                hideAllOps();
                $('damage-display').innerHTML = '<div class="damage-number" style="color:var(--text-dim);">0</div><div class="damage-result">' + playerLabel(game.phaseAttacker) + '（' + atkChar.name + '）没有攻击卡牌</div>';
                speak(atkChar.name + '没有攻击卡牌，可以选择购买或结束攻击');
                showOp(game.phaseAttacker, 'end-attack');
                showOp(game.phaseAttacker, 'buy');
                setOpsStatus(game.phaseAttacker, '没有攻击卡牌，可购买或结束');
                showTradeOpsForNonActivePlayer(game.phaseDefender);
                return;
            }

            showAttackCardSelect();
        } catch (e) {
            handleError('startAttackPhase', e);
        }
    }

    function showAttackCardSelect() {
        processPendingSkills();
        game.noDefendFlag = false;
        var atkChar = getPlayer(game.phaseAttacker).char;
        var atkCards = getPlayer(game.phaseAttacker).library.filter(function (c) { return c.type === 'attack'; });

        if (atkCards.length === 0) {
            hideSelectAreas();
            hideAllOps();
            showOp(game.phaseAttacker, 'end-attack');
            setOpsStatus(game.phaseAttacker, '没有攻击卡牌了');
            showTradeOpsForNonActivePlayer(game.phaseDefender);
            return;
        }

        game.phase = 'attack-select'; game.selectedCardUid = null;
        setActivePlayer(game.phaseAttacker);
        updateAttackProgress();
        hideAllOps();
        showSection('card-select-area');

        var phaseLabel = game.isCounterPhase ? '反击' : '攻击';
        var attackNum = game.currentAttackIndex + 1;
        var maxAtk = getMaxAttacks();
        $('action-hint').textContent = phaseLabel + '阶段（已攻击 ' + game.currentAttackIndex + '/' + maxAtk + ' 次）';
        showOp(game.phaseAttacker, 'confirm-card', { disabled: true, text: '⚔️ 攻击出牌' });
        showOp(game.phaseAttacker, 'sell');
        showOp(game.phaseAttacker, 'buy');
        showOp(game.phaseAttacker, 'synthesis');
        showOp(game.phaseAttacker, 'cultivation');
        setOpsStatus(game.phaseAttacker, phaseLabel + '阶段');
        renderCardHand(game.phaseAttacker, 'attack');
        announcePlayerTurn(game.phaseAttacker, '请选择第' + attackNum + '次攻击卡牌');
        showTradeOpsForNonActivePlayer(game.phaseDefender);
        clearCountdown();
        clearOpponentWaitCountdown();
        if (!isOnlineMode || canIOperate(game.phaseAttacker)) {
            showCountdown(60, function () {
                if (game.phase !== 'attack-select') return;
                var cards = getPlayer(game.phaseAttacker).library.filter(function (c) { return c.type === 'attack'; });
                if (cards.length > 0) {
                    var randomCard = cards[Math.floor(Math.random() * cards.length)];
                    game.selectedCardUid = randomCard.uid;
                    var confirmBtn = opBtn(game.phaseAttacker, 'confirm-card');
                    if (confirmBtn) confirmBtn.click();
                } else {
                    var endBtn = opBtn(game.phaseAttacker, 'end-attack');
                    if (endBtn && endBtn.style.display !== 'none') endBtn.click();
                }
            });
        } else if (isOnlineMode) {
            showOpponentWaitCountdown(60);
        }
    }

    function showTradeOpsForNonActivePlayer(pid) {
        if (isOnlineMode && !canIOperate(pid)) return;
        var panel = $('panel-' + pid.toLowerCase());
        if (panel) panel.classList.add('trade-active');
        showOp(pid, 'sell');
        showOp(pid, 'buy');
        showOp(pid, 'synthesis');
        showOp(pid, 'cultivation');
        setOpsStatus(pid, '可进行交易操作');
    }

    function clearTradeActiveState() {
        ['a', 'b'].forEach(function (p) {
            var panel = $('panel-' + p);
            if (panel) panel.classList.remove('trade-active');
        });
    }

    function showDefendCardSelect() {
        processPendingSkills();
        var defChar = getPlayer(game.phaseDefender).char;
        var defCards = getPlayer(game.phaseDefender).library.filter(function (c) { return c.type === 'defend'; });

        game.tableCards = game.tableCards.filter(function (entry) { return entry.playerPid !== 'phase-reward'; });
        var rewardEl = document.getElementById('table-reward-info');
        if (rewardEl) rewardEl.remove();

        if (game.noDefendFlag) {
            game.currentDefendCard = null;
            resolveSingleAttack();
            return;
        }

        if (defCards.length === 0) {
            game.phase = 'defend-select';
            game.currentDefendCard = null;
            game.selectedCardUid = null;
            setActivePlayer(game.phaseDefender);
            updateAttackProgress();
            hideAllOps();
            showSection('card-select-area');
            var maxAtk = getMaxAttacks();
            $('action-hint').textContent = '防御阶段（攻击 ' + game.currentAttackIndex + '/' + maxAtk + ' 次）- 您没有防御卡牌';
            showOp(game.phaseDefender, 'skip-defend');
            showOp(game.phaseDefender, 'sell');
            showOp(game.phaseDefender, 'buy');
            showOp(game.phaseDefender, 'synthesis');
            showOp(game.phaseDefender, 'cultivation');
            setOpsStatus(game.phaseDefender, '您没有防御卡牌，请选择操作');
            announcePlayerTurn(game.phaseDefender, '您没有防御卡牌，请选择是否跳过防御');
            showTradeOpsForNonActivePlayer(game.phaseAttacker);
            clearCountdown();
            clearOpponentWaitCountdown();
            if (!isOnlineMode || canIOperate(game.phaseDefender)) {
                showCountdown(60, function () {
                    if (game.phase !== 'defend-select') return;
                    var skipBtn = opBtn(game.phaseDefender, 'skip-defend');
                    if (skipBtn && skipBtn.style.display !== 'none') skipBtn.click();
                });
            } else if (isOnlineMode) {
                showOpponentWaitCountdown(60);
            }
            return;
        }

        game.phase = 'defend-select'; game.selectedCardUid = null;
        setActivePlayer(game.phaseDefender);
        updateAttackProgress();
        hideAllOps();
        showSection('card-select-area');

        var maxAtk = getMaxAttacks();
        $('action-hint').textContent = '防御阶段（攻击 ' + game.currentAttackIndex + '/' + maxAtk + ' 次）';
        showOp(game.phaseDefender, 'confirm-card', { disabled: true, text: '🛡️ 防御出牌' });
        showOp(game.phaseDefender, 'skip-defend');
        showOp(game.phaseDefender, 'sell');
        showOp(game.phaseDefender, 'buy');
        showOp(game.phaseDefender, 'synthesis');
        showOp(game.phaseDefender, 'cultivation');
        setOpsStatus(game.phaseDefender, '防御阶段');
        renderCardHand(game.phaseDefender, 'defend');
        announcePlayerTurn(game.phaseDefender, '请选择防御卡牌');
        showTradeOpsForNonActivePlayer(game.phaseAttacker);
        clearCountdown();
        clearOpponentWaitCountdown();
        if (!isOnlineMode || canIOperate(game.phaseDefender)) {
            showCountdown(60, function () {
                if (game.phase !== 'defend-select') return;
                var cards = getPlayer(game.phaseDefender).library.filter(function (c) { return c.type === 'defend'; });
                if (cards.length > 0) {
                    var randomCard = cards[Math.floor(Math.random() * cards.length)];
                    game.selectedCardUid = randomCard.uid;
                    var confirmBtn = opBtn(game.phaseDefender, 'confirm-card');
                    if (confirmBtn) confirmBtn.click();
                } else {
                    var skipBtn = opBtn(game.phaseDefender, 'skip-defend');
                    if (skipBtn && skipBtn.style.display !== 'none') skipBtn.click();
                }
            });
        } else if (isOnlineMode) {
            showOpponentWaitCountdown(60);
        }
    }

    function renderCardHand(playerId, cardType) {
        hideSelectCardPreview();
        var player = getPlayer(playerId);
        var prefix = 'player-' + playerId.toLowerCase();
        var selectArea = $(prefix + '-select-area');
        var selectCards = $(prefix + '-select-cards');
        var selectTitle = $(prefix + '-select-title');

        ['a', 'b'].forEach(function (p) {
            var sa = $('player-' + p + '-select-area');
            if (sa) sa.classList.add('hidden');
        });

        if (isOnlineMode && !canIOperate(playerId)) {
            var cards = player.library.filter(function (c) { return c.type === cardType; });
            if (selectArea) selectArea.classList.remove('hidden');
            if (selectTitle) selectTitle.textContent = (cardType === 'attack' ? '⚔️ 攻击卡牌' : '🛡️ 防御卡牌') + '（查看中）';
            if (selectCards) {
                selectCards.innerHTML = '';
                if (cards.length > 0) {
                    cards.forEach(function (card) { selectCards.innerHTML += createCardHTML(card, false); });
                } else {
                    selectCards.innerHTML = '<div style="color:var(--text-dim);padding:12px;text-align:center;font-size:13px;">暂无' + (cardType === 'attack' ? '攻击' : '防御') + '卡牌</div>';
                }
            }
            return;
        }

        var cards = player.library.filter(function (c) { return c.type === cardType; });

        if (cards.length === 0) {
            if (selectArea) selectArea.classList.remove('hidden');
            if (selectTitle) selectTitle.textContent = '没有可用的' + (cardType === 'attack' ? '攻击' : '防御') + '卡牌';
            if (selectCards) selectCards.innerHTML = '';
            if (cardType === 'defend') {
                showOp(playerId, 'skip-defend');
            }
            if (cardType === 'attack') {
                showOp(playerId, 'end-attack');
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

            if (!selectCards._hoverDelegateSetup) {
                selectCards._hoverDelegateSetup = true;

                selectCards.addEventListener('click', function (e) {
                    var target = e.target.closest('.weapon-card.selectable');
                    if (target) {
                        playSound('click');
                        selectCards.querySelectorAll('.weapon-card').forEach(function (c) { c.classList.remove('selected'); });
                        target.classList.add('selected');
                        game.selectedCardUid = target.getAttribute('data-uid');
                        var confirmBtn = opBtn(playerId, 'confirm-card');
                        if (confirmBtn) confirmBtn.disabled = false;
                        var card = findCardByUid(player, game.selectedCardUid);
                        if (card) showSelectCardPreview(card);
                    }
                });

                selectCards.addEventListener('dblclick', function (e) {
                    var target = e.target.closest('.weapon-card.selectable');
                    if (target) {
                        var card = findCardByUid(player, target.getAttribute('data-uid'));
                        if (card) {
                            selectCards.querySelectorAll('.weapon-card.selected').forEach(function (c) { c.classList.remove('selected'); });
                            target.classList.add('selected');
                            game.selectedCardUid = card.uid;
                            handleConfirmCard();
                        }
                        e.stopPropagation();
                    }
                });
            }

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
        hideSelectCardPreview();
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
            var atkHtml = '<span class="battle-log-atk">' + renderEmoji(entry.atkCard.icon) + entry.atkCard.name + '(' + entry.atkWithBonus + ')</span>';
            var defHtml = entry.defCard
                ? '<span class="battle-log-def">' + renderEmoji(entry.defCard.icon) + entry.defCard.name + '(' + entry.defWithBonus + ')</span>'
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
        qinggaingjian: '青钢剑出鞘！江湖路远，剑气纵横三万里！',
        panguanbi: '判官笔在手！点穴封脉，文人亦能行侠仗义！',
        tongluo: '铜锣一响！威震四方，胆小者莫近！',
        liuxingchui: '流星锤飞舞！暗藏玄机，防不胜防！',
        bianzi: '鞭子甩出！软硬兼施，江湖险恶需防身！',
        xuantiejian: '玄铁剑现世！重剑无锋大巧不工，杨过神兵！',
        dagoubang: '打狗棒法！丐帮镇帮之宝，洪帮主亲传绝学！',
        bixuejian: '碧血剑出！袁承志神兵，碧血染沙场！',
        yuanyangdao: '鸳鸯刀合璧！双刀齐出，雌雄莫辨！',
        zhugeliannu: '诸葛连弩上膛！连珠箭发，百步穿杨！',
        yitianjian: '倚天剑出！号令天下谁敢不从！武林至尊！',
        tulongdao: '屠龙刀现！倚天不出谁与争锋！刀中霸主！',
        qiankundanuoyi: '乾坤大挪移！借力打力，四两拨千斤！明教神功！',
        dagoubangfa: '打狗棒法！三十六路棒法，天下无狗！丐帮绝学！',
        xuantiezhongjian: '玄铁重剑！重达八八六十四斤，一力降十会！',
        tulong_steal: '屠龙刀·偷取！屠龙宝刀出手，顺手牵羊夺你宝物！',
        dagou_break: '打狗棒·破防！棒打双犬，破你防御让你无处可逃！',
        xuantie_reduce: '玄铁重剑·削弱！重剑压顶，削你战力让你无力再战！',
        bixue_replace: '碧血剑·降级！碧血染沙场，降你品阶让你武功尽废！',
        yuxiao_block: '玉箫·封技！玉箫声起乱人心智，封你内力让你动弹不得！',
        liumai: '六脉神剑！大理段氏绝学，无形剑气纵横天下！天龙八部至高武学！',
        dugujiujian: '独孤九剑！独孤求败所创，无招胜有招！笑傲江湖第一剑法！',
        xianglong: '降龙十八掌！丐帮两大护法神功，刚猛无俦天下第一掌法！射雕英雄传绝学！',
        shendiao: '玄铁重剑！神雕侠侣杨过佩剑，重剑无锋大巧不工！',
        xihuo: '西洋火炮！鹿鼎记红衣大炮，轰天裂地神威无敌！',
        buyi: '布衣加身！粗布麻衣遮体，行走江湖低调行事！',
        zhulian: '竹帘挡前！简易竹制帘幕，也能挡住暗器偷袭！',
        mianpao: '棉袍护体！御寒棉布长袍，江湖夜雨十年灯！',
        tengjia: '藤甲上身！藤条编织轻甲，南蛮藤甲军装备！',
        doulì: '斗笠戴好！遮阳挡雨竹笠，侠客行踪隐于市井！',
        jinisiruanjia: '金丝软甲！黄蓉软猬甲，刀枪不入水火不侵！',
        tajitu: '太极图现！阴阳双鱼护身，四两拨千斤以柔克刚！',
        tieluohan: '铁罗汉阵！少林十八铜人，铜墙铁壁固若金汤！',
        huxinjing: '护心镜照！保护心口铜镜，正所谓明镜高悬！',
        hunyuansan: '混元伞开！周伯通宝贝，伞下乾坤妙用无穷！',
        jiuyangti: '九阳神功护体！张无忌所学，至阳至刚万邪不侵！',
        lingboweibu: '凌波微步！逍遥派绝学，闪避攻击如凌波仙子！',
        yijinjing: '易筋经护体！达摩祖师所创，化腐朽为神奇！',
        beiming: '北冥神功！吸人内力化为己用，逍遥派无上心法！',
        zixia: '紫霞神功！华山派绝顶内功，岳不群毕生所学！',
        taiji_steal: '太极剑法·偷取！以柔克刚顺势借力，夺你手中兵器！',
        jingang_break: '金刚伏魔圈·破防！三大高僧联手阵法，破你金刚不坏之身！',
        yijin_reduce: '易筋经·削弱！少林内功精髓，耗你真气让你内力枯竭！',
        shaolin_replace: '少林七十二绝技·降级！千年武学精华，废你武功让你从头再来！',
        wudang_block: '武当太极·封技！真武大帝道统，封你经脉让你无法运功！',
        jiuyinzhenjing: '九阴真经护体！黄裳所著绝学，包罗万象万法归宗！',
        kuihua: '葵花宝典天下无双！东方不败修炼，快如闪电无人能敌！',
        longxiang: '龙象般若功十三层！金轮法王神功，龙象之力举世无双！',
        xixing: '吸星大法万邪不侵！任我行绝学，吸尽天下内力为我所用！',
        qiankun_abs: '乾坤大挪移绝对守护！明教护教神功，乾坤挪移万法不侵！',
        xueyindao: '雪饮刀出！寒冰之气冻结万物，聂风佩刀霜寒九州！',
        jueshihaojian: '绝世好剑现世！步惊云佩剑，天下第一剑锋芒毕露！',
        yingxiongjian: '英雄剑出鞘！无名佩剑，武林神话剑气长存！',
        shenghuoling: '圣火令显威！明教圣物，至高无上烈焰焚天！',
        xiaolifeidao: '小李飞刀出手！例不虚发，天下第一暗器！',
        longfengshuanghuan: '龙凤双环护身！上官金虹兵器，攻防一体天下无双！',
        geludao: '割鹿刀斩出！天下第一神刀，传说之兵威震江湖！',
        xuantiejia: '玄铁重甲加身！玄铁打造坚不可摧，刀枪不入！',
        jinsibaojia: '金丝宝甲护体！金丝银线编织，刀枪不入水火不侵！',
        tiancanbaojia: '天蚕宝甲披挂！天蚕丝织就，水火不侵万法难破！',
        linlinjia: '龙鳞战甲上身！龙鳞镶嵌威武霸气，刀剑难伤！',
        bujuejinshen: '不灭金身显威！金刚不坏之体，万法不侵刀枪不入！',
        tiancanshenjia: '天蚕神甲护身！天下第一宝甲，刀剑难伤万邪辟易！',
        ruanweijia: '软猬甲护体！黄蓉宝甲内藏尖刺，反伤敌人！',
        hutishenggang: '护体神罡罩身！先天真气护体，百邪不侵万法难破！',
        bm_dragon_slayer: '屠龙者荣耀之剑！斩龙勇士传承，剑锋所指所向披靡！',
        bm_shadow_blade: '影刃暗袭！暗影之中致命一击，无声无息取你性命！',
        bm_frost_armor: '寒冰甲冻结！冰封万里寒气逼人，攻者自伤！',
        bm_phantom_shield: '幻影盾浮现！虚幻莫测防护，真假难辨！',
        bm_inferno_sword: '烈焰剑焚天！焚烧一切的火焰之剑，灰飞烟灭！',
        bm_thunder_hammer: '雷神锤降世！雷霆万钧神力，天崩地裂！',
        bm_divine_protection: '神圣庇护降临！神明赐予守护，金光护体！',
        bm_abyssal_guard: '深渊守卫苏醒！来自深渊的强大防护，暗影庇佑！',
        bm_void_blade: '虚空之刃斩出！撕裂空间的虚空之力，无处可逃！',
        bm_time_dial: '时光之轮转动！时间停滞的绝对防御，万物静止！',
        bm_soul_reaper: '死神镰刀挥舞！收割灵魂的恐怖武器，命悬一线！',
        bm_angel_wings: '天使之翼展开！神圣天使的庇护之翼，圣光守护！',
        bm_dragon_scale_armor: '龙鳞战甲披挂！远古巨龙遗落的鳞甲，坚不可摧！',
        bm_eternal_shield: '永恒之盾竖起！传说中永不破碎的神圣护盾！',
        bm_void_barrier: '虚空屏障展开！虚空之力构筑绝对防御场！',
        bm_crystal_mirror: '水晶魔镜闪耀！反射一切攻击的神秘魔镜！',
        xl18z: '降龙十八掌！丐帮镇帮神功，刚猛无俦天下第一掌法！',
        lmsj: '六脉神剑！大理段氏绝学，无形剑气伤敌于无形！',
        dg9j: '独孤九剑！独孤求败所创，无招胜有招破尽天下武功！',
        dgbf: '打狗棒法！三十六路棒法精妙绝伦，天下无狗！',
        qkdny: '乾坤大挪移！明教护教神功，借力打力化敌于无形！',
        jygf: '九阳真经护体！至阳至刚万邪不侵，天下第一内功！',
        yjyjg: '易筋经护体！达摩祖师所创，化腐朽为神奇！',
        zxgf: '紫霞神功！华山派绝顶内功，紫气东来照影成双！',
        tjtaiji: '武当太极！张三丰所创以柔克刚，四两拨千斤！',
        taijijianfa: '太极剑法！武当镇派剑法，以静制动后发制人！',
        shaolin72jueji: '少林七十二绝技！千年武学精华，博大精深！',
        mohewuliang: '摩诃无量！风云合璧天下无敌，毁天灭地！',
        paiyunzhang: '排云掌！步惊云绝学，掌法刚柔并济排山倒海！',
        fengshentui: '风神腿！聂风绝学，腿法快如疾风势不可挡！',
        tianshuangquan: '天霜拳！雄霸绝学，拳法寒冰之气冰封万里！',
        jianersan: '剑二十三！无名终极剑招，时间静止空间破碎！',
        jiuyinbaiguzhao: '九阴白骨爪！五指如钩阴毒无比，九阴真经绝学！',
        taijiquan: '太极拳！张三丰所创，以柔克刚天下无敌！',
        shenghuolingfa: '圣火令神功！明教波斯总教失传武学，诡异莫测！',
        xiaolifeidao_art: '小李飞刀！李寻欢绝技，例不虚发出必中！',
        kuaijian: '快剑！阿飞剑法，快如闪电无招无式！',
        taixuanjing: '太玄经！石破天领悟绝世内功，武学巅峰！',
        luohanfumogong: '罗汉伏魔功！少林绝学，伏魔神功刚柔并济！',
        xixingdafa: '吸星大法！任我行绝学，吸尽天下内力为我所用！',
        xiaowuxianggong: '小无相功！逍遥派绝学，模仿天下武学无往不利！',
        changchungong: '长春功！全真教长春真人所创，生生不息！',
        zhuangong: '庄功！少林基础功法，稳扎稳打根基深厚！',
        babangliuhe: '八荒六合唯我独尊功！天山童姥绝学，返老还童！',
        shenzhaojing: '神照经！金庸笔下最强疗伤神功，起死回生！',
        hamagong: '蛤蟆功！欧阳锋绝学，蓄势待发以静制动！',
        qiankunerceng: '乾坤大挪移二成！阳顶天所悟残本，威力不减！',
        geludaofa: '割鹿刀法！萧十一郎绝学，天下第一刀法！',
        tianwaifeixian: '天外飞仙！连城璧终极剑招，快若闪电！'
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
        var skillHtml = '';
        if (card.skill) {
            skillHtml = '<div class="card-play-skill">' + card.skill.icon + ' ' + card.skill.name + '：' + card.skill.desc + '</div>';
        }

        overlay.innerHTML =
            '<div class="card-play-scene">' +
            '<div class="card-play-player">' + playerLabel(playerPid) + '</div>' +
            '<div class="card-play-card weapon-card ' + rarityCls + '">' +
            '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
            '<span class="card-icon">' + renderEmoji(card.icon) + '</span>' +
            '<span class="card-name">' + card.name + '</span>' +
            '<span class="card-value">' + valueLabel + ':' + card.value + '</span>' +
            '<span class="card-price">' + rarityName + '</span>' +
            '</div>' +
            skillHtml +
            '<div class="card-play-desc">' + getCardVoice(card) + '</div>' +
            '</div>';

        document.body.appendChild(overlay);

        if (card.rarity === 'legend') playSound('epic');
        else if (card.rarity === 'epic') playSound('epic');
        else if (card.rarity === 'rare') playSound('rare');
        else playSound(card.type === 'attack' ? 'attack' : 'defend');

        setTimeout(function () { speak(getCardVoice(card)); }, 500);

        var duration = (card.rarity === 'legend' || card.rarity === 'epic') ? 4500 : 3800;
        setTimeout(function () {
            overlay.classList.add('card-play-fadeout');
            waitForSpeech(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                if (callback) callback();
            }, 400);
        }, duration);
    }

    function handleConfirmCard() {
        try {
        var pid = game.phase === 'attack-select' ? game.phaseAttacker : game.phaseDefender;
        if (isOnlineMode && !canIOperate(pid)) return;
        var card = getSelectedCard(pid);
        if (!card) return; playSound('click');
        clearCountdown();
        clearOpponentWaitCountdown();
        hideSelectAreas();

        if (game.phase === 'attack-select') {
            game.currentAttackCard = card;
            removeFromLibrary(game.phaseAttacker, card);
            updatePlayerInfo();
            addTableCard(card, game.phaseAttacker);
            notifyPeer('card-selected', { uid: card.uid, player: pid });
            if (card.skill && card.skill.id === 'no_defend' && card.skill.timing === 'current' && !game.usedSkillsThisRound['no_defend']) {
                game.noDefendFlag = true;
                game.usedSkillsThisRound['no_defend'] = true;
            }
            showCardPlayAnimation(card, pid, function () { showDefendCardSelect(); });
        } else if (game.phase === 'defend-select') {
            game.currentDefendCard = card;
            removeFromLibrary(game.phaseDefender, card);
            updatePlayerInfo();
            addTableCard(card, game.phaseDefender);
            notifyPeer('card-selected', { uid: card.uid, player: pid });
            showCardPlayAnimation(card, pid, function () { resolveSingleAttack(); });
        }
        } catch (e) { handleError('handleConfirmCard', e); }
    }

    function handleSkipDefend() {
        try {
        var pid = game.phaseDefender;
        if (isOnlineMode && !canIOperate(pid)) return;
        playSound('click');
        stopSpeech();
        hideSelectAreas();
        game.currentDefendCard = null;
        notifyPeer('skip-defend', {});
        clearCountdown();
        clearOpponentWaitCountdown();
        resolveSingleAttack();
        } catch (e) { handleError('handleSkipDefend', e); }
    }

    function applyEpicSkill(card, attackerPid, defenderPid) {
        if (!card.skill) return '';
        var attacker = getPlayer(attackerPid);
        var defender = getPlayer(defenderPid);
        var skill = card.skill;
        var resultHtml = '';

        playSound('skill');

        if (game.usedSkillsThisRound[skill.id]) {
            resultHtml = '<div style="color:var(--text-dim);font-size:13px;margin:4px 0;">' + skill.icon + ' ' + skill.name + '技能本轮已经使用过，无法再次使用</div>';
            speak(skill.name + '技能本轮已使用');
            updatePlayerInfo();
            return resultHtml;
        }

        switch (skill.id) {
            case 'steal_card':
                game.usedSkillsThisRound[skill.id] = true;
                if (defender.library.length > 0) {
                    var stolenIdx = Math.floor(Math.random() * defender.library.length);
                    var stolenCard = defender.library.splice(stolenIdx, 1)[0];
                    attacker.library.push(stolenCard);
                    resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">🤚 偷取技能触发！偷取了' + playerLabel(defenderPid) + '的 ' + renderEmoji(stolenCard.icon) + stolenCard.name + '！</div>';
                    speak(skill.name + '触发，偷取了' + stolenCard.name);
                } else {
                    resultHtml = '<div style="color:var(--text-dim);font-size:13px;margin:4px 0;">🤚 偷取技能触发！但对方没有卡牌可偷</div>';
                }
                break;
            case 'no_defend':
                game.usedSkillsThisRound[skill.id] = true;
                if (skill.timing === 'current') {
                    game.noDefendFlag = true;
                    resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">💥 破防技能触发！对方本次不能使用防御！</div>';
                    speak(skill.name + '触发，对方不能防御');
                } else if (skill.timing === 'next') {
                    game.pendingSkills.push({
                        skillId: skill.id,
                        targetPid: defenderPid,
                        timing: 'next',
                        turnIndex: game.currentTurnIndex + 1,
                        executed: false
                    });
                    resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">💥 破防技能触发！对方下次不能使用防御！</div>';
                } else {
                    game.noDefendFlag = true;
                    resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">💥 破防技能触发！对方本次不能使用防御！</div>';
                }
                speak(skill.name + '触发，对方不能防御');
                break;
            case 'reduce_attack':
                game.usedSkillsThisRound[skill.id] = true;
                game.tempDefenseReduction += 0.2;
                resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">⬇️ 削弱技能触发！对方本次防御值减少20%！</div>';
                speak(skill.name + '触发，对方防御值减少');
                break;
            case 'replace_epic':
                game.usedSkillsThisRound[skill.id] = true;
                var epicCards = defender.library.filter(function (c) { return c.rarity === 'epic'; });
                if (epicCards.length > 0) {
                    var targetCard = epicCards[Math.floor(Math.random() * epicCards.length)];
                    var commonWeapons = WEAPONS.filter(function (w) { return w.rarity === 'common' && w.type === targetCard.type; });
                    if (commonWeapons.length > 0) {
                        var replacement = Object.assign({}, commonWeapons[Math.floor(Math.random() * commonWeapons.length)]);
                        replacement.uid = targetCard.uid;
                        var idx = defender.library.findIndex(function (c) { return c.uid === targetCard.uid; });
                        if (idx >= 0) {
                            defender.library[idx] = replacement;
                            resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">🔄 降级技能触发！将对方 ' + renderEmoji(targetCard.icon) + targetCard.name + ' 替换为 ' + renderEmoji(replacement.icon) + replacement.name + '！</div>';
                            speak(skill.name + '触发，降级了' + targetCard.name);
                        }
                    }
                } else {
                    resultHtml = '<div style="color:var(--text-dim);font-size:13px;margin:4px 0;">🔄 降级技能触发！但对方没有史诗卡牌</div>';
                }
                break;
            case 'block_ability':
                game.usedSkillsThisRound[skill.id] = true;
                if (skill.timing === 'next') {
                    game.pendingSkills.push({
                        skillId: skill.id,
                        targetPid: defenderPid,
                        timing: 'next',
                        turnIndex: game.currentTurnIndex + 1,
                        executed: false
                    });
                    resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">🚫 封技技能触发！对方角色技能下次不能使用！</div>';
                } else {
                    if (defenderPid === 'A') game.blockAbilityA = true;
                    else game.blockAbilityB = true;
                    resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">🚫 封技技能触发！对方角色技能被封印！</div>';
                }
                speak(skill.name + '触发，封印对方技能');
                break;
        }

        updatePlayerInfo();
        return resultHtml;
    }

    function processPendingSkills() {
        if (!game.pendingSkills || game.pendingSkills.length === 0) return;

        var toExecute = game.pendingSkills.filter(function (effect) {
            return !effect.executed && effect.turnIndex <= game.currentTurnIndex;
        });

        toExecute.forEach(function (effect) {
            effect.executed = true;

            switch (effect.skillId) {
                case 'no_defend':
                    game.noDefendFlag = true;
                    speak('破防效果生效，对方本次不能防御');
                    break;
                case 'reduce_attack':
                    game.tempDefenseReduction += 0.2;
                    speak('削弱效果生效，防御值减少');
                    break;
                case 'block_ability':
                    if (effect.targetPid === 'A') game.blockAbilityA = true;
                    else game.blockAbilityB = true;
                    speak('封技效果生效，角色技能被封印');
                    break;
            }
        });

        game.pendingSkills = game.pendingSkills.filter(function (effect) {
            return !effect.executed;
        });

        updatePlayerInfo();
    }

    function resolveSingleAttack() {
        try {
        var attacker = getPlayer(game.phaseAttacker);
        var defender = getPlayer(game.phaseDefender);
        var atkCard = game.currentAttackCard;
        var defCard = game.currentDefendCard;

        var atkVal = atkCard.value;
        var atkBonus = (game.phaseAttacker === 'A' ? game.blockAbilityA : game.blockAbilityB) ? 0 : getTotalAtkBonus(game.phaseAttacker);
        var atkWithBonus = Math.round(atkVal * (1 + atkBonus));
        var defVal = defCard ? defCard.value : 0;
        var defBonus = (game.phaseDefender === 'A' ? game.blockAbilityA : game.blockAbilityB) ? 0 : getTotalDefBonus(game.phaseDefender);
        var defWithBonus = defCard ? Math.round(defVal * (1 + defBonus)) : 0;
        var finalDamage = Math.max(0, atkWithBonus - defWithBonus);
        var hpLoss = finalDamage / 30;

        if (game.phaseAttacker === 'A') { game.blockAbilityA = false; } else { game.blockAbilityB = false; }
        if (game.phaseDefender === 'A') { game.blockAbilityA = false; } else { game.blockAbilityB = false; }

        if (hpLoss > 0) {
            defender.hp = Math.max(0, defender.hp - hpLoss);
            if (game.phaseAttacker === 'A') game.totalDamageA += finalDamage; else game.totalDamageB += finalDamage;
            var goldReward = finalDamage * 20;
            attacker.gold += goldReward;
        } else if (defCard && finalDamage === 0) {
            defender.gold += 300;
        }

        game.currentAttackIndex++;
        updatePlayerInfo();
        updateAttackProgress();

        addBattleLogEntry(atkCard, atkWithBonus, defCard, defWithBonus, finalDamage, game.phaseAttacker, game.phaseDefender);

        var bonusInfo = checkRarityBonus(atkCard, finalDamage);
        updateAttackProgress();

        var abilityText = '';
        if (attacker.char && attacker.char.atkBonus > 0) abilityText += '<div style="color:var(--gold-light);font-size:13px;margin:4px 0;">⚡ 角色能力：' + generateAbilityDesc(attacker.char) + '</div>';
        if (defCard && defender.char && defender.char.defBonus > 0) abilityText += '<div style="color:var(--gold-light);font-size:13px;margin:4px 0;">🛡️ 角色能力：' + generateAbilityDesc(defender.char) + '</div>';
        var atkMartialNames = getMartialArtsNames(game.phaseAttacker, 'attack');
        if (atkMartialNames) abilityText += '<div style="color:#fca5a5;font-size:12px;margin:4px 0;">🗡️ 攻击武功加成：' + atkMartialNames + '</div>';
        var defMartialNames = getMartialArtsNames(game.phaseDefender, 'defend');
        if (defMartialNames) abilityText += '<div style="color:#93c5fd;font-size:12px;margin:4px 0;">🛡️ 防御武功加成：' + defMartialNames + '</div>';

        var epicSkillHtml = '';
        if (atkCard.skill) {
            epicSkillHtml = applyEpicSkill(atkCard, game.phaseAttacker, game.phaseDefender);
        }
        if (defCard && defCard.skill) {
            var defSkillHtml = applyEpicSkill(defCard, game.phaseDefender, game.phaseAttacker);
            epicSkillHtml += defSkillHtml;
        }

        if (game.tempDefenseReduction > 0 && defWithBonus > 0) {
            var reducedDef = Math.round(defWithBonus * (1 - game.tempDefenseReduction));
            defWithBonus = Math.max(0, reducedDef);
            finalDamage = Math.max(0, atkWithBonus - defWithBonus);
            hpLoss = finalDamage / 30;
            game.tempDefenseReduction = 0;
        }

        var maxAtk = getMaxAttacks();
        var phaseLabel = game.isCounterPhase ? '反击' : '攻击';

        var html = '<div style="font-size:14px;color:var(--text-dim);margin-bottom:6px;">' + phaseLabel + '进度：已攻击 ' + game.currentAttackIndex + '/' + maxAtk + ' 次</div>' +
            '<div style="font-size:14px;color:var(--text-dim);margin-bottom:8px;">' + renderEmoji(atkCard.icon) + atkCard.name + ' ' + atkWithBonus + ' vs ' + (defCard ? renderEmoji(defCard.icon) + defCard.name + ' ' + defWithBonus : '无防御') + '</div>' +
            abilityText +
            '<div class="damage-number">' + (finalDamage > 0 ? '-' + finalDamage : '0') + '</div>' +
            '<div class="damage-detail">攻击 ' + atkWithBonus + ' - 防御 ' + defWithBonus + ' = 伤害 ' + finalDamage + '</div>' +
            '<div class="damage-result">' + playerLabel(game.phaseDefender) + '（' + defender.char.name + '）受到 <span style="color:var(--red-light)">' + finalDamage + '</span> 点伤害' +
            (hpLoss > 0 ? '，扣除 <span style="color:var(--red-light)">' + hpLoss.toFixed(1) + '</span> 点血量' : '，未造成伤害') + '</div>' +
            (finalDamage > 0 ? '<div style="margin-top:6px;padding:8px;background:rgba(212,168,67,0.15);border:1px solid var(--gold);border-radius:6px;color:var(--gold-light);font-size:14px;font-weight:600;">💰 攻击成功！奖励 +' + (finalDamage * 20) + ' 金币</div>' : '') +
            (defCard && finalDamage === 0 ? '<div style="margin-top:6px;padding:8px;background:rgba(74,222,128,0.15);border:1px solid #4ade80;border-radius:6px;color:#4ade80;font-size:14px;font-weight:600;">🛡️ 防御成功！奖励 +300 金币</div>' : '') +
            '<div style="margin-top:8px;font-size:14px;">' + playerLabel(game.phaseDefender) + '（' + defender.char.name + '）剩余血量：<strong style="color:var(--gold-light)">' + defender.hp.toFixed(1) + '/' + defender.maxHp + '</strong></div>' +
            epicSkillHtml +
            bonusInfo;

        showSection('damage-area');
        $('damage-display').innerHTML = html;
        $('center-actions').innerHTML = '';
        hideAllOps();
        clearCountdown();
        clearOpponentWaitCountdown();

        if (finalDamage > 0) {
            playSound('damage');
            var defInfo = game.phaseDefender === 'A' ? $('player-a-info') : $('player-b-info');
            defInfo.classList.add('shake'); setTimeout(function () { defInfo.classList.remove('shake'); }, 500);
            speak(defender.char.name + '受到' + finalDamage + '点伤害，剩余血量' + defender.hp.toFixed(1));
        } else { playSound('defend'); speak('攻击被完全防御'); }

        if (defender.hp <= 0) {
            waitForSpeech(function () { try { endGame(game.phaseAttacker); } catch (e) { handleError('resolveSingleAttack-timeout', e); } }, 1500);
        } else {
            waitForSpeech(function () {
                try {
                showContinueChoice();
                } catch (e) { handleError('resolveSingleAttack-continue', e); }
            }, 1500);
        }
        } catch (e) { handleError('resolveSingleAttack', e); }
    }

    function checkRarityBonus(atkCard, finalDamage) {
        if (finalDamage <= 0) return '';
        if (atkCard.rarity !== 'rare' && atkCard.rarity !== 'epic') return '';
        if (Math.random() >= 0.3) return '';

        var bonusCards = [];
        var attacker = getPlayer(game.phaseAttacker);

        if (atkCard.rarity === 'rare') {
            var c = randomWeapon(); c.uid = newCardUid();
            attacker.library.push(c); bonusCards.push(c);
        } else if (atkCard.rarity === 'epic') {
            for (var j = 0; j < 2; j++) {
                var c2 = randomWeapon(); c2.uid = newCardUid();
                attacker.library.push(c2); bonusCards.push(c2);
            }
        }

        if (bonusCards.length === 0) return '';

        updatePlayerInfo();
        var cardNames = bonusCards.map(function (c) { return renderEmoji(c.icon) + c.name; }).join('、');
        playSound('bonus');

        var bonusText = '<div style="margin-top:12px;padding:10px;background:rgba(212,168,67,0.15);border:1px solid var(--gold);border-radius:8px;">' +
            '<div style="color:var(--gold-light);font-size:15px;font-weight:700;">🎁 ' + RARITY_NAMES[atkCard.rarity] + '装备特效触发！</div>' +
            '<div style="color:var(--text-light);font-size:13px;margin:4px 0;">奖励卡牌：' + cardNames + '</div>' +
            '</div>';

        setTimeout(function () {
            speak(RARITY_NAMES[atkCard.rarity] + '装备特效触发，奖励' + bonusCards.length + '张卡牌');
        }, 800);

        return bonusText;
    }

    function showContinueChoice() {
        clearCountdown();
        clearOpponentWaitCountdown();
        var atkCards = getPlayer(game.phaseAttacker).library.filter(function (c) { return c.type === 'attack'; });
        var maxAtk = getMaxAttacks();

        if (game.currentAttackIndex >= maxAtk || atkCards.length === 0) {
            notifyPeer('end-attack', { currentAttackIndex: game.currentAttackIndex, attackReduction: game.attackReduction, bonusAttacks: game.bonusAttacks, isCounterPhase: game.isCounterPhase });
            afterAttackPhaseEnds();
            return;
        }

        setActivePlayer(game.phaseAttacker);
        updateAttackProgress();
        hideAllOps();

        var phaseLabel = game.isCounterPhase ? '反击' : '攻击';
        $('action-hint').textContent = phaseLabel + '阶段（已攻击 ' + game.currentAttackIndex + '/' + maxAtk + ' 次）';

        showOp(game.phaseAttacker, 'continue-attack', { text: '⚔️ 继续攻击（' + (game.currentAttackIndex + 1) + '/' + maxAtk + '）<span id="ca-countdown">(10s)</span>', html: true });
        showOp(game.phaseAttacker, 'end-attack');
        showOp(game.phaseAttacker, 'sell');
        showOp(game.phaseAttacker, 'buy');
        showOp(game.phaseAttacker, 'synthesis');
        showOp(game.phaseAttacker, 'cultivation');
        setOpsStatus(game.phaseAttacker, phaseLabel + ' ' + game.currentAttackIndex + '/' + maxAtk + ' 次');

        announcePlayerTurn(game.phaseAttacker, '已完成' + game.currentAttackIndex + '次攻击，是否继续');
        if (!isOnlineMode || canIOperate(game.phaseAttacker)) {
            var caCountdown = 10;
            var caTimer = setInterval(function () {
                caCountdown--;
                var cdEl = document.getElementById('ca-countdown');
                if (cdEl) cdEl.textContent = '(' + caCountdown + 's)';
                if (caCountdown <= 0) {
                    clearInterval(caTimer);
                    var btn = opBtn(game.phaseAttacker, 'continue-attack');
                    if (btn && btn.style.display !== 'none') btn.click();
                }
            }, 1000);
        } else if (isOnlineMode) {
            showOpponentWaitCountdown(10);
        }
    }

    function afterAttackPhaseEnds() {
        clearCountdown();
        clearOpponentWaitCountdown();
        hideAllOps();
        var el = $('attack-progress');
        if (el) el.style.display = 'none';
        console.log('[ afterAttackPhaseEnds ] isCounterPhase:', game.isCounterPhase, 'phaseAttacker:', game.phaseAttacker, 'firstAttacker:', game.firstAttacker, 'secondAttacker:', game.secondAttacker);

        var shouldStartCounter = !game.isCounterPhase;

        if (!shouldStartCounter && game.phaseAttacker === game.firstAttacker) {
            console.warn('[ afterAttackPhaseEnds ] 状态不一致！phaseAttacker是先攻方但isCounterPhase为true，修正为开始反击阶段');
            shouldStartCounter = true;
        }

        console.log('[ afterAttackPhaseEnds ] shouldStartCounter:', shouldStartCounter);

        if (shouldStartCounter) {
            console.log('[ afterAttackPhaseEnds ] 开始反击阶段 - 设置 isCounterPhase = true');
            startAttackPhase(true);
        } else {
            console.log('[ afterAttackPhaseEnds ] 进入下一轮');
            nextRound();
        }
    }

    function nextRound() {
        try {
        clearCountdown();
        game.allRoundLogs.push({ round: game.round, log: game.roundLog.slice() });

        var rewardCardsA = [];
        var rewardCardsB = [];
        ['A', 'B'].forEach(function (pid) {
            var player = getPlayer(pid);
            player.gold += 1500;
            for (var i = 0; i < 5; i++) {
                var card = randomWeapon();
                player.library.push(card);
                if (pid === 'A') rewardCardsA.push(card);
                else rewardCardsB.push(card);
            }
        });
        var newCardUids = rewardCardsA.concat(rewardCardsB).map(function (c) { return c.uid; });
        updatePlayerInfo();
        updateLibraryDisplay(newCardUids);

        game.round++;
        if (game.round > MAX_ROUNDS) {
            if (game.playerA.hp > game.playerB.hp) endGame('A');
            else if (game.playerB.hp > game.playerA.hp) endGame('B');
            else endGame('draw'); return;
        }

        var rewardInfoA = rewardCardsA.map(function (c) { return renderEmoji(c.icon) + c.name; }).join('、');
        var rewardInfoB = rewardCardsB.map(function (c) { return renderEmoji(c.icon) + c.name; }).join('、');

        showModal('<h3>第' + (game.round - 1) + '轮结束</h3>' +
            '<p>玩家A（' + game.playerA.char.name + '）剩余血量：' + game.playerA.hp.toFixed(1) + '/' + game.playerA.maxHp + '</p>' +
            '<p>玩家B（' + game.playerB.char.name + '）剩余血量：' + game.playerB.hp.toFixed(1) + '/' + game.playerB.maxHp + '</p>' +
            '<div style="margin:10px 0;padding:10px;background:rgba(212,168,67,0.15);border:1px solid var(--gold);border-radius:8px;">' +
            '<div style="color:var(--gold-light);font-size:15px;font-weight:700;">🎁 轮次奖励</div>' +
            '<div style="color:var(--text-light);font-size:13px;margin:4px 0;">💰 每位玩家获得 1500 金币</div>' +
            '<div style="color:var(--text-light);font-size:13px;">玩家A获得卡牌：' + rewardInfoA + '</div>' +
            '<div style="color:var(--text-light);font-size:13px;">玩家B获得卡牌：' + rewardInfoB + '</div>' +
            '</div>' +
            '<p style="color:var(--text-dim);font-size:12px;margin-top:8px;">未使用的卡牌将保留至下一轮</p>' +
            '<button class="btn btn-primary modal-btn" id="btn-nr">开始第' + game.round + '轮 <span id="nr-countdown">(10s)</span></button>');
        $('btn-nr').addEventListener('click', function () { try { hideModal(); startWeaponDrawPhase(); } catch (e) { handleError('nextRound-btn', e); } });
        if (game.round >= 2) {
            var nrCountdown = 10;
            var nrTimer = setInterval(function () {
                nrCountdown--;
                var cdEl = document.getElementById('nr-countdown');
                if (cdEl) cdEl.textContent = '(' + nrCountdown + 's)';
                if (nrCountdown <= 0) {
                    clearInterval(nrTimer);
                    var btn = $('btn-nr');
                    if (btn && btn.parentNode) btn.click();
                }
            }, 1000);
        } else {
            var cdEl = document.getElementById('nr-countdown');
            if (cdEl) cdEl.textContent = '';
        }
        } catch (e) { handleError('nextRound', e); }
    }

    function endGame(winner) {
        clearCountdown();
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
            $('winner-display').innerHTML = '<div class="winner-char">' + renderEmoji(wp.char.emoji) + ' ' + wp.char.name + '</div><div class="winner-player">' + playerLabel(winner) + ' 获胜！🎉</div>';
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
                var atkHtml = '<span style="color:var(--red-light)">' + renderEmoji(entry.atkCard.icon) + entry.atkCard.name + '(' + entry.atkWithBonus + ')</span>';
                var defHtml = entry.defCard
                    ? '<span style="color:var(--blue-light)">' + renderEmoji(entry.defCard.icon) + entry.defCard.name + '(' + entry.defWithBonus + ')</span>'
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
            var atkCards = getPlayer(game.phaseAttacker).library.filter(function (c) { return c.type === 'attack'; });
            if (atkCards.length === 0) {
                hideSelectAreas();
                hideAllOps();
                showOp(game.phaseAttacker, 'end-attack');
                setOpsStatus(game.phaseAttacker, '没有攻击卡牌了');
                return;
            }
            renderCardHand(game.phaseAttacker, 'attack');
            showOp(game.phaseAttacker, 'confirm-card', { disabled: true, text: '⚔️ 攻击出牌' });
            showOp(game.phaseAttacker, 'sell');
            showOp(game.phaseAttacker, 'buy');
            showOp(game.phaseAttacker, 'synthesis');
            showOp(game.phaseAttacker, 'cultivation');
        } else if (game.phase === 'defend-select') {
            var defCards = getPlayer(game.phaseDefender).library.filter(function (c) { return c.type === 'defend'; });
            if (defCards.length === 0) {
                hideSelectAreas();
                hideAllOps();
                showOp(game.phaseDefender, 'skip-defend');
                showOp(game.phaseDefender, 'sell');
                showOp(game.phaseDefender, 'buy');
                showOp(game.phaseDefender, 'synthesis');
                showOp(game.phaseDefender, 'cultivation');
                setOpsStatus(game.phaseDefender, '没有防御卡牌了');
                return;
            }
            renderCardHand(game.phaseDefender, 'defend');
            showOp(game.phaseDefender, 'confirm-card', { disabled: true, text: '🛡️ 防御出牌' });
            showOp(game.phaseDefender, 'skip-defend');
            showOp(game.phaseDefender, 'sell');
            showOp(game.phaseDefender, 'buy');
            showOp(game.phaseDefender, 'synthesis');
            showOp(game.phaseDefender, 'cultivation');
        }
    }

    function showSellModal(pid) {
        try {
        var player = getPlayer(pid);
        if (player.library.length === 0) {
            showModal('<div class="modal-close-btn" id="btn-close-sell-x">✕</div><h3>出售卡牌</h3><p style="color:var(--text-dim);">没有可出售的卡牌</p>');
            $('btn-close-sell-x').addEventListener('click', function () { try { hideModal(); refreshCurrentCardSelect(); } catch (e) { handleError('showSellModal-empty', e); } });
            return;
        }
        var html = '<div class="modal-close-btn" id="btn-close-sell-x">✕</div><h3>🔄 出售卡牌</h3>' +
            '<p class="hint-text">当前金币: 💰' + player.gold + '</p>' +
            '<div class="sell-cards-list">';
        player.library.forEach(function (card) {
            var typeLabel = card.type === 'attack' ? '攻击' : '防御';
            var valueLabel = card.type === 'attack' ? '伤害' : '防御';
            var sellPrice = Math.round(card.price * 0.8);
            var skillTag = card.skill ? ' ' + card.skill.icon : '';
            html += '<div class="sell-card-item" data-uid="' + card.uid + '">' +
                '<div class="sell-card-info">' +
                '<span class="sell-card-icon">' + renderEmoji(card.icon) + '</span>' +
                '<span class="sell-card-name">' + card.name + skillTag + '</span>' +
                '<span class="sell-card-type ' + card.type + '">' + typeLabel + '</span>' +
                '<span class="sell-card-value">' + valueLabel + ':' + card.value + '</span>' +
                '</div>' +
                '<div class="sell-card-action">' +
                '<span class="sell-price">💰' + sellPrice + '</span>' +
                '<button class="btn btn-small btn-sell-one" data-uid="' + card.uid + '">出售</button>' +
                '</div></div>';
        });
        html += '</div>';
        showModal(html);

        $('btn-close-sell-x').addEventListener('click', function () { try { hideModal(); refreshCurrentCardSelect(); } catch (e) { handleError('showSellModal-close', e); } });

        document.querySelectorAll('.btn-sell-one').forEach(function (btn) {
            btn.addEventListener('click', function () {
                try {
                var uid = btn.getAttribute('data-uid');
                var card = findCardByUid(player, uid);
                if (!card) return;
                var sellPrice = Math.round(card.price * 0.8);
                player.gold += sellPrice;
                var idx = player.library.findIndex(function (c) { return c.uid === uid; });
                if (idx >= 0) player.library.splice(idx, 1);
                playSound('coin');
                updatePlayerInfo();
                notifyPeer('sell-card', { uid: uid, pid: pid });
                hideModal();
                showSellModal(pid);
                } catch (e) { handleError('showSellModal-sell', e); }
            });
        });
        } catch (e) { handleError('showSellModal', e); }
    }

    function showBuyModal(pid, defaultTab) {
        try {
        var player = getPlayer(pid);
        var html = '<div class="modal-close-btn" id="btn-close-buy-x">✕</div><h3>🛒 购买</h3>' +
            '<p class="hint-text">当前金币: 💰' + player.gold + '</p>' +
            '<div class="buy-tabs">' +
            '<button class="btn btn-small buy-tab active" data-tab="cards">卡牌商店</button>' +
            '<button class="btn btn-small buy-tab" data-tab="rare-wheel">稀有转盘</button>' +
            '<button class="btn btn-small buy-tab" data-tab="black-market">黑市</button>' +
            '</div>' +
            '<div class="buy-tab-content" id="buy-tab-content"></div>';
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
                    var skillIcon = wp.skill ? ' ' + wp.skill.icon : '';
                    cardsHtml += '<div class="shop-card-item">' +
                        '<div class="weapon-card rarity-' + wp.rarity + ' shop-card">' +
                        '<span class="card-type ' + wp.type + '">' + typeLabel + '</span>' +
                        '<span class="card-icon">' + renderEmoji(wp.icon) + '</span>' +
                        '<span class="card-name">' + wp.name + skillIcon + '</span>' +
                        '<span class="card-value">' + valueLabel + ':' + wp.value + '</span>' +
                        '<span class="card-price">💰' + wp.price + '</span>' +
                        '</div>' +
                        '<button class="btn btn-small btn-buy-card' + (canBuy ? '' : ' disabled-btn') + '" data-id="' + wp.id + '"' + (canBuy ? '' : ' disabled') + '>' +
                        (canBuy ? '购买' : '金币不足') + '</button></div>';
                });
                cardsHtml += '</div>';
                content.innerHTML = cardsHtml;

                content.querySelectorAll('.shop-card').forEach(function (cardEl) {
                    cardEl.style.cursor = 'pointer';
                    cardEl.addEventListener('click', function () {
                        var wpId = cardEl.closest('.shop-card-item').querySelector('.btn-buy-card').getAttribute('data-id');
                        var wp = WEAPONS.find(function (w) { return w.id === wpId; });
                        if (wp) showCardPreview(wp);
                    });
                });

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
                        notifyPeer('buy-card', { weaponId: wp.id, price: wp.price, pid: pid, cardUid: newCard.uid });
                        hideModal();
                        showCardPreview(newCard);
                        setTimeout(function () {
                            $('card-preview-overlay').classList.add('hidden');
                            showBuyModal(pid, 'cards');
                        }, 1500);
                    });
                });
            } else if (tabName === 'rare-wheel') {
                var rareWheelPrice = 450;
                var canSpin = player.gold >= rareWheelPrice;
                var rareWheelHtml = '<div class="rare-wheel-section">' +
                    '<p style="color:var(--gold-light);font-size:14px;margin:8px 0;">转动稀有转盘，获取稀有或史诗卡牌！</p>' +
                    '<button class="btn btn-primary' + (canSpin ? '' : ' disabled-btn') + '" id="btn-spin-rare-wheel"' + (canSpin ? '' : ' disabled') + '>' +
                    '🎰 转动稀有转盘 (💰' + rareWheelPrice + ')</button>' +
                    '<div class="wheel-container small rare-wheel-container">' +
                    '<canvas id="rare-wheel-canvas" width="280" height="280"></canvas>' +
                    '<div class="wheel-pointer small"></div>' +
                    '</div>' +
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
                    var rareColors = { rare: '#1565c0', epic: '#c62828' };
                    for (var i = 0; i < n; i++) {
                        var sa = i * arc - Math.PI / 2, ea = sa + arc;
                        ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, sa, ea); ctx.closePath();
                        var wp = rareWeapons.find(function (x) { return x.id === rareWheelItems[i].id; });
                        var rkColor = wp && wp.rarity === 'epic' ? '#c62828' : '#1565c0';
                        ctx.fillStyle = rkColor; ctx.fill();
                        ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
                        ctx.save(); ctx.rotate(sa + arc / 2);
                        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff';
                        ctx.font = 'bold 16px "Noto Sans SC", sans-serif'; ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 3;
                        var label = rareWheelItems[i].name; if (label.length > 5) label = label.substring(0, 5);
                        ctx.fillText(label, r * 0.78, 0); ctx.restore();
                    }
                    var centerR = 22;
                    ctx.beginPath(); ctx.arc(0, 0, centerR + 3, 0, 2 * Math.PI); ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill();
                    ctx.beginPath(); ctx.arc(0, 0, centerR, 0, 2 * Math.PI);
                    var cGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, centerR);
                    cGrad.addColorStop(0, '#ff6b5b'); cGrad.addColorStop(1, '#e74c3c');
                    ctx.fillStyle = cGrad; ctx.fill();
                    ctx.strokeStyle = 'rgba(255,220,200,0.7)'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px "Noto Sans SC", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowBlur = 0;
                    ctx.fillText('幸运抽', 0, 0); ctx.restore();
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

                        var targetAngle = (2 * Math.PI) - (selectedIdx * ((2 * Math.PI) / rareWheelItems.length) + ((2 * Math.PI) / rareWheelItems.length) / 2) + Math.PI / 2;
                        var fullRot = Math.PI * 2 * randomInt(8, 14);
                        var totalRot = fullRot + targetAngle - (rareWheelAngle % (Math.PI * 2));
                        if (totalRot < fullRot) totalRot += Math.PI * 2;
                        var dur = 5500, st = null, sa = rareWheelAngle;
                        playSound('spin');

                        function animRare(ts) {
                            if (!st) st = ts; var el = ts - st; var pr = Math.min(el / dur, 1);
                            var eased = 1 - Math.pow(1 - pr, 4); rareWheelAngle = sa + totalRot * eased; drawRareWheel();
                            if (pr < 1) { requestAnimationFrame(animRare); }
                            else {
                                playSound('rare');
                                var wp = rareWeapons[selectedIdx];
                                var newCard = Object.assign({}, wp); newCard.uid = newCardUid();
                                player.library.push(newCard);
                                updatePlayerInfo();
                                notifyPeer('buy-card', { weaponId: wp.id, price: rareWheelPrice, pid: pid, cardUid: newCard.uid });
                                var rarityName = RARITY_NAMES[wp.rarity];
                                speak('恭喜获得' + rarityName + '装备' + wp.name);
                                hideModal();
                                showCardPreview(newCard);
                                setTimeout(function () {
                                    $('card-preview-overlay').classList.add('hidden');
                                    showBuyModal(pid, 'rare-wheel');
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
                        '<span class="card-icon">' + renderEmoji(wp.icon) + '</span>' +
                        '<span class="card-name">' + wp.name + '</span>' +
                        '<span class="card-value">' + valueLabel + ':' + wp.value + '</span>' +
                        '<span class="card-price">💰' + wp.price + '</span>' +
                        '</div>' +
                        '<button class="btn btn-small btn-buy-bm' + (canBuy ? '' : ' disabled-btn') + '" data-id="' + wp.id + '"' + (canBuy ? '' : ' disabled') + '>' +
                        (canBuy ? '购买' : '金币不足') + '</button></div>';
                });
                bmHtml += '</div></div>';
                content.innerHTML = bmHtml;

                content.querySelectorAll('.shop-card').forEach(function (cardEl) {
                    cardEl.style.cursor = 'pointer';
                    cardEl.addEventListener('click', function () {
                        var wpId = cardEl.closest('.shop-card-item').querySelector('.btn-buy-bm').getAttribute('data-id');
                        var wp = BLACK_MARKET_WEAPONS.find(function (w) { return w.id === wpId; });
                        if (wp) showCardPreview(wp);
                    });
                });

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
                        notifyPeer('buy-card', { weaponId: wp.id, price: wp.price, pid: pid, cardUid: newCard.uid });
                        speak('购买成功，获得' + wp.name);
                        hideModal();
                        showCardPreview(newCard);
                        waitForSpeech(function () {
                            $('card-preview-overlay').classList.add('hidden');
                            showBuyModal(pid, 'black-market');
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

        renderBuyTab(defaultTab || 'cards');
        $('btn-close-buy-x').addEventListener('click', function () { try { hideModal(); refreshCurrentCardSelect(); } catch (e) { handleError('showBuyModal-close', e); } });
        } catch (e) { handleError('showBuyModal', e); }
    }

    function initGameOver() {
        $('btn-restart').addEventListener('click', function () {
            playSound('click');
            if (isOnlineMode && Multiplayer.isConnected()) {
                if (game.peerRematchRequested) {
                    game.rematchRequested = true;
                    notifyPeer('rematch-request', {});
                    startRematch();
                } else if (!game.rematchRequested) {
                    $('btn-restart').disabled = true;
                    $('btn-restart').textContent = '⏳ 等待对方确认...';
                    game.rematchRequested = true;
                    notifyPeer('rematch-request', {});
                }
            } else {
                var sm = game.mode, ss = game.soundEnabled, sb = game.bgmEnabled;
                game = {
                    mode: sm, phase: 'start', currentPlayer: 'A', round: 1,
                    playerA: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 3000 },
                    playerB: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 3000 },
                    firstAttacker: null, secondAttacker: null,
                    weaponDrawCountA: 0, weaponDrawCountB: 0,
                    selectedCardUid: null, soundEnabled: ss, voiceEnabled: ss, bgmEnabled: sb,
                    totalDamageA: 0, totalDamageB: 0, usedCharIds: [],
                    currentDrawnCard: null, currentAttackIndex: 0, bonusAttacks: 0,
                    phaseAttacker: null, phaseDefender: null, isCounterPhase: false,
                    currentAttackCard: null, currentDefendCard: null, roundLog: [],
                    allRoundLogs: [], tableCards: [],
                    noDefendFlag: false, blockAbilityA: false, blockAbilityB: false, attackReduction: 0, tempDefenseReduction: 0,
                    pendingSkills: [], nextTurnNoDefend: { A: false, B: false },
                    currentTurnIndex: 0,
                    characterBonus: { A: { atkBonus: 0, defBonus: 0 }, B: { atkBonus: 0, defBonus: 0 } },
                    martialArts: { A: [], B: [] },
                    synthesisState: { slotA: null, slotB: null, isProcessing: false, playerPid: null },
                    cultivationState: { selectedArtId: null, isProcessing: false, playerPid: null },
                    rematchRequested: false, peerRematchRequested: false
                };
                wheelAngle = 0; cardUidCounter = 0; showScreen('screen-start');
            }
        });
    }

    function startRematch() {
        try {
        console.log('[ rematch ] 开始新一局');
        var ss = game.soundEnabled, sb = game.bgmEnabled;
        console.log('[ rematch ] isOnlineMode:', isOnlineMode, 'Multiplayer.isConnected():', Multiplayer.isConnected());
        vsAnimationShown = false;
        console.log('[ rematch ] 重置 vsAnimationShown = false');
        game = {
            mode: 'online', phase: 'start', currentPlayer: 'A', round: 1,
            playerA: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 3000 },
            playerB: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 3000 },
            firstAttacker: null, secondAttacker: null,
            weaponDrawCountA: 0, weaponDrawCountB: 0,
            selectedCardUid: null, soundEnabled: ss, voiceEnabled: ss, bgmEnabled: sb,
            totalDamageA: 0, totalDamageB: 0, usedCharIds: [],
            currentDrawnCard: null, currentAttackIndex: 0, bonusAttacks: 0,
            phaseAttacker: null, phaseDefender: null, isCounterPhase: false,
            currentAttackCard: null, currentDefendCard: null, roundLog: [],
            allRoundLogs: [], tableCards: [],
            noDefendFlag: false, noDefendUsedThisRound: false, usedSkillsThisRound: {},
            blockAbilityA: false, blockAbilityB: false, attackReduction: 0, tempDefenseReduction: 0,
            pendingSkills: [], nextTurnNoDefend: { A: false, B: false },
            currentTurnIndex: 0,
            characterBonus: { A: { atkBonus: 0, defBonus: 0 }, B: { atkBonus: 0, defBonus: 0 } },
            martialArts: { A: [], B: [] },
            synthesisState: { slotA: null, slotB: null, isProcessing: false, playerPid: null },
            cultivationState: { selectedArtId: null, isProcessing: false, playerPid: null },
            rematchRequested: false, peerRematchRequested: false
        };
        wheelAngle = 0; cardUidCounter = 0;
        $('char-result-old').classList.add('hidden');
        hideModal();
        console.log('[ rematch ] 调用 startCharacterSelect()');
        startCharacterSelect();
        } catch (e) { handleError('startRematch', e); }
    }

    function initSwitchPlayer() { $('btn-switch-player').addEventListener('click', function () { playSound('click'); switchPlayer(); }); }
    function initCardPreview() { $('card-preview-overlay').addEventListener('click', function () { $('card-preview-overlay').classList.add('hidden'); }); }
    function initSelectCardPreview() {
        document.addEventListener('mousedown', function (e) {
            var previewEl = $('select-card-preview');
            if (!previewEl || previewEl.classList.contains('hidden')) return;
            var target = e.target;
            if (!previewEl.contains(target) && !target.closest('.panel-select-cards')) {
                hideSelectCardPreview();
            }
        });
    }

    function initWeaponDraw() {
        ['a', 'b'].forEach(function (p) {
            $('btn-' + p + '-spin-weapon').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.phase !== 'weapon-draw') return;
                if (isOnlineMode && !canIOperate(pid)) return;
                var countVar = pid === 'A' ? 'weaponDrawCountA' : 'weaponDrawCountB';
                if (game[countVar] >= 3) return;
                spinWheelForPlayer(pid);
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
                if (isOnlineMode && !canIOperate(pid)) return;
                playSound('click'); showAttackCardSelect();
                notifyPeer('continue-attack', { currentAttackIndex: game.currentAttackIndex, attackReduction: game.attackReduction, bonusAttacks: game.bonusAttacks, isCounterPhase: game.isCounterPhase });
            });
            $('btn-' + p + '-end-attack').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.phaseAttacker !== pid) return;
                if (isOnlineMode && !canIOperate(pid)) return;
                playSound('click'); stopSpeech(); afterAttackPhaseEnds();
                notifyPeer('end-attack', { currentAttackIndex: game.currentAttackIndex, attackReduction: game.attackReduction, bonusAttacks: game.bonusAttacks, isCounterPhase: game.isCounterPhase });
            });
        });
    }

    function initSellBuy() {
        ['a', 'b'].forEach(function (p) {
            $('btn-' + p + '-sell').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (isOnlineMode && !canIOperate(pid)) return;
                playSound('click');
                showSellModal(pid);
            });
            $('btn-' + p + '-buy').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (isOnlineMode && !canIOperate(pid)) return;
                playSound('click');
                showBuyModal(pid);
            });
        });
    }

    function init() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = function () { loadVoices(); };
            loadVoices();
        }
        initStartScreen(); initCharacterSelect(); initWeaponDraw();
        initCardSelect(); initContinueChoice();
        initGameOver(); initCardPreview(); initSelectCardPreview(); initSellBuy();
        initSynthesisCultivationButtons(); initMultiplayer();
        showScreen('screen-start');
    }

    var lobbyReady = false;

    function initMultiplayer() {
        $('tab-create').addEventListener('click', function () {
            document.querySelectorAll('.btn-tab').forEach(function (t) { t.classList.remove('active'); });
            document.querySelectorAll('.lobby-panel').forEach(function (p) { p.classList.remove('active'); });
            this.classList.add('active');
            $('panel-create').classList.add('active');
        });
        $('tab-join').addEventListener('click', function () {
            document.querySelectorAll('.btn-tab').forEach(function (t) { t.classList.remove('active'); });
            document.querySelectorAll('.lobby-panel').forEach(function (p) { p.classList.remove('active'); });
            this.classList.add('active');
            $('panel-join').classList.add('active');
            $('input-room-id').classList.remove('hidden');
        });

        $('btn-create-room').addEventListener('click', handleCreateRoom);
        $('btn-join-room').addEventListener('click', handleJoinRoom);
        $('btn-copy-room').addEventListener('click', handleCopyRoomId);
        $('btn-start-online').addEventListener('click', handleStartOnlineGame);
        $('btn-leave-lobby').addEventListener('click', handleLeaveLobby);
        $('btn-leave-join').addEventListener('click', handleLeaveLobby);
        $('btn-disconnect-ok').addEventListener('click', function () {
            $('disconnect-notice').classList.add('hidden');
            hideDisconnectModal();
            Multiplayer.cleanup();
            isOnlineMode = false;
            initLobby();
            showScreen('screen-lobby');
        });

        $('input-room-id').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') handleJoinRoom();
        });

        Multiplayer.on('connected', function (info) {
            playSound('result');
            updateOnlineStatusBar();
            if (info.isHost) {
                $('peer-info').classList.remove('hidden');
                $('create-status').textContent = '✅ 对方已连接！';
                $('btn-create-room').classList.add('hidden');
                $('btn-start-online').classList.remove('hidden');
                lobbyReady = true;
            } else {
                $('join-peer-info').classList.remove('hidden');
                $('join-peer-text').textContent = '✅ 已连接到房主，等待开始游戏...';
                $('join-status').textContent = '';
                $('btn-join-room').classList.add('hidden');
                lobbyReady = true;
            }
        });

        var disconnectCountdownTimer = null;
        var disconnectCountdownRemaining = 0;
        var DISCONNECT_COUNTDOWN = 30;
        var isDisconnectModalShowing = false;

        function showReconnectModal(reason) {
            if (isDisconnectModalShowing) return;
            isDisconnectModalShowing = true;

            $('disconnect-icon').textContent = '🔄';
            $('disconnect-title').textContent = '连接中断';
            $('disconnect-reason').textContent = reason || '对方已断开连接';
            $('disconnect-countdown').classList.remove('hidden');
            $('disconnect-status').classList.remove('hidden');
            $('disconnect-status').textContent = '正在尝试自动重连...';
            $('btn-disconnect-reconnect').classList.remove('hidden');
            $('btn-disconnect-ok').classList.add('hidden');

            disconnectCountdownRemaining = DISCONNECT_COUNTDOWN;
            $('disconnect-timer').textContent = disconnectCountdownRemaining;
            $('disconnect-notice').classList.remove('hidden');

            playSound('lose');

            clearInterval(disconnectCountdownTimer);
            disconnectCountdownTimer = setInterval(function () {
                disconnectCountdownRemaining--;
                $('disconnect-timer').textContent = Math.max(0, disconnectCountdownRemaining);
                if (disconnectCountdownRemaining <= 0) {
                    clearInterval(disconnectCountdownTimer);
                    showFinalDisconnect(reason);
                }
            }, 1000);
        }

        function showFinalDisconnect(reason) {
            $('disconnect-icon').textContent = '🔌';
            $('disconnect-title').textContent = '连接已断开';
            $('disconnect-reason').textContent = reason || '对方已断开连接';
            $('disconnect-countdown').classList.add('hidden');
            $('disconnect-status').classList.add('hidden');
            $('btn-disconnect-reconnect').classList.add('hidden');
            $('btn-disconnect-ok').classList.remove('hidden');
        }

        function hideDisconnectModal() {
            clearInterval(disconnectCountdownTimer);
            disconnectCountdownTimer = null;
            isDisconnectModalShowing = false;
            $('disconnect-notice').classList.add('hidden');
        }

        function onReconnected() {
            hideDisconnectModal();
            updateOnlineStatusBar();
            console.log('[UI] 重连成功，恢复游戏UI, 当前阶段:', game.phase);
            try {
                if (game.phase === 'character-select') {
                    updateCharSelectUI();
                } else if (game.phase === 'battle') {
                    updatePlayerInfo();
                    var myLib = Multiplayer.isHost() ? game.playerA.library : game.playerB.library;
                    if (myLib && myLib.length > 0) {
                        updateLibraryDisplay(myLib.map(function (c) { return c.uid; }));
                    }
                }
            } catch (e) {
                console.error('[UI] 恢复游戏UI失败:', e);
            }
        }

        function onUpdateReconnectStatus(text) {
            var el = $('disconnect-status');
            if (el && !el.classList.contains('hidden')) el.textContent = text;
        }

        $('btn-disconnect-reconnect').addEventListener('click', function () {
            console.log('[UI] 用户点击手动重连');
            $('disconnect-status').textContent = '正在重连...';
            Multiplayer.attemptPeerReconnect();
        });

        Multiplayer.on('disconnected', function () {
            updateOnlineStatusBar();
            console.log('[UI] 连接断开，显示重连弹窗');
            showReconnectModal('对方已断开连接');
        });

        Multiplayer.on('connection-error', function () {
            updateOnlineStatusBar();
            showReconnectModal('连接发生错误');
        });

        Multiplayer.on('peer-left', function (data) {
            updateOnlineStatusBar();
            hideDisconnectModal();
            $('disconnect-icon').textContent = '👋';
            $('disconnect-title').textContent = '对方已离开';
            $('disconnect-reason').textContent = '对方主动离开了游戏';
            $('disconnect-countdown').classList.add('hidden');
            $('disconnect-status').classList.add('hidden');
            $('btn-disconnect-reconnect').classList.add('hidden');
            $('btn-disconnect-ok').classList.remove('hidden');
            $('disconnect-notice').classList.remove('hidden');
            playSound('lose');
            isDisconnectModalShowing = true;
        });

        Multiplayer.on('peer-timeout', function () {
            updateOnlineStatusBar();
            console.log('[UI] 心跳超时');
            if (!isDisconnectModalShowing) {
                showReconnectModal('对方已掉线（无心跳响应）');
            }
        });

        Multiplayer.on('connected', function () {
            if (isDisconnectModalShowing) {
                onReconnected();
                setTimeout(function() {
                    if (isOnlineMode && game.phase !== 'start' && game.phase !== 'character-select') {
                        console.log('[UI] 重连成功，请求完整状态同步');
                        requestFullSync();
                    }
                }, 500);
            }
        });

        Multiplayer.on('request-full-sync', function (data) {
            console.log('[UI] 收到状态同步请求，准备发送当前状态');
            setTimeout(sendFullSync, 200, data.requesterRole);
        });

        Multiplayer.on('reconnecting', function (data) {
            updateOnlineStatusBar('🔄 正在重连 (' + data.attempt + '/' + data.max + ')...');
            onUpdateReconnectStatus('正在重连 (' + data.attempt + '/' + data.max + ')...');
            console.log('[UI] 重连中: ' + data.attempt + '/' + data.max);
        });

        Multiplayer.on('signal-restored', function () {
            updateOnlineStatusBar('✅ 信号已恢复，等待P2P连接...');
            onUpdateReconnectStatus('✅ 信号服务器已恢复，正在重新建立连接...');
            console.log('[UI] 信号服务器已恢复');
        });

        Multiplayer.on('reconnect-failed', function (data) {
            updateOnlineStatusBar();
            onUpdateReconnectStatus('❌ 重连失败，' + (DISCONNECT_COUNTDOWN - disconnectCountdownRemaining) + '秒后返回大厅');
            console.log('[UI] 重连失败:', data.reason);
        });

        Multiplayer.on('both-disconnected', function (data) {
            updateOnlineStatusBar();
            console.log('[UI] 双方都已掉线');
            hideDisconnectModal();
            $('disconnect-icon').textContent = '📡';
            $('disconnect-title').textContent = '双方已掉线';
            $('disconnect-reason').textContent = '双方网络连接都已断开，无法继续游戏';
            $('disconnect-countdown').classList.add('hidden');
            $('disconnect-status').textContent = '网络连接已完全中断';
            $('disconnect-status').classList.remove('hidden');
            $('btn-disconnect-reconnect').classList.add('hidden');
            $('btn-disconnect-ok').classList.remove('hidden');
            $('btn-disconnect-ok').textContent = '返回大厅';
            $('disconnect-notice').classList.remove('hidden');
            isDisconnectModalShowing = true;
            clearInterval(disconnectCountdownTimer);
            disconnectCountdownTimer = null;
            playSound('lose');
        });

        Multiplayer.on('game:action', function (msg) {
            handlePeerAction(msg.action, msg.payload, msg.from);
        });

        Multiplayer.on('game:sync', function (data) {
            handlePeerAction('sync', data, null);
        });

        window.addEventListener('beforeunload', function () {
            if (Multiplayer.isConnected()) {
                Multiplayer.sendLeaveNotice();
            }
        });
    }

    function initLobby() {
        try {
        lobbyReady = false;
        var roomCreated = $('room-created-area');
        var peerInfo = $('peer-info');
        var joinPeerInfo = $('join-peer-info');
        var joinRoomArea = $('join-room-area');
        var btnCreateRoom = $('btn-create-room');
        var btnStartOnline = $('btn-start-online');
        var btnJoinRoom = $('btn-join-room');
        var createStatus = $('create-status');
        var joinStatus = $('join-status');
        var inputRoomId = $('input-room-id');
        var tabCreate = $('tab-create');
        var panelCreate = $('panel-create');

        if (roomCreated) roomCreated.classList.add('hidden');
        if (peerInfo) peerInfo.classList.add('hidden');
        if (joinPeerInfo) joinPeerInfo.classList.add('hidden');
        if (joinRoomArea) joinRoomArea.classList.add('hidden');
        if (btnCreateRoom) btnCreateRoom.classList.remove('hidden');
        if (btnStartOnline) btnStartOnline.classList.add('hidden');
        if (btnJoinRoom) { btnJoinRoom.classList.remove('hidden'); btnJoinRoom.disabled = false; btnJoinRoom.textContent = '加入房间'; }
        if (createStatus) createStatus.textContent = '';
        if (joinStatus) joinStatus.textContent = '';
        var joinPeerText = $('join-peer-text');
        if (joinPeerText) joinPeerText.textContent = '已连接到房主，等待开始游戏...';
        if (inputRoomId) { inputRoomId.value = 'CG_'; inputRoomId.classList.remove('hidden'); }
        document.querySelectorAll('.btn-tab').forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.lobby-panel').forEach(function (p) { p.classList.remove('active'); });
        if (tabCreate) tabCreate.classList.add('active');
        if (panelCreate) panelCreate.classList.add('active');
        } catch (e) {
            console.error('[initLobby] 初始化大厅失败:', e);
        }
    }

    function handleCreateRoom() {
        try {
        var btn = $('btn-create-room');
        btn.disabled = true; btn.textContent = '创建中...';
        $('create-status').textContent = '⏳ 正在创建房间...';

        Multiplayer.createRoom().then(function (id) {
            try {
            btn.style.display = 'none';
            $('room-created-area').classList.remove('hidden');
            $('my-room-id').textContent = id;
            $('create-status').textContent = '✅ 房间已创建，等待对方加入...';
            playSound('bonus');
            setTimeout(function () { handleCopyRoomId(); }, 500);
            } catch (e) { handleError('handleCreateRoom-then', e); }
        }).catch(function (err) {
            btn.disabled = false; btn.textContent = '创建房间';
            $('create-status').textContent = '❌ ' + err.message;
            playSound('lose');
        });
        } catch (e) { handleError('handleCreateRoom', e); }
    }

    function handleJoinRoom() {
        try {
        if (typeof hideDisconnectModal === 'function') hideDisconnectModal();
        var id = $('input-room-id').value.trim();
        if (!id) { $('join-status').textContent = '❌ 请输入房间号'; return; }
        var btn = $('btn-join-room');
        btn.disabled = true; btn.textContent = '连接中...';
        $('join-status').textContent = '⏳ 正在连接...';
        $('join-room-area').classList.remove('hidden');
        $('join-room-display').textContent = id;
        $('input-room-id').classList.add('hidden');
        $('join-peer-info').classList.add('hidden');

        Multiplayer.joinRoom(id).then(function () {
            try {
            $('join-status').textContent = '✅ 连接成功，等待房主确认...';
            playSound('bonus');
            } catch (e) { handleError('handleJoinRoom-then', e); }
        }).catch(function (err) {
            btn.disabled = false; btn.textContent = '加入房间';
            $('join-status').textContent = '❌ ' + err.message;
            $('input-room-id').classList.remove('hidden');
            playSound('lose');
        });
        } catch (e) { handleError('handleJoinRoom', e); }
    }

    function handleCopyRoomId() {
        var id = Multiplayer.getRoomId();
        if (!id) return;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(id).then(function () {
                $('btn-copy-room').textContent = '✅ 已复制';
                setTimeout(function () { $('btn-copy-room').textContent = '📋 复制房间号'; }, 1500);
            });
        } else {
            var input = document.createElement('input');
            input.value = id; document.body.appendChild(input); input.select();
            document.execCommand('copy'); document.body.removeChild(input);
            $('btn-copy-room').textContent = '✅ 已复制';
            setTimeout(function () { $('btn-copy-room').textContent = '📋 复制房间号'; }, 1500);
        }
    }

    function handleStartOnlineGame() {
        if (!lobbyReady || !Multiplayer.isConnected()) {
            alert('对方尚未准备好');
            return;
        }
        playSound('click');
        isOnlineMode = true;
        game.mode = 'online';
        Multiplayer.sendGameAction('start-game', { role: 'A' });
        Multiplayer.sendSync({ action: 'start-game', role: 'A' });
        setTimeout(function () {
            if (Multiplayer.isConnected()) {
                Multiplayer.sendGameAction('start-game', { role: 'A', retry: true });
            }
        }, 1000);
        startCharacterSelect();
    }

    function handleLeaveLobby() {
        Multiplayer.cleanup();
        isOnlineMode = false;
        playSound('click');
        initLobby();
        showScreen('screen-start');
    }

    function showDisconnectNotice(reason) {
            hideDisconnectModal();
            showFinalDisconnect(reason);
            $('disconnect-notice').classList.remove('hidden');
            isDisconnectModalShowing = true;
            playSound('lose');
        }

    function canIOperate(pid) {
        if (!isOnlineMode) return true;
        return Multiplayer.amIPlayer(pid);
    }

    function serializeGameState() {
        try {
            var snapshot = {
                phase: game.phase,
                currentPlayer: game.currentPlayer,
                round: game.round,
                playerA: {
                    charId: game.playerA.char ? game.playerA.char.id : null,
                    hp: game.playerA.hp,
                    maxHp: game.playerA.maxHp,
                    gold: game.playerA.gold,
                    library: game.playerA.library.map(function(c) { return { id: c.id, uid: c.uid }; }),
                    roundCards: game.playerA.roundCards.map(function(c) { return c.uid; })
                },
                playerB: {
                    charId: game.playerB.char ? game.playerB.char.id : null,
                    hp: game.playerB.hp,
                    maxHp: game.playerB.maxHp,
                    gold: game.playerB.gold,
                    library: game.playerB.library.map(function(c) { return { id: c.id, uid: c.uid }; }),
                    roundCards: game.playerB.roundCards.map(function(c) { return c.uid; })
                },
                weaponDrawCountA: game.weaponDrawCountA,
                weaponDrawCountB: game.weaponDrawCountB,
                usedCharIds: game.usedCharIds,
                firstAttacker: game.firstAttacker,
                secondAttacker: game.secondAttacker,
                phaseAttacker: game.phaseAttacker,
                phaseDefender: game.phaseDefender,
                currentAttackIndex: game.currentAttackIndex,
                attackReduction: game.attackReduction,
                bonusAttacks: game.bonusAttacks,
                isCounterPhase: game.isCounterPhase,
                timestamp: Date.now()
            };
            Multiplayer.saveGameStateSnapshot(snapshot);
            return snapshot;
        } catch (e) {
            console.error('[状态序列化] 失败:', e);
            return null;
        }
    }

    function saveStateSnapshot() {
        if (!isOnlineMode) return;
        serializeGameState();
    }

    function requestFullSync() {
        console.log('[状态同步] 请求完整状态同步');
        Multiplayer.send('system:request-full-sync', {});
    }

    function sendFullSync(requesterRole) {
        try {
            var snapshot = serializeGameState();
            if (snapshot) {
                Multiplayer.send('game:sync', { action: 'full-state-sync', state: snapshot, fromRole: myRoleInGame });
                console.log('[状态同步] 已发送完整状态给', requesterRole);
            }
        } catch (e) {
            console.error('[状态同步] 发送失败:', e);
        }
    }

    function applyFullStateSync(syncData) {
        try {
            var state = syncData.state;
            if (!state) return;

            console.log('[状态同步] 应用完整状态，阶段:', state.phase);

            game.phase = state.phase;
            game.currentPlayer = state.currentPlayer;
            game.round = state.round;
            game.weaponDrawCountA = state.weaponDrawCountA || 0;
            game.weaponDrawCountB = state.weaponDrawCountB || 0;
            game.usedCharIds = state.usedCharIds || [];
            game.firstAttacker = state.firstAttacker || null;
            game.secondAttacker = state.secondAttacker || null;
            game.phaseAttacker = state.phaseAttacker || null;
            game.phaseDefender = state.phaseDefender || null;
            game.currentAttackIndex = state.currentAttackIndex || 0;
            game.attackReduction = state.attackReduction || 0;
            game.bonusAttacks = state.bonusAttacks || 0;
            game.isCounterPhase = state.isCounterPhase || false;

            if (state.playerA) {
                if (state.playerA.charId) {
                    var charA = CHARACTERS.find(function(c) { return c.id === state.playerA.charId; });
                    if (charA) { game.playerA.char = charA; game.playerA.hp = state.playerA.hp; game.playerA.maxHp = state.playerA.maxHp; }
                }
                game.playerA.gold = state.playerA.gold;
                game.playerA.library = state.playerA.library || [];
                game.playerA.roundCards = state.playerA.roundCards || [];
            }

            if (state.playerB) {
                if (state.playerB.charId) {
                    var charB = CHARACTERS.find(function(c) { return c.id === state.playerB.charId; });
                    if (charB) { game.playerB.char = charB; game.playerB.hp = state.playerB.hp; game.playerB.maxHp = state.playerB.maxHp; }
                }
                game.playerB.gold = state.playerB.gold;
                game.playerB.library = state.playerB.library || [];
                game.playerB.roundCards = state.playerB.roundCards || [];
            }

            updatePlayerInfo();
            updateLibraryDisplay([]);
            updateOnlineStatusBar();
            updateAttackProgress();

            console.log('[状态同步] 恢复UI，当前阶段:', game.phase);
            if (game.phase === 'battle' || game.phase === 'weapon-draw') {
                showScreen('screen-battle');
                if (game.phase === 'weapon-draw') {
                    showSection('weapon-draw-area');
                    drawWeaponWheel();
                } else if (game.phase === 'dice') {
                    showSection('dice-area');
                } else if (game.phase === 'attack-select' || game.phase === 'attack-resolve') {
                    showCardSelect();
                }
            } else if (game.phase === 'character-select') {
                showScreen('screen-character');
                updateCharSelectUI();
            }

            console.log('[状态同步] 状态恢复完成');
            playSound('result');

        } catch (e) {
            console.error('[状态同步] 应用失败:', e);
        }
    }

    function notifyPeer(action, payload) {
        console.log('[notifyPeer] 发送消息:', action, 'isOnlineMode:', isOnlineMode, 'isConnected:', Multiplayer.isConnected());
        if (!isOnlineMode || !Multiplayer.isConnected()) {
            console.warn('[notifyPeer] ❌ 消息未发送！isOnlineMode:', isOnlineMode, 'isConnected:', Multiplayer.isConnected());
            return;
        }
        var result = Multiplayer.sendGameAction(action, payload);
        console.log('[notifyPeer] ✅ sendGameAction 返回:', result);

        if (['weapon-spin', 'weapon-draw-progress', 'switch-player', 'player-finished', 'weapon-draw-complete', 'card-selected', 'end-attack', 'buy-card', 'sell-card',
            'synthesis-result', 'cultivation-result', 'dice-roll'].indexOf(action) !== -1) {
            setTimeout(saveStateSnapshot, 100);
        }
    }

    function handlePeerAction(action, payload, from) {
        try {
        console.log('[handlePeerAction] ✅ 收到消息:', action, 'from:', from, '当前phase:', game.phase);

        switch (action) {
            case 'start-game':
                isOnlineMode = true;
                game.mode = 'online';
                startCharacterSelect();
                break;
            case 'sync':
                if (payload.action === 'start-game') {
                    isOnlineMode = true;
                    game.mode = 'online';
                    startCharacterSelect();
                } else if (payload.action === 'full-state-sync') {
                    applyFullStateSync(payload);
                }
                break;
            case 'battle-init':
                applyBattleInit(payload);
                break;
            case 'char-spin-result':
                applyCharSpinResult(payload.charId, payload.phase);
                break;
            case 'char-confirm':
                if (from === 'A') {
                    game.currentPlayer = 'B';
                    updateCharSelectUI();
                } else {
                    showVSAnimation();
                }
                break;
            case 'organize-ready':
                var readyFrom = payload.from;
                organizeReadyState[readyFrom] = true;
                var btn = $('btn-ready');
                if (btn) {
                    if (organizeReadyState.A && organizeReadyState.B) {
                        btn.textContent = '✅ 双方已准备';
                        btn.disabled = true;
                        $('action-hint').textContent = '✅ 双方都已准备！即将开始...';
                        clearCountdown();
                        showFloatTip('🎮 双方准备完毕，马上开始！');
                        setTimeout(function () { exitOrganizePhase(); startDicePhase(); }, 800);
                    } else {
                        $('action-hint').textContent = '⏱️ 对方 ' + playerLabel(readyFrom) + ' 已准备';
                        if (countdownSeconds > 65) {
                            var oldTime = countdownSeconds;
                            clearCountdown();
                            showCountdown(60, function () {
                                exitOrganizePhase();
                                startDicePhase();
                            });
                            $('action-hint').textContent = '⏱️ 对方 ' + playerLabel(readyFrom) + ' 已准备！倒计时已从 ' + oldTime + 's 缩短至 60s';
                            showFloatTip('⏰ 对方已准备！倒计时已缩短至 60 秒！');
                        }
                    }
                }
                break;
            case 'weapon-draw-progress':
                var progressPid = payload.player;
                var progressVar = progressPid === 'A' ? 'weaponDrawCountA' : 'weaponDrawCountB';
                game[progressVar]++;
                console.log('[ Weapon ] 收到抽卡进度通知, player:', progressPid, 'count:', game[progressVar]);
                updateWeaponDrawHint();
                updateWeaponDrawUI();
                if (game.weaponDrawCountA >= 3 && game.weaponDrawCountB >= 3) {
                    console.log('[ Weapon ] ✅ 双方都抽完了(进度同步)');
                    if (!Multiplayer.isHost()) {
                        finishWeaponDraw();
                    }
                }
                break;
            case 'weapon-spin':
                applyWeaponSpinResult(payload.weapon, payload.player);
                break;
            case 'switch-player':
                console.log('[ Weapon ] 收到切换玩家消息（兼容旧版本）:', payload.toPlayer, 'from:', payload.fromPlayer);
                break;
            case 'player-finished':
                console.log('[ Weapon ] 收到玩家完成消息（兼容旧版本）:', payload.player);
                break;
            case 'weapon-draw-both-done':
                console.log('[ Weapon ] 收到双方都抽完的消息');
                finishWeaponDraw();
                break;
            case 'dice-roll':
                applyDiceResult(payload.value);
                break;
            case 'card-selected':
                clearOpponentWaitCountdown();
                applyCardSelected(payload.uid, payload.player);
                break;
            case 'skip-defend':
                clearOpponentWaitCountdown();
                handleSkipDefendRemote();
                break;
            case 'continue-attack':
                clearOpponentWaitCountdown();
                if (payload && payload.currentAttackIndex !== undefined) { game.currentAttackIndex = payload.currentAttackIndex; }
                if (payload && payload.attackReduction !== undefined) { game.attackReduction = payload.attackReduction; }
                if (payload && payload.bonusAttacks !== undefined) { game.bonusAttacks = payload.bonusAttacks; }
                if (payload && payload.isCounterPhase !== undefined) { game.isCounterPhase = payload.isCounterPhase; }
                updateAttackProgress();
                showAttackCardSelect();
                break;
            case 'end-attack':
                clearOpponentWaitCountdown();
                stopSpeech();
                if (payload && payload.currentAttackIndex !== undefined) { game.currentAttackIndex = payload.currentAttackIndex; }
                if (payload && payload.attackReduction !== undefined) { game.attackReduction = payload.attackReduction; }
                if (payload && payload.bonusAttacks !== undefined) { game.bonusAttacks = payload.bonusAttacks; }
                if (payload && payload.isCounterPhase !== undefined) { game.isCounterPhase = payload.isCounterPhase; }
                updateAttackProgress();
                afterAttackPhaseEnds();
                break;
            case 'start-counter':
                startAttackPhase(true);
                break;
            case 'sell-card':
                applySellCard(payload.uid, payload.pid);
                break;
            case 'buy-card':
                applyBuyCard(payload);
                break;
            case 'weapon-draw-complete':
                applyWeaponDrawComplete(payload);
                break;
            case 'synthesis-result':
                applySynthesisResult(payload);
                break;
            case 'cultivation-result':
                applyCultivationResult(payload);
                break;
            case 'rematch-request':
                game.peerRematchRequested = true;
                if (game.rematchRequested) {
                    startRematch();
                } else {
                    $('btn-restart').disabled = false;
                    $('btn-restart').textContent = '对方请求再来一局，点击确认';
                }
                break;
        }
        } catch (e) { handleError('handlePeerAction', e); }
    }

    function applyCharSpinResult(charId, phase) {
        var ch = CHARACTERS.find(function (c) { return c.id === charId; });
        if (!ch) return;
        if (phase === 'selected-A' && !charSelectState.selectedA) {
            charSelectState.selectedA = ch;
            game.playerA.char = ch; game.playerA.hp = ch.hp; game.playerA.maxHp = ch.maxHp;
            game.usedCharIds.push(ch.id);
            showSelectedChar('char-selected-a', ch);
            speak('房主(A)选择了' + ch.name + '，' + ch.voiceLine);
            playSound('result');
            checkBothSelected();
        } else if (phase === 'selected-B' && !charSelectState.selectedB) {
            charSelectState.selectedB = ch;
            game.playerB.char = ch; game.playerB.hp = ch.hp; game.playerB.maxHp = ch.maxHp;
            game.usedCharIds.push(ch.id);
            showSelectedChar('char-selected-b', ch);
            speak('访客(B)选择了' + ch.name + '，' + ch.voiceLine);
            playSound('result');
            checkBothSelected();
        } else if (phase === 'select-B' && !charSelectState.selectedA) {
            charSelectState.selectedA = ch;
            game.playerA.char = ch; game.playerA.hp = ch.hp; game.playerA.maxHp = ch.maxHp;
            game.usedCharIds.push(ch.id);
            showSelectedChar('char-selected-a', ch);
            charSelectState.phase = 'select-B';
            updateSelectionUI();
            speak('房主选择了' + ch.name + '，' + ch.voiceLine);
            if (canIOperate('B')) {
                var remaining = document.querySelectorAll('.char-grid .char-card:not(.selected)');
                remaining.forEach(function (c) { c.classList.remove('disabled'); c.classList.add('selectable-glow'); });
                updateSelectionUI();
                speak('请选择你的侠客卡牌');
            }
            playSound('result');
        } else if (phase === 'done' && !charSelectState.selectedB) {
            charSelectState.selectedB = ch;
            game.playerB.char = ch; game.playerB.hp = ch.hp; game.playerB.maxHp = ch.maxHp;
            game.usedCharIds.push(ch.id);
            showSelectedChar('char-selected-b', ch);
            charSelectState.phase = 'done';
            disableAllCards();
            updateSelectionUI();
            speak('对方选择了' + ch.name + '，' + ch.voiceLine);
            waitForSpeech(function () { clearCountdown(); showVSAnimation(); }, 800);
            playSound('result');
        }
    }

    function applyWeaponSpinResult(weaponData, pid) {
        console.log('[ Weapon ] ✅ 收到 weapon-spin 消息, weaponData:', weaponData, 'pid:', pid, '当前phase:', game.phase);
        
        var wp = WEAPONS.find(function (w) { return w.id === weaponData.id; });
        if (!wp) {
            console.error('[ Weapon ] ❌ 找不到武器 id:', weaponData.id);
            return;
        }

        var existingCard = null;
        var targetPlayer = getPlayer(pid);
        if (!targetPlayer) {
            console.error('[ Weapon ] ❌ 找不到玩家:', pid);
            return;
        }
        
        if (targetPlayer.library) {
            existingCard = targetPlayer.library.find(function (c) { return c.uid === weaponData.uid; });
        }
        
        if (existingCard) {
            console.log('[ Weapon ] 卡片已存在，跳过重复添加 uid:', weaponData.uid);
            return;
        }

        var drawn = Object.assign({}, wp); drawn.uid = weaponData.uid;
        console.log('[ Weapon ] 添加武器到玩家', pid, ', uid:', drawn.uid, 'name:', wp.name);

        targetPlayer.roundCards.push(drawn);
        targetPlayer.library.push(drawn);
        
        var countVar = pid === 'A' ? 'weaponDrawCountA' : 'weaponDrawCountB';
        game[countVar]++;
        
        console.log('[ Weapon ] 玩家', pid, '当前roundCards数量:', targetPlayer.roundCards.length, '抽取次数:', game[countVar]);

        try {
            updateLibraryDisplay([drawn.uid]);
            updateWeaponDrawHint();
            updateWeaponDrawUI();
            renderWeaponDrawnCard(drawn);
            
            if (game.weaponDrawCountA >= 3 && game.weaponDrawCountB >= 3) {
                console.log('[ Weapon ] ✅ 双方都抽完了（同步后检测）');
                if (!Multiplayer.isHost()) {
                    finishWeaponDraw();
                }
            }
        } catch (e) {
            console.warn('[ Weapon ] UI更新失败(可能界面未就绪):', e.message);
        }
    }

    function applySwitchPlayer(toPlayer, drawCount) {
        try {
            console.log('[ Weapon ] ✅ 切换到玩家消息（兼容旧版本）:', toPlayer);
            
        } catch (e) {
            console.error('[ Weapon ] applySwitchPlayer 失败:', e);
        }
    }

    function applyWeaponDrawComplete(data) {
        if (game._weaponDrawDone) { console.log('[ Weapon ] ⚠️ applyWeaponDrawComplete 防重入，跳过弹窗'); }
        console.log('[ Weapon ] 收到武器抽取完成同步消息');
        console.log('[ Weapon ] 同步数据 libraryA长度:', data.libraryA.length, 'libraryB长度:', data.libraryB.length);

        game.playerA.library = data.libraryA.map(function (c) {
            var w = WEAPONS.find(function (w) { return w.id === c.id; });
            return w ? Object.assign({}, w, { uid: c.uid }) : null;
        }).filter(Boolean);

        game.playerB.library = data.libraryB.map(function (c) {
            var w = WEAPONS.find(function (w) { return w.id === c.id; });
            return w ? Object.assign({}, w, { uid: c.uid }) : null;
        }).filter(Boolean);

        game.playerA.roundCards = data.roundCardsA.map(function (uid) {
            return game.playerA.library.find(function (c) { return c.uid === uid; });
        }).filter(Boolean);

        game.playerB.roundCards = data.roundCardsB.map(function (uid) {
            return game.playerB.library.find(function (c) { return c.uid === uid; });
        }).filter(Boolean);

        console.log('[ Weapon ] 同步后 玩家A库大小:', game.playerA.library.length, 'roundCards:', game.playerA.roundCards.length);
        console.log('[ Weapon ] 同步后 玩家B库大小:', game.playerB.library.length, 'roundCards:', game.playerB.roundCards.length);

        updatePlayerInfo();
        updateLibraryDisplay([]);

        if (!Multiplayer.isHost() && !game._weaponDrawDone) {
            game._weaponDrawDone = true;
            var al = game.playerA.roundCards.map(function (c) { return c.name; }).join('、');
            var bl = game.playerB.roundCards.map(function (c) { return c.name; }).join('、');
            showModal('<h3>⚔️ 武器抽取完成</h3>' +
                '<p style="font-size:14px;color:var(--text-light);margin:8px 0;">玩家A获得 ' + game.playerA.roundCards.length + ' 张：' + (al || '无') + '</p>' +
                '<p style="font-size:14px;color:var(--text-light);margin:8px 0;">玩家B获得 ' + game.playerB.roundCards.length + ' 张：' + (bl || '无') + '</p>' +
                '<p style="color:var(--gold-light);font-size:13px;margin-top:12px;">⏳ 2秒后进入整理阶段...</p>');
            setTimeout(function () {
                hideModal();
                startOrganizePhase();
            }, 2000);
        }
    }

    function renderWeaponDrawnCard(drawn) {
        var isRare = drawn.rarity === 'rare' || drawn.rarity === 'epic' || drawn.rarity === 'legend';
        var cardCls = 'weapon-card rarity-' + drawn.rarity;
        if (isRare) cardCls += ' rarity-highlight';
        var typeLabel = drawn.type === 'attack' ? '攻击' : '防御';
        var valueLabel = drawn.type === 'attack' ? '伤害' : '防御';
        var highlightTag = '';
        if (drawn.rarity === 'rare') highlightTag = '<div class="rarity-tag rare-tag">✨ 稀有装备 ✨</div>';
        else if (drawn.rarity === 'epic') highlightTag = '<div class="rarity-tag epic-tag">💥 史诗装备 💥</div>';
        else if (drawn.rarity === 'legend') highlightTag = '<div class="rarity-tag legend-tag">👑 传说装备 👑</div>';
        var skillTag = '';
        if (drawn.skill) skillTag = '<div style="margin-top:6px;padding:4px 8px;background:rgba(156,39,176,0.2);border:1px solid rgba(156,39,176,0.5);border-radius:4px;font-size:11px;color:#ce93d8;">' + drawn.skill.icon + ' ' + drawn.skill.name + '：' + drawn.skill.desc + '</div>';

        $('drawn-cards').innerHTML = highlightTag + '<div class="' + cardCls + '" data-uid="' + drawn.uid + '">' +
            '<span class="card-type ' + drawn.type + '">' + typeLabel + '</span>' +
            '<span class="card-icon">' + drawn.icon + '</span>' +
            '<span class="card-name">' + drawn.name + '</span>' +
            '<span class="card-value">' + valueLabel + ':' + drawn.value + '</span>' +
            '<span class="card-price">💰' + drawn.price + '</span></div>' + skillTag;
        var cardEl = $('drawn-cards').querySelector('.weapon-card');
        if (cardEl) cardEl.addEventListener('click', function () { showCardPreview(drawn); });
        if (isRare) playSound('rare'); else playSound('result');
    }

    function applyDiceResult(value) {
        console.log('[ Dice ] ✅ 收到 dice-roll 消息, value:', value, '当前phase:', game.phase);
        
        if (game.phase !== 'dice' && game.phase !== 'weapon-draw' && game.phase !== 'battle') {
            console.warn('[ Dice ] ⚠️ 不在骰子阶段，延迟处理。当前:', game.phase);
            setTimeout(function() {
                applyDiceResult(value);
            }, 500);
            return;
        }
        
        if (diceRolled) {
            console.log('[ Dice ] 骰子已投过，忽略重复消息');
            return;
        }
        
        diceRolled = true;
        
        var diceEl = $('dice-face');
        if (diceEl) diceEl.textContent = value;
        
        var isOdd = value % 2 === 1;
        game.firstAttacker = isOdd ? 'A' : 'B';
        game.secondAttacker = isOdd ? 'B' : 'A';
        game.diceResult = value;
        
        var fl = playerLabel(game.firstAttacker), fn = getPlayer(game.firstAttacker).char.name;
        
        if ($('dice-result')) {
            $('dice-result').innerHTML = '点数：<strong style="font-size:24px;">' + value + '</strong>（' + (isOdd ? '单数' : '双数') + '）<br><span style="color:var(--gold-light);font-size:18px;">' + fl + '（' + fn + '）先攻！</span>';
            $('dice-result').classList.remove('hidden');
        }
        
        if ($('btn-roll-dice')) $('btn-roll-dice').disabled = true;
        
        playSound('dice');
        
        console.log('[ Dice ] 显示结果', value, '，2秒后进入攻击阶段');
        
        setTimeout(function () {
            console.log('[ Dice ] 进入攻击阶段, 当前phase:', game.phase);
            var diceArea = $('dice-area');
            if (diceArea) {
                diceArea.classList.add('hidden');
            }
            startAttackPhase(false);
        }, 2000);
    }

    function applySynthesisResult(payload) {
        var pid = payload.player;
        var player = getPlayer(pid);

        payload.removedCards.forEach(function(rc) {
            var card = player.library.find(function(c) { return c.uid === rc.uid; });
            if (card) {
                var idx = player.library.indexOf(card);
                if (idx > -1) player.library.splice(idx, 1);
            }
        });

        if (payload.success && payload.newCard) {
            var newCard = Object.assign({}, payload.newCard);
            player.library.push(newCard);
            updateLibraryDisplay([newCard.uid]);
        }

        updatePlayerInfo();
        updateLibraryDisplay();
        renderLearnedMartialArts('A');
        renderLearnedMartialArts('B');
        refreshCurrentCardSelect();

        if (game.phase === 'attack-select') {
            renderCardHand(game.phaseAttacker, 'attack');
        } else if (game.phase === 'defend-select') {
            renderCardHand(game.phaseDefender, 'defend');
        }

        speak(payload.success ? '对方重铸成功' : '对方重铸失败');
    }

    function applyCultivationResult(payload) {
        var pid = payload.player;
        var player = getPlayer(pid);

        payload.removedCards.forEach(function(rc) {
            var card = player.library.find(function(c) { return c.uid === rc.uid; });
            if (card) {
                var idx = player.library.indexOf(card);
                if (idx > -1) player.library.splice(idx, 1);
            }
        });

        if (payload.success && payload.artId) {
            if (game.martialArts[pid].indexOf(payload.artId) === -1) {
                game.martialArts[pid].push(payload.artId);
            }
        }

        updatePlayerInfo();
        updateLibraryDisplay();
        renderLearnedMartialArts('A');
        renderLearnedMartialArts('B');
        refreshCurrentCardSelect();

        if (game.phase === 'attack-select') {
            renderCardHand(game.phaseAttacker, 'attack');
        } else if (game.phase === 'defend-select') {
            renderCardHand(game.phaseDefender, 'defend');
        }

        speak(payload.success ? '对方修炼成功，学会了' + payload.artName : '对方修炼失败');
    }

    function applyCardSelected(uid, selectorPid) {
        console.log('[ Card ] 收到卡牌选择消息, uid:', uid, 'player:', selectorPid);
        console.log('[ Card ] 当前 phase:', game.phase, 'phaseAttacker:', game.phaseAttacker, 'phaseDefender:', game.phaseDefender);

        var selCard = findCardByUid(getPlayer(selectorPid), uid);
        if (!selCard) {
            console.error('[ Card ] ❌ 找不到卡牌 uid:', uid);
            console.error('[ Card ] 玩家', selectorPid, '的卡牌库:');
            var player = getPlayer(selectorPid);
            if (player && player.library) {
                player.library.forEach(function(c, idx) {
                    console.error('   [' + idx + '] uid:', c.uid, 'name:', c.name, 'id:', c.id);
                });
            } else {
                console.error('   卡牌库为空或不存在');
            }
            return;
        }
        playSound('click');
        hideSelectAreas();

        var isDefendSelection = (selectorPid === game.phaseDefender);
        if (!isDefendSelection) {
            game.currentAttackCard = selCard;
            removeFromLibrary(game.phaseAttacker, selCard);
            updatePlayerInfo();
            addTableCard(selCard, game.phaseAttacker);
            if (selCard.skill && selCard.skill.id === 'no_defend' && selCard.skill.timing === 'current' && !game.usedSkillsThisRound['no_defend']) {
                game.noDefendFlag = true;
                game.usedSkillsThisRound['no_defend'] = true;
            }
            showCardPlayAnimation(selCard, selectorPid, function () {
                showDefendCardSelect();
            });
        } else {
            game.currentDefendCard = selCard;
            removeFromLibrary(game.phaseDefender, selCard);
            updatePlayerInfo();
            addTableCard(selCard, game.phaseDefender);
            showCardPlayAnimation(selCard, selectorPid, function () {
                resolveSingleAttack();
            });
        }
    }

    function handleSkipDefendRemote() {
        stopSpeech();
        game.currentDefendCard = null;
        resolveSingleAttack();
    }

    function advanceWeaponDrawPhase() {
        afterWeaponDrawAction();
    }

    function applyBattleInit(data) {
        console.log('[ Battle ] 收到 battle-init 消息，开始初始化');
        console.log('[ Battle ] 接收到的数据:', data);
        game.phase = 'battle'; game.round = 1;
        game.playerA.library = data.libraryA.map(function (c) {
            var w = WEAPONS.find(function (w) { return w.id === c.id; });
            return w ? Object.assign({}, w, { uid: c.uid }) : null;
        }).filter(Boolean);
        game.playerB.library = data.libraryB.map(function (c) {
            var w = WEAPONS.find(function (w) { return w.id === c.id; });
            return w ? Object.assign({}, w, { uid: c.uid }) : null;
        }).filter(Boolean);
        console.log('[ Battle ] 初始化后 libraryA 长度:', game.playerA.library.length, 'libraryB 长度:', game.playerB.library.length);
        console.log('[ Battle ] 玩家A角色:', game.playerA.char ? game.playerA.char.name : 'null');
        console.log('[ Battle ] 玩家B角色:', game.playerB.char ? game.playerB.char.name : 'null');
        game.playerA.roundCards = []; game.playerB.roundCards = [];
        game.playerA.gold = data.goldA;
        game.playerB.gold = data.goldB;
        game.totalDamageA = 0; game.totalDamageB = 0;
        game.allRoundLogs = []; game.roundLog = [];
        game.noDefendFlag = false; game.noDefendUsedThisRound = false; game.usedSkillsThisRound = {};
        game.weaponDrawCountA = 0; game.weaponDrawCountB = 0;
        game.currentAttackIndex = 0; game.bonusAttacks = 0;
        game.phaseAttacker = null; game.phaseDefender = null; game.isCounterPhase = false;
        game.currentAttackCard = null; game.currentDefendCard = null; game.selectedCardUid = null;

        updateAttackProgress();
        game.blockAbilityA = false; game.blockAbilityB = false;
        game.attackReduction = 0; game.tempDefenseReduction = 0;
        clearTableCards(); clearBattleLog();
        showScreen('screen-battle'); updatePlayerInfo(); updateLibraryDisplay([]);
        $('btn-switch-player').style.display = 'none';
        startWeaponDrawPhase();
        setTimeout(saveStateSnapshot, 500);
    }

    function applySellCard(uid, pid) {
        var player = getPlayer(pid);
        var card = findCardByUid(player, uid);
        if (card) {
            removeFromLibrary(pid, card);
            player.gold += Math.round(card.price * 0.8);
            updatePlayerInfo();
            playSound('coin');
        }
    }

    function applyBuyCard(data) {
        console.log('[ Buy ] 收到购买卡牌消息:', data);
        var wp = WEAPONS.find(function (w) { return w.id === data.weaponId; }) ||
                 BLACK_MARKET_WEAPONS.find(function (w) { return w.id === data.weaponId; });
        if (!wp) {
            console.error('[ Buy ] ❌ 找不到武器 id:', data.weaponId);
            return;
        }
        var player = getPlayer(data.pid);
        var newCard = Object.assign({}, wp);
        newCard.uid = data.cardUid || newCardUid();
        console.log('[ Buy ] 添加卡牌到玩家', data.pid, ', uid:', newCard.uid, 'name:', wp.name);
        player.library.push(newCard);
        player.gold -= data.price;
        updatePlayerInfo();
        playSound('coin');
    }

    function initSynthesisCultivationButtons() {
        ['a', 'b'].forEach(function(p) {
            var btnSynth = document.getElementById('btn-' + p + '-synthesis');
            var btnCult = document.getElementById('btn-' + p + '-cultivation');
            if (btnSynth) {
                btnSynth.addEventListener('click', function() {
                    var targetPid = p.toUpperCase();
                    if (isOnlineMode && !canIOperate(targetPid)) return;
                    if (!getPlayer(targetPid) || !getPlayer(targetPid).char) {
                        alert('请先选择角色后再使用此功能');
                        return;
                    }
                    showSynthesisModal(targetPid);
                    playSound('click');
                });
            } else {
                console.warn('[WARN] 未找到按钮: btn-' + p + '-synthesis');
            }
            if (btnCult) {
                btnCult.addEventListener('click', function() {
                    var targetPid = p.toUpperCase();
                    if (isOnlineMode && !canIOperate(targetPid)) return;
                    if (!getPlayer(targetPid) || !getPlayer(targetPid).char) {
                        alert('请先选择角色后再使用此功能');
                        return;
                    }
                    showCultivationModal(targetPid);
                    playSound('click');
                });
            } else {
                console.warn('[WARN] 未找到按钮: btn-' + p + '-cultivation');
            }
        });
    }

    // ========== 卡牌重铸系统 ==========

    function showSynthesisModal(pid) {
        var synthModal = document.getElementById('synthesis-modal');
        if (!synthModal) return;
        synthModal.classList.remove('hidden');
        game.synthesisState = { slotA: null, slotB: null, isProcessing: false, playerPid: pid };
        updateSynthesisSlots();
        bindSynthesisEvents(pid);
    }

    function updateSynthesisSlots() {
        var slotA = document.getElementById('synth-slot-A');
        var slotB = document.getElementById('synth-slot-B');
        var btnDo = document.getElementById('btn-do-synthesis');
        if (!slotA || !slotB || !btnDo) return;

        if (game.synthesisState.slotA) {
            var cardA = findCardByUid(getPlayer(game.synthesisState.playerPid), game.synthesisState.slotA);
            if (cardA) { slotA.innerHTML = createCardHTML(cardA, false); slotA.classList.add('filled'); }
            else { slotA.innerHTML = '<span style="color:var(--text-dim)">点击选择</span>'; slotA.classList.remove('filled'); }
        } else {
            slotA.innerHTML = '<span style="color:var(--text-dim)">点击选择</span>';
            slotA.classList.remove('filled');
        }

        if (game.synthesisState.slotB) {
            var cardB = findCardByUid(getPlayer(game.synthesisState.playerPid), game.synthesisState.slotB);
            if (cardB) { slotB.innerHTML = createCardHTML(cardB, false); slotB.classList.add('filled'); }
            else { slotB.innerHTML = '<span style="color:var(--text-dim)">点击选择</span>'; slotB.classList.remove('filled'); }
        } else {
            slotB.innerHTML = '<span style="color:var(--text-dim)">点击选择</span>';
            slotB.classList.remove('filled');
        }

        btnDo.disabled = !(game.synthesisState.slotA && game.synthesisState.slotB) || game.synthesisState.isProcessing;
    }

    function bindSynthesisEvents(pid) {
        ['synth-slot-A', 'synth-slot-B'].forEach(function(slotId) {
            var el = document.getElementById(slotId);
            if (el) {
                el.onclick = function() {
                    if (game.synthesisState.isProcessing) return;
                    openCardPickerForSynthesis(pid, slotId === 'synth-slot-A' ? 'A' : 'B');
                };
            }
        });

        var btnDo = document.getElementById('btn-do-synthesis');
        if (btnDo) btnDo.onclick = function() { doSynthesis(pid); };

        var btnClose = document.getElementById('btn-close-synthesis');
        if (btnClose) btnClose.onclick = function() {
            document.getElementById('synthesis-modal').classList.add('hidden');
        };
    }

    function openCardPickerForSynthesis(pid, slot) {
        var player = getPlayer(pid);
        document.getElementById('synthesis-modal').classList.add('hidden');

        var otherSlotUid = slot === 'A' ? game.synthesisState.slotB : game.synthesisState.slotA;

        var html = '<div class="modal-close-btn" id="btn-close-picker">✕</div><h3>🔮 选择' + (slot === 'A' ? '左侧' : '右侧') + '卡牌</h3>' +
            '<p class="hint-text">点击下方卡牌放入槽位（已选的卡牌不可重复选择）</p>' +
            '<div class="card-select-for-synthesis">';

        var availableCards = player.library.filter(function(card) {
            return card.uid !== otherSlotUid;
        });

        if (availableCards.length === 0) {
            html += '<p style="color:var(--text-dim);padding:20px;">没有可选的卡牌</p>';
        } else {
            availableCards.forEach(function(card) {
                var isDisabled = card.uid === otherSlotUid ? ' disabled-card' : '';
                html += '<div class="weapon-card rarity-' + card.rarity + ' selectable-card' + isDisabled + '" data-uid="' + card.uid + '">' +
                    '<span class="card-icon">' + renderEmoji(card.icon) + '</span>' +
                    '<span class="card-name">' + card.name + '</span>' +
                    '<span class="card-value">' + (card.type==='attack'?'伤害':'防御') + ':' + card.value + '</span>' +
                    '</div>';
            });
        }

        html += '</div>';
        showModal(html);

        document.getElementById('btn-close-picker').addEventListener('click', function() {
            hideModal();
            document.getElementById('synthesis-modal').classList.remove('hidden');
        });

        setTimeout(function() {
            document.querySelectorAll('.selectable-card:not(.disabled-card)').forEach(function(el) {
                el.onclick = function() {
                    var uid = el.getAttribute('data-uid');
                    if (slot === 'A') game.synthesisState.slotA = uid;
                    else game.synthesisState.slotB = uid;
                    hideModal();
                    document.getElementById('synthesis-modal').classList.remove('hidden');
                    updateSynthesisSlots();
                    playSound('click');
                };
            });
        }, 100);
    }

    function doSynthesis(pid) {
        if (game.synthesisState.isProcessing) return;
        if (!game.synthesisState.slotA || !game.synthesisState.slotB) return;

        var player = getPlayer(pid);
        var cardA = findCardByUid(player, game.synthesisState.slotA);
        var cardB = findCardByUid(player, game.synthesisState.slotB);

        if (!cardA || !cardB) return;

        game.synthesisState.isProcessing = true;

        var modal = document.querySelector('.synthesis-modal');
        modal.classList.add('shaking');
        playSound('skill');

        setTimeout(function() {
            modal.classList.remove('shaking');

            var cardA = findCardByUid(player, game.synthesisState.slotA);
            var cardB = findCardByUid(player, game.synthesisState.slotB);

            removeFromLibrary(pid, cardA);
            removeFromLibrary(pid, cardB);

            game.synthesisState.slotA = null;
            game.synthesisState.slotB = null;

            var synthSuccess = Math.random() < 0.7;
            if (synthSuccess) {
                var newCard = generateSynthesizedCard(cardA, cardB);
                newCard.uid = newCardUid();
                player.library.push(newCard);

                document.getElementById('synthesis-modal').classList.add('hidden');
                showSynthesisResult(true, newCard, pid);
                speak('重铸成功！获得' + newCard.name);
            } else {
                document.getElementById('synthesis-modal').classList.add('hidden');
                showSynthesisResult(false, null, pid, cardA, cardB);
                speak('重铸失败，原卡牌已粉碎');
            }

            game.synthesisState.isProcessing = false;
            updatePlayerInfo();
            updateLibraryDisplay();
            notifyPeer('synthesis-result', {
                player: pid,
                success: synthSuccess,
                newCard: synthSuccess ? { id: newCard.id, uid: newCard.uid, type: newCard.type, rarity: newCard.rarity, value: newCard.value, name: newCard.name, icon: newCard.icon, price: newCard.price } : null,
                removedCards: [{ uid: cardA.uid, id: cardA.id }, { uid: cardB.uid, id: cardB.id }]
            });
            refreshCurrentCardSelect();
            if (game.phase === 'attack-select') {
                renderCardHand(game.phaseAttacker, 'attack');
            } else if (game.phase === 'defend-select') {
                renderCardHand(game.phaseDefender, 'defend');
            }
        }, 3000);
    }

    function generateSynthesizedCard(cardA, cardB) {
        var newType;
        if (cardA.type === cardB.type) {
            newType = cardA.type;
        } else {
            newType = Math.random() < 0.5 ? 'attack' : 'defend';
        }

        var rarityOrder = ['common', 'elite', 'rare', 'epic', 'legend'];
        var idxA = rarityOrder.indexOf(cardA.rarity);
        var idxB = rarityOrder.indexOf(cardB.rarity);
        if (idxA < 0) idxA = 0;
        if (idxB < 0) idxB = 0;
        var maxIdx = Math.max(idxA, idxB);
        var finalIdx = maxIdx;

        if (maxIdx < rarityOrder.length - 1 && Math.random() < 0.2) {
            finalIdx++;
        }
        if (finalIdx >= rarityOrder.length) finalIdx = rarityOrder.length - 1;

        var newRarity = rarityOrder[finalIdx];
        var candidates = WEAPONS.filter(function(w) {
            return w.type === newType && w.rarity === newRarity;
        });

        if (candidates.length === 0) {
            candidates = WEAPONS.filter(function(w) { return w.type === newType; });
        }
        if (candidates.length === 0) {
            candidates = WEAPONS.filter(function(w) { return w.rarity === newRarity; });
        }
        if (candidates.length === 0) {
            candidates = WEAPONS.slice();
        }

        var minValueRequired = cardA.value + cardB.value + 1;
        var qualifiedCandidates = candidates.filter(function(w) { return w.value >= minValueRequired; });

        if (qualifiedCandidates.length === 0) {
            var bestCandidate = candidates.reduce(function(best, current) {
                return current.value > best.value ? current : best;
            }, candidates[0]);
            var enhancedCard = Object.assign({}, bestCandidate);
            enhancedCard.value = minValueRequired + Math.floor(Math.random() * 5);
            enhancedCard.price = Math.round(enhancedCard.price * (enhancedCard.value / bestCandidate.value));
            enhancedCard.name = bestCandidate.name + '·强化';
            enhancedCard.desc = '重铸强化的' + bestCandidate.name;
            enhancedCard.uid = newCardUid();
            return enhancedCard;
        }

        var selected = qualifiedCandidates[Math.floor(Math.random() * qualifiedCandidates.length)];

        var newCard = Object.assign({}, selected);
        newCard.uid = newCardUid();
        return newCard;
    }

    function showSynthesisResult(success, card, pid, cardA, cardB) {
        var resultHtml;
        if (success) {
            var typeLabel = card.type === 'attack' ? '攻击' : '防御';
            var valueLabel = card.type === 'attack' ? '伤害' : '防御';
            resultHtml = '<div style="text-align:center;padding:20px;">' +
                '<div style="font-size:56px;margin-bottom:12px;line-height:1;">✨</div>' +
                '<div style="font-family:\'Ma Shan Zheng\',cursive;font-size:30px;color:#4ade80;margin-bottom:6px;letter-spacing:4px;text-shadow:0 2px 12px rgba(74,222,128,0.6);">🎉 重铸成功！</div>' +
                '<div style="height:8px;"></div>' +
                '<div class="weapon-card rarity-' + card.rarity + '" style="margin:16px auto;transform:scale(1.3);pointer-events:none;min-width:180px;">' +
                '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
                '<span class="card-icon" style="font-size:28px;">' + renderEmoji(card.icon) + '</span>' +
                '<span class="card-name" style="font-size:15px;font-weight:bold;">' + card.name + '</span>' +
                '<span class="card-value">' + valueLabel + ':' + card.value + '</span>' +
                '<span class="card-price">💰' + card.price + ' · ' + RARITY_NAMES[card.rarity] + '</span>' +
                '</div>' +
                '<div style="color:#a7f3d0;font-size:15px;margin-top:14px;font-weight:600;padding:8px;background:rgba(74,222,128,0.08);border-radius:6px;display:inline-block;">💫 消耗2张原卡牌，获得新卡牌！</div>' +
                '</div>';
            playSound('rare');
        } else {
            var crushedText = '';
            if (cardA && cardB) {
                crushedText = '<div style="margin-top:14px;padding:12px;background:rgba(248,113,113,0.12);border-radius:8px;border:1px solid rgba(248,113,113,0.35);">' +
                    '<div style="color:#fca5a5;font-size:14px;margin-bottom:8px;font-weight:600;">💥 已粉碎的卡牌：</div>' +
                    '<div style="color:var(--text-light);font-size:13px;line-height:1.6;">' + renderEmoji(cardA.icon) + ' ' + cardA.name + '(' + RARITY_NAMES[cardA.rarity] + ')<br>' + renderEmoji(cardB.icon) + ' ' + cardB.name + '(' + RARITY_NAMES[cardB.rarity] + ')' + '</div>' +
                    '</div>';
            }
            resultHtml = '<div style="text-align:center;padding:20px;">' +
                '<div style="font-size:56px;margin-bottom:12px;line-height:1;">💔</div>' +
                '<div style="font-family:\'Ma Shan Zheng\',cursive;font-size:30px;color:#f87171;margin-bottom:6px;letter-spacing:4px;text-shadow:0 2px 12px rgba(248,113,113,0.6);">重铸失败</div>' +
                '<div style="color:var(--text-dim);font-size:15px;margin-top:10px;line-height:1.8;">原卡牌已粉碎消失<br>可重新选择卡牌再次尝试</div>' +
                crushedText +
                '</div>';
            playSound('lose');
        }

        showModal(resultHtml + '<button class="btn btn-primary modal-btn" id="btn-close-synth-result" style="margin-top:20px;padding:14px 48px;font-size:16px;border-radius:8px;">确定</button>');
        document.getElementById('btn-close-synth-result').onclick = function() {
            hideModal();
            document.getElementById('synthesis-modal').classList.remove('hidden');
            updateSynthesisSlots();
        };
    }

    // ========== 闭关修炼系统（武功学习） ==========

    function showCultivationModal(pid) {
        var cultModal = document.getElementById('cultivation-modal');
        if (!cultModal) return;

        var learnedIds = game.martialArts[pid];
        var availableArts = MARTIAL_ARTS.filter(function(art) {
            return learnedIds.indexOf(art.id) === -1;
        });

        if (availableArts.length === 0) {
            showModal('<div class="modal-close-btn" onclick="hideModal()">✕</div><h3>🧘 无可修练武功</h3><p style="color:var(--text-dim);font-size:14px;margin:12px 0;">您已经掌握了所有武功！</p>');
            return;
        }

        cultModal.classList.remove('hidden');
        game.cultivationState = { 
            selectedArtId: null, 
            slot1: null, 
            slot2: null,
            isProcessing: false, 
            playerPid: pid 
        };

        renderMartialArtsList(availableArts);
        updateCultivationSlots();
        bindCultivationEvents(pid);
    }

    function renderMartialArtsList(arts) {
        var container = document.getElementById('cultivation-martial-list');
        if (!container) return;

        var html = '';
        var successRates = { 1: 90, 2: 82.5, 3: 75, 4: 67.5, 5: 60 };
        var rarityNames = { rare: '稀有', epic: '史诗', legend: '传说' };

        arts.forEach(function(art) {
            var typeLabel = art.type === 'attack' ? '攻击' : '防御';
            var typeClass = art.type === 'attack' ? 'attack-type' : 'defend-type';
            var bonusText = art.type === 'attack' ? '攻+' + Math.round(art.atkBonus * 100) + '%' : '防+' + Math.round(art.defBonus * 100) + '%';
            var stars = '⭐'.repeat(art.difficulty);
            var rate = successRates[art.difficulty] || 50;
            var rarityClass = 'rarity-' + art.rarity;

            html += '<div class="martial-item ' + rarityClass + '" data-id="' + art.id + '">' +
                '<span class="martial-icon">' + art.icon + '</span>' +
                '<span class="martial-name">' + art.name + '</span>' +
                '<span class="martial-type ' + typeClass + '">' + typeLabel + '</span>' +
                '<span class="martial-bonus">' + bonusText + '</span>' +
                '<span class="martial-difficulty">难度:' + stars + '</span>' +
                '<span class="martial-success-rate">成功率:' + rate + '%</span>' +
                '<span class="martial-desc">' + art.desc + '</span>' +
                '<span class="martial-source">' + art.source + '</span>' +
                '</div>';
        });

        container.innerHTML = html;
    }

    function bindCultivationEvents(pid) {
        var btnDo = document.getElementById('btn-do-cultivation');
        var btnClose = document.getElementById('btn-close-cultivation');
        var selectedDisplay = document.getElementById('selected-martial-name');

        document.querySelectorAll('.martial-item').forEach(function(el) {
            el.onclick = function() {
                if (game.cultivationState.isProcessing) return;
                document.querySelectorAll('.martial-item').forEach(function(item) { item.classList.remove('selected'); });
                el.classList.add('selected');
                game.cultivationState.selectedArtId = el.getAttribute('data-id');
                var art = MARTIAL_ARTS.find(function(a) { return a.id === game.cultivationState.selectedArtId; });
                if (selectedDisplay) selectedDisplay.textContent = art ? art.icon + ' ' + art.name : '未选择';
                checkCultivationReady(btnDo);
                playSound('click');
            };
        });

        for (var i = 1; i <= 2; i++) {
            (function(slotNum) {
                var slotEl = document.getElementById('cult-slot-' + slotNum);
                if (slotEl) {
                    slotEl.onclick = function() {
                        if (game.cultivationState.isProcessing) return;
                        openCardPickerForCultivation(pid, slotNum);
                    };
                }
            })(i);
        }

        if (btnDo) btnDo.onclick = function() { doCultivation(pid); };
        if (btnClose) btnClose.onclick = function() {
            document.getElementById('cultivation-modal').classList.add('hidden');
        };
    }

    function checkCultivationReady(btnDo) {
        if (!btnDo) btnDo = document.getElementById('btn-do-cultivation');
        var hasArt = !!game.cultivationState.selectedArtId;
        var hasCard1 = !!game.cultivationState.slot1;
        var hasCard2 = !!game.cultivationState.slot2;
        if (btnDo) btnDo.disabled = !(hasArt && hasCard1 && hasCard2) || game.cultivationState.isProcessing;
    }

    function updateCultivationSlots() {
        for (var i = 1; i <= 2; i++) {
            var slot = document.getElementById('cult-slot-' + i);
            if (!slot) continue;
            var uid = game.cultivationState['slot' + i];

            if (uid) {
                var card = findCardByUid(getPlayer(game.cultivationState.playerPid), uid);
                if (card) {
                    slot.innerHTML = createCardHTML(card, false);
                    slot.classList.add('filled');
                }
            } else {
                slot.innerHTML = '<span style="color:var(--text-dim)">点击选择</span>';
                slot.classList.remove('filled');
            }
        }

        checkCultivationReady();
    }

    function openCardPickerForCultivation(pid, slotNum) {
        var player = getPlayer(pid);
        var otherSlotUid = slotNum === 1 ? game.cultivationState.slot2 : game.cultivationState.slot1;

        document.getElementById('cultivation-modal').classList.add('hidden');

        var eligibleCards = player.library.filter(function(c) {
            return (c.rarity === 'epic' || c.rarity === 'legend') && c.uid !== otherSlotUid;
        });

        if (eligibleCards.length === 0) {
            showModal('<div class="modal-close-btn" id="btn-close-picker">✕</div><h3>💎 无可用材料</h3>' +
                '<p style="color:var(--text-dim);font-size:14px;margin:12px 0;">您需要拥有史诗（紫色）或传说（橙色）品质的卡牌作为修炼材料。</p>');
            document.getElementById('btn-close-picker').addEventListener('click', function() {
                hideModal();
                document.getElementById('cultivation-modal').classList.remove('hidden');
            });
            return;
        }

        var html = '<div class="modal-close-btn" id="btn-close-picker">✕</div><h3>💎 选择材料槽位' + slotNum + '</h3>' +
            '<p class="hint-text">仅限史诗/传说卡牌（已选的不可重复）</p>' +
            '<div class="card-select-for-synthesis">';

        eligibleCards.forEach(function(card) {
            html += '<div class="weapon-card rarity-' + card.rarity + ' selectable-card" data-uid="' + card.uid + '">' +
                '<span class="card-icon">' + renderEmoji(card.icon) + '</span>' +
                '<span class="card-name">' + card.name + '</span>' +
                '<span class="card-value">' + (card.type==='attack'?'伤害':'防御') + ':' + card.value + '</span>' +
                '</div>';
        });

        html += '</div>';
        showModal(html);

        document.getElementById('btn-close-picker').addEventListener('click', function() {
            hideModal();
            document.getElementById('cultivation-modal').classList.remove('hidden');
        });

        setTimeout(function() {
            document.querySelectorAll('.selectable-card').forEach(function(el) {
                el.onclick = function() {
                    game.cultivationState['slot' + slotNum] = el.getAttribute('data-uid');
                    hideModal();
                    document.getElementById('cultivation-modal').classList.remove('hidden');
                    updateCultivationSlots();
                    playSound('click');
                };
            });
        }, 100);
    }

    function doCultivation(pid) {
        if (game.cultivationState.isProcessing) return;
        if (!game.cultivationState.selectedArtId) return;
        if (!game.cultivationState.slot1 || !game.cultivationState.slot2) return;

        var art = MARTIAL_ARTS.find(function(a) { return a.id === game.cultivationState.selectedArtId; });
        if (!art) return;

        var player = getPlayer(pid);
        var card1 = findCardByUid(player, game.cultivationState.slot1);
        var card2 = findCardByUid(player, game.cultivationState.slot2);

        if (!card1 || !card2) {
            alert('材料卡牌不存在！');
            return;
        }

        game.cultivationState.isProcessing = true;

        var successRates = { 1: 0.9, 2: 0.825, 3: 0.75, 4: 0.675, 5: 0.6 };
        var successRate = successRates[art.difficulty] || 0.5;

        var modal = document.querySelector('.cultivation-modal');
        modal.classList.add('flashing');
        playSound('epic');

        setTimeout(function() {
            modal.classList.remove('flashing');

            removeFromLibrary(pid, card1);
            removeFromLibrary(pid, card2);

            game.cultivationState.slot1 = null;
            game.cultivationState.slot2 = null;
            game.cultivationState.selectedArtId = null;

            document.getElementById('cultivation-modal').classList.add('hidden');

            var cultSuccess = Math.random() < successRate;
            if (cultSuccess) {
                game.martialArts[pid].push(art.id);
                showCultivationResult(true, art, pid, card1, card2);
                speak('修炼成功！学会了' + art.name);
            } else {
                showCultivationResult(false, art, pid, card1, card2);
                speak('修炼失败，材料已消耗');
            }

            updatePlayerInfo();
            updateLibraryDisplay();
            renderLearnedMartialArts('A');
            renderLearnedMartialArts('B');
            notifyPeer('cultivation-result', {
                player: pid,
                success: cultSuccess,
                artId: art.id,
                artName: art.name,
                artIcon: art.icon,
                removedCards: [{ uid: card1.uid, id: card1.id }, { uid: card2.uid, id: card2.id }]
            });
            refreshCurrentCardSelect();

            if (game.phase === 'attack-select') {
                renderCardHand(game.phaseAttacker, 'attack');
            } else if (game.phase === 'defend-select') {
                renderCardHand(game.phaseDefender, 'defend');
            }

            game.cultivationState.isProcessing = false;
        }, 3000);
    }

    function showCultivationResult(success, art, pid, card1, card2) {
        var titleText = success ? '🧘 修炼成功！' : '❌ 修炼失败';
        var titleColor = success ? '#4ade80' : '#ef4444';

        var materialText = '';
        if (card1 && card2) {
            materialText = '<div style="margin-top:14px;padding:10px;background:rgba(251,191,36,0.1);border-radius:8px;border:1px solid rgba(251,191,36,0.3);">' +
                '<div style="color:#fcd34d;font-size:13px;margin-bottom:6px;">💎 已消耗的材料：</div>' +
                '<div style="color:var(--text-light);font-size:12px;">' + 
                renderEmoji(card1.icon) + card1.name + '(' + RARITY_NAMES[card1.rarity] + ') / ' +
                renderEmoji(card2.icon) + card2.name + '(' + RARITY_NAMES[card2.rarity] + ')' + '</div>' +
                '</div>';
        }

        var html = '';
        if (success) {
            var bonusText = art.type === 'attack' ? 
                '攻击永久提升 ' + Math.round(art.atkBonus * 100) + '%' : 
                '防御永久提升 ' + Math.round(art.defBonus * 100) + '%';
            html = '<div style="text-align:center;padding:24px 16px;">' +
                '<div style="font-size:52px;margin-bottom:18px;">' + art.icon + '</div>' +
                '<div style="font-family:\'Ma Shan Zheng\',cursive;font-size:26px;color:' + titleColor + ';margin-bottom:14px;text-shadow:0 2px 8px rgba(74,222,128,0.5);">' + titleText + '</div>' +
                '<div style="font-size:18px;color:var(--text-light);margin:8px 0;">学会了 <strong style="color:var(--gold-light);font-size:20px;">' + art.name + '</strong></div>' +
                '<div style="font-size:22px;font-weight:700;color:#4ade80;margin:14px 0;">' + bonusText + '</div>' +
                '<div style="color:var(--text-dim);font-size:13px;margin-top:8px;line-height:1.6;">' + art.desc + '<br>该加成将应用于所有后续战斗</div>' +
                materialText +
                '</div>';
        } else {
            html = '<div style="text-align:center;padding:24px 16px;">' +
                '<div style="font-size:52px;margin-bottom:18px;">💔</div>' +
                '<div style="font-family:\'Ma Shan Zheng\',cursive;font-size:26px;color:' + titleColor + ';margin-bottom:14px;text-shadow:0 2px 8px rgba(239,68,68,0.5);">' + titleText + '</div>' +
                '<div style="font-size:17px;color:var(--text-light);margin:8px 0;">修炼 <strong style="color:var(--gold-light)">' + art.name + '</strong> 失败</div>' +
                '<div style="font-size:15px;color:var(--text-dim);margin:12px 0;line-height:1.6;">功亏一篑，可再次尝试<br>难度越高成功率越低，不要灰心！</div>' +
                materialText +
                '</div>';
        }

        playSound(success ? 'bonus' : 'lose');
        showModal(html + '<button class="btn btn-primary modal-btn" id="btn-close-cult-result" style="margin-top:20px;padding:12px 40px;font-size:15px;">' + (success ? '太棒了' : '再来一次') + '</button>');
        document.getElementById('btn-close-cult-result').onclick = function() {
            hideModal();
            showCultivationModal(pid);
        };
    }

    // ========== 武功显示与加成计算 ==========

    function renderLearnedMartialArts(pid) {
        var container = document.getElementById('player-' + pid.toLowerCase() + '-martial-arts');
        if (!container) return;

        if (!game.martialArts || !game.martialArts[pid]) {
            container.innerHTML = '<span style="font-size:10px;color:var(--text-dim)">暂未修炼其他武功</span>';
            return;
        }

        var learnedIds = game.martialArts[pid];
        if (learnedIds.length === 0) {
            container.innerHTML = '<span style="font-size:10px;color:var(--text-dim)">暂未修炼其他武功</span>';
            return;
        }

        var html = '';
        learnedIds.forEach(function(artId) {
            var art = MARTIAL_ARTS.find(function(a) { return a.id === artId; });
            if (art) {
                var bonusText = art.type === 'attack' ? 
                    '攻+' + Math.round(art.atkBonus * 100) + '%' : 
                    '防+' + Math.round(art.defBonus * 100) + '%';
                html += '<div class="martial-tag ' + art.type + '-type" title="' + art.desc + '">' + 
                    art.icon + ' ' + art.name + ' ' + bonusText + '</div>';
            }
        });
        container.innerHTML = html;
    }

    function getTotalAtkBonus(pid) {
        var player = getPlayer(pid);
        var charBonus = player.char ? player.char.atkBonus : 0;
        var cultivationBonus = (game.characterBonus && game.characterBonus[pid]) ? game.characterBonus[pid].atkBonus : 0;

        var martialBonus = 0;
        if (game.martialArts && game.martialArts[pid]) {
            game.martialArts[pid].forEach(function(artId) {
                var art = MARTIAL_ARTS.find(function(a) { return a.id === artId; });
                if (art && art.type === 'attack') martialBonus += art.atkBonus;
            });
        }

        return charBonus + cultivationBonus + martialBonus;
    }

    function getTotalDefBonus(pid) {
        var player = getPlayer(pid);
        var charBonus = player.char ? player.char.defBonus : 0;
        var cultivationBonus = (game.characterBonus && game.characterBonus[pid]) ? game.characterBonus[pid].defBonus : 0;

        var martialBonus = 0;
        if (game.martialArts && game.martialArts[pid]) {
            game.martialArts[pid].forEach(function(artId) {
                var art = MARTIAL_ARTS.find(function(a) { return a.id === artId; });
                if (art && art.type === 'defend') martialBonus += art.defBonus;
            });
        }

        return charBonus + cultivationBonus + martialBonus;
    }

    function getMartialArtsNames(pid, type) {
        var names = [];
        game.martialArts[pid].forEach(function(artId) {
            var art = MARTIAL_ARTS.find(function(a) { return a.id === artId; });
            if (art && art.type === type) names.push(art.icon + art.name);
        });
        return names.length > 0 ? names.join('、') : null;
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
