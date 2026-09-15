# Demo deployment — vesmasine.wpspeedopt.net (temporary)

**Status: LIVE since 2026-09-15.** Temporary demo of the current `main`
for sharing with third parties. Protected by HTTP basic auth + noindex.
Credentials: on sculpiflex at `/root/.demo-vesmasine-creds` (root-only;
NEVER commit them — this repo is public).

## Where it runs

- Server: `ssh sculpiflex` (panel.sculpiflex.com, 144.76.30.2), HestiaCP
- Hestia user: `wpspeedopt`; web domain `vesmasine.wpspeedopt.net`
  (`default` template, Apache backend — `.htaccess` works)
- DNS: existing `*.wpspeedopt.net` wildcard A record (Cloudflare,
  DNS-only → 144.76.30.2). **No Cloudflare changes were made** — teardown
  needs no DNS cleanup.
- TLS: Let's Encrypt via Hestia (`v-add-letsencrypt-domain`), renews automatically
- Docroot: `/home/wpspeedopt/web/vesmasine.wpspeedopt.net/public_html/`

## Protection

- `.htaccess` in the docroot: `AuthType Basic` against
  `.htpasswd.k7Qm9` (unguessable name inside docroot — Hestia's
  `conf/` tree is not readable by www-data, which is why the first
  attempt 500'd), plus `Header always set X-Robots-Tag "noindex,
  nofollow"` and `ErrorDocument 404 /404.html`.
- Verified: 401 without/wrong creds; 200 on all routes with creds;
  X-Robots-Tag present; unknown routes → 404.

## Build for the demo (NOT committed — main still builds with the placeholder domain)

The demo is built from `main` with two URL swaps in a throwaway worktree:

```bash
git worktree add -b deploy/vesmasine-demo /tmp/vesmasine-demo main
cd /tmp/vesmasine-demo
npm ci && ASTRO_SITE=https://vesmasine.wpspeedopt.net npm run build
rsync -a dist/ sculpiflex:/home/wpspeedopt/web/vesmasine.wpspeedopt.net/public_html/
ssh sculpiflex 'chown -R wpspeedopt:wpspeedopt /home/wpspeedopt/web/vesmasine.wpspeedopt.net/public_html'
git worktree remove /tmp/vesmasine-demo --force
```

Canonicals/sitemap/OG in the demo point at the demo subdomain.

## Teardown (when the real launch replaces it)

```bash
ssh sculpiflex '
  /usr/local/hestia/bin/v-delete-web-domain wpspeedopt vesmasine.wpspeedopt.net
  /usr/local/hestia/bin/v-delete-dns-record wpspeedopt wpspeedopt.net vesmasine
  rm /root/.demo-vesmasine-creds'
```

(`site` is env-driven via `ASTRO_SITE` since 2.14.0; the default in main is the production domain)
lands, so the sed-swap workaround disappears.)
