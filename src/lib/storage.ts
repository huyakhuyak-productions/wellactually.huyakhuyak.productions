import type { GameState } from "./types";

const STORAGE_KEY_PREFIX = "wellactually_";

function storageKey(topicId: string): string {
  return `${STORAGE_KEY_PREFIX}${topicId}`;
}

/**
 * Save the current game state to localStorage.
 */
export function saveGame(state: GameState): void {
  try {
    localStorage.setItem(storageKey(state.topicId), JSON.stringify(state));
  } catch {
    // localStorage may be unavailable (SSR, private browsing quota exceeded, etc.)
    console.warn("Failed to save game state to localStorage");
  }
}

/**
 * Load a saved game state from localStorage.
 * Returns null if no saved state exists or if parsing fails.
 */
export function loadGame(topicId: string): GameState | null {
  try {
    const raw = localStorage.getItem(storageKey(topicId));
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

/**
 * Clear the saved game state for a topic.
 */
export function clearGame(topicId: string): void {
  try {
    localStorage.removeItem(storageKey(topicId));
  } catch {
    // Silently ignore — localStorage may be unavailable
  }
}
