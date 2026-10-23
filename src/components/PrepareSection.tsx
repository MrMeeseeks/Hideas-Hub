import { PREPARE_STEPS, SAFETY_HARD, SAFETY_TALK, SAFETY_PROMISE } from "@/data/hideas";
import { WHATSAPP_LINK } from "@/data/hideas";

export function PrepareSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {PREPARE_STEPS.map((s, i) => (
        <article
          key={s.k}
          className="border-2 border-ink bg-paper p-6 text-ink shadow-[6px_6px_0_var(--ink)]"
          style={{ transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)` }}
        >
          <span className="inline-block border-2 border-ink bg-marigold px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]">
            {s.k}
          </span>
          <h3 className="mt-4 font-display text-2xl uppercase leading-tight">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/75">{s.body}</p>
        </article>
      ))}
    </div>
  );
}

export function SafetySection() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <article className="border-2 border-ink bg-ember p-6 text-cream shadow-[8px_8px_0_var(--ink)]">
        <h3 className="font-display text-2xl uppercase">Please don't sit with us if…</h3>
        <ul className="mt-4 space-y-3">
          {SAFETY_HARD.map((s) => (
            <li key={s.slice(0, 20)} className="flex gap-3 text-sm leading-relaxed text-cream/90">
              <span aria-hidden="true" className="font-mono text-marigold">
                ✕
              </span>
              {s}
            </li>
          ))}
        </ul>
      </article>

      <article className="border-2 border-ink bg-paper p-6 text-ink shadow-[8px_8px_0_var(--magenta)]">
        <h3 className="font-display text-2xl uppercase">Talk to us first about…</h3>
        <ul className="mt-4 space-y-3">
          {SAFETY_TALK.map((s) => (
            <li key={s.slice(0, 20)} className="flex gap-3 text-sm leading-relaxed text-ink/80">
              <span aria-hidden="true" className="font-mono text-ember">
                !
              </span>
              {s}
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block border-2 border-ink bg-marigold px-4 py-2 font-display text-sm uppercase text-ink transition-transform hover:-translate-y-0.5"
        >
          Ask privately on WhatsApp
        </a>
      </article>

      <article className="border-2 border-ink bg-jade p-6 text-cream shadow-[8px_8px_0_var(--ink)]">
        <h3 className="font-display text-2xl uppercase">How we hold you</h3>
        <ul className="mt-4 space-y-3">
          {SAFETY_PROMISE.map((s) => (
            <li key={s.slice(0, 20)} className="flex gap-3 text-sm leading-relaxed text-cream/90">
              <span aria-hidden="true" className="font-mono text-marigold">
                ✦
              </span>
              {s}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
