// @ts-check
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ---------------------------------------------------------------------------
// Sitemap lastmod: honest per-page dates, never a single build-time stamp.
// Google ignores lastmod when every entry carries the same deploy timestamp,
// but uses truthful dates for crawl scheduling (the WordPress-SEO-plugin
// behavior). Collection pages read dateModified/dateCreated from MDX
// frontmatter (required by content.config.ts, so a missing date fails the
// build); static pages fall back to the source file's last git commit date.
// ---------------------------------------------------------------------------
/** @type {Record<string, (slug: string) => string>} */
const collectionUrlFor = {
  brands: (slug) => `/brendovi-ves-masina/${slug}-majstor/`,
  opstine: (slug) => `/lokacije/${slug}/`,
  services: (slug) => `/usluge/${slug}/`,
};

/** @param {string} file @param {string} key */
function frontmatterDate(file, key) {
  // Optional quotes: z.coerce.date() accepts '2026-09-21' too, and a quoted
  // value must not turn into a "missing date" build error here.
  const m = readFileSync(file, 'utf8').match(new RegExp(`^${key}:\\s*['"]?(\\d{4}-\\d{2}-\\d{2})`, 'm'));
  return m?.[1];
}

const lastmodByPath = new Map();
for (const [dir, toUrl] of Object.entries(collectionUrlFor)) {
  // Flat collections, matching the loader's [^_]*.mdx pattern: skip the
  // underscore-prefixed non-members the content loader also ignores. If a
  // subdirectory ever appears, add recursion there and here.
  for (const entry of readdirSync(`src/content/${dir}`)) {
    if (!entry.endsWith('.mdx') || entry.startsWith('_')) continue;
    const file = `src/content/${dir}/${entry}`;
    const mod =
      frontmatterDate(file, 'dateModified') ?? frontmatterDate(file, 'dateCreated');
    if (!mod) throw new Error(`sitemap lastmod: ${file} has no dateModified/dateCreated`);
    lastmodByPath.set(toUrl(entry.replace(/\.mdx$/, '')), mod);
  }
}

/** @param {string} file */
function gitLastCommitDate(file) {
  try {
    return (
      execSync(`git log -1 --format=%as -- ${file}`, {
        stdio: ['ignore', 'pipe', 'ignore'],
      }).toString().trim() || undefined
    );
  } catch {
    // No git metadata (e.g. an exported tree): the page ships without lastmod.
    return undefined;
  }
}

// Static (non-collection) pages; add a row here when a new one is created.
for (const [file, path] of [
  ['src/pages/index.astro', '/'],
  ['src/pages/kontakt.astro', '/kontakt/'],
  ['src/pages/o-nama.astro', '/o-nama/'],
  ['src/pages/zatrazi-ponudu.astro', '/zatrazi-ponudu/'],
  ['src/pages/brendovi-ves-masina/index.astro', '/brendovi-ves-masina/'],
  ['src/pages/lokacije/index.astro', '/lokacije/'],
  ['src/pages/usluge/index.astro', '/usluge/'],
]) {
  const d = gitLastCommitDate(file);
  if (d) lastmodByPath.set(path, d);
}

// https://astro.build/config
export default defineConfig({
  // Canonical/OG/sitemap base URL. Default = the registered production
  // domain (owner, plus.rs 2026-09-15). Override per environment with
  // ASTRO_SITE (e.g. demo builds: ASTRO_SITE=https://vesmasine.wpspeedopt.net).
  site: process.env.ASTRO_SITE || 'https://servisvesmasina-beograd.co.rs',
  output: 'static',
  trailingSlash: 'always',
  // Astro 7 defaults to 'jsx' (strips whitespace at cross-line inline
  // boundaries). This template's markup relies on icon/label spacing from
  // inter-element whitespace, so keep the pre-v7 behavior.
  compressHTML: true,
  build: {
    // Inline all CSS: removes the render-blocking stylesheet request,
    // which matters for LCP on a mostly-static marketing site.
    inlineStylesheets: 'always',
  },
  integrations: [
    mdx(),
    sitemap({
      // Keep noindex pages out of the sitemap.
      filter: (page) => !page.includes('/hvala/'),
      serialize(item) {
        const lastmod = lastmodByPath.get(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
