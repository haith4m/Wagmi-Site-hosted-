import Link from "next/link";
import { PhotoLightboxGrid, type PhotoTile } from "@/components/gallery/photo-lightbox";

export const dynamic = "force-static";

const GALLERY: PhotoTile[] = [
  { id: "p1", src: "/gallery/IMG_2205.JPG", title: "Crew in the lens", caption: "Post-run pause on the towpath.", tag: "Community" },
  { id: "p2", src: "/gallery/night-run-crew-riverside.jpg", title: "Night run, riverside", caption: "A quieter side of the city.", tag: "Run" },
  { id: "p3", src: "/gallery/marathon-support-crew.jpg", title: "Support crew", caption: "One of us, all of us.", tag: "Community" },
  { id: "p4", src: "/gallery/london-marathon-finisher.jpg", title: "London Marathon finisher", caption: "The day the club got bigger.", tag: "Run" },
  { id: "p5", src: "/gallery/with-mo-farah.jpg", title: "With Mo Farah", caption: "A proper London moment.", tag: "Community" },
  { id: "p6", src: "/gallery/greenwich-dusk-riverside.jpg", title: "North Greenwich at dusk", caption: "Where we meet.", tag: "Run" },
  { id: "p7", src: "/gallery/IMG_2243.JPG", title: "Down the towpath", caption: "London running, properly.", tag: "Run" },
  { id: "p8", src: "/gallery/_DSF4262.jpg", title: "After the run", caption: "The part nobody posts.", tag: "Community" },
];

export default function PhotosPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="kicker kicker--beige">Photos</p>
        <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] leading-[0.88] tracking-tight text-foreground">
          The contact sheet.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          Real moments from WAGMI runs, races, and the bits in between. Click any photo to open it larger.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <PhotoLightboxGrid
          photos={GALLERY}
          columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          tilt
        />
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="kicker kicker--muted">More photos coming</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            This is the first WAGMI contact sheet. New photos will be added after runs, races, and
            meet-ups — because the club is the photos, not the other way around.
          </p>
        </div>
      </section>
    </main>
  );
}
