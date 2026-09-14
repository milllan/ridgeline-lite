# Changelog

All notable changes to this fork are documented here. The format loosely
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.6.1] — 2026-09-14

Service-area map: **Stari grad** added as the 9th municipality dot
(owner request; Savski venac remains omitted). The both-sides-blocked
label fallback moved from below to above (Stari grad centered above its
dot; Zvezdara top-right — name special-case proven load-bearing by both
review lanes). Zero label overlaps under asserted box model; tightest
clearance 1px over threshold (Zvezdara label ↔ Palilula halo) — eyeball
in preview; code comment mandates visual re-check if coordinates change.
## [2.6.0] — 2026-09-14

Routes renamed to Serbian slugs for local SEO:
/services/ → /usluge/, /about/ → /o-nama/, /contact/ → /kontakt/,
/quote/ → /zatrazi-ponudu/, /thank-you/ → /hvala/ (home + 404
unchanged). All internal references updated (nav, Header/StickyCallBar/
Hero/ServicesGrid/FinalCTA/Footer/404 cross-links, FormBackendFields
thankYouUrl, forms.ts, sitemap filter); hvala keeps noindex and stays
out of the sitemap. No redirects added — the site never launched, no
legacy URLs exist. ASCII-only slugs. Reviews: gemini + mimo approve,
zero findings.
## [2.5.2] — 2026-09-14

Pre-merge gate fixes (4-lane review of the integrated state — no GLM lanes,
per owner request; gemini+muse Tier-1, mimo Tier-2, deepseek down ×2):
translated the reviews-carousel/star-rating/breadcrumbs chrome that no
single PR owned (cross-PR seam), unified trust-badge wording with the
Hero strip (incl. hedged "Besplatna konstatacija uz popravku"), Serbian
chrome aria-labels, "ridgeline accent" comment removed from built HTML,
minor language polish. Full triage table on the epic.
## [2.5.1] — 2026-09-14

Fixed (first task run through the new cli-first-delegation skill — muse
built, 4 lanes reviewed): review-card date labels rendered with the
'en-US' locale — now 'sr-Latn-RS' (mart 2026., januar 2026., …) plus
'timeZone: UTC' so a 1st-of-month date cannot roll back a month on a
UTC-negative build machine. (Changelog note: version numbers of the
parallel rebrand PRs may merge in any order — entries are self-contained.)
## [2.5.0] — 2026-09-14

Rebrand **T3** (epic #2, stacked on T1): all remaining component/page
prose translated to Serbian Latin. With T1–T5 merged, the site is fully
Serbian except the photos task (#3).

### Changed
- Hero (eyebrow/subheadline/CTAs/badges), WhyUs (4 honest differentiators),
  FinalCTA, StickyCallBar, home/services section headings, about (story,
  stats labels, honest credentials, team collapsed 3→1 placeholder card),
  quote (Serbian labels + NEW brand select — 15 brands + Ostalo, additive
  field), thank-you steps, 404, contact form labels.
- `toLocaleString('en-US')` → `'sr-Latn-RS'` (3 sites); `_subject` lead-email
  line Serbian ("Novi upit sa sajta — zahtev za ponudu/kontakt").
- T1-line amendments (declared): all CTAs standardized to V-form
  ("Zatražite ponudu" incl. Header/nav), contact hero timing promise
  ("obično istog dana") removed.

### Review-driven fixes (3 lanes + delta approve)
- Parts-policy contradiction resolved ("isključivo" dropped; consent nuance
  kept on about); gemini grammar trio fixed ("na poruku", "se javlja",
  "koje se brže pokvare"); singular technician narrative made consistent;
  "call centar" → "kol centar"; "sledeći koraci" plural; register unified.

### Recorded for later rounds
- TODO HTML comments ship in dist source → T8 pre-launch sweep;
  dormant `ReviewCard` en-US date → #6; roofing-era stats render as
  placeholder business history → epic launch blocker (confirm with owner).
## [2.4.0] — 2026-09-14

Rebrand **T5** (epic #2): contact-page service-area SVG map re-plotted
from Denver metro to Belgrade. (Changelog anchors above [2.0.0] — keep
all entries when merging the parallel PRs.)

### Changed
- `ServiceAreaMap.astro`: 8 Belgrade municipality dots (Stari grad and
  Savski venac omitted — label collisions, documented in code), new
  projection BOUNDS, Serbian aria/title/caption, `role="img"`, stylised
  Sava/Danube polylines replacing the "Front Range" decoration,
  "BEOGRAD · I OKOLINA" caption. `cities` renamed `municipalities`.
- Deploy blocker from T1's review resolved: the map no longer shows
  Denver geography.

### Verified
- Projection re-derived independently by review lanes: all dots ≥5%
  inside the viewBox, geography preserved (Zemun top, Rakovica bottom,
  Palilula max-x, Čukarica min-x), zero label collisions.
- build + check green; component + dist map output contain zero Denver
  vocabulary.
## [2.3.0] — 2026-09-14

Rebrand **T4** (epic #2): template reviews replaced with six Serbian-Latin
SAMPLE placeholder entries for the Belgrade repair business + an honesty
marker. (Anchors above [2.0.0] — textually conflicts with #7/#8 changelog
entries; keep all when merging.)

### Changed
- `src/content/reviews.json` — 6 Serbian entries (placeholder): Belgrade
  municipalities, one per T2 service, brands Candy/Bosch/Gorenje/Whirlpool/
  LG/Samsung, ratings 5×5+1×4 (aggregate 4.8 rendered in JSON-LD).
- `src/content/README.md` (new) — bilingual warning: entries are samples,
  replace with genuine reviews (e.g. GBP export, issue #5) before launch.

### Review-driven fixes (3 lanes, all approved pre-fix; delta approve)
- 4-star review re-dated into the carousel's visible top-5 (visible stars
  now corroborate the 4.8 aggregate; carousel shows newest 5 of 6).
- Domain accuracy: laundry does not come out warm (cold rinse) — heater
  success re-worded to "ispravno greje vodu".
- Language: "elisnicu"→"elisu", "pri tom"→"pritom", "vratio u sklop"→
  "ponovo sklopio", "počeo sam"→"počeo sam od sebe", "pranje miriše"→
  "veš miriše", README "placeholders"→"primere", "normalno" dedup.
## [2.2.0] — 2026-09-14

Rebrand **T2** (epic #2): services content collection rewritten from
roofing to washing-machine repair, Serbian Latin (6 MDX files renamed +
rewritten). Placeholder content, marked with in-file TODO comments.
(NOTE: anchors above [2.0.0] — merges textually-conflict with the T1
entry in PR #7; keep both when merging the second.)

### Changed
- New services (order): Popravka veš mašina — svi kvarovi (1), Zamena i
  popravka pumpi (2), Zamena grejača i termostata (3), Zamena ležajeva i
  zaptivača (4), Popravka programatora i elektronike (5), Preventivno
  održavanje i čišćenje (6). Each with Serbian excerpt (146–201 chars),
  heroImageAlt, and 4 tailored processSteps (poziv → dijagnoza → popravka
  → garancija). MDX bodies are short Serbian summaries for the upcoming
  per-brand pages (#4) — not rendered by current templates.
- Icons remapped to the existing set (wrench, droplets, zap, hammer,
  clipboard-check, shield-check); heroImage slots unchanged (photos are
  task #3).

### Review-driven fixes (3 lanes + delta re-review)
- Grammar/terminology: "sva spoja"→"sve spojeve", "kodu greške"→"kod
  greške", "nedoprano veš"→"nedoprani veš", directional "na terenu"→"na
  teren" (stationary locative kept where correct), "uvid/uvidimo"→
  canonical phrasing, "grmljavina"→"tutnjava/lupanje", consistent
  "centrifuzi", inflected "originalnim delom/delovima" (standalone
  "original delovi" noun-lists kept as commercial register).
- Claim honesty: all same-day/first-visit timing claims removed (owner
  re-adds a confirmed SLA later); "jeftiniji od svake popravke" hedged;
  invented "season of intensive washing" dropped.

### Verified
- build + check green; content greps clean (roofing vocab only in
  heroImage asset filenames — replaced by #3); dist renders new Serbian
  titles in home cards + footer.
## [2.1.0] — 2026-09-13

Identity rebrand **T1** (epic #2): the config/identity layer switched from
US roofing contractor to a Serbian-Latin washing-machine repair business in
Belgrade. **All business data is placeholder, TODO-marked** — real details
replace it before launch (launch blockers tracked in epic #2).

### Changed
- `src/config/site.ts`: name/logo/tagline/license line, phone
  (061/352-45-03), email, address (state field removed — Serbian format),
  geo (Rakovica approx.), hours Pon–Sub 09–17, empty socials, Serbian trust
  badges, stats, SEO strings. Placeholder domain in `astro.config.mjs` +
  `public/robots.txt` (kept in sync, TODO-marked).
- `src/config/nav.ts` + Header/Footer chrome: Serbian labels (Usluge / O
  nama / Kontakt / Zatraži ponudu, column headings, sr-only/aria strings).
- `src/layouts/BaseLayout.astro`: `lang="sr-Latn"`.
- `src/lib/schema.ts`: JSON-LD `@type` `RoofingContractor` →
  `HomeAndConstructionBusiness` (schema.org has no appliance-repair type;
  `additionalType` deliberately omitted — the description carries the
  trade), `addressCountry: "RS"`, no `addressRegion`, `sameAs` omitted
  when socials are empty, `priceRange` dropped; builder renamed
  `buildLocalBusiness`.
- Contact page title/description/hero/intro: Serbian (were asserting
  "Denver metro" / "roofer" identity claims — review finding).

### Removed
- Theme-upsell links (footer "Made with Ridgeline" / Payhip) and the theme
  author's **live Formspree endpoint** — replaced with a TODO placeholder
  so this site's leads cannot leak to the author's form.

### Verified
- `npm run build` + `npm run check`: green (7 pages, 0 errors).
- dist greps: 0× RoofingContractor / payhip / xaqrqpro / priceRange;
  JSON-LD parses with RS address and no `addressRegion`; residual English
  strings trace only to T3/T5-tracked files (Hero, About, StickyCallBar,
  ServiceAreaMap — see epic #2).
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
