import React, { useState } from 'react';
import { copyToClipboard } from '../utils/exportUtils';
import './ActionButtons.css';

interface ActionButtonsProps {
    onReset: () => void;
    analysisText: string | null;
    disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    onReset,
    analysisText,
    disabled = false,
}) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = async () => {
        if (!analysisText) return;

        const success = await copyToClipboard(analysisText);
        if (success) {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    return (
        <div className="action-buttons-container">
            <button
                className="action-button reset-button"
                onClick={onReset}
                disabled={disabled}
            >
                🔄 重新抽牌
            </button>

            <button
                className="action-button copy-button"
                onClick={handleCopy}
                disabled={disabled || !analysisText}
            >
                {copySuccess ? '✓ 已複製' : '📋 複製解析'}
            </button>
        </div>
    );
};
