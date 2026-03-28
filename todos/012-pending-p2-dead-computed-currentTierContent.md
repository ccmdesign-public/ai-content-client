---
priority: P2
file: src/pages/masterclasses/[slug].vue
line: 51
status: pending
---

## Dead code: `currentTierContent` computed is never used

**What**: The `currentTierContent` computed property is defined on line 51 but never referenced in the template. The template uses `tierContentMap.get(tier)` directly inside the `v-for` loop instead.

**Why**: Dead code increases cognitive load and suggests the template and script got out of sync during development.

**Fix**: Remove the `currentTierContent` computed property entirely, or refactor the template to use it for the active tab content.
