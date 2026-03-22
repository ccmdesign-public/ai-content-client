---
status: resolved
priority: p3
issue_id: "029"
tags: [code-review, quality, code-cleanup]
dependencies: []
---

# Unnecessary spread of SUMMARY_LIST_FIELDS in useSummariesData

## Problem Statement

In `useSummariesData.ts` line 15, `[...SUMMARY_LIST_FIELDS]` creates a new array copy on every call. Since `SUMMARY_LIST_FIELDS` is a `readonly` tuple (`as const`), and `useContentStream` accepts `string[]`, the spread is unnecessary. The `as const` already prevents mutation.

Minor code cleanup opportunity.

## Findings

- `src/composables/useSummariesData.ts:15` -- `select: [...SUMMARY_LIST_FIELDS]`
- `SUMMARY_LIST_FIELDS` is declared `as const` in `useContentStream.ts:6-9`
- `useContentStream` accepts `select?: string[]` -- no mutation occurs inside

## Proposed Solutions

### Option 1: Remove the spread

**Approach:** Change to `select: SUMMARY_LIST_FIELDS as unknown as string[]` or adjust the type to accept readonly arrays.

**Effort:** 5 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `src/composables/useSummariesData.ts:15`
- `src/composables/useContentStream.ts:20` -- ContentStreamOptions.select type

## Resources

- **PR:** #21

## Acceptance Criteria

- [ ] No unnecessary array copy on each composable call
- [ ] TypeScript compiles without errors

## Work Log

### 2026-03-22 - Initial Discovery

**By:** Claude Code (CE Review)

**Actions:**
- Identified unnecessary spread of const array

### 2026-03-22 - Resolved

**By:** Claude Code (CE Todo Resolution)

**Actions:**
- Changed `[...SUMMARY_LIST_FIELDS]` to `SUMMARY_LIST_FIELDS as unknown as string[]`
- Avoids creating a new array copy on every composable call
