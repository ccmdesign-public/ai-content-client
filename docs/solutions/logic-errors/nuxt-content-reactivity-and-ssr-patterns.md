---
title: "Nuxt Content Reactivity, SSR Guards, and Dead Code Patterns"
category: logic-errors
date: 2026-03-21
tags:
  - nuxt
  - vue-reactivity
  - ssr
  - nuxt-content
  - code-review
  - dead-code
  - accessibility
severity: moderate
components:
  - useContentStream
  - useSummaryQuery
  - useTagIndex
  - DateGroupedFeed
  - LoadMoreButton
  - channels/[slug].vue
  - playlists/[slug].vue
related_pr: "https://github.com/ccmdesign/ai-content-client/pull/20"
---

# Nuxt Content Reactivity, SSR Guards, and Dead Code Patterns

## Problem

PR #20 introduced several subtle issues during a refactor from `useSummaryQuery` to `useContentStream`:

1. **Static `.value` dereference** in composable args froze the playlist filter at setup time
2. **SSR 404 guard removed** -- channel pages returned HTTP 200 for invalid slugs (SEO breakage)
3. **Dead composable left in codebase** with its own bugs (no draft filter, inconsistent metadata parsing)
4. **Hardcoded HTML ID** prevented safe component reuse
5. **Inconsistent metadata parsing** across filter sites (some used JSON.parse fallback, others did not)

## Root Cause

These are five distinct patterns that commonly emerge during data-layer refactors in Nuxt/Vue apps:

1. **Reactivity trap**: `ref.value?.id` evaluates once at call time. Passing it as a plain object property to a composable captures the static value, not the reactive reference.

2. **SSR guard removal**: Replacing `throw createError()` with a computed boolean + inline component loses the HTTP status code. Nuxt's error handling only sets proper status codes via `throw createError()` during SSR.

3. **Dead code inertia**: When a PR replaces all callers of a composable but also modifies the composable itself, reviewers focus on the modifications rather than noticing it is now unreferenced.

4. **Static ID assumption**: Hardcoding `id="feed-content"` works for single-instance components but violates HTML spec if the component is ever reused.

5. **Nuxt Content v3 SQLite quirk**: Nested Zod objects are stored as JSON blobs, so `metadata.channelId` dot-notation fails in SQL. Client-side filtering requires consistent `typeof === 'string' ? JSON.parse(metadata) : metadata` handling everywhere.

## Solution

### 1. Function-based where clause with watch (playlists/[slug].vue)

```ts
// WRONG: static value captured once
const { data } = useContentStream('summaries', {
  where: { playlistId: playlist.value?.id }
})

// RIGHT: function re-evaluates on each filter pass
const { data, refresh } = useContentStream('summaries', {
  where: (doc) => doc.playlistId === playlist.value?.id,
  key: `playlist-summaries-${route.params.slug}`
})
watch(() => route.params.slug, () => refresh())
```

### 2. SSR 404 guard + client-side fallback (channels/[slug].vue)

```ts
// SSR: proper HTTP 404 status code for crawlers
if (import.meta.server && !channelConfig.value) {
  throw createError({ statusCode: 404, message: 'Channel not found' })
}

// Client-side: computed for SPA navigation
const shouldShow404 = computed(() => {
  if (!allSummaries.value) return false
  return !channelConfig.value
})
```

### 3. Delete dead code immediately

Deleted `useSummaryQuery.ts` and its test file. This resolved 3 TODOs at once (dead code, missing draft filter, inconsistent metadata parsing in the deleted file).

### 4. Dynamic IDs with useId() (DateGroupedFeed + LoadMoreButton)

```vue
<!-- DateGroupedFeed.vue -->
<script setup>
const feedId = useId()  // SSR-safe unique ID
</script>
<template>
  <div :id="feedId">
    <LoadMoreButton :feed-id="feedId" />
  </div>
</template>

<!-- LoadMoreButton.vue -->
<script setup>
defineProps<{ feedId?: string }>()
</script>
<template>
  <Button :aria-controls="feedId">Load More</Button>
</template>
```

### 5. Consistent metadata parsing (useTagIndex.ts)

```ts
// WRONG: direct access without JSON.parse fallback
docs.filter(d => idSet.has(d.metadata?.videoId))

// RIGHT: defensive parsing matching the channelId filter pattern
docs.filter(d => {
  const meta = typeof d.metadata === 'string' ? JSON.parse(d.metadata) : d.metadata
  return idSet.has(meta?.videoId)
})
```

## Prevention

- **Code review checklist item**: When a composable/function is modified in the same PR that removes all its callers, flag it as dead code candidate.
- **Reactivity rule**: Never pass `ref.value` to composable options that should be reactive. Use function-based callbacks or pass the ref itself.
- **SSR guard rule**: Any page that can 404 must have `if (import.meta.server && !entity) throw createError({ statusCode: 404 })`. This is documented in `CLAUDE.md` under SSR Safety Rules.
- **Component ID rule**: Never hardcode HTML `id` attributes in reusable components. Use `useId()` (Vue 3.5+).

## Files Changed

- `src/pages/playlists/[slug].vue` -- reactive where clause + watch
- `src/pages/channels/[slug].vue` -- SSR 404 guard restored
- `src/composables/useSummaryQuery.ts` -- deleted (dead code)
- `src/tests/composables/useSummaryQuery.test.ts` -- deleted (dead code test)
- `src/composables/useTagIndex.ts` -- consistent metadata parsing
- `src/components/content/DateGroupedFeed.vue` -- dynamic ID via useId()
- `src/components/content/LoadMoreButton.vue` -- feedId prop for aria-controls
