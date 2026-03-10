---
metadata:
  videoId: "jsI18Htgf8k"
  title: "How I Turned Claude Code Into My Dev Team"
  description: "In this video I walk you through my system for shipping new product features, bug fixes, customer requests, etc., faster and more autonomously with Claude Code and Linear. We use workflows in the form of Claude Code slash (custom) commands to create Linear issues and projects. We also resolve Linear issues end-to-end with a single slash command where Claude Code manages the entire development cycle. For the full breakdown including the prompts used, check out the newsletter issue here: https://theailaunchpad.substack.com/p/my-ship-daily-system-with-claude.


    If you want to purchase the complete system with commands, subagents, skills, etc., I now have a plugin with a detailed step-by-step guide for implementation for sale on my substack: https://theailaunchpad.substack.com/p/my-complete-ship-daily-system


    Join my free newsletter for weekly AI tips and techniques!

    https://theailaunchpad.substack.com/


    🎥 Watch Next

    1. Context Engineering for Claude Code: https://youtu.be/ySA9tJ8RfVM

    2. Complete Claude Skills Guide:  https://youtu.be/421T2iWTQio


    Apps I use:

    Get Wisper Flow Pro FREE for 14 days! https://ref.wisprflow.ai/kenneth-liao


    Support me making more content and sharing free tools!

    https://buymeacoffee.com/kennyliao


    🛠️ Resources

    1. Full Newsletter article: https://theailaunchpad.substack.com/p/my-ship-daily-system-with-claude

    2. Linear MCP: https://linear.app/docs/mcp


    🕒 Sections\ 

    00:00 - Intro

    01:38 - Workflow Overview

    06:03 - Create Linear Issue Command

    09:15 - Create Linear Project Command

    12:50 - Resolve Linear Issue Command

    15:39 - Resolving Issue End-to-End Live


    ✉️ For Business Inquiries:\ 

    kennyliao@theailaunchpad.io


    #claudecode #linear #aiagents"
  channel: "Kenny Liao"
  channelId: "UCOEqiv0-yg_hx0nJiaWJK4Q"
  duration: "PT21M57S"
  publishedAt: "2026-02-09T23:05:41Z"
  thumbnailUrl: "https://i.ytimg.com/vi/jsI18Htgf8k/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=jsI18Htgf8k"
processedAt: "2026-03-10T15:24:45.755Z"
source: "youtube"
tldr: "By combining Claude Code with Linear and a structured slash command system, I automated my entire development workflow from issue planning to PR review, reducing my daily involvement from hours to minutes and dramatically increasing shipping velocity."
tools:
  - name: "Claude Code"
    url: null
  - name: "Linear"
    url: null
  - name: "GitHub"
    url: null
  - name: "MCP (Model Context Protocol)"
    url: null
  - name: "Sentry"
    url: null
  - name: "Stripe"
    url: null
  - name: "Substack"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "automation"
  - "claude"
  - "product-management"
  - "testing"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 12479
  outputTokens: 911
  totalTokens: 13390
  processingTimeMs: 30354
tagsNormalizedAt: "2026-03-10T16:42:24.082Z"
---

## Key Takeaways

This video demonstrates a system for automating software development using AI agents integrated with project management tools.

## Summary

Kenny Liao presents a fully automated development workflow that leverages Claude Code as an AI coding agent, integrated with Linear for project management and GitHub for version control. The system is designed to free up developer time by handling repetitive implementation tasks end-to-end.

The core philosophy is to **automate everything except planning**. Strategic and creative decisions that directly impact customer experience should remain human-led, as AI lacks the deep contextual understanding of the business, domain, and product vision. The AI excels at researching, automating processes, compressing information, and providing perspectives.

The workflow begins in **Linear**, where issues are the fundamental unit of work. Issues must be narrowly scoped and meticulously defined to be solvable within a single AI context window without requiring clarifying questions. Kenny uses custom slash commands in Claude to create well-defined Linear issues and projects based on templates that include goals, principles, workflows, and examples.

### The Automated Resolution Process

Once a well-defined Linear issue exists, the real automation begins. A slash command triggers Claude Code to resolve the issue end-to-end:
1.  It fetches issue details via **MCP (Model Context Protocol)**.
2.  Creates a new Git branch linked to the Linear issue.
3.  Spins up a **sub-agent** to create an implementation plan using **Test-Driven Development (TDD)**, writing tests first.
4.  Another sub-agent implements the plan, committing and pushing code.
5.  Opens a Pull Request on GitHub, which automatically updates the Linear issue status.
6.  Executes a PR review using another sub-agent to catch issues.
7.  If issues are found, a sub-agent addresses them, commits fixes, and summarizes changes.
8.  A final re-review validates all fixes before the PR is ready for a human to merge.

This process uses sub-agents extensively to preserve the main Claude context window, allowing it to run for 20-30 minutes on complex tasks without hitting token limits. A live demo showed the system resolving an issue to add message delivery status indicators to an app in 26 minutes, with the AI handling PR review feedback and subsequent fixes autonomously.

The result is a dramatic shift from constant interaction with the AI to a 'set-and-forget' model. Kenny spends 5-10 minutes planning a project, less than a minute per issue to trigger the slash command, and then only returns to review and merge the ready-to-ship PR.

## Context

This system addresses a critical pain point for solo developers and small teams: the overwhelming time cost of manual coding, review, and deployment cycles. As AI coding assistants become more capable, the bottleneck shifts from code generation to workflow integration and quality assurance. Kenny's approach provides a practical blueprint for leveraging AI not just as a coding copilot, but as an autonomous team member, enabling developers to focus on high-leverage problems like product strategy and user experience. This reflects the broader trend of AI moving from a tool to an integrated system within the software development lifecycle.