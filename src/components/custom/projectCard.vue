<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useTruncate } from '~/composables/useTruncate'
import { useSlugify } from '~/composables/useSlugify'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface ProjectData {
  title: string
  description?: string
  thumbnail?: string
  slug?: string
  github_url?: string
  live_url?: string
  tech_stack?: string[]
  featured?: boolean
}

const props = defineProps({
  content: {
    type: Object as PropType<ProjectData>,
    required: true,
    validator: (value: ProjectData) => !!value.title
  },
  size: {
    type: String as PropType<'s' | 'm' | 'l' | 'xl'>,
    default: 'l'
  },
  variant: {
    type: String as PropType<'default' | 'minimal' | 'featured'>,
    default: null
  }
})

const truncatedDescription = computed(() => {
  const description = props.content.description || 'No description available'
  return useTruncate(description, 120)
})

const { slugify } = useSlugify()
const computedLink = computed(() => {
  return props.content.slug || `/projects/${slugify(props.content.title)}`
})

const isFeatured = computed(() => {
  return props.variant === 'featured' || props.content.featured
})
</script>

<template>
  <NuxtLink
    :to="computedLink"
    :aria-label="content.title"
    class="block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
  >
    <Card
      :class="[
        'overflow-hidden transition-shadow hover:shadow-md',
        isFeatured && 'border-2 border-primary'
      ]"
    >
      <!-- Thumbnail -->
      <div class="relative w-full aspect-video bg-muted flex items-center justify-center overflow-hidden">
        <img
          v-if="content.thumbnail"
          :src="content.thumbnail"
          :alt="content.title"
          class="w-full h-full object-cover"
        />
        <div v-else class="text-4xl font-bold text-muted-foreground">
          {{ content.title?.charAt(0) || 'P' }}
        </div>

        <!-- Featured badge -->
        <span
          v-if="content.featured"
          class="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide"
        >
          Featured
        </span>
      </div>

      <CardHeader class="pb-2">
        <h3 class="text-base font-bold text-foreground">{{ content.title }}</h3>
      </CardHeader>

      <CardContent class="pt-0">
        <p class="text-sm text-muted-foreground leading-relaxed">
          {{ truncatedDescription }}
        </p>

        <!-- Tech stack badges -->
        <div v-if="content.tech_stack?.length" class="flex flex-wrap gap-1 mt-3">
          <span
            v-for="tech in content.tech_stack.slice(0, 3)"
            :key="tech"
            class="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs font-medium"
          >
            {{ tech }}
          </span>
          <span
            v-if="content.tech_stack.length > 3"
            class="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs font-medium"
          >
            +{{ content.tech_stack.length - 3 }}
          </span>
        </div>
      </CardContent>

      <CardFooter class="pt-0">
        <div class="flex items-center gap-3">
          <span class="font-bold text-foreground">View Project</span>

          <!-- External link indicators -->
          <div class="flex gap-1">
            <span v-if="content.github_url" class="text-muted-foreground hover:text-foreground" title="GitHub">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </span>
            <span v-if="content.live_url" class="text-muted-foreground hover:text-foreground" title="Live Demo">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM5.78 8.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm2.44 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm2.5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/>
              </svg>
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  </NuxtLink>
</template>
