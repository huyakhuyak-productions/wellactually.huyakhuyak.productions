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
          <p className="small-caps text-xs tracking-widest text-[var(--color-text-muted)] mb-1">
            {topic.subtitle}
          </p>
          <h2 className="text-2xl font-bold">{topic.title}</h2>
        </div>

        <Game topicId={topicId} cards={cards} />
      </main>
    </>
  );
}
