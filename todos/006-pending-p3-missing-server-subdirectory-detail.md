---
status: resolved
priority: p3
issue_id: "006"
tags: [code-review, completeness, claude-md]
dependencies: []
---

# Directory Overview Missing Server Subdirectory Detail

## Problem Statement

CLAUDE.md line 46 lists `src/server/` as "Nitro API routes" but the server directory contains 6 subdirectories: `api/`, `prompts/`, `routes/`, `services/`, `tasks/`, `utils/`. An AI agent may only look in `src/server/api/` for server code, missing prompts, services, and tasks.

## Findings

- `src/server/` contains: api, prompts, routes, services, tasks, tsconfig.json, utils
- The document only describes it as "Nitro API routes"

## Proposed Solutions

### Option A: Expand the server line
- Change to: `src/server/` -- Nitro server (api/, routes/, services/, tasks/, prompts/, utils/)
- Effort: Small
- Risk: Low

## Technical Details

- **Affected files:** `CLAUDE.md` line 46

## Acceptance Criteria

- [ ] Server subdirectories are visible to an agent reading the directory overview

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created from PR #14 code review | Server directory has richer structure than documented |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/14
