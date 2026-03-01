---
status: pending
priority: p2
issue_id: "003"
tags: [code-review, quality, ui]
dependencies: []
---

# Naive Tag Name Capitalization Produces Incorrect Display Names

## Problem Statement

The `sync-tags.ts` script generates human-readable tag names by splitting the slug on hyphens and capitalizing each word's first letter. This produces incorrect names for acronyms and special terms: "Ai General" instead of "AI General", "Ci Cd" instead of "CI/CD", "Nlp" instead of "NLP", "Mcp" instead of "MCP", "Gcp" instead of "GCP", "Aws" instead of "AWS", "Sql" instead of "SQL", "Seo" instead of "SEO", "Html Css" instead of "HTML/CSS", etc.

## Findings

- **Location**: `scripts/sync-tags.ts`, lines 89-94
- **Evidence**:
  ```ts
  name: tag.id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),
  ```
- **Impact**: Visible on every tag chip, sidebar link, and page heading. The `tags-index.json` file shows "Ai Coding", "Ai General", "Api Design", "Ci Cd", etc.
- **Scope**: Affects at least 20+ tags with abbreviations/acronyms based on the 101 entries in `tags-index.json`.

## Proposed Solutions

### Solution A: Add an acronym/special-case map (Recommended)
```ts
const SPECIAL_CASES: Record<string, string> = {
  'ai': 'AI', 'ml': 'ML', 'nlp': 'NLP', 'llm': 'LLM',
  'mcp': 'MCP', 'rag': 'RAG', 'ci': 'CI', 'cd': 'CD',
  'gcp': 'GCP', 'aws': 'AWS', 'sql': 'SQL', 'seo': 'SEO',
  'css': 'CSS', 'html': 'HTML', 'api': 'API', 'ui': 'UI',
  'ios': 'iOS', 'saas': 'SaaS', 'nextjs': 'Next.js', 'nodejs': 'Node.js',
}
```
- **Pros**: Simple, explicit, easy to maintain.
- **Cons**: Requires manual updates for new abbreviations.
- **Effort**: Small
- **Risk**: Low

### Solution B: Store display names in the scraper's index.yml
- Have the scraper output a human-curated `displayName` field.
- **Pros**: Single source of truth for names.
- **Cons**: Requires changes to the scraper repo.
- **Effort**: Medium
- **Risk**: Low

## Recommended Action

_To be decided during triage._

## Technical Details

- **Affected files**: `scripts/sync-tags.ts`, `src/content/tags-index.json`
- **Components**: All UI surfaces that display tag names (sidebar, mobile nav, tag overview page, tag detail page)

## Acceptance Criteria

- [ ] "AI General" not "Ai General" in all UI surfaces
- [ ] All known acronyms (AI, ML, NLP, LLM, API, etc.) display correctly
- [ ] Re-running sync produces correctly capitalized names

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-01 | Identified during code review of PR #1 | At least 20+ tags affected |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/1
- File: `scripts/sync-tags.ts`
