import { Card } from '../data/cards';

/**
 * Fisher-Yates 洗牌演算法
 * 將卡牌陣列隨機打亂
 */
export function shuffleDeck(cards: Card[]): Card[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * 從牌堆中抽取指定數量的卡牌（不重複）
 */
export function drawCards(deck: Card[], count: number): { drawn: Card[]; remaining: Card[] } {
    if (count > deck.length) {
        throw new Error('抽牌數量超過牌堆剩餘數量');
    }

    const drawn = deck.slice(0, count);
    const remaining = deck.slice(count);

    return { drawn, remaining };
}
