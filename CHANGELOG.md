# Changelog

All notable changes to this fork are documented here. The format loosely
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] — 2026-09-13

Upgraded from Astro 5.18 to **Astro 7.3** (through Astro 6.4), matching the
upstream v6 and v7 upgrade guides. Rendered output verified identical to the
Astro 5 build (visible text, titles, meta descriptions, canonicals, JSON-LD,
sitemap, preload assets).

### Changed
- `astro` 5.18 → **7.3.2**, `@astrojs/mdx` 4.3 → **8.0.1** (via 6.0 on the
  Astro 6 step), `@astrojs/sitemap` → **3.7.4**, `@astrojs/check` → **0.9.10**.
- Bundler moved with Astro: Vite 7 (Astro 6 step) → **Vite 8.3**, now a
  single copy in the tree shared with `@tailwindcss/vite`.
- `engines.node` raised from `>=20` to **`>=22.12.0`** (Astro 6+ minimum).
- Zod schemas now import `z` from `astro/zod` instead of the deprecated
  `astro:content` re-export (`src/content.config.ts`).
- `compressHTML: true` set explicitly in `astro.config.mjs`. Astro 7's new
  `'jsx'` default strips whitespace at cross-line boundaries between text,
  `{expressions}`, and inline elements; this template relies on that
  whitespace for icon/label spacing (132 joined boundaries detected in the
  first v7 build, e.g. `</svg>Licensed & Insured`, `Ridgeline —<a>`), so the
  pre-v7 behavior is kept. Three source-level `{" "}` guards
  (`src/components/common/Footer.astro`, `src/components/sections/Hero.astro`,
  `src/pages/about.astro`) remain as documentation for anyone who later
  switches to `'jsx'`.

### Fixed
- Build no longer fails with "Rollup failed to resolve import `sharp`":
  `sharp` is now a direct dependency. Astro 5+ does not install it
  automatically and the template uses `getImage()`/`<Image>` for build-time
  image processing.
- Dependency-tree Vite duplication on the Astro 6 step (root Vite 8 vs
  Astro's nested Vite 7, which broke `@tailwindcss/vite`) was handled with a
  temporary `overrides.vite` pin, removed again on the Astro 7 step where
  the tree re-aligned on Vite 8 naturally.

### Verified
- `npm run build` green: 7 pages + `sitemap-index.xml`, 0 errors.
- `npm run check` (`astro check` + `tsc --noEmit`): 0 errors, 0 warnings.
- v5 → v6 → v7 rendered-output parity: identical visible text, titles,
  descriptions, canonicals, JSON-LD (parses on every page), sitemap URL set
  (5 URLs; `/thank-you/` filtered, 404 excluded), no `undefined`/`null`
  strings in any HTML, and zero whitespace-joined text/inline-element
  boundaries versus the Astro 5 build.
- All `<link rel="preload">` targets (fonts, hero `imagesrcset` variants)
  exist in `dist/_astro/`; `astro preview` smoke test: all routes 200,
  unknown route 404.
