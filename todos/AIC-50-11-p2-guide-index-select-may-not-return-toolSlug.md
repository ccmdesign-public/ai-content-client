---
id: AIC-50-11
title: Guides index query .select() may not return expected fields
priority: P2
status: resolved
file: src/pages/guides/index.vue
line: 35-37
---

## Finding

The guides index page queries:

```ts
const { data: guides } = useAsyncData(
  'guides-index',
  () => queryCollection('guides').select('toolSlug', 'description', 'path').all()
)
```

In Nuxt Content v3, `queryCollection().select()` may not support arbitrary field selection from frontmatter the same way v2's `only()` did. If `select()` doesn't work as expected, the `guideLookup` map will have undefined values for `toolSlug` and `description`, silently breaking the guide/tool matching.

## Suggested Fix

Verify that `.select('toolSlug', 'description', 'path')` works correctly with Nuxt Content v3's `queryCollection`. If not, use `.all()` without `.select()` and let the computed map extract only the needed fields. The data size is small (only guides that exist), so fetching all fields is acceptable.
