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
  `servisvesmasina-beograd.co.rs` — Cloudflare zone (NS bart+clara,
  A @/www → 144.76.30.2, DNS-only until cert) in the owner's account
  (milan.petrovic@wpspeedopt.net; API key at sculpiflex
  `/home/wpspeedopt/deploy.env` — NEVER commit). HestiaCP web domain
  under `wpspeedopt`; docroot
  `/home/wpspeedopt/web/servisvesmasina-beograd.co.rs/public_html/`.
  Soft-launched behind basic auth + X-Robots-Tag noindex until the
  #22 §7 launch blockers clear.
- `main` builds with the production domain by default (env
  `ASTRO_SITE` overrides).

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
