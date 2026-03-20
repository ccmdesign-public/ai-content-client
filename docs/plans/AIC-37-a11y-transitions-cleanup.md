# AIC-37: Accessibility Audit, Transitions & Dead Code Cleanup

**Status:** Plan
**Date:** 2026-03-20
**Absorbs:** AIC-18 (Remove dead token/styling infrastructure)

## Enhancement Summary

**Deepened on:** 2026-03-20
**Sections enhanced:** 8
**Research sources:** Tailwind CSS v4 docs, WCAG 2.1 guidelines, Vue 3 accessibility best practices, MDN ARIA reference, project learnings (5 solution docs), design-motion-principles skill, accessibility skill, vue-best-practices skill

### Key Improvements
1. Resolved Open Question #3 (duration tokens): skip custom tokens entirely, use Tailwind's built-in `duration-150`/`duration-200`/`duration-300` classes to avoid namespace conflicts with Tailwind v4's `--duration-*` theme variables
2. Resolved Open Question #4 (composition CSS imports): confirmed `src/public/css/composition/` exists and resolves correctly via Nuxt's `srcDir` -- these are NOT dead imports
3. Resolved Open Question #2 (`<details>` ARIA): trust native semantics, do NOT add redundant `aria-expanded` on `<details>` -- only add it to the custom "Show more/less" button
4. Added `motion-safe` approach as preferred pattern over `motion-reduce` for new transitions (less code, better defaults)
5. Added SummaryCard `v-html` role recommendation change: use `role="document"` instead of `role="region"` for rendered markdown content

### New Considerations Discovered
- SearchBar has `navigator.platform` usage (line 85) without SSR guard -- not in scope but should be noted
- SummaryCard `(this as any)` fix should use `marked`'s built-in `walkTokens` or a standalone renderer function rather than casting `this` -- avoids fragile coupling to marked internals
- FeedItem types should be extracted to a shared `~/types/content.ts` file and reused by ArticleCard/SummaryCard props for single-source-of-truth
- Stylelint decision resolved: no `.scss` files exist in `src/` -- switch to `stylelint-config-standard` and remove `stylelint-config-standard-scss` dependency
- `.claude/skills/design-token-validator/` should be deleted entirely (not just updated) since its sole purpose was validating the now-deleted CUBE token files

---

## Workstream 1: Accessibility Audit & Fixes

### 1.1 ArticleCard (`src/components/content/ArticleCard.vue`)

| Issue | Fix |
|---|---|
| Inline SVG (document icon) has no `aria-hidden` | Add `aria-hidden="true"` to the decorative `<svg>` |
| "Read original" link has no accessible context | Add `aria-label` e.g. `:aria-label="\`Read original: ${article.title}\`"` |
| `<NuxtLink>` to article detail has no focus-visible ring | Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none` to the `<NuxtLink>` inside `<h3>` |
| No `alt` on the gradient placeholder div | Not an `<img>` so N/A, but the SVG inside should be `aria-hidden` (covered above) |

#### Research Insights

**Best Practices:**
- The "Read original" link opens in a new tab (`target="_blank"`) -- screen readers benefit from knowing this. Consider expanding the aria-label to include "(opens in new tab)": `:aria-label="\`Read original: ${article.title} (opens in new tab)\`"`
- The `rel="noopener"` is already present, which is good. Add `rel="noopener noreferrer"` for complete security hardening on external links (consistent with ToolCard which already uses `noreferrer`)

**Edge Cases:**
- Articles with very long titles will create verbose aria-labels. This is acceptable -- screen reader users can skip ahead. Do not truncate accessible names
- The gradient placeholder div uses `Math.abs(hash % 360)` which is deterministic (based on publication name), so it is SSR-safe. No action needed

**Learned from project solutions:**
- Per `styling-audit-legacy-cleanup-patterns.md` pattern #4: when adding `transition-colors` to links in this component, use the specific property (not `transition-all`). This is already in the plan but worth reinforcing

### 1.2 SummaryCard (`src/components/content/SummaryCard.vue`)

| Issue | Fix |
|---|---|
| `v-html` rendered content div has no ARIA role | Add `role="document"` and `aria-label="Summary"` to the `v-html` container div |
| Channel link has no accessible label beyond text | Text content ("channel name") is sufficient, but add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none` |
| "Watch on YouTube" link has no differentiation | Add `:aria-label="\`Watch ${summary.metadata.title} on YouTube\`"` |
| `<NuxtLink>` in `<h3>` missing focus-visible ring | Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none` |
| `(this as any).parser.parseInline(tokens)` type assertion | Replace with standalone renderer function (see research insights below) |

#### Research Insights

**ARIA Role Correction -- use `role="document"` not `role="region"`:**
- `role="region"` is a landmark role. WCAG best practice states that landmarks should be used sparingly -- having many regions on a page (e.g., a feed of SummaryCards) pollutes the landmarks list in screen readers, making navigation harder
- `role="document"` is more semantically appropriate for rendered markdown/HTML content. It signals that the content is a static document fragment, which is exactly what rendered `v-html` markdown is
- If `role="document"` feels too heavy, an alternative is simply omitting the role entirely and using just `aria-label="Summary"` -- a `<div>` with an `aria-label` is valid HTML and will be announced by screen readers when focused

**SummaryCard `(this as any)` Fix -- Preferred Approach:**
The current code uses a `renderer` object with a `paragraph` method that references `this.parser.parseInline()`. This pattern is fragile because it depends on `marked`'s internal `this` binding, which may change between versions.

Preferred fix -- use a standalone function that avoids `this` entirely:

```typescript
import { marked, type Tokens } from 'marked'

// Override paragraph renderer to strip wrapping <p> tags from tldr
const renderer = new marked.Renderer()
renderer.paragraph = function ({ tokens }: Tokens.Paragraph): string {
  return this.parser.parseInline(tokens)
}

marked.use({ renderer })
```

This uses the `Renderer` class (which properly binds `this`) and typed `Tokens.Paragraph` from `marked`'s TypeScript definitions. No `as any` needed.

**Edge Cases:**
- The "Watch on YouTube" link also opens in a new tab -- same recommendation as ArticleCard: include "(opens in new tab)" in the aria-label
- The channel link at `/channels/${summary.metadata.channel}` is an internal link (no `target="_blank"`), so no new-tab indicator needed
- `v-html` content is now sanitized via `useSanitizedHtml()` composable (confirmed in source). No XSS concern here

### 1.3 ToolCard (`src/components/content/ToolCard.vue`)

| Issue | Fix |
|---|---|
| `<details>` has no ARIA for expanded state | Trust native `<details>`/`<summary>` semantics -- do NOT add redundant `aria-expanded` (see research below) |
| `<summary>` lacks accessible name | Add `aria-label` to `<summary>`: `:aria-label="\`${tool.name} - ${tool.stats.videoCount} videos\`"` |
| "Show more/less" button missing `aria-expanded` | Add `:aria-expanded="showAllVideos"` to the show more/less `<button>` |
| NuxtLink items in video list missing focus-visible | Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded` to video `<NuxtLink>` elements |
| Website/GitHub links missing focus-visible | Add focus-visible ring classes to external links |

#### Research Insights

**`<details>` ARIA Resolution (Open Question #2 answered):**
- Native `<details>`/`<summary>` elements expose expanded state to the accessibility tree in all modern browsers (Chrome, Firefox, Safari, Edge). Screen readers announce "collapsed"/"expanded" automatically
- Adding `aria-expanded` to `<summary>` conflicts with the native semantics and may cause double announcements (e.g., "expanded, expanded") in some screen reader/browser combinations
- **Decision: trust native semantics.** Do NOT add `aria-expanded` to the `<details>` or `<summary>` element
- The custom "Show more/less" `<button>` is NOT a native disclosure element -- it DOES need `aria-expanded`

**Additional `<summary>` Accessibility:**
- The `<summary>` element is natively focusable and keyboard-operable (Enter/Space toggles). No additional `tabindex` or keydown handlers needed
- Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-lg` to `<summary>` for visual keyboard focus indication
- The `cursor-pointer` is already present, which is good for mouse users
- The `[&_summary]:list-none [&_summary::-webkit-details-marker]:hidden` on the parent `<details>` correctly removes the default disclosure triangle. Since this is replaced by the custom ChevronDown icon, ensure the icon communicates state (it does via `group-open:rotate-180`)

**Edge Cases:**
- The `tool.videos.length > 5` check on the show more/less button should guard against undefined: `tool.videos?.length > 5`. Currently `tool.videos` comes from props and could theoretically be undefined if the data shape changes
- Video list links have no external indicator. Since they are internal NuxtLinks to `/summaries/[id]`, this is correct

### 1.4 FeedItem (`src/components/content/FeedItem.vue`)

| Issue | Fix |
|---|---|
| Two `as any` type assertions on lines 16-17 | Define discriminated union types for feed items and use proper type narrowing. Create `ArticleItem` and `SummaryItem` interfaces that match what `ArticleCard` and `SummaryCard` expect. Change `item: Record<string, unknown>` prop to `item: ArticleItem \| SummaryItem` |
| Type guard functions use `Record<string, unknown>` | Update type guards to use the discriminated union and return type predicates (`item is ArticleItem`) |

**Proposed types for FeedItem:**

```typescript
// Recommend: extract to ~/types/content.ts for reuse
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

#### Research Insights

**Type Extraction Best Practice:**
- Extract `ArticleItem` and `SummaryItem` to `~/types/content.ts` (new file) rather than defining inline in `FeedItem.vue`
- Reuse these types in `ArticleCard.vue` and `SummaryCard.vue` props definitions. Currently, ArticleCard defines its article prop shape inline (lines 5-16), and SummaryCard defines `SummaryMetadata` inline (lines 16-23). All three components should share the same type source
- This follows Vue best practices: "Keep contracts explicit and typed with `defineProps`" (from vue-best-practices skill)

**Type Guard Implementation:**
```typescript
// In ~/types/content.ts
export function isArticle(item: FeedItemType): item is ArticleItem {
  return item._type === 'article' || ('publicationName' in item && 'path' in item)
}

export function isSummary(item: FeedItemType): item is SummaryItem {
  return item._type === 'summary' || ('metadata' in item && 'processedAt' in item)
}
```

**Edge Cases:**
- The `_type` field is optional (`_type?: 'article'`). If content collections do not consistently set `_type`, the fallback structural checks (`'publicationName' in item`) are critical. Verify whether Nuxt Content sets `_type` on collection items -- if it does, make `_type` required and simplify the guards
- If `_type` is never set by the content system, remove it from the interfaces to avoid misleading optionality

**Learned from project solutions:**
- Per `shadcn-vue-migration-review-patterns.md`: after refactoring component types, verify there are no unused imports left behind in the affected files

### 1.5 IssueCard (`src/components/content/IssueCard.vue`)

| Issue | Fix |
|---|---|
| `<NuxtLink>` wrapping entire card content lacks explicit accessible name | The `<h3>` inside provides accessible text -- acceptable. Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded` to the `<NuxtLink>` |
| ArrowRight icon already has `aria-hidden="true"` | No action needed |
| `transition-transform` on arrow already has no `motion-reduce` | Add `motion-reduce:transition-none` |

#### Research Insights

**Large Clickable Area Pattern:**
- The entire card is wrapped in a single `<NuxtLink>`, which is a valid pattern. The `<h3>` text provides the accessible name
- Consider adding `aria-label` to the NuxtLink as a safety measure: `:aria-label="issue.subjectLine"`. While the `<h3>` text is technically sufficient, some screen readers in browse mode may not associate nested heading text with the parent link
- The `<time>` element with `:datetime` attribute (line 33) is good -- screen readers can parse the machine-readable date

**Focus Ring Consistency:**
- IssueCard uses `rounded` for the focus ring shape, but the card content area uses no border-radius. Add `rounded-sm` to match the card's visual shape, or use `rounded` to be slightly more generous

### 1.6 ProjectCard (`src/components/content/ProjectCard.vue`)

| Issue | Fix |
|---|---|
| Already has `focus-visible:ring-2 focus-visible:ring-ring` on NuxtLink | No action needed |
| Already has `aria-label` on NuxtLink | No action needed |
| `transition-shadow` on Card missing `motion-reduce` | Add `motion-reduce:transition-none` |
| GitHub/ExternalLink icons already have `aria-hidden="true"` | No action needed |

#### Research Insights

**Performance:**
- `transition-shadow` is less performant than `transition: box-shadow` because `box-shadow` can be GPU-accelerated on some browsers. However, Tailwind's `transition-shadow` utility maps to `transition-property: box-shadow` in v4, so this is already optimal. No change needed
- The `hover:shadow-md` effect triggers a repaint but not a reflow since `box-shadow` doesn't affect layout. This is acceptable

### 1.7 Other Content Components (already compliant)

- **SearchBar**: Has `aria-label` on all buttons, `aria-hidden` on icons, `focus-visible` styles, `aria-live` region. No action needed.
  - **Note discovered during research:** `SearchBar.vue` line 85 uses `navigator.platform` without an SSR guard (`if (import.meta.client)`). This is wrapped in `onMounted()` which runs client-side only, so it is safe. However, `navigator.platform` is deprecated -- consider replacing with `navigator.userAgentData?.platform` or UA parsing in a future issue
  - **Note:** `SearchBar.vue` trigger button has `transition-colors` but no `motion-reduce:transition-none`. Add this in Workstream 2
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

#### Research Insights

**Focus Ring Token Consistency:**
- All focus-visible rings in this project use `ring-ring` which maps to `--ring` CSS variable (oklch-based purple/rose pine accent). This is consistent across existing compliant components (ProjectCard, SearchBar, NewsletterSignupForm). Maintain this same token for new additions
- The standard pattern is: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`. Some components add `focus-visible:ring-offset-2` for spacing between the ring and the element -- decide on one pattern and apply consistently. The project currently does NOT use `ring-offset`, so omit it for consistency

**WCAG Focus Indicator Requirements (2.4.7 / 2.4.11):**
- WCAG 2.2 Level AA (criterion 2.4.11) requires the focus indicator to have a minimum area of 2px thick around the perimeter. The `ring-2` utility (2px) meets this
- The ring color must have at least 3:1 contrast against adjacent colors. The `--ring` variable is set to `oklch(0.55 0.16 320.04)` (light) and `oklch(0.73 0.12 320.04)` (dark) -- both are vivid purple/rose tones that should meet 3:1 contrast against the background. Verify with a contrast checker during implementation

---

## Workstream 2: Transition & Animation System

### 2.1 Define Duration Tokens

#### Research Insights -- Decision Changed

**Resolution of Open Question #3 (Duration Token Naming):**

After researching Tailwind CSS v4's `@theme` system, the recommendation has changed. Tailwind v4 treats `--duration-*` as a [theme namespace](https://tailwindcss.com/docs/theme) that automatically generates `duration-*` utility classes. Tailwind v4 already defines built-in duration utilities:

- `duration-75` (75ms)
- `duration-100` (100ms)
- `duration-150` (150ms)
- `duration-200` (200ms)
- `duration-300` (300ms)
- `duration-500` (500ms)
- `duration-700` (700ms)
- `duration-1000` (1000ms)

**Decision: Do NOT add custom duration tokens.** Use Tailwind's built-in duration classes directly:
- `duration-150` instead of `duration-fast`
- `duration-200` instead of `duration-normal`
- `duration-300` instead of `duration-slow`

This avoids potential namespace conflicts and keeps the codebase aligned with Tailwind conventions. No changes to `tailwind.css` are needed for duration tokens.

**Easing tokens are also unnecessary.** Tailwind v4 provides:
- `ease-in` (cubic-bezier(0.4, 0, 1, 1))
- `ease-out` (cubic-bezier(0, 0, 0.2, 1))
- `ease-in-out` (cubic-bezier(0.4, 0, 0.2, 1))

These match the proposed custom values exactly. Use them directly.

**Updated action for 2.1:** No changes to `tailwind.css` for duration/easing tokens. Remove this step from implementation.

### 2.2 Apply Transitions Consistently

| Component | Current | Target |
|---|---|---|
| `ArticleCard` | No transitions | Add `motion-safe:transition-colors motion-safe:duration-150` on links |
| `SummaryCard` | No transitions | Add `motion-safe:transition-colors motion-safe:duration-150` on links |
| `ToolCard` | `transition-transform duration-200` on chevron | Keep; already has `motion-reduce:transition-none` |
| `IssueCard` | `transition-colors` on NuxtLink, `transition-transform` on arrow | Keep; add `motion-reduce:transition-none` on both |
| `ProjectCard` | `transition-shadow` on Card | Keep; add `motion-reduce:transition-none` |
| `CategoryFilterBar` | No explicit transitions (shadcn toggle may have built-in) | Verify shadcn toggle handles this |
| `SearchBar` | `transition-colors` on trigger | Keep; add `motion-reduce:transition-none` |

#### Research Insights

**`motion-safe` vs `motion-reduce` -- Preferred Pattern:**
- For NEW transitions (ArticleCard, SummaryCard), use the `motion-safe:` prefix approach. This means transitions only apply when the user has NOT requested reduced motion. Less code than adding `motion-reduce:transition-none` as an override
- For EXISTING transitions (IssueCard, ProjectCard, SearchBar), add `motion-reduce:transition-none` to avoid rewriting the existing class strings

**Example -- new transition on ArticleCard link:**
```html
<!-- motion-safe approach (preferred for new code) -->
<a class="hover:text-foreground hover:underline motion-safe:transition-colors motion-safe:duration-150">

<!-- motion-reduce approach (for existing code with transitions already in place) -->
<a class="transition-colors duration-150 hover:text-foreground hover:underline motion-reduce:transition-none">
```

Both are equivalent, but `motion-safe` is the preferred convention going forward because it defaults to "no animation" and opts in when safe, following the inclusive design principle.

**Duration Selection Rationale (from design-motion-principles skill):**
- This is a productivity/content reading app (similar to RSS reader / newsletter client). Per Emil Kowalski's principles: keep hover transitions fast (150ms) and purposeful
- 150ms for color transitions on links is ideal -- fast enough to feel responsive, slow enough to be noticeable
- The existing `duration-200` on ToolCard's chevron is fine for a rotational transform (slightly longer than color transitions because spatial movement benefits from slightly more time)

### 2.3 Motion-Reduce Audit

All transition/animation classes must be paired with `motion-reduce:transition-none` (for existing code) or use `motion-safe:` prefix (for new code). Current status:

- **Already compliant:** `ToolCard` (chevron)
- **Needs `motion-reduce:transition-none`:**
  - `IssueCard` -- NuxtLink (`transition-colors`), ArrowRight (`transition-transform`)
  - `ProjectCard` -- Card (`transition-shadow`)
  - `SearchBar` -- trigger button (`transition-colors`)
- **New transitions using `motion-safe:` prefix:**
  - `ArticleCard` -- links (after adding transitions)
  - `SummaryCard` -- links (after adding transitions)

#### Research Insights

**What `motion-reduce:transition-none` Actually Does:**
- Sets `transition-property: none` when `@media (prefers-reduced-motion: reduce)` matches
- This preserves the final state (hover color, shadow, etc.) but removes the animated transition. The state change is instant
- This is the correct behavior: users who prefer reduced motion still want to see hover feedback, just without animation

**Testing Reduced Motion:**
- macOS: System Preferences > Accessibility > Display > Reduce motion
- Chrome DevTools: Rendering panel > "Emulate CSS media feature prefers-reduced-motion"
- Add to the verification checklist in 3.5

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

#### Research Insights

**Learned from project solutions:**
- Per `route-relocation-stale-reference-cleanup.md` pattern #2: when removing scripts, also grep for references to those script names in CI configs, pre-commit hooks, and documentation beyond `CLAUDE.md`. Check `.github/workflows/`, `netlify.toml`, and any Makefile or shell scripts

### 3.3 Stale CUBE/BEM/`--_ccm-*` References to Clean Up

No `--_ccm-*` references exist in `src/` (confirmed by grep). References exist in documentation and config files only:

| File | Reference | Action |
|---|---|---|
| `.cursorrules` (line 27) | `CUBE methodology, design tokens, --_ccm-{component}-{property}` | Update to reflect current Tailwind-only approach |
| `.claude/skills/code-reviewer/skill.json` (line 27) | `--_ccm-{component}-{property}` pattern check | Remove CUBE compliance check |
| `.claude/skills/code-reviewer/README.md` (line 47) | `--_ccm-{component}-{property}` pattern | Update to reflect Tailwind rules |
| `.claude/skills/README.md` (lines 210, 219, 242, 257) | CUBE CSS utilities references | Remove or replace with Tailwind references |
| `.claude/skills/component-scaffolder/README.md` (line 41) | `--_ccm-{component}-{property}` | Update scaffolder to use Tailwind patterns |
| `.claude/skills/design-token-validator/README.md` (line 9) | CUBE CSS methodology reference | **Delete entire skill directory** (see below) |
| `.claude/config/component-patterns.json` (line 37) | `css_vars_pattern` | Remove `--_ccm-*` pattern |
| `.claude/TIER1-IMPLEMENTATION.md` (lines 76, 159) | CUBE CSS compliance, CSS layers | Update to reflect current architecture |
| `.claude/TIER2-IMPLEMENTATION.md` (line 62) | CUBE CSS methodology | Update |
| `.claude/agents/quality-assurance/README.md` (line 86) | CUBE CSS layer usage | Update |
| `src/assets/css/tailwind.css` (line 171) | Comment: "migrated from CUBE prose.css" | Remove "migrated from CUBE" -- just say "Prose layout utility" |

#### Research Insights

**Resolution of Open Question #5 (design-token-validator skill):**
- The `design-token-validator` skill's sole purpose is to validate CUBE CSS token files using `validate-tokens.ts`. Since both the script and the token files it validates are being deleted, the entire skill directory (`.claude/skills/design-token-validator/`) should be deleted, not just updated
- Add to "Files to Delete" section below

**Additional Files to Delete:**
- `.claude/skills/design-token-validator/` (entire directory) -- purpose no longer exists
- `.claude/config/component-patterns.json` -- generated by `analyze-components.ts` which is being deleted. If the file is only consumed by that script, delete it entirely rather than editing

### 3.4 Stylelint Config Evaluation

**Current state** (`stylelint.config.mjs`): Extends `stylelint-config-standard-scss` but disables 25 of its rules via `null`. With Tailwind v4 handling all styling and no SCSS files in the project, the value of stylelint is minimal.

**Decision (resolved during deepening):** No `.scss` files exist anywhere in `src/`. Simplify the config:

1. Replace `stylelint-config-standard-scss` with `stylelint-config-standard` in the extends array
2. Remove `stylelint-config-standard-scss` from `package.json` devDependencies (keep `postcss-html` for Vue SFC linting)
3. Run `pnpm install` after the dependency change
4. Run `pnpm run lint:css` to verify the simplified config still works

**Note:** Many of the disabled rules are SCSS-specific (they won't exist in `stylelint-config-standard`). After switching, review which `null` overrides are still needed and remove the ones that no longer apply. This may significantly reduce the config.

#### Research Insights

**Consider adding Tailwind-aware rules:**
- `stylelint-config-tailwindcss` is a community config that understands Tailwind's `@apply`, `@theme`, `@plugin` directives. Consider adding it in a future pass if stylelint reports false positives on Tailwind syntax
- For now, the existing `null` overrides likely handle most false positives

### 3.5 Build Verification

After all changes:
1. Run `pnpm run build` -- must pass
2. Run `pnpm eslint .` -- must pass
3. Run `pnpm vitest run` -- must pass
4. Run `pnpm run lint:css` -- must pass (verifies stylelint still works)
5. **NEW:** Test with reduced motion enabled (macOS: System Preferences > Accessibility > Display > Reduce motion, or Chrome DevTools Rendering panel)
6. **NEW:** Run a quick keyboard-only navigation test through the modified components (Tab, Shift+Tab, Enter, Space, Escape on ToolCard details)

#### Research Insights

**Resolution of Open Question #4 (Composition CSS Imports):**
- `src/public/css/composition/` EXISTS and contains 11 CSS files (box, center, cluster, container, cover, frame, grid, imposter, reel, stack, switcher)
- The import path `../../public/css/composition/` in `tailwind.css` resolves correctly because `tailwind.css` is at `src/assets/css/tailwind.css` and the composition files are at `src/public/css/composition/`
- These are NOT dead imports. They are structural layout primitives (Every Layout patterns). No action needed
- **Note:** The original plan said "public/css/ does not exist on this branch" which was checking from the project root. The correct path is `src/public/css/` (because `srcDir` is `src/` in the Nuxt config)

---

## Implementation Order

1. **Workstream 3 first** (dead code cleanup) -- removes distractions and stale references
   - Delete scripts, remove package.json entries, update CLAUDE.md
   - Delete `.claude/skills/design-token-validator/` directory entirely
   - Clean up `.cursorrules`, `.claude/` config/skill files
   - Update tailwind.css comment
   - Simplify stylelint config (switch from SCSS to standard)
   - Verify build passes
2. **Workstream 2** (transition system) -- no new tokens needed, just apply motion-reduce/motion-safe
   - Apply `motion-reduce:transition-none` to existing transitions (IssueCard, ProjectCard, SearchBar)
   - Plan `motion-safe:` prefix pattern for new transitions in Workstream 1
3. **Workstream 1** (accessibility) -- uses transition utilities where needed
   - Create `~/types/content.ts` with shared ArticleItem/SummaryItem types
   - FeedItem type safety (removes `as any`, imports shared types)
   - Update ArticleCard/SummaryCard props to use shared types
   - SummaryCard `(this as any)` fix (use `new marked.Renderer()` approach)
   - SummaryCard: change to `role="document"` instead of `role="region"`
   - Add aria-labels, focus-visible rings per component audit above
   - Add `motion-safe:transition-colors motion-safe:duration-150` to links where missing

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
| `src/components/content/SearchBar.vue` | 2 |
| `src/assets/css/tailwind.css` | 3 |
| `src/types/content.ts` | 1 (NEW FILE) |
| `package.json` | 3 |
| `CLAUDE.md` | 3 |
| `.cursorrules` | 3 |
| `.claude/skills/code-reviewer/skill.json` | 3 |
| `.claude/skills/code-reviewer/README.md` | 3 |
| `.claude/skills/README.md` | 3 |
| `.claude/skills/component-scaffolder/README.md` | 3 |
| `.claude/config/component-patterns.json` | 3 |
| `.claude/TIER1-IMPLEMENTATION.md` | 3 |
| `.claude/TIER2-IMPLEMENTATION.md` | 3 |
| `.claude/agents/quality-assurance/README.md` | 3 |
| `stylelint.config.mjs` | 3 |

## Files to Delete

| File | Reason |
|---|---|
| `scripts/validate-tokens.ts` | CUBE-specific, validates nonexistent token files |
| `scripts/analyze-components.ts` | Scans nonexistent `src/components/ds/`, CUBE-specific patterns |
| `.claude/skills/design-token-validator/` (entire directory) | Sole purpose was validating deleted CUBE tokens; script being deleted |
| `.claude/config/component-patterns.json` | Generated by `analyze-components.ts` which is being deleted; verify no other consumers before deleting |

---

## Open Questions

1. **Stylelint scope:** ~~Should stylelint be kept at all, or removed entirely?~~ **RESOLVED:** Keep stylelint but switch from `stylelint-config-standard-scss` to `stylelint-config-standard`. No `.scss` files exist in the project.
2. **`<details>` ARIA:** ~~Native `<details>`/`<summary>` handles expanded state in modern browsers. Should we add redundant `aria-expanded`?~~ **RESOLVED:** Trust native semantics. Do NOT add `aria-expanded` to `<details>`/`<summary>`. Only add `aria-expanded` to the custom "Show more/less" button.
3. **Duration token naming:** ~~Tailwind v4 may already define `--duration-*` values.~~ **RESOLVED:** Do not add custom duration tokens. Use Tailwind's built-in `duration-150`, `duration-200`, `duration-300` classes directly.
4. **Composition CSS imports:** ~~`tailwind.css` imports from `../../public/css/composition/` but `public/css/` does not exist on this branch.~~ **RESOLVED:** The files exist at `src/public/css/composition/` (11 CSS files confirmed). The import path resolves correctly via Nuxt's `srcDir`. Not dead code.
5. **`.claude/skills/design-token-validator/`:** ~~With `validate-tokens.ts` deleted, should this entire skill directory be removed?~~ **RESOLVED:** Yes, delete the entire directory. Its sole purpose was validating the deleted CUBE token system.

## New Risks Identified During Deepening

1. **`marked` API stability:** The SummaryCard fix (using `new marked.Renderer()`) depends on `marked`'s renderer class API. Check the installed `marked` version and verify `Tokens.Paragraph` type exists. If using `marked` v12+, the API may differ from v5-v11
2. **FeedItem type extraction scope creep:** Extracting types to `~/types/content.ts` means updating import paths in FeedItem, ArticleCard, and SummaryCard. If other components or composables reference these same shapes (e.g., `useDateGroups`, `useContentStream`), the type extraction could cascade. Limit initial scope to the three card components
3. **stylelint-config-standard may introduce new rule failures:** Switching from SCSS to standard config could surface new lint errors that were previously suppressed by the SCSS config's defaults. Run `pnpm run lint:css` immediately after the switch and add any new necessary `null` overrides before proceeding
