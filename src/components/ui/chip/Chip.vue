<script setup lang="ts">
import type { BadgeVariants } from '@/components/ui/badge'
import type { RouteLocationRaw } from 'vue-router'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  variant?: BadgeVariants['variant']
  interactive?: boolean
  dismissible?: boolean
  to?: RouteLocationRaw
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  interactive: false,
  dismissible: false
})

const emit = defineEmits<{
  click: []
  dismiss: []
}>()

function handleClick() {
  if (props.interactive) {
    emit('click')
  }
}

function handleDismiss(event: Event) {
  event.stopPropagation()
  emit('dismiss')
}
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : (interactive || dismissible) ? 'button' : 'span'"
    :to="to"
    :type="(interactive || dismissible) && !to ? 'button' : undefined"
    :class="cn(
      (interactive || to) && 'cursor-pointer',
      props.class
    )"
    @click="handleClick"
  >
    <Badge :variant="variant" class="gap-1">
      <slot />
      <button
        v-if="dismissible"
        type="button"
        class="ml-1 rounded-full hover:bg-foreground/20 p-0.5 -mr-1"
        aria-label="Remove"
        @click="handleDismiss"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-3"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </Badge>
  </component>
</template>
