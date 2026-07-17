#!/usr/bin/env node
/**
 * Heuristic issue triage: apply labels, request detail when body is thin.
 * Env: ISSUE_NUMBER, or pass --issue N. Requires gh auth.
 */
import { loadConfig, repoRoot } from "./lib/config.mjs";
import { ensureLabel, gh } from "./lib/gh.mjs";

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}

const root = repoRoot();
const cfg = loadConfig(root);
if (!cfg.triage?.enabled) {
  console.log("triage disabled in tier1.config.json");
  process.exit(0);
}

const issueNumber = arg("issue") || process.env.ISSUE_NUMBER;
if (!issueNumber) {
  console.error("Set ISSUE_NUMBER or --issue");
  process.exit(1);
}

const raw = gh([
  "issue",
  "view",
  String(issueNumber),
  "--json",
  "title,body,labels,number",
]);
const issue = JSON.parse(raw);
const text = `${issue.title || ""}\n${issue.body || ""}`.toLowerCase();
const bodyLen = (issue.body || "").trim().length;
const existing = new Set((issue.labels || []).map((l) => l.name));

const toAdd = [];
for (const rule of cfg.triage.label_rules || []) {
  if (text.includes(String(rule.match).toLowerCase()) && !existing.has(rule.label)) {
    toAdd.push(rule.label);
  }
}
if (toAdd.length === 0 && cfg.triage.default_label && !existing.has(cfg.triage.default_label)) {
  toAdd.push(cfg.triage.default_label);
}

const needsDetail =
  bodyLen < (cfg.triage.min_body_length ?? 80) &&
  cfg.triage.needs_detail_label &&
  !existing.has(cfg.triage.needs_detail_label);

if (needsDetail) toAdd.push(cfg.triage.needs_detail_label);

for (const label of new Set(toAdd)) {
  ensureLabel(label);
  gh(["issue", "edit", String(issueNumber), "--add-label", label]);
  console.log(`Added label: ${label}`);
}

if (needsDetail) {
  const project = cfg.project || "this repo";
  const comment = [
    `### Tier 1 triage (${project})`,
    "",
    "Thanks for the issue. Please add enough detail for someone to act on it:",
    "",
    "- **Problem** — what is going wrong?",
    "- **Expected** — what should happen?",
    "- **Actual** — what happens instead?",
    "- **Steps** — how to reproduce (if applicable)",
    "",
    `_Automated by Tier 1 · body length ${bodyLen} < ${cfg.triage.min_body_length}_`,
  ].join("\n");
  gh(["issue", "comment", String(issueNumber), "--body", comment]);
  console.log("Posted needs-detail comment");
}

console.log(
  JSON.stringify(
    { issue: issue.number, labelsAdded: [...new Set(toAdd)], needsDetail, bodyLen },
    null,
    2,
  ),
);
