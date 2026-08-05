import test from 'node:test';
import assert from 'node:assert/strict';
import { createConnectorProfile } from '../packages/connector-runtime/index.mjs';

test('connectors always require authorization and deduplicate scopes', () => {
  const profile = createConnectorProfile({
    provider: 'google-workspace',
    authMethod: 'oauth',
    scopes: ['mail.read', 'mail.read', 'calendar.read']
  });
  assert.equal(profile.authorizationRequired, true);
  assert.deepEqual(profile.scopes, ['calendar.read', 'mail.read']);
});

test('read-only connectors reject destructive actions', () => {
  assert.throws(() => createConnectorProfile({
    provider: 'crm',
    authMethod: 'oauth',
    readOnly: true,
    destructiveActions: true
  }));
});
