---
priority: P3
file: src/composables/useMasterclassIndex.ts
line: 1
status: pending
---

## No tests for new masterclass composables

**What**: Neither `useMasterclassIndex` nor `useMasterclassDetail` have corresponding test files. The project has test coverage for every other composable in `src/tests/composables/`.

**Why**: The merge/sort/filter logic in `useMasterclassIndex` (especially the relevance sort, category filtering, and tool-threshold logic) is non-trivial and benefits from unit tests.

**Fix**: Add `src/tests/composables/useMasterclassIndex.test.ts` covering at minimum: merge logic (masterclass entries first, tool fallback threshold), sort modes, search filtering, and category filtering.
