import { GoogleGenerativeAI } from '@google/generative-ai';

// Vercel Serverless Function
export default async function handler(req, res) {
    // 只允許 POST 請求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CORS headers
    const allowedOrigins = [
        'https://galing-lenormand.vercel.app',
        'http://localhost:5173',
        'http://localhost:3000'
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'https://galing-lenormand.vercel.app');
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 處理 OPTIONS 請求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { question, card1, card2 } = req.body;

        // 驗證輸入
        if (!question || !card1 || !card2) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 從環境變數取得 API Key
        const apiKey = process.env.GEMINI_API_KEY;
        const apiKeyBackup = process.env.GEMINI_API_KEY_BACKUP;

        if (!apiKey) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        const prompt = `你是一位專業且溫柔的雷諾曼卡牌解讀師。請用繁體中文（台灣用語）為以下問題提供解讀。

【重要規則】
1. 在雷諾曼解讀中，第一張牌常被視為「名詞/主題」，第二張牌則是「形容詞/動詞」，用來描述或修飾第一張牌
2. 語氣要溫柔且描述狀態，不給預言或確定性判斷
3. 避免使用「你將會」「一定會發生」等預測性語言
4. 多使用「這可能是在提醒」「你正在經歷的是」「這似乎反映了」等溫和表達
5. 不做醫療、法律、投資的確定性判斷
6. 總字數控制在 250-400 字之間
7. 要明確提到兩張牌的互動關係（推進/阻礙/補充/反轉等）
8. 必須使用繁體中文輸出，絕對不可使用簡體中文

【使用者問題】
${question}

【抽到的卡牌】
第一張（主題/名詞）：${card1.zhName} (${card1.enName})
第二張（描述/形容詞）：${card2.zhName} (${card2.enName})

【輸出格式要求 - 極為重要】
- 僅輸出純文字內容，像一篇書頁短文
- 絕對不可使用任何 Markdown 符號（###、**、-、1.、2. 等）
- 不可出現教學式、說明式的語氣
- 文字需自然分段，每段之間空一行
- 用自然的敘述方式呈現解讀內容
- 必須使用繁體中文（台灣用語），例如：軟體、網路、資訊

【內容結構】
第一段：用溫柔的方式重述問題，並帶出第一張牌的意涵
第二段：描述第二張牌如何修飾或影響第一張牌
第三段：兩張牌組合起來的核心訊息與提醒
第四段：溫柔的結語與鼓勵

請直接開始解讀，不要有任何標題或符號。`;

        const models = ['gemini-3.1-flash-lite', 'gemini-2.5-flash-lite', 'gemini-3.1-flash'];

        const generateWithFallback = async (key) => {
            const genAI = new GoogleGenerativeAI(key);
            let lastError = null;

            for (const modelName of models) {
                try {
                    console.log(`嘗試呼叫模型: ${modelName}`);
                    const model = genAI.getGenerativeModel({ model: modelName });
                    const result = await model.generateContent(prompt);
                    const text = result.response.text();
                    if (text) {
                        console.log(`使用模型 ${modelName} 成功獲得解析！`);
                        return text;
                    }
                } catch (err) {
                    console.warn(`模型 ${modelName} 呼叫失敗，將嘗試下一個... 錯誤原因:`, err.message);
                    lastError = err;
                }
            }
            throw lastError || new Error('所有備援模型皆不可用');
        };

        let resultText = '';
        try {
            console.log('嘗試使用主金鑰進行解析...');
            resultText = await generateWithFallback(apiKey);
        } catch (primaryErr) {
            console.error('主金鑰解析失敗，詳細原因:', primaryErr);
            if (apiKeyBackup) {
                console.log('正在切換至備用金鑰...');
                try {
                    resultText = await generateWithFallback(apiKeyBackup);
                } catch (backupErr) {
                    console.error('備用金鑰解析失敗，詳細原因:', backupErr);
                    throw new Error('主金鑰和備用金鑰皆無法提供服務，請稍後再試。');
                }
            } else {
                throw new Error('主金鑰解析失敗，且未設定備用金鑰。');
            }
        }

        return res.status(200).json({ analysis: resultText });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: error.message || '解析失敗，請稍後再試'
        });
    }
}
