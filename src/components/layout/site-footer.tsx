import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-background text-foreground">
      <div className="rule-t">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="font-display text-6xl leading-[0.85] sm:text-7xl">
              WAGMI
            </p>
            <p className="font-script -mt-3 ml-24 -rotate-3 text-4xl text-foreground sm:ml-32">
              Club
            </p>
            <p className="mt-4 font-kicker text-[11px] uppercase tracking-[0.28em] text-foreground/50">
              We&apos;re all gonna make it
            </p>
            <p className="mt-6 max-w-sm text-sm leading-6 text-foreground/55">
              Running. Community. Progress. For a better tomorrow. London and beyond.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/40">Club</p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Link href="/events" className="text-foreground/70 transition hover:text-accent">Runs</Link>
                <Link href="/community" className="text-foreground/70 transition hover:text-accent">Feed</Link>
                <Link href="/gallery" className="text-foreground/70 transition hover:text-accent">Photos</Link>
                <Link href="/dashboard" className="text-foreground/70 transition hover:text-accent">Dashboard</Link>
              </div>
            </div>
            <div>
              <p className="font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/40">Run</p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Link href="/events" className="text-foreground/70 transition hover:text-accent">Next session</Link>
                <Link href="/login" className="text-foreground/70 transition hover:text-accent">Sign in</Link>
                <Link href="/signup" className="text-foreground/70 transition hover:text-accent">Join the club</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/10 bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 font-kicker text-[11px] uppercase tracking-[0.22em] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>WAGMI Club — Community moves differently</p>
          <p>London and beyond — © 2026</p>
        </div>
      </div>
    </footer>
  );
}
