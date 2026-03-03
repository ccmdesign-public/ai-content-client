---
metadata:
  videoId: "usTeU4Uh0iM"
  title: "Claude Code + NotebookLM = CHEAT CODE"
  description: "⚡Master Claude Code, Build Your Agency, Land Your First Client⚡

    https://www.skool.com/chase-ai

    🔥FREE community with tons of AI resources🔥\ 

    https://www.skool.com/chase-ai-community

    💻 Need custom work? Book a consult 💻

    https://chaseai.io

    In this video, I show you how to turn Claude Code into the ultimate AI research agent by connecting it to NotebookLM — Google's free source-grounding tool powered by Gemini.

    Using a custom YouTube search skill (powered by yt-dlp) and the notebooklm-py CLI, you can search YouTube for any topic, push the top videos directly into NotebookLM, have it extract all the captions and build a queryable knowledge base, run analysis across every video, and generate deliverables like infographics, slide decks, and podcasts — all from your terminal.

    No vector databases, no embedding costs, no RAG infrastructure to maintain. The entire setup takes 5 minutes and replaces a research stack that would cost hundreds a month to build yourself.

    ⏰TIMESTAMPS:

    0:00 - Intro

    1:15 - Demo

    4:32 - Setup

    8:22 - Walkthrough

    10:08 - More Resources

    RESOURCES FROM THIS VIDEO:

    ➡️ Master Claude Code: https://www.skool.com/chase-ai

    ➡️ My Website: https://www.chaseai.io

    ➡️ Claude Code Docs: https://code.claude.com/docs/en/overview

    #claudecode #notebooklm"
  channel: "Chase AI"
  channelId: "UCoy6cTJ7Tg0dqS-DI-_REsA"
  duration: "PT11M8S"
  publishedAt: "2026-03-02T21:28:22Z"
  thumbnailUrl: "https://i.ytimg.com/vi/usTeU4Uh0iM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=usTeU4Uh0iM"
processedAt: "2026-03-03T14:54:29.136Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "By combining Claude Code's automation with Notebook LM's free RAG system, you can create a zero-cost research pipeline that scrapes YouTube videos, analyzes content, and generates deliverables like infographics and slide decks."
tools:
  - name: "Claude Code"
    url: null
  - name: "Notebook LM"
    url: null
  - name: "yt-dlp"
    url: null
  - name: "Notebook LM-PI"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "claude-code"
  - "notebook-lm"
  - "ai-research"
  - "rag"
  - "youtube-scraping"
  - "automation"
  - "ai-workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9385
  outputTokens: 783
  totalTokens: 10168
  processingTimeMs: 76212
---

## Key Takeaways

This video demonstrates how to create a powerful, free AI research workflow by integrating Claude Code with Notebook LM. • **Claude Code** acts as an automation orchestrator, using custom skills to scrape YouTube data and push it to Notebook LM. • **Notebook LM** serves as a free, robust RAG system that handles all analysis and content generation offsite, saving token costs. • The setup uses an unofficial Python API for Notebook LM and a custom YouTube scraper skill for Claude Code, enabling complex research automation in minutes.

## Summary

The video presents a method to supercharge research capabilities by connecting Claude Code with Notebook LM, creating a workflow that automates data sourcing, analysis, and content generation.

### The Core Workflow

The system works by having Claude Code use a **custom YouTube search skill** to find relevant videos based on a query. This skill uses **yt-dlp** to scrape YouTube metadata including titles, views, creators, and durations. The collected video URLs are then sent to Notebook LM via an **unofficial Python API** (Notebook LM-PI).

Notebook LM then processes these videos, extracting captions and performing analysis using its built-in RAG (Retrieval-Augmented Generation) capabilities. All heavy cognitive work—analysis, summarization, pattern recognition—happens within Notebook LM's free tier, meaning Claude Code doesn't consume tokens for this processing.

### Deliverable Generation

The real power comes in the final step: Claude Code can request Notebook LM to generate various deliverables based on the analyzed content. These include:
• Infographics in specific styles (like handwritten blueprint)
• Slide decks
• Podcast scripts
• Flashcards
• Mind maps
• Audio overviews

All deliverables are created based on the actual video content analysis, ensuring they're grounded in source material rather than being fabricated.

### Technical Implementation

Setting up the integration requires two main components:
1. **YouTube Search Skill**: Either prompt Claude Code to build it using yt-dlp, or download a pre-made setup file from the creator's community.
2. **Notebook LM Connection**: Install the Notebook LM-PI GitHub repository which provides an unofficial API. Run installation commands in a separate terminal, authenticate once via browser login, then add the Notebook LM skill to Claude Code.

Once configured, the entire pipeline can be triggered with simple natural language prompts to Claude Code, which orchestrates the entire process from YouTube search through analysis to final deliverable creation.

## Context

This workflow addresses a common challenge in AI research: creating automated systems that can gather, process, and synthesize information from video content without incurring high token costs. It's particularly valuable for content creators, researchers, and developers who need to analyze YouTube trends or create content based on video research. The integration demonstrates how combining specialized AI tools can create capabilities greater than their individual parts, moving toward more autonomous research systems.