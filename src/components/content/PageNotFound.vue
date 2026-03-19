<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  message: string
  linkTo?: string
  linkText?: string
}>()
</script>

<template>
  <div class="not-found">
    <span v-if="icon" class="material-symbols-outlined not-found__icon">{{ icon }}</span>
    <h1 class="not-found__title">{{ title }}</h1>
    <p class="not-found__message">{{ message }}</p>
    <NuxtLink v-if="linkTo" :to="linkTo" class="not-found__link">
      {{ linkText || 'Go back' }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 3.5rem 1.75rem;
}

.not-found__icon {
  font-size: 4rem;
  color: var(--muted-foreground);
  margin-bottom: 1.3125rem;
}

.not-found__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 0.6875rem;
}

.not-found__message {
  font-size: 1rem;
  color: var(--muted-foreground);
  margin-bottom: 1.75rem;
}

.not-found__link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.875rem 1.3125rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.not-found__link:hover {
  background: var(--primary);
}
</style>
