---
metadata:
  videoId: "sdxJEd7nqiQ"
  title: "AI Design Just Got Way Better With This"
  description: "We tested pencil.dev, the new ai design tool, with claude code to bridge design system and ai coding workflows. Here's how pencil actually works — and the custom script we built to fix what was missing.


    Community with All Resources 📦: http://ailabspro.io/

    Video code: V46


    Every ai design tool we've tried either handles design or handles code, never both. Pencil dev claims to be the bidirectional bridge between ui design and ai coding agents, so we put it to the real test by building a full landing page and multi-page website for a Creator Direction Studio.


    In this video, we connect pencil to Claude Code, use Opus 4.6 as our model, and discover that the design-to-code sync isn't automatic, you have to prompt it manually every time. So we built a custom file-watching script that monitors the .pen design file and automatically triggers Claude CLI to sync changes to our Next.js project whenever we save, removing the repetitive overhead from the ai web design workflow.


    We then push it further with Claude Code's multi-agent system, spawning five agents to design five pages in parallel, all while keeping the design system consistent across fonts, colors, and styling. From there, we layer in GSAP scroll animations using detailed XML-structured prompts, add Lenis smooth scrolling on top for a more immersive feel, and run a custom UX Audit skill we built with Skill Creator to catch accessibility and usability issues programmatically.


    Whether you're into ai ui design, design ai workflows, or vibe coding your way through projects, this video walks through every step, from setup to a WCAG-compliant final product. We cover what pencil dev gets right, where it falls short, and the tools we built to make it actually work with ai agents like Claude AI and platforms like Cursor and Figma MCP.


    Hashtags:

    #ai #claudecode #vibecoding #figma #claudeai #cursor #aiagents #pencildev"
  channel: "AI LABS"
  channelId: "UCelfWQr9sXVMTvBzviPGlFw"
  duration: "PT9M59S"
  publishedAt: "2026-02-28T14:00:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/sdxJEd7nqiQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=sdxJEd7nqiQ"
processedAt: "2026-02-28T15:56:51.468Z"
source: "youtube"
tldr: "The video details how the team overcame AI design-to-code workflow gaps using pencil.dev, Claude Code, and a custom sync script to create a bidirectional design-code bridge, then enhanced a Next.js website with GSAP/Lenis animations and a UX audit skill."
tools:
  - name: "pencil.dev"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Figma"
    url: null
  - name: "Next.js"
    url: null
  - name: "Node.js"
    url: null
  - name: "GSAP"
    url: null
  - name: "Lenis"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "ai-design"
  - "design-to-code"
  - "claude"
  - "mcp"
  - "automation"
  - "ux-audit"
  - "nextjs"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8101
  outputTokens: 1008
  totalTokens: 9109
  processingTimeMs: 25351
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

The video explores bridging the gap between AI design and code implementation.

*   **pencil.dev acts as a design-to-code bridge**, connecting to AI coding platforms like Claude Code via MCP, but requires manual prompting for sync.

*   **A custom Node.js sync script automates the workflow** by monitoring design file changes and triggering Claude CLI updates with a cooldown to prevent token waste.

*   **Multi-agent systems and detailed XML prompts** accelerate development, enabling parallel page creation and precise implementation of libraries like GSAP and Lenis.

*   **A UX audit skill programmatically checks for issues** (e.g., color contrast), improving the site's usability and accessibility score from a C to a B.

## Summary

The video addresses the persistent challenge of seamless design-to-code handoff in AI-assisted development. Existing tools like Stitch, Bolt, or the read-only Figma MCP only handle one side of the equation, creating a broken workflow where every design change requires reprompting from scratch.

**pencil.dev** emerged as a promising solution, positioning itself as a bidirectional bridge between design canvases and AI coding agents like **Claude Code**. It stores designs in a JSON-based `.pen` file, supports component generation, and connects via MCP (Model Context Protocol). However, the team discovered it didn't auto-sync; developers had to manually prompt Claude to implement each design change, which became repetitive overhead.

To solve this, the team built a **custom Node.js sync script**. This script monitors the `.pen` design file for changes and, after a cooldown period, automatically fires the Claude CLI with a sync prompt. This eliminated the need for manual intervention each time a design was tweaked. A crucial pre-step was configuring permissions in Claude's `settings.json` to allow the necessary read, write, and MCP tool calls.

**Leveraging Multi-Agent Systems and Structured Prompts**
The team utilized Claude Code's multi-agent capability to parallelize work, assigning different agents to handle separate pages of their Next.js website for a creator direction studio. For implementing complex features, they used detailed **XML-structured prompts**, which Claude models parse effectively. This method was used to integrate **GSAP** for robust JavaScript animations and later **Lenis** for smooth scrolling, with the two libraries complementing each other for a more immersive experience.

**Final Polish with a UX Audit Skill**
Before finalizing, they used a **skill creator** to build a **UX audit skill**. This skill programmatically analyzed the website against a nine-point checklist, catching issues like poor color contrast that a human might miss. It flagged critical and major issues, initially scoring the site a 'C'. After implementing the recommended fixes, the site's usability improved, and its score rose to a 'B'.

The complete workflow—from design in pencil.dev, through automated syncing and multi-agent development, to final UX auditing—demonstrates a more integrated and efficient pipeline for AI-assisted web creation.

## Context

This video matters because it tackles a core friction point in modern AI-powered development: the disconnect between visual design tools and code-generation agents. For product teams, designers, and developers using AI, manually translating design iterations into code remains a major bottleneck. The demonstrated workflow, combining pencil.dev, Claude Code, automation scripts, and audit tools, shows a practical path toward a more cohesive, iterative, and high-quality AI development process. It connects to broader trends in agentic AI, MCP tool integration, and the pursuit of true 'design-to-code' automation.