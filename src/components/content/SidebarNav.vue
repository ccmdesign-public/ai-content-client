<script setup lang="ts">
import { usePlaylistsConfig } from '~/composables/usePlaylistsConfig'
import { useChannelsConfig } from '~/composables/useChannelsConfig'
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useTruncate } from '~/composables/useTruncate'

const { enabledPlaylists } = usePlaylistsConfig()
const { enabledChannels } = useChannelsConfig()
const { tags, topTags } = useTagsConfig()
</script>

<template>
  <aside class="sidebar-nav">
    <nav>
      <section class="sidebar-section">
        <h3 class="sidebar-heading">Playlists</h3>
        <ul class="sidebar-list">
          <li v-for="playlist in enabledPlaylists" :key="playlist.id">
            <NuxtLink
              :to="`/playlists/${playlist.slug}`"
              class="sidebar-link"
              active-class="sidebar-link--active"
            >
              {{ useTruncate(playlist.name, 24) }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section class="sidebar-section">
        <h3 class="sidebar-heading">Channels</h3>
        <ul class="sidebar-list">
          <li v-for="channel in enabledChannels" :key="channel.slug">
            <NuxtLink
              :to="`/channels/${channel.slug}`"
              class="sidebar-link"
              active-class="sidebar-link--active"
            >
              {{ useTruncate(channel.name, 20) }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section v-if="topTags.length > 0" class="sidebar-section" aria-labelledby="sidebar-topics-heading">
        <h3 id="sidebar-topics-heading" class="sidebar-heading">
          <NuxtLink to="/tags" class="sidebar-heading-link">Topics</NuxtLink>
        </h3>
        <ul class="sidebar-list">
          <li v-for="tag in topTags" :key="tag.slug">
            <NuxtLink
              :to="`/tags/${tag.slug}`"
              class="sidebar-link"
              active-class="sidebar-link--active"
            >
              {{ useTruncate(tag.name, 20) }}
              <span class="sidebar-count" aria-hidden="true">{{ tag.itemCount }}</span>
            </NuxtLink>
          </li>
          <li v-if="tags.length > 5">
            <NuxtLink to="/tags" class="sidebar-link sidebar-link--see-all">
              See all {{ tags.length }} topics
            </NuxtLink>
          </li>
        </ul>
      </section>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar-nav {
  width: 250px;
  padding: 1.3125rem;
  border-right: 1px solid var(--border);
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--background);
  position: sticky;
  top: 0;
  align-self: flex-start;
}

.sidebar-section {
  margin-bottom: 1.75rem;
}

.sidebar-heading {
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--muted-foreground);
  margin-bottom: 0.6875rem;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-link {
  display: block;
  color: var(--foreground);
  text-decoration: none;
  font-size: 0.875rem;
}

.sidebar-link:hover {
  background: var(--accent);
}

.sidebar-link--active {
  background: var(--accent);
  color: var(--primary);
  font-weight: 500;
}

.sidebar-heading-link {
  color: inherit;
  text-decoration: none;
}

.sidebar-heading-link:hover {
  color: var(--primary);
}

.sidebar-count {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--muted-foreground);
}

.sidebar-link--see-all {
  font-style: italic;
  color: var(--primary);
}
</style>
