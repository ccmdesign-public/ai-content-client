---
status: done
priority: p1
issue_id: "027"
tags: [code-review, security, ssr, hydration, vue]
dependencies: []
---

# Math.random() causes SSR hydration mismatch in ccmFormField

## Problem Statement

`ccmFormField.vue` uses `Math.random()` to generate fallback element IDs (line 180). In an SSR/SSG context (Nuxt with `ssr: true` and `preset: 'static'`), the server renders one random ID and the client generates a different one during hydration. This causes:

1. Vue hydration mismatch warnings in the console
2. Broken `<label for="">` to `<input id="">` association until client hydration completes
3. Broken `aria-describedby` references for help/error messages

This is a **functional accessibility bug** -- screen readers may not associate labels with inputs during the initial server-rendered page load.

## Findings

- **File:** `src/components/ds/molecules/ccmFormField.vue`, line 180
- **Code:** `return \`form-field-${Math.random().toString(36).substr(2, 9)}\``
- **Context:** Nuxt config has `ssr: true` and `nitro.preset: 'static'` -- all pages are prerendered
- **Impact:** Every `ccmFormField` without an explicit `id` prop will have mismatched server/client IDs

## Proposed Solutions

### Solution A: Use Vue's `useId()` (Recommended)
- **Description:** Vue 3.5+ provides `useId()` which generates deterministic IDs that match between server and client.
- **Pros:** Zero-dependency, SSR-safe, framework-standard approach
- **Cons:** Requires Vue 3.5+ (already in use per package.json)
- **Effort:** Small
- **Risk:** Low

### Solution B: Use Nuxt's `useId()` composable
- **Description:** Nuxt also provides `useId()` that is SSR-compatible
- **Pros:** Framework-native, handles edge cases
- **Cons:** Slightly different API from Vue's version
- **Effort:** Small
- **Risk:** Low

## Recommended Action

_(To be filled during triage)_

## Technical Details

- **Affected files:** `src/components/ds/molecules/ccmFormField.vue`
- **Components:** ccmFormField
- **Database changes:** None

## Acceptance Criteria

- [ ] Form field IDs are deterministic and match between server and client renders
- [ ] No Vue hydration mismatch warnings in console
- [ ] `<label for="">` correctly references `<input id="">` on initial page load
- [ ] `aria-describedby` references are valid on server-rendered HTML

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-19 | Identified during PR #7 code review | Math.random() in SSR components causes hydration mismatches |

## Resources

- PR: https://github.com/ccmdesign/ai-content-client/pull/7
- Vue useId docs: https://vuejs.org/api/composition-api-helpers.html#useid
- File: `src/components/ds/molecules/ccmFormField.vue:180`
