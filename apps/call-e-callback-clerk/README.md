# Callback Clerk — CALL-E: Your Code Is Calling

Callback Clerk turns a small follow-up request into a safe phone-call plan. The default mode is preview-only. Live mode requires explicit `--execute --confirm-consent`, a real CALL-E API key, and a recipient phone number supplied by the operator.

The implementation follows CALL-E's public contribution requirements: no hidden calls, no embedded secrets, E.164 validation, masked summaries, idempotency metadata, and a no-call path by default.

## Preview (no phone call)

```bash
cd apps/call-e-callback-clerk
python client.py --phone +12025550123 --goal "Ask whether the application review date has changed"
```

`+1 202-555-0123` is a fictional reserved example. Preview never dials.

## Live call, only after account setup and recipient consent

```bash
pip install 'calle-ai>=0.7.0'
export CALLE_API_KEY='...'
python client.py --phone '+1...' --goal '...' --execute --confirm-consent
```

The code pins the CALL-E origin to `https://api.heycall-e.com` before sending an API key.

## Contribution target

The official hackathon asks for a PR to `CALLE-AI/awesome-phone-call-agents`. The intended destination is:

`apps/python/callback-clerk/`

A fork/upstream PR cannot be created with the currently connected GitHub actions because they do not expose repository forking and the user does not have a writable branch in the upstream repository. The files are staged here so they can be copied into a fork without inventing a submission.

## Remaining blockers
- Create/sign into CALL-E account and obtain the associated API key/email.
- Perform one consented test call and inspect the real result.
- Copy into a fork of the official awesome repo, run its validation script, and open the required PR.
- Record <=3 minute public demo video.
- Submit Devpost form with PR URL and CALL-E account email before Sep 14, 2026 11:45 PM SGT.
