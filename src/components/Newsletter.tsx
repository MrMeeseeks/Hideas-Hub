import { useState } from "react";

export function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <div className="border-2 border-ink bg-magenta p-6 text-cream shadow-[8px_8px_0_var(--ink)] sm:p-8">
      <h3 className="poster text-4xl sm:text-5xl">Not ready to sit yet?</h3>
      <p className="mt-3 max-w-md text-cream/85">You can still subscribe to our newsletter.</p>
      {sent ? (
        <p className="mt-6 font-script text-3xl text-marigold">
          You&rsquo;re on the list ✦ see you at the next moon
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const values = new FormData(e.currentTarget);
            const email = String(values.get("email") ?? "");
            window.location.href = `mailto:hello@hideas.ca?subject=${encodeURIComponent("Join the Hideas mailing list")}&body=${encodeURIComponent(`Please add ${email} to the Hideas mailing list.`)}`;
            setSent(true);
          }}
          className="mt-6 flex flex-wrap gap-3"
        >
          <label className="flex-1 min-w-[220px]">
            <span className="sr-only">E-mail address</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@email.com"
              className="w-full border-2 border-ink bg-cream px-4 py-3 font-body text-ink outline-none focus:shadow-[4px_4px_0_var(--ink)]"
            />
          </label>
          <button
            type="submit"
            className="border-2 border-ink bg-marigold px-6 py-3 font-display text-lg uppercase text-ink transition-transform hover:-translate-y-0.5"
          >
            Send it
          </button>
        </form>
      )}
    </div>
  );
}
