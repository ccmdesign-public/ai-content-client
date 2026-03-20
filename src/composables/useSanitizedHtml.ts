import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

// Restrict allowed tags to what markdown rendering actually produces
const MARKDOWN_SANITIZE_CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  FORBID_TAGS: ['style', 'script', 'iframe', 'form', 'input', 'object', 'embed'],
}

// Force safe external link attributes on all anchor tags (prevents tabnapping)
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if ('target' in node) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

export function useSanitizedHtml() {
  function sanitize(html: string): string {
    return DOMPurify.sanitize(html || '', MARKDOWN_SANITIZE_CONFIG)
  }

  function sanitizeMarkdown(markdown: string): string {
    const raw = marked.parse(markdown || '') as string
    return DOMPurify.sanitize(raw, MARKDOWN_SANITIZE_CONFIG)
  }

  return { sanitize, sanitizeMarkdown }
}
