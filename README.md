# Syrava Factory

`factory.syrava.com` is the customer-facing catalog and composition layer for Syrava's automation portfolio.

## Portfolio

- **360 workflows** synchronized from [`kapasainitishreddy/ai-workflows-`](https://github.com/kapasainitishreddy/ai-workflows-)
- **60 analytical agents** synchronized from [`kapasainitishreddy/Ai-agents`](https://github.com/kapasainitishreddy/Ai-agents)
- **420 currently available assets** across the two authoritative runtimes
- **500-asset expansion blueprint**: 400 planned workflows and 100 planned agents
- Shared open-source voice, connector, and governance packages

The two runtime repositories remain authoritative. This repository vendors manifests and provides the website, customer-facing catalog, deployment boundaries, and integration contracts.

## Factory v4 customer marketplace

`apps/factory-v4/` is the monorepo-native customer product layer. It uses the existing vendored workflow and agent manifests rather than copying another catalog.

It adds:

- Outcome-first AI-team marketplace with eight productized teams.
- Explainable team recommendation from a customer's goal.
- Guided pilot setup with accountable owner and human approver.
- Required-integration readiness checks.
- Private customer workspaces with one-time access keys; only SHA-256 hashes are persisted.
- Safe proof launches by default with no external side effects.
- Optional connected execution through the authoritative workflow runtime.
- Human approval retained at the runtime boundary.

Run it with:

```bash
npm run factory:v4:check
npm run factory:v4:start
```

Then open `http://127.0.0.1:4180`.

Connected mode requires server-side runtime configuration:

```bash
FACTORY_V4_MODE=connected
FACTORY_WORKFLOW_RUNTIME_URL=https://your-runtime.example
FACTORY_WORKFLOW_RUNTIME_TOKEN=<secret-manager-injected-token>
```

The current Cloudflare/static application under `apps/website/` remains unchanged, so adding v4 does not silently replace the production deployment target.

## August 2026 expansion

The live catalog now includes the 60-workflow Factory expansion and 10 reusable specialist agents, with public manifests pinned to the exact authoritative runtime commits. New use cases span founder operations, revenue, product engineering, customer success, finance, creator operations, workforce, education, healthcare administration, property operations, AI governance, and personal productivity.

## Structure

```text
apps/website/               current factory.syrava.com static app
apps/factory-v4/            outcome marketplace + pilot/runtime layer
packages/workflow-catalog/  workflow manifest access
packages/agent-catalog/     agent manifest access
packages/voice-runtime/     free/open-source voice provider registry
packages/connector-runtime/ OAuth and connector contracts
packages/governance/        risk and approval policy
external/                   chunked generated manifests and source refs
scripts/                    sync, validation, and copy utilities
tests/                      catalog and policy tests
```

## Commands

```bash
npm install
npm test
npm run validate
npm run build
npm run factory:v4:check
npm run factory:v4:start
```

To refresh from private source repositories:

```bash
GH_TOKEN=<fine-grained-token> npm run sync:catalogs
```

The token must have read access to both source repositories. Do not commit it.

## Deployment

The current static deployment build remains:

```bash
npm run build
```

with output:

```text
apps/website/dist
```

The v4 app is a Node 22 runtime and should be deployed separately until the production domain is intentionally migrated from the static Cloudflare asset deployment.
