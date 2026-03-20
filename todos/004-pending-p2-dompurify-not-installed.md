---
status: resolved
priority: p2
issue_id: "004"
tags: [code-review, security, accuracy, claude-md]
dependencies: []
---

# DOMPurify Sanitization Rule Is Unimplementable -- Package Not Installed

## Problem Statement

CLAUDE.md lines 66-71 mandate using `isomorphic-dompurify` for HTML sanitization with `v-html`. However:
1. `isomorphic-dompurify` is NOT in `package.json` (not installed)
2. `SummaryCard.vue:62` already uses unsanitized `v-html="marked.parse(summary.tldr)"`

An AI agent following this rule would need to install the package first, but the doc doesn't mention that. Meanwhile, the existing violation is undocumented.

## Findings

- `grep -r "isomorphic-dompurify" package.json` -- no matches
- `grep -r "DOMPurify" src/` -- no matches
- `src/components/content/SummaryCard.vue:62` -- `v-html="marked.parse(summary.tldr)"` with no sanitization

## Proposed Solutions

### Option A: Add a note that isomorphic-dompurify needs to be installed first
- Clarify this is a forward-looking rule and the package must be added
- Pros: Sets clear expectation
- Cons: Still leaves existing vulnerability
- Effort: Small
- Risk: Low

### Option B: Install isomorphic-dompurify and fix SummaryCard.vue in this PR
- Add the dependency and fix the existing violation
- Pros: Resolves the security issue and makes the doc accurate
- Cons: Scope creep
- Effort: Small
- Risk: Low

## Recommended Action

(To be filled during triage)

## Technical Details

- **Affected files:** `CLAUDE.md` lines 66-71, `src/components/content/SummaryCard.vue:62`, `package.json`

## Acceptance Criteria

- [ ] Either isomorphic-dompurify is installed and SummaryCard.vue is fixed, OR the doc clearly notes the dependency needs to be added

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created from PR #14 code review | Security rule references uninstalled package |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/14
