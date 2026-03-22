<script setup lang="ts">
defineProps<{
  visibleCount: number
  totalCount: number
  loading?: boolean
}>()

defineEmits<{
  loadMore: []
}>()
</script>

<template>
  <div class="flex justify-center py-8">
    <Button
      variant="outline"
      size="lg"
      aria-controls="feed-content"
      :disabled="loading"
      @click="$emit('loadMore')"
    >
      <template v-if="loading">Loading...</template>
      <template v-else>Load More</template>
      <span class="ml-1.5 text-muted-foreground text-sm">
        (showing {{ visibleCount }} of {{ totalCount }})
      </span>
    </Button>
  </div>
</template>
