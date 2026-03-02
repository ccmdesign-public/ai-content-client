---
metadata:
  videoId: "Jo168H2m5lw"
  title: "Replacing my n8n workflow with a Claude Code Skill"
  description: "I spent a week building a complex n8n workflow for AI image generation — then scrapped it and rebuilt the whole thing as a Claude Code skill in 30 minutes. Here's why automation without intelligence doesn't work, and how Claude Code Skills became my secret weapon for repeatable brand visuals.


    👇 **Your Builder Briefing (free)**

    https://buildermethods.com - Your free, 5-minute read to keep up with the latest tools & workflows for building with AI.


    👇 **Build With Claude Code (course + community)**

    https://buildermethods.com/pro/claude-code-course - My upcoming course, included with Builder Methods Pro membership.


    ▶️ Related videos:

    Design OS: An AI-first design process: https://youtu.be/2vu-6-lIhAs

    From AI Skeptic to Unfair advantage: https://youtu.be/7JBuA1GHAjQ


    💬 Drop a comment with your questions and requests for upcoming videos!


    Chapters:


    0:00 One-off vs repeatable needs

    1:59 Everything I'm showing today

    4:40 Brand visual guidelines with Claude

    9:54 Testing Google Gemini Image Generation

    11:50 Building the N8N Workflow

    17:33 What's a Claude Skill?

    18:27 Creating the Claude Code Skill

    22:11 Demo: Using the Claude Skill to Generate an Illustration"
  channel: "Brian Casel"
  channelId: "UCSxPE9PHHxQUEt6ajGmQyMA"
  duration: "PT26M31S"
  publishedAt: "2026-01-12T13:00:46Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Jo168H2m5lw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Jo168H2m5lw"
processedAt: "2026-01-14T16:28:10.167Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Moving from rigid node-based automation to reasoning-capable **Claude Code Skills** enables high-quality, brand-consistent AI image generation. Key highlights:

  - Replaced a complex **n8n** workflow with a **Claude Code** system in just 30 minutes.

  - Uses **Claude Opus 4.5** for reasoning and **Google Gemini** for final image execution.

  - Codifies brand identity into a **Visual World** and **Aesthe\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6474
  outputTokens: 885
  totalTokens: 8380
  processingTimeMs: 14069
tools:
  - name: "n8n"
    url: null
  - name: "Claude Opus"
    url: null
  - name: "Google Gemini Image Generation"
    url: null
  - name: "Gemini API"
    url: null
  - name: "Slack"
    url: null
  - name: "Zapier"
    url: null
  - name: "Dribbble"
    url: null
  - name: "Claude Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "gemini"
  - "workflow"
tagsNormalizedAt: "2026-03-01T21:19:30.484Z"
---

## Key Takeaways

For creative business workflows, the ability of an AI model to reason through brand guidelines is more valuable than complex automation logic.

- **Rigid vs. Flexible Systems**: Traditional automation tools like **n8n** can strip away the "intelligence" of AI by forcing it into discrete, inflexible nodes.

- **The Three Pillars of Brand Assets**: Success requires defining a **Visual World** (what to draw), **Aesthetic Guidelines** (how to draw it), and **Idea-to-Illustration Mapping** (why to draw it).

- **Hybrid AI Architectures**: Using a reasoning model like **Claude Opus** to interpret guidelines and a specialized model like **Gemini** for generation creates a superior output.

- **Claude Code as a Workflow Interface**: Claude Code isn't just for software development; it serves as a powerful environment for repeatable business processes and custom "skills."

## Summary

Brian Casel illustrates a shift in AI strategy, moving away from complex **i

PaaS (Integration Platform as a Service)** workflows toward agentic, skill-based systems. Initially, Casel spent a week building an elaborate **n8n** automation. This system used webhooks and Slack to trigger image generation through various APIs. While technically functional, the output lacked the nuanced brand consistency Casel required because the rigid node-based structure prevented the AI from properly applying creative guidelines.

### The Failure of Rigid Automation
The **n8n** workflow involved loading brand prompts into code variables and using conditional logic to handle requests. However, by breaking the process into small, automated steps, the model lost the ability to "think" about the brand's intent. The resulting images were generic and ignored the specific visual constraints established in the planning phase.

### Building the Brand Foundation
Before returning to the technical build, Casel emphasizes the importance of a conversational discovery phase with **Claude**. He developed three critical documents:

- **The Visual World**: Defines the recurring subjects (e.g., coffee mugs, plants, notebooks) that exist within the brand's universe.

- **Aesthetic Guidelines**: Precise instructions on line thickness, color palettes, and levels of detail inspired by sites like **Dribbble**.

- **Mapping Guide**: A logic system that translates abstract concepts (like "systems thinking") into specific objects from the visual world.

### The Claude Code Skill Solution
Casel pivoted to a **Claude Code Skill**, which is a self-contained folder containing logic, assets, and templates. Unlike the n8n build, this skill took only 30 minutes to set up. It uses a **Python script** to interface with the **Gemini API** for the actual generation, while **Claude Opus 4.5** acts as the orchestrator. This allows the system to read the brand markdown files, reason through the user's request, and suggest three distinct concepts before any image is generated. This iterative loop ensures that the final output aligns perfectly with the brand's established visual identity.

## Context

This video marks a significant trend in the AI space for 2026: the replacement of traditional automation (like Zapier or n8n) with agentic 'skills' located within developer-centric environments like Claude Code. As AI models gain higher reasoning capabilities, the need for complex, node-based visual builders decreases. This approach is particularly relevant for solopreneurs, designers, and content creators who need to maintain a consistent brand identity across high-volume content production without the overhead of manual art direction or expensive custom illustrations. It highlights a shift toward 'spec-driven development' for business workflows rather than just for software code.
