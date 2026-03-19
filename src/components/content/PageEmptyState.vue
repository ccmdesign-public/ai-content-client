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
  padding: 3.5rem 1.75rem;
}

.empty-state__icon {
  font-size: 3rem;
  color: var(--muted-foreground);
  margin-bottom: 1.3125rem;
}

.empty-state__message {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 0.6875rem;
}

.empty-state__hint {
  font-size: 1rem;
  color: var(--muted-foreground);
  margin-bottom: 1.75rem;
}

.empty-state__link {
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

.empty-state__link:hover {
  background: var(--primary);
}
</style>
