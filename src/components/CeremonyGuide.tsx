import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { PrepareSection, SafetySection } from "@/components/PrepareSection";
import { IntakeForm } from "@/components/IntakeForm";
import { POLICY } from "@/data/hideas";

export type GuideTab = "prepare" | "safety" | "intake" | "policy";

const TABS: { id: GuideTab; label: string; blurb: string }[] = [
  { id: "prepare", label: "Prepare & integrate", blurb: "How to eat, rest, pack and land afterwards." },
  { id: "safety", label: "Safety & screening", blurb: "Who this is for, and honestly who it isn't." },
  { id: "intake", label: "Intake form", blurb: "Five minutes. Read only by the facilitators." },
  { id: "policy", label: "Booking & refunds", blurb: "Deposits, rescheduling, cancellations." },
];

/** Anywhere in the app: openGuide("safety") pops the ceremony info modal. */
export function openGuide(tab: GuideTab = "prepare") {
  window.dispatchEvent(new CustomEvent("hideas:open-guide", { detail: tab }));
}

export function GuideButton({
  tab,
  children,
  className = "",
}: {
  tab: GuideTab;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => openGuide(tab)} className={className}>
      {children}
    </button>
  );
}

export function CeremonyGuide() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<GuideTab>("prepare");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<GuideTab>).detail;
      setTab(detail ?? "prepare");
      setOpen(true);
    };
    window.addEventListener("hideas:open-guide", onOpen);
    return () => window.removeEventListener("hideas:open-guide", onOpen);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  if (!mounted || !open) return null;

  const active = TABS.find((t) => t.id === tab) ?? TABS[0];
  if (!active) return null;

  return createPortal(
    <div className="fixed inset-0 z-[130] flex items-start justify-center overflow-y-auto p-3 sm:p-8">
      <button
        type="button"
        aria-label="Close guide"
        onClick={close}
        className="fixed inset-0 bg-ink/85 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Before you sit with us"
        className="relative my-4 w-full max-w-5xl border-2 border-ink bg-cream text-ink shadow-[12px_12px_0_var(--magenta)]"
      >
        <div className="sticky top-0 z-10 border-b-2 border-ink bg-cream px-5 py-4 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
                Before you sit with us
              </p>
              <h2 className="poster mt-2 text-3xl sm:text-4xl">{active.label}</h2>
              <p className="mt-1 text-sm text-ink/60">{active.blurb}</p>
            </div>
            <button
              type="button"
              onClick={close}
              className="shrink-0 border-2 border-ink px-3 py-1 font-display text-sm uppercase transition-transform hover:-translate-y-0.5"
            >
              Close
            </button>
          </div>

          <div className="-mx-5 mt-4 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`border-2 border-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5 ${
                    t.id === tab
                      ? "bg-ink text-cream"
                      : "bg-paper text-ink/70 hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-7 sm:px-7 sm:py-9">
          {tab === "prepare" && <PrepareSection />}
          {tab === "safety" && (
            <div className="[&_h3]:text-cream-none">
              <SafetySection />
              <p className="mt-6 text-sm leading-relaxed text-ink/60">
                None of this is medical advice — talk to your doctor before changing any
                prescribed medication.
              </p>
            </div>
          )}
          {tab === "intake" && <IntakeForm />}
          {tab === "policy" && (
            <dl className="grid gap-5 sm:grid-cols-2">
              {POLICY.map((p) => (
                <div
                  key={p.k}
                  className="border-2 border-ink bg-paper p-5 shadow-[5px_5px_0_var(--jade)]"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                    {p.k}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink/75">{p.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
