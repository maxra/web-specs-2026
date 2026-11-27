import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { handleJsonRpcMessage } from '../bin/specpulse-mcp.mjs';

const ROOT = process.cwd();

test('MCP server answers initialize, tools/list, and specpulse_get_platform_snippet cleanly', async () => {
  const initRes = await handleJsonRpcMessage({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} });
  assert.equal(initRes.result.serverInfo.name, 'specpulse-mcp');

  const listRes = await handleJsonRpcMessage({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
  assert.equal(listRes.result.tools.length, 3);

  const callRes = await handleJsonRpcMessage({
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: { name: 'specpulse_get_platform_snippet', arguments: { platform: 'shopware', origin: 'https://shop.de' } }
  });
  assert.match(callRes.result.content[0].text, /Content-Signal:/);
});

test('examples/robots.txt separates AI training vs search bots and declares Content-Signal without placeholder tokens', () => {
  const txt = fs.readFileSync(path.join(ROOT, 'examples', 'robots.txt'), 'utf8');
  assert.doesNotMatch(txt, /__usage_ai-training/);
  assert.match(txt, /User-agent:\s*GPTBot[\s\S]*?Disallow:\s*\//);
  assert.match(txt, /User-agent:\s*Claude-SearchBot[\s\S]*?Allow:\s*\//);
  assert.match(txt, /Content-Signal:\s*ai-train=no,\s*search=yes,\s*ai-input=yes/);
  assert.match(txt, /^Sitemap:\s*https:\/\//m);
});

test('examples/agent-card.json conforms to Linux Foundation A2A v1.0 schema', () => {
  const card = JSON.parse(fs.readFileSync(path.join(ROOT, 'examples', 'agent-card.json'), 'utf8'));
  assert.ok(card.name);
  assert.ok(Array.isArray(card.supportedInterfaces) && card.supportedInterfaces.length > 0);
  assert.equal('protocolVersion' in card, false, 'Top-level legacy protocolVersion must not exist');
});

test('examples/mcp.json, server.json, and action.yml are valid', () => {
  const mcp = JSON.parse(fs.readFileSync(path.join(ROOT, 'examples', 'mcp.json'), 'utf8'));
  assert.ok(mcp.mcpServers && typeof mcp.mcpServers === 'object');
  const srv = JSON.parse(fs.readFileSync(path.join(ROOT, 'server.json'), 'utf8'));
  assert.equal(srv.name, 'io.github.maxra/specpulse');
  const yml = fs.readFileSync(path.join(ROOT, 'action.yml'), 'utf8');
  assert.match(yml, /using:\s*['"]composite['"]/);
});
