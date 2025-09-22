# 開發環境搭建

## 前提條件

- Node.js ≥ 18.0.0
- Git
- npm
- pnpm（推薦）

## 本地開發

### 克隆倉庫

```bash
git clone https://github.com/yamadashy/repomix.git
cd repomix
```

### 安裝依賴

使用 pnpm（推薦）：
```bash
pnpm install
```

使用 npm：
```bash
npm install
```

### 啟動開發伺服器

```bash
# 運行 CLI
pnpm run repomix

# 啟動文檔網站開發伺服器
pnpm run website:dev
```

## Docker 開發環境

```bash
# 構建鏡像
docker build -t repomix .

# 運行容器
docker run -v ./:/app -it --rm repomix
```

## 項目結構

```text
.
├── src/                # 源代碼
│   ├── cli/           # CLI 實現
│   ├── config/        # 配置處理
│   ├── core/          # 核心功能
│   └── shared/        # 共享工具
├── tests/             # 測試文件
├── website/           # 文檔網站
└── package.json       # 項目依賴
```

## 測試

```bash
# 運行所有測試
pnpm run test

# 生成測試覆蓋率報告
pnpm run test:coverage

# 運行特定測試
pnpm run test -- tests/cli
```

## 程式碼質量

```bash
# 運行程式碼檢查
pnpm run lint

# 自動修復程式碼問題
pnpm run lint:fix

# 類型檢查
pnpm run typecheck
```

## 文檔

文檔位於 `website/` 目錄。要在本地開發文檔網站：

```bash
# 啟動開發伺服器
pnpm run website:dev

# 構建生產版本
pnpm run website:build
```
