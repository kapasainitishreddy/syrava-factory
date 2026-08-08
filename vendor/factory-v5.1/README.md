# Factory v5.1 vendored source

This directory stores the exact verified Factory v5.1 source as checksum-protected base64 chunks. The materialized source is generated into `apps/factory-v5.1/` and intentionally ignored by Git because this vendored archive is the canonical transport copy.

```bash
npm run factory:v5:install
npm run factory:v5:verify
npm run factory:v5:start
```

The installer concatenates the ordered parts, decodes the archive, verifies SHA-256 `58885b5c8194a658d4d4739fa077a95f52e4d3f3c6d210286a94aefaa58de6db`, and only then extracts it. Use `npm run factory:v5:install -- --force` to replace an existing materialized copy.

The v5.1 catalog contains 1,250 workflows, 1,250 specialist AI agents, and 1,000 multilingual voice-agent operating contracts. Individual connected deployments remain fail-closed until their customer-specific readiness evidence passes.
