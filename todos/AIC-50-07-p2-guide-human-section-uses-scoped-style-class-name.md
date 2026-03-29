---
id: AIC-50-07
title: GuideHumanSection uses non-functional CSS class name
priority: P2
status: resolved
file: src/components/content/GuideHumanSection.vue
line: 7
---

## Finding

`GuideHumanSection.vue` wraps content in `<div class="guide-human-section">` but there is no corresponding style definition. Per project rules, content components should use Tailwind utility classes only.

## Suggested Fix

Remove the `guide-human-section` class or replace with Tailwind utilities if styling is needed.
