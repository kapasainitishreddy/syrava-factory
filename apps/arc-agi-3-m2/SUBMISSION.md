# ARC-AGI-3 Milestone #2 submission plan

## Current asset
`novelty_agent.py` is an unbenchmarked deterministic exploration baseline compatible with the public ARC-AGI-3 agent interface. It stores exact-grid visit state and chooses the least-used simple directional move for each observed grid.

## No score claim
No Kaggle score, public-game score, runtime result, or milestone placement is claimed. The agent must run inside the official ARC environment before it becomes a credible submission candidate.

## Required path to a truthful Milestone #2 entry
1. Accept the ARC-AGI-3 Kaggle rules in the entrant account.
2. Clone/use the official ARC-AGI-3 agent templates and integrate `NoveltyMemory`.
3. Benchmark it against at least the official random baseline on public games.
4. Keep an experiment table containing version, action budget, public-game score, runtime, and failure mode.
5. Iterate only from measured results; likely next additions are observation-change scoring, reset-aware memory, short hypothesis memory, and better action selection.
6. Move the best verified implementation into a Kaggle Notebook.
7. Confirm notebook runtime <=9 hours and internet disabled.
8. Submit through Kaggle.
9. For Milestone #2 prize eligibility, make the notebook public under an open-source license no later than Sep 30, 2026 11:59 PM UTC.

## Milestone target
Do not submit the current baseline merely to create a submission count. Submit only after it executes correctly in the competition environment and produces a reproducible score worth preserving.

## Results table
| Version | Environment | Score | Runtime | Notes |
| --- | --- | ---: | ---: | --- |
| NoveltyMemory v0 | Not yet run | N/A | N/A | Scaffold only |
