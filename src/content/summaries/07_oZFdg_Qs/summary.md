---
metadata:
  videoId: "07_oZFdg_Qs"
  title: "Framer to Claude Code using Framer MCP & React Export"
  description: "🤝 Join the CREATORNTWRK:

    Join me and lets build projects together!: https://discord.com/invite/vZxn6wZrDD


    🛠️ TOOLS USED:

    Framer: https://www.framer.com/?via=lukasm

    Framer MCP: https://www.framer.com/marketplace/plugins/mcp/

    React Export: https://www.framer.com/marketplace/plugins/react-export/

    Screen Studio: https://screenstudio.lemonsqueezy.com/?aff=8vBGv


    Discover how to export components from Framer templates to React and bring them into Claude Code & Cursorwith this straightforward workflow. Perfect for designers and developers looking to leverage Framer designs in new projects or prototypes.


    - Step-by-step process for exporting components from a Framer template

    - How to connect MCP and Claude to your Framer project

    - Exporting Framer site components to React using React Export

    - Setting up your project in Cursor and opening components in Claude Code

    - Creating new pages using exported components while maintaining the original design style


    Learn how to set up the Framer MCP: https://www.youtube.com/watch?v=0pDsmyXr6Fg"
  channel: "Lukas Margerie"
  channelId: "UCIZmRlV_wjS8jFQTbRxCV4g"
  duration: "PT6M54S"
  publishedAt: "2026-03-03T05:23:26Z"
  thumbnailUrl: "https://i.ytimg.com/vi/07_oZFdg_Qs/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=07_oZFdg_Qs"
processedAt: "2026-03-03T15:10:56.232Z"
source: "youtube"
tldr: "This video demonstrates a workflow using the Framer MCP connector and React Export plugin to extract React components from a Framer template, then use Claude Code to generate new pages while preserving the original design system."
tools:
  - name: "Framer"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Framer MCP"
    url: null
  - name: "React Export"
    url: null
  - name: "Cursor"
    url: null
  - name: "Claude Desktop"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "ai-coding"
  - "claude"
  - "mcp"
  - "react"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6262
  outputTokens: 850
  totalTokens: 7112
  processingTimeMs: 30743
tagsNormalizedAt: "2026-03-04T16:09:20.123Z"
---

## Key Takeaways

This tutorial shows how to bridge visual design tools with AI-assisted development. Key insights include:

*   **Export Framer designs as React components** using the React Export plugin (requires a $1 trial subscription).

*   **Connect Claude Code to your Framer project** via the Framer MCP connector, enabling the AI to understand your component library.

*   **Generate new, styled pages instantly** by prompting Claude to use the exported components, maintaining design consistency.

*   **Leverage the Framer template marketplace** as a source of high-quality, reusable design systems for rapid prototyping.

## Summary

The video outlines a practical workflow for transitioning from visual design in Framer to code-based development using AI. The process begins by selecting a Framer template from the marketplace—the creator chooses the 'Dedasco' template for its unique visual style—and installing it in a workspace.

**Connecting Framer to Claude**
The core of the workflow is the **Framer MCP (Model Context Protocol) connector**. After installing this plugin in Framer, you copy a connection URL into the settings of the Claude Desktop app (or Claude Code Max). This allows Claude to access and understand the components within the specific Framer project.

**Exporting Components to React**
Once connected, you can ask Claude to export the site to React. This functionality is powered by the separate **React Export** plugin, created by the same developer (Tommy). A key prerequisite is activating a 7-day trial subscription for React Export for $1. After setup, running the provided terminal commands generates a local React project containing all the individual components (like cards, buttons, and navigation elements) from the Framer design.

**Generating New Pages with AI**
With the component library now available as code, you can open the project in an editor like Cursor or directly in Claude Code. The creator demonstrates this by prompting Claude: 'create a separate page that shows the pricing for a SaaS app that allows users to track clicks through their website... use the same components... and maintain the exact same design style.' Claude successfully generates a new `pricing.page.tsx` file that uses the exported components (navbar, pricing cards, buttons, FAQ section) to create a cohesive new page that matches the original template's aesthetic.

This workflow transforms the Framer template marketplace into a vast repository of reusable, AI-ready design systems, enabling rapid prototyping and ideation beyond Framer's native environment.

## Context

This matters because it bridges the gap between no-code visual design tools and custom, code-based development. Designers and developers can now start with high-quality, pre-made design systems from Framer and seamlessly transition them into a codebase where they can be extended, customized, and integrated into larger applications using AI assistance. It speaks to the broader trend of AI acting as a co-pilot that understands both design intent (via MCP) and code implementation, dramatically speeding up the front-end development process.