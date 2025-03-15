// server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export const createMCPServer = async () => {
  const mcpServer = new McpServer({
    name: 'hackathon-gcp-server',
    version: '0.0.1',
  });

  // start registering prompts
  // {}

  return mcpServer;
}

export const runMcpServer = async () => {
  const server = await createMCPServer();
  const transport = new StdioServerTransport();

  const handleExit = async () => {
    try {

    } catch {

    } finally {

    }
  };

  // cleanup
  process.on("SIGINT", handleExit);
  process.on("SIGTERM", handleExit);

  try {

  } catch {

  }
};
