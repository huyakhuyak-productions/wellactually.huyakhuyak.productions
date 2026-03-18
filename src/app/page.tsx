import Header from "@/components/Header";
import TopicCard from "@/components/TopicCard";
import { topics } from "@/lib/topics";

export default function Home() {
  return (
    <>
      <Header />

      <main className="parchment-container py-10 flex-1">
        <div className="text-center mb-12">
          <p className="text-xs small-caps tracking-[0.25em] text-[var(--color-text-muted)] mb-6">
            A Foreword from the Editors
          </p>
          <p className="drop-cap text-lg leading-relaxed max-w-2xl mx-auto">
            One observes, with a weariness bordering on the existential, that
            the English language is in a state of quite advanced decomposition.
            The culprits are not, as one might charitably suppose, foreign
            influences — no, the rot is entirely homegrown. We have therefore
            taken it upon ourselves, at considerable personal inconvenience, to
            construct a programme of remedial correction for those who persist in
            treating prepositions as though they were interchangeable seasoning.
          </p>
          <div className="fleuron" />
          <p className="text-sm italic text-[var(--color-text-muted)] max-w-lg mx-auto">
            You are not here because you are good at English. You are here
            because someone, at some point, failed you — and we intend to
            rectify the matter with all the gentleness of a Latin exam.
          </p>
        </div>

        <div className="text-center mb-6">
          <p className="text-xs small-caps tracking-[0.25em] text-[var(--color-text-muted)]">
            § — Syllabus — §
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>

        <footer className="mt-20 text-center">
          <hr className="rule-thin max-w-xs mx-auto mb-6" />
          <p className="text-[0.65rem] text-[var(--color-text-muted)] small-caps tracking-[0.2em] mb-2">
            A Huyakhuyak Productions Endeavour
          </p>
          <p className="text-[0.65rem] text-[var(--color-text-muted)] italic max-w-sm mx-auto">
            Published for the Betterment of the English-Speaking World, whether
            it wishes to be bettered or not.
          </p>
          <p className="text-[var(--color-text-muted)] mt-3 text-sm">❧</p>
          <p className="text-[0.6rem] text-[var(--color-text-muted)] tracking-widest mt-1">
            MMXXVI&ensp;•&ensp;ALL WRONGS RESERVED
          </p>
        </footer>
      </main>
    </>
  );
}
