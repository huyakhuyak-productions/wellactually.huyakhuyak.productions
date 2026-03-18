"use client";

import { useEffect, useState } from "react";

interface BullyMessageProps {
  sentence: string;
  correct: string;
  wrong: string;
  mistakeCount: number;
  streak: number;
}

export default function BullyMessage({
  sentence,
  correct,
  wrong,
  mistakeCount,
  streak,
}: BullyMessageProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRoast() {
      try {
        const response = await fetch("/api/bully", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sentence, correct, wrong, mistakeCount, streak }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          setError(true);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setText(accumulated);
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(true);
        }
      }
    }

    fetchRoast();
    return () => controller.abort();
  }, [sentence, correct, wrong, mistakeCount, streak]);

  if (error) {
    return (
      <div className="text-center py-4 animate-fade-in">
        <p className="text-lg italic text-[var(--color-accent)]">
          Good heavens. The word was &ldquo;{correct},&rdquo; not &ldquo;
          {wrong}.&rdquo; One would have thought that much was obvious.
        </p>
      </div>
    );
  }

  if (!text) {
    return (
      <div className="text-center py-4">
        <p className="text-sm italic text-[var(--color-text-muted)] animate-pulse">
          The examiner composes a response…
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-4 animate-fade-in">
      <p className="text-lg italic text-[var(--color-accent)]">{text}</p>
    </div>
  );
}
