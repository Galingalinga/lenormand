import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

export const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(true); // 預設播放
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // 設定音量
        audio.volume = 0.3;
        audio.loop = true;

        // 嘗試自動播放
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // 自動播放失敗（瀏覽器政策），設定為暫停狀態
                setIsPlaying(false);
            });
        }
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(err => {
                console.error('播放失敗:', err);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-player">
            <button
                className={`music-button ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
                aria-label={isPlaying ? '暫停音樂' : '播放音樂'}
            >
                <svg
                    className="music-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    {isPlaying ? (
                        // 音符圖標（播放中）
                        <>
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            <circle cx="10" cy="17" r="1.5" />
                        </>
                    ) : (
                        // 靜音圖標（暫停中）
                        <>
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" opacity="0.5" />
                            <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
                        </>
                    )}
                </svg>
            </button>

            <div className="music-credit">
                "Evening" Kevin MacLeod (incompetech.com)<br />
                Licensed under Creative Commons: By Attribution 4.0 License<br />
                <a
                    href="http://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    http://creativecommons.org/licenses/by/4.0/
                </a>
            </div>

            <audio ref={audioRef} src="musics/Evening.mp3" />
        </div>
    );
};
