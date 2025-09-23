#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import createServer from './smithery-entry.js';

async function main() {
  const args = process.argv.slice(2);
  const isMcpMode = args.includes('--mcp');

  if (isMcpMode) {
    // MCP mode - start server with stdio transport
    const server = createServer({
      config: {
        githubToken: process.env.GITHUB_TOKEN,
        token_count_encoding: process.env.TOKEN_COUNT_ENCODING || 'o200k_base',
        security_check: process.env.SECURITY_CHECK === 'true',
        defaultCompress: process.env.DEFAULT_COMPRESS === 'true',
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '50000000'),
      }
    });

    const transport = new StdioServerTransport();
    
    const handleExit = async () => {
      try {
        await server.close();
        console.error('Repomix MCP Server shutdown complete');
        process.exit(0);
      } catch (error) {
        console.error('Error during MCP server shutdown:', error);
        process.exit(1);
      }
    };

    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
    process.on('SIGHUP', handleExit);

    console.error('Starting Repomix MCP server...');
    await server.connect(transport);
    console.error('Repomix MCP server started successfully');
  } else {
    console.error('Please use --mcp flag to start the MCP server');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
