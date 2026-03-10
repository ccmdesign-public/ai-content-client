---
metadata:
  videoId: "_a45M3M6o1Q"
  title: "Claude Code MASSIVE Upgrade? (agent loops new feature)"
  description: "More new leads + 1500 followers + ALL my resources

    👉 https://www.skool.com/buildroom/


    Summary ⤵️

    Claude Code just dropped two new features — and one of them is going to completely change how you automate your workflow.\ 


    In this tutorial, I break down the difference between the new Loop (/loop) feature and Scheduled Tasks in Claude Code, explain why most people are sleeping on the wrong one, and then build out two real scheduled tasks live so you can see exactly how to set it up.


    ⏱️TIMESTAMPS:

    00:00 - Intro: Claude Code's Two New Features

    00:33 - Why the Loop Feature Is Overrated

    01:24 - How Scheduled Tasks Actually Work

    02:02 - Loop vs. Schedule: Key Differences

    03:00 - 5 Scheduled Task Use Cases

    04:18 - How to Create a Scheduled Task

    05:07 - How to Set Up Auto-Accept and Timing

    06:17 - How to Connect Claude Code to GitHub

    07:06 - How to Build a GitHub Changelog Monitor

    08:25 - How to View and Edit Scheduled Tasks

    09:15 - How to Run Scheduled Tasks Locally

    09:47 - How to Set Up Tone of Voice Guidelines

    10:30 - How to Auto-Draft LinkedIn Posts Daily

    11:54 - Reviewing the 15 Auto-Generated Posts

    12:29 - Next Steps and Wrap Up"
  channel: "Duncan Rogoff | AI Automation"
  channelId: "UC37JpWP5PxLSma2lh79HU9A"
  duration: "PT12M51S"
  publishedAt: "2026-03-09T14:45:05Z"
  thumbnailUrl: "https://i.ytimg.com/vi/_a45M3M6o1Q/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=_a45M3M6o1Q"
processedAt: "2026-03-10T15:39:53.017Z"
source: "youtube"
tldr: "Claude Code's new scheduled tasks feature is a powerful tool for automating recurring AI-driven workflows, enabling users to create daily content repurposing, competitor monitoring, or performance reports, while the new `/loop` feature is generally overrated for most users."
tools:
  - name: "Claude Code"
    url: null
  - name: "GitHub"
    url: null
  - name: "OpenClaw"
    url: null
  - name: "VS Code"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Reddit"
    url: null
  - name: "Hacker News"
    url: null
  - name: "LinkedIn"
    url: null
  - name: "YouTube"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "automation"
  - "claude"
  - "content-creation"
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 12942
  outputTokens: 1338
  totalTokens: 14280
  processingTimeMs: 39628
tagsNormalizedAt: "2026-03-10T16:45:55.446Z"
---

## Key Takeaways

Duncan Rogoff highlights the significant impact of Claude Code's new features, emphasizing the utility of scheduled tasks over the less broadly applicable loop feature.

*   **Scheduled tasks** in Claude Code allow for the automation of recurring AI workflows, functioning like cron jobs to perform actions at set intervals without user intervention.

*   This feature is versatile, enabling tasks such as **daily content briefings**, **content repurposing** (e.g., generating LinkedIn posts from video transcripts), **competitor monitoring**, and **performance report generation**.

*   The **`/loop` feature** is deemed overrated for general use, primarily benefiting active coding sessions by providing real-time code checks and feedback, similar to an assistant developer.

*   Users can easily set up scheduled tasks either by **natural language prompts** or through the **desktop app's interface**, with options for local execution or integration with external platforms like GitHub.

## Summary

Duncan Rogoff introduces two new features in Claude Code: **scheduled tasks** and the **`/loop` feature**. He argues that while the loop feature is largely overrated for most users, the scheduled tasks capability is incredibly powerful and offers significant automation potential.

### Scheduled Tasks: A Powerful Automation Tool

Scheduled tasks in Claude Code enable users to automate recurring AI-driven workflows. Unlike the ephemeral `/loop` feature, scheduled tasks persist even after the application restarts, making them suitable for long-term automation. These tasks function similarly to **cron jobs**, allowing users to define specific actions to be performed at set intervals, such as hourly, daily, or weekly. For these tasks to run autonomously, the Claude Code desktop application must be open and active, and the "auto-accept edits" option should be enabled to prevent interruptions for manual approvals.

Rogoff demonstrates several practical applications for scheduled tasks:

*   **Morning Briefing**: Automatically scrape sources like Reddit or Hacker News, or summarize emails, to provide a daily news digest.

*   **Content Repurposing**: Monitor a folder for new video transcripts and automatically draft social media posts (e.g., LinkedIn posts) based on the content, adhering to specified tone-of-voice guidelines and formatting references.

*   **Competitor Monitoring**: Regularly scrape competitor websites or social media channels to stay updated on trends and activities.

*   **Weekly Performance Report**: Consolidate data from various sources, such as YouTube analytics, email subscriber growth, and membership platforms, into a comprehensive report.

### Setting Up Scheduled Tasks

Users can create scheduled tasks in Claude Code through two primary methods:
1.  **Natural Language Prompting**: Simply describe the desired task to Claude using plain language (e.g., "Create a scheduled task to run daily at 7 AM to check this GitHub repository..."). Claude's intelligence allows it to understand the request and configure the task accordingly.
2.  **Desktop App Interface**: Navigate to the "Scheduled" tab in the Claude Code desktop app, click "New Task," and fill in the details, including the task name, description, frequency, and specific instructions for Claude. Important settings include selecting the relevant folder for local tasks, choosing the AI model, and setting "ask for permissions" to "auto-accept edits" for uninterrupted automation.

Rogoff specifically illustrates setting up a task to monitor the Claude Code change log on GitHub. This task automatically checks for updates daily and summarizes any new features to inspire content creation. He also shows how to set up a local task to process video transcripts, generating multiple LinkedIn posts with varied angles based on pre-defined tone-of-voice and formatting guidelines.

### The Overrated `/loop` Feature

The `/loop` feature, while new, is presented as less universally useful. It's designed for **active coding sessions**, acting as an "assistant dev" that can perform periodic checks (e.g., pulling from GitHub, evaluating code health) within a live coding environment. However, unlike scheduled tasks, the `/loop` operation is ephemeral; it does not survive application restarts or session closures. This makes it unsuitable for persistent automation and primarily beneficial for developers needing real-time, in-session feedback and assistance.

## Context

This video is highly relevant for developers, content creators, and business owners looking to leverage AI for automation and efficiency. It highlights how large language models (LLMs) like Claude Code are evolving beyond simple chatbots to become powerful, programmable agents capable of executing complex, recurring tasks. The ability to schedule these tasks effectively transforms how individuals and businesses can manage routine operations, from content generation and market research to performance tracking, making AI an integral part of their daily workflow. This matters as businesses increasingly seek to automate repetitive processes to free up human resources for more strategic work.