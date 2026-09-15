# Plus.rs User API — domain management reference

Registrar API for all our `.rs` / `.co.rs` domains (proven working 2026-09-15
on servisvesmasina-beograd.co.rs = Plus ID `86567`).

- **Docs:** https://portal.plus.rs/userapi — auth Basic `email:password`
  (or JWT via `POST /api/login`). Base: `https://portal.plus.rs/api/`.
- **Credentials live ONLY on sculpiflex:** `/root/.config/plus-api.env`
  (600, root-only). Never in this repo, never in chat.
- **Shared playbook:** `/home/AGENTS.md` → "Plus.rs User API" section
  (full endpoint catalog: info, nameservers, DNS records, transfer/lock,
  contacts, forwarding, autorenew, DNSSEC, billing, tickets).

## Quick recipes (run on sculpiflex)

```bash
source /root/.config/plus-api.env
AUTH="$PLUS_API_USER:$PLUS_API_PASS"

# Domain info + id lookup
curl -s -u "$AUTH" 'https://portal.plus.rs/api/domain/name/servisvesmasina-beograd.co.rs'

# Read nameservers
curl -s -u "$AUTH" 'https://portal.plus.rs/api/domain/86567/ns'

# Set nameservers (reliable path — portal form saves can silently fail)
curl -s -X PUT -u "$AUTH" -H 'Content-Type: application/json' \
  -d '{"id":"86567","nameservers":["bart.ns.cloudflare.com","clara.ns.cloudflare.com"]}' \
  'https://portal.plus.rs/api/domain/86567/ns'
# expect {"info":["...","success_changes_save"]}; then re-GET to verify
```

After a nameserver change: RNIDS `pendingUpdate` → parent zone (TTL 900) →
Cloudflare zone Active. Then A records + Hestia + site swap per issue #23.
