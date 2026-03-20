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
    bottom: 1.3125rem;
    right: 1.3125rem;
    z-index: 100;
  }

  .mobile-nav__toggle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--primary);
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
    background: var(--background);
    z-index: 201;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  }

  .mobile-nav__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.3125rem;
    border-bottom: 1px solid var(--border);
  }

  .mobile-nav__title {
    font-weight: 600;
    font-size: 1.125rem;
  }

  .mobile-nav__close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.375rem;
    color: var(--muted-foreground);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav__close:hover {
    color: var(--foreground);
  }

  .mobile-nav__content {
    flex: 1;
    overflow-y: auto;
    padding: 1.3125rem;
  }

  .mobile-nav__section {
    margin-bottom: 1.75rem;
  }

  .mobile-nav__heading {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted-foreground);
    margin-bottom: 0.6875rem;
    padding: 0 0.6875rem;
  }

  .mobile-nav__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .mobile-nav__link {
    display: block;
    padding: 0.6875rem;
    color: var(--foreground);
    text-decoration: none;
    font-size: 1rem;
    border-radius: 6px;
  }

  .mobile-nav__link:hover {
    background: var(--accent);
  }

  .mobile-nav__link--active {
    background: var(--accent);
    color: var(--primary);
    font-weight: 500;
  }

  .mobile-nav__count {
    margin-left: auto;
    font-size: 0.875rem;
    color: var(--muted-foreground);
  }

  .mobile-nav__link--see-all {
    font-style: italic;
    color: var(--primary);
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
