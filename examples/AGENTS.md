# AGENTS.md — Repository Coding-Agent Operating Contract

## 1. Build & Verification
- Run unit tests and production build before committing: `npm test && npm run build`
- Verify deployed HTTP headers and AI discovery paths: `npx specpulse audit https://acme.dev --fail-under 90`

## 2. 2026 Web Specification Guardrails
- Pair `/llms.txt` with `Link: </llms.txt>; rel="describedby"; type="text/markdown"`.
- Keep AI search citation bots (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`) allowed in `/robots.txt` while blocking weight training (`__usage_ai-training`, `GPTBot`).
- Preserve `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, and `frame-ancestors` CSP headers.
