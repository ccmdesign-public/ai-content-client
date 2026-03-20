---
status: pending
priority: p2
issue_id: "005"
tags: [code-review, consistency, claude-md]
dependencies: []
---

# transition-all Ban Contradicted by shadcn-vue Components

## Problem Statement

CLAUDE.md line 78 states: "Use specific transition properties (`transition-colors`, `transition-opacity`), never `transition-all`." However, `transition-all` is used in shadcn-vue's own generated components (`src/components/ui/button/index.ts`, `src/components/ui/sidebar/SidebarRail.vue`).

An AI agent may flag or "fix" shadcn-vue components to comply with this rule, which would break the component library's intended behavior.

## Findings

- `src/components/ui/button/index.ts` -- uses `transition-all`
- `src/components/ui/sidebar/SidebarRail.vue` -- uses `transition-all`
- These are auto-generated shadcn-vue files

## Proposed Solutions

### Option A: Add exception for shadcn-vue UI primitives
- Amend line 78: "never `transition-all` (exception: shadcn-vue primitives in `src/components/ui/` may keep their generated styles)"
- Pros: Accurate, prevents agents from modifying generated code
- Cons: None
- Effort: Small
- Risk: Low

## Recommended Action

(To be filled during triage)

## Technical Details

- **Affected files:** `CLAUDE.md` line 78

## Acceptance Criteria

- [ ] The transition-all rule has an explicit carve-out for shadcn-vue generated components

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created from PR #14 code review | shadcn-vue components use transition-all |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/14
