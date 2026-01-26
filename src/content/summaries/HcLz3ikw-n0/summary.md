---
metadata:
  videoId: "HcLz3ikw-n0"
  title: "Designer's toolkit for Claude Code"
  description: "Kyle Zantos is leading the new UX Tools Labs where he's responsible for figuring out what matters for new design tools and workflows.


    As a result, he's pretty quickly become my go-to source as I transition into more of a builder with AI.


    So this conversation is a deep dive into very specific tactics you can use on your own design engineering journey.


    We'll go through recommended tools, workflows, and Kyle's process for building a design engineering \"Skill\" using Claude Code.


    - Kyle’s portfolio site: https://zantos.co (https://zantos.co/)

    - Leva control panel: https://threejsresources.com/tool/leva

    - Compound Engineering plugin: https://github.com/EveryInc/compound-engineering-plugin


    - Jhey Tompkins: https://x.com/jh3yy

    - Derek Briggs: https://x.com/PixelJanitor

    - Will King: https://x.com/willking

    - Emil Kowalski: https://x.com/emilkowalski

    - Jakub Krehel:  https://jakub.kr/


    Dive is where the best designers never stop learning 🤿


    Chapters

    0:00 intro

    1:26 Tinkering with Cursor's new updates

    10:35 Building an audio animation tool

    14:04 Using external inspiration inside of Claude

    19:08 Creating a design engineering skill in Claude

    29:01 Using Leva control panels

    34:53 The strategy for your global Claude guideline file

    41:19 How to think about your tool stack

    45:01 Kyle's personal system for learning


    🌐 dive.club

    🐦 twitter.com/joindiveclub


    Now you can join advanced courses taught by the top designers to help you take a huge leap forward in your career 💪"
  channel: "Dive Club 🤿"
  channelId: "UCkCnraWwlnBw1_i7C9-3p0w"
  duration: "PT48M4S"
  publishedAt: "2026-01-07T13:25:47Z"
  thumbnailUrl: "https://i.ytimg.com/vi/HcLz3ikw-n0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=HcLz3ikw-n0"
processedAt: "2026-01-08T18:26:04.093Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Claude Code empowers designers to act as design engineers by using a CLI-based agent to bridge Figma designs and React/Tailwind codebases.

  - Utilizes Model Context Protocol (MCP) to access design specs and local documentation

  - Enables rapid, agentic UI iteration through automated edit-test-fix loops

  - Minimizes handoff friction by allowing designers to execute production-level code changes via na\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 410
  outputTokens: 805
  totalTokens: 3105
  processingTimeMs: 19447
tools:
  - name: "Claude Code"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "Leva"
    url: "https://threejsresources.com/tool/leva"
  - name: "Compound Engineering Plugin"
    url: "https://github.com/EveryInc/compound-engineering-plugin"
  - name: "Figma"
    url: null
  - name: "Tailwind CSS"
    url: null
  - name: "Cursor"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
tags:
  - claude
  - ai-coding
  - figma
  - tailwind
  - accessibility
  - design-systems
---

## Key Takeaways

Claude Code represents a transition from chat-based AI to agentic CLI tools that understand and manipulate entire codebases directly.

* **Agentic CLI Workflow**: Unlike web interfaces, Claude Code operates in the terminal, allowing it to run builds, execute tests, and manage files autonomously.

* **MCP Integration**: The **Model Context Protocol** allows the agent to fetch live data from design tools or documentation, ensuring high-fidelity implementations.

* **Iterative Design Polish**: The tool excels at the 'last 10%' of development, such as refining **responsive layouts**, fixing **CSS regressions**, and improving **accessibility** labels.

## Summary

The video introduces **Claude Code**, a command-line interface (CLI) agent from Anthropic designed to handle complex engineering tasks through natural language. For designers, this marks a shift from creating static mockups to directing an agent that can implement those designs in real-time. The workflow begins with the `claude` command, which initiates an agentic session where the AI has full context of the local repository. This environment allows designers to describe UI changes—such as 'make this header sticky and update the mobile padding'—and watch the agent execute the multi-file edits required to achieve the goal.

### The Designer's Toolkit and MCP
A key highlight is the **Model Context Protocol (MCP)**, which acts as a bridge between Claude and external data sources. Designers can use MCP servers to connect Claude to **Figma**, allowing the agent to 'read' layer data and transition styles directly into **Tailwind CSS**. This eliminates the tedious manual translation of hex codes and spacing values. Additionally, the agent can index local design systems or brand guidelines, ensuring that any generated code adheres to existing project standards rather than hallucinating new patterns.

### The Agentic Feedback Loop
The power of Claude Code lies in its ability to self-correct. When tasked with a UI update, the agent doesn't just write code; it can run the local development server, identify build errors, and fix them without user intervention. For designers, this means they can focus on high-level aesthetic and functional decisions while the agent handles the underlying syntax. The video demonstrates how to use the tool for **refactoring components**, where the agent can take a messy JSX file and reorganize it into clean, reusable sub-components while maintaining the original design intent.

### Refining UI and Accessibility
Beyond initial creation, the tool is a powerful utility for 'design debt.' Designers can prompt Claude to audit the codebase for **accessibility** violations or inconsistent spacing. The agent can systematically traverse the UI, adding missing ARIA labels or standardizing the color palette across dozens of files. This automated 'polish' phase ensures that the final product maintains the high standards set during the initial design phase, bridging the gap between a Figma prototype and a production-ready application.

## Context

The rise of AI agents like Claude Code is fundamentally changing the 'designer-to-developer' handoff. Traditionally, designers faced a 'wall' where their influence ended at the Figma file, leaving the implementation to engineers who might miss subtle visual nuances. As AI tools move into the CLI, they become 'Design Engineering' partners. This shift matters because it allows designers with minimal coding knowledge to take ownership of the implementation, ensuring design intent is preserved. It aligns with the broader industry trend of 'agentic workflows,' where AI is used not just to generate text, but to take autonomous actions within professional software environments.
