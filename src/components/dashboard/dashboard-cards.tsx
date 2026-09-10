import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/form";
import { initials, formatEventDate, formatTime } from "@/lib/format";
import type { Event, EventParticipant } from "@/types";

/** Stat card used across the dashboard. */
export function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="border-t border-foreground/15 pt-5">
      <p className="font-kicker text-[11px] uppercase tracking-[0.2em] text-foreground/45">{label}</p>
      <p className="font-display mt-3 text-5xl text-foreground">{value}</p>
      <p className="mt-2 text-sm text-foreground/50">{note}</p>
    </div>
  );
}

/** Big "next session" feature card. */
export function NextSessionCard({ event }: { event: Event }) {
  return (
    <div className="group overflow-hidden rounded-md border border-foreground/10 bg-surface">
      <div className="bw-photo h-44 bg-foreground/10" style={{ backgroundImage: "repeating-linear-gradient(115deg, color-mix(in srgb, var(--foreground) 12%, transparent) 0 3px, transparent 3px 16px)" }} />
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <Badge tone="neutral">{event.category}</Badge>
          {event.featured && <Badge tone="accent">Featured</Badge>}
        </div>
        <h3 className="font-display mt-4 text-2xl leading-[0.9] text-foreground">{event.title}</h3>
        <p className="mt-2 font-kicker text-[11px] uppercase tracking-[0.16em] text-foreground/45">
          {formatEventDate(event.date)} · {formatTime(event.time)} · {event.location}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton href={`/events/${event.slug}`} className="!px-4 !py-2 !text-xs">
            View details
          </LinkButton>
          <LinkButton href={`/events/${event.slug}`} variant="ghost" className="!px-4 !py-2 !text-xs">
            Invite a friend
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

/** Row in the "joined events" list. */
export function JoinedEventRow({ event, rsvp }: { event: Event; rsvp: EventParticipant | undefined }) {
  return (
    <a
      href={`/events/${event.slug}`}
      className="group flex items-center justify-between gap-4 border-b border-foreground/10 py-4 transition hover:bg-foreground/[0.04]"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-display truncate text-lg text-foreground transition group-hover:text-accent">{event.title}</p>
          {rsvp?.status === "interested" && <Badge tone="warning">Interested</Badge>}
        </div>
        <p className="mt-1 font-kicker text-[11px] uppercase tracking-[0.14em] text-foreground/40">
          {formatEventDate(event.date)} · {formatTime(event.time)} · {event.location}
        </p>
      </div>
      <span className="ml-4 shrink-0 font-display text-xl text-foreground/30 transition group-hover:translate-x-1 group-hover:text-accent">→</span>
    </a>
  );
}

export { initials };