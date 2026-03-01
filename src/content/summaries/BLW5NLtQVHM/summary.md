---
metadata:
  videoId: "BLW5NLtQVHM"
  title: "My AI Design Process (What Actually Works)"
  description: "This is my real AI + design workflow - how I use AI tools to design faster, automate reviews, and ship better products. If you’re building a SaaS or working on product teams, this breaks down what actually works.


    🔗 KEY LINKS

    📣 JOIN THE COMMUNITY: https://uicollective.co/\ 


    FOLLOW ME ON X (new): https://x.com/KirkMDesign


    Why Join UI Collective Academy? Get access to premium courses, premium downloads, and so much more on the way (I am largely building this solo...trying to make design education available for all, support goes a long way!)


    ↪️ Need a design system? (also included in the academy): https://collectivekit.co/


    🔗 VIDEOS TO WATCH

    Build a Design System: https://youtu.be/opTANvl9G1g

    Complex Design System Setup: https://youtu.be/L-tpK7Eeuow

    AI & Design Systems (similar video): https://youtu.be/XfezMs8B-O8


    🔗 MORE LINKS

    Let us build or fix your design system: https://designsystemlabs.co/

    📣 Save 20% on the Annual Mobbin plan: http://mobbin.com/uicollective

    Figma MCP Catalog: https://www.figma.com/mcp-catalog/

    Google Antigravity: https://antigravity.google/

    Cursor: https://cursor.com/


    0:00 An Introduction

    1:34 What can AI do and not do?

    3:24 Status of current AI Design tools

    6:18 What am I using AI for right now?

    8:05 Google Antigravity

    10:17 Figma Make Comparison

    11:13 Getting started with Google Antigravity

    13:17 Google Antigravity output

    16:02 Same AI model, different result

    16:34 Figma Make & Google Antigravity side-by-side comparison

    17:18 Checking Designs for Errors

    18:46 Figma MCP + Cursor Setup

    19:56 Building a Rule

    24:31 Building a Command

    27:40 Checking the AI output

    29:46 Outro"
  channel: "UI Collective"
  channelId: "UCBB1ZWZyf0RaKuHgpTjpcug"
  duration: "PT30M13S"
  publishedAt: "2026-02-09T14:00:49Z"
  thumbnailUrl: "https://i.ytimg.com/vi/BLW5NLtQVHM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=BLW5NLtQVHM"
processedAt: "2026-02-23T14:42:38.874Z"
source: "youtube"
tldr: "The presenter demonstrates a practical AI-augmented UI design workflow for 2026, focusing on using Google Anti-gravity for high-quality concept generation and AI-assisted design audits via Cursor and Figma MCP to enforce consistency, while arguing that current AI cannot replace designers but can significantly speed up iteration and quality checks."
tools:
  - name: "Figma"
    url: null
  - name: "Figma Make"
    url: null
  - name: "Google Anti-gravity"
    url: "https://anti-gravity.google"
  - name: "Cursor"
    url: "https://cursor.com"
  - name: "Gemini 3 Pro"
    url: null
  - name: "Claude"
    url: null
  - name: "Figma MCP"
    url: null
  - name: "Windsurf"
    url: null
categories:
  - "Product & Design"
  - "AI & Machine Learning"
tags:
  - "ui-design"
  - "ai-design"
  - "figma"
  - "workflow-automation"
  - "design-tools"
  - "prototyping"
  - "design-system"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 23177
  outputTokens: 1566
  totalTokens: 24743
  processingTimeMs: 113544
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

The video outlines a pragmatic, current-state approach to integrating AI into a UI/UX design workflow, focusing on tools that deliver tangible value rather than hype.

*   **AI is currently best for generating high-fidelity concepts and auditing designs, not for producing production-ready Figma files.** Tools like Figma Make produce generic, low-quality outputs, whereas Google Anti-gravity creates client-ready, responsive web concepts through an interactive, step-by-step planning process.

*   **Google Anti-gravity significantly outperforms other AI design tools** by generating mobile-responsive designs with better visual quality and a more realistic, less "AI-generated" feel, making it suitable for early client/stakeholder feedback.

*   **AI-powered design auditing saves immense time on quality assurance.** By connecting Cursor (or similar IDEs) to Figma via MCP, designers can create reusable commands that automatically check designs for spacing, variable usage, and token violations against defined rules.

*   **The core value of AI in design is automating tedious, error-prone tasks** like consistency checks, freeing designers to focus on higher-level creative and strategic work, rather than attempting to fully automate the design creation process.

## Summary

### Introduction and Current AI Limitations in DesignThe video begins by setting realistic expectations for AI in UI/UX design in 2026. The presenter argues that while AI is rapidly evolving, it currently falls short in several key areas for designers. Specifically, tools like **Figma Make** and other AI-powered design generators often produce outputs that are generic, non-responsive, and lack a deep understanding of design systems. They fail to properly use variables, auto-layout, or produce designs of a quality suitable for client presentation without extensive, time-consuming prompting and iteration. The presenter emphasizes that AI is not yet at a point where it can replace a designer, but rather should be viewed as a tool for augmentation and acceleration.

### Generating High-Quality Concepts with Google Anti-gravity
The core of the video's first practical demonstration focuses on **Google Anti-gravity** as a superior tool for concept generation. Unlike Figma Make, which produces static and often flawed mockups, Anti-gravity operates by first building an **implementation plan** with the user, confirming details like colors and typography before generating anything. It then builds a fully interactive, responsive web view in real-time within a browser. The presenter provides a direct comparison using the same prompt for a "futuristic landing page" in both Figma Make and Anti-gravity.

The Figma Make output is criticized for poor spacing, basic visual elements, and an overall "AI-generated" look that would require a complete rebuild. In contrast, the Anti-gravity output features a more sophisticated layout, subtle background patterns, interactive elements, and inherent mobile responsiveness. The presenter notes that while some cleanup is still needed, the Anti-gravity result is something that could be shown to a client or stakeholder for feedback after minimal additional prompting, representing a drastic reduction in iteration time.

### Automating Design Audits with AI and Figma MCP
The second major workflow demonstrated involves using AI to audit existing Figma designs for consistency errors. This process saves hours of manual review. The presenter uses **Cursor** (an AI-powered IDE) connected to Figma via the **Model Context Protocol (MCP)**. The key is setting up a reusable system composed of two parts: a **Rule** and a **Command**.

The **Rule** is a document (stored as an .mdc file in Cursor) that defines the design standards. The example rule includes specifications for outer margins (16px), required use of spacing variables (no raw values), an allowed spacing scale (4, 8, 16, 24, 32, 40, 48), and specific variable assignments for backgrounds (e.g., page background must use `surface.page`, cards use `surface.default`). It also mandates that all colors, radii, borders, and typography must reference variables, with raw values flagged as violations.

The **Command** is an AI instruction set that tells the LLM (like Gemini 3 Pro or Claude) how to use the Rule. It instructs the AI to: 1) Load the provided Figma file, 2) Walk through every frame, component, and style, 3) Understand the spacing, background, type, and variable references for each item, 4) Compare the collected values against the requirements in the Rule, 5) Record any violations with the page/frame name and the current vs. expected value, and 6) Group and present the issues in the chat window.

In a live demo, the presenter runs this command on a simple Figma frame intentionally created with violations (incorrect margin values, a disallowed gap of 28px, and raw hex codes instead of variables). The AI instantly returns a detailed list of violations, demonstrating how this automated check can be scaled to complex design files to ensure system consistency before developer handoff.

### Conclusion and Workflow PhilosophyThe presenter concludes by reiterating the evolving nature of AI in design and the importance of focusing on tools that provide real value in a professional workflow. The philosophy is not to use AI to generate final deliverables, but to **speed up the iterative feedback loop** with high-quality concepts and to **automate the tedious, error-prone QA tasks** that consume designer time. This allows designers to focus on strategy, creativity, and refinement. The video is positioned as the first in a series that will continue to explore new tools and techniques as the landscape develops.

## Context

The speaker is from the **UI Collective**, a channel focused on practical UI/UX design education and workflows. This video contributes to the ongoing conversation about how designers can effectively integrate AI into their daily work without falling for marketing hype or fearing replacement. It's highly relevant as AI design tools proliferate, but many fail to deliver professional-grade results. The presenter takes a grounded, tool-agnostic approach, evaluating options based on their actual output and utility in a client-facing design process. This video is most beneficial for **UI/UX designers, product designers, and design leads** who are skeptical of AI hype but want to understand specific, actionable techniques to leverage AI for concept generation and quality assurance, thereby increasing their efficiency and output quality.