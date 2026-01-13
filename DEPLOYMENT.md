# AI 雷諾曼抽卡系統 - 部署指南

## 部署到 GitHub Pages

### 步驟 1：設定 GitHub Secrets（重要！）

為了保護您的 API 金鑰，需要在 GitHub 設定 Secrets：

1. 前往您的 GitHub Repository：https://github.com/Galingalinga/lenormand
2. 點擊 **Settings** → **Secrets and variables** → **Actions**
3. 點擊 **New repository secret** 並新增以下兩個 secrets：

   **Secret 1：主金鑰**
   - Name: `VITE_GEMINI_API_KEY`
   - Value: 您的主 Gemini API 金鑰

   **Secret 2：備用金鑰**
   - Name: `VITE_GEMINI_API_KEY_BACKUP`
   - Value: 您的備用 Gemini API 金鑰

### 步驟 2：啟用 GitHub Pages

1. 在 Repository 設定中，找到 **Pages** 選項
2. 在 **Source** 下拉選單中選擇 **GitHub Actions**

### 步驟 3：推送程式碼

在本地執行以下指令：

```bash
# 初始化 git（如果還沒有）
git init

# 加入遠端 repository
git remote add origin https://github.com/Galingalinga/lenormand.git

# 加入所有檔案（.env 會被 .gitignore 排除，不會上傳）
git add .

# 提交
git commit -m "Initial commit: AI Lenormand Card Reading System"

# 推送到 GitHub
git push -u origin main
```

### 步驟 4：等待部署完成

1. 推送後，GitHub Actions 會自動開始建置和部署
2. 前往 **Actions** 頁面查看部署進度
3. 部署完成後，您的網站會在以下網址上線：
   **https://galingalinga.github.io/lenormand/**

## 安全性確認

✅ **API 金鑰已受保護**
- `.env` 檔案已在 `.gitignore` 中，不會被上傳
- API 金鑰儲存在 GitHub Secrets 中，完全加密
- 建置時才會注入金鑰，不會出現在程式碼中

✅ **自動部署**
- 每次推送到 `main` 分支都會自動重新部署
- 也可以在 Actions 頁面手動觸發部署

## 更新網站

未來要更新網站時，只需：

```bash
git add .
git commit -m "描述您的更新"
git push
```

GitHub Actions 會自動重新建置和部署！

## 疑難排解

如果部署失敗，請檢查：
1. GitHub Secrets 是否正確設定
2. Repository 的 Pages 設定是否選擇 "GitHub Actions"
3. 在 Actions 頁面查看錯誤日誌
