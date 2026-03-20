<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'
import { ArrowRight } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'

const props = defineProps<{
  issue: {
    stem: string
    path: string
    subjectLine: string
    publishedAt: string
    featuredPicks: Array<{ title: string }>
    quickLinks: Array<{ title: string }>
  }
}>()

// stem is "newsletters/2026-03-19", we need just "2026-03-19"
const issueSlug = computed(() => props.issue.stem.replace(/^newsletters\//, ''))
</script>

<template>
  <article class="border-t border-border last:border-b">
    <NuxtLink
      :to="`/issues/${issueSlug}`"
      class="group flex items-center gap-4 py-5 px-2 no-underline text-inherit transition-colors hover:bg-muted motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded"
    >
      <div class="flex-1 min-w-0">
        <h3 class="m-0 mb-1.5 text-[1.0625rem] font-semibold leading-relaxed text-foreground">
          {{ issue.subjectLine }}
        </h3>
        <div class="flex items-center gap-3 flex-wrap">
          <time class="text-[0.8125rem] text-muted-foreground" :datetime="issue.publishedAt">
            {{ formatDate(issue.publishedAt, 'MMMM d, yyyy') }}
          </time>
          <div class="flex gap-2">
            <Badge v-if="issue.featuredPicks?.length" variant="secondary">
              {{ issue.featuredPicks.length }} featured
            </Badge>
            <Badge v-if="issue.quickLinks?.length" variant="secondary">
              {{ issue.quickLinks.length }} quick links
            </Badge>
          </div>
        </div>
      </div>
      <ArrowRight
        class="size-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transition-none"
        aria-hidden="true"
      />
    </NuxtLink>
  </article>
</template>
