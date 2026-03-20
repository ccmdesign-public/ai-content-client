# feat: Video Taxonomy System with Prompt Architecture Refactor

## Overview

Implement a video taxonomy system starting with **length classification** and refactor the prompt architecture to separate TypeScript rules from markdown prompt content. Videos will be categorized based on duration, with long-form videos (30min+) receiving a specialized summarization prompt optimized for deeper content.

## Problem Statement / Motivation

**Current State:**
- Single monolithic prompt file (`src/server/prompts/summary.prompt.ts`) mixing TypeScript interfaces, JSON schemas, and prompt text
- One-size-fits-all summarization regardless of video length
- Prompt modifications require TypeScript changes and rebuilds
- No separation between prompt logic (rules, schemas) and prompt content (the actual instructions)

**Why This Matters:**
- Long-form content (podcasts, lectures, documentaries) benefits from different summarization strategies:
  - Chapter/section breakdowns
  - More detailed key takeaways
  - Timeline references
- Markdown-based prompts enable faster iteration without code changes
- Clean separation enables future taxonomy expansions (topic, format, language)

## Proposed Solution

### 1. Video Taxonomy Classification

Create a taxonomy system that classifies videos by length:

| Category | Duration | Prompt Template |
|----------|----------|-----------------|
| `standard` | < 30 minutes | Standard summary prompt |
| `longform` | >= 30 minutes | Extended analysis prompt |

**Threshold Decision:** Use `>= 30 minutes` (inclusive). A video at exactly 30:00 is classified as `longform`.

### 2. New Prompt Architecture

```
src/server/prompts/
├── schemas/
│   └── summary.schema.ts       # Shared SummaryResponse schema + types
├── rules/
│   ├── base.rules.ts           # Common formatting rules
│   ├── standard.rules.ts       # Standard video-specific rules
│   └── longform.rules.ts       # Long-form video rules
├── templates/
│   ├── standard.prompt.md      # Standard video prompt content
│   └── longform.prompt.md      # Long-form video prompt content
├── loader.ts                   # Template loading + interpolation
├── taxonomy.ts                 # Video classification logic
└── index.ts                    # Main prompt builder with routing
```

### 3. Template Interpolation

Use Mustache-style syntax (`{{variable}}`) for markdown templates:

```markdown
# Video Summary Generator

You are summarizing a YouTube video for a personal knowledge base.

Video Title: {{title}}
Channel: {{channel}}
Duration: {{duration}}
Published: {{publishedAt}}
Length Category: {{lengthCategory}}

{{#transcript}}
Transcript:
{{transcript}}
{{/transcript}}

## Instructions
{{instructions}}
```

## Technical Approach

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        sync.service.ts                          │
│                       processVideo()                            │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      youtube.service.ts                         │
│        getVideoMetadata() → VideoMetadata { duration }          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
┌─────────────────────┐       ┌─────────────────────────────────┐
│   taxonomy.ts       │       │        ai.service.ts            │
│   classifyVideo()   │       │     generateSummary()           │
│   → "longform"      │       └───────────────┬─────────────────┘
└─────────┬───────────┘                       │
          │                                   ▼
          │               ┌───────────────────────────────────────┐
          │               │         prompts/index.ts              │
          └──────────────▶│     buildPromptForVideo(metadata,     │
                          │         taxonomy, transcript)         │
                          └───────────────┬───────────────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    ▼                     ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
          │   loader.ts     │   │  rules/*.ts     │   │ schemas/*.ts    │
          │ loadTemplate()  │   │ getRulesFor()   │   │ responseSchema  │
          └────────┬────────┘   └────────┬────────┘   └─────────────────┘
                   │                     │
                   ▼                     ▼
          ┌─────────────────────────────────────────┐
          │         Interpolated Prompt String       │
          └─────────────────────────────────────────┘
```

### Key Interfaces

```typescript
// src/server/prompts/taxonomy.ts
export type LengthCategory = 'standard' | 'longform';

export interface VideoTaxonomy {
  length: LengthCategory;
}

export function classifyVideo(durationIso: string): VideoTaxonomy {
  const seconds = parseIsoDuration(durationIso);
  const LONGFORM_THRESHOLD_SECONDS = 30 * 60; // 30 minutes

  return {
    length: seconds >= LONGFORM_THRESHOLD_SECONDS ? 'longform' : 'standard'
  };
}
```

```typescript
// src/server/prompts/rules/base.rules.ts
export interface PromptRules {
  formatting: string[];      // Markdown formatting rules
  constraints: string[];     // Length/style constraints
  examples?: {
    good: string[];
    bad: string[];
  };
}

export const baseRules: PromptRules = {
  formatting: [
    'Use markdown within each field: **bold**, bullet points (* or -), ### headers',
    'Paragraphs should be separated by blank lines',
    'Keep paragraphs short and scannable'
  ],
  constraints: [
    'DO NOT include the section headers (## Key Takeaways, etc.) - just the content'
  ]
};
```

```typescript
// src/server/prompts/loader.ts
export interface TemplateVariables {
  title: string;
  channel: string;
  duration: string;
  publishedAt: string;
  lengthCategory: LengthCategory;
  transcript?: string;
  instructions: string;
}

export async function loadTemplate(name: string): Promise<string>;
export function interpolate(template: string, variables: TemplateVariables): string;
```

## Acceptance Criteria

### Functional Requirements

- [ ] Videos < 30 minutes use `standard.prompt.md` template
- [ ] Videos >= 30 minutes use `longform.prompt.md` template
- [ ] Template loading works with Nitro serverAssets (bundled at build)
- [ ] OpenRouter fallback uses same prompt architecture
- [ ] Taxonomy is recorded in markdown frontmatter: `lengthCategory: "longform"`
- [ ] Existing summaries continue to work (backward compatible output format)

### Non-Functional Requirements

- [ ] Templates validated at module load (fail-fast on missing/invalid templates)
- [ ] Template loading is cached (not re-read on each request)
- [ ] No circular import issues in new module structure

### Quality Gates

- [ ] Unit tests for `classifyVideo()` including boundary cases (29:59, 30:00, 30:01)
- [ ] Unit tests for template loader with variable interpolation
- [ ] Integration test verifying correct prompt selection
- [ ] Existing `gemini.test.ts` updated for new imports

## Implementation Phases

### Phase 1: Foundation (Non-Breaking)

Create new files without changing existing behavior.

**Files to Create:**
- `src/server/prompts/taxonomy.ts` - Classification logic
- `src/server/prompts/schemas/summary.schema.ts` - Extract schema from current file
- `src/server/prompts/loader.ts` - Template loading utility
- `src/tests/prompts/taxonomy.test.ts` - Taxonomy tests

**Acceptance:**
- [ ] `classifyVideo("PT35M10S")` returns `{ length: "longform" }`
- [ ] `classifyVideo("PT10M25S")` returns `{ length: "standard" }`
- [ ] All existing tests pass unchanged

### Phase 2: Create Templates & Rules

Build the new prompt structure.

**Files to Create:**
- `src/server/prompts/rules/base.rules.ts`
- `src/server/prompts/rules/standard.rules.ts`
- `src/server/prompts/rules/longform.rules.ts`
- `src/server/prompts/templates/standard.prompt.md`
- `src/server/prompts/templates/longform.prompt.md`
- `src/server/prompts/index.ts` - New entry point

**Configuration:**
```typescript
// nuxt.config.ts - Add server assets
nitro: {
  serverAssets: [{
    baseName: 'prompts',
    dir: './server/prompts/templates'
  }]
}
```

**Acceptance:**
- [ ] Templates load successfully via `useStorage('assets:prompts')`
- [ ] Variable interpolation works correctly
- [ ] Rules merge correctly (base + specific)

### Phase 3: Wire Up Taxonomy Routing

Connect classification to prompt selection.

**Files to Modify:**
- `src/server/services/ai.service.ts:191-194` - Use new prompt builder
- `src/server/services/openrouter.service.ts:104-107` - Use new prompt builder
- `src/server/services/sync.service.ts` - Add taxonomy to flow
- `src/server/services/content-writer.service.ts` - Add `lengthCategory` to frontmatter
- `src/types/summary.ts` - Add `lengthCategory` to `MarkdownFrontmatter`

**Acceptance:**
- [ ] Long-form videos get different prompt (verified via logging)
- [ ] Output markdown includes `lengthCategory` field
- [ ] All existing functionality works

### Phase 4: Cleanup & Documentation

Remove old code, update docs.

**Files to Remove/Deprecate:**
- `src/server/prompts/summary.prompt.ts` - Mark deprecated, then remove

**Files to Update:**
- `src/tests/services/gemini.test.ts` - Update imports
- `CLAUDE.md` - Document new prompt architecture

**Acceptance:**
- [ ] No references to old `summary.prompt.ts`
- [ ] All tests pass
- [ ] Build succeeds

## MVP Implementation

### standard.prompt.md

```markdown
You are summarizing a YouTube video for a personal knowledge base.

Video Title: {{title}}
Channel: {{channel}}
Duration: {{duration}}
Published: {{publishedAt}}

{{#transcript}}
Transcript:
{{transcript}}

{{/transcript}}
Provide a summary with these four fields:

## tldr (max 400 characters)
- The single most important insight or actionable lesson
- Be specific: include names, numbers, methods, or key terminology
- Use bullet points (•) only if there are 2-3 tightly related points

## keyTakeaways
- Start with a brief intro sentence explaining the core message
- Then 2-4 bullet points with the key insights
- Use **bold** for important terms

## summary (300-600 words)
- Expand on the key points with supporting details
- Use multiple paragraphs - short ones (2-3 sentences each)
- Use bullet lists for steps, tips, or related points
- Use **bold** for key terms being introduced

## context (50-150 words)
- Background: Why does this matter?
- Who should care about this?
- How does it connect to broader trends or applications?

{{formattingRules}}
```

### longform.prompt.md

```markdown
You are summarizing a LONG-FORM YouTube video (30+ minutes) for a personal knowledge base.
This requires more comprehensive analysis than shorter videos.

Video Title: {{title}}
Channel: {{channel}}
Duration: {{duration}}
Published: {{publishedAt}}

{{#transcript}}
Transcript:
{{transcript}}

{{/transcript}}
Provide a summary with these four fields:

## tldr (max 400 characters)
- Capture the central thesis or main argument of the entire piece
- Be specific: include the speaker's key claim, methodology, or conclusion
- For interviews/podcasts: focus on the most significant revelation or insight

## keyTakeaways
- Start with 1-2 sentences framing the overall topic and speaker's perspective
- Then 4-6 bullet points covering the major themes or sections
- Use **bold** for important terms and concepts
- Include any actionable recommendations or frameworks presented

## summary (600-1000 words)
- Break into sections using ### headers for major topic shifts
- Each section: 2-3 paragraphs covering that segment
- Include specific examples, data points, or quotes when available
- Use bullet lists for enumerated points, steps, or comparisons
- Maintain chronological flow where relevant
- Use **bold** for key terms and concepts being introduced

## context (100-200 words)
- Who is the speaker/host and what's their expertise?
- What's the broader conversation this contributes to?
- Why is this relevant now?
- Who would benefit most from watching the full video?

{{formattingRules}}
```

## Success Metrics

- Long-form summaries have ~50% more content in `summary` field
- Long-form summaries use section headers (###)
- No degradation in standard video summary quality
- Template changes can be deployed without code changes

## Dependencies & Prerequisites

- Existing `parseIsoDuration()` utility in `src/server/utils/duration.ts`
- Nitro serverAssets support (already available in Nuxt 3.x)
- Current AI service fallback chain must be preserved

## Risk Analysis & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Templates produce worse output | Medium | High | A/B test with sample videos before full rollout |
| OpenRouter breaks with new prompts | Low | Medium | Test fallback chain explicitly |
| Performance regression from file loading | Low | Low | Cache templates at module load |
| Breaking change to existing summaries | Low | Medium | Keep same output schema, only content changes |

## References & Research

### Internal References
- Current prompt: [summary.prompt.ts](src/server/prompts/summary.prompt.ts)
- Duration utility: [duration.ts](src/server/utils/duration.ts)
- AI service: [ai.service.ts:191-194](src/server/services/ai.service.ts#L191-L194)
- OpenRouter: [openrouter.service.ts:104-107](src/server/services/openrouter.service.ts#L104-L107)
- Content writer: [content-writer.service.ts](src/server/services/content-writer.service.ts)

### External References
- [Nitro Server Assets](https://github.com/nitrojs/nitro/blob/main/docs/1.docs/50.assets.md)
- [Prompt Template Best Practices](https://latitude-blog.ghost.io/blog/5-patterns-for-scalable-prompt-design/)
- [Video Duration Statistics](https://wistia.com/learn/marketing/optimal-video-length)

### Related Patterns
- Template Method pattern for prompt inheritance
- Composition pattern for rules merging

---

## Questions to Confirm Before Implementation

1. **Threshold Boundary:** Is exactly 30 minutes (`PT30M0S`) classified as `longform`? *(Assumed: Yes, >= 30min)*

2. **Output Schema:** Does `longform` use the same `SummaryResponse` schema with different word counts, or a different schema? *(Assumed: Same schema, different lengths)*

3. **Frontmatter Addition:** Should we add `lengthCategory` and `promptVersion` to output frontmatter for traceability? *(Assumed: Yes)*

---

*Plan created: 2026-01-10*
*AI-assisted planning with Claude Code*
