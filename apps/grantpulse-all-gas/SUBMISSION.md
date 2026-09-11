# GrantPulse submission draft

## Name
GrantPulse

## Pitch
A realtime founder funding inbox that keeps official opportunity sources, deadlines, blockers, and submission state synchronized in Convex instead of scattered across browser tabs and spreadsheets.

## Current implementation
The repository contains a Convex schema, list/create/status functions, and a React opportunity board. The UI deliberately fails closed when `VITE_CONVEX_URL` is missing.

## Planned hackathon integrations that must be genuinely completed before submission
- Convex: deployed database/functions/realtime UI.
- Firecrawl: fetch official opportunity pages.
- OpenAI: structured requirement/deadline extraction grounded in fetched text.
- AgentMail: organizer-reply inbox.

None of those external integrations should be described as working until a real credential-backed test succeeds.

## Required submission fields
- Repo: [ADD PUBLIC PROJECT REPO URL]
- Live app: [ADD convex.site OR chatgpt.site URL]
- Video: [ADD <=3 MIN PUBLIC VIDEO]
- Social post: [ADD X/LINKEDIN URL TAGGING CONVEX, OPENAI, FIRECRAWL, AGENTMAIL]
- Submission: vibeapps.dev

## Blockers
- [ ] Luma registration.
- [ ] Convex project/deployment creation. The connected Convex setup action requested interactive user input and could not finish in the automation environment.
- [ ] Firecrawl/OpenAI/AgentMail credentials and verified flows.
- [ ] Public deployment and anonymous judge test.
- [ ] Public social post.
- [ ] Demo video.

## Demo sequence once unblocked
1. Add an official program URL.
2. Show Firecrawl retrieval and source evidence.
3. Show OpenAI extraction of deadline/requirements.
4. Open a second client and demonstrate realtime Convex status sync.
5. Show an organizer reply arriving through AgentMail.
6. Change status from blocked to ready and show both clients update instantly.
