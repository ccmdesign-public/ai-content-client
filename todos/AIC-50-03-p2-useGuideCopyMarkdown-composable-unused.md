---
id: AIC-50-03
title: useGuideCopyMarkdown composable is unused dead code
priority: P2
status: pending
file: src/composables/useGuideCopyMarkdown.ts
line: 1-22
---

## Finding

The `useGuideCopyMarkdown` composable is defined but never imported or used by any component. The copy functionality is handled directly by `GuideCopyButton.vue` which receives `rawAgentMarkdown` as a prop and calls `navigator.clipboard.writeText()` inline.

The composable duplicates the clipboard logic already in `GuideCopyButton.vue`, creating two implementations of the same feature.

## Suggested Fix

Either:
1. **Delete the composable** since `GuideCopyButton.vue` already handles the copy logic self-contained, or
2. **Refactor** `GuideCopyButton.vue` to use the composable, removing the inline clipboard logic from the component. This would be cleaner if multiple components need copy functionality in the future.
