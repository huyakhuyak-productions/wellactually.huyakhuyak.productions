import { generateText, Output } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const cardSchema = z.object({
  sentence: z
    .string()
    .describe(
      'A natural English sentence with exactly one blank marked as "____" where the preposition should go',
    ),
  correct: z.string().describe("The correct preposition"),
  distractors: z
    .array(z.string())
    .length(3)
    .describe("Three plausible but incorrect prepositions"),
  explanation: z
    .string()
    .describe(
      "A brief, pedantic explanation (1-2 sentences) in dry British academic voice",
    ),
  difficulty: z
    .union([z.literal(1), z.literal(2), z.literal(3)])
    .describe("1 = common, 2 = intermediate, 3 = advanced/idiomatic"),
});

export async function POST(request: Request) {
  const body = await request.json();
  const { existingIds } = body as { existingIds: string[] };

  const result = await generateText({
    model: openrouter("google/gemini-2.0-flash-001"),
    output: Output.object({
      schema: z.object({ cards: z.array(cardSchema).length(5) }),
    }),
    system: `You are a pedantic British English examiner generating preposition exercise cards.
Each card must have a natural, slightly literary sentence with one blank (____) for a preposition.
Distractors must be genuinely confusing — prepositions a non-native speaker might plausibly choose.
Explanations should be brief, dry, and dripping with British academic condescension.
Vary difficulty and preposition types. Cover: time, place, dependent verbs, idioms, academic phrases.
Do NOT repeat sentences that already exist in the card bank.`,
    prompt: `Generate 5 new preposition exercise cards. There are already ${existingIds.length} cards in the bank, so make these unique and interesting.`,
    maxOutputTokens: 2000,
    temperature: 0.8,
  });

  if (!result.output) {
    return Response.json({ cards: [] }, { status: 500 });
  }

  const cards = result.output.cards.map((card, i) => ({
    ...card,
    id: `prep-ai-${Date.now()}-${i}`,
  }));

  return Response.json({ cards });
}
