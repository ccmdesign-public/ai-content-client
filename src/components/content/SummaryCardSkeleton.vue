<template>
  <!-- Mimics SummaryCard layout: thumbnail + text block -->
  <div class="flex border-t border-border gap-4 py-4 md:flex-row flex-col">
    <Skeleton class="w-full md:w-60 shrink-0 aspect-video rounded-md" />
    <div class="flex-1 min-w-0 space-y-2">
      <Skeleton class="h-4 w-1/3" />
      <Skeleton class="h-5 w-3/4" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-2/3" />
    </div>
  </div>
</template>
