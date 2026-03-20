---
status: resolved
priority: p3
issue_id: "023"
tags: [code-review, accessibility]
dependencies: []
---

# ToolCard Website/GitHub Links Missing aria-labels for New Tab

## Problem Statement

In `ToolCard.vue`, the Website and GitHub external links (lines 70-89) open in new tabs (`target="_blank"`) but lack `aria-label` attributes indicating they open externally. The visible text ("Website", "GitHub") is generic and doesn't include the tool name or new-tab indicator.

## Findings

Both links have `target="_blank"` and `rel="noopener noreferrer"` (good), but no `aria-label`. Screen reader users won't know which tool's website/GitHub they're opening or that it opens in a new tab.

Compare with ArticleCard and SummaryCard in this same PR, which correctly include tool-specific aria-labels with "(opens in new tab)" indicators.

## Proposed Solutions

### Option A: Add descriptive aria-labels
```html
<a ... :aria-label="`${tool.name} website (opens in new tab)`">Website</a>
<a ... :aria-label="`${tool.name} on GitHub (opens in new tab)`">GitHub</a>
```
- **Effort:** Small
- **Risk:** Low

## Technical Details

- **Affected files:** `src/components/content/ToolCard.vue` (lines 70-89)

## Acceptance Criteria

- [ ] Website and GitHub links have descriptive aria-labels including tool name and "(opens in new tab)"

## Work Log

| Date | Action | Outcome |
|---|---|---|
| 2026-03-20 | Code review of PR #18 | Found inconsistent aria-label pattern on external links |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/18
