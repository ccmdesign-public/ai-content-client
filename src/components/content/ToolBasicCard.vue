<script setup lang="ts">
import type { MasterclassIndexEntry } from '~/types/masterclass'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, ExternalLink } from 'lucide-vue-next'

defineProps<{
  entry: MasterclassIndexEntry
}>()
</script>

<template>
  <Card class="opacity-75">
    <CardHeader class="pb-2">
      <div class="flex items-center justify-between gap-2">
        <h3 class="font-semibold text-base line-clamp-1">{{ entry.name }}</h3>
        <Badge variant="secondary" class="shrink-0 text-xs">Tool</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p v-if="entry.description" class="text-sm text-muted-foreground line-clamp-2 mb-3">
        {{ entry.description }}
      </p>
      <div class="flex items-center gap-3 text-xs text-muted-foreground">
        <span v-if="entry.videoCount" class="flex items-center gap-1">
          {{ entry.videoCount }} videos
        </span>
        <span v-if="entry.stars" class="flex items-center gap-1">
          <Star class="size-3" aria-hidden="true" />
          {{ entry.stars.toLocaleString() }}
        </span>
        <a
          v-if="entry.website"
          :href="entry.website"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-primary hover:underline"
          :aria-label="`${entry.name} website (opens in new tab)`"
          @click.stop
        >
          <ExternalLink class="size-3" aria-hidden="true" />
          Website
        </a>
      </div>
      <p class="text-xs text-muted-foreground/60 mt-2 italic">No masterclass yet</p>
    </CardContent>
  </Card>
</template>
