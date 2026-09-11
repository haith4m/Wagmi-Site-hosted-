import Link from "next/link";

export function CommunityJoin() {
  return (
    <section className="mt-24 rounded-sm border border-line bg-surface p-8 sm:p-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="kicker kicker--beige">JOIN US</p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Ready to run with us?
          </h2>
          <p className="mt-3 text-base text-muted">
            Turn up on a Monday at 7PM at North Greenwich. No sign-up, no fee, no pressure.
            Just show up and say hello.
          </p>
        </div>
        <Link
          href="/runs"
          className="shrink-0 inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-sm font-semibold uppercase tracking-wider text-background hover:bg-foreground/90 transition-colors"
        >
          View runs
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
