import Link from "next/link";

export default function Header() {
  return (
    <header className="academic-border-bottom py-6">
      <div className="parchment-container text-center">
        <Link href="/" className="!no-underline">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text)]">
            Well, Actually.
          </h1>
        </Link>

        <p className="masthead-subtitle mt-2">
          Vol. I&ensp;•&ensp;№ 1&ensp;•&ensp;Lent Term,
          MMXXVI&ensp;•&ensp;Price: One&rsquo;s Dignity
        </p>
      </div>
    </header>
  );
}
