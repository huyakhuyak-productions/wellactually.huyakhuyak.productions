import type { Card } from "../types";

export const prepositionsPurpose: Card[] = [
  {
    id: "prep-purpose-01",
    sentence: "She travelled ____ Edinburgh for the conference.",
    correct: "to",
    distractors: ["for", "at", "in"],
    explanation:
      "One travels TO a destination. FOR Edinburgh would imply one is travelling on Edinburgh's behalf, which is a rather grand civic gesture.",
    difficulty: 1,
  },
  {
    id: "prep-purpose-02",
    sentence: "He did it ____ the benefit of the younger students.",
    correct: "for",
    distractors: ["to", "at", "with"],
    explanation:
      "FOR introduces purpose or beneficiary. One acts FOR the benefit of someone — TO the benefit would sound as though benefit were a postal address.",
    difficulty: 1,
  },
  {
    id: "prep-purpose-03",
    sentence: "She addressed her remarks ____ the assembled committee.",
    correct: "to",
    distractors: ["for", "at", "with"],
    explanation:
      "Remarks are addressed TO their recipients. FOR the committee would suggest the remarks were a gift, which, given most committee meetings, they rarely are.",
    difficulty: 2,
  },
  {
    id: "prep-purpose-04",
    sentence: "They have been preparing ____ the examination since Michaelmas.",
    correct: "for",
    distractors: ["to", "at", "towards"],
    explanation:
      "One prepares FOR an event. TO the examination would imply physical movement toward the exam paper, not intellectual readiness.",
    difficulty: 1,
  },
  {
    id: "prep-purpose-05",
    sentence: "He presented the findings ____ the Royal Society.",
    correct: "to",
    distractors: ["for", "at", "with"],
    explanation:
      "One presents something TO an audience — the recipient of the presentation. FOR the Royal Society would suggest the findings were a favour.",
    difficulty: 2,
  },
  {
    id: "prep-purpose-06",
    sentence: "This scholarship was established ____ students of limited means.",
    correct: "for",
    distractors: ["to", "with", "by"],
    explanation:
      "FOR introduces the intended beneficiary. The scholarship exists FOR students — it was established TO no one, as TO requires a direction, not a purpose.",
    difficulty: 2,
  },
];
