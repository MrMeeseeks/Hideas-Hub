import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { EVENTS, WHATSAPP_LINK, upcomingEvents } from "@/data/hideas";
import ceremonyImg from "@/assets/ceremony.webp";
import { parsePrice, useCart } from "@/lib/cart";
import { PriceTag } from "@/components/PriceTag";
import { openGuide } from "@/components/CeremonyGuide";
import { getHideasCalendarEvents } from "@/lib/calendar.functions";


const isDonation = (price: string) => !/\$\s?\d/.test(price);

/** Kraft-paper box where guests write their own donation amount. */
function DonationBox({
  value,
  onChange,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  invalid: boolean;
}) {
  return (
    <label
      className={`flex items-center gap-2 border-2 border-ink bg-cream px-3 py-2 font-mono text-sm text-ink shadow-[4px_4px_0_var(--marigold)] transition-transform ${
        invalid ? "-rotate-1 animate-pulse border-ember" : "rotate-1"
      }`}
    >
      <span className="font-display text-lg leading-none">$</span>
      <input
        type="number"
        min={1}
        step="1"
        inputMode="decimal"
        placeholder="your amount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 bg-transparent font-mono text-sm outline-none placeholder:text-ink/40"
        aria-label="Donation amount in dollars"
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
        CAD
      </span>
    </label>
  );
}

/** Short label for the dangling tag: "$45" or "Donation". */
function tagLabel(price: string) {
  const m = price.match(/\$\s?\d+(\.\d{2})?/);
  return m ? m[0].replace(/\s/g, "") : "Donation";
}

function fmt(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return {
    day: d.toLocaleDateString("en-CA", { day: "2-digit" }),
    month: d.toLocaleDateString("en-CA", { month: "short" }).toUpperCase(),
    year: d.getFullYear(),
    weekday: d.toLocaleDateString("en-CA", { weekday: "long" }),
  };
}

export function EventsSection() {
  const { add, setOpen } = useCart();
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [invalid, setInvalid] = useState<string | null>(null);
  const fetchCalendar = useServerFn(getHideasCalendarEvents);
  const calendar = useQuery({
    queryKey: ["hideas-google-calendar"],
    queryFn: () => fetchCalendar(),
    staleTime: 5 * 60 * 1000,
    // Static hosts (GitHub Pages) have no server to run the calendar function.
    enabled: import.meta.env["VITE_STATIC_SITE"] !== "true",
  });

  const reserve = (e: (typeof EVENTS)[number]) => {
    let price = parsePrice(e.price);
    let name = `Seat — ${e.title}`;
    if (isDonation(e.price)) {
      const amt = Number(amounts[e.id]);
      if (!amt || amt <= 0) {
        setInvalid(e.id);
        window.setTimeout(() => setInvalid(null), 1600);
        return;
      }
      price = amt;
      name = `Donation — ${e.title}`;
    }
    add({ name, price, img: ceremonyImg, url: e.link });
    setOpen(true);
  };
  const sorted = upcomingEvents();
  const next = sorted[0];
  const rest = sorted.slice(1);
  if (!next)
    return (
      <div className="border-2 border-ink bg-cream p-7 text-ink shadow-[9px_9px_0_var(--magenta)]">
        <h3 className="poster text-3xl sm:text-4xl">New circles coming soon</h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/80">
          No upcoming dates are posted right now. Message us on WhatsApp to hear about the next ceremony first.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block border-2 border-ink bg-ink px-6 py-3 font-display text-lg uppercase text-cream shadow-[6px_6px_0_var(--jade)] transition-transform hover:-translate-y-1"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  const n = fmt(next.date);

  return (
    <div>
      {calendar.data?.events.length ? (
        <div className="mb-8 border-2 border-ink bg-jade p-5 text-cream shadow-[6px_6px_0_var(--ink)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-marigold">Live from the Hideas calendar</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
            {calendar.data.events.map((event) => (
              <a key={event.id} href={event.htmlLink || "#calendar"} target={event.htmlLink ? "_blank" : undefined} rel="noreferrer" className="font-display text-lg uppercase underline underline-offset-4">
                {new Date(event.start).toLocaleDateString("en-CA", { month: "short", day: "numeric" })} — {event.title}
              </a>
            ))}
          </div>
        </div>
      ) : null}
      {/* NEXT EVENT */}
      <article className="relative border-2 border-ink bg-cream text-ink shadow-[9px_9px_0_var(--magenta)]">
        <div className="absolute -right-2 -top-3 z-20">
          <PriceTag price={tagLabel(next.price)} />
        </div>

        <div className="grid gap-0 md:grid-cols-[220px_1fr]">
          <div className="flex flex-col items-center justify-center border-b-2 border-ink bg-ember px-6 py-8 text-cream md:border-b-0 md:border-r-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em]">Next circle</span>
            <span className="font-display text-7xl leading-none">{n.day}</span>
            <span className="font-display text-2xl uppercase tracking-tight">{n.month}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{n.year}</span>
            <span className="mt-3 font-script text-2xl text-marigold">{n.weekday}</span>
          </div>

          <div className="relative overflow-hidden p-7 sm:p-9">
            <img src={ceremonyImg} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.08]" />
            <div className="relative">
            <span className="inline-block border-2 border-ink bg-marigold px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
              {next.series}
            </span>
            <h3 className="poster mt-4 text-4xl sm:text-5xl">{next.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">
              {next.description}
            </p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "Time", v: next.time },
                { k: "Where", v: next.city },
                { k: "Space", v: next.seats },
                { k: "Offering", v: next.price },
              ].map((d) => (
                <div key={d.k} className="border-l-2 border-ink pl-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                    {d.k}
                  </dt>
                  <dd className="mt-1 text-sm leading-snug text-ink/80">{d.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
              {next.place}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              {isDonation(next.price) && (
                <DonationBox
                  value={amounts[next.id] ?? ""}
                  onChange={(v) => setAmounts((s) => ({ ...s, [next.id]: v }))}
                  invalid={invalid === next.id}
                />
              )}
              <button
                type="button"
                onClick={() => reserve(next)}
                className="border-2 border-ink bg-ink px-6 py-3 font-display text-lg uppercase text-cream shadow-[6px_6px_0_var(--jade)] transition-transform hover:-translate-y-1"
              >
                Save your spot
              </button>
              <a
                href={next.link}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60 underline-offset-4 hover:text-ember hover:underline"
              >
                Full ceremony details →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t-2 border-ink/15 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
              <span className="text-ink/45">Before you sit:</span>
              {(
                [
                  ["prepare", "Prepare & integrate"],
                  ["safety", "Safety & screening"],
                  ["intake", "Intake form"],
                  ["policy", "Booking & refunds"],
                ] as const
              ).map(([tab, label]) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => openGuide(tab)}
                  className="underline underline-offset-4 transition-colors hover:text-ember"
                >
                  {label}
                </button>
              ))}
            </div>
            </div>

          </div>
        </div>
      </article>

      {/* UPCOMING */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {rest.map((e, i) => {
          const d = fmt(e.date);
          return (
            <article
              key={e.id}
              className="relative flex flex-col border-2 border-ink bg-paper p-6 text-ink shadow-[6px_6px_0_var(--ink)]"
              style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
            >
              <div className="absolute -right-2 -top-3 z-20">
                <PriceTag price={tagLabel(e.price)} delay={i * 0.4} />
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl leading-none text-ember">{d.day}</span>
                <span className="font-display text-xl uppercase">{d.month}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  {d.year}
                </span>
              </div>
              <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-magenta">
                {e.series}
              </span>
              <h4 className="mt-2 font-serif text-lg italic leading-snug">{e.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {e.city} · {e.time}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">
                {e.description.slice(0, 130)}…
              </p>
              {isDonation(e.price) && (
                <div className="mt-4">
                  <DonationBox
                    value={amounts[e.id] ?? ""}
                    onChange={(v) => setAmounts((s) => ({ ...s, [e.id]: v }))}
                    invalid={invalid === e.id}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => reserve(e)}
                className="mt-5 inline-block self-start border-2 border-ink bg-marigold px-4 py-2 font-display text-sm uppercase text-ink transition-transform hover:-translate-y-0.5"
              >
                Reserve
              </button>
            </article>
          );
        })}
      </div>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
        Dates shift with the moon and the weather — message us on WhatsApp for the exact
        address and current openings.
      </p>
    </div>
  );
}
