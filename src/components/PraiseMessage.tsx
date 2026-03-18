"use client";

export default function PraiseMessage({ message }: { message: string }) {
  return (
    <div className="text-center py-4 animate-fade-in">
      <p className="text-lg italic text-[var(--color-text-muted)]">
        {message}
      </p>
    </div>
  );
}
