---
status: pending
priority: P3
file: src/server/routes/guides/[slug].md.ts
line: 16-19
---

## Finding

The slug parameter from `getRouterParam` is used without any sanitization or format validation. While the only operation is a `.find()` against tool slugs (so injection is not possible), validating the slug format (e.g., alphanumeric + hyphens only) would be a defense-in-depth practice and would allow returning a 400 early for clearly invalid slugs like `../../../etc/passwd`.

## Suggested Fix

Add a simple validation:

```ts
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  throw createError({ statusCode: 400, message: 'Invalid slug format' })
}
```
