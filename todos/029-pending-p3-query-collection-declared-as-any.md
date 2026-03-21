---
status: done
priority: p3
issue_id: "029"
tags: [code-review, typescript, quality]
dependencies: []
---

# queryCollection declared as `any` loses type safety on query chain

## Problem Statement

In `src/composables/useSummaryQuery.ts` line 2, `queryCollection` is declared as `(name: string) => any`. This means the entire query chain (`.where()`, `.all()`, etc.) is untyped. Typos in field names like `metadata.chanelId` (missing 'n') or wrong operators would not be caught at compile time. The same pattern exists in `useTagIndex.ts`.

## Findings

### Evidence

- `src/composables/useSummaryQuery.ts` line 2: `declare const queryCollection: (name: string) => any`
- `src/composables/useTagIndex.ts` line 2: identical declaration
- Nuxt Content v3 provides typed `queryCollection` via auto-imports with collection-specific types from `content.config.ts`

### Agent: quality-reviewer

The `declare const` approach is a workaround for the fact that `queryCollection` is auto-imported by Nuxt and not available as a regular import in non-Nuxt test environments. A better approach would be to use Nuxt's generated types from `.nuxt/imports.d.ts`.

## Proposed Solutions

### Solution 1: Use Nuxt's generated type augmentation
Remove the manual `declare const` and ensure `tsconfig.json` includes `.nuxt/imports.d.ts` for type resolution.
- **Pros:** Full type safety on query chain, catches typos
- **Cons:** Requires `.nuxt/` to be generated for TS to work
- **Effort:** Small
- **Risk:** Low

### Solution 2: Keep as-is with documented field names
- **Pros:** No change, explicit visibility of the auto-import
- **Cons:** No compile-time safety
- **Effort:** None
- **Risk:** Low (field names are tested)

## Technical Details

- **Affected files:** `src/composables/useSummaryQuery.ts`, `src/composables/useTagIndex.ts`

## Acceptance Criteria

- [ ] Query chain methods have proper types
- [ ] Field name typos are caught at compile time

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-21 | Identified `any` type declaration during PR #19 review | Auto-imported Nuxt utilities need explicit type declarations in composable files |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/19
