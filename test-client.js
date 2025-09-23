#!/usr/bin/env node

import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamable.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function testMCPServer() {
  console.log("Testing MCP Server...");

  try {
    const transport = new StreamableHTTPClientTransport(
      new URL("http://localhost:3000")
    );
    const client = new Client(
      {
        name: "test-client",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );

    await client.connect(transport);
    console.log("✅ Connected to MCP server");

    // List available tools
    const tools = await client.listTools();
    console.log(`✅ Found ${tools.tools.length} tools:`);
    tools.tools.forEach((tool) => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });

    // Test with a public repository
    console.log("\n🧪 Testing with public repository...");
    const result = await client.callTool({
      name: "pack_remote_repository",
      arguments: {
        url: "https://github.com/octocat/Hello-World",
        compress: false,
      },
    });

    console.log("✅ Tool call result:", result);

    await client.close();
    console.log("✅ Connection closed");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testMCPServer().catch(console.error);
