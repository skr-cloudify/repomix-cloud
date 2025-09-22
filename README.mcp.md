# Repo-to-File MCP Server

A Model Context Protocol (MCP) server for converting repositories to files for LLM consumption. This MCP server wraps [Repomix](https://github.com/yamadashy/repomix) to provide AI assistants with the ability to convert entire codebases into a single file format optimized for LLM analysis.

## Features

- **Convert Remote Repositories**: Package any GitHub repository into a single file
- **Convert Local Directories**: Process local code directories into AI-friendly formats
- **Convert Individual Files**: Handle single file processing
- **Optimized Output**: Reduce token usage with intelligent compression
- **MCP Integration**: Easy to set up with Claude, VS Code extensions, etc.

## Installation

### Using NPM

```bash
npm install -g repo-to-file-mcp
```

### Manual Setup

```bash
git clone https://github.com/YOUR_USERNAME/repo-to-file-mcp.git
cd repo-to-file-mcp
npm install
npm run build
```

## Usage

### Starting the MCP Server

```bash
npx repo-to-file-mcp
```

### Configuring with Claude

To use this MCP server with Claude:

1. **VS Code Configuration**:

   In VS Code, add the MCP server using the command palette or by clicking the install badge:
   
   [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=repo-to-file-mcp&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22repo-to-file-mcp%22%5D%7D)

   Or using the command line:
   ```bash
   code --add-mcp '{"name":"repo-to-file-mcp","command":"npx","args":["-y","repo-to-file-mcp"]}'
   ```

2. **Cline (VS Code Extension)**:

   Edit the `cline_mcp_settings.json` file:
   ```json
   {
     "mcpServers": {
       "repo-to-file-mcp": {
         "command": "npx",
         "args": [
           "-y",
           "repo-to-file-mcp"
         ]
       }
     }
   }
   ```

3. **Cursor**:

   In Cursor, add a new MCP server from `Cursor Settings` > `MCP` > `+ Add new global MCP server` with a configuration similar to Cline.

4. **Claude Desktop**:

   Edit the `claude_desktop_config.json` file with similar configuration to Cline's config.

## Available Tools

The MCP server provides the following tools:

1. **convert_repository**
   - Parameters:
     - `repository`: Repository URL or GitHub shorthand (e.g., user/repo)
     - `compress`: (Optional, default: true) Whether to compress the output to reduce token usage
     - `includePatterns`: (Optional) Comma-separated glob patterns to include (e.g., "src/**/*.ts,**/*.md")
     - `ignorePatterns`: (Optional) Comma-separated glob patterns to ignore (e.g., "node_modules,dist")

2. **convert_local**
   - Parameters:
     - `directory`: Absolute path to the directory to convert
     - `compress`: (Optional, default: true) Whether to compress the output to reduce token usage
     - `includePatterns`: (Optional) Comma-separated glob patterns to include
     - `ignorePatterns`: (Optional) Comma-separated glob patterns to ignore

3. **convert_file**
   - Parameters:
     - `filePath`: Absolute path to the file to convert

## Example Usage with Claude

Once you've set up the MCP server, you can use it with Claude:

```
I'd like to analyze the React codebase. Can you convert the React repository to a file format that's easier to study?
```

Claude can then use the `convert_repository` tool to fetch and package the React repository for analysis.

For local directories:

```
I need to analyze my project located at /Users/myname/projects/myapp. Can you convert it to a file?
```

Claude will use the `convert_local` tool to process the local directory.

## Configuration

The MCP server supports configuration options through environment variables or the smithery.yaml file:

- `TOKEN_COUNT_ENCODING`: Token count encoding used by tiktoken (default: "o200k_base" for GPT-4o)
- `SECURITY_CHECK`: Whether to perform security checks on files (default: true)

## Docker Deployment

You can also run the MCP server using Docker:

```bash
docker build -f Dockerfile.mcp -t repo-to-file-mcp .
docker run -it repo-to-file-mcp
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project wraps [Repomix](https://github.com/yamadashy/repomix) by Kazuki Yamada
- Built with the [Model Context Protocol (MCP)](https://modelcontextprotocol.io)