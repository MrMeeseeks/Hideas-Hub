import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GALLERY } from "@/data/hideas";

export function CraftGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const drag = useRef({ down: false, moved: 0, startX: 0, startScroll: 0 });

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, moved: 0, startX: e.clientX, startScroll: el.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    // only hijack the pointer once it's clearly a drag, so plain clicks still open the lightbox
    if (drag.current.moved > 6) {
      if (!el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId);
      el.scrollLeft = drag.current.startScroll - dx;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    drag.current.down = false;
  };

  const step = useCallback(
    (dir: number) => setOpen((o) => (o === null ? o : (o + dir + GALLERY.length) % GALLERY.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const active = open === null ? null : GALLERY[open];

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-6 select-none active:cursor-grabbing"
        style={{ scrollbarWidth: "thin" }}
      >
        {GALLERY.map((g, i) => (
          <figure
            key={g.src}
            role="button"
            tabIndex={0}
            onClick={() => {
              if (drag.current.moved < 6) setOpen(i);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(i);
              }
            }}
            className="sticker relative w-[74vw] shrink-0 snap-center bg-cream transition-transform hover:-translate-y-1 sm:w-[38vw] lg:w-[26vw]"
            style={{ transform: `rotate(${i % 3 === 0 ? -1.2 : i % 3 === 1 ? 1.1 : 0}deg)` }}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              decoding="async"
              width={1200}
              height={900}
              draggable={false}
              className="aspect-4/3 w-full object-cover [filter:saturate(1.06)_contrast(1.05)_sepia(0.12)_brightness(0.98)]"
            />

            <figcaption className="bg-cream px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
              {g.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous images"
          className="grid size-11 place-items-center border-2 border-ink bg-marigold font-display text-ink transition-transform hover:-translate-y-0.5"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next images"
          className="grid size-11 place-items-center border-2 border-ink bg-magenta font-display text-cream transition-transform hover:-translate-y-0.5"
        >
          →
        </button>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">
          Drag to slide · click to enlarge — {GALLERY.length} hand-made things
        </span>
      </div>

      {active && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          <figure
            className="sticker max-h-[88vh] max-w-[92vw] bg-cream"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[78vh] w-auto max-w-[92vw] object-contain [filter:saturate(1.06)_contrast(1.05)_sepia(0.12)]"
            />
            <figcaption className="flex items-center justify-between gap-4 bg-cream px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
              <span>{active.alt}</span>
              <span>
                {(open ?? 0) + 1} / {GALLERY.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center border-2 border-ink bg-marigold font-display text-ink"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center border-2 border-ink bg-magenta font-display text-cream"
          >
            →
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 border-2 border-ink bg-cream px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink"
          >
            Close
          </button>
        </div>,
        document.body,
      )}
    </div>
  );
}
