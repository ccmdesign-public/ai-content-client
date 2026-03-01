---
title: "feat: Verify and update client app to consume tag indexes"
type: feat
status: active
date: 2026-03-01
deepened: 2026-03-01
---

# feat: Verify and update client app to consume tag indexes

## Enhancement Summary

**Deepened on:** 2026-03-01
**Sections enhanced:** 8
**Skills applied:** nuxt, nuxt-content, vue-best-practices, accessibility, seo-audit, presentation-logic-split, content-migration, ui-ux-pro-max
**Agents applied:** architecture-strategist, performance-oracle, kieran-typescript-reviewer, code-simplicity-reviewer, julik-frontend-races-reviewer, pattern-recognition-specialist

### Key Improvements
1. **Resolved YAML loading strategy decisively**: Nuxt Content v3 natively supports `type: 'data'` collections for YAML files -- the plan should use this instead of static imports or runtime YAML parsing, aligning with the existing `summaries` collection pattern and eliminating the need for a separate sync-to-JSON step.
2. **Identified critical static generation risk**: With 99 tag pages, `crawlLinks` alone may not discover all routes if sidebar shows collapsed/truncated tags. Explicit prerender route generation from the master index is needed as a safety net.
3. **Sidebar architecture refined**: With 99 tags across ~15 categories, the sidebar should NOT attempt to show all tags. Instead, show only category headers with counts, linking to a dedicated `/tags` browse page. This prevents sidebar scroll fatigue and keeps the nav component simple.
4. **Accessibility gaps identified**: Collapsible sidebar sections require proper ARIA attributes (`aria-expanded`, `aria-controls`), keyboard navigation (Enter/Space to toggle), and focus management -- none of which were addressed in the original plan.
5. **Performance concern with per-tag file loading**: Loading 99 individual YAML files via `queryCollection` for the tags overview page could trigger many small queries. A denormalized master JSON/collection approach is more efficient.

### New Considerations Discovered
- Race condition risk if tag data is stale relative to summaries (tag references video IDs that no longer exist in client)
- SEO opportunity: tag pages are strong candidates for structured data (`CollectionPage` schema) and meta descriptions
- The `DateGroupedFeed` component currently expects `item.metadata?.videoId` as key -- tag index items may use a different shape and need mapping
- Content migration skill recommends a manifest-based sync approach with verbatim preservation for the data pipeline phase

---

## Overview

The `ai-content-scraper` now generates per-tag YAML index files in `src/content/tags/` (99 files like `ai-coding.yml`, `web-development.yml`, etc.) and a master `index.yml`. The client (`ai-content-client`) does **not** currently consume these tag indexes, `connections.yml`, or any connections directory. This plan covers adding tag/category browsing to the client by reading the new tag index files.

## Problem Statement / Motivation

The client currently only organizes content by **channel** and **playlist** -- two navigational axes. A third axis, **tags/categories**, has been generated on the scraper side but is invisible to the client. Users have no way to browse content by topic (e.g., "ai-coding", "web-development", "mcp"). Adding tag-based navigation unlocks a much richer discovery experience.

## Investigation Findings

### Q1: Does the client currently read connections at all?

**No.** The client has zero references to `connections.yml` or the `connections/` directory. Grep across the entire client codebase for "connections" returns only incidental word matches in video transcript JSON files. There is no composable, page, server route, or config that touches connections data.

The `connections.yml` file exists only in the scraper repo at:
`ai-content-scraper/src/content/connections/connections.yml`

### Q2: If yes, what format does it expect?

**N/A** -- the client does not read connections. However, the *existing* data consumption pattern in the client is instructive:

| Data Source | Format | Where Consumed | How Loaded |
|---|---|---|---|
| `src/content/channels.json` | JSON array of `{id, name, slug, enabled}` | `useChannelsConfig()` composable | Static import |
| `src/content/playlists.json` | JSON array of `{id, name, category, slug, enabled}` | `usePlaylistsConfig()` composable | Static import |
| `src/content/summaries/*/summary.md` | Markdown with YAML frontmatter | Nuxt Content `queryCollection('summaries')` | `@nuxt/content` collection |

The pattern is clear: static JSON for config/navigation, Nuxt Content collections for content pages.

### Research Insights: Data Consumption Patterns

**Pattern Recognition Analysis:**
The codebase has two distinct data loading patterns that should NOT be mixed:
1. **Static JSON imports** (`useChannelsConfig`, `usePlaylistsConfig`) -- synchronous, bundled into JS, used for navigation/config data. Simple `ref()` wrapper around imported data.
2. **Nuxt Content collections** (`useContentStream`) -- async via `useAsyncData`, SQL-backed queries, used for content that needs filtering/sorting/pagination.

**Recommendation:** Tags straddle both patterns. The master tag index (list of all tags + categories + counts) should follow Pattern 1 (static JSON import) since it is navigation config data. Per-tag item lists could follow either pattern depending on size and query needs.

### Q3: What changes are needed to consume `src/content/tags/index.yml` and per-tag indexes?

**The tag data lives in the scraper repo, not the client repo.** Before the client can consume tags, the data must be copied/synced to the client. Two approaches:

1. **Copy at build time**: Add a pre-build script that copies tag indexes from the scraper to the client's `src/content/tags/` directory (similar to how summaries must be synced).
2. **Shared content volume**: Both repos read from the same content directory (already partially the case since both have `src/content/summaries/`).

Once the tag data is in the client, the implementation needs:

- **A `useTagsConfig()` composable** (paralleling `useChannelsConfig` / `usePlaylistsConfig`) that reads the master `index.yml` to get the list of all tags with their category and item count.
- **A `useTagIndex()` composable** that reads a specific per-tag YML file (e.g., `ai-coding.yml`) and returns the list of content items tagged with that tag.
- **A tags page** at `src/pages/tags/[slug].vue` that shows all summaries for a given tag, using the same `DateGroupedFeed` component already used by channels/playlists pages.
- **A tags overview page** (optional) at `src/pages/tags/index.vue` that lists all tags grouped by category.
- **Nuxt Content collection** (alternative approach): Register `tags` as a new collection in `content.config.ts` if YAML files can be processed by `@nuxt/content`, or load them via static import / server route.

### Research Insights: Nuxt Content v3 YAML Data Collections

**Nuxt Content v3 natively supports YAML as a `data` collection type.** This is a third approach not fully explored in the original plan:

```ts
// content.config.ts
tags: defineCollection({
  type: 'data',
  source: {
    include: 'tags/**/*.yml',
    cwd: contentDir
  },
  schema: z.object({
    tag: z.string(),
    category: z.string(),
    itemCount: z.number(),
    items: z.array(z.object({
      videoId: z.string(),
      title: z.string(),
      // ... other fields from per-tag YAML
    }))
  })
})
```

**Key benefits of the Nuxt Content `data` collection approach:**
- YAML files are parsed and indexed into SQLite at build time automatically
- `queryCollection('tags')` provides filtering, sorting, and pagination out of the box
- Type-safe via Zod schema validation
- Compatible with static generation (database is bundled as WASM SQLite for client-side navigation)
- No need for a separate YAML parsing step or runtime `yaml` package usage

**Key trade-off:** Data collections do NOT generate routes automatically (unlike `page` type). Routes must still be created via `src/pages/tags/[slug].vue`. However, this is the desired behavior since tag pages are custom views, not direct content rendering.

**Recommendation update:** Consider a **hybrid approach**:
- Master tag index converted to JSON at sync time (Pattern 1, for sidebar nav config)
- Per-tag YAML files registered as a Nuxt Content `data` collection (for queryable tag detail pages)

This gives the best of both worlds: fast synchronous sidebar loading AND queryable tag data for pages.

### Q4: Does the client need a new navigation UI for browsing by tag/category?

**Yes.** The `SidebarNav.vue` component currently shows two sections: "Playlists" and "Channels". A third section, "Tags" (or "Topics"), should be added. Given 99 tags, the sidebar would need:

- **Grouped by category**: Tags belong to categories like "AI & Machine Learning", "Web Development", etc. The sidebar should show category headers with tags nested underneath.
- **Collapsible sections**: With 99 tags across ~15 categories, collapsible category groups are essential.
- **Item counts**: Show the number of items per tag (data already available in the master index).
- **MobileNav**: The `MobileNav.vue` component also needs updating for tag browsing on mobile.

### Research Insights: Sidebar Information Architecture

**Architecture Strategist Analysis:**
The current sidebar is a flat list rendering 2 sections (Playlists, Channels) with ~10-15 items each. Adding 99 tags would increase the nav item count by 5-7x, fundamentally changing the component's complexity and scroll behavior.

**Code Simplicity Review:**
Adding collapsible category groups with nested tag lists inside `SidebarNav.vue` would make it a "fat component" mixing state management (collapse/expand), data fetching (tag config), and complex UI rendering. This violates the single-responsibility principle.

**Recommended approach:**
1. Do NOT show all 99 tags in the sidebar. Show only a "Topics" link to `/tags` overview page, plus optionally the top 5-10 most popular tags.
2. If collapsible category groups are desired, extract a `SidebarTagSection.vue` child component that owns the collapse state and tag list rendering.
3. The tags overview page (`/tags/index.vue`) becomes the primary browsing interface for all 99 tags grouped by category.

**Accessibility Requirements (WCAG 2.1 AA):**
- Collapsible sections need `aria-expanded="true|false"` on the toggle button
- Section content needs `id` matching `aria-controls` on the toggle
- Toggle must be focusable and operable via Enter/Space keys
- Expanded/collapsed state changes must be announced to screen readers
- Focus must remain on the toggle after state change (no focus jump)
- The sidebar `<nav>` element already has correct semantics; ensure `<section>` elements have `aria-labelledby` pointing to their headings

**UX Best Practice (UI/UX Pro Max):**
- Touch targets for collapse toggles: minimum 44x44px
- Use `transition: max-height 0.2s ease` for smooth collapse animation (NOT `height` -- avoids layout reflow)
- Respect `prefers-reduced-motion: reduce` by disabling collapse animations
- Item counts should use muted text color (`--color-base-shade-10`) to avoid visual noise
- Cursor pointer on all clickable/hoverable elements

## Proposed Solution

### Phase 1: Data Pipeline (Copy tags to client)

1. Create a `scripts/sync-tags.ts` script that reads tag index files from the scraper's output directory and writes them to `src/content/tags/` in the client.
2. Alternatively, integrate tag syncing into the existing `sync-all.ts` workflow.
3. Output: `src/content/tags/index.yml` and `src/content/tags/*.yml` (99 per-tag files) available in client repo.

**Files to create/modify:**
- `scripts/sync-tags.ts` (new)
- `package.json` (add `sync:tags` script)

### Research Insights: Data Pipeline Best Practices

**Content Migration Skill Guidance:**
The sync script should follow a manifest-based migration approach:
1. **Inventory**: List all source files in scraper `src/content/tags/`
2. **Verbatim copy**: Tag content must be preserved exactly as-is -- no field renaming, no data "improvement"
3. **Master index conversion**: Convert `index.yml` to `tags-index.json` at sync time for Pattern 1 static import
4. **Validation**: After sync, verify file count matches and content is parseable
5. **Idempotent**: Running sync twice should produce the same result

**Sync Script Architecture:**

```ts
// scripts/sync-tags.ts - recommended structure
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { parse as parseYaml } from 'yaml'

const SCRAPER_TAGS_DIR = resolve(__dirname, '../../ai-content-scraper/src/content/tags')
const CLIENT_TAGS_DIR = resolve(__dirname, '../src/content/tags')
const CLIENT_TAGS_JSON = resolve(__dirname, '../src/content/tags-index.json')

// 1. Validate source exists
// 2. Copy all .yml files verbatim
// 3. Convert index.yml -> tags-index.json for static import
// 4. Log results
```

**TypeScript Reviewer Concern:**
The sync script should define explicit types for the tag index data shape:

```ts
interface TagIndexEntry {
  slug: string
  name: string
  category: string
  itemCount: number
}

interface TagDetail {
  tag: string
  category: string
  items: Array<{
    videoId: string
    title: string
    channel: string
    publishedAt: string
    // ... match actual scraper output shape
  }>
}
```

**Risk: Stale data between scraper and client.** If the sync script is run manually rather than as part of CI/CD, tag indexes could reference video IDs that no longer exist in the client's summaries. Mitigation: the `useTagIndex` composable should cross-reference tag items against existing summaries and filter out stale references.

### Phase 2: Data Access Layer (Composables)

1. Create `src/composables/useTagsConfig.ts` -- loads `index.yml`, returns list of all tags grouped by category with counts.
2. Create `src/composables/useTagIndex.ts` -- loads a specific per-tag YAML file by slug, returns the items list.
3. Consider whether to use static imports (like channels/playlists) or Nuxt Content collections. Static imports are simpler since YAML files are not Markdown content pages.

**Files to create:**
- `src/composables/useTagsConfig.ts`
- `src/composables/useTagIndex.ts`

### Research Insights: Composable Design Patterns

**Pattern Recognition Analysis:**
The existing composables (`useChannelsConfig`, `usePlaylistsConfig`) follow an identical pattern:
1. Static import of JSON file
2. `ref()` wrapping the imported data
3. `pending` and `error` refs (always `false`/`null` for static imports -- included for API consistency)
4. `computed` for derived data (e.g., `enabledChannels`)
5. Getter functions (`getBySlug`, `getById`)

**The `useTagsConfig` composable should follow this exact pattern for consistency:**

```ts
// src/composables/useTagsConfig.ts
import tagsData from '~/content/tags-index.json'

export interface TagConfig {
  slug: string
  name: string
  category: string
  itemCount: number
}

export interface TagCategory {
  name: string
  tags: TagConfig[]
  totalItems: number
}

export function useTagsConfig() {
  const tags = ref<TagConfig[]>(tagsData as TagConfig[])
  const pending = ref(false)
  const error = ref<Error | null>(null)

  const tagsByCategory = computed<TagCategory[]>(() => {
    const categoryMap = new Map<string, TagConfig[]>()
    for (const tag of tags.value) {
      const existing = categoryMap.get(tag.category) || []
      existing.push(tag)
      categoryMap.set(tag.category, existing)
    }
    return Array.from(categoryMap.entries())
      .map(([name, categoryTags]) => ({
        name,
        tags: categoryTags.sort((a, b) => b.itemCount - a.itemCount),
        totalItems: categoryTags.reduce((sum, t) => sum + t.itemCount, 0)
      }))
      .sort((a, b) => b.totalItems - a.totalItems)
  })

  const getTagBySlug = (slug: string) =>
    tags.value.find(t => t.slug === slug)

  return { tags, tagsByCategory, pending, error, getTagBySlug }
}
```

**The `useTagIndex` composable uses a different pattern -- async data fetching:**
Since per-tag data is loaded on-demand (not all 99 files at once), this should use Nuxt Content `queryCollection` if the `data` collection approach is adopted, or a server route that reads and parses the YAML file.

**Option A: Nuxt Content data collection (recommended):**
```ts
// src/composables/useTagIndex.ts
export function useTagIndex(slug: MaybeRefOrGetter<string>) {
  const resolvedSlug = computed(() => toValue(slug))
  const key = computed(() => `tag-index:${resolvedSlug.value}`)

  const { data, pending, error } = useAsyncData(
    key.value,
    () => queryCollection('tags')
      .where('stem', '=', resolvedSlug.value)
      .first()
  )

  return { data, pending, error }
}
```

**Option B: Server route with YAML parsing:**
```ts
// src/server/api/tags/[slug].get.ts
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const filePath = resolve('src/content/tags', `${slug}.yml`)
  const content = readFileSync(filePath, 'utf-8')
  return parse(content)
})
```

**Vue Best Practices Considerations:**
- Keep composable APIs small, typed, and predictable
- Use `MaybeRefOrGetter<string>` for slug parameter to support both static and reactive usage
- Return a flat object with `data`, `pending`, `error` for consistency with existing composables
- Derive everything possible with `computed` -- avoid redundant state

**Presentation/Logic Split:**
The tag detail page (`tags/[slug].vue`) should NOT contain data fetching logic directly. Follow the existing pattern in `channels/[slug].vue` where the page component calls composables and passes results to presentation components (`DateGroupedFeed`). The page acts as the integration layer.

### Phase 3: Pages

1. Create `src/pages/tags/[slug].vue` -- tag detail page showing all content items for a tag, using `DateGroupedFeed`.
2. Optionally create `src/pages/tags/index.vue` -- tag overview/browse page showing all tags grouped by category.

**Files to create:**
- `src/pages/tags/[slug].vue`
- `src/pages/tags/index.vue` (optional)

### Research Insights: Page Implementation

**Existing Page Pattern Analysis:**
Both `channels/[slug].vue` and `playlists/[slug].vue` follow a consistent structure:
1. `definePageMeta({ hero: false, footer: false })`
2. Composable calls for config + content data
3. Computed properties for display name, empty state, 404 detection
4. `useHead()` for page title
5. Template with loading/404/empty/content states
6. `DateGroupedFeed` for the content list

**The `tags/[slug].vue` page should replicate this pattern exactly:**

```vue
<script setup lang="ts">
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useTagIndex } from '~/composables/useTagIndex'
import { useDateGroups } from '~/composables/useDateGroups'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

definePageMeta({ hero: false, footer: false })

const { getTagBySlug } = useTagsConfig()
const tagConfig = computed(() => getTagBySlug(slug.value))

// 404 if tag not in config
if (!tagConfig.value) {
  throw createError({ statusCode: 404, message: 'Tag not found' })
}

const { data: tagData, pending } = useTagIndex(slug)
const summaries = computed(() => tagData.value?.items || [])
const { segments } = useDateGroups(summaries)

useHead({
  title: `${tagConfig.value.name} | YouTube Summaries`
})
</script>
```

**Critical edge case -- `DateGroupedFeed` data shape compatibility:**
The `DateGroupedFeed` component renders `SummaryCard` for each item and uses `item.metadata?.videoId` as the key. Tag index items from the scraper may have a different shape (e.g., `item.videoId` directly, not nested under `metadata`). The composable or page must map tag index items to the shape expected by `DateGroupedFeed`/`SummaryCard`, OR the tag detail page should cross-reference tag items against the summaries collection to get full summary objects.

**Recommended approach:** Use tag index items only as a filter (list of video IDs), then query the summaries collection filtered by those IDs. This ensures `SummaryCard` receives the full summary object it expects:

```ts
const { data: allSummaries } = useContentStream('summaries')
const tagVideoIds = computed(() => new Set(tagData.value?.items.map(i => i.videoId) || []))
const filteredSummaries = computed(() =>
  (allSummaries.value || []).filter(s => tagVideoIds.value.has(s.metadata?.videoId))
)
const { segments } = useDateGroups(filteredSummaries)
```

**Tags overview page (`/tags/index.vue`):**
This should be a required page, not optional. It serves as the primary tag browsing interface, reducing sidebar complexity. Show all 99 tags grouped by category with item counts.

**SEO Considerations:**
- Each tag page should have a unique `<title>` and `<meta name="description">` with the tag name and category
- Consider adding `CollectionPage` schema.org structured data to tag pages
- Tag overview page should have a descriptive title like "Browse by Topic | YouTube Summaries"
- URLs are already clean (`/tags/ai-coding`) which is ideal for SEO

### Phase 4: Navigation UI

1. Add a "Topics" or "Tags" section to `SidebarNav.vue` with collapsible category groups.
2. Update `MobileNav.vue` to include tag navigation.
3. Consider adding tag chips to the summary detail page (`summaries/[slug].vue`) once per-summary tag data is available in the client frontmatter.

**Files to modify:**
- `src/components/content/SidebarNav.vue`
- `src/components/content/MobileNav.vue`
- `src/pages/summaries/[slug].vue` (optional tag chips)

### Research Insights: Navigation UI Implementation

**Architecture Decision -- Sidebar Simplicity vs. Tag Density:**

The current `SidebarNav.vue` is a clean, simple component with ~115 lines. Adding collapsible category groups with 99 tags would at minimum triple its complexity. Two viable approaches:

**Approach A: Minimal sidebar addition (recommended)**
Add a single "Topics" link to `/tags` and optionally show top 5 tags by item count:

```vue
<section class="sidebar-section">
  <h3 class="sidebar-heading">
    <NuxtLink to="/tags" class="sidebar-heading-link">Topics</NuxtLink>
  </h3>
  <ul class="sidebar-list">
    <li v-for="tag in topTags" :key="tag.slug">
      <NuxtLink :to="`/tags/${tag.slug}`" class="sidebar-link" active-class="sidebar-link--active">
        {{ useTruncate(tag.name, 20) }}
        <span class="sidebar-count">{{ tag.itemCount }}</span>
      </NuxtLink>
    </li>
    <li v-if="tags.length > 5">
      <NuxtLink to="/tags" class="sidebar-link sidebar-link--see-all">
        See all {{ tags.length }} topics
      </NuxtLink>
    </li>
  </ul>
</section>
```

**Approach B: Collapsible categories (higher complexity)**
Extract to a dedicated `SidebarTagSection.vue` component:
- Owns its own collapse state per category (`Map<string, boolean>`)
- Toggle buttons with `aria-expanded` and `aria-controls`
- Keyboard accessible (Enter/Space to toggle)
- Respects `prefers-reduced-motion` for collapse animation

**Frontend Race Condition Warning (Julik Review):**
If the sidebar shows tags loaded asynchronously (e.g., from a data collection), there is a timing concern: the sidebar renders before tag data is available, then re-renders when data arrives, causing layout shift. Mitigate by:
- Using synchronous static import for tag config (Pattern 1) so data is available immediately
- If async loading is unavoidable, reserve space with a skeleton placeholder or CSS `min-height`

**MobileNav.vue Updates:**
The mobile nav currently mirrors the sidebar structure. Apply the same "minimal" or "collapsible" approach. If using collapsible categories on mobile, ensure 44x44px touch targets and swipe-friendly scroll within the sheet.

**Accessibility Checklist for Nav Updates:**
- [ ] All new `<section>` elements have `aria-labelledby` pointing to their heading
- [ ] "See all topics" link has descriptive text (not just "See all")
- [ ] Tag count badges are either `aria-hidden` (decorative) or wrapped in visually-hidden text like "42 items"
- [ ] Focus order follows visual order (topics section after channels)
- [ ] On mobile nav, tag section is keyboard-accessible within the slide-out sheet
- [ ] Escape key still closes mobile nav (already implemented)

## Technical Considerations

### YAML Loading Strategy

The client currently loads JSON via static imports (`import channelsData from '~/content/channels.json'`). YAML files need either:
- **Option A**: Convert tag indexes to JSON at sync time (simplest, consistent with existing pattern).
- **Option B**: Use `yaml` npm package (already a dependency at `^2.8.2`) to parse YAML at runtime.
- **Option C**: Register as Nuxt Content collection with custom schema.

**Recommendation**: Option A (convert to JSON at sync time) for the master index, since it parallels `channels.json` / `playlists.json`. For per-tag files, Option B (runtime YAML parse via server route or composable) avoids generating 99 JSON files.

### Research Insights: YAML Loading Strategy Resolution

**Updated recommendation after deep research:**

The optimal approach is a **hybrid of Option A + Option C**:

| Data | Strategy | Rationale |
|---|---|---|
| Master tag index | **Option A**: Convert to `tags-index.json` at sync time | Mirrors `channels.json`/`playlists.json` pattern. Synchronous import for sidebar nav. No async loading delay. |
| Per-tag YAML files | **Option C**: Register as Nuxt Content `data` collection | Native YAML parsing, SQL-backed queries, type-safe schema, compatible with static generation. Eliminates need for runtime `yaml` package or custom server routes. |

**Why NOT Option B (runtime YAML parsing) for per-tag files:**
- Adds runtime dependency on the `yaml` package in client bundle
- Requires custom server routes to read files from disk
- No query/filter capabilities -- must load entire file then filter in JS
- Not compatible with static generation without explicit server route prerendering

**Nuxt Content data collection registration:**

```ts
// content.config.ts - add to existing config
tags: defineCollection({
  type: 'data',
  source: {
    include: 'tags/*.yml',
    exclude: ['tags/index.yml'], // Master index handled separately as JSON
    cwd: contentDir
  },
  schema: z.object({
    tag: z.string(),
    category: z.string(),
    items: z.array(z.object({
      videoId: z.string(),
      title: z.string(),
      channel: z.string(),
      channelId: z.string().optional(),
      publishedAt: z.string(),
      thumbnailUrl: z.string().optional()
    }))
  })
})
```

**Performance Oracle Assessment:**
- 99 YAML files at 5-10KB each = 500KB-1MB total tag data
- Nuxt Content indexes this into SQLite at build time -- O(1) per-query after indexing
- The WASM SQLite bundle adds ~200KB to the client (already included if `@nuxt/content` is used)
- `queryCollection('tags').where('stem', '=', slug).first()` is an indexed lookup -- fast
- The master JSON index for sidebar is ~15-20KB -- negligible bundle impact

### Static Generation Compatibility

The client uses `nitro: { preset: 'static' }` with `prerender: { crawlLinks: true }`. Tag pages need to be discoverable by the crawler or explicitly listed in prerender routes. Since tag links will appear in the sidebar, `crawlLinks` should handle discovery automatically.

### Research Insights: Static Generation Risks

**Critical risk identified:** If the sidebar shows only top 5 tags (Approach A from the nav section), `crawlLinks` will only discover those 5 tag pages. The remaining 94 tag pages would NOT be prerendered.

**Mitigation options:**

1. **Explicit prerender routes (recommended):** Generate the full list of tag routes in `nuxt.config.ts`:

```ts
// nuxt.config.ts
import tagsIndex from './src/content/tags-index.json'

export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/feed.xml',
        '/digest.xml',
        '/sitemap.xml',
        '/tags',
        ...tagsIndex.map(tag => `/tags/${tag.slug}`)
      ]
    }
  }
})
```

2. **Tags overview page links:** If `/tags/index.vue` links to ALL 99 tags, and the sidebar links to `/tags`, then `crawlLinks` will discover them in two hops (sidebar -> /tags -> /tags/:slug). This works but adds build-time crawl depth.

3. **Programmatic prerender hook:** Use the `prerender:routes` Nitro hook:

```ts
// nuxt.config.ts
hooks: {
  'prerender:routes': function ({ routes }) {
    // Read tags-index.json and add all tag routes
    const tagsIndex = JSON.parse(readFileSync('src/content/tags-index.json', 'utf-8'))
    for (const tag of tagsIndex) {
      routes.add(`/tags/${tag.slug}`)
    }
  }
}
```

**Recommendation:** Use option 1 (explicit routes in config) as the primary approach, with option 2 as a natural fallback. This is the most reliable and transparent approach.

**Build time projection:**
- Current: ~N pages (channels + playlists + summaries)
- Added: 100 pages (1 overview + 99 tag pages)
- Each tag page is lightweight (no markdown rendering, just filtering summaries)
- Estimated build time increase: 10-20 seconds (acceptable)

### Per-Summary Tags in Client

Currently, client summary frontmatter does **not** include `tags`. The scraper's summaries have `tags:` in their frontmatter, but the client's copies do not (likely older copies pre-dating the tag synthesis feature). Two options:
- Backfill tags into client summary frontmatter (requires re-syncing summaries from scraper).
- Only use the per-tag index files for navigation (tag -> summaries mapping) without per-summary tag display. This is sufficient for Phase 1.

### Research Insights: Per-Summary Tag Backfill

**Content Migration Guidance:**
If backfilling tags into summary frontmatter, the sync process must:
1. Read the scraper's summary markdown files
2. Extract only the `tags` field from frontmatter
3. Inject it into the client's corresponding summary file frontmatter
4. Preserve ALL other content verbatim (do not modify body text, other frontmatter fields, etc.)

**Impact on content.config.ts:**
Adding `tags` to summary frontmatter requires updating the schema:

```ts
// Add to summaries collection schema
tags: z.array(z.string()).optional().default([])
```

**Recommendation:** Defer backfill to Phase 2. For Phase 1, use per-tag index files for tag->summary mapping. This avoids modifying 200+ summary files and keeps the initial implementation focused.

## Acceptance Criteria

- [ ] Tag index files (`index.yml` + per-tag YMLs) are available in client `src/content/tags/`
- [ ] Master tag index converted to `tags-index.json` for static import
- [ ] `useTagsConfig()` composable returns all tags with categories and counts
- [ ] `useTagIndex(slug)` composable returns items for a specific tag
- [ ] `/tags` overview page shows all tags grouped by category
- [ ] `/tags/:slug` page renders filtered content using `DateGroupedFeed`
- [ ] Tag detail pages correctly cross-reference tag items against existing summaries
- [ ] `SidebarNav` shows a "Topics" section with link to overview + top tags
- [ ] `MobileNav` includes tag navigation
- [ ] Static generation (`npm run generate`) successfully prerenders ALL tag pages (verify count = 100)
- [ ] No regression in existing channel/playlist navigation
- [ ] Sidebar tag section is keyboard accessible (Tab, Enter/Space)
- [ ] Tag pages have proper `<title>` and `<meta description>` for SEO
- [ ] Graceful fallback: Tags section hidden if no tag data available

## Dependencies & Risks

| Dependency | Risk | Mitigation |
|---|---|---|
| Tag data only exists in scraper repo | Build fails if tags not synced | Graceful fallback: hide Tags section if no tag data |
| 99 tag files could slow static generation | Build time increase | Monitor; per-tag YAML is small (~5-10KB each); estimated +10-20s |
| Summary frontmatter in client lacks `tags` field | Cannot show tags on summary detail page | Defer per-summary tag display to later phase |
| Sidebar gets crowded with 99 tags | Poor UX | Show only top 5 tags + "See all" link; dedicated overview page |
| Tag index references stale video IDs | Broken links or missing summaries on tag pages | Cross-reference tag items against existing summaries; filter stale refs |
| `crawlLinks` may not discover all tag pages | Unprerendered tag pages return 404 in production | Explicit prerender routes in `nuxt.config.ts` from `tags-index.json` |
| `DateGroupedFeed` expects specific item shape | Tag items may have different shape than summaries | Map tag items to summary objects via videoId cross-reference |
| Nuxt Content `data` collection for YAML | Schema mismatch if scraper changes tag format | Validate with Zod schema; sync script should check shape |

## Open Questions

1. **Sync mechanism**: Should tag indexes be committed to the client repo (like `channels.json`), or copied at build time from a shared location? The current architecture has summaries committed directly -- are tags the same?
2. ~~**Tag data format in client**: Convert to JSON at sync time, or keep as YAML and parse at runtime?~~ **Resolved:** Hybrid approach -- master index as JSON (static import), per-tag files as Nuxt Content `data` collection.
3. **Navigation density**: With ~15 categories and 99 tags, should the sidebar show all tags or just top-level categories (with tags on a dedicated browse page)? **Recommendation:** Show top 5 tags + "See all" link; dedicated browse page for full listing.
4. **Per-summary tags**: Should we backfill `tags` into client summary frontmatter now, or defer? This affects whether tag chips can appear on the summary detail page. **Recommendation:** Defer to Phase 2.
5. ~~**Content.config.ts**: Should `tags` be a Nuxt Content collection, or loaded outside the content system via static imports/server routes?~~ **Resolved:** Register per-tag YAML files as `data` collection; master index as static JSON import.

## Sources & References

### Internal References

- Channel config pattern: `src/composables/useChannelsConfig.ts`
- Playlist config pattern: `src/composables/usePlaylistsConfig.ts`
- Content stream composable: `src/composables/useContentStream.ts`
- Sidebar navigation: `src/components/content/SidebarNav.vue`
- Content collections config: `content.config.ts`
- Tag index generator (scraper): `ai-content-scraper/src/server/services/tag-index-generator.service.ts`
- Per-tag index format: `ai-content-scraper/src/content/tags/ai-coding.yml`
- Connections schema (scraper, not used by client): `ai-content-scraper/src/types/connections.ts`

### External References

- [Nuxt Content v3 -- Collections (data type)](https://content.nuxt.com/docs/collections/collections)
- [Nuxt Content v3 -- YAML Files](https://content.nuxt.com/docs/files/yaml)
- [Nuxt Content v3 -- Static Hosting](https://content.nuxt.com/docs/deploy/static)
- [Nuxt Content v3 -- Query Collection](https://content.nuxt.com/docs/querying/query-collection)
- [WCAG 2.1 Quick Reference -- Operable](https://www.w3.org/WAI/WCAG21/quickref/#operable)
- [WAI-ARIA Authoring Practices -- Disclosure (Show/Hide)](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
