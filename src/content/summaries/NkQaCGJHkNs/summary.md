---
metadata:
  videoId: "NkQaCGJHkNs"
  title: "How I Build Agentic Workflows Without Typing a Single Word"
  description: "Thanks to Wispr Flow for sponsoring! I've been using Wispr Flow, a voice-to-text tool that actually cleans up what I say as I speak, and it is a game-changer, especially to speed up coding! Download Wispr Flow by using my link with promo code PURU for an extra month of Wispr Flow Pro today: https://ref.wisprflow.ai/NickPuru


    🤖 Transform your business with AI: https://salesdone.ai

    📚 We help entrepreneurs & industry experts build & scale their AI Agency: https://www.skool.com/theaiaccelerator/about

    🤚 Join the best community for AI entrepreneurs and connect with 16,000+ members: - https://www.skool.com/systems-to-scale-9517/about


    Sign up to our weekly AI newsletter - https://ai-core.beehiiv.com/


    🙋 Connect With Me!

    Instagram -   / nicholas.puru \ 

    X - https://x.com/NicholasPuru

    LinkedIn - https://www.linkedin.com/in/nicholas-puruczky-113818198/


    0:00 - Drag-and-drop to hands-free

    0:37 - Why visual builders break

    1:41 - WisprFlow overview

    3:09 - What is Claude Code?

    4:06 - No coding required

    5:18 - Setup walkthrough

    7:10 - Agentic vs traditional workflows

    8:26 - Live build: voice-only agent

    10:47 - Claude Code builds the script

    12:25 - Running the agent live

    13:01 - Output & results

    14:18 - Faster than n8n for agents

    15:00 - The meta: voice + Claude Code"
  channel: "Nick Puru | AI Automation"
  channelId: "UC4FK5DEcMLB3CyJcbJfZEJA"
  duration: "PT16M37S"
  publishedAt: "2026-03-09T14:49:14Z"
  thumbnailUrl: "https://i.ytimg.com/vi/NkQaCGJHkNs/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=NkQaCGJHkNs"
processedAt: "2026-03-09T15:47:16.141Z"
source: "youtube"
tldr: "Build agentic AI workflows hands-free by combining Whisper Flow (speech-to-text dictation) with Claude Code (AI coding agent), demonstrated by creating a content creation agent that fetches trending news, selects the best story, and writes social media posts using only voice commands."
tools:
  - name: "Whisper Flow"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Claude"
    url: null
  - name: "Anthropic"
    url: null
  - name: "Cursor"
    url: null
  - name: "VS Code"
    url: null
  - name: "Windsurf"
    url: null
  - name: "Anti-Gravity"
    url: null
  - name: "n8n"
    url: null
  - name: "News API"
    url: null
  - name: "Python"
    url: null
  - name: "requests"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "automation"
  - "claude"
  - "productivity"
  - "python"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 13998
  outputTokens: 1125
  totalTokens: 15123
  processingTimeMs: 34812
tagsNormalizedAt: "2026-03-09T15:49:30.540Z"
---

## Key Takeaways

This video demonstrates a hands-free workflow for building AI agents using voice commands and AI coding assistants. • **Whisper Flow** enables fast, accurate speech-to-text dictation with automatic formatting, allowing you to describe workflows naturally. • **Claude Code** (by Anthropic) acts as an AI coding agent that can read projects, write code, and execute commands based on natural language instructions. • **Agentic workflows** differ from traditional automations by making decisions, adapting to new information, and handling edge cases autonomously, like a smart assistant. • Combining these tools allows non-coders to build complex automations by simply describing what they want in plain English.

## Summary

The video presents a paradigm shift from traditional drag-and-drop automation builders (like n8n) to **agentic workflows** built entirely through voice commands and AI coding agents. The presenter demonstrates building a content creation agent live, from idea to working code, without typing a single word.

The core setup involves two primary tools: **Whisper Flow**, a system-level dictation tool that converts natural speech into clean, formatted text at speeds over 170 words per minute, and **Claude Code**, an AI agent from Anthropic that can read project files, write code, run commands, and fix bugs based on natural language descriptions.

### The Live Build Demonstration

The presenter uses voice commands via Whisper Flow to instruct Claude Code to build a Python script (`content_creation.py`). The agentic workflow specification includes:

*   Accepting a niche (e.g., AI, real estate) as input.

*   Using the **requests** library and **News API** to fetch the top 10 trending headlines from the past 24 hours.

*   Using the **Anthropic Python SDK** to send headlines to **Claude**, asking it to select the single best story for a viral social media post based on criteria like broad appeal and uniqueness.

*   Having Claude generate a short viral hook, a full social media caption (100-150 words), and five relevant hashtags.

*   Saving all output to a formatted `output.md` file.

Claude Code autonomously handles the entire implementation: planning the approach, creating the necessary files (`content_creation.py`, `.env.example`), structuring the code, and managing dependencies. The presenter then runs the script (again via voice command) for the "artificial intelligence" niche, and the agent successfully fetches news, selects a story, and generates the final content.

### Key Workflow Advantages

This approach highlights several advantages over traditional visual builders:

*   **Speed and Efficiency**: Describing a complex workflow by voice is significantly faster than manually typing prompts and connecting nodes.

*   **Accessibility**: No coding knowledge is required; you only need to clearly describe the desired outcome.

*   **Agentic Capability**: The resulting system can make decisions and adapt (e.g., choosing which news story is best), unlike fixed-path automations.

*   **Flexibility**: The same voice+AI method can be used in different environments like the Claude Desktop app, **Cursor** (an AI-powered VS Code fork), or other IDEs like **Windsurf** or **Anti-Gravity**.

The presenter concludes that this combination of reliable dictation and powerful AI coding agents represents the current meta for efficient automation building, enabling significant leverage by turning spoken ideas into functional systems.

## Context

This video addresses the limitations of traditional no-code/low-code automation platforms (like n8n) for building complex, adaptive systems. As businesses and individuals seek to create 'agentic' workflows—where AI can make decisions and handle edge cases—the manual process of configuring visual nodes becomes a bottleneck. This content is crucial for entrepreneurs, automation builders, and non-technical professionals who want to leverage AI's full potential without getting bogged down in technical implementation. It connects to the broader trend of natural language becoming the primary interface for software creation and task automation.