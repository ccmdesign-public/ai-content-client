---
metadata:
  videoId: "PU8JhgLPxes"
  title: "Connect Claude to NotebookLM in less than 5 MINUTES! Full Automation UNLOCKED!"
  description: "Connect Claude Desktop directly to Google's NotebookLM using the new NotebookLM MCP.


    In this tutorial, I will walk you through the newly updated installation process for my NotebookLM MCP server. You will learn how to install the tool directly from PyPI using uv, authenticate with your Google account, and configure the Claude Desktop app on Mac to use the MCP. This guide enables seamless communication between your local AI assistant and your cloud notebooks, allowing you to query notes and generate assets without leaving your desktop.


    Key Takeaways

    1️⃣ How to install the NotebookLM MCP server via PyPI using the uv tool.

    2️⃣ Step-by-step configuration of the Claude Desktop JSON file for MCP Servers.

    3️⃣ Triggering real-time actions (like generating Infographics) in NotebookLM via chat.


    Resources:

    GitHub: https://github.com/jacob-bd/notebooklm-mcp


    Chapters:

    00:00 - Intro & MCP Updates\ 

    01:20 - Installing with UV

    02:20 - NotebookLM Authentication Tool\ 

    02:50 - Configuring Claude Desktop MCP\ 

    04:11 - Testing the MCP Connection\ 

    04:53 - Generative Agent Demo: Creating Infographics\ 

    05:40 - Future Plans for Perplexity Demo"
  channel: "Gen AI Spotlight"
  channelId: "UCmElaQGQUojeNGu3Xg9urbg"
  duration: "PT6M6S"
  publishedAt: "2026-01-03T14:16:16Z"
  thumbnailUrl: "https://i.ytimg.com/vi/PU8JhgLPxes/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=PU8JhgLPxes"
processedAt: "2026-01-15T14:30:09.937Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Connect Claude Desktop to NotebookLM in minutes using the updated MCP tool.\ 

  - **Simplified Installation**: Use PyPI via `uv` or `pip` for a faster setup without manual cloning.

  - **Direct Automation**: Add, list, and manage NotebookLM sources directly through Claude's interface.

  - **Ease of Use**: Optimized for Claude Desktop and Perplexity Mac, moving beyond complex CLI-only workflows.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1641
  outputTokens: 777
  totalTokens: 3125
  processingTimeMs: 11249
tools:
  - name: "Claude Desktop"
    url: null
  - name: "NotebookLM"
    url: null
  - name: "Model Context Protocol (MCP)"
    url: null
  - name: "notebooklm-mcp"
    url: "https://github.com/jacob-bd/notebooklm-mcp"
  - name: "PyPI"
    url: null
  - name: "uv"
    url: null
  - name: "pip"
    url: null
  - name: "JSON"
    url: null
  - name: "Perplexity"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - claude
  - gemini
  - agents
  - automation
  - workflow
  - python
---

## Key Takeaways

This update significantly lowers the barrier for users wanting to integrate Claude with Google's NotebookLM using the Model Context Protocol (MCP).

* **PyPI Distribution**: The tool is now officially published on **PyPI**, allowing for a one-line installation using `uv tool install` or standard `pip`.

* **Automated Authentication**: The tool includes a built-in browser automation feature that handles **session cookie extraction**, removing the need for users to hunt through developer tools.

* **Claude Desktop Integration**: By modifying the Claude **config.json** file with your local system path, Claude gains the ability to "see" and interact with your notebooks natively.

* **Workflow Efficiency**: This setup allows users to perform research in Claude and instantly export or update that information into a **NotebookLM** workspace.

## Summary

The video demonstrates a significantly streamlined process for connecting **Claude Desktop** to **NotebookLM** using a custom **MCP (Model Context Protocol)** tool. Initially released as a complex developer-focused CLI tool, the creator (Jacob) has updated the package to be more accessible to general users through **PyPI distribution**. 

### Installation and Setup
Users can now install the tool using the command `uv tool install` or `pip`. This eliminates the need to manually clone Git

Hub repositories. To ensure the environment is clean, the demonstration shows using the **uv tool list** command to verify existing MCP tools. After installation, the user must run an **authentication command** which launches a browser window to automatically capture the required session cookies from NotebookLM, ensuring a secure and seamless connection.

### Configuring Claude Desktop
To enable the integration, users must point Claude Desktop to the tool's executable path. This is done by editing the Claude **settings JSON** file found in the developer tab of the app.

- Use the `which` command in the terminal to find the exact local path of the installed tool.

- Copy the provided JSON snippet from the project's documentation.

- Paste the configuration into Claude's config file, replacing placeholders with your specific system username.

### Real-World Application
Once configured, Claude can perform complex tasks within NotebookLM using natural language. The demo shows Claude listing existing notebooks and successfully adding a new source (an infographic) to a specific notebook. This integration turns Claude into an active manager for your research data. 

The creator also hints at upcoming functionality for **Perplexity for Mac**, which would allow users to conduct deep research in Perplexity and have it automatically imported into NotebookLM via this same MCP infrastructure, creating a powerful multi-AI research pipeline.

## Context

This project sits at the intersection of the growing 'Agentic AI' trend and personal knowledge management (PKM). As AI models like Claude evolve from simple chatbots into agents capable of using tools, protocols like MCP (Model Context Protocol) are becoming the standard for cross-platform interoperability. This specific integration is vital for researchers and students who use NotebookLM as a 'second brain' but prefer the reasoning capabilities of Claude. It represents a shift toward an ecosystem where different specialized AI tools can communicate and share data autonomously, reducing manual copy-pasting and administrative friction.
