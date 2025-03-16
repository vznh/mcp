// registerAlpacaInitializationPrompt.ts
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const registerAlpacaInitializationPrompt = (mcpServer: McpServer) => {
  mcpServer.prompt(
    "stockData",
    "Retrieve the latest stock data for a specified symbol using Alpaca.",
    // Define the input schema: expects a valid stock symbol.
    {
      stockSymbol: z.string().min(1, "Stock symbol is required").describe("The stock symbol (e.g., AAPL, GOOG, MSFT) to look up."),
    },
    async ({ stockSymbol }) => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please use the "alpaca_latest_stock_data" tool with the following parameter:
- stockSymbol: "${stockSymbol}"

This tool should fetch the newest data for the specified stock and include the timestamp of when the API was called. Once you have the result, summarize the returned data along with the timestamp, and output it clearly.`,
            },
          },
        ],
      };
    }
  );
};
