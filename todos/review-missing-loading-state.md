---
status: pending
priority: P2
file: src/pages/guides/[slug].vue
line: 76
---

## Finding

The `[slug].vue` page has no loading state. It uses `v-if="tool"` / `v-else` where the else case shows "Guide not found". But while `useFetch` is pending, `tools.value` is `null`, so `tool` is `undefined`, and users see "Guide not found" during loading before the fetch completes.

Per CLAUDE.md: "Every new component that fetches or receives async data must handle all three states: Loading (use `<Skeleton>`), Error, Empty."

Even though this is a placeholder page, it still needs loading/error/not-found differentiation.

## Suggested Fix

Destructure `status` (or `pending`) from `useFetch` and add the three states:

```vue
const { data: tools, status } = await useFetch(...)

<template>
  <div v-if="status === 'pending'">
    <Skeleton class="h-8 w-48" />
    <Skeleton class="h-4 w-96 mt-4" />
  </div>
  <div v-else-if="status === 'error'">
    <!-- error state -->
  </div>
  <div v-else-if="tool">
    <!-- tool content -->
  </div>
  <div v-else>
    <!-- not found -->
  </div>
</template>
```
