---
metadata:
  videoId: "Q_9TlecCFUA"
  title: "Claude Can Finally Chain Multiple MCPs + Skills Without Killing the Context"
  description: "In this video, I show how I now chain multiple MCP servers and Claude Skills together without worrying about MCP context bloat.


    The point isn't the specific workflow. It's the pattern: a master skill that orchestrates other skills, which call MCP servers, all running in one context window.\ 


    You can replicate this for your own repeatable tasks.


    The specific workflow I demo completes my entire consulting client intake in a single chat.


    This workflow used to take me at least an hour per client—now it's done in minutes.


    This is now possible because of lazy loading (tool search + progressive disclosure).\ 


    Before this, loading multiple MCP servers would blow out the context window before you even started. That's no longer the case.


    I walk through the building blocks—remote MCP servers (Gmail, Fireflies, Cal.com, n8n, Notion, Stripe) and custom skills (LOE generator, Stripe payment links, post-call follow-up)—and then demo the full workflow with checkpoints along the way.




    ⏱️ TIMESTAMPS

    0:00 – What This Video Covers

    1:00 – The Use Case: Consulting Client Intake

    2:00 – Building Blocks: MCP Servers

    3:00 – Building Blocks: Skills

    4:00 – Full Workflow Demo

    5:00 – Checkpoints & Confirmations

    6:00 – Results: LOE, Stripe Link, Email Draft

    6:30 – The Pattern: Skills → Skills → MCP

    7:00 – Final Thoughts


    🔗 RESOURCES

    Book a call with me → https://yedatechs.com/#container06

    Sponsorship inquiries → hi@yedatechs.com


    #ClaudeSkills #MCP #MCPServers #ClaudeDesktop #ClaudeCode #AIAutomation #Consulting #ProductivityWorkflow"
  channel: "JeredBlu"
  channelId: "UCaIm6rTg-RXb6rB19fYJgTg"
  duration: "PT7M40S"
  publishedAt: "2026-01-20T03:14:54Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Q_9TlecCFUA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Q_9TlecCFUA"
processedAt: "2026-01-20T17:04:32.915Z"
source: "youtube"
tldr: "Claude can now chain multiple MCPs & skills in one chat using lazy loading & progressive disclosure, eliminating context bloat and enabling custom productivity workflows like a post-consulting automation that saves 1+ hour per client."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2733
  outputTokens: 690
  totalTokens: 3423
  processingTimeMs: 11394
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tools:
  - name: "Gmail"
    url: null
  - name: "Fireflies"
    url: null
  - name: "Cal.com"
    url: null
  - name: "n8n"
    url: null
  - name: "Notion"
    url: null
  - name: "Stripe"
    url: null
  - name: "Claude Desktop"
    url: null
  - name: "Claude Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - claude
  - agents
  - automation
  - workflow
  - scripting
---

## Key Takeaways

This video demonstrates how Claude's new lazy loading capability enables complex multi-step workflows without context bloat. Key insights:

- **Build custom MCPs & skills** for your specific repetitive tasks instead of downloading generic ones

- **Lazy loading & progressive disclosure** prevent MCP tool definitions from bloating context upfront

- **Master orchestration skills** can call atomic task skills & MCP servers in a single workflow

- **Remote MCP servers** enable workflows from anywhere (phone, cloud) without local setup

## Summary

The video showcases a real-world productivity breakthrough: Claude can now chain together multiple **MCP servers** and **skills** within a single chat session without exhausting the context window. This was previously impossible because loading multiple MCPs would bloat the context with tool definitions before conversation even began.

### The Productivity Workflow

The creator demonstrates a **consulting call follow-up system** that automates what used to take an hour per client:

- Consolidates notes from Fireflies (Zoom transcription) and Gmail

- Generates customized letters of engagement

- Creates Stripe payment links with permission safeguards

- Schedules follow-up calls via Cal.com

- Drafts personalized emails based on writing style

The system uses **checkpoints** throughout the workflow where Claude confirms details and shows previews, ensuring accuracy before proceeding to sensitive steps like payment processing.

### Technical Architecture

The formula consists of four components:
1. **Master orchestration skill** (post-call follow-up V2)
2. **Atomic task skills** (LOE generator, Stripe payment, Cal.com scheduling)
3. **Remote MCP servers** (Gmail, Fireflies, Notion, Stripe, Cal.com)
4. **MCP support skills** that interface with specific servers

All these components work together through **tool search** and **progressive disclosure** - Claude only loads what it needs when it needs it, rather than everything upfront.

### Customization & Accessibility

The creator emphasizes that building custom MCPs and skills is surprisingly accessible. Rather than downloading generic solutions, users can:

- Reverse-engineer their repetitive tasks

- Break them into discrete steps

- Grant Claude access to necessary tools

- Create checkpoints for quality control

This pattern works across platforms (Claude Desktop, Claude Code) and can be adapted to development workflows, customer support, content creation, or any repeatable process.

## Context

This video matters because it represents a paradigm shift in how AI assistants handle complex workflows. Previously, users had to switch between multiple tools and contexts, losing progress and efficiency. With Claude's lazy loading of MCP servers (added in Claude Desktop/Code), users can now create integrated automation systems that handle multi-step processes end-to-end. This is particularly valuable for professionals, consultants, developers, and anyone with repetitive administrative tasks. It connects to broader trends of AI workflow automation moving from simple prompts to sophisticated orchestration of external tools and services.