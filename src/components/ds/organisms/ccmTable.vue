<template>
  <table
    ref="rootEl"
    class="ccm-table"
    :variant="variant"
    :style="cssVars"
  >
    <caption v-if="caption">{{ caption }}</caption>
    
    <!-- Slot: default — Provide full table markup (thead/tbody/etc.). Falls back to 2D array renderer when empty. -->
    <slot v-if="hasSlot" />

    <!-- Default renderer from 2D arrays -->
    <template v-else-if="data && data.headers && data.headers.length">
      <thead>
        <tr>
          <th
            v-for="(header, i) in data.headers"
            :key="`h-${i}`"
            scope="col"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rIdx) in data.rows || []" :key="`r-${rIdx}`">
          <template v-for="(cell, cIdx) in row" :key="`c-${rIdx}-${cIdx}`">
            <th v-if="rowHeaders && cIdx === 0" scope="row">{{ String(cell) }}</th>
            <td v-else>{{ String(cell) }}</td>
          </template>
        </tr>
      </tbody>
    </template>
  </table>
  
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import type { PropType } from 'vue'

/**
 * Accessible, token-driven table with slot-first API and data-driven fallback.
 *
 * Renders semantic table markup. When the default slot is provided, it renders
 * the given table structure as-is. Otherwise, it can render a simple table from
 * a 2D data structure via the `data` prop. Visuals are controlled via CSS tokens.
 *
 * @component ccmTable
 * @category molecule
 * @standards all-10
 *
 * @example Data-driven
 * <ccmTable :data="{ headers: ['Name','Age'], rows: [['Ada', 36], ['Linus', 55]] }" />
 *
 * @example Slot-first
 * <ccmTable>
 *   <thead>
 *     <tr><th>Col A</th><th>Col B</th></tr>
 *   </thead>
 *   <tbody>
 *     <tr><td>A1</td><td>B1</td></tr>
 *   </tbody>
 * </ccmTable>
 */

defineOptions({
  inheritAttrs: import.meta.env.PROD ? false : true
})

interface TableData {
  headers: Array<string>
  rows: Array<Array<string | number>>
}

const props = defineProps({
  // Data / structure
  data: {
    type: Object as PropType<TableData>,
    default: undefined
  },
  caption: { type: String, default: null },
  rowHeaders: { type: Boolean, default: false },

  // Visual
  /** Token base name (e.g., "brand"). Derives header/body backgrounds automatically. */
  backgroundColor: { type: String, default: null },
  /** Text color token (e.g., "foreground"). */
  color: { type: String, default: 'foreground' },
  /** Border color token base (e.g., "foreground"). */
  borderColor: { type: String, default: 'foreground' },
  /** Border radius for outer table box. */
  borderRadius: { type: String, default: '0' },
  /** Cell padding for th/td (applies block and inline). */
  padding: { type: String, default: '0.875rem' },
  variant: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary'
  }
})

const slots = useSlots()
const rootEl = ref<HTMLTableElement | null>(null)

const hasSlot = computed(() => !!slots.default && slots.default().length > 0)

function tokenOr(varName: string | null | undefined, fallback: string): string {
  if (!varName) return fallback
  return `var(--${varName})`
}

const cssVars = computed(() => {
  // Derivations for backgroundColor token base (e.g., brand → header/body fills)
  const hasBg = !!props.backgroundColor
  const theadBg = hasBg ? `var(--color-${props.backgroundColor}-100)` : 'transparent'
  const tbodyBg = hasBg ? `var(--color-${props.backgroundColor}-05-tint)` : 'transparent'
  const headerTextColor = hasBg ? 'var(--primary-foreground)' : 'currentColor'

  const borderColorBase = tokenOr(props.borderColor, 'currentColor')
  const borderColor20 = `color-mix(in oklab, ${borderColorBase} 20%, transparent)`

  return {
    '--_table-color': `var(--${props.color})`,
    '--_table-thead-bg': theadBg,
    '--_table-thead-color': headerTextColor,
    '--_table-tbody-bg': tbodyBg,
    '--_table-border-color': borderColorBase,
    '--_table-border-color-20': borderColor20,
    '--_table-border-radius': props.borderRadius,
    '--_table-cell-padding': props.padding
  }
})

</script>

<style scoped>
.ccm-table {
  /* Defaults */
  --_table-color: currentColor;
  --_table-thead-bg: transparent;
  --_table-thead-color: currentColor;
  --_table-tbody-bg: transparent;
  --_table-border-color: currentColor;
  --_table-border-color-20: color-mix(in oklab, currentColor 20%, transparent);
  --_table-border-radius: 0;
  --_table-cell-padding: 0.875rem;

  color: var(--_table-color);
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: transparent;
  border-radius: var(--_table-border-radius);
  overflow: hidden;
}

.ccm-table caption {
  text-align: start;
  padding: var(--_table-cell-padding);
  color: inherit;
}

.ccm-table thead {
  background-color: var(--_table-thead-bg);
  color: var(--_table-thead-color);
}

.ccm-table tbody {
  background-color: var(--_table-tbody-bg);
}

.ccm-table th,
.ccm-table td {
  padding: var(--_table-cell-padding);
  text-align: start;
}

/* Row separators */
.ccm-table tbody tr + tr > * {
  border-top: 1px solid var(--_table-border-color-20);
}

/* Primary variant: add outer border at 20% */
.ccm-table[variant='primary'] {
  outline: 1px solid var(--_table-border-color-20);
  outline-offset: 0;
}

/* Secondary variant: separators only (default above) */

/* Rounded corners with separate header/body backgrounds */
.ccm-table thead tr:first-child th:first-child {
  border-top-left-radius: var(--_table-border-radius);
}
.ccm-table thead tr:first-child th:last-child {
  border-top-right-radius: var(--_table-border-radius);
}
.ccm-table tbody tr:last-child td:first-child,
.ccm-table tbody tr:last-child th:first-child {
  border-bottom-left-radius: var(--_table-border-radius);
}
.ccm-table tbody tr:last-child td:last-child,
.ccm-table tbody tr:last-child th:last-child {
  border-bottom-right-radius: var(--_table-border-radius);
}
</style>


