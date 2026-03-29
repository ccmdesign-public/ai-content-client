<script setup lang="ts">
defineProps<{
  guide: any
}>()
</script>

<template>
  <div class="guide-human-section">
    <ContentRenderer :value="guide" class="prose prose-zinc dark:prose-invert max-w-none" />
  </div>
</template>
