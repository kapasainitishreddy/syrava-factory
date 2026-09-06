# ProofGuard Nebius submission draft

## Track
Best Apps and Agents, with Coding and Agentic Engineering as a possible alternate after real implementation is evaluated.

## Project name
ProofGuard Nebius

## Pitch
A pre-execution reviewer for AI agents that classifies proposed actions as allowed, human-approval-required, or blocked before consequential side effects happen.

## What exists now
A Streamlit review UI and an OpenAI-compatible client that refuses to run unless `NEBIUS_API_KEY`, `NEBIUS_BASE_URL`, and `NEBIUS_MODEL` are explicitly configured. It does not silently fall back to another provider and it does not execute the reviewed actions.

## What must be true before submission
The configured endpoint must be a real Nebius Token Factory or Nebius AI Cloud route and the model must be an eligible NVIDIA open-source model. A successful runtime call must be recorded before the project description says it is powered by Nebius/NVIDIA.

## Submission copy after verification
ProofGuard reviews an AI agent's intended action plan before execution. It asks an NVIDIA open-source model served through Nebius to return a structured risk decision, reasons about reversibility and missing facts, and surfaces a compact audit record. The demo intentionally separates reasoning from execution: it never performs the proposed email, payment, repository mutation, or other side effect.

## Required fields
- Working demo URL: [ADD ONLY AFTER HOSTED AND TESTED]
- Public repo: [ADD PROJECT-SPECIFIC URL]
- NVIDIA model used: [ADD EXACT VERIFIED MODEL ID]
- Nebius service used: [ADD TOKEN FACTORY OR AI CLOUD SERVICE ACTUALLY USED]
- <=3 minute public YouTube video: [ADD]
- Feedback: [WRITE ONLY AFTER REAL PRODUCT USE]

## Demo sequence
1. Review a read-only plan and show `ALLOW`.
2. Add an external email action and show `HUMAN_APPROVAL` if the model judges it appropriate.
3. Add credential exfiltration or hidden destructive behavior and show `BLOCK`.
4. Remove Nebius configuration and show the app fails closed rather than switching providers.
