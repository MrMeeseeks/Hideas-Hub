import { useState } from "react";
import { EPISODES, PODCAST_CATEGORIES, type PodcastCategory } from "@/data/hideas";

export function PodcastSection() {
  const [cat, setCat] = useState<PodcastCategory>(PODCAST_CATEGORIES[0]);
  const [playing, setPlaying] = useState<string | null>(null);
  const episodes = EPISODES[cat];

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {PODCAST_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCat(c);
              setPlaying(null);
            }}
            className={`border-2 border-ink px-4 py-2 font-display text-base uppercase transition-transform hover:-translate-y-0.5 ${
              cat === c
                ? "bg-ink text-cream shadow-[5px_5px_0_var(--cream)]"
                : "bg-cream text-ink shadow-[5px_5px_0_var(--ink)]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {episodes.map((e, i) => {
          const id = `${cat}-${e.n}`;
          const isPlaying = playing === id;
          return (
            <article
              key={id}
              className="border-2 border-ink bg-ink text-cream shadow-[7px_7px_0_var(--cream)]"
              style={{ transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)` }}
            >
              <div className="relative aspect-video border-b-2 border-ink bg-ink-soft">
                {isPlaying ? (
                  e.kind === "youtube" ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${e.src}?autoplay=1`}
                      title={e.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="size-full"
                    />
                  ) : (
                    <video
                      src={e.src}
                      poster={e.poster}
                      controls
                      autoPlay
                      playsInline
                      className="size-full object-cover"
                    />
                  )
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(id)}
                    aria-label={`Play ${e.title}`}
                    className="group relative block size-full"
                  >
                    <img
                      src={e.poster}
                      alt={e.title}
                      loading="lazy"
                      decoding="async"
                      width={1024}
                      height={576}
                      className="size-full object-cover"
                    />

                    <span className="absolute inset-0 grid place-items-center bg-ink/35 transition-colors group-hover:bg-ink/15">
                      <span className="grid size-16 place-items-center rounded-full border-2 border-cream bg-magenta font-display text-2xl text-cream">
                        ▶
                      </span>
                    </span>
                  </button>
                )}
                <span className="absolute left-0 top-0 bg-marigold px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                  {cat} · Ep {e.n}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-xl italic leading-snug">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{e.blurb}</p>
                {e.link ? (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-marigold hover:text-cream"
                  >
                    Full episode →
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
