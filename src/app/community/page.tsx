import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/ui/button";

export const metadata = {
  title: "Community — WAGMI Club",
  description: "WAGMI Club community — running, connection and progress in London.",
};

export default function CommunityPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="kicker kicker--beige">Community</p>
        <h1 className="mt-4 font-display text-[clamp(40px,7vw,80px)] leading-[0.88] tracking-tight text-foreground">
          The community.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
          WAGMI is a London-based running community built around movement, connection and progress.
          We meet to run, to recover, and to move forward — together.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="kicker kicker--beige">Why we run</p>
            <h2 className="mt-4 font-display text-[clamp(32px,5vw,48px)] leading-[0.9] tracking-tight text-foreground">
              The run is just the start.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              People show up for different reasons. Some want to get fitter. Some want to meet people.
              Some just want to move. WAGMI is for all of that.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
            <Image src="/gallery/IMG_2205.JPG" alt="WAGMI crew" fill className="photo-cover photo-authentic" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 photo-overlay opacity-45" />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="kicker kicker--muted">What we do</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {[
              { label: "Running", body: "Mondays at 7PM, North Greenwich. 5K. Social. All paces." },
              { label: "Connection", body: "The bits between the miles — conversation, encouragement, belonging." },
              { label: "Progress", body: "Moving forward at your own pace, with people who’ve got your back." },
              { label: "Community", body: "Real people showing up for each other, in the run and after." },
            ].map((item) => (
              <div key={item.label} className="border-t border-line pt-5">
                <p className="font-display text-xl text-foreground">{item.label}</p>
                <p className="mt-2 text-base leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative order-2 lg:order-1 aspect-[4/5] overflow-hidden bg-surface-2">
            <Image src="/gallery/night-run-crew-riverside.jpg" alt="WAGMI night run" fill className="photo-cover photo-authentic" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 photo-overlay opacity-55" />
            <div className="absolute left-4 top-4 font-kicker text-[11px] uppercase tracking-[0.22em] text-accent">Events</div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col">
            <p className="kicker kicker--beige">Events</p>
            <h2 className="mt-4 font-display text-[clamp(32px,5vw,48px)] leading-[0.9] tracking-tight text-foreground">
              Runs, races, meet-ups.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The main event is the Monday run. Beyond that, WAGMI shows up for races, recovery
              sessions, and the occasional proper London moment.
            </p>
            <div className="mt-8">
              <LinkButton href="/runs">See upcoming runs</LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="kicker kicker--muted">The people</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "/gallery/marathon-support-crew.jpg",
              "/gallery/with-mo-farah.jpg",
              "/gallery/london-marathon-finisher.jpg",
              "/gallery/_DSF4262.jpg",
            ].map((src) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden bg-surface-2">
                <Image src={src} alt="WAGMI community" fill className="photo-cover photo-authentic" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 photo-overlay opacity-40" />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <LinkButton href="/photos" variant="secondary">See the full contact sheet</LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}
