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
const copyFailed = ref(false)

async function copyToClipboard() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    copyFailed.value = false
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
    copyFailed.value = true
    setTimeout(() => { copyFailed.value = false }, 3000)
  }
}
</script>

<template>
  <Button
    variant="outline"
    size="sm"
    class="gap-2"
    :aria-label="copyFailed ? 'Copy failed' : copied ? 'Copied to clipboard' : label"
    @click="copyToClipboard"
  >
    <Check v-if="copied" class="size-4" aria-hidden="true" />
    <Copy v-else class="size-4" aria-hidden="true" />
    {{ copyFailed ? 'Copy failed' : copied ? 'Copied!' : label }}
  </Button>
</template>
