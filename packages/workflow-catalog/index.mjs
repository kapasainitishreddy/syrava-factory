import { loadChunkedManifest } from '../catalog-loader.mjs';

export const workflowManifest = loadChunkedManifest('workflows');
export const workflows = Object.freeze(workflowManifest.items);
export const workflowCount = workflows.length;
export const getWorkflow = (id) => {
  const item = workflows.find((candidate) => candidate.id === id);
  return item ? { ...item, source: workflowManifest.source } : null;
};
export const listWorkflowCategories = () => [...new Set(workflows.map((item) => item.category))].sort();
