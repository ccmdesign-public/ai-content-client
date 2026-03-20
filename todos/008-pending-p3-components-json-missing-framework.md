---
status: pending
priority: p3
issue_id: "008"
tags: [code-review, quality, tooling]
dependencies: []
---

# components.json removed `framework: "nuxt"` field

## Problem Statement

The PR removes the `"framework": "nuxt"` field from `components.json`. This field tells the `shadcn-vue` CLI which framework adapter to use when installing new components (e.g., Nuxt auto-imports vs manual imports). Without it, future `pnpm dlx shadcn-vue@latest add <component>` commands may generate components with manual Vue imports instead of Nuxt auto-imports.

## Findings

- `components.json` diff shows removal of `"framework": "nuxt"` (line 89 of diff)
- The shadcn-vue CLI reads this field to determine import style
- Current installed components appear to work fine because Nuxt auto-import handles resolution regardless
- Impact is only on future CLI-generated components

## Proposed Solutions

### Option 1: Re-add the framework field

**Approach:** Add `"framework": "nuxt"` back to `components.json`.

**Effort:** 1 minute

**Risk:** Low

## Technical Details

**Affected files:**
- `components.json`

## Resources

- **PR:** #13

## Acceptance Criteria

- [ ] `components.json` includes `"framework": "nuxt"`
- [ ] `pnpm dlx shadcn-vue@latest add tooltip` generates Nuxt-compatible output

## Work Log

### 2026-03-19 - Discovery

**By:** Claude Code (CE Review)
