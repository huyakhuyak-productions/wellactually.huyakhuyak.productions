import { describe, expect, test } from "bun:test";
import { prepositionCards } from "../cards/prepositions";

describe("card data integrity", () => {
  test("all cards have unique IDs", () => {
    const ids = prepositionCards.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test("every sentence contains a blank (____)", () => {
    for (const card of prepositionCards) {
      expect(card.sentence).toContain("____");
    }
  });

  test("every card has exactly 3 distractors", () => {
    for (const card of prepositionCards) {
      expect(card.distractors).toHaveLength(3);
    }
  });

  test("correct answer is not among distractors", () => {
    for (const card of prepositionCards) {
      expect(card.distractors).not.toContain(card.correct);
    }
  });

  test("no duplicate distractors within a card", () => {
    for (const card of prepositionCards) {
      const unique = new Set(card.distractors);
      expect(unique.size).toBe(card.distractors.length);
    }
  });

  test("difficulty is 1, 2, or 3", () => {
    for (const card of prepositionCards) {
      expect([1, 2, 3]).toContain(card.difficulty);
    }
  });

  test("has the expected number of cards", () => {
    expect(prepositionCards.length).toBe(300);
  });

  test("all cards have non-empty explanations", () => {
    for (const card of prepositionCards) {
      expect(card.explanation.length).toBeGreaterThan(0);
    }
  });
});
