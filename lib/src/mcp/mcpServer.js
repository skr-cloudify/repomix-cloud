var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getVersion } from '../core/file/packageJsonParse.js';
import { logger } from '../shared/logger.js';
import { registerPackRemoteRepositoryPrompt } from './prompts/packRemoteRepositoryPrompts.js';
import { registerFileSystemReadDirectoryTool } from './tools/fileSystemReadDirectoryTool.js';
import { registerFileSystemReadFileTool } from './tools/fileSystemReadFileTool.js';
import { registerPackCodebaseTool } from './tools/packCodebaseTool.js';
import { registerPackRemoteRepositoryTool } from './tools/packRemoteRepositoryTool.js';
import { registerReadRepomixOutputTool } from './tools/readRepomixOutputTool.js';
export const createMcpServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const mcpServer = new McpServer({
        name: 'repomix-mcp-server',
        version: yield getVersion(),
    });
    // Register the prompts
    registerPackRemoteRepositoryPrompt(mcpServer);
    // Register the tools
    registerPackCodebaseTool(mcpServer);
    registerPackRemoteRepositoryTool(mcpServer);
    registerReadRepomixOutputTool(mcpServer);
    registerFileSystemReadFileTool(mcpServer);
    registerFileSystemReadDirectoryTool(mcpServer);
    return mcpServer;
});
const defaultDependencies = {
    processExit: process.exit,
};
export const runMcpServer = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (deps = defaultDependencies) {
    var _a;
    const server = yield createMcpServer();
    const transport = new StdioServerTransport();
    const processExit = (_a = deps.processExit) !== null && _a !== void 0 ? _a : process.exit;
    const handleExit = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield server.close();
            logger.trace('Repomix MCP Server shutdown complete');
            processExit(0);
        }
        catch (error) {
            logger.error('Error during MCP server shutdown:', error);
            processExit(1);
        }
    });
    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
    try {
        yield server.connect(transport);
        logger.trace('Repomix MCP Server running on stdio');
    }
    catch (error) {
        logger.error('Failed to start MCP server:', error);
        processExit(1);
    }
});
//# sourceMappingURL=mcpServer.js.map