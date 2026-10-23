import { useState } from "react";

import { CONTACT_EMAIL, WHATSAPP_LINK } from "@/data/hideas";
import { SocialLinks } from "@/components/SocialLinks";

const TYPES = [
  "General question",
  "Private / group ceremony",
  "Corporate or team day",
  "Retreat or festival collaboration",
  "Press & podcast",
];

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
      <div>
        <div className="border-2 border-cream/25 bg-ink-soft p-6 shadow-[8px_8px_0_var(--jade)] sm:p-8">
          <h3 className="font-display text-2xl uppercase text-cream">Follow + Contact</h3>
          <ul className="mt-5 space-y-3 text-cream/80">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono text-sm hover:text-marigold">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm hover:text-marigold"
              >
                 WhatsApp (647) 458-1685
              </a>
            </li>
            <li className="font-mono text-sm text-cream/60">
              Vancouver &amp; Central BC — Kelowna, Vernon and Penticton · replies within 48 hours
            </li>
          </ul>
          <div className="mt-6">
            <SocialLinks tone="dark" />
          </div>
        </div>
      </div>

      {sent ? (
        <div className="h-fit border-2 border-ink bg-marigold p-8 text-ink shadow-[8px_8px_0_var(--ink)]">
          <h3 className="font-display text-3xl uppercase">Message sent</h3>
          <p className="mt-4 leading-relaxed text-ink/80">
            Thank you — we read everything ourselves and reply within 48 hours. For anything
            urgent, WhatsApp is fastest.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const values = new FormData(e.currentTarget);
            const lines = Array.from(values.entries()).map(([key, value]) => `${key}: ${String(value)}`);
            window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hideas enquiry")}&body=${encodeURIComponent(lines.join("\n"))}`;
            setSent(true);
          }}
          className="h-fit border-2 border-ink bg-cream p-6 text-ink shadow-[10px_10px_0_var(--magenta)] sm:p-8"
        >
          <h3 className="font-display text-2xl uppercase">Private, group &amp; corporate</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Silent-disco meditation, breathwork, and cacao ceremonies for private groups,
            team days, and retreats. We travel across BC and shape the circle with you.
          </p>

          <div className="mt-5 space-y-3">
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                Enquiry type
              </span>
              <select
                required
                id="contact-type"
                name="Enquiry type"
                className="mt-1 w-full border-2 border-ink bg-paper px-3 py-2 font-body outline-none focus:shadow-[4px_4px_0_var(--magenta)]"
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

            {[
              { id: "name", label: "Your name", type: "text", auto: "name" },
              { id: "email", label: "E-mail", type: "email", auto: "email" },
              { id: "group", label: "Group size & preferred dates", type: "text", auto: "off" },
            ].map((f) => (
              <label key={f.id} className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                  {f.label}
                </span>
                <input
                  required
                  id={`contact-${f.id}`}
                  name={f.label}
                  type={f.type}
                  autoComplete={f.auto}
                  className="mt-1 w-full border-2 border-ink bg-paper px-3 py-2 font-body outline-none focus:shadow-[4px_4px_0_var(--magenta)]"
                />
              </label>
            ))}

            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                Tell us what you have in mind
              </span>
              <textarea
                required
                rows={4}
                id="contact-message"
                name="Message"
                className="mt-1 w-full border-2 border-ink bg-paper px-3 py-2 font-body outline-none focus:shadow-[4px_4px_0_var(--magenta)]"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full border-2 border-ink bg-ink px-5 py-3 font-display text-lg uppercase text-cream transition-transform hover:-translate-y-0.5"
          >
             Email enquiry
          </button>
        </form>
      )}
    </div>
  );
}
