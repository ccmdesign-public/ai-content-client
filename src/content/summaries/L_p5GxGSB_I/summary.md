---
metadata:
  videoId: "L_p5GxGSB_I"
  title: "Agent Skills, Rules, Subagents: Explained!"
  description: "There's a lot of new terms for how you manage context with coding agents. I don't think it needs to be this complicated. Here's what you need to know, and some history on how we've gotten here.


    https://cursor.com/blog/dynamic-context-discovery

    https://cursor.com/docs/context/skills

    https://cursor.com/docs/context/subagents

    https://cursor.com/docs/context/rules

    https://cursor.com/docs/agent/hooks"
  channel: "leerob"
  channelId: "UCZMli3czZnd1uoc1ShTouQw"
  duration: "PT7M17S"
  publishedAt: "2026-01-15T14:39:14Z"
  thumbnailUrl: "https://i.ytimg.com/vi/L_p5GxGSB_I/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=L_p5GxGSB_I"
processedAt: "2026-01-24T16:05:03.034Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Coding agent complexity can be reduced to two core concepts: **static context (rules)** for essential, always-present information and **dynamic context (skills)** for on-demand, code-based capabilities, evolving from earlier systems like MCP servers and commands to avoid context bloat."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2151
  outputTokens: 824
  totalTokens: 2975
  processingTimeMs: 148978
tools:
  - name: "Cursor"
    url: "https://cursor.com"
  - name: "Windsurf"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Slack"
    url: null
  - name: "Linear"
    url: null
  - name: "Git"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - ai-coding
  - agents
  - git
  - workflow
  - best-practices
---

## Key Takeaways

This video explains the evolution of coding agent systems and distills them into two essential concepts for effective use.

*   **Core Concepts are Rules (static context) and Skills (dynamic context):** You only need to manage minimal, high-quality rules included in every conversation and package dynamic workflows/code as skills that load on-demand.

*   **Skills evolved to solve context bloat:** They replace or optimize earlier systems like **MCP servers** and **slash commands**, bundling code, executables, and assets without inflating the initial context window unless used.

*   **Other features (hooks, subagents, modes) serve specific reliability needs:** These provide deterministic actions, focused personas, or UI/planning extensions, but skills and rules handle most user requirements.

*   **Best practice: Treat rules as a living document:** Continuously refine your rules file (e.g., `agents.md`) by adding fixes when the agent makes mistakes, keeping it minimal and high-quality.

## Summary

The video traces the historical development of coding agent systems, showing how various features converged into two primary concepts to reduce complexity.

### The Evolution of Agent Systems
Initially, **rules files** were created to combat model hallucinations by providing **static context**—essential information included in every conversation. As rules grew, they split into multiple files but combined into one static context block. The idea of conditional inclusion emerged but was ahead of its time due to early tool-calling limitations.

Next, **slash commands/custom commands** allowed packaging and sharing repeatable prompt workflows (like a Git commit-to-PR flow). To enable code execution, **MCP servers** were introduced, connecting to external systems and exposing **third-party tools** (e.g., for Slack or Linear). However, loading many tools bloated the context window.

### Consolidating into Core Concepts
Features like **modes** and **subagents** added UI discoverability and scoped tool access for reliability, while **deterministic hooks** guaranteed specific pre/post-conversation actions. The key insight is that all these systems represent two types of context:

*   **Static Context (Rules):** Persistent, high-quality information loaded in every conversation.

*   **Dynamic Context (Skills):** Code-based capabilities that load on-demand, avoiding bloat.

### Skills as the Dynamic Solution
**Skills** encapsulate this dynamic context. In their simplest form, they are reusable workflows (like a command). At their most advanced, they bundle scripts, executables, and assets as distributable code. Modern agents (like Cursor) can optimize around this pattern—for example, loading MCP server tools only when used, preserving benefits like OAuth while minimizing overhead.

### Practical Guidance
For users, the mental model simplifies to managing **rules** and **skills**. Rules should be a minimal, living document updated when errors occur. Skills are the evolving standard for dynamic capabilities, with ecosystems expected to grow. Other features (hooks, subagents) serve niche reliability needs but aren't the primary focus.

## Context

This matters because the ecosystem of AI-powered coding assistants (like Cursor, Windsurf, Claude Code) has rapidly expanded with overlapping features—rules, MCP servers, commands, hooks—creating confusion. Developers using these agents need a clear mental model to work effectively without getting bogged down in implementation details. The consolidation into 'rules' and 'skills' reflects a maturation towards open standards and user-centric design, enabling teams to share and optimize agent capabilities efficiently. This is critical for integrating AI coding tools into professional development workflows.