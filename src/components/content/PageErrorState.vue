<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-vue-next'

withDefaults(defineProps<{
  message?: string
  hint?: string
  retryable?: boolean
  retrying?: boolean
}>(), {
  message: 'Something went wrong',
  hint: 'Please try again later.',
  retryable: true,
  retrying: false,
})

const emit = defineEmits<{
  retry: []
}>()

const retryButton = useTemplateRef('retryButton')
const errorContainer = useTemplateRef('errorContainer')
onMounted(() => {
  if (retryButton.value?.$el) {
    retryButton.value.$el.focus()
  } else {
    // When not retryable, focus the error container so screen readers announce it
    ;(errorContainer.value as HTMLElement | undefined)?.focus()
  }
})
</script>

<template>
  <div ref="errorContainer" class="text-center py-14 px-7" role="alert" tabindex="-1">
    <AlertCircle class="size-12 text-destructive mb-5 mx-auto" aria-hidden="true" />
    <p class="text-lg font-medium text-foreground mb-2.5">{{ message }}</p>
    <p v-if="hint" class="text-base text-muted-foreground mb-7">{{ hint }}</p>
    <Button
      v-if="retryable"
      ref="retryButton"
      :disabled="retrying"
      @click="emit('retry')"
    >
      {{ retrying ? 'Retrying...' : 'Try again' }}
    </Button>
  </div>
</template>
