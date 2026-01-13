import React, { useState } from 'react';
import './QuestionInput.css';

interface QuestionInputProps {
    onStart: (question: string) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ onStart }) => {
    const [question, setQuestion] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim()) {
            onStart(question.trim());
        }
    };

    return (
        <div className="question-input-container">
            <h1 className="title">AI 雷諾曼抽卡</h1>
            <p className="subtitle">讓卡牌為你指引方向</p>

            <form onSubmit={handleSubmit} className="question-form">
                <textarea
                    className="question-textarea"
                    placeholder="請輸入你的問題...&#10;例如：我的事業發展如何？&#10;例如：這段感情會有結果嗎？"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={4}
                />
                <button
                    type="submit"
                    className="start-button"
                    disabled={!question.trim()}
                >
                    開始洗牌
                </button>
            </form>
        </div>
    );
};
