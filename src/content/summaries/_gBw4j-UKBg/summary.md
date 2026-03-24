---
metadata:
  videoId: "_gBw4j-UKBg"
  title: "How I Manage 10 Claude Code Agents Without Losing My Mind"
  description: "📚 Obsidian x Claude Code Lab (starts Mar 17): https://lab.artemzhutov.com

    → Build your own AI-powered workspace with Claude Code agents - live, with me

    💬 Discord: https://discord.gg/g5Z4Wk2fDk


    I manage 10 Claude Code agents every day doing research, drafts, and video scripting all at the same time. I open a new tab, then another, and another - quickly I end up with 10 tabs and I don't know what's happening on each one. Switching between them kills my flow. Sessions go stale and context gets lost.


    Here's how I stopped losing my mind: cmux - a terminal workspace manager. The orchestrator pattern - one agent that spawns and controls the others. And an Obsidian dashboard that builds itself, showing me what each agent is doing and what needs attention.


    🎁 cmux + orchestrator + dashboard - ready to use:

    → Manage all your Claude Code agents from one terminal

    → No API keys, no setup - just drop in your vault and go 👇

    https://cmux-artemzhutov.netlify.app


    Follow me:

    Substack: https://artemxtech.substack.com/

    X: https://x.com/ArtemXTech

    GitHub: https://github.com/ArtemXTech


    ---


    ## Timestamps


    0:00 Run multiple Claude agents every day

    0:31 The problem - 10 tabs, no control

    1:13 cmux - listing and reading workspaces

    1:46 Talk to a workspace, it starts working

    2:43 The orchestrator spawning workspaces

    3:46 Read the screen of each workspace

    5:03 Spawn workspaces for your sessions

    6:57 Track sessions in Obsidian with Bases

    7:36 The dashboard that tracks itself

    8:27 Send tasks to sub-agents

    9:34 The diagram showing it all together

    12:03 Park workspaces and continue later

    13:01 Rename workspaces with emojis

    15:28 The full workflow - daily note to dashboard

    17:09 How we went from chaos to control"
  channel: "Artem Zhutov"
  channelId: "UCeNt4ZUGajlELmfGeKyBtUg"
  duration: "PT18M48S"
  publishedAt: "2026-03-14T19:40:23Z"
  thumbnailUrl: "https://i.ytimg.com/vi/_gBw4j-UKBg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=_gBw4j-UKBg"
processedAt: "2026-03-24T19:44:27.483Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Artem Zhutov demonstrates how to manage multiple Claude code agents using CMAX's workspace system with an orchestrator pattern, programmatic control, and Obsidian dashboards to maintain context and track progress without browser tab chaos."
tools:
  - name: "CMAX"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Obsidian"
    url: null
  - name: "Excalidraw"
    url: null
  - name: "DataView"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "productivity"
  - "terminal"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 11050
  outputTokens: 869
  totalTokens: 11919
  processingTimeMs: 259820
tagsNormalizedAt: "2026-03-24T22:56:17.976Z"
---

## Key Takeaways

This video presents a system for orchestrating multiple AI agents through structured workspaces and dashboards. Key insights include: • **CMAX's programmable workspaces** enable isolated environments per task with hotkey navigation and programmatic control via CLI. • **Orchestrator pattern** uses one central agent to spawn, monitor, and communicate with sub-agents across workspaces. • **Obsidian integration** provides dashboards to track session status, goals, and progress, linking them to CMAX workspaces. • **Notification system and emoji labeling** help quickly grasp agent status and focus attention where needed.

## Summary

The video details a workflow for managing multiple Claude code agents simultaneously without losing context. The core problem addressed is the chaos of having 10+ browser tabs open, each with a different agent session, leading to lost flow and stale contexts.

### CMAX Workspace Management

CMAX provides a terminal-based environment with **isolated workspaces** for each task. Users can spawn terminals within workspaces, jump between them with hotkeys, and rename them for clarity. The key innovation is **programmatic access**: a CLI tool allows listing workspaces, reading screen contents, and interacting with them through commands like `cmax read screen`. This enables an orchestrator agent to monitor and control multiple workspaces.

### Orchestrator Pattern and Dashboard Integration

A central **orchestrator workspace** uses CMAX skills to spawn sub-agent workspaces based on a plan (e.g., from a daily note). Each spawned workspace gets a specific prompt and task. To track progress, sessions are managed in **Obsidian** with a dashboard that lists sessions, their status (backlog, active, done), goals, and definitions of done. The orchestrator can read this dashboard via Obsidian CLI or DataView, creating a feedback loop where it understands what each agent is doing and can summarize progress.

### Practical Workflow and Scaling

A full loop example starts from a daily note where the user plans tasks. The orchestrator reads the plan, creates corresponding sessions in Obsidian, and spawns CMAX workspaces for each. Agents work in their isolated spaces, and the user can monitor via notifications and emoji-labeled workspaces. For complex tasks (like diagram generation), the orchestrator can hand off work to specialized agents. Sessions can be "parked" (saved with context) and later resumed, ensuring continuity. The system scales by allowing the orchestrator to manage many agents, rename workspaces with emojis for quick visual identification, and hide inactive workspaces to reduce clutter.

## Context

As AI coding assistants like Claude Code become more capable, power users often run multiple agents concurrently for research, drafting, scripting, and automation. Managing these sessions across browser tabs is chaotic and inefficient, leading to lost context and broken workflows. This video matters for developers, researchers, and productivity enthusiasts who leverage multiple AI agents and need a systematic way to orchestrate them while maintaining visibility and control. It connects to broader trends in AI-augmented workflows, programmable developer environments, and knowledge management integration.