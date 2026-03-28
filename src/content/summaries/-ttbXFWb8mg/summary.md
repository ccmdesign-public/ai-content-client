---
metadata:
  videoId: "-ttbXFWb8mg"
  title: "Claude Code + Figma Design System (Designer Workflow Test)"
  description: "I used Claude Code to design directly in Figma using real design system components. This is a full workflow test to see how AI actually handles components, structure, and real product UI.


    I also touched on Figma Skills and how they fit into the workflow.


    🔗 KEY LINKS

    📣 JOIN THE COMMUNITY: https://uicollective.co/\ 

    ❎ Follow me on X: https://x.com/KirkMDesign

    Figma article: https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/

    Figma Skills: https://www.figma.com/community/skills


    Why Join UI Collective Academy? Get access to premium courses, premium downloads, and so much more on the way (I am largely building this solo...trying to make design education available for all, support goes a long way!)


    ↪️ Need a design system? (also included in the academy): https://collectivekit.co/


    🔗 VIDEOS TO WATCH

    Build a Design System: https://youtu.be/opTANvl9G1g

    Complex Design System Setup: https://youtu.be/L-tpK7Eeuow

    AI & Design Systems: https://youtu.be/XfezMs8B-O8

    Design with Claude Code: https://youtu.be/JMQ0X_si144


    🔗 MORE LINKS

    Let us build or fix your design system: https://designsystemlabs.co/

    kirkland@uicollective.co

    📣 Save 20% on the Annual Mobbin plan: http://mobbin.com/uicollective


    0:00 An Introduction

    0:55 Connecting Figma MCP

    1:17 Figma Skills

    2:22 Adding Figma Skill to Claude

    3:01 Adding Second Figma Skill

    3:56 Building AI Design With Our Design System

    5:48 Reviewing Claude Code Output

    7:00 What to Know About This Workflow

    8:25 Outro"
  channel: "UI Collective"
  channelId: "UCBB1ZWZyf0RaKuHgpTjpcug"
  duration: "PT8M49S"
  publishedAt: "2026-03-27T13:01:34Z"
  thumbnailUrl: "https://i.ytimg.com/vi/-ttbXFWb8mg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=-ttbXFWb8mg"
processedAt: "2026-03-28T17:28:06.584Z"
source: "youtube"
tldr: "Figma Skills with Claude Code allow AI to build designs using your design system components, but the current implementation is promising yet imperfect, requiring proper setup and a published design system."
tools:
  - name: "Claude"
    url: null
  - name: "Figma"
    url: null
  - name: "GitHub"
    url: null
  - name: "Slack"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
  - "Tools & Productivity"
tags:
  - "claude"
  - "figma"
  - "ui"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7752
  outputTokens: 951
  totalTokens: 8703
  processingTimeMs: 39484
tagsNormalizedAt: "2026-03-28T18:07:13.820Z"
---

## Key Takeaways

The video demonstrates how to integrate Figma with Claude AI to generate designs using existing design systems, but concludes it's not yet ready for mainstream adoption by designers.

*   **Proper setup is crucial:** You must install the **Figma connector** in Claude, then the prerequisite **Figma skill**, and finally the specific **Figma generate design skill**.

*   **AI can use components but not variables perfectly:** In a test, Claude correctly used button and input components but failed to apply design system variables for spacing, borders, and text styles.

*   **The result is promising but not production-ready:** The workflow creates a responsive first draft, but the effort to correct missing variables and styles currently outweighs the benefit for most designers.

*   **Developers may find more immediate value:** Early feedback suggests developers are benefiting more from Figma Skills in their workflows than designers are at this stage.

## Summary

The video provides a hands-on tutorial for setting up and testing the new integration between Figma and Claude AI, specifically the ability for AI to generate designs using a team's published design system components and variables.

### The Setup Process

To begin, you must install the **Figma connector** within the Claude desktop app under the 'Connectors' section. This authorizes Claude to access your Figma account. The core functionality, however, comes from **Figma Skills**. These are Markdown files that teach Claude how to take specific actions on the Figma canvas.

First, you must install a prerequisite skill (the base `skill.md` from Figma's GitHub) that teaches Claude how to interact with Figma URLs. Then, you install the specific **Figma generate design skill**, which enables the AI to "create new designs in Figma using existing components and variables."

### Testing the Workflow

With the skills installed, the test involves providing Claude with a link to a published design system file and a prompt to build a simple signup page. The prompt specifies using the system's components, a white background, a centered form inside a card, and input components (not field components).

Claude successfully generates a responsive first draft with proper auto-layout. It correctly uses the specified button and input components from the design system library. However, the output reveals significant shortcomings:

*   Design system **variables** for page surfaces, card borders, fills, and drop shadows were not applied.

*   **Text styles** were partially applied (a heading variable was used) but subtext styles were ignored.

*   While components were used correctly, the overall fidelity to the design system's specifications is low.

### Current Verdict and Future Outlook

The creator concludes that while this is a historic first step—the first time AI can directly utilize Figma components—the current output is not efficient for designers. The manual effort required to apply missing variables and correct styles negates the time-saving potential. Interestingly, anecdotal evidence suggests **developers** are finding more practical utility in the current Figma Skills than designers.

The technology is seen as a promising foundation that will likely improve rapidly, especially with anticipated updates around Figma's annual Config conference. For now, it's a tool for early experimentation rather than professional adoption.

## Context

This video addresses a significant frontier in AI-assisted design: moving beyond generating generic visuals to leveraging a company's specific, branded design system. For product teams and designers, this promises faster prototyping and ideation while maintaining brand consistency. It connects to the broader trend of AI moving from a content generator to a collaborative tool that understands and operates within established systems and constraints, a key step for professional adoption.