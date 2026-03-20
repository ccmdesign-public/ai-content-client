---
status: resolved
priority: p3
issue_id: "018"
tags: [code-review, quality, typescript]
dependencies: []
---

# marked.parse() Return Type Cast Assumes Sync Mode

## Problem Statement

In `useSanitizedHtml.ts` line 25, `marked.parse(markdown || '') as string` casts the return value to `string`. However, `marked.parse()` returns `string | Promise<string>` depending on whether async extensions are registered. The cast suppresses TypeScript's safety check. If any code ever registers an async marked extension, this would silently pass a Promise object to DOMPurify, resulting in `[object Promise]` being rendered.

## Findings

- **File:** `src/composables/useSanitizedHtml.ts`, line 25
- `marked.parse()` has return type `string | Promise<string>`
- Current code uses synchronous mode (no async extensions), so the cast is correct today
- The `as string` cast is a common pattern with marked, but adding `{ async: false }` option would be more explicit

## Proposed Solutions

### Option A: Pass `{ async: false }` to marked.parse
This explicitly opts into sync mode and narrows the return type.

- **Pros:** Type-safe, self-documenting, future-proof
- **Cons:** None
- **Effort:** Trivial
- **Risk:** None

## Technical Details

- **Affected files:** `src/composables/useSanitizedHtml.ts`

## Acceptance Criteria

- [ ] `marked.parse()` call explicitly uses sync mode without type assertion

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created during PR #16 code review | marked v14+ returns union type; explicit sync option is safer |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/16
- marked docs: https://marked.js.org/using_advanced#options
