---
title: "Cross-repo plan documents require explicit scope markers and accurate status"
category: logic-errors
date: 2026-03-19
tags: [documentation, frontmatter, cross-repo, plan-metadata, code-review]
related_tickets: [AIC-26]
severity: low
components: [docs/plans, src/server/utils/digest.ts]
---

# Cross-Repo Plan Metadata Accuracy

## Problem

Three related documentation issues surfaced during code review of AIC-26 (PR #9):

1. **Misleading plan status**: A plan covering work across two repos (`ai-content-scraper` Phases 1-3, `ai-content-client` Phase 4) had `status: completed` in frontmatter, but only Phase 4 was done. Anyone reading the status -- or automation parsing it -- would incorrectly believe all work was finished.

2. **Fragile file path reference**: A doc comment in `src/server/utils/digest.ts` contained a hardcoded path to the plan file (`docs/plans/2026-03-19-001-feat-...plan.md`). If the plan is ever renamed, moved, or archived, this becomes a dead link.

3. **Missing scope context**: The 586-line plan document details implementation across two repositories but lives in only one, with no indication of which phases belong where.

## Root Cause

Cross-repo plans conflate "this repo's work is done" with "the entire plan is done." Without explicit scope markers, the plan's status field and references become ambiguous or misleading.

## Solution

### 1. Use granular status with phase tracking

```yaml
# Before
status: completed

# After
status: in-progress
completed_phases: [4]
```

This accurately communicates that the plan is partially complete and which phases are done.

### 2. Reference stable identifiers in doc comments

```typescript
// Before
// * See: docs/plans/2026-03-19-001-feat-newsletter-3x-cadence-linkedin-teaser-plan.md

// After
// * See: AIC-26 (Linear ticket)
```

Ticket IDs are stable across file renames, moves, and archiving. The plan is always linked from the ticket.

### 3. Add scope notes to cross-repo plans

```markdown
> **Scope note:** This plan covers work across two repositories:
> `ai-content-scraper` (Phases 1-3) and `ai-content-client` (Phase 4).
> Only Phase 4 is tracked and implemented in this repo.
```

Place this immediately after the frontmatter, before the first heading.

## Prevention

- **When creating cross-repo plans**: Always add a scope note blockquote after the frontmatter indicating which repo owns which phases.
- **When marking plan status**: Use `in-progress` with a `completed_phases` array if only some phases are done in the current repo. Only use `completed` when all phases scoped to this repo are finished.
- **When referencing plan files in code comments**: Use the Linear/GitHub ticket ID instead of a file path. File paths are ephemeral; ticket IDs are permanent.

## Affected Files

- `docs/plans/2026-03-19-001-feat-newsletter-3x-cadence-linkedin-teaser-plan.md`
- `src/server/utils/digest.ts`
- `todos/027-pending-p2-plan-status-completed-but-phases-unchecked.md`
- `todos/028-pending-p3-doc-comment-references-plan-file-path.md`
- `todos/029-pending-p3-plan-document-scope-exceeds-single-repo.md`
