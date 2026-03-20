---
status: pending
priority: p3
issue_id: "024"
tags: [code-review, typescript, dependency-coupling]
dependencies: []
---

# SummaryCard marked.Renderer Still Relies on Internal `this.parser` Binding

## Problem Statement

The `marked.Renderer` paragraph override in `SummaryCard.vue` (line 9-11) uses `this.parser.parseInline(tokens)`. While the PR correctly replaced `(this as any)` with a typed `Renderer` class approach, it still depends on `marked`'s internal `this` binding of `parser` to the renderer instance. If `marked` changes this internal wiring in a future version, the renderer will silently break.

## Findings

```typescript
// SummaryCard.vue lines 8-11
const renderer = new marked.Renderer()
renderer.paragraph = function ({ tokens }: Tokens.Paragraph): string {
  return this.parser.parseInline(tokens)
}
```

This is a correct fix for the `(this as any)` problem and does not change rendering behavior. The `this` context is properly bound by `marked` when it calls the renderer method. This is a minor coupling concern, not a bug.

## Proposed Solutions

### Option A: Accept current implementation (recommended)
- The `Renderer` class pattern is the officially documented approach in `marked` docs
- **Effort:** None
- **Risk:** Low (marked's Renderer API is stable)

### Option B: Use `walkTokens` hook to strip `<p>` tags post-render
- Avoids `this.parser` dependency entirely
- **Effort:** Small
- **Risk:** Low

## Technical Details

- **Affected files:** `src/components/content/SummaryCard.vue` (lines 8-11)

## Acceptance Criteria

- [ ] Review when upgrading `marked` to verify `Renderer.paragraph` API hasn't changed

## Work Log

| Date | Action | Outcome |
|---|---|---|
| 2026-03-20 | Code review of PR #18 | Confirmed fix is correct and uses documented API; flagged as minor coupling |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/18
- [marked Renderer docs](https://marked.js.org/using_pro#renderer)
