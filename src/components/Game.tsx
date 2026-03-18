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

export default function Game({ topicId, cards: initialCards }: GameProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>({ type: "none" });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const initializedRef = useRef(false);
  const fetchingCardsRef = useRef(false);

  const cardsRef = useRef(initialCards);
  const cardMapRef = useRef(new Map(initialCards.map((c) => [c.id, c])));
  const allCardIdsRef = useRef(initialCards.map((c) => c.id));

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

      // Add new cards to the pool
      for (const card of newCards) {
        if (!cardMapRef.current.has(card.id)) {
          cardsRef.current.push(card);
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

  // Initialize game on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    let state = loadGame(topicId);
    if (!state) {
      state = initGame(topicId, allCardIdsRef.current);
    }

    const [cardId, newState] = drawCard(state, allCardIdsRef.current);
    setGameState(newState);
    setCurrentCardId(cardId);
    saveGame(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (!gameState || !currentCardId || selectedAnswer) return;

      const card = cardMapRef.current.get(currentCardId);
      if (!card) return;

      const isCorrect = answer === card.correct;
      setSelectedAnswer(answer);

      const newState = answerCard(gameState, currentCardId, isCorrect);
      setGameState(newState);
      saveGame(newState);

      // Try to generate more cards when deck is getting low
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
    if (!gameState) return;

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

  if (!gameState || !currentCardId) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--color-text-muted)] italic animate-pulse">
          The examiner shuffles the papers…
        </p>
      </div>
    );
  }

  const currentCard = cardMapRef.current.get(currentCardId);
  if (!currentCard) return null;

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
