---
metadata:
  videoId: "B37jv0rzSnc"
  title: "NEW Claude Code Upgrade: /btw + /voice"
  description: "More new leads + 1500 followers + ALL my resources

    👉 https://www.skool.com/buildroom/


    Summary ⤵️

    Anthropic just dropped two new Claude Code features — /btw and /voice — that are going to change how you work. One of them is only live for 5% of users right now but will roll out to everyone soon.


    ⏱️ TIMESTAMPS:

    00:00 - How to Use New Claude Code Features

    00:09 - How the /btw Command Works

    00:37 - How to Demo the /btw Feature

    01:28 - How to Run Parallel Conversations in Claude Code

    02:16 - How to Avoid Context Pollution in Claude Code

    02:56 - How to Work Around /btw Memory Limits

    03:31 - How to Keep Your Context Window Clean

    04:11 - How /btw and Sub-Agents Differ

    04:41 - How to Update Claude Code

    04:59 - How to Use Claude Code Voice Mode

    05:31 - How to Enable /voice in Claude Code"
  channel: "Duncan Rogoff | AI Automation"
  channelId: "UC37JpWP5PxLSma2lh79HU9A"
  duration: "PT5M48S"
  publishedAt: "2026-03-12T00:21:19Z"
  thumbnailUrl: "https://i.ytimg.com/vi/B37jv0rzSnc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=B37jv0rzSnc"
processedAt: "2026-03-12T15:25:17.029Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Anthropic released two new Claude Code features: /btw for side conversations without polluting context or increasing token costs, and /voice for voice interaction currently available to 5% of users and rolling out widely soon."
tools:
  - name: "Claude Code"
    url: null
  - name: "VS Code"
    url: null
  - name: "Whisper Flow"
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
  inputTokens: 5999
  outputTokens: 750
  totalTokens: 6749
  processingTimeMs: 25669
tagsNormalizedAt: "2026-03-12T16:14:46.465Z"
---

## Key Takeaways

Anthropic's new Claude Code features enhance developer productivity through better context management and interaction modes. Key takeaways include:

- **/btw command** enables side conversations that don't enter main context history, preventing token bloat and workflow interruption.

- **/voice mode** allows voice interaction with Claude Code, eliminating need for third-party services for voice input.

- **Context management** improves significantly as /btw responses appear in dismissible overlays that vanish from history when closed.

- **Parallel workflows** become possible where Claude continues working on main tasks while you have separate discussions.

## Summary

Anthropic has quietly released two significant features for Claude Code that address common productivity bottlenecks in AI-assisted coding. The first is the **/btw command** (by the way), which solves the problem of interrupting Claude's workflow without incurring token costs or polluting conversation history.

Previously, asking questions during a coding session would inject those queries and responses into the context window, causing bloat and requiring frequent context clearing. With /btw, questions appear in a dismissible overlay that never enters the conversation history. You can press spacebar, enter, or escape to close these side conversations while Claude continues working on the main task.

The video demonstrates using /btw to ask about alternative data sources (X vs Reddit) and tone of voice guidelines while Claude processes trending news for a LinkedIn post. The responses appear with yellow tags in a side panel and can be copied if needed, but the feature doesn't maintain memory of these side conversations.

**/btw vs Sub-agents**: The presenter explains that /btw is essentially the inverse of sub-agents. /btw sees the entire session history but can't call tools or take actions, while sub-agents can execute tasks but don't see the full context.

The second feature is **/voice mode**, currently available to only 5% of users but rolling out to everyone in coming weeks. This eliminates the need for third-party voice services like Whisper Flow, allowing direct voice interaction with Claude Code.

To access these features, users need the latest version of Claude Code, which can be updated via terminal command or through extension settings in VS Code or similar platforms. The auto-update setting ensures you always have the latest features.

## Context

This matters because AI coding assistants like Claude Code are becoming essential productivity tools for developers, but context management and interaction friction remain significant challenges. The /btw feature addresses the token cost and context pollution problems that degrade performance over long sessions, while /voice mode makes AI assistance more accessible and natural. These improvements reflect broader trends toward more seamless, multimodal AI interactions that reduce cognitive load and technical barriers for developers.