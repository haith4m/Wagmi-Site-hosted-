import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/form";
import { RsvpPanel } from "@/components/events/rsvp-panel";
import { services } from "@/lib/services";
import { getCurrentUser } from "@/lib/session";
import { formatEventDate, formatTime, initials, daysUntil, isUpcoming } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await services.events.getBySlug(slug);
  if (!event) notFound();

  const user = await getCurrentUser();
  const isAdmin = user?.role === "super_admin" || user?.role === "event_manager";
  // Keep drafts inaccessible to the public.
  if (!event.published && !isAdmin) notFound();

  const participants = await services.events.listParticipants(event.id);
  const myRsvp = user ? participants.find((p) => p.userId === user.id) : null;
  const isFull = event.attending >= event.capacity;
  const d = daysUntil(event.date);
  const upcoming = isUpcoming(event);

  return (
    <main className="bg-background text-foreground">
      {/* Header image */}
      <section className="relative h-64 sm:h-80">
        <div className={`absolute inset-0 bg-foreground/10`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">{event.category}</Badge>
            {event.featured && <Badge tone="neutral">Featured</Badge>}
            {!event.published && <Badge tone="warning">Draft</Badge>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Event details</p>
            <h1 className="mt-4 text-3xl font-display tracking-tight text-foreground sm:text-5xl">{event.title}</h1>
            {upcoming && (
              <p className="mt-3 text-sm text-accent">
                {d === 0 ? "Happening today" : d === 1 ? "Happening tomorrow" : `In ${d} days`}
              </p>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border-t border-foreground/10 py-4">
                <p className="font-kicker text-[11px] uppercase tracking-[0.18em] text-foreground/45">Date & time</p>
                <p className="mt-2 font-display text-xl text-foreground">{formatEventDate(event.date)}</p>
                <p className="text-sm text-foreground/60">{formatTime(event.time)}</p>
              </div>
              <div className="border-t border-foreground/10 py-4">
                <p className="font-kicker text-[11px] uppercase tracking-[0.18em] text-foreground/45">Location</p>
                <p className="mt-2 font-display text-xl text-foreground">{event.location}</p>
              </div>
              <div className="border-t border-foreground/10 py-4">
                <p className="font-kicker text-[11px] uppercase tracking-[0.18em] text-foreground/45">Capacity</p>
                <p className="mt-2 font-display text-xl text-foreground">{event.capacity} people</p>
              </div>
              <div className="border-t border-foreground/10 py-4">
                <p className="font-kicker text-[11px] uppercase tracking-[0.18em] text-foreground/45">Category</p>
                <p className="mt-2 font-display text-xl text-foreground">{event.category}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-display uppercase tracking-[0.18em] text-foreground/60">About the session</h2>
              <p className="mt-4 text-base leading-8 text-foreground/60">{event.description}</p>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-display uppercase tracking-[0.18em] text-foreground/60">
                Who&apos;s in ({participants.length})
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {participants.length === 0 ? (
                  <li className="text-sm text-foreground/35">No RSVPs yet — be the first.</li>
                ) : (
                  participants.slice(0, 12).map((p) => (
                    <li key={p.id} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-xs font-display text-accent" title={p.displayName}>
                      {initials(p.displayName)}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 self-start">
            <RsvpPanel event={event} hasRsvp={myRsvp !== null} isFull={isFull} />
            {isAdmin && (
              <div className="mt-5 space-y-3 rounded-md border border-foreground/10 bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">Admin</p>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href={`/events/${event.slug}/edit`} className="rounded-xl border border-foreground/10 bg-foreground/5 px-3 py-2.5 font-semibold text-foreground transition hover:bg-foreground/10">
                    Edit event
                  </Link>
                  <Link
                    href={`/admin?open=${event.id}`}
                    className="rounded-xl border border-foreground/10 bg-foreground/5 px-3 py-2.5 font-semibold text-foreground transition hover:bg-foreground/10"
                  >
                    Manage attendance
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}