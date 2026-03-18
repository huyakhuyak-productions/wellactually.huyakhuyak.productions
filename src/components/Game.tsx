"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Card, GameState } from "@/lib/types";
import { initGame, drawCard, answerCard } from "@/lib/engine";
import { saveGame, loadGame } from "@/lib/storage";
import { getRandomPraise } from "@/lib/praise";
import GameCard from "./GameCard";
import BullyMessage from "./BullyMessage";
import PraiseMessage from "./PraiseMessage";
import StatsBar from "./StatsBar";

interface GameProps {
  topicId: string;
  cards: Card[];
}

type FeedbackState =
  | { type: "none" }
  | { type: "correct"; message: string }
  | {
      type: "wrong";
      sentence: string;
      correct: string;
      wrong: string;
      mistakeCount: number;
      streak: number;
    };

function initializeGame(topicId: string, allCardIds: string[]): { state: GameState; cardId: string } {
  let state: GameState | null = null;

  try {
    state = loadGame(topicId);
  } catch {
    // Corrupted localStorage — start fresh
  }

  // Validate loaded state has a non-empty deck with valid IDs
  if (state && state.deck.length === 0 && Object.keys(state.penaltyBox).length === 0) {
    state = null;
  }

  if (!state) {
    state = initGame(topicId, allCardIds);
  }

  const [cardId, newState] = drawCard(state, allCardIds);
  saveGame(newState);
  return { state: newState, cardId };
}

export default function Game({ topicId, cards: initialCards }: GameProps) {
  const cardMapRef = useRef(new Map(initialCards.map((c) => [c.id, c])));
  const allCardIdsRef = useRef(initialCards.map((c) => c.id));
  const fetchingCardsRef = useRef(false);

  // Initialize synchronously — no useEffect delay
  const [{ state: initialState, cardId: initialCardId }] = useState(() =>
    initializeGame(topicId, allCardIdsRef.current),
  );

  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentCardId, setCurrentCardId] = useState<string>(initialCardId);
  const [feedback, setFeedback] = useState<FeedbackState>({ type: "none" });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Fetch new AI-generated cards when the deck is getting low
  const maybeGenerateCards = useCallback(async (deckLength: number) => {
    if (fetchingCardsRef.current || deckLength > 10) return;
    fetchingCardsRef.current = true;

    try {
      const response = await fetch("/api/generate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          existingIds: allCardIdsRef.current,
        }),
      });

      if (!response.ok) return;

      const { cards: newCards } = (await response.json()) as {
        cards: Card[];
      };
      if (!newCards?.length) return;

      for (const card of newCards) {
        if (!cardMapRef.current.has(card.id)) {
          cardMapRef.current.set(card.id, card);
          allCardIdsRef.current.push(card.id);
        }
      }
    } catch {
      // Silently fail — AI generation is a nice-to-have
    } finally {
      fetchingCardsRef.current = false;
    }
  }, []);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (!currentCardId || selectedAnswer) return;

      const card = cardMapRef.current.get(currentCardId);
      if (!card) return;

      const isCorrect = answer === card.correct;
      setSelectedAnswer(answer);

      const newState = answerCard(gameState, currentCardId, isCorrect);
      setGameState(newState);
      saveGame(newState);

      maybeGenerateCards(newState.deck.length);

      if (isCorrect) {
        setFeedback({ type: "correct", message: getRandomPraise() });
      } else {
        setFeedback({
          type: "wrong",
          sentence: card.sentence,
          correct: card.correct,
          wrong: answer,
          mistakeCount: newState.stats.totalWrong,
          streak: gameState.stats.streak,
        });
      }
    },
    [gameState, currentCardId, selectedAnswer, maybeGenerateCards],
  );

  const handleNext = useCallback(() => {
    const [cardId, newState] = drawCard(gameState, allCardIdsRef.current);
    setGameState(newState);
    setCurrentCardId(cardId);
    setFeedback({ type: "none" });
    setSelectedAnswer(null);
    saveGame(newState);
  }, [gameState]);

  // Keyboard shortcut: Enter or Space to advance
  useEffect(() => {
    if (!selectedAnswer) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAnswer, handleNext]);

  const handleReset = useCallback(() => {
    const state = initGame(topicId, allCardIdsRef.current);
    const [cardId, newState] = drawCard(state, allCardIdsRef.current);
    setGameState(newState);
    setCurrentCardId(cardId);
    setFeedback({ type: "none" });
    setSelectedAnswer(null);
    saveGame(newState);
  }, [topicId]);

  const currentCard = cardMapRef.current.get(currentCardId);
  if (!currentCard) {
    // Card ID from saved state no longer exists — reset game
    const state = initGame(topicId, allCardIdsRef.current);
    const [cardId, newState] = drawCard(state, allCardIdsRef.current);
    return (
      <div className="text-center py-20">
        <p className="text-[var(--color-text-muted)] italic">
          The examiner discovers outdated papers and fetches new ones…
        </p>
        <button
          onClick={() => {
            setGameState(newState);
            setCurrentCardId(cardId);
            setFeedback({ type: "none" });
            setSelectedAnswer(null);
            saveGame(newState);
          }}
          className="mt-4 py-2 px-6 border-2 border-[var(--color-border-dark)] text-sm small-caps tracking-widest hover:bg-[var(--color-highlight)] transition-colors cursor-pointer"
        >
          Begin Afresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatsBar
        streak={gameState.stats.streak}
        bestStreak={gameState.stats.bestStreak}
        totalCorrect={gameState.stats.totalCorrect}
        totalWrong={gameState.stats.totalWrong}
        remaining={gameState.deck.length}
        penaltyCount={Object.keys(gameState.penaltyBox).length}
      />

      <GameCard
        card={currentCard}
        onAnswer={handleAnswer}
        disabled={selectedAnswer !== null}
        selectedAnswer={selectedAnswer}
      />

      {feedback.type === "correct" && (
        <PraiseMessage message={feedback.message} />
      )}
      {feedback.type === "wrong" && (
        <BullyMessage
          sentence={feedback.sentence}
          correct={feedback.correct}
          wrong={feedback.wrong}
          mistakeCount={feedback.mistakeCount}
          streak={feedback.streak}
        />
      )}

      {selectedAnswer && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="py-3 px-8 border-2 border-[var(--color-border-dark)] text-sm small-caps tracking-widest hover:bg-[var(--color-highlight)] transition-colors cursor-pointer"
          >
            Proceed to Next Question →
          </button>
        </div>
      )}

      <div className="text-center pt-4">
        <button
          onClick={handleReset}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer underline"
        >
          Withdraw from examination &amp; begin afresh
        </button>
      </div>
    </div>
  );
}
