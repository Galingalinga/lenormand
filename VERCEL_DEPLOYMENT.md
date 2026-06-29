# Vercel 部署指南

## 步驟 1：安裝 Vercel CLI

```bash
npm install -g vercel
```

## 步驟 2：登入 Vercel

```bash
vercel login
```

## 步驟 3：設定環境變數

在 Vercel 專案設定中加入：

```
GEMINI_API_KEY=你的_Gemini_API_Key
```

**重要**：不要把 API Key 寫在程式碼裡！

## 步驟 4：部署

```bash
vercel
```

第一次部署會問一些問題：
- Set up and deploy? → Yes
- Which scope? → 選擇你的帳號
- Link to existing project? → No
- What's your project's name? → lenormand（或你想要的名字）
- In which directory is your code located? → ./
- Want to override the settings? → No

## 步驟 5：設定環境變數（在 Vercel Dashboard）

1. 到 https://vercel.com/dashboard
2. 選擇你的專案
3. Settings → Environment Variables
4. 新增：
   - Name: `GEMINI_API_KEY`
   - Value: 你的 Gemini API Key
   - Environment: Production, Preview, Development（全選）
5. Save

## 步驟 6：重新部署

```bash
vercel --prod
```

## 步驟 7：更新 CORS（部署後）

編輯 `api/analyze.js`，將：
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
```

改成：
```javascript
res.setHeader('Access-Control-Allow-Origin', 'https://你的網域.vercel.app');
```

## 測試

部署完成後，你的 API 端點會是：
```
https://你的專案名稱.vercel.app/api/analyze
```

## 本地測試

```bash
vercel dev
```

然後訪問 http://localhost:3000

## 注意事項

- ✅ API Key 完全隱藏在後端
- ✅ 前端程式碼看不到 API Key
- ✅ 免費額度：每月 100GB 流量
- ✅ 自動 HTTPS
- ✅ 全球 CDN
