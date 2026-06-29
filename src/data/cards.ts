// 雷諾曼卡牌介面定義
export interface Card {
    id: number;
    zhName: string;
    enName: string;
    imagePath: string;
}

// 36 張雷諾曼卡牌完整資料
export const LENORMAND_CARDS: Card[] = [
    { id: 1, zhName: '騎士', enName: 'Knight', imagePath: 'statics/1_Knight.png' },
    { id: 2, zhName: '幸運草', enName: 'Clover', imagePath: 'statics/2_Clover.png' },
    { id: 3, zhName: '船', enName: 'Ship', imagePath: 'statics/3_Ship.png' },
    { id: 4, zhName: '房屋', enName: 'House', imagePath: 'statics/4_House.png' },
    { id: 5, zhName: '樹', enName: 'Tree', imagePath: 'statics/5_Tree.png' },
    { id: 6, zhName: '雲', enName: 'Clouds', imagePath: 'statics/6_Clouds.png' },
    { id: 7, zhName: '蛇', enName: 'Snake', imagePath: 'statics/7_Snake.png' },
    { id: 8, zhName: '棺材', enName: 'Coffin', imagePath: 'statics/8_Coffin.png' },
    { id: 9, zhName: '花束', enName: 'Bouquet', imagePath: 'statics/9_Bouquet.png' },
    { id: 10, zhName: '鐮刀', enName: 'Scythe', imagePath: 'statics/10_Scythe.png' },
    { id: 11, zhName: '鞭子', enName: 'Whip', imagePath: 'statics/11_Whip.png' },
    { id: 12, zhName: '鳥', enName: 'Birds', imagePath: 'statics/12_Birds.png' },
    { id: 13, zhName: '孩子', enName: 'Child', imagePath: 'statics/13_Child.png' },
    { id: 14, zhName: '狐狸', enName: 'Fox', imagePath: 'statics/14_Fox.png' },
    { id: 15, zhName: '熊', enName: 'Bear', imagePath: 'statics/15_Bear.png' },
    { id: 16, zhName: '星星', enName: 'Stars', imagePath: 'statics/16_Stars.png' },
    { id: 17, zhName: '鸛', enName: 'Stork', imagePath: 'statics/17_Stork.png' },
    { id: 18, zhName: '狗', enName: 'Dog', imagePath: 'statics/18_Dog.png' },
    { id: 19, zhName: '塔', enName: 'Tower', imagePath: 'statics/19_Tower.png' },
    { id: 20, zhName: '花園', enName: 'Garden', imagePath: 'statics/20_Garden.png' },
    { id: 21, zhName: '山', enName: 'Mountain', imagePath: 'statics/21_Mountain.png' },
    { id: 22, zhName: '十字路口', enName: 'Crossroads', imagePath: 'statics/22_Crossroads.png' },
    { id: 23, zhName: '老鼠', enName: 'Mice', imagePath: 'statics/23_Mice.png' },
    { id: 24, zhName: '心', enName: 'Heart', imagePath: 'statics/24_Heart.png' },
    { id: 25, zhName: '戒指', enName: 'Ring', imagePath: 'statics/25_Ring.png' },
    { id: 26, zhName: '書', enName: 'Book', imagePath: 'statics/26_Book.png' },
    { id: 27, zhName: '信件', enName: 'Letter', imagePath: 'statics/27_Letter.png' },
    { id: 28, zhName: '男士', enName: 'Man', imagePath: 'statics/28_Man.png' },
    { id: 29, zhName: '女士', enName: 'Woman', imagePath: 'statics/29_Woman.png' },
    { id: 30, zhName: '百合', enName: 'Lily', imagePath: 'statics/30_Lily.png' },
    { id: 31, zhName: '太陽', enName: 'Sun', imagePath: 'statics/31_Sun.png' },
    { id: 32, zhName: '月亮', enName: 'Moon', imagePath: 'statics/32_Moon.png' },
    { id: 33, zhName: '鑰匙', enName: 'Key', imagePath: 'statics/33_Key.png' },
    { id: 34, zhName: '魚', enName: 'Fish', imagePath: 'statics/34_Fish.png' },
    { id: 35, zhName: '錨', enName: 'Anchor', imagePath: 'statics/35_Anchor.png' },
    { id: 36, zhName: '十字架', enName: 'Cross', imagePath: 'statics/36_Cross.png' },
];
