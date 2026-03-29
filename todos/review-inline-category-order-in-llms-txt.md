---
status: resolved
priority: P2
file: src/server/routes/llms.txt.ts
line: 49-57
---

## Finding

`llms.txt.ts` defines its own inline `categoryOrder` array instead of importing `CATEGORY_ORDER` from `~/server/utils/tool-categories`. The `guides.md.ts` route correctly imports and uses `CATEGORY_ORDER`, but `llms.txt.ts` duplicates it. If the category list changes, this route will drift.

## Suggested Fix

Replace the inline array with the shared constant:

```ts
import { categorizeTool, CATEGORY_ORDER } from '~/server/utils/tool-categories'

// Then use CATEGORY_ORDER instead of the local categoryOrder
for (const category of CATEGORY_ORDER) {
```

Delete lines 49-57 (the local `categoryOrder` array).
