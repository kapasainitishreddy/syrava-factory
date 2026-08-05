import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function load(directory) {
  const dir = path.join(root, 'external', directory);
  const index = JSON.parse(fs.readFileSync(path.join(dir, 'index.json'), 'utf8'));
  const items = index.parts.flatMap((part) => JSON.parse(fs.readFileSync(path.join(dir, part), 'utf8')));
  return { ...index, items };
}

const workflows = load('workflows');
const agents = load('agents');
const expansion = load('expansion');

assert.equal(workflows.count, 300);
assert.equal(workflows.items.length, 300);
assert.equal(new Set(workflows.items.map((item) => item.id)).size, 300);
assert.ok(workflows.source.repo && workflows.source.ref);
assert.equal(agents.count, 50);
assert.equal(agents.items.length, 50);
assert.equal(new Set(agents.items.map((item) => item.id)).size, 50);
assert.ok(agents.source.repo && agents.source.ref);
assert.equal(expansion.plannedAssetCount, 500);
assert.equal(expansion.plannedWorkflowCount, 400);
assert.equal(expansion.plannedAgentCount, 100);
assert.equal(expansion.items.length, 20);

console.log('Manifest validation passed: 300 workflows, 50 agents, 500 planned assets.');
