#!/usr/bin/env node
// SpecPulse Open MCP Server (stdio transport) — MIT License
// Also hosted as zero-install Streamable HTTP at https://specpulse.pages.dev/api/mcp

import readline from 'node:readline';

const PLATFORM_GUIDES = {
  nextjs: 'next.config.mjs headers() + public/robots.txt (Content-Signal: ai-train=no, search=yes, ai-input=yes)',
  'cloudflare-pages': 'public/_headers + public/robots.txt',
  vercel: 'vercel.json headers[] + public/robots.txt',
  shopify: 'templates/robots.txt.liquid + layout/theme.liquid (<head> JSON-LD & rel="describedby")',
  wix: 'Dashboard > Marketing & SEO > Robots.txt Editor + Settings > Custom Code (Head)',
  wordpress: 'functions.php send_headers action + ABSPATH/robots.txt',
  shopware: 'public/robots.txt + custom/plugins/.../Resources/views/storefront/base.html.twig',
  prestashop: 'Shop Parameters > Traffic & SEO > robots.txt + themes/[theme]/templates/_partials/head.tpl',
  tiendanube: 'Admin > Design > Edit code > layouts/layout.tpl (<head> JSON-LD & /p/llms-txt)',
  eccube: 'html/robots.txt + app/template/default/default_frame.twig',
  'studio-jp': 'Project Dashboard > App Settings > Custom Code > Head tags',
  shopline: 'Admin > Settings > Custom Code (Header) + Online Store > Preferences',
  cafe24: 'Admin > Store Setup > General > SEO > Advanced ([Head Tag Source] & [robots.txt])',
  imweb: 'Admin > Preferences > SEO > Header Code Injection'
};

export const MCP_TOOLS = [
  {
    name: 'specpulse_audit_url',
    description:
      'Audit a public website URL across 20 scored checks (AI bot rules, Content-Signal, SSR readability, Schema.org JSON-LD, Technical SEO, strict CSP/HSTS security headers) plus optional protocol checks (MCP, A2A, Markdown negotiation). Supports 8 languages.',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'Public website URL or domain (e.g. "https://shopify.com")' },
        lang: {
          type: 'string',
          enum: ['en', 'ja', 'de', 'es', 'fr', 'pt', 'zh', 'ko'],
          description: 'Report language code (defaults to "en")'
        }
      },
      required: ['url']
    }
  },
  {
    name: 'specpulse_get_platform_snippet',
    description:
      'Generate platform-specific AI crawler policy (robots.txt + Content-Signal) and header configuration instructions for 23 global & regional web/e-commerce stacks.',
    inputSchema: {
      type: 'object',
      properties: {
        platform: {
          type: 'string',
          description:
            'Platform slug: nextjs, cloudflare-pages, vercel, shopify, wix, wordpress, shopware, prestashop, tiendanube, eccube, studio-jp, shopline, cafe24, imweb, webflow, astro, laravel, nginx, fastapi, nuxt, sveltekit, remix, docusaurus'
        },
        origin: { type: 'string', description: 'Canonical website origin (e.g. "https://yourstore.com")' }
      },
      required: ['platform']
    }
  },
  {
    name: 'specpulse_get_methodology',
    description: 'Return SpecPulse v2.4 100-point scoring weights, WAF handling, and optional N/A protocol rules.',
    inputSchema: { type: 'object', properties: {} }
  }
];

async function handleToolCall(name, args = {}) {
  if (name === 'specpulse_audit_url') {
    const target = String(args.url || '').trim();
    const lang = String(args.lang || 'en').slice(0, 2);
    const endpoint = `https://specpulse.pages.dev/api/audit?url=${encodeURIComponent(target)}&lang=${encodeURIComponent(lang)}&format=markdown`;
    const res = await fetch(endpoint, {
      headers: { Accept: 'text/markdown', 'User-Agent': 'SpecPulse-MCP-Stdio/2.4.0' }
    });
    const text = await res.text();
    return { content: [{ type: 'text', text }], isError: !res.ok };
  }

  if (name === 'specpulse_get_platform_snippet') {
    const plat = String(args.platform || 'nextjs').toLowerCase();
    const orig = String(args.origin || 'https://example.com').replace(/\/$/, '');
    const targetNote = PLATFORM_GUIDES[plat] || `Configure HTTP headers & /robots.txt on ${plat}`;
    const snippet = `# Target Platform: ${plat}\n# Integration Location: ${targetNote}\n# Interactive Editor: https://specpulse.pages.dev/tools/ai-robots-txt/${plat}/\n\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: Google-Extended\nDisallow: /\n\nUser-agent: Claude-SearchBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: *\nContent-Signal: ai-train=no, search=yes, ai-input=yes\nAllow: /\n\nSitemap: ${orig}/sitemap.xml\n`;
    return { content: [{ type: 'text', text: snippet }] };
  }

  if (name === 'specpulse_get_methodology') {
    const text = `# SpecPulse v2.4 Scoring Methodology (100 Points)\n- AI Bot Control (35 pts): Split /robots.txt (10), Content-Signal (5), SSR HTML readability (8), Schema.org JSON-LD (8), /llms.txt index (4).\n- Technical SEO (25 pts): <title> 10-70c (6), meta description 45-170c (5), canonical (5), OpenGraph (4), Sitemap (5).\n- HTTP Security (25 pts): HTTPS (5), HSTS >=180d (5), strict Content-Security-Policy header (5), nosniff (4), Referrer-Policy (3), RFC 9116 security.txt (3).\n- Foundations (15 pts): <html lang> (4), viewport (4), primary <h1> (4), TTFB <=1200ms (3).\n- Optional Protocols (0 weight N/A when absent): Accept: text/markdown, /.well-known/mcp.json, /.well-known/agent-card.json.`;
    return { content: [{ type: 'text', text }] };
  }

  throw new Error(`Unknown tool: ${name}`);
}

export async function handleJsonRpcMessage(msg) {
  if (!msg || typeof msg !== 'object') return null;
  const { id, method, params } = msg;

  // Notifications have no id and expect no response
  if (id === undefined) return null;

  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'specpulse-mcp', version: '2.4.0' }
      }
    };
  }

  if (method === 'ping') {
    return { jsonrpc: '2.0', id, result: {} };
  }

  if (method === 'tools/list') {
    return { jsonrpc: '2.0', id, result: { tools: MCP_TOOLS } };
  }

  if (method === 'tools/call') {
    try {
      const result = await handleToolCall(params?.name, params?.arguments);
      return { jsonrpc: '2.0', id, result };
    } catch (err) {
      return { jsonrpc: '2.0', id, error: { code: -32602, message: err.message } };
    }
  }

  return { jsonrpc: '2.0', id, error: { code: -32601, message: `Unsupported method: ${method}` } };
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` || process.argv[1]?.endsWith('specpulse-mcp.mjs')) {
  const rl = readline.createInterface({ input: process.stdin, terminal: false });
  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try {
      const parsed = JSON.parse(trimmed);
      const response = await handleJsonRpcMessage(parsed);
      if (response) {
        process.stdout.write(JSON.stringify(response) + '\n');
      }
    } catch {
      process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }) + '\n');
    }
  });
}
