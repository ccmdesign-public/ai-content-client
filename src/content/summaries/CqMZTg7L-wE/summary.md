---
metadata:
  videoId: "CqMZTg7L-wE"
  title: "The trick to AI prototyping with your design system"
  description: "We talk a lot about using AI at startups…

    But what are more established companies doing to scale AI prototyping?

    What are the best ways to use AI to prototype with your design system?

    That's what today's episode is all about because we're talking with Lewis Healey (https://www.linkedin.com/in/lewis-healey-b2457826/) and Kylor Hall (https://www.linkedin.com/in/kylorhall/) about how they scaled AI prototyping at Atlassian.

    Some highlights 👇

    - Their vision for a truly AI-native design system

    - What's worked to scale AI prototyping adoption

    - Tips for reducing hallucinations when prototyping

    - ways to help AI make sense of your design system

    - Their novel approach to prototyping with “templates”

    - How the role of design system designers is changing with AI

    - + a *lot* more

    - Atlassian Design System (https://atlassian.design/)

    - Figma Make (https://www.figma.com/make/?gad_campaignid=23356954992&gbraid=0AAAABCTX0ItGAe7RZBBeUOUindISLe0Un) (AI prototyping tool)

    - AI Builders Week (Atlassian internal program) (https://www.atlassian.com/blog/inside-atlassian/ai-product-builders-week)

    Chapters

    0:00 Intro

    1:20 Atlassian's goals with AI prototyping

    6:51 Why templates are Atlassian's secret sauce

    11:09 Adding \"recipes\" to templates\ 

    13:17 Their process to integrating the design system

    16:28 Writing effective instructions for AI

    22:42 Closing hallucination gaps

    27:19 How to drive adoption at your org\ 

    32:47 Strategies for maintaining the system

    41:48 How the role of design system designer is changing

    45:57 Where prototyping with AI is headed next

    Dive is where the best designers never stop learning 🤿

    🌐 dive.club

    🐦 twitter.com/joindiveclub

    Now you can join advanced courses taught by the top designers to help you take a huge leap forward in your career 💪"
  channel: "Dive Club 🤿"
  channelId: "UCkCnraWwlnBw1_i7C9-3p0w"
  duration: "PT52M57S"
  publishedAt: "2026-01-02T13:22:26Z"
  thumbnailUrl: "https://i.ytimg.com/vi/CqMZTg7L-wE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=CqMZTg7L-wE"
processedAt: "2026-01-16T15:27:28.778Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Atlassian's Louis Healey and Kyler Hall reveal how they scaled AI prototyping by integrating their design system directly into LLM workflows. They argue that successful AI prototyping requires moving beyond human-centric docs toward **hybrid templates** and **machine-optimized instructions**. Their strategy centers on providing pre-coded shells to prevent UI hallucinations and mapping standard CSS\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 12914
  outputTokens: 1327
  totalTokens: 15032
  processingTimeMs: 22389
tools:
  - name: "Figma Make"
    url: "https://www.figma.com/make/?gad_campaignid=23356954992&gbraid=0AAAABCTX0ItGAe7RZBBeUOUindISLe0Un"
  - name: "Atlassian Design System"
    url: "https://atlassian.design/"
  - name: "AI Builders Week"
    url: "https://www.atlassian.com/blog/inside-atlassian/ai-product-builders-week"
  - name: "Replit"
    url: null
  - name: "Tailwind CSS"
    url: null
  - name: "Shadcn UI"
    url: null
  - name: "Cursor"
    url: null
  - name: "Figma AI"
    url: null
  - name: "Slack"
    url: null
  - name: "Rovo"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
  - "Web Development"
tags:
  - "ai-coding"
  - "design-systems"
  - "figma"
  - "prompt-engineering"
  - "tailwind"
tagsNormalizedAt: "2026-03-01T21:19:30.486Z"
---

## Key Takeaways

Atlassian has transformed its design system from a static library into a dynamic 'memory' for AI agents, enabling thousands of non-technical employees to build functional prototypes. This shift requires a fundamental rethinking of how design systems are documented and distributed.

- **Hybrid Prototyping Templates**: Use pre-coded 'scaffolding' (like top-level navigation and sidebars) in tools like **Figma Make** or **Replit**. This prevents the AI from hallucinating the 'shell' of the app, allowing users to focus on the content.

- **Machine-Optimized Documentation**: Create specific instruction files (e.g., `guidelines.mmd`) that translate industry-standard patterns like **Tailwind CSS** into proprietary design system components, reducing errors by meeting the model where its training data lies.

- **Sticker Sheet Calibration**: Test the limitations of an LLM's **computer vision** by using calibration sheets to see which UI elements (like borders or specific icons) the model fails to 'see' or interpret correctly.

- **Scalable Education via DM Bots**: Reach large organizations through unconventional methods, such as **Slack bots** that create group DMs to drive engagement and bypass 'Slack fatigue' in large channels.

- **Automated LLM Context**: Maintain 5,000+ lines of AI instructions by automating the extraction of documentation from the core **monorepo**, ensuring the AI's 'knowledge' stays in sync with production code changes.

## Summary

### The Hybrid Template Strategy

Atlassian found that when designers and PMs used AI tools like **Figma Make** or **Replit** starting from a blank slate, the results were often unusable due to 'hallucinations' in the global navigation and branding. To solve this, they developed **hybrid templates**. These templates provide a pre-coded, pixel-perfect 'shell' of an Atlassian experience—including the top navigation and sidebar—allowing the AI to focus exclusively on generating the unique content in the main canvas. This approach reduced the error rate of navigation-related hallucinations to nearly zero and saved users hours of tedious UI tweaking.

They also introduced **Recipes**, which are modular code snippets with specific instructions for the AI to perform complex tasks, such as switching an interface to **Dark Mode** or adding an AI chat box (Rovo). This allows users who aren't technical to 'paste in' high-fidelity functionality without needing to understand the underlying theme-engine or component logic.

### Communicating with the Machine

One of the most significant technical shifts discussed is the transition from human-centered documentation to machine-optimized instructions. Kyler Hall explains that LLMs are heavily trained on open-source libraries like **Shadcn UI** and **Tailwind CSS**. To leverage this, Atlassian created instruction files that explicitly tell the AI: 'If you see these Tailwind classes, translate them into this specific React component.' 

This method, which they call **Vibe Coding**, acknowledges the model's pre-trained biases rather than fighting them. By mapping a generic concept (like a 'lozenge' badge) to the model's understanding of a 'span' with certain classes, they achieved much higher fidelity. They manage these instructions through a `guidelines.mmd` file, which is a truncated, high-context version of their full design system documentation designed specifically to fit within LLM context windows.

### Calibrating Computer Vision

Louis Healey shares a unique experiment using **UI sticker sheets** to calibrate the computer vision of AI models. By feeding the AI screenshots of various components and asking it to create bounding boxes, he identified exactly where the models struggled—specifically with low-contrast borders and dense navigation elements. This insight led to better prompting strategies: instead of uploading a single complex screenshot, users are encouraged to upload 'zoomed-in' sections to ensure the computer vision model captures the necessary detail without hitting context limits.

### Scaling Adoption and Maintenance

To scale these tools to over 11,000 employees, the team moved beyond standard wikis and Slack channels. They implemented an **AI Builder Week**, where the entire company focused on learning these tools. To maintain engagement, Louis built a **Slack bot** in Replit that sends automated group DMs to inactive users, providing a more personal touch that successfully drove feedback and tool adoption.

Maintaining the AI's 'brain' is a massive engineering challenge. Kyler describes a system where they house AI-specific documentation within their core **monorepo**. Scripts crawl the repository, grab the latest component types and examples, and bundle them into the `LM.txt` and `MCP` files that feed the AI prototyping tools. This ensures that as the production design system evolves, the AI-generated prototypes don't fall behind. They aim for the '80% mark'—documenting the most common use cases perfectly rather than overwhelming the model with every possible edge case.

## Context

Louis Healey and Kyler Hall are key members of the Atlassian design and engineering organization, specializing in design systems and AI adoption. This interview, hosted by Rid on the **Dive Club** podcast, explores the cutting edge of how major tech firms are operationalizing AI to increase product velocity. As AI tools like **Cursor**, **Replit**, and **Figma AI** become mainstream, the bottleneck is no longer access to the tools, but the accuracy and 'brand-alignment' of their output. This conversation is highly relevant for design systems leads, product designers, and engineers who are tasked with building internal AI platforms. It provides a technical and cultural blueprint for moving from 'AI as a toy' to 'AI as a production-grade prototyping engine,' marking the emergence of the 'Design Technologist' as a critical role in the AI-native era.
