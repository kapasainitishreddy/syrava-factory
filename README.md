# Syrava Factory

`factory.syrava.com` is the customer-facing catalog and composition layer for Syrava's automation portfolio.

## Portfolio

### Factory v5.1 expert catalog

- **1,250 AI workflow contracts** across standard, advanced, and expert operating patterns.
- **1,250 specialist AI-agent contracts** with evidence, authority, abstention, escalation, evaluation, and proof behavior.
- **1,000 multilingual voice-agent contracts** covering 50 languages, including all 22 scheduled Indian languages.
- **3,500 total v5.1 assets** across 65 operating domains.

These assets are available through the v5.1 product layer as governed implementation contracts. Customer-specific connected deployments remain fail-closed until integrations, security, approvals, provider licensing, language benchmarks, and acceptance evidence pass the relevant readiness gate.

### Authoritative connected runtimes

- **360 workflows** synchronized from [`kapasainitishreddy/ai-workflows-`](https://github.com/kapasainitishreddy/ai-workflows-)
- **60 analytical agents** synchronized from [`kapasainitishreddy/Ai-agents`](https://github.com/kapasainitishreddy/Ai-agents)

Those two repositories remain the existing connected execution runtimes. Factory v5.1 adds the expert-scale catalog, proof/runtime contracts, readiness engine, and multilingual voice layer without silently replacing the current production site.

## Factory v5.1

The exact verified source is checksum-pinned under `vendor/factory-v5.1/`. Materialize it with:

```bash
npm run factory:v5:install
npm run factory:v5:verify
npm run factory:v5:start
```

The installer verifies SHA-256 before extracting into the generated, gitignored `apps/factory-v5.1/` directory. The existing `apps/factory-v4/` remains available as a rollback/reference implementation.

v5.1 includes:

- 3,500-asset searchable catalog.
- Advanced and expert workflow/agent collections.
- 50-language voice-agent marketplace.
- Native-script Indian-language discovery and consent flows.
- Asset-detail views with operational contracts and guardrails.
- Fail-closed customer readiness assessment.
- Voice deployment acceptance plans.
- Deterministic agent proof execution.
- Consent-first voice-session runtime.
- Catalog/readiness/proof/voice HTTP APIs.
- Local ledgers and bounded HTTP/security defaults.

See [`docs/FACTORY_V5_1.md`](docs/FACTORY_V5_1.md).

## Existing Factory v4 customer marketplace

`apps/factory-v4/` remains the earlier monorepo-native outcome marketplace, with eight productized teams, explainable recommendations, guided pilot setup, required-integration readiness checks, private workspaces, proof launches, and optional connected workflow execution.

```bash
npm run factory:v4:check
npm run factory:v4:start
```

## Current static deployment

The Cloudflare/static application under `apps/website/` remains unchanged. Its build remains:

```bash
npm run build
```

with output at `apps/website/dist`. Pushing v5.1 therefore does not silently switch `factory.syrava.com`; production migration should be deliberate after deployment credentials, authentication, providers, and customer acceptance are configured.

## Repository structure

```text
apps/website/                 current static factory.syrava.com app
apps/factory-v4/              earlier outcome marketplace/runtime
apps/factory-v5.1/            generated v5.1 source after materialization
vendor/factory-v5.1/          checksum-pinned v5.1 canonical source archive
packages/workflow-catalog/    existing workflow manifest access
packages/agent-catalog/       existing agent manifest access
packages/voice-runtime/       existing voice provider registry
packages/connector-runtime/   connector contracts
packages/governance/          governance policy
external/                     synchronized legacy runtime manifests
scripts/                      build, sync, validation, v5.1 materializer
```
