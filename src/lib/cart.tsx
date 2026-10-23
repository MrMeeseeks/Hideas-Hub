import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  name: string;
  price: number;
  img: string;
  url: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">) => void;
  setQty: (name: string, qty: number) => void;
  remove: (name: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "hideas-cart-v1";

export function parsePrice(p: string) {
  return Number(p.replace(/[^0-9.]/g, "")) || 0;
}

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved: unknown = JSON.parse(raw);
        if (Array.isArray(saved)) {
          setItems(saved.filter((item): item is CartItem =>
            typeof item?.name === "string" && /^(Seat|Donation) — /.test(item.name) &&
            typeof item.price === "number" && typeof item.qty === "number" &&
            typeof item.img === "string" && typeof item.url === "string" &&
            !item.url.includes("/product/")
          ));
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    return {
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.price, 0),
      add: (item) =>
        setItems((prev) => {
          const found = prev.find((p) => p.name === item.name);
          if (found) {
            return prev.map((p) => (p.name === item.name ? { ...p, qty: p.qty + 1 } : p));
          }
          return [...prev, { ...item, qty: 1 }];
        }),
      setQty: (name, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((p) => p.name !== name)
            : prev.map((p) => (p.name === name ? { ...p, qty } : p)),
        ),
      remove: (name) => setItems((prev) => prev.filter((p) => p.name !== name)),
      clear: () => setItems([]),
      open,
      setOpen,
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
