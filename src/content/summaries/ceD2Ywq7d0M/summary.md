---
metadata:
  videoId: "ceD2Ywq7d0M"
  title: "NEW Polyscope: Run Many Agents on Many Projects (Claude Code / Codex)"
  description: "I just saw a launch of new Polyscope tool and decided to try it out.


    Official website: https://getpolyscope.com/


    Video presentation by Marcel Pociot at Laracon EU: https://www.youtube.com/live/YJmuKPk3d9M?si=mrK6AAvbyi_ZM5Sd&t=22297 (starts at 6:11:37)


    More of my AI Coding experiments on my website: https://aicodingdaily.com?mtm_campaign=youtube-channel-default-link"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT5M46S"
  publishedAt: "2026-03-05T05:24:25Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ceD2Ywq7d0M/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ceD2Ywq7d0M"
processedAt: "2026-03-10T16:13:10.761Z"
source: "youtube"
tldr: "Polyscope is a new free tool that allows developers to run multiple AI coding agents (like Claude Code or Codex) in parallel on the same or different projects, using a 'copy-on-write' system for efficiency and providing a centralized dashboard to monitor and merge changes."
tools:
  - name: "Polyscope"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Codex"
    url: null
  - name: "Obsidian"
    url: null
  - name: "BookStack"
    url: null
  - name: "Conductor"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "automation"
  - "claude"
  - "git"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4349
  outputTokens: 729
  totalTokens: 5078
  processingTimeMs: 35125
tagsNormalizedAt: "2026-03-10T16:48:11.659Z"
---

## Key Takeaways

Polyscope is a multi-agent coding environment that simplifies parallel AI-driven development. Key insights:

## Summary

The video introduces **Polyscope**, a new agentic coding tool developed by Beyond Code and launched at Laracon EU. It addresses a core workflow problem: implementing multiple features or tests on a project using AI agents typically requires manually managing separate Git branches for each task, which is time-consuming and cumbersome.

Polyscope solves this by creating isolated **workspaces** for each prompt or task. Users can connect a local repository (or multiple), define a prompt in a workspace, and select an AI model (like **Claude Code** or **Codex**). The key innovation is the ability to launch multiple workspaces simultaneously, allowing several agents to work in parallel without conflict.

The tool uses a **copy-on-write** mechanism instead of traditional Git worktrees. This means it doesn't create a full copy of the codebase for each agent. Instead, it only copies files when they are actually modified by an agent, making the process more resource-efficient. The presenter demonstrated this by running two agents on different prompts for the BookStack open-source project, with both completing their tasks in about two minutes.

From a central dashboard, users can monitor all active agents, see real-time updates on changed files and lines of code, and inspect diffs. Once an agent finishes, changes can be reviewed and merged back into the main branch with a single click, after which the temporary workspace is cleaned up.

The core version of Polyscope is **free**. The primary paid feature mentioned is **mobile access**, which offers end-to-end encrypted remote oversight and control of agents, similar to Claude Code Remote but not limited to a single model. The video concludes by positioning Polyscope as part of a growing trend of multi-agentic coding tools, inviting discussion on alternatives like Conductor.

## Context

This tool is significant as it taps into the emerging trend of 'agentic coding,' where developers use multiple AI assistants to tackle complex or parallel tasks. It matters to software developers, engineering teams, and tech leads who are integrating AI into their development workflows and seeking to improve productivity by managing concurrent AI-driven coding sessions efficiently. It connects to broader movements in AI-assisted development and DevOps tooling.