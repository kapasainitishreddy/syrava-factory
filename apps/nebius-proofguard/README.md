# ProofGuard Nebius — Nebius × NVIDIA Global AI Hackathon

A new hackathon-specific agent safety demo. ProofGuard reviews a proposed AI-agent action plan before execution and produces a structured risk decision: allowed, requires human approval, or blocked. The goal is to make consequential agent behavior inspectable instead of silently autonomous.

This folder is not the pre-existing private Scythe repository. It is a fresh public competition implementation that can be independently judged and open-sourced.

## Intended track
Coding and Agentic Engineering or Best Apps and Agents.

## Required hackathon stack
The runnable client is deliberately endpoint-configurable. A valid submission must set it to a **real Nebius Token Factory or Nebius AI Cloud endpoint** and select an **NVIDIA open-source model** available there. Until those credentials are supplied and a call succeeds, this repository makes no claim of working Nebius inference.

## Run after Nebius setup

```bash
cd apps/nebius-proofguard
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export NEBIUS_API_KEY='...'
export NEBIUS_BASE_URL='the OpenAI-compatible base URL shown by your Nebius project'
export NEBIUS_MODEL='the exact NVIDIA open-source model identifier enabled in your project'
streamlit run app.py
```

## Demo flow
1. Paste a proposed agent action plan such as reading a repo, changing a file, emailing a recipient, or initiating a payment.
2. ProofGuard asks the configured NVIDIA model to classify each action by side effect and reversibility.
3. The UI displays the verdict and a concise audit record.
4. Show that missing Nebius configuration fails closed instead of silently switching to another provider.

## Submission blockers
- Nebius account/API credentials and exact supported NVIDIA model ID.
- Verified Token Factory or AI Cloud execution.
- Public hosted demo URL.
- Project-specific open-source repository/license placement suitable for Devpost.
- <=3 minute public YouTube demo and final Devpost submission.
