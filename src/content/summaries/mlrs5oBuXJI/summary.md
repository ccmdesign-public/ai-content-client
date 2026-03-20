---
metadata:
  videoId: "mlrs5oBuXJI"
  title: "This VS Code Update Makes Web Dev Feel Like Magic"
  description: "The VS Code team has introduced a new integrated browser that upgrades the old Simple Browser by letting you open and interact with webpages directly inside VS Code, with full DevTools, logs you can add to chat in one click, element selection for AI prompt context, and screenshot support. The script demos running Scott Hanselman’s Tiny Tool Town (an Astro site), inspecting the DOM and DevTools, and comparing Simple Browser’s limitations to the new browser, which can also handle server apps and sites like github.com for scenarios such as authentication testing. It also shows enabling chat tools so a chat agent can be shared the browser, navigate and test flows (optionally using Playwright), and implement a new count-up widget across pages while repeatedly validating changes in real time.


    00:00 Productivity Boost Intro

    00:18 What the Integrated Browser Does

    01:16 Demo Setup Tiny Tool Town

    02:20 Simple Browser Basics

    03:00 Limitations and Why Upgrade

    03:12 New Integrated Browser Tour

    04:04 Make It the Default Browser

    04:28 Enable Agent Browser Tools

    04:57 Agent Driven Navigation Demo

    05:56 Build and Verify Count Up Widget

    07:45 Wrap Up and Next Steps


    Join this channel to get access to perks:

    https://www.youtube.com/channel/UCENTmbKaTphpWV2R2evVz2A/join


    👕 Buy some swag! - https://jamesmontemagno.myspreadshop.com/

    ☕️ Buy me a coffee - https://www.buymeacoffee.com/jamesmontemagno


    Follow:

    👨‍💻 GitHub: https://github.com/jamesmontemagno

    🦜 X: https://x.com/jamesmontemagno

    📄 Website: https://www.montemagno.com

    📰 Newsletter: https://newsletter.montemagno.com/


    Disclaimer: This channel, videos, and streams are created in my spare time and are a product of me... James Montemagno! They are NOT officially affiliated or endorsed by Microsoft (my employer) in any way. Opinions and views are my own.


    What is on my hat? It is the CLE clothing logo because I am from Cleveland! Checkout their awesome CLE merch: https://cleclothingco.myshopify.com/


    What is that art on my wall? It is an original piece from the French street artist Gregos of La Butte Montmartre: https://www.instagram.com/p/BceZ1oNHiQx/


    My Setup:

    📷 Canon M50 Mark II - https://amzn.to/3P8R7lp

    💡 Nanoleaf Elements Lights - https://amzn.to/3umwJVW

    🎙 Blue Spark Microphone - https://amzn.to/3qgtYkq

    🎙 Blue Pop Filter - https://amzn.to/3jEWM3r

    🤳 Rode Microphone Arm - https://amzn.to/2Z68AlE

    🎧 Sony MDR7306 Headphones - https://amzn.to/372jxta

    📲 Stream Deck - https://amzn.to/373Uk1n

    🖱 MX Master 2S Mouse - https://amzn.to/3d7J2gj

    ⌨️ Tecware Phantom Keyboard - https://amzn.to/3aUP4y9


    Using links I provide I may receive a commission if you buy something which helps support the channel.


    #vscode  #githubcopilot"
  channel: "James Montemagno"
  channelId: "UCENTmbKaTphpWV2R2evVz2A"
  duration: "PT8M45S"
  publishedAt: "2026-03-05T14:01:15Z"
  thumbnailUrl: "https://i.ytimg.com/vi/mlrs5oBuXJI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=mlrs5oBuXJI"
processedAt: "2026-03-07T20:37:12.921Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "VS Code's new integrated browser replaces the old Simple Browser, offering full dev tools, screenshot capture, and direct AI agent integration, enabling chat agents to test, navigate, and validate web applications in real time without leaving the editor."
tools:
  - name: "VS Code"
    url: null
  - name: "Astro"
    url: null
  - name: "Playwright"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
  - "Web Development"
tags:
  - "ai-coding"
  - "productivity"
  - "testing"
  - "vscode"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7237
  outputTokens: 755
  totalTokens: 7992
  processingTimeMs: 24854
tagsNormalizedAt: "2026-03-07T21:05:15.403Z"
---

## Key Takeaways

The new VS Code integrated browser significantly enhances web development workflows by merging coding, testing, and AI assistance into one environment.

*   The **integrated browser** is a major upgrade over the old Simple Browser, providing full developer tools (console, network, performance) and the ability to interact with any web page, including external sites and server applications.

*   **AI chat agents can now directly control the browser** through enabled chat tools, allowing them to navigate, test authentication flows, select page elements for context, and even run Playwright scripts for automated validation.

*   Developers can **seamlessly share browser context** (DOM snippets, screenshots, logs) with AI agents to implement features, and then have the agent automatically test and verify those changes in real time, creating a powerful feedback loop.

## Summary

VS Code has introduced a powerful new integrated browser that fundamentally changes the web development workflow by bringing a fully-featured browser environment directly into the editor. This replaces the older, limited Simple Browser extension.

### Core Browser Capabilities

The new browser provides complete developer tools, including console, network, performance, and application panels. Developers can navigate to any URL, test server-side applications and authentication flows, and interact with complex sites like GitHub.com—all within VS Code. A key feature is the ability to easily select page elements or take screenshots and instantly share that context with an AI chat panel for analysis or code generation.

### AI Agent Integration

A transformative addition is the **enable chat tools** setting. When activated, AI chat agents gain direct access to the browser's capabilities. Developers can share a browser session with an agent, which can then autonomously navigate sites, click buttons, fill forms, and validate functionality. This enables automated end-to-end testing and feature validation without manual intervention. The agent can even leverage tools like Playwright for more complex scripting if needed.

### Enhanced Development Loop

This integration creates a powerful closed-loop development cycle. A developer can describe a feature (e.g., "add a count-up widget to the homepage"), provide browser context, and the AI agent can implement the code, deploy it, launch the integrated browser, navigate to the page, and verify the widget works correctly—all in one continuous, observable process. This merges coding, previewing, and testing into a single, highly productive environment.

## Context

This update addresses the fragmented workflow of toggling between a code editor, a separate browser window, and dev tools. It is particularly relevant for developers leveraging AI assistants (like GitHub Copilot Chat or VS Code's own agents) for web development, as it provides those agents with a 'sandbox' to see and interact with the application they are helping to build. It represents a significant step towards more integrated, AI-augmented development environments where coding and validation happen simultaneously.