import React from 'react';
import './AnalysisResult.css';

interface AnalysisResultProps {
    analysis: string | null;
    loading: boolean;
    error: string | null;
    onRetry: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
    analysis,
    loading,
    error,
    onRetry,
}) => {
    if (loading) {
        return (
            <div className="analysis-container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>AI 解析中...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="analysis-container">
                <div className="error-state">
                    <p className="error-message">❌ {error}</p>
                    <button className="retry-button" onClick={onRetry}>
                        重試
                    </button>
                </div>
            </div>
        );
    }

    if (!analysis) {
        return null;
    }

    return (
        <div className="analysis-container" id="analysis-result">
            <h2 className="analysis-title">AI 解析</h2>
            <div className="analysis-content">
                {analysis.split('\n').map((line, index) => {
                    // 處理粗體標題
                    if (line.startsWith('**') && line.endsWith('**')) {
                        return (
                            <h3 key={index} className="analysis-heading">
                                {line.replace(/\*\*/g, '')}
                            </h3>
                        );
                    }
                    // 處理列表項目
                    if (line.trim().startsWith('-')) {
                        return (
                            <p key={index} className="analysis-list-item">
                                {line}
                            </p>
                        );
                    }
                    // 一般段落
                    if (line.trim()) {
                        return (
                            <p key={index} className="analysis-paragraph">
                                {line}
                            </p>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};
