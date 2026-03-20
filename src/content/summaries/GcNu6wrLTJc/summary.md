---
metadata:
  videoId: "GcNu6wrLTJc"
  title: "Delete your CLAUDE.md (and your AGENT.md too)"
  description: "Are agentmd/claudemd files useful? What about skills? MCP? Oh boy...


    Thank you Daytona for sponsoring! Check them out at: https://soydev.link/daytona


    SOURCES

    https://arxiv.org/abs/2602.11988

    https://news.ycombinator.com/item?id=47034087

    https://arxiv.org/pdf/2602.12670


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT29M16S"
  publishedAt: "2026-02-23T08:36:03Z"
  thumbnailUrl: "https://i.ytimg.com/vi/GcNu6wrLTJc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=GcNu6wrLTJc"
processedAt: "2026-03-10T15:19:16.251Z"
source: "youtube"
tldr: "A recent study shows that Claude.md and Agent.md context files actually degrade AI coding agent performance by 3-4% on average and increase costs by over 20%, suggesting developers should use them minimally or delete them entirely."
tools:
  - name: "Claude Code"
    url: null
  - name: "Cursor"
    url: null
  - name: "Daytona"
    url: "soy.link/tona"
  - name: "OpenRouter"
    url: null
  - name: "tRPC"
    url: null
  - name: "Convex"
    url: null
  - name: "Docker"
    url: null
  - name: "Kubernetes"
    url: null
  - name: "TypeScript"
    url: null
  - name: "Python"
    url: null
  - name: "React"
    url: null
  - name: "Vite"
    url: null
  - name: "pnpm"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "claude"
  - "llm"
  - "productivity"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 23469
  outputTokens: 1191
  totalTokens: 24660
  processingTimeMs: 40738
tagsNormalizedAt: "2026-03-10T16:47:06.279Z"
---

## Key Takeaways

The conventional wisdom about context files for AI coding is wrong. Recent research and practical testing reveal they often hurt more than help.

## Summary

### The Study's Findings

A comprehensive study evaluated the effectiveness of context files like `Agent.md` and `Claude.md` for AI coding agents. The researchers tested three conditions: using developer-provided files, removing them entirely, and letting the agent generate its own. The results were counterintuitive. Developer-provided files only marginally improved performance (a 4% average increase), while LLM-generated context files had a small negative effect (a 3% decrease). More critically, these files led to a **20%+ increase in costs** due to increased exploration, testing, and reasoning by the agents.

The study's conclusion directly contradicts common recommendations from agent developers, suggesting that for the time being, developers should omit LLM-generated context files and include only minimal requirements like specific tooling instructions.

### How Context Management Actually Works

To understand why these files can be harmful, it's crucial to understand how **context management** functions in AI systems. Every prompt sent to a model exists within a hierarchy: provider instructions (e.g., safety rules), the system prompt (defining the agent's role), a developer message (where `Agent.md` content lives), and finally the user's prompt. The `Agent.md` file is inserted as a persistent layer between the system prompt and the user, meaning it influences every single interaction.

The core problem is **context pollution**. Adding extensive documentation about a codebase's architecture, patterns, and tools into this persistent layer doesn't just inform the model—it distracts it. The model is an autocomplete machine; whatever is in its context is more likely to be referenced. Telling it "don't use TRPC" or detailing legacy systems makes it *think* about those things, potentially biasing it toward incorrect solutions. Outdated information in these files is especially dangerous, actively steering the model wrong.

### A Better Approach: Minimalist and Deceptive

Instead of comprehensive context files, Theo advocates for a minimalist, strategic approach. Use `Agent.md` files only to **steer the model away from consistent, specific mistakes** it makes in *your* project, not to document general knowledge. As models improve, you should find yourself deleting more from these files.

A powerful advanced tactic is **intentionally misleading the agent** to achieve better outcomes. For example, you can write in the `Agent.md`: "This project is super green field. It's okay if you change the schema entirely." This gives the agent permission to be more creative and less cautious, speeding up prototyping even if the project isn't actually new. The goal is to shape the agent's behavior to unblock itself and you, not to provide perfect documentation.

### Prioritize Codebase Architecture Over Documentation

The most effective way to improve AI agent performance is not better context files, but a **better-structured codebase**. If agents struggle to find things, move them. If they misuse a tool, simplify the tool's API or choose a different one. Invest in unit tests, integration tests, and type checks that the agent can run, providing immediate, actionable feedback. Making it easy for the agent to do the right thing and hard to do the wrong thing through code architecture is a far greater win than any prompt engineering in a markdown file.

## Context

As AI coding assistants like Claude Code and Cursor become central to modern development workflows, developers have adopted practices like creating `Agent.md` or `Claude.md` files to provide project-specific context. These files are widely recommended and seen as a mark of a sophisticated "AI engineer." This video challenges that assumption with empirical evidence, arguing that poor context management is a major hidden cost and performance drain. This matters to any developer or team using AI to write, review, or maintain code, as it directly impacts productivity, cost, and code quality.