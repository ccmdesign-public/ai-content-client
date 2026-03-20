---
metadata:
  videoId: "OmtvmPBQzkM"
  title: "Give Your Local AI Access to NotebookLM! (LM Studio + MCP)"
  description: "Stop hand-coding your MCP configs! If you're manually typing JSON to connect LM Studio to NotebookLM, you are actively wasting your build time. I just updated the NotebookLM CLI, and it now does the heavy lifting for you in seconds.


    In this video, I walk you through the brand new interactive CLI command that automatically generates and copies your exact Model Context Protocol (MCP) server configuration. No more guessing system paths or dealing with syntax errors. I'll show you how to generate the config, paste it directly into LM Studio, and get a local Qwen model talking directly to your private NotebookLM data—even if you're running it on a basic laptop!


    🚀 WHAT YOU'LL LEARN:

    ✅ How to use the new interactive `nlm setup add json` command

    ✅ The exact steps to configure LM Studio with MCP in under 60 seconds

    ✅ Proof that local, smaller LLMs can successfully manage tool-calling with your data


    🔗 RESOURCES:

    Get the CLI Tool on GitHub: https://github.com/jacob-bd/notebooklm-mcp-cli

    Download LM Studio: https://lmstudio.ai/


    If this saved you a headache, hit that Subscribe button for more no-fluff AI tutorials!


    #NotebookLM #LMStudio #LocalLLM #GenAI


    ⏱️ Chapters:

    0:00 - The New NotebookLM CLI Update

    0:44 - Why connect to LM Studio?

    1:53 - Generating the MCP JSON Config (The Easy Way)

    4:01 - Walking through the interactive setup

    5:26 - Configuring LM Studio with the new JSON

    6:10 - Important: Setting up Context Length for local models

    6:50 - Testing the connection (Local AI queries NotebookLM!)

    7:38 - Limitations of running small models locally

    8:06 - Outro"
  channel: "Gen AI Spotlight"
  channelId: "UCmElaQGQUojeNGu3Xg9urbg"
  duration: "PT8M28S"
  publishedAt: "2026-02-28T16:30:08Z"
  thumbnailUrl: "https://i.ytimg.com/vi/OmtvmPBQzkM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=OmtvmPBQzkM"
processedAt: "2026-03-10T16:34:05.435Z"
source: "youtube"
tldr: "The video demonstrates how to connect LM Studio to NotebookLM using the updated NotebookLM CLI's new JSON setup feature, which simplifies MCP configuration for local AI tools with an interactive guide and clipboard copy."
tools:
  - name: "NotebookLM"
    url: null
  - name: "LM Studio"
    url: null
  - name: "GitHub"
    url: null
  - name: "UV"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-general"
  - "automation"
  - "llm"
  - "mcp"
  - "productivity"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5938
  outputTokens: 782
  totalTokens: 6720
  processingTimeMs: 25755
tagsNormalizedAt: "2026-03-10T16:43:24.485Z"
---

## Key Takeaways

The video shows how to easily integrate local AI models with NotebookLM via MCP (Model Context Protocol).

- **NotebookLM CLI** now includes a new `JSON` setup option that interactively generates the correct MCP configuration for tools like LM Studio.

- **LM Studio** supports MCP, allowing local models to access NotebookLM's tools, but requires models capable of **tool calling** and sufficient **context window**.

- The setup process automatically copies the JSON configuration to your clipboard, eliminating manual copying errors and simplifying the connection.

## Summary

The video is a tutorial on connecting the local AI application LM Studio to NotebookLM using the Model Context Protocol (MCP). The creator has updated the NotebookLM CLI tool to simplify this process, addressing user requests for easier setup instructions.

The core update is a new `nlm setup add json` command. This launches an **interactive setup wizard** that guides users through key configuration decisions:

- Choosing between **uvx** (portable) or regular installation

- Selecting whether to use the full system path for the tool

- Determining if it's a fresh MCP setup (which includes the MCP server wrapper) or adding to an existing configuration

- **Automatically copying** the final JSON configuration to the system clipboard to prevent errors from manual terminal copying.

The tutorial then demonstrates applying this generated JSON within LM Studio. The user navigates to LM Studio's developer settings, pastes the configuration into the MCP server JSON section, and saves it.

### Important Considerations for Local Models

Success depends on the local model's capabilities. The creator notes two critical factors:

- **Tool Calling Ability:** Smaller, less capable local models often struggle with the tool calling required for MCP to function.

- **Context Window Size:** The MCP server consumes tokens, so the model must have a sufficiently large context window (much larger than the default 4k in the demo) to work properly.

In the live test, the creator uses a model called **Quinn** on a MacBook Air with 16GB RAM. After adjusting the context window settings in LM Studio, they successfully query the integrated NotebookLM MCP by asking it to 'list my notebooks,' demonstrating a functional connection.

## Context

This tutorial addresses a growing need to bridge powerful cloud-based AI notebook tools like Google's NotebookLM with locally run, private AI models. The Model Context Protocol (MCP) is emerging as a standard for connecting AI applications to external tools and data sources. For users concerned with privacy, cost, or offline access, running models locally via tools like LM Studio is appealing, but connecting them to useful ecosystems has been technically challenging. This update to the NotebookLM CLI tool significantly lowers that barrier, making local AI more practical and integrated.