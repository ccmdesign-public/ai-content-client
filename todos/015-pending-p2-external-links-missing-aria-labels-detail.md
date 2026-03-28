---
priority: P2
file: src/pages/masterclasses/[slug].vue
line: 157
status: pending
---

## External links missing accessible names on detail page

**What**: The Website and GitHub external links in the meta row (lines 157-176) lack `aria-label` attributes. The `ToolBasicCard` component correctly includes them (e.g., `aria-label="Tool name website (opens in new tab)"`), but the detail page does not.

**Why**: Screen reader users cannot distinguish these generic "Website" / "GitHub" links from others on the page. CLAUDE.md requires accessible names on all interactive elements.

**Fix**: Add `:aria-label` bindings like `"${detail.name} website (opens in new tab)"` to both anchor tags.
