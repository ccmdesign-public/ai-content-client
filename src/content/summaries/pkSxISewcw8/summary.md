---
metadata:
  videoId: "pkSxISewcw8"
  title: "STOP Using Bypass Permissions, Use This New Feature Instead"
  description: "Full courses + unlimited support: https://www.skool.com/ai-automation-society-plus/about

    All my FREE resources: https://www.skool.com/ai-automation-society/about

    Apply for my YT podcast: https://podcast.nateherk.com/apply

    Work with me: https://uppitai.com/


    My Tools💻

    14 day FREE n8n trial: https://n8n.partnerlinks.io/22crlu8afq5r

    Code NATEHERK to Self-Host Claude Code for 10% off (annual plan): https://www.hostinger.com/vps/claude-code-hosting

    Voice to text: https://ref.wisprflow.ai/nateherk


    Claude Code just released auto mode, a new permission setting that sits between \"ask before every edit\" and \"dangerously skip permissions.\"\ 


    Instead of stopping your workflow every few seconds or giving Claude free rein to do anything, auto mode uses a classifier to check each action for risk before executing it. Safe actions run automatically, risky ones get flagged. In this video I break down how it works, test it with some real examples, and show you how to turn it on.


    Sponsorship Inquiries:

    📧 sponsorships@nateherk.com


    TIMESTAMPS\ 

    0:00 What Is Auto Mode

    0:46 Bypass Permissions & Custom Settings

    1:35 How Auto Mode Works

    2:55 Testing Auto Mode

    4:57 How to Enable It

    5:26 Final Thoughts"
  channel: "Nate Herk | AI Automation"
  channelId: "UC2ojq-nuP8ceeHqiroeKhBA"
  duration: "PT5M41S"
  publishedAt: "2026-03-24T22:42:50Z"
  thumbnailUrl: "https://i.ytimg.com/vi/pkSxISewcw8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=pkSxISewcw8"
processedAt: "2026-03-25T14:47:58.258Z"
source: "youtube"
tldr: "Claude Code's new 'auto mode' provides a safer alternative to bypassing permissions for long-running tasks by automatically classifying actions as safe or risky, reducing workflow interruptions while maintaining security."
tools:
  - name: "Claude Code"
    url: null
  - name: "VS Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Security"
  - "Tools & Productivity"
tags:
  - "automation"
  - "claude"
  - "policy"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6059
  outputTokens: 703
  totalTokens: 6762
  processingTimeMs: 28542
tagsNormalizedAt: "2026-03-25T14:52:09.701Z"
---

## Key Takeaways

The video introduces Claude Code's new 'auto mode' as a middle ground between restrictive permissions and dangerous bypass options. Key insights include: • **Auto mode** intelligently classifies actions as safe or risky before execution, allowing safe operations to proceed automatically. • It reduces workflow interruptions for long-running tasks compared to the default 'ask before edits' mode. • While safer than 'dangerously skip permissions,' it's not risk-free and is currently in research preview for team plans only. • The mode is slightly more expensive due to the AI classifier that reviews each tool call.

## Summary

Claude Code's default permission mode ('ask before edits') requires manual approval for every file write and bash command, which interrupts workflows when running long tasks. While some developers use 'dangerously skip permissions' mode for uninterrupted work, this poses significant security risks as Claude can execute any action without oversight.

Previously, the creator used a local settings file with allow/deny lists to control permissions per project, but this required manual setup for each new project. The new **auto mode** solves this by having Claude automatically determine the best permission mode for each task through an AI classifier that reviews tool calls for risky actions like deletions or sensitive data access.

In demonstrations, auto mode correctly identified a request to delete brand assets as risky and asked for permission, while allowing a non-risky file move operation to proceed automatically. This creates a middle path that enables longer tasks with fewer interruptions while introducing less risk than skipping all permissions.

The mode is currently in **research preview** and only available for Cloud Team users, with plans to expand to enterprise plans and API users. Sessions in auto mode are slightly more expensive due to the additional AI classification step before each tool call. Users can enable auto mode through VS Code settings or by running `claude-enable auto mode` in the terminal.

While auto mode reduces risk, it doesn't eliminate it entirely, and Anthropic recommends using it only in isolated environments. The feature represents a significant improvement for developers who need to run automated tasks without constant supervision but want more safety than completely bypassing permissions.

## Context

This video addresses a critical pain point in AI-assisted development workflows: balancing security with productivity. Developers using Claude Code face a trade-off between the interruption-heavy default permission mode and the dangerous 'skip permissions' option. The new auto mode represents an important evolution in AI coding tools, moving toward more intelligent, context-aware permission systems that can make safety decisions autonomously. This matters for developers, DevOps teams, and organizations adopting AI coding assistants who need to maintain security while enabling efficient, automated workflows.