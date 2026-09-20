# Servis Veš Mašina Beograd

Static website for "Servis Veš Mašina Beograd" — a washing-machine repair
service in Belgrade, Serbia run by Majstor Dejan
(servisvesmasina-beograd.co.rs). All customer-facing content is written in
Serbian (Latin script) for local customers searching for repair services
across the city. The site is built with Astro 7 and Tailwind CSS 4 and ships
as fully static HTML: fonts are self-hosted via Fontsource (Inter for body
text, Barlow Condensed for display type), images are optimized at build time
with Sharp, and each page loads roughly 1 KB of JavaScript.

## Site structure

About 34 pages in total:

- Home (`/`)
- Services hub (`/usluge`) plus 6 service pages covering repair, heater,
  pump, bearing, programmer, and maintenance work
- Brand hub (`/brendovi-ves-masina`) plus 15 washing-machine brand pages
- Locations hub (`/lokacije`) plus 4 municipal (opštine) landing pages
- About (`/o-nama`), contact (`/kontakt`), and quote request
  (`/zatrazi-ponudu`) pages
- Thank-you page (`/hvala`, noindex) shown after a successful form submit
- Custom 404 page

## Quick start

```bash
# Requires Node 22.12+
npm install
npm run dev      # dev server at http://localhost:4321
npm run build    # static output in ./dist (postbuild seo-gate runs automatically)
```

## Where content lives

- `src/config/site.ts` — single source of truth: business identity, contact
  info, badges, and stats; every page reads from it
- `src/content/services/*.mdx` — 6 service pages (Serbian MDX)
- `src/content/brands/*.mdx` — 15 washing-machine brand pages (Serbian MDX)
- `src/content/opstine/*.mdx` — 4 municipal (opštine) pages (Serbian MDX)
- `src/content/reviews.json` — customer reviews; the aggregate score is
  computed at build time
- `src/config/nav.ts` — navigation; `src/config/brandLogos.ts` — brand logo
  mapping
- `src/content.config.ts` — content-layer collection definitions (services,
  brands, opstine, reviews) with validation schemas
- `astro.config.mjs` — site URL; `public/robots.txt` — sitemap URL
- Images live in `src/assets/`

## Quality gates

- `npm run content:gate` — fails the build on TODO/DRAFT/PLACEHOLDER markers
  left in production-facing source, so unfinished content can never ship
  silently
- postbuild `seo-gate` (runs automatically after `npm run build`) — SEO checks
  against `dist/`; the build must finish with 0 FAIL
- `serbian-copy-gate` — reviewer-level gate (skill) for customer-facing
  Serbian copy; checks banned patterns. It runs as part of the review
  workflow, not as an npm script, so every text change is checked by a
  reviewer before it ships.

## Draft workflow

A content file with `status: draft` in its frontmatter is suppressed from the
site: the page itself and every link pointing to it disappear from the build
via `getPublished` (see `src/lib/collections.ts`). This makes it safe to
prepare new service, brand, or municipal pages in the repository without them
leaking into navigation, sitemaps, or cross-links until they are ready. To
publish, flip the flag to `status: published` (or remove it if published is
the schema default) and rebuild.

## Deploy

Build in a clean worktree, then rsync `dist/` to the production `public_html/`
with `.htaccess` excluded, then fix ownership (`chown`) so the hosting control
panel keeps managing the files. Verify the build and both automated gates pass
locally first — only ship a green build.

See [CHANGELOG.md](CHANGELOG.md) for the complete change history, including
every deploy-related change.
