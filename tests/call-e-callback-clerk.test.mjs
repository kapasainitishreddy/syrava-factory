import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientPath = path.join(repoRoot, 'apps', 'call-e-callback-clerk', 'client.py');

function runClient(args, env = {}) {
  return spawnSync('python3', [clientPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: { ...process.env, ...env },
  });
}

test('CALL-E preview normalizes a bounded goal and never creates a call', () => {
  const result = runClient([
    '--phone',
    '+12025550123',
    '--goal',
    '  Confirm   the Friday\n appointment time  ',
  ]);

  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.mode, 'preview');
  assert.equal(payload.goal, 'Confirm the Friday appointment time');
  assert.equal(payload.creates_phone_call, false);
  assert.match(payload.task, /Goal: Confirm the Friday appointment time/);
  assert.equal(payload.phone_masked.includes('5550123'), false);
});

test('CALL-E rejects an empty follow-up goal before preview or live mode', () => {
  const result = runClient([
    '--phone',
    '+12025550123',
    '--goal',
    ' \n\t ',
  ]);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /goal must contain a concrete follow-up purpose/);
  assert.equal(result.stdout, '');
});

test('CALL-E rejects goals above the launch boundary', () => {
  const result = runClient([
    '--phone',
    '+12025550123',
    '--goal',
    'x'.repeat(501),
  ]);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /goal must be 500 characters or fewer/);
  assert.equal(result.stdout, '');
});

test('CALL-E live mode still requires explicit recipient consent before provider access', () => {
  const result = runClient([
    '--phone',
    '+12025550123',
    '--goal',
    'Confirm the appointment time',
    '--execute',
  ], { CALLE_API_KEY: 'should-not-be-read-without-consent' });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /--execute requires --confirm-consent/);
  assert.doesNotMatch(result.stderr, /pip install/);
});
