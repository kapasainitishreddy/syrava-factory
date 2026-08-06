# Architecture

## Source-of-truth model

Syrava Factory does not copy the execution runtimes.

- `ai-workflows-` owns workflow definitions, runtime execution, connectors, deployment profiles, and workflow tests.
- `Ai-agents` owns agent definitions, runtime execution, safety policy, deployment profiles, and agent tests.
- `syrava-factory` owns the public website, curated manifests, product packaging, voice adapter registry, connector contracts, and cross-runtime governance.

## Data flow

1. `npm run sync:catalogs` reads the current private runtime repositories using a customer-supplied GitHub token.
2. Source snapshots are recorded with immutable commit SHAs.
3. Curated public manifests in `external/` are reviewed and committed.
4. The dependency-free build copies reviewed chunked manifests into the website output.
5. The website never receives GitHub credentials or customer connector secrets.

## Runtime activation

The Factory catalog is discovery and configuration. A live customer deployment must:

1. Obtain customer authorization through OAuth, service account, signed webhook, or a private-network agent.
2. Discover fields and mappings.
3. Perform read-only acceptance tests.
4. Apply the governance boundary.
5. Activate only after required approvals.
6. Record audit evidence and provide revocation.

Private systems cannot be operated without authorization.
