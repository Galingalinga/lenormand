import React from 'react';
import './ResultPage.css';

interface ResultPageProps {
    children: React.ReactNode;
}

export const ResultPage: React.FC<ResultPageProps> = ({ children }) => {
    return (
        <div className="result-page">
            {/* Navigation Bar */}
            <nav className="result-navbar">
                <h1 className="result-nav-title">EMBROIDERED-STYLE LENORMAND CARDS</h1>
            </nav>

            {/* Main Content */}
            <div className="result-content">
                {children}
            </div>
        </div>
    );
};
