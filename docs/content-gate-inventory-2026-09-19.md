# Content-gate first-run inventory — 2026-09-19

Baseline `npm run content:gate` output on the content as of epic #112 task 4
(v2.25.0). The gate is NOT yet wired into the build chain — this failing run
is the deliverable: every line below is content debt to clear (rewrite or
remove the marker), after which the gate goes green and can be wired into
`postbuild`. See scripts/content-gate.mjs for scope/allowlist/marker rules.

```
src/config/site.ts:26  [TODO, PLACEHOLDER]  // TODO: placeholder identity — replace with real business details
src/config/site.ts:29  [TODO, PLACEHOLDER]  // TODO: placeholder identity — logo wording to be confirmed
src/config/site.ts:49  [TODO, PLACEHOLDER]  // TODO: placeholder identity — replace with real business details
src/config/site.ts:68  [TODO]  * OSM Nominatim house-level match (2026-09-15); TODO: verify on-site. */
src/config/site.ts:78  [TODO]  // TODO: confirm Sunday – until then no Sunday row is published
src/config/site.ts:88  [TODO, PLACEHOLDER]  // TODO: placeholder identity — add real social profile URLs (empty = hidden)
src/config/site.ts:126  [TODO, PLACEHOLDER]  // TODO: placeholder claims — business must confirm each before launch
src/config/site.ts:138  [TODO, PLACEHOLDER]  // TODO: placeholder numbers — confirm with the business. Note:
src/config/site.ts:169  [PLACEHOLDER]  /** True when a real (non-placeholder) email is configured. */
src/config/site.ts:170  [@example]  export const hasEmail = !siteConfig.email.toLowerCase().endsWith('@example.rs');
src/content/brands/ariston.mdx:4  [DRAFT]  # DRAFT: Ariston deli Merloni platformu sa Indesitom (delovi za mnoge
src/content/brands/beko.mdx:2  [DRAFT]  # DRAFT: turska marka (Arçelik/Koç grupa), raširena na Balkanu,
src/content/brands/bosch.mdx:4  [DRAFT]  # DRAFT: brend-specifične slabosti čekaju Dejanovu potvrdu (#21).
src/content/brands/candy.mdx:4  [DRAFT]  # DRAFT: italijanska marka, danas u sastavu Haier grupe; kodovi E00–E22
src/content/brands/electrolux.mdx:4  [DRAFT]  # DRAFT: brend-specifične slabosti čekaju Dejanovu potvrdu (#21).
src/content/brands/gorenje.mdx:4  [DRAFT]  # DRAFT: redosled kvarova i brend-specifične slabosti čekaju Dejanovu
src/content/brands/hisense.mdx:3  [DRAFT]  # DRAFT: brend-specifične slabosti čekaju Dejanovu potvrdu (#21).
src/content/brands/indesit.mdx:4  [DRAFT]  # DRAFT: Indesit je jedna od glavnih marki koje je Dejan imenovao
src/content/brands/lg.mdx:4  [DRAFT]  # DRAFT: brend-specifične slabosti čekaju Dejanovu potvrdu (#21).
src/content/brands/miele.mdx:4  [DRAFT]  # DRAFT: brend-specifične slabosti čekaju Dejanovu potvrdu (#21).
src/content/brands/samsung.mdx:4  [DRAFT]  # DRAFT: brend-specifične slabosti čekaju Dejanovu potvrdu (#21).
src/content/brands/tesla.mdx:3  [DRAFT]  # DRAFT: brend-specifične slabosti čekaju Dejanovu potvrdu (#21).
src/content/brands/vox.mdx:3  [DRAFT]  # DRAFT: brend-specifične slabosti čekaju Dejanovu potvrdu (#21).
src/content/brands/whirlpool.mdx:4  [DRAFT]  # DRAFT: opisi kvarova i njihov redosled su simptomno-generički –
src/content/brands/zanussi.mdx:3  [DRAFT]  # DRAFT: brend-specifične slabosti čekaju Dejanovu potvrdu (#21).
src/content/services/popravka-programatora.mdx:43  [TODO, PLACEHOLDER, potvrditi]  {/* TODO: placeholder sadržaj – potvrditi sa serviserom */}
src/content/services/popravka-ves-masina.mdx:51  [TODO, PLACEHOLDER, potvrditi]  {/* TODO: placeholder sadržaj – potvrditi sa serviserom */}
src/content/services/preventivno-odrzavanje.mdx:43  [TODO, PLACEHOLDER, potvrditi]  {/* TODO: placeholder sadržaj – potvrditi sa serviserom */}
src/content/services/zamena-grejaca.mdx:43  [TODO, PLACEHOLDER, potvrditi]  {/* TODO: placeholder sadržaj – potvrditi sa serviserom */}
src/content/services/zamena-lezajeva-zaptivaca.mdx:43  [TODO, PLACEHOLDER, potvrditi]  {/* TODO: placeholder sadržaj – potvrditi sa serviserom */}
src/content/services/zamena-pumpe.mdx:43  [TODO, PLACEHOLDER, potvrditi]  {/* TODO: placeholder sadržaj – potvrditi sa serviserom */}
--- content-gate: 27 files, 22 with findings; markers: TODO 14, DRAFT 15, PLACEHOLDER 13, @example 1, potvrditi 6; draft-status: 0. Allowlist: CHANGELOG.md, docs/, AGENTS.md
```

Summary: 27 files scanned (src/config/site.ts + 25 mdx + reviews.json),
22 with findings — TODO 14, DRAFT 15, PLACEHOLDER 13, @example 1,
potvrditi 6 (SAMPLE/UNVERIFIED 0), draft-status 0. Opštine pages and
reviews.json were already clean.

## Notes for clearing the inventory

- **site.ts** lines map to epic #112 task 3 (identity/claims confirmation
  pass). `site.ts:170` deserves a decision when a real email lands: the
  `hasEmail` guard's own literal `@example.rs` trips `@example`, so the
  guard must be refactored/removed at that point or the gate stays red on
  it forever.
- **brands/*.mdx `# DRAFT` guards** map to task 5 (owner-confirmation
  pass, queue #21); **services/*.mdx `TODO: placeholder sadržaj`** blocks
  belong to the same confirmation queue. Rewriting/removing each marker
  clears its line; nothing else changes.
- Marker matching is case-insensitive substring by design (epic #112):
  ordinary words containing a marker (e.g. "metodologija" contains
  "todo") will surface as findings — reword them; the gate never silences
  matches.
- The quote-form brand `<select>` on `/zatrazi-ponudu/` is a hardcoded
  display list, not a link — a draft brand keeps its form option (the
  business still services it; only its landing page is unpublished).
