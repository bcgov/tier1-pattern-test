# Tier 1 example consumer

Pre-enrolled scaffold. **Copy this directory to a new GitHub repo** (or run `../tier1/enrol.sh` on an empty repo) to try the three Tier 1 workflows.

## Quick path

```bash
# Option A — use this folder as the repo root
cd patterns/tier1-example
gh repo create tier1-pattern-test --private --source=. --remote=origin --push

# Option B — enrol a fresh clone
gh repo create tier1-pattern-test --private --clone
cd tier1-pattern-test
/path/to/ai-sdlc/patterns/tier1/enrol.sh .
git add . && git commit -m "chore: enrol Tier 1" && git push
```

Then follow [../tier1/ENROL.md](../tier1/ENROL.md) test steps and answer [../tier1/YOU-PROVIDE.md](../tier1/YOU-PROVIDE.md).

## Demo contents

- `src/hello.js` — sample code path (for docs-drift)
- `docs/overview.md` — sample docs
- `.github/workflows/tier1-*.yml` — enrolled automations
- `tier1.config.json` — edit `project` as needed
