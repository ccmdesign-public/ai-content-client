<template>
  <component
    :is="componentTag"
    v-bind="componentProps"
    class="ccm-button"
    :style="cssVars"
    :aria-label="computedAriaLabel"
    :aria-pressed="computedAriaPressed"
    :aria-expanded="computedAriaExpanded"
    :aria-disabled="disabled || null"
    :variant="variant"
    :color="color"
    :size="size"
  >
    <!-- Default slot for button content. Can contain text, icons, or other components. Falls back to label prop if empty. -->
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import { useRouter } from '#app'

/**
 * Primary button component following all 10 Component Standards.
 *
 * A versatile button component that supports multiple variants, sizes, and colors.
 * Can render as button, link (NuxtLink), or anchor based on props. Includes full
 * accessibility support with proper ARIA attributes and keyboard navigation.
 *
 * Uses semantic color tokens for variants. Sizes follow s/m/l/xl scale.
 * See Component Design Decisions for full rationale.
 *
 * @component ccmButton
 * @category atom
 * @standards all-10
 *
 * @example Basic Usage
 * <ccmButton>Click me</ccmButton>
 *
 * @example Variants
 * <ccmButton variant="primary">Primary</ccmButton>
 * <ccmButton variant="secondary">Secondary</ccmButton>
 * <ccmButton variant="ghost">Ghost</ccmButton>
 * <ccmButton variant="link">Link</ccmButton>
 *
 * @example Sizes
 * <ccmButton size="s">Small</ccmButton>
 * <ccmButton size="m">Medium</ccmButton>
 * <ccmButton size="l">Large</ccmButton>
 * <ccmButton size="xl">Extra Large</ccmButton>
 *
 * @example Colors
 * <ccmButton color="primary">Primary</ccmButton>
 * <ccmButton color="secondary">Secondary</ccmButton>
 * <ccmButton color="success">Success</ccmButton>
 * <ccmButton color="warning">Warning</ccmButton>
 *
 * @example Links
 * <ccmButton href="https://example.com">External Link</ccmButton>
 * <ccmButton to="/about">Internal Link</ccmButton>
 *
 * @example Disabled State
 * <ccmButton disabled>Disabled Button</ccmButton>
 *
 * @example With Icons
 * <ccmButton>
 *   <Icon name="plus" />
 *   Add Item
 * </ccmButton>
 *
 * @example Custom Background
 * <ccmButton backgroundColor="color-accent">Custom Background</ccmButton>
 *
 * @example Unstyled Variant
 * <ccmButton variant="unstyled">Unstyled Button</ccmButton>
 */

defineOptions({
  inheritAttrs: import.meta.env.PROD ? false : true
})

const props = defineProps({
  // Structural props
  /** HTML tag to render when not using to/href. Defaults to 'button' for standard button behavior. */
  is: { type: String, default: 'button' },
  /** Internal route for NuxtLink navigation. When provided, renders as NuxtLink component. */
  to: { type: [String, Object], default: null },
  /** External URL for anchor link. When provided, renders as <a> tag with href attribute. */
  href: { type: String, default: null },

  // Content props
  /** Button text label used as fallback when slot is empty. Takes precedence over slot content for accessibility. */
  label: { type: String, default: '' },

  // Visual props
  /** Button size following the s/m/l/xl scale. Controls padding and font size. Valid values: s, m, l, xl */
  size: { type: String, default: 'm' },
  /** Color theme using semantic design tokens. Valid values: primary, secondary, base, accent, white, success, fail, warning, info */
  color: { type: String, default: 'base' },
  /** Custom background color override using CSS custom property name (without -- prefix). Use 'transparent' for default behavior. */
  backgroundColor: { type: String, default: 'transparent' },
  /** Visual style variant affecting appearance. Valid values: primary (filled), secondary (outlined), ghost (no border), link (text-only), unstyled (no styles) */
  variant: { type: String, default: 'primary' },

  // Accessibility props
  /** Custom aria-label for screen readers. Overrides automatic label generation. Use for buttons with icon-only content. */
  ariaLabel: { type: String, default: null },
  /** Toggle button pressed state. Set to true/false for toggle buttons, null for non-toggle buttons. Controls aria-pressed attribute. */
  isPressed: { type: Boolean, default: null },
  /** Expandable button expanded state. Set to true/false for expandable buttons, null for non-expandable buttons. Controls aria-expanded attribute. */
  isExpanded: { type: Boolean, default: null },

  // Behavior props
  /** Disable the button and prevent all interactions. Sets aria-disabled and removes pointer events. */
  disabled: { type: Boolean, default: false }
})

const componentTag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return props.is
})

const componentProps = computed(() => {
  if (props.to) {
    return { to: props.to }
  }

  if (props.href) {
    return { href: props.href }
  }

  // button or custom element
  return { disabled: props.disabled }
})

const cssVars = computed(() => {
  const vars = {}

  // Only override background-color if explicitly provided and not 'transparent'
  if (props.backgroundColor && props.backgroundColor !== 'transparent') {
    vars['--_btn-bg'] = `var(--${props.backgroundColor})`
  }

  return vars
})

// Resolve the final URL (href or to)
const router = useRouter()
const resolvedHref = computed(() => {
  if (props.href) return props.href
  if (props.to) {
    if (typeof props.to === 'string') return props.to
    try {
      return router.resolve(props.to).href
    } catch {
      return null
    }
  }
  return null
})

function humanizeUrl(url) {
  try {
    const u = new URL(url, 'http://example.local')
    const path = u.pathname || ''
    const last = path.split('/').filter(Boolean).pop() || u.hostname || ''
    const text = decodeURIComponent((last || '').replace(/[-_]+/g, ' ').trim())
    if (!text) return 'link'
    return text.charAt(0).toUpperCase() + text.slice(1)
  } catch {
    const fallback = decodeURIComponent((url || '').replace(/[-_]+/g, ' ').trim())
    return fallback ? fallback.charAt(0).toUpperCase() + fallback.slice(1) : 'link'
  }
}

// Accessibility fallbacks
const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  if (props.label) return props.label
  const url = resolvedHref.value
  return url ? `Go to ${humanizeUrl(url)}` : null
})

const computedAriaPressed = computed(() => {
  // Only set when explicitly provided; otherwise omit attribute
  return props.isPressed === null ? null : props.isPressed
})

const computedAriaExpanded = computed(() => {
  // Only set when explicitly provided; otherwise omit attribute
  return props.isExpanded === null ? null : props.isExpanded
})
</script>

<style scoped>
.ccm-button {
  /* Structure */
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  -webkit-user-drag: none;
  user-select: none;
  box-sizing: border-box;
  text-decoration: none;
  place-self: self-start flex-start;
  cursor: pointer;

  /* Defaults */
  --_btn-color: var(--foreground);
  --_btn-bg: var(--foreground);

  color: var(--_btn-color);
  background-color: var(--_btn-bg);
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5625rem 0.875rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out, filter 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.ccm-button:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.ccm-button[disabled],
.ccm-button[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.ccm-button:hover {
  filter: brightness(0.9);
  transform: scale(1.05);
}

/* Button sizes */
.ccm-button[size='s'] {
  font-size: 0.875rem;
  padding: 0.1875rem 0.375rem;
}

.ccm-button[size='m'] {
  font-size: 1rem;
  padding: 0.5625rem 0.875rem;
}

.ccm-button[size='l'] {
  font-size: 1.125rem;
  padding: 0.6875rem 1.3125rem;
}

.ccm-button[size='xl'] {
  font-size: 1.25rem;
  padding: 1rem 1.75rem;
}

/* Variants */
.ccm-button[variant='primary'] {
  background-color: var(--_btn-color);
  color: var(--primary-foreground);
}

.ccm-button[variant='secondary'] {
  background-color: transparent;
  color: var(--_btn-color);
  border-color: currentcolor;
}

.ccm-button[variant='ghost'],
.ccm-button[variant='link'] {
  background-color: transparent;
  color: var(--_btn-color);
  border-color: transparent;
}

.ccm-button[variant='ghost']:hover,
.ccm-button[variant='link']:hover {
  text-decoration: underline;
  transform: none;
  filter: none;
}

.ccm-button[variant='unstyled'] { all: unset; }

/* Colors */
.ccm-button[color='primary'] { --_btn-color: var(--primary); }
.ccm-button[color='secondary'] { --_btn-color: var(--secondary-foreground); }
.ccm-button[color='base'] { --_btn-color: var(--foreground); }
.ccm-button[color='accent'] { --_btn-color: var(--accent-foreground); }
.ccm-button[color='white'] { --_btn-color: var(--background); }
.ccm-button[color='success'] { --_btn-color: var(--success); }
.ccm-button[color='fail'] { --_btn-color: var(--destructive); }
.ccm-button[color='warning'] { --_btn-color: var(--warning); }
.ccm-button[color='info'] { --_btn-color: var(--info); }
</style>