---
metadata:
  videoId: "epzwvCJek1Y"
  title: "NEW in Claude Code: Git Worktrees - WHEN You Would Use Them?"
  description: "If you want multiple AI coding agents to run in parallel on the same codebase, worktrees may help.


    Official tweet: https://x.com/bcherny/status/2025007393290272904


    More of my AI Coding experiments on my website: https://aicodingdaily.com?mtm_campaign=youtube-channel-default-link"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT10M27S"
  publishedAt: "2026-02-26T09:46:34Z"
  thumbnailUrl: "https://i.ytimg.com/vi/epzwvCJek1Y/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=epzwvCJek1Y"
processedAt: "2026-03-10T16:16:22.860Z"
source: "youtube"
tldr: "Claude Code now has built-in Git worktree support, enabling multiple AI agents to work in parallel on isolated project copies to prevent conflicts, with merging handled later through standard Git workflows."
tools:
  - name: "Claude Code"
    url: null
  - name: "Git"
    url: null
  - name: "VS Code"
    url: null
  - name: "Laravel"
    url: null
  - name: "npm"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "claude"
  - "git"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7119
  outputTokens: 727
  totalTokens: 7846
  processingTimeMs: 39136
tagsNormalizedAt: "2026-03-10T16:45:55.436Z"
---

## Key Takeaways

Claude Code's new worktree feature enables parallel AI agent development while avoiding immediate conflicts. Key insights include: • **Git worktrees** create isolated copies of a project, allowing multiple agents to work simultaneously without seeing each other's changes. • The **main advantage over branches** is that agents operate in complete isolation, with conflicts only appearing during the merge phase. • **Merging workflow** involves committing changes in each worktree, then merging them into the main branch and resolving any conflicts that arise. • **Practical limitations** exist where some project tools and verifications may not work correctly in worktree directories.

## Summary

The video demonstrates Claude Code's new built-in Git worktree support, a feature that has existed in Git for years but is now conveniently integrated for AI coding workflows. Worktrees create separate directory copies of a project, allowing multiple Claude agents to work on different features simultaneously without immediate conflicts.

### How Worktrees Work in Practice

When launching Claude with the worktree flag (e.g., `claude --worktree about-page`), a full copy of the project appears in a dedicated directory. This isolation means Agent A working on an "About page" and Agent B working on a "Contact page" operate independently—they can both modify the same files (like `routes/web.php` in Laravel) without knowing about each other's changes.

### Conflict Resolution Workflow

After agents complete their tasks, you commit changes within each worktree, then merge them into the main branch sequentially. Conflicts appear during the second merge, which you resolve using standard Git tools (like VS Code's merge editor). The process involves accepting both sets of changes and handling any tricky merges like `package-lock.json`.

### Advantages and Caveats

Worktrees shine for parallel AI agent development, especially for exploring multiple implementation options or designs simultaneously. However, some project-specific tools (like encryption key files or vendor binaries) may fail in worktree directories, requiring manual verification of generated code. Claude Code version 2.150 introduced this feature, which also works in the desktop app and supports sub-agents using worktrees for further isolation.

## Context

This feature matters because AI coding assistants are increasingly used for complex development tasks, often requiring multiple agents to work on different parts of a project simultaneously. Traditional approaches with multiple Claude instances on the same codebase lead to immediate conflicts when agents modify the same files. Worktrees provide the isolation needed for parallel AI development while maintaining familiar Git workflows for merging. This is particularly relevant for developers using AI agents for feature development, experimentation, or exploring multiple implementation options in modern web development frameworks like Laravel.