---
status: resolved
priority: P3
file: src/server/routes/guides/[slug].md.ts
line: 73-77
---

## Finding

The related tools section does an `Object.values(toolsMap).find(t => t.id === related.id)` for each related tool (up to 10). This is O(n) per lookup on a map of 887 tools. While not a significant performance issue at this scale, it would be cleaner to build an index.

## Suggested Fix

Build a lookup map once:

```ts
const toolsById = new Map(Object.values(toolsMap).map(t => [t.id, t]))
// then:
const relatedTool = toolsById.get(related.id)
```

This is a minor optimization but improves code clarity.
