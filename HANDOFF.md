# Hideas website — handoff notes

This site was built in [Lovable](https://lovable.dev) and is hosted for free on
**GitHub Pages**. Every push to the `main` branch rebuilds and republishes it
automatically.

## How deployment works

- The workflow in `.github/workflows/deploy.yml` runs on every push to `main`.
  It installs dependencies with Bun, builds a fully static version of the site
  and publishes it to GitHub Pages.
- `vite.config.ts` only switches to the static build when the workflow sets
  `GITHUB_PAGES=true`, so Lovable's own builds are unaffected.
- The site's base path (`/Hideas-Hub/` on github.io, or `/` on a custom domain)
  is detected automatically. You never need to edit it by hand.
- Progress and errors show in the repo's **Actions** tab. To redeploy without
  changing code, open the latest "Deploy to GitHub Pages" run and click
  **Re-run all jobs**.

### First-time setup (after the repo is transferred to you)

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. In the **Actions** tab, re-run the latest "Deploy to GitHub Pages" run.
4. The site is live at `https://<your-github-username>.github.io/Hideas-Hub/`.

## Custom domain

1. At your domain registrar, add DNS records:
   - **`www.yourdomain.com`**: a `CNAME` record, name `www`, value
     `<your-github-username>.github.io`
   - **`yourdomain.com` (no www)**: four `A` records, name `@`, values
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. In **Settings → Pages → Custom domain**, enter the domain and click
   **Save**. When the DNS check passes, tick **Enforce HTTPS**. DNS changes can
   take up to 24 hours.
3. Re-run the latest deploy in the **Actions** tab so the site rebuilds for the
   new address. No code changes are needed.

## Editing with Lovable

- This repository is **not yet connected to Lovable**. Edits made in Lovable
  will not reach the live site until you connect them: in your Lovable
  project, open the **GitHub** settings and connect it to this repository.
- Once connected, Lovable commits its changes to `main`, which triggers a
  deploy automatically.
- Do not force-push, or rebase/squash commits that are already pushed. That
  rewrites history on Lovable's side and can lose project history (see
  `AGENTS.md`).

## Known limitations on GitHub Pages

- GitHub Pages only serves static files; there is no server. The **live Google
  Calendar banner** in the events section relies on a server function, so it
  is switched off here. The event listings themselves come from
  `src/data/hideas.ts` and display normally.
- Bookings and checkout are client-side only; reservations are confirmed by
  email or WhatsApp as shown on the checkout page.

## Working on it with Claude

Open the repository in Claude Code (desktop app, terminal, or
[claude.ai/code](https://claude.ai/code)) and ask it to read `AGENTS.md`,
`HANDOFF.md` and `vite.config.ts` before making changes.
