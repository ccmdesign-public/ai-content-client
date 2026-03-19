---
status: pending
priority: p2
issue_id: "029"
tags: [code-review, devops, dependencies]
dependencies: []
---

# pnpm-lock.yaml Added Fresh Without Migration Context

## Problem Statement

The PR adds a 13,943-line `pnpm-lock.yaml` file as a new addition (0 deletions), while a `package-lock.json` and `package-lock.backup.json` still exist in the repo root. The PR description does not mention a package manager migration from npm to pnpm. This creates confusion about the intended package manager and risks CI/CD issues if pipelines still reference `npm install`.

## Findings

- `pnpm-lock.yaml`: +13,943 lines (new file, accounts for 91% of the PR's additions)
- `package-lock.json` and `package-lock.backup.json` still exist in the repo
- No `.npmrc` or `pnpm-workspace.yaml` found
- PR description does not mention the npm-to-pnpm switch
- `package.json` already has a `pnpm.onlyBuiltDependencies` field, suggesting pnpm was intended

## Proposed Solutions

### Option 1: Confirm pnpm Migration and Clean Up

**Approach:** Delete `package-lock.json` and `package-lock.backup.json`, add `package-lock.json` to `.gitignore`, and document the pnpm migration in the PR description.

**Pros:**
- Removes ambiguity
- Prevents accidental `npm install` creating conflicts

**Cons:**
- Additional file changes in this PR

**Effort:** 15 minutes

**Risk:** Low

---

### Option 2: Defer Cleanup to Follow-up PR

**Approach:** Accept the lockfile as-is but create a follow-up task to clean up the npm artifacts.

**Pros:**
- Keeps this PR focused

**Cons:**
- Leaves the repo in an ambiguous state temporarily

**Effort:** 5 minutes

**Risk:** Low

## Recommended Action

## Technical Details

**Affected files:**
- `pnpm-lock.yaml` (new)
- `package-lock.json` (still present)
- `package-lock.backup.json` (still present)

## Resources

- **PR:** https://github.com/ccmdesign/ai-content-client/pull/6

## Acceptance Criteria

- [ ] Only one lockfile is canonical in the repo
- [ ] CI/CD pipelines use the correct package manager
- [ ] Old lockfile(s) removed or gitignored

## Work Log

### 2026-03-19 - Initial Discovery

**By:** Claude Code (PR Review)

**Actions:**
- Identified dual lockfile situation
- Confirmed pnpm intent from package.json config
- Noted PR description omission
