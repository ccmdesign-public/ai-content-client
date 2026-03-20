---
metadata:
  videoId: "w4RY7PnfRU8"
  title: "I Watched 6 AI Agents Design an App Together And It Blew My Mind | Tom Krcha"
  description: "Tom is the CEO of Pencil, one of the coolest AI design tools that I’ve ever tried. Watching 6 AI agents design a beautiful app in real-time will genuinely blow your mind. Tom showed me how it all works under the hood (a simple JSON file?!) and how you can use Pencil to design right where you code in Cursor, Claude Code, and more.


    Tom and I talked about:

    (00:00) Watch 6 AI agents design an app together

    (03:09) Demo: Designing a travel app with an AI agent swarm

    (08:20) Redesigning screens in different styles on the fly

    (13:20) The Pencil extension that turns Cursor into a design tool

    (15:07) One prompt to go from visual design to React website

    (19:00) Using design systems to keep your AI output consistent

    (22:02) From side project to 100K users in 8 weeks

    (27:44) Why vibe coding reminds Tom of the Flash era

    (30:05) Humanizing AI with cursors, craft, and personality


    Thanks to our sponsors:

    Linear: The AI agent platform for modern teams https://linear.app/behind-the-craft

    Granola: The AI meeting notes app that saves you hours. https://granola.ai/peter

    Replit: From 0 to full stack app in 2 min https://replit.com/?utm_source=creator&utm_medium=organic&utm_campaign=creator_program&utm_content=peteryang


    Get the takeaways: https://creatoreconomy.so/p/i-watched-6-ai-agents-design-an-app-in-real-time-tom-krcha


    Where to find Tom:

    X: https://x.com/tomkrcha

    Website: https://www.pencil.dev/


    Subscribe to this channel - more interviews coming soon!"
  channel: "Peter Yang"
  channelId: "UCnpBg7yqNauHtlNSpOl5-cg"
  duration: "PT32M43S"
  publishedAt: "2026-03-08T13:01:39Z"
  thumbnailUrl: "https://i.ytimg.com/vi/w4RY7PnfRU8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=w4RY7PnfRU8"
processedAt: "2026-03-11T15:38:25.216Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Pencil is an AI-powered visual design tool where a swarm of agents collaboratively designs apps in real-time, using a platform-agnostic JSON format (pen files) that can be converted to code, revolutionizing the creative workflow by making AI agents visible and interactive through on-screen cursors."
tools:
  - name: "Pencil"
    url: null
  - name: "Cursor"
    url: null
  - name: "VS Code"
    url: null
  - name: "Claude"
    url: null
  - name: "Claude Composer"
    url: null
  - name: "Windsurf"
    url: null
  - name: "Linear"
    url: "https://linear.app/agents"
  - name: "Figma"
    url: null
  - name: "React"
    url: null
  - name: "Next.js"
    url: null
  - name: "Tailwind CSS"
    url: null
  - name: "Swift"
    url: null
  - name: "Kotlin"
    url: null
  - name: "React Native"
    url: null
  - name: "Git"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "product-management"
  - "ui"
  - "ux"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 23635
  outputTokens: 1866
  totalTokens: 25501
  processingTimeMs: 91941
tagsNormalizedAt: "2026-03-12T16:11:58.206Z"
---

## Key Takeaways

Pencil CEO Tom Krcha demonstrates a paradigm shift in AI-assisted design, moving from linear, text-based prompting to a visual, collaborative canvas where multiple AI agents work in parallel.

*   **Swarm Mode enables parallel AI collaboration:** The new 'swarm' feature allows multiple AI agents (e.g., six) to work simultaneously on different screens, dramatically speeding up the design process and enabling true exploratory design.

*   **The pen file is an agentic, platform-agnostic format:** The core innovation is a JSON-based file format (.pen) that serves as a universal design descriptor, allowing designs to be converted into any target codebase (React, Swift, etc.) and facilitating handoff between humans and agents.

*   **Visual-first workflow keeps humans in the creative flow:** Unlike traditional 'vibe coding' where you wait for code generation, Pencil's canvas allows for real-time visual editing and iteration *while* AI agents are working, enabling immediate feedback and adjustment.

*   **Humanizing AI through visible cursors creates a profound experience:** The simple UI addition of showing each agent's cursor as it works on the canvas humanizes the AI, making the collaborative process transparent, understandable, and emotionally resonant.

*   **The tool democratizes creation beyond traditional roles:** Pencil is used not just by designers and engineers, but also by PMs, marketers, and entrepreneurs, empowering a new wave of 'makers' to visually prototype and build their ideas.

*   **It integrates deeply with the existing AI coding ecosystem:** Pencil works as a standalone app and as plugins for VS Code, Cursor, and other AI coding tools, allowing users to leverage their preferred AI models (like Claude Opus or Composer) within the visual design environment.

## Summary

### Introduction and Product Demo

Peter Yang hosts Tom Krcha, CEO of Pencil, an AI product that fundamentally reimagines the design and prototyping process. The core premise is a visual canvas where a 'swarm' of AI agents can collaboratively design applications based on a simple text prompt. The demonstration begins with a request to design a mobile travel log app for Oceania. Tom activates 'swarm mode,' specifying six agents to work on three screens. The most immediately striking aspect is the visualization: each AI agent is represented by a cursor moving on the canvas, making their parallel work visible and tangible. This simple UI choice—showing the cursors—is highlighted as a breakthrough in humanizing AI, creating the feeling of a collaborative team rather than an opaque automated process.

The agents analyze the request, create a to-do list, pick a style guide, and distribute work autonomously. Tom explains this represents true parallelism with the same role, where agents figure out how to split non-conflicting work, offering a potential 3x speed increase over serial AI workflows. The design process is exploratory, allowing for rapid generation of multiple variations side-by-side, which mirrors how human designers ideate before converging on a final concept.

### The Core Technology: The Pen File and Platform Agnosticism

The foundational technology powering Pencil is the **pen file** (.pen), a JSON-based, platform-agnostic design format built 'agentic from the ground up.' This file is not tied to any specific output (like HTML or SwiftUI) but is a universal descriptor of the design's structure, components, and styles. This allows the same design to be converted into React/Next.js for a website, Swift for iOS, Kotlin for Android, or even imported into tools like Figma via community-built plugins.

The pen file is intended to be the source of truth, living in git and enabling collaboration. It contains variables (like a CSS file) and reusable component libraries, ensuring design consistency. The format's simplicity (just JSON) means any AI agent can read and write to it, and it can be integrated into various workflows. Tom likens it to an 'agentic PDF'—a document format designed for the AI era.

### Integration with Coding Tools and the Full Workflow

Pencil is not just a standalone design tool; it deeply integrates with the AI coding ecosystem. It has plugins for VS Code, Cursor, Windsurf, and others. Tom demonstrates opening a .pen file directly inside Cursor, where it renders in a custom visual editor. From there, he can use Cursor's agent (like the fast 'Composer' model) to make edits directly to the visual design via chat (e.g., 'turn this selected frame into light mode').

The final step is code generation. From within Cursor, he can prompt an agent (like Claude Opus) to 'generate code for this frame in React Tailwind Next.js and run it on port 8080.' The agent reads the pen file's JSON, understands the visual design, and generates the corresponding functional code and server, resulting in a live, rendered website in minutes. This bridges the gap between visual design and implementation without leaving the developer's environment.

### Philosophy, Impact, and Future Vision

The conversation delves into the philosophy behind Pencil. Tom contrasts it with traditional 'vibe coding,' which he describes as linear and serial, often pulling users out of the creative flow as they wait for generation and struggle to make tweaks via text prompts. Pencil's canvas-centric approach keeps the human 'in the flow,' allowing them to draw, tweak, and edit visually in real-time, even as agents work. This is identified as a major shift in human-AI collaboration.

The product has seen rapid adoption, reaching 100,000 users shortly after its full launch. Its user base is surprisingly broad, including designers, engineers, product managers, and even marketers who use it with tools like Cursor to rebuild websites and marketing materials. It empowers 'makers' across roles to prototype visually before committing to code.

Tom's background—from Adobe evangelist to founder of a video conferencing startup—informs his vision. He sees parallels with Macromedia Flash, which also combined design and code in one environment, and believes AI is bringing back that accessible, creative fun that was lost in the complexity of modern frameworks.

Looking forward, Tom is excited by the possibilities opened up by making AI visible and 'human.' Ideas include letting users name their agents, giving them more personality, and exploring richer forms of agent-to-agent and human-agent interaction. The core insight is that **craft and care in the UI—like showing the cursors—matter immensely** for adoption and emotional connection, transforming AI from a backend utility into a collaborative partner.

## Context

This interview, hosted by creator Peter Yang, features Tom Krcha, CEO and founder of Pencil. Tom has a deep background in creative tools, having spent a decade at Adobe as an evangelist for Creative Cloud and founded previous startups in the 3D avatar and video collaboration spaces. This conversation is part of the rapidly evolving discourse on AI-powered development ('vibe coding') and agentic workflows. It's particularly relevant now as tools move beyond simple code generation to more complex, multi-agent, and visual collaborative systems. The video contributes a crucial perspective on the importance of user experience and human-centric design in AI tools, arguing that visualization and transparency are key to adoption. This is essential viewing for product designers, software engineers, founders, and anyone interested in the future of human-AI collaboration and creative tooling.