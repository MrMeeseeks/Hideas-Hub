interface PriceTagProps {
  price: string;
  wasPrice?: string | undefined;
  delay?: number | undefined;
}

/** Clothing-store style kraft price tag, dangling from a string. */
export function PriceTag({ price, wasPrice, delay = 0 }: PriceTagProps) {
  return (
    <div
      className="price-tag-sway pointer-events-none origin-top"
      style={{ transform: "rotate(-8deg)", animationDelay: `${delay}s` }}
    >
      {/* string */}
      <svg width="46" height="34" viewBox="0 0 46 34" className="mx-auto block">
        <path
          d="M23 0 C 26 10, 20 18, 23 30"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeDasharray="3 2"
        />
        <circle cx="23" cy="30" r="2.5" fill="var(--ink)" />
      </svg>

      {/* tag body */}
      <div className="relative -mt-0.5">
        <div
          className="relative bg-[#f3e4c2] px-4 py-2.5 font-display shadow-[3px_3px_0_rgba(0,0,0,0.55)]"
          style={{
            clipPath:
              "polygon(14% 0, 100% 0, 100% 100%, 14% 100%, 0 50%)",
          }}
        >
          {/* punched hole */}
          <span
            className="absolute left-[9%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-ink/60 bg-paper shadow-inner"
            aria-hidden
          />
          <div className="pl-3 text-center leading-none">
            {wasPrice ? (
              <span className="block text-[10px] uppercase tracking-wide text-ember line-through">
                {wasPrice}
              </span>
            ) : null}
            <span className="text-lg text-ink">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
