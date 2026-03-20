<script setup lang="ts">
import type { ButtonVariants } from '@/components/ui/button'
import type { RouteLocationRaw } from 'vue-router'
import { Button } from '@/components/ui/button'

interface Props {
  to: RouteLocationRaw
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: string
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  external: false
})
</script>

<template>
  <Button :variant="variant" :size="size" :class="props.class" as-child>
    <NuxtLink v-if="!external" :to="to">
      <slot />
    </NuxtLink>
    <a v-else :href="String(to)" target="_blank" rel="noopener noreferrer">
      <slot />
    </a>
  </Button>
</template>
