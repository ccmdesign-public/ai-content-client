---
title: "feat: Verify and update client app to consume tag indexes"
type: feat
status: active
date: 2026-03-01
---

# feat: Verify and update client app to consume tag indexes

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

### Q4: Does the client need a new navigation UI for browsing by tag/category?

**Yes.** The `SidebarNav.vue` component currently shows two sections: "Playlists" and "Channels". A third section, "Tags" (or "Topics"), should be added. Given 99 tags, the sidebar would need:

- **Grouped by category**: Tags belong to categories like "AI & Machine Learning", "Web Development", etc. The sidebar should show category headers with tags nested underneath.
- **Collapsible sections**: With 99 tags across ~15 categories, collapsible category groups are essential.
- **Item counts**: Show the number of items per tag (data already available in the master index).
- **MobileNav**: The `MobileNav.vue` component also needs updating for tag browsing on mobile.

## Proposed Solution

### Phase 1: Data Pipeline (Copy tags to client)

1. Create a `scripts/sync-tags.ts` script that reads tag index files from the scraper's output directory and writes them to `src/content/tags/` in the client.
2. Alternatively, integrate tag syncing into the existing `sync-all.ts` workflow.
3. Output: `src/content/tags/index.yml` and `src/content/tags/*.yml` (99 per-tag files) available in client repo.

**Files to create/modify:**
- `scripts/sync-tags.ts` (new)
- `package.json` (add `sync:tags` script)

### Phase 2: Data Access Layer (Composables)

1. Create `src/composables/useTagsConfig.ts` -- loads `index.yml`, returns list of all tags grouped by category with counts.
2. Create `src/composables/useTagIndex.ts` -- loads a specific per-tag YAML file by slug, returns the items list.
3. Consider whether to use static imports (like channels/playlists) or Nuxt Content collections. Static imports are simpler since YAML files are not Markdown content pages.

**Files to create:**
- `src/composables/useTagsConfig.ts`
- `src/composables/useTagIndex.ts`

### Phase 3: Pages

1. Create `src/pages/tags/[slug].vue` -- tag detail page showing all content items for a tag, using `DateGroupedFeed`.
2. Optionally create `src/pages/tags/index.vue` -- tag overview/browse page showing all tags grouped by category.

**Files to create:**
- `src/pages/tags/[slug].vue`
- `src/pages/tags/index.vue` (optional)

### Phase 4: Navigation UI

1. Add a "Topics" or "Tags" section to `SidebarNav.vue` with collapsible category groups.
2. Update `MobileNav.vue` to include tag navigation.
3. Consider adding tag chips to the summary detail page (`summaries/[slug].vue`) once per-summary tag data is available in the client frontmatter.

**Files to modify:**
- `src/components/content/SidebarNav.vue`
- `src/components/content/MobileNav.vue`
- `src/pages/summaries/[slug].vue` (optional tag chips)

## Technical Considerations

### YAML Loading Strategy

The client currently loads JSON via static imports (`import channelsData from '~/content/channels.json'`). YAML files need either:
- **Option A**: Convert tag indexes to JSON at sync time (simplest, consistent with existing pattern).
- **Option B**: Use `yaml` npm package (already a dependency at `^2.8.2`) to parse YAML at runtime.
- **Option C**: Register as Nuxt Content collection with custom schema.

**Recommendation**: Option A (convert to JSON at sync time) for the master index, since it parallels `channels.json` / `playlists.json`. For per-tag files, Option B (runtime YAML parse via server route or composable) avoids generating 99 JSON files.

### Static Generation Compatibility

The client uses `nitro: { preset: 'static' }` with `prerender: { crawlLinks: true }`. Tag pages need to be discoverable by the crawler or explicitly listed in prerender routes. Since tag links will appear in the sidebar, `crawlLinks` should handle discovery automatically.

### Per-Summary Tags in Client

Currently, client summary frontmatter does **not** include `tags`. The scraper's summaries have `tags:` in their frontmatter, but the client's copies do not (likely older copies pre-dating the tag synthesis feature). Two options:
- Backfill tags into client summary frontmatter (requires re-syncing summaries from scraper).
- Only use the per-tag index files for navigation (tag -> summaries mapping) without per-summary tag display. This is sufficient for Phase 1.

## Acceptance Criteria

- [ ] Tag index files (`index.yml` + per-tag YMLs) are available in client `src/content/tags/`
- [ ] `useTagsConfig()` composable returns all tags with categories and counts
- [ ] `useTagIndex(slug)` composable returns items for a specific tag
- [ ] `/tags/:slug` page renders filtered content using `DateGroupedFeed`
- [ ] `SidebarNav` shows a "Topics" section with tags grouped by category
- [ ] `MobileNav` includes tag navigation
- [ ] Static generation (`npm run generate`) successfully prerenders tag pages
- [ ] No regression in existing channel/playlist navigation

## Dependencies & Risks

| Dependency | Risk | Mitigation |
|---|---|---|
| Tag data only exists in scraper repo | Build fails if tags not synced | Graceful fallback: hide Tags section if no tag data |
| 99 tag files could slow static generation | Build time increase | Monitor; per-tag YAML is small (~5-10KB each) |
| Summary frontmatter in client lacks `tags` field | Cannot show tags on summary detail page | Defer per-summary tag display to later phase |
| Sidebar gets crowded with 99 tags | Poor UX | Collapsible category groups; show top N tags with "show all" |

## Open Questions

1. **Sync mechanism**: Should tag indexes be committed to the client repo (like `channels.json`), or copied at build time from a shared location? The current architecture has summaries committed directly -- are tags the same?
2. **Tag data format in client**: Convert to JSON at sync time, or keep as YAML and parse at runtime?
3. **Navigation density**: With ~15 categories and 99 tags, should the sidebar show all tags or just top-level categories (with tags on a dedicated browse page)?
4. **Per-summary tags**: Should we backfill `tags` into client summary frontmatter now, or defer? This affects whether tag chips can appear on the summary detail page.
5. **Content.config.ts**: Should `tags` be a Nuxt Content collection, or loaded outside the content system via static imports/server routes?

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
