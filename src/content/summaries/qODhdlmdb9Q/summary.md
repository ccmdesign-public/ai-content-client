---
metadata:
  videoId: "qODhdlmdb9Q"
  title: "MCP is Dead And Nobody Saw this coming.."
  description: "Register for the webinar - https://theaiaccelerators.com/register


    🤖 Transform your business with AI: https://salesdone.ai

    📚 We help entrepreneurs & industry experts build & scale their AI Agency: https://www.skool.com/theaiaccelerator/about

    🤚 Join the best community for AI entrepreneurs and connect with 16,000+ members: - https://www.skool.com/systems-to-scale-9517/about


    Sign up to our weekly AI newsletter - https://ai-core.beehiiv.com/


    🙋 Connect With Me!

    Instagram -   / nicholas.puru \ 

    X - https://x.com/NicholasPuru

    LinkedIn - https://www.linkedin.com/in/nicholas-puruczky-113818198/


    0:00 - Perplexity & YC CEO ditching MCP

    2:21 - What is a CLI?

    3:19 - MCP vs CLI explained

    4:31 - Tool 1: GWS CLI (Google Workspace)

    7:17 - Security & model armor

    10:15 - Installing with Claude Code

    12:47 - Tool 2: CLI Anything

    17:49 - Limitations & caveats

    19:32 - The bigger picture"
  channel: "Nick Puru | AI Automation"
  channelId: "UC4FK5DEcMLB3CyJcbJfZEJA"
  duration: "PT21M18S"
  publishedAt: "2026-03-21T16:28:36Z"
  thumbnailUrl: "https://i.ytimg.com/vi/qODhdlmdb9Q/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=qODhdlmdb9Q"
processedAt: "2026-03-24T03:40:27.171Z"
source: "youtube"
tldr: "The video argues that MCP is being replaced by CLI-first approaches for AI agents, citing Perplexity's abandonment of MCP and the launch of two major CLI projects: Google Workspace CLI for unified Google tool control and CLI Anything for automatically generating CLIs from open-source software codebases."
tools:
  - name: "MCP"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Cursor"
    url: null
  - name: "VS Code"
    url: null
  - name: "Google Workspace CLI (GWS)"
    url: null
  - name: "CLI Anything"
    url: null
  - name: "Playwright"
    url: null
  - name: "Blender"
    url: null
  - name: "Audacity"
    url: null
  - name: "LibreOffice"
    url: null
  - name: "OBS Studio"
    url: null
  - name: "Stable Diffusion"
    url: null
  - name: "Comfy UI"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "mcp"
  - "open-source"
  - "productivity"
  - "terminal"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 17409
  outputTokens: 1065
  totalTokens: 18474
  processingTimeMs: 30453
tagsNormalizedAt: "2026-03-24T04:11:51.597Z"
---

## Key Takeaways

The video details a major shift in how AI agents interface with software, moving away from the MCP protocol towards direct CLI control. Key insights include:

*   **MCP is falling out of favor** due to context window bloat and authentication friction, as evidenced by Perplexity's CTO and Y Combinator's CEO publicly criticizing it.

*   **CLI-first is the new paradigm** because AI agents already operate in terminals, making CLIs a native, low-overhead interface.

*   **Two new tools exemplify this shift**: Google Workspace CLI provides a single, secure CLI for all Google services with built-in workflows, while CLI Anything can automatically generate a CLI for any open-source software by analyzing its source code.

## Summary

The video opens by highlighting a significant industry shift: key figures like Perplexity's CTO and Y Combinator's CEO are publicly moving away from the Model Context Protocol (MCP) for connecting AI agents to tools, citing inefficiencies. The core problem with MCP is that it forces all tool definitions, schemas, and authentication details into the agent's context window, consuming memory and creating friction before work even begins.

In contrast, a **CLI-first approach** offers a direct line from the AI agent to the tool. The agent simply runs a terminal command and receives structured JSON back, eliminating the middleware and context bloat. This is the native environment for terminal-based agents like Claude Code.

### Google Workspace CLI (GWS)

The first major project demonstrating this is the **Google Workspace CLI (GWS)**, an open-source tool from Google. It provides a single command-line interface for Gmail, Drive, Sheets, Calendar, and other Workspace services. Key features include:

*   **Dynamic API discovery**: It reads Google's discovery service at runtime, so it automatically supports new APIs without updates.

*   **Over 100 built-in skills**: Pre-built, multi-step workflows for roles like executive assistants or project managers.

*   **Enterprise-grade security**: Credentials are encrypted, and a `sanitize` flag (Model Armor) scans API responses for prompt injection attempts before they reach the AI agent.

### CLI Anything

The second project is **CLI Anything** from Hong Kong University's Data and Intelligent Labs. This tool solves a different problem: creating CLIs for software that doesn't have one. It works by:

*   Analyzing the source code of any open-source application (e.g., Blender, Audacity, LibreOffice).

*   Running a seven-phase automated pipeline to design, implement, test, and document a fully functional CLI.

*   Generating a CLI that allows AI agents to control the *actual backend* of the software, not a limited wrapper. The tool already has over 1,500 passing tests across 11 applications.

Together, these tools represent both sides of the new CLI ecosystem: a polished, secure product for a major platform (Google) and a factory for generating CLIs for the vast open-source world. This shift means AI agents can now control almost anything through the terminal with far less overhead than MCP required.

## Context

This matters because the way AI agents connect to and control software is foundational to building effective automations and workflows. For developers, AI engineers, and businesses implementing AI, the choice of interface protocol (MCP vs. CLI) directly impacts agent performance, cost (via context window usage), scalability, and security. This shift signals a move towards more efficient, native integration methods as AI agents move from prototypes to production-grade tools.