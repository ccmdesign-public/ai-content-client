---
status: resolved
priority: p3
issue_id: "031"
tags: [code-review, quality, architecture]
dependencies: []
resolved_date: "2026-03-19"
resolution: "Updated Home link in ccmTopbar from / to /summaries/ so it points to the actual content page instead of the redirect."
---

# ccmTopbar Still Has "Home" Link Pointing to /

## Problem Statement

The `ccmTopbar.vue` component still contains `<nuxt-link to="/">Home</nuxt-link>` on line 9. While confirmed to be an unused design-system demo component (not rendered in the active layout), if it is ever activated for AIC-28 or another feature, the stale link would point to the redirect instead of a meaningful page.

## Findings

- **Location**: `src/components/ds/molecules/ccmTopbar.vue` line 9
- **Evidence**: `<li><nuxt-link class="menu__item" to="/">Home</nuxt-link></li>`
- **Impact**: None currently (component is not rendered). Potential future issue if the component is activated without review.

## Proposed Solutions

### Solution A: Leave as-is, document in this todo (Recommended)
- The plan doc already notes this is a design-system boilerplate component. No change needed now.
- **Effort**: None
- **Risk**: Low

### Solution B: Remove the hardcoded menu items
- Replace with slots or props so the consuming page controls navigation links.
- **Effort**: Medium
- **Risk**: Low

## Recommended Action

_(To be filled during triage)_

## Technical Details

- **Affected files**: `src/components/ds/molecules/ccmTopbar.vue`

## Acceptance Criteria

- [ ] (If actioned) ccmTopbar navigation links are configurable or removed

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created during PR #8 code review | Plan doc confirmed this component is not rendered in active layout |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/8
