import React, { useState } from 'react';
import './QuestionInput.css';

interface QuestionInputProps {
    onStart: (question: string) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ onStart }) => {
    const [question, setQuestion] = useState('');
    const maxLength = 60;
    const warningThreshold = 50; // 超過 50 字時顯示提示

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            setQuestion(value);
        }
    };

    const handleStart = () => {
        // 使用使用者輸入的問題，若無則使用預設問題
        const finalQuestion = question.trim() || '請為我指引方向';
        onStart(finalQuestion);
    };

    const showWarning = question.length >= warningThreshold;

    return (
        <div className="question-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                <h1 className="nav-title">EMBROIDERED-STYLE LENORMAND CARDS</h1>
            </nav>

            {/* Main Content */}
            <div className="main-content">
                <p className="intro-text fade-in">
                    36張刺繡風格雷諾曼牌卡 X AI牌義解析<br />
                    以一針一線的縝密思緒，縫製出專屬於你的指引。
                </p>

                {/* Question Input */}
                <div className="question-input-wrapper">
                    <input
                        type="text"
                        className="question-input"
                        placeholder="此刻，你想釐清的是什麼？"
                        value={question}
                        onChange={handleQuestionChange}
                        maxLength={maxLength}
                    />
                    {showWarning && (
                        <p className="input-hint">試著將問題精簡一些，會更容易聚焦喔</p>
                    )}
                </div>

                <button className="start-button" onClick={handleStart}>
                    免費線上抽牌
                </button>

                {/* Sample Cards Display */}
                <div className="sample-cards">
                    <div className="sample-card">
                        <img src="statics/9_Bouquet.png" alt="Bouquet" />
                    </div>
                    <div className="sample-card">
                        <img src="statics/17_Stork.png" alt="Stork" />
                    </div>
                </div>
            </div>
        </div>
    );
};
