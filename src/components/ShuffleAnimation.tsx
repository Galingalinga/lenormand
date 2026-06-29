import React, { useEffect, useState } from 'react';
import './ShuffleAnimation.css';

interface ShuffleAnimationProps {
    onComplete: () => void;
}

export const ShuffleAnimation: React.FC<ShuffleAnimationProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'shuffling' | 'ready'>('shuffling');

    useEffect(() => {
        // 洗牌階段：2.5秒
        const shuffleTimer = setTimeout(() => {
            setPhase('ready');
        }, 2500);

        return () => clearTimeout(shuffleTimer);
    }, []);

    useEffect(() => {
        if (phase === 'ready') {
            // 顯示「洗牌完成，準備選牌...」1秒後完成洗牌階段
            const readyTimer = setTimeout(() => {
                onComplete();
            }, 1000);

            return () => clearTimeout(readyTimer);
        }
    }, [phase, onComplete]);

    return (
        <div className="shuffle-container">
            {/* 牌疊 */}
            <div className={`card-deck ${phase === 'shuffling' ? 'shuffling' : ''}`}>
                {/* 多層牌背製造疊牌效果 */}
                <div className="card-back card-layer-1">
                    <img src="statics/back.png" alt="Card Back" />
                </div>
                <div className="card-back card-layer-2">
                    <img src="statics/back.png" alt="Card Back" />
                </div>
                <div className="card-back card-layer-3">
                    <img src="statics/back.png" alt="Card Back" />
                </div>
                <div className="card-back card-layer-4">
                    <img src="statics/back.png" alt="Card Back" />
                </div>
                <div className="card-back card-layer-5">
                    <img src="statics/back.png" alt="Card Back" />
                </div>
            </div>

            {/* 狀態文字 */}
            <p className="shuffle-status">
                {phase === 'shuffling' && '正在洗牌…'}
                {phase === 'ready' && '洗牌完成，準備選牌…'}
            </p>
        </div>
    );
};
