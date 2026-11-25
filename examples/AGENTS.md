# AGENTS.md — Repository Coding-Agent Operating Contract

## 1. Build & Verification
- Run unit tests and production build before committing: `npm test && npm run build`
- Verify deployed HTTP headers and AI bot policies: `npx specpulse audit https://acme.dev --fail-under 90`

## 2. Deployment & Bot Control Guardrails
- Keep AI search & user-triggered bots (`Claude-SearchBot`, `OAI-SearchBot`, `ChatGPT-User`) allowed in `/robots.txt` while blocking weight training (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) and emitting `Content-Signal: ai-train=no, search=yes, ai-input=yes`.
- Emit explicit `Content-Security-Policy` (`frame-ancestors`), `Strict-Transport-Security`, and `X-Content-Type-Options: nosniff` headers.
- Pair `/llms.txt` with `Link: </llms.txt>; rel="describedby"; type="text/markdown"` on developer/SaaS docs.
