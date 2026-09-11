import Link from "next/link";
import { LinkButton } from "@/components/ui/button";

export const metadata = {
  title: "Runs — WAGMI Club",
  description: "WAGMI runs — Mondays at 7PM, North Greenwich. Free, all paces.",
};

export default function RunsPage() {
  const NEXT_RUN = {
    day: "Monday",
    time: "7:00 PM",
    location: "North Greenwich",
    details: "5K · Social · All paces",
    note: "Turn up, meet the crew, and run. No sign-up. No kit list.",
  };

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="kicker kicker--beige">Runs</p>
        <h1 className="mt-4 font-display text-[clamp(40px,7vw,80px)] leading-[0.88] tracking-tight text-foreground">
          When and where we run.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
          WAGMI runs are free, open to everyone, and designed to be inclusive. You don’t need to sign
          up, be fast, or bring special kit. Just turn up.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
            <Link href="/photos" className="block h-full w-full">
              <img
                src="/gallery/greenwich-dusk-riverside.jpg"
                alt="North Greenwich at dusk"
                className="h-full w-full photo-cover photo-authentic"
                fetchPriority="high"
              />
            </Link>
            <div className="absolute inset-0 photo-overlay opacity-60" />
            <div className="absolute left-4 top-4 font-kicker text-[11px] uppercase tracking-[0.22em] text-accent">Next run</div>
          </div>

          <div className="flex flex-col">
            <p className="kicker kicker--beige">Next run</p>
            <h2 className="mt-4 font-display text-[clamp(40px,7vw,72px)] leading-[0.88] tracking-tight text-foreground">
              {NEXT_RUN.day}
              <br />
              {NEXT_RUN.time}
            </h2>
            <p className="mt-5 font-display text-2xl sm:text-3xl text-foreground/95">{NEXT_RUN.location}</p>
            <p className="mt-2 font-kicker text-[12px] uppercase tracking-[0.2em] text-muted">{NEXT_RUN.details}</p>

            <p className="mt-6 max-w-sm text-base leading-7 text-muted">{NEXT_RUN.note}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinkButton href="https://maps.google.com/?q=North+Greenwich+London">Get directions</LinkButton>
              <LinkButton href="/signup" variant="secondary">Add to calendar</LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="kicker kicker--muted">What to expect</p>
          <h2 className="mt-4 font-display text-[clamp(36px,6vw,56px)] leading-[0.9] tracking-tight text-foreground">
            Your first WAGMI run.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted">
            Show up at North Greenwich, find the crew, and run at the pace that feels right for you.
            Some people are here for a quick 5K. Some are here to run slower and talk more. Some are
            here for the first time. All of that is fine.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { label: "Time", value: "7:00 PM" },
              { label: "Location", value: "North Greenwich" },
              { label: "Distance", value: "5K" },
              { label: "Pace", value: "Social / all paces" },
            ].map((item) => (
              <div key={item.label} className="border-t border-line pt-4">
                <p className="font-kicker text-[11px] uppercase tracking-[0.22em] text-muted">{item.label}</p>
                <p className="mt-1 font-display text-xl text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <LinkButton href="/community">More about the community</LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}
