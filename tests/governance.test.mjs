import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveExecutionBoundary } from '../packages/governance/index.mjs';

test('high-governance assets always require a qualified human', () => {
  const boundary = resolveExecutionBoundary({
    risk: 'high-governance',
    requestedAutonomy: 'bounded-automation'
  });
  assert.equal(boundary.autonomy, 'human-approval');
  assert.equal(boundary.finalDecision, 'qualified-human');
  assert.equal(boundary.externalActions, 'approval-required');
});

test('standard assets may use policy-bounded automation', () => {
  const boundary = resolveExecutionBoundary({
    risk: 'standard',
    requestedAutonomy: 'bounded-automation'
  });
  assert.equal(boundary.autonomy, 'bounded-automation');
  assert.equal(boundary.externalActions, 'policy-bounded');
});
