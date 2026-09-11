# QuietOps — AWS Agents for Humans Hackathon

QuietOps is a new hackathon-only professional agent that helps a solo founder or small team turn a messy task backlog into a safe follow-up plan. It identifies deadlines, missing information, and stale items; drafts follow-ups; and keeps any externally consequential action behind explicit human review.

This implementation is intentionally new work for the 2026 AWS Agents for Humans submission period. It does not import the pre-existing Syrava product runtime.

## Track
Professional Agents.

## Stack
- Python 3.11+
- Strands Agents SDK
- Default Strands/Amazon Bedrock model path after AWS credentials and model access are configured
- Local JSON tools for a deterministic demo data source

## Run

```bash
cd apps/aws-agents-for-humans-quietops
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python agent.py --tasks sample_tasks.json
```

The agent reads the local sample task file through a Strands tool. It can create a review-ready draft but does not send email, modify calendars, spend money, or mutate remote systems.

## Demo story
1. Load a mixed backlog with deadlines and incomplete follow-ups.
2. Ask QuietOps to identify the three highest-value next actions.
3. Ask it to draft one follow-up.
4. Show that the draft is marked `REQUIRES_HUMAN_REVIEW` rather than sent.
5. Explain how additional approved tools could later connect real business systems.

## Remaining submission blockers
- AWS account + Builder ID + Devpost registration.
- Working AWS credentials and Bedrock model access to verify this exact code end-to-end.
- Project-specific public repository with MIT/Apache license visible at repository root, unless a monorepo submission is accepted.
- Architecture image/export, public <=5 minute demo video, and final Devpost form.

No live AWS execution is claimed in this repository until it has actually been run against the configured account.