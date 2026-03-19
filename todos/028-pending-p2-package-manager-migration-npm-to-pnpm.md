---
status: done
priority: p2
issue_id: "028"
tags: [code-review, architecture, tooling]
dependencies: []
---

# Mixed package manager signals: npm lockfile deleted, pnpm lockfile added

## Problem Statement

This PR deletes `package-lock.json` (and its backup) while adding `pnpm-lock.yaml` (13,943 lines) and gitignoring `package-lock.json`. The `package.json` scripts still reference `npm run` conventions and there is no `.npmrc` or `pnpm-workspace.yaml` documenting the migration. This creates confusion about which package manager is canonical and may break CI/CD pipelines or contributor workflows.

## Findings

- `package-lock.json` deleted (21,505 lines) and added to `.gitignore`
- `package-lock.backup.json` deleted (22,518 lines) and added to `.gitignore`
- `pnpm-lock.yaml` added (13,943 lines) -- large file in the diff
- No `engines` field in `package.json` specifying pnpm
- No documentation of the package manager change
- `pnpm.onlyBuiltDependencies` field added to `package.json` (confirms pnpm intent)

## Proposed Solutions

### Solution A: Formalize pnpm migration (Recommended)
- **Description:** Add `packageManager` field to `package.json`, add `.npmrc` with `engine-strict=true`, update README/CLAUDE.md
- **Pros:** Clear signal to all contributors, CI-compatible
- **Cons:** Minor effort
- **Effort:** Small
- **Risk:** Low

### Solution B: Revert to npm
- **Description:** Regenerate `package-lock.json`, remove `pnpm-lock.yaml`
- **Pros:** No migration needed
- **Cons:** Loses pnpm benefits (speed, disk space)
- **Effort:** Small
- **Risk:** Low

## Acceptance Criteria

- [ ] Single canonical lockfile committed
- [ ] `packageManager` field set in `package.json`
- [ ] CI pipeline uses correct package manager
- [ ] README documents which package manager to use

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Identified during PR #7 code review | Package manager migration needs explicit documentation |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/7
