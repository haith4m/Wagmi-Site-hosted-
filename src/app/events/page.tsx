import Link from "next/link";
import { EventCardGrid } from "@/components/events/event-card";
import { services, CATEGORY_LABELS } from "@/lib/services";
import { isUpcoming } from "@/lib/format";

export const dynamic = "force-dynamic";

const CATEGORIES = ["All", "Run", "Trail", "Strength", "Community", "Recovery"];

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawCat = params.cat;
  const category =
    typeof rawCat === "string" && CATEGORIES.includes(rawCat) ? rawCat : "All";

  const all = await services.events.list();
  const upcoming = all
    .filter((e) => e.published && isUpcoming(e))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const filtered =
    category === "All"
      ? upcoming
      : upcoming.filter(
          (e) => CATEGORY_LABELS[e.category] === category,
        );

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/55">
          Sessions / Start list
        </p>
        <h1 className="font-display mt-4 text-4xl leading-[0.9] text-foreground sm:text-5xl lg:text-6xl">
          Upcoming runs
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/55">
          Every session, big and small — from sunrise socials to trail tempos.
          All paces welcome.
        </p>
      </section>

      {/* Category filter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-foreground/10 pb-3 font-kicker text-[11px] font-bold uppercase tracking-[0.18em]">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={c === "All" ? "/events" : `/events?cat=${c}`}
              className={`${
                category === c
                  ? "text-foreground underline decoration-accent decoration-2 underline-offset-8"
                  : "text-foreground/45 hover:text-foreground"
              } transition`}
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Start list */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <EventCardGrid events={filtered} />
      </section>

      {/* Editorial footer */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rule-t pt-6">
          <p className="font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/35">
            Run 04 / WAGMI Club
          </p>
          <p className="mt-1 text-sm text-foreground/50">
            New sessions are added by the crew each week. Check back before every
            Wednesday and Saturday — or sign up to get the full calendar.
          </p>
        </div>
      </section>
    </main>
  );
}
