<template>
  <div
    class="ccm-form-field"
    :style="cssVars"
    :validation-state="validationState"
    :size="size"
    :label-position="labelPosition"
  >
    <!-- Label -->
    <label
      v-if="label && labelPosition !== 'hidden'"
      :for="computedId"
      :data-position="labelPosition"
      class="ccm-form-field__label"
    >
      {{ label }}
      <span v-if="required" class="ccm-form-field__required" aria-label="required">*</span>
    </label>

    <!-- Input wrapper with slot -->
    <div class="ccm-form-field__input-wrapper">
      <!-- Default slot: place input/textarea/select here. Receives scoped bindings { inputProps, labelProps, fieldState } -->
      <slot v-bind="slotBindings">
        <!-- Fallback: Default text input for graceful degradation -->
        <input
          v-bind="slotBindings.inputProps"
          type="text"
        />
      </slot>

      <!-- Validation icon -->
      <span
        v-if="showValidationIcon && validationState !== 'default'"
        class="ccm-form-field__icon"
        :data-state="validationState"
        aria-hidden="true"
      >
        <!-- Named slot `icon`: replace default state icon (✓ ✕ ⚠) -->
        <slot name="icon">
          <template v-if="validationState === 'success'">✓</template>
          <template v-else-if="validationState === 'error'">✕</template>
          <template v-else-if="validationState === 'warning'">⚠</template>
        </slot>
      </span>
    </div>

    <!-- Help text -->
    <span
      v-if="helpText && validationState === 'default'"
      :id="helpTextId"
      class="ccm-form-field__help"
    >
      {{ helpText }}
    </span>

    <!-- Success message -->
    <span
      v-if="successMessage && validationState === 'success'"
      :id="messageId"
      class="ccm-form-field__message ccm-form-field__message--success"
      role="status"
    >
      {{ successMessage }}
    </span>

    <!-- Error message -->
    <span
      v-if="errorMessage && validationState === 'error'"
      :id="messageId"
      class="ccm-form-field__message ccm-form-field__message--error"
      role="alert"
    >
      {{ errorMessage }}
    </span>

    <!-- Warning message -->
    <span
      v-if="warningMessage && validationState === 'warning'"
      :id="messageId"
      class="ccm-form-field__message ccm-form-field__message--warning"
      role="status"
    >
      {{ warningMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

/**
 * Slot-first form field wrapper with labels, validation messages, and a11y wiring.
 *
 * Wraps any input/textarea/select via the default slot and provides automatic
 * label association, aria-describedby wiring for help/validation messages, and
 * consistent styles across sizes and validation states. Gracefully degrades by
 * rendering a default text input when no slot content is provided.
 *
 * @component ccmFormField
 * @category ds-form
 * @standards all-10
 *
 * @example Basic Usage
 * <ccmFormField label="Name" helpText="Your full legal name" />
 *
 * @example With Scoped Slot
 * <ccmFormField label="Email" v-slot="{ inputProps }">
 *   <input v-bind="inputProps" type="email" required />
 * </ccmFormField>
 *
 * @example Validation States
 * <ccmFormField label="Username" validationState="success" successMessage="Looks good" />
 * <ccmFormField label="Username" validationState="error" errorMessage="Already taken" />
 * <ccmFormField label="Username" validationState="warning" warningMessage="Uncommon pattern" />
 *
 * @example Label Positions
 * <ccmFormField label="Agree to terms" labelPosition="inline" v-slot="{ inputProps }">
 *   <input v-bind="inputProps" type="checkbox" />
 * </ccmFormField>
 * <ccmFormField label="Search" labelPosition="hidden" v-slot="{ inputProps }">
 *   <input v-bind="inputProps" type="search" aria-label="Search" />
 * </ccmFormField>
 *
 * @example Sizes
 * <ccmFormField label="Small" size="s" />
 * <ccmFormField label="Medium" size="m" />
 * <ccmFormField label="Large" size="l" />
 * <ccmFormField label="XL" size="xl" />
 *
 * @example Custom Icon Slot
 * <ccmFormField label="Phone" validationState="success" v-slot="{ inputProps }">
 *   <input v-bind="inputProps" type="tel" />
 *   <template #icon>
 *     <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8"/></svg>
 *   </template>
 * </ccmFormField>
 */

defineOptions({
  inheritAttrs: import.meta.env.PROD ? false : true
})

const props = defineProps({
  // Structural props
  /** Custom element id for the input. If omitted, a stable id is auto-generated and associated with the label. */
  id: { type: String, default: null },
  /** Label placement. Valid values: top (default), inline, hidden */
  labelPosition: { type: String, default: 'top' },

  // Content props
  /** Visible label text. When labelPosition="hidden", keep for a11y but hide visually; also consider aria-label on the input. */
  label: { type: String, default: '' },
  /** Helper text shown only in the default validation state. Included in aria-describedby. */
  helpText: { type: String, default: '' },
  /** Error message shown when validationState="error". Included in aria-describedby and sets aria-invalid. */
  errorMessage: { type: String, default: '' },
  /** Success message shown when validationState="success". Included in aria-describedby. */
  successMessage: { type: String, default: '' },
  /** Warning message shown when validationState="warning". Included in aria-describedby. */
  warningMessage: { type: String, default: '' },

  // Visual props
  /** Control spacing and typography scale. Valid values: s, m, l, xl */
  size: { type: String as PropType<'s' | 'm' | 'l' | 'xl'>, default: 'm' },
  /** Visual and a11y state. Valid values: default, success, error, warning */
  validationState: { type: String, default: 'default' },

  // Behavior props
  /** Adds a visual asterisk in the label. Use native required on the input to enforce validation. */
  required: { type: Boolean, default: false },
  /** Toggle the inline validation icon for non-default states. */
  showValidationIcon: { type: Boolean, default: true }
})

// Generate stable IDs
const computedId = computed(() => {
  if (props.id) return props.id
  // Generate random ID as fallback
  return `form-field-${Math.random().toString(36).substr(2, 9)}`
})

const helpTextId = computed(() => `${computedId.value}-help`)
const messageId = computed(() => `${computedId.value}-message`)

// Compute aria-describedby
const computedAriaDescribedBy = computed<string | undefined>(() => {
  const ids = []

  if (props.helpText && props.validationState === 'default') {
    ids.push(helpTextId.value)
  }

  if (props.errorMessage && props.validationState === 'error') {
    ids.push(messageId.value)
  }

  if (props.successMessage && props.validationState === 'success') {
    ids.push(messageId.value)
  }

  if (props.warningMessage && props.validationState === 'warning') {
    ids.push(messageId.value)
  }

  return ids.length > 0 ? ids.join(' ') : undefined
})

// Scoped slot bindings
const slotBindings = computed(() => ({
  inputProps: {
    id: computedId.value,
    'aria-describedby': computedAriaDescribedBy.value,
    'aria-invalid': (props.validationState === 'error') || undefined
  },
  labelProps: {
    for: computedId.value
  },
  fieldState: {
    validationState: props.validationState,
    size: props.size,
    hasError: props.validationState === 'error',
    hasSuccess: props.validationState === 'success',
    hasWarning: props.validationState === 'warning'
  }
}))

// CSS variable bindings (Standard 2)
const cssVars = computed(() => {
  const sizeMap = {
    s: { block: '0.375rem', inline: '0.6875rem', fontSize: '0.875rem' },
    m: { block: '0.6875rem', inline: '0.875rem', fontSize: '1rem' },
    l: { block: '0.875rem', inline: '1.3125rem', fontSize: '1.125rem' },
    xl: { block: '1.3125rem', inline: '1.75rem', fontSize: '1.25rem' }
  }

  const size = sizeMap[props.size] || sizeMap.m

  return {
    '--_ff-padding-block': size.block,
    '--_ff-padding-inline': size.inline,
    '--_ff-font-size': size.fontSize
  }
})
</script>

<style scoped>
.ccm-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
}

/* Label */
.ccm-form-field__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.ccm-form-field__required {
  color: var(--destructive);
  font-weight: 700;
}

/* Label positions */
.ccm-form-field[label-position='inline'] {
  flex-direction: row;
  align-items: center;
}

.ccm-form-field[label-position='inline'] .ccm-form-field__label {
  flex: 0 0 auto;
  min-width: 120px;
}

.ccm-form-field[label-position='inline'] .ccm-form-field__input-wrapper {
  flex: 1;
}

/* Label text alignment with text-based inputs */
.ccm-form-field:has(
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="search"],
  input[type="tel"],
  input[type="url"],
  input[type="number"],
  input[type="date"],
  input[type="datetime-local"],
  input[type="month"],
  input[type="time"],
  input[type="week"],
  input:not([type]),
  textarea,
  select
) .ccm-form-field__label {
  padding-inline: var(--_ff-padding-inline, 0.875rem);
}

/* Input wrapper */
.ccm-form-field__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

/* Style any input, textarea, or select inside */
.ccm-form-field__input-wrapper > :deep(input),
.ccm-form-field__input-wrapper > :deep(textarea),
.ccm-form-field__input-wrapper > :deep(select) {
  width: 100%;
  padding-block: var(--_ff-padding-block, 0.6875rem);
  padding-inline: var(--_ff-padding-inline, 0.875rem);
  font-family: var(--font-sans);
  font-size: var(--_ff-font-size, 1rem);
  font-weight: 400;
  line-height: 1.5;
  color: var(--foreground);
  background-color: var(--background);
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.ccm-form-field__input-wrapper > :deep(textarea) {
  resize: vertical;
  min-height: 100px;
}

/* Focus state */
.ccm-form-field__input-wrapper > :deep(input):focus,
.ccm-form-field__input-wrapper > :deep(textarea):focus,
.ccm-form-field__input-wrapper > :deep(select):focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 20%, transparent);
}

/* Disabled state */
.ccm-form-field__input-wrapper > :deep(input):disabled,
.ccm-form-field__input-wrapper > :deep(textarea):disabled,
.ccm-form-field__input-wrapper > :deep(select):disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Readonly state */
.ccm-form-field__input-wrapper > :deep(input):read-only,
.ccm-form-field__input-wrapper > :deep(textarea):read-only,
.ccm-form-field__input-wrapper > :deep(select):read-only {
  background-color: color-mix(in srgb, var(--foreground) 5%, transparent);
  cursor: default;
}

/* Validation icon */
.ccm-form-field__icon {
  position: absolute;
  right: var(--_ff-padding-inline, 0.875rem);
  pointer-events: none;
  font-size: var(--_ff-font-size, 1rem);
  line-height: 1;
}

.ccm-form-field__icon[data-state='success'] { color: var(--success); }
.ccm-form-field__icon[data-state='error'] { color: var(--destructive); }
.ccm-form-field__icon[data-state='warning'] { color: var(--warning); }

/* Help text */
.ccm-form-field__help {
  font-size: 0.75rem;
  color: var(--muted-foreground);
  line-height: 1.4;
}

/* Messages */
.ccm-form-field__message {
  font-size: 0.75rem;
  line-height: 1.4;
  font-weight: 500;
}

.ccm-form-field__message--success { color: var(--success); }
.ccm-form-field__message--error { color: var(--destructive); }
.ccm-form-field__message--warning { color: var(--warning); }

/* Validation state borders */
.ccm-form-field[validation-state='success'] .ccm-form-field__input-wrapper > :deep(input),
.ccm-form-field[validation-state='success'] .ccm-form-field__input-wrapper > :deep(textarea),
.ccm-form-field[validation-state='success'] .ccm-form-field__input-wrapper > :deep(select) {
  border-color: var(--success);
}

.ccm-form-field[validation-state='error'] .ccm-form-field__input-wrapper > :deep(input),
.ccm-form-field[validation-state='error'] .ccm-form-field__input-wrapper > :deep(textarea),
.ccm-form-field[validation-state='error'] .ccm-form-field__input-wrapper > :deep(select) {
  border-color: var(--destructive);
}

.ccm-form-field[validation-state='warning'] .ccm-form-field__input-wrapper > :deep(input),
.ccm-form-field[validation-state='warning'] .ccm-form-field__input-wrapper > :deep(textarea),
.ccm-form-field[validation-state='warning'] .ccm-form-field__input-wrapper > :deep(select) {
  border-color: var(--warning);
}
</style>
