import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/form";
import { ProfileEditor } from "@/components/profile/profile-editor";
import { services } from "@/lib/services";
import { getCurrentUser } from "@/lib/session";
import { formatEventDate, formatTime, initials } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [profile, participants, allEvents] = await Promise.all([
    services.profiles.getByUserId(user.id),
    services.events.listRsvpsForUser(user.id),
    services.events.list(),
  ]);

  if (!profile) redirect("/dashboard");

  const eventIds = new Set(
    participants.filter((p) => p.status !== "canceled").map((p) => p.eventId),
  );
  const history = allEvents
    .filter((e) => eventIds.has(e.id))
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

  const joined = new Date(profile.joinedAt);

  return (
    <main className="bg-background text-foreground">
      {/* Profile header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(200,176,138,0.20),_transparent_45%)]" />
        <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Profile</p>
          <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-accent to-[#8a744f] text-4xl font-display text-accent-ink shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              {initials(profile.displayName)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-display tracking-tight text-foreground sm:text-4xl">{profile.displayName}</h1>
                <Badge tone={user.role === "member" ? "neutral" : "accent"}>{user.role}</Badge>
              </div>
              <p className="mt-1 text-foreground/45">@{profile.username}</p>
              <p className="mt-3 max-w-xl text-foreground/60">{profile.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: details + edit */}
          <div className="space-y-8">
            <div className="rounded-md border border-foreground/10 bg-surface p-6">
              <h2 className="text-lg font-display uppercase tracking-[0.16em] text-foreground/60">Details</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-foreground/35">Location</dt>
                  <dd className="mt-1 font-semibold text-foreground">{profile.location || "Not set"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-foreground/35">Joined</dt>
                  <dd className="mt-1 font-semibold text-foreground">
                    {joined.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-foreground/35">Day streak</dt>
                  <dd className="mt-1 font-semibold text-accent">{profile.streak} days</dd>
                </div>
              </dl>

              <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/35">Running interests</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.runningInterests.length === 0 ? (
                  <p className="text-sm text-foreground/35">Add your interests to personalise your feed.</p>
                ) : (
                  profile.runningInterests.map((i) => (
                    <span key={i} className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-foreground/70">
                      {i}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-md border border-foreground/10 bg-surface p-6">
              <h2 className="text-lg font-display uppercase tracking-[0.16em] text-foreground/60">Edit profile</h2>
              <div className="mt-5">
                <ProfileEditor profile={profile} />
              </div>
            </div>

            <p className="text-xs leading-5 text-foreground/35">
              Avatar, settings, and verified badges arrive with Supabase Auth &amp; Storage. Your profile is
              mock-backed today so nothing is persisted yet.
            </p>
          </div>

          {/* Right: activity history */}
          <div>
            <h2 className="text-lg font-display uppercase tracking-[0.16em] text-foreground/60">Activity history</h2>
            {history.length === 0 ? (
              <div className="mt-5 rounded-md border border-dashed border-foreground/15 bg-surface px-6 py-12 text-center">
                <h3 className="text-xl font-display text-foreground">No event history yet</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm text-foreground/45">
                  RSVP to a session and your running history will start building here.
                </p>
                <Link href="/events" className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition hover:bg-accent/85">
                  Browse events
                </Link>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {history.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group flex items-center gap-4 rounded-md border border-foreground/10 bg-surface p-4 transition hover:border-accent/40 hover:bg-foreground/5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-accent to-[#8a744f] text-sm font-display text-accent-ink">
                      {event.category.slice(0, 1)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-foreground">{event.title}</p>
                      <p className="mt-1 text-sm text-foreground/45">
                        {formatEventDate(event.date)} · {formatTime(event.time)}
                      </p>
                    </div>
                    <span className="ml-auto shrink-0 text-foreground/35 transition group-hover:text-accent">→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}