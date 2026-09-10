import Link from "next/link";
import { Badge } from "@/components/ui/form";
import { formatEventDate, formatTime } from "@/lib/format";
import { CATEGORY_LABELS } from "@/lib/services";
import type { Event } from "@/types";

export function EventCard({ event, compact = false }: { event: Event; compact?: boolean }) {
  const full = event.attending >= event.capacity;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block overflow-hidden rounded-md border border-foreground/10 bg-surface transition hover:border-accent/50"
    >
      <div className="bw-photo relative h-40 w-full bg-foreground/10" style={{ backgroundImage: "repeating-linear-gradient(115deg, color-mix(in srgb, var(--foreground) 12%, transparent) 0 3px, transparent 3px 16px)" }} aria-hidden>
        <div className="absolute left-4 top-4 flex gap-2">
          {event.featured && (
            <span className="bg-accent px-2.5 py-1 font-kicker text-[10px] font-bold uppercase tracking-[0.16em] text-accent-ink">
              Featured
            </span>
          )}
        </div>
        <p className="absolute bottom-3 right-4 font-kicker text-[10px] uppercase tracking-[0.18em] text-foreground/70">
          {formatEventDate(event.date).split(" ")[0].slice(0, 3)} / {formatTime(event.time)}
        </p>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <Badge tone="neutral">{CATEGORY_LABELS[event.category] ?? event.category}</Badge>
          {full ? <Badge tone="accent">Full</Badge> : <span className="font-kicker text-[11px] uppercase tracking-[0.14em] text-foreground/40">{event.attending}/{event.capacity} crew</span>}
        </div>
        <h3 className="font-display mt-4 text-xl leading-[0.95] text-foreground transition group-hover:text-accent">{event.title}</h3>
        {!compact && <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-foreground/55">{event.description}</p>}
        <div className="rule-t mt-5 flex items-center justify-between pt-4 font-kicker text-[11px] uppercase tracking-[0.16em] text-foreground/50">
          <p>{formatTime(event.time)} · {event.location}</p>
          <span className="text-foreground/30 transition group-hover:translate-x-1 group-hover:text-accent">→</span>
        </div>
      </div>
    </Link>
  );
}

export function EventCardGrid({ events, compact = false }: { events: Event[]; compact?: boolean }) {
  if (events.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-foreground/15 bg-surface px-6 py-12 text-center">
        <h3 className="font-display text-xl text-foreground">No events here yet</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-foreground/50">
          When an admin publishes an event it will show up on this page. Check back soon.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.slug} event={event} compact={compact} />
      ))}
    </div>
  );
}