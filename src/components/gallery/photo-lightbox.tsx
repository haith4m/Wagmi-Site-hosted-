"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Serializable photo data passed from server components. */
export interface PhotoTile {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
}

/**
 * Editorial lightbox — click a photo anywhere on the site to open it larger.
 * Closes via the ✕ control, the backdrop, or the Escape key.
 */
function Lightbox({
  tile,
  total,
  position,
  onClose,
}: {
  tile: PhotoTile;
  total: number;
  position: number;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${tile.title} — enlarged photo`}
      className="fixed inset-0 z-[90] overflow-y-auto bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo view"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 font-display text-lg text-foreground transition hover:border-accent hover:text-accent sm:right-6 sm:top-6"
      >
        ✕
      </button>
      <div className="flex min-h-full items-center justify-center px-4 py-12">
        <figure className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
          <div className="bw-photo overflow-hidden rounded-md border border-foreground/15 bg-surface">
            <img
              src={tile.src}
              alt={`${tile.title} — ${tile.caption}`}
              className="mx-auto max-h-[76vh] w-full object-contain"
            />
          </div>
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="font-kicker text-[10px] uppercase tracking-[0.22em] text-accent">
                Photo {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")} — {tile.tag}
              </p>
              <p className="font-display mt-2 text-2xl text-foreground">{tile.title}</p>
              <p className="mt-1 text-sm text-foreground/55">{tile.caption}</p>
            </div>
            <p className="font-kicker text-[10px] uppercase tracking-[0.22em] text-foreground/40">WAGMI Club / LDN</p>
          </figcaption>
        </figure>
      </div>
    </div>
    );
}

/**
 * Hook that manages lightbox open/close state and arrow-key navigation.
 * Use alongside <Lightbox /> in any page that renders a grid of PhotoTiles.
 *
 * @param total  The number of photos in the current collection.
 * @returns      { openIndex, open, close } — index is null when closed.
 */
export function usePhotoLightbox(total: number) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenIndex(null);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setOpenIndex(Math.max(0, openIndex - 1));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setOpenIndex(Math.min(total - 1, openIndex + 1));
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, total]);

  return {
    openIndex,
    open: (index: number) => setOpenIndex(index),
    close: () => setOpenIndex(null),
  };
}

/**
 * Standalone editorial lightbox overlay.
 * Renders a full-screen, focusable modal with photo metadata.
 */
export function PhotoLightboxOverlay({
  tile,
  total,
  position,
  onClose,
}: {
  tile: PhotoTile;
  total: number;
  position: number;
  onClose: () => void;
}) {
    return <Lightbox tile={tile} total={total} position={position} onClose={onClose} />;
}

/**
 * Reusable editorial photo grid with lightbox integration.
 *
 * Renders a responsive masonry grid of clickable PhotoTiles. Each tile opens
 * the `PhotoLightboxOverlay` with keyboard (←/→/Esc) navigation.
 * When `photos` is empty the component renders nothing — let the caller
 * decide how to handle the empty state.
 *
 * @param photos   PhotoTile[] to render.
 * @param columns  Tailwind grid-cols classes (default: 2–3 col editorial grid).
 * @param tilt     When true, applies the gallery page's row-span/tilt masonry offsets.
 */
export function PhotoLightboxGrid({
  photos,
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  tilt = false,
}: {
  photos: PhotoTile[];
  columns?: string;
  tilt?: boolean;
}) {
  const { openIndex, open, close } = usePhotoLightbox(photos.length);

  if (photos.length === 0) return null;

  return (
    <>
      <div className={`grid gap-4 md:[grid-auto-flow:dense] ${columns}`}>
        {photos.map((photo, i) => {
          const tall = i % 3 === 0;
          const offsetClass = tilt
            ? `${i % 4 === 1 ? "md:mt-8 " : ""}${i % 4 === 3 ? "md:-mt-4 " : ""}`
            : "";
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => open(i)}
              aria-label={`Open ${photo.title}`}
              className={`group relative block overflow-hidden rounded-md border border-foreground/10 bg-surface ${
                tilt && tall ? "md:row-span-2 " : ""
              }${offsetClass}`}
            >
              <div
                className={`bw-photo relative w-full overflow-hidden bg-foreground/10 ${
                  tilt && tall ? "md:h-full md:min-h-80" : "aspect-[4/3]"
                }`}
                style={{
                  backgroundImage: `repeating-linear-gradient(${
                    115 + i * 14
                  }deg, color-mix(in srgb, var(--foreground) 12%, transparent) 0 3px, transparent 3px 16px)`,
                }}
              >
                {photo.src && (
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-kicker text-[10px] uppercase tracking-[0.2em] text-accent">
                    {photo.tag}
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    {photo.title}
                  </p>
                  <p className="mt-1 font-kicker text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                    Ektachrome — {photo.caption.slice(0, 28)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {openIndex !== null && (
        <PhotoLightboxOverlay
          tile={photos[openIndex]}
          total={photos.length}
          position={openIndex + 1}
          onClose={close}
        />
      )}
    </>
    );
}