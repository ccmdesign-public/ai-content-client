---
status: resolved
priority: P2
file: scripts/build-llms-full.ts
line: 14-81
---

## Finding

`scripts/build-llms-full.ts` duplicates the entire `TOOL_CATEGORIES` mapping that already exists in `src/server/utils/tool-categories.ts`. The build script version has fewer entries (missing `mprocs`, `zsh`, `bash`, `insomnia`, `k8s`, `shadcn ui`, etc.). This means the build-time `llms-full.txt` will categorize tools differently than the runtime `llms.txt` and `guides.md` endpoints.

The comment says "scripts can't use Nitro auto-imports" which is true, but the file uses a normal export -- it can be imported with a relative path.

## Suggested Fix

Import from the shared utility using a relative path:

```ts
import { categorizeTool } from '../src/server/utils/tool-categories'
```

Delete the inline `TOOL_CATEGORIES` and `categorizeTool` from the build script. The `tool-categories.ts` file has no Nitro-specific dependencies -- it is pure TypeScript.
