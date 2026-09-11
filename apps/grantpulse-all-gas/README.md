# GrantPulse — Convex All Gas Hackathon

GrantPulse is a new full-stack hackathon app started after the August 25 eligibility cutoff. It is designed as a realtime funding inbox: founders save official opportunity URLs, track deadlines and blockers, and see application status update immediately across clients.

The eventual sponsor-stack design is:
- **Convex**: database, mutations/queries, realtime UI and deployment.
- **Firecrawl**: ingest official opportunity pages.
- **OpenAI**: extract structured deadlines, requirements and blockers from retrieved source text.
- **AgentMail**: give an application/project an inbox for organizer replies.

This scaffold does **not** claim those external integrations are running yet. The connected Convex setup action requested interactive user input in the automation environment, and no API credentials were available, so the build remains truthfully un-deployed.

## Local source layout

- `src/App.jsx`: opportunity board UI.
- `convex/schema.ts`: realtime opportunity schema.
- `convex/opportunities.ts`: list/create/status mutations.
- `hackathon.md`: build log and judging notes.

## After account setup

```bash
cd apps/grantpulse-all-gas
npm install
npx convex dev
npm run dev
```

Then wire Firecrawl/OpenAI/AgentMail only with real credentials, test the full flow, and deploy through Convex static hosting to a public `convex.site` URL.

## Submission blockers

- Luma registration.
- Convex project/deployment setup.
- Firecrawl, OpenAI and AgentMail credentials/integrations.
- Public deployment.
- Public project-specific GitHub repo (the current connected GitHub tool cannot create a new repo; this code is staged in a public monorepo).
- Required social post tagging the sponsors.
- <=3 minute demo video.
- vibeapps.dev submission by Sep 22, 2026 at 12:00 PM PT.
