<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useTruncate } from '~/composables/useTruncate'
import { useSlugify } from '~/composables/useSlugify'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink } from 'lucide-vue-next'

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
        <Badge
          v-if="content.featured"
          class="absolute top-3 right-3"
          variant="default"
        >
          Featured
        </Badge>
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
          <Badge
            v-for="tech in content.tech_stack.slice(0, 3)"
            :key="tech"
            variant="secondary"
          >
            {{ tech }}
          </Badge>
          <Badge
            v-if="content.tech_stack.length > 3"
            variant="secondary"
          >
            +{{ content.tech_stack.length - 3 }}
          </Badge>
        </div>
      </CardContent>

      <CardFooter class="pt-0">
        <div class="flex items-center gap-3">
          <span class="font-bold text-foreground">View Project</span>

          <!-- External link indicators -->
          <div class="flex gap-1">
            <Github
              v-if="content.github_url"
              class="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <ExternalLink
              v-if="content.live_url"
              class="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  </NuxtLink>
</template>
