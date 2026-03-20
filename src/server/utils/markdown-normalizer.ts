/**
 * Shared Markdown Normalizer - Heading spacing and structural formatting.
 *
 * SHARED UTILITY: This file must be identical in ai-content-client and ai-content-scraper.
 * Any changes must be applied to both repos. See AIC-15.
 *
 * Handles:
 * - Heading spacing (all levels: # through ######)
 * - Triple-newline protection boundaries for broken-word/sentence fixers
 *
 * Known limitation: Fenced code blocks are not detected. Lines inside
 * ``` blocks that start with "# " (e.g., Python comments) will be
 * treated as headings and have blank lines inserted around them.
 * This is acceptable because AI-generated summaries rarely contain
 * fenced code blocks. If content types expand to include code, add
 * placeholder preprocessing (extract code blocks before normalizing,
 * restore after).
 *
 * Architecture:
 * normalizeText() calls normalizeMarkdown() BEFORE fixBrokenWords/fixBrokenSentences,
 * then calls normalizeMarkdownPostFix() AFTER them. The pre-fixer phase inserts triple
 * newlines as protection boundaries so the {1,2} quantifiers in the fixers cannot span
 * heading gaps. The post-fixer phase catches any heading boundaries that were altered
 * by the fixers. The blank-line collapser later reduces triple newlines to double.
 */

/**
 * Phase 1: Pre-fixer heading protection.
 * Inserts triple newlines around headings as protection boundaries.
 * Must be called BEFORE fixBrokenWords/fixBrokenSentences.
 *
 * @param text - Raw text with normalized newlines (no \r\n)
 * @returns Text with triple-newline heading protection boundaries
 */
export function normalizeMarkdown(text: string): string {
  if (!text) return '';
  let result = text;

  // Before-heading: "text\n### Heading" -> "text\n\n\n### Heading"
  // Uses negative lookbehind (?<!\n) to only add blank lines when there isn't one already.
  // Only matches headings at line start (after \n), so inline ### references are not affected.
  // Supports all heading levels (# through ######).
  result = result.replace(/(?<!\n)\n(#{1,6} )/g, '\n\n\n$1');

  // Before-heading (concatenated): "text### Heading" -> "text\n\n\n### Heading"
  // Handles the case where heading is glued directly to preceding text with no newline.
  // Uses [^\s#] to avoid matching inline "### " preceded by whitespace.
  result = result.replace(/([^\s#])(#{1,6} )/g, '$1\n\n\n$2');

  // After-heading: upgrade existing \n\n to \n\n\n for protection boundary
  result = result.replace(/^(#{1,6} .+)\n\n(?!\n)/gm, '$1\n\n\n');

  // After-heading: "### Heading\nContent" -> "### Heading\n\n\nContent"
  result = result.replace(/^(#{1,6} .+)\n(?!\n)/gm, '$1\n\n\n');

  return result;
}

/**
 * Phase 2: Post-fixer heading cleanup.
 * Re-checks heading boundaries after fixBrokenWords/fixBrokenSentences.
 * Must be called AFTER those fixers.
 *
 * Uses double newlines (not triple) since this is the final heading pass
 * before the blank-line collapser runs.
 *
 * @param text - Text after broken-word/sentence fixing
 * @returns Text with corrected heading spacing
 */
export function normalizeMarkdownPostFix(text: string): string {
  if (!text) return '';
  let result = text;

  // Before-heading: ensure blank line before heading
  result = result.replace(/(?<!\n)\n(#{1,6} )/g, '\n\n$1');

  // Before-heading (concatenated): ensure blank line before glued heading
  result = result.replace(/([^\s#])(#{1,6} )/g, '$1\n\n$2');

  // After-heading: ensure blank line after heading
  result = result.replace(/^(#{1,6} .+)\n(?!\n)/gm, '$1\n\n');

  return result;
}
