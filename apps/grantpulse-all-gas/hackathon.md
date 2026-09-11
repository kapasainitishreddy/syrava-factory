# GrantPulse Hackathon Log

## 2026-09-06

Started a new eligible app after the Aug 25 cutoff. Chosen problem: founders lose time cross-checking opportunity pages, deadlines, blockers, and application status across tabs and inboxes.

Implemented:
- Convex schema for opportunities and status.
- Convex realtime query/mutations.
- Minimal React board that creates opportunities and updates status live once a Convex deployment exists.
- Explicit fail-closed UI when `VITE_CONVEX_URL` is not configured.

Attempted the connected Convex setup action before editing. The action required interactive user input and could not complete inside the non-interactive automation runtime. No Convex project or deployment has been falsely claimed.

Next verified build session:
1. Register on Luma and create Convex project.
2. Run `npx convex dev` to generate `_generated` bindings.
3. Verify create/list/status flow.
4. Add Firecrawl ingestion of official pages.
5. Add OpenAI structured extraction with source evidence.
6. Add AgentMail reply inbox.
7. Deploy to convex.site, test anonymous judge access.
8. Record <=3-minute demo, make sponsor-tag social post, submit on vibeapps.dev.
