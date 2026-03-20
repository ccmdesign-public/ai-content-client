---
metadata:
  videoId: "nDHXLnwlIaY"
  title: "My 3-Step Claude Skill for Perfect UX Design"
  description: "Get the prompts and skills from the video for free here: https://www.skool.com/tech-snack/classroom/0ca89703?md=f88e1774a2c249029057f3e5298e9d47

    In this video, I show you my 3-step Claude Skill workflow for creating professional UX design that actually looks polished—not the generic vanilla UI that most AI builders end up with.\ 

    If you've been wondering how to use Claude Skills to level up your app development, this tutorial breaks down exactly how to create Claude Skills that generate detailed user experience documentation before you write a single line of code.

    ⌚ Timestamps:

    0:00 - The problem with vanilla AI-generated UIs

    0:50 - Step 1: Creating the PRD

    3:04 - Why this isn't enough (the step most builders skip)

    4:28 - Step 2: Defining the user experience

    5:41 - What goes into professional UX documentation

    8:15 - Running the Claude Skill workflow

    11:49 - Step 3: Building the prototype prompt by prompt

    14:03 - Final result walkthrough

    16:26 - Before vs After comparison

    🗄️ Resources:

    Claude Skills + Prompts → https://www.skool.com/tech-snack/classroom/0ca89703?md=f88e1774a2c249029057f3e5298e9d47

    💪 Who Am I?

    My name is Sean... I'm a biotech consultant turned tech bootcamp bro-coder turned tech company sales engineer turned digital marketing entrepreneur turned back into a tech bro entrepreneur.

    Learning all I can about AI and trying to communicate some knowledge along the way.

    The singularity is near!

    👇 My Other social accounts

    📸 Instagram: https://www.instagram.com/seankochel/

    🐦 X/Twitter: https://x.com/IAmSeanKochel

    👨‍💻 Linkedin: https://www.linkedin.com/in/sean-kochel/

    🎥 Facebook: https://www.facebook.com/realseankochel"
  channel: "Sean Kochel"
  channelId: "UCFig7skuwYrCIGy0tuZHA2Q"
  duration: "PT18M8S"
  publishedAt: "2026-01-12T17:05:34Z"
  thumbnailUrl: "https://i.ytimg.com/vi/nDHXLnwlIaY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=nDHXLnwlIaY"
processedAt: "2026-01-14T16:28:53.549Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Eliminate generic 'vanilla' AI-generated interfaces by implementing a structured 3-step planning workflow in Claude. This method moves beyond basic functionality to professional-grade design:

  - **Define a PRD** to establish core logic and MVP features

  - **Generate a UX Specification** covering mental models, information architecture, and affordances

  - **Execute a Build Order** via sequential promp\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4554
  outputTokens: 924
  totalTokens: 6272
  processingTimeMs: 12861
tools:
  - name: "Claude 3.5 Sonnet"
    url: null
  - name: "Replit"
    url: null
  - name: "Replit Agent"
    url: null
  - name: "Polyat"
    url: null
  - name: "Google Stitch"
    url: null
  - name: "v0"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
tags:
  - "claude"
  - "design-systems"
  - "prompt-engineering"
  - "ui"
  - "ux"
tagsNormalizedAt: "2026-03-01T21:19:30.268Z"
---

## Key Takeaways

To move from functional prototypes to professional products, builders must stop skipping the UX planning phase. The core insight is that LLMs take shortcuts when given vague instructions, leading to generic results.

- **Mental Model Alignment** is essential; you must define exactly what a user expects to happen when they interact with a feature.

- **Information Architecture** and **Affordances** ensure users understand what is clickable, editable, or informative, rather than guessing based on a flat UI.

- **Sequential Prompting** (the 'Build Order') is necessary because tools like Replit or Polyat struggle with high context; breaking the build into stages (design tokens, then layout, then features) maintains quality.

- **State Management** planning (loading, empty, error states) prevents the AI from ignoring these critical user experience moments.

## Summary

The primary reason AI-generated applications often look 'vanilla' and unprofessional is that builders jump straight from a basic idea to coding. Sean Kochel introduces a **3-step Claude Skill** workflow designed to force the AI to think like a world-class product designer before a single line of code is written.

### Step 1: The Enhanced PRD

The process begins with a **Product Requirements Document (PRD)**. While many use AI to generate these, the key is providing high-quality documentation of the **MVP concept**. This includes the core features, target users, and success criteria. In the demo, Kochel uses a node-based automation builder concept. By running a specific Claude skill against an `MVP.markdown` file, the AI produces a detailed roadmap that defines *what* the app does, but not yet *how* it feels.

### Step 2: The UX Specification

This is the 'missing link' in most AI workflows. Kochel's Claude skill translates the PRD into a deep **UX Specification**. This phase focuses on four critical pillars:
1. **Mental Model Alignment**: Researching how the ideal user perceives the problem and ensuring the UI matches those expectations.
2. **Information Architecture**: Organizing every concept (canvases, sidebars, nodes) into a cohesive structure.
3. **Affordances and Actions**: Explicitly defining visual cues that signal interactivity, such as what looks clickable or draggable.
4. **System Communication**: Planning for edge cases like loading animations, empty states, and error handling.

### Step 3: The Build Order

Because most AI coding tools (such as **Google Stitch**, **Replit**, or **Polyat**) have context limitations, providing a 50-page specification at once leads to errors. The final skill generates a **Build Order**—a sequence of modular prompts. This allows the builder to iterate through the project in logical layers: starting with **design tokens** and **layout shells**, then moving to core feature components, and finally adding micro-interactions.

### Real-World Results

The video demonstrates the difference between a 'vanilla' build and the structured approach. The structured build includes high-fidelity details like **context-aware dropdowns**, **smooth node animations**, and **dynamic data mapping**. By defining these details in the UX spec first, the AI has the specificity required to execute a polished, professional interface rather than a generic template.

## Context

As AI coding tools like Claude 3.5 Sonnet, Replit Agent, and v0 become mainstream, the barrier to building functional software has vanished. However, the barrier to building *good* software remains high. This workflow addresses the 'uncanny valley' of AI development, where apps work but feel 'cheap' or templated. This matters to indie hackers and product managers who need to move beyond simple prototypes into 'production-ready' aesthetics. It aligns with the broader trend of 'AI Orchestration,' where the human's role shifts from writing code to high-level architectural and UX oversight.
