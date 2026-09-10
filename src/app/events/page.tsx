import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { EventCard } from "@/components/events/event-card";
import { services } from "@/lib/services";
import { formatEventDate, formatTime, isUpcoming } from "@/lib/format";

export const dynamic = "force-dynamic";

function Ticker({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden border-y border-foreground/10 bg-background">
      <div className="ticker-track py-2.5 font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/50">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 items-center" aria-hidden={n === 1}>
            {items.map((t) => (
              <span key={`${n}-${t}`} className="flex items-center">
                <span className="px-5">{t}</span>
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const events = await services.events.list();
  const published = events
    .filter((e) => e.published && isUpcoming(e))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const featured = published.find((e) => e.featured) ?? published[0];
  const upcoming = published.slice(0, 3);
  const community = await services.community.list({ limit: 3 });
  const gallery = (await services.gallery.list({ limit: 4 })).filter((g) => g.status === "published");

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(200,176,138,0.30),_transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[#f4df8f]">
              We&apos;re All Gonna Make It
            </div>
            <h1 className="text-5xl font-black leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              A running club built for real momentum.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/80">
              WAGMI brings runners, friends, and beginners together around meaningful sessions,
              consistent progress, and a community that keeps showing up.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LinkButton href="/signup" className="w-full sm:w-auto">
                Become a member
              </LinkButton>
              <LinkButton href="/events" variant="secondary" className="w-full sm:w-auto">
                Explore events
              </LinkButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-foreground/80">
              <div>
                <p className="text-2xl font-black text-foreground">1.2k</p>
                <p>active members</p>
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">42</p>
                <p>monthly events</p>
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">96%</p>
                <p>retention</p>
              </div>
            </div>
          </div>

          {featured && (
            <div className="relative">
              <div className="rounded-[2rem] border border-foreground/10 bg-surface p-4 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <div className={`rounded-[1.5rem] bg-gradient-to-br ${featured.imageClass} p-6 text-accent-ink`}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.22em]">Next event</p>
                    <span className="rounded-full bg-foreground/10 px-2 py-1 text-xs font-semibold">Featured</span>
                  </div>
                  <h2 className="mt-6 text-3xl font-black tracking-tight">{featured.title}</h2>
                  <p className="mt-3 text-sm font-medium text-foreground/85">
                    {formatEventDate(featured.date)} · {formatTime(featured.time)} · {featured.location}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3 text-sm font-semibold">
                    <div className="rounded-2xl bg-foreground/50 p-3">
                      <p className="text-muted">Date</p>
                      <p className="mt-1 text-xl font-black">{featured.date}</p>
                    </div>
                    <div className="rounded-2xl bg-foreground/50 p-3">
                      <p className="text-muted">Capacity</p>
                      <p className="mt-1 text-xl font-black">{featured.capacity}</p>
                    </div>
                    <div className="rounded-2xl bg-foreground/50 p-3">
                      <p className="text-muted">RSVPs</p>
                      <p className="mt-1 text-xl font-black">{featured.attending}</p>
                    </div>
                    <div className="rounded-2xl bg-foreground/50 p-3">
                      <p className="text-muted">Category</p>
                      <p className="mt-1 text-xl font-black">{featured.category}</p>
                    </div>
                  </div>
                  <LinkButton href={`/events/${featured.slug}`} className="mt-6 w-full !text-accent-ink">
                    See details & RSVP
                  </LinkButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">What we do</p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">A place for movement, friendship, and consistency.</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              name: "Community runs",
              text: "Weekly group sessions that are beginner-friendly, social, and built to help people show up regularly.",
            },
            {
              name: "Training support",
              text: "Session guidance, pacing feedback, and event planning that keeps members progressing with confidence.",
            },
            {
              name: "Belonging",
              text: "A welcoming environment where progress is visible, encouragement is shared, and every member has a place.",
            },
          ].map((feature) => (
            <div key={feature.name} className="rounded-3xl border border-foreground/10 bg-surface p-6">
              <div className="mb-4 h-12 w-12 rounded-2xl bg-accent" />
              <h3 className="text-xl font-bold text-foreground">{feature.name}</h3>
              <p className="mt-3 text-foreground/80">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Upcoming</p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">The next sessions to join</h2>
          </div>
          <LinkButton href="/events" variant="secondary">
            Open the calendar
          </LinkButton>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.slug} event={event} compact />
          ))}
        </div>
      </section>

      {/* Community activity */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Community activity</p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">What members are sharing</h2>
          </div>
          <LinkButton href="/community" variant="secondary">
            View community feed
          </LinkButton>
        </div>
        <div className="space-y-5">
          {community.map((post) => (
            <div key={post.id} className="rounded-3xl border border-foreground/10 bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{post.authorName}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">Member update</p>
                </div>
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  Community
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-foreground">{post.title}</h3>
              <p className="mt-3 text-foreground/80">{post.body}</p>
              <div className="mt-4 flex gap-4 text-sm text-muted">
                <span>❤ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
{/* Gallery preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Gallery</p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">Moments from the community</h2>
          </div>
          <LinkButton href="/gallery" variant="secondary">
            View gallery
          </LinkButton>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {gallery.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-3xl border border-foreground/10 bg-surface">
              <div className={`h-52 bg-gradient-to-br ${item.imageClass}`} />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">{item.tag}</p>
                <h3 className="mt-3 text-xl font-black text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground/80">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-accent/30 bg-surface p-8 text-center sm:p-12">
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Join the club</p>
          <h2 className="mt-4 text-3xl font-black text-foreground sm:text-5xl">Make your next run part of something bigger.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/80">
            WAGMI gives you structure, energy, and a crew that helps you keep showing up.
            It&apos;s time to build your momentum with people who get it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <LinkButton href="/signup">Sign up today</LinkButton>
            <LinkButton href="/events" variant="secondary">
              Explore events
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}