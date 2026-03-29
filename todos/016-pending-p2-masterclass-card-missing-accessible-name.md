---
priority: P2
file: src/components/content/MasterclassCard.vue
line: 14
status: resolved
---

## MasterclassCard NuxtLink has no accessible name beyond visual text

**What**: The `NuxtLink` wrapping the card content has `class="block no-underline text-foreground"` but no `aria-label`. The card title inside is an `h3`, which provides some accessible context, but the link itself wraps multiple elements (title, badge, description, metadata) with no clear accessible label for the link target.

**Why**: CLAUDE.md requires accessible names on interactive elements. The existing `SummaryCard` pattern uses a more explicit link structure.

**Fix**: Add `:aria-label="entry.name + ' masterclass'"` to the NuxtLink.
