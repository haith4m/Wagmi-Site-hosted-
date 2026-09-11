import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";

export const dynamic = "force-static";

const PHOTOS = [
  { src: "/gallery/IMG_2205.JPG", alt: "WAGMI crew", caption: "The crew, post-run." },
  { src: "/gallery/night-run-crew-riverside.jpg", alt: "Night run by the river", caption: "North Greenwich, after dark." },
  { src: "/gallery/marathon-support-crew.jpg", alt: "WAGMI support crew", caption: "Looking out for each other." },
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="kicker kicker--beige">About</p>
        <h1 className="mt-4 font-display text-[clamp(40px,7vw,84px)] leading-[0.88] tracking-tight text-foreground">
          We’re all gonna
          <br />
          make it.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
          WAGMI Club is a London-based running community built around movement, connection and
          progress. We meet to run, to recover, and to move forward — together.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          All paces. All backgrounds. No sign-up. Just turn up.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/5] overflow-hidden bg-surface-2">
              <Image src={photo.src} alt={photo.alt} fill className="photo-cover photo-authentic" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 photo-overlay opacity-40" />
              <p className="absolute bottom-4 left-4 right-4 font-kicker text-[11px] uppercase tracking-[0.22em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col">
            <p className="kicker kicker--beige">Why WAGMI</p>
            <h2 className="mt-4 font-display text-[clamp(36px,6vw,56px)] leading-[0.9] tracking-tight text-foreground">
              Running is the start.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted">
              The runs matter, but they are only the beginning. WAGMI is about meeting people, making
              progress on your own terms, and building a brighter tomorrow — one run at a time.
            </p>
            <div className="mt-8">
              <LinkButton href="/signup">Join the club</LinkButton>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="kicker kicker--beige">What we do</p>
            <div className="mt-5 space-y-5">
              {[
                { label: "Running", detail: "Mondays at 7PM, North Greenwich. 5K. Social. All paces." },
                { label: "Community", detail: "Real people showing up for each other, in the run and after." },
                { label: "Connection", detail: "The bits between the miles — conversation, encouragement, belonging." },
                { label: "Progress", detail: "Moving forward at your own pace, with people who’ve got your back." },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-display text-xl text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="font-display text-5xl leading-[0.85] text-foreground">WAGMI</p>
            <p className="font-script -mt-3 ml-16 -rotate-3 text-3xl text-foreground/95">Club</p>
            <p className="mt-4 font-kicker text-[11px] uppercase tracking-[0.28em] text-muted">We’re all gonna make it</p>
          </div>
          <div>
            <p className="font-kicker text-[11px] uppercase tracking-[0.22em] text-muted/50">Club</p>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link href="/runs" className="text-foreground/70 transition hover:text-accent">Runs</Link>
              <Link href="/community" className="text-foreground/70 transition hover:text-accent">Community</Link>
              <Link href="/photos" className="text-foreground/70 transition hover:text-accent">Photos</Link>
              <Link href="/shop" className="text-foreground/70 transition hover:text-accent">Shop</Link>
              <Link href="/about" className="text-foreground/70 transition hover:text-accent">About</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
