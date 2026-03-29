---
id: AIC-50-14
title: GuideCard stars badge shows for tools with 0 stars
priority: P2
status: resolved
file: src/components/content/GuideCard.vue
line: 38-41
---

## Finding

In `GuideCard.vue`:

```vue
<Badge v-if="tool.stars !== undefined" variant="secondary" class="gap-1">
```

This shows the stars badge for tools where `tool.stars` is `0`, which could be misleading (displaying "0" stars). The existing `ToolCard.vue` uses the same pattern, so this is consistent, but it may be worth considering whether to show the badge only when stars > 0.

## Suggested Fix

Low priority since it matches existing behavior. If desired, change to `v-if="tool.stars"` which is falsy for both `undefined` and `0`.
