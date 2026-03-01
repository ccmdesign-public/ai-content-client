<script setup lang="ts">
defineProps<{
  icon?: string
  message: string
  hint?: string
  linkTo?: string
  linkText?: string
}>()
</script>

<template>
  <div class="empty-state">
    <span v-if="icon" class="material-symbols-outlined empty-state__icon">{{ icon }}</span>
    <p class="empty-state__message">{{ message }}</p>
    <p v-if="hint" class="empty-state__hint">{{ hint }}</p>
    <NuxtLink v-if="linkTo" :to="linkTo" class="empty-state__link">
      {{ linkText || 'Go back' }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: var(--space-2xl, 3rem) var(--space-l, 1.5rem);
}

.empty-state__icon {
  font-size: 3rem;
  color: var(--color-base-shade-10, #6b7280);
  margin-bottom: var(--space-m, 1rem);
}

.empty-state__message {
  font-size: var(--step-1, 1.125rem);
  font-weight: 500;
  color: var(--color-text, #374151);
  margin-bottom: var(--space-xs, 0.5rem);
}

.empty-state__hint {
  font-size: var(--step-0, 1rem);
  color: var(--color-base-shade-10, #6b7280);
  margin-bottom: var(--space-l, 1.5rem);
}

.empty-state__link {
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

.empty-state__link:hover {
  background: var(--color-primary-shade-10, #1d4ed8);
}
</style>
