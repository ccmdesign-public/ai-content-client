<script setup lang="ts">
import { Copy, Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const props = withDefaults(defineProps<{
  text: string
  label?: string
}>(), {
  label: 'Copy .md'
})

const copied = ref(false)

async function copyToClipboard() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
  }
}
</script>

<template>
  <Button
    variant="outline"
    size="sm"
    class="gap-2"
    :aria-label="copied ? 'Copied to clipboard' : label"
    @click="copyToClipboard"
  >
    <Check v-if="copied" class="size-4" aria-hidden="true" />
    <Copy v-else class="size-4" aria-hidden="true" />
    {{ copied ? 'Copied!' : label }}
  </Button>
</template>
