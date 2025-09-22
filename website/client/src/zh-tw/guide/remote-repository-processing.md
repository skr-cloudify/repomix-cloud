# 遠端倉庫處理

## 基本用法

處理公共倉庫：
```bash
# 使用完整 URL
repomix --remote https://github.com/user/repo

# 使用 GitHub 簡寫
repomix --remote user/repo
```

## 分支和提交選擇

```bash
# 指定分支
repomix --remote user/repo --remote-branch main

# 指定標籤
repomix --remote user/repo --remote-branch v1.0.0

# 指定提交哈希
repomix --remote user/repo --remote-branch 935b695
```

## 系統要求

- 必須安裝 Git
- 需要網絡連接
- 需要倉庫的讀取權限

## 輸出控制

```bash
# 自定義輸出位置
repomix --remote user/repo -o custom-output.xml

# 使用 XML 格式
repomix --remote user/repo --style xml

# 移除註釋
repomix --remote user/repo --remove-comments
```

## Docker 使用方法

```bash
# 在當前目錄處理並輸出
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix \
  --remote user/repo

# 輸出到指定目錄
docker run -v ./output:/app -it --rm ghcr.io/yamadashy/repomix \
  --remote user/repo
```

## 常見問題

### 訪問問題
- 確保倉庫是公開的
- 檢查 Git 是否已安裝
- 驗證網絡連接

### 大型倉庫處理
- 使用 `--include` 選擇特定路徑
- 啟用 `--remove-comments`
- 分開處理不同分支
