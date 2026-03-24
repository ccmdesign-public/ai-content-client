---
metadata:
  videoId: "jiwuKOWZG2I"
  title: "Claude Code Channels: Setup & What You Should Know"
  description: "Anthropic just released Claude Code Channels — a research preview feature that lets you talk to Claude Code from Telegram and Discord, not just the Claude app. It's yet another OpenClaw-like feature shipped natively, and I wanted to see how it actually holds up.


    In this video, I walk you through the full setup and give you an honest look at where it works and where it doesn't. I cover how it compares to Remote Control and Dispatch, why you'll probably need YOLO mode to make it useful, and how it stacks up against OpenClaw's approach.


    Short answer: one step closer, but not there yet.


    ⌚ TIMESTAMPS:

    0:00 - What Are Claude Code Channels?

    0:20 - Remote Control vs. Dispatch vs. Channels

    0:56 - Setup: Requirements & Plugin Install

    1:38 - Creating Your Telegram Bot (BotFather)

    2:08 - Pairing with Claude Code

    3:08 - The Permission Problem

    3:34 - Why You'll Need YOLO Mode

    4:08 - Voice Notes Don't Work Yet

    4:54 - Proactive Messaging Bug/Workaround

    5:40 - The Two-Instance Conflict

    6:10 - Final Thoughts


    🔗 RESOURCES & LINKS:

    Claude Code Channels Docs → https://code.claude.com/docs/en/channels#telegram

    Telegram Plugin README → https://github.com/anthropics/claude-plugins-official/blob/main/external_plugins/telegram/README.md

    Book a call with me → https://yedatechs.com/#discovery-call

    Sponsorship inquiries → hi@yedatechs.com


    #ClaudeCode #Anthropic #Telegram #OpenClaw #AIAgents #ClaudeChannels"
  channel: "JeredBlu"
  channelId: "UCaIm6rTg-RXb6rB19fYJgTg"
  duration: "PT6M46S"
  publishedAt: "2026-03-20T21:20:30Z"
  thumbnailUrl: "https://i.ytimg.com/vi/jiwuKOWZG2I/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=jiwuKOWZG2I"
processedAt: "2026-03-24T01:11:47.190Z"
source: "youtube"
tldr: "Claude Code Channels is a new beta feature from Anthropic that lets you interact with Claude Code via chat apps like Telegram, enabling remote tool usage and proactive messaging, though it currently requires manual permission approval and lacks voice note support."
tools:
  - name: "Claude Code"
    url: null
  - name: "Telegram"
    url: null
  - name: "Discord"
    url: null
  - name: "Bun"
    url: null
  - name: "MCP (Model Context Protocol)"
    url: null
  - name: "Claude Plugins"
    url: null
  - name: "Open Claw"
    url: null
  - name: "Whisper"
    url: null
  - name: "11 Labs"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "mcp"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3402
  outputTokens: 975
  totalTokens: 4377
  processingTimeMs: 37777
tagsNormalizedAt: "2026-03-24T04:10:57.425Z"
---

## Key Takeaways

Claude Code Channels bridges Claude Code with external chat apps for remote interaction. Key insights include:

*   **Setup requires Bun and manual permission approval** via terminal flags, making the current workflow cumbersome for truly remote use.

*   **It connects via MCP servers** and currently only supports text and images, lacking the voice transcription features of alternatives like Open Claw.

*   **Proactive messaging is possible but nuanced**; you can schedule tasks using the `reply` tool, but managing listening vs. sending connections can be tricky.

*   **Anthropic is rapidly iterating** with similar features like Remote Control and Claude Cowork Dispatch, each with different trade-offs in capability and convenience.

## Summary

Anthropic has released **Claude Code Channels**, a feature in research preview that allows users to interact with Claude Code from external messaging applications like Telegram and Discord. This brings it closer to the functionality of tools like Open Claw, enabling remote access to Claude's coding and tool-using capabilities.

**Setup and Current Limitations**
The setup process involves installing a plugin, configuring a Telegram bot with a token, and starting Claude Code with specific command-line flags (`--channels` and the plugin name). A significant current drawback is that **permission approvals for MCP tool calls must be granted in the terminal**, not within the chat app. This necessitates running Claude in `--dangerously-skip-permissions` mode for practical remote use, which is a security consideration.

**Functionality and Gaps**
The channel listens for messages and can use tools like the Telegram reply tool to respond. However, it currently only processes **text and images**, not voice notes. This is a notable gap compared to Open Claw, which could transcribe audio using services like Whisper. The feature also requires your computer to be on with the Claude terminal session active.

**Proactive Messaging and Connection Quirks**
You can proactively send yourself messages by using the known `reply` tool from within Claude Code Desktop, for example, to schedule hourly email summaries. However, because the MCP server maintains only one connection, there can be a conflict between the session listening for messages and one sending them, creating an imperfect loop.

**Comparison to Other Anthropic Features**
The video contrasts Channels with other recently released features:

*   **Remote Control**: Allows interaction via the Claude cloud app on your phone, where permissions can be approved in-app.

*   **Claude Cowork Dispatch**: A more polished implementation of remote control but operates in a more restricted, sandboxed environment.
The presenter notes that Dispatch currently offers the best user experience, while Channels provides more direct access to Claude Code's full capabilities but with a clunkier interface.

## Context

This video is crucial for developers and AI enthusiasts using Claude Code who want to extend its functionality beyond their local machine. It addresses the growing trend of AI agents being accessible via popular chat platforms, a space previously led by tools like Open Claw. Understanding these new integration methods is key to building more flexible, remote-friendly AI-assisted workflows, especially for coding, task automation, and receiving proactive notifications from an AI assistant.