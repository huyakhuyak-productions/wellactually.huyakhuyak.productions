import type { GameState } from "./types";

/**
 * Fisher-Yates (Knuth) shuffle — returns a new shuffled array.
 */
function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Initialize a new game for a topic with all card IDs shuffled into the deck.
 */
export function initGame(topicId: string, cardIds: string[]): GameState {
  return {
    topicId,
    deck: shuffle(cardIds),
    penaltyBox: {},
    stats: {
      streak: 0,
      bestStreak: 0,
      totalCorrect: 0,
      totalWrong: 0,
      sessionStartedAt: new Date().toISOString(),
    },
  };
}

/**
 * Draw the next card from the deck.
 * If the deck is empty, reshuffle first.
 * Returns [cardId, updatedState].
 */
export function drawCard(
  state: GameState,
  allCardIds: string[],
): [string, GameState] {
  let current = state;

  if (current.deck.length === 0) {
    current = reshuffleDeck(current, allCardIds);
  }

  const [cardId, ...remaining] = current.deck;
  return [
    cardId,
    {
      ...current,
      deck: remaining,
    },
  ];
}

/**
 * Handle an answer. Returns updated GameState.
 *
 * Correct:
 *   - If card is in penalty box: decrement counter. Remove from box when it reaches 0.
 *   - Increment streak, totalCorrect. Update bestStreak if needed.
 *
 * Wrong:
 *   - Add/reset card in penalty box with counter = 3.
 *   - Re-insert card ID into deck at a random position between index 3-7 from the front.
 *   - Reset streak to 0, increment totalWrong.
 */
export function answerCard(
  state: GameState,
  cardId: string,
  correct: boolean,
): GameState {
  if (correct) {
    const newStreak = state.stats.streak + 1;
    const newPenaltyBox = { ...state.penaltyBox };

    if (cardId in newPenaltyBox) {
      newPenaltyBox[cardId] -= 1;
      if (newPenaltyBox[cardId] <= 0) {
        delete newPenaltyBox[cardId];
      }
    }

    return {
      ...state,
      penaltyBox: newPenaltyBox,
      stats: {
        ...state.stats,
        streak: newStreak,
        bestStreak: Math.max(state.stats.bestStreak, newStreak),
        totalCorrect: state.stats.totalCorrect + 1,
      },
    };
  }

  // Wrong answer
  const newPenaltyBox = { ...state.penaltyBox, [cardId]: 3 };

  // Re-insert card into deck at a random position between index 3-7
  const newDeck = [...state.deck];
  const maxInsertIndex = Math.min(7, newDeck.length);
  const minInsertIndex = Math.min(3, newDeck.length);
  const insertIndex =
    minInsertIndex +
    Math.floor(Math.random() * (maxInsertIndex - minInsertIndex + 1));
  newDeck.splice(insertIndex, 0, cardId);

  return {
    ...state,
    deck: newDeck,
    penaltyBox: newPenaltyBox,
    stats: {
      ...state.stats,
      streak: 0,
      totalWrong: state.stats.totalWrong + 1,
    },
  };
}

/**
 * Reshuffle the deck from the full card bank, then inject penalty box cards
 * at random positions throughout the deck so they appear more often.
 */
export function reshuffleDeck(
  state: GameState,
  allCardIds: string[],
): GameState {
  const newDeck = shuffle(allCardIds);

  // Inject penalty box cards at random positions
  const penaltyCardIds = Object.keys(state.penaltyBox);
  for (const penaltyId of penaltyCardIds) {
    const insertIndex = Math.floor(Math.random() * (newDeck.length + 1));
    newDeck.splice(insertIndex, 0, penaltyId);
  }

  return {
    ...state,
    deck: newDeck,
  };
}
