# ARC-AGI-3 Milestone #2 Experiment

This folder prepares an open-source ARC-AGI-3 agent experiment for the September 30 milestone. It is **not a Kaggle submission** and has no claimed score.

The implementation follows the public `arcprize/ARC-AGI-3-Agents` agent interface (`FrameData`, `GameAction`, `GameState`, and the base `Agent`). The draft baseline adds a tiny state-memory policy: it hashes the visible grid, records which simple moves have already been tried from similar observations, and explores the least-used move before repeating. This is meant as a deterministic research baseline, not a prize-ready solver.

## Integrate with the official kit

1. Clone `https://github.com/arcprize/ARC-AGI-3-Agents.git`.
2. Copy `novelty_agent.py` into that repo's `agents/templates/` folder.
3. Register the class in the official agent registry if needed by the current version.
4. Run against public games with the official tooling and a valid `ARC_API_KEY` for local online testing.
5. Record scores, failures and runtime. Do not promote it to Kaggle until it actually runs.

## Milestone submission requirements still outside this repo

- User must accept the Kaggle competition rules.
- Submission must run as a Kaggle Notebook with internet disabled and within the competition runtime limit.
- The milestone notebook must be public under an open-source license by Sep 30, 2026 at 11:59 PM UTC for prize eligibility.
- A Kaggle notebook submission cannot be performed by the connected GitHub tools.

## Next research iteration

After verifying this baseline, compare it against the official random and reasoning templates, then add observation-change scoring, reset handling and compact hypothesis memory. Only retain changes that improve measured public-game performance.
