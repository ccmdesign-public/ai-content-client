---
status: resolved
priority: p2
issue_id: "011"
tags: [code-review, architecture, maintainability]
dependencies: []
resolved_date: "2026-03-05"
resolution: "Moved SHORT_NAMES mapping from CategoryFilterBar.vue into useTagsConfig.ts as CATEGORY_SHORT_NAMES. Added shortName field to TagCategory interface. Component now reads category.shortName from props instead of maintaining its own display name map. All 10 categories have abbreviations."
---

# Hardcoded SHORT_NAMES mapping in CategoryFilterBar component

## Problem Statement

`CategoryFilterBar.vue` contains a hardcoded `SHORT_NAMES` Record mapping full category names to abbreviated display names. This creates a maintenance burden: adding or renaming a category in `tags-index.json` requires a separate code change in this component. The mapping also only covers 6 of the existing categories, meaning the remaining 4 fall through to full names without abbreviation, which may cause inconsistent chip widths.

## Findings

- `src/components/content/CategoryFilterBar.vue` lines 14-21: `SHORT_NAMES` record with 6 entries
- The plan document suggested either adding `shortName` to `tags-index.json` or hardcoding -- the implementation chose the hardcoded route
- Categories not in the map (e.g., "Programming", "DevOps & Cloud", "Tools & Productivity", "Cybersecurity") display their full names

## Proposed Solutions

### Solution A: Add `shortName` field to tags-index.json
Add an optional `shortName` field to the tag index data. The component reads it from props.

- **Pros**: Data-driven, single source of truth, scales with new categories
- **Cons**: Requires data schema change and regeneration of tags-index.json
- **Effort**: Medium
- **Risk**: Low

### Solution B: Move mapping to useTagsConfig composable
Move the SHORT_NAMES mapping into the composable so it's colocated with the tag data logic, and expose a `displayName` property on each `TagCategory`.

- **Pros**: Keeps component pure/presentational, centralizes display logic
- **Cons**: Still hardcoded, just in a different place
- **Effort**: Small
- **Risk**: Low

## Recommended Action

<!-- Filled during triage -->

## Technical Details

**Affected files:**
- `src/components/content/CategoryFilterBar.vue`
- `src/composables/useTagsConfig.ts` (if Solution B)
- `src/content/tags-index.json` (if Solution A)

## Acceptance Criteria

- [ ] All categories have consistent abbreviated display names
- [ ] Adding a new category does not require a code change in the component
- [ ] Existing chip layout is not affected

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Created during PR #4 code review | 6 of ~10 categories have abbreviations; rest use full names |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/4
