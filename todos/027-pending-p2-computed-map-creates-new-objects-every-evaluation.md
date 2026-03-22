---
status: resolved
priority: p2
issue_id: "027"
tags: [code-review, performance, vue-reactivity]
dependencies: []
---

# Computed .map() in useSummariesData creates new objects on every evaluation

## Problem Statement

The `data` computed in `useSummariesData.ts` runs `.map()` on every evaluation, creating new object references each time. Since downstream consumers (summaries, channels, playlists pages) use additional `computed` properties that depend on `data`, Vue's reactivity system sees new references and re-evaluates all downstream computeds and re-renders components, even when the underlying data has not changed.

This partially undermines the performance goal of the PR (shared cache to avoid re-fetches) because the rendering cost is not reduced -- every component still processes new object arrays.

## Findings

- `useSummariesData.ts:22-28` -- `computed(() => result.data.value.map(...))` creates new array + new objects on every access
- Three pages depend on this: summaries index, channels/[slug], playlists/[slug]
- Each page adds its own `computed` filter on top, which will also re-run on every evaluation since the parent array is always "new"
- The normalization (JSON.parse for string metadata) only needs to run once when data changes, not on every computed evaluation

## Proposed Solutions

### Option 1: Use watch + shallowRef for one-time normalization

**Approach:** Replace the computed with a `watch` on `result.data` that normalizes once and stores in a `shallowRef`. Downstream computeds see stable references.

```ts
const data = shallowRef<any[] | null>(null)
watch(() => result.data.value, (raw) => {
  if (!raw) { data.value = null; return }
  data.value = raw.map(doc => ({
    ...doc,
    metadata: typeof doc.metadata === 'string' ? JSON.parse(doc.metadata) : doc.metadata
  }))
}, { immediate: true })
```

**Pros:**
- Normalization runs only when source data changes
- Downstream computeds get stable object references
- Reduces unnecessary re-renders

**Cons:**
- Slightly more complex than a computed
- Need to handle SSR hydration (watch runs on mount)

**Effort:** 30 minutes

**Risk:** Low

---

### Option 2: Keep computed but accept the cost

**Approach:** Document that the .map() is intentional and accept the re-evaluation cost since the dataset is small (~hundreds of items).

**Pros:**
- No code change needed
- Simpler mental model

**Cons:**
- Re-render cost scales with dataset growth
- Missed optimization opportunity

**Effort:** 0

**Risk:** Low (for current dataset size)

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `src/composables/useSummariesData.ts:22-28`

**Related components:**
- All list view pages that consume `useSummariesData`

## Resources

- **PR:** #21
- **Vue docs:** Computed best practices -- avoid creating new objects in computed

## Acceptance Criteria

- [ ] Normalization runs only when source data changes (not on every computed access)
- [ ] Downstream components do not re-render unnecessarily
- [ ] SSR hydration still works correctly

## Work Log

### 2026-03-22 - Initial Discovery

**By:** Claude Code (CE Review)

**Actions:**
- Identified .map() in computed creating new object references per evaluation
- Assessed downstream reactivity chain impact
- Drafted 2 solution options

**Learnings:**
- Shared data layers need stable references to deliver their full performance benefit

### 2026-03-22 - Resolved

**By:** Claude Code (CE Todo Resolution)

**Actions:**
- Replaced `computed(() => .map())` with `watch() + shallowRef` for stable references
- Normalization now runs only when source data changes, not on every computed access
- Downstream computeds get stable object references, reducing unnecessary re-renders
