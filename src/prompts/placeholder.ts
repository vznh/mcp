// ?
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const placeholderPrompt = (mcpServer: McpServer) => {
  mcpServer.prompt(
    'setup',
    'Create an instance of whatever the fuck we tryna do',
    {
      repository: z.string().describe("GitHub repository URL or owner/repo format"),
      includePatterns: z
        .string()
        .optional()
        .describe(""),
      excludePatterns: z
        .string()
        .optional()
        .describe("Patterns to include in the search")
    },
    async ({ repository, includePatterns, excludePatterns }) => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: 'text',
              text: `Please analyze the GitHub repo at ${repository}.
Then use the ___ tool with these parameters:
- repository: "${repository}"
- includePatterns: "${includePatterns || 'none'}"
- excludePatterns: "${excludePatterns || 'none'}"

Once you have the repository data:
1. Re-output and summarize what the user asks from the database.
2. Output the code from the tool response.
3. Give me a high-level overview of the output structure./
4. Explain its architecture, how to use it, and any limitations, all neatly organized within its own sections.
5. Highlight the key features that the user specifically wanted within the implementation.

Please be thorough and pinpoint precise in your analysis.`,
            },
          },
        ],
      };
    },
  );
};
