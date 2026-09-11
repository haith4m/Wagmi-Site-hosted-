import Image from "next/image";
import Link from "next/link";

export function CommunityIntro() {
  return (
    <section className="mt-20 grid gap-12 lg:grid-cols-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-2">
        <Image
          src="/wagmi/SnapInsta.to_674535959_17903362839408573_5977666674644232821_n.jpg"
          alt="WAGMI Club community"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div>
        <p className="kicker kicker--beige">WHY WE RUN</p>
        <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Running is the excuse.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted">
          We run because it gives us a reason to show up. To meet people. To feel stronger.
          To build something that lasts longer than a single run, a single season, or a single year.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          WAGMI started with one run on the Greenwich peninsula and grew into a community of
          people who show up for each other — on the roads, in the parks, and in life.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          We don't care about your pace. We care that you show up.
        </p>
      </div>
    </section>
  );
}
