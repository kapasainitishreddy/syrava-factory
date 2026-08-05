import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'apps/website');
const dist = path.join(source, 'dist');
const dataTarget = path.join(dist, 'data');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dataTarget, { recursive: true });

for (const file of ['index.html', 'styles.css', 'app.js', 'syrava-mark.svg']) {
  fs.copyFileSync(path.join(source, file), path.join(dist, file));
}
for (const directory of ['workflows', 'agents', 'expansion']) {
  fs.cpSync(path.join(root, 'external', directory), path.join(dataTarget, directory), { recursive: true });
}
fs.copyFileSync(path.join(root, 'external', 'sources.json'), path.join(dataTarget, 'sources.json'));

console.log('Built dependency-free website at apps/website/dist');
