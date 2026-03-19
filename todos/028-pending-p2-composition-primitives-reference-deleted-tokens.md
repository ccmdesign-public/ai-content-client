---
status: done
priority: p2
issue_id: "028"
tags: [code-review, css, architecture]
dependencies: []
---

# Composition Primitives Reference Deleted CUBE Tokens

## Problem Statement

The composition primitive `box.css` still references `--border-width-thin`, `--border-width-none`, `--border-width-medium`, `--border-width-thick`, `--color-background`, and `--color-text`. These variables were defined in the deleted CUBE token files (`tokens/primitive-misc.css`, `tokens/semantic-colors.css`) and are now undefined. Unlike scoped component styles, the composition primitives have **no fallback values**, so `box.css` border widths will resolve to nothing, and the `[data-invert]` variant colors will fail silently.

## Findings

- `src/public/css/composition/box.css:3` -- `--border-width-thin` (no fallback)
- `src/public/css/composition/box.css:13` -- `var(--color-background)` (no fallback)
- `src/public/css/composition/box.css:14` -- `var(--color-text)` (no fallback)
- `src/public/css/composition/box.css:33-36` -- `--border-width-none/thin/medium/thick` (no fallback)
- The PR stripped `@layer composition` wrappers from all 11 primitives and imported them into `tailwind.css`, but did not update internal token references

## Proposed Solutions

### Option 1: Add Fallback Values to box.css

**Approach:** Add sensible CSS fallback values directly in box.css for all undefined tokens.

**Pros:**
- Minimal change, self-contained
- Prevents layout breakage

**Cons:**
- Fallbacks may not match design intent

**Effort:** 30 minutes

**Risk:** Low

---

### Option 2: Map Old Tokens to New Rose Pine Variables

**Approach:** Replace `--color-background` with `var(--background)`, `--color-text` with `var(--foreground)`, and define `--border-width-*` in the base layer of `tailwind.css`.

**Pros:**
- Clean integration with new theme
- Dark mode compatible

**Cons:**
- Slightly more work than fallbacks

**Effort:** 1 hour

**Risk:** Low

## Recommended Action

## Technical Details

**Affected files:**
- `src/public/css/composition/box.css` (lines 3, 13, 14, 33-36)

## Resources

- **PR:** https://github.com/ccmdesign/ai-content-client/pull/6

## Acceptance Criteria

- [ ] `.box` component renders visible borders with correct widths
- [ ] `.box[data-invert]` renders correct inverted colors in both light and dark mode
- [ ] No `undefined` CSS custom properties in composition primitives

## Work Log

### 2026-03-19 - Initial Discovery

**By:** Claude Code (PR Review)

**Actions:**
- Identified 6 references to deleted CUBE tokens in box.css
- Confirmed no fallback values present (unlike scoped component styles)
- Verified other composition primitives (stack, cluster, etc.) only use `--space-*` which are still defined
