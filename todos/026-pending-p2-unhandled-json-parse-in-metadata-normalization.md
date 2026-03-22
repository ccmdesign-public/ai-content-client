---
status: pending
priority: p2
issue_id: "026"
tags: [code-review, quality, error-handling]
dependencies: []
---

# Unhandled JSON.parse in useSummariesData metadata normalization

## Problem Statement

In `useSummariesData.ts` line 26, `JSON.parse(doc.metadata)` is called without a try/catch. If any document has a malformed metadata JSON string, the entire computed property throws, causing all three list views (summaries, channels, playlists) to break simultaneously since they share the same composable.

This is especially risky because the data comes from Nuxt Content's SQLite layer, where JSON serialization edge cases are documented (see the plan's own reference to SQLite JSON blob limits).

## Findings

- `useSummariesData.ts:26` -- `JSON.parse(doc.metadata)` with no error handling
- The computed maps over ALL documents, so one bad document breaks every list view
- The shared cache design amplifies the blast radius: a single corrupt metadata field takes down `/summaries`, `/channels/*`, and `/playlists/*` simultaneously
- The PR plan itself notes "metadata JSON.parse consistency warning" but the implementation lacks defensive handling

## Proposed Solutions

### Option 1: Wrap JSON.parse in try/catch with fallback

**Approach:** Add try/catch around JSON.parse, return empty object or skip document on failure.

```ts
metadata: typeof doc.metadata === 'string'
  ? (() => { try { return JSON.parse(doc.metadata) } catch { return {} } })()
  : doc.metadata
```

**Pros:**
- Simple, prevents cascade failure
- Graceful degradation -- bad documents show blank cards instead of crashing page

**Cons:**
- Silent failure may hide data issues

**Effort:** 15 minutes

**Risk:** Low

---

### Option 2: Try/catch + console.warn for observability

**Approach:** Same as Option 1 but log a warning with the document path for debugging.

**Pros:**
- Prevents crash AND provides observability
- Developers can spot data issues via console

**Cons:**
- Slightly more code

**Effort:** 20 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `src/composables/useSummariesData.ts:22-28` -- computed metadata normalization

**Related components:**
- All list views: `src/pages/summaries/index.vue`, `src/pages/channels/[slug].vue`, `src/pages/playlists/[slug].vue`

## Resources

- **PR:** #21
- **Related:** docs/solutions/logic-errors/nuxt-content-reactivity-and-ssr-patterns.md

## Acceptance Criteria

- [ ] JSON.parse wrapped in try/catch
- [ ] Malformed metadata does not crash list views
- [ ] Warning logged for debugging
- [ ] Test added for malformed metadata case

## Work Log

### 2026-03-22 - Initial Discovery

**By:** Claude Code (CE Review)

**Actions:**
- Identified unhandled JSON.parse in useSummariesData computed
- Assessed blast radius across all three list views
- Drafted 2 solution options

**Learnings:**
- Shared cache design amplifies error blast radius -- defensive parsing is critical
