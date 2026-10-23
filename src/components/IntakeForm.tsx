import { useState } from "react";

import { CONTACT_EMAIL, upcomingEvents } from "@/data/hideas";

const FIELDS = [
  { id: "name", label: "Full name", type: "text", auto: "name", required: true },
  { id: "email", label: "E-mail", type: "email", auto: "email", required: true },
  { id: "phone", label: "Phone / WhatsApp", type: "tel", auto: "tel", required: true },
  { id: "age", label: "Age", type: "number", auto: "off", required: true },
  {
    id: "emergency",
    label: "Emergency contact (name & phone)",
    type: "text",
    auto: "off",
    required: true,
  },
] as const;

const TEXTAREAS = [
  {
    id: "medication",
    label: "All medications & supplements you take (write 'none' if none)",
    required: true,
  },
  {
    id: "health",
    label: "Physical health — heart, blood pressure, liver, kidneys, epilepsy, pregnancy",
    required: true,
  },
  {
    id: "mental",
    label: "Mental-health history, including anything in your family",
    required: true,
  },
  { id: "experience", label: "Previous meditation, breathwork or cacao ceremony experience", required: false },
  { id: "intention", label: "Why are you coming? What are you hoping to set down?", required: false },
] as const;

export function IntakeForm() {
  const [sent, setSent] = useState(false);
  const sorted = upcomingEvents();

  if (sent) {
    return (
      <div className="border-2 border-ink bg-marigold p-8 text-ink shadow-[8px_8px_0_var(--ink)]">
        <h3 className="font-display text-3xl uppercase">Intake received</h3>
        <p className="mt-4 max-w-xl leading-relaxed text-ink/80">
          A facilitator reads every form personally. We&rsquo;ll reply within 48 hours to
          confirm your seat, ask a follow-up question, or suggest a different circle. Your
          seat isn&rsquo;t confirmed until you hear from us — and if we can&rsquo;t seat you
          safely, you&rsquo;re refunded in full.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const values = new FormData(e.currentTarget);
        const lines = Array.from(values.entries()).map(([key, value]) => `${key}: ${String(value)}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hideas participation and consent form")}&body=${encodeURIComponent(lines.join("\n"))}`;
        setSent(true);
      }}
      className="border-2 border-ink bg-cream p-6 text-ink shadow-[10px_10px_0_var(--magenta)] sm:p-8"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
        Confidential — read only by the facilitators
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <label key={f.id} className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
              {f.label}
            </span>
            <input
              id={`intake-${f.id}`}
              name={f.label}
              type={f.type}
              autoComplete={f.auto}
              required={f.required}
              className="mt-1 w-full border-2 border-ink bg-paper px-3 py-2 font-body outline-none focus:shadow-[4px_4px_0_var(--magenta)]"
            />
          </label>
        ))}

        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
            Which circle?
          </span>
          <select
            id="intake-circle"
            name="Circle"
            required
            className="mt-1 w-full border-2 border-ink bg-paper px-3 py-2 font-body outline-none focus:shadow-[4px_4px_0_var(--magenta)]"
          >
            {sorted.map((e) => (
              <option key={e.id} value={e.id}>
                {e.date} — {e.title}
              </option>
            ))}
            <option value="private">Private / group booking</option>
          </select>
        </label>
      </div>

      <div className="mt-4 space-y-4">
        {TEXTAREAS.map((t) => (
          <label key={t.id} className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
              {t.label}
            </span>
            <textarea
              id={`intake-${t.id}`}
              name={t.label}
              rows={2}
              required={t.required}
              className="mt-1 w-full border-2 border-ink bg-paper px-3 py-2 font-body outline-none focus:shadow-[4px_4px_0_var(--magenta)]"
            />
          </label>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {[
          "I have read the safety and contraindications list above and nothing on it applies to me without me disclosing it here.",
          "I will not drink alcohol or use recreational substances for 24 hours before the circle, and I have arranged a ride home.",
          "I understand my seat is only confirmed after a facilitator reviews this form.",
          "I understand participation is voluntary, I may pause or stop at any time, and I will communicate my boundaries to the facilitators.",
          "I understand that touch is never assumed and I will be asked for consent each time.",
          "I consent to the facilitators receiving the information in this form by email for screening and participation planning.",
        ].map((c) => (
          <label key={c.slice(0, 20)} className="flex gap-3 text-sm leading-relaxed text-ink/80">
            <input
              type="checkbox"
              name="Consent"
              value={c}
              required
              className="mt-1 size-4 shrink-0 accent-[var(--ember)]"
            />
            {c}
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="mt-7 w-full border-2 border-ink bg-ink px-5 py-3 font-display text-lg uppercase text-cream transition-transform hover:-translate-y-0.5"
      >
         Email my intake &amp; consent
      </button>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-ink/50">
        Or e-mail it to {CONTACT_EMAIL}
      </p>
    </form>
  );
}
