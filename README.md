# Web, AI Bot Governance & HTTP Security Reference (`v2.4.0`)

[![Validate Specification Templates](https://github.com/maxra/web-specs-2026/actions/workflows/ci.yml/badge.svg)](https://github.com/maxra/web-specs-2026/actions/workflows/ci.yml)
[![SpecPulse MCP Server](https://glama.ai/mcp/servers/maxra/web-specs-2026/badges/score.svg)](https://glama.ai/mcp/servers/maxra/web-specs-2026)
[![SpecPulse v2.4 Compliance](https://specpulse.pages.dev/api/badge?url=specpulse.pages.dev)](https://specpulse.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-5e6ad2.svg)](./LICENSE)

Open-source baseline configurations, automated schema validation tests (`npm test`), public MCP server documentation, and a composite GitHub Action for auditing production HTTP headers, AI crawler rules (`Content-Signal` + split `robots.txt`), SSR readability, and Schema.org JSON-LD.

- **Web Scanner & 23-Platform Free Generators**: [https://specpulse.pages.dev](https://specpulse.pages.dev)
- **Scoring Methodology & WAF / Error Rules**: [https://specpulse.pages.dev/about/](https://specpulse.pages.dev/about/)
- **Release Changelog**: [https://specpulse.pages.dev/changelog/](https://specpulse.pages.dev/changelog/)
- **8 Localized Hubs**: [EN](https://specpulse.pages.dev/) · [JA](https://specpulse.pages.dev/ja/) · [DE](https://specpulse.pages.dev/de/) · [ES](https://specpulse.pages.dev/es/) · [FR](https://specpulse.pages.dev/fr/) · [PT](https://specpulse.pages.dev/pt/) · [ZH](https://specpulse.pages.dev/zh/) · [KO](https://specpulse.pages.dev/ko/)

---

## 1. MCP Server Setup (Streamable HTTP & Local `stdio`)

SpecPulse exposes 3 zero-auth tools (`specpulse_audit_url`, `specpulse_get_platform_snippet`, `specpulse_get_methodology`) via both a hosted Streamable HTTP endpoint and an open-source local `stdio` runner ([`bin/specpulse-mcp.mjs`](./bin/specpulse-mcp.mjs)).

**Option A — Remote Streamable HTTP (Zero Install):**

```json
{
  "mcpServers": {
    "specpulse": {
      "type": "http",
      "url": "https://specpulse.pages.dev/api/mcp"
    }
  }
}
```

**Option B — Local `stdio` Process (Node.js 20+):**

```json
{
  "mcpServers": {
    "specpulse": {
      "command": "npx",
      "args": ["-y", "github:maxra/web-specs-2026"]
    }
  }
}
```

---

## 2. Open 100-Point Scoring Methodology (`v2.4`)

| Pillar | Weight | Checks Evaluated |
| :--- | :--- | :--- |
| **AI Bot Control** | **35 pts** | Split `robots.txt` training vs. search bots (`10`), `Content-Signal` directive (`5`), SSR HTML readability (`8`), Schema.org JSON-LD (`8`), `/llms.txt` developer index (`4`) |
| **Technical SEO** | **25 pts** | `<title>` 10–70 chars (`6`), Meta description 45–170 chars (`5`), Canonical URL (`5`), OpenGraph (`4`), Sitemap in `robots.txt` (`5`) |
| **HTTP Security** | **25 pts** | HTTPS (`5`), HSTS ≥180d (`5`), **Strict `Content-Security-Policy` header** (`5` — `X-Frame-Options` alone does not pass), `nosniff` (`4`), `Referrer-Policy` (`3`), RFC 9116 `security.txt` (`3`) |
| **Web Foundations** | **15 pts** | `<html lang>` (`4`), Mobile viewport (`4`), Primary `<h1>` (`4`), Edge TTFB ≤1200ms (`3`) |
| **Optional Protocols** | **0 pts (`N/A`)** | `Accept: text/markdown` negotiation, `/.well-known/mcp.json`, and `/.well-known/agent-card.json` (never inflate or penalize score when absent) |

- **Unreachable / 5xx Origins**: Return `UNREACHABLE_ORIGIN` (HTTP 422) rather than partial scores.
- **WAF / Bot Challenges**: HTTP 401/403/429 and Turnstile challenge pages return `WAF_CHALLENGE (Indeterminate)` with zero false deductions.

---

## 3. GitHub Action: Live Edge Regression Gate

```yaml
name: Production Header & Bot Policy Gate
on:
  workflow_dispatch:
  schedule:
    - cron: '0 6 * * 1'

jobs:
  specpulse:
    runs-on: ubuntu-latest
    steps:
      - name: Run SpecPulse v2.4 Edge Audit
        uses: maxra/web-specs-2026@v2.4.0
        with:
          url: 'https://your-production-domain.com'
          fail-under: '85'
```

---

## 4. Reference Templates & Local Validation

- [`examples/robots.txt`](./examples/robots.txt) — Split policy (`GPTBot`/`ClaudeBot` Disallow vs `Claude-SearchBot`/`OAI-SearchBot` Allow) + `Content-Signal: ai-train=no, search=yes, ai-input=yes`
- [`examples/llms.txt`](./examples/llms.txt) — Developer & documentation Markdown index (`# H1` + `> Summary`)
- [`examples/AGENTS.md`](./examples/AGENTS.md) — Coding-agent repository contract
- [`examples/mcp.json`](./examples/mcp.json) — Streamable HTTP & `stdio` MCP client config
- [`examples/agent-card.json`](./examples/agent-card.json) — Linux Foundation A2A v1.0 manifest

Run the validation test suite locally (Node.js 20+):

```bash
npm test
```

## 5. Supported Global & Regional Platforms (23)

Configuration generators at [`specpulse.pages.dev/directory/`](https://specpulse.pages.dev/directory/) cover:
Next.js, Cloudflare Pages, Vercel, Astro, Nuxt, SvelteKit, Remix, Laravel, FastAPI, Nginx, Docusaurus, Shopify, WordPress / WooCommerce, Wix Studio, Webflow, Shopware 6 (DE), PrestaShop 8 (EU), Tiendanube / Nuvemshop (LATAM), EC-CUBE 4 (JP), STUDIO (JP), Shopline (APAC), Cafe24 (KR), and Imweb (KR).
