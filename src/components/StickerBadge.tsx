type Fx = "celestial" | "mothership" | "heavens" | "jack";

export function StickerBadge({
  src,
  href,
  fx,
  label,
  delay = 0,
}: {
  src: string;
  href: string;
  fx?: Fx | undefined;
  label: string;
  delay?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} — view product`}
      className="group absolute -right-2 bottom-2 z-10 block w-[46%] cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-marigold"
    >
      <span className="relative block animate-sticker-idle" style={{ animationDelay: `${delay}s` }}>
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={900}
          height={900}

          className={`w-full drop-shadow-[6px_6px_0_rgba(0,0,0,0.35)] ${
            fx === "jack"
              ? "origin-[55%_30%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.5]"
              : ""
          }`}
        />

        {fx === "celestial" ? (
          <span className="sticker-fx-layer">
            <span className="absolute left-[24%] top-[46%] h-[7%] w-[7%] rounded-full bg-cream/70 blur-[0.5px] [animation:planet-drift-a_6s_ease-in-out_infinite]" />
            <span className="absolute left-[66%] top-[34%] h-[9%] w-[9%] rounded-full bg-sky/60 [animation:planet-drift-b_7.5s_ease-in-out_infinite]" />
            <span className="absolute left-[47%] top-[60%] h-[5%] w-[5%] rounded-full bg-marigold/70 [animation:planet-drift-c_5.5s_ease-in-out_infinite]" />
          </span>
        ) : null}

        {fx === "mothership" ? (
          <span className="sticker-fx-layer">
            {/* bay door sliding open under the saucer */}
            <span className="absolute left-[39%] top-[19.5%] h-[3.4%] w-[22%] rounded-full bg-[#10161f] transition-transform duration-500 ease-out [transform-origin:left_center] group-hover:scale-x-0" />
            {/* light beam fades in after the door opens */}
            <span
              className="absolute left-[33%] top-[21%] h-[58%] w-[34%] origin-top opacity-0 [clip-path:polygon(30%_0,70%_0,100%_100%,0_100%)] group-hover:[animation:beam-fade_0.7s_0.5s_ease-out_forwards]"
              style={{
                background:
                  "linear-gradient(to bottom, color-mix(in oklab, var(--jade) 92%, white), color-mix(in oklab, var(--jade) 40%, transparent))",
              }}
            />
            {/* label pops last */}
            <span className="absolute bottom-[16%] left-1/2 -translate-x-1/2 whitespace-nowrap border-[3px] border-ink bg-cream px-2 py-0.5 font-display text-[10px] uppercase tracking-wide text-ink opacity-0 group-hover:[animation:label-pop_0.5s_1.25s_ease-out_forwards]">
              Mothership
            </span>
          </span>
        ) : null}

        {fx === "heavens" ? (
          <span className="sticker-fx-layer">
            {[
              [30, 30],
              [62, 26],
              [40, 46],
              [70, 50],
              [50, 62],
              [26, 55],
            ].map(([l, t], i) => (
              <span
                key={`${l}-${t}`}
                className="absolute h-[4%] w-[4%] rounded-full bg-cream opacity-0 shadow-[0_0_6px_var(--cream)] group-hover:[animation:star-blink_0.4s_ease-out_forwards]"
                style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
            <span className="absolute left-[18%] top-[16%] h-[2px] w-[26%] rounded-full bg-cream opacity-0 shadow-[0_0_10px_var(--cream)] group-hover:[animation:shoot_0.7s_0.8s_ease-out_forwards]" />
            <span className="absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-marigold px-2 py-0.5 font-display text-[9px] uppercase text-ink opacity-0 group-hover:[animation:label-pop_0.5s_1.4s_ease-out_forwards]">
              Heaven&rsquo;s Kiss
            </span>
          </span>
        ) : null}

        {fx === "jack" ? (
          <span className="sticker-fx-layer overflow-hidden">
            <span
              className="absolute left-[42%] top-[16%] h-[20%] w-[22%] rounded-[45%] opacity-0 mix-blend-screen transition-transform duration-[900ms] ease-out group-hover:scale-[1.5] group-hover:[animation:visor-stars_0.7s_0.6s_ease-out_forwards]"
              style={{
                transformOrigin: "55% 60%",
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1.4px), radial-gradient(circle, white 0.8px, transparent 1.2px)",
                backgroundSize: "14px 14px, 9px 9px",
                backgroundPosition: "0 0, 5px 7px",
              }}
            />
          </span>
        ) : null}
      </span>
    </a>
  );
}
