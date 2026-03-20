---
metadata:
  videoId: "Uc6iH5NuQ9A"
  title: "Google NotebookLM Just Dropped 10 New AI Infographic Styles! (See them all)"
  description: "Stop settling for boring, generic AI Infographics! In this video, we dive into the massive new update for Google NotebookLM - 10 brand new infographic styles, including Anime, Clay, Bricks, and more.\ 


    Even better? We’ve already updated the NotebookLM MCP & CLI so you can automate the generation of these stunning visuals directly through your AI tool such as Claude Desktop, Gemini CLI, or Claude Code. I'll show you exactly how to update your MCP, push the new NotebookLM skills to your AI agents, and generate a full suite of stylized infographics in seconds. If you're a content creator or dev, this is how you 10x your visual storytelling without touching a design tool.


    Key Takeaways:

    🎨 10 New Styles: From 'Kawaii' to 'Bento Grid' - NotebookLM just got a personality. I will show you all of them.

    🤖 MCP Automation: How to use the NotebookLM MCP & CLI to generate these via Claude Code.

    🚀 Workflow Upgrade: Moving from raw data to professional visuals with a single prompt.


    Resources:

    - NotebookLM MCP-CLI (GitHub): https://github.com/jacob-bd/notebooklm-mcp-cli

    - Previous OpenClaw Newsroom Video: https://youtu.be/cvdAqCM1wGs


    Chapters:

    00:00 – The Big NotebookLM Infographic Level-Up

    00:34 – Artifact Studio: Audio, Video, & More

    01:22 – Exploring 11 New Visual Styles

    02:11 – NotebookLM MCP v0.3.19

    02:44 – Updating NotebookLM MCP & Skill

    03:50 – Using Claude Code with NotebookLM MCP

    04:54 - Bulk Generation: Running All 10 Styles at Once

    07:08 – Result Review: All new styles

    09:58 – New Community Feature: Multi-Browser Login Support


    #NotebookLM #GenAI #AIAutomation #ClaudeMCP #GoogleAI"
  channel: "Gen AI Spotlight"
  channelId: "UCmElaQGQUojeNGu3Xg9urbg"
  duration: "PT11M28S"
  publishedAt: "2026-03-03T14:00:44Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Uc6iH5NuQ9A/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Uc6iH5NuQ9A"
processedAt: "2026-03-10T16:30:06.137Z"
source: "youtube"
tldr: "Google's NotebookLM added 10 new infographic styles (Scientific, Kawaii, Anime, Clay, Lego, Instructional, Editorial, Bento Grid, Professional, Sketch Note) and now supports browser fallback for login, enabling automated content creation via CLI/MCP tools like Claude and OpenClaw."
tools:
  - name: "NotebookLM"
    url: null
  - name: "Claude"
    url: null
  - name: "OpenClaw"
    url: null
  - name: "Gemini CLI"
    url: null
  - name: "Playwright"
    url: null
  - name: "Google Chrome"
    url: null
  - name: "Arc"
    url: null
  - name: "Brave"
    url: null
  - name: "Microsoft Edge"
    url: null
  - name: "Chromium"
    url: null
  - name: "Vivaldi"
    url: null
  - name: "Opera"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "automation"
  - "mcp"
  - "terminal"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7698
  outputTokens: 845
  totalTokens: 8543
  processingTimeMs: 62302
tagsNormalizedAt: "2026-03-10T16:47:30.163Z"
---

## Key Takeaways

Google NotebookLM's latest update significantly enhances automated content creation capabilities. • **10 new infographic styles** provide diverse visual options for different audiences and content types. • **Full automation via CLI/MCP** allows tools like Claude to batch-generate styled infographics from source materials. • **Browser login fallback** (community contribution) now supports Chrome, Arc, Brave, Edge, Chromium, Vivaldi, and Opera for better accessibility.

## Summary

Google NotebookLM, a tool that creates AI responses based solely on user-provided sources to reduce hallucinations, has received a major update to its infographic generation feature. The platform now offers **10 distinct visual styles** beyond the basic auto-generation, including Scientific, Kawaii (cute), Anime, Clay (claymation), Lego (brick-based), Instructional (step-by-step), Editorial, Bento Grid, Professional, and Sketch Note.

The video demonstrates how these styles can be **fully automated through NotebookLM's CLI and MCP (Model Context Protocol)**. The creator uses Claude (via cloud code) with the updated NLM skill to batch-generate all 10 infographic styles from a single notebook about "Automating an AI Newsroom with OpenClaw and Telegram." This automation includes generating each style, waiting for completion, and renaming the artifacts for easy identification.

### Technical Implementation

The process requires **NotebookLM version 18 or higher** (the demo uses v19). After updating the NLM skill (`nlm skill update`) to push changes to installed tools (Claude, anti-gravity, Gemini CLI, codeex, claw code, OpenClaw), the AI can execute commands to list notebooks and create multiple artifacts. The system handles the asynchronous nature of infographic generation, checking job status and performing post-generation tasks like renaming.

### Additional Community Update

A separate community contribution enhances the login flow. Previously, the `nlm login` command only launched Google Chrome. Now, it implements a **browser fallback chain** checking for Chrome, Arc, Brave, Edge, Chromium, Vivaldi, and Opera. The creator notes plans to add a configuration option to set a default browser, avoiding the failover path entirely.

## Context

This update matters for creators, educators, and teams using AI for content generation. NotebookLM's source-grounded approach ensures accuracy, while the new styling options and automation capabilities allow for rapid production of tailored visual content—from professional reports to educational materials for different audiences. It reflects the trend of AI tools becoming more customizable and integrable into automated workflows via CLIs and protocols like MCP.