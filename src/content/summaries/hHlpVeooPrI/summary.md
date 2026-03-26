---
metadata:
  videoId: "hHlpVeooPrI"
  title: "Claude Code + iMessage is Finally Here."
  description: "Full courses + unlimited support: https://www.skool.com/ai-automation-society-plus/about

    All my FREE resources: https://www.skool.com/ai-automation-society/about

    Apply for my YT podcast: https://podcast.nateherk.com/apply

    Work with me: https://uppitai.com/


    My Tools💻

    14 day FREE n8n trial: https://n8n.partnerlinks.io/22crlu8afq5r

    Code NATEHERK to Self-Host Claude Code for 10% off (annual plan): https://www.hostinger.com/vps/claude-code-hosting

    Voice to text: https://ref.wisprflow.ai/nateherk


    In this video I walk through Claude Code's new iMessage channel, which lets you text your Claude Code session from your phone and have it run tasks like it's sitting at your computer.\ 


    I cover the full setup process, the current limitations you should know about, and break down the difference between Dispatch, Channels, and Remote Control so you know which one to use.


    Sponsorship Inquiries:

    📧 sponsorships@nateherk.com


    TIMESTAMPS\ 

    0:00 Live Demo

    1:20 What Are Channels?

    2:16 Limitations and Workarounds

    3:15 How to Set It Up

    5:30 Launching in Channel Mode

    6:31 Allowing Other Numbers

    7:25 Enterprise and Team Plans

    8:06 Dispatch vs Channels vs Remote Control

    9:22 Outro"
  channel: "Nate Herk | AI Automation"
  channelId: "UC2ojq-nuP8ceeHqiroeKhBA"
  duration: "PT9M30S"
  publishedAt: "2026-03-26T02:54:48Z"
  thumbnailUrl: "https://i.ytimg.com/vi/hHlpVeooPrI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=hHlpVeooPrI"
processedAt: "2026-03-26T21:20:53.274Z"
source: "youtube"
tldr: "Claude Code's new iMessage channel allows you to interact with your local AI coding session via text messages, enabling you to run tasks like scraping YouTube comments remotely, but requires Mac OS and a running session."
tools:
  - name: "Claude Code"
    url: null
  - name: "Visual Studio Code"
    url: null
  - name: "Bun"
    url: null
  - name: "Discord"
    url: null
  - name: "Telegram"
    url: null
  - name: "iMessage"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "ai-coding"
  - "claude"
  - "mcp"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9136
  outputTokens: 976
  totalTokens: 10112
  processingTimeMs: 31410
tagsNormalizedAt: "2026-03-26T21:33:03.061Z"
---

## Key Takeaways

The video demonstrates Claude Code's new iMessage integration and how to set it up. Key takeaways include:

- **iMessage Channel** enables remote interaction with Claude Code sessions via text, treating messages as if typed locally.

- **Setup is simple**: install Bun, grant full disk access to VS Code, install the plugin, and launch Claude with the channel flag.

- **Major limitation**: requires Mac OS and a continuously running session; if the session ends, the channel stops working until restarted.

- **Permission control**: you can approve actions and manage access for other phone numbers or Apple IDs from your iMessage.

## Summary

Claude Code has released a new **iMessage channel** feature, allowing users to interact with their local AI coding sessions through text messages. The video demonstrates this by showing a text command to "scrape YouTube comments from my recent video" being sent via iMessage, processed by Claude Code locally using a YouTube analyzer skill, and the results returned via iMessage.

### How Channels Work

Channels are **MCP servers** that push events into running Claude Code sessions, essentially giving Claude Code a phone number. When you send an iMessage, it gets tunneled into your local session as if you typed it directly. Claude Code can then use all your local skills, API keys, and files to execute tasks and reply back through iMessage.

### Setup Process

Setup involves three main steps:
1. **Install Bun** - a JavaScript runtime required for the channel plugins
2. **Grant Full Disk Access** on Mac OS to Visual Studio Code (or your terminal) in System Settings > Privacy & Security
3. **Install and Configure** the iMessage plugin by running specific commands in Claude Code:

- Install the plugin globally

- Launch Claude Code with the channel flag: `claude --channel imessage`

The channel then shows "Listening for channel messages from iMessage" and is ready to receive texts.

### Limitations and Considerations

- **Mac OS Requirement**: iMessage channel only works on Mac OS because it accesses the native messaging system.

- **Session Dependency**: The Claude Code session must remain running; if it closes, the channel stops working until you restart it locally.

- **Duplication Issue**: When texting yourself, both your messages and Claude's replies appear twice. To avoid this, you can text from a different number or Apple ID after granting access via `/imessage access allow`.

- **Enterprise Considerations**: Team/enterprise plans require admin approval in organization settings to enable channels.

### Comparison with Other Features

The video clarifies differences between three similar Claude Code features:

- **Dispatch**: Message-based task delegation from mobile app with minimal setup

- **Channels**: Event-based (like iMessage, Discord, Telegram) for reacting to external events

- **Remote Control**: Direct control of active sessions from cloud.ai/code or mobile app

### Advanced Use Cases

For 24/7 availability, you could host Claude Code on a **Mac OS VPS** or **Mac Mini**. The iMessage channel also works with regular SMS (green bubbles) sent to the same number. The feature represents Anthropic's direction toward making Claude Code accessible from anywhere.

## Context

This matters because it represents a significant step in making AI-powered coding assistants more accessible and integrated into daily workflows. Developers, content creators, and AI automation enthusiasts can now interact with their local development environment remotely via a familiar messaging platform. This connects to broader trends of AI agents becoming more autonomous and accessible through various communication channels, moving beyond the traditional terminal or IDE interface.