import { CONTACT_EMAIL, TESTIMONIALS } from "@/data/hideas";
import { VoiceStory } from "@/components/VoiceStory";

export function Testimonials() {
  if (TESTIMONIALS.length === 0) {
    return (
      <div className="space-y-8">
      <div className="border-2 border-cream/25 bg-ink-soft p-8 text-center shadow-[8px_8px_0_var(--marigold)]">
        <p className="font-script text-3xl text-marigold">
          We only publish real words from real journeys ✦
        </p>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream/75">
          If you&rsquo;ve journeyed with us, you can leave a short audio reflection below.
          Choose whether to share your name; nothing is published without your permission.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=My%20words%20from%20the%20circle`}
          className="mt-6 inline-block border-2 border-ink bg-marigold px-6 py-3 font-display text-lg uppercase text-ink shadow-[6px_6px_0_var(--magenta)] transition-transform hover:-translate-y-1"
        >
          Share your journey
        </a>
      </div>
      <VoiceStory />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <figure
          key={t.quote.slice(0, 24)}
          className="border-2 border-ink bg-paper p-6 text-ink shadow-[6px_6px_0_var(--jade)]"
          style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
        >
          <blockquote className="font-serif text-lg italic leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
            {t.name} — {t.circle}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
