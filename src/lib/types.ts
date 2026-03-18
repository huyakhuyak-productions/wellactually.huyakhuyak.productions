export interface Card {
  id: string;
  sentence: string; // "The professor insisted ____ attending the lecture."
  correct: string; // "upon"
  distractors: string[]; // ["on", "at", "for"]
  explanation: string; // Brief explanation of why the correct answer is correct
  difficulty: 1 | 2 | 3;
}

export interface Topic {
  id: string; // "prepositions"
  title: string; // "Prepositions"
  subtitle: string; // "§ I. — Now Accepting Pupils"
  description: string; // Ironic description
  available: boolean;
}

/** Persisted to localStorage per topic */
export interface GameState {
  topicId: string;
  deck: string[]; // Card IDs remaining
  penaltyBox: Record<string, number>; // cardId → correct answers still needed (starts at 3)
  stats: {
    streak: number;
    bestStreak: number;
    totalCorrect: number;
    totalWrong: number;
    sessionStartedAt: string;
  };
}
