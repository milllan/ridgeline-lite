# Astro 5 → 6 → 7 Migration Record

Fork: [milllan/ridgeline-lite](https://github.com/milllan/ridgeline-lite)
Upstream: [JulyFire365/ridgeline-lite](https://github.com/JulyFire365/ridgeline-lite) @ `4169b0a`
Date: 2026-09-13 · Branch: `astro-v7`

Upstream guides followed:
[Astro v6 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v6/) ·
[Astro v7 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v7/)

## Pre-flight findings (what the codebase already used / avoided)

| Guide concern | State in template | Action needed |
| --- | --- | --- |
| Legacy content collections | Already on Content Layer (`src/content.config.ts`, `glob()`/`file()` loaders) | none |
| `z` from `astro:content` | Used in `src/content.config.ts` | switch to `astro/zod` |
| Node ≥ 22.12 | `engines.node: >=20` | bump |
| `<ViewTransitions/>`, `astro:transitions` internals | not used | none |
| `Astro.glob`, `getStaticPaths`, adapters/SSR, i18n, Actions, sessions | not used (fully static) | none |
| remark/rehype plugins (v7 Sätteri switch) | none configured; MDX used as typed data only | none |
| Experimental flags (v7 removals) | none configured | none |
| `src/fetch.ts` / `src/middleware.ts` reserved names (v7) | don't exist | none |
| sharp | missing (Astro 5+ optional) but `getImage`/`<Image>` used | add dependency |

## Step 1 — Astro 5.18 → 6.4 (commit a52d24b)

1. `astro@^6.4.8`, `@astrojs/mdx@^6.0.0` (peer `astro ^6.4`), `@astrojs/sitemap@^3.7.4`, `@astrojs/check@^0.9.10`; `engines.node >=22.12.0`.
2. `src/content.config.ts`: `import { z } from 'astro/zod'` (deprecated `astro:content` re-export removed).
3. Added `sharp` dependency (pre-existing build failure, not upgrade-caused).
4. **Trap hit:** npm resolved `@tailwindcss/vite`'s wide peer range to a root **Vite 8** while `astro@6` nests **Vite 7** → build error `Missing field 'tsconfigPaths on BindingViteResolvePluginConfig'` + `Plugin<any>[]` type error in `astro.config.mjs`. Fixed with a temporary `"overrides": { "vite": "^7.3.6" }` (single Vite in tree).
5. Build + `astro check` + `tsc` green. Snapshot of `dist/` kept for parity diffing.

## Step 2 — Astro 6.4 → 7.3 (commit 04d2f41)

1. `astro@^7.3.2`, `@astrojs/mdx@^8.0.1`; **removed** the Vite override — Astro 7 uses Vite 8 itself, so the tree re-aligned on a single `vite@8.3.0` shared with `@tailwindcss/vite`.
2. No experimental flags to remove; no `@astrojs/db`; no `astro:transitions` internals; markdown renders via Sätteri by default (no remark/rehype plugins → no action).
3. **Trap hit:** v7 `compressHTML: 'jsx'` default strips whitespace at line breaks between text and `{expressions}` **and between text and inline elements** → rendered text joined (`since2009.`, `a10-year`, `and3,200+` on all pages; later review found 132 more, mostly icon-to-label: `</svg>Licensed & Insured`, `Made with Ridgeline —<a>`). Same-line spaces are preserved; only cross-line boundaries break. Three source `{" "}` guards fixed the text→expression cases (`src/components/common/Footer.astro:48`, `src/components/sections/Hero.astro:44`, `src/pages/about.astro:103`), and because the element-boundary class was too widespread to guard individually, **`compressHTML: true` (pre-v7 behavior) is set in `astro.config.mjs`**. After both measures, a chunk-level v6↔v7 comparison reports zero joined boundaries.

## Verification

- `npm run build`: 7 pages + `sitemap-index.xml`, 0 errors.
- `npm run check`: 0 errors / 0 warnings / 0 hints.
- **Rendered-output parity v5 ≡ v6 ≡ v7** (scripted): visible text, `<title>`, meta descriptions, canonicals, JSON-LD (parsed and compared), sitemap URL set (5 URLs), no `undefined`/`null` in HTML, all preload asset URLs resolve in `dist/_astro/`, zero whitespace-joined inline boundaries.
- `astro preview` smoke test: all routes 200, unknown → 404.

## Notes for future template users

- This fork sets `compressHTML: true` (pre-v7 whitespace semantics) because
  the template's markup relies on inter-element whitespace for icon/label
  spacing. If you switch to the Astro 7 `'jsx'` default, guard **any**
  cross-line boundary between text, `{expressions}`, or inline elements
  inside inline content with `{" "}` — all three classes join words
  otherwise.
- `public/robots.txt` hardcodes the demo domain; change it together with
  `site` in `astro.config.mjs` (pre-existing upstream behavior).
