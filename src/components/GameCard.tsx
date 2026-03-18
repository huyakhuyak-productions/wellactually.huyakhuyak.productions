"use client";

import { useMemo } from "react";
import type { Card } from "@/lib/types";

interface GameCardProps {
  card: Card;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  selectedAnswer: string | null;
}

export default function GameCard({
  card,
  onAnswer,
  disabled,
  selectedAnswer,
}: GameCardProps) {
  const options = useMemo(() => {
    const all = [card.correct, ...card.distractors];
    // Fisher-Yates shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  const sentenceParts = card.sentence.split("____");

  return (
    <div className="card-surface p-8 max-w-2xl mx-auto">
      <p className="text-xs small-caps tracking-widest text-[var(--color-text-muted)] mb-4">
        Complete the sentence
      </p>

      <p className="text-xl leading-relaxed mb-8 text-center">
        {sentenceParts[0]}
        <span className="inline-block min-w-[4rem] border-b-2 border-[var(--color-border-dark)] mx-1 text-center font-bold text-[var(--color-accent)]">
          {selectedAnswer ?? "\u00A0"}
        </span>
        {sentenceParts[1]}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          let buttonClass =
            "py-3 px-4 border-2 text-base font-medium transition-all duration-200 cursor-pointer ";

          if (selectedAnswer) {
            if (option === card.correct) {
              buttonClass +=
                "border-green-700 bg-green-50 text-green-800 ";
            } else if (option === selectedAnswer) {
              buttonClass +=
                "border-[var(--color-accent)] bg-red-50 text-[var(--color-accent)] ";
            } else {
              buttonClass +=
                "border-[var(--color-border)] text-[var(--color-text-muted)] opacity-50 ";
            }
          } else {
            buttonClass +=
              "border-[var(--color-border)] hover:border-[var(--color-border-dark)] hover:bg-[var(--color-highlight)] ";
          }

          return (
            <button
              key={option}
              onClick={() => onAnswer(option)}
              disabled={disabled}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer && (
        <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            <strong className="text-[var(--color-text)]">
              {card.correct}
            </strong>{" "}
            — {card.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
