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
onMounted(() => {
  retryButton.value?.$el?.focus()
})
</script>

<template>
  <div class="text-center py-14 px-7" role="alert">
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
