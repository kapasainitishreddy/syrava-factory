import argparse
import json
from pathlib import Path

from strands import Agent, tool


@tool
def load_tasks(path: str) -> str:
    """Load a local JSON backlog for analysis. This tool has no external side effects."""
    target = Path(path).resolve()
    if not target.exists():
        return json.dumps({"error": f"task file not found: {target}"})
    try:
        payload = json.loads(target.read_text(encoding="utf-8"))
    except Exception as exc:
        return json.dumps({"error": f"could not parse task file: {exc}"})
    return json.dumps(payload, indent=2)


@tool
def prepare_followup(task_id: str, recipient_role: str, draft: str) -> str:
    """Package a follow-up draft for explicit human review. This tool never sends it."""
    return json.dumps(
        {
            "task_id": task_id,
            "recipient_role": recipient_role,
            "status": "REQUIRES_HUMAN_REVIEW",
            "draft": draft.strip(),
            "side_effects": "none",
        },
        indent=2,
    )


SYSTEM_PROMPT = """You are QuietOps, a professional follow-up agent for a solo founder or small team.
Your job is to reduce forgotten work without creating hidden side effects.

Rules:
- Start by using load_tasks on the path supplied by the user.
- Prioritize real deadlines, blockers, unanswered requests, and tasks with clear next actions.
- Separate known facts from assumptions.
- Never claim that an email, calendar event, purchase, application, or remote mutation occurred.
- When asked to draft an external follow-up, use prepare_followup and leave it in REQUIRES_HUMAN_REVIEW.
- Ask for missing facts inside your final plan rather than inventing them.
- Produce a compact priority list with reason, deadline/risk, and next action.
"""


def main() -> None:
    parser = argparse.ArgumentParser(description="QuietOps Strands agent demo")
    parser.add_argument("--tasks", default="sample_tasks.json")
    parser.add_argument(
        "--request",
        default=(
            "Review my backlog. Give me the three highest-value next actions, identify "
            "anything blocked by missing facts, and prepare (but do not send) one useful follow-up."
        ),
    )
    args = parser.parse_args()

    agent = Agent(
        system_prompt=SYSTEM_PROMPT,
        tools=[load_tasks, prepare_followup],
    )
    result = agent(f"Task file: {args.tasks}\n\nRequest: {args.request}")
    print(result)


if __name__ == "__main__":
    main()
