---
metadata:
  videoId: "AUNzWyjYIi0"
  title: "AntiGravity + Stitch NEW Agent Skills LOOP Builds Sites Autonomously!!!"
  description: "Stitch Agent Skills + Antigravity | AI Builds Your Entire Site Autonomously


    Google's Stitch team just dropped two game-changers: the Self-Building Loop and API Keys. In this video, I show you how to set up Stitch Agent Skills in Antigravity and watch an AI build an entire website autonomously — designing, coding, and verifying each page in a real browser.


    🔗 LINKS:


    Stitch Web App: https://stitch.withgoogle.com

    Stitch Agent Skills (GitHub): https://github.com/google-labs-code/stitch-skills

    Stitch MCP Docs: https://stitch.withgoogle.com/docs/mcp/setup


    if you are having issues with the MCP server, please check this out


    https://github.com/davideast/stitch-mcp


    Individual Skills:

    - design-md: https://github.com/google-labs-code/stitch-skills/tree/main/skills/design-md

    - stitch-loop: https://github.com/google-labs-code/stitch-skills/tree/main/skills/stitch-loop

    - react-components: https://github.com/google-labs-code/stitch-skills/tree/main/skills/react-components

    - enhance-prompt: https://github.com/google-labs-code/stitch-skills/tree/main/skills/enhance-prompt


    ⏱️ TIMESTAMPS:

    0:00 - Hook + Demo Preview

    1:15 - The Problem with AI Site Building

    2:30 - Setup: API Keys + MCP Config

    4:30 - Stitch Agent Skills Explained

    6:30 - Live Demo: Self-Building Loop

    8:30 - Wrap-up + What's Next



    💬 Let me know in the comments:

    What would YOU build with this? A portfolio? Landing page? Internal dashboard? Drop your ideas below!


    🔔 Don't forget to:

    • Subscribe for more AI & web development tutorials

    • Hit the like button if you found this helpful

    • Share with anyone interested in AI-powered development


    AI #WebDevelopment #Stitch #GoogleLabs #NoCode #AITools #WebDesign #Automation #MCP #AntiGravity"
  channel: "AI with Surya"
  channelId: "UCz80JEs56coMRDd5OzYe_lw"
  duration: "PT13M28S"
  publishedAt: "2026-01-31T01:00:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/AUNzWyjYIi0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=AUNzWyjYIi0"
processedAt: "2026-03-24T18:26:55.117Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Stitch's new self-building loop feature, combined with its simplified API setup, allows AI agents to autonomously design, code, and verify entire multi-page websites by extracting design styles from existing projects and continuously iterating without human intervention."
tools:
  - name: "Stitch"
    url: "https://stitch.google.com"
  - name: "AntiGravity"
    url: null
  - name: "Model Context Protocol (MCP)"
    url: null
  - name: "Cursor"
    url: null
  - name: "VS Code"
    url: null
  - name: "Cloud Code"
    url: null
  - name: "Google Cloud"
    url: null
  - name: "GitHub"
    url: null
  - name: "Chrome"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "machine-learning"
  - "mcp"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 10752
  outputTokens: 1003
  totalTokens: 11755
  processingTimeMs: 25995
tagsNormalizedAt: "2026-03-24T22:56:24.299Z"
---

## Key Takeaways

The video demonstrates how to leverage Stitch's new agent skills for autonomous website creation. Key insights include:

*   **Self-building loop** automates end-to-end website creation from a single prompt, handling design, coding, and browser-based verification.

*   **Simplified API setup** replaces complex G-Cloud commands with a simple API key generation in Stitch settings for easy integration with AI tools.

*   **Design extraction** via the **design MD skill** allows the AI to analyze existing projects or websites to capture and replicate design systems automatically.

*   **Agent autonomy** shifts the user role from orchestrator to overseer, as the agent makes design decisions and iterates through the build-verify loop independently.

## Summary

The video showcases the integration of Stitch, a design tool from Google, with the AI agent platform AntiGravity to demonstrate autonomous website building. The core innovation is Stitch's new **self-building loop** capability, which enables an AI agent to create a complete multi-page website from a single instruction.

### Simplified Setup and Integration

Previously, connecting tools to Stitch required complex G-Cloud commands. The new process is drastically simplified: users generate an API key directly in the Stitch settings. This key is then configured within AntiGravity using the **Model Context Protocol (MCP)**, instantly providing the agent access to all of Stitch's capabilities, such as creating projects and generating screens from text.

### The Autonomous Workflow

The demonstration follows a two-step workflow powered by Stitch's new **agent skills**, available via a public GitHub repository. First, the **design MD skill** is used. The agent is prompted to analyze an existing Stitch project with a modern dark theme. It autonomously fetches the project's metadata and code, then generates a detailed `design.md` file that synthesizes the project's semantic design system, including components, typography, and color schemes.

Second, the **Stitch loop skill** is activated. The agent reads the generated `design.md` file and the loop skill's instructions. It then uses the Stitch MCP to start building. The agent creates an implementation plan, writes the necessary prompts for screen generation, and executes them. Crucially, it enters a **build-verify loop**: after generating a screen, it opens a browser to verify the output, refines its approach based on the results, and continues iterating autonomously.

### The Shift in User Role

The process highlights a significant shift. The user provides a high-level design reference and a goal (e.g., "create a landing page"). The agent then makes tactical decisions—like choosing between a 60/40 split layout or a full-width immersive layout based on the design principles it extracted—and executes the entire process. The user transitions from a hands-on orchestrator to a supervisor, watching the agent build, test, and finalize the project independently.

## Context

This demonstration is significant in the rapidly evolving field of AI-assisted development and design. It represents a move beyond AI as a co-pilot that requires continuous prompting, towards **autonomous agentic workflows**. For web developers, designers, and product teams, this technology promises to drastically reduce the time and repetitive effort involved in translating design systems into functional, verified UI code. It connects broader trends in AI agent platforms (like AntiGravity), standardized tool protocols (MCP), and design-to-code automation.