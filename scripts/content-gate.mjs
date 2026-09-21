// content-gate: content-readiness gate for production-facing copy (epic
// #112 task 4). STANDALONE — run as `npm run content:gate`; deliberately
// NOT wired into the build/postbuild chain until the content debt from the
// first failing run is cleared (owner decision).
//
// One category of hard failure: readiness markers. Any line containing
// TODO, DRAFT, PLACEHOLDER, SAMPLE, @example, UNVERIFIED or potvrditi
// (case-insensitive substring) fails the gate — unfinished copy must not
// reach production silently.
//
// Scan scope (paths resolved relative to process.cwd(), so the gate is
// testable against a fixture directory):
//   src/config/site.ts
//   src/content/**/*.mdx (recursive)
//   src/content/*.json   (top level only — nested json out of scope per
//                         epic #112 design)
//
// Frontmatter draft support: an .mdx file whose leading frontmatter block
// declares `status: draft` is reported as DRAFT-STATUS (own section, also
// fails the gate) — unfinished production-facing content keeps the gate red
// until published or removed. A `status: draft` declaration line is reported
// ONLY as DRAFT-STATUS, never also as a keyword hit (no double-reporting of
// one physical line). A UTF-8 BOM is stripped before parsing so frontmatter
// detection survives Windows editors.
//
// Fail-closed everywhere: an unreadable scope file (permissions, dangling
// symlink, a directory named *.mdx) becomes an UNREADABLE finding, not a
// crash and not a silent skip; a zero-file scan (wrong cwd, moved roots)
// fails instead of printing "clean". Marker matching is deliberately plain
// case-insensitive substring (per epic #112 design) — a false positive on
// ordinary vocabulary is surfaced in the inventory and reworded, never
// silenced by the gate.
//
// Allowlist (path prefixes, excluded from scanning; today all lie outside
// the scan scope — kept as a defensive mechanism): CHANGELOG.md, docs/,
// AGENTS.md. Overridable via CONTENT_GATE_ALLOW (comma-separated, replaces
// the defaults).
//
// Env overrides: CONTENT_GATE_SKIP (1|true|yes), CONTENT_GATE_ALLOW.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

if (/^(1|true|yes)$/i.test(process.env.CONTENT_GATE_SKIP ?? '')) {
  console.log('--- content-gate: skipped (CONTENT_GATE_SKIP)');
  process.exit(0);
}

// 'Miele' (owner rule 2026-09-21): the brand is NOT serviced and must not
// reappear anywhere in content or site config. Case-insensitive substring,
// same matching as the readiness markers. Full-source check (pages, config,
// assets) stays a documented grep in AGENTS.md, not gate scope: extending
// scope would false-positive on HTML `placeholder=` attributes.
const MARKERS = ['TODO', 'DRAFT', 'PLACEHOLDER', 'SAMPLE', '@example', 'UNVERIFIED', 'potvrditi', 'Miele'];

const ALLOW = (process.env.CONTENT_GATE_ALLOW ?? 'CHANGELOG.md,docs/,AGENTS.md')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// Line-cap for the trimmed source snippet (curated output, seo-gate style).
const SNIPPET_CAP = 100;

const isAllowed = (file) => ALLOW.some((prefix) => file.startsWith(prefix));

/** readdirSync that fails the gate (not crashes) when enumeration itself breaks. */
function readdirOrFail(dir, options) {
  try {
    return readdirSync(dir, options);
  } catch (e) {
    console.error(
      `--- content-gate: cannot enumerate ${dir} (${e.code ?? e.message}) — ` +
        'failing closed, a gate that cannot see the corpus does not pass.',
    );
    process.exit(1);
  }
}

/** Enumerate the scan scope relative to cwd; missing roots are skipped. */
function scanScope() {
  const files = [];
  // POSIX-style paths throughout (Node fs accepts '/' on every platform):
  // display, allowlist prefixes and fs calls all see the same string.
  const siteConfig = 'src/config/site.ts';
  if (existsSync(siteConfig)) files.push(siteConfig);

  const contentDir = 'src/content';
  if (existsSync(contentDir)) {
    // Recursive: every .mdx under src/content/ at any depth.
    for (const entry of readdirOrFail(contentDir, { recursive: true })) {
      const rel = String(entry).split(path.sep).join('/');
      if (rel.endsWith('.mdx')) files.push(`src/content/${rel}`);
    }
    // Top level only: nested json is out of scope per epic #112 design.
    for (const entry of readdirOrFail(contentDir)) {
      if (entry.endsWith('.json')) files.push(`src/content/${entry}`);
    }
  }
  return files.sort();
}

/**
 * Line numbers (1-based) of a leading-frontmatter `status: draft`
 * declaration — the block must start at line 1 (`---`) and ends at the next
 * `---` line. A file without a leading frontmatter block has none. Trailing
 * YAML comments (`status: draft # …`) are tolerated; the collection schema
 * decides the real value, the gate only categorizes.
 */
function draftStatusLines(lines) {
  if ((lines[0] ?? '').trimEnd() !== '---') return [];
  const hits = [];
  for (let i = 1; i < lines.length; i++) {
    if (/^---\s*$/.test(lines[i])) break; // end of the leading block
    if (/^status:\s*["']?draft["']?\s*(?:#.*)?$/i.test(lines[i])) hits.push(i + 1);
  }
  return hits;
}

const findings = [];
let scanned = 0;

for (const file of scanScope()) {
  if (isAllowed(file)) continue; // defensive: allowlist beats scope
  scanned++;
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch (e) {
    // Loud finding, never a silent skip: the scope file is there but cannot
    // be read — the gate stays red until it can actually see the content.
    findings.push({ file, line: 0, kind: 'unreadable', markers: ['UNREADABLE'], snippet: e.message });
    continue;
  }
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1); // UTF-8 BOM
  const lines = text.split('\n');
  const draftLines = file.endsWith('.mdx') ? draftStatusLines(lines) : [];

  lines.forEach((line, i) => {
    const n = i + 1;
    if (draftLines.includes(n)) return; // reported as DRAFT-STATUS only
    const hits = MARKERS.filter((m) => line.toLowerCase().includes(m.toLowerCase()));
    if (hits.length === 0) return;
    const snippet = line.trim();
    findings.push({
      file,
      line: n,
      kind: 'marker',
      markers: hits,
      snippet: snippet.length > SNIPPET_CAP ? `${snippet.slice(0, SNIPPET_CAP - 1)}…` : snippet,
    });
  });

  for (const n of draftLines) {
    findings.push({ file, line: n, kind: 'draft', markers: ['DRAFT-STATUS'], snippet: (lines[n - 1] ?? '').trim() });
  }
}

if (scanned === 0) {
  console.error(
    '--- content-gate: nothing scanned — src/config/site.ts and src/content/ not found. ' +
      'Run from the repo root; a gate that cannot see the corpus fails, it does not pass.',
  );
  process.exit(1);
}

// Grouped output: files lexically, lines ascending within a file.
const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}
for (const entries of byFile.values()) entries.sort((a, b) => a.line - b.line);

const markerFindings = findings.filter((f) => f.kind === 'marker');
const draftFindings = findings.filter((f) => f.kind === 'draft');
const unreadableCount = findings.filter((f) => f.kind === 'unreadable').length;

for (const f of findings.filter((x) => x.kind === 'unreadable')) {
  console.log(`${f.file}  [UNREADABLE]  ${f.snippet}`);
}

for (const [file, entries] of [...byFile.entries()].sort(([a], [b]) => (a < b ? -1 : 1))) {
  for (const f of entries.filter((x) => x.kind === 'marker')) {
    console.log(`${file}:${f.line}  [${f.markers.join(', ')}]  ${f.snippet}`);
  }
}

if (draftFindings.length > 0) {
  console.log('');
  console.log('DRAFT-STATUS (frontmatter `status: draft` — page suppressed from the build):');
  for (const f of draftFindings) {
    console.log(`${f.file}:${f.line}  [DRAFT-STATUS]  ${f.snippet}`);
  }
}

const perMarker = MARKERS.map((m) => {
  const n = markerFindings.filter((f) => f.markers.includes(m)).length;
  return n > 0 ? `${m} ${n}` : null;
}).filter(Boolean);

if (findings.length === 0) {
  console.log(`--- content-gate: ${scanned} files scanned — clean (0 marker hits, 0 draft-status).`);
  process.exit(0);
}

console.log(
  `--- content-gate: ${scanned} files, ${byFile.size} with findings; ` +
    `markers: ${perMarker.join(', ') || 'none'}; draft-status: ${draftFindings.length}` +
    (unreadableCount > 0 ? `; unreadable: ${unreadableCount}` : '') +
    `. Allowlist: ${ALLOW.join(', ') || 'none'}`,
);
process.exit(1);
