import { FACILITATORS } from "@/data/hideas";

export function TeamSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {FACILITATORS.map((f, i) => (
        <article
          key={f.name}
          className="border-2 border-cream/20 bg-ink-soft p-6 shadow-[8px_8px_0_var(--jade)] sm:p-8"
          style={{ transform: `rotate(${i % 2 ? 0.4 : -0.4}deg)` }}
        >
          <div className="flex flex-wrap items-center gap-5">
            <div className="sticker size-28 shrink-0 overflow-hidden rotate-[-2deg]">
              <img
                src={f.img}
                alt={`${f.name}, ${f.role}`}
                width={900}
                height={900}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
            <div>
              <h3 className="poster text-4xl text-cream sm:text-5xl">{f.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-marigold">
                {f.role}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {f.bio.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-cream/75">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {f.tags.map((t) => (
              <span
                key={t}
                className="border-2 border-cream/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/70"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-5">
            {f.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-jade hover:text-marigold"
              >
                {l.label} →
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
