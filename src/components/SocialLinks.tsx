import { Instagram, Youtube, MessageCircle, Phone, Mail } from "lucide-react";
import { SOCIALS } from "@/data/hideas";

const ICONS: Record<string, typeof Instagram> = {
  Instagram,
  YouTube: Youtube,
  Discord: MessageCircle,
  WhatsApp: Phone,
  Email: Mail,
};

export function SocialLinks({ tone = "light" }: { tone?: "light" | "dark" }) {
  const base =
    tone === "light"
      ? "border-ink bg-cream text-ink shadow-[5px_5px_0_var(--ink)]"
      : "border-cream/30 bg-ink text-cream shadow-[5px_5px_0_var(--jade)]";
  return (
    <ul className="flex flex-wrap gap-4">
      {SOCIALS.map((s) => {
        const Icon = ICONS[s.label] ?? MessageCircle;
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${s.label} — ${s.handle}`}
              className={`group flex items-center gap-3 border-2 px-4 py-3 transition-transform hover:-translate-y-1 ${base}`}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span className="text-left leading-tight">
                <span className="block font-display text-base uppercase">{s.label}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">
                  {s.handle}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
