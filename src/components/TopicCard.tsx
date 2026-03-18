import Link from "next/link";
import type { Topic } from "@/lib/types";

export default function TopicCard({ topic }: { topic: Topic }) {
  if (!topic.available) {
    return (
      <div className="card-surface p-6 opacity-60">
        <p className="small-caps text-xs tracking-widest text-[var(--color-text-muted)] mb-2">
          {topic.subtitle}
        </p>
        <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
        <p className="text-sm text-[var(--color-text-muted)] italic mb-4">
          {topic.description}
        </p>
        <p className="text-xs small-caps tracking-widest text-[var(--color-text-muted)]">
          — Forthcoming —
        </p>
      </div>
    );
  }

  return (
    <Link
      href={`/play/${topic.id}`}
      className="block card-surface p-6 transition-all duration-200 hover:shadow-lg hover:border-[var(--color-border-dark)] !no-underline"
    >
      <p className="small-caps text-xs tracking-widest text-[var(--color-text-muted)] mb-2">
        {topic.subtitle}
      </p>
      <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">
        {topic.title}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] italic mb-4">
        {topic.description}
      </p>
      <p className="text-xs small-caps tracking-widest text-[var(--color-accent)]">
        Begin Examination →
      </p>
    </Link>
  );
}
