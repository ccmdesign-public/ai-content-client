---
metadata:
  videoId: "qSziR62ZGEM"
  title: "Audit Figma Designs in Minutes With AI"
  description: "In this video, I show how I audit Figma designs using AI with Cursor & Figma MCP. This is a simple, repeatable workflow to catch spacing, color, and layout issues faster without manually reviewing every frame. If you want a cleaner handoff and fewer missed details, this walkthrough shows exactly how I do it.


    🔗 KEY LINKS

    📣 JOIN THE COMMUNITY: https://uicollective.co/\ 


    Why Join UI Collective Academy? Get access to premium courses, premium downloads, and so much more on the way (I am largely building this solo...trying to make design education available for all, support goes a long way!)


    ↪️ Need a design system? (also included in the academy): https://collectivekit.co/


    Follow me on X: https://x.com/KirkMDesign


    🔗 VIDEOS TO WATCH

    Build a Design System: https://youtu.be/opTANvl9G1g

    Figma Variable Library Setup: https://youtu.be/L-tpK7Eeuow

    Build Responsive Figma Designs: https://youtu.be/NzFXc6PULh8


    🔗 MORE LINKS

    Let us build or fix your design system: https://designsystemlabs.co/

    kirkland@uicollective.co

    📣 Save 20% on the Annual Mobbin plan: http://mobbin.com/uicollective


    Agenda

    0:00 An Introduction

    1:09 Setting the Scene

    3:54 Cursor and Figma MCP Setup

    5:21 Using Cursor and AI to Audit for Spacing

    8:43 Building Cursor Rule

    12:30 Building Cursor Command

    18:05 Figma File Setup

    19:02 Testing the AI Command

    19:40 Reviewing the Output

    21:41 Auditing Designs for Figma Variable Issues

    23:43 Design Token Rant

    25:08 Separating Out Design Tokens

    27:49 Building the Figma Variable Rules

    29:35 Reviewing Cursor Rules

    30:24 Building the Command

    34:07 Figma File Prep

    34:39 Testing the AI Output

    36:17 AI Limitation - Figma Styles"
  channel: "UI Collective"
  channelId: "UCBB1ZWZyf0RaKuHgpTjpcug"
  duration: "PT36M58S"
  publishedAt: "2026-02-02T13:59:28Z"
  thumbnailUrl: "https://i.ytimg.com/vi/qSziR62ZGEM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=qSziR62ZGEM"
processedAt: "2026-02-23T14:44:01.444Z"
source: "youtube"
tldr: "This tutorial demonstrates how to build a targeted AI audit system using Cursor and Figma MCP to automatically check Figma designs for spacing inconsistencies and color variable misapplications, focusing on specific design system rules rather than general feedback."
tools:
  - name: "Cursor"
    url: null
  - name: "Figma"
    url: null
  - name: "Figma MCP"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Claude"
    url: null
  - name: "Gemini"
    url: null
  - name: "Slack"
    url: null
  - name: "X"
    url: null
categories:
  - "Product & Design"
  - "AI & Machine Learning"
tags:
  - "figma"
  - "ai-design"
  - "design-systems"
  - "cursor-ai"
  - "ui-ux"
  - "product-design"
  - "automation"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 26506
  outputTokens: 1875
  totalTokens: 28381
  processingTimeMs: 49149
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

The video from UI Collective teaches designers how to implement precise AI auditing for Figma designs. The instructor emphasizes moving beyond generic AI feedback to create targeted systems that catch specific technical mistakes before handoff.

*   **Avoid generic AI feedback requests** like "give feedback on this design" as they lack context and can lead to irrelevant suggestions that undermine designer confidence.

*   **Build targeted AI rules and commands** using tools like Cursor to create reusable, focused checks for specific issues like spacing values and color variable application.

*   **Separate rules from commands** for maintainability: store design system specifications (e.g., spacing values for desktop/mobile) in rules, and create high-level commands that reference those rules for execution.

*   **Focus audits on page-level elements**, not components: audit spacing between cards, page margins, and text element gaps, assuming individual components are already validated.

*   **Simplify variable audits** by feeding AI only the core tokens (surface, text, icon, border colors) you'd manually apply when building a page, not every token in a complex design system.

*   **Use AI to generate rules from documentation**: you can provide a Figma page with token tables and have AI automatically build the corresponding Cursor rules, saving manual setup time.

## Summary

### Introduction and PhilosophyThe video begins by addressing a request from a viewer for a simpler tutorial on using AI to audit Figma pages for basic mistakes. The instructor clarifies this is not about getting general design feedback from AI models like ChatGPT or Claude. He argues that approach is flawed because AI lacks context about the application, design system, and project goals, leading to generic feedback that can cause designers to second-guess themselves.

He establishes a core philosophy: designers should use AI for targeted, technical audits to catch inconsistencies before developer handoff, not for creative or user flow feedback. This preserves the designer's role and ensures AI augments rather than replaces their expertise. The goal is to build a system that checks for specific issues like incorrect spacing values and misapplied color variables.

### Setting Up the Foundation with Cursor and Figma MCP

The technical foundation is built using **Cursor**, an AI workspace, connected to **Figma** via the **Figma MCP (Model Context Protocol)**. This connection allows the AI to read and analyze Figma design files directly. The instructor walks through downloading Cursor, accessing the Figma MCP catalog, and authenticating the connection. This setup is crucial as it enables the subsequent AI commands to interact with live Figma designs.

### Building a Spacing Audit SystemThe first major audit system focuses on spacing inconsistencies—a common source of bugs and visual polish issues. The instructor explains why overly granular rules (e.g., specific padding for every button size) become unmaintainable. Instead, he advocates for auditing page-level spacing: page margins, spacing between cards/widgets, and spacing between text elements (like headings and paragraphs).

The process involves two parts in Cursor. First, a **Rule** is created (e.g., `spacing-rules.md`) that defines the baseline values. For example:

*   Desktop: Page Margin: 64px, Card/Widget Gap: 24px, Heading/Paragraph Gap: 20px

*   Mobile: Page Margin: 32px, Card/Widget Gap: 20px, Heading/Paragraph Gap: 16px

The rule also includes exclusions, like ignoring components and atom components, to keep the audit focused.

Second, a reusable **Command** is built (e.g., `check-spacing`). This command references the spacing rule and provides step-by-step instructions for the AI:
1.  Identify the frame(s) being analyzed (desktop or mobile).
2.  Measure edge-to-content spacing (page margin) and compare to the baseline.
3.  Measure spacing between cards/widgets and compare.
4.  Measure spacing between text elements and compare.
5.  Output a list of mismatches in the chat, specifying the frame name and required changes.

The instructor demonstrates the command by providing links to sample Figma frames with intentional errors. The AI successfully identifies that a desktop page margin of 60px should be 64px, a card gap of 28px should be 24px, and a heading/paragraph gap of 12px should be 20px. It repeats the process correctly for a mobile frame, using the different values defined in the rule.

### Building a Color Variable Audit SystemThe second system audits the correct application of Figma color variables (or tokens). The instructor stresses simplification. Instead of feeding the AI every token from a complex design system (like error, success, warning states), you should only provide the core variables a designer would manually apply when building a page: surface colors, text colors, icon colors, and border colors.

He demonstrates a clever shortcut. Instead of manually writing rules for each token group, he creates a Figma page with tables listing the simplified tokens, their light/dark mode values, and descriptions of when to use them. He then asks the Cursor AI to **automatically generate four Cursor rules** (for surface, text, icon, and border) based solely on the content of that provided Figma page. This automates the rule-creation process.

With the rules generated, he builds a `check-variables` command. Its steps instruct the AI to:
1.  Understand the frames and widgets in context.
2.  Check all text elements, confirm colors match the text color rules, and note any raw hex codes.
3.  Repeat for surface elements, icon elements, and border elements.
4.  Output a list of color issues, grouped by type, in a new markdown file named after the parent frame.

Testing the command on a sample frame, the AI correctly flags several issues: text with no variable applied (just a hex code), a page background using `surface/secondary` instead of `surface/page`, a card using `surface/page` where `surface/default` or `surface/secondary` is more appropriate, and a `border/focus` applied to a non-interactive element, which it flags for review. It correctly reports no icon color issues when none are present.

### Limitations and ConclusionThe instructor notes a current limitation: Figma MCP cannot identify **text styles**, only color variables. This means audits for detached or incorrectly applied text styles are not yet possible, though this may change in the future.

He concludes by emphasizing the power of this targeted approach, especially for large client design files. By creating these reusable, rule-based AI commands, designers can automate the tedious technical checks for spacing and variables, ensuring consistency and freeing up time for higher-value design work. The entire system is built to be a scalable, maintainable part of a professional design workflow.

## Context

The speaker is an instructor from the **UI Collective**, a community and academy focused on product design and design systems. He specializes in teaching designers how to effectively integrate AI into their workflows without being replaced by it. This video contributes to the growing conversation about **practical AI for designers**, moving beyond hype to implement systems that solve real, daily problems like QA and consistency checks. It's highly relevant as design teams seek efficiency and accuracy, especially when working with complex design systems and handoffs to development. This tutorial is most beneficial for **product designers, design system managers, and UX/UI professionals** who use Figma and want to leverage AI for technical validation, not creative direction. It assumes a basic familiarity with Figma and design systems but requires no coding background for the Cursor setup demonstrated.