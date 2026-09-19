// seo-gate: per-page aeolint threshold gate, run automatically after build
// (npm "postbuild" hook).
//
// Two tiers (copy-gate philosophy: loud warnings, hard failures only for
// real regressions):
//   WARN — page overall score below SEO_GATE_WARN (default 90)
//   FAIL — any error-level aeolint finding (except the intentional
//          crawl.noindex on allowlisted pages), or a non-allowlisted page
//          scoring below SEO_GATE_FAIL (default 85). Exit 1, which aborts
//          `npm run build` chains before rsync.
//
// Allowlist (SEO_GATE_ALLOW, comma-separated dist paths): pages whose low
// score is by design. Today: 404 and /hvala (intentional noindex, thin by
// design). Only their crawl.noindex error is excused; any other error fails.
//
// Env overrides: SEO_GATE_WARN, SEO_GATE_FAIL, SEO_GATE_ALLOW, SEO_GATE_SKIP.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

if (/^(1|true|yes)$/i.test(process.env.SEO_GATE_SKIP ?? '')) {
  console.log('--- seo-gate: skipped (SEO_GATE_SKIP)');
  process.exit(0);
}

// Empty, whitespace, non-numeric, zero or negative values fall back to the
// defaults (never a silently-disabled 0 threshold — disable via SEO_GATE_SKIP).
const num = (v, d) => {
  if (v === undefined || v === null) return d;
  const s = String(v).trim();
  if (s === '') return d;
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : d;
};
const WARN = num(process.env.SEO_GATE_WARN, 90);
const FAIL = num(process.env.SEO_GATE_FAIL, 85);
const ALLOW = (process.env.SEO_GATE_ALLOW ?? 'dist/404.html,dist/hvala/index.html')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const localBin = path.resolve('node_modules/.bin/aeolint');
const bin = existsSync(localBin) ? localBin : 'aeolint';

const reportPath = path.join(tmpdir(), `seo-gate-${process.pid}-${Date.now()}.json`);
try {
  // aeolint's own stdout is piped off: the gate prints its own curated
  // output; `npm run seo:audit` is the full human-readable report.
  execFileSync(bin, ['scan', 'dist/', '--json', reportPath, '--quiet'], {
    stdio: ['ignore', 'ignore', 'inherit'],
  });
} catch (e) {
  const why = e.status ?? e.code ?? e.signal ?? e.message;
  console.error(`--- seo-gate: aeolint scan itself failed (${why})`);
  if (existsSync(reportPath)) unlinkSync(reportPath);
  process.exit(1);
}

let report;
try {
  report = JSON.parse(readFileSync(reportPath, 'utf8'));
} catch (e) {
  console.error(`--- seo-gate: unreadable aeolint report (${e.message})`);
  report = null;
} finally {
  if (existsSync(reportPath)) unlinkSync(reportPath);
}
if (!report) process.exit(1);

let warns = 0;
let fails = 0;
const lines = [];
for (const page of report.pages) {
  const allowed = ALLOW.includes(page.source);
  const errors = (page.findings ?? []).filter(
    (f) => f.severity === 'error' && !(allowed && f.id === 'crawl.noindex'),
  );
  // Any real error fails even on allowlisted pages; the score floor only
  // applies to non-allowlisted pages.
  const fail = errors.length > 0 || (!allowed && page.score < FAIL);
  const warn = !fail && !allowed && page.score < WARN;
  if (fail) fails++;
  if (warn) warns++;
  if (!fail && !warn) continue;
  const flag = fail ? 'FAIL' : 'WARN';
  const ids = [...new Set(errors.map((f) => f.id))].join(', ');
  lines.push(
    ` ${flag} ${String(page.score).padStart(3)}/100 (${page.grade})  ${page.source}` +
      (ids ? ` — ${ids}` : ''),
  );
}

for (const l of lines) console.log(l);
console.log(
  `--- seo-gate: ${report.pages.length} pages, ${fails} FAIL (<${FAIL} or errors), ` +
    `${warns} WARN (<${WARN}); overall ${report.summary?.score ?? '?'}/100. ` +
    `Allowlisted: ${ALLOW.join(', ') || 'none'}`,
);
process.exit(fails ? 1 : 0);
