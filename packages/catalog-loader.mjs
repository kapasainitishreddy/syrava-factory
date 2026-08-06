import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function loadChunkedManifest(directory) {
  const dir = path.join(packageRoot, 'external', directory);
  const index = JSON.parse(fs.readFileSync(path.join(dir, 'index.json'), 'utf8'));
  const items = index.parts.flatMap((part) => JSON.parse(fs.readFileSync(path.join(dir, part), 'utf8')));
  return { ...index, items };
}
