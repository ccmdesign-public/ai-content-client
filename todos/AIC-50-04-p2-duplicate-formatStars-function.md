---
id: AIC-50-04
title: formatStars utility duplicated across three components
priority: P2
status: pending
file: src/pages/guides/[slug].vue, src/components/content/GuideCard.vue, src/components/content/ToolCard.vue
line: "[slug].vue:59-66, GuideCard.vue:13-20"
---

## Finding

The `formatStars()` function is copy-pasted identically in three files:
- `src/pages/guides/[slug].vue` (lines 59-66)
- `src/components/content/GuideCard.vue` (lines 13-20)
- `src/components/content/ToolCard.vue` (already existed)

This violates DRY and creates a maintenance risk where a bug fix in one copy won't propagate to the others.

## Suggested Fix

Extract `formatStars()` into a shared utility function in `src/utils/formatStars.ts` (follows the naming convention of existing utils like `formatDate.ts`). Import it in all three files. Since Nuxt auto-imports from `utils/`, it can be used without explicit imports in components.
