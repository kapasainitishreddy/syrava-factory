import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'apps', 'factory-v5.1');
const partsDir = path.join(root, 'vendor', 'factory-v5.1', 'parts');
const expected = '58885b5c8194a658d4d4739fa077a95f52e4d3f3c6d210286a94aefaa58de6db';
const parts = ['part-00','part-01','part-02','part-03','part-04a','part-04b','part-04c','part-05a','part-05b','part-05c','part-06','part-07'];
const force = process.argv.includes('--force');
const ifMissing = process.argv.includes('--if-missing');

if (existsSync(target)) {
  if (ifMissing) {
    console.log('Factory v5.1 is already materialized.');
    process.exit(0);
  }
  if (!force) throw new Error('apps/factory-v5.1 already exists. Re-run with --force to replace the generated copy.');
  await rm(target, { recursive: true, force: true });
}

const encoded = (await Promise.all(parts.map(async (name) => (await readFile(path.join(partsDir, name), 'utf8')).trim()))).join('');
const archive = Buffer.from(encoded, 'base64');
const actual = createHash('sha256').update(archive).digest('hex');
if (actual !== expected) throw new Error(`Factory v5.1 bundle checksum mismatch: ${actual}`);

const temp = await mkdtemp(path.join(tmpdir(), 'syrava-factory-v51-'));
const archivePath = path.join(temp, 'factory-v5.1.tgz');
await mkdir(target, { recursive: true });
await writeFile(archivePath, archive);
const result = spawnSync('tar', ['-xzf', archivePath, '-C', target], { stdio: 'inherit' });
await rm(temp, { recursive: true, force: true });
if (result.status !== 0) {
  await rm(target, { recursive: true, force: true });
  throw new Error('Unable to extract Factory v5.1. Ensure tar is available on this machine.');
}
if (!existsSync(path.join(target, 'package.json'))) throw new Error('Factory v5.1 extraction did not produce package.json.');
console.log(`Materialized Factory v5.1 at ${path.relative(root, target)} (sha256 ${actual}).`);
