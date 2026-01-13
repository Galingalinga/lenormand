# AI 雷諾曼抽卡系統

一個美觀、響應式的雷諾曼卡牌抽取與 AI 解析網站。使用 React + TypeScript + Vite 建立，整合 Google Gemini AI 提供專業的卡牌解讀。

## ✨ 功能特色

- 🎴 完整的 36 張雷諾曼卡牌系統
- 🎬 流暢的洗牌與翻牌動畫
- 🤖 AI 智能解析（使用 Gemini 2.0 Flash Lite）
- 📱 響應式設計，支援各種裝置
- 💾 支援複製解析與下載結果為圖片
- 🎨 乾淨美觀的 UI 設計

## 🚀 快速開始

### 前置需求

- Node.js 18+ 
- npm 或 yarn
- Gemini API 金鑰（從 [Google AI Studio](https://aistudio.google.com/app/apikey) 取得）

### 安裝步驟

1. 安裝依賴套件：
```bash
npm install
```

2. 設定環境變數：
```bash
# 複製範本檔案
cp .env.example .env

# 編輯 .env 檔案，填入你的 Gemini API 金鑰
# VITE_GEMINI_API_KEY=your_api_key_here
```

3. 啟動開發伺服器：
```bash
npm run dev
```

4. 在瀏覽器開啟顯示的網址（通常是 http://localhost:5173）

### 建構生產版本

```bash
npm run build
```

建構完成的檔案會在 `dist` 資料夾中。

## 🎯 使用方式

1. **輸入問題**：在首頁輸入你想詢問的問題
2. **洗牌**：點擊「開始洗牌」，觀看洗牌動畫
3. **抽牌**：洗牌完成後點擊「抽牌」，系統會隨機抽取 2 張卡牌
4. **查看解析**：AI 會自動分析卡牌組合並提供解讀
5. **操作結果**：
   - 複製解析文字
   - 下載結果為圖片
   - 重新抽牌

## 🛠 技術棧

- **前端框架**：React 18 + TypeScript
- **建構工具**：Vite 6
- **AI 服務**：Google Gemini 2.0 Flash Lite
- **樣式**：純 CSS（無框架）
- **字體**：Google Fonts - Noto Sans TC
- **圖片匯出**：html-to-image

## 📁 專案結構

```
lenormand/
├── src/
│   ├── components/      # React 元件
│   ├── data/           # 卡牌資料
│   ├── services/       # AI 服務
│   ├── utils/          # 工具函式
│   ├── App.tsx         # 主應用程式
│   └── main.tsx        # 入口點
├── statics/            # 卡牌圖片資源
├── index.html          # HTML 模板
└── package.json        # 專案配置
```

## 📝 授權

本專案僅供個人學習與使用。

## 🙏 致謝

- 卡牌圖片來源：雷諾曼傳統牌卡
- AI 技術：Google Gemini
