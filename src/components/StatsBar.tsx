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
    <div className="academic-border py-3 px-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-[0.65rem] small-caps tracking-[0.15em] text-[var(--color-text-muted)]">
      <span>
        Consecutive Adequacies:{" "}
        <strong className="text-[var(--color-text)]">{streak}</strong>
      </span>
      <span>
        Personal Best:{" "}
        <strong className="text-[var(--color-text)]">{bestStreak}</strong>
      </span>
      <span>
        Marks:{" "}
        <strong className="text-[var(--color-text)]">{totalCorrect}</strong>
      </span>
      <span>
        Disgraces:{" "}
        <strong className="text-[var(--color-accent)]">{totalWrong}</strong>
      </span>
      <span>
        Papers Remaining:{" "}
        <strong className="text-[var(--color-text)]">{remaining}</strong>
      </span>
      {penaltyCount > 0 && (
        <span>
          In Detention:{" "}
          <strong className="text-[var(--color-accent)]">
            {penaltyCount}
          </strong>
        </span>
      )}
    </div>
  );
}
