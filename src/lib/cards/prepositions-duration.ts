import type { Card } from "../types";

export const prepositionsDuration: Card[] = [
  {
    id: "prep-duration-01",
    sentence: "No one spoke ____ the entire ceremony.",
    correct: "during",
    distractors: ["within", "throughout", "in"],
    explanation:
      "DURING indicates a point or period within an event. THROUGHOUT would imply continuous silence from start to finish — which, while admirable, is a stronger claim.",
    difficulty: 1,
  },
  {
    id: "prep-duration-02",
    sentence: "The manuscript must be submitted ____ fourteen days.",
    correct: "within",
    distractors: ["during", "in", "by"],
    explanation:
      "WITHIN sets a deadline — at any point before the period expires. IN fourteen days means on that exact day; WITHIN allows for promptness.",
    difficulty: 2,
  },
  {
    id: "prep-duration-03",
    sentence: "The influence of the Enlightenment persisted ____ the nineteenth century.",
    correct: "throughout",
    distractors: ["during", "within", "across"],
    explanation:
      "THROUGHOUT emphasises continuous presence from beginning to end. DURING would suggest a more casual, possibly intermittent presence.",
    difficulty: 2,
  },
  {
    id: "prep-duration-04",
    sentence: "He made copious notes ____ the lecture.",
    correct: "during",
    distractors: ["throughout", "within", "in"],
    explanation:
      "DURING the lecture indicates the note-taking occurred at various points while the lecture was in progress. A perfectly studious scene.",
    difficulty: 1,
  },
  {
    id: "prep-duration-05",
    sentence: "The restoration must be completed ____ the academic year.",
    correct: "within",
    distractors: ["during", "throughout", "by"],
    explanation:
      "WITHIN imposes a temporal boundary — it must be done before the year ends. DURING would merely locate the work somewhere in the year without urgency.",
    difficulty: 2,
  },
];
