import { Card } from '../data/cards';

const API_ENDPOINT = import.meta.env.PROD
    ? '/api/analyze'  // Vercel 部署後的路徑
    : 'http://localhost:3000/api/analyze'; // 本地測試

export async function analyzeCards(
    question: string,
    card1: Card,
    card2: Card
): Promise<string> {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question,
                card1: {
                    zhName: card1.zhName,
                    enName: card1.enName,
                },
                card2: {
                    zhName: card2.zhName,
                    enName: card2.enName,
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '解析失敗');
        }

        const data = await response.json();
        return data.analysis;

    } catch (error) {
        console.error('API Error:', error);
        throw new Error(
            error instanceof Error
                ? error.message
                : '無法連接到解析服務，請稍後再試'
        );
    }
}
