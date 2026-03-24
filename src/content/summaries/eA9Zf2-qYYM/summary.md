---
metadata:
  videoId: "eA9Zf2-qYYM"
  title: "Building AI Agents that actually work (Full Course)"
  description: "I sit down with Remy Gaskell to break down how anyone can build AI agents to run entire departments of their business. Remy walks through the core concepts: agent loops, context files, memory, MCP tool connections, and skills. We put everything together by building a fully functional executive assistant live on screen. This is a beginner-friendly crash course that covers Claude Code, Codex, Cowork, Antigravity, Manus, and OpenClaw, showing that once you understand how to \"drive,\" you can jump into any agent platform. By the end, listeners know exactly how to set up markdown-based context files, connect their everyday tools, and create reusable skills that compound over weeks and months.


    Timestamps

    00:00 – Intro

    01:35 – Agents vs Chat

    03:22 – The Agent Loop

    05:46 – How Agents work

    06:39 – Demoing Agents (Claude Code, Codex, Antigravity)

    08:52 – Security and Agent Permissions

    10:43 – Comparing Results Across Three Platforms

    13:57 – Startup Idea: Cold Email Website Offer

    14:50 – Folder Structure and Department-Based Agents

    15:52 – Onboarding an Agent Like a Real Employee

    17:05 – Voice-to-Text With Monologue and WhisperFlow

    18:04 – Chat Memory vs. Agent Memory

    19:34 – Building the agents md

    22:20 – Context Engineering Over Prompt Engineering

    24:29 – How Memory Compounds and Reduces Errors

    30:27 – How Big Can memory md Get?

    31:43 – Connecting Tools via MCP (Model Context Protocol)

    34:49 – Working in Claude Code for High-Value Tasks

    37:09 – Why the Real Value Is in Stacking, Not Summarizing

    40:04 – What Are Skills? (SOPs for AI)

    43:08 – Creating Skills

    48:36 – Real-World Example: Ads Analyst Skill: 4-Hour Process in Minutes

    50:37 – Chaining Skills together

    52:01 – Real-World Example: Automated Car Search

    53:34 – OpenClaw and Migrating Agents to More Autonomous Platforms

    55:19 – Which Platform Should Beginners Start With?

    56:28 – Global vs. Project-Level Skills, Context, and MCPs


    Key Points


    * Agent platforms (Claude Code, Codex, Cowork, Antigravity, Manus, OpenClaw) are all running the same observe-think-act loop under the hood — learning one means you can use any of them.

    * The shift from chat to agents requires moving from prompt engineering to context engineering: load the agent with rich context so simple prompts produce excellent results.

    * A memory md file creates a self-improving loop where the agent learns preferences across sessions and makes fewer errors over time.

    * MCP (Model Context Protocol), built by Anthropic, acts as a universal translator between your agent and every tool it needs — Gmail, Calendar, Stripe, Notion, and more.

    * Skills are reusable SOPs packaged as markdown files; once you explain a process once, you can invoke it repeatedly, and they compound as you add three to five per week.

    * Scheduled tasks turn skills into automated workflows — morning briefs, car searches, ad library analyses — that run on a cron without any manual trigger.


    Numbered Section Summaries


    1. The Agent Loop in Action


    Remy kicks off with a live demo, sending the same prompt — \"build a minimalist portfolio site for Greg Isenberg\" — to Claude Code, Codex, and Antigravity simultaneously. All three platforms run the same observe-think-act loop: research the subject, write the code, spin up a preview, and verify the result with a screenshot. The demo makes it tangible that every agent harness is just a different car with the same engine.


    2. Onboarding Your Agent Like a Real Employee


    Remy shows that without context, an agent asked to \"write me a cold email\" has no idea who you are or what you sell. The fix is an agents.md (or Claude.md) file — a persistent context document loaded at the start of every session. You fill it with your role, business details, tools, and working preferences, and the result is that a two-word prompt produces a fully informed output.


    3. Memory That Compounds


    Chat models store memory invisibly in the cloud; agents require you to build it intentionally. Remy adds a memory.md file and a simple instruction in the context file: \"When I correct you or you learn something new, update memory.md.\" Preferences like tone, email sign-offs, and design choices persist across sessions, and errors decrease over time.



    The #1 tool to find startup ideas/trends - https://www.ideabrowser.com/


    LCA helps Fortune 500s and fast-growing startups build their future - from Warner Music to Fortnite to Dropbox. We turn 'what if' into reality with AI, apps, and next-gen products https://latecheckout.agency/


    The Vibe Marketer - Resources for people into vibe marketing/marketing with AI: https://www.thevibemarketer.com/


    FIND ME ON SOCIAL

    X/Twitter: https://twitter.com/gregisenberg

    Instagram: https://instagram.com/gregisenberg/

    LinkedIn: https://www.linkedin.com/in/gisenberg/


    FIND REMY ON SOCIAL

    X:https://x.com/remy_gaskell

    Youtube: https://www.youtube.com/@aiwithremy

    Instagram: https://www.instagram.com/aiwithremy/"
  channel: "Greg Isenberg"
  channelId: "UCPjNBjflYl0-HQtUvOx0Ibw"
  duration: "PT58M56S"
  publishedAt: "2026-03-17T19:25:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/eA9Zf2-qYYM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=eA9Zf2-qYYM"
processedAt: "2026-03-24T01:10:05.772Z"
source: "youtube"
tldr: "This full course explains how to build effective AI agents by demystifying core concepts like the agent loop, MCPs for tool integration, and context engineering, then provides a practical framework for creating an 'executive assistant' agent that can automate business workflows using local markdown files."
tools:
  - name: "Claude Code"
    url: null
  - name: "Cursor"
    url: null
  - name: "OpenClaw"
    url: null
  - name: "Manis"
    url: null
  - name: "Anti-gravity"
    url: null
  - name: "Co-work"
    url: null
  - name: "Perplexity"
    url: null
  - name: "Monologue"
    url: null
  - name: "Whisper Flow"
    url: null
  - name: "Obsidian"
    url: null
  - name: "Visual Studio Code"
    url: null
  - name: "Gmail"
    url: null
  - name: "Google Calendar"
    url: null
  - name: "Notion"
    url: null
  - name: "Stripe"
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
  inputTokens: 39395
  outputTokens: 2051
  totalTokens: 41446
  processingTimeMs: 543383
tagsNormalizedAt: "2026-03-24T04:09:33.159Z"
---

## Key Takeaways

This beginner-friendly course breaks down AI agent architecture and provides a practical framework for automating business workflows. The instructor, Remy, explains how to move from basic chat models to goal-oriented agents that can manage entire departments.

*   **Chat vs. Agent:** A **chat model** is question-to-answer, while an **AI agent** is goal-to-result, autonomously planning and executing tasks through an iterative loop (observe, think, act) until completion.

*   **Core Components:** An agent consists of an LLM (the brain), a persistent **agent loop**, connected **tools** (via MCPs), and loaded **context**. An **agent harness** (like Claude Code or Cursor) is the platform that facilitates this loop.

*   **Context & Memory Engineering:** Success depends on **context engineering**, not prompt engineering. Create `agents.md` or `claude.md` files to onboard your agent with business context, and implement a **self-improving memory system** (e.g., `memory.md`) so the agent learns and remembers preferences across sessions.

*   **Tool Integration & Skills:** Connect tools (Gmail, Calendar, Notion) via **Model Context Protocol (MCP)**. Automate repetitive processes by turning them into **skills**—markdown files that are SOPs for AI—which can be chained together and scheduled to create powerful, autonomous workflows.

## Summary

### Introduction: The Shift from Chat to Agents

Greg Isenberg introduces the episode by framing the current AI landscape as moving from 'stage one' (chat) to 'stage two' (agents). He notes that founders and employees using agents are becoming 10-20 times more productive, creating a significant competitive advantage. The guest, Remy, is brought on to explain the often-confusing terminology (skills, MCPs, agent harnesses) in simple terms and provide a free course on mastering AI agents.

Remy outlines the goal: by the end of the video, viewers will know how to build agents to run complete departments of their life and company within any agent platform. He emphasizes that the core concepts are transferable across different 'harnesses' like Claude Code, Cursor, OpenClaw, and Manis.

### Defining the AI Agent and Its Core Loop

The foundational distinction is between a chat model and an agent. A **chat model** is question-to-answer, akin to ping-pong, requiring constant user interaction. An **AI agent** is goal-to-result. You give it a task, and it autonomously plans, executes, and delivers a finished result.

Inside every agent is the **agent loop**: a continuous cycle of **observe, think, and act**. Remy illustrates this with a live demo across three platforms (Claude Code, Cursor, and Anti-gravity), giving each the same task: 'build me a minimalist portfolio site for Greg Eisenberg.' The agent first observes the prompt, thinks it needs to research who Greg is, acts by using a connected tool (Perplexity), feeds that back, thinks about the next step (creating a plan), acts by writing the plan, and continues looping through writing code, hosting the site, and verifying completion until the task is done.

### Building Your First Agent: The Executive Assistant

The course then shifts to a hands-on tutorial on building an 'executive assistant' agent. The philosophy is to onboard the AI like a real employee, providing it with necessary context about your business, tools, and preferences.

**Context Engineering with Markdown Files:** The first step is creating a context file, typically named `agents.md`, `claude.md`, or `gemini.md` depending on the harness. This file acts as a permanent system prompt, loaded at the start of every session. It should contain the agent's role, information about you and your business, working preferences, and tools used. Without this, an agent has no memory or context, as demonstrated when a blank agent couldn't write a simple cold email.

**Implementing a Self-Improving Memory System:** A key shift from chat models is that agents don't have automatic cloud memory. To solve this, Remy demonstrates creating a `memory.md` file and adding instructions to the main context file telling the agent to 'read from memory.md' and 'update memory.md when you learn something new.' This creates a compounding learning system where the agent saves preferences (e.g., 'never sign off emails with Cheers') and becomes more effective over time without manual file updates.

### Connecting Tools and Automating Workflows

**Tool Integration via MCP:** To move from a knowledgeable assistant to an actionable one, you must connect your tools (Gmail, Calendar, Notion, Stripe). This is done via **Model Context Protocol (MCP)**, described as a universal translator that allows the LLM to communicate with any tool's unique 'language.' Platforms like Co-work, Claude Code, and Cursor have built-in browsers for easily connecting hundreds of common apps via MCP.

**Demonstrating Connected Workflows:** Remy shows a powerful example within Claude Code. With tools connected, he gives a compound task: 'Review my meeting notes with [client] from today, draft an email sending the proposal, create a Stripe payment link, and set up the project in Notion.' The agent autonomously loops through each step: fetching notes from Granola, creating the payment link in Stripe, drafting the email in Gmail, and setting up the project in Notion, demonstrating a multi-tool workflow executed from a single prompt.

### The Power of Skills: Automating Repeatable Processes

The ultimate compounding factor is building **skills**. A skill is a markdown file that packages a specific, repeatable process—an SOP for AI. There are two primary ways to create them: 1) Use a 'skill creator skill' on existing documentation (e.g., 'take this course on viral hooks and create a skill'), or 2) Go through a process manually once with the agent and then command it to 'create a skill for what we just did.'

Remy shows examples from his own workspace, like a 'Meta Ads Analysis' skill that, when given an ads library URL, will scrape ads, analyze creatives and copy, and produce a full report—a task that previously took hours. He also creates a simple 'Refer to Sebastian' skill live during the tutorial. Skills can be project-specific or global, and can be chained together or scheduled (e.g., a 'morning brief' skill that runs at 9 AM daily).

### Choosing a Platform and Future Outlook

Remy advises beginners to start with more user-friendly harnesses like **Co-work**, **Claude Code**, or **Cursor** to learn the concepts. More advanced, autonomous platforms like **OpenClaw** are powerful but have a steeper learning curve; he recommends building and refining your agent stack in a simpler harness first before migrating.

The future vision, or 'AIOS' (AI Operating System), involves having a central workspace (like Claude Code) connected to all your tools, with specialized agent folders for each department (executive assistant, head of marketing, CFO). By consistently adding context, tools, and skills, you build a compounding system that automates your business and life, leading to the '100x employee' paradigm where professionals manage vast outputs through their AI agents.

## Context

This video is a full-length course hosted by Greg Isenberg, a prominent entrepreneur and content creator focused on business and technology trends. The guest instructor is Remy, who specializes in practical AI agent implementation for business automation. The episode was created in response to the confusing proliferation of AI terminology (agents, MCPs, harnesses) and the significant productivity gap forming between those using basic chat interfaces and those leveraging autonomous agents. It contributes to the broader conversation about practical AI adoption beyond hype, focusing on implementable systems for founders, entrepreneurs, and knowledge workers. This is highly relevant as AI capabilities shift from conversational chatbots to goal-oriented assistants capable of executing complex workflows. Anyone looking to automate repetitive tasks, manage business departments more efficiently, or future-proof their workflow with AI will benefit from this comprehensive tutorial.