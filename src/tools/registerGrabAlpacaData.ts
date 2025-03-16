// registerGrabAlpacaData.ts
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Ensure your Alpaca credentials are securely stored as environment variables.
const alpacaAPIKey = process.env.ALPACA_API_KEY;
const alpacaSecretKey = process.env.ALPACA_SECRET_KEY;

const alpacaBaseURL = "https://paper-api.alpaca.markets/v2";


export const registerGrabAlpacaData = (mcpServer: McpServer) => {
  mcpServer.tool(
    "alpaca_latest_stock_data",
    "Given stock symbol, fetch latest stock data.",
    {
      symbol: z.string().min(1, "Stock symbol is required."),
    },
    async ({ symbol }) => {
      try {
        const response = await axios.get(
          `${alpacaBaseURL}/stocks/${symbol}/quotes/latest`,
          {
            headers: {
              "APCA-API-KEY-ID": alpacaAPIKey!,
              "APCA-API-SECRET-KEY": alpacaSecretKey!,
              "X-Request-ID": uuidv4()
            },
          },
        );

        // Extract data and timestamp
        const data = response.data.quote || response.data;
        const timestamp = data.timestamp;

        const messageText = `Current stock data for ${symbol} (fetched at ${timestamp}):\n${JSON.stringify(
          data,
          null,
          2,
        )}`;

        return {
          content: [
            {
              type: "text",
              text: messageText,
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error fetching data for ${symbol}: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
};
