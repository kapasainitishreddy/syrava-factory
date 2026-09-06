import json
import os

import streamlit as st
from openai import OpenAI

SYSTEM = """You are ProofGuard, a pre-execution reviewer for AI-agent action plans.
Return strict JSON with keys: verdict, summary, actions, missing_facts.
verdict must be ALLOW, HUMAN_APPROVAL, or BLOCK.
Each item in actions must include action, risk, reversibility, reason, and required_control.
Do not assume an action happened. Review only the proposed plan.
Block credential exfiltration, hidden destructive behavior, or actions that require facts the operator has not supplied.
Escalate irreversible or externally consequential actions to HUMAN_APPROVAL when they can be made safe with explicit review.
"""


def client_from_env() -> tuple[OpenAI, str]:
    required = ["NEBIUS_API_KEY", "NEBIUS_BASE_URL", "NEBIUS_MODEL"]
    missing = [name for name in required if not os.getenv(name)]
    if missing:
        raise RuntimeError("Missing required Nebius configuration: " + ", ".join(missing))
    return (
        OpenAI(api_key=os.environ["NEBIUS_API_KEY"], base_url=os.environ["NEBIUS_BASE_URL"]),
        os.environ["NEBIUS_MODEL"],
    )


st.set_page_config(page_title="ProofGuard Nebius", page_icon="🛡️")
st.title("ProofGuard Nebius")
st.caption("Pre-execution review for AI-agent action plans. No action is executed by this demo.")

plan = st.text_area(
    "Proposed agent plan",
    height=220,
    value=(
        "1. Read the public project README.\n"
        "2. Draft a release note.\n"
        "3. Email the draft to a customer.\n"
        "4. Charge the customer's saved payment method."
    ),
)

if st.button("Review plan"):
    try:
        client, model = client_from_env()
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": plan},
            ],
            response_format={"type": "json_object"},
            temperature=0,
        )
        raw = response.choices[0].message.content or "{}"
        result = json.loads(raw)
        st.subheader(result.get("verdict", "UNKNOWN"))
        st.write(result.get("summary", ""))
        st.json(result)
        st.info("Review only: this application did not execute any proposed action.")
    except Exception as exc:
        st.error(str(exc))
        st.warning("Fail-closed: no fallback model/provider was used.")
