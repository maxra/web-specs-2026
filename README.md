# 2026 Web, Security & AI Agent Visibility Specifications

[![SpecPulse 2026 Compliance](https://specpulse.pages.dev/api/badge?url=specpulse.pages.dev)](https://specpulse.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-5e6ad2.svg)](./LICENSE)

Deterministic reference templates, CI telemetry GitHub Action, and interactive configuration generators verifying whether websites are properly exposed to **Muse, Claude, and autonomous AI agents** (**RFC 8288 `llms.txt` v2**, **IETF AI-Pref `robots.txt`**, **`AGENTS.md` & Cursor `.mdc`**, **Model Context Protocol (`mcp.json`)**, **Linux Foundation A2A v1.0**, and **OWASP HTTP Security Headers**).

- **Live 20-Check Domain Scanner**: [https://specpulse.pages.dev](https://specpulse.pages.dev)
- **Global Specification Directory (23 Platforms × 8 Languages)**: [https://specpulse.pages.dev/directory/](https://specpulse.pages.dev/directory/)
- **CLI & Coding-Agent Skill Pack (`SKILL.md` / `.mdc` / `--prompt`)**: [https://specpulse.pages.dev/pro/](https://specpulse.pages.dev/pro/)
- **International Hubs**: [English](https://specpulse.pages.dev/) · [日本語](https://specpulse.pages.dev/ja/) · [Deutsch](https://specpulse.pages.dev/de/) · [Español](https://specpulse.pages.dev/es/) · [Français](https://specpulse.pages.dev/fr/) · [Português](https://specpulse.pages.dev/pt/) · [简体中文](https://specpulse.pages.dev/zh/) · [한국어](https://specpulse.pages.dev/ko/)

---

## 1. Core 2026 Specification Matrix

| Specification | Standard / Draft | Canonical Path / Header | Interactive Generator |
| :--- | :--- | :--- | :--- |
| **`llms.txt` v2** | `llmstxt.org` v2 + RFC 8288 | `/llms.txt` + `Link: </llms.txt>; rel="describedby"` | [Open Generator](https://specpulse.pages.dev/tools/llms-txt-v2/) |
| **AI Crawler Split** | RFC 9309 + IETF AI-Pref | `/robots.txt` (`__usage_ai-training` vs `Claude-SearchBot` / `OAI-SearchBot`) | [Open Generator](https://specpulse.pages.dev/tools/ai-robots-txt/) |
| **`AGENTS.md` & `.mdc`** | `AGENTS.md` + Cursor Frontmatter | `/AGENTS.md` + `.cursor/rules/*.mdc` | [Open Generator](https://specpulse.pages.dev/tools/agents-md-cursor-rules/) |
| **MCP Server Config** | Model Context Protocol | `mcp.json` & `/.well-known/mcp.json` | [Open Generator](https://specpulse.pages.dev/tools/mcp-server-manifest/) |
| **A2A Agent Card** | Linux Foundation A2A v1.0 | `/.well-known/agent-card.json` (`supportedInterfaces[]`) | [Open Generator](https://specpulse.pages.dev/tools/a2a-agent-card/) |
| **JSON-LD Entities** | Schema.org 2026 | `<script type="application/ld+json">` | [Open Generator](https://specpulse.pages.dev/tools/json-ld-schema/) |
| **Security Headers** | RFC 6797 + W3C CSP3 | `Strict-Transport-Security`, `CSP`, `nosniff` | [Open Generator](https://specpulse.pages.dev/tools/security-headers/) |
| **`security.txt`** | IETF RFC 9116 | `/.well-known/security.txt` (`Contact` + ISO `Expires`) | [Open Generator](https://specpulse.pages.dev/tools/security-txt/) |

Supported across **23 global & regional production platforms**:
- **Cloud & Full-Stack**: Next.js (App Router), Cloudflare Pages & Workers, Vercel, Astro 5, Nuxt, SvelteKit, React Router v7 / Remix, Laravel, FastAPI, Nginx, Docusaurus 3
- **Global & Regional E-Commerce / CMS**: Shopify, WordPress & WooCommerce, Wix & Wix Studio, Webflow, Shopware 6 (DACH/EU), PrestaShop 8 (EU), Tiendanube / Nuvemshop (LATAM), EC-CUBE 4 (Japan), STUDIO (Japan), Shopline (APAC/SEA), Cafe24, Imweb

---

## 2. GitHub Action: Automated Live Edge Telemetry Gate

Verify that your deployed CDN / reverse proxy actually emits valid HTTP headers, `llms.txt` v2 links, and AI crawler policies on every release or schedule:

```yaml
name: Web & AI Specification Gate
on:
  workflow_dispatch:
  schedule:
    - cron: '0 6 * * 1'

jobs:
  specpulse:
    runs-on: ubuntu-latest
    steps:
      - name: Run SpecPulse 20-Check Edge Audit
        uses: maxra/web-specs-2026@main
        with:
          url: 'https://your-production-domain.com'
          fail-under: '85'
```

---

## 3. Embeddable Live Compliance Badge

Add a live edge-verified compliance badge to your repository `README.md`:

```markdown
[![SpecPulse 2026](https://specpulse.pages.dev/api/badge?url=yourcompany.com)](https://specpulse.pages.dev/?domain=yourcompany.com)
```

---

## 4. Reference Baseline Files (`examples/`)

- [`examples/llms.txt`](./examples/llms.txt) — Curated Markdown index structure (`# H1` + `> Summary` + canonical sections)
- [`examples/robots.txt`](./examples/robots.txt) — Split policy permitting Muse, Claude, and AI discovery agents while blocking foundation weight training
- [`examples/AGENTS.md`](./examples/AGENTS.md) — Drop-in coding-agent operating contract for Claude Code, Cursor, Codex, and Antigravity
- [`examples/mcp.json`](./examples/mcp.json) — Streamable HTTP & local `stdio` Model Context Protocol configuration
- [`examples/agent-card.json`](./examples/agent-card.json) — Strict Linux Foundation A2A v1.0 manifest

---

## 5. Open Reference (Free) vs. SpecPulse Pro Kit & Studio

| Capability | Free Open Reference (`$0`) | Pro Kit (`$12` Launch) | Studio & Agency (`$34` Launch) |
| :--- | :---: | :---: | :---: |
| Web 20-Check Domain Scanner & 23-Platform Generators (8 Languages) | ✅ | ✅ | ✅ |
| Public GitHub Action (`maxra/web-specs-2026@main`) | ✅ | ✅ | ✅ |
| Zero-Dependency Local CLI (`specpulse audit`, Staging & Prod) | — | ✅ | ✅ |
| Tailored AI Fix Prompt (`--prompt` for Cursor / Claude / ChatGPT) | — | ✅ | ✅ |
| 1-Command 7-File Config & Rule Bundle (`--fix-dir`) | — | ✅ | ✅ |
| Verified `SKILL.md` + `.cursor/rules/*.mdc` Pack | — | 1 Seat | Unlimited Team Seats |
| Multi-Domain Batch Portfolio & Lead Scanner (`specpulse batch` + CSV) | — | Own Domains | Unlimited Client/Prospects |
| White-Label Client HTML/PDF Audit Reports (`--brand`) | — | — | **Full Commercial Rights** |

- **Compare & Instant Download**: [https://specpulse.pages.dev/pro/](https://specpulse.pages.dev/pro/) · [Live Sample HTML Report](https://specpulse.pages.dev/sample-audit-report.html)
