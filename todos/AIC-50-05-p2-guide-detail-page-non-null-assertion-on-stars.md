---
id: AIC-50-05
title: Non-null assertion on tool.stars in guide detail page template
priority: P2
status: resolved
file: src/pages/guides/[slug].vue
line: 107
---

## Finding

In the guide detail page template:

```vue
<Badge v-if="tool?.stars !== undefined" variant="secondary" class="gap-1">
  <Star class="size-3" aria-hidden="true" />
  {{ formatStars(tool.stars!) }}
</Badge>
```

The `v-if` guard checks `tool?.stars !== undefined`, but the template uses `tool.stars!` (non-null assertion) without also guarding against `tool` itself being null. While Vue's `v-if` prevents this from rendering when the condition is false, the `!` assertion is a code smell that could mask issues if the template is refactored.

## Suggested Fix

Use optional chaining consistently:

```vue
{{ formatStars(tool!.stars!) }}
```

Or better, use a computed property that returns a formatted string or null:

```ts
const formattedStars = computed(() =>
  tool.value?.stars !== undefined ? formatStars(tool.value.stars) : null
)
```
