"use client";

interface StatsBarProps {
  streak: number;
  bestStreak: number;
  totalCorrect: number;
  totalWrong: number;
  remaining: number;
  penaltyCount: number;
}

export default function StatsBar({
  streak,
  bestStreak,
  totalCorrect,
  totalWrong,
  remaining,
  penaltyCount,
}: StatsBarProps) {
  return (
    <div className="academic-border py-3 px-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs small-caps tracking-widest text-[var(--color-text-muted)]">
      <span>
        Streak:{" "}
        <strong className="text-[var(--color-text)]">{streak}</strong>
      </span>
      <span>
        Best:{" "}
        <strong className="text-[var(--color-text)]">{bestStreak}</strong>
      </span>
      <span>
        Correct:{" "}
        <strong className="text-[var(--color-text)]">{totalCorrect}</strong>
      </span>
      <span>
        Blunders:{" "}
        <strong className="text-[var(--color-accent)]">{totalWrong}</strong>
      </span>
      <span>
        Remaining:{" "}
        <strong className="text-[var(--color-text)]">{remaining}</strong>
      </span>
      {penaltyCount > 0 && (
        <span>
          Penalty Box:{" "}
          <strong className="text-[var(--color-accent)]">
            {penaltyCount}
          </strong>
        </span>
      )}
    </div>
  );
}
