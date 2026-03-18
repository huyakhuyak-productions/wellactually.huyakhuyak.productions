import type { Card } from "../types";

export const prepositionsRelation: Card[] = [
  {
    id: "prep-relation-01",
    sentence: "She grew tired ____ waiting for the bursar's reply.",
    correct: "of",
    distractors: ["from", "with", "about"],
    explanation:
      "One grows tired OF something. 'Tired from' indicates physical exhaustion caused by an activity; 'tired of' expresses weary impatience — a far more British complaint.",
    difficulty: 2,
  },
  {
    id: "prep-relation-02",
    sentence: "His approach is quite different ____ what we were expecting.",
    correct: "from",
    distractors: ["to", "than", "of"],
    explanation:
      "In careful British English, one thing differs FROM another. 'Different to' is tolerated colloquially; 'different than' is an Americanism best left across the Atlantic.",
    difficulty: 2,
  },
  {
    id: "prep-relation-03",
    sentence: "I am rather worried ____ the state of his bibliography.",
    correct: "about",
    distractors: ["of", "for", "with"],
    explanation:
      "One worries ABOUT a situation. 'Worried of' is not standard English; 'worried for' suggests concern for someone's welfare, not anxiety about a thing.",
    difficulty: 1,
  },
  {
    id: "prep-relation-04",
    sentence: "The dean reminded them ____ the college's founding principles.",
    correct: "of",
    distractors: ["about", "on", "for"],
    explanation:
      "One reminds someone OF something. 'Reminded about' is looser and less formal — acceptable in the quad, perhaps, but not in the Senate House.",
    difficulty: 2,
  },
  {
    id: "prep-relation-05",
    sentence: "She accused him ____ plagiarising her footnotes.",
    correct: "of",
    distractors: ["for", "with", "about"],
    explanation:
      "One accuses someone OF a transgression. 'Accused for' is a regrettably common error; 'accused with' would be a novel horror.",
    difficulty: 2,
  },
  {
    id: "prep-relation-06",
    sentence: "The theory was derived ____ first principles.",
    correct: "from",
    distractors: ["of", "by", "out of"],
    explanation:
      "One derives something FROM a source. OF would muddy the directional sense of derivation — things come FROM, not OF, their origins.",
    difficulty: 2,
  },
];
