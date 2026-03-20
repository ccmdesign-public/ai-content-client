---
status: pending
priority: p2
issue_id: "002"
tags: [code-review, accuracy, claude-md]
dependencies: []
---

# CLAUDE.md References .gemini/ Directory That Does Not Exist

## Problem Statement

Line 187 of CLAUDE.md states: "`.gemini/` -- Gemini-specific instructions". This directory does not exist in the repository. An AI agent may attempt to look for or reference Gemini instructions that are not present.

## Findings

- `ls .gemini/` returns "No such file or directory"
- Only `.claude/` exists as an agent directory

## Proposed Solutions

### Option A: Remove the .gemini/ reference
- Delete the line referencing `.gemini/`
- Pros: Accurate immediately
- Cons: If `.gemini/` is planned, loses the placeholder
- Effort: Small
- Risk: Low

### Option B: Create the .gemini/ directory
- Add a minimal Gemini instructions file
- Pros: Makes the doc accurate and sets up Gemini support
- Cons: Out of scope for this PR
- Effort: Small
- Risk: Low

## Recommended Action

(To be filled during triage)

## Technical Details

- **Affected files:** `CLAUDE.md` line 187

## Acceptance Criteria

- [ ] All directories referenced in Agent Directories section actually exist in the repo

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created from PR #14 code review | .gemini/ referenced but missing |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/14
