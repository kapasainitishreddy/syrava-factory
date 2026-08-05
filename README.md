# Syrava Factory

`factory.syrava.com` is the customer-facing catalog and composition layer for Syrava's automation portfolio.

## Portfolio

- **300 workflows** synchronized from [`kapasainitishreddy/ai-workflows-`](https://github.com/kapasainitishreddy/ai-workflows-)
- **50 analytical agents** synchronized from [`kapasainitishreddy/Ai-agents`](https://github.com/kapasainitishreddy/Ai-agents)
- **500-asset expansion blueprint**: 400 planned workflows and 100 planned agents
- Shared open-source voice, connector, and governance packages

The two runtime repositories remain authoritative. This repository vendors manifests and provides the website, customer-facing catalog, deployment boundaries, and integration contracts.

## Structure

```text
apps/website/               factory.syrava.com
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
```

To refresh from private source repositories:

```bash
GH_TOKEN=<fine-grained-token> npm run sync:catalogs
```

The token must have read access to both source repositories. Do not commit it.

## Deployment

Build command:

```bash
npm run build
```

Output directory:

```text
apps/website/dist
```

Attach the deployment to `factory.syrava.com` after the DNS CNAME is configured.
