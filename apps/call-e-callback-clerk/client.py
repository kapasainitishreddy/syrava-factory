#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re

TRUSTED_BASE_URL = "https://api.heycall-e.com"
E164 = re.compile(r"^\+[1-9]\d{7,14}$")


def mask_phone(phone: str) -> str:
    return phone[:3] + "*" * max(0, len(phone) - 7) + phone[-4:]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Preview or place one consented CALL-E follow-up call.")
    parser.add_argument("--phone", required=True, help="Recipient in E.164 format")
    parser.add_argument("--goal", required=True, help="Narrow, factual purpose for the call")
    parser.add_argument("--execute", action="store_true", help="Actually place one call")
    parser.add_argument("--confirm-consent", action="store_true", help="Confirm recipient consent; required for live mode")
    return parser.parse_args()


def build_task(goal: str) -> str:
    return (
        "You are making a short follow-up call on behalf of the user. "
        f"Goal: {goal.strip()}\n"
        "State that you are an AI calling on the user's behalf. Ask only what is necessary for the stated goal. "
        "Do not agree to purchases, contracts, medical/legal/financial decisions, or disclose secrets. "
        "If the recipient requests a consequential decision, say the user must review it and end with a concise summary."
    )


def main() -> int:
    args = parse_args()
    phone = args.phone.strip()
    if not E164.match(phone):
        raise SystemExit("phone must be valid E.164, for example +12025550123")

    request_key = hashlib.sha256(f"{phone}|{args.goal.strip()}".encode()).hexdigest()[:24]
    preview = {
        "mode": "live" if args.execute else "preview",
        "phone_masked": mask_phone(phone),
        "goal": args.goal.strip(),
        "task": build_task(args.goal),
        "idempotency_key": f"callback-clerk-{request_key}",
        "creates_phone_call": bool(args.execute),
    }

    if not args.execute:
        print(json.dumps(preview, indent=2))
        return 0

    if not args.confirm_consent:
        raise SystemExit("--execute requires --confirm-consent")
    api_key = os.getenv("CALLE_API_KEY", "").strip()
    if not api_key:
        raise SystemExit("CALLE_API_KEY is required for live mode")

    try:
        from calle import CalleClient
    except ImportError as exc:
        raise SystemExit("live mode requires: pip install 'calle-ai>=0.7.0'") from exc

    client = CalleClient(api_key=api_key, base_url=TRUSTED_BASE_URL)
    result = client.calls.create_and_wait(
        task=build_task(args.goal),
        recipients=[{"phones": [phone], "region": "US", "locale": "en-US"}],
        metadata={"workflow_type": "callback_clerk", "request_key": request_key},
        idempotency_key=f"callback-clerk-{request_key}",
    )
    print(json.dumps({"mode": "live", "phone_masked": mask_phone(phone), "result": result}, indent=2, default=str))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
