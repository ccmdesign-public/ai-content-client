---
status: resolved
priority: p3
issue_id: "029"
tags: [code-review, documentation, architecture]
dependencies: []
resolved_date: "2026-03-19"
resolution: "Added scope note blockquote at top of plan document clarifying that Phases 1-3 are tracked in ai-content-scraper and only Phase 4 is implemented in this repo."
---

# Plan Document Scope Covers Two Repos but Lives in Only One

## Problem Statement

The 586-line plan document `docs/plans/2026-03-19-001-feat-newsletter-3x-cadence-linkedin-teaser-plan.md` details implementation across two repositories (`ai-content-scraper` for Phases 1-3 and `ai-content-client` for Phase 4), but is committed only to `ai-content-client`. Phases 1-3 describe extensive scraper-side work (cadence config, LinkedIn teaser LLM step, CLI send integration) that is not actionable from this repo.

## Findings

- **Location**: `docs/plans/2026-03-19-001-feat-newsletter-3x-cadence-linkedin-teaser-plan.md`
- **Evidence**: Plan references `ai-content-scraper` files extensively (e.g., `src/newsletter/config.ts`, `src/newsletter/linkedin-teaser.ts`) that do not exist in this repo
- **Impact**: The plan is useful as cross-repo documentation but may confuse contributors who expect plan files to be scoped to the repo they live in
- **Context**: This is a documentation-only concern; the plan content itself is thorough and well-structured

## Proposed Solutions

### Solution A: Add a scope note at the top of the plan
- Add a clear note: "This plan covers work across ai-content-scraper (Phases 1-3) and ai-content-client (Phase 4). Only Phase 4 is tracked in this repo."
- **Pros**: Simple clarification; no file restructuring
- **Cons**: Plan still lives in only one repo
- **Effort**: Small
- **Risk**: Low

### Solution B: Keep as-is
- The plan originated from a brainstorm in this repo and the cross-repo nature is documented in the plan body
- **Pros**: No change needed
- **Cons**: Minor confusion risk
- **Effort**: None
- **Risk**: Low

## Recommended Action

_(To be filled during triage)_

## Technical Details

- **Affected files**: `docs/plans/2026-03-19-001-feat-newsletter-3x-cadence-linkedin-teaser-plan.md`

## Acceptance Criteria

- [ ] Plan scope is clearly communicated to readers

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Created from PR #9 code review | Cross-repo plans benefit from explicit scope markers |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/9
