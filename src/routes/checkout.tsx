import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { money, useCart } from "@/lib/cart";
import { CONTACT_EMAIL, POLICY, WHATSAPP_LINK } from "@/data/hideas";


export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Ceremony Reservations — Hideas" },
      {
        name: "description",
        content:
          "Review your reservations for hosted silent-disco meditation, breathwork and cacao ceremonies.",
      },
      { property: "og:title", content: "Ceremony Reservations — Hideas" },
      {
        property: "og:description",
        content: "Reserve your place at a hosted Hideas silent-disco ceremony. No physical products are sold.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const COUPONS: Record<string, number> = {};

function CheckoutPage() {
  const { items, total, setQty, remove, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const discountRate = COUPONS[appliedCode] ?? 0;
  const discount = total * discountRate;

  if (placed) {
    return (
      <main className="grain min-h-screen bg-ink px-5 py-24 text-cream">
        <div className="mx-auto max-w-xl border-2 border-cream/20 bg-ink-soft p-8 text-center">
          <h1 className="poster text-5xl text-marigold">Reservation request prepared</h1>
          <p className="mt-5 text-cream/80">
            Your email app should have opened with your reservation — press send to reach us.
            Your seat is confirmed only after a facilitator reviews your intake.
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 block text-marigold underline">Email us to confirm</a>
          </p>
          <p className="mt-4 text-sm text-cream/70">Email app didn't open? Send us your reservation on WhatsApp instead.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-block border-2 border-ink bg-jade px-6 py-3 font-display text-lg uppercase text-cream shadow-[6px_6px_0_var(--marigold)]"
            >
              WhatsApp us
            </a>
            <Link
              to="/"
              hash="calendar"
              className="inline-block border-2 border-cream px-6 py-3 font-display text-lg uppercase text-cream"
            >
              Fill the intake form
            </Link>
          </div>
          <Link
            to="/"
            className="mt-8 inline-block border-2 border-ink bg-marigold px-6 py-3 font-display text-lg uppercase text-ink shadow-[6px_6px_0_var(--magenta)]"
          >
            Back to Hideas
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="grain min-h-screen bg-ink px-5 py-14 text-cream sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-cream/60 hover:text-marigold"
        >
          ← Keep browsing
        </Link>
        <h1 className="poster mt-4 text-5xl leading-none sm:text-7xl">Ceremony bookings</h1>
        <p className="mt-5 max-w-2xl text-cream/80">Hideas only hosts meditation, breathwork, and cacao ceremonies in a silent-disco format. There are no physical products or shipping charges.</p>

        {items.length === 0 ? (
          <p className="mt-10 font-script text-3xl text-marigold">
            No ceremony seats selected — explore our events ✦
          </p>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <ul className="space-y-4">
              {items.map((it) => (
                <li
                  key={it.name}
                  className="flex gap-4 border-2 border-ink bg-cream p-4 text-ink shadow-[6px_6px_0_var(--magenta)]"
                >
                  <img
                    src={it.img}
                    alt={it.name}
                    className="h-24 w-24 shrink-0 border-2 border-ink object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="font-display text-xl uppercase leading-tight">{it.name}</h2>
                    <p className="mt-1 font-mono text-sm">{money(it.price)}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(it.name, it.qty - 1)}
                        className="border-2 border-ink px-2 font-mono"
                      >
                        −
                      </button>
                      <span className="font-mono text-sm">{it.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(it.name, it.qty + 1)}
                        className="border-2 border-ink px-2 font-mono"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(it.name)}
                        className="ml-auto font-mono text-[11px] uppercase tracking-widest text-ink/60 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="font-mono text-lg">{money(it.price * it.qty)}</span>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={clear}
                  className="font-mono text-[11px] uppercase tracking-widest text-cream/50 underline"
                >
                  Empty basket
                </button>
              </li>
            </ul>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const titles = items.map((it) => it.name.replace(/^(Seat|Donation) — /, ""));
                const subject = `Hideas reservation request — ${[...new Set(titles)].join(", ")}`;
                const lines = [
                  `Full name: ${fd.get("name") ?? ""}`,
                  `E-mail: ${fd.get("email") ?? ""}`,
                  `Note: ${fd.get("note") || "—"}`,
                  "",
                  "Items:",
                  ...items.map((it) => `- ${it.name} × ${it.qty} @ ${money(it.price)} = ${money(it.price * it.qty)}`),
                  "",
                  ...(discount > 0 ? [`Coupon ${appliedCode}: −${money(discount)}`] : []),
                  `Total: ${money(total - discount)}`,
                ];
                window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
                clear();
                setPlaced(true);
              }}
              className="h-fit border-2 border-ink bg-paper p-6 text-ink shadow-[8px_8px_0_var(--marigold)]"
            >
              <h2 className="font-display text-2xl uppercase">Ceremony reservation</h2>
              <div className="mt-5 border-2 border-ink bg-cream p-4">
                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70" htmlFor="coupon">
                  Coupon code
                </label>
                <div className="mt-2 flex gap-2">
                  <input id="coupon" value={coupon} onChange={(event) => setCoupon(event.target.value)} className="min-w-0 flex-1 border-2 border-ink bg-paper px-3 py-2 font-mono uppercase outline-none" />
                  <button type="button" onClick={() => {
                    const normalized = coupon.trim().toUpperCase();
                    if (COUPONS[normalized]) {
                      setAppliedCode(normalized);
                      setCouponMessage("Coupon applied.");
                    } else {
                      setAppliedCode("");
                      setCouponMessage("This code is not active.");
                    }
                  }} className="border-2 border-ink bg-marigold px-4 font-display uppercase text-ink">Apply</button>
                </div>
                {couponMessage ? <p className="mt-2 text-xs text-ink/60">{couponMessage}</p> : null}
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { id: "name", label: "Full name", type: "text", auto: "name" },
                  { id: "email", label: "E-mail", type: "email", auto: "email" },
                ].map((f) => (
                  <label key={f.id} className="block">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                      {f.label}
                    </span>
                    <input
                      required
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      autoComplete={f.auto}
                      className="mt-1 w-full border-2 border-ink bg-cream px-3 py-2 font-body text-ink outline-none focus:shadow-[4px_4px_0_var(--magenta)]"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                    Note for the circle (optional)
                  </span>
                  <textarea
                    name="note"
                    rows={3}
                    className="mt-1 w-full border-2 border-ink bg-cream px-3 py-2 font-body text-ink outline-none focus:shadow-[4px_4px_0_var(--magenta)]"
                  />
                </label>
              </div>

              <dl className="mt-6 space-y-1 border-t-2 border-ink pt-4 font-mono text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{money(total)}</dd>
                </div>
                {discount > 0 ? <div className="flex justify-between text-jade"><dt>Coupon</dt><dd>−{money(discount)}</dd></div> : null}
                <div className="flex justify-between border-t-2 border-ink pt-2 font-display text-xl uppercase">
                  <dt>Total</dt>
                   <dd>{money(total - discount)}</dd>
                </div>
              </dl>

              <button
                type="submit"
                className="mt-6 w-full border-2 border-ink bg-ink px-5 py-3 font-display text-lg uppercase text-cream transition-transform hover:-translate-y-0.5"
              >
                Prepare reservation
              </button>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-ink/50">
                We confirm payment by e-mail
              </p>

              <div className="mt-6 border-t-2 border-ink pt-4">
                <h3 className="font-display text-lg uppercase">
                  Refund &amp; rescheduling policy
                </h3>
                <dl className="mt-3 space-y-3">
                  {POLICY.map((p) => (
                    <div key={p.k}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                        {p.k}
                      </dt>
                      <dd className="mt-1 text-xs leading-relaxed text-ink/70">{p.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-ink/70">
                  Ceremony seats also require an{" "}
                  <Link to="/" hash="calendar" className="text-ember underline">
                    intake form
                  </Link>{" "}
                  — your seat is confirmed once a facilitator reviews it. Questions:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-ember underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>

            </form>
          </div>
        )}
      </div>
    </main>
  );
}
