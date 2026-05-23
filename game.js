(function () {
    'use strict';

    var CHARACTERS = [
        { id: 'guojing', name: '郭靖', emoji: '🗡️', hp: 5, maxHp: 5, atkBonus: 0.15, defBonus: 0.10, signatureArt: { name: '降龙十八掌', icon: '🐉' } },
        { id: 'huangyaoshi', name: '黄药师', emoji: '🎵', hp: 4, maxHp: 4, atkBonus: 0.20, defBonus: 0.05, signatureArt: { name: '碧海潮生曲', icon: '🎵' } },
        { id: 'hongqigong', name: '洪七公', emoji: '🏏', hp: 5, maxHp: 5, atkBonus: 0.18, defBonus: 0, signatureArt: { name: '打狗棒法', icon: '🏏' } },
        { id: 'duanyu', name: '段誉', emoji: '🌸', hp: 3, maxHp: 3, atkBonus: 0, defBonus: 0.25, signatureArt: { name: '凌波微步', icon: '✨' } },
        { id: 'xuzhu', name: '虚竹', emoji: '📿', hp: 4, maxHp: 4, atkBonus: 0.10, defBonus: 0.15, signatureArt: { name: '天山六阳掌', icon: '☀️' } },
        { id: 'qiaofeng', name: '乔峰', emoji: '🐉', hp: 6, maxHp: 6, atkBonus: 0.22, defBonus: 0, signatureArt: { name: '降龙十八掌', icon: '🐉' } },
        { id: 'yangguo', name: '杨过', emoji: '⚔️', hp: 4, maxHp: 4, atkBonus: 0.20, defBonus: 0.05, signatureArt: { name: '玄铁重剑', icon: '⚔️' } },
        { id: 'zhangwuji', name: '张无忌', emoji: '☯️', hp: 5, maxHp: 5, atkBonus: 0.12, defBonus: 0.13, signatureArt: { name: '九阳神功', icon: '☀️' } },
        { id: 'linghuchong', name: '令狐冲', emoji: '🍶', hp: 4, maxHp: 4, atkBonus: 0.18, defBonus: 0.07, signatureArt: { name: '独孤九剑', icon: '🗡️' } },
        { id: 'renwoxing', name: '任我行', emoji: '🌀', hp: 5, maxHp: 5, atkBonus: 0.19, defBonus: 0.03, signatureArt: { name: '吸星大法', icon: '🌀' } },
        { id: 'dongfangbubai', name: '东方不败', emoji: '🌹', hp: 3, maxHp: 3, atkBonus: 0.25, defBonus: 0, signatureArt: { name: '葵花宝典', icon: '🌹' } },
        { id: 'niefeng', name: '聂风', emoji: '🌪️', hp: 5, maxHp: 5, atkBonus: 0.18, defBonus: 0.12, signatureArt: { name: '魔刀', icon: '⚔️' } },
        { id: 'bujingyun', name: '步惊云', emoji: '☁️', hp: 4, maxHp: 4, atkBonus: 0.24, defBonus: 0.06, signatureArt: { name: '绝世好剑', icon: '⚔️' } },
        { id: 'wuming', name: '无名', emoji: '⚡', hp: 6, maxHp: 6, atkBonus: 0.20, defBonus: 0.10, signatureArt: { name: '英雄剑', icon: '🗡️' } },
        { id: 'xiongba', name: '雄霸', emoji: '👑', hp: 5, maxHp: 5, atkBonus: 0.22, defBonus: 0.08, signatureArt: { name: '三分归元气', icon: '🌀' } },
        { id: 'zhaomin', name: '赵敏', emoji: '🦊', hp: 4, maxHp: 4, atkBonus: 0.15, defBonus: 0.12, signatureArt: { name: '九阴白骨爪', icon: '🦴' } },
        { id: 'zhouzhiruo', name: '周芷若', emoji: '🌙', hp: 4, maxHp: 4, atkBonus: 0.19, defBonus: 0.06, signatureArt: { name: '九阴真经', icon: '📖' } },
        { id: 'yangxiao', name: '杨逍', emoji: '⚡', hp: 4, maxHp: 4, atkBonus: 0.17, defBonus: 0.08, signatureArt: { name: '乾坤大挪移', icon: '🌀' } },
        { id: 'zhangsanfeng', name: '张三丰', emoji: '☯️', hp: 6, maxHp: 6, atkBonus: 0.16, defBonus: 0.18, signatureArt: { name: '太极拳', icon: '☯️' } },
        { id: 'lixunhuan', name: '李寻欢', emoji: '🔪', hp: 4, maxHp: 4, atkBonus: 0.26, defBonus: 0.04, signatureArt: { name: '小李飞刀', icon: '🔪' } },
        { id: 'afei', name: '阿飞', emoji: '⚡', hp: 4, maxHp: 4, atkBonus: 0.23, defBonus: 0.05, signatureArt: { name: '快剑', icon: '⚡' } },
        { id: 'shangguanjinhong', name: '上官金虹', emoji: '💰', hp: 5, maxHp: 5, atkBonus: 0.21, defBonus: 0.09, signatureArt: { name: '龙凤双环', icon: '💫' } },
        { id: 'shipotian', name: '石破天', emoji: '📖', hp: 6, maxHp: 6, atkBonus: 0.20, defBonus: 0.15, signatureArt: { name: '太玄经', icon: '📖' } },
        { id: 'dingdang', name: '丁当', emoji: '💕', hp: 4, maxHp: 4, atkBonus: 0.14, defBonus: 0.12, signatureArt: { name: '叮当响', icon: '🔔' } },
        { id: 'xiaoshiyilang', name: '萧十一郎', emoji: '🗡️', hp: 5, maxHp: 5, atkBonus: 0.20, defBonus: 0.10, signatureArt: { name: '割鹿刀', icon: '⚔️' } },
        { id: 'shenbijun', name: '沈璧君', emoji: '🌸', hp: 4, maxHp: 4, atkBonus: 0.12, defBonus: 0.15, signatureArt: { name: '洗妆剑法', icon: '🗡️' } },
        { id: 'lianchengbi', name: '连城璧', emoji: '✨', hp: 5, maxHp: 5, atkBonus: 0.22, defBonus: 0.08, signatureArt: { name: '天外飞仙', icon: '⚡' } }
    ];

    var EPIC_SKILLS = [
        { id: 'steal_card', name: '偷取', desc: '偷取对方一张卡牌', icon: '🤚', target: 'opponent', timing: 'current', condition: 'always' },
        { id: 'no_defend', name: '破防', desc: '对方本次不能使用防御', icon: '💥', target: 'opponent', timing: 'current', condition: 'always' },
        { id: 'reduce_attack', name: '削弱', desc: '对方本次防御值减少20%', icon: '⬇️', target: 'opponent', timing: 'current', condition: 'always' },
        { id: 'replace_epic', name: '降级', desc: '将对方一张史诗卡牌替换为普通卡牌', icon: '🔄', target: 'opponent', timing: 'current', condition: 'always' },
        { id: 'block_ability', name: '封技', desc: '限制对方角色技能下一次不能使用', icon: '🚫', target: 'opponent', timing: 'next', condition: 'always' }
    ];

    var WEAPONS = [
        { id: 'qinggaingjian', name: '青钢剑', type: 'attack', rarity: 'common', price: 100, value: 10, icon: '🗡️', desc: '最基本的江湖佩剑' },
        { id: 'panguanbi', name: '判官笔', type: 'attack', rarity: 'common', price: 100, value: 9, icon: '🖊️', desc: '文人墨客的防身利器' },
        { id: 'tongluo', name: '铜锣', type: 'attack', rarity: 'common', price: 100, value: 8, icon: '🪘', desc: '威慑用的响铜乐器' },
        { id: 'liuxingchui', name: '流星锤', type: 'attack', rarity: 'common', price: 100, value: 7, icon: '⚙️', desc: '暗藏机括的链锤' },
        { id: 'bianzi', name: '鞭子', type: 'attack', rarity: 'common', price: 100, value: 8, icon: '🪢', desc: '软硬兼施的软兵器' },
        { id: 'xuantiejian', name: '玄铁剑', type: 'attack', rarity: 'elite', price: 200, value: 18, icon: '⚔️', desc: '重剑无锋大巧不工' },
        { id: 'dagoubang', name: '打狗棒', type: 'attack', rarity: 'elite', price: 200, value: 16, icon: '🏏', desc: '丐帮镇帮之宝' },
        { id: 'bixuejian', name: '碧血剑', type: 'attack', rarity: 'elite', price: 200, value: 17, icon: '🔱', desc: '碧血染沙场之剑' },
        { id: 'yuanyangdao', name: '鸳鸯刀', type: 'attack', rarity: 'elite', price: 200, value: 15, icon: '💫', desc: '雌雄双刀合璧' },
        { id: 'zhugeliannu', name: '诸葛连弩', type: 'attack', rarity: 'elite', price: 200, value: 14, icon: '🏹', desc: '连珠箭法' },
        { id: 'yitianjian', name: '倚天剑', type: 'attack', rarity: 'rare', price: 350, value: 28, icon: '⚔️', desc: '号称武林至尊' },
        { id: 'tulongdao', name: '屠龙刀', type: 'attack', rarity: 'rare', price: 350, value: 25, icon: '🪓', desc: '号称武林至尊' },
        { id: 'tulong_steal', name: '屠龙刀·偷取', type: 'attack', rarity: 'epic', price: 500, value: 40, icon: '🐉', desc: '屠龙刀出谁与争锋', skill: EPIC_SKILLS[0] },
        { id: 'dagou_break', name: '打狗棒·破防', type: 'attack', rarity: 'epic', price: 500, value: 38, icon: '🏏', desc: '打狗棒法天下无敌', skill: EPIC_SKILLS[1] },
        { id: 'xuantie_reduce', name: '玄铁重剑·削弱', type: 'attack', rarity: 'epic', price: 500, value: 36, icon: '⚔️', desc: '重剑无锋大巧不工', skill: EPIC_SKILLS[2] },
        { id: 'bixue_replace', name: '碧血剑·降级', type: 'attack', rarity: 'epic', price: 500, value: 42, icon: '🔱', desc: '碧血染沙场威震江湖', skill: EPIC_SKILLS[3] },
        { id: 'yuxiao_block', name: '玉箫·封技', type: 'attack', rarity: 'epic', price: 500, value: 37, icon: '🎵', desc: '玉箫吹奏乱人心智', skill: EPIC_SKILLS[4] },
        { id: 'xueyindao', name: '雪饮刀', type: 'attack', rarity: 'legend', price: 800, value: 55, icon: '⚔️', desc: '聂风佩刀寒冰之气' },
        { id: 'jueshihaojian', name: '绝世好剑', type: 'attack', rarity: 'legend', price: 800, value: 58, icon: '⚔️', desc: '步惊云佩剑天下第一' },
        { id: 'yingxiongjian', name: '英雄剑', type: 'attack', rarity: 'rare', price: 350, value: 30, icon: '🗡️', desc: '无名佩剑武林神话' },
        { id: 'shenghuoling', name: '圣火令', type: 'attack', rarity: 'rare', price: 350, value: 26, icon: '🔥', desc: '明教圣物至高无上' },
        { id: 'xiaolifeidao', name: '小李飞刀', type: 'attack', rarity: 'legend', price: 800, value: 60, icon: '🔪', desc: '例不虚发天下第一暗器' },
        { id: 'longfengshuanghuan', name: '龙凤双环', type: 'defend', rarity: 'rare', price: 350, value: 24, icon: '💫', desc: '上官金虹兵器攻防一体' },
        { id: 'geludao', name: '割鹿刀', type: 'attack', rarity: 'legend', price: 800, value: 56, icon: '⚔️', desc: '天下第一神刀传说之兵' },
        { id: 'buyi', name: '布衣', type: 'defend', rarity: 'common', price: 100, value: 8, icon: '👘', desc: '粗布麻衣遮体' },
        { id: 'zhulian', name: '竹帘', type: 'defend', rarity: 'common', price: 100, value: 10, icon: '🎋', desc: '简易的竹制帘幕' },
        { id: 'mianpao', name: '棉袍', type: 'defend', rarity: 'common', price: 100, value: 7, icon: '🧥', desc: '御寒的棉布长袍' },
        { id: 'tengjia', name: '藤甲', type: 'defend', rarity: 'common', price: 100, value: 9, icon: '🛡️', desc: '藤条编织的轻甲' },
        { id: 'doulì', name: '斗笠', type: 'defend', rarity: 'common', price: 100, value: 7, icon: '🎩', desc: '遮阳挡雨的竹笠' },
        { id: 'jinisiruanjia', name: '金丝软甲', type: 'defend', rarity: 'elite', price: 200, value: 18, icon: '⛓️', desc: '金丝编织的软猬甲' },
        { id: 'tajitu', name: '太极图', type: 'defend', rarity: 'elite', price: 200, value: 15, icon: '☯️', desc: '太极双鱼图案护身' },
        { id: 'tieluohan', name: '铁罗汉', type: 'defend', rarity: 'elite', price: 200, value: 16, icon: '🗿', desc: '十八铜人阵法' },
        { id: 'huxinjing', name: '护心镜', type: 'defend', rarity: 'elite', price: 200, value: 14, icon: '💎', desc: '保护心口的铜镜' },
        { id: 'hunyuansan', name: '混元伞', type: 'defend', rarity: 'elite', price: 200, value: 13, icon: '☂️', desc: '周伯通的宝贝' }
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
        { id: 'geludaofa', name: '割鹿刀法', icon: '⚔️', type: 'attack', atkBonus: 0.20, defBonus: 0.06, rarity: 'legend', difficulty: 5, desc: '萧十一郎绝学刀法天下第一', source: '萧十一郎' },
        { id: 'tianwaifeixian', name: '天外飞仙', icon: '⚡', type: 'attack', atkBonus: 0.23, defBonus: 0.04, rarity: 'legend', difficulty: 5, desc: '连城璧终极剑招快若闪电', source: '萧十一郎' }
    ];

    var BLACK_MARKET_WEAPONS = [
        { id: 'bm_dragon_slayer', name: '屠龙者', type: 'attack', rarity: 'rare', price: 500, value: 32, icon: '🐉', desc: '屠龙勇士的荣耀之剑' },
        { id: 'bm_shadow_blade', name: '影刃', type: 'attack', rarity: 'rare', price: 500, value: 30, icon: '🗡️', desc: '暗影中的致命一击' },
        { id: 'bm_frost_armor', name: '寒冰甲', type: 'defend', rarity: 'rare', price: 500, value: 28, icon: '❄️', desc: '冰封万里的防御' },
        { id: 'bm_phantom_shield', name: '幻影盾', type: 'defend', rarity: 'rare', price: 500, value: 26, icon: '🛡️', desc: '虚幻莫测的防护' },
        { id: 'bm_inferno_sword', name: '烈焰剑', type: 'attack', rarity: 'epic', price: 700, value: 45, icon: '🔥', desc: '焚烧一切的火焰之剑' },
        { id: 'bm_thunder_hammer', name: '雷神锤', type: 'attack', rarity: 'epic', price: 700, value: 43, icon: '⚡', desc: '雷霆万钧的神力' },
        { id: 'bm_divine_protection', name: '神圣庇护', type: 'defend', rarity: 'epic', price: 700, value: 40, icon: '✨', desc: '神明赐予的守护' },
        { id: 'bm_abyssal_guard', name: '深渊守卫', type: 'defend', rarity: 'epic', price: 700, value: 38, icon: '🌑', desc: '来自深渊的强大防护' },
        { id: 'bm_void_blade', name: '虚空之刃', type: 'attack', rarity: 'epic', price: 750, value: 48, icon: '🌌', desc: '撕裂空间的虚空之力' },
        { id: 'bm_time_dial', name: '时光之轮', type: 'defend', rarity: 'epic', price: 750, value: 42, icon: '⏰', desc: '时间停滞的绝对防御' },
        { id: 'bm_soul_reaper', name: '死神镰刀', type: 'attack', rarity: 'epic', price: 750, value: 50, icon: '💀', desc: '收割灵魂的恐怖武器' },
        { id: 'bm_angel_wings', name: '天使之翼', type: 'defend', rarity: 'epic', price: 750, value: 45, icon: '👼', desc: '神圣天使的庇护之翼' }
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
                case 'skill': osc.frequency.value = 300; osc.type = 'sawtooth'; gain.gain.value = 0.12; osc.start(ctx.currentTime); osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.2); osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.4); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); osc.stop(ctx.currentTime + 0.5); break;
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
        var desc = card.desc || '';
        var skillHtml = '';
        if (card.skill) {
            skillHtml = '<div style="margin-top:8px;padding:6px 10px;background:rgba(156,39,176,0.2);border:1px solid rgba(156,39,176,0.5);border-radius:6px;font-size:11px;color:#ce93d8;">' +
                card.skill.icon + ' <strong>' + card.skill.name + '</strong>：' + card.skill.desc + '</div>';
        }
        $('card-preview').innerHTML =
            '<div class="weapon-card rarity-' + card.rarity + '" style="transform:scale(1.4);margin:40px auto;max-width:320px;">' +
            '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
            '<span class="card-icon">' + card.icon + '</span>' +
            '<span class="card-name">' + card.name + '</span>' +
            '<span class="card-value">' + valueLabel + ':' + card.value + '</span>' +
            '<span class="card-price">💰' + card.price + ' · ' + rarityName + '</span></div>' +
            '<div style="margin-top:30px;padding:10px 16px;max-width:340px;text-align:center;">' +
            '<div style="font-size:13px;color:var(--text-dim);margin-bottom:6px;">' + desc + '</div>' +
            skillHtml +
            '</div>';
        $('card-preview-overlay').classList.remove('hidden');
    }

    function createCardHTML(card, selectable) {
        var cls = 'weapon-card rarity-' + card.rarity;
        if (selectable) cls += ' selectable';
        var typeLabel = card.type === 'attack' ? '攻击' : '防御';
        var valueLabel = card.type === 'attack' ? '伤害' : '防御';
        var skillIcon = card.skill ? ' ' + card.skill.icon : '';
        return '<div class="' + cls + '" data-uid="' + card.uid + '">' +
            '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
            '<span class="card-icon">' + card.icon + '</span>' +
            '<span class="card-name">' + card.name + skillIcon + '</span>' +
            '<span class="card-value">' + valueLabel + ':' + card.value + '</span>' +
            '<span class="card-price">💰' + card.price + '</span></div>';
    }

    function createMiniCardHTML(card, isNew) {
        var extraCls = isNew ? ' library-new' : '';
        var skillIcon = card.skill ? card.skill.icon : '';
        return '<div class="weapon-card mini rarity-' + card.rarity + extraCls + '" data-uid="' + card.uid + '" title="' + card.name + ' ' + (card.type === 'attack' ? '伤害' : '防御') + ':' + card.value + (card.skill ? ' 技能:' + card.skill.name : '') + '">' +
            '<span class="card-icon">' + card.icon + '</span><span class="card-value">' + card.value + '</span>' +
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
        keepButtons = keepButtons || [];
        ['a', 'b'].forEach(function (p) {
            var pid = p.toUpperCase();
            var autoContainer = document.querySelector('#panel-' + p.toLowerCase() + ' .auto-spin-container');
            if (autoContainer && keepButtons.indexOf('btn-' + p + '-spin-weapon') === -1) {
                autoContainer.style.display = 'none';
            }
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
            if (opts.text !== undefined) el.textContent = opts.text;
            if (btnId === 'spin-weapon') {
                var autoContainer = $('auto-spin-' + pPrefix(pid).toLowerCase()).closest('.auto-spin-container') || $('auto-spin-' + pPrefix(pid).toLowerCase()).parentElement;
                if (autoContainer) autoContainer.style.display = 'flex';
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
            $('player-a-avatar').textContent = a.char.emoji;
            $('player-a-char').textContent = a.char.name;
            $('player-a-hp-text').textContent = a.hp.toFixed(1) + '/' + a.maxHp;
            $('player-a-hp-bar').style.width = (a.hp / a.maxHp * 100) + '%';
            var aAbility = game.blockAbilityA ? '🚫 技能被封印' : generateAbilityDesc(a.char);
            $('player-a-ability').textContent = aAbility;
        }
        if (b.char) {
            $('player-b-avatar').textContent = b.char.emoji;
            $('player-b-char').textContent = b.char.name;
            $('player-b-hp-text').textContent = b.hp.toFixed(1) + '/' + b.maxHp;
            $('player-b-hp-bar').style.width = (b.hp / b.maxHp * 100) + '%';
            var bAbility = game.blockAbilityB ? '🚫 技能被封印' : generateAbilityDesc(b.char);
            $('player-b-ability').textContent = bAbility;
        }
        $('round-number').textContent = '第' + game.round + '轮';
        updateGoldDisplay();
        updateLibraryDisplay();
        renderLearnedMartialArts('A');
        renderLearnedMartialArts('B');
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
                '<span class="card-icon">' + c.icon + '</span>' +
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

    function spinWheel(canvasId, items, targetIndex, callback) {
        if (wheelSpinning) return; wheelSpinning = true; playSound('spin');
        var n = items.length;
        var arc = (2 * Math.PI) / n;
        var targetAngle = (2 * Math.PI) - (targetIndex * arc + arc / 2) + Math.PI / 2;
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
                try {
                    var ctx2 = getAudioCtx(); if (ctx2) {
                        var o = ctx2.createOscillator(), g = ctx2.createGain();
                        o.connect(g); g.connect(ctx2.destination);
                        o.frequency.value = 600 + Math.random() * 200; o.type = 'sine'; g.gain.value = 0.03;
                        o.start(ctx2.currentTime); o.stop(ctx2.currentTime + 0.02);
                    }
                } catch (e) { }
            }
            lastTickAngle = currentTickAngle;

            if (pr < 1) { requestAnimationFrame(anim); }
            else { wheelSpinning = false; wheelBlinkFrame = 0; playSound('result'); callback(items[targetIndex], targetIndex); }
        }
        requestAnimationFrame(anim);
    }

    function initStartScreen() {
        $('btn-dual').addEventListener('click', function () { playSound('click'); game.mode = 'dual'; isOnlineMode = false; startCharacterSelect(); });
        $('btn-online').addEventListener('click', function () { playSound('click'); initLobby(); showScreen('screen-lobby'); });
        $('btn-sound').addEventListener('click', function () { game.soundEnabled = !game.soundEnabled; game.voiceEnabled = game.soundEnabled; $('btn-sound').textContent = game.soundEnabled ? '🔊 音效：开' : '🔇 音效：关'; if (game.soundEnabled) playSound('click'); });
    }

    function startCharacterSelect() {
        game.phase = 'character-select'; game.currentPlayer = 'A'; game.usedCharIds = [];
        vsAnimationShown = false;
        showScreen('screen-character'); $('char-result').classList.add('hidden'); $('btn-spin-char').disabled = false;
        $('char-select-title').textContent = '角色抽取';
        updateCharSelectUI();
        var ci = CHARACTERS.map(function (c) { return { name: c.name, id: c.id, icon: c.emoji }; });
        wheelAngle = 0; drawWheel('character-wheel', ci); speak('请玩家A点击转盘抽取角色');
    }

    function updateCharSelectUI() {
        var isMyTurn = !isOnlineMode || canIOperate(game.currentPlayer);
        var hintPrefix = isOnlineMode ? (isMyTurn ? '🎯 轮到你' : '⏳ 等待') + ' - ' : '';
        var currentPlayerLabel = playerLabel(game.currentPlayer);
        var charWheelEl = document.querySelector('.wheel-container.char-wheel');
        var charResultShown = !$('char-result').classList.contains('hidden');

        if (charResultShown) {
            $('btn-spin-char').style.display = 'none';
            $('btn-char-confirm').style.display = 'none';
            $('char-select-hint').textContent = hintPrefix + currentPlayerLabel + '抽取到了角色，2秒后自动确认...';
            if (charWheelEl) { charWheelEl.style.opacity = '0.3'; charWheelEl.style.pointerEvents = 'none'; }
        } else {
            if (isMyTurn) {
                $('char-select-hint').textContent = hintPrefix + '请' + currentPlayerLabel + '点击转盘抽取角色';
                $('btn-spin-char').style.display = '';
                $('btn-char-confirm').style.display = 'none';
                if (charWheelEl) { charWheelEl.style.opacity = '1'; charWheelEl.style.pointerEvents = 'auto'; }
            } else {
                $('char-select-hint').textContent = hintPrefix + currentPlayerLabel + '正在抽取角色...';
                $('btn-spin-char').style.display = 'none';
                $('btn-char-confirm').style.display = 'none';
                if (charWheelEl) { charWheelEl.style.opacity = '0.3'; charWheelEl.style.pointerEvents = 'none'; }
            }
        }
    }

    function initCharacterSelect() {
        $('btn-spin-char').addEventListener('click', function () {
            if (wheelSpinning) return;
            if (isOnlineMode && !canIOperate(game.currentPlayer)) return;
            $('btn-spin-char').disabled = true;
            var ac = CHARACTERS.filter(function (c) { return game.usedCharIds.indexOf(c.id) === -1; });
            var ci = ac.map(function (c) { return { name: c.name, id: c.id, icon: c.emoji }; });
            var targetIdx = randomInt(0, ac.length - 1);
            var selectedCharId = ac[targetIdx].id;
            spinWheel('character-wheel', ci, targetIdx, function (sel) {
                if (!isOnlineMode || canIOperate(game.currentPlayer)) {
                    var ch = CHARACTERS.find(function (c) { return c.id === sel.id; });
                    var p = game.currentPlayer === 'A' ? game.playerA : game.playerB;
                    p.char = ch; p.hp = ch.hp; p.maxHp = ch.maxHp; game.usedCharIds.push(ch.id);
                    $('char-info-display').innerHTML = '<div class="char-emoji">' + ch.emoji + '</div><div class="char-name">' + ch.name + '</div><div class="char-stat">血量：' + ch.hp + '点（' + (ch.hp * 10) + '伤害值）</div><div class="char-ability">特殊能力：' + generateAbilityDesc(ch) + '</div>';
                    $('char-result').classList.remove('hidden');
                    speak(playerLabel(game.currentPlayer) + '抽到了' + ch.name);
                    notifyPeer('char-spin-result', { charId: selectedCharId });
                    updateCharSelectUI();
                    setTimeout(function () { autoConfirmChar(); }, 2000);
                }
            });
            if (isOnlineMode) notifyPeer('char-spin-start', {});
        });
        $('btn-char-confirm').addEventListener('click', function () {
            playSound('click');
            if (isOnlineMode && !canIOperate(game.currentPlayer)) return;
            autoConfirmChar();
        });
    }

    function autoConfirmChar() {
        if (game.currentPlayer === 'A') {
            game.currentPlayer = 'B'; $('char-result').classList.add('hidden'); $('btn-spin-char').disabled = false;
            var ac = CHARACTERS.filter(function (c) { return game.usedCharIds.indexOf(c.id) === -1; });
            var ci = ac.map(function (c) { return { name: c.name, id: c.id, icon: c.emoji }; });
            wheelAngle = 0; drawWheel('character-wheel', ci); speak('请玩家B点击转盘抽取角色');
            updateCharSelectUI();
            notifyPeer('char-confirm', { from: 'A' });
        } else { showVSAnimation(); notifyPeer('char-confirm', { from: 'B' }); }
    }

    function showVSAnimation() {
        console.log('[ VS ] showVSAnimation 被调用');

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
            '<div class="vs-emoji">' + a.char.emoji + '</div>' +
            '<div class="vs-name">' + a.char.name + '</div>' +
            '<div class="vs-player">玩家A</div>' +
            '<div class="vs-hp">' + generateAbilityDesc(a.char) + '</div>' +
            '</div>' +
            '<div class="vs-text">VS</div>' +
            '<div class="vs-fighter vs-right">' +
            '<div class="vs-emoji">' + b.char.emoji + '</div>' +
            '<div class="vs-name">' + b.char.name + '</div>' +
            '<div class="vs-player">玩家B</div>' +
            '<div class="vs-hp">' + generateAbilityDesc(b.char) + '</div>' +
            '</div>';
        showScreen('screen-vs');
        playSound('pk');
        speak(a.char.name + ' 对阵 ' + b.char.name);
        console.log('[ VS ] isOnlineMode:', isOnlineMode, 'isGuest():', Multiplayer.isGuest());
        if (isOnlineMode && Multiplayer.isGuest()) {
            setTimeout(function () {
                $('vs-container').innerHTML = '<p style="color:var(--text-dim);font-size:16px;">等待房主同步游戏数据...</p>';
                console.log('[ VS ] 显示等待房主同步...');
            }, 3000);
        } else {
            setTimeout(function () {
                console.log('[ VS ] 3秒后调用 startBattle()');
                startBattle();
            }, 3000);
        }
    }

    function updateOnlineStatusBar() {
        var statusBar = $('online-status-bar');
        if (!statusBar) return;

        if (!isOnlineMode) {
            statusBar.classList.add('hidden');
            return;
        }

        statusBar.classList.remove('hidden');

        var roomIdEl = $('battle-room-id');
        var peerStatusEl = $('battle-peer-status');
        var peerTextEl = $('battle-peer-text');
        var peerDotEl = peerStatusEl ? peerStatusEl.querySelector('.peer-status-dot-small') : null;

        if (roomIdEl) {
            roomIdEl.textContent = Multiplayer.getRoomId() || '未知';
        }

        if (Multiplayer.isConnected()) {
            if (peerDotEl) peerDotEl.classList.add('connected');
            if (peerTextEl) {
                peerTextEl.textContent = '对方已连接';
                peerTextEl.classList.add('connected');
            }
        } else {
            if (peerDotEl) peerDotEl.classList.remove('connected');
            if (peerTextEl) {
                peerTextEl.textContent = '未连接';
                peerTextEl.classList.remove('connected');
            }
        }
    }

    function startBattle() {
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
        game.weaponDrawCount = 0; game.weaponDrawPlayer = 'A';
        game.currentAttackIndex = 0; game.bonusAttacks = 0;
        game.phaseAttacker = null; game.phaseDefender = null; game.isCounterPhase = false;
        game.currentAttackCard = null; game.currentDefendCard = null; game.selectedCardUid = null;

        updateAttackProgress();
        game.blockAbilityA = false; game.blockAbilityB = false;
        game.attackReduction = 0; game.tempDefenseReduction = 0;
        clearTableCards(); clearBattleLog();
        showScreen('screen-battle'); updatePlayerInfo(); updateLibraryDisplay([]);
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
    }

    function startWeaponDrawPhase() {
        game.phase = 'weapon-draw'; game.weaponDrawPlayer = 'A'; game.weaponDrawCount = 0;
        game.playerA.roundCards = []; game.playerB.roundCards = []; game.selectedCardUid = null;
        clearBattleLog();
        clearTableCards();
        setActivePlayer('A'); showSection('weapon-draw-area');
        updateAttackProgress();
        hideAllOps();
        updateWeaponDrawUI();
        $('action-hint').textContent = '第' + game.round + '轮 - 武器抽取阶段';
        updateWeaponDrawHint(); wheelAngle = 0; drawWeaponWheel();
        $('drawn-cards').innerHTML = '';
        announcePlayerTurn('A', '请抽取武器');
    }

    function updateWeaponDrawUI() {
        var pid = game.weaponDrawPlayer;
        var isMyTurn = !isOnlineMode || canIOperate(pid);
        var otherPid = pid === 'A' ? 'B' : 'A';
        var weaponWheelEl = document.querySelector('#weapon-draw-area .wheel-container');

        if (isMyTurn) {
            showOp(pid, 'spin-weapon');
            setOpsStatus(pid, '请抽取武器');
            if (weaponWheelEl) { weaponWheelEl.style.opacity = '1'; weaponWheelEl.style.pointerEvents = 'auto'; }
            $('action-hint').textContent = '🎯 第' + game.round + '轮 - 轮到' + playerLabel(pid) + '抽取武器';
        } else {
            hideAllOps();
            setOpsStatus(otherPid, '');
            setOpsStatus(pid, '⏳ 等待对方抽取...');
            if (weaponWheelEl) { weaponWheelEl.style.opacity = '0.3'; weaponWheelEl.style.pointerEvents = 'none'; }
            $('action-hint').textContent = '⏳ 等待' + playerLabel(pid) + '抽取武器...';
        }
    }

    function updateWeaponDrawHint() {
        var pn = playerLabel(game.weaponDrawPlayer), cn = getPlayer(game.weaponDrawPlayer).char.name;
        $('weapon-draw-hint').textContent = pn + '（' + cn + '）还有' + (3 - game.weaponDrawCount) + '次抽取机会';
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

    function handleSpinWeapon() {
        if (wheelSpinning) return;
        if (isOnlineMode && !canIOperate(game.weaponDrawPlayer)) return;
        var autoCheckbox = $('auto-spin-' + game.weaponDrawPlayer.toLowerCase());
        var isAutoMode = autoCheckbox && autoCheckbox.checked;
        var autoSpinPlayer = game.weaponDrawPlayer;
        var btn = opBtn(game.weaponDrawPlayer, 'spin-weapon');
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
            var wp = selectedWp;
            var drawn = Object.assign({}, wp); drawn.uid = newCardUid();
            var player = getPlayer(game.weaponDrawPlayer);
            player.roundCards.push(drawn); player.library.push(drawn); game.weaponDrawCount++;
            console.log('[ Weapon ] 本地抽取武器:', drawn.name, 'uid:', drawn.uid, 'player:', game.weaponDrawPlayer, 'count:', game.weaponDrawCount);
            console.log('[ Weapon ] 玩家', game.weaponDrawPlayer, '库大小:', player.library.length);
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
                '<span class="card-icon">' + drawn.icon + '</span>' +
                '<span class="card-name">' + drawn.name + '</span>' +
                '<span class="card-value">' + valueLabel + ':' + drawn.value + '</span>' +
                '<span class="card-price">💰' + drawn.price + '</span></div>' + skillTag;
            var cardEl = $('drawn-cards').querySelector('.weapon-card');
            if (cardEl) cardEl.addEventListener('click', function () { showCardPreview(drawn); });
            updateLibraryDisplay([drawn.uid]);
            console.log('[ Weapon ] 发送 weapon-spin 消息, uid:', drawn.uid);
            notifyPeer('weapon-spin', { weapon: { id: wp.id, uid: drawn.uid }, player: game.weaponDrawPlayer });
            var delay = isRare ? 2500 : 1200;
            setTimeout(function () {
                $('drawn-cards').innerHTML = '';
                afterWeaponDrawAction();
                var currentCheckbox = $('auto-spin-' + game.weaponDrawPlayer.toLowerCase());
                var currentAutoMode = currentCheckbox && currentCheckbox.checked;
                if (currentAutoMode && game.weaponDrawPlayer === autoSpinPlayer && game.weaponDrawCount < 3 && game.phase === 'weapon-draw') {
                    setTimeout(function () {
                        handleSpinWeapon();
                    }, 1000);
                }
            }, delay);
        });
    }

    function afterWeaponDrawAction() {
        if (game.weaponDrawCount < 3) {
            updateWeaponDrawHint();
            var btn = opBtn(game.weaponDrawPlayer, 'spin-weapon');
            if (btn) { btn.style.display = 'block'; btn.disabled = false; }
            drawWeaponWheel();
        } else if (game.weaponDrawPlayer === 'A') {
            game.weaponDrawPlayer = 'B'; game.weaponDrawCount = 0;
            setActivePlayer('B'); updateWeaponDrawHint();
            wheelAngle = 0; drawWeaponWheel(); $('drawn-cards').innerHTML = '';
            announcePlayerTurn('B', '请抽取武器');
            updateWeaponDrawUI();
        } else { finishWeaponDraw(); }
    }

    function finishWeaponDraw() {
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
            console.log('[ Weapon ] 发送武器抽取完成同步消息');
            notifyPeer('weapon-draw-complete', syncData);
        }

        showModal('<h3>🎲 武器抽取完成</h3>' +
            '<p style="font-size:14px;color:var(--text-light);margin:8px 0;">玩家A获得 ' + game.playerA.roundCards.length + ' 张：' + (al || '无') + '</p>' +
            '<p style="font-size:14px;color:var(--text-light);margin:8px 0;">玩家B获得 ' + game.playerB.roundCards.length + ' 张：' + (bl || '无') + '</p>' +
            '<p style="color:var(--gold-light);font-size:13px;margin-top:12px;">⏳ 3秒后投掷骰子...</p>');
        setTimeout(function () {
            hideModal();
            if (isOnlineMode) {
                startDicePhase();
            } else {
                game.phase = 'dice';
                showSection('dice-area');
                hideAllOps();
                $('action-hint').textContent = '投掷骰子决定攻击顺序';
                $('dice-hint').textContent = '骰子投掷中...';
                $('dice-face').textContent = '?';
                $('dice-result').classList.add('hidden');
                $('btn-roll-dice').style.display = 'none';
                diceRolled = false;
                doRollDice();
            }
        }, 3000);
    }

    function startDicePhase() {
        game.phase = 'dice'; showSection('dice-area');
        hideAllOps();
        $('action-hint').textContent = '投掷骰子决定攻击顺序';
        $('dice-face').textContent = '?'; $('dice-result').classList.add('hidden');
        $('btn-roll-dice').style.display = 'none';
        diceRolled = false;

        if (isOnlineMode) {
            var isMyTurn = canIOperate(game.currentPlayer);
            if (isMyTurn) {
                $('dice-hint').textContent = '正在自动投掷骰子...';
                $('action-hint').textContent = '🎯 正在投掷骰子...';
                setTimeout(function () { doRollDice(); }, 500);
            } else {
                $('dice-hint').textContent = '⏳ 等待对方投掷骰子...';
                $('action-hint').textContent = '⏳ 等待对方投掷骰子...';
            }
        } else {
            $('dice-hint').textContent = '请点击下方按钮投掷骰子';
            $('btn-roll-dice').style.display = 'block';
            $('btn-roll-dice').disabled = false;
        }
    }

    function doRollDice() {
        if (diceRolled || game.phase !== 'dice') return;
        if (isOnlineMode && !canIOperate(game.currentPlayer)) return;
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
        var iv = setInterval(function () {
            $('dice-face').textContent = randomInt(1, 6); cnt++;
            if (cnt >= 12) {
                clearInterval(iv); $('dice-face').textContent = result; $('dice').classList.remove('rolling');
                var isOdd = result % 2 === 1;
                game.firstAttacker = isOdd ? 'A' : 'B'; game.secondAttacker = isOdd ? 'B' : 'A';
                $('dice-result').classList.remove('hidden');
                var fl = playerLabel(game.firstAttacker), fn = getPlayer(game.firstAttacker).char.name;
                $('dice-result').innerHTML = '点数：<strong style="font-size:24px;">' + result + '</strong>（' + (isOdd ? '单数' : '双数') + '）<br><span style="color:var(--gold-light);font-size:18px;">' + fl + '（' + fn + '）先攻！</span>';
                playSound('result'); speak('点数' + result + '，' + fl + fn + '先攻');
                notifyPeer('dice-roll', { value: result });
                setTimeout(function () {
                    var diceArea = $('dice-area');
                    if (diceArea) {
                        diceArea.classList.add('hidden');
                        startAttackPhase(false);
                    } else {
                        startAttackPhase(false);
                    }
                }, 2000);
            }
        }, 80);
    }
    window.doRollDice = doRollDice;

    function startAttackPhase(isCounter) {
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
            $('damage-display').innerHTML = '<div class="damage-number" style="color:var(--text-dim);">0</div><div class="damage-result">' + playerLabel(game.phaseAttacker) + '（' + atkChar.name + '）没有攻击卡牌，无法攻击</div>';
            speak(atkChar.name + '没有攻击卡牌');
            if (isCounter) {
                $('center-actions').innerHTML = '<button class="btn btn-primary" id="btn-center-nr">进入下一轮 →</button>';
                $('btn-center-nr').addEventListener('click', function () { playSound('click'); $('center-actions').innerHTML = ''; notifyPeer('end-attack', { currentAttackIndex: game.currentAttackIndex, attackReduction: game.attackReduction, bonusAttacks: game.bonusAttacks, isCounterPhase: true }); nextRound(); });
            } else {
                $('center-actions').innerHTML = '<button class="btn btn-primary" id="btn-center-counter">后攻方反击 →</button>';
                $('btn-center-counter').addEventListener('click', function () { playSound('click'); $('center-actions').innerHTML = ''; notifyPeer('start-counter', { isCounterPhase: true }); startAttackPhase(true); });
            }
            return;
        }

        showAttackCardSelect();
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
        showOp(game.phaseAttacker, 'confirm-card', { disabled: true });
        showOp(game.phaseAttacker, 'sell');
        showOp(game.phaseAttacker, 'buy');
        showOp(game.phaseAttacker, 'synthesis');
        showOp(game.phaseAttacker, 'cultivation');
        setOpsStatus(game.phaseAttacker, phaseLabel + '阶段');
        renderCardHand(game.phaseAttacker, 'attack');
        announcePlayerTurn(game.phaseAttacker, '请选择第' + attackNum + '次攻击卡牌');
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
            game.currentDefendCard = null;
            if (isOnlineMode && !canIOperate(game.phaseDefender)) {
                var prefix = 'player-' + game.phaseDefender.toLowerCase();
                var selectArea = $(prefix + '-select-area');
                var selectTitle = $(prefix + '-select-title');
                var selectCards = $(prefix + '-select-cards');
                if (selectArea) selectArea.classList.remove('hidden');
                if (selectTitle) selectTitle.textContent = '🛡️ 对方没有防御卡牌';
                if (selectCards) selectCards.innerHTML = '<div style="color:var(--text-dim);padding:12px;text-align:center;font-size:13px;">' + playerLabel(game.phaseDefender) + ' 没有防御卡牌，自动跳过防御</div>';
                setOpsStatus(game.phaseDefender, '⏳ 等待对方确认...');
                setTimeout(function () { resolveSingleAttack(); }, 800);
            } else {
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
        showOp(game.phaseDefender, 'confirm-card', { disabled: true });
        showOp(game.phaseDefender, 'skip-defend');
        showOp(game.phaseDefender, 'sell');
        showOp(game.phaseDefender, 'buy');
        showOp(game.phaseDefender, 'synthesis');
        showOp(game.phaseDefender, 'cultivation');
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

        if (isOnlineMode && !canIOperate(playerId)) {
            if (selectArea) selectArea.classList.remove('hidden');
            if (selectTitle) selectTitle.textContent = '⏳ 等待对方选择...';
            if (selectCards) selectCards.innerHTML = '<div style="color:var(--text-dim);padding:12px;text-align:center;font-size:13px;">等待 ' + playerLabel(playerId) + ' 选择卡牌</div>';
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
                    }
                });

                selectCards.addEventListener('dblclick', function (e) {
                    var target = e.target.closest('.weapon-card.selectable');
                    if (target) {
                        var card = findCardByUid(player, target.getAttribute('data-uid'));
                        if (card) showCardPreview(card);
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
        qiankun_abs: '乾坤大挪移绝对守护！明教护教神功，乾坤挪移万法不侵！'
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
            '<span class="card-icon">' + card.icon + '</span>' +
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
            setTimeout(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                if (callback) callback();
            }, 400);
        }, duration);
    }

    function handleConfirmCard() {
        var pid = game.phase === 'attack-select' ? game.phaseAttacker : game.phaseDefender;
        if (isOnlineMode && !canIOperate(pid)) return;
        var card = getSelectedCard(pid);
        if (!card) return; playSound('click');
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
    }

    function handleSkipDefend() {
        var pid = game.phaseDefender;
        if (isOnlineMode && !canIOperate(pid)) return;
        playSound('click');
        hideSelectAreas();
        game.currentDefendCard = null;
        notifyPeer('skip-defend', {});
        resolveSingleAttack();
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
                    resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">🤚 偷取技能触发！偷取了' + playerLabel(defenderPid) + '的 ' + stolenCard.icon + stolenCard.name + '！</div>';
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
                            resultHtml = '<div style="color:#ce93d8;font-size:13px;margin:4px 0;">🔄 降级技能触发！将对方 ' + targetCard.icon + targetCard.name + ' 替换为 ' + replacement.icon + replacement.name + '！</div>';
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
            '<div style="font-size:14px;color:var(--text-dim);margin-bottom:8px;">' + atkCard.icon + atkCard.name + ' ' + atkWithBonus + ' vs ' + (defCard ? defCard.icon + defCard.name + ' ' + defWithBonus : '无防御') + '</div>' +
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
        var cardNames = bonusCards.map(function (c) { return c.icon + c.name; }).join('、');
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

        showOp(game.phaseAttacker, 'continue-attack', { text: '⚔️ 继续攻击（' + (game.currentAttackIndex + 1) + '/' + maxAtk + '）' });
        showOp(game.phaseAttacker, 'end-attack');
        setOpsStatus(game.phaseAttacker, phaseLabel + ' ' + game.currentAttackIndex + '/' + maxAtk + ' 次');

        announcePlayerTurn(game.phaseAttacker, '已完成' + game.currentAttackIndex + '次攻击，是否继续');
    }

    function afterAttackPhaseEnds() {
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
        game.allRoundLogs.push({ round: game.round, log: game.roundLog.slice() });

        var rewardCardsA = [];
        var rewardCardsB = [];
        ['A', 'B'].forEach(function (pid) {
            var player = getPlayer(pid);
            player.gold += 1500;
            for (var i = 0; i < 2; i++) {
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

        var rewardInfoA = rewardCardsA.map(function (c) { return c.icon + c.name; }).join('、');
        var rewardInfoB = rewardCardsB.map(function (c) { return c.icon + c.name; }).join('、');

        showModal('<h3>第' + (game.round - 1) + '轮结束</h3>' +
            '<p>玩家A（' + game.playerA.char.name + '）剩余血量：' + game.playerA.hp.toFixed(1) + '/' + game.playerA.maxHp + '</p>' +
            '<p>玩家B（' + game.playerB.char.name + '）剩余血量：' + game.playerB.hp.toFixed(1) + '/' + game.playerB.maxHp + '</p>' +
            '<div style="margin:10px 0;padding:10px;background:rgba(212,168,67,0.15);border:1px solid var(--gold);border-radius:8px;">' +
            '<div style="color:var(--gold-light);font-size:15px;font-weight:700;">🎁 轮次奖励</div>' +
            '<div style="color:var(--text-light);font-size:13px;margin:4px 0;">💰 每位玩家获得 500 金币</div>' +
            '<div style="color:var(--text-light);font-size:13px;">玩家A获得卡牌：' + rewardInfoA + '</div>' +
            '<div style="color:var(--text-light);font-size:13px;">玩家B获得卡牌：' + rewardInfoB + '</div>' +
            '</div>' +
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
            var atkCards = getPlayer(game.phaseAttacker).library.filter(function (c) { return c.type === 'attack'; });
            if (atkCards.length === 0) {
                hideSelectAreas();
                hideAllOps();
                showOp(game.phaseAttacker, 'end-attack');
                setOpsStatus(game.phaseAttacker, '没有攻击卡牌了');
                return;
            }
            renderCardHand(game.phaseAttacker, 'attack');
            showOp(game.phaseAttacker, 'confirm-card', { disabled: true });
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
            showOp(game.phaseDefender, 'confirm-card', { disabled: true });
            showOp(game.phaseDefender, 'skip-defend');
            showOp(game.phaseDefender, 'sell');
            showOp(game.phaseDefender, 'buy');
            showOp(game.phaseDefender, 'synthesis');
            showOp(game.phaseDefender, 'cultivation');
        }
    }

    function showSellModal(pid) {
        var player = getPlayer(pid);
        if (player.library.length === 0) {
            showModal('<div class="modal-close-btn" id="btn-close-sell-x">✕</div><h3>出售卡牌</h3><p style="color:var(--text-dim);">没有可出售的卡牌</p>');
            $('btn-close-sell-x').addEventListener('click', function () { hideModal(); refreshCurrentCardSelect(); });
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
                '<span class="sell-card-icon">' + card.icon + '</span>' +
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

        $('btn-close-sell-x').addEventListener('click', function () { hideModal(); refreshCurrentCardSelect(); });

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
                notifyPeer('sell-card', { uid: uid, pid: pid });
                hideModal();
                showSellModal(pid);
            });
        });
    }

    function showBuyModal(pid) {
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
                        '<span class="card-icon">' + wp.icon + '</span>' +
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
                            showBuyModal(pid);
                        }, 1500);
                    });
                });
            } else if (tabName === 'rare-wheel') {
                var rareWheelPrice = 450;
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
                        notifyPeer('buy-card', { weaponId: wp.id, price: wp.price, pid: pid, cardUid: newCard.uid });
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
        $('btn-close-buy-x').addEventListener('click', function () { hideModal(); refreshCurrentCardSelect(); });
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
                var sm = game.mode, ss = game.soundEnabled;
                game = {
                    mode: sm, phase: 'start', currentPlayer: 'A', round: 1,
                    playerA: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 3000 },
                    playerB: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 3000 },
                    firstAttacker: null, secondAttacker: null,
                    weaponDrawCount: 0, weaponDrawPlayer: 'A',
                    selectedCardUid: null, soundEnabled: ss, voiceEnabled: ss,
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
        console.log('[ rematch ] 开始新一局');
        var ss = game.soundEnabled;
        console.log('[ rematch ] isOnlineMode:', isOnlineMode, 'Multiplayer.isConnected():', Multiplayer.isConnected());
        vsAnimationShown = false;
        console.log('[ rematch ] 重置 vsAnimationShown = false');
        game = {
            mode: 'online', phase: 'start', currentPlayer: 'A', round: 1,
            playerA: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 3000 },
            playerB: { char: null, hp: 0, maxHp: 0, library: [], roundCards: [], gold: 3000 },
            firstAttacker: null, secondAttacker: null,
            weaponDrawCount: 0, weaponDrawPlayer: 'A',
            selectedCardUid: null, soundEnabled: ss, voiceEnabled: ss,
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
        $('char-result').classList.add('hidden');
        $('btn-spin-char').disabled = false;
        hideModal();
        console.log('[ rematch ] 调用 startCharacterSelect()');
        startCharacterSelect();
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
                if (isOnlineMode && !canIOperate(pid)) return;
                playSound('click'); showAttackCardSelect();
                notifyPeer('continue-attack', { currentAttackIndex: game.currentAttackIndex, attackReduction: game.attackReduction, bonusAttacks: game.bonusAttacks, isCounterPhase: game.isCounterPhase });
            });
            $('btn-' + p + '-end-attack').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.phaseAttacker !== pid) return;
                if (isOnlineMode && !canIOperate(pid)) return;
                playSound('click'); afterAttackPhaseEnds();
                notifyPeer('end-attack', { currentAttackIndex: game.currentAttackIndex, attackReduction: game.attackReduction, bonusAttacks: game.bonusAttacks, isCounterPhase: game.isCounterPhase });
            });
        });
    }

    function initSellBuy() {
        ['a', 'b'].forEach(function (p) {
            $('btn-' + p + '-sell').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.currentPlayer !== pid) return;
                if (isOnlineMode && !canIOperate(pid)) return;
                playSound('click');
                showSellModal(pid);
            });
            $('btn-' + p + '-buy').addEventListener('click', function () {
                var pid = p === 'a' ? 'A' : 'B';
                if (game.currentPlayer !== pid) return;
                if (isOnlineMode && !canIOperate(pid)) return;
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
        });

        $('btn-create-room').addEventListener('click', handleCreateRoom);
        $('btn-join-room').addEventListener('click', handleJoinRoom);
        $('btn-copy-room').addEventListener('click', handleCopyRoomId);
        $('btn-start-online').addEventListener('click', handleStartOnlineGame);
        $('btn-leave-lobby').addEventListener('click', handleLeaveLobby);
        $('btn-leave-join').addEventListener('click', handleLeaveLobby);
        $('btn-disconnect-ok').addEventListener('click', function () {
            $('disconnect-notice').classList.add('hidden');
            Multiplayer.cleanup();
            isOnlineMode = false;
            initLobby();
            showScreen('screen-start');
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
                $('join-status').textContent = '✅ 已连接到房主';
                $('btn-join-room').classList.add('hidden');
                lobbyReady = true;
            }
        });

        Multiplayer.on('disconnected', function () {
            updateOnlineStatusBar();
            showDisconnectNotice('对方已断开连接');
        });

        Multiplayer.on('connection-error', function () {
            showDisconnectNotice('连接发生错误');
        });

        Multiplayer.on('peer-left', function (data) {
            updateOnlineStatusBar();
            showDisconnectNotice('对方已离开游戏');
        });

        Multiplayer.on('peer-timeout', function () {
            updateOnlineStatusBar();
            showDisconnectNotice('对方已掉线（无心跳响应）');
            Multiplayer.cleanup();
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
        lobbyReady = false;
        $('room-created-area').classList.add('hidden');
        $('peer-info').classList.add('hidden');
        $('join-peer-info').classList.add('hidden');
        $('btn-create-room').classList.remove('hidden');
        $('btn-start-online').classList.add('hidden');
        $('btn-join-room').classList.remove('hidden');
        $('create-status').textContent = '等待中...';
        $('join-status').textContent = '';
        $('input-room-id').value = 'CG_';
        document.querySelectorAll('.btn-tab').forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.lobby-panel').forEach(function (p) { p.classList.remove('active'); });
        $('tab-create').classList.add('active');
        $('panel-create').classList.add('active');
    }

    function handleCreateRoom() {
        var btn = $('btn-create-room');
        btn.disabled = true; btn.textContent = '创建中...';
        $('create-status').textContent = '⏳ 正在创建房间...';

        Multiplayer.createRoom().then(function (id) {
            btn.style.display = 'none';
            $('room-created-area').classList.remove('hidden');
            $('my-room-id').textContent = id;
            $('create-status').textContent = '✅ 房间已创建，等待对方加入...';
            playSound('bonus');
        }).catch(function (err) {
            btn.disabled = false; btn.textContent = '创建房间';
            $('create-status').textContent = '❌ ' + err.message;
            playSound('lose');
        });
    }

    function handleJoinRoom() {
        var id = $('input-room-id').value.trim();
        if (!id) { $('join-status').textContent = '❌ 请输入房间号'; return; }
        var btn = $('btn-join-room');
        btn.disabled = true; btn.textContent = '连接中...';
        $('join-status').textContent = '⏳ 正在连接...';

        Multiplayer.joinRoom(id).then(function () {
            $('join-status').textContent = '✅ 连接成功！';
            playSound('bonus');
        }).catch(function (err) {
            btn.disabled = false; btn.textContent = '加入房间';
            $('join-status').textContent = '❌ ' + err.message;
            playSound('lose');
        });
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
        $('disconnect-reason').textContent = reason || '对方已离开游戏';
        $('disconnect-notice').classList.remove('hidden');
        playSound('lose');
    }

    function canIOperate(pid) {
        if (!isOnlineMode) return true;
        return Multiplayer.amIPlayer(pid);
    }

    function notifyPeer(action, payload) {
        if (!isOnlineMode || !Multiplayer.isConnected()) return;
        Multiplayer.sendGameAction(action, payload);
    }

    function handlePeerAction(action, payload, from) {
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
                }
                break;
            case 'battle-init':
                applyBattleInit(payload);
                break;
            case 'char-spin-result':
                applyCharSpinResult(payload.charId);
                break;
            case 'char-confirm':
                if (from === 'A') {
                    game.currentPlayer = 'B';
                    $('char-result').classList.add('hidden');
                    $('btn-spin-char').disabled = false;
                    var ac2 = CHARACTERS.filter(function (c) { return game.usedCharIds.indexOf(c.id) === -1; });
                    var ci2 = ac2.map(function (c) { return { name: c.name, id: c.id, icon: c.emoji }; });
                    wheelAngle = 0; drawWheel('character-wheel', ci2);
                    updateCharSelectUI();
                } else {
                    showVSAnimation();
                }
                break;
            case 'weapon-spin':
                applyWeaponSpinResult(payload.weapon, payload.player);
                break;
            case 'dice-roll':
                applyDiceResult(payload.value);
                break;
            case 'card-selected':
                applyCardSelected(payload.uid, payload.player);
                break;
            case 'skip-defend':
                handleSkipDefendRemote();
                break;
            case 'continue-attack':
                if (payload && payload.currentAttackIndex !== undefined) { game.currentAttackIndex = payload.currentAttackIndex; }
                if (payload && payload.attackReduction !== undefined) { game.attackReduction = payload.attackReduction; }
                if (payload && payload.bonusAttacks !== undefined) { game.bonusAttacks = payload.bonusAttacks; }
                if (payload && payload.isCounterPhase !== undefined) { game.isCounterPhase = payload.isCounterPhase; }
                updateAttackProgress();
                showAttackCardSelect();
                break;
            case 'end-attack':
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
    }

    function applyCharSpinResult(charId) {
        var ch = CHARACTERS.find(function (c) { return c.id === charId; });
        if (!ch) return;
        var targetPlayer = game.currentPlayer === 'A' ? game.playerA : game.playerB;
        targetPlayer.char = ch; targetPlayer.hp = ch.hp; targetPlayer.maxHp = ch.maxHp;
        game.usedCharIds.push(ch.id);
        $('char-info-display').innerHTML = '<div class="char-emoji">' + ch.emoji + '</div><div class="char-name">' + ch.name + '</div><div class="char-stat">血量：' + ch.hp + '点（' + (ch.hp * 10) + '伤害值）</div><div class="char-ability">特殊能力：' + generateAbilityDesc(ch) + '</div>';
        $('char-result').classList.remove('hidden');
        playSound('result');
        updateCharSelectUI();
        setTimeout(function () { autoConfirmChar(); }, 2000);
    }

    function applyWeaponSpinResult(weaponData, pid) {
        console.log('[ Weapon ] 收到 weapon-spin 消息, weaponData:', weaponData, 'pid:', pid);
        var wp = WEAPONS.find(function (w) { return w.id === weaponData.id; });
        if (!wp) {
            console.error('[ Weapon ] ❌ 找不到武器 id:', weaponData.id);
            return;
        }
        var drawn = Object.assign({}, wp); drawn.uid = weaponData.uid;
        var player = getPlayer(pid);
        console.log('[ Weapon ] 添加武器到玩家', pid, ', uid:', drawn.uid, 'name:', wp.name, ', 当前库大小:', player.library.length);
        player.roundCards.push(drawn); player.library.push(drawn);
        game.weaponDrawCount++;
        console.log('[ Weapon ] 添加后库大小:', player.library.length, 'weaponDrawCount:', game.weaponDrawCount);
        updateLibraryDisplay([drawn.uid]);
        renderWeaponDrawnCard(drawn);
        advanceWeaponDrawPhase();
    }

    function applyWeaponDrawComplete(data) {
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
        var diceEl = $('dice-face');
        diceEl.textContent = value;
        var isOdd = value % 2 === 1;
        game.firstAttacker = isOdd ? 'A' : 'B';
        game.secondAttacker = isOdd ? 'B' : 'A';
        var fl = playerLabel(game.firstAttacker), fn = getPlayer(game.firstAttacker).char.name;
        $('dice-result').innerHTML = '点数：<strong style="font-size:24px;">' + value + '</strong>（' + (isOdd ? '单数' : '双数') + '）<br><span style="color:var(--gold-light);font-size:18px;">' + fl + '（' + fn + '）先攻！</span>';
        $('dice-result').classList.remove('hidden');
        $('btn-roll-dice').disabled = true;
        playSound('dice');
        setTimeout(function () {
            var diceArea = $('dice-area');
            if (diceArea) {
                diceArea.classList.add('hidden');
                startAttackPhase(false);
            } else {
                startAttackPhase(false);
            }
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

        speak(payload.success ? '对方合成成功' : '对方合成失败');
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
        game.weaponDrawCount = 0; game.weaponDrawPlayer = 'A';
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

    // ========== 卡牌合成系统 ==========

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
                    '<span class="card-icon">' + card.icon + '</span>' +
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
                speak('合成成功！获得' + newCard.name);
            } else {
                document.getElementById('synthesis-modal').classList.add('hidden');
                showSynthesisResult(false, null, pid, cardA, cardB);
                speak('合成失败，原卡牌已粉碎');
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
            enhancedCard.desc = '合成强化的' + bestCandidate.name;
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
                '<div style="font-family:\'Ma Shan Zheng\',cursive;font-size:30px;color:#4ade80;margin-bottom:6px;letter-spacing:4px;text-shadow:0 2px 12px rgba(74,222,128,0.6);">🎉 合成成功！</div>' +
                '<div style="height:8px;"></div>' +
                '<div class="weapon-card rarity-' + card.rarity + '" style="margin:16px auto;transform:scale(1.3);pointer-events:none;min-width:180px;">' +
                '<span class="card-type ' + card.type + '">' + typeLabel + '</span>' +
                '<span class="card-icon" style="font-size:28px;">' + card.icon + '</span>' +
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
                    '<div style="color:var(--text-light);font-size:13px;line-height:1.6;">' + cardA.icon + ' ' + cardA.name + '(' + RARITY_NAMES[cardA.rarity] + ')<br>' + cardB.icon + ' ' + cardB.name + '(' + RARITY_NAMES[cardB.rarity] + ')' + '</div>' +
                    '</div>';
            }
            resultHtml = '<div style="text-align:center;padding:20px;">' +
                '<div style="font-size:56px;margin-bottom:12px;line-height:1;">💔</div>' +
                '<div style="font-family:\'Ma Shan Zheng\',cursive;font-size:30px;color:#f87171;margin-bottom:6px;letter-spacing:4px;text-shadow:0 2px 12px rgba(248,113,113,0.6);">合成失败</div>' +
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
                '<span class="card-icon">' + card.icon + '</span>' +
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
                card1.icon + card1.name + '(' + RARITY_NAMES[card1.rarity] + ') / ' + 
                card2.icon + card2.name + '(' + RARITY_NAMES[card2.rarity] + ')' + '</div>' +
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
