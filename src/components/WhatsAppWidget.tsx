import { useEffect, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/hideas";

const QUICK = [
  "I'd like to save a spot at the next ceremony.",
  "When is the next Token of Gratitude social?",
  "I have a question about silent-disco meditation, breathwork, or cacao ceremonies.",
];

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (msg: string) => {
    const body = msg.trim() || "Hi Hideas!";
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener",
    );
    setOpen(false);
    setText("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 print:hidden">
      {open ? (
        <div className="w-[min(88vw,20rem)] border-2 border-ink bg-cream text-ink shadow-[8px_8px_0_var(--ink)]">
          <div className="flex items-center justify-between border-b-2 border-ink bg-jade px-4 py-3 text-cream">
            <div>
              <p className="font-display text-lg uppercase leading-none">Chat with Hideas</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">
                Usually replies within a day
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid size-8 place-items-center border-2 border-cream/60 transition-colors hover:bg-cream/15"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="space-y-2 p-4">
            <p className="font-script text-2xl text-ember">Hi! What can we hold for you?</p>
            {QUICK.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="block w-full border-2 border-ink bg-paper px-3 py-2 text-left text-sm leading-snug transition-transform hover:-translate-y-0.5"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(text);
            }}
            className="flex items-stretch gap-2 border-t-2 border-ink p-3"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message…"
              aria-label="Message"
              className="min-w-0 flex-1 border-2 border-ink bg-cream px-3 py-2 text-sm outline-none placeholder:text-ink/40 focus:border-jade"
            />
            <button
              type="submit"
              aria-label="Send on WhatsApp"
              className="grid w-11 place-items-center border-2 border-ink bg-jade text-cream transition-transform hover:-translate-y-0.5"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with us on WhatsApp"
        className="wa-float flex items-center gap-3 border-2 border-ink bg-jade px-4 py-3 font-display text-base uppercase text-cream shadow-[6px_6px_0_var(--ink)] transition-transform hover:-translate-y-1"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp us</span>
      </button>
    </div>
  );
}
