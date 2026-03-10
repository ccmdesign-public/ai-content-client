---
metadata:
  videoId: "yLhnJMM464c"
  title: "Claude Skills 2.0 MASSIVE Upgrade! (build your first AI workflow)"
  description: "More new leads + 1500 followers + ALL my resources

    👉 https://www.skool.com/buildroom/


    Summary ⤵️

    Claude Skills 2.0 just dropped — and almost nobody is using it yet.


    In this video, I'll show you how to build your first Claude Skill from scratch — a meeting notes processor that auto-generates executive summaries, action items per person, and stores everything in a searchable format you can actually interact with.


    ⏱️ Timestamps:

    00:00 - Why Claude Skills 2.0 Changes Everything

    00:42 - What We're Building Today

    01:00 - Duncan's Background & The Build Room

    01:05 - Setting Up Google Antigravity

    01:24 - Creating Your First Skill Folder

    01:31 - How to Install Claude Code

    02:00 - Skills vs. System Prompts Explained

    02:37 - Installing the Skill Creator Plugin

    02:54 - How Skill Creation Works

    03:47 - Describing Your Meeting Notes Skill

    04:20 - Claude Fills In the Gaps

    04:50 - Connecting Skills to Notion MCP

    05:19 - Claude Tests the Skill Automatically

    05:58 - Processing a Real Client Call

    07:18 - Querying Your Meeting Data Live

    08:39 - Download the Skill"
  channel: "Duncan Rogoff | AI Automation"
  channelId: "UC37JpWP5PxLSma2lh79HU9A"
  duration: "PT9M18S"
  publishedAt: "2026-03-05T21:56:47Z"
  thumbnailUrl: "https://i.ytimg.com/vi/yLhnJMM464c/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=yLhnJMM464c"
processedAt: "2026-03-10T15:42:11.756Z"
source: "youtube"
tldr: "Claude Skills 2.0 is a massive upgrade that transforms Claude from a chatbot into a powerful workflow automation tool, demonstrated by building a meeting notes processor that creates summaries, action items, and stores data for future interaction."
tools:
  - name: "Claude Code"
    url: null
  - name: "Google Anti-gravity"
    url: "https://anti-gravity.google"
  - name: "Notion"
    url: null
  - name: "Fireflies.ai"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "claude"
  - "productivity"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8941
  outputTokens: 978
  totalTokens: 9919
  processingTimeMs: 33056
tagsNormalizedAt: "2026-03-10T16:49:06.370Z"
---

## Key Takeaways

Claude Skills 2.0 enables you to build reusable AI workflows that go beyond simple prompting. Here are the key insights:

*   **Skills are more powerful than system prompts** because they can access the web, integrate with third-party platforms, take actions, and develop code, creating fully automated workflows.

*   **The Skill Creator skill** from Anthropic allows you to build new skills through natural language conversation, with Claude automatically testing and refining the skill for you.

*   **Skills create reusable, consistent processes** like the meeting notes processor built in the video, which automatically generates executive summaries, action items, and stores outputs for future querying.

*   **You can connect skills to your tools** like Notion or Fireflies.ai for end-to-end automation, eliminating manual copy-pasting and creating intelligent systems that work on your behalf.

## Summary

Claude Skills 2.0 represents a paradigm shift from using Claude as a conversational AI to leveraging it as a workflow automation engine. The video demonstrates this by building a practical, reusable skill from scratch.

### Building with the Skill Creator

The process begins inside Google's Anti-gravity IDE. After installing Claude Code via the terminal, you access the **Skill Creator skill**—a meta-skill provided by Anthropic that builds other skills. You install it via `/plugins` and describe what you want your new skill to do in natural language.

For the demo, the creator describes a meeting notes processor that should take transcripts, create executive summaries and per-person action items, and store the output accessibly. The Skill Creator skill then engages in a clarifying dialogue, suggesting additional valuable outputs like **key decisions made** and **open questions**, and asks about storage preferences.

### Automated Testing and Refinement

A standout feature of Claude Skills 2.0 is its **self-testing capability**. After drafting the skill based on the conversation, Claude automatically runs tests on it, assesses what's working well, and makes improvements—all without user intervention. This ensures the created skill is robust and functional from the start.

### Using the Finished Skill

The completed **`/meetingnotes` skill** is now a reusable command. You can feed it meeting transcripts (e.g., by dragging a JSON file from Fireflies.ai into your project folder) and trigger it with a simple slash command. The skill processes the transcript consistently every time, outputting a structured analysis (summary, decisions, action items) into a specified `outputs/` folder as a Markdown file.

### Interacting with Processed Data

The true power is revealed after processing. Because the outputs are saved as files, you can chat with Claude and ask it questions about your past meetings. For example, asking "What open questions are left for the AI chat system build?" prompts Claude to search the saved analysis files and retrieve the specific information, turning your meeting history into an interactive knowledge base.

This workflow can be extended by connecting the skill directly to tools like Fireflies.ai via MCP (Model Context Protocol), creating a fully automated pipeline where every new meeting is processed, summarized, and made queryable without any manual steps.

## Context

Most people still use AI assistants like Claude as basic chatbots, manually rewriting prompts and copying data between applications. This is inefficient and prevents scaling AI workflows. Claude Skills 2.0 changes this by allowing users to build persistent, automated skills that integrate with other tools and execute complex tasks consistently. This matters for entrepreneurs, professionals, and agencies who want to systematize repetitive tasks like meeting analysis, content processing, or data management, freeing up time for higher-value work. It represents the move from AI as a conversation partner to AI as an automated employee.