<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { cn } from '@/lib/utils'

interface Props {
  to: RouteLocationRaw
  title?: string
  class?: string
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  external: false
})
</script>

<template>
  <NuxtLink
    v-if="!external"
    :to="to"
    :aria-label="title"
    :class="cn(
      'block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
      props.class
    )"
  >
    <div
      data-slot="card"
      class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <slot />
    </div>
  </NuxtLink>
  <a
    v-else
    :href="String(to)"
    :aria-label="title"
    target="_blank"
    rel="noopener noreferrer"
    :class="cn(
      'block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
      props.class
    )"
  >
    <div
      data-slot="card"
      class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <slot />
    </div>
  </a>
</template>
