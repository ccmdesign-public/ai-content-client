---
metadata:
  videoId: "ubebAvT2Nw0"
  title: "Google Workspace CLI: 100+ AI Agent Skills — Here's What They Do"
  description: "Google just launched a game-changing CLI tool that lets you automate Google Workspace directly—no Zapier, no N8N, just pure first-party integration!


    In this video, I dive into Google Workspace CLI (GWS), an open-source tool that gives AI agents and developers direct access to Gmail, Calendar, Drive, Sheets, Slides, and more. With over 100+ prebuilt skills, recipes, and personas, you can automate workflows like creating meetings, processing emails, and generating documents—all from your terminal.


    I'll show you two live demos:

    ✅ Creating a Google Meet and emailing the link automatically

    ✅ Processing 10 emails and generating Sheets, Docs, and Slides in one prompt


    Plus, a complete installation walkthrough so you can start using it today!


    🔗 Resources:


    Google Workspace CLI GitHub: https://github.com/googleworkspace/cli

    Skills Documentation: https://github.com/googleworkspace/cli/blob/main/skills

    📑 Chapters:

    0:00 Introduction to Google Workspace CLI

    1:23 First Demo: Creating a Meeting

    3:04 Second Demo: Email Processing Workflow

    6:56 Understanding GWS CLI Features

    8:22 Installation Guide

    11:52 Final Thoughts


    💬 Have questions? Drop them in the comments!

    👍 If you found this helpful, give it a thumbs up and subscribe for more AI and automation content!


    GoogleWorkspace #AI #Automation #CLI #Productivity"
  channel: "AI with Surya"
  channelId: "UCz80JEs56coMRDd5OzYe_lw"
  duration: "PT12M59S"
  publishedAt: "2026-03-07T02:54:03Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ubebAvT2Nw0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ubebAvT2Nw0"
processedAt: "2026-03-07T21:02:06.442Z"
source: "youtube"
tldr: "Google Workspace CLI is a new, free, open-source command-line tool that provides direct access to all Google Workspace apps (Gmail, Calendar, Drive, Sheets, Slides, etc.) and includes over 100 pre-built AI agent skills, enabling powerful automation without third-party middleware like Zapier or N8N."
tools:
  - name: "Google Workspace CLI"
    url: null
  - name: "N8N"
    url: null
  - name: "Zapier"
    url: null
  - name: "Gemini CLI"
    url: null
  - name: "Cloud Code"
    url: null
  - name: "npm"
    url: null
  - name: "Google Cloud Platform"
    url: null
  - name: "Google APIs"
    url: null
  - name: "PowerShell"
    url: null
  - name: "GitHub"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "gcp"
  - "productivity"
  - "terminal"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 10394
  outputTokens: 1017
  totalTokens: 11411
  processingTimeMs: 32159
tagsNormalizedAt: "2026-03-07T21:06:03.168Z"
---

## Key Takeaways

Google's new command-line interface transforms how AI agents and developers interact with Workspace apps. • **Google Workspace CLI (GWS)** is a free, open-source, first-party tool that provides direct API access to all Google Workspace services. • It ships with **100+ pre-built agent skills** (recipes, workflows, personas) for tasks like meeting creation, email processing, and document generation. • It enables complex, multi-app workflows (e.g., analyze emails → create Sheets, Docs, Slides) with a single prompt, eliminating the need for middleware for Google-to-Google automation.

## Summary

Google has launched the Google Workspace CLI (GWS), a powerful new command-line tool designed for both developers and AI agents. It provides direct, first-party access to the entire Google Workspace ecosystem—including Gmail, Calendar, Drive, Sheets, Slides, and Meet—without requiring third-party integration platforms.

The tool's standout feature is its library of **over 100 pre-built agent skills**. These are ready-to-use recipes, workflows, and personas (like an 'executive assistant' or 'content creator') that handle common tasks.

### Live Demos Showcase Capabilities

The video demonstrates two powerful use cases. First, the creator instructs an AI agent to create a Google Meet space immediately and email the join link, which executes seamlessly. Second, a more complex workflow is shown where the agent is prompted to:

* Read the last 10 emails from today.

* Determine urgency and required action for each.

* Create a Google Slides presentation (an 'executive briefing').

* Create a Google Doc ('weekly briefing notes').

* Log all email details into a Google Sheet with categorized columns.
This entire multi-app workflow is executed from a single conversation with the agent, showcasing the CLI's ability to chain skills across different Workspace applications.

### Installation and Setup

The CLI is installed via npm (`npm install google-workspace-cli`). Setup involves running `gws o setup`, which guides you through selecting a Google account, a Google Cloud Platform (GCP) project, and enabling the necessary Google APIs. A crucial step is creating OAuth credentials in the GCP console to grant the CLI secure access. Once configured with `gws o login`, the tool is ready for use in terminals or by AI agents.

### Key Advantages and Limitations

The tool **auto-discovers new Google APIs** via Google's discovery service, ensuring it never falls behind as Workspace evolves. However, it is designed for **Google-to-Google workflows only**. For integrations with external services like Salesforce, Slack, or Stripe, tools like Zapier or N8N are still necessary. For teams deeply embedded in the Google ecosystem, this CLI is a no-brainer for enabling advanced, agentic automation.

## Context

This matters because automation across Google Workspace apps typically requires third-party middleware like Zapier or N8N, which adds cost and complexity. Google Workspace CLI provides a native, free alternative with a vast library of pre-built skills, significantly lowering the barrier to creating sophisticated AI agents that can interact with productivity tools. It's a major step towards making AI agents practical for everyday office workflows, from email triage to automated report generation. Developers, AI engineers, and productivity-focused users should pay attention.