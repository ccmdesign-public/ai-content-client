---
status: done
priority: p2
issue_id: "002"
tags: [code-review, architecture, nuxt]
dependencies: []
---

# Duplicate components/ui registration in nuxt.config.ts

## Problem Statement

`nuxt.config.ts` registers `components/ui` twice in the `components` array (lines 125-131). This causes Nuxt to scan the same directory twice during auto-import resolution, which may produce duplicate component registrations and confusing warnings.

## Findings

- `src/nuxt.config.ts:123-136` -- the `components` array has two identical entries for `components/ui` with `pathPrefix: false`
- The `shadcn` module config at line 41-44 already registers `components/ui` through the `shadcn-nuxt` module
- This means `components/ui` is effectively registered three times

## Proposed Solutions

### Option 1: Remove one duplicate entry

**Approach:** Delete one of the two identical `components/ui` entries from the `components` array.

**Pros:**
- Simple fix
- Removes redundancy

**Cons:**
- None

**Effort:** 5 minutes

**Risk:** Low

## Technical Details

**Affected files:**
- `src/nuxt.config.ts:125-131` -- remove duplicate entry

## Resources

- **PR:** #13

## Acceptance Criteria

- [ ] Only one `components/ui` entry in `components` array
- [ ] Build passes without warnings
- [ ] All shadcn components still auto-import correctly

## Work Log

### 2026-03-19 - Discovery

**By:** Claude Code (CE Review)

**Actions:**
- Found duplicate component path registration in nuxt.config.ts during review
