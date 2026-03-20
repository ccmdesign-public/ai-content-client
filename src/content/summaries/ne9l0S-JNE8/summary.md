---
metadata:
  videoId: "ne9l0S-JNE8"
  title: "Autopilot Mode with Justin Chen"
  description: "Justin and James deep-dive into Autopilot and the evolving VS Code chat UX—why shimmers and collapsed containers declutter conversations, and why the input bar split and new permissions picker matter. Learn how Autopilot (Insiders preview) can auto-approve tools, answer prompts, iterate until a task_complete signal or max retries, and when to use default vs bypass approvals; practical tips for safe, hands-off workflows and feedback.


    00:00:00 - Intro and Banter

    00:03:30 - Chat UI: Shimmers and Collapsing

    00:10:00 - Input Toolbar Changes

    00:15:30 - Permissions Picker Overview

    00:21:00 - Autopilot Mode Deep Dive

    00:25:30 - Plan Mode, Workflows, and Dogfooding

    00:28:30 - Feedback and Closing


    Links:

    v1.110 Release Notes: https://code.visualstudio.com/updates/v1_110


    Subscribe on your favorite podcast app:

    - Apple Podcasts: https://podcasts.apple.com/us/podcast/id1833924784

    - Spotify: https://open.spotify.com/show/3S2fExHkmbfQwwYw4a56yQ

    - Amazon Music: https://music.amazon.com/podcasts/bd5f1efc-cdae-49c8-8ec7-c9b48b00ce46/vs-code-insiders-podcast

    - Castbox: https://castbox.fm/channel/id6720052?country=us

    - Overcast: https://overcast.fm/itunes1833924784/vs-code-insiders-podcast

    - Pocket Casts: https://pca.st/itunes/1833924784

    - and more: https://www.vscodepodcast.com/subscribe


    Follow VS Code:

    * X: https://x.com/code

    * Bluesky: https://bsky.app/profile/vscode.dev

    * YouTube: https://youtube.com/code

    * LinkedIn: https://www.linkedin.com/showcase/104107263

    * GitHub: https://github.com/microsoft/vscode


    #vscode #ai #githubcopilot #agents"
  channel: "Visual Studio Code"
  channelId: "UCs5Y5_7XK8HLDX0SLNwkd3w"
  duration: "PT26M31S"
  publishedAt: "2026-03-16T07:00:42Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ne9l0S-JNE8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ne9l0S-JNE8"
processedAt: "2026-03-16T16:32:00.115Z"
source: "youtube"
tldr: "VS Code's new Autopilot mode is a fully autonomous AI coding agent that iterates on tasks without user intervention, auto-approves tools, answers its own questions, and runs until completion, inspired by Copilot CLI's hands-off workflow."
tools:
  - name: "Visual Studio Code"
    url: null
  - name: "GitHub"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "GitHub Copilot CLI"
    url: null
  - name: "GitHub Codespaces"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "copilot"
  - "productivity"
  - "vscode"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 20989
  outputTokens: 942
  totalTokens: 21931
  processingTimeMs: 31242
tagsNormalizedAt: "2026-03-16T16:36:03.066Z"
---

## Key Takeaways

Justin Chen discusses major UX improvements and new autonomous features in VS Code's AI chat interface.

*   **Chat UI is now less cluttered** – verbose thinking text and tool calls are collapsed into containers with LLM-generated summaries for easier skimming.

*   **New Permissions Picker offers three approval modes**: Default (uses settings), Bypass (auto-approves most tools), and **Autopilot** (fully autonomous with auto-replies and iteration).

*   **Autopilot is the key innovation** – it runs tasks autonomously using a `task complete` tool as a finish line, retries on errors, and integrates seamlessly with Plan Mode for hands-off implementation.

## Summary

The VS Code team has significantly refined the chat UX to reduce noise and improve developer focus. Verbose agent reasoning, multiple tool calls, and checkmarks are now intelligently collapsed into dropdown containers. This creates a cleaner, more minimal interface that still feels alive by showing work progress.

A major structural change splits the input toolbar into two: one for session-level controls (like agent harness

- Local, Copilot, CLI, Cloud) and one for request-level controls. The standout addition here is the new **Permissions Picker**, which surfaces approval settings directly in the UI.

The picker introduces three distinct modes:

*   **Default Approvals**: Respects all existing user and workspace auto-approval settings for files, terminal commands, and URLs.

*   **Bypass Approvals**: Auto-approves almost all tools except those requiring explicit user input (like `ask questions` or terminal `yes/no` prompts). It also auto-retries on errors.

*   **Autopilot**: This is the flagship new mode, currently in preview in VS Code Insiders. Inspired by Copilot CLI, it builds on Bypass Approvals with key autonomous behaviors.

**How Autopilot Works**
Autopilot has a modified system prompt informing the agent the user is absent. Its core mechanism is the **`task complete` tool**, which the agent must call to signal it's finished. If this tool isn't called, Autopilot will iterate up to five times (configurable later). It auto-replies to `ask questions` tools and handles user-input-required scenarios by stating the user isn't available. The goal is full autonomy: create a plan and let it run its course.

**Integration with Plan Mode**
Starting Plan Mode in Autopilot creates a seamless workflow: the agent plans, auto-answers its own clarifying questions, and immediately hands off to implementation. In regular mode, a "handoff to Autopilot" button appears after planning.

**Practical Use & Feedback**
Justin Chen dogfoods Autopilot for 99% of his work, using it to tackle GitHub issues in isolated sessions or work trees and reviewing the final code. It excels in sandboxed environments like GitHub CodeSpaces. The team is actively evaluating its performance and cost. Feedback is encouraged via issues on the VS Code GitHub repository.

## Context

This interview is crucial for developers using VS Code's AI features, as it details a fundamental shift from interactive, approval-heavy AI assistance to a more autonomous, agentic workflow. The new Autopilot mode represents the next evolution of AI-powered coding, moving beyond chat-based co-piloting towards delegatable task completion. This aligns with broader industry trends in AI agents and autonomous systems, where the goal is to minimize human-in-the-loop friction for well-scoped tasks within safe environments.