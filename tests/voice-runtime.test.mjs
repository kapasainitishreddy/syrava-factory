import test from 'node:test';
import assert from 'node:assert/strict';
import { selectVoiceStack, VOICE_PROVIDERS } from '../packages/voice-runtime/index.mjs';

test('local voice mode uses device-friendly open-source adapters', () => {
  assert.deepEqual(selectVoiceStack({ input: true, output: true, localOnly: true }), ['whisper-cpp', 'piper']);
  assert.ok(VOICE_PROVIDERS.every((provider) => provider.costModel === 'compute-only'));
});
