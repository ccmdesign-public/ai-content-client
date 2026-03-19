<template>
  <component
    :is="componentTag"
    class="ccm-chip"
    :variant="variant"
    :color="color"
    :size="size"
    :disabled="disabled || null"
    :interactive="interactive || null"
    :dismissible="dismissible || null"
    :style="cssVars"
    :aria-label="computedAriaLabel"
    :to="to"
    @click="handleClick"
  >
    <!-- Slot: icon-before — Leading icon/content rendered before the label. -->
    <span v-if="iconBefore || $slots['icon-before']" class="ccm-chip__icon">
      <slot name="icon-before">{{ iconBefore }}</slot>
    </span>

    <!-- Slot: default — Label content. Falls back to `label` prop when empty. -->
    <span class="ccm-chip__label">
      <slot>{{ label }}</slot>
    </span>

    <!-- Slot: icon-after — Trailing icon/content. Replaced by dismiss button when `dismissible`. -->
    <span v-if="dismissible || iconAfter || $slots['icon-after']" class="ccm-chip__icon">
      <slot name="icon-after">
        <button
          v-if="dismissible"
          class="ccm-chip__dismiss"
          type="button"
          :aria-label="`Remove ${computedAriaLabel}`"
          @click.stop="handleDismiss"
        >
          ×
        </button>
        <span v-else>{{ iconAfter }}</span>
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
/**
 * Compact label component for status, taxonomy, and quick actions.
 *
 * A versatile chip/badge that supports three visual variants, semantic colors,
 * and sizes. It can behave as static text, a button, or a link. Optional
 * leading/trailing icons and a built-in dismiss affordance are available. Uses
 * design tokens for consistent spacing, typography, and color across themes.
 *
 * Use for inline metadata, filters, tag lists, and light-weight actions. Favor
 * `ccmButton` when the primary intent is an action rather than annotation.
 *
 * @component ccmChip
 * @category atom
 * @standards all-10
 *
 * @example Basic Usage
 * <ccmChip label="Design" />
 *
 * @example With Icons
 * <ccmChip>
 *   <template #icon-before>🏷️</template>
 *   Tagged
 *   <template #icon-after>↗</template>
 * </ccmChip>
 *
 * @example Variants and Colors
 * <div style="display:flex;gap:8px;flex-wrap:wrap">
 *   <ccmChip variant="filled" color="primary" label="Primary" />
 *   <ccmChip variant="outlined" color="success" label="Success" />
 *   <ccmChip variant="minimal" color="warning" label="Warning" />
 * </div>
 *
 * @example Sizes
 * <div style="display:flex;gap:8px;align-items:center">
 *   <ccmChip size="xs" label="XS" />
 *   <ccmChip size="s" label="S" />
 *   <ccmChip size="m" label="M" />
 * </div>
 *
 * @example Dismissible / Interactive
 * <ccmChip dismissible interactive label="Remove me" />
 *
 * @example As Link
 * <ccmChip to="/docs/ccm-chip" label="Docs" />
 */
import { computed } from 'vue'
import type { PropType } from 'vue'

// Environment-based inheritAttrs
defineOptions({
  inheritAttrs: import.meta.env.PROD ? false : true
})

const props = defineProps({
  /**
   * Root HTML tag when not interactive or link.
   * Use 'button' only when you need custom semantics; otherwise set `interactive`.
   * Defaults to 'span'.
   */
  is: { type: String, default: 'span' },

  /**
   * NuxtLink target. When provided, chip renders as `NuxtLink` and emits `click` on activation.
   * Example: '/docs/ccm-chip'.
   */
  to: { type: String, default: null },

  /**
   * Fallback text label if default slot is empty. Also used for `aria-label`
   * when `ariaLabel` is not provided.
   */
  label: { type: String, default: '' },

  /**
   * Optional inline content rendered before the label when `icon-before` slot is unused.
   * Provide a short text/icon glyph.
   */
  iconBefore: { type: String, default: '' },

  /**
   * Optional inline content rendered after the label when `icon-after` slot is unused.
   * Ignored when `dismissible` is true (dismiss button is shown instead).
   */
  iconAfter: { type: String, default: '' },

  /**
   * Visual size preset.
   * Valid values: 'xs' | 's' | 'm'. Defaults to 'm'.
   */
  size: { type: String as PropType<'xs' | 's' | 'm'>, default: 's' },

  /**
   * Visual style variant.
   * Valid values: 'filled' | 'outlined' | 'minimal'. Defaults to 'filled'.
   */
  variant: { type: String as PropType<'filled' | 'outlined' | 'minimal'>, default: 'filled' },

  /**
   * Semantic color token name.
   * Valid values: 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info'.
   */
  color: { type: String as PropType<'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info'>, default: 'neutral' },

  /**
   * Custom background color token name (without leading --). When set, overrides
   * variant/color mapping for background and uses a readable foreground.
   * Example: 'color-brand-500'.
   */
  customColor: { type: String, default: null },

  /**
   * Explicit accessible name. Falls back to `label` or null when not provided.
   */
  ariaLabel: { type: String, default: null },

  /**
   * When true, displays a dismiss button and emits `dismiss` on activation.
   */
  dismissible: { type: Boolean, default: false },

  /**
   * Disables interaction and dims appearance.
   */
  disabled: { type: Boolean, default: false },

  /**
   * Makes the chip keyboard/mouse interactive, rendering as a `button` when not a link.
   */
  interactive: { type: Boolean, default: false }
})

/**
 * Emitted when the dismiss control is activated.
 * @event dismiss
 *
 * Emitted when the chip is activated (button/link modes only).
 * @event click
 */
const emit = defineEmits(['dismiss', 'click'])

// Computed component tag (span, button, or NuxtLink)
const componentTag = computed(() => {
  if (props.to) return 'NuxtLink'
  if (props.interactive || props.dismissible) return 'button'
  return props.is
})

// Size mapping with fixed rem values
const sizeMap = {
  xs: { paddingBlock: '0.25rem', paddingInline: '0.6875rem', fontSize: '0.75rem', icon: '10' },
  s: { paddingBlock: '0.25rem', paddingInline: '0.6875rem', fontSize: '0.875rem', icon: '12' },
  m: { paddingBlock: '0.375rem', paddingInline: '0.875rem', fontSize: '1rem', icon: '16' }
}

// Color mapping based on variant using shadcn tokens
const colorMap = {
  filled: {
    neutral: { bg: 'muted', color: 'muted-foreground' },
    primary: { bg: 'primary', color: 'primary-foreground' },
    success: { bg: 'success', color: 'success-foreground' },
    warning: { bg: 'warning', color: 'warning-foreground' },
    error: { bg: 'destructive', color: 'destructive-foreground' },
    info: { bg: 'info', color: 'info-foreground' }
  },
  outlined: {
    neutral: { bg: 'transparent', color: 'muted-foreground', border: 'border' },
    primary: { bg: 'transparent', color: 'primary', border: 'primary' },
    success: { bg: 'transparent', color: 'success', border: 'success' },
    warning: { bg: 'transparent', color: 'warning', border: 'warning' },
    error: { bg: 'transparent', color: 'destructive', border: 'destructive' },
    info: { bg: 'transparent', color: 'info', border: 'info' }
  },
  minimal: {
    neutral: { bg: 'transparent', color: 'muted-foreground' },
    primary: { bg: 'transparent', color: 'primary' },
    success: { bg: 'transparent', color: 'success' },
    warning: { bg: 'transparent', color: 'warning' },
    error: { bg: 'transparent', color: 'destructive' },
    info: { bg: 'transparent', color: 'info' }
  }
}

// CSS Variables
const cssVars = computed(() => {
  const currentSize = sizeMap[props.size as keyof typeof sizeMap] || sizeMap.m
  const currentColors = props.customColor
    ? { bg: props.customColor, color: 'foreground' }
    : (colorMap as any)[props.variant]?.[props.color] || colorMap.filled.neutral

  return {
    '--_chip-padding-block': currentSize.paddingBlock,
    '--_chip-padding-inline': currentSize.paddingInline,
    '--_chip-font-size': currentSize.fontSize,
    '--_chip-icon-size': `${currentSize.icon}px`,
    '--_chip-bg': currentColors.bg === 'transparent' ? 'transparent' : `var(--${currentColors.bg})`,
    '--_chip-color': `var(--${currentColors.color})`,
    '--_chip-border-color': currentColors.border ? `var(--${currentColors.border})` : 'transparent'
  }
})

// Accessibility
const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  if (props.label) return props.label
  return null
})

// Event handlers
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && (props.interactive || props.to)) {
    emit('click', event)
  }
}

const handleDismiss = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('dismiss', event)
  }
}
</script>

<style scoped>
.ccm-chip {
  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding-block: var(--_chip-padding-block, 0.375rem);
  padding-inline: var(--_chip-padding-inline, 0.875rem);
  border-radius: 999px;
  border: 1px solid var(--_chip-border-color, transparent);

  /* Typography */
  font-family: var(--font-sans);
  font-size: var(--_chip-font-size, 1rem);
  font-weight: 500;
  line-height: 1.2;

  /* Colors */
  background-color: var(--_chip-bg, var(--muted));
  color: var(--_chip-color, var(--muted-foreground));

  /* Behavior */
  white-space: nowrap;
  text-decoration: none;
  user-select: none;
  cursor: default;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* Interactive state */
.ccm-chip[interactive],
.ccm-chip[to] {
  cursor: pointer;
}

.ccm-chip[interactive]:hover,
.ccm-chip[to]:hover {
  filter: brightness(0.95);
}

.ccm-chip[interactive]:active,
.ccm-chip[to]:active {
  filter: brightness(0.9);
}

/* Disabled state */
.ccm-chip[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Icon */
.ccm-chip__icon {
  display: inline-flex;
  align-items: center;
  width: var(--_chip-icon-size, 16px);
  height: var(--_chip-icon-size, 16px);
  font-size: var(--_chip-icon-size, 16px);
  color: currentcolor;
}

/* Label */
.ccm-chip__label {
  display: inline-block;
}

/* Icon padding overrides */
.ccm-chip:has(.ccm-chip__icon:first-child) {
  padding-inline-start: 0.375rem;
}

.ccm-chip:has(.ccm-chip__icon:last-child) {
  padding-inline-end: 0.375rem;
}

/* Dismiss button */
.ccm-chip__dismiss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_chip-icon-size, 16px);
  height: var(--_chip-icon-size, 16px);
  padding: 0;
  margin-inline-start: -0.1875rem;
  background: transparent;
  border: none;
  color: currentcolor;
  cursor: pointer;
  border-radius: 999px;
  transition: background-color 0.2s ease;
  font-family: var(--font-sans);
  font-size: calc(var(--_chip-icon-size, 16px) * 0.9);
  font-weight: 400;
  line-height: 1;
}

.ccm-chip__dismiss:hover {
  background-color: rgb(0 0 0 / 10%);
}

.ccm-chip__dismiss:active {
  background-color: rgb(0 0 0 / 20%);
}

/* Variant: outlined */
.ccm-chip[variant='outlined'] {
  background-color: transparent;
}

/* Variant: minimal */
.ccm-chip[variant='minimal'] {
  background-color: transparent;
  border-color: transparent;
  padding-inline: 0.375rem;
}
</style>
