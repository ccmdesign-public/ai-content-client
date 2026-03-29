---
id: AIC-50-17
title: v-for key uses array index instead of stable identifier
priority: P3
status: pending
file: src/components/content/GuideAgentSection.vue
line: 39
---

## Finding

```vue
<div v-for="(resource, index) in agentResources" :key="index">
```

Using the array index as the `v-for` key can cause rendering issues if the list is reordered or mutated. While agent resources are static content and unlikely to change during a session, using a stable identifier is a better practice.

## Suggested Fix

Use `resource.name` as the key (or a combination like `${resource.type}-${resource.name}`):

```vue
<div v-for="resource in agentResources" :key="`${resource.type}-${resource.name}`">
```
