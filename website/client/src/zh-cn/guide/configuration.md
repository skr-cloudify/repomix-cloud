# 配置

## 快速开始

创建配置文件：
```bash
repomix --init
```

## 配置文件

`repomix.config.json`：
```json
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml",
    "parsableStyle": true,
    "compress": false,
    "headerText": "自定义头部文本",
    "instructionFilePath": "repomix-instruction.md",
    "fileSummary": true,
    "directoryStructure": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "copyToClipboard": false,
    "includeEmptyDirectories": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100
    }
  },
  "include": ["**/*"],
  "ignore": {
    "useGitignore": true,
    "useDefaultPatterns": true,
    "customPatterns": ["tmp/", "*.log"]
  },
  "security": {
    "enableSecurityCheck": true
  }
}
```

## 全局配置

创建全局配置：
```bash
repomix --init --global
```

位置：
- Windows: `%LOCALAPPDATA%\Repomix\repomix.config.json`
- macOS/Linux: `~/.config/repomix/repomix.config.json`

## 忽略模式

优先级：
1. CLI 选项 (`--ignore`)
2. `.repomixignore`
3. `.gitignore` 和 `.git/info/exclude`
4. 默认模式

`.repomixignore` 示例：
```text
# 缓存目录
.cache/
tmp/

# 构建输出
dist/
build/

# 日志
*.log
```

## 默认忽略模式

默认包含的常见模式：
```text
node_modules/**
.git/**
coverage/**
dist/**
```

完整列表：[defaultIgnore.ts](https://github.com/yamadashy/repomix/blob/main/src/config/defaultIgnore.ts)

## 示例

### 代码压缩

当 `output.compress` 设置为 `true` 时，Repomix 将提取基本代码结构，同时移除实现细节。这可以在保持重要的结构信息的同时减少令牌数量。

更多详细信息和示例，请参阅[代码压缩指南](code-compress)。

### Git 集成

`output.git` 配置允许您控制如何基于 Git 历史记录对文件进行排序以及如何包含 Git 差异：

- `sortByChanges`：当设置为 `true` 时，文件将按 Git 更改次数（修改该文件的提交数）进行排序。更改次数较多的文件将出现在输出的底部。这有助于优先处理更活跃开发的文件。默认值：`true`
- `sortByChangesMaxCommits`：计算文件更改次数时要分析的最大提交数。默认值：`100`
- `includeDiffs`：当设置为 `true` 时，在输出中包含 Git 差异（同时分别包含工作树和暂存区的更改）。这允许读者查看存储库中的待处理更改。默认值：`false`

配置示例：
```json
{
  "output": {
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": true
    }
  }
}
```

### 注释移除

当 `output.removeComments` 设置为 `true` 时，将从支持的文件类型中移除注释，以减少输出大小并专注于核心代码内容。

有关支持的语言和详细示例，请参阅[注释移除指南](comment-removal)。
