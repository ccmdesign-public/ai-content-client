---
metadata:
  videoId: "fd4k16REDOU"
  title: "I fixed OpenClaw so it actually works (full setup)"
  description: "I sit down with Moritz Kremb, an OpenClaw power user and agency builder based in Berlin, to break down how to actually make OpenClaw useful. Moritz walks through a 10-step optimization guide covering everything from troubleshooting and memory management to model selection and security basics. He then demos two real systems he built with OpenClaw: a full short-form video content pipeline and a conversational CRM. This episode is for anyone who tried OpenClaw, hit a wall, and wants a clear path to turning it into a superhuman digital employee.


    Timestamps

    00:00 – Intro and episode promise

    02:17 – What is OpenClaw

    03:17 – OpenClaw vs. ChatGPT vs. Claude Code

    07:43 – Where Claude Cowork and Dispatch fit in

    09:47 – Why choose OpenClaw over Cowork

    11:03 – Step 1: Setting up OpenClaw

    14:46 – Step 2: Personalize your workspace files

    18:04 – Step 3: Fix and optimize memory

    22:43 – Step 4: Choose the right model (OAuth method)

    25:56 – Anthropic ban and model provider gray areas

    27:33 – Step 5: Organize Telegram groups and topics

    30:19 – Step 6: Understand the three browser modes

    35:18 – Step 7: Skills — built-in, marketplace, and custom

    39:03 – Step 8: Optimize the heartbeat file

    42:00 – Step 9: Security basics and prompt injection

    48:08 – Step 10: Least access principle and agent-owned accounts

    49:52 – Use case 1: No AI Slop content system

    58:37 – Use case 2: Conversational CRM

    01:01:15 – Final thoughts on the future of personal agents

    01:02:55 – Jensen Huang's take: OpenClaw as the new computer


    Key Points


    * Upload the OpenClaw documentation into a Claude project to create a dedicated troubleshooting baseline — it solves roughly 99% of setup issues.

    * Use the OAuth method (your existing $20 ChatGPT or Anthropic subscription) to avoid expensive API costs, and always configure backup models.

    * Memory problems are almost always caused by memory never being saved in the first place; add an auto-save instruction to the heartbeat file so it logs every 30 minutes.

    * Organize your OpenClaw conversations into separate Telegram groups and topics with group-specific system prompts to avoid context bleed.

    * Stronger models are meaningfully more resistant to prompt injection; pair that with least-access principles and agent-owned accounts for a solid security posture.

    * Custom skills are the path to real automation — whenever you do something repeatedly, tell your OpenClaw to turn it into a skill.


    Numbered Section Summaries


    1. OpenClaw Explained: What It Is and How It Differs


    Moritz breaks down OpenClaw as the first truly personal, autonomous agent — one that remembers, runs on a heartbeat every 30 minutes, executes cron jobs, and lives inside whatever chat app you already use. He maps the evolution from ChatGPT (cloud chat) to Claude Code (local files) to OpenClaw (persistent, proactive, and portable).


    2. OpenClaw vs. Claude Cowork and Dispatch


    Anthropic's new Dispatch feature and Claude Cowork are moving toward what OpenClaw already does, but OpenClaw remains more powerful and feature-rich today. Moritz frames the long-term comparison as Linux vs. Windows: the open-source version attracts community contribution, flexibility, and customization that proprietary tools have a harder time matching.


    3. The 10-Step Optimized Setup


    The core of the episode. Moritz walks step by step through: creating a troubleshooting project with the official docs, personalizing workspace files (agents.md, soul.md, user.md, identity.md), fixing memory with compaction settings and heartbeat auto-save, selecting models via OAuth, organizing Telegram groups with system prompts, understanding the three browser modes, activating and building skills, tuning the heartbeat file, hardening security, and applying least-access principles with agent-owned accounts.


    4. Model Selection and the OAuth Shortcut


    Instead of paying per-API-call, Moritz recommends hooking OpenClaw into an existing $20 ChatGPT subscription via OAuth. He suggests setting up a backup chain — OpenAI as primary, Anthropic as secondary, and open-source models through OpenRouter or Kilo Gateway as fallbacks — so the agent always has a working brain.



    The #1 tool to find startup ideas/trends - https://www.ideabrowser.com/


    LCA helps Fortune 500s and fast-growing startups build their future - from Warner Music to Fortnite to Dropbox. We turn 'what if' into reality with AI, apps, and next-gen products https://latecheckout.agency/


    The Vibe Marketer - Resources for people into vibe marketing/marketing with AI: https://www.thevibemarketer.com/


    FIND ME ON SOCIAL

    X/Twitter: https://twitter.com/gregisenberg

    Instagram: https://instagram.com/gregisenberg/

    LinkedIn: https://www.linkedin.com/in/gisenberg/


    FIND MORITZ ON SOCIAL

    X: https://x.com/moritzkremb

    Youtube: https://www.youtube.com/@promptwarrior/videos

    Instagram: https://www.youtube.com/@promptwarrior/"
  channel: "Greg Isenberg"
  channelId: "UCPjNBjflYl0-HQtUvOx0Ibw"
  duration: "PT1H4M42S"
  publishedAt: "2026-03-19T19:45:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/fd4k16REDOU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=fd4k16REDOU"
processedAt: "2026-03-24T01:00:28.802Z"
source: "youtube"
tldr: "This video provides a comprehensive 10-step guide to properly set up and optimize OpenClaw, transforming it from a buggy installation into a reliable, personalized digital employee that can automate workflows like content creation and CRM management."
tools:
  - name: "OpenClaw"
    url: null
  - name: "Claude Co-work"
    url: null
  - name: "Claude Code"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Telegram"
    url: null
  - name: "Slack"
    url: null
  - name: "OpenAI API"
    url: null
  - name: "OpenRouter"
    url: null
  - name: "Kilo Gateway"
    url: null
  - name: "ClawHub.ai"
    url: null
  - name: "Cursor"
    url: null
  - name: "WhatsApp"
    url: null
  - name: "Google Sheets"
    url: null
  - name: "Gmail"
    url: null
  - name: "Google Calendar"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "content-creation"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 35722
  outputTokens: 2424
  totalTokens: 38146
  processingTimeMs: 97415
tagsNormalizedAt: "2026-03-24T04:09:36.350Z"
---

## Key Takeaways

Greg Isenberg and Moritz Creme deliver a masterclass on transforming OpenClaw from a buggy installation into a powerful digital employee. They provide a tactical 10-step setup guide covering installation, optimization, and real-world application.

## Summary

### Introduction and OpenClaw Overview

Greg Isenberg introduces the episode by framing OpenClaw as an essential 'new computer' for every company, citing Jensen Wong's recent presentation. He sits down with Moritz Creme to provide a super-tactical, comprehensive guide taking users from installation to production. The goal is to help viewers move from wanting to install OpenClaw to having a reliable digital employee working for them.

Moritz explains that OpenClaw is a personal agent that can do things for you, remember information, get better over time, be proactive, and automate tasks. It has built-in functionalities, tools, and skills, and can be integrated into any chat tool like Telegram or Slack. He positions it as the first truly personal agent and the closest thing to a truly autonomous agent currently available.

### Differentiating AI Assistants: ChatGPT, Claude Co-work, and OpenClaw

The conversation clarifies the landscape of AI assistants. **ChatGPT** is described as a cloud-based chat intelligence with added memory and tool use over time, but fundamentally just a chat interface. **Claude Co-work** (and Claude Code) represents a paradigm shift by living locally on your machine, managing context, having flexible tools, and reading/writing files locally—making it excellent for coding and other local workflows.

**OpenClaw** is presented as the next stage, differing from Claude Co-work in several key ways:

*   **Communication Layer:** OpenClaw can be integrated into any chat application (Telegram, Slack), whereas users are locked into the Anthropic ecosystem with Claude tools.

*   **Features:** It has more built-in tools, similar local file access, and two critical standout features: **heartbeat** and **cron jobs**.

*   **Heartbeat:** A 30-minute timer that continuously makes your OpenClaw 'alive,' proactively doing things for you.

*   **Cron Jobs:** Built-in scheduling for automated tasks.

Moritz notes that while Claude Co-work is adding similar features (like the new 'Dispatch' feature for mobile access), OpenClaw is currently more powerful and, as open-source software, offers greater flexibility and community-driven development, analogous to using Linux over Windows.

### The 10-Step Optimized Setup Guide

The core of the video is a detailed walkthrough of 10 steps to optimize an OpenClaw setup, moving beyond basic installation to ensure reliability and usefulness.

**1. Establish a Troubleshooting Baseline**
Immediately create a 'OpenClaw Support' project in Claude Desktop (or ChatGPT) and upload the entire OpenClaw documentation from a site like `context7`. This creates a dedicated, accurate knowledge base for solving errors, preventing the AI from hallucinating solutions or directing you to unhelpful forums.

**2. Personalize with Core Configuration Files**
Understand and customize the key files in the OpenClaw `workspace` directory that define agent behavior:

*   `agents.mmd`: Defines the agent's core behavior.

*   `soul.md`: Defines the agent's personality and communication style.

*   `identity.md` & `user.md`: Contain information about the agent and the user.
Loading these files with rich context at the start of every session is crucial for optimal performance.

**3. Fix and Optimize Memory**
A common complaint is OpenClaw 'forgetting' things. The solution involves ensuring memory is actually being saved and implementing safeguards:

*   **Create Memory Files:** The `memory.mmd` file (long-term memory) and `memory/` folder (daily, granular logs) must be created, as they don't exist by default.

*   **Prevent Data Loss:** Add CLI settings (`compaction_memory_flash_enabled`, `memory_search_experimental_session_memory`) to ensure information is written to memory before a session 'compaction' (summarization) occurs, preventing loss.

*   **Implement Autosave:** Add an instruction to the `heartbeat.md` file to save a summary of all current sessions to memory every 30 minutes.

**4. Configure Models and Fallbacks for Cost & Reliability**
Avoid overthinking models and costs at the start. The recommended strategy is:

*   **Primary Model:** Use the **OOTH (Out-of-the-House) method** with your existing $20 OpenAI subscription via the API to stay within usage limits.

*   **Set Up Backups:** Configure backup model chains using services like Anthropic (Claude), **OpenRouter**, or **Kilo Gateway** (model aggregators for open-source models). This allows seamless switching if your primary model has issues.

*   **Security Note:** Moritz addresses Anthropic's ambiguous stance on OOTH use with OpenClaw, recommending using a separate account if concerned about bans, while noting OpenAI has explicitly approved this method.

**5. Organize Telegram Communication**
Instead of one chaotic chat thread, organize communication by creating dedicated Telegram groups and topics (e.g., General, To-Dos, Content, Agency Work). Use **group and topic-specific system prompts** to ensure OpenClaw understands the context of each conversation, keeping workflows separated and efficient.

**6. Understand and Utilize the Browser Tool**
OpenClaw's browser access is a key autonomy enabler, but it works in three distinct ways that users must understand:

*   **Web Search/Fetch:** An API-based tool for fetching public information (default for general queries).

*   **OpenClaw Managed Browser:** Opens a dedicated, secure browser profile (separate from your main Chrome) to perform logged-in tasks, like automating grocery orders. This is the main tool for automation.

*   **Chrome Relay:** A Chrome extension that allows OpenClaw to temporarily control your *existing* browser session. Useful for quick tasks but used less frequently by Moritz.

**7. Leverage and Secure Skills**
Skills are pre-built or custom automations. Use `openclaw skills list` to see bundled skills (e.g., 1Password, Summarize, Notion). Activate useful ones like the **Summarize skill** for videos/articles. You can build custom skills for repetitive tasks. Be cautious with third-party skills from marketplaces like **ClawHub.ai**, as they can contain malicious code—always review them before installation.

**8. Configure the Heartbeat.md File**
The `heartbeat.md` file runs every 30 minutes. Populate it strategically with maintenance and light automation tasks, but avoid making it too heavy to conserve usage limits. Moritz's heartbeat includes:

*   Memory maintenance and autosave.

*   To-do list auto-updates.

*   Cron job health checks to restart failed scheduled tasks.

**9. Implement Security Basics**
Security revolves around mitigating two main risks:

*   **Backend Access:** Prefer a **local Mac setup** over a VPS, as local machines have stronger inherent security.

*   **Prompt Injection:** Protect against malicious instructions hidden in emails or web content.

*   Add a basic safety instruction in `agents.mmd` telling OpenClaw to ignore commands not from the authenticated gateway.

*   Use a **strong model** (e.g., GPT-4, Claude Opus), as smarter models are more resistant to injection.

*   Follow the **principle of least access**—only grant permissions necessary for a task.

*   Use **agent-owned accounts** (dedicated logins for the agent) to separate its identity from your personal accounts.

**10. Build Systems and Use Cases**
With a stable setup, you can build powerful systems. Moritz shares two examples:

*   **No-AI-Slop Content System:** A 7-step automated pipeline for authentic short-form video content (YouTube, Instagram, TikTok). It involves automated idea capture from YouTube/Twitter, weekly AI-assisted planning, scriptwriting leveraging a library of past successful scripts, filming, editing, automated posting, and analytics feedback for continuous improvement.

*   **AI-Powered CRM:** A conversational CRM where Moritz can ask, 'Who do I need to follow up with?' OpenClaw accesses a Google Sheet of leads, cross-references Gmail and Calendar, and can draft follow-up emails or even send messages via **WhatsApp** using the browser automation tool.

### Conclusion and Strategic Importance

Moritz concludes by acknowledging OpenClaw is still early and has rough edges, similar to ChatGPT's early days. However, the 'magical moments' of automation showcase its potential. He emphasizes that personal AI agents are the future, and learning to manage them now provides a significant advantage. Greg reinforces this by highlighting Jensen Wong's statement that OpenClaw is 'the new computer' and possibly the most important software release ever, urging viewers to engage with this transformative technology.

## Context

This video is from Greg Isenberg's channel, focused on startups, technology, and business strategy. Greg hosts the 'Startup Ideas' podcast and frequently discusses emerging tech trends with experts. The guest, Moritz Creme, is a practitioner deeply experienced in implementing and optimizing AI agent systems like OpenClaw for real-world productivity. This discussion contributes to the rapidly evolving conversation around personal AI agents, autonomous workflows, and the 'agentic' future of computing. It's highly relevant as tools like OpenClaw move from hype to practical utility, and companies and individuals seek to harness them effectively. This video is essential for entrepreneurs, developers, content creators, and anyone looking to leverage AI agents to automate complex business and personal tasks, moving beyond simple chat interfaces to build persistent, proactive digital employees.