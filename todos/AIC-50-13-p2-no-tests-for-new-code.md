---
id: AIC-50-13
title: No tests for new composable, API endpoint, or schema validation
priority: P2
status: pending
file: src/composables/useGuideCopyMarkdown.ts, src/server/api/guides/[slug].json.ts, content.config.ts
line: all
---

## Finding

The plan explicitly lists tests that should be written:
- `src/tests/composables/useGuideCopyMarkdown.test.ts` -- Markdown extraction, clipboard API mock
- `src/tests/config/guides-collection.test.ts` -- Zod schema validation for guide frontmatter

None of these tests were created. The project CLAUDE.md states: "When adding new composables or server API routes, add corresponding test files."

## Suggested Fix

Add at minimum:
1. A schema validation test that verifies the guide frontmatter Zod schema accepts valid data and rejects invalid data
2. A test for the API endpoint (or at least the response shape)
3. If keeping `useGuideCopyMarkdown`, a test for it; if deleting it (per AIC-50-03), skip this test
