---
metadata:
  videoId: "uUN1oy2PRHo"
  title: "How to create JOBS for OpenClaw agents"
  description: "The number one question after my last OpenClaw video was: what are you actually having your agents do? Instead of just listing tasks, this video gives you a framework for hiring agents like real employees. I cover how to identify recurring needs that become real jobs, and the three systems you need so your agents can work without you in the middle of everything.


    I also walk through my own setup — the custom dashboard for scheduling and dispatching tasks, how I use Skills for consistent processes, and how I've reorganized my business around markdown files so my agents always have the context they need.


    👇 **Your Builder Briefing (free)**

    https://buildermethods.com - Your free, 5-minute read to keep up with the latest tools & workflows for building with AI.


    👇 **Join Builder Methods Pro**

    https://buildermethods.com/pro - The membership for professionals (and soon-to-be-pros) for building with AI.  Private discord.  Video training library.  Official support for Agent OS.


    👇 **Try my tools** (free open source):

    https://buildermethods.com/agent-os

    https://buildermethods.com/design-os


    ▶️ Related videos:

    My Multi-Agent Team with OpenClaw: https://youtu.be/bzWI3Dil9Ig

    Claude Code is all you need in 2026: https://youtu.be/0hdFJA-ho3c


    💬 Drop a comment with your questions and requests for upcoming videos!


    Chapters:


    00:00 What should agents do?

    01:53 Jobs for agents

    05:58 3 systems for agent teams

    10:04 Agent instructions (processes & skills)

    15:55 Your source of truth (the Brain)"
  channel: "Brian Casel"
  channelId: "UCSxPE9PHHxQUEt6ajGmQyMA"
  duration: "PT20M41S"
  publishedAt: "2026-02-25T13:01:46Z"
  thumbnailUrl: "https://i.ytimg.com/vi/uUN1oy2PRHo/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=uUN1oy2PRHo"
processedAt: "2026-02-26T23:59:01.241Z"
source: "youtube"
tldr: "Treat OpenClaw AI agents like real employees by creating structured jobs around recurring tasks, using custom systems for scheduling (BMHQ), process documentation (skills), and output management (Brainown) to scale operations without human hiring overhead."
tools:
  - name: "OpenClaw"
    url: null
  - name: "Claude"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Telegram"
    url: null
  - name: "Rails"
    url: null
  - name: "Dropbox"
    url: null
  - name: "GitHub"
    url: null
  - name: "BMHQ"
    url: null
  - name: "Brainown"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "openclaw"
  - "ai-agents"
  - "business-automation"
  - "claude"
  - "task-automation"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 15663
  outputTokens: 1014
  totalTokens: 16677
  processingTimeMs: 71211
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

The core message is to move from treating AI agents as personal assistants to building them structured jobs within your business. Key insights: • **Define jobs, not tasks**: Identify recurring business needs (daily/weekly/monthly) that can be systematized, not one-off requests. • **Build three core systems**: You need a scheduling system (like custom BMHQ app), process documentation via **skills** (markdown files), and an output management system (like Brainown for markdown files). • **Leverage unique agent advantages**: Hire for small, recurring tasks without justifying full-time salaries, enabling business scaling much earlier. • **Work on your business**: Use tools like Claude Code to continuously improve agent processes and build custom tooling that enables delegation.

## Summary

The video presents a framework for using OpenClaw AI agents not as reactive assistants, but as employees filling defined, recurring roles within a business. The key shift is from delegating ad-hoc tasks to creating **jobs**—identifying predictable, repeating work that forms a role.

**The core advantage of AI agents** is the dramatically lower threshold for creating a role. Unlike human hires requiring justification for full-time work, agents can be hired for just one or two recurring tasks paid in token costs (pennies to dollars), allowing businesses to scale operations and free up founder bandwidth much sooner.

To operationalize this, you need to build three systems:
• **A Scheduling & Dispatch System**: To manage what agents do and when without manual prompting. The creator built a custom Rails app called **BMHQ** (Builder Methods HQ) that acts as a mission control dashboard, managing recurring task templates, schedules (daily, weekly, monthly), and assigning them to specific agents via the OpenClaw gateway, with full execution logs.
• **A Process Documentation System (Skills)**: Where consistent workflows are defined. **Skills** are folders containing a markdown file (the 'operating manual'), plus optional reference files and scripts. These live in the file system (synced via Dropbox for access) and are referenced by tasks, allowing processes to be improved in one place without rewriting individual task instructions. The creator iterates on these using **Claude Code**.
• **An Output & Review System**: To handle where work artifacts go and how they're reviewed. The creator built a custom markdown editor/viewer app called **Brainown** that integrates with Dropbox, allowing agents to send links to generated markdown files directly into Telegram. This centralizes review and editing, organizing the business around markdown files as the primary artifact.

**The workflow** involves identifying two types of recurring tasks: 1) Things you currently do that you want off your plate, and 2) Missed opportunities that can now be addressed. For the creator, this centered on research and content production. He uses Claude as a thought partner to map out processes, which are then codified into skills.

The ultimate goal is to **work *on* your business** by building and refining these systems, using tools like Claude Code, rather than being stuck working *in* it. The value of OpenClaw lies in treating it as a team that fills real job functions, enabled by custom-built tooling.

## Context

This video is crucial for entrepreneurs, solopreneurs, and small business owners navigating the integration of AI agents into their operations. It addresses a common pitfall—using AI as a reactive assistant—and provides a scalable framework inspired by real team management principles. As AI agents become more capable, the ability to systematize and delegate recurring work is shifting from a luxury for large companies to an accessible leverage point for individuals and small teams, fundamentally changing how we think about hiring and business scaling.