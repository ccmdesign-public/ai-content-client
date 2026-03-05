---
status: resolved
priority: p2
issue_id: "009"
tags: [code-review, quality, architecture, css]
dependencies: []
resolved_date: "2026-03-05"
resolution: "Moved .visually-hidden to global CUBE CSS utils layer (src/public/css/utils/utils.css) with modern clip-path: inset(50%). Removed duplicated scoped declarations from all four page files."
---

# Visually-Hidden CSS Class Duplicated Across Four Page Files

## Problem Statement

The `.visually-hidden` CSS utility class (used for the `aria-live` sort announcement) is copy-pasted identically into the `<style scoped>` block of all four list pages: `index.vue`, `tags/[slug].vue`, `channels/[slug].vue`, and `playlists/[slug].vue`. This violates DRY and means any future fix (e.g., adding `clip-path: inset(50%)` for modern browsers) must be applied in four places.

## Findings

- **Location**: `src/pages/index.vue`, `src/pages/tags/[slug].vue`, `src/pages/channels/[slug].vue`, `src/pages/playlists/[slug].vue`
- **Evidence**: Each file contains an identical 10-line `.visually-hidden` block in its scoped styles.
- **Impact**: Maintenance burden. If the project already has a global utility layer (CUBE CSS utilities layer per CLAUDE.md), this class should live there.
- **Scope**: CSS only -- no logic change required.

## Proposed Solutions

### Solution A: Move to global CSS utility layer (Recommended)
- Add `.visually-hidden` to the project's CUBE CSS utilities layer (e.g., `src/public/css/utilities.css` or equivalent).
- Remove the duplicated declarations from all four page files.
- **Pros**: Single source of truth. Follows CUBE CSS methodology already in use.
- **Cons**: Requires identifying the correct utilities file in the CSS layer structure.
- **Effort**: Small
- **Risk**: Low

### Solution B: Create a reusable Vue component
- Create a `<VisuallyHidden>` wrapper component.
- **Pros**: Encapsulates the pattern in Vue-land.
- **Cons**: Over-engineering for a simple CSS class. Adds a component for what should be a utility.
- **Effort**: Small
- **Risk**: Low

## Recommended Action

_To be filled during triage._

## Technical Details

- **Affected files**: `src/pages/index.vue`, `src/pages/tags/[slug].vue`, `src/pages/channels/[slug].vue`, `src/pages/playlists/[slug].vue`
- **Components**: Page-level styles
- **Database changes**: None

## Acceptance Criteria

- [ ] `.visually-hidden` exists in exactly one location (global utilities)
- [ ] All four pages use the global class without scoped redefinition
- [ ] `aria-live` announcements still work correctly after the change

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-05 | Identified during PR #3 code review | Four identical copies of `.visually-hidden` in page scoped styles |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/3
- CUBE CSS utilities layer pattern: CLAUDE.md styling architecture section
