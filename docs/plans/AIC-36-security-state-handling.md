# AIC-36: Security and State Handling Standardization

## Enhancement Summary

**Deepened on:** 2026-03-20
**Sections enhanced:** 4 workstreams + implementation order + open questions
**Research sources:** DOMPurify docs, Nuxt 4.x useAsyncData API, vue-dompurify-html, WCAG 2.1 accessibility guidelines, project learnings (styling-audit, shadcn-vue migration, route-relocation), CLS/skeleton best practices

### Key Improvements
1. Hardened `useSanitizedHtml` composable with explicit `ALLOWED_TAGS`/`FORBID_TAGS` allowlists and a DOMPurify hook for safe external links (`rel="noopener noreferrer"`)
2. Added `aria-busy` and `aria-live` accessibility requirements to skeleton loading states and error states
3. Identified Nuxt SSR error serialization edge case: `error` ref becomes a boolean on client after hydration -- `PageErrorState` must not attempt to render `error.message`
4. Added `role="alert"` and focus-management guidance to `PageErrorState` for screen reader announcement
5. Resolved all 4 open questions with concrete decisions grounded in codebase analysis

### New Considerations Discovered
- DOMPurify output can differ between server (jsdom) and client (native DOM), causing hydration mismatches on edge-case HTML -- test with malformed markdown inputs
- `vue-dompurify-html` directive is an alternative to the composable approach and has native Nuxt SSR support via `enableSSRPropsSupport` -- worth evaluating
- `refreshNuxtData()` refreshes ALL async data on the page; prefer the scoped `refresh()` from the specific `useAsyncData` call to avoid refetching unrelated data
- `PageEmptyState` and `PageErrorState` should share visual spacing constants to prevent layout shift when transitioning between states

---

## Workstream 1: HTML Sanitization (XSS Fix) -- Priority P0

### 1A. Install `isomorphic-dompurify`

```bash
pnpm add isomorphic-dompurify
pnpm add -D @types/dompurify
```

Verify SSR compatibility: `isomorphic-dompurify` uses `jsdom` on the server and native `DOMPurify` on the client -- no `import.meta.client` guard needed.

#### Research Insights

**Best Practices:**
- After installing, verify the `jsdom` peer dependency is satisfied. `isomorphic-dompurify` v12+ bundles its own jsdom, but earlier versions require it as a peer dep. Check `pnpm ls jsdom` after install.
- Consider `vue-dompurify-html` as an alternative: it provides a `v-dompurify-html` directive that replaces `v-html` directly, with Nuxt SSR support via a plugin using `enableSSRPropsSupport: true`. This eliminates the need for a custom composable but adds a dependency. The composable approach chosen in this plan is lighter and avoids a directive registration step.

**SSR Hydration Risk:**
- DOMPurify may produce slightly different output on server (jsdom) vs client (native DOM parser) for malformed or edge-case HTML. For example, jsdom may auto-close tags differently than Chrome's parser. This can cause hydration mismatches.
- **Mitigation:** Run `sanitizeMarkdown()` through a test suite with deliberately malformed markdown (unclosed tags, nested HTML in markdown, script injection attempts) and compare server vs client output. Add a Vitest spec in `src/tests/composables/useSanitizedHtml.test.ts`.

**References:**
- https://github.com/cure53/DOMPurify
- https://github.com/kkomelin/isomorphic-dompurify
- https://github.com/LeSuisse/vue-dompurify-html

### 1B. Create `useSanitizedHtml` composable

**File:** `src/composables/useSanitizedHtml.ts`

Purpose: thin wrapper around DOMPurify + marked for reuse anywhere `v-html` is needed.

```ts
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

export function useSanitizedHtml() {
  function sanitize(html: string): string {
    return DOMPurify.sanitize(html)
  }

  function sanitizeMarkdown(markdown: string): string {
    return DOMPurify.sanitize(marked.parse(markdown) as string)
  }

  return { sanitize, sanitizeMarkdown }
}
```

#### Research Insights

**Security Hardening -- Restrict Allowed Tags:**
- The default DOMPurify config allows a broad set of HTML tags. For markdown-rendered content (like `summary.tldr`), the expected output is limited to inline formatting and paragraphs. Add an explicit allowlist:
```ts
const MARKDOWN_SANITIZE_CONFIG = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  FORBID_TAGS: ['style', 'script', 'iframe', 'form', 'input', 'object', 'embed'],
}
```
- This prevents future regressions if content sources change and start including `<style>`, `<iframe>`, or `<form>` tags that DOMPurify would otherwise permit by default.

**Safe External Links -- DOMPurify Hook:**
- Add an `afterSanitizeAttributes` hook to force `rel="noopener noreferrer"` and `target="_blank"` on all links. This prevents tabnapping attacks from user-generated content:
```ts
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if ('target' in node) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})
```
- Register this hook once at module scope (not inside the composable function) to avoid duplicate registrations.

**Composable vs Pure Function:**
- Since `sanitize` and `sanitizeMarkdown` are stateless (no reactive refs, no lifecycle hooks), consider exporting them as plain functions rather than wrapping in a composable. The composable pattern is still acceptable for discoverability and consistency with project conventions, but be aware it is not leveraging Vue reactivity.

**Edge Cases:**
- `marked.parse()` returns `string | Promise<string>` depending on configuration. If async extensions are ever added to marked, the cast `as string` will silently break. Pin to synchronous mode by ensuring no async marked extensions are registered, or add a runtime check.
- Null/undefined input: guard against `sanitizeMarkdown(undefined)` -- add a null check or default to empty string.

### 1C. Fix `SummaryCard.vue` (the only current `v-html` usage)

**File:** `src/components/content/SummaryCard.vue` (line 62)

- Import and use the composable
- Replace `v-html="marked.parse(summary.tldr)"` with `v-html="sanitizeMarkdown(summary.tldr)"`
- Move the custom `marked` renderer config into the composable so it is co-located with sanitization

#### Research Insights

**From project learning (shadcn-vue migration patterns):**
- When modifying `SummaryCard.vue`, verify no other imports or patterns were affected by recent shadcn-vue migrations (PR #13). Check that `components.json` still has `"framework": "nuxt"` after any shadcn CLI operations in this PR.

**Performance:**
- `DOMPurify.sanitize()` is fast (~1ms for typical HTML snippets) but runs on every render. For list pages rendering 20+ SummaryCards, the cumulative cost is negligible but worth noting. If `summary.tldr` is stable (not user-editable), consider memoizing the sanitized output with a computed ref in the parent.

### 1D. Add ESLint rule (optional, stretch goal)

Consider adding `eslint-plugin-vue`'s `vue/no-v-html` rule set to `warn` so that any new `v-html` usage triggers a review. The existing sanctioned usage in `SummaryCard.vue` can be suppressed with an inline `// eslint-disable-next-line vue/no-v-html` comment.

#### Research Insights

**Recommendation: Do it now (not stretch goal).**
- The ESLint rule is a one-line config change and provides permanent protection against future unsanitized `v-html` usage. The cost is trivial and the benefit is high. Add to `eslint.config.mjs`:
```js
{ rules: { 'vue/no-v-html': 'warn' } }
```
- This rule is already included in `eslint-plugin-vue` which ships with `@nuxt/eslint`. No additional dependency needed.

### Acceptance criteria
- [ ] `isomorphic-dompurify` is in `package.json` dependencies
- [ ] All `v-html` usages go through `DOMPurify.sanitize()`
- [ ] `pnpm run build` succeeds (SSR + client)
- [ ] No hydration mismatches from sanitization
- [ ] DOMPurify config uses explicit `ALLOWED_TAGS` allowlist (not just defaults)
- [ ] External links in sanitized HTML get `rel="noopener noreferrer"`
- [ ] Vitest spec covers XSS vectors and SSR/client output parity

---

## Workstream 2: Skeleton Loading States -- Priority P1

### Reference

The `<Skeleton>` component already exists at `src/components/ui/skeleton/Skeleton.vue`. It accepts a `class` prop for sizing. Usage: `<Skeleton class="h-4 w-full" />`. It renders a `div` with `animate-pulse` and `bg-primary/10`.

### 2A. Create reusable skeleton patterns

Create small skeleton compositions as components or named slots. These are not full components -- they are template fragments used inside the pages that render the cards.

**`SummaryCardSkeleton` pattern** (for summary list pages):
```html
<!-- Mimics SummaryCard layout: thumbnail + text block -->
<div class="flex border-t border-border gap-4 py-4 max-md:flex-col">
  <Skeleton class="max-w-60 shrink-0 aspect-video rounded-md max-md:max-w-full" />
  <div class="flex-1 min-w-0 space-y-2">
    <Skeleton class="h-4 w-1/3" />
    <Skeleton class="h-5 w-3/4" />
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-2/3" />
  </div>
</div>
```

**`ArticleCardSkeleton` pattern** (for article list pages):
```html
<!-- Mimics ArticleCard layout: gradient placeholder + text -->
<div class="flex border-t border-border gap-4 py-4 max-md:flex-col">
  <Skeleton class="max-w-60 w-60 shrink-0 aspect-video rounded-md max-md:max-w-full max-md:w-full" />
  <div class="flex-1 min-w-0 space-y-2">
    <Skeleton class="h-4 w-1/4" />
    <Skeleton class="h-5 w-2/3" />
    <Skeleton class="h-4 w-1/2" />
    <Skeleton class="h-3 w-1/5 mt-2" />
  </div>
</div>
```

**`ProjectCardSkeleton` pattern** (if project list pages exist):
```html
<!-- Mimics ProjectCard layout: thumbnail + card content -->
<Card class="overflow-hidden">
  <Skeleton class="w-full aspect-video" />
  <CardHeader class="pb-2"><Skeleton class="h-5 w-2/3" /></CardHeader>
  <CardContent class="pt-0 space-y-2">
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-3/4" />
    <div class="flex gap-1 mt-3">
      <Skeleton class="h-5 w-16 rounded-full" />
      <Skeleton class="h-5 w-12 rounded-full" />
    </div>
  </CardContent>
</Card>
```

**Decision for implementer:** These can be either:
1. Inline skeleton markup in each page (simpler, no new files)
2. Small `*Skeleton.vue` components in `src/components/content/` (reusable across pages)

Recommendation: option 2 if the same skeleton is used in 2+ pages; option 1 otherwise.

#### Research Insights

**Decision resolved: Extract `SummaryCardSkeleton.vue` as a component.**
- `SummaryCardSkeleton` is used on 4 pages (summaries/index, channels/[slug], tags/[slug], playlists/[slug]). This clearly meets the "2+ pages" threshold for extraction.
- `ArticleCardSkeleton` is used on 1 page (publications/[slug]). Keep inline.
- Detail page skeletons (summaries/[slug], articles/[...slug]) are unique layouts. Keep inline.
- Tools page skeleton is unique. Keep inline.

**CLS Prevention Best Practices:**
- Skeleton containers MUST have the same dimensions as the final content. The current patterns use `aspect-video` for thumbnails and fixed `h-*` heights for text lines, which is correct.
- Wrap the skeleton container in the same CSS grid/flex layout as the final content. If the page uses a specific wrapper `<div>` with padding, the skeleton must be inside the same wrapper to avoid layout shift.
- Test skeleton-to-content transition by throttling network in DevTools and visually confirming no jump occurs.

**Accessibility:**
- Add `aria-busy="true"` to the skeleton container and `aria-busy="false"` when content loads. This signals to screen readers that content is loading:
```html
<div v-if="pending" aria-busy="true" aria-label="Loading content">
  <!-- skeleton markup -->
</div>
```
- The `animate-pulse` animation should respect `prefers-reduced-motion`. The existing `Skeleton.vue` uses Tailwind's `animate-pulse` which already respects `@media (prefers-reduced-motion: reduce)` in Tailwind v4.

**Performance:**
- Rendering 5 skeleton rows is lightweight (~15 DOM nodes). No performance concern.
- Avoid using `v-for` with a key that changes on data load, as it forces Vue to destroy and recreate nodes. Use a static key or no key for skeleton elements.

**Edge Case -- SSR Initial Render:**
- On SSR, `pending` starts as `true` during server render, so skeletons will appear in the initial HTML. This is correct behavior -- the skeleton HTML is served, then replaced by content after hydration and data fetch. Verify this works correctly with `lazy: true` vs default `useAsyncData` behavior.

### 2B. Replace "Loading..." text on each page

| Page | Current loading state | New skeleton |
|---|---|---|
| `src/pages/summaries/index.vue:105` | `"Loading..."` text | 5x `SummaryCardSkeleton` |
| `src/pages/summaries/[slug].vue:3` | `"Loading..."` text | Detail page skeleton (title bar + video placeholder + text lines) |
| `src/pages/channels/[slug].vue:74` | `"Loading..."` text | 5x `SummaryCardSkeleton` |
| `src/pages/tags/[slug].vue:41` | `"Loading..."` text | 5x `SummaryCardSkeleton` |
| `src/pages/playlists/[slug].vue:56` | `"Loading..."` text | 5x `SummaryCardSkeleton` |
| `src/pages/articles/[...slug].vue:3` | `"Loading..."` text | Detail page skeleton (header + prose lines) |
| `src/pages/articles/publications/[slug].vue:46` | `"Loading..."` text | 3x `ArticleCardSkeleton` |
| `src/pages/tools/index.vue:58-60` | `"Loading tools..."` text | 6x tool card skeleton rows |

For each page:
1. Replace the `<div>Loading...</div>` block with the appropriate skeleton composition
2. Ensure the skeleton is wrapped in the same `v-if="pending"` condition
3. Keep the same padding/margin so the layout does not shift when data loads

#### Research Insights

**From project learning (styling-audit-legacy-cleanup-patterns):**
- When modifying these pages, check for `transition: all` or `transition-all` classes. The styling audit learning documents that `transition-all` causes performance issues and should be replaced with specific transition properties. If any loading-state wrapper uses `transition-all`, fix it in the same PR.

**From project learning (route-relocation-stale-reference-cleanup):**
- When touching `summaries/index.vue`, verify that CSS class names and composable references reflect the current route name (`summaries-page`, not `home-page`). The route relocation learning documents that stale naming persists after relocations.

**Condition logic ordering:**
- Ensure the `v-if`/`v-else-if`/`v-else` chain follows this order on every page: `pending` -> `error` -> `empty` -> `content`. This prevents showing stale content during a refresh that errors.

### Acceptance criteria
- [ ] Zero instances of `"Loading..."` text remain in `src/pages/`
- [ ] Each skeleton visually matches the shape of the content it replaces
- [ ] No layout shift (CLS) when content loads
- [ ] Skeleton containers have `aria-busy="true"` for accessibility
- [ ] `SummaryCardSkeleton.vue` extracted as reusable component (used on 4 pages)
- [ ] `prefers-reduced-motion` respected (via Tailwind v4 default behavior)

---

## Workstream 3: Empty State Standardization -- Priority P1

### Reference

`PageEmptyState` component API (`src/components/content/PageEmptyState.vue`):
```
Props:
  icon?: string      -- key from iconMap: search_off, filter_list_off, playlist_remove, error, help_outline, inbox
  message: string    -- primary text
  hint?: string      -- secondary text
  linkTo?: string    -- CTA link destination
  linkText?: string  -- CTA link label (default: "Go back")
```

### Pages already using `PageEmptyState` correctly (no changes needed)
- `src/pages/channels/[slug].vue` (line 98) -- uses `PageEmptyState` for empty channel
- `src/pages/tags/[slug].vue` (line 68) -- uses `PageEmptyState` for empty tag

### Pages with inline empty states to migrate

#### 3A. `src/pages/tools/index.vue`

**Search empty state (line 100-111):** Replace inline markup with:
```html
<PageEmptyState
  icon="search_off"
  :message="`No tools found for &quot;${searchQuery}&quot;`"
  hint="Try different keywords or clear the search."
  action-text="Clear search"
  @action="setSearch('')"
/>
```

Note: `PageEmptyState` currently only supports `linkTo` (NuxtLink), not click handlers. **Decision needed:** either (a) add an `@action` emit to `PageEmptyState` for non-navigation actions, or (b) keep the inline "Clear search" button outside the component. Recommendation: option (a) -- add an optional `action` event and `actionText` prop.

**No results empty state (line 114-118):** Replace with:
```html
<PageEmptyState
  icon="inbox"
  message="No tools available yet."
/>
```

#### 3B. `src/pages/playlists/[slug].vue`

**Empty playlist state (line 58-65):** Already manually replicates the `PageEmptyState` pattern with icon + message + hint + link. Replace with:
```html
<PageEmptyState
  icon="playlist_remove"
  message="No summaries in this playlist yet."
  hint="Check back soon - new videos are processed daily."
  link-to="/summaries/"
  link-text="Browse all summaries"
/>
```

#### 3C. `src/pages/summaries/index.vue`

**Filtered empty state (line 130-137):** Inline markup with icon + message + hint + button. Replace with `PageEmptyState` (requires the action emit enhancement from 3A):
```html
<PageEmptyState
  icon="filter_list_off"
  message="No summaries found in this category."
  hint="Try selecting a different category or reset the filter."
  action-text="Show all summaries"
  @action="selectCategory(null)"
/>
```

**Search no-results (line 123-127):** Inline markup. Replace with:
```html
<PageEmptyState
  icon="search_off"
  :message="`No results found for &quot;${searchQuery}&quot;`"
  hint="Try different keywords or clear the search."
/>
```

### 3D. `PageEmptyState` enhancement

Add to `PageEmptyState.vue`:
- New prop: `actionText?: string` -- label for an action button (alternative to `linkTo`)
- New emit: `action` -- emitted when action button is clicked
- Render a `<Button>` with `@click="$emit('action')"` when `actionText` is provided and `linkTo` is not

#### Research Insights

**Prop Precedence Rule:**
- When both `linkTo` and `actionText` are provided, `linkTo` should win (navigation takes precedence over in-page action). Document this in a code comment. Alternatively, make them mutually exclusive with a TypeScript discriminated union:
```ts
type PageEmptyStateProps = {
  icon?: string
  message: string
  hint?: string
} & (
  | { linkTo: string; linkText?: string; actionText?: never }
  | { actionText: string; linkTo?: never; linkText?: never }
  | { linkTo?: never; actionText?: never; linkText?: never }
)
```
This prevents accidental misuse at the type level.

**Accessibility:**
- The action button should have the same styling as the navigation button for visual consistency.
- Add `role="status"` to the empty state container so screen readers announce it when it appears dynamically (e.g., after filtering):
```html
<div class="text-center py-14 px-7" role="status">
```

**Visual Consistency with PageErrorState:**
- `PageEmptyState` uses `py-14 px-7` for its container. `PageErrorState` (workstream 4) must use the same spacing to prevent layout shift when transitioning from error to empty or vice versa. Extract these as shared constants or simply ensure both components use identical wrapper classes.

**Edge Case -- Empty String Messages:**
- Guard against `message=""` (empty string) which would render an empty `<p>` tag. Add a required validation or default.

### Acceptance criteria
- [ ] No inline empty state markup remains in `src/pages/` (all use `PageEmptyState`)
- [ ] `PageEmptyState` supports both navigation (`linkTo`) and action (`@action`) CTAs
- [ ] Visual appearance unchanged after migration
- [ ] `actionText` and `linkTo` are mutually exclusive (TypeScript or runtime guard)
- [ ] Empty state container has `role="status"` for accessibility

---

## Workstream 4: Error State Patterns -- Priority P2

### Current state

| Page | Error handling | Issue |
|---|---|---|
| `src/pages/summaries/[slug].vue` | Shows `Error: {{ error }}` (line 4) | Raw error object dumped to user; transcript fetch silently swallows errors (line 99) |
| `src/pages/articles/[...slug].vue` | Shows `Error: {{ error }}` (line 4) | Raw error object, no retry |
| `src/pages/tools/index.vue` | Shows "Failed to load tools" (line 64) | No retry mechanism |
| `src/pages/channels/[slug].vue` | No error state at all | Data fetch has no error handling |
| `src/pages/playlists/[slug].vue` | No error state | Data fetch has no error handling |
| `src/pages/tags/[slug].vue` | No error state | Data fetch has no error handling |
| `src/pages/articles/publications/[slug].vue` | No error state | Data fetch has no error handling |

### 4A. Create `PageErrorState` component

**File:** `src/components/content/PageErrorState.vue`

Props:
- `message?: string` -- user-friendly error message (default: "Something went wrong")
- `hint?: string` -- secondary text (default: "Please try again later.")
- `retryable?: boolean` -- show retry button (default: true)

Emits:
- `retry` -- emitted when retry button is clicked

Template structure:
```html
<div class="text-center py-14 px-7" role="alert">
  <AlertCircle class="size-12 text-destructive mb-5 mx-auto" aria-hidden="true" />
  <p class="text-lg font-medium text-foreground mb-2.5">{{ message }}</p>
  <p v-if="hint" class="text-base text-muted-foreground mb-7">{{ hint }}</p>
  <Button v-if="retryable" @click="$emit('retry')">Try again</Button>
</div>
```

#### Research Insights

**Critical Nuxt SSR Edge Case -- Error Serialization:**
- In Nuxt, `useAsyncData`'s `error` ref contains a full error object on the server, but after client-side hydration it becomes a boolean (`true`) rather than a full error object. This is Nuxt's intentional security measure to avoid leaking server-side error details to the client.
- **Implication:** `PageErrorState` must NOT try to render `error.message` or `error.statusCode` from the `useAsyncData` error ref. The component correctly uses its own `message` prop for display text. Do not change this pattern.
- If status-code-specific messages are needed (e.g., "Page not found" for 404 vs "Server error" for 500), capture the status code in an `onResponseError` callback during the fetch and store it in a separate ref:
```ts
const errorCode = ref<number | null>(null)
const { data, error, refresh } = await useAsyncData('key', () =>
  $fetch('/api/data').catch((e) => {
    errorCode.value = e.status || 500
    throw e
  })
)
```

**Accessibility:**
- Add `role="alert"` to the error container (already shown in template above). This causes screen readers to announce the error immediately when it appears.
- The "Try again" button should receive focus automatically when the error state renders, to make retry discoverable for keyboard users. Use a template ref with `onMounted`:
```ts
const retryButton = useTemplateRef('retryButton')
onMounted(() => retryButton.value?.$el?.focus())
```

**Retry Behavior -- Use Scoped `refresh()`, Not `refreshNuxtData()`:**
- `refreshNuxtData()` refreshes ALL `useAsyncData` calls on the page, which is wasteful if only one data source failed. Prefer the scoped `refresh()` returned by the specific `useAsyncData` call.
- Pass `refresh` as a callback to the `@retry` handler:
```html
<PageErrorState v-else-if="error" message="Failed to load content." @retry="refresh()" />
```

**Retry UX Enhancement:**
- Show a loading indicator on the retry button while the retry is in progress. The `pending` ref from `useAsyncData` can drive this:
```html
<PageErrorState v-else-if="error" message="Failed to load content." :retrying="pending" @retry="refresh()" />
```
- Add an optional `retrying` prop to `PageErrorState` that disables the button and shows a spinner.

**Visual Consistency:**
- `PageErrorState` uses the same `py-14 px-7` spacing as `PageEmptyState`. This ensures no layout shift when the page transitions between error, empty, and content states.
- Use `text-destructive` for the icon (already in template) to visually distinguish errors from empty states (which use `text-muted-foreground`).

### 4B. Add error states to pages

For pages using `useAsyncData` or `useContentStream`, the `error` ref is already available. Wire it up:

**Pattern for list pages** (channels, tags, playlists, publications):
```html
<PageErrorState
  v-else-if="error"
  message="Failed to load content."
  @retry="refresh()"
/>
```

Use `refresh()` from the `useAsyncData` return for retry (not `refreshNuxtData()`).

**Pattern for detail pages** (summaries/[slug], articles/[...slug]):
```html
<PageErrorState
  v-else-if="error"
  message="Failed to load this page."
  @retry="refresh()"
/>
```

#### Research Insights

**Condition Chain Order:**
- Every page must follow this exact `v-if` chain order:
  1. `v-if="pending"` -- skeleton
  2. `v-else-if="error"` -- error state
  3. `v-else-if="!data || data.length === 0"` -- empty state
  4. `v-else` -- content

- Putting `error` after `pending` ensures that during a retry (where `pending` becomes true again), the skeleton shows instead of the stale error. This is the correct UX.

**Pages using `useContentStream` vs `useAsyncData`:**
- Verify which composable each page uses. `useContentStream` may return different ref names for error/pending. Check the composable's return signature before wiring up `PageErrorState`.

### 4C. Fix silent error swallowing

**`src/pages/summaries/[slug].vue` line 99:** The transcript `catch` block returns `''` silently. This is acceptable for a secondary data source (transcript is optional), but add a `console.warn` so failures are visible in dev:
```ts
} catch (e) {
  if (import.meta.dev) console.warn('Transcript load failed:', e)
  return ''
}
```

#### Research Insights

**Additional Silent Catch Audit:**
- Grep the entire `src/` directory for catch blocks that return a default value without logging. Pattern: `catch.*\{[\s\S]*?return\s+['"]` or `catch.*\{[\s\S]*?return\s+(null|undefined|false|0|\[\]|\{\})`. Any found should get the same `import.meta.dev` treatment.
- `import.meta.dev` is the correct Nuxt guard (not `process.env.NODE_ENV !== 'production'`), as it is tree-shaken in production builds.

### Acceptance criteria
- [ ] All pages with data fetching have visible error states using `PageErrorState`
- [ ] Error states include a retry mechanism using scoped `refresh()` (not `refreshNuxtData()`)
- [ ] No raw error objects shown to users
- [ ] Silent catch blocks have dev-mode warnings
- [ ] `PageErrorState` has `role="alert"` for screen reader announcement
- [ ] Error state does not attempt to render `error.message` from Nuxt's serialized error ref
- [ ] Condition chain order is `pending -> error -> empty -> content` on every page

---

## Implementation Order

1. **Workstream 1 (sanitization)** -- Ship first as it fixes an active XSS vulnerability. Can be a standalone PR.
2. **Workstream 3D (PageEmptyState enhancement)** -- Prerequisite for workstream 3.
3. **Workstreams 2 + 3 + 4** -- Can be done in a single PR or split per workstream. Recommended: single PR since they all touch the same page files.

### Research Insights

**PR Strategy:**
- Workstream 1 as a standalone PR keeps the security fix small and reviewable. It touches only 3 files (`package.json`, `useSanitizedHtml.ts`, `SummaryCard.vue`) plus the ESLint config.
- For the combined PR (workstreams 2+3+4), the file list is large (12 files). Consider splitting review by asking reviewers to focus on the two new components first (`PageErrorState.vue`, `SummaryCardSkeleton.vue`), then the page-level wiring.

**From project learning (shadcn-vue migration review patterns):**
- After any PR that modifies `package.json`, verify `components.json` still has `"framework": "nuxt"`. The shadcn-vue CLI can silently overwrite it.
- After modifying multiple pages, grep for dead `definePageMeta` properties (the learning documents that layout refactors leave behind stale page meta).

**Testing Strategy:**
- Workstream 1: Unit test `useSanitizedHtml` with XSS vectors (script tags, event handlers, data URIs, SVG-based attacks).
- Workstreams 2-4: Visual regression testing is ideal but may not be set up. At minimum, manually verify each page in all 3 states (loading, error, empty) using DevTools network throttling and offline mode.

## Files Changed (estimated)

| File | Workstreams |
|---|---|
| `package.json` | 1A |
| `src/composables/useSanitizedHtml.ts` (new) | 1B |
| `src/components/content/SummaryCard.vue` | 1C |
| `src/components/content/PageEmptyState.vue` | 3D |
| `src/components/content/PageErrorState.vue` (new) | 4A |
| `src/components/content/SummaryCardSkeleton.vue` (new) | 2A |
| `src/pages/summaries/index.vue` | 2B, 3C |
| `src/pages/summaries/[slug].vue` | 2B, 4B, 4C |
| `src/pages/channels/[slug].vue` | 2B, 4B |
| `src/pages/tags/[slug].vue` | 2B |
| `src/pages/playlists/[slug].vue` | 2B, 3B, 4B |
| `src/pages/articles/[...slug].vue` | 2B, 4B |
| `src/pages/articles/publications/[slug].vue` | 2B, 4B |
| `src/pages/tools/index.vue` | 2B, 3A, 4B |
| `eslint.config.mjs` | 1D |
| `src/tests/composables/useSanitizedHtml.test.ts` (new) | 1B |

## Open Questions (Resolved)

1. **Skeleton components vs inline:** **Resolved.** Extract `SummaryCardSkeleton.vue` (used on 4 pages). Keep all other skeletons inline (each used on only 1 page).

2. **`PageEmptyState` action support:** **Resolved.** Add `actionText`/`@action` props. Use TypeScript discriminated union to make `actionText` and `linkTo` mutually exclusive at the type level. This is a clean API extension.

3. **ESLint `vue/no-v-html` rule:** **Resolved.** Add now, not as stretch goal. It is a one-line config change to `eslint.config.mjs`, the plugin is already available via `@nuxt/eslint`, and it provides permanent protection.

4. **Detail page skeleton fidelity:** **Resolved.** Approximate the general layout shape (title bar + main content area + sidebar placeholder) rather than pixel-perfect replication. The goal is to prevent CLS and provide visual feedback, not to create a perfect content preview. Use 3-4 skeleton rows for the main content area and a single block for any media (video embed, image).
