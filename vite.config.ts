// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages builds (see .github/workflows/deploy.yml) set GITHUB_PAGES=true and
// BASE_PATH (e.g. "/hideas-hub/" or "/" with a custom domain). They produce a fully
// static, prerendered site instead of a server bundle. Lovable builds are unaffected.
const isGitHubPages = process.env["GITHUB_PAGES"] === "true";
const basePath = process.env["BASE_PATH"] || "/";

// Exposed to the app as import.meta.env.VITE_STATIC_SITE (no server functions available).
if (isGitHubPages) process.env["VITE_STATIC_SITE"] = "true";

export default defineConfig(
  isGitHubPages
    ? {
        nitro: false,
        vite: { base: basePath },
        tanstackStart: {
          server: { entry: "server" },
          prerender: { enabled: true, crawlLinks: true, failOnError: true },
          spa: { enabled: true },
        },
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
