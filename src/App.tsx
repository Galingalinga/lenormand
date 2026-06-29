import { useState } from 'react';
import { QuestionInput } from './components/QuestionInput';
import { ShuffleAnimation } from './components/ShuffleAnimation';
import { CardDisplay } from './components/CardDisplay';
import { AnalysisResult } from './components/AnalysisResult';
import { ActionButtons } from './components/ActionButtons';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { ResultPage } from './components/ResultPage';
import { LENORMAND_CARDS, Card } from './data/cards';
import { shuffleDeck, drawCards } from './utils/cardUtils';
import { analyzeCards } from './services/gemini';
import { rateLimiter, getDeviceFingerprint } from './utils/rateLimiter';
import './App.css';

type Phase = 'input' | 'shuffle' | 'result';

function App() {
    const [phase, setPhase] = useState<Phase>('input');
    const [question, setQuestion] = useState('');
    const [shuffledDeck, setShuffledDeck] = useState<Card[]>([]);
    const [drawnCards, setDrawnCards] = useState<Card[]>([]);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 開始洗牌並準備抽牌
    const handleStart = (userQuestion: string) => {
        // 檢查速率限制（防止濫用）
        const deviceId = getDeviceFingerprint();
        if (!rateLimiter.canProceed(deviceId)) {
            const remainingMinutes = rateLimiter.getRemainingTime(deviceId);
            alert(`為了確保服務品質，請稍後再試。\n約 ${remainingMinutes} 分鐘後可再次使用。`);
            return;
        }

        setQuestion(userQuestion);
        
        // 洗牌並記錄
        const shuffled = shuffleDeck([...LENORMAND_CARDS]);
        setShuffledDeck(shuffled);

        // 進入洗牌階段
        setPhase('shuffle');
    };

    // 洗牌動畫完成，直接自動抽牌與解析
    const handleShuffleComplete = () => {
        // 自動從牌堆抽 2 張牌
        const { drawn } = drawCards(shuffledDeck, 2);
        setDrawnCards(drawn);
        setPhase('result');

        // 同時開始 AI 解析
        performAnalysis(question, drawn);
    };

    // AI 解析
    const performAnalysis = async (userQuestion: string, cards: Card[]) => {
        setLoading(true);
        setError(null);

        try {
            const result = await analyzeCards(userQuestion, cards[0], cards[1]);
            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : '解析失敗，請稍後再試');
        } finally {
            setLoading(false);
        }
    };

    // 重試 AI 解析
    const handleRetry = () => {
        performAnalysis(question, drawnCards);
    };

    // 重新開始
    const handleReset = () => {
        setPhase('input');
        setQuestion('');
        setShuffledDeck([]);
        setDrawnCards([]);
        setAnalysis(null);
        setError(null);
        setLoading(false);
    };

    return (
        <div className="app">
            <AnimatedBackground />

            {phase === 'input' && (
                <QuestionInput onStart={handleStart} />
            )}

            {phase === 'shuffle' && (
                <ShuffleAnimation onComplete={handleShuffleComplete} />
            )}

            {phase === 'result' && (
                <ResultPage>
                    <CardDisplay cards={drawnCards} />
                    <AnalysisResult
                        analysis={analysis}
                        loading={loading}
                        error={error}
                        onRetry={handleRetry}
                    />
                    {!loading && !error && (
                        <ActionButtons
                            onReset={handleReset}
                            analysisText={analysis}
                        />
                    )}
                </ResultPage>
            )}

            <MusicPlayer />
            <Footer />
        </div>
    );
}

export default App;
