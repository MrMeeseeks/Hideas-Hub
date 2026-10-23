import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const KEY = "hideas-intro-seen";
const DURATION = 4600;

function Ufo() {
  return (
    <svg viewBox="0 0 240 120" className="w-full" aria-hidden="true">
      <ellipse cx="120" cy="74" rx="112" ry="30" fill="var(--cream)" stroke="var(--ink)" strokeWidth="6" />
      <path
        d="M62 58a58 42 0 0 1 116 0Z"
        fill="var(--cream)"
        stroke="var(--ink)"
        strokeWidth="6"
      />
      <ellipse cx="120" cy="58" rx="58" ry="14" fill="var(--sky)" opacity="0.5" />
      {[36, 78, 162, 204].map((x, i) => (
        <ellipse
          key={x}
          cx={x}
          cy={i === 1 || i === 2 ? 66 : 76}
          rx="13"
          ry="6"
          fill="var(--ink)"
        />
      ))}
      <ellipse cx="120" cy="82" rx="26" ry="10" fill="var(--ink)" />
    </svg>
  );
}

export function IntroBeam() {
  const [state, setState] = useState<"idle" | "playing">("idle");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("playing");
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => finish(), DURATION);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "";
    setState("idle");
  }

  if (state !== "playing" || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] overflow-hidden bg-ink [animation:intro-curtain_0.7s_3.9s_ease-in_forwards]">
      <div className="grain-overlay pointer-events-none absolute inset-0" />

      {/* star field */}
      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-cream opacity-0 [animation:intro-twinkle_2.6s_ease-in-out_infinite]"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 61) % 100}%`,
            animationDelay: `${(i % 9) * 0.18}s`,
          }}
        />
      ))}

      {/* beam + payload */}
      <div className="absolute left-1/2 top-0 h-full w-[min(680px,86vw)] -translate-x-1/2">
        <div
          className="absolute left-1/2 top-[16%] h-[62%] w-full origin-top -translate-x-1/2 opacity-0 [animation:intro-beam_3.1s_0.85s_ease-out_forwards] [clip-path:polygon(43%_0,57%_0,100%_100%,0_100%)]"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--jade) 92%, white), color-mix(in oklab, var(--jade) 35%, transparent) 70%, transparent)",
          }}
        />

        <div className="absolute left-1/2 top-[52%] w-full -translate-x-1/2 text-center opacity-0 [animation:intro-payload_1.1s_1.9s_cubic-bezier(0.2,1.3,0.4,1)_forwards]">
          <p className="poster text-[15vw] leading-none text-cream sm:text-[7rem]">H!DEAS</p>
          <p className="mt-2 font-script text-2xl text-marigold">socials + ceremony</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.32em] text-jade">
            beaming the circle into place
          </p>
        </div>
      </div>

      {/* the ship */}
      <div className="absolute left-1/2 top-[6%] w-[min(360px,60vw)] -translate-x-1/2 [animation:intro-ship-in_1s_ease-out_both,intro-ship-hover_2s_1s_ease-in-out_2,intro-ship-out_0.9s_3.1s_ease-in_forwards]">
        <Ufo />
      </div>

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 border-2 border-cream/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] text-cream/70 transition-colors hover:border-marigold hover:text-marigold"
      >
        Skip intro
      </button>
    </div>,
    document.body,
  );
}
