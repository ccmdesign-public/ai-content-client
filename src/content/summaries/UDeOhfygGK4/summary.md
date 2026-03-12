---
metadata:
  videoId: "UDeOhfygGK4"
  title: "Claude Code 2.1.73-74 - Just Released! (Update Overview)"
  description: "Claude Code v2.1.73 and v2.1.74 ship 5 new features, 31 bug fixes, and 4 improvements across two back-to-back releases — including a new modelOverrides setting for custom provider IDs, OAuth hang and refresh token fixes, a streaming API memory leak patch, six plugin and marketplace improvements, and RTL text support in Windows Terminal. Full breakdown of every change in these releases.


    ----

    Learn Agentic Coding with Dynamous AI - Daily Events and Workshops (https://dynamous.ai/?code=646a60) - 10% off with our link: https://shorturl.smartcode.diy/dynamous_ai_10_percent_discount

    ----


    Chapters

    0:00 5 Features, 31 Bug Fixes, 4 Improvements — Models & Providers

    0:28 Performance: CPU Freeze, Deadlock, Memory Leak, IDE Speed

    0:56 MCP & OAuth: Hanging Auth, Refresh Tokens, SSL Guidance

    1:24 Hooks & Sessions: Double Fire, JSON Hooks, SessionEnd Timeout

    1:50 Voice & Accessibility: Corruption Fix, macOS Mic, RTL Text

    2:15 Plugins & Marketplace: REPL, Submodules, /context, autoMemoryDir

    2:47 CLI Commands: /resume, /ide, /loop, /heapdump, /effort

    3:09 VS Code: HTTP 400, Scroll Wheel, Delete Button, Remote Control

    3:28 Update to v2.1.74


    Key Changes in These Releases:

    - modelOverrides setting: map model picker entries to custom provider IDs like Bedrock inference profile ARNs

    - Default Opus is now 4.6 on Bedrock, Vertex, and Foundry

    - Sub-agents no longer silently downgrade to older model versions

    - Permission prompts for complex bash commands no longer freeze the session at 100% CPU

    - Deadlock when many skill files change at once (e.g., during git pull) is fixed

    - Streaming API memory leak causing unbounded RSS growth on Node is patched

    - MCP OAuth authentication no longer hangs when the callback port is already in use

    - Refresh tokens behind OAuth servers returning HTTP 200 errors now properly prompt for re-auth

    - SessionStart hooks no longer fire twice when resuming via --resume or --continue

    - JSON output hooks stop injecting no-op system reminder messages on every turn

    - SessionEnd hook timeout is now configurable through an environment variable

    - Up arrow restores interrupted prompts and rewinds the conversation in one step

    - New /context command gives actionable suggestions for context-heavy tools and memory bloat

    - autoMemoryDirectory setting lets you set a custom storage location for auto-memory files

    - RTL text (Hebrew, Arabic, right-to-left scripts) now renders correctly in Windows Terminal and VS Code


    Release Notes (v2.1.73): https://github.com/anthropics/claude-code/releases/tag/v2.1.73

    Release Notes (v2.1.74): https://github.com/anthropics/claude-code/releases/tag/v2.1.74

    Claude Code on GitHub (75K+ stars): https://github.com/anthropics/claude-code

    Claude Code Docs: https://docs.anthropic.com/en/docs/claude-code


    ---

    Update now: run `claude update` in your terminal

    Created with Remotion + ElevenLabs AI narration


    Which fix or feature in v2.1.73-74 were you waiting for the most? Drop it in the comments.


    #ClaudeCode #ClaudeCodeUpdate #Anthropic #AI #CodingTools #DevTools #AIUpdate #VSCode #CLI #PluginEcosystem #MCP #OAuth #VoiceMode #RTL #SessionHooks #ModelOverrides #AIAssistant #CodingAssistant #TypeScript #OpenSource #DeveloperProductivity"
  channel: "DIY Smart Code"
  channelId: "UC_a85mUHqsy5j0CYCgLnkEQ"
  duration: "PT3M54S"
  publishedAt: "2026-03-12T13:50:50Z"
  thumbnailUrl: "https://i.ytimg.com/vi/UDeOhfygGK4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=UDeOhfygGK4"
processedAt: "2026-03-12T15:54:17.321Z"
source: "youtube"
tldr: "Claude Code releases 2.1.73-74 deliver 5 new features, 31 bug fixes, and 4 improvements including model overrides, stability fixes for CPU hangs and memory leaks, better RTL text support, enhanced plugin management, and improved slash commands like /context and /loop."
tools:
  - name: "Claude Code"
    url: null
  - name: "Bedrock"
    url: null
  - name: "Vert.Ex"
    url: null
  - name: "Foundry"
    url: null
  - name: "Node.js"
    url: null
  - name: "VS Code"
    url: null
  - name: "Windows Terminal"
    url: null
  - name: "Git"
    url: null
  - name: "GitHub"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "claude"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2958
  outputTokens: 823
  totalTokens: 3781
  processingTimeMs: 63484
tagsNormalizedAt: "2026-03-12T16:13:38.898Z"
---

## Key Takeaways

The latest Claude Code update focuses on stability, developer experience, and expanded platform support.

## Summary

Claude Code releases 2.1.73 and 2.1.74 bring significant improvements across multiple areas. The update introduces five new features, addresses thirty-one bugs, and delivers four general improvements.

**Model and Configuration Enhancements**
A new **model override setting** allows developers to map model picker entries to custom provider IDs like Bedrock inference profiles. Default Opus is now version 4.6 on Bedrock, Vert.Ex, and Foundry platforms. Sub-agents no longer silently downgrade to older model versions, and full model IDs now work correctly in agent front matter.

**Stability and Performance Fixes**
Critical stability issues have been resolved. Permission prompts for complex bash commands no longer freeze sessions at 100% CPU usage. A deadlock occurring when many skill files changed simultaneously (such as during git pull operations) has been fixed. Bash tool output no longer vanishes when running multiple sessions in the same project. A memory leak in the streaming API causing unbounded RSS growth on Node.js has been patched.

**Developer Experience Improvements**
IDE detection and macOS clipboard pasting are now faster. MCP authentication no longer hangs when callback ports are in use. Session and hook timeouts are now configurable via environment variables, eliminating the previous 1.5-second hard kill limit. The up arrow now restores interrupted prompts and rewinds conversations in one step.

**Platform-Specific Fixes**
Right-to-left text rendering (Hebrew, Arabic, etc.) now works correctly in Windows Terminal and VS Code. The macOS native binary properly requests microphone permissions instead of silently failing. LSP servers on Windows no longer fail from malformed file URLs. SSL certificate error guidance helps resolve corporate proxy issues.

**Plugin and Command Enhancements**
Marketplace plugin installation no longer fails in the RPL, and updates properly sync git submodules. Local development copies of plugins correctly override installed marketplace plugins with the same name. New slash commands include **/context** for actionable suggestions about context-heavy tools and memory bloat, and **/loop** now available on Bedrock, Vert.Ex, and Foundry. The **/output style** command is deprecated in favor of **/config**.

## Context

Claude Code is an AI-powered coding assistant that integrates directly into developer workflows. These updates are crucial for developers using Claude Code in production environments, as they address stability issues, improve cross-platform compatibility, and enhance the overall developer experience. With over 75,000 developers building with Claude Code on GitHub, these improvements demonstrate Anthropic's commitment to maturing their developer tools platform.