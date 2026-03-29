---
status: pending
priority: P2
file: src/pages/guides/[slug].vue
line: 38-42
---

## Finding

The JSON-LD structured data uses `pageTitle.value` and `pageDescription.value` inside `useHead()` at setup time. Since `tool` depends on an async `useFetch`, during SSR the computed refs will resolve to their fallback values (`'Guide'` and `''`). The JSON-LD will be rendered with empty/default data in the server-side HTML.

The `useSeoMeta` call correctly passes the computed refs (not `.value`), so the meta tags will be reactive. But the JSON-LD `innerHTML` is a static string built once via `JSON.stringify`.

## Suggested Fix

Make the JSON-LD reactive by wrapping it in a computed or using the function form of `useHead`:

```ts
useHead(() => ({
  script: tool.value ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: pageTitle.value,
        description: pageDescription.value,
        url: canonicalUrl,
        // ...rest
      }),
    },
  ] : [],
}))
```

Nuxt 3's `useHead` accepts a function that will be re-evaluated reactively.
