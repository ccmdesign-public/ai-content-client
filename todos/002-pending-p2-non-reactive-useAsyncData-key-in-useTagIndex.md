---
status: resolved
priority: p2
issue_id: "002"
tags: [code-review, architecture, quality]
dependencies: []
resolved_date: "2026-03-01"
resolution: "Changed useAsyncData key from key.value (static string) to key (reactive computed ref) and added { watch: [resolvedSlug] } option. Client-side navigation between tag pages now correctly re-fetches data."
---

# Non-Reactive useAsyncData Key in useTagIndex

## Problem Statement

In `useTagIndex.ts`, the `useAsyncData` call uses `key.value` (a plain string snapshot) as its cache key, not the reactive `key` computed ref. This means if the slug changes (e.g., client-side navigation between tag pages), `useAsyncData` will not re-fetch because it was initialized with a static string key.

This is a correctness bug that manifests during client-side SPA navigation between tag detail pages.

## Findings

- **Location**: `src/composables/useTagIndex.ts`, line 30-35
- **Evidence**:
  ```ts
  const key = computed(() => `tag-index:${resolvedSlug.value}`)
  const { data: tagData, ... } = useAsyncData(
    key.value,  // <-- evaluates once, not reactive
    () => queryCollection('tags').where('stem', '=', resolvedSlug.value).first()
  )
  ```
- **Impact**: When navigating from `/tags/ai-general` to `/tags/python` via a `<NuxtLink>`, the data may not refresh because the key stays as `tag-index:ai-general`.
- **Nuxt Behavior**: In Nuxt 3/4, `useAsyncData` accepts a `watch` option or the key can be passed as a reactive ref to trigger re-fetching on change.

## Proposed Solutions

### Solution A: Pass `key` as a reactive ref and add `watch` (Recommended)
```ts
const { data: tagData, ... } = useAsyncData(
  key,
  () => queryCollection('tags').where('stem', '=', resolvedSlug.value).first(),
  { watch: [resolvedSlug] }
)
```
- **Pros**: Fixes the reactivity bug. Standard Nuxt pattern.
- **Cons**: Minor API surface change.
- **Effort**: Small
- **Risk**: Low

### Solution B: Use `watch` + `refresh` pattern
- Keep the static key but manually call `refresh()` when slug changes.
- **Pros**: Works with current API.
- **Cons**: More boilerplate; less idiomatic.
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_To be decided during triage._

## Technical Details

- **Affected files**: `src/composables/useTagIndex.ts`
- **Components**: Tag detail page (`src/pages/tags/[slug].vue`)

## Acceptance Criteria

- [ ] Navigating between tag pages via NuxtLink updates the displayed tag data
- [ ] No stale data displayed after client-side navigation
- [ ] SSG prerendering continues to work correctly

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-01 | Identified during code review of PR #1 | Common Nuxt pitfall with useAsyncData key reactivity |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/1
- File: `src/composables/useTagIndex.ts`
- Nuxt docs: https://nuxt.com/docs/api/composables/use-async-data
