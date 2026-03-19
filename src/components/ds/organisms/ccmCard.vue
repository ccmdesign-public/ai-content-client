<template>
  <nuxt-link
    class="ccm-card"
    :to="to"
    :aria-label="title"
    :aria-describedby="ctaId"
    :style="cssVars"
    >
    <!-- Slot: image — Custom media for the card. Defaults to an <img> when the image prop is provided. -->
  <slot name="image">
    <img class="ccm-card__image" v-if="image" :src="image" :alt="title" />
    <div v-else class="ccm-card__image"></div>
  </slot>

  <div class="ccm-card__text">
    <!-- Slot: default — Primary textual content (heading, description). -->
    <slot />
  </div>

  <span class="ccm-card__action" aria-hidden="true" :id="ctaId">
    <!-- Slot: action — CTA text announced via aria-describedby on the link. -->
    <slot name="action">{{ action }}</slot>
  </span>
    
  </nuxt-link>
</template>

<script setup lang="ts">
/**
 * Accessible, themeable card/teaser for links and content previews.
 *
 * The entire card is a single interactive link (NuxtLink) with keyboard-focus styles,
 * optional media via an image slot, and a CTA string/slot referenced by aria-describedby.
 * Spacing and visuals are driven by semantic design tokens exposed as CSS custom properties.
 *
 * @component ccmCard
 * @category ds-component
 * @standards all-10
 *
 * @example Basic Usage
 * <ccm-card to="/blog/my-post" title="My Post">
 *   <h3>My Post</h3>
 *   <p>Short description of the post…</p>
 *   <template #action>Read more →</template>
 * </ccm-card>
 *
 * @example With Custom Image Slot
 * <ccm-card to="/docs" title="Documentation">
 *   <h3>Documentation</h3>
 *   <p>Explore the guides and API reference.</p>
 *   <template #image>
 *     <img src="/cover.jpg" alt="Documentation cover" />
 *   </template>
 *   <template #action>Explore docs →</template>
 * </ccm-card>
 */
import { computed } from 'vue'
import { useSlugify } from '~/composables/useSlugify'

defineOptions({
  inheritAttrs: import.meta.env.PROD ? false : true
})

const props = defineProps({
  // Structural props
  /**
   * Destination path or absolute URL for the card link.
   * Use app-relative routes (e.g., "/blog/post") or full URLs (e.g., "https://example.com").
   */
  to: {
    type: String,
    required: false
  },

  // Content props
  /**
   * Human-readable title used for the link's aria-label and the image alt text.
   * Also used to generate a stable id for the CTA description.
   */
  title: {
    type: String,
    required: false
  },
  /**
   * Image URL used by the default image rendering. Provide this when not supplying the #image slot.
   */
  image: {
    type: String,
    required: false
  },
  /**
   * CTA copy rendered in the `action` area and referenced by aria-describedby.
   * Provide a short, imperative phrase (e.g., "Read more →").
   */
  action: {
    type: String,
    default: ''
  },

  // Visual props
  /**
   * Spacing scale key controlling internal padding and gaps.
   * Valid values typically include: "s", "m", "l", "xl". Default is "l".
   */
  size: {
    type: String,
    default: 'l'
  },
  /**
   * Design token name (without the var(--) wrapper) controlling the image area's background color.
   * Example: "color-neutral-tint-90" → applied as var(--color-neutral-tint-90).
   */
  backgroundColor: {
    type: String,
    default: 'color-primary-tint-20'
  }
})

const { slugify } = useSlugify()

const sizeToRem = { s: '0.875rem', m: '1.3125rem', l: '1.75rem', xl: '2.625rem' }

const cssVars = computed(() => ({
  '--_card-padding': sizeToRem[props.size] || '1.75rem',
  '--_card-bg': props.backgroundColor === 'color-primary-tint-20' ? 'var(--muted)' : `var(--${props.backgroundColor})`
}))

const baseForId = computed(() => props.title || props.to || 'card')
const ctaId = computed(() => `desc-${slugify(baseForId.value)}`)
</script>

<style scoped>
.ccm-card {
  display: flex;
  flex-direction: column;
  border: 2px solid var(--border);
  overflow: hidden;
  gap: 1.3125rem;
  text-decoration: none;
  color: var(--card-foreground);
  border-radius: var(--radius-lg);
}

.ccm-card * {
  cursor: pointer;
}

.ccm-card__text {
  flex: 1;
  padding: 0 var(--_card-padding, 1.75rem) var(--_card-padding, 1.75rem);
}

.ccm-card__image {
  padding: var(--_card-padding, 1.75rem);
  background-color: var(--_card-bg, var(--muted));
  width: 100%;
  aspect-ratio: 16/9;
}

.ccm-card__action {
  padding: var(--_card-padding, 1.75rem);
}

.ccm-card:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
</style>
