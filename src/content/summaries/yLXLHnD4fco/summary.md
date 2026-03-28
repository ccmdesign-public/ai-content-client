---
metadata:
  videoId: "yLXLHnD4fco"
  title: "Claude Code: Build Your Full AI Marketing Team (Agents + Claude Skills)"
  description: "Download the “The AI Toolkit I Use Every Week” here: https://clickhubspot.com/33a603


    Most marketers are still running every task manually, one prompt at a time. But what if you could have your own AI marketing team to help you? This video builds a full AI marketing team inside Claude Code with 5 specialized agents and 12 skills that research, write, design, and analyze together.


    You'll see the entire system built from scratch step by step, from creating your first branded skill to watching multiple agents collaborate on a full campaign launch, with real outputs at every step. Even more, your AI team even picks up tasks from a shared Notion task board and takes instructions from your phone using remote control. Let’s go!


    📌 *TIMESTAMPS*

    00:00 What we’re covering today

    00:24 Design Your AI Marketing Team

    01:03 Popular Ways to use Claude Code

    01:28 Install Claude Code (VS Code)

    01:46 Project Folder Setup

    03:40 Build Skill 1: Branded Deck Skill\ 

    06:15 Build Skill 2: Social Creative Designer

    08:03 Marketing Skills Library + Why moving beyond Skills?

    08:32 Build Agent 1: Data Analyst

    10:23 Build Agent 2: Content Creator

    11:42 Agent Routing with CLAUDE.md

    12:08 Team Orchestration

    13:53 Notion Task Board for Team Collaboration

    15:17 Remote Control Team\ 


    ⚡️ *JOIN MY GROWTH COMMUNITY*

    https://community.graceleung.com/


    📥 *JOIN MY FREE DIGITAL GROWTH NEWSLETTER*

    https://www.graceleung.com/newsletter/


    🚀 *CONNECT WITH ME*

    https://www.graceleung.com/connect/


    📂 *RESOURCES MENTIONED IN THE VIDEO*

    Nano banana mcp

    https://github.com/zhongweili/nanobanana-mcp-server


    👉 *WATCH THESE NEXT*\ 

    🎥 Claude Skills for AI Marketing Team

    https://youtu.be/X8afcX2s2Mo


    🎥 PLAYLIST: Claude AI for Marketing

    https://www.youtube.com/playlist?list=PLgvqWBt14woI1AOp39uYqBQROEdjN0KD3


    🎥 PLAYLIST: AI for MARKETERS

    https://www.youtube.com/playlist?list=PLgvqWBt14woI0bW-qwMn5ZdHtvRHhENcA\ 


    If you like this video, subscribe for more videos like this! https://youtube.com/@graceleungyl?si=J_vzXh3ooLlusD9G


    👋 *WHO AM I*

    I’m Grace, a Digital Growth Consultant & Educator who is fascinated by anything digital and growth related. I share everything about digital growth, AI for marketing, and personal growth!\ 



    ☕️ *Connect with me on Social*

    LinkedIn: https://www.linkedin.com/in/grace-leung-yl/\ 

    Instagram: https://www.instagram.com/graceleungyl\ 

    Twitter/X: https://twitter.com/graceleungyl"
  channel: "Grace Leung"
  channelId: "UCrB7UFnkosBjAhOg3a9NdWw"
  duration: "PT17M35S"
  publishedAt: "2026-03-28T12:01:16Z"
  thumbnailUrl: "https://i.ytimg.com/vi/yLXLHnD4fco/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=yLXLHnD4fco"
processedAt: "2026-03-28T17:29:43.076Z"
source: "youtube"
tldr: "This video demonstrates how to build a full AI marketing team inside Claude Code by creating specialized agents and skills: map your marketing functions, turn repeatable tasks into skills, group skills into non-overlapping agent roles, and connect them as a collaborative system."
tools:
  - name: "Claude Code"
    url: null
  - name: "VS Code"
    url: null
  - name: "Cursor"
    url: null
  - name: "GitHub"
    url: null
  - name: "Notion"
    url: null
  - name: "HubSpot"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Gemini"
    url: null
  - name: "Perplexity"
    url: null
  - name: "Nolibox Canvas"
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
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4896
  outputTokens: 1216
  totalTokens: 6112
  processingTimeMs: 36414
tagsNormalizedAt: "2026-03-28T18:07:08.300Z"
---

## Key Takeaways

Learn how to construct an autonomous AI marketing team within Claude Code using a structured four-step framework.

- **Map, Skill, Agent, Connect**: The core workflow involves mapping marketing functions, converting repeatable tasks into **Claude Skills**, grouping skills into specialized **Agents**, and connecting them as a team with clear routing rules in `CLAUDE.md`.

- **Reference-Based Skill Creation**: Build high-quality, on-brand skills by providing Claude with examples and templates (e.g., a presentation deck), having it analyze them, and then extending official skills to create new, branded ones.

- **External Tool Integration via MCP**: Connect Claude to external tools like image generation models by setting up **MCP (Model Context Protocol)** servers, enabling skills to perform tasks like creating social media creatives.

- **Orchestration & Real-World Workflow**: Deploy the AI team on complex campaigns and integrate it with real-world tools like **Notion** for a shared task board and the **Claude mobile app** for remote task management.

## Summary

The video provides a comprehensive, step-by-step guide to constructing a multi-agent AI marketing system within Claude Code, using a fictional travel brand 'Go Travel' as a case study.

The process begins with a four-step framework: 1) Map your marketing functions, 2) Turn each repeatable workflow into a **Claude Skill**, 3) Group similar skills into focused, non-overlapping **Agents**, and 4) Connect agents and skills as a team with defined routing rules in the project's `CLAUDE.md` file. This structure prevents Claude from becoming unfocused by having one conversation handle too many disparate tasks.

### Building Skills with References

The tutorial shows two primary methods for creating skills. The first is a **reference-based method**. For example, to create a 'Branded Deck' skill, you provide Claude with an existing PowerPoint template. Claude analyzes it to understand patterns, then extends an official PowerPoint creation skill to generate a new, branded skill that outputs decks matching the provided template.

The second method involves **connecting to external tools via MCP**. To build a 'Social Creative Design' skill, you first set up a visual style library for reference. Then, you configure an MCP server (like one for the Nolibox Canvas model) in a `.mcp.json` file. This allows the new skill to call the external image generation API, creating social media graphics that follow the brand's visual 'vibe'.

### Creating Specialized Agents

With a library of skills built (12 in the example), you create dedicated **Agents**—specialized team members with specific roles. Using the `/agents` command in the Claude Code terminal, you can generate agents like a 'Data Analyst' (thinking in charts and numbers) or a 'Content Creator' (thinking in stories). Each agent is defined in its own markdown file and equipped with a relevant subset of skills.

Critical to system reliability is updating the main `CLAUDE.md` file with **agent routing rules**. This instructs Claude on when to delegate a complex task to a specialist agent versus when to use a skill directly, ensuring optimal performance.

### Deployment & Integration

The built team is demonstrated working autonomously on a complex campaign (e.g., a 'Japan Cherry Blossom' launch), producing coordinated research, briefs, creatives, and a landing page. The system is then integrated into real-world workflows:

- A **Notion Kanban board** serves as a shared task list. Claude can scan it, pick up pending tasks, execute them using the appropriate agents, and update the task status.

- The **Claude mobile app** can connect to the local Claude Code session via a 'remote control' link, allowing users to send tasks to their AI team from anywhere.

This approach transforms Claude from a general-purpose assistant into a scalable, specialized, and collaborative marketing department that operates 24/7.

## Context

This video addresses the growing need for marketers and business owners to leverage AI beyond simple chat interactions, moving towards building structured, automated systems. As AI models like Claude become more capable, the challenge shifts from getting a single good output to orchestrating reliable, multi-step workflows that produce cohesive, on-brand results. This is crucial for solopreneurs, small marketing teams, or agencies looking to scale content creation, data analysis, and campaign execution without linearly increasing human labor. It connects to the broader trend of **AI agents** and **AI-powered workflows** becoming central tools in business operations.