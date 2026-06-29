import React, { useState, useEffect } from 'react';
import './LikeButton.css';

export const LikeButton: React.FC = () => {
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        const alreadyLiked = localStorage.getItem('lenormand_liked') === 'true';
        setLiked(alreadyLiked);
    }, []);

    const handleLike = () => {
        if (liked) return;

        setLiked(true);
        localStorage.setItem('lenormand_liked', 'true');
    };

    return (
        <div className="like-button-container">
            <button
                className={`like-button ${liked ? 'liked' : ''}`}
                onClick={handleLike}
                disabled={liked}
                aria-label={liked ? '已喜歡' : '喜歡'}
            >
                <svg className="heart-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="like-text">{liked ? '已喜歡' : '喜歡'}</span>
            </button>
        </div>
    );
};
