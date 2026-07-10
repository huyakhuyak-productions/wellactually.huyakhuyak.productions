import { generateText, Output } from "ai";
import { z } from "zod";
import { openrouter } from "@/lib/openrouter";

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
    .number()
    .int()
    .min(1)
    .max(5)
    .describe("1 = common, 3 = intermediate, 5 = advanced/idiomatic"),
});

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ cards: [] }, { status: 400 });
  }

  const { existingIds } = body as { existingIds: string[] };

  let result;
  try {
    result = await generateText({
      model: openrouter("google/gemini-3.5-flash"),
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
  } catch (error) {
    // generateText throws NoObjectGeneratedError when the model's output
    // doesn't match the schema — treat it like any other generation failure.
    console.error("generate-card failed:", error);
    return Response.json({ cards: [] }, { status: 500 });
  }

  if (!result.output) {
    console.log("DEBUG generate-card no output, text:", JSON.stringify(result.text).slice(0, 300));
    return Response.json({ cards: [] }, { status: 500 });
  }

  const cards = result.output.cards.map((card, i) => ({
    ...card,
    id: `prep-ai-${Date.now()}-${i}`,
  }));

  return Response.json({ cards });
}
