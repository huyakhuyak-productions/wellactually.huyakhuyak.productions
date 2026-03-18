import type { Card } from "../types";

export const prepositionsAgent: Card[] = [
  {
    id: "prep-agent-01",
    sentence: "The portrait was painted ____ Gainsborough.",
    correct: "by",
    distractors: ["with", "from", "of"],
    explanation:
      "The agent of a passive verb is introduced BY. The painting was done BY Gainsborough, not WITH him — unless you held the brush together, which would be charming but unlikely.",
    difficulty: 1,
  },
  {
    id: "prep-agent-02",
    sentence: "The timber was cut ____ a very sharp saw.",
    correct: "with",
    distractors: ["by", "from", "through"],
    explanation:
      "Instruments and tools take WITH. One cuts WITH a saw. BY a saw would imply the saw acted of its own volition, which is unsettling.",
    difficulty: 1,
  },
  {
    id: "prep-agent-03",
    sentence: "The lawn was completely ruined ____ the moles.",
    correct: "by",
    distractors: ["with", "from", "of"],
    explanation:
      "Living agents responsible for an action take BY. The moles are the perpetrators; they acted deliberately, or at least with characteristic disregard.",
    difficulty: 1,
  },
  {
    id: "prep-agent-04",
    sentence: "He repaired the binding ____ needle and thread.",
    correct: "with",
    distractors: ["by", "from", "in"],
    explanation:
      "WITH introduces the instrument or material used. BY needle and thread would oddly personify the sewing kit.",
    difficulty: 1,
  },
  {
    id: "prep-agent-05",
    sentence: "The discovery was made ____ a team from Cambridge.",
    correct: "by",
    distractors: ["with", "from", "through"],
    explanation:
      "BY introduces the agent who performed the action. WITH a team would suggest collaboration alongside someone else, not attribution.",
    difficulty: 2,
  },
  {
    id: "prep-agent-06",
    sentence: "She filled the page ____ observations of remarkable acuity.",
    correct: "with",
    distractors: ["by", "of", "in"],
    explanation:
      "One fills something WITH its contents. BY observations would redirect the sentence toward agency rather than substance.",
    difficulty: 2,
  },
];
