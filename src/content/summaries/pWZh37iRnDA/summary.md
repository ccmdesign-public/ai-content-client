---
metadata:
  videoId: "pWZh37iRnDA"
  title: "Claude Code Loops in 7 Minutes"
  description: "Claude Code “Loop” Scheduling: Recurring AI Tasks in Your Session


    The script explains Claude Code’s new “Loop” feature (an evolution of the Ralph Wiggins technique) for running recurring prompts that help verify work and prevent premature task completion. Loop can schedule tasks for up to three days using natural language or a /loop command, with a minimum one-minute interval, and it shows the scheduled prompt, notes, and auto-expiry. Examples include looping over PRs to fix build issues, summarizing tagged Slack posts via MCP, creating daily Git history recaps saved to the desktop, and scraping Hacker News with Firecrawl then emailing summaries via a connected Gmail CLI skill. Loops are scoped to the active Claude Code session and stop when the session closes, include up to a 10% scheduling offset to avoid synchronized API spikes, and can be disabled via a flag; for durable scheduling, the script suggests the desktop app feature or GitHub Actions.



    FOLLOW ME

    → Website: https://dub.sh/dev-digest

    → X/Twitter: https://dub.sh/dd-x

    → GitHub: https://git.new/devdigest


    TOOLS I USE

    → Wispr Flow (voice-to-text): https://dub.sh/dd-wispr

    → Screen Studio (screen recording): https://dub.sh/dd-screenstudio

    → Descript (video editing): https://dub.sh/dd-descript

    → Railway (deployment): https://dub.sh/dd-railway


    LEARNING RESOURCES

    → Scrimba: https://dub.sh/dd-scrimba


    00:00 Loop Feature Intro

    00:20 Why Tasks Fail Early

    00:53 Loop Use Cases

    01:07 Scheduling Your First Loop

    01:27 Intervals Limits Expiry

    01:51 Daily Git Recap Example

    02:25 Combining With Skills

    02:43 Session Scope Caveats

    03:38 Hacker News Email Automation

    04:27 Listing Canceling Jobs

    05:00 New Commands Summary

    05:10 Scheduler Time Offsets

    05:45 Disable Flag Limitations

    06:42 Durable Alternatives Wrap Up"
  channel: "Developers Digest"
  channelId: "UCuE6iwZKgGz8s6kznBRI9LQ"
  duration: "PT7M2S"
  publishedAt: "2026-03-07T19:30:59Z"
  thumbnailUrl: "https://i.ytimg.com/vi/pWZh37iRnDA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=pWZh37iRnDA"
processedAt: "2026-03-10T15:25:20.425Z"
source: "youtube"
tldr: "Claude Code's new Loop feature lets you schedule recurring AI tasks for up to 3 days using natural language, enabling automated workflows like daily Git summaries, PR monitoring, and news scraping, though tasks are scoped to active sessions and have a minimum 1-minute interval."
tools:
  - name: "Claude Code"
    url: null
  - name: "Firecrawl"
    url: null
  - name: "Worktree"
    url: null
  - name: "Slack MCP"
    url: null
  - name: "GitHub Actions"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "automation"
  - "claude"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6632
  outputTokens: 856
  totalTokens: 7488
  processingTimeMs: 30705
tagsNormalizedAt: "2026-03-10T16:42:24.074Z"
---

## Key Takeaways

Claude Code's Loop feature introduces scheduled, recurring AI tasks. Key points include: • **Natural language scheduling** allows creating loops like 'every day at 8 AM' or 'every 4 hours' with simple commands. • **Session-scoped execution** means loops only run while your Claude Code session is active and expire after 3 days, preventing orphaned tasks. • **Skill integration** enables combining loops with other capabilities like Firecrawl for web scraping, Git analysis, and email notifications. • **Built-in management** provides commands to list, create, and cancel scheduled tasks directly within the interface.

## Summary

Claude Code's Loop feature represents an evolution from the previous 'Ralph Wiggums' technique, which provided iterative self-referential AI development but lacked persistent verification. Loop addresses this by enabling **scheduled recurring tasks** that can run for up to 3 days.

### How Loop Works

To create a loop, users simply specify the interval and task using natural language or slash commands. The minimum granularity is **1 minute** (anything less rounds up), and tasks automatically expire after **3 days** to prevent indefinite execution. Examples demonstrated include: 'loop every 10 seconds to say hello' (which becomes every minute), 'every day at 8 AM look at my Git history and summarize yesterday's work,' and 'loop every 4 hours to scrape Hacker News for AI/LLM stories and email me a summary.'

### Practical Applications

• **Development workflows**: Automatically fix build issues when PR comments come in using Worktree agents
• **Daily summaries**: Generate Git activity recaps or Slack channel digests
• **Information monitoring**: Regularly scrape news sites for relevant topics using tools like Firecrawl
• **Task automation**: Combine with CLI skills to send emails, update files, or perform system operations

### Important Limitations

Loops are **scoped to active Claude Code sessions**—closing your terminal or computer stops all scheduled tasks. This differs from traditional cron jobs that run independently in the background. The system also adds **random offsets (up to 10%)** to scheduled execution times to prevent API overload from simultaneous global requests.

### Management Commands

Three primary tools handle loop management:
• **cron create**: Schedule new recurring tasks
• **cron list**: View all active scheduled events
• **cron delete**: Cancel specific tasks using natural language descriptions

For persistent scheduling needs, the video mentions alternatives like the Claude Code desktop app (which can survive restarts) or GitHub Actions integration.

## Context

This matters because it represents a significant step toward persistent AI automation within development workflows. Developers and technical teams can now create self-verifying, recurring AI tasks without complex infrastructure setup. The feature bridges the gap between one-off AI assistance and reliable automated systems, though with intentional limitations to prevent resource abuse. It's particularly relevant for anyone using Claude Code for development, content monitoring, or repetitive analysis tasks who wants to automate periodic checks and actions.