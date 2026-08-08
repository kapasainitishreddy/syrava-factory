# Syrava Factory v5.1

Factory v5.1 is the expert-scale, multilingual customer product layer for Syrava Factory.

## Canonical catalog

- 1,250 governed AI workflows.
- 1,250 specialist AI agents.
- 1,000 multilingual voice-agent operating contracts.
- 3,500 total assets across 65 operating domains.
- 50 languages, including all 22 scheduled Indian languages.

The catalog is generated from curated domain, workflow-pattern, specialist-archetype, and voice-role contracts so maintainers can review the source model rather than maintain thousands of copied prompt files.

## Customer product features

- Search/filter by asset type, domain, risk, expertise, and language.
- Full workflow and specialist-agent contract views.
- Advanced and expert collections for less-saturated operating problems.
- Consent-first multilingual voice sessions with code-switching, clarification, confirmation, interruption, and human-handoff states.
- Customer-specific readiness evaluation that fails closed when deployment evidence is missing.
- Voice acceptance plans requiring provider licensing, native review, accent/noise testing, confirmation accuracy, human handoff, latency, and consent/safety evidence.
- Deterministic, side-effect-free specialist-agent proof runs.
- HTTP API for catalog, asset details, readiness, agent proofs, voice sessions, consent, and voice turns.
- Local persistent ledgers outside test mode.
- Security headers and bounded request bodies.

## Access

```bash
npm run factory:v5:install
npm run factory:v5:verify
npm run factory:v5:start
```

Then open the URL printed by the v5.1 server. End customers normally use the hosted web product and do not install the repository. Self-hosting customers clone the repository and run the commands above behind their own authenticated reverse proxy.

## Production boundary

A catalog entry is an implementation-ready operating contract, not proof that every third-party integration, language provider, phone number, legal requirement, or model license is production-approved for every customer. Connected deployments must pass the asset readiness gate. Voice deployments must additionally pass the locale/provider acceptance plan before being marketed as production-ready for that deployment.
