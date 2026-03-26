---
metadata:
  videoId: "UAQsHwNHfcw"
  title: "NEW Claude Code Organizer: Manage Skills/MCPs/Context in Global/Project Scope"
  description: "I noticed a free dashboard tool that may help you organize the global/local Claude Code configurations.


    Repo: https://github.com/mcpware/claude-code-organizer?tab=readme-ov-file


    More of my AI Coding experiments on my website: https://aicodingdaily.com?mtm_campaign=youtube-channel-default-link"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT6M20S"
  publishedAt: "2026-03-26T08:30:51Z"
  thumbnailUrl: "https://i.ytimg.com/vi/UAQsHwNHfcw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=UAQsHwNHfcw"
processedAt: "2026-03-26T21:30:58.036Z"
source: "youtube"
tldr: "Claude Code Organizer is a new tool that provides a web dashboard to manage Claude skills, MCP servers, slash commands, and context budgets across global and project-specific scopes, helping developers clean up and optimize their AI coding environment."
tools:
  - name: "Claude Code Organizer"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Visual Studio Code"
    url: null
  - name: "GPT"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "claude"
  - "mcp"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4918
  outputTokens: 683
  totalTokens: 5601
  processingTimeMs: 20535
tagsNormalizedAt: "2026-03-26T21:34:04.055Z"
---

## Key Takeaways

This video introduces a tool to solve the clutter problem in Claude Code setups.

## Summary

The video introduces **Claude Code Organizer**, a tool designed to solve a common problem for developers who use Claude Code across multiple projects: the accumulation of unorganized skills, plugins, MCP servers, and slash commands that can clutter both global and local project directories.

After a simple one-command install, the tool launches a web dashboard automatically. The dashboard provides a clear overview, categorizing assets into **global** and **project-specific** scopes. This helps users understand what is installed where, something the presenter admits he often forgets.

Key dashboard features include:

*   Viewing the contents of any skill or command.

*   **Opening skills directly in an editor** (like Visual Studio Code) to inspect their HTML or markdown files.

*   **Moving skills** between global and project scopes, which physically relocates the files.

*   Managing not just skills, but also **MCP servers**, **slash commands**, saved **plans**, **config JSON**, and **plugins**.

A major highlighted feature is **context budget management**. When Claude Code launches, it automatically preloads context from global skills and MCPs. The organizer calculates how many tokens are consumed by this preloaded context for a given project. The presenter shows an example where four unused slash commands alone consume 8,000 tokens, and a project's total automatic context use is calculated at 38k tokens. This awareness allows users to remove unnecessary assets from a project to preserve their context window, especially important for models with smaller windows like 200k tokens.

The tool also includes an API and a roadmap for future development. The presenter found it useful for realizing how much 'junk' he had installed and plans to use it for cleanup.

## Context

As AI-assisted coding tools like Claude Code become more powerful and integrated into developer workflows, users often install numerous skills, plugins, and MCP servers for experimentation across different projects. This leads to a disorganized setup where it's difficult to track what is installed globally versus locally, and what context is automatically consumed upon launch. Managing this complexity is crucial for maintaining an efficient, clean, and context-aware development environment.