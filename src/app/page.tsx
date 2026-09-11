import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/ui/button";
import { PhotoLightboxGrid, type PhotoTile } from "@/components/gallery/photo-lightbox";

export const dynamic = "force-static";

const GALLERY_FOLD: PhotoTile[] = [
  { id: "crew-in-the-lens", src: "/gallery/IMG_2205.JPG", title: "Crew in the lens", caption: "Post-run pause on the towpath.", tag: "Community" },
  { id: "night-run-crew-riverside", src: "/gallery/night-run-crew-riverside.jpg", title: "Night run, riverside", caption: "A quieter side of the city.", tag: "Run" },
  { id: "support-crew", src: "/gallery/marathon-support-crew.jpg", title: "Support crew", caption: "One of us, all of us.", tag: "Community" },
  { id: "marathon-finisher", src: "/gallery/london-marathon-finisher.jpg", title: "London Marathon finisher", caption: "The day the club got bigger.", tag: "Run" },
  { id: "with-mo-farah", src: "/gallery/with-mo-farah.jpg", title: "With Mo Farah", caption: "A proper London moment.", tag: "Community" },
  { id: "greenwich-dusk", src: "/gallery/greenwich-dusk-riverside.jpg", title: "North Greenwich at dusk", caption: "Where we meet.", tag: "Run" },
];

const SHOP_PROMO_IMAGE = "/wagmi/SnapInsta.to_683552316_17903362827408573_2520629407912285782_n.jpg";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl px-4 pb-14 pt-0 sm:px-6 lg:px-8 lg:pb-20">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-surface-2">
            <Image src="/gallery/marathon-support-crew.jpg" alt="WAGMI Club support crew out on course" fill className="photo-cover photo-authentic" priority sizes="100vw" />
            <div className="absolute inset-0 photo-overlay opacity-70" />
            <div className="absolute left-4 top-4 flex items-center gap-3 sm:left-5 sm:top-5">
              <span className="font-kicker text-[11px] uppercase tracking-[0.22em] text-white/85">London</span>
              <span className="font-kicker text-[11px] uppercase tracking-[0.22em] text-white/50">and beyond</span>
            </div>
            <div className="absolute right-4 bottom-4 flex items-center gap-3 sm:right-5 sm:bottom-5">
              <span className="font-kicker text-[11px] uppercase tracking-[0.22em] text-white/85">People move differently</span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-[8%] text-center sm:pt-[7%]">
              <div className="max-w-[92%] sm:max-w-[80%] lg:max-w-[70%]">
                <Link href="/" aria-label="WAGMI Club" className="inline-block">
                  <Image
                    src="/wagmi-logo.png"
                    alt="WAGMI Club logo"
                    width={760}
                    height={0}
                    className="h-auto w-[clamp(170px,30vw,400px)] brightness-0 invert"
                    priority
                  />
                </Link>
                <p className="mt-4 font-kicker text-[11px] uppercase tracking-[0.22em] text-white/90 sm:text-[12px] sm:tracking-[0.26em] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">Running · Community · Progress</p>
                <p className="mt-3 font-kicker text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 sm:text-[12px] sm:tracking-[0.26em] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">Mondays · 7PM · North Greenwich</p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <LinkButton href="/signup">Join the next run</LinkButton>
                  <LinkButton href="/runs" variant="secondary" className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10 hover:!text-white">When and where we run</LinkButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative order-2 lg:order-1 aspect-[4/5] overflow-hidden bg-surface-2">
            <Image src={GALLERY_FOLD[4].src} alt="WAGMI members with Mo Farah" fill className="photo-cover photo-authentic" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 photo-overlay opacity-50" />
            <div className="absolute left-4 top-4 font-kicker text-[11px] uppercase tracking-[0.22em] text-accent">Community</div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col">
            <p className="kicker kicker--beige">More than running</p>
            <h2 className="mt-4 font-display text-[clamp(40px,7vw,72px)] leading-[0.88] tracking-tight text-foreground">More than<br />running.</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted">WAGMI is a London-based running community bringing people together through movement, connection and self-improvement.</p>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted">All paces. All backgrounds.</p>
            <p className="mt-4 max-w-lg text-base leading-7 text-foreground">A brighter tomorrow, together.</p>
            <div className="mt-8"><LinkButton href="/about">Our story</LinkButton></div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background">
        <div className="mx-auto grid max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="relative aspect-[16/9] overflow-hidden bg-surface-2 lg:aspect-[21/9]">
            <Image src={GALLERY_FOLD[5].src} alt="WAGMI group beside the Thames at night" fill className="photo-cover photo-authentic" priority sizes="100vw" />
            <div className="absolute inset-0 photo-overlay opacity-55" />
            <div className="absolute inset-0 flex flex-col items-start justify-end px-6 sm:px-10 lg:px-14">
              <p className="font-display text-[clamp(28px,5vw,56px)] leading-[0.9] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.4)]">North Greenwich<br />London<br />and beyond</p>
              <p className="mt-4 font-kicker text-[12px] uppercase tracking-[0.26em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">Good people. Better days.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="kicker kicker--beige">The people</p>
            <h2 className="mt-4 font-display text-[clamp(36px,6vw,60px)] leading-[0.88] tracking-tight text-foreground">Real people.<br />Real progress.</h2>
          </div>
          <LinkButton href="/photos" variant="secondary">See more</LinkButton>
        </div>
        <PhotoLightboxGrid photos={GALLERY_FOLD.map((photo, i) => ({ ...photo, id: `home-people-${i}` }))} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" tilt />
      </section>

      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
            <Image src={GALLERY_FOLD[3].src} alt="WAGMI race finisher with medal" fill className="photo-cover photo-authentic" priority sizes="(max-width: 1024px) 100vw, 45vw" />
            <div className="absolute inset-0 photo-overlay opacity-40" />
          </div>
          <div className="flex flex-col">
            <p className="kicker kicker--beige">The story</p>
            <h2 className="mt-4 font-display text-[clamp(36px,6vw,56px)] leading-[0.9] tracking-tight text-foreground">It started with one run.</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted">WAGMI was built around running, community and helping people move forward — one run, one conversation, one better day at a time.</p>
            <p className="mt-4 text-base leading-7 text-foreground">We are all gonna make it. Slowly. Together.</p>
            <div className="mt-8"><LinkButton href="/about">Our story</LinkButton></div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
            <Image src={SHOP_PROMO_IMAGE} alt="WAGMI Club clothing" fill className="photo-cover photo-authentic" priority sizes="(max-width: 1024px) 100vw, 45vw" />
            <div className="absolute inset-0 photo-overlay opacity-45" />
            <div className="absolute left-4 top-4 font-kicker text-[11px] uppercase tracking-[0.22em] text-white/85">WAGMI CLUB SHOP</div>
          </div>
          <div className="flex flex-col">
            <p className="kicker kicker--beige">Shop</p>
            <h2 className="mt-4 font-display text-[clamp(40px,7vw,72px)] leading-[0.88] tracking-tight text-foreground">Wear the<br />movement.</h2>
            <p className="mt-3 font-kicker text-[12px] uppercase tracking-[0.24em] text-muted">WAGMI Club Shop</p>
            <p className="mt-6 max-w-md text-base leading-7 text-muted">Clothing made for the run, the recovery day, and everything in between. Designed in London, built to last more than one season.</p>
            <div className="mt-8"><LinkButton href="/shop">Browse shop</LinkButton></div>
          </div>
        </div>
      </section>
    </main>
  );
}
