---
status: resolved
priority: p3
issue_id: "015"
tags: [code-review, security, testing]
dependencies: []
---

# Missing javascript: URI XSS Test Vector

## Problem Statement

The `useSanitizedHtml.test.ts` test suite covers script tags, event handlers, iframes, SVG vectors, and data URIs, but does not test `javascript:` protocol URIs in anchor href attributes (e.g., `<a href="javascript:alert(1)">`). This is one of the most common XSS vectors. DOMPurify strips these by default, but the test suite should explicitly verify this behavior since the config uses a custom `ALLOWED_ATTR` list that includes `href`.

## Findings

- **File:** `src/tests/composables/useSanitizedHtml.test.ts`
- No test for `javascript:` URI in href
- No test for `vbscript:` URI (relevant for legacy IE but still a good defense-in-depth test)
- DOMPurify does strip these by default, but explicit tests document the security contract

## Proposed Solutions

### Option A: Add javascript: URI test case
Add a test that verifies `<a href="javascript:alert(1)">Click</a>` has the dangerous href removed.

- **Pros:** Documents security contract, catches config regressions
- **Cons:** None
- **Effort:** Small (2 minutes)
- **Risk:** None

## Technical Details

- **Affected files:** `src/tests/composables/useSanitizedHtml.test.ts`

## Acceptance Criteria

- [ ] Test for `javascript:` URI stripping exists
- [ ] Test passes

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created during PR #16 code review | javascript: URI is a classic XSS vector that should be in any sanitization test suite |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/16
- OWASP XSS Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Scripting_Prevention_Cheat_Sheet.html
