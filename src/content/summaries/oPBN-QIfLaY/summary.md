---
metadata:
  videoId: "oPBN-QIfLaY"
  title: "Vibe Check: Claude Cowork Is Claude Code for the Rest of Us"
  description: "Anthropic just dropped Claude Cowork—essentially Claude Code for everyone, not just engineers—and we got to chat about it with a product engineer at Anthropic who helped build it.


    In this live Vibe Check, Dan Shipper and Kieran Klaassen explore the new interface together, testing what works (and what doesn't) in real time. Anthropic’s Felix Rieseberg joins midway through to explain the philosophy behind Cowork's design: why it separates \"Tasks\" from \"Chats,\" how the queue system lets you send messages while the agent is working, and what \"agent-native\" architecture means in practice. They also dig into Skills—Claude's prompt system that lets you customize how it works—and the Chrome connector for browser automation.


    This is a raw, unfiltered first look at what might be the future of how knowledge workers interact with AI: async workflows instead of turn-by-turn chat.


    If you found this episode interesting, please like, subscribe, comment, and share!


    Want even more?


    Check out Dan's guide to building agent-native applications: https://every.to/guides/agent-native

    To hear more from Dan Shipper:

    Subscribe to Every: https://every.to/subscribe

    Follow him on X: https://twitter.com/danshipper


    00:01:00 - What is Claude Cowork

    00:02:36 - First demo: competitor analysis

    00:03:33 - Email drafting that sounds like me

    00:06:18 - Calendar audit running for an hour

    00:07:39 - Book taxonomy demo

    00:08:42 - PostHog analytics via Chrome browsing

    00:14:36 - Chat vs Code vs Cowork: when to use what

    00:31:06 - Felix from Anthropic joins

    00:36:39 - Why they built it in a week and a half

    00:37:57 - Design decision: why a separate tab

    00:43:57 - Skills as the primary hackable surface

    00:49:36 - Agent-native architecture principles

    00:56:57 - The origin story of skills at Anthropic

    01:03:00 - Our final rating"
  channel: "Every"
  channelId: "UCjIMtrzxYc0lblGhmOgC_CA"
  duration: "PT1H32M45S"
  publishedAt: "2026-01-13T18:25:24Z"
  thumbnailUrl: "https://i.ytimg.com/vi/oPBN-QIfLaY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=oPBN-QIfLaY"
processedAt: "2026-01-24T16:20:49.574Z"
source: "youtube"
tldr: "Every's live demo of the new Claude Co-Work app reveals it's essentially 'Claude Code for non-technical people'—an agent-native, async task runner that lives on your computer, allowing users to hand off complex research, data analysis, and document work for extended periods without real-time supervision."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 21555
  outputTokens: 1808
  totalTokens: 23363
  processingTimeMs: 56319
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tools:
  - name: "Claude Cowork"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Skills"
    url: null
  - name: "Chrome connector"
    url: null
  - name: "PostHog"
    url: null
  - name: "Google Docs"
    url: null
  - name: "Every"
    url: "https://every.to"
  - name: "Kora"
    url: null
  - name: "Claude AI"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "prompt-engineering"
  - "workflow"
tagsNormalizedAt: "2026-03-01T21:19:30.374Z"
---

## Key Takeaways

Every's team, having received early access, performs a live 'vibe check' of Anthropic's new Claude Co-Work, analyzing its design, use cases, and potential impact on non-technical workflows.

*   **Agent-Native Architecture for the Masses:** Co-Work is a **non-coding version of Claude Code**, built on an **agent-native architecture** where the core is an AI agent wired to the UI, enabling long-running, async tasks on your local machine.

*   **Paradigm Shift from Chat to Async Work:** It fundamentally changes the user model from synchronous chat (send prompt, wait for immediate response) to **async task delegation**. Users can queue multiple requests, walk away, and return to reviewed outputs, a workflow previously familiar only to developers using Claude Code.

*   **Skills as the Primary Hackable Layer:** Personalization and power use come through **Skills**—markdown files that instruct Claude on specific workflows, styles, or tool use (e.g., Swiss design, 3D printing, data analysis). These are automatically loaded from Claude AI into Co-Work, making user expertise repeatable and shareable.

*   **UX as a Deliberate 'Construction Site':** The separate 'Co-Work' tab (alongside Chat and Code) is a deliberate design choice by Anthropic to signal it's an experimental, fast-iterating 'playground' built in the open, allowing them to gather user feedback rapidly and adjust the roadmap.

*   **Local Execution Enables New Capabilities:** Because it runs locally and can control your browser (via Chrome connector), it can perform tasks that require logged-in access or lack APIs, such as auditing personal calendars, analyzing private analytics dashboards, or researching social media feeds.

*   **The Future is Fewer, More General Interfaces:** A key insight from the Anthropic builder is a belief that the AI interface landscape will consolidate toward **fewer, more general 'I want something' boxes** (like a search bar) that are context-aware, rather than proliferating specialized UIs for every task.

## Summary

### Introduction and Initial Demo
The Every team hosts a live-streamed 'vibe check' of Anthropic's newly released Claude Co-Work, which they describe as **'Claude Code for non-technical people.'** The app presents a third tab in the Claude interface alongside Chat and Code, focused on **long-running, async tasks**. Initial demos show it successfully completing multi-step assignments like analyzing website competitors, auditing a month of calendar data against personal goals, and fetching specific analytics from a Post

Hog dashboard by controlling the user's Chrome browser.

A key differentiator from standard Claude Chat is the **async, queued interaction model**. Users can add new instructions to a task while it's still running, eliminating the 'wait-and-respond' pattern of chat. The interface shows progress, artifacts, and context on the right sidebar, framing work as discrete 'tasks' rather than conversational threads.

### Core Philosophy and Design Decisions
Felix, a technical staff member from Anthropic who helped build Co-Work, joins the stream. He reveals the version was built in **about a week and a half** as a 'research preview.' The separate tab is intentional: it's a **'construction site'**—a fast-iterating, less-polished environment meant for early adopters to co-create the product's future. It runs locally on the user's computer (unlike cloud-based chats), allowing for more aggressive/experimental agentic capabilities and faster development cycles.

Felix shares a core philosophical belief: the current proliferation of specialized AI UIs will likely consolidate. The future may hold **fewer, more general input interfaces** (like a smart search bar) that infer user intent, rather than many task-specific boxes. Co-Work is a step in exploring that transition for non-coding work.

### The Power of Skills and Agent-Native Architecture
The discussion delves into the technical underpinnings. Co-Work is a prime example of an **agent-native architecture**, where deterministic software rules are replaced by a central AI agent connected to the UI. This enables **emerging capabilities**—users can combine primitive tools in ways the developers didn't anticipate.

*   **Skills** are highlighted as the primary composable layer. These are markdown files that instruct Claude on how to perform specific types of work (e.g., 'write in the style of Dan Shipper,' 'follow Swiss design principles,' 'generate 3D print files'). Any skill installed in the main Claude AI app is automatically available in Co-Work.

*   Kieran demonstrates creating a 3D model of a chair by combining a 'Swiss design' skill with a '3D printing' skill, showcasing how skills encapsulate expertise and style.

*   The team discusses the architectural principle of **parity**: anything a user can do through the UI, the agent should also be able to do. Co-Work exhibits this when it automatically triggers a file-picker UI upon detecting the user wants to access a folder.

### Practical Use Cases and Limitations
The stream tests practical boundaries. Dan attempts to use Co-Work with an 'Every Proofreader' skill to copy-edit a Google Doc—a notoriously complex task for AI due to Google Docs' non-standard HTML. While Co-Work navigates to the doc and enters suggestion mode, it struggles with the precise mechanics of making edits, highlighting current limitations.

Successful use cases demonstrated include:

*   **Deep Research:** Reading an entire book to create a character/idea taxonomy.

*   **Personal Data Analysis:** Auditing calendar data and cross-referencing it with goals.

*   **Web Automation:** Logging into analytics tools (Post

Hog) to pull specific metrics.

*   **Brainstorming & Creation:** Using skills to brainstorm and generate assets (like VST plugin designs or 3D models).

The team notes Co-Work feels like a **'friendlier wrapper' on Claude Code's engine**, sometimes even showing Claude Code error messages. Its current 'jankiness' is acknowledged but expected for such an early release.

### Final Assessment and Future Vision
In their final rating, the Every team gives Co-Work a **'Green' for idea/concept** and a **'Yellow' for current execution**, praising its paradigm-shifting potential while noting the rough edges. They see it as the beginning of a **'Claude Code moment' for non-technical professionals**, teaching users to think in terms of async task delegation.

Felix, when asked for feature requests, is told: 1) **'YOLO access' to the entire filesystem** (instead of per-folder permissions), and 2) **A plugin/skill marketplace** for easier discovery and installation. The stream concludes by emphasizing that the most exciting uses for Co-Work will be discovered by curious users experimenting on this new 'playground,' shaping its evolution alongside Anthropic.

## Context

The host is **Dan Shipper**, co-founder of **Every** (every.to), a subscription platform providing analysis, apps, and training at the forefront of AI. The guest is **Kieran**, another builder at Every (creator of the Kora email assistant), and they are joined by **Felix**, a technical staff member from **Anthropic** who helped build Claude Co-Work. This live stream is part of Every's 'vibe check' series, where they get early access to new AI models and products, test them in real-time, and share insights with their community.

This analysis is crucial as it captures the immediate, hands-on reaction to a significant new product from a major AI lab. It contributes to the broader conversation about the democratization of powerful AI coding tools and the evolution of human-computer interaction toward more agentic, asynchronous collaboration. The release of Co-Work signals a strategic shift for Anthropic in making advanced AI capabilities accessible to non-programmers, potentially reshaping knowledge work. The video is highly relevant for product managers, developers, entrepreneurs, and anyone interested in the practical implementation and societal impact of agentic AI. The detailed walkthrough and developer-centric discussion offer unique insights into the product's capabilities, limitations, and potential future direction.