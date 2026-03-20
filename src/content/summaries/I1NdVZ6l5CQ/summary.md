---
metadata:
  videoId: "I1NdVZ6l5CQ"
  title: "Claude Code & Cowork Now Run 24/7 — Scheduled Tasks"
  description: "Anthropic just released scheduled tasks in Claude Cowork, and it's one of the most genuinely useful AI features I've seen. In this video, I show you how scheduled tasks work, walk through three real workflows I use every day, and share a free plugin I built that brings the same functionality to Claude Code.


    My real use cases:

    - Automated weekly Stripe sales reports

    - Daily Substack Note idea generation

    - Nightly brain dump organization into my context system


    Join my free newsletter for weekly AI tips and techniques!

    https://theailaunchpad.substack.com/


    🎥 Watch Next

    1. Automate Linear tasks end-to-end with Claude Code: https://youtu.be/jsI18Htgf8k

    2. Claude Code Agent Teams: https://youtu.be/hZAk5zRfXBg

    3. Claude Skills: https://youtu.be/421T2iWTQio


    Apps I use:

    Get Wisper Flow Pro FREE for 14 days! https://ref.wisprflow.ai/kenneth-liao


    🛠️ Resources

    1. Free Scheduler Plugin: https://github.com/kenneth-liao/ai-launchpad-marketplace

    3. Claude Desktop App: https://claude.com/download


    🕒 Sections

    00:00 - Intro

    01:18 - Live Demos

    06:09 - Use Cases

    07:19 - How Scheduled Tasks Work in Cowork

    12:27 - Scheduled Tasks Claude Code Plugin


    ✉️ For Business Inquiries:

    kennyliao@theailaunchpad.io


    #claudecode #cowork #openclaw"
  channel: "Kenny Liao"
  channelId: "UCOEqiv0-yg_hx0nJiaWJK4Q"
  duration: "PT18M27S"
  publishedAt: "2026-02-28T07:22:03Z"
  thumbnailUrl: "https://i.ytimg.com/vi/I1NdVZ6l5CQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=I1NdVZ6l5CQ"
processedAt: "2026-03-10T15:22:40.510Z"
source: "youtube"
tldr: "Anthropic's new scheduled tasks feature in Claude Co-work enables fully autonomous AI agents that run 24/7, and the creator built a complementary plugin for Claude Code users to achieve the same functionality through system cron jobs."
tools:
  - name: "Claude"
    url: null
  - name: "Claude Co-work"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Google Calendar"
    url: null
  - name: "Sentry"
    url: null
  - name: "Stripe"
    url: null
  - name: "Substack"
    url: null
  - name: "Playwright"
    url: null
  - name: "MCP (Model Context Protocol)"
    url: null
  - name: "AI Launchpad Marketplace"
    url: null
  - name: "GitHub"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "mcp"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 11828
  outputTokens: 989
  totalTokens: 12817
  processingTimeMs: 31863
tagsNormalizedAt: "2026-03-10T16:46:12.481Z"
---

## Key Takeaways

The video demonstrates how scheduled tasks transform Claude from a reactive tool into a proactive, autonomous assistant. Key insights include:

*   **Scheduled tasks enable 24/7 AI agents** for daily briefings, file organization, and content creation without manual triggering.

*   **A custom plugin bridges the gap for Claude Code users**, using the system's cron to run tasks independently of the app being open.

*   **Practical use cases span personal and business workflows**, from email prioritization and financial reporting to automated content staging and knowledge management.

*   **The feature leverages existing Claude Code infrastructure**, including skills and MCP servers, making complex automations accessible through simple prompts.

## Summary

Anthropic's new scheduled tasks feature in Claude Co-work marks a significant step toward fully autonomous AI agents. This allows users to set prompts to run automatically on a schedule (hourly, daily, weekly), turning Claude into a proactive assistant that works in the background.

### Practical Use Cases Demonstrated

The creator shares several real-world applications:

*   **Daily & Weekly Briefs:** Automated reports checking Google Calendar, summarizing and prioritizing unread emails, and monitoring production errors via Sentry.

*   **Business Intelligence:** A weekly task that pulls transaction data from Stripe to generate a business performance analysis.

*   **Content Automation:** A daily task that writes three Substack notes from an idea bank using specific writing skills and voice.

*   **Knowledge Management:** A nightly task that parses a "brain dump" file, organizing the information into a structured personal context system for the AI assistant.

### Using Scheduled Tasks in Claude Co-work

The feature is accessed via a new sidebar menu or the `/schedule` slash command. Creating a task involves writing a prompt, selecting a model (e.g., Sonnet to save costs), choosing a working directory, and setting the frequency. A key limitation is that both the computer and the Claude app must be running for Co-work tasks to execute.

### The Claude Code Plugin Solution

For users who prefer Claude Code (where the native feature isn't available), the creator built a plugin available on the AI Launchpad Marketplace. This plugin packages the functionality as a skill, allowing users to simply tell Claude to "schedule a task."

**How the Plugin Works:** It uses the operating system's built-in cron tool to run tasks natively, eliminating the dependency on the Claude app being open. When a task is created, the plugin generates a wrapper script and manages everything through a `scheduler` folder in the project's `.claude` directory, which includes a task registry, logs, results, and the generated scripts.

This approach offers greater reliability for always-on automation and integrates seamlessly with Claude Code's existing skill and MCP server ecosystem.

## Context

The pursuit of fully autonomous AI agents that work independently is a major trend in AI productivity. Scheduled tasks move beyond interactive chat, enabling Claude to operate proactively on a user's behalf. This matters for professionals, creators, and developers seeking to automate routine information gathering, reporting, content creation, and system maintenance, effectively creating a personalized AI employee that works around the clock.