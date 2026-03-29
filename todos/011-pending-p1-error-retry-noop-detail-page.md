---
priority: P1
file: src/pages/masterclasses/[slug].vue
line: 117
status: resolved
---

## Error retry handler is a no-op

**What**: The `@retry` handler on `PageErrorState` is `() => {}` -- clicking "Retry" does nothing. Every other detail page in the codebase passes `refresh()` to actually retry the data fetch.

**Why**: Users who hit a transient error have no way to recover without a full page reload. This breaks the established UX pattern.

**Fix**: Expose a `refresh` function from `useMasterclassDetail` (wrap `refreshMeta` + `refreshTiers` calls) and wire it to `@retry="refresh()"`.
