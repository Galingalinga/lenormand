import { GoogleGenerativeAI } from '@google/generative-ai';
import { Card } from '../data/cards';

// 初始化 Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_KEY_BACKUP = import.meta.env.VITE_GEMINI_API_KEY_BACKUP;

if (!API_KEY) {
    console.error('請在 .env 檔案中設定 VITE_GEMINI_API_KEY');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const genAIBackup = API_KEY_BACKUP ? new GoogleGenerativeAI(API_KEY_BACKUP) : null;

/**
 * 使用 Gemini AI 分析兩張雷諾曼卡牌
 * 支援備用金鑰自動切換
 */
export async function analyzeCards(
    question: string,
    card1: Card,
    card2: Card
): Promise<string> {
    if (!genAI) {
        throw new Error('Gemini API 未正確初始化，請檢查 API 金鑰設定');
    }

    const prompt = `你是一位專業且溫柔的雷諾曼卡牌解讀師。請用繁體中文（台灣用語）為以下問題提供解讀。

【重要規則】
1. 在雷諾曼解讀中，第一張牌常被視為「名詞/主題」，第二張牌則是「形容詞/動詞」，用來描述或修飾第一張牌
2. 語氣要溫柔但務實，不做醫療、法律、投資的確定性判斷
3. 總字數控制在 350-650 字之間
4. 要明確提到兩張牌的互動關係（推進/阻礙/補充/反轉等）

【使用者問題】
${question}

【抽到的卡牌】
第一張（主題/名詞）：${card1.zhName} (${card1.enName})
第二張（描述/形容詞）：${card2.zhName} (${card2.enName})

【請按以下結構回答】

**問題重述**
用更清晰的句子重述使用者的問題

**第一張牌：${card1.zhName}**
結合「位置：第一張（主題）」來解讀這張牌的意涵

**第二張牌：${card2.zhName}**
結合「位置：第二張（描述）」來解讀這張牌如何修飾或影響第一張牌

**組合解讀**
- 重點：兩張牌組合起來的核心訊息
- 盲點：可能需要注意的地方
- 建議行動：具體可行的建議

**結語**
一句溫柔的鼓勵或提醒`;

    // 嘗試使用主金鑰
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        if (!text) {
            throw new Error('AI 未返回有效的解析結果');
        }

        return text;
    } catch (error: any) {
        console.error('主金鑰 AI 解析錯誤:', error);

        // 檢查是否為配額錯誤 (429) 且有備用金鑰
        const isQuotaError = error?.message?.includes('429') ||
            error?.status === 429 ||
            error?.message?.includes('quota') ||
            error?.message?.includes('RESOURCE_EXHAUSTED');

        if (isQuotaError && genAIBackup) {
            console.log('主金鑰額度已用完，切換至備用金鑰...');

            try {
                const backupModel = genAIBackup.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
                const backupResult = await backupModel.generateContent(prompt);
                const backupResponse = backupResult.response;
                const backupText = backupResponse.text();

                if (!backupText) {
                    throw new Error('AI 未返回有效的解析結果');
                }

                return backupText;
            } catch (backupError) {
                console.error('備用金鑰 AI 解析錯誤:', backupError);
                throw new Error('主金鑰和備用金鑰都無法使用，請稍後再試');
            }
        }

        // 如果不是配額錯誤，或沒有備用金鑰，直接拋出錯誤
        throw new Error('AI 解析失敗，請稍後再試');
    }
}
