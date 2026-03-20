---
metadata:
  videoId: "l7qVtHpctic"
  title: "Claude Code's MCP Problem Just Got Fixed"
  description: "Anthropic just fixed the biggest issue with using MCP servers with Claude Code. Connecting MCP servers directly to Claude Code was the fastest way to consume the entire context window, degrading Claude Code's performance and leaving less space for working conversation. In this video, I'm going to break down everything you need to know about the new MCP Search Tool that allows Claude Code to efficiently discover and use MCP tools without pre-loading all of the MCP tool definitions into the context window, saving you 10s of thousands of tokens!

    **NOTE**: I made a mistake in the CC version, the MCP Search Tool was released with v2.1.9 not v2.1.7! See the full change log here: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

    🎥 Watch Next

    1. Why I stopped using MCP Servers in Claude Code (until now): https://youtu.be/Xs2CkHEpIrM

    2. Context Engineering for Claude Code: https://youtu.be/ySA9tJ8RfVM

    3. Complete Claude Skills Guide:  https://youtu.be/421T2iWTQio

    4. Turn Claude Code into a Personal Assistant: https://youtu.be/aYAVSG4Ra40

    Support me making more content and sharing free tools!

    https://buymeacoffee.com/kennyliao

    Thank you so much for your support!

    AI Launchpad Community waitlist. Free to join.

    https://kenneth-liao.kit.com/join

    🛠️ Resources

    1. MCP Launchpad: https://github.com/kenneth-liao/mcp-launchpad

    2. Get any of my plugins, free! https://github.com/kenneth-liao/ai-launchpad-marketplace

    🕒 Sections 

    00:00 - Intro

    00:43 - MCP Tool Search Release Tweet

    01:35 - Problem with MCPs in Skills & Subagents

    02:43 - Problem with Docker MCP Toolkit

    04:41 - Problem with MCPs in Claude Code

    07:50 - Enable new MCP Search Tool

    10:25 - How new MCP Search Tool Works

    ✉️ For Business Inquiries:\ 

    kennyliao@theailaunchpad.io

    #claudecode #mcp #aiagents"
  channel: "Kenny Liao"
  channelId: "UCOEqiv0-yg_hx0nJiaWJK4Q"
  duration: "PT28M24S"
  publishedAt: "2026-01-17T21:24:09Z"
  thumbnailUrl: "https://i.ytimg.com/vi/l7qVtHpctic/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=l7qVtHpctic"
processedAt: "2026-01-18T16:35:26.181Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Anthropic introduced **lazy loading** in Claude Code 2.17 to eliminate MCP context bloat.

  - **Enable tool search** by setting `enable_tool_search: true` in `settings.json`.

  - **Reduces token usage** from tens of thousands to near zero by fetching schemas on demand.

  - **Maintains performance** by injecting specific tools only when identified by name or keyword.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5863
  outputTokens: 792
  totalTokens: 11552
  processingTimeMs: 37736
tools:
  - name: "Claude Code"
    url: "https://github.com/anthropics/claude-code"
  - name: "Model Context Protocol"
    url: null
  - name: "MCP Search Tool"
    url: null
  - name: "Docker MCP Toolkit"
    url: null
  - name: "Supabase"
    url: null
  - name: "Sentry"
    url: null
  - name: "MCP Launchpad"
    url: "https://github.com/kenneth-liao/mcp-launchpad"
  - name: "AI Launchpad Marketplace"
    url: "https://github.com/kenneth-liao/ai-launchpad-marketplace"
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "agents"
  - "ai-coding"
  - "claude"
  - "performance"
tagsNormalizedAt: "2026-03-01T21:19:30.374Z"
---

## Key Takeaways

Claude Code now features a dynamic tool-fetching mechanism that prevents unused MCP definitions from consuming the 200k context window.

- **MCP Search Tool:** Version 2.17 uses `mcp_search` to fetch full schemas only when a specific tool is required for a task.

- **Configuration Overrides:** This feature is currently opt-in and requires a manual update to the `settings.json` file at the project or global level.

- **Persistence and Compaction:** Loaded tools remain in context to ensure high attention during a session but are cleared during the `/compact` process to save space.

## Summary

### The Evolution of MCP in Claude Code

Previously, connecting multiple **Model Context Protocol (MCP)** servers to Claude Code resulted in 'context bloat.' Every tool definition, including complex schemas for platforms like Superbase or Sentry, was preloaded into the context window. This could easily consume over 35,000 tokens before a user even sent their first message, significantly reducing the space available for actual code and reasoning.

### The New Lazy Loading Solution

In version 2.17, Anthropic introduced a **lazy loading** architecture. Instead of full schemas, Claude Code now initially loads only the names of available tools. This provides the model with an 'index' of capabilities without the associated token cost. When Claude identifies a need for a specific function, it utilizes a new system tool called **mcp_search**.

This tool supports two modes of operation:

- **Direct Selection:** If Claude knows the exact tool needed, it calls `select:[tool_name]`.

- **Keyword Search:** If the requirement is vague, Claude can perform a natural language search to find the top five most relevant tools.

### Implementation Steps

To utilize this feature, users must manually enable it by modifying their `.claude/settings.json` (either globally or within a specific project folder). Adding the environment variable `'enable_tool_search': true` tells Claude Code to bypass the default preloading behavior. Once enabled, users will see MCP servers listed in a 'grayed out' state in the context overview, indicating they are ready for on-demand loading.

### Impact on Context Management

When a tool is fetched via `mcp_search`, the full schema is dynamically injected into the system message. This ensures the model has the necessary parameters and instructions to execute the tool correctly. These definitions stay in the context for the duration of the session to facilitate repeated calls. However, unlike the previous preloading method, these tools are ephemeral. Running the **/compact** command effectively 'purges' the loaded tools, returning the context to a clean state while keeping the model's ability to re-fetch them as needed.

## Context

The ability to scale tool access without sacrificing context is a pivotal development for AI-integrated development environments. As the MCP ecosystem matures, developers are connecting more specialized servers for database management, project tracking, and cloud infrastructure. Without lazy loading, the sheer volume of documentation would eventually render AI agents ineffective. This update ensures that Claude Code remains performant even when integrated with dozens of external services, marking a transition from 'all-in-memory' toolsets to more efficient 'search-and-retrieve' architectures that mimic how human engineers utilize technical documentation.
