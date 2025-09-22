# 安裝

## 使用 npx（無需安裝）

```bash
npx repomix
```

## 全局安裝

### npm 安裝
```bash
npm install -g repomix
```

### Yarn 安裝
```bash
yarn global add repomix
```

### Homebrew 安裝（macOS/Linux）
```bash
brew install repomix
```

## Docker 安裝

使用 Docker 是最便捷的方式之一，可以避免環境配置問題。以下是具體步驟：

```bash
# 處理當前目錄
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix

# 處理指定目錄
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix path/to/directory

# 處理遠端倉庫
docker run -v ./output:/app -it --rm ghcr.io/yamadashy/repomix --remote yamadashy/repomix
```

## VSCode 擴展

通過社區維護的 [Repomix Runner](https://marketplace.visualstudio.com/items?itemName=DorianMassoulier.repomix-runner) 擴展，您可以直接在 VSCode 中執行 Repomix。

功能：
- 只需點擊幾下即可打包任何資料夾
- 可選擇文件或內容模式進行複製
- 自動清理輸出文件
- 支援 repomix.config.json

從 [VSCode 應用商店](https://marketplace.visualstudio.com/items?itemName=DorianMassoulier.repomix-runner)安裝。

## 系統要求

- Node.js: ≥ 18.0.0
- Git: 處理遠端倉庫時需要

## 驗證安裝

安裝完成後，可以通過以下命令驗證 Repomix 是否正常工作：

```bash
repomix --version
repomix --help
```
