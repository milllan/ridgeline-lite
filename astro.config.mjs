// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
