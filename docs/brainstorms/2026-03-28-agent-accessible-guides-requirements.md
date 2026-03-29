---
date: 2026-03-28
topic: agent-accessible-guides
---

# Agent-Accessible Guides (llms.txt)

## Problem Frame

AI coding agents (Claude Code, Cursor, Copilot) and AI search engines (Perplexity, ChatGPT Search) are becoming primary ways developers discover and consume documentation. The platform has 800+ tool guides with structured, high-quality markdown content, but none of it is optimized for agent consumption. Agents today either can't find the content or have to parse rendered HTML — a friction that pushes them toward competing sources that serve clean markdown.

The llms.txt convention is the emerging standard for declaring a site agent-friendly, adopted by Anthropic, Vercel, Stripe, and others. Implementing it makes the guide content discoverable and consumable by both coding agents and AI search engines.

This feature ships alongside the tool guides redesign (see `2026-03-28-masterclasses-requirements.md`) and serves the new two-section guide format.

## Requirements

**llms.txt Index**

- R1. The site serves `/llms.txt` — a brief, human-readable index that describes the site and links to available markdown content sections
- R2. `/llms.txt` includes: site name/description, link to `/llms-full.txt`, and links to individual guide markdown endpoints grouped by category
- R3. The site serves `/llms-full.txt` — a concatenation of all guide content in clean markdown, with clear section separators between guides. v1 includes all guides; if the file exceeds 5 MB, split into category-specific files (e.g., `/llms-tools.txt`, `/llms-techniques.txt`) linked from `/llms.txt`

**Raw Markdown Endpoints**

- R4. Each guide is available at `/guides/[slug].md` as clean markdown with `Content-Type: text/markdown` response header
- R5. The markdown output includes a source attribution header: site name, canonical URL back to the HTML page, and last-updated date
- R6. The markdown output contains the full guide content — no navigation, no chrome, no HTML. The output includes whatever sections the guide has (the structure is owned by the tool guides redesign)
- R7. The `/guides/` index is available at `/guides.md` — a markdown directory listing all available guides with links to their `.md` endpoints. This complements `/llms.txt` (the standardized agent discovery file) with a human-readable browsable directory

**AI Crawler Access**

- R8. `robots.txt` is updated to explicitly allow known AI crawlers (initially: GPTBot, ClaudeBot, PerplexityBot, Google-Extended) and reference the llms.txt location. The crawler list is maintained as new AI crawlers emerge
- R9. `robots.txt` uses the production domain (not the current placeholder `summaries.example.com`)

**Discoverability Signals**

- R10. HTML pages include a `<link>` tag pointing to the corresponding `.md` endpoint (e.g., `<link rel="alternate" type="text/markdown" href="/guides/claude-code.md">`)
- R11. The `/llms.txt` URL is referenced in the HTML `<head>` of every page for crawler discovery
- R12. Each guide's HTML page includes JSON-LD structured data (Article or TechArticle schema) with the markdown endpoint as an alternate format

## Success Criteria

- An AI coding agent that fetches `/llms.txt` can discover all available guide topics and retrieve any guide as clean markdown
- A developer in Claude Code asks "how do I use Cursor?" and the agent can fetch `/guides/cursor.md` and reference the content with a citation URL back to the HTML page
- AI search engines (Perplexity, ChatGPT Search) can crawl and index the guide content, citing the site as a source in their answers
- The markdown endpoint for a guide returns clean, parseable markdown — no HTML tags, no navigation elements, no JavaScript

## Scope Boundaries

- v1 covers guides only — summaries, articles, and newsletters are not exposed via llms.txt (can be added later)
- No MCP server in v1 — passive discoverability via llms.txt is sufficient
- No Context7 registration in v1 — explore as a fast follow after launch
- No authentication or rate limiting on markdown endpoints — content is public
- llms-full.txt is generated at build time, not on-demand (avoids server load for a potentially large file)

## Key Decisions

- **llms.txt convention over custom API**: Follows the emerging standard rather than inventing a proprietary agent API. Lower friction for agents that already support the convention.
- **/guides/[slug].md URL pattern**: Separate `.md` URL alongside the HTML page. Clean, predictable, easy for agents to construct programmatically.
- **Ships with tool guides redesign**: Both features design and ship together — the markdown endpoints serve the new two-section guide format.
- **Build-time generation for llms-full.txt**: The full content file is generated during the build step, keeping runtime costs zero. Individual `.md` endpoints can be server-rendered or prerendered.
- **Source attribution in markdown**: Each `.md` file starts with metadata (site, URL, date) so agents naturally cite back to the HTML page when referencing the content.

## Dependencies / Assumptions

- Depends on the tool guides redesign (`2026-03-28-masterclasses-requirements.md`) for the content format and route structure
- The production domain must be finalized before `robots.txt` and canonical URLs can reference it
- llms.txt is a convention, not a formal standard — agent support varies. GPTBot, ClaudeBot, and PerplexityBot are the primary targets.

## Outstanding Questions

### Deferred to Planning

- [Affects R4][Technical] Should `.md` endpoints be prerendered at build time or server-rendered on demand? Trade-off between build time and freshness.
- [Affects R12][Needs research] What JSON-LD schema is most appropriate for tool guides? `TechArticle`, `HowTo`, or `Article`?
- [Affects R10][Technical] How should the `<link rel="alternate">` tag integrate with Nuxt's `useHead` / `useSeoMeta` composables?
- [Affects R1][Needs research] What is the current best-practice structure for `llms.txt`? Review implementations from Anthropic, Vercel, and Stripe for patterns.

## Next Steps

→ `/ce:plan` for structured implementation planning (implement alongside the tool guides redesign)
