import type { APIRoute } from 'astro';

/**
 * robots.txt endpoint — always in sync with the build-time site URL
 * (ASTRO_SITE env or the default in astro.config.mjs), so demo and
 * production builds can never point at each other's sitemap.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
};
