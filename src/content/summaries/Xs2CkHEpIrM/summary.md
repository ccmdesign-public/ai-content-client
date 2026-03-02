---
metadata:
  videoId: "Xs2CkHEpIrM"
  title: "Why I Stopped Using MCPs in Claude Code (And What I Use Instead)"
  description: "There's a really big problem with using MCP servers with Claude Code. In this video I show how connecting just 7 MCP servers consumes 50% of my context window, before I even type a single prompt. I'll show you how you can still give Claude Code access to the same number of MCPs without losing any context.


    🎥 Watch Next

    1. Make Claude Code 100x BETTER (Context Engineering)

    https://youtu.be/ySA9tJ8RfVM

    2. These 2 Tools Will Change How You Use Claude Code

    https://youtu.be/imw8MkwW9xw

    3. How I Turned Claude Code Into My Personal Assistant... You can too!

    https://youtu.be/aYAVSG4Ra40


    Support me making more content and free coding projects like this.

    https://buymeacoffee.com/kennyliao

    Thank you so much for your support!


    AI Launchpad Community waitlist. Free to join.

    https://kenneth-liao.kit.com/join


    🛠️ Resources

    1. MCP Launchpad: https://github.com/kenneth-liao/mcp-launchpad

    2. Get any of my plugins, free! https://github.com/kenneth-liao/ai-launchpad-marketplace


    🕒 Sections 

    00:00 - Intro

    00:27 - The Problem

    03:35 - The Solution

    05:32 - MCP Launchpad

    06:50 - MCP Launchpad Demo

    12:20 - MCP Launchpad with Claude Code

    16:07 - MCP Launchpad Setup


    ✉️ For Business Inquiries:\ 

    kennyliao@theailaunchpad.io


    #claudecode #mcp #aiagents"
  channel: "Kenny Liao"
  channelId: "UCOEqiv0-yg_hx0nJiaWJK4Q"
  duration: "PT25M32S"
  publishedAt: "2026-01-12T14:01:03Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Xs2CkHEpIrM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Xs2CkHEpIrM"
processedAt: "2026-01-17T17:01:08.212Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Directly connecting multiple MCP servers to Claude Code bloats the context window, causing **context rot** and performance degradation. **MCP Launchpad** solves this by:

  - Replacing dozens of tool definitions with a single **CLI gateway**

  - Using **BM25 semantic search** for on-demand tool discovery

  - Restoring nearly **100% of the context window** while scaling to thousands of tools.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5093
  outputTokens: 830
  totalTokens: 7259
  processingTimeMs: 15038
tools:
  - name: "Claude Code"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "MCP Launchpad"
    url: "https://github.com/kenneth-liao/mcp-launchpad"
  - name: "AI Launchpad Marketplace"
    url: "https://github.com/kenneth-liao/ai-launchpad-marketplace"
  - name: "UV"
    url: null
  - name: "Sentry"
    url: null
  - name: "Linear"
    url: null
  - name: "Superbase"
    url: null
  - name: "BM25"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "agents"
  - "ai-coding"
  - "best-practices"
  - "claude"
  - "rag"
tagsNormalizedAt: "2026-03-01T21:19:30.368Z"
---

## Key Takeaways

Connecting multiple MCP servers directly to Claude Code creates a massive bottleneck where tool definitions consume over 50% of the available **200,000 token limit**.

* **Context Rot** occurs when irrelevant tool data distracts the AI, leading to lower reasoning quality and higher costs.

* **MCP Launchpad** acts as a unified CLI that follows the principle of **progressive disclosure**, where Claude only learns about a tool's schema when it specifically needs it.

* The tool enables **semantic search**, allowing Claude to find capabilities (like database querying or issue tracking) across dozens of servers using natural language queries.

## Summary

The current standard for using Model Context Protocol (MCP) servers with Claude Code involves connecting them directly to the agent. While easy to set up, this method is fundamentally unscalable. Each MCP server injects its entire tool schema into the system prompt. For a power user with seven or more servers, this can consume 100,000 tokens—half of Claude's context window—before a single word is typed. This results in **context rot**, where the model's performance degrades because it is overwhelmed by irrelevant information.

### The MCP Launchpad Concept
To solve this, the author developed **MCP Launchpad**, a CLI tool built with **UV** that centralizes all MCP servers. Instead of pre-loading thousands of tool definitions, Claude is given a small system prompt instructing it to use the `mcpl` command. This shifts the AI's workflow from "total recall" to "just-in-time discovery." When Claude needs a specific capability, it uses the CLI to find, inspect, and then execute the appropriate tool.

### Key Features of the Tool
The Launchpad provides several essential functions for AI agents:

- **Semantic Search:** Utilizing the **BM25 algorithm**, Claude can search for tools using keywords or concepts (e.g., "Sentry errors" or "SQL query").

- **Tool Inspection:** Claude can call `mcpl inspect` to receive the exact JSON schema for a specific tool, ensuring it uses the correct parameters.

- **Caching and Management:** The tool caches definitions from various MCP servers to ensure fast lookups and allows users to enable or disable specific servers easily.

### Setup and Configuration
Users can install the utility as a global tool using **UV**. Configuration is managed via an `mcp.json` file and a `.env` file for secrets, typically stored in the user's hidden `.claude` directory. To complete the integration, a `claude.md` file is used to provide the AI with the necessary instructions on how to browse and use the Launchpad. This setup ensures that the AI's workspace remains clean, preserving the context window for actual coding and problem-solving tasks.

## Context

As AI agents like Claude Code become more autonomous, the demand for specialized tools (Sentry, Linear, Superbase, etc.) is increasing. However, current LLM architectures struggle with the trade-off between having many capabilities and maintaining high-quality reasoning. This video addresses the technical bottleneck of 'context bloat' in agentic workflows. It is essential for developers and AI power users who want to scale their agents' capabilities to hundreds or thousands of tools without sacrificing the model's accuracy or exceeding token limits. This represents a broader shift toward 'agentic discovery' as a best practice in AI engineering.
