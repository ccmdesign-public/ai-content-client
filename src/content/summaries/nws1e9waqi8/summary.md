---
metadata:
  videoId: "nws1e9waqi8"
  title: "Dessn - Is this the future of AI prototyping?"
  description: "Gab (https://www.linkedin.com/in/gabriella-hachem/) and Nim (https://www.linkedin.com/in/nim-cheema/) are the co-founders of a startup called Dessn (https://join.dive.club/dessn-content) which allows designers to prototype in the context of their production codebase (without any of the setup).


    So I asked them to hook it up to the Inflight (https://www.inflight.co/) repo and give me a little demo to see what’s possible.


    I’m pretty sold 👀


    Dive is where the best designers never stop learning 🤿


    🌐 dive.club

    🐦 twitter.com/joindiveclub


    Now you can join advanced courses taught by the top designers to help you take a huge leap forward in your career 💪


    Chapters

    0:00 Intro

    0:45 Creating an animation playground in Dessn

    5:10 The power of designing in production

    6:07 Prototyping Inflight using Dessn

    9:05 The aura of inevitability designing in code

    14:24 How Dessn works under the hood

    16:29 Scaling explorations and leaning into curation

    19:05 Prompting vs. pixel pushing

    25:09 Previewing Dessn's canvas UX\ 

    27:31 What tomorrow's design tools mean for the role of designer

    28:55 Figuring out what to ship

    30:54 The importance of design in an AI world

    32:49 Dessn's upcoming milestones"
  channel: "Dive Club 🤿"
  channelId: "UCkCnraWwlnBw1_i7C9-3p0w"
  duration: "PT34M15S"
  publishedAt: "2026-01-14T13:01:37Z"
  thumbnailUrl: "https://i.ytimg.com/vi/nws1e9waqi8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=nws1e9waqi8"
processedAt: "2026-01-15T17:29:10.499Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Desen introduces an AI-powered design tool allowing designers to prototype directly within their production codebase, eliminating setup costs and ensuring consistency. This fundamentally shifts the design process from recreating components to **exploring and curating production-ready variants** at speed. It empowers non-technical designers to experiment with live code, elevating their role to stra\n"
ai:
  provider: "gemini"
  model: "gemini-2.5-flash"
  apiCalls: 3
  fallbackAttempts: 2
  inputTokens: 9363
  outputTokens: 1513
  totalTokens: 11837
  processingTimeMs: 50963
tools:
  - name: "Dessn"
    url: "https://join.dive.club/dessn-content"
  - name: "Inflight"
    url: "https://www.inflight.co/"
  - name: "Figma"
    url: null
  - name: "Dive Club"
    url: "https://dive.club"
  - name: "Docker"
    url: null
  - name: "Git"
    url: null
categories:
  - "Product & Design"
  - "AI & Machine Learning"
tags:
  - ai-coding
  - figma
  - design-systems
  - ux
  - ui
  - workflow
---

## Key Takeaways

This Dive Club episode with Desen co-founders Gabriella and Nim unveils a revolutionary design tool that prototypes directly from a company's production codebase, addressing longstanding inefficiencies in design-to-development workflows. Here are the core insights:

- Desen provides a **visual interface for designers** to access and manipulate production code components without requiring coding skills or environment setup, drastically reducing friction.

- The tool positions the **production codebase as the single source of truth**, moving away from separate design systems or recreating components in tools like Figma, thus ensuring design consistency and alignment.

- Designers can leverage **AI agents and sandboxed environments** to rapidly explore countless design variations and interactions based on existing code, shifting the focus from pixel-pushing to **curation and selection**.

- This approach eliminates the traditional tradeoff between design speed and quality, enabling much faster prototyping and validation, ultimately leading to designers having a **more strategic impact** on product development by focusing on *what* to build.

## Summary

### Introduction to Desen: Prototyping in Production
The video features Rid from Dive Club interviewing Gabriella and Nim, co-founders of Desen, a new design tool aiming to revolutionize how designers prototype. Desen's core innovation is enabling designers to prototype directly within their production codebase without any setup costs. This eliminates the traditional problem where designers spend significant time recreating existing production components in separate tools like Figma, leading to inconsistencies and delays.

### Animation Playground: Live Code Exploration
Rid demonstrates Desen by showcasing how he used it to integrate an animation shipped by their founding design engineer, Kevin. He asked Desen to "render the notification component," and the tool displayed the live, production-ready component with its three variants. This demonstrated Desen's ability to pull code directly, rather than recreating it. Rid then prompted Desen to create an "animation playground" based on this component. This allowed him, as a non-technical designer, to experiment with different animation settings and create a lightning icon, all using the actual production code. The key takeaway was the ability to copy-paste the resulting code directly into the codebase, effectively making design changes without needing a developer.

### Production as the Single Source of Truth
A central thesis of Desen is that the **production codebase is the ultimate source of truth** for a product. Unlike other design tools that require users to build a design system from scratch within their environment, Desen integrates directly with the existing codebase. This removes the "skill barrier" that traditionally blocked designers from accessing and working with production code. The co-founders emphasize that this deep integration provides unparalleled context, drawing on years of decision-making and tribal knowledge embedded in the code, which other tools cannot achieve.

### Interactive Transcript: Real-World Prototyping
The discussion shifts to how Desen handles actual prototyping. Rid provided an in-flight use case: creating an interactive transcript component triggered from new playback controls. Desen compiled Rid's codebase and presented several interactive variants of the component. Rid highlighted how powerful this was because he had *just* designed the play bar in Figma, and now saw it fully interactive in Desen, pulled directly from production. This allowed him to immediately grasp the feasibility and ROI of the transcript feature, demonstrating how Desen can help designers validate ideas rapidly and push for features that were previously deemed low priority due to implementation complexity.

### Infinite Exploration and Sandboxing
Nim elaborates on Desen's underlying architecture, which involves a sophisticated compiler that converts any codebase into a **sandbox-ready prototyping environment**. This eliminates the common designer frustration of complex local environment setups (Docker, databases, Git branching, worktrees). Desen allows for **infinite sandboxes and parallel AI agents**, enabling designers to explore thousands of design permutations. This vision is about "discovering your product in the latent space" rather than traditional pixel-pushing, where designers can curate and select from AI-generated options. This addresses the desire to explore many ideas quickly without a significant time investment.

### The Future of Design: Curation and Strategy
The co-founders acknowledge the philosophical debate between pure prompting and direct manipulation in AI tools. They argue that this is a false dichotomy arising from a platform shift. Desen's bet is on moving designers up the "leverage stack," making them curators and selectors of design options generated by AI. The feeling of "making the thing" will evolve; it won't be about manually pushing pixels, but about having a thought and seeing it come to fruition through AI-powered exploration. They believe the future UX will combine infinite exploration with strong control and agency, moving beyond familiar Figma-like interfaces. This shift means designers will focus on **"what to ship"** rather than **"how to ship it."**

### Elevating the Designer's Role and Outcomes
Gabriella and Nim discuss the anxiety some designers feel about AI's impact. They reframe the conversation around **outcomes**: how AI can help designers build the *right* product more effectively. They argue that while AI can commoditize code writing, the strategic challenge remains identifying *what* features to build. In this future, designers become the "taste makers" and "next generation of software builders" because they understand branding, color, and user experience. This elevates the designer's role to a more strategic position, requiring strong soft skills to navigate ambiguous problem spaces and communicate effectively. Prototyping becomes even more crucial for validating ideas with users before committing to full development, with AI handling the rapid iteration of these prototypes.

### Desen's Milestones and Public Beta
Desen is moving from private to public beta, allowing users to connect their codebase and get an environment ready within a day. They are also working on an "infinite canvas anchored in code," which will further enhance exploration by allowing designers to break apart components, explore them, and reintegrate them, bridging the perceived gap between canvas-based tools and code-based design.

## Context

The Dive Club 🤿 channel, hosted by Rid, is a resource for designers focused on continuous learning and exploring new tools and methodologies. This episode with Desen co-founders Gabriella and Nim contributes significantly to the ongoing discourse about **AI's transformative impact on design and software development**. It specifically addresses the friction between traditional design workflows and engineering implementation, a persistent challenge in product development.

This video is highly relevant for designers, product managers, and engineering leaders seeking to understand how **AI-powered tools can bridge the design-to-code gap**, accelerate prototyping, and enhance product quality. It challenges conventional notions of design tools and workflows, offering a vision where designers leverage AI to become more strategic, focusing on *what* to build by directly exploring possibilities within a live production environment. Anyone interested in the future of design and the evolving role of designers in an AI-first world would benefit from watching.
