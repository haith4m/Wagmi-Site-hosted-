import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
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
                <span className="text-accent">?</span>
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
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <p className="kicker text-foreground/60">Run 01 / WAGMI Club</p>
            <h1 className="font-display mt-6 text-[13vw] leading-[0.85] sm:text-7xl lg:text-[86px]">
              Run<br />Together<br />Build<br />Together<br />Become<br />
              <span className="relative inline-block text-accent">
                Together
                <span className="brush-slash -bottom-1 left-0 h-[10px] w-full opacity-90" />
              </span>
            </h1>
            <p className="mt-7 max-w-sm text-[15px] leading-7 text-foreground/60">
              Running. Community. Progress. For a better tomorrow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinkButton href="/signup">Join the community</LinkButton>
              <LinkButton href="/events" variant="secondary">View next event</LinkButton>
            </div>
            <div className="rule-t mt-10 grid grid-cols-3 gap-4 pt-6">
              <div>
                <p className="font-display text-3xl">01</p>
                <p className="mt-1 font-kicker text-[10px] uppercase tracking-[0.2em] text-foreground/45">Active crew</p>
              </div>
              <div>
                <p className="font-display text-3xl">02</p>
                <p className="mt-1 font-kicker text-[10px] uppercase tracking-[0.2em] text-foreground/45">Weekly runs</p>
              </div>
              <div>
                <p className="font-display text-3xl">03</p>
                <p className="mt-1 font-kicker text-[10px] uppercase tracking-[0.2em] text-foreground/45">London E8</p>
              </div>
            </div>
          </div>
          <div className="grain relative min-h-[480px] overflow-hidden bg-surface lg:min-h-[640px]">
            <div className="bw-photo absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(115deg, color-mix(in srgb, var(--foreground) 12%, transparent) 0 2px, transparent 2px 14px), radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--foreground) 16%, transparent), transparent 70%)" }} aria-hidden />
            <div className="absolute inset-0 bg-background/35" aria-hidden />
            <div className="brush-slash -right-10 top-10 h-[26px] w-[55%] opacity-95" />
            <div className="brush-slash -left-8 bottom-16 h-[18px] w-[45%] opacity-90" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="font-display text-[18vw] leading-[0.85] text-foreground sm:text-8xl lg:text-[132px]">WAGMI</p>
              <p className="font-script -mt-4 rotate-[-6deg] text-5xl text-foreground sm:text-6xl">Club</p>
              <div className="mt-6 inline-flex -rotate-6 items-center gap-2 rounded-[46%_54%_52%_48%/55%_46%_54%_45%] bg-accent px-6 py-3">
                <span className="font-display text-sm text-accent-ink">WAGMI Club</span>
                <span className="font-kicker text-[10px] text-accent-ink">LDN</span>
              </div>
            </div>
            <p className="absolute bottom-4 right-5 font-kicker text-[10px] uppercase tracking-[0.22em] text-foreground/70">London and beyond</p>
            <p className="absolute bottom-4 left-5 font-kicker text-[10px] uppercase tracking-[0.22em] text-foreground/50">Hackney Marshes / 07:00</p>
          </div>
        </div>
      </section>
      <Ticker items={["Community moves differently", "Hackney 07:00", "5K Social all paces", "Run together"]} />
      {featured && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="kicker text-foreground/60">Run 02 / Next session</p>
          <Link href={`/events/${featured.slug}`} className="group mt-6 grid gap-0 overflow-hidden rounded-md border border-foreground/10 bg-surface md:grid-cols-[140px_1fr_auto]">
            <div className="flex flex-col justify-center border-b border-foreground/10 bg-background p-6 md:border-b-0 md:border-r">
              <p className="font-kicker text-[11px] uppercase tracking-[0.2em] text-accent">{formatEventDate(featured.date).split(" ")[0].slice(0, 3)}</p>
              <p className="font-display mt-1 text-4xl">{formatEventDate(featured.date).split(" ")[1]}</p>
              <p className="mt-1 font-kicker text-[11px] text-foreground/50">{formatTime(featured.time)}</p>
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-kicker text-[10px] uppercase tracking-[0.2em] text-foreground/45">{featured.location} / {featured.attending}/{featured.capacity} crew</p>
              <h2 className="font-display mt-3 text-3xl leading-[0.9] transition group-hover:text-accent sm:text-4xl">{featured.title}</h2>
              <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-foreground/60">{featured.description}</p>
            </div>
            <div className="flex items-center border-t border-foreground/10 p-6 md:border-l md:border-t-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-accent-ink">RSVP <span aria-hidden>?</span></span>
            </div>
          </Link>
        </section>
      )}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker text-foreground/60">Run 03 / Start list</p>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">Upcoming runs</h2>
          </div>
          <Link href="/events" className="hidden font-kicker text-[12px] uppercase tracking-[0.18em] text-foreground/60 underline decoration-accent decoration-2 underline-offset-4 hover:text-foreground sm:inline">All runs ?</Link>
        </div>
        <div className="mt-8 border-t border-foreground/10">
          {upcoming.map((event, i) => (
            <Link key={event.slug} href={`/events/${event.slug}`} className="group grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-foreground/10 py-5 transition hover:bg-foreground/[0.04]">
              <div>
                <p className="font-kicker text-[10px] text-foreground/40">0{i + 1}</p>
                <p className="font-display mt-1 text-xl">{formatEventDate(event.date).split(" ")[1]}</p>
              </div>
              <div className="min-w-0">
                <p className="font-display truncate text-xl transition group-hover:text-accent sm:text-2xl">{event.title}</p>
                <p className="mt-1 truncate font-kicker text-[11px] uppercase tracking-[0.16em] text-foreground/45">{formatTime(event.time)} / {event.location} / {event.attending}/{event.capacity}</p>
              </div>
              <span className="font-display text-2xl text-foreground/30 transition group-hover:translate-x-1 group-hover:text-accent">?</span>
            </Link>
          ))}
        </div>
      </section>      <section className="bg-foreground text-accent-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="kicker kicker--dark text-accent-ink/60">Club 04 / London and beyond</p>
            <h2 className="font-display mt-5 text-5xl leading-[0.85] sm:text-6xl">Community<br />moves<br />differently</h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-8 text-accent-ink/70">WAGMI Club is a premium London running crew. No egos, no finish-line pressure. Just consistent sessions, honest progress, and people who notice when you show up.</p>
            <div className="rule-t-dark mt-8 grid grid-cols-2 gap-6 pt-6 font-kicker text-[11px] uppercase tracking-[0.18em] text-accent-ink/60">
              <p>Est. LDN E8</p>
              <p>All paces welcome</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="kicker text-foreground/60">Feed 05 / Field notes</p>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">What members are sharing</h2>
          </div>
          <LinkButton href="/community" variant="secondary">View feed</LinkButton>
        </div>
        <div className="rule-t">
          {community.map((post, i) => (
            <div key={post.id} className="grid gap-3 border-b border-foreground/10 py-6 sm:grid-cols-[60px_1fr_auto] sm:items-baseline">
              <p className="font-kicker text-[11px] text-foreground/35">No.{124 - i}</p>
              <div>
                <h3 className="font-display text-xl">{post.title}</h3>
                <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-foreground/60">{post.body}</p>
                <p className="mt-2 font-kicker text-[11px] uppercase tracking-[0.16em] text-foreground/40">{post.authorName} / {post.likes} likes / {post.comments} replies</p>
              </div>
              <Link href="/community" className="font-kicker text-[11px] uppercase tracking-[0.16em] text-foreground/50 hover:text-accent">Read ?</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="kicker text-foreground/60">Photos 06 / Contact sheet</p>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">Moments from the crew</h2>
          </div>
          <LinkButton href="/gallery" variant="secondary">View gallery</LinkButton>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {gallery.map((item, i) => (
            <div key={item.id} className={`group relative overflow-hidden rounded-md border border-foreground/10 bg-surface ${i % 4 === 1 ? "xl:mt-8" : ""} ${i % 4 === 3 ? "xl:-mt-4" : ""}`}>
              <div className="bw-photo h-64 bg-foreground/10" style={{ backgroundImage: `repeating-linear-gradient(${115 + i * 12}deg, color-mix(in srgb, var(--foreground) 12%, transparent) 0 3px, transparent 3px 16px)` }} aria-hidden />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/85 to-transparent p-4 pt-10">
                <p className="font-kicker text-[10px] uppercase tracking-[0.2em] text-accent">{item.tag}</p>
                <p className="mt-1 truncate text-sm font-bold text-foreground">{item.title}</p>
                <p className="font-kicker mt-1 text-[10px] uppercase tracking-[0.16em] text-foreground/50">Ektachrome Hackney</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-accent text-accent-ink">
        <div className="grain relative mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="brush-slash left-[-40px] top-8 h-[22px] w-[40%] !bg-background" />
          <h2 className="font-display relative text-[12vw] leading-[0.85] sm:text-7xl lg:text-8xl">We are all<br />gonna make it</h2>
          <p className="font-script mt-2 -rotate-2 text-4xl">Club join us</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-foreground transition hover:-translate-y-px">Join the community <span aria-hidden>?</span></Link>
            <Link href="/events" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] transition hover:bg-background hover:text-foreground">Explore runs <span aria-hidden>?</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}