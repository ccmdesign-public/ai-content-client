---
id: AIC-50-02
title: GuideHumanSection renders full markdown body including agent section
priority: P1
status: pending
file: src/components/content/GuideHumanSection.vue
line: 8
---

## Finding

`GuideHumanSection.vue` uses `<ContentRenderer :value="guide">` which renders the **entire** markdown body, including both "What you need to know" and "What your agent needs to know" sections. The agent section content is then rendered **again** below by `GuideAgentSection.vue` using structured frontmatter data.

This means the agent section appears twice on the page:
1. Once as rendered markdown inside `GuideHumanSection`
2. Once as structured cards/badges inside `GuideAgentSection`

This is confusing for users and breaks the dual-section design intent.

## Suggested Fix

Either:

**Option A (Recommended)**: Filter the ContentRenderer AST to exclude content after the `## What your agent needs to know` heading. Walk `guide.body.children` and render only nodes before that heading. This can be done by creating a computed that slices the AST.

**Option B**: Use CSS to hide the agent section rendered by ContentRenderer (fragile, not recommended).

**Option C**: Restructure the content to put only the human section in the markdown body, and move the agent section entirely to frontmatter. This requires changes to the content pipeline contract.
