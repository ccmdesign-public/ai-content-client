---
status: resolved
priority: p2
issue_id: "008"
tags: [code-review, css, tailwind, visual-regression]
dependencies: []
---

# Tailwind Gap Conversion: 1px Discrepancy in Page Headers

## Problem Statement

The scoped CSS used `gap: 1.3125rem` (21px) for `.page-header__top` flex containers, but the Tailwind conversion uses `gap-5` (20px). This is a 1px layout discrepancy across channels/[slug], tags/[slug], and playlists/[slug] page headers (the flex row containing the title and SortControl).

Not visually noticeable in most cases, but technically not a pixel-perfect migration.

## Findings

- **Source**: channels/[slug].vue, tags/[slug].vue, playlists/[slug].vue
- **Original CSS**: `gap: 1.3125rem` = 21px
- **Tailwind replacement**: `gap-5` = 1.25rem = 20px
- **Alternative**: `gap-[1.3125rem]` would be exact but uses arbitrary value

## Proposed Solutions

### Option A: Accept the 1px difference (Recommended)
- **Pros**: Clean Tailwind class, standard spacing scale, visually indistinguishable
- **Cons**: Not pixel-perfect
- **Effort**: None
- **Risk**: Negligible

### Option B: Use arbitrary value `gap-[1.3125rem]`
- **Pros**: Pixel-perfect match
- **Cons**: Non-standard spacing, harder to maintain, clutters utility classes
- **Effort**: Small
- **Risk**: Low

## Recommended Action

Accept as-is. The 1px difference is imperceptible and using standard Tailwind spacing is preferred per project conventions.

## Technical Details

- **Affected files**: `src/pages/channels/[slug].vue`, `src/pages/tags/[slug].vue`, `src/pages/playlists/[slug].vue`
- **Affected components**: Page header flex containers

## Acceptance Criteria

- [ ] Decide whether to accept 1px gap difference or use arbitrary value
- [ ] Visual regression check confirms no visible layout shift

## Work Log

| Date | Action | Outcome |
|------|--------|---------|
| 2026-03-20 | Identified during PR #15 code review | 1px gap discrepancy in 3 pages |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/15
