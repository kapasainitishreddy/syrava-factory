import test from 'node:test';
import assert from 'node:assert/strict';
import { workflows, workflowCount, getWorkflow } from '../packages/workflow-catalog/index.mjs';
import { agents, agentCount, getAgent } from '../packages/agent-catalog/index.mjs';

test('Factory exposes all runtime assets without duplication', () => {
  assert.equal(workflowCount, 300);
  assert.equal(agentCount, 50);
  assert.equal(new Set(workflows.map((item) => item.id)).size, 300);
  assert.equal(new Set(agents.map((item) => item.id)).size, 50);
});

test('catalog lookup returns source-linked assets', () => {
  const workflow = getWorkflow('deal-rescue-radar');
  const agent = getAgent('machine-autopsy-agent');
  assert.equal(workflow.source.repo, 'kapasainitishreddy/ai-workflows-');
  assert.equal(agent.source.repo, 'kapasainitishreddy/Ai-agents');
});
