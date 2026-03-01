/**
 * Prompt rules define formatting guidelines and constraints for AI responses.
 * Rules are merged (base + specific) when building prompts.
 */
export interface PromptRules {
  /** Markdown formatting rules */
  formatting: string[];
  /** Content constraints (length, style) */
  constraints: string[];
  /** Optional examples of good/bad outputs */
  examples?: {
    good: string[];
    bad: string[];
  };
}

/**
 * Base formatting rules shared by all prompt templates.
 * These are combined with category-specific rules.
 */
export const baseRules: PromptRules = {
  formatting: [
    'Use markdown within each field: **bold**, bullet points (* or -), ### headers',
    'Paragraphs should be separated by blank lines',
    'ALWAYS put a blank line after ### headers before starting paragraph text',
    'Keep paragraphs short and scannable',
    'NEVER break words across lines - keep compound names intact (WhatsApp, McKinsey, LinkedIn)',
    'Each sentence must be complete on its line - no mid-sentence breaks',
    'Bullet points must be complete on a single line'
  ],
  constraints: [
    'DO NOT include the section headers (## Key Takeaways, etc.) - just the content'
  ]
};

/**
 * Merge base rules with category-specific rules.
 * Arrays are concatenated, not replaced.
 */
export function mergeRules(specific: Partial<PromptRules>): PromptRules {
  return {
    formatting: [...baseRules.formatting, ...(specific.formatting || [])],
    constraints: [...baseRules.constraints, ...(specific.constraints || [])],
    examples: specific.examples || baseRules.examples
  };
}

/**
 * Format rules as a string for template interpolation.
 */
export function formatRulesForPrompt(rules: PromptRules): string {
  const lines: string[] = [];

  lines.push('Formatting rules:');
  for (const rule of rules.formatting) {
    lines.push(`- ${rule}`);
  }

  if (rules.constraints.length > 0) {
    for (const constraint of rules.constraints) {
      lines.push(`- ${constraint}`);
    }
  }

  return lines.join('\n');
}
