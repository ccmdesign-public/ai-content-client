---
status: pending
priority: p2
issue_id: "013"
tags: [code-review, security, ssr]
dependencies: []
---

# DOMPurify Hook Registered at Module Scope (Shared SSR State Risk)

## Problem Statement

In `useSanitizedHtml.ts`, `DOMPurify.addHook('afterSanitizeAttributes', ...)` is called at module top level (line 12). Because `isomorphic-dompurify` uses a singleton DOMPurify instance in SSR (backed by jsdom), this hook is registered once when the module is first imported and persists across all SSR requests. If the module is re-imported or if multiple calls accumulate hooks, the hook could fire multiple times per sanitize call, degrading performance.

Currently the hook is idempotent (it just sets attributes), so this is not a security issue -- but it is a code smell that could cause subtle bugs if the hook logic changes in the future.

## Findings

- **File:** `src/composables/useSanitizedHtml.ts`, line 12
- `DOMPurify.addHook()` is called at module scope, outside the composable function
- In Node.js SSR, this executes once per module load (effectively once per server start) -- acceptable today
- DOMPurify does not deduplicate hooks; calling `addHook` multiple times with the same function registers it multiple times
- The current hook is safe (idempotent attribute setting), but future modifications could introduce issues

## Proposed Solutions

### Option A: Guard with a module-level flag
Set a boolean flag to ensure the hook is only registered once, even if the module is somehow re-evaluated.

- **Pros:** Minimal change, defensive coding
- **Cons:** Adds a mutable module variable
- **Effort:** Small
- **Risk:** Low

### Option B: Move hook inside composable with lazy init
Register the hook inside `useSanitizedHtml()` on first call using a module-level initialized flag.

- **Pros:** More explicit lifecycle, composable owns its setup
- **Cons:** Slightly more complex
- **Effort:** Small
- **Risk:** Low

## Recommended Action

Option A -- add a simple guard flag. This is a minor improvement.

## Technical Details

- **Affected files:** `src/composables/useSanitizedHtml.ts`
- **Components:** useSanitizedHtml composable
- **Database changes:** None

## Acceptance Criteria

- [ ] DOMPurify hook is registered at most once regardless of import/call patterns
- [ ] Tests still pass
- [ ] Links still get `target="_blank"` and `rel="noopener noreferrer"`

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created during PR #16 code review | Module-scope side effects in SSR composables need guards |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/16
- DOMPurify hooks docs: https://github.com/cure53/DOMPurify#hooks
