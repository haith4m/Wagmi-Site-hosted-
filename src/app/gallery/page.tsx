import Link from "next/link";
import { services } from "@/lib/services";
import type { GalleryItem } from "@/types";

export const dynamic = "force-dynamic";

const TAGS = ["Community", "Trail", "Training", "Wellbeing"];

function GalleryTile({ item, index }: { item: GalleryItem; index: number }) {
  const tall = index % 3 === 0;
  return (
    <figure className={`group relative overflow-hidden rounded-md border border-foreground/10 bg-surface ${tall ? "md:row-span-2" : ""} ${index % 4 === 1 ? "md:mt-8" : ""}`}>
      <div className={`bw-photo relative w-full bg-foreground/10 ${tall ? "md:h-full md:min-h-80" : "h-56"}`} style={{ backgroundImage: `repeating-linear-gradient(${115 + index * 14}deg, color-mix(in srgb, var(--foreground) 12%, transparent) 0 3px, transparent 3px 16px)` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-kicker text-[10px] uppercase tracking-[0.2em] text-accent">{item.tag}</p>
          <p className="mt-1 text-sm font-bold text-foreground">{item.title}</p>
          <p className="mt-1 font-kicker text-[10px] uppercase tracking-[0.16em] text-foreground/50">Ektachrome — {item.caption.slice(0, 28)}</p>
        </div>
      </div>
      <figcaption className="rule-t flex items-center justify-between p-4">
        <p className="truncate text-sm font-bold text-foreground">{item.title}</p>
        <p className="font-kicker text-[10px] uppercase tracking-[0.16em] text-foreground/40">{item.tag}</p>
      </figcaption>
    </figure>
  );
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawTag = params.tag;
  const tag = typeof rawTag === "string" && TAGS.includes(rawTag) ? rawTag : undefined;

  const all = await services.gallery.list();
  const published = all.filter((i) => i.status === "published");
  const items = tag ? published.filter((i) => i.tag === tag) : published;

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="kicker text-foreground/60">Photos / Contact sheet</p>
        <h1 className="font-display mt-4 text-4xl leading-[0.9] text-foreground sm:text-6xl">Moments from the crew</h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/60">
          Photos and highlights from sessions, trails, and the moments between.
        </p>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-6 border-b border-foreground/10 pb-3">
          <Link
            href="/gallery"
            className={`font-kicker text-[12px] font-bold uppercase tracking-[0.16em] transition ${
              !tag ? "text-foreground underline decoration-accent decoration-2 underline-offset-8" : "text-foreground/45 hover:text-foreground"
            }`}
          >
            All
          </Link>
          {TAGS.map((t) => (
            <Link
              key={t}
              href={`/gallery?tag=${t}`}
              className={`font-kicker text-[12px] font-bold uppercase tracking-[0.16em] transition ${
                tag === t ? "text-foreground underline decoration-accent decoration-2 underline-offset-8" : "text-foreground/45 hover:text-foreground"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="rounded-md border border-dashed border-foreground/15 bg-surface px-6 py-16 text-center">
            <p className="font-kicker text-[11px] uppercase tracking-[0.22em] text-foreground/35">No.000</p>
            <h2 className="font-display mt-4 text-xl text-foreground">No photos here yet</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-foreground/45">
              {tag
                ? `We haven't published any ${tag.toLowerCase()} moments yet. Check back soon.`
                : "The first album is on its way — check back after the next session."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 md:[grid-auto-flow:dense] lg:grid-cols-3">
            {items.map((item, index) => (
              <GalleryTile key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rule-t pt-6">
          <h2 className="font-display text-lg text-foreground">Photos live here soon</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/45">
            When Supabase Storage is wired up, sessions photos and member uploads will be moderated and published
            automatically. Until then, the gallery runs on curated demo imagery.
          </p>
        </div>
      </section>
    </main>
  );
}