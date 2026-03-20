---
metadata:
  videoId: "KrgLCrvU1dw"
  title: "I Built an AI That Turns Code Into Cinematic Videos (Codex + NotebookLM)"
  description: "This is SO cool! My custom NotebookLM MCP connected to Codex just changed the game forever, and it's doing things that shouldn't even be possible yet.


    In this video, I reveal the custom NotebookLM MCP and CLI I built to give Codex God-tier access to NotebookLM.\ 


    I walk you through the exact setup to inject this MCP, CLI and Agent skill directly into Codex. But here is where it gets absolutely insane: I feed a massive codebase to Codex and command it to spin up a custom NotebookLM. From there, it auto-generates a stunning presentation explaining the architecture AND produces a full cinematic video using brand-new functionality.\ 


    This isn't just coding; this is an entire project visualization on autopilot.\ 


    🔥 Key Takeaways:

    • ⚙️ How to set up my custom NotebookLM MCP, CLI and skill with Codex.

    • 🧠 The exact prompt workflow to force Codex to scan and digest entire codebases.

    • 🚀 How to leverage NotebookLM features to auto-generate slides and cinematic videos from raw code for your project, either code or anything else


    🔗 Resources:

    Get the custom MCP on GitHub: https://github.com/jacob-bd/notebooklm-mcp-cli/

    Join the Gen AI Spotlight AI News Channel on Telegram: https://t.me/genaispot/

    Follow GenAI Spotlight on Instagram: https://www.instagram.com/genaispotlight/

    Follow GenAI Spotlight on TikTok: https://www.tiktok.com/@genai.spotlight

    Follow GenAI Spotlight on X: https://x.com/GenAISpotlight\ 



    ⏱️ Chapters:

    0:00 You Are Documenting Code Wrong

    0:45 What is Codex and what's new in NotebookLM MCP?

    2:26 CLI Setup & Injecting the Skill into Codex

    3:04 Installing the MCP on all tools on your system

    3:33 Adding the MCP to Codex

    4:14 Adding the NLM Skill to Codex

    4:42 Testing the MCP with Codex CLI

    6:28 Testing the MCP with Codex App

    7:45 Asking Codex to create slides and video from codebase

    10:50 Overview of the Slide Revision feature in NotebookLM

    12:38 Reviewing the NotebookLM and resources created by Codex

    13:05 The NotebookLM Cinematic Video (Sample)


    #NotebookLM #Codex #AITools2026 #GenAI"
  channel: "Gen AI Spotlight"
  channelId: "UCmElaQGQUojeNGu3Xg9urbg"
  duration: "PT14M12S"
  publishedAt: "2026-03-11T19:00:31Z"
  thumbnailUrl: "https://i.ytimg.com/vi/KrgLCrvU1dw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=KrgLCrvU1dw"
processedAt: "2026-03-12T16:06:41.245Z"
source: "youtube"
tldr: "This video demonstrates how to integrate OpenAI Codex with NotebookLM using the new MCP (Model Context Protocol), enabling automatic codebase analysis, notebook creation, slide generation, and cinematic video production from a single prompt."
tools:
  - name: "OpenAI Codex"
    url: null
  - name: "NotebookLM"
    url: null
  - name: "notebookm CLI"
    url: null
  - name: "Claude"
    url: null
  - name: "Cursor"
    url: null
  - name: "Gemini"
    url: null
  - name: "uv"
    url: null
  - name: "pip"
    url: null
  - name: "pex"
    url: null
  - name: "uvx"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "content-creation"
  - "llm"
  - "mcp"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8404
  outputTokens: 890
  totalTokens: 9294
  processingTimeMs: 21873
tagsNormalizedAt: "2026-03-12T16:15:16.582Z"
---

## Key Takeaways

The video showcases a powerful integration between AI coding tools and knowledge management platforms, enabling automated documentation workflows.

- **OpenAI Codex** can now be configured with **NotebookLM's MCP** for seamless interaction between coding environments and knowledge bases.

- A single prompt can trigger a full workflow: code analysis → notebook creation → slide generation → cinematic video production.

- New **slide revision features** in NotebookLM allow per-slide editing and PowerPoint export, while **cinematic video overviews** (currently Ultra-only) create professional video summaries.

- The **notebookm CLI tool** simplifies MCP setup across multiple AI tools (Codex, Cursor, Claude, Gemini) with automatic system scanning and configuration.

## Summary

The video demonstrates the integration of OpenAI Codex with NotebookLM through the Model Context Protocol (MCP), creating a powerful workflow for automated documentation and presentation generation.

### Integration Setup

The presenter shows how to use the **notebookm CLI tool** to automatically configure MCP connections between NotebookLM and supported AI tools. By running `nlm setup add all`, the system scans for installed AI tools (including Codex, Claude, Cursor, Gemini) and prompts for MCP installation. Once configured, Codex can access NotebookLM functionality directly through both its CLI and desktop applications.

### Automated Documentation Workflow

The core demonstration involves a complex prompt where Codex analyzes a codebase (CC Claw project), creates a dedicated NotebookLM notebook with extracted information, generates presentation slides for non-technical audiences, and finally produces a cinematic video overview. This showcases how AI can automate the entire documentation pipeline from code understanding to multi-format output creation.

### New NotebookLM Features

The video highlights several recent NotebookLM additions:

- **Slide revision capabilities** allowing per-slide editing with natural language commands

- **PowerPoint export functionality** for created presentations

- **Cinematic video overviews** that transform project explanations into professional video format (currently limited to Ultra tier users)
- **Shared skill system** where MCP configurations and skills sync across Codex CLI and desktop applications

### Practical Implementation

The presenter demonstrates the complete workflow live, showing how authentication is handled automatically in the background despite NotebookLM's 20-minute token expiration. The integration allows Codex to use NotebookLM's MCP for operations like listing notebooks, creating content, and managing slides, creating a seamless bridge between coding and knowledge management environments.

## Context

This integration represents the convergence of AI coding assistants and knowledge management platforms, addressing the growing need for automated documentation and presentation generation. Developers, technical writers, and product managers will find this valuable for creating project documentation, onboarding materials, and stakeholder presentations without manual effort. It reflects broader trends in AI workflow automation where single prompts can trigger complex multi-step processes across different tools and formats.