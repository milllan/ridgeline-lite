# AGENTS.md — ridgeline-lite fork (washing-machine repair site, Belgrade)

Astro 7.3 static site rebranded from the Ridgeline Lite roofing template.
Everything Serbian Latin (sr-Latn). All business data is PLACEHOLDER until
the launch blockers in epic #2 are resolved.

## Live demo (temporary)

- **URL:** https://vesmasine.wpspeedopt.net (basic auth; credentials at
  `sculpiflex:/root/.demo-vesmasine-creds`, root-only — NEVER commit them,
  this repo is public)
- Hosted on sculpiflex (HestiaCP user `wpspeedopt`) via the existing
  `*.wpspeedopt.net` Cloudflare wildcard; LE cert via Hestia; noindex via
  X-Robots-Tag header behind auth.
- Deploy/rebuild/teardown recipes: `docs/DEMO-DEPLOY.md`. The demo is
  built from `main` with `ASTRO_SITE=https://vesmasine.wpspeedopt.net`
  (canonicals point at the demo subdomain). After merging to main,
  re-rsync to refresh the demo.
- **Production domain (registered 2026-09-15, plus.rs):**
  `servisvesmasina-beograd.co.rs` — Cloudflare zone in the owner's
  account (access + API key at sculpiflex `/home/wpspeedopt/deploy.env`
  — NEVER commit). HestiaCP web domain
  under `wpspeedopt`; docroot
  `/home/wpspeedopt/web/servisvesmasina-beograd.co.rs/public_html/`.
  Soft-launched behind basic auth + X-Robots-Tag noindex until the
  #22 §7 launch blockers clear.
- **Mail:** domain mailbox \`kontakt@servisvesmasina-beograd.co.rs\` on
  HestiaCP (MX/SPF/DKIM/DMARC in the CF zone; creds root-only at
  \`sculpiflex:/root/.mail-kontakt-servisvesmasina-creds\`). StatCounter
  analytics configured in site.ts (gated on statcounterProject > 0).
- `main` builds with the production domain by default (env
  `ASTRO_SITE` overrides).

## Non-goals (owner rules)

- **Website speed is a non-factor (owner, 2026-09-20):** the site is very
  fast — do NOT propose, run, or spend cycles on performance measurements
  or optimizations (Lighthouse/CWV benchmarks, bundle-size work,
  StatCounter on/off A/B, inlineStylesheets comparisons). Spend the
  effort on content and correctness instead. (Epic #112 tasks 17+22 were
  closed for exactly this reason.)

## Tracking & conventions

- **Epic #2** = task list, decisions, launch blockers, Serbian language
  guardrails. Open issues: #3 photos, #4 brand pages, #5 real reviews,
  #6 rebrand kit, #16 de-AI copy.
- One concern per branch `agent/<name>` → PR → squash-merge. Review via
  the orchestration-playbook lanes (owner prefers NO GLM lanes; muse via
  pi builds, gemini/agy + mimo/pi review). Workers never push.
- CHANGELOG.md entry per merge; freeze diffs before review; tamper guards
  around agy runs; content-hash guards (name-based git-status guards miss
  same-file edits).
- Serbian copy rules live in epic #2 ("Conventions learned") — approved
  facts only, no timing promises, V-form, crtica " – " never em-dash.

## Build & check

```bash
npm ci && npm run build && npm run check   # astro check + tsc, must be 0 errors
```

Routes (Serbian slugs): /, /usluge/, /o-nama/, /kontakt/,
/zatrazi-ponudu/, /hvala/ (noindex), /404. Local preview:
`npx astro preview --host 127.0.0.1` (serves dist/).

## Content lane routing (owner decision 2026-09-18, proven on the Zanussi A/B)

For Serbian **prose** (brand-page bodies, opštine text, any customer-facing copy):
1. **GLM (ZCode subagent) writes the text** — best native rhythm of the three
   tested lanes (beat muse's translated-feel phrasing and gemini's
   service-manual register).
2. **muse (pi) is the Serbian EDITOR** — reviews GLM's prose adversarially;
   caught 5 real grammar/idiom/terminology issues on the first test.
3. **gemini (agy) reviews structure/facts**, not voice.
muse remains fine for **structure/scaffolding builds** (collections, routes,
gates) — only its prose voice is second-tier. The copy-gate runs on every
variant regardless of lane.
