---
status: pending
priority: p3
issue_id: "028"
tags: [code-review, documentation, maintainability]
dependencies: []
---

# Doc Comment in digest.ts References Plan File Path That May Become Stale

## Problem Statement

The new module-level doc comment in `src/server/utils/digest.ts` (line 17) contains a hardcoded reference to the plan file path: `See: docs/plans/2026-03-19-001-feat-newsletter-3x-cadence-linkedin-teaser-plan.md`. If the plan file is renamed, moved, or archived, this reference will become a dead link and confuse future readers.

## Findings

- **Location**: `src/server/utils/digest.ts`, line 17
- **Evidence**: `* See: docs/plans/2026-03-19-001-feat-newsletter-3x-cadence-linkedin-teaser-plan.md`
- **Impact**: Low -- stale file references in comments are a minor maintainability nuisance, not a runtime issue
- **Context**: The rest of the doc comment (lines 3-16) is self-contained and provides sufficient context without the file reference

## Proposed Solutions

### Solution A: Replace file path with a ticket reference (Recommended)
- Change the `See:` line to reference the Linear ticket (e.g., `See: AIC-26`) instead of the file path
- **Pros**: Ticket references are stable; the plan is linked from the ticket
- **Cons**: Requires looking up the ticket to find the plan
- **Effort**: Small
- **Risk**: Low

### Solution B: Keep as-is and accept the risk
- File references in comments are common and the doc comment is otherwise excellent
- **Pros**: No change needed
- **Cons**: Minor staleness risk
- **Effort**: None
- **Risk**: Low

## Recommended Action

_(To be filled during triage)_

## Technical Details

- **Affected files**: `src/server/utils/digest.ts`

## Acceptance Criteria

- [ ] The doc comment reference is stable and will not become stale over time

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created from PR #9 code review | Doc comments with file paths can become stale when docs are reorganized |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/9
