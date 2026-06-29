import React, { useEffect, useState } from 'react';
import { Card } from '../data/cards';
import './CardDisplay.css';

interface CardDisplayProps {
    cards: Card[];
}

export const CardDisplay: React.FC<CardDisplayProps> = ({ cards }) => {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        // 短暫延遲後開始翻牌動畫
        const timer = setTimeout(() => {
            setFlipped(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="card-display-container">
            <h2 className="cards-title">你抽到的卡牌</h2>
            <div className="cards-grid">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`card-wrapper ${flipped ? 'flipped' : ''}`}
                        style={{ animationDelay: `${index * 0.3}s` }}
                    >
                        <div className="card-inner">
                            {/* 牌背 */}
                            <div className="card-face card-back-face">
                                <img src="statics/back.png" alt="牌背" />
                            </div>
                            {/* 牌面 */}
                            <div className="card-face card-front-face">
                                <img src={card.imagePath} alt={card.zhName} />
                            </div>
                        </div>
                        {/* 卡牌資訊顯示在卡片下方 */}
                        <div className="card-info">
                            <p className="card-name-zh">{card.zhName}</p>
                            <p className="card-name-en">{card.enName}</p>
                            <p className="card-position">第{index + 1}張</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
