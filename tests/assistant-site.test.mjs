import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('Factory assistant config is isolated to Factory knowledge', async () => {
  const config = JSON.parse(await read('apps/website/assistant/site.json'));
  const knowledge = JSON.parse(await read('apps/website/assistant/knowledge.json'));

  assert.equal(config.siteId, 'factory');
  assert.equal(config.assistantName, 'Ask Factory');
  assert.equal(config.knowledgeUrl, '/assistant/knowledge.json');
  assert.equal(knowledge.siteId, 'factory');
  assert.ok(knowledge.entries.length >= 4);
  assert.ok(config.suggestions.every((question) => typeof question === 'string' && question.length > 5));
});

test('Factory website mounts the shared Syrava assistant runtime', async () => {
  const html = await read('apps/website/index.html');
  assert.match(html, /<syrava-assistant\s+site-config="\/assistant\/site\.json"/);
  assert.match(html, /https:\/\/syrava\.com\/assistant\/v1\/widget\.js/);
});

test('Factory build copies the assistant directory into dist', async () => {
  const build = await read('scripts/build-website.mjs');
  assert.match(build, /['"]assistant['"]/);
  assert.match(build, /fs\.cpSync/);
});
