---
id: AIC-50-15
title: getGitHubUrl is a trivial function that could be a template expression
priority: P3
status: resolved
file: src/pages/guides/[slug].vue
line: 71-73
---

## Finding

```ts
function getGitHubUrl(repo: string): string {
  return `https://github.com/${repo}`
}
```

This single-line function is also duplicated in `ToolCard.vue`. It could be a template expression or a shared utility.

## Suggested Fix

Either inline in the template (`:href="\`https://github.com/${tool.github.repo}\`"`) or extract to `src/utils/getGitHubUrl.ts` if multiple components need it.
