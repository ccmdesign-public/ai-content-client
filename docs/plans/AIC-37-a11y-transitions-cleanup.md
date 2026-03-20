# AIC-37: Accessibility Audit, Transitions & Dead Code Cleanup

**Status:** Plan
**Date:** 2026-03-20
**Absorbs:** AIC-18 (Remove dead token/styling infrastructure)

---

## Workstream 1: Accessibility Audit & Fixes

### 1.1 ArticleCard (`src/components/content/ArticleCard.vue`)

| Issue | Fix |
|---|---|
| Inline SVG (document icon) has no `aria-hidden` | Add `aria-hidden="true"` to the decorative `<svg>` |
| "Read original" link has no accessible context | Add `aria-label` e.g. `:aria-label="\`Read original: ${article.title}\`"` |
| `<NuxtLink>` to article detail has no focus-visible ring | Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none` to the `<NuxtLink>` inside `<h3>` |
| No `alt` on the gradient placeholder div | Not an `<img>` so N/A, but the SVG inside should be `aria-hidden` (covered above) |

### 1.2 SummaryCard (`src/components/content/SummaryCard.vue`)

| Issue | Fix |
|---|---|
| `v-html` rendered content div has no ARIA role | Add `role="region"` and `aria-label="Summary"` to the `v-html` container div |
| Channel link has no accessible label beyond text | Text content ("channel name") is sufficient, but add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none` |
| "Watch on YouTube" link has no differentiation | Add `:aria-label="\`Watch ${summary.metadata.title} on YouTube\`"` |
| `<NuxtLink>` in `<h3>` missing focus-visible ring | Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none` |
| `(this as any).parser.parseInline(tokens)` type assertion | Replace with proper typing: cast `this` to `{ parser: { parseInline: (tokens: any[]) => string } }` or use a standalone function instead of `this` reference |

### 1.3 ToolCard (`src/components/content/ToolCard.vue`)

| Issue | Fix |
|---|---|
| `<details>` has no ARIA for expanded state | The native `<details>`/`<summary>` element handles `aria-expanded` natively in modern browsers -- verify this with testing. If supplemental ARIA needed, add `aria-expanded` bound to open state |
| `<summary>` lacks accessible name | Add `aria-label` to `<summary>`: `:aria-label="\`${tool.name} - ${tool.stats.videoCount} videos\`"` |
| "Show more/less" button missing `aria-expanded` | Add `:aria-expanded="showAllVideos"` to the show more/less `<button>` |
| NuxtLink items in video list missing focus-visible | Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded` to video `<NuxtLink>` elements |
| Website/GitHub links missing focus-visible | Add focus-visible ring classes to external links |

### 1.4 FeedItem (`src/components/content/FeedItem.vue`)

| Issue | Fix |
|---|---|
| Two `as any` type assertions on lines 16-17 | Define discriminated union types for feed items and use proper type narrowing. Create `ArticleItem` and `SummaryItem` interfaces that match what `ArticleCard` and `SummaryCard` expect. Change `item: Record<string, unknown>` prop to `item: ArticleItem \| SummaryItem` |
| Type guard functions use `Record<string, unknown>` | Update type guards to use the discriminated union and return type predicates (`item is ArticleItem`) |

**Proposed types for FeedItem:**

```typescript
interface ArticleItem {
  _type?: 'article'
  path: string
  title: string
  subtitle?: string
  author: string
  platform: string
  publicationName: string
  url: string
  publishedAt: string
}

interface SummaryItem {
  _type?: 'summary'
  metadata: {
    videoId: string
    title: string
    channel: string
    publishedAt: string
    thumbnailUrl: string
    youtubeUrl: string
  }
  processedAt: string
  tldr?: string
}

type FeedItemType = ArticleItem | SummaryItem

function isArticle(item: FeedItemType): item is ArticleItem { ... }
function isSummary(item: FeedItemType): item is SummaryItem { ... }
```

### 1.5 IssueCard (`src/components/content/IssueCard.vue`)

| Issue | Fix |
|---|---|
| `<NuxtLink>` wrapping entire card content lacks explicit accessible name | The `<h3>` inside provides accessible text -- acceptable. Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded` to the `<NuxtLink>` |
| ArrowRight icon already has `aria-hidden="true"` | No action needed |
| `transition-transform` on arrow already has no `motion-reduce` | Add `motion-reduce:transition-none` |

### 1.6 ProjectCard (`src/components/content/ProjectCard.vue`)

| Issue | Fix |
|---|---|
| Already has `focus-visible:ring-2 focus-visible:ring-ring` on NuxtLink | No action needed |
| Already has `aria-label` on NuxtLink | No action needed |
| `transition-shadow` on Card missing `motion-reduce` | Add `motion-reduce:transition-none` |
| GitHub/ExternalLink icons already have `aria-hidden="true"` | No action needed |

### 1.7 Other Content Components (already compliant)

- **SearchBar**: Has `aria-label` on all buttons, `aria-hidden` on icons, `focus-visible` styles, `aria-live` region. No action needed.
- **ToolsSearch**: Has `aria-label` on clear button, `aria-hidden` on icons, `aria-live` region. No action needed.
- **CategoryFilterBar**: Has `aria-label` on ToggleGroup. No action needed.
- **SortControl**: Has proper `Label`/`for` binding via `useId()`. No action needed.
- **ToolsFilters**: Has proper `Label`/`for` binding. No action needed.
- **NewsletterSignupForm**: Fully accessible (aria-invalid, aria-describedby, role="alert", useId). No action needed.
- **PageEmptyState**: Has `role="status"`, `aria-hidden` on icons. No action needed.
- **PageErrorState**: Has `role="alert"`, `aria-hidden` on icon, focus management. No action needed.
- **PageNotFound**: Has `aria-hidden` on icons. No action needed.
- **SummaryCardSkeleton**: Skeleton component, no interactive elements. No action needed.
- **DateGroupedFeed**: No interactive elements of its own. No action needed.

### 1.8 Global Focus-Visible Pass

After fixing individual components, grep all content components for interactive elements (`<a`, `<NuxtLink`, `<button`) that lack `focus-visible:ring-2 focus-visible:ring-ring`. Components confirmed needing fixes:

- `ArticleCard.vue` -- links
- `SummaryCard.vue` -- links
- `ToolCard.vue` -- summary element, links, button
- `IssueCard.vue` -- NuxtLink wrapper

---

## Workstream 2: Transition & Animation System

### 2.1 Define Duration Tokens

Add to `src/assets/css/tailwind.css` under the `@theme inline` block:

```css
@theme inline {
  /* ... existing tokens ... */

  /* Duration tokens */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;

  /* Easing tokens */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

> **Note:** Tailwind v4 may expose these as `--duration-*` utilities automatically via `@theme`. Verify that `duration-fast`, `duration-normal`, `duration-slow` work as class names after adding them.

### 2.2 Apply Transitions Consistently

| Component | Current | Target |
|---|---|---|
| `ArticleCard` | No transitions | Add `transition-colors` on links with `duration-fast` |
| `SummaryCard` | No transitions | Add `transition-colors` on links with `duration-fast` |
| `ToolCard` | `transition-transform duration-200` on chevron | Keep; already has `motion-reduce:transition-none` |
| `IssueCard` | `transition-colors` on NuxtLink, `transition-transform` on arrow | Keep; add `motion-reduce:transition-none` on both |
| `ProjectCard` | `transition-shadow` on Card | Keep; add `motion-reduce:transition-none` |
| `CategoryFilterBar` | No explicit transitions (shadcn toggle may have built-in) | Verify shadcn toggle handles this |
| `SearchBar` | `transition-colors` on trigger | Already present |

### 2.3 Motion-Reduce Audit

All transition/animation classes must be paired with `motion-reduce:transition-none`. Current status:

- **Already compliant:** `ToolCard` (chevron)
- **Needs `motion-reduce:transition-none`:**
  - `IssueCard` -- NuxtLink (`transition-colors`), ArrowRight (`transition-transform`)
  - `ProjectCard` -- Card (`transition-shadow`)
  - `SearchBar` -- trigger button (`transition-colors`) -- already has `focus-visible` but check `transition-colors`
  - `ArticleCard` / `SummaryCard` -- after adding transitions

---

## Workstream 3: Dead Code Cleanup (absorbs AIC-18)

### 3.1 Scripts to Delete

| Script | Reason |
|---|---|
| `scripts/validate-tokens.ts` | Validates legacy CUBE token system (`src/public/css/tokens/`) which no longer exists. References `primitive-colors.css`, `semantic-colors.css`, `styles.css` layer order -- all from the old CUBE architecture. |
| `scripts/analyze-components.ts` | Scans `src/components/ds/` (directory does not exist), references `--_ccm-{component}-{property}` patterns, generates `.claude/config/component-patterns.json`. Entirely CUBE-specific. |

### 3.2 Package.json Script Entries to Remove

Remove from `package.json` `scripts`:
- `"validate:tokens"` -- references deleted `validate-tokens.ts`
- `"validate:tokens:fix"` -- references deleted `validate-tokens.ts`
- `"analyze:components"` -- references deleted `analyze-components.ts`

Also remove the corresponding entries from `CLAUDE.md` Essential Commands section:
- `pnpm run validate:tokens`
- `pnpm run validate:tokens:fix`
- `pnpm run analyze:components`

### 3.3 Stale CUBE/BEM/`--_ccm-*` References to Clean Up

No `--_ccm-*` references exist in `src/` (confirmed by grep). References exist in documentation and config files only:

| File | Reference | Action |
|---|---|---|
| `.cursorrules` (line 27) | `CUBE methodology, design tokens, --_ccm-{component}-{property}` | Update to reflect current Tailwind-only approach |
| `.claude/skills/code-reviewer/skill.json` (line 27) | `--_ccm-{component}-{property}` pattern check | Remove CUBE compliance check |
| `.claude/skills/code-reviewer/README.md` (line 47) | `--_ccm-{component}-{property}` pattern | Update to reflect Tailwind rules |
| `.claude/skills/README.md` (lines 210, 219, 242, 257) | CUBE CSS utilities references | Remove or replace with Tailwind references |
| `.claude/skills/component-scaffolder/README.md` (line 41) | `--_ccm-{component}-{property}` | Update scaffolder to use Tailwind patterns |
| `.claude/skills/design-token-validator/README.md` (line 9) | CUBE CSS methodology reference | Update or remove this skill entirely (validator script is being deleted) |
| `.claude/config/component-patterns.json` (line 37) | `css_vars_pattern` | Remove `--_ccm-*` pattern |
| `.claude/TIER1-IMPLEMENTATION.md` (lines 76, 159) | CUBE CSS compliance, CSS layers | Update to reflect current architecture |
| `.claude/TIER2-IMPLEMENTATION.md` (line 62) | CUBE CSS methodology | Update |
| `.claude/agents/quality-assurance/README.md` (line 86) | CUBE CSS layer usage | Update |
| `src/assets/css/tailwind.css` (line 171) | Comment: "migrated from CUBE prose.css" | Remove "migrated from CUBE" -- just say "Prose layout utility" |

### 3.4 Stylelint Config Evaluation

**Current state** (`stylelint.config.mjs`): Extends `stylelint-config-standard-scss` but disables 25 of its rules via `null`. With Tailwind v4 handling all styling and no SCSS files in the project, the value of stylelint is minimal.

**Recommendation:** Keep stylelint but simplify the config:
1. The config mostly suppresses rules -- this is fine for a Tailwind project
2. Consider switching to `stylelint-config-standard` (non-SCSS) if no `.scss` files exist
3. Check if any `.scss` files exist in the project; if not, remove `stylelint-config-standard-scss` dependency and `postcss-html` can stay for Vue SFC linting

**Decision for implementer:** Grep for `.scss` files. If none exist, simplify to `stylelint-config-standard` and remove SCSS dep. If SCSS files exist, keep as-is.

### 3.5 Build Verification

After all changes:
1. Run `pnpm run build` -- must pass
2. Run `pnpm eslint .` -- must pass
3. Run `pnpm vitest run` -- must pass
4. Run `pnpm run lint:css` -- must pass (verifies stylelint still works)

---

## Implementation Order

1. **Workstream 3 first** (dead code cleanup) -- removes distractions and stale references
   - Delete scripts, remove package.json entries, update CLAUDE.md
   - Clean up `.cursorrules`, `.claude/` config/skill files
   - Update tailwind.css comment
   - Evaluate stylelint
   - Verify build passes
2. **Workstream 2** (transition tokens) -- adds infrastructure needed by Workstream 1
   - Add duration/easing tokens to tailwind.css
   - Apply `motion-reduce:transition-none` to existing transitions
3. **Workstream 1** (accessibility) -- uses transition tokens where needed
   - FeedItem type safety (removes `as any`)
   - SummaryCard `(this as any)` fix
   - Add aria-labels, focus-visible rings per component audit above
   - Add transitions to links where missing

---

## Files to Modify

| File | Workstream |
|---|---|
| `src/components/content/ArticleCard.vue` | 1, 2 |
| `src/components/content/SummaryCard.vue` | 1, 2 |
| `src/components/content/ToolCard.vue` | 1 |
| `src/components/content/FeedItem.vue` | 1 |
| `src/components/content/IssueCard.vue` | 1, 2 |
| `src/components/content/ProjectCard.vue` | 2 |
| `src/assets/css/tailwind.css` | 2, 3 |
| `package.json` | 3 |
| `CLAUDE.md` | 3 |
| `.cursorrules` | 3 |
| `.claude/skills/code-reviewer/skill.json` | 3 |
| `.claude/skills/code-reviewer/README.md` | 3 |
| `.claude/skills/README.md` | 3 |
| `.claude/skills/component-scaffolder/README.md` | 3 |
| `.claude/skills/design-token-validator/README.md` | 3 |
| `.claude/config/component-patterns.json` | 3 |
| `.claude/TIER1-IMPLEMENTATION.md` | 3 |
| `.claude/TIER2-IMPLEMENTATION.md` | 3 |
| `.claude/agents/quality-assurance/README.md` | 3 |
| `stylelint.config.mjs` | 3 (conditional) |

## Files to Delete

| File | Reason |
|---|---|
| `scripts/validate-tokens.ts` | CUBE-specific, validates nonexistent token files |
| `scripts/analyze-components.ts` | Scans nonexistent `src/components/ds/`, CUBE-specific patterns |

---

## Open Questions

1. **Stylelint scope:** Should stylelint be kept at all, or removed entirely? It currently only lints `*.{css,vue,scss}` but nearly all rules are disabled. The implementer should check if it catches any real issues by running `pnpm run lint:css` before deciding.
2. **`<details>` ARIA:** Native `<details>`/`<summary>` handles expanded state in modern browsers. Should we add redundant `aria-expanded` for older screen reader compatibility, or trust native semantics?
3. **Duration token naming:** Tailwind v4 may already define `--duration-*` values. Verify there are no conflicts before adding custom duration tokens. An alternative is to use Tailwind's built-in `duration-150`, `duration-200`, `duration-300` classes directly and skip custom tokens.
4. **Composition CSS imports:** `tailwind.css` imports from `../../public/css/composition/` but `public/css/` does not exist on this branch. These imports may be dead code or may be resolved at build time. The implementer should verify whether the build succeeds with these imports and whether the composition utilities are actually used anywhere.
5. **`.claude/skills/design-token-validator/`:** With `validate-tokens.ts` deleted, should this entire skill directory be removed?
