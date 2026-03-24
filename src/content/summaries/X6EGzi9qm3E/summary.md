---
metadata:
  videoId: "X6EGzi9qm3E"
  title: "Claude Code Just Got Another Huge Upgrade"
  description: "Full courses + unlimited support: https://www.skool.com/ai-automation-society-plus/about

    All my FREE resources: https://www.skool.com/ai-automation-society/about

    Apply for my YT podcast: https://podcast.nateherk.com/apply

    Work with me: https://uppitai.com/


    My Tools💻

    14 day FREE n8n trial: https://n8n.partnerlinks.io/22crlu8afq5r

    Code NATEHERK to Self-Host Claude Code for 10% off (annual plan): https://www.hostinger.com/vps/claude-code-hosting

    Voice to text: https://ref.wisprflow.ai/nateherk


    Anthropic just dropped Computer Use for Claude Code, which lets it natively control your mouse, keyboard, and take screenshots to interact with any app on your desktop.\ 


    In this video I walk through how to enable it, demo it sending files through ClickUp and controlling my Mac remotely from my phone using Dispatch, and cover the current limitations you should know about. It's in research preview right now but there are already some seriously cool use cases here.


    Sponsorship Inquiries:

    📧 sponsorships@nateherk.com


    TIMESTAMPS\ 

    0:00 What Is Computer Use

    0:52 Starting OBS With Computer Use

    1:24 How to Enable It

    1:40 Demo: Sending a File via ClickUp

    3:19 Troubleshooting Tips

    3:52 Pairing With Dispatch

    4:13 Demo: Calculator From Your Phone

    5:07 Limitations to Know

    5:47 Browser Use Workarounds

    6:42 Best Use Cases

    7:51 Final Thoughts"
  channel: "Nate Herk | AI Automation"
  channelId: "UC2ojq-nuP8ceeHqiroeKhBA"
  duration: "PT8M11S"
  publishedAt: "2026-03-24T01:11:34Z"
  thumbnailUrl: "https://i.ytimg.com/vi/X6EGzi9qm3E/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=X6EGzi9qm3E"
processedAt: "2026-03-24T20:28:38.250Z"
source: "youtube"
tldr: "Anthropic's Claude Code now has a 'Computer Use' feature that lets it natively control your Mac's mouse, keyboard, and take screenshots to automate desktop tasks, and when paired with the 'Dispatch' feature, you can trigger these actions remotely from your phone."
tools:
  - name: "Claude Code"
    url: null
  - name: "Claude Co-work"
    url: null
  - name: "ClickUp"
    url: null
  - name: "OBS"
    url: null
  - name: "Playwright"
    url: null
  - name: "Safari"
    url: null
  - name: "Google Chrome"
    url: null
  - name: "Slack"
    url: null
  - name: "Finder"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-general"
  - "automation"
  - "claude"
  - "llm"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8250
  outputTokens: 1018
  totalTokens: 9268
  processingTimeMs: 37119
tagsNormalizedAt: "2026-03-24T22:59:11.751Z"
---

## Key Takeaways

Claude Code's new Computer Use feature represents a major shift toward AI-driven desktop automation. Key insights include:

- **Computer Use** enables Claude Code to natively control your mouse, keyboard, and take screenshots to interact with local applications like Finder, ClickUp, and Calculator.

- **Pair with Dispatch** to remotely trigger desktop automation from your phone, allowing you to manage files or run tasks while away from your computer.

- **Current limitations** include MacOS-only availability (Windows coming soon), browser interaction restrictions for security, and being in research preview which can make it feel slow or buggy.

- **Powerful use cases** include automating tasks in legacy apps without APIs, scheduling repetitive computer actions, and using it as a testing assistant to click through and find bugs in applications.

## Summary

Anthropic has released a groundbreaking new feature for Claude Code called **Computer Use**, currently in research preview. This allows the AI to take direct control of a user's local computer, using the mouse, keyboard, and taking screenshots to navigate and perform tasks within approved applications.

**How It Works & Setup**

The feature is activated within the Claude desktop app's settings under 'Computer Use'. Users must grant necessary accessibility permissions (like screen recording). Once enabled, you can prompt Claude with commands like "use computer use to..." followed by a specific task. The AI will then visually navigate the desktop, opening apps, clicking buttons, and typing as needed, using screenshots to understand the interface context.

**Demonstrated Capabilities**

The video shows several live demos. In one, Claude Code is tasked with finding a specific PDF in the Downloads folder and sending it as a direct message in ClickUp. It successfully opens Finder, searches for the file, opens ClickUp, navigates to the correct chat, attaches the file, and sends it—all through visual interaction. Another demo pairs Computer Use with the **Dispatch** feature, where the user sends a text from their phone asking Claude to open the Calculator app, perform a complex multiplication, and record the result in the Notes app, which it executes on the local machine.

**Limitations and Future**

As a research preview feature, it can be slow and is currently **MacOS-only**, with a Windows version promised in a few weeks. A significant restriction is that it has **read-only access in web browsers** like Safari for security reasons; for full web automation, users would need to rely on the Claude Chrome extension or tools like Playwright. It is also only available on Pro plans, not Teams or Enterprise.

Despite these, the potential is vast. It can automate workflows in legacy desktop applications that lack APIs, be scheduled for repetitive tasks, or act as a testing assistant to click through and find bugs in software builds. The rapid pace of Anthropic's feature releases suggests this native, visual control is a core direction for Claude Code's evolution.

## Context

This development is significant as it moves AI assistants from being purely conversational or code-focused to becoming active agents that can perform physical, visual tasks on a user's personal computer. It matters to developers, productivity enthusiasts, and businesses looking to automate complex, multi-step desktop workflows that previously required human intervention or custom scripting. It connects to the broader trend of AI agents evolving beyond chat interfaces to interact directly with software environments, potentially transforming personal and professional task automation.