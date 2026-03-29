---
id: AIC-50-12
title: Old /tools/index.vue page not deleted despite redirect being active
priority: P2
status: pending
file: src/pages/tools/index.vue
line: entire file
---

## Finding

The `/tools` route rule is now a 301 redirect to `/guides`, but `src/pages/tools/index.vue` still exists. While the route rule takes precedence (the page is unreachable), this creates dead code that could confuse future developers. The PR description notes this should happen "after redirect is confirmed working" but both the redirect and the replacement page are in the same PR.

## Suggested Fix

Delete `src/pages/tools/index.vue` in this PR since the redirect and replacement page (`/guides`) are both included. Add a comment in `nuxt.config.ts` next to the redirect rule noting the original page was removed.
