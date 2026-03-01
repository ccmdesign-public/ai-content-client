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
  padding: var(--space-2xl, 3rem) var(--space-l, 1.5rem);
}

.not-found__icon {
  font-size: 4rem;
  color: var(--color-base-shade-10, #6b7280);
  margin-bottom: var(--space-m, 1rem);
}

.not-found__title {
  font-size: var(--step-2, 1.5rem);
  font-weight: 600;
  color: var(--color-text, #374151);
  margin-bottom: var(--space-xs, 0.5rem);
}

.not-found__message {
  font-size: var(--step-0, 1rem);
  color: var(--color-base-shade-10, #6b7280);
  margin-bottom: var(--space-l, 1.5rem);
}

.not-found__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs, 0.25rem);
  padding: var(--space-s, 0.75rem) var(--space-m, 1rem);
  background: var(--color-primary, #2563eb);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.not-found__link:hover {
  background: var(--color-primary-shade-10, #1d4ed8);
}
</style>
