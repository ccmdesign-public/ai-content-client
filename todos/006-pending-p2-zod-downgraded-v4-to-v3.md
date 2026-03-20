---
status: done
priority: p2
issue_id: "006"
tags: [code-review, dependencies, architecture]
dependencies: []
---

# Zod downgraded from v4 to v3 without documented rationale

## Problem Statement

The PR changes the `zod` dependency from `^4.3.4` to `^3.25.76` in both `package.json` and `pnpm-lock.yaml`. Zod v4 was a major release (released 2025) with breaking API changes from v3. This downgrade is not mentioned in the PR description and may have been unintentional (e.g., pulled in by `shadcn-vue` CLI which pins to zod v3 via `@vee-validate/zod`).

If intentional, it should be documented. If accidental, it may cause issues if any server-side code relies on Zod v4 APIs.

## Findings

- `pnpm-lock.yaml` shows zod changed from `^4.3.4` (v4.3.6) to `^3.25.76` (v3.25.76)
- `@vee-validate/zod@4.15.1` was added with `peerDependencies: zod: ^3.24.0` -- this peer dep likely forced the downgrade
- Zod v4 has different API surface: `z.string().email()` vs `z.email()`, `z.object()` nesting changes, etc.
- Server-side code (e.g., API routes in `src/server/`) may use Zod v4 patterns

## Proposed Solutions

### Option 1: Verify all Zod usage is v3-compatible

**Approach:** Grep all `.ts` files for Zod imports and verify the API calls work with v3.

**Effort:** 30 minutes

**Risk:** Medium -- if server code uses v4-only APIs, it will fail at runtime

### Option 2: Pin both versions

**Approach:** If server code needs v4, use package.json overrides to provide both versions.

**Effort:** 1-2 hours

**Risk:** Medium -- dual versions can cause confusion

## Technical Details

**Affected files:**
- `package.json:82` -- zod version
- `pnpm-lock.yaml` -- resolved versions
- All files importing from `zod` -- need API compatibility check

## Resources

- **PR:** #13
- Zod v4 migration guide: https://zod.dev/v4

## Acceptance Criteria

- [ ] All Zod usage verified compatible with installed version
- [ ] Rationale documented if downgrade is intentional
- [ ] Build and runtime tests pass

## Work Log

### 2026-03-19 - Discovery

**By:** Claude Code (CE Review)
