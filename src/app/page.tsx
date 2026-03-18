import Header from "@/components/Header";
import TopicCard from "@/components/TopicCard";
import { topics } from "@/lib/topics";

export default function Home() {
  return (
    <>
      <Header />

      <main className="parchment-container py-10 flex-1">
        <div className="text-center mb-10">
          <p className="drop-cap text-lg leading-relaxed max-w-2xl mx-auto">
            One observes, with no small measure of dismay, that the English
            language is under siege. Not from without — no, the threat is
            decidedly domestic. Herein, we propose a remedy: rigorous,
            repetitive, and utterly merciless examination of one&rsquo;s
            grammatical competence.
          </p>
          <div className="fleuron" />
          <p className="text-sm italic text-[var(--color-text-muted)]">
            Select a topic below and prepare to be humbled.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>

        <footer className="mt-16 text-center">
          <hr className="rule-thin max-w-xs mx-auto mb-6" />
          <p className="text-xs text-[var(--color-text-muted)] small-caps tracking-widest">
            A Huyakhuyak Productions Endeavour
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            ❧ Published for the Betterment of the English-Speaking World ❧
          </p>
        </footer>
      </main>
    </>
  );
}
