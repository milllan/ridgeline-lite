// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Update this to your production domain before deploying.
  // It is used for canonical URLs, Open Graph tags, and the sitemap.
  // TODO: placeholder domain — replace with the real production domain.
  site: 'https://servis-ves-masina-beograd.example.com',
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
      filter: (page) => !page.includes('/thank-you/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
