export const VOICE_PROVIDERS = Object.freeze([
  {
    id: 'faster-whisper',
    role: 'speech-to-text',
    deployment: ['local', 'self-hosted'],
    costModel: 'compute-only',
    notes: 'Preferred GPU/CPU transcription adapter.'
  },
  {
    id: 'whisper-cpp',
    role: 'speech-to-text',
    deployment: ['device', 'local', 'self-hosted'],
    costModel: 'compute-only',
    notes: 'Portable local transcription adapter.'
  },
  {
    id: 'piper',
    role: 'text-to-speech',
    deployment: ['device', 'local', 'self-hosted'],
    costModel: 'compute-only',
    notes: 'Low-resource local speech synthesis adapter.'
  },
  {
    id: 'kokoro',
    role: 'text-to-speech',
    deployment: ['local', 'self-hosted'],
    costModel: 'compute-only',
    notes: 'Higher-quality local speech synthesis adapter.'
  }
]);

export function selectVoiceStack({ input = false, output = false, localOnly = true } = {}) {
  const selected = [];
  if (input) selected.push(localOnly ? 'whisper-cpp' : 'faster-whisper');
  if (output) selected.push(localOnly ? 'piper' : 'kokoro');
  return selected;
}
