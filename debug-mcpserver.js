import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const mcpServer = new McpServer({ name: "test", version: "1.0.0" });
console.log("McpServer properties:", Object.getOwnPropertyNames(mcpServer));
console.log(
  "McpServer prototype:",
  Object.getOwnPropertyNames(Object.getPrototypeOf(mcpServer))
);
if (mcpServer.server) {
  console.log("server property type:", typeof mcpServer.server);
  console.log(
    "server properties:",
    Object.getOwnPropertyNames(mcpServer.server)
  );
  console.log(
    "server prototype:",
    Object.getOwnPropertyNames(Object.getPrototypeOf(mcpServer.server))
  );
  console.log("has connect:", typeof mcpServer.server.connect);
} else {
  console.log("no server property found");
}

// Also check if McpServer itself has connect
console.log("McpServer has connect:", typeof mcpServer.connect);
