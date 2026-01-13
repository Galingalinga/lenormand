import React, { useState } from 'react';
import { QuestionInput } from './components/QuestionInput';
import { ShuffleAnimation } from './components/ShuffleAnimation';
import { CardDisplay } from './components/CardDisplay';
import { AnalysisResult } from './components/AnalysisResult';
import { ActionButtons } from './components/ActionButtons';
import { LENORMAND_CARDS, Card } from './data/cards';
import { shuffleDeck, drawCards } from './utils/cardUtils';
import { analyzeCards } from './services/gemini';
import './App.css';

type Phase = 'input' | 'shuffle' | 'draw' | 'result';

function App() {
    const [phase, setPhase] = useState<Phase>('input');
    const [question, setQuestion] = useState('');
    const [deck, setDeck] = useState<Card[]>([]);
    const [drawnCards, setDrawnCards] = useState<Card[]>([]);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 開始洗牌
    const handleStart = (userQuestion: string) => {
        setQuestion(userQuestion);
        const shuffled = shuffleDeck([...LENORMAND_CARDS]);
        setDeck(shuffled);
        setPhase('shuffle');
    };

    // 抽牌
    const handleDraw = () => {
        const { drawn } = drawCards(deck, 2);
        setDrawnCards(drawn);
        setPhase('draw');

        // 自動開始 AI 解析
        performAnalysis(drawn);
    };

    // AI 解析
    const performAnalysis = async (cards: Card[]) => {
        setLoading(true);
        setError(null);

        try {
            const result = await analyzeCards(question, cards[0], cards[1]);
            setAnalysis(result);
            setPhase('result');
        } catch (err) {
            setError(err instanceof Error ? err.message : '解析失敗，請稍後再試');
        } finally {
            setLoading(false);
        }
    };

    // 重試 AI 解析
    const handleRetry = () => {
        performAnalysis(drawnCards);
    };

    // 重新開始
    const handleReset = () => {
        setPhase('input');
        setQuestion('');
        setDeck([]);
        setDrawnCards([]);
        setAnalysis(null);
        setError(null);
        setLoading(false);
    };

    return (
        <div className="app">
            {phase === 'input' && (
                <QuestionInput onStart={handleStart} />
            )}

            {phase === 'shuffle' && (
                <ShuffleAnimation onDraw={handleDraw} />
            )}

            {(phase === 'draw' || phase === 'result') && (
                <>
                    <CardDisplay cards={drawnCards} />
                    <AnalysisResult
                        analysis={analysis}
                        loading={loading}
                        error={error}
                        onRetry={handleRetry}
                    />
                    {phase === 'result' && !loading && !error && (
                        <ActionButtons
                            onReset={handleReset}
                            analysisText={analysis}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
