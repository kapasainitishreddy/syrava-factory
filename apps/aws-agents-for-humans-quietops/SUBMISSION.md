# QuietOps submission draft

## Track
Professional Agents

## Project name
QuietOps

## One-line pitch
A Strands agent that turns a messy founder backlog into a prioritized next-action plan and review-ready follow-ups without silently taking consequential actions.

## Problem
Solo founders and small teams lose time to fragmented deadlines, stalled follow-ups, and tasks that are technically small but easy to forget. Existing assistants often either stop at chat or overreach into autonomous actions that deserve review.

## Solution
QuietOps reads a structured backlog, identifies the highest-value next actions, separates known facts from missing information, and can prepare a concise follow-up draft. Every external follow-up is returned as `REQUIRES_HUMAN_REVIEW`; the current demo does not send messages, alter calendars, spend money, or mutate remote systems.

## How Strands is used
The application creates a Strands `Agent` with two explicit tools: `load_tasks`, a read-only local backlog loader, and `prepare_followup`, a side-effect-free review package. The system prompt instructs the agent to use those tools, prioritize deadlines and blockers, and never claim an external action occurred.

## Why it matters
The useful part of an agent is not just producing prose. It is deciding what deserves attention, gathering the relevant state, and handing the human a safe decision point. QuietOps is intentionally designed around that boundary.

## Repository
[ADD PUBLIC PROJECT-SPECIFIC REPOSITORY URL OR CONFIRM MONOREPO PATH IS ACCEPTED]

## Architecture diagram
See `architecture.md`. Export or screenshot the Mermaid diagram if Devpost requires a standalone image.

## Demo video
[ADD PUBLIC YOUTUBE/VIMEO URL AFTER A VERIFIED AWS/BEDROCK RUN]

## Live demo
Optional. [ADD ONLY IF ACTUALLY DEPLOYED]

## Verification before clicking Submit
- [ ] Devpost registration complete.
- [ ] AWS Builder ID available.
- [ ] Exact code runs successfully with Strands and the entrant's AWS configuration.
- [ ] Repository license is visible in the submitted repository.
- [ ] Architecture diagram is attached in the required form.
- [ ] <=5 minute public demo accurately shows the working project.
- [ ] No claim in this description exceeds what the recorded build actually demonstrates.
