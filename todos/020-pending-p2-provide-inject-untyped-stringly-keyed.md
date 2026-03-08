---
status: resolved
priority: p2
issue_id: "020"
tags: [code-review, quality, typescript]
dependencies: ["016"]
resolved_date: "2026-03-08"
resolution: "Eliminated provide/inject entirely by moving useSearch() to index.vue (per Todo 016 Solution B). No more string keys or manual type assertions."
---

# Provide/Inject Uses Untyped String Key

## Problem Statement

The search composable is shared between layout and page using `provide('search', search)` with a bare string key and no type safety. The consuming page uses `inject('search') as ReturnType<...>` with a complex inline type assertion. This is fragile: the string key could be misspelled, the type assertion could drift from the actual composable return type, and there's no compile-time guarantee the injection exists.

## Findings

- **Location**: `src/layouts/default.vue` line 37 and `src/pages/index.vue` line 37 (in diff)
- **Evidence**:
  - Provider: `provide('search', search)` -- bare string key, no InjectionKey
  - Consumer: `inject('search') as ReturnType<typeof import('~/composables/useSearch').useSearch> | undefined` -- complex inline assertion
- **Impact**: Type errors are caught only at runtime. If the composable return type changes, the `as` cast silently masks the mismatch. The `| undefined` is correct but the rest of the type is manually maintained.

## Proposed Solutions

### Solution A: Use a typed InjectionKey (Recommended)
- Define `export const searchKey: InjectionKey<ReturnType<typeof useSearch>> = Symbol('search')` in `src/types/search.ts` or a shared keys file. Use it in both provide and inject.
- **Pros**: Full type safety. No manual type assertions. Compile-time error if shape changes.
- **Cons**: Minor boilerplate.
- **Effort**: Small
- **Risk**: Low

### Solution B: Skip provide/inject entirely (pairs with Todo 016)
- If search is moved to index.vue only (per Todo 016), provide/inject is eliminated entirely.
- **Pros**: Simplest solution. No shared state needed.
- **Cons**: Would need revisiting if search is needed on other pages.
- **Effort**: Small
- **Risk**: Low

## Recommended Action


## Technical Details

- **Affected files**: `src/layouts/default.vue`, `src/pages/index.vue`, `src/types/search.ts`
- **Components**: Layout, index page, search types
- **Database changes**: None

## Acceptance Criteria

- [ ] Provide/inject uses a typed `InjectionKey` OR provide/inject is removed
- [ ] No manual `as` type assertions for the search injection

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-08 | Created from PR #5 code review | Vue InjectionKey provides compile-time type safety for provide/inject |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/5
- Vue docs: https://vuejs.org/api/composition-api-dependency-injection.html#inject
