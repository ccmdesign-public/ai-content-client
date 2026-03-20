---
metadata:
  videoId: "cvdAqCM1wGs"
  title: "How I Automate My Telegram AI News Channel with OpenClaw 🦞 (See my entire workflow)"
  description: "Ever wonder how to keep up with the relentless AI news cycle without burning out? In this video, I pull back the curtain on the OpenClaw Newsroom, a 7-step hybrid AI automation workflow I built to curate, draft, and publish daily AI news.\ 


    Discover how I use AI agent on OpenClaw alongside human editorial control to run a Telegram news channel on autopilot.\ 


    I'll walk you through the entire assembly line, from scanning sources and filtering stories to generating AI images and final approval. Plus, watch a live demo of the agent generating a news post.\ 


    If you want to build your own AI-powered newsroom or automate your content creation, this is a must-watch!


    Resources:

    Join the Gen AI Spotlight Telegram: t.me/genaispot

    NoteBookLM MCP Github Repo: https://github.com/jacob-bd/notebooklm-mcp-cli


    Chapters:

    00:00 - Intro - the AI Newsroom

    00:45 - Why You Need an AI News Agent

    02:10 - The Multi-Step Human-AI Hybrid Assembly Line

    02:34 - Step 1: The Radar (Scraping AI News)

    03:02 - Step 2: The Filter (Curating the Best Stories)

    03:22 - Step 3: The Typewriter (AI Drafting & Humanizing)

    04:18 - Step 4: The Sandbox (Testing & AI Image Gen)

    04:44 - Step 5: The Gatekeeper (My Editorial Process)

    05:29 - Step 6 & 7: The Megaphone and the Memory

    05:48 - Auto-Generating NotebookLM content for this video

    06:46 - Inside My Automated Telegram Channel

    08:37 - Live Demo: AI Agent Drafting a News Story

    11:41 - Reviewing the Final AI-Generated Post"
  channel: "Gen AI Spotlight"
  channelId: "UCmElaQGQUojeNGu3Xg9urbg"
  duration: "PT13M35S"
  publishedAt: "2026-03-01T14:00:51Z"
  thumbnailUrl: "https://i.ytimg.com/vi/cvdAqCM1wGs/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=cvdAqCM1wGs"
processedAt: "2026-03-10T16:33:07.316Z"
source: "youtube"
tldr: "The creator demonstrates an automated AI newsroom using OpenClaw agents to scan sources (TechCrunch, Reddit, X), draft stories, generate images, and post to Telegram, with human-in-the-loop approval and continuous learning from editorial feedback."
tools:
  - name: "OpenClaw"
    url: null
  - name: "Notebook LM"
    url: null
  - name: "Telegram"
    url: null
  - name: "Sonnet"
    url: null
  - name: "Perplexity"
    url: null
  - name: "Nano Banana API"
    url: null
  - name: "Gemini Nano Banana 2"
    url: null
  - name: "GPT-3.5"
    url: null
  - name: "OpenAI"
    url: null
  - name: "LM Studio"
    url: null
  - name: "Python"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "content-creation"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8752
  outputTokens: 1039
  totalTokens: 9791
  processingTimeMs: 35115
tagsNormalizedAt: "2026-03-10T16:43:57.589Z"
---

## Key Takeaways

The video showcases a sophisticated AI-human collaborative workflow for content automation. Key insights include:

- **Multi-agent orchestration** splits tasks: one agent scans/news, another writes/humanizes, and a third validates facts via Perplexity.

- **Human-in-the-loop control** is critical: the creator defines sources, reviews drafts, edits the 'why this matters' section, and provides final approval via a test channel.

- **Continuous learning system** improves over time by logging published stories and feedback, helping the AI learn the creator's preferences (e.g., reducing crypto news).

- **Full automation pipeline** includes image generation via Nano Banana APIs, style mimicry using the creator's writing samples, and scheduled cron jobs for scanning.

## Summary

The video provides a detailed walkthrough of an automated AI-powered newsroom built with OpenClaw, designed to run a Telegram news channel with minimal daily human intervention.

### Workflow Overview

The system uses a **multi-agent architecture** where specialized sub-agents handle different tasks. A primary scanning agent runs on a scheduled cron job every few hours, pulling from a curated list of high-signal sources like TechCrunch, specific Reddit forums, and X accounts. It filters and prioritizes stories, presenting a shortlist of about seven to the human creator for selection.

### Drafting and Refinement Process

When a story is chosen, the workflow moves to a **writing agent** (using a model like Sonnet for quality prose). This agent is trained on the creator's past writings, blogs, and emails to mimic their voice and style. The draft then goes through a **'humanizer' skill** to remove telltale AI phrasing and dashes. Crucially, every draft is fact-checked and validated by sending it to **Perplexity** for accuracy verification and source gathering before final revisions.

### Quality Control and Deployment

The creator acts as the **final gatekeeper**, reviewing the 'why this matters' section and overall coherence. All posts are first sent to a **genai test Telegram channel** (a pre-production environment) to ensure formatting and delivery work correctly before being approved for the main channel. Each published story includes a custom-generated image, created by the same writing agent which crafts a prompt sent to **Gemini Nano Banana 2** via APIs.

### System Learning and Tools

The entire process is logged into memory files, creating a feedback loop. By tracking which drafts are approved or rejected, the scanning agent learns the creator's tastes over time—for example, reducing the frequency of cryptocurrency stories. The creator also built custom **MCPs (Model Context Protocols)** for tools like Notebook LM, Perplexity, and Nano Banana specifically for OpenClaw to use, demonstrating a tool-building approach for AI agents.

## Context

This video matters as a real-world case study in **AI agentic workflows** and **human-AI collaboration** for content creation. It moves beyond simple chatbots, showing how multiple specialized AI agents can be orchestrated to handle complex, multi-step tasks like news gathering, writing, and publishing. Content creators, product managers, and developers interested in building autonomous or semi-autonomous systems will find this relevant. It connects to broader trends of using AI for persistent, automated tasks and the importance of maintaining human oversight ('human-in-the-loop') in critical processes like publishing.