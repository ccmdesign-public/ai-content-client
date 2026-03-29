---
id: AIC-50-16
title: GuideHumanSection prop typed as `any`
priority: P3
status: resolved
file: src/components/content/GuideHumanSection.vue
line: 3
---

## Finding

```ts
defineProps<{
  guide: any
}>()
```

The `guide` prop is typed as `any`, losing all type safety. The plan acknowledges this but doesn't address it.

## Suggested Fix

Type the prop using the generated collection type or the `Guide` interface from `~/types/guides.ts`. If `ContentRenderer` requires a specific type, use that type for the prop.
