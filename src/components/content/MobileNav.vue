<script setup lang="ts">
import { usePlaylistsConfig } from '~/composables/usePlaylistsConfig'
import { useChannelsConfig } from '~/composables/useChannelsConfig'
import { useTagsConfig } from '~/composables/useTagsConfig'
import { useTruncate } from '~/composables/useTruncate'

const route = useRoute()
const isOpen = ref(false)

const { enabledPlaylists } = usePlaylistsConfig()
const { enabledChannels } = useChannelsConfig()
const { tags, topTags } = useTagsConfig()

// Close on route change
watch(() => route.path, () => {
  isOpen.value = false
})

// Close on escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="mobile-nav">
    <button
      class="mobile-nav__toggle"
      :aria-expanded="isOpen"
      aria-label="Toggle navigation menu"
      @click="isOpen = !isOpen"
    >
      <span v-if="!isOpen" class="material-symbols-outlined">menu</span>
      <span v-else class="material-symbols-outlined">close</span>
    </button>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isOpen"
          class="mobile-nav__overlay"
          @click="isOpen = false"
        />
      </Transition>

      <Transition name="slide">
        <nav
          v-if="isOpen"
          class="mobile-nav__sheet"
          aria-label="Mobile navigation"
        >
          <div class="mobile-nav__header">
            <span class="mobile-nav__title">Navigation</span>
            <button
              class="mobile-nav__close"
              aria-label="Close navigation"
              @click="isOpen = false"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="mobile-nav__content">
            <NuxtLink
              to="/"
              class="mobile-nav__home"
              active-class="mobile-nav__home--active"
            >
              All Summaries
            </NuxtLink>

            <section class="mobile-nav__section">
              <h3 class="mobile-nav__heading">Playlists</h3>
              <ul class="mobile-nav__list">
                <li v-for="playlist in enabledPlaylists" :key="playlist.id">
                  <NuxtLink
                    :to="`/playlists/${playlist.slug}`"
                    class="mobile-nav__link"
                    active-class="mobile-nav__link--active"
                  >
                    {{ useTruncate(playlist.name, 30) }}
                  </NuxtLink>
                </li>
              </ul>
            </section>

            <section class="mobile-nav__section">
              <h3 class="mobile-nav__heading">Channels</h3>
              <ul class="mobile-nav__list">
                <li v-for="channel in enabledChannels" :key="channel.slug">
                  <NuxtLink
                    :to="`/channels/${channel.slug}`"
                    class="mobile-nav__link"
                    active-class="mobile-nav__link--active"
                  >
                    {{ useTruncate(channel.name, 30) }}
                  </NuxtLink>
                </li>
              </ul>
            </section>

            <section v-if="topTags.length > 0" class="mobile-nav__section">
              <h3 class="mobile-nav__heading">Topics</h3>
              <ul class="mobile-nav__list">
                <li v-for="tag in topTags" :key="tag.slug">
                  <NuxtLink
                    :to="`/tags/${tag.slug}`"
                    class="mobile-nav__link"
                    active-class="mobile-nav__link--active"
                  >
                    {{ useTruncate(tag.name, 30) }}
                    <span class="mobile-nav__count" aria-hidden="true">{{ tag.itemCount }}</span>
                  </NuxtLink>
                </li>
                <li v-if="tags.length > 5">
                  <NuxtLink to="/tags" class="mobile-nav__link mobile-nav__link--see-all">
                    See all {{ tags.length }} topics
                  </NuxtLink>
                </li>
              </ul>
            </section>
          </div>
        </nav>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.mobile-nav {
  display: none;
}

@media (max-width: 768px) {
  .mobile-nav {
    display: block;
    position: fixed;
    bottom: var(--space-m, 1rem);
    right: var(--space-m, 1rem);
    z-index: 100;
  }

  .mobile-nav__toggle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-primary, #2563eb);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .mobile-nav__toggle:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .mobile-nav__toggle:active {
    transform: scale(0.95);
  }

  .mobile-nav__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
  }

  .mobile-nav__sheet {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 85vw);
    background: var(--color-surface, #fff);
    z-index: 201;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  }

  .mobile-nav__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-m, 1rem);
    border-bottom: 1px solid var(--color-base-tint-10, #e5e7eb);
  }

  .mobile-nav__title {
    font-weight: 600;
    font-size: var(--step-1, 1.125rem);
  }

  .mobile-nav__close {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-2xs, 0.25rem);
    color: var(--color-text-muted, #6b7280);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav__close:hover {
    color: var(--color-text, #374151);
  }

  .mobile-nav__content {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-m, 1rem);
  }

  .mobile-nav__home {
    display: block;
    padding: var(--space-s, 0.75rem) var(--space-xs, 0.5rem);
    color: var(--color-text, #374151);
    text-decoration: none;
    font-weight: 500;
    border-radius: 6px;
    margin-bottom: var(--space-s, 0.75rem);
  }

  .mobile-nav__home:hover {
    background: var(--color-base-tint-5, #f3f4f6);
  }

  .mobile-nav__home--active {
    background: var(--color-primary-tint-10, #eff6ff);
    color: var(--color-primary, #2563eb);
  }

  .mobile-nav__section {
    margin-bottom: var(--space-l, 1.5rem);
  }

  .mobile-nav__heading {
    font-size: var(--step--1, 0.875rem);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-base-shade-10, #6b7280);
    margin-bottom: var(--space-xs, 0.5rem);
    padding: 0 var(--space-xs, 0.5rem);
  }

  .mobile-nav__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .mobile-nav__link {
    display: block;
    padding: var(--space-xs, 0.5rem);
    color: var(--color-text, #374151);
    text-decoration: none;
    font-size: var(--step-0, 1rem);
    border-radius: 6px;
  }

  .mobile-nav__link:hover {
    background: var(--color-base-tint-5, #f3f4f6);
  }

  .mobile-nav__link--active {
    background: var(--color-primary-tint-10, #eff6ff);
    color: var(--color-primary, #2563eb);
    font-weight: 500;
  }

  .mobile-nav__count {
    margin-left: auto;
    font-size: var(--step--1, 0.875rem);
    color: var(--color-base-shade-10, #6b7280);
  }

  .mobile-nav__link--see-all {
    font-style: italic;
    color: var(--color-primary, #2563eb);
  }

  /* Transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
}
</style>
