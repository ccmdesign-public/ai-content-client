---
status: pending
priority: p3
issue_id: "030"
tags: [code-review, css, architecture, quality]
dependencies: ["027"]
---

# Inconsistent Styling Approach: Tailwind Utilities vs Old Custom Properties

## Problem Statement

The PR migrates tag chips to Tailwind utility classes in templates (e.g., `tags/index.vue` line 48) but leaves `<style scoped>` blocks in the same files still using old CUBE custom properties (`--step-*`, `--color-base-*`). This creates a dual-system where the template uses one design system and the scoped styles use another, making maintenance harder and the codebase harder to reason about.

## Findings

- `src/pages/tags/index.vue`: Template uses Tailwind utilities (`bg-muted`, `text-foreground`, etc.) but scoped styles use `--step-2`, `--color-base-shade-10`, `--color-text`
- `src/components/content/CategoryFilterBar.vue`: Template uses Tailwind classes but scoped styles reference `--color-base-tint-10`
- Pattern repeats across most page-level components
- No consistent migration strategy documented

## Proposed Solutions

### Option 1: Full Migration to Tailwind (Future PR)

**Approach:** Systematically migrate all scoped `<style>` blocks to use either Tailwind utilities or Rose Pine CSS variables. Track as a separate initiative.

**Pros:**
- Clean, consistent system
- Better dark mode support

**Cons:**
- Large scope
- Should be done incrementally

**Effort:** 8-12 hours (across multiple PRs)

**Risk:** Medium

---

### Option 2: Accept Mixed Approach with Documentation

**Approach:** Document the current state as intentional (migration in progress) and establish which system to use for new code.

**Pros:**
- No code changes needed now
- Sets expectations

**Cons:**
- Technical debt remains

**Effort:** 30 minutes

**Risk:** Low

## Recommended Action

## Technical Details

**Affected files:** All pages and most content components (see finding 027 for full list)

## Resources

- **PR:** https://github.com/ccmdesign/ai-content-client/pull/6

## Acceptance Criteria

- [ ] Clear documentation of which styling system to use for new code
- [ ] Migration plan for existing components (can be incremental)

## Work Log

### 2026-03-19 - Initial Discovery

**By:** Claude Code (PR Review)

**Actions:**
- Identified dual-system pattern across PR changes
- Linked to P1 finding 027 as root cause
