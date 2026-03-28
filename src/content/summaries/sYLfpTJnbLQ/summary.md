---
metadata:
  videoId: "sYLfpTJnbLQ"
  title: "Claude Code 2.1.84 and 85 Just Dropped (Here's What Changed)!"
  description: "Claude Code v2.1.84-85 ships 19 new features, 31 bug fixes, and 20 improvements — including PowerShell support for Windows, conditional hook filtering, MCP OAuth RFC 9728, VS Code rate limit warnings, and 16x faster stats screenshots. Full breakdown of every change.


    ----

    🚀 Want to learn agentic coding with live daily events and workshops?

    Check out Dynamous AI: https://dynamous.ai/?code=646a60

    Get 10% off here 👉 https://shorturl.smartcode.diy/dynamous_ai_10_percent_discount

    ----


    Chapters

    0:00 PowerShell for Windows, TaskCreated Hook, and Conditional Hook Filtering

    0:30 MCP Deduplication, OAuth RFC 9728, and Enterprise Plugin Controls

    1:06 Idle-Return Prompt, 5K Deep Links, and 1.5M Token Display

    1:32 VS Code Rate Limit Banner, 16x Stats Screenshot, and Yoga-Layout Swap

    1:58 Push-to-Talk Fix, Ctrl+U Multiline, and Terminal Keyboard Mode (Ghostty/Kitty)

    2:23 Stream Idle Timeout, x-client-request-id Header, and ECONNRESET Fix

    2:48 /compact Context Fix, macOS Keychain, Cold-Start Race Condition

    3:15 Update Command, 75K+ Developers, Subscribe CTA


    Key Changes in This Release:

    - PowerShell tool: opt-in Windows shell alternative to bash, first native PowerShell support in Claude Code

    - Conditional hooks: new `if` field using permission rule syntax (e.g., Bash(git *)) reduces hook process spawning overhead

    - MCP deduplication: servers configured locally and via claude.ai connectors are deduplicated, local config takes priority

    - VS Code rate limit warning: banner shows usage percentage and reset time so you never hit surprise limits

    - Layout engine swap: WASM yoga-layout replaced with pure TypeScript for smoother large transcript scrolling


    Release Notes (v2.1.84): https://github.com/anthropics/claude-code/releases/tag/v2.1.84

    Release Notes (v2.1.85): https://github.com/anthropics/claude-code/releases/tag/v2.1.85

    Claude Code on GitHub (75K+ stars): https://github.com/anthropics/claude-code

    Claude Code Docs: https://code.claude.com/docs


    ---


    Update now: `claude update`

    Star on GitHub: https://github.com/anthropics/claude-code


    PowerShell or bash — what are you running Claude Code with? Drop your answer in the comments.


    #ClaudeCode #ClaudeCodeUpdate #v2184 #v2185 #Anthropic #PowerShell #Windows #MCP #OAuth #VSCode #DevTools #AI #AITools #CodingAssistant #AICoding #DeveloperExperience #Terminal #TypeScript #BugFixes #OpenSource #AIForDevelopers #Claude #ClaudeAI #Hooks #Plugins"
  channel: "DIY Smart Code"
  channelId: "UC_a85mUHqsy5j0CYCgLnkEQ"
  duration: "PT3M40S"
  publishedAt: "2026-03-27T12:50:57Z"
  thumbnailUrl: "https://i.ytimg.com/vi/sYLfpTJnbLQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=sYLfpTJnbLQ"
processedAt: "2026-03-28T17:46:03.367Z"
source: "youtube"
tldr: "Claude Code releases 2.1.84 and 85 introduce 19 new features, 31 bug fixes, and 20 improvements for over 75,000 developers [1]. Key updates include Windows PowerShell support, deduplicated MCP server configurations, a pure TypeScript layout engine, and a 30ms faster startup [1]. Enterprise admins gain new plugin controls, while bug fixes address memory leaks and macOS errors [1]."
tools:
  - name: "Claude Code"
    url: null
  - name: "Windows PowerShell"
    url: null
  - name: "VS Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
  - "Web Development"
tags:
  - "ai-coding"
  - "claude"
  - "llm"
  - "productivity"
  - "typescript"
ai:
  provider: "notebooklm"
  model: "notebooklm"
  apiCalls: 1
  fallbackAttempts: 0
  processingTimeMs: 55566
tagsNormalizedAt: "2026-03-28T18:09:03.181Z"
---

## Key Takeaways

Here are the most significant updates from the recent Claude Code releases:

* **Windows PowerShell** is now officially supported as an opt-in native shell alternative to Bash [1].

* The **MCP system** received major upgrades, including deduplicated server configurations and an **allowed channel plug-in** setting for enterprise admins [1].

* A new **pure TypeScript layout engine** replaces the Wasm Yoga layout, making scrolling through large transcripts noticeably smoother [1].

* Deep quality-of-life and stability improvements include a **75-minute idle nudge**, patched memory leaks, and global **system prompt caching** [1].

## Summary

The latest updates to Claude Code, versions 2.1.84 and 2.1.85, bring a substantial package of 19 new features, 31 bug fixes, and 20 quality-of-life improvements [1]. These releases cater to the growing base of over 75,000 developers utilizing the tool, focusing heavily on performance enhancements and expanded system compatibility [1].

### Core Feature Additions

A highly requested feature has finally arrived for Windows users, as **Windows PowerShell** is now available as an opt-in shell tool [1]. This provides a native alternative to Bash for developers working within the Windows ecosystem [1]. Additionally, the hooks system has been expanded with a new task created hook and conditional execution capabilities [1]. Developers can now use permission rule syntax within an if field to ensure hooks only fire when absolutely necessary [1].

### MCP and Enterprise Upgrades

The **MCP system** received significant attention in these releases [1]. Server configurations are now intelligently deduplicated, with local configurations taking precedence over cloud connectors [1]. To prevent context bloat, tool descriptions are now strictly capped at 2 kilobytes [1]. For enterprise environments, administrators gain enhanced security controls through a new allowed channel plug-in setting, allowing them to strictly lock down team installations [1].

### Quality of Life and Performance

Performance improvements and interface tweaks are immediately noticeable across the platform [1]. Several key quality-of-life enhancements include:

* Startup times reduced by roughly 30 milliseconds and stat screenshots running 16 times faster [1].

* A new 75-minute idle nudge that prompts developers to safely clear stale sessions [1].

* A rate limit warning banner for **VS Code** users displaying usage percentages and reset times [1].

Under the hood, the layout engine was completely swapped from Wasm Yoga to **pure TypeScript**, resulting in significantly smoother scrolling through large text transcripts [1].

### Stability and Bug Fixes

The updates address several critical bugs and stability issues that plagued previous versions [1]. Network reliability is improved through the implementation of global **system prompt caching** and fresh TCP connections that resolve persistent ECON reset errors [1]. Mac users will no longer encounter spurious lock messages, as the underlying macOS keychain errors have been successfully patched [1]. Finally, the developers resolved a frustrating race condition during cold starts and patched a memory leak that previously affected remote sessions [1].

## Context

As AI coding assistants become deeply integrated into professional workflows, frequent and robust updates are essential to maintain developer productivity [1]. Releases like Claude Code 2.1.84 and 2.1.85 demonstrate a maturing product ecosystem that prioritizes stability, enterprise security, and cross-platform compatibility [1]. The addition of native Windows PowerShell support and robust MCP plugin controls shows a deliberate push toward enterprise-grade reliability [1]. Software engineers, DevOps professionals, and enterprise IT admins should care about these updates, as they directly address pain points like memory leaks and context bloat while offering finer control over AI tool permissions [1].