<script setup lang="ts">
defineOptions({
  name: 'DocsCodeBlock'
})

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'vue'
  },
  title: {
    type: String,
    default: ''
  },
  showCopy: {
    type: Boolean,
    default: true
  }
})

const copySuccess = ref(false)

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.code)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<template>
  <div class="code-block">
    <!-- Header -->
    <div v-if="title || showCopy" class="code-header">
      <div v-if="title" class="code-title">
        <h4>{{ title }}</h4>
        <span class="language-badge">{{ language }}</span>
      </div>
      <button
        v-if="showCopy"
        class="copy-button"
        @click="copyToClipboard"
        :class="{ 'copied': copySuccess }"
      >
        {{ copySuccess ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <!-- Code -->
    <pre class="code-content"><code :class="`language-${language}`">{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.code-block {
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--muted);
  border: 1px solid var(--foreground);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1.3125rem;
  background-color: var(--background);
  border-bottom: 1px solid var(--foreground);
}

.code-title {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.code-title h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--primary);
}

.language-badge {
  padding: 0.25rem 0.375rem;
  background-color: var(--secondary);
  color: var(--primary-foreground);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.copy-button {
  padding: 0.25rem 0.375rem;
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-button:hover {
  background-color: var(--secondary);
}

.copy-button.copied {
  background-color: var(--success);
}

.code-content {
  margin: 0;
  padding: 1.3125rem;
  background-color: var(--muted);
  color: var(--foreground);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
  tab-size: 2;
}

/* Basic syntax highlighting for common languages */
.code-content :deep(.token.tag) {
  color: var(--primary);
}

.code-content :deep(.token.attr-name) {
  color: var(--accent-foreground);
}

.code-content :deep(.token.attr-value) {
  color: var(--success);
}

.code-content :deep(.token.comment) {
  color: var(--muted-foreground);
  font-style: italic;
}

.code-content :deep(.token.keyword) {
  color: var(--primary);
  font-weight: 500;
}

.code-content :deep(.token.string) {
  color: var(--success);
}

.code-content :deep(.token.number) {
  color: var(--warning);
}

.code-content :deep(.token.function) {
  color: var(--info);
}

.code-content :deep(.token.operator) {
  color: var(--foreground);
}

.code-content :deep(.token.punctuation) {
  color: var(--muted-foreground);
}

/* Scrollbar styling */
.code-content::-webkit-scrollbar {
  height: 8px;
}

.code-content::-webkit-scrollbar-track {
  background: var(--background);
}

.code-content::-webkit-scrollbar-thumb {
  background: var(--foreground);
  border-radius: var(--radius-sm);
}

.code-content::-webkit-scrollbar-thumb:hover {
  background: var(--secondary);
}
</style>

