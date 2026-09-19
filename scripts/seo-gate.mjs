// seo-gate: per-page aeolint threshold gate, run automatically after build
// (npm "postbuild" hook).
//
// Two tiers (copy-gate philosophy: loud warnings, hard failures only for
// real regressions):
//   WARN — page overall score below SEO_GATE_WARN (default 90)
//   FAIL — page score below SEO_GATE_FAIL (default 85), or any error-level
//          aeolint finding (except the intentional noindex on allowlisted
//          pages). Exit 1, which aborts `npm run build` chains before rsync.
//
// Allowlist (SEO_GATE_ALLOW, comma-separated dist paths): pages whose low
// score is by design. Today: 404 and /hvala (intentional noindex, thin by
// design). Only their crawl.noindex error is excused; any other error fails.
//
// Env overrides: SEO_GATE_WARN, SEO_GATE_FAIL, SEO_GATE_ALLOW, SEO_GATE_SKIP=1.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

if (process.env.SEO_GATE_SKIP === '1') {
  console.log('--- seo-gate: skipped (SEO_GATE_SKIP=1)');
  process.exit(0);
}

const WARN = Number(process.env.SEO_GATE_WARN ?? 90);
const FAIL = Number(process.env.SEO_GATE_FAIL ?? 85);
const ALLOW = (process.env.SEO_GATE_ALLOW ?? 'dist/404.html,dist/hvala/index.html')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const localBin = path.resolve('node_modules/.bin/aeolint');
const bin = existsSync(localBin) ? localBin : 'aeolint';

const reportPath = path.join(tmpdir(), `seo-gate-${Date.now()}.json`);
try {
  execFileSync(bin, ['scan', 'dist/', '--json', reportPath, '--quiet'], {
    stdio: 'inherit',
  });
} catch (e) {
  console.error(`--- seo-gate: aeolint scan itself failed (exit ${e.status})`);
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, 'utf8'));

let warns = 0;
let fails = 0;
const lines = [];
for (const page of report.pages) {
  const allowed = ALLOW.includes(page.source);
  const errors = (page.findings ?? []).filter(
    (f) => f.severity === 'error' && !(allowed && f.id === 'crawl.noindex'),
  );
  const fail = !allowed && (page.score < FAIL || errors.length > 0);
  const warn = !allowed && !fail && page.score < WARN;
  if (fail) fails++;
  if (warn) warns++;
  const flag = fail ? 'FAIL' : warn ? 'WARN' : allowed ? 'allow' : 'ok';
  lines.push({
    sort: fail ? 0 : warn ? 1 : 2,
    text:
      ` ${flag.padEnd(5)} ${String(page.score).padStart(3)}/100 (${page.grade})  ${page.source}` +
      (errors.length ? ` — ${errors.map((f) => f.id).join(', ')}` : ''),
  });
}

for (const l of lines.sort((a, b) => a.sort - b.sort)) {
  if (l.sort < 2) console.log(l.text);
}
console.log(
  `--- seo-gate: ${report.pages.length} pages, ${fails} FAIL (<${FAIL} or errors), ` +
    `${warns} WARN (<${WARN}); overall ${report.summary?.score ?? '?'}/100. ` +
    `Allowlisted: ${ALLOW.join(', ') || 'none'}`,
);
unlinkSync(reportPath);
process.exit(fails ? 1 : 0);
