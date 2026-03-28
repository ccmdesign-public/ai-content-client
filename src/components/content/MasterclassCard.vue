<script setup lang="ts">
import type { MasterclassIndexEntry } from '~/types/masterclass'
import { CATEGORY_LABELS } from '~/types/masterclass'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { FileText, Star } from 'lucide-vue-next'

defineProps<{
  entry: MasterclassIndexEntry
}>()
</script>

<template>
  <Card class="transition-colors hover:border-primary/50">
    <NuxtLink :to="`/masterclasses/${entry.slug}`" class="block no-underline text-foreground">
      <CardHeader class="pb-2">
        <div class="flex items-center justify-between gap-2">
          <h3 class="font-semibold text-base line-clamp-1">{{ entry.name }}</h3>
          <Badge variant="outline" class="shrink-0 text-xs">
            {{ CATEGORY_LABELS[entry.category] }}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p v-if="entry.tldr" class="text-sm text-muted-foreground line-clamp-2 mb-3">
          {{ entry.tldr }}
        </p>
        <p v-else-if="entry.description" class="text-sm text-muted-foreground line-clamp-2 mb-3">
          {{ entry.description }}
        </p>
        <div class="flex items-center gap-3 text-xs text-muted-foreground">
          <span v-if="entry.sourceCount" class="flex items-center gap-1">
            <FileText class="size-3" aria-hidden="true" />
            {{ entry.sourceCount }} sources
          </span>
          <span v-if="entry.stars" class="flex items-center gap-1">
            <Star class="size-3" aria-hidden="true" />
            {{ entry.stars.toLocaleString() }}
          </span>
          <span v-if="entry.videoCount" class="flex items-center gap-1">
            {{ entry.videoCount }} videos
          </span>
        </div>
      </CardContent>
    </NuxtLink>
  </Card>
</template>
