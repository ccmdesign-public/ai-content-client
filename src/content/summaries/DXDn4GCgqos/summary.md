---
metadata:
  videoId: "DXDn4GCgqos"
  title: "I Fixed AI Document Formatting With One Claude Feature"
  description: "PAID STUFF

    📲 25-Min AI Strategy Call (Biz Owners/Leaders): https://cal.com/dylan-davis-d04ip9/25-min-ai-strategy-call-biz-owners-leaders?utm_source=youtube&utm_medium=video&utm_campaign=AI_doc_formats&utm_content=strategy_call

    🔍 AI Community: https://community.gradientlabs.co/

    💪 AI Coaching: https://ai-coaching.gradientlabs.co/?utm_source=youtube&utm_medium=video&utm_campaign=AI_doc_formats&utm_content=ai_coaching

    🛠️ Custom AI Solutions: https://custom-solutions.gradientlabs.co/?utm_source=youtube&utm_medium=video&utm_campaign=AI_doc_formats&utm_content=custom_ai_solutions


    FREE STUFF

    💌 30-Day AI Insights: https://insights.gradientlabs.co/?utm_source=youtube&utm_medium=video&utm_campaign=AI_doc_formats&utm_content=ai_insights


    SOCIALS

    LinkedIn: https://www.linkedin.com/in/dylantdavis/


    —

    Chapters

    00:00 - Intro

    00:21 - The basic approach\ 

    08:02 - The recommended approach

    14:14 - Recap

    14:56 - Outro"
  channel: "Dylan Davis"
  channelId: "UCVzcPkOAnbnzOpJzOCDNHwQ"
  duration: "PT15M36S"
  publishedAt: "2025-12-11T19:00:19Z"
  thumbnailUrl: "https://i.ytimg.com/vi/DXDn4GCgqos/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=DXDn4GCgqos"
processedAt: "2026-03-12T15:24:18.383Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Use Claude's 'Skill Creator' feature to reverse-engineer document templates, embed them as skills, and get AI-generated documents with pixel-perfect company formatting for SOPs, contracts, and proposals."
tools:
  - name: "Claude"
    url: null
  - name: "OpenAI"
    url: null
  - name: "Gemini"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-general"
  - "automation"
  - "claude"
  - "content-creation"
  - "llm"
  - "productivity"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 14796
  outputTokens: 691
  totalTokens: 15487
  processingTimeMs: 58419
tagsNormalizedAt: "2026-03-12T16:13:04.221Z"
---

## Key Takeaways

This video demonstrates a workflow to make AI-generated documents match your company's exact formatting by using Claude's advanced features. Key insights include:

## Summary

The presenter addresses the common frustration where AI generates great content but fails to match company-specific document formatting. He outlines a two-pronged solution: a basic approach and an advanced method that delivers perfect results.

### The Basic Workflow

First, create an **empty template document** with all your desired formatting, fonts, and styling. This serves as the target. Next, craft a **system prompt** using a three-part structure: the **what** (task and role), the **why** (intent), and the **how** (constraints like reading level and output format). Then, use a **prompt improver** (available in Claude and OpenAI) to enhance this prompt with best practices. Finally, embed this improved prompt and the template file into a **Claude Project** to create a reusable AI agent for that specific task.

### The Advanced Solution for Perfect Formatting

The core innovation uses Claude's **Skills** feature. Start by having Claude **reverse-engineer your template**. Upload the template and ask Claude to methodically extract the exact design, including colors, fonts, spacing, and logos. Claude outputs a package of files (markdown, code, images) representing this design.

Next, use the pre-built **Skill Creator** skill (provided by Anthropic in Claude's settings) to turn this extracted design into a new, custom skill. You simply upload the extracted files and instruct the Skill Creator to build a skill that replicates the template pixel-for-pixel.

Finally, **update your Claude Project** by adding a single line to its system instructions: a command to always use the newly created skill when generating documents. This ensures every output from the project perfectly matches your original template's formatting, eliminating manual reformatting work.

### Broader Applications

The skill created is portable; you can download the skill files and use them with other AI providers like GPT or Gemini by instructing them to reference the skill. This method applies to any document type, including SOPs, contracts, proposals, and meeting notes.

## Context

Companies rely on consistent, branded document formatting for professional communications like SOPs, proposals, and contracts. While AI excels at content creation, it historically struggles to replicate specific corporate styling, forcing employees to waste time manually reformatting AI output. This workflow solves a critical productivity gap in business automation, allowing teams to fully leverage AI for document generation while maintaining brand integrity and professional standards.