import type { Card } from "../types";

export const prepositionsMovement: Card[] = [
  {
    id: "prep-movement-01",
    sentence: "He walked ____ the room without so much as a greeting.",
    correct: "into",
    distractors: ["in", "onto", "to"],
    explanation:
      "INTO denotes movement from outside to inside. 'Walked in the room' would describe pacing about within it — a subtle but crucial distinction.",
    difficulty: 1,
  },
  {
    id: "prep-movement-02",
    sentence: "The cat leapt ____ the bookshelf with alarming agility.",
    correct: "onto",
    distractors: ["on", "into", "upon"],
    explanation:
      "ONTO expresses movement arriving at a surface. 'On the bookshelf' is the resulting state; ONTO captures the dramatic trajectory.",
    difficulty: 1,
  },
  {
    id: "prep-movement-03",
    sentence: "She hurried ____ the building before the rain began.",
    correct: "out of",
    distractors: ["from", "off", "outside"],
    explanation:
      "OUT OF indicates movement from inside to outside an enclosed space. 'From the building' loses the spatial specificity; 'off' implies detachment from a surface.",
    difficulty: 1,
  },
  {
    id: "prep-movement-04",
    sentence: "The students filed ____ the examination hall in silence.",
    correct: "into",
    distractors: ["in", "to", "through"],
    explanation:
      "INTO captures the crossing of a threshold. 'In' would describe their static presence; INTO describes the act of entering.",
    difficulty: 1,
  },
  {
    id: "prep-movement-05",
    sentence: "He climbed ____ the wall with considerable effort.",
    correct: "over",
    distractors: ["onto", "on", "above"],
    explanation:
      "OVER implies traversing from one side to the other. ONTO would leave him sitting atop the wall, which is picturesque but not what was intended.",
    difficulty: 2,
  },
  {
    id: "prep-movement-06",
    sentence: "The boat drifted slowly ____ the bridge.",
    correct: "under",
    distractors: ["below", "beneath", "through"],
    explanation:
      "UNDER the bridge implies passage beneath it. BELOW lacks the sense of movement; THROUGH would suggest the bridge has a tunnel, which bridges emphatically do not.",
    difficulty: 2,
  },
];
