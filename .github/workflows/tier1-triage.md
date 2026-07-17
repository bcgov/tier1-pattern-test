---
# GitHub Agentic Workflow — Tier 1 issue triage
# Preview tooling: compile with `gh aw compile` then commit the .lock.yml
# Docs: https://docs.github.com/en/copilot/how-tos/github-agentic-workflows/creating-github-agentic-workflows
name: Tier 1 / Issue triage (gh-aw)
on:
  issues:
    types: [opened, reopened]

permissions:
  contents: read
  issues: write
  pull-requests: read
  copilot-requests: write

network: defaults

engine: copilot

tools:
  github:
    toolsets: [issues]

safe-outputs:
  add-comment:
  add-labels:

---

# Tier 1 — Issue triage (agentic)

You are triaging a newly opened or reopened GitHub issue in a BC Gov digital service repository.

## Tasks

1. Read the issue title and body.
2. Assign up to three labels from this set when they clearly apply: `bug`, `enhancement`, `documentation`, `security`, `accessibility`, `ops`, `needs-triage`, `needs-detail`.
3. If the issue lacks problem / expected / actual / steps (or equivalent), add `needs-detail` and comment asking for those fields briefly.
4. If the issue is already clear and actionable, do **not** ask for more detail; add the best-fit type label only.
5. Keep comments short, respectful, and free of secrets.

## Constraints

- Do not close the issue.
- Do not modify code or open pull requests.
- Prefer precision over many labels.
