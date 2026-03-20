---
metadata:
  videoId: "japT66frdhM"
  title: "I Built 6 Things on One Database. Now My AI Runs My House, My Schedule, & My Professional Network."
  description: "My site: https://natebjones.com

    Full Story w/ Prompts: https://natesnewsletter.substack.com/p/you-built-an-ai-memory-system-now?r=1z4sm5&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true

    ___________________

    What's really happening when thousands of people build an agent-readable database but can only interact with it through a chat window keyhole? The common story is that the MCP server is the whole system—but the reality is more interesting when you add a human door alongside the agent door.


    In this video, I share the inside scoop on how to give your Open Brain hands and feet through visual interfaces you build and deploy for free:


    \ • Why the table becomes a shared surface that both you and your agent see

    \ • How to build a visual layer with Claude and host it on Vercel for nothing

    \ • What household knowledge, professional relationships, and job hunts look like as dashboards

    \ • Where time bridging and cross-category reasoning earn their keep


    Chapters

    00:00 Your Open Brain Can Think—Now It Needs Hands

    02:30 Both Doors Open: Agent Access and Human Access

    05:00 The Table Is the Shared Surface

    07:30 How to Build the Visual Layer

    10:00 Hosting for Free with Vercel

    12:00 Use Case: Household Knowledge Base

    14:30 Use Case: Professional Relationships

    17:00 Use Case: The Job Hunt Dashboard

    20:00 Why Agent-Readable Data Is the Architectural Advantage

    22:30 Principles: Time Bridging and Cross-Category Reasoning

    25:00 No Middlemen: You Control Your Data


    For anyone who built Open Brain and wondered what's next, this is the piece that makes the data actually useful to your human eyes—without adding middlemen.


    Subscribe for daily AI strategy and news.

    For deeper playbooks and analysis: https://natesnewsletter.substack.com/


    Listen to this video as a podcast.

    - Spotify: https://open.spotify.com/show/0gkFdjd1wptEKJKLu9LbZ4

    - Apple Podcasts: https://podcasts.apple.com/us/podcast/ai-news-strategy-daily-with-nate-b-jones/id1877109372"
  channel: "AI News & Strategy Daily | Nate B Jones"
  channelId: "UC0C-17n9iuUQPylguM1d-lQ"
  duration: "PT26M55S"
  publishedAt: "2026-03-13T14:01:14Z"
  thumbnailUrl: "https://i.ytimg.com/vi/japT66frdhM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=japT66frdhM"
processedAt: "2026-03-13T17:04:31.580Z"
source: "youtube"
tldr: "By extending the OpenBrain personal database with a 'human door'—a simple visual interface built with AI and hosted on Vercel—you can create agent-readable AND human-usable systems for household knowledge, professional networks, and job hunts that leverage AI for time-bridging and cross-category reasoning without vendor lock-in."
tools:
  - name: "OpenBrain"
    url: null
  - name: "MCP (Model Context Protocol)"
    url: null
  - name: "Supabase"
    url: null
  - name: "Claude"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "OpenClaw"
    url: null
  - name: "Vercel"
    url: null
  - name: "Lovable"
    url: null
  - name: "Substack"
    url: null
  - name: "LinkedIn"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "mcp"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 20513
  outputTokens: 1313
  totalTokens: 21826
  processingTimeMs: 88366
tagsNormalizedAt: "2026-03-13T17:52:01.244Z"
---

## Key Takeaways

The video demonstrates how to build on the OpenBrain personal database system to create powerful, proactive AI tools for everyday life. Key insights include:

- **Build a 'Human Door'**: Add a simple visual interface (web page) on top of your OpenBrain database tables so both you and your AI agent can read/write to the same single source of truth.

- **Enable AI Time-Bridging & Cross-Category Reasoning**: Use your AI to connect events over months/years and find insights across different data tables (e.g., linking a job posting to an old conference contact).

- **Follow the 'Agent Surfaces, Human Decides' Loop**: Let the AI handle memory, pattern recognition, and surfacing insights, while you retain judgment and decision-making for a trustworthy system.

- **Future-Proof with MCP**: The Model Context Protocol (MCP) server makes your data accessible to any AI client (Claude, ChatGPT, OpenClaw), ensuring your system gets smarter with each new model release.

## Summary

The video builds on the concept of **OpenBrain**—a personal, owned database connected to AI via an **MCP server**—by answering the question: what do you build once you have this memory system? The core answer is to add a **'human door'**: a lightweight visual interface that allows both humans and AI agents to interact with the same database tables.

### The Architectural Pattern

Start with a structured table in your **Supabase** database (the same instance used for OpenBrain). This table is the **single source of truth**. Your AI agent accesses it through the existing MCP server connection, reading and writing data during conversations. You then build a simple web application—a 'view'—that connects directly to this same table. This creates two synchronized interfaces: one for the agent (MCP) and one for you (the visual app), with no sync layer or middleware in between.

### Practical Implementation

To build the visual layer, you describe your desired interface to an AI (Claude or ChatGPT). For example, "I want a mobile-friendly view of my home maintenance table that highlights items expiring in the next 30 days." The AI generates the web application code. You then host this application for free on **Vercel**, which provides a live URL you can bookmark on your phone. Changes made by your agent appear instantly in the web view, and edits you make are immediately available to your agent.

### Use Case Examples

1.  **Household Knowledge Base**: Capture scattered information like paint colors, appliance warranties, and Wi-Fi passwords in conversation with your AI. The visual interface can be a searchable, categorized dashboard.
2.  **Professional Network Manager**: Log interactions with contacts. Your AI can scan for relationships you've been neglecting and surface them, while a visual dashboard might show 'connection warmth' with indicators for which contacts need attention.
3.  **Job Search Dashboard**: Track companies, applications, interviews, and contacts. Your AI can perform cross-category reasoning, like linking a job posting to a contact you met months ago, enabling warm introductions. A visual dashboard provides an overview of your entire pipeline and interview patterns.

### Guiding Principles

The presenter outlines principles for identifying problems suited to this approach:

- **Agent Bridges Time**: Value comes from linking events spread across months/years (e.g., maintenance schedules, professional follow-ups).

- **Agent Sees Across Categories**: Power emerges from connections between tables humans don't cross-reference (e.g., linking dishwasher maintenance to meal planning).

- **Agent Surfaces, Human Decides, Agent Executes**: This division of labor keeps the system trustworthy and leverages human judgment.

The system is designed to be **future-proof**. As AI models improve and new autonomous agents (like future ChatGPT agents) emerge, they can plug into your MCP server, making your entire system automatically more valuable.

## Context

This video addresses a critical gap in the rapidly growing AI agent ecosystem: memory and proactive utility. While millions of autonomous agents (like those built on OpenClaw) exist, they typically lack persistent memory and a way to interact meaningfully with a user's personal data. The OpenBrain system, introduced in a prior video, solved the memory problem with a personal database. This follow-up tackles the next challenge: moving from a passive memory store to creating active, 'hands-on' tools that give users a proactive AI edge in daily life and work. It's for anyone who wants to leverage AI beyond simple chat, to manage complex, scattered life data (household, career, projects) in a system they own and control.