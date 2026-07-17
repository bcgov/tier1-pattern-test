---
name: Tier 1 / CI diagnose (gh-aw)
on:
  workflow_run:
    workflows:
      - "Tier 1 / Demo fail CI"
      - "CI"
      - "Tests"
      - "Build"
      - "test"
    types: [completed]

permissions:
  actions: read
  contents: read
  issues: write
  pull-requests: write
  copilot-requests: write

network: defaults

engine: copilot

tools:
  github:
    toolsets: [default]
  bash:

safe-outputs:
  add-comment:
  create-issue:

---

# Tier 1 — CI diagnose (agentic)

A watched GitHub Actions workflow has completed. Run **only if** the conclusion is **failure**.

## Tasks

1. Inspect the failed workflow run and failed job logs.
2. Produce a short diagnosis: likely root cause, evidence from the log, and 2–5 concrete next steps.
3. If there is an open pull request for the failing head SHA, comment on that PR.
4. Otherwise open a GitHub issue titled `Tier 1: CI failed — <workflow name>` with the diagnosis.

## Constraints

- Ignore failures of Tier 1 meta workflows if they appear (preflight / triage / docs drift / this diagnose workflow).
- Do not push code fixes in this workflow (diagnosis only).
- Do not paste secrets from logs; redact tokens and passwords.
- Keep the write-up under ~400 words plus a short log excerpt if helpful.
