---
metadata:
  videoId: "Wu67lLD8bB0"
  title: "Google’s New Tool Just 10x’d Claude Code"
  description: "Full courses + unlimited support: https://www.skool.com/ai-automation-society-plus/about

    All my FREE resources: https://www.skool.com/ai-automation-society/about

    Apply for my YT podcast: https://podcast.nateherk.com/apply

    Work with me: https://uppitai.com/


    My Tools💻

    14 day FREE n8n trial: https://n8n.partnerlinks.io/22crlu8afq5r

    Code NATEHERK to Self-Host n8n for 10% off (annual plan): http://hostinger.com/nateherk

    Voice to text: https://ref.wisprflow.ai/nateherk


    GWS CLI GitHub: https://github.com/googleworkspace/cli


    Google just released an open source CLI that lets you control your entire Google Workspace from the command line.\ 


    In this video, I connect it to Claude Code and show you how it can manage your Docs, Sheets, Gmail, Calendar, and Slides without ever leaving Claude Code. If you use Claude Code, this changes everything.


    Sponsorship Inquiries:

    📧 sponsorships@nateherk.com


    Timestamps

    0:00 What GWS CLI Can Do

    1:00 Resource Guide Demo

    2:03 Why Use This

    3:06 GitHub Repo Walkthrough

    4:08 Full Installation Guide

    7:57 Demos

    10:50 Final Thoughts"
  channel: "Nate Herk | AI Automation"
  channelId: "UC2ojq-nuP8ceeHqiroeKhBA"
  duration: "PT11M49S"
  publishedAt: "2026-03-10T02:22:20Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Wu67lLD8bB0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Wu67lLD8bB0"
processedAt: "2026-03-10T14:41:34.410Z"
source: "youtube"
tldr: "Google's new open-source GWS CLI provides a single command-line interface to programmatically control Google Workspace (Drive, Gmail, Docs, Sheets, Calendar), and when integrated with Claude Code, enables AI agents to create formatted documents, manage emails, build slide decks, and automate complex workflows via terminal commands."
tools:
  - name: "GWS CLI"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Google Cloud Console"
    url: null
  - name: "Google Workspace"
    url: null
  - name: "Google Drive"
    url: null
  - name: "Gmail"
    url: null
  - name: "Google Docs"
    url: null
  - name: "Google Sheets"
    url: null
  - name: "Google Slides"
    url: null
  - name: "Google Calendar"
    url: null
  - name: "Chrome DevTools"
    url: null
  - name: "GitHub"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "open-source"
  - "productivity"
  - "terminal"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 11867
  outputTokens: 1041
  totalTokens: 12908
  processingTimeMs: 36016
tagsNormalizedAt: "2026-03-10T16:46:05.738Z"
---

## Key Takeaways

Google's GWS CLI radically simplifies AI-powered automation across Google Workspace by providing a unified, terminal-based interface.

* **Unified Google Workspace Control**: A single CLI provides programmatic access to Drive, Gmail, Docs, Sheets, Calendar, and Admin, eliminating the need for multiple API integrations.

* **Pre-built Workflow Skills**: Comes with over 100 multi-step "recipes" for common tasks like creating docs from templates, reading sheet data, scheduling meetings, and triaging emails.

* **AI Agent Superpower**: When given to Claude Code, the CLI allows the AI to execute complex, formatted document creation (not just raw markdown) and automate workflows via simple bash commands.

* **JSON-First & Low Maintenance**: The CLI outputs structured JSON, is auto-discovered/updated, and requires minimal setup after initial OAuth authentication.

## Summary

Google's recently released GWS (Google Workspace CLI) is an open-source command-line tool that acts as a powerful bridge between AI coding assistants like Claude Code and the entire Google Workspace ecosystem.

### Core Functionality

The CLI provides terminal commands to search, list, upload, download, move, copy, and share anything in Google Drive, Gmail, Docs, Sheets, Slides, and Calendar. Its key advantage is **unified access**; instead of configuring multiple API endpoints or MCP (Model Context Protocol) tools, developers and AI agents interact with one interface.

### Integration with Claude Code

The video demonstrates how giving the GWS CLI to Claude Code "10x's" its capability. Instead of generating unformatted markdown via API calls, Claude can now run bash commands to create professionally formatted Google Docs with images, headers, and links. A demo shows creating a YouTube resource guide from a video link, where Claude downloads the transcript and builds a styled document.

### Pre-built Skills and Advanced Use Cases

The tool includes a library of over 100 **multi-step workflow recipes** (skills) for tasks like creating events from sheets, labeling emails, and generating presentations. Advanced demos include:

* **Email Triage**: Having Claude score unread emails based on business context and automatically mark low-priority ones.

* **Slide Deck Creation & Visual Validation**: Building a branded Google Slides presentation, then using Chrome DevTools access to take screenshots, audit visual spacing, and iteratively improve the output.

### Setup and Current State

Setup involves creating a Google Cloud project, enabling OAuth, and downloading credentials. The project is **open-source and free**, but is currently in a developer beta (pre-v1.0), meaning it's powerful but may have some finicky authentication flows. It auto-discovers new Google API endpoints, ensuring future compatibility with minimal maintenance.

## Context

For developers and professionals deeply embedded in the Google ecosystem, automating tasks across Gmail, Drive, and Docs has traditionally required wrestling with multiple APIs or clunky GUI automation. This tool matters because it provides a clean, programmatic, and AI-native interface to Google Workspace. It connects to the broader trend of **AI agents** moving beyond simple code generation to executing real-world tasks and workflows. Anyone building AI assistants, automating business processes, or seeking to leverage AI for productivity within Google's suite should pay attention.