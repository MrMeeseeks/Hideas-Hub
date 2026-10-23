import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { money, useCart } from "@/lib/cart";

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="relative border-2 border-cream/40 px-3 py-2 font-display text-sm uppercase text-cream transition-colors hover:border-marigold hover:text-marigold"
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      Bookings
      <span className="ml-2 inline-block min-w-5 border-2 border-ink bg-marigold px-1 font-mono text-[11px] text-ink">
        {count}
      </span>
    </button>
  );
}

export function CartDrawer() {
  const { items, total, setQty, remove, open, setOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-cream text-ink shadow-[-10px_0_0_var(--magenta)]">
        <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
          <h2 className="font-display text-2xl uppercase">Your ceremony bookings</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="border-2 border-ink px-3 py-1 font-display text-sm uppercase transition-transform hover:-translate-y-0.5"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="font-script text-2xl text-ink/70">No ceremony seats reserved yet ✦</p>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.name} className="flex gap-3 border-2 border-ink bg-paper p-3">
                  <img
                    src={it.img}
                    alt=""
                    className="h-20 w-20 shrink-0 border-2 border-ink object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-base uppercase leading-tight">{it.name}</p>
                    <p className="mt-1 font-mono text-sm">{money(it.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
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
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t-2 border-ink px-5 py-4">
          <div className="flex items-center justify-between font-display text-xl uppercase">
            <span>Total</span>
            <span className="font-mono">{money(total)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            className="mt-4 block border-2 border-ink bg-ink px-5 py-3 text-center font-display text-lg uppercase text-cream transition-transform hover:-translate-y-0.5"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
