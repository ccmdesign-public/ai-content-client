/**
 * Text Normalizer - Unified source of truth for LLM output cleanup.
 * Fixes common issues like mid-word breaks, broken sentences, and excessive newlines.
 *
 * IMPORTANT: Patterns are intentionally conservative to avoid false positives.
 * Better to miss some breaks than to incorrectly join intentional line breaks.
 */

// Pattern 1: CamelCase with capital start, 3+ lowercase before break, 2+ lowercase after
// Matches: "Whats\nApp", "Door\nDash", "Face\nBook"
// Requires capital letter start to avoid matching regular words
const CAMELCASE_BREAK = /([A-Z][a-z]{2,})[\n\r]{1,2}([A-Z][a-z]{2,})/g;

// Pattern 2: Name prefixes (Mc, Mac, etc.)
// Matches: "Mc\nKinsey", "Mac\nDonald"
const NAME_PREFIX_BREAK = /\b(Mc|Mac)[\n\r]{1,2}([A-Z][a-z]+)/g;

// Pattern 3: Word + ALL-CAPS acronym
// Matches: "Open\nAI", "Chat\nGPT", "Deep\nSeek"
const WORD_ACRONYM_BREAK = /([A-Z][a-z]{2,})[\n\r]{1,2}([A-Z]{2,})\b/g;

// Pattern 4: Specific tech compound words that commonly break
// Matches: "Dev\nOps", "Git\nHub", "Linked\nIn", "You\nTube", "Tik\nTok"
const TECH_COMPOUND_BREAK = /\b(Dev|Git|Linked|You|Tik|Bit|Drop|Pay|Kick|Sales|Cloud)[\n\r]{1,2}(Ops|Hub|In|Tube|Tok|Bucket|Box|Pal|Starter|Force|Flare)\b/g;

// Pattern 5: Mid-word lowercase break (conservative: 4+ chars each side)
// Matches: "infor\nmation", "trans\naction"
// Requires significant length to avoid false positives like "one\ntwo"
const LOWERCASE_MIDWORD_BREAK = /([a-z]{4,})[\n\r]{1,2}([a-z]{4,})/g;

// Pattern 6: Apostrophe breaks where word continues after
// Matches: "Linked\nIn's", "What's\nApp's"
const APOSTROPHE_BREAK = /([A-Z][a-z]+)[\n\r]{1,2}([A-Z][a-z]*[''][a-z]+)/g;

/**
 * Fix words that were incorrectly broken across lines by the LLM.
 * Uses conservative patterns to avoid false positives.
 */
export function fixBrokenWords(text: string): string {
  let result = text;

  // Fix CamelCase breaks: "Whats\n\nApp" -> "WhatsApp"
  result = result.replace(CAMELCASE_BREAK, '$1$2');

  // Fix name prefix breaks: "Mc\nKinsey" -> "McKinsey"
  result = result.replace(NAME_PREFIX_BREAK, '$1$2');

  // Fix word + acronym: "Open\nAI" -> "OpenAI"
  result = result.replace(WORD_ACRONYM_BREAK, '$1$2');

  // Fix tech compounds: "Dev\nOps" -> "DevOps"
  result = result.replace(TECH_COMPOUND_BREAK, '$1$2');

  // Fix mid-word lowercase breaks: "infor\nmation" -> "information"
  result = result.replace(LOWERCASE_MIDWORD_BREAK, '$1$2');

  // Fix apostrophe breaks: "Linked\nIn's" -> "LinkedIn's"
  result = result.replace(APOSTROPHE_BREAK, '$1$2');

  return result;
}

/**
 * Fix sentences that were incorrectly broken mid-sentence.
 * Uses heuristics to detect and fix incomplete sentence breaks.
 */
export function fixBrokenSentences(text: string): string {
  let result = text;

  // Fix: word ending with comma or "and/or" followed by newline + lowercase
  // "First item, \nsecond item" -> "First item, second item"
  result = result.replace(/([,]|and|or)\s*[\n\r]+\s*([a-z])/g, '$1 $2');

  // Fix: article/preposition at end of line followed by newline
  // "This is a \ntest" -> "This is a test"
  result = result.replace(/\b(a|an|the|of|in|on|at|to|for|with|by)\s*[\n\r]+\s*([a-z])/gi, '$1 $2');

  return result;
}

/**
 * Normalize text for multi-line fields (keyTakeaways, summary, context).
 * Applies all normalization steps in the correct order.
 */
export function normalizeText(text: string): string {
  if (!text) return '';

  let result = text;

  // Step 1: Normalize newline characters (Windows -> Unix, literal \n -> actual)
  result = result.replace(/\r\n/g, '\n').replace(/\\n/g, '\n');

  // Step 2: Ensure ### headers have blank lines before and after
  // This runs before broken-word/sentence fixers so that the inserted blank lines
  // prevent those fixers from incorrectly joining heading text with content.
  // We use triple newlines here so fixBrokenWords' {1,2} quantifier cannot match
  // across heading boundaries; the blank-line collapser in Step 6 reduces them to \n\n.
  // Fix missing blank line before heading: "text### Heading" -> "text\n\n\n### Heading"
  result = result.replace(/([^\n])(###\s)/g, '$1\n\n\n$2');
  // Protect existing/new blank lines after headings by ensuring 3+ newlines
  // so fixBrokenWords' [\n\r]{1,2} quantifier cannot match across heading boundaries
  result = result.replace(/^(### .+)\n\n(?!\n)/gm, '$1\n\n\n');
  // Fix missing blank line after heading: "### Heading\nContent" -> "### Heading\n\n\nContent"
  result = result.replace(/^(### .+)\n(?!\n)/gm, '$1\n\n\n');

  // Step 3: Fix broken words (most critical - before other processing)
  result = fixBrokenWords(result);

  // Step 4: Fix broken sentences
  result = fixBrokenSentences(result);

  // Step 5: Ensure ### headers still have blank lines (catch any remaining cases
  // after broken-word/sentence fixers may have altered line structure)
  result = result.replace(/([^\n])(###\s)/g, '$1\n\n$2');
  result = result.replace(/^(### .+)\n(?!\n)/gm, '$1\n\n');

  // Step 6: Normalize excessive blank lines (3+ -> 2)
  result = result.replace(/\n{3,}/g, '\n\n');

  // Step 7: Remove repetitive garbage patterns (common LLM artifacts)
  result = result.replace(/(\u3002\s*\n\n){3,}/g, '\n\n'); // Chinese periods
  result = result.replace(/([.!?]\s*){5,}/g, '. '); // Excessive punctuation

  // Step 8: Trim trailing whitespace per line
  result = result.split('\n').map(line => line.trimEnd()).join('\n');

  return result.trim();
}

/**
 * Normalize text for single-line fields (tldr).
 * Collapses all newlines to spaces and removes excess whitespace.
 */
export function normalizeSingleLine(text: string): string {
  if (!text) return '';

  // Convert literal \n and actual newlines to spaces
  let result = text.replace(/\\n/g, ' ').replace(/[\n\r]+/g, ' ');

  // Collapse multiple spaces to single
  result = result.replace(/\s{2,}/g, ' ');

  return result.trim();
}
