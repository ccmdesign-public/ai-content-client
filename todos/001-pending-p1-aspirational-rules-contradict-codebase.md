---
status: pending
priority: p1
issue_id: "001"
tags: [code-review, accuracy, consistency, claude-md]
dependencies: []
---

# CLAUDE.md Documents Aspirational Rules That Widely Contradict Existing Code

## Problem Statement

CLAUDE.md states several rules as non-negotiable mandates, but the actual codebase violates them pervasively. An AI agent following these rules literally will produce code that is inconsistent with 90%+ of existing pages, causing merge conflicts and style drift.

Key contradictions:
- **Skeleton mandate (line 60):** "use `<Skeleton>` from `src/components/ui/skeleton/`. Never use 'Loading...' text." Reality: 0 pages use Skeleton; 7 pages use "Loading..." text.
- **No scoped styles in pages (line 75):** "No scoped `<style>` blocks in `src/pages/`." Reality: 6 pages have `<style scoped>` blocks (summaries/[slug], channels/[slug], tags/[slug], tags/index, articles/[...slug], articles/publications/[slug]).

## Findings

### Evidence

**Skeleton vs Loading... text:**
- `src/pages/summaries/[slug].vue:3` -- `Loading...`
- `src/pages/summaries/index.vue:101` -- `Loading...`
- `src/pages/channels/[slug].vue:85` -- `Loading...`
- `src/pages/tags/[slug].vue:52` -- `Loading...`
- `src/pages/articles/[...slug].vue:3` -- `Loading...`
- `src/pages/articles/publications/[slug].vue:46` -- `Loading...`
- `src/pages/playlists/[slug].vue:63` -- `Loading...`
- Zero pages import or use `<Skeleton>`

**Scoped styles in pages:**
- `src/pages/channels/[slug].vue:123` -- `<style scoped>`
- `src/pages/summaries/[slug].vue:112` -- `<style scoped>`
- `src/pages/tags/[slug].vue:93` -- `<style scoped>`
- `src/pages/tags/index.vue:59` -- `<style scoped>`
- `src/pages/articles/[...slug].vue:64` -- `<style scoped>`
- `src/pages/articles/publications/[slug].vue:52` -- `<style scoped>`

### Impact

An AI agent will either (a) follow the rules and produce code that looks nothing like existing pages, or (b) follow existing code patterns and violate the documented rules. Either outcome degrades codebase consistency.

## Proposed Solutions

### Option A: Mark rules as aspirational with migration notes
- Add a "Current State vs Target" section or prefix rules with "NEW CODE MUST:" to signal these are forward-looking
- Pros: Honest, prevents confusion, allows gradual migration
- Cons: Slightly longer document
- Effort: Small
- Risk: Low

### Option B: Migrate existing code first, then merge CLAUDE.md
- Fix all 7 Loading... pages to use Skeleton and remove scoped styles before merging the doc
- Pros: Document matches reality on merge
- Cons: Scope creep, delays the PR significantly
- Effort: Large
- Risk: Medium (could introduce regressions)

### Option C: Soften the rules to match current reality
- Change "Never use Loading... text" to "Prefer Skeleton" and allow scoped styles in pages
- Pros: Immediately accurate
- Cons: Loses the aspirational quality standards
- Effort: Small
- Risk: Low

## Recommended Action

(To be filled during triage)

## Technical Details

- **Affected files:** `CLAUDE.md` lines 60, 75
- **Components:** All page-level Vue components in `src/pages/`

## Acceptance Criteria

- [ ] CLAUDE.md rules about Loading states match what an agent will encounter in existing code
- [ ] CLAUDE.md styling rules match existing page patterns or clearly indicate migration status
- [ ] An AI agent reading the doc can produce code consistent with the existing codebase

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created from PR #14 code review | Pervasive mismatch between documented rules and actual codebase patterns |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/14
