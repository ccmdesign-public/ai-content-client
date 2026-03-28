---
metadata:
  videoId: "3e7gmNPr5Vo"
  title: "Anthropic Just Gave You 3 Tools That Work While You're Gone."
  description: "My site: https://natebjones.com

    Full Story w/ Prompts & Guide: https://natesnewsletter.substack.com/p/90-of-what-you-build-on-your-ai-agent?r=1z4sm5&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true

    ___________________

    What's really happening inside Anthropic's response to OpenClaw when they ship Dispatch and Computer Use in the same week?


    The common story is that these are just mobile chat features — but the reality is a complete orchestration layer that lets you spawn parallel agent sessions from your phone while your desktop executes work without you.


    In this video, I share the inside scoop on the three primitives that finally make always-on agents real:


    \ • Why scheduled tasks run on Anthropic's cloud without your laptop

    \ • How Dispatch turns your phone into a command surface for parallel agents

    \ • What Computer Use unlocks for apps that will never have MCP servers

    \ • Where the management mindset separates real work from demo theater


    Builders who keep expecting agents to create more work for them will miss the entire point — the only metric that matters is whether tasks get off your desk, not onto it.


    Chapters

    00:00 Anthropic finished shipping OpenClaw for Claude

    02:30 The distinction between work on and off your desk

    04:30 Primitive 1: Scheduled tasks in the cloud

    07:00 Use cases when you're not a developer

    09:30 Primitive 2: Dispatch as an orchestration layer

    12:00 Pavel's 48-hour dispatch experiment

    14:30 Parallel asynchronous work from your pocket

    16:30 Primitive 3: Computer Use for apps without MCP

    19:00 Old JIRA, bespoke ERP, antique SAP instances

    21:30 OpenClaw vs Anthropic: self-hosted vs managed

    24:00 The framework for getting work off your desk

    26:30 Compound signal detection with Open Brain

    28:00 Learning to trust agents when you walk away


    Subscribe for daily AI strategy and news.

    For deeper playbooks and analysis: https://natesnewsletter.substack.com/


    Listen to this video as a podcast.

    - Spotify: https://open.spotify.com/show/0gkFdjd1wptEKJKLu9LbZ4

    - Apple Podcasts: https://podcasts.apple.com/us/podcast/ai-news-strategy-daily-with-nate-b-jones/id1877109372"
  channel: "AI News & Strategy Daily | Nate B Jones"
  channelId: "UC0C-17n9iuUQPylguM1d-lQ"
  duration: "PT29M9S"
  publishedAt: "2026-03-28T15:28:38Z"
  thumbnailUrl: "https://i.ytimg.com/vi/3e7gmNPr5Vo/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=3e7gmNPr5Vo"
processedAt: "2026-03-28T16:49:57.795Z"
source: "youtube"
tldr: "Anthropic's new tools—Scheduled Tasks, Dispatch, and Computer Use—enable Claude to act as a managed AI agent that executes real work autonomously (like code syncing, research, data entry) while you're away, shifting users from doing work to managing it."
tools:
  - name: "Claude"
    url: null
  - name: "OpenClaw"
    url: null
  - name: "OpenBrain"
    url: null
  - name: "MCP (Model Context Protocol)"
    url: null
  - name: "Linear"
    url: null
  - name: "GitHub"
    url: null
  - name: "Slack"
    url: null
  - name: "Google Drive"
    url: null
  - name: "Dropbox"
    url: null
  - name: "Jira"
    url: null
  - name: "SAP"
    url: null
  - name: "WhatsApp"
    url: null
  - name: "AWS"
    url: null
  - name: "GitHub Actions"
    url: null
  - name: "Jenkins"
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
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 22359
  outputTokens: 1005
  totalTokens: 23364
  processingTimeMs: 32261
tagsNormalizedAt: "2026-03-28T18:07:10.047Z"
---

## Key Takeaways

Anthropic's latest tools transform Claude into a hands-off agent that completes work autonomously. • **Scheduled Tasks** runs recurring jobs in Anthropic's cloud (e.g., codebase syncing, price monitoring). • **Dispatch** lets you manage parallel Claude sessions from your phone, turning your desktop into an execution layer. • **Computer Use** enables Claude to interact with any desktop app via keyboard/mouse, bypassing API limitations. The core shift is moving from creating AI-generated drafts to delegating tasks that get work **off your desk** entirely.

## Summary

Anthropic has launched three integrated tools that collectively create a secure, managed agent system rivaling OpenClaw's capabilities without the self-hosting complexity.

**Scheduled Tasks** provides cloud-based job scheduling. It runs on Anthropic's infrastructure, independent of your local machine. Use cases include syncing codebases across languages, monitoring news or flight prices, and automating bill reminders. It connects to existing MCP servers (like Linear, GitHub, Slack) without reconfiguration.

**Dispatch** is a mobile orchestration layer. By pairing your phone with Claude Desktop via QR code, you can spawn and manage multiple parallel Claude co-work sessions on your desktop. Your phone becomes a command surface, allowing you to delegate complex tasks (like competitor research or coding) while away. Real-world testing showed 25 minutes of phone input could generate hours of parallel work.

**Computer Use** closes the gap for tools without APIs. It allows Claude, via Dispatch, to remotely control your desktop's keyboard and mouse to navigate legacy systems, bespoke ERPs, or any application. This solves the 'last mile' problem for automating tasks in apps that lack modern connectors.

The video emphasizes a critical mindset shift: **stop accepting 'pseudo-work'** (like AI-generated briefs that create more to read) and start delegating tasks that **get work off your desk**. Effective delegation targets 'open loops'—promises or commitments buzzing in your head—and uses these tools to close them autonomously. The quality of output is framed as a **skill and prompting issue**, not a tool limitation.

This managed approach contrasts with OpenClaw's self-hosted model. Anthropic abstracts away server management, security vetting, and network configuration, making powerful agentic workflows accessible to non-developers while maintaining safety through permissioned access.

## Context

This matters because it represents a major step toward practical, always-on AI agents for professionals. While AI demos often showcase flashy but low-value tasks, these tools enable Claude to execute meaningful, multi-step work autonomously. For knowledge workers, developers, and business leaders, this shifts the value proposition from AI as a drafting assistant to AI as a managed subordinate that reduces cognitive load and administrative tasks. It connects to the broader trend of AI moving from chat interfaces to persistent, actionable agents.