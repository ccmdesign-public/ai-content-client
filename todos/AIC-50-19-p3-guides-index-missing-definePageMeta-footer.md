---
id: AIC-50-19
title: Guides index page has empty definePageMeta
priority: P3
status: pending
file: src/pages/guides/index.vue
line: 6
---

## Finding

```ts
definePageMeta({})
```

The guide detail page sets `definePageMeta({ footer: false })`, but the index page has an empty object. This is not necessarily wrong, but it's worth confirming whether the footer should be shown on the index page. For consistency, either remove the empty call or add the intended configuration.

## Suggested Fix

If the empty `definePageMeta({})` is intentional (to match the existing tools page pattern), add a comment explaining it. Otherwise, remove it -- Nuxt has sensible defaults without it.
