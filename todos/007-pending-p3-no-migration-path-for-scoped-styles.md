---
status: resolved
priority: p3
issue_id: "007"
tags: [code-review, completeness, claude-md]
dependencies: ["001"]
---

# No Guidance on Migrating Existing Scoped Styles in Pages

## Problem Statement

If the no-scoped-styles rule is kept, there is no guidance for how to migrate the 6 existing pages that use `<style scoped>`. An AI agent encountering these files won't know if it should migrate them opportunistically or leave them alone.

## Findings

- 6 pages have `<style scoped>` blocks
- Most contain simple layout utilities like `.center { max-width: 80ch; margin-inline: auto; }`
- These could be composition utilities in `src/assets/css/tailwind.css`

## Proposed Solutions

### Option A: Add a migration note
- Add: "Existing pages with scoped styles should be migrated to Tailwind utilities or composition utilities in `src/assets/css/tailwind.css` when modifying those files."
- Effort: Small
- Risk: Low

## Technical Details

- **Affected files:** `CLAUDE.md` line 75-76

## Acceptance Criteria

- [ ] The doc provides clear guidance on what to do with existing scoped styles

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-20 | Created from PR #14 code review | No migration path documented |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/14
