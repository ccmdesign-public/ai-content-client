# AIC-36: Security and State Handling Standardization

## Objective

Fix the XSS vulnerability in `SummaryCard.vue`, replace all "Loading..." text with skeleton loading states, standardize empty states on `PageEmptyState`, and add structured error handling with retry to pages that silently swallow errors.

---

## Workstream 1: HTML Sanitization (XSS Fix) -- Priority P0

### 1A. Install `isomorphic-dompurify`

```bash
pnpm add isomorphic-dompurify
pnpm add -D @types/dompurify
```

Verify SSR compatibility: `isomorphic-dompurify` uses `jsdom` on the server and native `DOMPurify` on the client -- no `import.meta.client` guard needed.

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

### 1C. Fix `SummaryCard.vue` (the only current `v-html` usage)

**File:** `src/components/content/SummaryCard.vue` (line 62)

- Import and use the composable
- Replace `v-html="marked.parse(summary.tldr)"` with `v-html="sanitizeMarkdown(summary.tldr)"`
- Move the custom `marked` renderer config into the composable so it is co-located with sanitization

### 1D. Add ESLint rule (optional, stretch goal)

Consider adding `eslint-plugin-vue`'s `vue/no-v-html` rule set to `warn` so that any new `v-html` usage triggers a review. The existing sanctioned usage in `SummaryCard.vue` can be suppressed with an inline `// eslint-disable-next-line vue/no-v-html` comment.

### Acceptance criteria
- [ ] `isomorphic-dompurify` is in `package.json` dependencies
- [ ] All `v-html` usages go through `DOMPurify.sanitize()`
- [ ] `pnpm run build` succeeds (SSR + client)
- [ ] No hydration mismatches from sanitization

---

## Workstream 2: Skeleton Loading States -- Priority P1

### Reference

The `<Skeleton>` component already exists at `src/components/ui/skeleton/Skeleton.vue`. It accepts a `class` prop for sizing. Usage: `<Skeleton class="h-4 w-full" />`.

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

### Acceptance criteria
- [ ] Zero instances of `"Loading..."` text remain in `src/pages/`
- [ ] Each skeleton visually matches the shape of the content it replaces
- [ ] No layout shift (CLS) when content loads

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
  link-text="Clear search"
  @click="setSearch('')"
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

### Acceptance criteria
- [ ] No inline empty state markup remains in `src/pages/` (all use `PageEmptyState`)
- [ ] `PageEmptyState` supports both navigation (`linkTo`) and action (`@action`) CTAs
- [ ] Visual appearance unchanged after migration

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
<div class="text-center py-14 px-7">
  <AlertCircle class="size-12 text-destructive mb-5 mx-auto" aria-hidden="true" />
  <p class="text-lg font-medium text-foreground mb-2.5">{{ message }}</p>
  <p v-if="hint" class="text-base text-muted-foreground mb-7">{{ hint }}</p>
  <Button v-if="retryable" @click="$emit('retry')">Try again</Button>
</div>
```

### 4B. Add error states to pages

For pages using `useAsyncData` or `useContentStream`, the `error` ref is already available. Wire it up:

**Pattern for list pages** (channels, tags, playlists, publications):
```html
<PageErrorState
  v-else-if="error"
  message="Failed to load content."
  @retry="refreshNuxtData()"
/>
```

Use `refreshNuxtData()` (Nuxt built-in) or `refresh()` from the `useAsyncData` return for retry.

**Pattern for detail pages** (summaries/[slug], articles/[...slug]):
```html
<PageErrorState
  v-else-if="error"
  message="Failed to load this page."
  @retry="refresh()"
/>
```

### 4C. Fix silent error swallowing

**`src/pages/summaries/[slug].vue` line 99:** The transcript `catch` block returns `''` silently. This is acceptable for a secondary data source (transcript is optional), but add a `console.warn` so failures are visible in dev:
```ts
} catch (e) {
  if (import.meta.dev) console.warn('Transcript load failed:', e)
  return ''
}
```

### Acceptance criteria
- [ ] All pages with data fetching have visible error states using `PageErrorState`
- [ ] Error states include a retry mechanism
- [ ] No raw error objects shown to users
- [ ] Silent catch blocks have dev-mode warnings

---

## Implementation Order

1. **Workstream 1 (sanitization)** -- Ship first as it fixes an active XSS vulnerability. Can be a standalone PR.
2. **Workstream 3D (PageEmptyState enhancement)** -- Prerequisite for workstream 3.
3. **Workstreams 2 + 3 + 4** -- Can be done in a single PR or split per workstream. Recommended: single PR since they all touch the same page files.

## Files Changed (estimated)

| File | Workstreams |
|---|---|
| `package.json` | 1A |
| `src/composables/useSanitizedHtml.ts` (new) | 1B |
| `src/components/content/SummaryCard.vue` | 1C |
| `src/components/content/PageEmptyState.vue` | 3D |
| `src/components/content/PageErrorState.vue` (new) | 4A |
| `src/pages/summaries/index.vue` | 2B, 3C |
| `src/pages/summaries/[slug].vue` | 2B, 4B, 4C |
| `src/pages/channels/[slug].vue` | 2B, 4B |
| `src/pages/tags/[slug].vue` | 2B |
| `src/pages/playlists/[slug].vue` | 2B, 3B, 4B |
| `src/pages/articles/[...slug].vue` | 2B, 4B |
| `src/pages/articles/publications/[slug].vue` | 2B, 4B |
| `src/pages/tools/index.vue` | 2B, 3A, 4B |

## Open Questions

1. **Skeleton components vs inline:** Should skeleton patterns be extracted into reusable `*Skeleton.vue` components in `src/components/content/`, or kept as inline template markup in each page? (Recommendation: extract if used in 2+ pages.)
2. **`PageEmptyState` action support:** Adding `actionText`/`@action` props changes the component API. Confirm this is acceptable vs keeping inline buttons for non-navigation empty states.
3. **ESLint `vue/no-v-html` rule:** Should we add this as a warning now to prevent future unsanitized `v-html` usage, or defer?
4. **Detail page skeleton fidelity:** The summary detail page has a complex layout (video embed, tools section, transcript). Should the skeleton approximate the full layout or just show generic text lines?
