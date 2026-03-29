---
id: AIC-50-01
title: Unsafe `as any` cast on queryCollection in sitemap and API endpoint
priority: P1
status: pending
file: src/server/routes/sitemap.xml.ts, src/server/api/guides/[slug].json.ts
line: sitemap.xml.ts:68, [slug].json.ts:9
---

## Finding

Both `src/server/routes/sitemap.xml.ts` (line 68) and `src/server/api/guides/[slug].json.ts` (line 9) cast `queryCollection` to `any` to query the `guides` collection:

```ts
const guides = await (queryCollection as any)(event, 'guides').all()
```

This bypasses TypeScript entirely, meaning if the collection name is misspelled, the schema changes, or properties are accessed incorrectly, there will be no compile-time error. In the sitemap, `guide.generatedAt` is accessed without type safety. In the API endpoint, all returned properties (`guide.toolSlug`, `guide.agentResources`, etc.) are untyped.

This is likely caused by the `guides` collection not being recognized in the generated `.nuxt` types. If `pnpm run postinstall` was not run after adding the collection to `content.config.ts`, the types will not include `guides`.

## Suggested Fix

1. Run `pnpm run postinstall` to regenerate `.nuxt` types so `queryCollection` recognizes `'guides'` as a valid collection name.
2. Remove the `as any` casts. If the types still don't resolve (e.g., due to a Nuxt Content v3 type generation issue), add a targeted type assertion on the result rather than on `queryCollection` itself, so the function signature is still checked.
3. Run `pnpm run typecheck` to verify the types pass.
