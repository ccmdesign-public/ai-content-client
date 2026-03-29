---
id: AIC-50-10
title: GuideAgentSection shows nothing when both agentResources and agentResourceGaps are empty
priority: P2
status: pending
file: src/components/content/GuideAgentSection.vue
line: 28-87
---

## Finding

If a guide has both `agentResources: []` and `agentResourceGaps: []` (both empty arrays), the `GuideAgentSection` renders an empty `<div class="space-y-6">` with no visible content. There is no empty state or informational message.

Per the project's Component Quality Standards, components should handle the empty state explicitly.

## Suggested Fix

Add an empty state when both arrays are empty:

```vue
<p v-if="!agentResources.length && !agentResourceGaps.length" class="text-sm text-muted-foreground">
  No agent resources have been cataloged for this tool yet.
</p>
```
