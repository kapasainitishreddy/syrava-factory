import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!token) {
  console.error('GH_TOKEN or GITHUB_TOKEN is required to read the private runtime repositories.');
  process.exit(2);
}

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28'
};

async function githubJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

async function githubText(repo, file, ref = 'main') {
  const data = await githubJson(`https://api.github.com/repos/${repo}/contents/${file}?ref=${encodeURIComponent(ref)}`);
  return Buffer.from(data.content, 'base64').toString('utf8');
}

async function syncWorkflows(tempDir) {
  const repo = 'kapasainitishreddy/ai-workflows-';
  const commit = await githubJson(`https://api.github.com/repos/${repo}/commits/main`);
  const files = ['catalog-factory.mjs', ...Array.from({ length: 15 }, (_, i) => `catalog-${String(i + 1).padStart(2, '0')}.mjs`)];
  const sourceDir = path.join(tempDir, 'workflows');
  await fs.mkdir(sourceDir, { recursive: true });

  for (const file of files) {
    await fs.writeFile(path.join(sourceDir, file), await githubText(repo, `src/${file}`, commit.sha));
  }

  const items = [];
  for (let i = 1; i <= 15; i += 1) {
    const file = path.join(sourceDir, `catalog-${String(i).padStart(2, '0')}.mjs`);
    const module = await import(`${pathToFileURL(file).href}?v=${Date.now()}-${i}`);
    const catalog = Object.values(module).find(Array.isArray);
    if (!catalog) throw new Error(`No catalog array exported by ${file}`);
    items.push(...catalog);
  }

  return { repo, ref: commit.sha, items };
}

async function syncAgentSource(tempDir) {
  const repo = 'kapasainitishreddy/Ai-agents';
  const commit = await githubJson(`https://api.github.com/repos/${repo}/commits/main`);
  const registry = await githubText(repo, 'src/ai_agents/registry.py', commit.sha);
  const sourceDir = path.join(tempDir, 'agents');
  await fs.mkdir(sourceDir, { recursive: true });
  await fs.writeFile(path.join(sourceDir, 'registry.py'), registry);
  return { repo, ref: commit.sha, registry };
}

const root = path.resolve(new URL('..', import.meta.url).pathname);
const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'syrava-sync-'));

try {
  const workflows = await syncWorkflows(tempDir);
  const agents = await syncAgentSource(tempDir);

  await fs.writeFile(path.join(root, 'external/workflow-source-snapshot.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    sourceRepo: workflows.repo,
    sourceRef: workflows.ref,
    count: workflows.items.length,
    items: workflows.items
  }, null, 2) + '\n');

  await fs.writeFile(path.join(root, 'external/agent-registry-source.py'), agents.registry);
  await fs.writeFile(path.join(root, 'external/sources.json'), JSON.stringify({
    schemaVersion: 1,
    sources: [
      { type: 'workflow-runtime', repo: workflows.repo, ref: workflows.ref, authoritative: true },
      { type: 'agent-runtime', repo: agents.repo, ref: agents.ref, authoritative: true }
    ],
    policy: 'Factory vendors manifests only. Execution code remains in the authoritative runtime repositories.'
  }, null, 2) + '\n');

  console.log(`Fetched ${workflows.items.length} workflows at ${workflows.ref.slice(0, 7)}.`);
  console.log(`Fetched agent registry at ${agents.ref.slice(0, 7)}.`);
  console.log('Review source snapshots, then regenerate curated public manifests.');
} finally {
  await fs.rm(tempDir, { recursive: true, force: true });
}
