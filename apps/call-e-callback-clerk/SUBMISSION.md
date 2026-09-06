# Callback Clerk submission draft

## Project name
Callback Clerk

## Pitch
A dry-run-first phone-call agent for narrow follow-ups that requires explicit recipient consent before live execution and produces masked, auditable output.

## Contribution target
`CALLE-AI/awesome-phone-call-agents/apps/python/callback-clerk/`

## Safety behavior implemented
- Preview is the default and creates no phone call.
- E.164 phone validation.
- Masked phone output.
- Stable idempotency key for the same phone/goal pair.
- Live mode requires both `--execute` and `--confirm-consent`.
- `CALLE_API_KEY` is read only from the environment.
- CALL-E API origin is pinned to `https://api.heycall-e.com`.
- The task explicitly refuses purchases, contracts, medical/legal/financial decisions, and secret disclosure.

## What still must happen before submission
- [ ] Sign in/create CALL-E account and obtain a real API key tied to the email used for the Devpost entry.
- [ ] Make one consented test call and verify the returned object/transcript behavior.
- [ ] Fork `CALLE-AI/awesome-phone-call-agents` and copy this folder to `apps/python/callback-clerk/`.
- [ ] Run `python3 scripts/validate_repository.py` in the upstream fork and address all findings.
- [ ] Open the required pull request to the official repository.
- [ ] Record a <=3 minute public demo showing preview mode and a consented live call.
- [ ] Submit Devpost with the official PR URL and CALL-E account email.

## Devpost description draft after live verification
Callback Clerk packages a narrow follow-up into an AI phone-call workflow while making the side-effect boundary explicit. The operator can preview the exact task without dialing. A real call requires a valid CALL-E credential plus explicit `--execute --confirm-consent`; sample output masks the number and uses an idempotency key to reduce accidental duplicate work. The workflow is designed for ordinary status checks and callbacks, not high-stakes decision making.

## Demo sequence
1. Run preview against the fictional +1 202-555-0123 sample and show there is no call.
2. Show invalid-number rejection.
3. Show that `--execute` without `--confirm-consent` fails.
4. With a genuinely consented test recipient and real CALL-E account, run one live call.
5. Show masked result and explain idempotency/side-effect controls.
