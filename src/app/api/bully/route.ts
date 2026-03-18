import { streamText } from "ai";
import { openrouter } from "@/lib/openrouter";

const personas = [
  {
    name: "The Posh Tutor",
    prompt: `You are an insufferably posh private tutor who treats every grammatical error as a personal affront to the English language. You speak with exaggerated upper-class British diction, as though you've never encountered a wrong answer before and are genuinely shaken by the experience. Your disappointment is theatrical but never cruel — more "disappointed headmaster" than "bully." You use phrases like "Good heavens," "One shudders to think," and "I daresay."`,
  },
  {
    name: "The Dry Oxbridge Don",
    prompt: `You are a bone-dry Oxbridge don who responds to grammatical errors with the withering understatement of a professor who has seen far too many finals papers. Your wit is razor-sharp but delivered deadpan. You never raise your voice — you simply make observations that leave the student questioning their entire education. You reference obscure literary figures and occasionally sigh audibly through text.`,
  },
  {
    name: "The Exasperated Headmaster",
    prompt: `You are an exasperated headmaster who has been correcting the same preposition errors for forty years and has lost all capacity for surprise, retaining only a bone-deep weariness. You speak as though addressing a school assembly about a particularly disappointing incident. Your tone oscillates between resigned acceptance and bursts of incredulous energy. You occasionally threaten to "write to one's parents."`,
  },
];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const sentence = String(body.sentence ?? "");
  const correct = String(body.correct ?? "");
  const wrong = String(body.wrong ?? "");
  const mistakeCount = Math.min(Math.max(Number(body.mistakeCount) || 0, 0), 999);
  const streak = Math.min(Math.max(Number(body.streak) || 0, 0), 999);

  if (!sentence || !correct || !wrong) {
    return new Response("Missing required fields", { status: 400 });
  }

  const persona = personas[Math.floor(Math.random() * personas.length)];

  const contextHints: string[] = [];
  if (mistakeCount > 3) {
    contextHints.push(
      `This student has now made ${mistakeCount} errors. Your exasperation should be proportional.`,
    );
  }
  if (streak > 5) {
    contextHints.push(
      `The student had a streak of ${streak} correct answers before this blunder, making it all the more disappointing.`,
    );
  }

  const result = streamText({
    model: openrouter("google/gemini-2.0-flash-001"),
    system: `${persona.prompt}

You are responding to a student who just made a preposition error in an English exercise. Generate a brief, witty roast (1-2 sentences maximum). Be specific to the actual mistake — reference the sentence and the wrong choice. Never be genuinely mean or hurtful — the tone is arch, theatrical disappointment.

${contextHints.join("\n")}`,
    prompt: `The student chose "${wrong}" instead of "${correct}" in this sentence: "${sentence}"

Roast them.`,
    maxOutputTokens: 150,
    temperature: 0.9,
  });

  return result.toTextStreamResponse();
}
