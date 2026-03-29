---
id: AIC-50-06
title: Guides index page uses CSS class name without purpose
priority: P2
status: pending
file: src/pages/guides/index.vue
line: 72
---

## Finding

The guides index page has `<div class="guides-directory">` as a wrapper element. Per the project CLAUDE.md styling rules, pages should use Tailwind utility classes only, and the `guides-directory` class name has no corresponding styles (there is no `<style>` block in the file). This is a non-functional class name that serves no purpose.

## Suggested Fix

Either remove the class entirely or replace it with semantic markup. If the wrapper is needed for layout, use Tailwind utilities directly.
