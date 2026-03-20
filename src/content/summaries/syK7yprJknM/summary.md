---
metadata:
  videoId: "syK7yprJknM"
  title: "OpenCode just killed all vibe coding apps (it’s insane)"
  description: "Learn about the best AI Business models here - https://www.youtube.com/watch?v=Ta5g-OxjPO4

    Wanna learn how to code with AI? Go here: https://www.skool.com/new-society

    Follow me on Instagram - https://www.instagram.com/davidondrej1/

    Follow me on Twitter - https://x.com/DavidOndrej1

    Host your n8n agents on Hostinger: https://www.hostinger.com/david

    Subscribe if you're serious about AI.

    Build anything with Open Code, just watch

    timestamps:

    00:00:00 - Introduction

    00:00:33 - Setting up OpenCode

    00:02:47 - Comparing OpenCode and Claud Code

    00:04:47 - OpenCode's Response to Claud Code Block

    00:05:58 - Building a CRM Dashboard with OpenCode

    00:09:48 - Understanding OpenCode

    00:12:18 - Building a Web-based Drawing and Design Editor

    00:21:05 - OpenCode's CLI Experience

    00:22:25 - Building an Encrypted and Private File Manager

    00:34:31 - Understanding the Encryption Process

    00:38:23 - Exploring OpenCode's Versatility

    00:41:09 - Starting a New Build

    00:49:01 - Understanding OpenCode's Modes: Plan and Build"
  channel: "David Ondrej"
  channelId: "UCPGrgwfbkjTIgPoOh2q1BAg"
  duration: "PT1H38S"
  publishedAt: "2026-01-13T23:07:05Z"
  thumbnailUrl: "https://i.ytimg.com/vi/syK7yprJknM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=syK7yprJknM"
processedAt: "2026-01-16T15:17:29.708Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "David Ondrej presents **OpenCode**, an open-source AI coding agent designed to replace Claude Code by offering superior flexibility and privacy.\ 

  - **Multi-Model Integration**: Connects to 70+ models including **Claude Opus 4.5**, **GPT-5.2 Codex**, and **Gemini 3 Pro**.

  - **Cost-Saving**: Users can leverage existing **ChatGPT Plus/Pro** or **GitHub Copilot** subscriptions to run agents for free.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 15612
  outputTokens: 1585
  totalTokens: 18452
  processingTimeMs: 22854
tools:
  - name: "OpenCode"
    url: null
  - name: "Claude Code"
    url: null
  - name: "ChatGPT Plus"
    url: null
  - name: "GitHub Copilot"
    url: null
  - name: "Neovim"
    url: null
  - name: "Three.js"
    url: null
  - name: "Cursor"
    url: null
  - name: "Windsurf"
    url: null
  - name: "Open Router"
    url: null
  - name: "OpenCode Zen"
    url: null
  - name: "Hostinger"
    url: "https://www.hostinger.com/david"
  - name: "n8n"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "chatgpt"
  - "claude"
  - "copilot"
  - "gemini"
  - "terminal"
  - "vscode"
tagsNormalizedAt: "2026-03-01T21:19:30.465Z"
---

## Key Takeaways

David Ondrej argues that **Open

Code** represents a paradigm shift in the AI coding space by moving away from vendor-locked, closed-source ecosystems toward a privacy-first, open-source model.

* **Subscription Portability**: One of the most significant features is the ability to use your **ChatGPT Plus** or **Git

Hub Copilot** credentials as a backend, effectively making the use of high-end coding agents free for subscribers.

* **Standardized Context**: Open

Code promotes the use of **agents.md**, a standardized convention that provides AI agents with codebase context, linting rules, and testing commands, ensuring better performance across different tools.

* **Plan vs. Build Modes**: The terminal interface allows users to toggle between **Plan mode** (read-only strategy) and **Build mode** (autonomous execution), providing fine-grained control over the agent's actions.

* **Performance and UI**: The CLI is built by former **Neovim** team members, resulting in a highly optimized experience that includes automatic clipboard copying, token tracking, and context window visualization.

* **Privacy and Security**: Because it is **MIT-licensed** and open-source, developers can verify that their data is not being used for training or harvested by major AI labs.

## Summary

### Introduction to Open

Code and the Pivot from Claude Code
David Ondrej introduces **Open

Code** as a transformative tool in the AI coding landscape, positioned as a direct, open-source competitor to Anthropic's **Claude Code**. The video highlights Open

Code's rapid growth, noting that it has surpassed Claude Code in popularity due to its **open-source (MIT license)** nature and its support for over **70 different AI models**. Ondrej emphasizes that Open

Code is not just another wrapper but a sophisticated CLI and desktop application designed for serious software development. 

A major portion of the introduction focuses on the recent "AI drama," where Anthropic restricted third-party apps from using Claude credentials. In response, Open

Code pivoted to partner with **OpenAI and Git

Hub**, allowing users to leverage their existing **ChatGPT Plus/Pro** or **Git

Hub Copilot** subscriptions. This effectively democratizes access to high-tier coding agents without the high monthly costs typically associated with Claude Code's enterprise-tier plans.

### The Setup and User Interface Experience

The installation process is streamlined via a single **curl command**, followed by a flexible login system. Ondrej demonstrates connecting to **Open

Router**, which serves as a gateway to every major LLM on the market. The UI is praised for its "quality of life" features, such as the ability to see the **exact token count**, **context window percentage**, and **real-time costs** in the top-right corner of the terminal. 

One of the standout features of the CLI is the **Plan vs. Build mode** toggle. By pressing Tab, users can switch between a read-only brainstorming phase and an autonomous execution phase. This helps prevent the agent from making unwanted changes to a codebase while still allowing for high-velocity "vibe coding." Additionally, the tool includes automatic clipboard copying for highlighted text and a selection of over 30 customizable themes, developed by engineers with deep roots in the **Neovim** community.

### One-Shot Builds: Games and Business Apps

Ondrej conducts a series of "one-shot" experiments to test the capabilities of different models within the Open

Code environment:

* **3D Endless Runner**: Using **Claude Opus 4.5**, the agent builds a fully functional 3D game using **Vanilla Type

Script and Three.js** from a single prompt. The agent creates the directory structure, installs dependencies, and compiles the project with zero errors.

* **CRM Dashboard**: Using **Gemini 3 Pro**, the agent generates a professional CRM dashboard for email campaigns. Ondrej notes that while the initial "vibe coded" UI was basic, a follow-up prompt to make the UI unique resulted in a highly polished, custom-themed interface.

* **Photoshop Clone**: Leveraging **GPT-5.2 Codex**, the agent constructs a canvas-based image editor with layers, shapes, and export capabilities. This build demonstrates Open

Code's ability to handle complex state management and canvas rendering efficiently.

### Strategic Comparisons and Advanced Context

The video provides a deep dive into how Open

Code compares to established tools like **Claude Code**, **Cursor**, and **Windsurf**. While Cursor is a full IDE, Open

Code is a dedicated **coding agent** that can run in any terminal. Ondrej highlights that Open

Code supports the **agents.md** convention—a standard readme for AI agents originally developed by OpenAI and now under the **Linux Foundation**. By running a `/init` command, Open

Code analyzes the codebase to create this file, which significantly improves the performance of any agent operating within that repository.

Ondrej also introduces **Open

Code Zen**, a gateway service that offers usage-based pricing with no markup. This is an alternative for users who do not have existing subscriptions but want access to premium models like **Big Pickle** (a fine-tuned GLM model) or specialized fast models from **XAI (Grok)**. 

### The Limitations and the Future of AI Agents

Despite the successes, the video does not shy away from the current limitations of AI agents. In the fifth build—a recursive image enhancer using **Grok 4.1 Fast**—the agent struggles with logic and API formatting, leading to a failure. Ondrej uses this to illustrate that while "vibe coding" is powerful, developer expertise is still required to troubleshoot complex integrations and API documentation. 

He concludes by advising developers to "upskill exponentially" alongside the AI. The goal should not be to let the AI do everything, but to use Open

Code as a force multiplier. Ondrej predicts that within 12 months, the gap between prompt and production-ready features will vanish, making tools that offer model flexibility and privacy—like Open

Code—the most valuable assets in a developer's toolkit.

## Context

David Ondrej is a prominent AI educator and developer known for testing the limits of autonomous coding agents and LLM integrations. This video addresses a critical shift in the AI industry: the move from centralized, closed-source platforms (like Anthropic's Claude) to open-source, model-agnostic tools. As major AI labs begin to restrict API access and harvest data for training, Open

Code represents a grassroots movement toward developer autonomy and privacy. This content is highly relevant for software engineers, startup founders, and hobbyists who are navigating the high costs of AI subscriptions and seeking more control over their development environment. It contributes to the broader discussion on "vibe coding"—the ability to build complex software through natural language—while emphasizing the continued need for technical literacy to manage increasingly powerful AI agents.
