<script setup lang="ts">
import { usePlaylistsConfig } from '~/composables/usePlaylistsConfig'
import { useChannelsConfig } from '~/composables/useChannelsConfig'
import { useTruncate } from '~/composables/useTruncate'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const route = useRoute()
const isOpen = ref(false)

const { enabledPlaylists } = usePlaylistsConfig()
const { enabledChannels } = useChannelsConfig()

watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<template>
  <div class="md:hidden fixed bottom-4 right-4 z-50">
    <Sheet v-model:open="isOpen">
      <SheetTrigger as-child>
        <Button
          size="icon"
          class="w-14 h-14 rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" class="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div class="mt-6">
          <NuxtLink
            to="/"
            class="block py-2 px-3 rounded-md text-foreground font-medium hover:bg-muted mb-3"
            active-class="text-primary bg-primary/10"
          >
            All Summaries
          </NuxtLink>

          <section class="mb-6">
            <h3 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 px-3">Playlists</h3>
            <ul class="list-none p-0 m-0">
              <li v-for="playlist in enabledPlaylists" :key="playlist.id">
                <NuxtLink
                  :to="`/playlists/${playlist.slug}`"
                  class="block py-2 px-3 rounded-md text-foreground hover:bg-muted"
                  active-class="text-primary bg-primary/10 font-medium"
                >
                  {{ useTruncate(playlist.name, 30) }}
                </NuxtLink>
              </li>
            </ul>
          </section>

          <section class="mb-6">
            <h3 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 px-3">Channels</h3>
            <ul class="list-none p-0 m-0">
              <li v-for="channel in enabledChannels" :key="channel.slug">
                <NuxtLink
                  :to="`/channels/${channel.slug}`"
                  class="block py-2 px-3 rounded-md text-foreground hover:bg-muted"
                  active-class="text-primary bg-primary/10 font-medium"
                >
                  {{ useTruncate(channel.name, 30) }}
                </NuxtLink>
              </li>
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
