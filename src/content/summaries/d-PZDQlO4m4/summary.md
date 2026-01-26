---
metadata:
  videoId: "d-PZDQlO4m4"
  title: "Automate all your NotebookLM Research and content creation with this Ultimate MCP"
  description: "Unlock the full power of Google NotebookLM directly from your IDE or AI tools with this new MCP. This custom MCP server lets you automate research, generate podcasts and infographics, and manage notes using AI agents like Claude Code, Codex, or Gemini CLI.


    In this video, I demonstrate my latest open-source project: a custom-built Model Context Protocol (MCP) server for NotebookLM. I'll walk you through the full installation process, the unique authentication method, and real-time demos of creating notebooks, syncing Google Drive sources, and generating AI audio overviews purely through command-line prompts.\ 


    Whether you're a developer or a \"vibe coder,\" this tool bridges the gap between your code editor and your knowledge base, allowing for powerful automated workflows.


    Key Takeaways

    - How to install, configure, and authenticate the unofficial NotebookLM MCP server.

    - How to programmatically create notebooks, import sources, and generate complex study guides.

    - Live demos of using Claude Code + Wisper Flow to automate all NotebookLM activities without using the UI


    Resources:

    GitHub repo: https://github.com/jacob-bd/notebooklm-mcp


    CHAPTERS:

    00:00 - Intro & What is NotebookLM MCP\ 

    01:10 - Installation & Setup Guide\ 

    01:21 - Connecting MCP to Claude Code\ 

    02:14 - Authentication Process Explained\ 

    03:35 - Listing & Managing Notebooks via Claude Code\ 

    04:13 - Analyzing Content Without Opening Browser\ 

    05:12 - Syncing Google Drive Sources Automatically\ 

    07:11 - Demo: Fast Web Research Workflow\ 

    07:54 - Generating Audio Overviews & Study Aids\ 

    09:40 - Creating Data Tables, Quiz & Infographics\ 

    10:48 - Sending a query to the NotebookLM\ 

    11:50 - Example: Rust Programming Language Research workflow

    12:30 - Deleting Notebooks\ 

    13:12 - Final Thoughts & Open Source Info"
  channel: "Gen AI Spotlight"
  channelId: "UCmElaQGQUojeNGu3Xg9urbg"
  duration: "PT15M58S"
  publishedAt: "2025-12-31T16:04:31Z"
  thumbnailUrl: "https://i.ytimg.com/vi/d-PZDQlO4m4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=d-PZDQlO4m4"
processedAt: "2026-01-14T16:25:24.265Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Notebook MCP Server:

  - **31 automated tools** for NotebookLM using internal RPC calls rather than brittle browser automation

  - **Content creation suite** for generating audio overviews, quizzes, infographics, and data tables via chat

  - **Dynamic synchronization** of Google Drive sources and automated deep-web research integration\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3577
  outputTokens: 860
  totalTokens: 5655
  processingTimeMs: 14328
tools:
  - name: "Google NotebookLM"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Gemini CLI"
    url: null
  - name: "Wisper Flow"
    url: null
  - name: "Codex"
    url: null
  - name: "Chrome"
    url: null
  - name: "Google Drive"
    url: null
  - name: "GitHub"
    url: "https://github.com/jacob-bd/notebooklm-mcp"
  - name: "Cursor"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - agents
  - automation
  - claude
  - gemini
  - workflow
---

## Key Takeaways

This project introduces a comprehensive Model Context Protocol (MCP) server that transforms NotebookLM into a programmatically accessible research assistant.

* **Direct API Integration**: Unlike other tools using slow browser automation, this server uses **reverse-engineered RPC calls** for high-speed interactions and stability.

* **End-to-End Automation**: Users can trigger **audio overviews**, **multilingual podcasts**, **quizzes**, and **web research** directly from an AI chat interface like Claude.

* **Source Management**: Features include the ability to **list, sync, and delete** sources or entire notebooks, ensuring data remains fresh and organized without manual web UI interaction.

## Summary

### Overview of Notebook MCP
The **Notebook MCP server** is a robust implementation of the Model Context Protocol designed specifically for Google’s NotebookLM. Developed by Jacob (Gen AI Spotlight), it bypasses the standard browser-based automation methods by utilizing **internal RPC (Remote Procedure Call)** mechanisms. This approach allows for significantly faster and more reliable execution of tasks across **31 specialized tools**.

### Key Functionalities and Tools
The server provides a deep suite of capabilities that replicate and extend the standard NotebookLM web interface through an AI assistant like Claude or Gemini. Key features include:

- **Notebook Management**: Users can list all notebooks, describe specific projects, and delete them through simple natural language commands.

- **Resource Creation**: It automates the generation of high-value assets including **audio overviews** (with custom lengths and languages), **quizzes**, **infographics**, and **data tables**.

- **Intelligent Research**: The system can initiate **fast web research** on specific topics, automatically import discovered sources into a notebook, and query those sources using the NotebookLM engine.

### Authentication and Setup
Because NotebookLM lacks a public API, authentication is handled through a custom **authentication app** provided in the repository. This app opens Chrome in **debug mode** to capture necessary session cookies. Once the initial Google login is performed, the session is saved locally, meaning users do not need to re-authenticate every session. The installation involves cloning the Git

Hub repository and adding the server path to the JSON configuration of a compatible IDE or AI tool.

### Source Synchronization and Queries
One of the most powerful features is the ability to **synchronize Google Drive sources**. In the standard web UI, users must manually refresh sources to reflect document changes; this MCP allows the AI to detect "stale" sources and trigger a sync automatically. Furthermore, users can perform **local drive searches** and ask complex questions of their notebooks directly within their primary workspace, effectively turning NotebookLM into an external "brain" for coding or research projects.

### Token Management and Optimization
Due to the large number of tools (31), the MCP can consume a significant portion of an LLM's **context window**. To mitigate this, the developer suggests disabling the MCP when not in active use. The code includes optimizations to reduce the token overhead, but it remains a "heavy" protocol intended for power users managing complex research workflows.

## Context

NotebookLM has become a leading tool for researchers and students, but its lack of an official API has limited its integration into professional developer and AI workflows. This project bridges that gap by connecting the **Model Context Protocol (MCP)**—an open standard for AI tools—to Google's internal systems. This matters because it allows developers to keep their "research brain" (NotebookLM) and their "execution brain" (Claude/Cursor) perfectly synced. It represents a broader trend of using LLMs to reverse-engineer and automate proprietary web tools, turning closed platforms into programmable assets for the AI-driven workforce.
