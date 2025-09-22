# MCP伺服器

Repomix 支援 [Model Context Protocol (MCP)](https://modelcontextprotocol.io)，允許 AI 助手直接與您的程式碼庫交互。當作為 MCP 伺服器運行時，Repomix 提供了工具，使 AI 助手能夠在無需手動準備文件的情況下打包本地或遠端倉庫進行分析。

> [!NOTE]  
> 這是一個實驗性功能，我們將根據用戶反饋和實際使用情況積極改進

## 將 Repomix 作為 MCP 伺服器運行

要將 Repomix 作為 MCP 伺服器運行，請使用 `--mcp` 標誌：

```bash
repomix --mcp
```

這會以 MCP 伺服器模式啟動 Repomix，使其可供支援 Model Context Protocol 的 AI 助手使用。

## 配置 MCP 伺服器

要將 Repomix 作為 MCP 伺服器與 Claude 等 AI 助手一起使用，您需要配置 MCP 設置：

### 對於 VS Code

您可以使用以下方法之一在 VS Code 中安裝 Repomix MCP 伺服器：

1. **使用安裝徽章：**

  [![Install in VS Code](https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Server&color=0098FF)](vscode:mcp/install?%7B%22name%22%3A%22repomix%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22repomix%22%2C%22--mcp%22%5D%7D)<br>
  [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=flat-square&label=Install%20Server&color=24bfa5)](vscode-insiders:mcp/install?%7B%22name%22%3A%22repomix%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22repomix%22%2C%22--mcp%22%5D%7D)

2. **使用命令行：**

  ```bash
  code --add-mcp '{"name":"repomix","command":"npx","args":["-y","repomix","--mcp"]}'
  ```

  對於 VS Code Insiders：
  ```bash
  code-insiders --add-mcp '{"name":"repomix","command":"npx","args":["-y","repomix","--mcp"]}'
  ```

### 對於 Cline（VS Code 擴展）

編輯 `cline_mcp_settings.json` 文件：

```json
{
  "mcpServers": {
    "repomix": {
      "command": "npx",
      "args": [
        "-y",
        "repomix",
        "--mcp"
      ]
    }
  }
}
```

### 對於 Cursor

在 Cursor 中，從 `Cursor Settings` > `MCP` > `+ Add new global MCP server` 添加一個新的 MCP 伺服器，配置與 Cline 類似。

### 對於 Claude Desktop

使用與 Cline 類似的配置編輯 `claude_desktop_config.json` 文件。

## 可用的 MCP 工具

當作為 MCP 伺服器運行時，Repomix 提供以下工具：

### pack_codebase

此工具將本地程式碼目錄打包成一個用於 AI 分析的整合文件。

**參數：**
- `directory`：（必需）要打包的目錄的絕對路徑
- `compress`：（可選，預設值：true）是否執行智能程式碼提取以減少令牌計數
- `includePatterns`：（可選）以逗號分隔的包含模式列表
- `ignorePatterns`：（可選）以逗號分隔的忽略模式列表

**示例：**
```json
{
  "directory": "/path/to/your/project",
  "compress": true,
  "includePatterns": "src/**/*.ts,**/*.md",
  "ignorePatterns": "**/*.log,tmp/"
}
```

### pack_remote_repository

此工具獲取、克隆並將 GitHub 倉庫打包成一個用於 AI 分析的整合文件。

**參數：**
- `remote`：（必需）GitHub 倉庫 URL 或用戶/倉庫格式（例如，yamadashy/repomix）
- `compress`：（可選，預設值：true）是否執行智能程式碼提取以減少令牌計數
- `includePatterns`：（可選）以逗號分隔的包含模式列表
- `ignorePatterns`：（可選）以逗號分隔的忽略模式列表
