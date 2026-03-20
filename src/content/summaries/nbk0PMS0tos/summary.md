---
metadata:
  videoId: "nbk0PMS0tos"
  title: "Generate Better AI Designs in Claude Code"
  description: "Learn how to generate better designs in Claude Code using Claude Skills.

    Instead of prompting repeatedly, Claude Skills let you structure context so Claude produces stronger UI, UX, and product design outputs. In this video I walk through how to use a Claude Skill to better improve your AI Design Workflow.


    More content on AI design workflows, Figma, design systems, and product design is coming soon.


    🔗 KEY LINKS

    📣 JOIN THE COMMUNITY: https://uicollective.co/\ 

    ❎ Follow me on X: https://x.com/KirkMDesign

    📣 Save 20% on the Annual Mobbin plan: http://mobbin.com/uicollective


    Why Join UI Collective Academy? Get access to premium courses, premium downloads, and so much more on the way (I am largely building this solo...trying to make design education available for all, support goes a long way!)


    ↪️ Need a design system? (also included in the academy): https://collectivekit.co/


    🔗 VIDEOS TO WATCH

    Build a Design System: https://youtu.be/opTANvl9G1g

    Complex Design System Setup: https://youtu.be/L-tpK7Eeuow

    AI & Design Systems: https://youtu.be/XfezMs8B-O8


    🔗 MORE LINKS

    Claude Setup Docs: https://code.claude.com/docs/en/desktop-quickstart

    Let us build or fix your design system: https://designsystemlabs.co/

    kirkland@uicollective.co


    0:00 An Introduction

    1:25 Generating a UI Without a Claude Skill

    2:38 Building a Claude Skill

    5:40 Design Inspiration with Mobbin

    7:22 Enhancing Our Claude Skill

    8:42 Generating a UI With a Claude Skill

    9:00 Reviewing AI Generation

    10:10 Claude Skills Quick Note

    10:37 Outro"
  channel: "UI Collective"
  channelId: "UCBB1ZWZyf0RaKuHgpTjpcug"
  duration: "PT11M"
  publishedAt: "2026-03-16T13:08:22Z"
  thumbnailUrl: "https://i.ytimg.com/vi/nbk0PMS0tos/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=nbk0PMS0tos"
processedAt: "2026-03-16T16:07:12.028Z"
source: "youtube"
tldr: "Leverage Claude skills and competitor research from platforms like Mobin to generate significantly better AI-powered design drafts in Claude Code, moving beyond generic outputs to more refined, brand-aligned results with minimal prompting."
tools:
  - name: "Claude Code"
    url: null
  - name: "Mobin"
    url: null
  - name: "Claude"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
tags:
  - "ai-general"
  - "claude"
  - "llm"
  - "product-management"
  - "prompt-engineering"
  - "ux"
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9051
  outputTokens: 1003
  totalTokens: 10054
  processingTimeMs: 10438
tagsNormalizedAt: "2026-03-16T16:37:15.259Z"
---

## Key Takeaways

To elevate AI-generated designs from generic to production-ready, it's crucial to provide Claude with specific visual context and inspiration.

*   Utilize **Claude skills** to create a dedicated repository for design inspiration, allowing the AI to reference a consistent aesthetic.

*   Integrate **competitor research** from platforms like **Mobin** to gather relevant UI examples and visual treatments.

*   Upload curated screenshots and design references into the Claude skill's image folder, organizing them for better AI interpretation.

*   This approach enables Claude to generate **first drafts** that are much closer to desired design outcomes, reducing iterative prompting.

## Summary

This video demonstrates a workflow for generating higher-quality AI designs using **Claude Code** by incorporating **Claude skills** and **competitor research**.

The presenter starts by showing a generic AI-generated landing page for a crypto bank with a simple prompt. The initial result, characterized by aggressive gradients and a typical AI-generated look, highlights the need for a more refined approach. The core idea is to move beyond these generic outputs by providing the AI with specific visual guidance.

### Setting up a Claude Skill

The first step involves creating a **Claude skill** named "design inspiration." This skill acts as a dynamic knowledge base that Claude can reference every time a design is created or modified. The prompt used to create this skill instructs Claude to look at files within the skill's directory, specifically visual references of designs to "mimic" (not copy).

Claude automatically generates a detailed description for the skill, outlining how it should use visual references and interpret them. Crucially, it also creates an `images` folder within the skill where users can upload design examples. This folder will be the primary source of visual inspiration for the AI.

### Integrating Competitor Research with Mobin

To populate the `images` folder with relevant and high-quality design examples, the presenter uses **Mobin**, a repository of UI screens, elements, and flows from various companies. Mobin allows users to search for specific design types (e.g., dashboards, landing pages) and filter by categories or specific companies like Airbnb or Linear. This enables thorough **competitor research** to find designs that align with the desired aesthetic.

The presenter selects examples from Rock and Linear, taking screenshots of sections they find inspiring for a dark-mode crypto landing page. These screenshots are then uploaded to the `images` folder within the "design inspiration" Claude skill. For better organization, the presenter instructs Claude to sort these screenshots into subfolders (e.g., "linear" and "rocks") and rename the images descriptively.

### Generating Improved Designs

With the Claude skill populated with curated design inspiration, the same simple prompt ("Please build me a landing page for a crypto bank") is run again. The key difference is that Claude now studies the references in the "design inspiration" skill. The resulting design is significantly better, moving away from the generic AI look and incorporating elements inspired by the uploaded screenshots. While still a first draft, it is much closer to a professional, desired outcome, demonstrating the power of providing specific visual context to the AI model.

## Context

In the rapidly evolving field of AI-powered design, generating high-quality, brand-aligned interfaces remains a challenge. Generic AI outputs often lack the nuanced aesthetic and specific visual language designers aim for. This video addresses a critical need for designers and developers using AI tools like Claude Code, showing how to guide AI models with targeted visual inspiration. This approach is vital for anyone looking to leverage AI for design while maintaining creative control and achieving more professional results, connecting to broader trends in AI-assisted creative workflows and the demand for personalized AI experiences.