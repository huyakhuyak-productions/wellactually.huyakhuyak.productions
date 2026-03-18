import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Game from "@/components/Game";
import { topics } from "@/lib/topics";
import { prepositionCards } from "@/lib/cards/prepositions";
import type { Card } from "@/lib/types";
import type { Metadata } from "next";

const cardsByTopic: Record<string, Card[]> = {
  prepositions: prepositionCards,
};

type Props = {
  params: Promise<{ topic: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) return { title: "Not Found — Well, Actually." };

  return {
    title: `${topic.title} — Well, Actually.`,
    description: topic.description,
  };
}

export default async function PlayPage({ params }: Props) {
  const { topic: topicId } = await params;

  const topic = topics.find((t) => t.id === topicId && t.available);
  if (!topic) notFound();

  const cards = cardsByTopic[topicId];
  if (!cards || cards.length === 0) notFound();

  return (
    <>
      <Header />
      <main className="parchment-container py-8 flex-1">
        <div className="text-center mb-8">
          <p className="small-caps text-xs tracking-[0.25em] text-[var(--color-text-muted)] mb-1">
            {topic.subtitle}
          </p>
          <h2 className="text-2xl font-bold">{topic.title}</h2>
          <p className="text-[0.6rem] tracking-[0.15em] text-[var(--color-text-muted)] mt-2 uppercase">
            Candidates are reminded that all answers are final and excuses will not be entertained
          </p>
        </div>

        <Game topicId={topicId} cards={cards} />
      </main>
    </>
  );
}
