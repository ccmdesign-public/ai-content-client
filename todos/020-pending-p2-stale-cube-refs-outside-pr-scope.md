---
status: resolved
priority: p2
issue_id: "020"
tags: [code-review, dead-code, cleanup]
dependencies: []
---

# Stale CUBE/BEM References Remain Outside PR Scope

## Problem Statement

The PR cleaned CUBE/BEM references from `.claude/` config files and `.cursorrules`, but several files outside the PR's changeset still contain stale `validate:tokens`, `analyze:components`, and `CUBE CSS` references. These will mislead AI agents and developers.

## Findings

| File | Stale Reference |
|---|---|
| `GEMINI.md` (lines 18, 43, 50) | "CUBE CSS", `npm run validate:tokens`, "Follow CUBE CSS methodology" |
| `README.md` (lines 145-146, 149, 389) | `validate:tokens`, `validate:tokens:fix`, `analyze:components`, "Styling: CUBE CSS" |
| `.claude/TIER1-IMPLEMENTATION.md` (lines 277, 342) | `npm run analyze:components` still referenced in non-updated sections |
| `.claude/TIER2-IMPLEMENTATION.md` (lines 85, 335-336, 378) | `validate:tokens` still referenced in non-updated sections |
| `.claude/config/token-rules.json` (lines 13-14) | `validate:tokens` and `validate:tokens:fix` script references |
| `scripts/setup-ai-environment.ts` (line 97) | `npm run analyze:components` in "Next steps" output |

## Proposed Solutions

### Option A: Expand PR scope to clean remaining files
- **Pros:** Single cleanup pass, no follow-up needed
- **Cons:** Increases PR size
- **Effort:** Small
- **Risk:** Low

### Option B: Track as separate follow-up issue
- **Pros:** Keeps PR focused
- **Cons:** References linger until follow-up
- **Effort:** Small
- **Risk:** Low (references are in docs/config, not runtime code)

## Technical Details

- **Affected files:** GEMINI.md, README.md, .claude/TIER1-IMPLEMENTATION.md, .claude/TIER2-IMPLEMENTATION.md, .claude/config/token-rules.json, scripts/setup-ai-environment.ts

## Acceptance Criteria

- [ ] Zero `validate:tokens` references outside `docs/plans/` (plan docs are historical)
- [ ] Zero `analyze:components` references outside `docs/plans/`
- [ ] Zero "CUBE CSS" references in active config/instruction files (GEMINI.md, README.md)

## Work Log

| Date | Action | Outcome |
|---|---|---|
| 2026-03-20 | Code review of PR #18 | Found 6 files with stale CUBE/BEM references not addressed by the PR |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/18
