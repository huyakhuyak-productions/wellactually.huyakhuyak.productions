"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Card } from "@/lib/types";
import { initGame, drawCard, answerCard } from "@/lib/engine";
import { saveGame, loadGame, clearGame } from "@/lib/storage";
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

type GameData = {
  state: ReturnType<typeof initGame>;
  cardId: string;
};

export default function Game({ topicId, cards }: GameProps) {
  const cardMap = useMemo(
    () => new Map(cards.map((c) => [c.id, c])),
    [cards],
  );
  const allCardIds = useMemo(() => cards.map((c) => c.id), [cards]);

  // Lazy init: loads from localStorage or creates fresh game with shuffled deck.
  const [game, setGame] = useState<GameData>(() => {
    const validIds = new Set(allCardIds);
    let state = loadGame(topicId);

    if (state) {
      const stale = state.deck.some((id) => !validIds.has(id));
      const empty =
        state.deck.length === 0 &&
        Object.keys(state.penaltyBox).length === 0;
      if (stale || empty) {
        clearGame(topicId);
        state = null;
      }
    }

    if (!state) {
      state = initGame(topicId, allCardIds);
    }

    const [cardId, drawn] = drawCard(state, allCardIds);
    saveGame(drawn);
    return { state: drawn, cardId };
  });

  const [feedback, setFeedback] = useState<FeedbackState>({ type: "none" });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const advance = useCallback(() => {
    const [cardId, newState] = drawCard(game.state, allCardIds);
    setGame({ state: newState, cardId });
    setFeedback({ type: "none" });
    setSelectedAnswer(null);
    saveGame(newState);
  }, [game.state, allCardIds]);

  const reset = useCallback(() => {
    clearGame(topicId);
    const fresh = initGame(topicId, allCardIds);
    const [cardId, newState] = drawCard(fresh, allCardIds);
    setGame({ state: newState, cardId });
    setFeedback({ type: "none" });
    setSelectedAnswer(null);
    saveGame(newState);
  }, [topicId, allCardIds]);

  const answer = useCallback(
    (choice: string) => {
      if (selectedAnswer) return;
      const card = cardMap.get(game.cardId);
      if (!card) return;

      const isCorrect = choice === card.correct;
      setSelectedAnswer(choice);

      const newState = answerCard(game.state, game.cardId, isCorrect);
      setGame((g) => ({ ...g, state: newState }));
      saveGame(newState);

      if (!fetchingRef.current && newState.deck.length < 10) {
        fetchingRef.current = true;
        fetch("/api/generate-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ existingIds: allCardIds }),
        })
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (data?.cards) {
              for (const c of data.cards as Card[]) {
                if (!cardMap.has(c.id)) {
                  cardMap.set(c.id, c);
                  allCardIds.push(c.id);
                }
              }
            }
          })
          .catch(() => {})
          .finally(() => { fetchingRef.current = false; });
      }

      if (isCorrect) {
        setFeedback({ type: "correct", message: getRandomPraise() });
      } else {
        setFeedback({
          type: "wrong",
          sentence: card.sentence,
          correct: card.correct,
          wrong: choice,
          mistakeCount: newState.stats.totalWrong,
          streak: game.state.stats.streak,
        });
      }
    },
    [game, selectedAnswer, cardMap, allCardIds],
  );

  useEffect(() => {
    if (!selectedAnswer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedAnswer, advance]);

  const currentCard = cardMap.get(game.cardId);
  if (!currentCard) {
    reset();
    return null;
  }

  return (
    <div className="space-y-6">
      <StatsBar
        streak={game.state.stats.streak}
        bestStreak={game.state.stats.bestStreak}
        totalCorrect={game.state.stats.totalCorrect}
        totalWrong={game.state.stats.totalWrong}
        remaining={game.state.deck.length}
        penaltyCount={Object.keys(game.state.penaltyBox).length}
      />

      <GameCard
        card={currentCard}
        onAnswer={answer}
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
            onClick={advance}
            className="py-3 px-8 border-2 border-[var(--color-border-dark)] text-sm small-caps tracking-widest hover:bg-[var(--color-highlight)] transition-colors cursor-pointer"
          >
            Proceed to Next Question →
          </button>
        </div>
      )}

      <div className="text-center pt-4">
        <button
          onClick={reset}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer underline"
        >
          Withdraw from examination &amp; begin afresh
        </button>
      </div>
    </div>
  );
}
