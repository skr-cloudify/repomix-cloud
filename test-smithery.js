import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"

async function testSmitheryServer() {
  try {
    // Construct server URL with authentication
    const url = new URL("https://server.smithery.ai/@skr-cloudify/repomix-cloudify/mcp")
    url.searchParams.set("api_key", "c247b439-5981-426f-9a34-5e0d8caaf07e")
    url.searchParams.set("profile", "ripe-trout-FTcW2H")
    const serverUrl = url.toString()

    console.log("Connecting to:", serverUrl)

    const transport = new StreamableHTTPClientTransport(serverUrl)

    // Create MCP client
    const client = new Client({
      name: "Test App",
      version: "1.0.0"
    })

    console.log("Establishing connection...")
    await client.connect(transport)
    console.log("✅ Connected successfully!")

    // List available tools
    console.log("Listing tools...")
    const tools = await client.listTools()
    console.log(`✅ Available tools: ${tools.tools.map(t => t.name).join(", ")}`)

    // Test with a very simple tool call first
    console.log("\n🧪 Testing file_system_read_directory tool...")
    try {
      const result = await client.callTool("file_system_read_directory", {
        path: "/tmp"
      })

      console.log("✅ Simple tool call successful!")
      console.log("Result:", result.content[0].text.substring(0, 200) + "...")
    } catch (toolError) {
      console.error("❌ Simple tool call failed:", toolError.message)
    }

    // Test pack_remote_repository tool with minimal params
    console.log("\n🧪 Testing pack_remote_repository tool with minimal params...")
    try {
      const result = await client.callTool("pack_remote_repository", {
        url: "https://github.com/octocat/Hello-World"
      })

      console.log("✅ Pack tool call successful!")
      console.log("Result:", result.content[0].text.substring(0, 500) + "...")
    } catch (toolError) {
      console.error("❌ Pack tool call failed:", toolError.message)
      console.error("Full error:", toolError)
    }

  } catch (error) {
    console.error("❌ Connection failed:", error.message)
    console.error("Full error:", error)
  }
}

testSmitheryServer().catch(console.error)
