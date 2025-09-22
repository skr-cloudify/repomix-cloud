# 基本用法

## 快速開始

打包整個倉庫：
```bash
repomix
```

## 常見使用場景

### 打包指定目錄
```bash
repomix path/to/directory
```

### 包含特定文件
使用 [glob 模式](https://github.com/mrmlnc/fast-glob?tab=readme-ov-file#pattern-syntax)：
```bash
repomix --include "src/**/*.ts,**/*.md"
```

### 排除文件
```bash
repomix --ignore "**/*.log,tmp/"
```

### 處理遠端倉庫
```bash
# 使用 GitHub URL
repomix --remote https://github.com/user/repo

# 使用簡寫形式
repomix --remote user/repo

# 指定分支/標籤/提交
repomix --remote user/repo --remote-branch main
repomix --remote user/repo --remote-branch 935b695
```

## 輸出格式

### XML（預設）
```bash
repomix --style xml
```

### Markdown
```bash
repomix --style markdown
```

### 純文字
```bash
repomix --style plain
```

## 其他選項

### 移除註釋
```bash
repomix --remove-comments
```

### 顯示行號
```bash
repomix --output-show-line-numbers
```

### 複製到剪貼簿
```bash
repomix --copy
```

### 禁用安全檢查
```bash
repomix --no-security-check
```

## 配置

初始化配置文件：
```bash
repomix --init
```

更多詳細配置選項請參閱[配置指南](/zh-tw/guide/configuration)。
