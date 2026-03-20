---
status: pending
priority: p2
issue_id: "005"
tags: [code-review, cleanup, dependencies]
dependencies: []
---

# vue2-perfect-scrollbar still in package.json (unused legacy dependency)

## Problem Statement

`vue2-perfect-scrollbar` v1.5.56 remains in `package.json` dependencies despite `vue-carousel` being removed in this PR. Like `vue-carousel`, this is a Vue 2 library that has no imports anywhere in the `src/` directory. It adds unnecessary weight to `node_modules` and signals Vue 2 dependency to auditors.

## Findings

- `package.json:77` -- `"vue2-perfect-scrollbar": "^1.5.56"`
- Zero imports of `vue2-perfect-scrollbar` found in any `.vue` or `.ts` file in `src/`
- This PR already removed `vue-carousel` for the same reason; `vue2-perfect-scrollbar` was missed

## Proposed Solutions

### Option 1: Remove the dependency

**Approach:** `pnpm remove vue2-perfect-scrollbar`

**Effort:** 5 minutes

**Risk:** Low (verify no imports first with grep)

## Technical Details

**Affected files:**
- `package.json` -- remove dependency
- `pnpm-lock.yaml` -- auto-updated

## Resources

- **PR:** #13

## Acceptance Criteria

- [ ] `vue2-perfect-scrollbar` not in package.json
- [ ] Build passes

## Work Log

### 2026-03-19 - Discovery

**By:** Claude Code (CE Review)
