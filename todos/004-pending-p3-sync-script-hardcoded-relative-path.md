---
status: resolved
priority: p3
issue_id: "004"
tags: [code-review, architecture, security]
dependencies: []
resolved_date: "2026-03-01"
resolution: "SCRAPER_TAGS_DIR now reads process.env.SCRAPER_REPO_PATH with fallback to the existing relative path. Error message updated to mention the env variable."
---

# Sync Script Uses Hardcoded Relative Path to Scraper Repo

## Problem Statement

`sync-tags.ts` constructs the scraper repo path using a hardcoded relative path (`../../ai-content-scraper/src/content/tags`), which assumes a specific directory layout. This is fragile and will break if the repos are located differently on other developers' machines, in CI, or in monorepo setups.

## Findings

- **Location**: `scripts/sync-tags.ts`, line 21
- **Evidence**: `const SCRAPER_TAGS_DIR = resolve(PROJECT_ROOT, '../../ai-content-scraper/src/content/tags')`
- **Impact**: Script fails with a non-obvious error if the scraper repo is not at the expected relative path.
- **Comparison**: Other sync scripts in the project (e.g., `sync-all.ts`) may use the same pattern, so this could be a pre-existing convention.

## Proposed Solutions

### Solution A: Support an environment variable with fallback (Recommended)
```ts
const SCRAPER_TAGS_DIR = resolve(
  process.env.SCRAPER_REPO_PATH || resolve(PROJECT_ROOT, '../../ai-content-scraper'),
  'src/content/tags'
)
```
- **Pros**: Flexible for different setups. Backward compatible with current layout.
- **Cons**: Minor change.
- **Effort**: Small
- **Risk**: Low

### Solution B: Accept a CLI argument
- **Pros**: Explicit.
- **Cons**: More verbose to use.
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_To be decided during triage._

## Technical Details

- **Affected files**: `scripts/sync-tags.ts`

## Acceptance Criteria

- [ ] Script works with both default path and custom `SCRAPER_REPO_PATH` env variable
- [ ] Clear error message when scraper repo is not found

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-01 | Identified during code review of PR #1 | |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/1
- File: `scripts/sync-tags.ts`
