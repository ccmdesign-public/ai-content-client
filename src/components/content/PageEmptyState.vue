<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  SearchX,
  FilterX,
  ListX,
  AlertCircle,
  FileQuestion,
  Inbox,
} from 'lucide-vue-next'

const props = defineProps<{
  icon?: string
  message: string
  hint?: string
  /** Navigation CTA -- mutually exclusive with actionText */
  linkTo?: string
  linkText?: string
  /** In-page action CTA -- mutually exclusive with linkTo */
  actionText?: string
}>()

const emit = defineEmits<{
  action: []
}>()

// Map icon name strings to Lucide components
const iconMap: Record<string, any> = {
  search_off: SearchX,
  filter_list_off: FilterX,
  playlist_remove: ListX,
  error: AlertCircle,
  help_outline: FileQuestion,
  inbox: Inbox,
}

const IconComponent = computed(() => props.icon ? iconMap[props.icon] || Inbox : null)
</script>

<template>
  <div class="text-center py-14 px-7" role="status">
    <component
      :is="IconComponent"
      v-if="IconComponent"
      class="size-12 text-muted-foreground mb-5 mx-auto"
      aria-hidden="true"
    />
    <p class="text-lg font-medium text-foreground mb-2.5">{{ message }}</p>
    <p v-if="hint" class="text-base text-muted-foreground mb-7">{{ hint }}</p>
    <!-- linkTo takes precedence over actionText -->
    <Button v-if="linkTo" as-child>
      <NuxtLink :to="linkTo">
        {{ linkText || 'Go back' }}
      </NuxtLink>
    </Button>
    <Button v-else-if="actionText" @click="emit('action')">
      {{ actionText }}
    </Button>
  </div>
</template>
