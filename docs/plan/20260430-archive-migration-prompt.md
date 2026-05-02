## Prompt for the agent inside the DigitalOcean VM

Paste the block below into the agent running on the VM that currently serves `marstanjx.com`.

---

### Situation

- This DigitalOcean VM currently serves my personal site at the apex domain `marstanjx.com` via **Apache**.
- The DNS for `marstanjx.com` is currently pointed at this VM's public IP.
- TLS is presumably handled here too (likely Let's Encrypt / Certbot, but please verify).
- I'm rebuilding the site as a Next.js 16 app and deploying the new version to **Vercel**. The Vercel project is already set up.

### Goal

I want to **keep the current Apache-hosted site alive as an archive**, but move it off the apex so the apex can point to the new Vercel deployment.

End state:
- `marstanjx.com` → new Next.js site on Vercel (DNS will be repointed at the registrar; not your job here, but the VM must stop expecting traffic on the apex).
- `archive.marstanjx.com` → the existing Apache-hosted site, served from this same VM, with a valid TLS cert.
- No data loss; the existing site's files, assets, and any server-side bits remain intact and reachable on the new subdomain.

### What I need from you

1. **Audit the current setup** before changing anything:
   - Which Apache vhost(s) currently serve `marstanjx.com`? Show me the config file path(s) and the relevant `<VirtualHost>` blocks (both `:80` and `:443`).
   - Where is the document root? What's actually being served (static files, PHP, a reverse-proxied app, something else)?
   - How is TLS configured? Certbot? Manual certs? What domains are on the current cert?
   - Is anything else (cron jobs, mail, other services) tied to the `marstanjx.com` hostname on this box?

2. **Propose a migration plan** for switching the vhost from `marstanjx.com` to `archive.marstanjx.com`:
   - New vhost config (or edits to the existing one) so Apache responds to `archive.marstanjx.com`.
   - How to obtain a new TLS cert that covers `archive.marstanjx.com` (Certbot `--apache` is fine if that's what's already in use).
   - Whether to keep a temporary 301 redirect from `marstanjx.com` → `archive.marstanjx.com` on this VM for the window before DNS flips, or just let the apex go dark here once DNS moves to Vercel.
   - Any internal links / hardcoded references inside the site that point to `https://marstanjx.com/...` and would need updating to the new subdomain.

3. **Don't execute destructive changes yet.** Show me the audit + plan first; I'll confirm before you touch configs, run Certbot, or reload Apache.

### Constraints / preferences

- Preserve the existing site exactly as-is — this is an archive, not a redesign.
- Prefer minimal changes: edit the existing vhost rather than rewriting it from scratch if reasonable.
- I'll handle the DNS changes at the registrar (adding the `archive` A record pointing to this VM, and repointing the apex to Vercel). Tell me clearly which DNS records you need me to create and when.
