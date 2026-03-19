"use client";

import { useEffect, useState } from "react";

export default function PraiseMessage({ message }: { message: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(message.slice(0, i));
      if (i >= message.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [message]);

  return (
    <div className="text-center py-4 animate-fade-in">
      <p className="text-lg italic text-[var(--color-text-muted)]">
        {displayed}
      </p>
    </div>
  );
}
