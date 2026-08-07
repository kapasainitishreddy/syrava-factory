# Syrava Factory v4 — monorepo runtime

This app is the customer-facing outcome marketplace for the existing `syrava-factory` repository. It reads the authoritative vendored manifests from `../../external/workflows` and `../../external/agents`, so the repository keeps one catalog source of truth.

## Run

```bash
npm --prefix apps/factory-v4 start
```

Open `http://127.0.0.1:4180`.

## Modes

`FACTORY_V4_MODE=demo` is the default. Pilot launches generate a proof result and never perform external side effects.

For connected execution set:

```bash
FACTORY_V4_MODE=connected
FACTORY_WORKFLOW_RUNTIME_URL=https://your-workflow-runtime.example
FACTORY_WORKFLOW_RUNTIME_TOKEN=secret-manager-injected-token
```

Connected execution still starts with `approved:false`; consequential actions remain approval-gated in the authoritative workflow runtime.

## Customer flow

Outcome finder → AI-team offer → governed pilot setup → required integrations → readiness → proof/connected launch.

Workspace access keys are returned once and stored only as SHA-256 hashes on disk. The browser keeps the original key in `sessionStorage`.
