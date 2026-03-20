<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  SearchX,
  FileQuestion,
  AlertCircle,
  FileText,
} from 'lucide-vue-next'

const props = defineProps<{
  icon?: string
  title: string
  message: string
  linkTo?: string
  linkText?: string
}>()

// Map icon name strings to Lucide components
const iconMap: Record<string, any> = {
  search_off: SearchX,
  help_outline: FileQuestion,
  error: AlertCircle,
  article: FileText,
}

const IconComponent = computed(() => props.icon ? iconMap[props.icon] || FileQuestion : null)
</script>

<template>
  <div class="text-center py-14 px-7">
    <component
      :is="IconComponent"
      v-if="IconComponent"
      class="size-16 text-muted-foreground mb-5 mx-auto"
      aria-hidden="true"
    />
    <h1 class="text-xl font-semibold text-foreground mb-2.5">{{ title }}</h1>
    <p class="text-base text-muted-foreground mb-7">{{ message }}</p>
    <Button v-if="linkTo" as-child>
      <NuxtLink :to="linkTo">
        {{ linkText || 'Go back' }}
      </NuxtLink>
    </Button>
  </div>
</template>
