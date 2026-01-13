import React, { useEffect, useState } from 'react';
import './ShuffleAnimation.css';

interface ShuffleAnimationProps {
    onDraw: () => void;
}

export const ShuffleAnimation: React.FC<ShuffleAnimationProps> = ({ onDraw }) => {
    const [isShuffling, setIsShuffling] = useState(true);
    const [showDrawButton, setShowDrawButton] = useState(false);

    useEffect(() => {
        // 洗牌動畫持續 2.5 秒
        const timer = setTimeout(() => {
            setIsShuffling(false);
            setShowDrawButton(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="shuffle-container">
            <div className={`card-deck ${isShuffling ? 'shuffling' : ''}`}>
                {/* 顯示多層牌背營造牌堆效果 */}
                {[...Array(5)].map((_, index) => (
                    <img
                        key={index}
                        src="/statics/back.png"
                        alt="牌背"
                        className="card-back"
                        style={{
                            transform: `translateY(${index * -3}px) translateX(${index * 2}px) rotate(${index * 2}deg)`,
                            zIndex: 5 - index,
                        }}
                    />
                ))}
            </div>

            {isShuffling && (
                <p className="shuffle-text">洗牌中...</p>
            )}

            {showDrawButton && (
                <button className="draw-button fade-in" onClick={onDraw}>
                    抽牌
                </button>
            )}
        </div>
    );
};
