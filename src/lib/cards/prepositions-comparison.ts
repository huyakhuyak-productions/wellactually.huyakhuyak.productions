import type { Card } from "../types";

export const prepositionsComparison: Card[] = [
  {
    id: "prep-comparison-01",
    sentence: "The prize was divided ____ the two leading candidates.",
    correct: "between",
    distractors: ["among", "amid", "across"],
    explanation:
      "BETWEEN is used for two distinct entities. AMONG requires three or more. This is one of the few grammar rules that is actually as simple as people think.",
    difficulty: 1,
  },
  {
    id: "prep-comparison-02",
    sentence: "A murmur of dissent spread ____ the assembled fellows.",
    correct: "among",
    distractors: ["between", "amid", "across"],
    explanation:
      "AMONG is used when the group comprises three or more individuals considered collectively. BETWEEN would imply a private exchange between two specific people.",
    difficulty: 1,
  },
  {
    id: "prep-comparison-03",
    sentence: "She found the letter ____ the pages of an old ledger.",
    correct: "between",
    distractors: ["among", "amid", "within"],
    explanation:
      "BETWEEN the pages — two surfaces forming the hiding place. AMONG the pages would suggest a chaotic shuffle of loose leaves.",
    difficulty: 2,
  },
  {
    id: "prep-comparison-04",
    sentence: "He remained calm ____ the general panic.",
    correct: "amid",
    distractors: ["among", "between", "during"],
    explanation:
      "AMID is used with uncountable or abstract nouns — panic, chaos, confusion. AMONG would require countable, distinct entities.",
    difficulty: 2,
  },
  {
    id: "prep-comparison-05",
    sentence: "The negotiations ____ the three departments proved arduous.",
    correct: "among",
    distractors: ["between", "amid", "across"],
    explanation:
      "AMONG is correct with three or more parties in a collective interaction. Purists insist on this, and we are nothing if not purists.",
    difficulty: 2,
  },
];
