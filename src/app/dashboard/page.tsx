import { redirect } from "next/navigation";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/form";
import {
  StatCard,
  NextSessionCard,
  JoinedEventRow,
  initials,
} from "@/components/dashboard/dashboard-cards";
import { services } from "@/lib/services";
import { getCurrentUser } from "@/lib/session";
import { daysUntil, isUpcoming } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [profile, allEvents, participants, community] = await Promise.all([
    services.profiles.getByUserId(user.id),
    services.events.list(),
    services.events.listRsvpsForUser(user.id),
    services.community.list({ limit: 3 }),
  ]);

  const published = allEvents.filter((e) => e.published);
  const upcoming = published
    .filter((e) => isUpcoming(e))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const nextClubEvent = upcoming[0] ?? null;

  const rsvpEventIds = new Set(participants.map((p) => p.eventId));
  const myEvents = allEvents
    .filter((e) => rsvpEventIds.has(e.id))
    .filter((e) => {
      const rsvp = participants.find((p) => p.eventId === e.id);
      return rsvp ? rsvp.status !== "canceled" : false;
    });
  const myUpcoming = myEvents
    .filter((e) => isUpcoming(e))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const nextMyEvent = myUpcoming[0] ?? nextClubEvent;
  const streak = profile?.streak ?? 0;
  const joinedYear = profile ? new Date(profile.joinedAt).getFullYear() : null;

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-accent">Dashboard</p>
        <h1 className="mt-3 text-4xl font-display tracking-tight text-foreground sm:text-5xl">
          Good to see you, {user.displayName.split(" ")[0]}.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/60">
          Your running momentum in one place — next sessions, milestones, and what the crew is up to.
        </p>
      </section>

      {/* Stat cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Day streak" value={String(streak)} note={streak >= 14 ? "Consistency is a habit" : "Keep showing up"} />
          <StatCard label="Events on your list" value={String(myEvents.length)} note={`${myUpcoming.length} upcoming`} />
          <StatCard
            label="Next session"
            value={nextMyEvent ? `${Math.max(0, daysUntil(nextMyEvent.date))}d` : "—"}
            note={nextMyEvent ? nextMyEvent.title : "No sessions yet"}
          />
          <StatCard label="Joined WAGMI" value={joinedYear ? String(joinedYear) : "—"} note="Member milestone" />
        </div>
      </section>
<div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* Left column */}
        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-accent">Next up</p>
              <h2 className="mt-2 text-2xl font-display text-foreground sm:text-3xl">Your next session</h2>
            </div>
            <LinkButton href="/events" variant="secondary" className="!px-4 !py-2 !text-xs">
              All events
            </LinkButton>
          </div>

          {nextMyEvent ? (
            <NextSessionCard event={nextMyEvent} />
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-md border border-dashed border-foreground/15 bg-surface px-6 py-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl">🏃</div>
              <h3 className="text-xl font-display text-foreground">No sessions on your list yet</h3>
              <p className="max-w-md text-sm text-foreground/45">
                Join a run, trail or strength session and it&apos;ll show up here with the details you need.
              </p>
              <LinkButton href="/events" className="mt-2">
                Find your first event
              </LinkButton>
            </div>
          )}

          {/* Joined events */}
          <div className="mt-12">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.22em] text-accent">Your calendar</p>
              <h2 className="mt-2 text-2xl font-display text-foreground sm:text-3xl">Joined events</h2>
            </div>
            {myEvents.length === 0 ? (
              <p className="rounded-md border border-foreground/10 bg-surface px-6 py-10 text-center text-sm text-foreground/45">
                When you RSVP to an event it will appear here.
              </p>
            ) : (
              <div className="grid gap-4">
                {myEvents.map((event) => (
                  <JoinedEventRow
                    key={event.id}
                    event={event}
                    rsvp={participants.find((p) => p.eventId === event.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Quick profile */}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Profile</p>
            <div className="mt-4 rounded-md border border-foreground/10 bg-surface p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#8a744f] text-xl font-display text-accent-ink">
                  {initials(profile?.displayName ?? user.displayName)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xl font-display text-foreground">{profile?.displayName ?? user.displayName}</p>
                  <p className="text-sm text-foreground/45">@{profile?.username ?? user.username}</p>
                </div>
              </div>
              {profile?.bio && <p className="mt-4 text-sm leading-6 text-foreground/60">{profile.bio}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {(profile?.runningInterests ?? []).slice(0, 3).map((i) => (
                  <span key={i} className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-foreground/60">
                    {i}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <LinkButton href="/profile" variant="secondary" className="!px-4 !py-2 !text-xs">
                  View profile
                </LinkButton>
                <LinkButton href="/profile" className="!px-4 !py-2 !text-xs">
                  Edit
                </LinkButton>
              </div>
            </div>
          </div>

          {/* Community activity */}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Community activity</p>
            <div className="mt-4 space-y-4">
              {community.map((post) => (
                <div key={post.id} className="rounded-md border border-foreground/10 bg-surface p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">{post.authorName}</p>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
                      Community
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-foreground">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/60">{post.body}</p>
                  <p className="mt-3 text-xs text-foreground/35">
                    ❤ {post.likes} · 💬 {post.comments}
                  </p>
                </div>
              ))}
              <LinkButton href="/community" variant="secondary" className="w-full !px-4 !py-2 !text-xs">
                Open the feed
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}