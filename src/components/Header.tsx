import Link from "next/link";

export default function Header() {
  return (
    <header className="academic-border-bottom py-6">
      <div className="parchment-container text-center">
        <p className="text-xs tracking-[0.3em] text-[var(--color-text-muted)] small-caps mb-1">
          The Quarterly Journal of Unsolicited Correction
        </p>
        <Link href="/" className="!no-underline">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text)] italic">
            Well, Actually.
          </h1>
        </Link>
        <p className="masthead-subtitle mt-3">
          Vol. I&ensp;•&ensp;№ 1&ensp;•&ensp;Lent Term,
          MMXXVI&ensp;•&ensp;Price: One&rsquo;s Dignity
        </p>
        <p className="text-[0.6rem] tracking-[0.2em] text-[var(--color-text-muted)] mt-1 uppercase">
          Established in perpetuity for the correction of those who did not ask
        </p>
      </div>
    </header>
  );
}
