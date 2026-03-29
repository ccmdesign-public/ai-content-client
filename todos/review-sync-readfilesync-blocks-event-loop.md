---
status: resolved
priority: P1
file: src/server/routes/guides.md.ts, src/server/routes/guides/[slug].md.ts, src/server/routes/llms.txt.ts
line: 19, 24, 19
---

## Finding

Three server routes use synchronous `readFileSync` inside `defineEventHandler` to read `tools.yml` on every request. This blocks the Node.js event loop while parsing an 887-tool YAML file. Combined with ISR (1-hour TTL), a cold cache hit will stall all concurrent requests while the YAML is being read and parsed.

The existing `tools-with-stars.json.ts` route also uses `readFileSync`, but that endpoint is **prerendered at build time** (it appears in the prerender routes list), so it never runs at request time. The new routes use ISR, meaning they DO run at request time on cache miss.

## Suggested Fix

Option A (recommended): Cache the parsed tools in a module-level variable with a lazy loader:

```ts
// src/server/utils/tools-loader.ts
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import type { Tool, ToolsYaml } from '~/types/tools'

let cachedTools: Tool[] | null = null

export async function loadTools(): Promise<Tool[]> {
  if (cachedTools) return cachedTools
  const toolsPath = resolve(process.cwd(), 'src/content/tools.yml')
  const toolsYaml = await readFile(toolsPath, 'utf-8')
  const { tools: toolsMap } = parseYaml(toolsYaml) as ToolsYaml
  cachedTools = Object.values(toolsMap)
    .sort((a, b) => b.stats.videoCount - a.stats.videoCount)
  return cachedTools
}
```

Option B: Add these routes to the prerender list so they never run at request time (but then ISR freshness is lost).
