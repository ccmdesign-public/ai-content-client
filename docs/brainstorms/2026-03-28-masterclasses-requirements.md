---
date: 2026-03-28
topic: tool-guides-redesign
---

# Tool Guides Redesign

## Problem Frame

The platform ingests 1500+ video summaries and 600+ articles about AI tools and techniques, but the current tool detail page (3-tier beginner/intermediate/advanced model) treats depth as the primary axis. In practice, users don't self-select skill levels — they want "tell me what I need to know." Meanwhile, AI agents are a genuinely distinct audience that needs structured, injectable artifacts, not prose guides.

The redesign splits each tool page into two purpose-driven sections:
1. **What you need to know** — for the human operator
2. **What your agent needs to know** — for AI agents

This makes each tool page a central hub where humans learn how to use an AI tool, and get exactly what they need to inject into their agent to make it work better.

## Requirements

**Content Structure**

- R1. Each tool guide page has two primary sections: "What you need to know" (human) and "What your agent needs to know" (agent)
- R2. The human section uses structured subsections with optional sections: core subsections (Overview, How It Works) are always present; optional subsections (Best Practices, Common Pitfalls, Workflows That Work, Integrations) appear only when content warrants them
- R3. The agent section surfaces three types of resources when available: primer prompts, installable artifacts (MCP servers, CLIs, skill folders, repos), and configuration examples (CLAUDE.md entries, .cursorrules, tool configs)
- R4. When agent resources cannot be found for a tool, the agent section flags the gap explicitly rather than omitting the section — this signals where manual curation is needed

**Content Generation**

- R5. Both sections are AI-generated from ingested video/article summaries, supplemented by automated searches of skill repositories and catalogs
- R6. The generation pipeline searches major skill repos/catalogs (to be researched during planning) to find installable artifacts, MCP servers, and configuration examples for each tool
- R7. A single base prompt defines the universal guide structure, tone, and composition rules — shared across all topics
- R8. Each topic can have an optional extra prompt to customize generation for topic-specific needs
- R9. Prompts and topic inventory configuration live in the scraper repo alongside the existing content pipeline

**Dual-Format Agent Section**

- R10. The agent section renders as human-readable markdown on the page with code blocks for primer prompts and config examples
- R11. The page includes a "Copy .md" button that copies the agent section as clean markdown
- R12. The page also exposes a structured data endpoint (JSON-LD, API route, or downloadable file) that agents can consume programmatically

**URL & Navigation**

- R13. Tool guide pages live at `/guides/[slug]`, replacing the current `/tools/[slug]` route
- R14. The index page at `/guides/` supports filtering/grouping by category (tools, techniques, skills) with search/sort
- R15. Tools that don't have a generated guide yet appear in the index as basic entries (preserving directory functionality during rollout)

**Evergreen Updates**

- R16. Guides update automatically when new summaries or articles about a topic are ingested — content-triggered, not scheduled
- R17. The update process regenerates the guide using all available content, incorporating new information while preserving the two-section structure

**Migration**

- R18. Existing 3-tier content is discarded — all guide content is regenerated from scratch using the new 2-section structure
- R19. Redirects from `/tools/[slug]` to `/guides/[slug]` preserve existing links
- R20. The existing scraper-side tools pipeline (extraction, aggregation, aliases, enrichment, categorization) is reused as backend support

## Success Criteria

- A user visiting `/guides/claude-code` sees two clear sections: what they need to know as a human operator, and what to inject into their agent
- The agent section for a tool like Claude Code surfaces primer prompts, MCP server links, and example configs — not just prose descriptions
- A user can click "Copy .md" and paste the agent section directly into their CLAUDE.md or agent config
- An agent can fetch structured data from the endpoint and parse tool capabilities, integration instructions, and primer prompts
- When agent resources can't be auto-discovered for a tool, the gap is visibly flagged for curation
- When new content about a tool is ingested, the guide reflects it without manual intervention

## Scope Boundaries

- Pilot with one tool (e.g., Claude Code or Google Stitch) before expanding
- No user-generated content or community contributions in v1
- No interactive elements (quizzes, progress tracking) — static content pages
- No paid/gated content — guides are free and public
- Guide generation uses AI — not hand-written
- Category (tool/technique/skill) is metadata for organization, not a structural differentiator

## Key Decisions

- **Audience over depth**: Two sections split by audience (human vs. agent) instead of three tiers split by skill level. The old model assumed users self-select depth; the new model gives each audience exactly what they need
- **Structured with optional subsections**: Human section has consistent core subsections (Overview, How It Works) with optional ones that appear only when warranted
- **Auto-discover agent resources**: Pipeline searches skill repos/catalogs to find MCP servers, CLIs, skills, and configs. Gaps are flagged, not hidden
- **Dual-format agent section**: Renders as readable markdown on the page, copyable via button, and available as structured data for programmatic consumption
- **Rename to /guides/**: Better reflects the dual-purpose nature of the pages than /tools/ or /masterclasses/
- **Regenerate from scratch**: Existing tier content is discarded. Clean break to the new structure
- **All generation lives in the scraper repo**: Consistent with existing architecture

## Dependencies / Assumptions

- The existing tools pipeline (887 tools, extraction, enrichment, categorization) provides the foundation
- Major skill repos/catalogs exist and are searchable (needs research during planning)
- The scraper's content pipeline can be extended to search external repos for agent resources
- Nuxt content collections can accommodate the new guide content type

## Outstanding Questions

### Deferred to Planning

- [Affects R6][Needs research] What are the major skill repos/catalogs to search? (e.g., MCP registry, smithery.ai, skill.ai, GitHub awesome-lists, etc.)
- [Affects R12][Technical] What format should the structured data endpoint use? JSON-LD on the page, a `/api/guides/[slug].json` route, or a downloadable `.md` file?
- [Affects R7][Needs research] What prompt structure produces the best results for the two-section format? Requires iteration during pilot
- [Affects R13][Technical] What's the redirect strategy from `/tools/` to `/guides/`? Server-side redirects, client-side, or both?
- [Affects R14][Technical] How should non-guide tools appear in the new `/guides/` index?
- [Affects R6][Technical] How should the pipeline handle tools where no agent resources are found in any searched repo/catalog?

## Next Steps

→ `/ce:plan` for structured implementation planning
