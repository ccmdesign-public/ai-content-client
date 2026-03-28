---
priority: P2
file: src/pages/masterclasses/[slug].vue
line: 92
status: pending
---

## Local `formatDate` duplicates existing utility

**What**: The detail page defines its own `formatDate` function using `toLocaleDateString` instead of importing the existing `formatDate` from `~/utils/formatDate` (which uses `date-fns` and includes error handling for invalid dates).

**Why**: Pattern deviation. The existing utility handles invalid dates gracefully; the local version would throw on invalid input. Other pages (articles, issues) use the shared utility.

**Fix**: Replace the local function with `import { formatDate } from '~/utils/formatDate'` and use `formatDate(detail.generatedAt)` in the template.
