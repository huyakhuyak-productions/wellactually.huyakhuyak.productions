import { describe, expect, test } from "bun:test";
import { answerCard, drawCard, initGame, reshuffleDeck } from "../engine";
import type { GameState } from "../types";

const CARD_IDS = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10"];

describe("initGame", () => {
  test("creates valid state with all card IDs in the deck", () => {
    const state = initGame("prepositions", CARD_IDS);

    expect(state.topicId).toBe("prepositions");
    expect(state.deck).toHaveLength(CARD_IDS.length);
    expect(state.deck.toSorted()).toEqual(CARD_IDS.toSorted());
    expect(state.penaltyBox).toEqual({});
    expect(state.stats.streak).toBe(0);
    expect(state.stats.bestStreak).toBe(0);
    expect(state.stats.totalCorrect).toBe(0);
    expect(state.stats.totalWrong).toBe(0);
    expect(state.stats.sessionStartedAt).toBeTruthy();
  });

  test("creates a shuffled deck (not always identical to input order)", () => {
    // Run multiple inits — at least one should differ from the original order.
    // With 10 cards the probability of an identical order is 1/10! ~ 2.8e-7
    const results = Array.from({ length: 5 }, () =>
      initGame("prepositions", CARD_IDS).deck,
    );
    const allIdentical = results.every(
      (deck) => JSON.stringify(deck) === JSON.stringify(CARD_IDS),
    );
    expect(allIdentical).toBe(false);
  });
});

describe("drawCard", () => {
  test("pops the first card from the deck", () => {
    const state = initGame("prepositions", CARD_IDS);
    const expectedFirst = state.deck[0];
    const [cardId, newState] = drawCard(state, CARD_IDS);

    expect(cardId).toBe(expectedFirst);
    expect(newState.deck).toHaveLength(state.deck.length - 1);
    expect(newState.deck).not.toContain(expectedFirst);
  });

  test("does not mutate the original state", () => {
    const state = initGame("prepositions", CARD_IDS);
    const originalDeckLength = state.deck.length;
    drawCard(state, CARD_IDS);

    expect(state.deck).toHaveLength(originalDeckLength);
  });

  test("reshuffles when deck is empty", () => {
    const state: GameState = {
      topicId: "prepositions",
      deck: [],
      penaltyBox: {},
      stats: {
        streak: 3,
        bestStreak: 5,
        totalCorrect: 10,
        totalWrong: 2,
        sessionStartedAt: "2026-01-01T00:00:00.000Z",
      },
    };

    const [cardId, newState] = drawCard(state, CARD_IDS);

    expect(CARD_IDS).toContain(cardId);
    // After reshuffle and drawing one, deck should have allCardIds.length - 1 cards
    expect(newState.deck).toHaveLength(CARD_IDS.length - 1);
    // Stats should be preserved
    expect(newState.stats.streak).toBe(3);
    expect(newState.stats.totalCorrect).toBe(10);
  });
});

describe("answerCard — correct", () => {
  test("increments streak and totalCorrect", () => {
    const state = initGame("prepositions", CARD_IDS);
    const result = answerCard(state, "c1", true);

    expect(result.stats.streak).toBe(1);
    expect(result.stats.totalCorrect).toBe(1);
    expect(result.stats.totalWrong).toBe(0);
  });

  test("updates bestStreak when current streak exceeds it", () => {
    let state = initGame("prepositions", CARD_IDS);
    state = answerCard(state, "c1", true); // streak: 1, best: 1
    state = answerCard(state, "c2", true); // streak: 2, best: 2
    state = answerCard(state, "c3", true); // streak: 3, best: 3

    expect(state.stats.streak).toBe(3);
    expect(state.stats.bestStreak).toBe(3);
  });

  test("bestStreak is not reduced when streak resets", () => {
    let state = initGame("prepositions", CARD_IDS);
    state = answerCard(state, "c1", true); // streak: 1
    state = answerCard(state, "c2", true); // streak: 2
    state = answerCard(state, "c3", true); // streak: 3, best: 3
    state = answerCard(state, "c4", false); // streak: 0, best: 3
    state = answerCard(state, "c5", true); // streak: 1, best: 3

    expect(state.stats.streak).toBe(1);
    expect(state.stats.bestStreak).toBe(3);
  });

  test("decrements penalty box counter for penalized card", () => {
    let state = initGame("prepositions", CARD_IDS);
    // Put a card in the penalty box
    state = { ...state, penaltyBox: { c1: 3 } };

    state = answerCard(state, "c1", true);
    expect(state.penaltyBox["c1"]).toBe(2);

    state = answerCard(state, "c1", true);
    expect(state.penaltyBox["c1"]).toBe(1);
  });

  test("removes card from penalty box when counter reaches 0", () => {
    let state = initGame("prepositions", CARD_IDS);
    state = { ...state, penaltyBox: { c1: 1 } };

    state = answerCard(state, "c1", true);
    expect(state.penaltyBox["c1"]).toBeUndefined();
    expect(Object.keys(state.penaltyBox)).not.toContain("c1");
  });

  test("does not affect penalty box for non-penalized card", () => {
    let state = initGame("prepositions", CARD_IDS);
    state = { ...state, penaltyBox: { c2: 3 } };

    state = answerCard(state, "c1", true);
    expect(state.penaltyBox).toEqual({ c2: 3 });
  });
});

describe("answerCard — wrong", () => {
  test("resets streak to 0 and increments totalWrong", () => {
    let state = initGame("prepositions", CARD_IDS);
    state = answerCard(state, "c1", true); // streak: 1
    state = answerCard(state, "c2", true); // streak: 2
    state = answerCard(state, "c3", false); // streak: 0

    expect(state.stats.streak).toBe(0);
    expect(state.stats.totalWrong).toBe(1);
    expect(state.stats.totalCorrect).toBe(2);
  });

  test("adds card to penalty box with counter 3", () => {
    let state = initGame("prepositions", CARD_IDS);
    state = answerCard(state, "c1", false);

    expect(state.penaltyBox["c1"]).toBe(3);
  });

  test("resets counter to 3 for already-penalized card", () => {
    let state = initGame("prepositions", CARD_IDS);
    state = { ...state, penaltyBox: { c1: 1 } };

    state = answerCard(state, "c1", false);
    expect(state.penaltyBox["c1"]).toBe(3);
  });

  test("re-inserts card into deck at position 3-7", () => {
    // Use a deck long enough that we can verify position range
    const longCardIds = Array.from({ length: 20 }, (_, i) => `card${i}`);
    let state = initGame("prepositions", longCardIds);
    // Remove c1 from deck to ensure it's only in there from re-insertion
    state = { ...state, deck: state.deck.filter((id) => id !== "card0") };
    const deckLengthBefore = state.deck.length;

    state = answerCard(state, "card0", false);

    expect(state.deck).toHaveLength(deckLengthBefore + 1);
    expect(state.deck).toContain("card0");

    // The card should be somewhere in positions 3-7
    const insertedAt = state.deck.indexOf("card0");
    expect(insertedAt).toBeGreaterThanOrEqual(3);
    expect(insertedAt).toBeLessThanOrEqual(7);
  });

  test("handles re-insertion when deck is shorter than 3", () => {
    let state: GameState = {
      topicId: "prepositions",
      deck: ["c2"],
      penaltyBox: {},
      stats: {
        streak: 0,
        bestStreak: 0,
        totalCorrect: 0,
        totalWrong: 0,
        sessionStartedAt: "2026-01-01T00:00:00.000Z",
      },
    };

    state = answerCard(state, "c1", false);

    // Card should still be inserted into the deck
    expect(state.deck).toContain("c1");
    expect(state.deck).toHaveLength(2);
  });

  test("does not mutate the original state", () => {
    const state = initGame("prepositions", CARD_IDS);
    const originalDeck = [...state.deck];
    answerCard(state, "c1", false);

    expect(state.deck).toEqual(originalDeck);
    expect(state.penaltyBox).toEqual({});
    expect(state.stats.streak).toBe(0);
  });
});

describe("reshuffleDeck", () => {
  test("creates new deck from all card IDs", () => {
    const state: GameState = {
      topicId: "prepositions",
      deck: [],
      penaltyBox: {},
      stats: {
        streak: 5,
        bestStreak: 5,
        totalCorrect: 20,
        totalWrong: 3,
        sessionStartedAt: "2026-01-01T00:00:00.000Z",
      },
    };

    const result = reshuffleDeck(state, CARD_IDS);

    expect(result.deck).toHaveLength(CARD_IDS.length);
    expect(result.deck.toSorted()).toEqual(CARD_IDS.toSorted());
  });

  test("includes extra copies of penalty box cards", () => {
    const state: GameState = {
      topicId: "prepositions",
      deck: [],
      penaltyBox: { c1: 3, c3: 2 },
      stats: {
        streak: 0,
        bestStreak: 5,
        totalCorrect: 20,
        totalWrong: 3,
        sessionStartedAt: "2026-01-01T00:00:00.000Z",
      },
    };

    const result = reshuffleDeck(state, CARD_IDS);

    // Should have all cards + one extra copy each of c1 and c3
    expect(result.deck).toHaveLength(CARD_IDS.length + 2);

    // c1 should appear exactly twice (once from allCardIds, once from penalty box)
    const c1Count = result.deck.filter((id) => id === "c1").length;
    expect(c1Count).toBe(2);

    // c3 should appear exactly twice
    const c3Count = result.deck.filter((id) => id === "c3").length;
    expect(c3Count).toBe(2);
  });

  test("preserves stats and penalty box", () => {
    const state: GameState = {
      topicId: "prepositions",
      deck: [],
      penaltyBox: { c1: 2 },
      stats: {
        streak: 3,
        bestStreak: 7,
        totalCorrect: 15,
        totalWrong: 5,
        sessionStartedAt: "2026-01-01T00:00:00.000Z",
      },
    };

    const result = reshuffleDeck(state, CARD_IDS);

    expect(result.stats).toEqual(state.stats);
    expect(result.penaltyBox).toEqual(state.penaltyBox);
    expect(result.topicId).toBe("prepositions");
  });

  test("does not mutate the original state", () => {
    const state: GameState = {
      topicId: "prepositions",
      deck: ["c1"],
      penaltyBox: { c2: 3 },
      stats: {
        streak: 0,
        bestStreak: 0,
        totalCorrect: 0,
        totalWrong: 0,
        sessionStartedAt: "2026-01-01T00:00:00.000Z",
      },
    };

    reshuffleDeck(state, CARD_IDS);

    expect(state.deck).toEqual(["c1"]);
  });
});

describe("streak tracking", () => {
  test("bestStreak updates correctly across multiple streaks", () => {
    let state = initGame("prepositions", CARD_IDS);

    // First streak of 2
    state = answerCard(state, "c1", true);
    state = answerCard(state, "c2", true);
    expect(state.stats.bestStreak).toBe(2);

    // Break it
    state = answerCard(state, "c3", false);
    expect(state.stats.streak).toBe(0);
    expect(state.stats.bestStreak).toBe(2);

    // Second streak of 4 (beats the best)
    state = answerCard(state, "c4", true);
    state = answerCard(state, "c5", true);
    state = answerCard(state, "c6", true);
    state = answerCard(state, "c7", true);
    expect(state.stats.streak).toBe(4);
    expect(state.stats.bestStreak).toBe(4);

    // Break it again
    state = answerCard(state, "c8", false);
    expect(state.stats.streak).toBe(0);
    expect(state.stats.bestStreak).toBe(4);

    // Third streak of 1 (does not beat best)
    state = answerCard(state, "c9", true);
    expect(state.stats.streak).toBe(1);
    expect(state.stats.bestStreak).toBe(4);
  });

  test("stats accumulate correctly through many answers", () => {
    let state = initGame("prepositions", CARD_IDS);

    // 3 correct, 2 wrong, 1 correct
    state = answerCard(state, "c1", true);
    state = answerCard(state, "c2", true);
    state = answerCard(state, "c3", true);
    state = answerCard(state, "c4", false);
    state = answerCard(state, "c5", false);
    state = answerCard(state, "c6", true);

    expect(state.stats.totalCorrect).toBe(4);
    expect(state.stats.totalWrong).toBe(2);
    expect(state.stats.streak).toBe(1);
    expect(state.stats.bestStreak).toBe(3);
  });
});
