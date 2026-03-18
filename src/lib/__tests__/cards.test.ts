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

  test("difficulty is 1, 2, 3, 4, or 5", () => {
    for (const card of prepositionCards) {
      expect([1, 2, 3, 4, 5]).toContain(card.difficulty);
    }
  });

  test("has at least 300 cards", () => {
    expect(prepositionCards.length).toBeGreaterThanOrEqual(300);
  });

  test("includes hard (4) and extra hard (5) cards", () => {
    const hard = prepositionCards.filter((c) => c.difficulty === 4);
    const extraHard = prepositionCards.filter((c) => c.difficulty === 5);
    expect(hard.length).toBeGreaterThan(0);
    expect(extraHard.length).toBeGreaterThan(0);
  });

  test("all cards have non-empty explanations", () => {
    for (const card of prepositionCards) {
      expect(card.explanation.length).toBeGreaterThan(0);
    }
  });
});
