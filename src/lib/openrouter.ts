import { createOpenAI } from "@ai-sdk/openai";

// Read the API key per call, not at module scope: on Cloudflare Workers,
// process.env is only populated once request handling starts.
export const openrouter = (modelId: string) =>
  createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  })(modelId);
