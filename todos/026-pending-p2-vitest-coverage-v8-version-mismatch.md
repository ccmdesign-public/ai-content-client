---
status: pending
priority: p2
issue_id: "026"
tags: [code-review, dependencies, testing]
dependencies: []
---

# @vitest/coverage-v8 v3 incompatible with vitest v4

## Problem Statement

The PR bumps `vitest` from `^3.2.4` to `^4.1.0` (a major version jump) but leaves `@vitest/coverage-v8` pinned at `^3.2.4`. Major vitest releases typically require matching major versions of their companion packages. This version mismatch may cause coverage collection to silently fail or produce errors when running `pnpm vitest run --coverage`.

## Findings

### Evidence

- `package.json` line ~100: `"@vitest/coverage-v8": "^3.2.4"` (unchanged)
- `package.json` line ~112: `"vitest": "^4.1.0"` (newly added)
- The lockfile shows `@vitest/coverage-v8@3.2.4` resolved against `vitest@4.1.0`, which may work today but is fragile.

### Agent: dependency-reviewer

Vitest v4 introduces breaking changes including dropping Node 18 support, new peer dependency requirements (`vite` is now required), and updated companion package APIs. The `@vitest/coverage-v8` package should be upgraded to v4.x to match.

## Proposed Solutions

### Solution 1: Upgrade coverage-v8 to v4 (Recommended)
```bash
pnpm add -D @vitest/coverage-v8@^4.1.0
```
- **Pros:** Ensures version alignment, prevents silent coverage failures
- **Cons:** None significant
- **Effort:** Small
- **Risk:** Low

### Solution 2: Keep as-is and verify coverage works
- **Pros:** No change needed if coverage still works
- **Cons:** Fragile, could break on next patch release
- **Effort:** Small (verification only)
- **Risk:** Medium

## Recommended Action

Solution 1 -- upgrade `@vitest/coverage-v8` to match the vitest v4 major version.

## Technical Details

- **Affected files:** `package.json`, `pnpm-lock.yaml`
- **Components:** Test infrastructure

## Acceptance Criteria

- [ ] `@vitest/coverage-v8` version matches vitest major version (v4.x)
- [ ] `pnpm vitest run --coverage` succeeds without errors
- [ ] Coverage report is generated correctly

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | Identified version mismatch during PR #19 review | Major version jumps of vitest require companion package updates |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/19
- [Vitest v4 migration guide](https://vitest.dev/guide/migration)
