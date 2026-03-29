---
id: AIC-50-09
title: JSON-LD script injection via useHead may not serialize correctly during SSR
priority: P2
status: pending
file: src/pages/guides/[slug].vue
line: 40-51
---

## Finding

The JSON-LD structured data is injected via `useHead` with a computed script array:

```ts
useHead({
  script: computed(() => guide.value ? [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({...})
  }] : [])
})
```

Two issues:
1. The `innerHTML` property should be `children` in Nuxt 3's `useHead` (the Unhead library). Using `innerHTML` may not render correctly.
2. Using `SoftwareApplication` as the JSON-LD `@type` is semantically incorrect for a guide/tutorial page. `TechArticle` or `HowTo` would be more appropriate schema types for guide content.

## Suggested Fix

1. Use `children` instead of `innerHTML` for the script content (verify Unhead API).
2. Consider `TechArticle` as the schema type:

```ts
{
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  name: guide.value.title,
  description: guide.value.description,
  about: {
    '@type': 'SoftwareApplication',
    name: guide.value.title,
  }
}
```
