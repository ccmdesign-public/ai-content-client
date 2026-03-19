<template>
  <header
    class="ccm-hero"
    role="banner"
    :variant="variant"
    :hide-top="hideTop"
    :hide-bottom="hideBottom"
    :style="cssVars"
  >
    <!-- Top section with dedicated topbar slot -->
    <div class="ccm-hero__top | center">
      <!-- Dedicated topbar slot -->
      <slot name="top-bar">
        <ccm-topbar />
      </slot>

      <!-- Generic top slot for navigation, breadcrumbs, back links, etc. -->
      <slot name="top" />
    </div>

    <!-- Main content slot: heading, tagline, etc. -->
    <div class="ccm-hero__main | center">
      <slot>
        <hgroup>
          <h4 v-if="brow">{{ brow }}</h4>
          <h1 v-if="title">{{ title }}</h1>
          <h3 v-if="tagline">{{ tagline }}</h3>
        </hgroup>
      </slot>
    </div>

    <!-- Bottom slot: metadata, bylines, CTAs, etc. -->
    <div v-if="!hideBottom" class="ccm-hero__bottom | center">
      <slot name="bottom" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Hero section component for page headers and landing sections.
 *
 * A flexible banner component that provides structured slots for top navigation, main content,
 * and bottom metadata. Supports multiple layout variants (default, minimal, full-screen) and
 * size-based spacing. Uses semantic HTML with role="banner" for accessibility.
 *
 * Default variant uses 16:7 aspect ratio. Minimal removes aspect ratio constraints.
 * Full-screen variant stretches to 100vh for immersive landing experiences.
 *
 * @component ccmHero
 * @category organism
 * @standards all-10
 *
 * @example Basic Usage
 * <ccmHero
 *   brow="Welcome"
 *   title="Hero Title"
 *   tagline="A compelling tagline that captures attention"
 * />
 *
 * @example With Slots
 * <ccmHero>
 *   <template #top-bar>
 *     <ccm-topbar />
 *   </template>
 *   <template #top>
 *     <nav>Breadcrumbs</nav>
 *   </template>
 *   <h1>Custom Heading</h1>
 *   <template #bottom>
 *     <ccm-byline author="John Doe" date="2025-01-01" />
 *   </template>
 * </ccmHero>
 *
 * @example Variants
 * <ccmHero variant="default" title="Default Hero" />
 * <ccmHero variant="minimal" title="Minimal Hero" />
 * <ccmHero variant="full-screen" title="Full Screen Hero" />
 *
 * @example Custom Background
 * <ccmHero
 *   title="Custom Background"
 *   backgroundColor="color-secondary"
 * />
 *
 * @example Size Variations
 * <ccmHero size="s" title="Small Padding" />
 * <ccmHero size="m" title="Medium Padding" />
 * <ccmHero size="l" title="Large Padding" />
 *
 * @example Hidden Sections
 * <ccmHero hide-top title="No Top Section" />
 * <ccmHero hide-bottom title="No Bottom Section" />
 */

defineOptions({
  inheritAttrs: import.meta.env.PROD ? false : true
})

const props = defineProps({
  // Content props
  /** Optional eyebrow text displayed above the main title. Renders as h4 when provided. */
  brow: {
    type: String,
    default: ''
  },
  /** Main hero heading text. Renders as h1 when provided. Falls back to default slot if not provided. */
  title: {
    type: String,
    default: ''
  },
  /** Supporting tagline text displayed below the title. Renders as h3 when provided. */
  tagline: {
    type: String,
    default: ''
  },

  // Visual props
  /** Custom background color using CSS custom property name (without -- prefix). Overrides default background. */
  backgroundColor: {
    type: String,
    default: ''
  },
  /** Padding size following the s/m/l/xl scale. Controls vertical padding via --space-{size} token. Valid values: s, m, l, xl */
  size: {
    type: String,
    default: 'l'
  },
  /** Layout variant affecting aspect ratio and height. Valid values: default (16:7 aspect), minimal (auto height), full-screen (100vh) */
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'minimal', 'full-screen'].includes(value)
  },

  // Behavior props
  /** Hide the top section (top-bar and top slots). When true, top navigation and related content is hidden. */
  hideTop: {
    type: Boolean,
    default: false
  },
  /** Hide the bottom section (bottom slot). When true, bottom metadata and CTAs are hidden. Defaults to true. */
  hideBottom: {
    type: Boolean,
    default: true
  }
})

const sizeToRem = { s: '0.875rem', m: '1.3125rem', l: '1.75rem', xl: '2.625rem' }

const cssVars = computed(() => {
  const vars = {}

  if (props.backgroundColor) {
    vars['--_hero-bg'] = `var(--${props.backgroundColor})`
  }

  vars['--_hero-padding'] = sizeToRem[props.size] || '1.75rem'

  return vars
})
</script>

<style scoped>
.ccm-hero {
  background-color: var(--_hero-bg, var(--muted));
  aspect-ratio: 16 / 7;
  display: flex;
  flex-direction: column;
}

.ccm-hero__top {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6875rem;
}

.ccm-hero__main {
  width: 100%;
  display: flex;
  padding-block: var(--_hero-padding, 1.75rem);
  align-items: center;
  flex: 1;
  text-wrap: balance;
}

.ccm-hero__bottom {
  padding-bottom: var(--_hero-padding, 1.75rem);
}

/* Heading typography */
.ccm-hero h1,
.ccm-hero h3,
.ccm-hero h4 {
  font-family: inherit;
  font-weight: inherit;
  margin-block: initial;
}

/* Link styling */
.ccm-hero a {
  color: var(--primary);
  text-decoration: none;
  font-size: 1rem;
}

.ccm-hero a:hover {
  text-decoration: underline;
}

.ccm-hero a:visited {
  color: var(--primary);
}

/* Variant: minimal */
.ccm-hero[variant="minimal"] {
  aspect-ratio: auto;
}

/* Variant: full-screen */
.ccm-hero[variant="full-screen"] {
  aspect-ratio: auto;
  min-height: 100svh;
}

/* Conditional display */
.ccm-hero[hide-top="true"] .ccm-hero__top {
  display: none;
}

.ccm-hero[hide-bottom="true"] .ccm-hero__bottom {
  display: none;
}
</style>