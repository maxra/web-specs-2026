import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

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

test('examples/mcp.json and llms.txt are valid and well-formed', () => {
  const mcp = JSON.parse(fs.readFileSync(path.join(ROOT, 'examples', 'mcp.json'), 'utf8'));
  assert.ok(mcp.mcpServers && typeof mcp.mcpServers === 'object');
  const llms = fs.readFileSync(path.join(ROOT, 'examples', 'llms.txt'), 'utf8');
  assert.match(llms, /^#\s+\S+/m);
  assert.match(llms, /^>\s+\S+/m);
});

test('action.yml defines composite GitHub Action with url and fail-under inputs', () => {
  const yml = fs.readFileSync(path.join(ROOT, 'action.yml'), 'utf8');
  assert.match(yml, /using:\s*['"]composite['"]/);
  assert.match(yml, /fail-under:/);
  assert.match(yml, /blockedByWaf/);
});
