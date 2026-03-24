---
metadata:
  videoId: "XfezMs8B-O8"
  title: "AI + Design Systems in 2026: The Workflow I Actually Use"
  description: "In this video, I walk through how I use AI to support a real design system in 2026. This is not about AI replacing design work. It's about where AI actually fits in day-to-day design system workflows.


    I cover the current state of the AI and design systems ecosystem, what is worth paying attention to, and what is mostly noise. Then I show the workflows I use to support audits, documentation, governance, and quality checks so the system stays maintainable as it scales.


    If you work with tokens, components, or multi-brand systems, this should give you a clear, practical view of how AI can support the work without getting in the way.


    🔗 KEY LINKS

    📣 JOIN THE COMMUNITY: https://uicollective.co/\ 


    Why Join UI Collective Academy? Get access to premium courses, premium downloads, and so much more on the way (I am largely building this solo...trying to make design education available for all, support goes a long way!)


    ↪️ Need a design system? (also included in the academy): https://collectivekit.co/


    🔗 VIDEOS TO WATCH

    Build a Design System: https://youtu.be/opTANvl9G1g

    Complex Design System Setup: https://youtu.be/L-tpK7Eeuow


    🔗 MORE LINKS

    Let us build or fix your design system: https://designsystemlabs.co/

    kirkland@uicollective.co

    📣 Save 20% on the Annual Mobbin plan: http://mobbin.com/uicollective


    0:00 An Introduction

    1:20 What can AI not do?

    2:20 Current tooling limitations

    4:08 Building design tokens with AI?

    5:02 Build designs with AI using your design system

    5:15 Figma Make Limitations

    7:14 Using AI in my current workflow

    7:30 Figma MCP Setup with Cursor

    8:38 Design System Consistency

    9:11 Design Token Logistics

    10:54 Building Cursor rule for our Figma Variables

    13:27 Building Cursor command

    18:36 Prepping Figma Component

    19:47 Testing our AI Workflow

    21:12 Generating Design System Documentations

    22:43 Building Cursor Rule for our Docs

    25:34 Building Cursor Command for our Docs

    29:47 Testing our Workflow

    31:02 Outro"
  channel: "UI Collective"
  channelId: "UCBB1ZWZyf0RaKuHgpTjpcug"
  duration: "PT31M50S"
  publishedAt: "2026-01-26T14:01:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/XfezMs8B-O8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=XfezMs8B-O8"
processedAt: "2026-03-24T18:22:18.033Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Design system expert Kirk from UI Collective demonstrates that current AI tools cannot reliably build design systems or components from scratch in Figma, but shows two practical workflows using Cursor AI with Figma MCP integration to audit variable usage and generate documentation, significantly speeding up design system maintenance."
tools:
  - name: "Cursor"
    url: "https://cursor.com"
  - name: "Figma"
    url: null
  - name: "Figma MCP"
    url: null
  - name: "Figma Make"
    url: null
  - name: "Zero Height"
    url: null
  - name: "Supernova"
    url: null
categories:
  - "Product & Design"
tags:
  - "design-systems"
  - "figma"
  - "ui"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 22958
  outputTokens: 1584
  totalTokens: 24542
  processingTimeMs: 236844
tagsNormalizedAt: "2026-03-24T22:58:49.647Z"
---

## Key Takeaways

Kirk from UI Collective shares his 2026 AI-powered design system workflow, focusing on practical applications over hype.

*   **Current AI limitations are significant**: AI cannot build variable libraries from scratch, create Figma designs using actual design system components, or build proper components with auto-layout—tools claiming otherwise often require more cleanup than building from scratch.

*   **The core value is in auditing, not generation**: The most effective current use of AI is as a "design system assistant" to audit existing designs and components for correct variable, token, and style application, catching errors before handoff.

*   **A two-part workflow with Cursor and Figma MCP**: First, create reusable AI commands to check variable application by feeding it design token rules. Second, generate lightweight design system documentation by having AI analyze components and produce structured markdown.

*   **Focus on reusable commands, not one-off prompts**: Build saved commands in Cursor (like "check variables" and "generate documentation") that can be run repeatedly with different Figma links, creating a scalable audit and documentation system.

## Summary

### Introduction and Current AI Limitations

Kirk from UI Collective introduces the video as part of an evolving series on AI in design systems for 2026. He immediately grounds the discussion in reality, outlining three key areas where AI currently fails for design system work within Figma. First, AI cannot build a variable library from scratch for a new project. Second, it cannot build Figma designs using actual design system components—tools like Figma Make may generate designs but they don't properly apply variables or use components, resulting in broken, hard-coded elements that require complete rebuilding. Third, AI-generated "components" tend to use groups instead of auto-layout frames, making them unusable in a professional workflow. Kirk's central warning is clear: don't trust any tool that claims to build perfect components or designs using your system, as you'll spend more time fixing its output than building from scratch.

### The Practical AI Workflow: Setup with Cursor and Figma MCP

Kirk shifts from what AI *can't* do to what he *actually uses it for*. His entire workflow centers on **Cursor**, an AI-powered code editor, connected to Figma via the **Figma MCP (Model Context Protocol)** server. He provides a step-by-step guide: download Cursor, navigate to the Figma MCP catalog, add it to Cursor, and authenticate the connection. This setup allows the AI within Cursor to read and analyze any Figma file link you provide it, creating a bridge between the visual design environment and the AI's analytical capabilities. This technical foundation is crucial for both of his primary use cases.

### Use Case 1: AI-Powered Design System Auditing

The first and most valuable application is auditing designs for correct design system application. Kirk's process starts with having a well-structured token table in Figma (token name, light/dark mode values, and a description). He copies the link to this table into Cursor and prompts the AI to analyze it and build a **Cursor project rule**. This rule teaches the AI all the tokens and their intended usage guidelines.

Next, he creates a reusable **Cursor project command** called "check variables." This command contains step-by-step instructions for the AI: identify what's being shared (page or component), analyze the UI holistically, identify all surfaces, borders, text colors, and icon colors, review variables in context against the established rules, and call out what is wrong, with one line per issue. He demonstrates this by creating a test button in Figma with intentionally wrong variables (e.g., a border variable applied to text, a hard-coded hex value for a border). He copies the component link, runs the "check variables" command with it, and the AI instantly returns a precise audit: "Text is using a border variable. Text should use a text token. Text primary on color" and "Border is hardcoded (#E5E7EB). Should use border.default.subtle." This scales infinitely, allowing for rapid audit of entire dashboards before developer handoff.

### Use Case 2: Generating Design System Documentation

The second workflow is generating foundational documentation for design system components. Kirk again creates a Cursor rule titled "design system documentation" that instructs the AI to document what exists without redesigning it, use plain language, describe what the component is, where it's used, and why it exists, and to confirm any assumptions rather than guessing.

He then builds a corresponding "generate documentation" command. This command directs the AI to: identify what's being documented, review it as a whole (what problem it solves, where it appears, what makes it different from similar items), and write documentation using a specific format (name, purpose, when to use, when not to use, accessibility guidelines, properties, notes). The output is set to generate a markdown file with one section per item, avoiding opinions or new rules. He demonstrates by selecting a button variant from his design system, pasting the link into the command, and receiving structured documentation covering variants, use cases, states, behavior, and props. He clarifies this output is not a final documentation site but provides the core structured content that can be copied into tools like ZeroHeight or Supernova, saving immense time on the initial drafting phase.

### Conclusion and Future Outlook

Kirk concludes by stating these are the only two ways he consistently uses AI in his design system work today, emphasizing he won't recommend tools he doesn't personally use. He acknowledges the space is rapidly evolving and promises future videos as new, genuinely valuable tools and Figma features emerge. The series is positioned as a practical, hype-free guide for design system professionals looking to integrate AI where it actually provides ROI today: in quality assurance and documentation acceleration.

## Context

Kirk is a design system expert and the creator behind the UI Collective channel and academy, which focuses on professional design system education, Figma mastery, and product design. This video contributes to the ongoing and often overhyped conversation about AI's role in creative and design workflows. It's particularly relevant in early 2026 as AI tools are proliferating but their practical, day-to-day value for specialized tasks like design system management is still being defined. The video cuts through marketing claims to provide a sober, expert assessment of what actually works. It would benefit most practicing product designers, design system leads, and UX managers who are being pressured to adopt AI tools and need proven, efficient workflows that integrate with their existing Figma-centric processes without introducing unreliable magic or extra complexity.