<script setup lang="ts">
import { usePlaylistsConfig } from '~/composables/usePlaylistsConfig'
import { useChannelsConfig } from '~/composables/useChannelsConfig'
import { useTruncate } from '~/composables/useTruncate'

const { enabledPlaylists } = usePlaylistsConfig()
const { enabledChannels } = useChannelsConfig()
</script>

<template>
  <aside class="w-64 p-4 border-r border-border h-screen overflow-y-auto overflow-x-hidden bg-background sticky top-0 self-start">
    <nav>
      <NuxtLink
        to="/"
        class="block mb-2 py-1 px-2 rounded text-foreground font-medium hover:bg-muted"
        active-class="text-primary bg-primary/10"
      >
        All Summaries
      </NuxtLink>

      <section class="mb-6">
        <h3 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 px-2">Playlists</h3>
        <ul class="list-none p-0 m-0">
          <li v-for="playlist in enabledPlaylists" :key="playlist.id">
            <NuxtLink
              :to="`/playlists/${playlist.slug}`"
              class="block py-1 px-2 rounded text-sm text-foreground hover:bg-muted"
              active-class="text-primary bg-primary/10 font-medium"
            >
              {{ useTruncate(playlist.name, 24) }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section class="mb-6">
        <h3 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 px-2">Channels</h3>
        <ul class="list-none p-0 m-0">
          <li v-for="channel in enabledChannels" :key="channel.slug">
            <NuxtLink
              :to="`/channels/${channel.slug}`"
              class="block py-1 px-2 rounded text-sm text-foreground hover:bg-muted"
              active-class="text-primary bg-primary/10 font-medium"
            >
              {{ useTruncate(channel.name, 20) }}
            </NuxtLink>
          </li>
        </ul>
      </section>
    </nav>
  </aside>
</template>
