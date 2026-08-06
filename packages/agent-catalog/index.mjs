import { loadChunkedManifest } from '../catalog-loader.mjs';

export const agentManifest = loadChunkedManifest('agents');
export const agents = Object.freeze(agentManifest.items);
export const agentCount = agents.length;
export const getAgent = (id) => {
  const item = agents.find((candidate) => candidate.id === id);
  return item ? { ...item, source: agentManifest.source } : null;
};
export const listAgentGroups = () => [...new Set(agents.map((item) => item.group))].sort();
