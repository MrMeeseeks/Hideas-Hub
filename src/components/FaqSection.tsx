import { useState } from "react";

import { FAQ } from "@/data/hideas";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {FAQ.map((f, i) => {
        const isOpen = open === i;
        return (
          <li
            key={f.q}
            className="border-2 border-cream/25 bg-ink-soft shadow-[6px_6px_0_var(--jade)]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-xl uppercase leading-tight text-cream">
                {f.q}
              </span>
              <span
                aria-hidden="true"
                className={`mt-1 font-mono text-lg text-marigold transition-transform ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="border-t-2 border-cream/15 px-5 py-4 text-sm leading-relaxed text-cream/75">
                {f.a}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
