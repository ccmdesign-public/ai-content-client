---
id: AIC-50-18
title: GuideCopyButton silently fails with console.error only
priority: P3
status: pending
file: src/components/content/GuideCopyButton.vue
line: 18-20
---

## Finding

When clipboard copy fails, the error is logged to console but the user gets no feedback:

```ts
} catch (err) {
  console.error('Copy failed:', err)
}
```

This can happen when the page is not in a secure context (HTTP), or when clipboard permissions are denied.

## Suggested Fix

Add a user-visible error state, e.g., briefly show "Copy failed" text in the button, or use an `aria-live` region to announce the failure to screen readers.
