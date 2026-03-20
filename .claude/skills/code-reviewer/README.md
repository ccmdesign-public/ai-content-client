# Code Reviewer Skill

**Version**: 1.0.0
**Priority**: ⭐⭐⭐ Tier 1 Essential

## Purpose

Proactively review code changes for quality, consistency, and standards compliance.

## Auto-trigger Conditions

This skill automatically activates after:
- Editing or creating `.vue` files in `src/components/`
- Modifying files in `src/assets/css/`
- Creating new composables in `src/composables/`

## Review Checklist

### 1. Tailwind CSS Compliance

**Checks**:
- ✅ Tailwind utility classes used for styling in content components
- ✅ No scoped `<style>` blocks in `src/pages/` or `src/components/content/`
- ✅ Specific transition properties used (`transition-colors`, not `transition-all`)

### 2. Component Standards

**Checks**:
- ✅ Props organized by category (structural, content, visual, accessibility, behavior)
- ✅ TypeScript types used for all props

**Example Issue**:
```vue
<!-- ❌ BAD: Props not categorized -->
<script setup>
const props = defineProps({
  size: String,
  onClick: Function,
  color: String,
  ariaLabel: String
})
</script>

<!-- ✅ GOOD: Props categorized with comments -->
<script setup>
const props = defineProps({
  // Structural
  size: { type: String, default: 'm' },

  // Visual
  color: { type: String, default: 'base' },

  // Accessibility
  ariaLabel: String,

  // Behavior
  onClick: Function
})
</script>
```

### 3. Accessibility

**Checks**:
- ✅ ARIA labels present on interactive elements
- ✅ Keyboard focus visible (`:focus-visible` styles)
- ✅ Semantic HTML elements used
- ✅ Disabled states use `aria-disabled`
- ✅ Minimum accessibility score: 95%

**Example Issue**:
```vue
<!-- ❌ BAD: Missing ARIA label, no focus styles -->
<button @click="handleClick">
  <IconComponent />
</button>

<!-- ✅ GOOD: ARIA label, focus styles -->
<button
  @click="handleClick"
  :aria-label="ariaLabel || 'Submit'"
  class="button"
>
  <IconComponent />
</button>

<style scoped>
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
```

### 4. TypeScript Safety

**Checks**:
- ✅ Props have explicit types
- ✅ No `any` types without justification
- ✅ Composables have return type inference

**Example Issue**:
```typescript
// ❌ BAD: Using any
const handleData = (data: any) => {
  return data.value
}

// ✅ GOOD: Explicit types
const handleData = <T>(data: { value: T }): T => {
  return data.value
}
```

### 5. Performance

**Checks**:
- ✅ No unnecessary re-renders
- ✅ Computed properties used for derived state
- ✅ Event handlers not recreated on each render

**Example Issue**:
```vue
<!-- ❌ BAD: Handler recreated on each render -->
<template>
  <button @click="() => handleClick(id)">Click</button>
</template>

<!-- ✅ GOOD: Stable handler reference -->
<template>
  <button @click="handleClickWithId">Click</button>
</template>

<script setup>
const handleClickWithId = () => handleClick(id)
</script>
```

## Configuration

Configuration is loaded from `.claude/config/review-rules.json`.

### Auto-fix Capabilities

Some issues can be auto-fixed:
- ✅ ESLint formatting issues
- ✅ CSS property ordering
- ❌ Focus styles (requires manual review)
- ❌ ARIA labels (requires context)

## Output Format

Reviews are provided as inline suggestions with severity levels:

```
🔴 ERROR: src/components/ds/molecules/ccmButton.vue:42
Missing :focus-visible styles for keyboard accessibility

⚠️  WARNING: src/components/ds/molecules/ccmButton.vue:15
Using primitive token var(--color-base-blue-500) instead of semantic var(--color-primary)
Auto-fix available: Run with auto_fix.token_references = true

ℹ️  INFO: src/components/ds/molecules/ccmButton.vue:8
Consider extracting repeated logic into a composable
```

## Severity Levels

- **ERROR**: Blocking issues that must be fixed
- **WARNING**: Issues that should be addressed but don't block
- **INFO**: Suggestions for improvement

## Dependencies

- Configuration: `.claude/config/review-rules.json`
- No external scripts required

## Integration

This skill runs automatically after file modifications. No manual invocation needed.
