---
metadata:
  videoId: "ZUBJqLGKoZI"
  title: "Claude NEW Computer Use in 6 Minutes"
  description: "Claude Can Now Control Your Entire Computer (Dispatch Demo on Desktop + Mobile)


    Anthropic has released a new “computer use” capability for Claude that lets it see your screen and take keyboard and mouse actions across your entire machine, available via updated desktop and mobile apps through the Dispatch feature. The script explains setup steps (install latest apps, pair phone, enable computer use in settings) and notes it’s available on the Pro and Max plans. It describes how Claude first tries connected app connectors (like Slack or Calendar) and, if unavailable, asks permission to interact directly with apps as a fallback. In demos, Claude adds a calendar note (“be home for groceries”) and then runs a multi-step workflow: updating a Reminders grocery list and navigating Uber Eats to find a nearby Target and add items to the cart. The narrator highlights that it’s early days, can be slow, and may make mistakes but can course-correct.


    00:00 Claude Controls Your Computer

    00:36 What Dispatch Enables

    01:01 Setup and Pairing Steps

    01:31 Connectors and Permissions

    01:59 Demo Calendar Task

    02:44 Building Multi App Workflows

    03:25 Watching It Work and Fix Errors

    03:58 Speed and Reliability Caveats

    04:59 Uber Eats Grocery Run

    05:31 Early Days and Wrap Up"
  channel: "Developers Digest"
  channelId: "UCuE6iwZKgGz8s6kznBRI9LQ"
  duration: "PT6M15S"
  publishedAt: "2026-03-24T03:48:28Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ZUBJqLGKoZI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ZUBJqLGKoZI"
processedAt: "2026-03-24T21:08:44.301Z"
source: "youtube"
tldr: "Anthropic has released Claude's 'Computer Use' feature, enabling it to control a desktop computer via screen viewing and keyboard/mouse actions, with a fallback mechanism from connectors to direct app control, available on Pro/Max plans."
tools:
  - name: "Claude"
    url: null
  - name: "Slack"
    url: null
  - name: "Uber Eats"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "llm"
  - "productivity"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6350
  outputTokens: 835
  totalTokens: 7185
  processingTimeMs: 13442
tagsNormalizedAt: "2026-03-24T23:00:02.183Z"
---

## Key Takeaways

Claude's new Computer Use feature marks a significant expansion of AI agent capabilities into direct desktop control. • **Desktop & Mobile Control**: Available via desktop app and mobile Dispatch feature for remote computer control. • **Fallback Mechanism**: Uses dedicated connectors first (e.g., Slack, Calendar), then falls back to direct control of applications via screen and input. • **Workflow Automation**: Can stitch together multi-step tasks across different apps (e.g., adding reminders then shopping on Uber Eats). • **Early-Stage Performance**: While powerful, it can be slower than manual task completion due to inference time and occasional errors requiring correction.

## Summary

Anthropic has launched Claude's **Computer Use** capability, a major upgrade that allows the AI to directly control a user's computer. This feature is accessible through both the desktop application and the mobile app's **Dispatch** feature, enabling remote control of a desktop machine.

The system operates by viewing the screen and executing actions via keyboard and mouse inputs. It represents a significant expansion from previous browser-only control to **full machine interaction**. The core functionality includes a **permission-based fallback mechanism**: Claude first attempts to use pre-built connectors (like for Slack or Calendar) for specific tasks. If a connector isn't available, it asks for permission to interact directly with the application on the computer.

**Setup and Availability**: Users need the latest version of the desktop app and must enable the Computer Use feature in settings. It is available only on Claude's **Pro and Max subscription plans**. When active, a visual **pulsating orange effect** appears around the screen edges to indicate Claude is controlling the interface.

**Demonstrated Capabilities**: The video showcases Claude performing complex, multi-app workflows. For example, it can: • Open a calendar app and add an event. • Open a reminders app, create a grocery list, then navigate to Uber Eats, search for a nearby Target store, and add the listed items to the cart.

**Performance and Limitations**: The presenter notes this is **early-stage technology**. While Claude can **course-correct** from mistakes (like fixing a typo), the process is not always faster than manual execution. The AI must infer visual elements and navigate unfamiliar applications, which can lead to stumbles and increased task completion time. The system does not currently show a step-by-step log of the agent's reasoning process during execution.

**Future Potential**: Despite current limitations, the feature demonstrates a foundational infrastructure for **AI agentic workflows**. It points toward a future where AI can seamlessly automate complex, cross-application tasks on a user's personal computer.

## Context

This release represents a pivotal step in the evolution of AI assistants from conversational chatbots to active, autonomous agents that can operate software and complete real-world tasks on a user's device. It bridges the gap between AI intelligence and practical computer automation, moving beyond API integrations to direct visual and input control. Developers, productivity enthusiasts, and early AI adopters should pay attention, as this capability could redefine personal workflow automation and set a new standard for AI-human computer interaction.