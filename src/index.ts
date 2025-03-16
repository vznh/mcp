#!/usr/bin/env node

// index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAlpacaInitializationPrompt } from "./prompts/registerAlpacaInitializationPrompt.js";
import { registerGrabAlpacaData } from "./tools/registerGrabAlpacaData.js";

export const createMCPServer = async () => {
  const mcpServer = new McpServer(
    {
      name: 'cha-ching',
      version: '1',
    },
    {
      capabilities: {
        tools: {}
      }
    }
  );

  // prompts
  registerAlpacaInitializationPrompt(mcpServer);

  // tools
  registerGrabAlpacaData(mcpServer);

  return mcpServer;
}

async function main() {
  const server = await createMCPServer();
  const transport = new StdioServerTransport();

  const handleExit = async () => {
    try {
      await server.close();
      process.exit(0);
    } catch {
      process.exit(1);
    }
  };

  // cleanup
  process.on("SIGINT", handleExit);
  process.on("SIGTERM", handleExit);

  try {
    await server.connect(transport);
    console.error("ayeeeee we running on stdio");
  } catch (e) {
    console.error("Failed to start MCP server: ", e);
    process.exit(1);
  }
};

main();
