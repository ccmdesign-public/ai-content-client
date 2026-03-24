---
metadata:
  videoId: "V3xDTx2XwGg"
  title: "Claude.md is RUINING Claude Code (w/ One Exception)"
  description: "⚡Master Claude Code, Build Your Agency, Land Your First Client⚡

    https://www.skool.com/chase-ai


    🔥FREE community🔥

    https://www.skool.com/chase-ai-community/


    💻 Need custom work? Book a consult 💻

    https://chaseai.io


    claude.md is making your Claude Code worse.


    In this video, I break down the research papers on agents.md and other context files like it, showing how these sorts of files are hurting, not helping, your Claude Code outputs.


    ⏰TIMESTAMPS:

    0:00 - Intro

    0:39 - claude.md

    1:51 - agents.md paper

    2:50 - The Why

    6:50 - The Exception

    9:58 - /init

    11:00 - Final Thoughts



    RESOURCES FROM THIS VIDEO:

    ➡️ Master Claude Code: https://www.skool.com/chase-ai

    ➡️ My Website: https://www.chaseai.io

    ➡️ Agents.md Report: https://arxiv.org/abs/2602.11988


    #claudecode"
  channel: "Chase AI"
  channelId: "UCoy6cTJ7Tg0dqS-DI-_REsA"
  duration: "PT11M51S"
  publishedAt: "2026-03-24T00:56:45Z"
  thumbnailUrl: "https://i.ytimg.com/vi/V3xDTx2XwGg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=V3xDTx2XwGg"
processedAt: "2026-03-24T20:32:55.031Z"
source: "youtube"
tldr: "Research from ETH Zurich shows that claude.md context files reduce Claude Code task success rates by 20% and increase costs, with one exception: they help in large, undocumented repositories like Obsidian vaults where they act as the sole documentation source."
tools:
  - name: "Claude Code"
    url: null
  - name: "Obsidian"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "claude"
  - "productivity"
  - "prompt-engineering"
  - "research"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9776
  outputTokens: 753
  totalTokens: 10529
  processingTimeMs: 22852
tagsNormalizedAt: "2026-03-24T22:58:36.161Z"
---

## Key Takeaways

The video analyzes research showing claude.md files often harm AI coding performance and discusses when they're actually useful. • **Claude.md files reduce task success rates** by 20% compared to no context files according to ETH Zurich research • **They increase inference costs** while causing **context pollution** and **excessive tool calling** • **The one exception** is large, undocumented repositories (like Obsidian vaults) where claude.md provides the only documentation • **Manually written, minimal context files** perform better than auto-generated ones via `/init`

## Summary

The video examines research from ETH Zurich that tested AI coding agents with context files like claude.md. The findings were clear: across eight tests, having no claude.md file performed better in five tests, and context files reduced task success rates while increasing inference costs by over 20%.

**Three main problems** with claude.md files emerged from the research. First, they don't provide effective overviews—agents took as many or more steps to find correct files despite having the context. Second, they create **redundant documentation** since AI agents already scan codebases naturally. Third, they cause **excessive tool calling behaviors**, making agents search, read, and write more files unnecessarily.

**The critical exception** discovered in the research involves repositories with absolutely no documentation. When researchers manually removed all markdown files, readmes, and example folders, leaving claude.md as the only documentation source, LLM-generated context files actually improved performance by 2.7% on average.

**Practical implications** depend on your project type. For **standard coding projects**, especially those created quickly with Claude Code, you're likely better off deleting claude.md entirely. The automated `/init` command creates bloated files that hurt performance more than help.

**The ideal use case** is **personal assistant agents** working with large, unstructured repositories like Obsidian vaults—collections of markdown files without traditional code architecture. Here, claude.md can establish communication conventions and workflows that Claude Code wouldn't naturally infer from the file structure alone.

**Anthropic's updated `/init` feature** moves in the right direction by creating more minimal files and encouraging skills and hooks instead of global conventions. However, the fundamental issue remains: if a convention doesn't need to apply to every single prompt, it shouldn't be in claude.md.

## Context

This research challenges a common practice in AI-assisted development where developers automatically create claude.md files for every project. As AI coding tools like Claude Code become more sophisticated, understanding when additional context helps versus hurts is crucial for efficiency and cost management. This matters for developers, technical leads, and anyone using AI coding assistants who want to optimize both performance and expenses while avoiding common pitfalls in AI workflow setup.