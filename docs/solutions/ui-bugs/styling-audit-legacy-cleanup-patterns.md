---
title: "Styling Audit Legacy Cleanup: 7 Patterns from PR #7 Code Review"
category: ui-bugs
date: 2026-03-19
tags: [ssr, hydration, css, vue, pnpm, design-tokens, performance, accessibility, legacy-cleanup]
component: ccmFormField, ccmButton, ccmBreadcrumb, ccmTable, ccmFooter, ccmSection, docs-code-block
severity: mixed (p1-p3)
resolution_time: single-pass
---

# Styling Audit Legacy Cleanup: 7 Patterns from PR #7 Code Review

## Problem

During the PR #7 styling audit (replacing custom CSS with shadcn tokens and Tailwind utilities), code review surfaced 7 issues across priority levels that represent recurring patterns in design system migrations and legacy CSS cleanup.

## Root Cause

Legacy code patterns persist through framework migrations because automated tools catch syntax errors but miss semantic issues: SSR-incompatible randomness, CSS properties on wrong element types, deprecated browser hacks, overly broad transitions, inconsistent naming conventions, and stale documentation.

## Solutions Applied

### 1. SSR Hydration Mismatch (P1) -- ccmFormField

`Math.random()` generates different IDs on server vs client, breaking label-input association and aria-describedby references.

**Fix:** Replace with Vue 3.5+ `useId()` which produces deterministic, SSR-safe IDs.

```js
// Before
return `form-field-${Math.random().toString(36).substr(2, 9)}`

// After
const autoId = useId()
const computedId = computed(() => props.id || `form-field-${autoId}`)
```

**Rule:** Never use `Math.random()` in any component that renders during SSR. Use `useId()` (Vue 3.5+) or `useId()` (Nuxt) for deterministic IDs.

### 2. CSS content on non-pseudo-elements (P2) -- tailwind.css

The `content` property was applied to `.icon` and `[data-icon]` selectors (regular elements), where it has no effect. Only `::before`/`::after` pseudo-elements support `content`.

```css
/* Before -- .icon and [data-icon] are no-ops */
.icon, [icon]::before, [data-icon] { content: attr(data-icon); }

/* After -- only pseudo-elements */
[icon]::before, [data-icon]::before { content: attr(data-icon); }
```

**Rule:** When migrating CSS from older systems (e.g., CUBE utils.css), validate that property-selector combinations are semantically valid, not just syntactically correct.

### 3. Deprecated zoom:1 IE hack (P2) -- ccmButton

`zoom: 1` was a legacy IE6/7 `hasLayout` trigger with no effect in modern browsers.

**Rule:** During styling audits, search for known IE hacks: `zoom: 1`, `*property`, `_property`, `\9` hacks, `expression()`.

### 4. transition:all performance (P3) -- ccmButton, ccmSection, docs-code-block

`transition: all` animates every property change, including layout properties that trigger expensive repaints.

```css
/* Before */
transition: all 0.2s ease-in-out;

/* After -- only properties that actually animate */
transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
            border-color 0.2s ease-in-out, filter 0.2s ease-in-out,
            transform 0.2s ease-in-out;
```

**Rule:** Always specify exact transition properties. If a component only changes color on hover, only transition color properties.

### 5. Package manager migration formalization (P2)

Switching from npm to pnpm without adding `packageManager` field creates ambiguity for CI and contributors.

**Fix:** Add `"packageManager": "pnpm@10.28.2"` to `package.json`.

**Rule:** Package manager migrations require: (1) `packageManager` field in package.json, (2) old lockfile removed/gitignored, (3) documentation updated.

### 6. Stale doc comments after token migration (P2) -- ccmBreadcrumb

Doc comments referencing `var(--space-{token})` were missed when all `--space-*` tokens were replaced with fixed rem values.

**Rule:** Token migrations should include a grep for the old token pattern in comments, not just in CSS values. Use `grep -r "old-pattern" src/ --include="*.vue" --include="*.ts"` to catch references in comments.

### 7. Inconsistent CSS custom property naming (P3) -- ccmTable, ccmFooter

Components used `--_ccm-table-*` and `--_ccm-footer-*` while other migrated components used `--_btn-*`, `--_chip-*`, `--_ff-*` (without the `ccm` prefix).

**Fix:** Rename to `--_table-*` and `--_footer-*` for consistency.

**Rule:** Component-scoped CSS custom properties should follow the pattern `--_{component-shortname}-{property}` without framework/library prefixes.

## Prevention Checklist

For future styling audits and design system migrations, check:

- [ ] No `Math.random()` in SSR-rendered components
- [ ] `content` property only on `::before`/`::after` pseudo-elements
- [ ] No IE-specific CSS hacks (`zoom`, `*property`, `_property`)
- [ ] `transition` specifies exact properties, never `all`
- [ ] Package manager field matches actual lockfile
- [ ] Doc comments updated alongside token/variable renames
- [ ] CSS custom property naming follows `--_{shortname}-{property}` convention

## Cross-References

- PR: https://github.com/ccmdesign/ai-content-client/pull/7
- Todos: 027-033 in `todos/` directory
- Vue useId docs: https://vuejs.org/api/composition-api-helpers.html#useid
