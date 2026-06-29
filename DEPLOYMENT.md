# AI 雷諾曼抽卡系統 - 部署指南

本專案已升級為「安全後端連線架構」，並使用 Vercel Serverless Function 隱密保護您的 Gemini API 金鑰。請按照以下步驟進行部署：

## 部署到 Vercel (推薦，支援安全後端)

### 步驟 1：在 Vercel 設定環境變數（重要！）

為了保護您的 API 金鑰不被瀏覽器暴露，請在 Vercel 儀表板設定以下環境變數（無須加上 `VITE_` 前綴）：

1. 前往您的 Vercel 儀表板，選擇您的專案。
2. 進入 **Settings** → **Environment Variables**。
3. 新增以下兩個環境變數，並請將類型設為 **`Sensitive`**（加密儲存）：

   - **金鑰 1：主金鑰**
     - Key: `GEMINI_API_KEY`
     - Value: 您的主 Gemini API 金鑰
   - **金鑰 2：備用金鑰（可選）**
     - Key: `GEMINI_API_KEY_BACKUP`
     - Value: 您的備用 Gemini API 金鑰

---

### 步驟 2：推送程式碼

在本地執行以下指令推送更新：

```bash
# 加入所有變更
git add .

# 提交
git commit -m "feat: migrate Gemini calling to secure Vercel Serverless Function"

# 推送到 GitHub
git push origin main
```

---

### 步驟 3：等待部署完成

1. 推送後，Vercel 會自動開始拉取最新代碼並進行建置。
2. 建置完成後，您的網站將以根目錄路徑 `/` 完美運作，且 API 金鑰已被完全安全鎖定在後端伺服器中。

---

## 關於舊版 GitHub Pages 說明

⚠️ **注意**：由於 GitHub Pages 僅支援靜態網頁託管，不支援運作本專案所使用的伺服器端後端程式碼（`api/analyze.js`）。因此，**請改用 Vercel 作為本專案的生產環境部署平台**。

## 安全性確認

✅ **API 金鑰已完全隱密**
- 金鑰存放在 Vercel 伺服器端，使用者使用瀏覽器 F12 工具絕對無法查看。
- 本地開發時，環境變數請定義在 `.env` 中，且 `.env` 檔案已被 `.gitignore` 排除，不會被推送到 GitHub。

✅ **多模型備援機制**
- 後端已內建備援機制。當 `gemini-3.1-flash-lite` 忙碌（503 錯誤）時，系統會自動切換至 `gemini-2.5-flash-lite` 或 `gemini-2.5-flash`，以確保解析極高機率成功。
