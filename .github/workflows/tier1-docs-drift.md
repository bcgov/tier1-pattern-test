---
name: Tier 1 / Docs drift (gh-aw)
on:
  schedule:
    - cron: "0 15 * * 1"
  workflow_dispatch:

permissions:
  contents: write
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
  create-pull-request:
  create-issue:

---

# Tier 1 — Docs drift (agentic)

Compare recent changes under configured code paths (`src/`, `app/`, `lib/` if present) against documentation (`docs/`, `README.md`).

## Tasks

1. Identify code changes from the last 14 days that affect user-facing or public API behaviour.
2. Check whether `docs/` and `README.md` describe the current behaviour.
3. If docs are behind:
   - Prefer opening a **draft pull request** that updates the relevant docs (minimal, accurate edits).
   - If you cannot safely edit docs, open an issue summarizing what drifted and which files to update.
4. If docs are current, take **no write action** (do not open an empty PR).

## Constraints

- Do not change application source code in this workflow.
- Do not invent APIs not evidenced in the repository.
- Keep the PR description actionable for a human reviewer.
