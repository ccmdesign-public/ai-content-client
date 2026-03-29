---
id: AIC-50-08
title: useSeoMeta passes computed refs instead of plain values
priority: P2
status: pending
file: src/pages/guides/[slug].vue
line: 32-37
---

## Finding

The guide detail page passes `computed()` refs to `useSeoMeta`:

```ts
useSeoMeta({
  title: computed(() => guide.value ? `${guide.value.title} Guide` : 'Guide'),
  description: computed(() => guide.value?.description || ''),
  ogTitle: computed(() => guide.value ? `${guide.value.title} Guide` : 'Guide'),
  ogDescription: computed(() => guide.value?.description || ''),
})
```

While Nuxt's `useSeoMeta` does accept reactive values, the idiomatic pattern uses `useAsyncData`'s resolved value with a `watch` or simply relies on SSR where `guide.value` is already available. More importantly, during SSR the first render will have `guide.value` as `null` (before the async data resolves), so the meta tags will be `'Guide'` and `''` on the server-rendered HTML, which is what search engines will see.

The existing pattern in the codebase (e.g., `src/pages/tools/index.vue`) uses static strings for pages that don't need dynamic titles.

## Suggested Fix

For SSR-correct meta tags, use `useAsyncData`'s `data` value after it has resolved. Since `useAsyncData` on the server waits for resolution before rendering, this should work. However, verify that the computed approach properly resolves during SSR. If not, consider using a `watch` or `onServerPrefetch` to set meta after data loads.
