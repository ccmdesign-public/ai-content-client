---
priority: P3
file: src/components/content/MasterclassSort.vue
line: 18
status: resolved
---

## `handleSortChange` uses `any` type cast

**What**: The `handleSortChange` function parameter is typed as `any` and cast with `as MasterclassSortOption`. The shadcn Select emits `string | number`, so the parameter should be typed as `string` (matching the actual Select emission).

**Why**: Using `any` bypasses type safety and is flagged by strict lint rules. The deleted `ToolsFilters.vue` used `string` for the same pattern.

**Fix**: Change `function handleSortChange(value: any)` to `function handleSortChange(value: string)`.
