---
metadata:
  videoId: "Y0n6F9VlLVc"
  title: "The 2026 AI Design Field Report (tools, process, and what's working)"
  description: "There's been a heck of a debate around the future of coding and design tools lately... but what's actually happening inside of today's top teams?


    Where is all this headed and how does the future of our tools shape the role of a designer?


    Today's episode is with Stephen Haney (https://x.com/sdothaney) who is the founder of the new design tool Paper.


    And for the last few months he's studied how design teams actually use AI in their everyday roles... everything from tooling to prototyping to process.


    He walks us through some of his key findings and how that's shaping his product strategy for Paper 👇


    Some highlights:


    - The “designer playground” approach

    - How AI adoption looks at startups vs. big companies

    - Why designers at big companies aren’t PRing to production

    - AI usage being mandated in performance reviews for designers

    - The new localhost sharing problem and how teams are solving it

    - Why local development is winning over cloud tools for design teams

    - Why companies use of AI tools doesn’t match what you see on Twitter


    Basecamp’s “Shape Up” project management philosophy (https://basecamp.com/shapeup)


    Dive is where the best designers never stop learning 🤿


    🌐 dive.club

    🐦 twitter.com/joindiveclub


    Now you can join advanced courses taught by the top designers to help you take a huge leap forward in your career 💪


    Chapters

    0:00 Intro

    1:02 The new version of \"should designers code?\"

    3:36 Stephen's continuum for building products

    11:56 What Stephen has learned researching today's top design teams

    15:10 Claude Code/Cursor vs. AI prototyping tools

    18:05 An example of designers shipping at startups

    19:51 The new Localhost problem

    24:26 Is AI prototyping actually faster?

    27:30 The network effects of AI

    30:53 How Paper's product strategy has evolved

    37:53 The changing  role of design tools as the source of truth \ 

    39:25 Paper's Tailwind partnership\ 

    41:54 Stephen's advice to designers"
  channel: "Dive Club 🤿"
  channelId: "UCkCnraWwlnBw1_i7C9-3p0w"
  duration: "PT48M30S"
  publishedAt: "2026-01-19T13:01:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Y0n6F9VlLVc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Y0n6F9VlLVc"
processedAt: "2026-01-19T16:21:24.159Z"
source: "youtube"
tldr: "Steven Haney presents a ground-truth field report on how elite design teams at Shopify, Notion, and Atlassian are actually integrating AI.

  - **Stateful prototyping** is the primary AI unlock, replacing static vector 'noodles' with interactive code.

  - Large companies are mandating AI usage in **performance reviews** while creating isolated 'designer forks' of codebases.

  - The future of design relie"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 14759
  outputTokens: 1604
  totalTokens: 18153
  processingTimeMs: 54675
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tools:
  - name: "Paper"
    url: null
  - name: "Shape Up"
    url: "https://basecamp.com/shapeup"
  - name: "Claude Code"
    url: null
  - name: "Cursor"
    url: null
  - name: "Tailwind"
    url: null
  - name: "Radix UI"
    url: null
  - name: "Next.js"
    url: null
  - name: "Figma"
    url: null
  - name: "Model Context Protocol"
    url: null
categories:
  - "Product & Design"
  - "AI & Machine Learning"
tags:
  - ai-coding
  - claude
  - figma
  - tailwind
  - ux
  - ui
  - design-systems
---

## Key Takeaways

Steven Haney explores the transition from static vector design to AI-driven interactive prototyping, highlighting a fundamental shift from visual hand-offs to shared code contexts.

* **AI Proficiency Mandates**: High-growth tech companies have begun including AI tool usage as a core metric in designer performance reviews to force exploration beyond traditional vector tools.

* **The Designer Playground**: Leading teams are creating dedicated forks of their production repos for designers. This allows for 'designer playgrounds' where UX can be refined in code without the burden of production maintenance or on-call duties.

* **Stateful vs. Stateless Design**: AI’s biggest impact is in **stateful prototyping** (handling focus states, loading indicators, and hover effects), areas where Figma has traditionally struggled due to its static nature.

* **The Modern Stack Lock-in**: A network effect is forming around **Tailwind** and **Radix UI**. Because LLMs are trained heavily on these libraries, they are becoming the permanent primitives of AI-driven design.

* **Context Management**: The future role of a design tool is to serve as a **context layer**, where a canvas-aware agent can 'see' images, documentation, and components to better inform coding agents.

## Summary

### The Shift from Static Vectors to Stateful Prototyping

Steven Haney begins by addressing the polarizing debate regarding the future of design tools. While Twitter discourse often suggests that vector-based tools are 'dead,' the reality inside top-tier teams like **Shopify** and **Atlassian** is more nuanced. The most significant shift is the move toward **stateful prototyping**. For years, designers have struggled with Figma’s 'noodle' system to represent simple interactive states like hover effects, data-loading transitions, or focus management. AI tools like **Cursor** and **Cloud Code** allow designers to bypass these limitations by generating interactive code prototypes that behave like the real product.

This shift is not necessarily about designers becoming full-stack engineers. Instead, it is about expanding the **'Search' phase** of design. If design is a search for the best solution to a problem, AI-powered code allows designers to search the interactive problem space much faster than they could by drawing 50 static screens. However, Haney emphasizes that design and engineering remain distinct specializations: design is about expansion and exploration, while engineering is about narrowing down, reliability, and scale.

### The Field Report: AI in the Enterprise

Haney’s 'Field Report' reveals that AI adoption is no longer optional at major tech firms. Many companies are now mandating AI usage within **performance reviews**, forcing designers to experiment with tools they might otherwise ignore due to the friction of shipping deadlines. Interestingly, these companies are not encouraging designers to push code directly to production. Instead, they are implementing **Designer Playgrounds**—isolated forks of the production codebase where designers can 'make a mess' and refine the UX in a real environment without needing to manage linting, environment variables, or reliability concerns.

This workflow preserves the concept of **handoff** but evolves it. The designer provides a high-fidelity, interactive code prototype as a 'spec' with much more information than a static vector file could ever contain. Haney notes that while some claim handoff is dead, the specialization of roles remains important because designers do not want to be 'on call' or responsible for backend reliability (the 'pager' problem).

### The Architecture of Future Design Tools

As the founder of **Paper**, Haney is pivoting his product strategy to align with these findings. The future of design tools is not as a closed 'walled garden,' but as an open, programmable **context layer**. Paper is transitioning into a desktop application that supports **MCP (Model Context Protocol)**. This allows a central AI agent (like Claude or a custom Paper agent) to bridge the gap between a design canvas and an IDE like Cursor. In this vision, the canvas is an 'input method' for the agent—a place to arrange visual context, variable fonts, and design tokens that the agent can then interpret to write better code.

This leads to the concept of **Canvas-Aware Agents**. A terminal is a poor interface for visual context, but a canvas is excellent. By making the canvas programmable and accessible via APIs, Haney believes we can create a workflow where a designer selects a group of elements on a canvas and tells a coding agent, 'Use this visual context to update the UI in my IDE.' This creates a seamless loop between drawing, prompting, and reviewing code.

### The 'Modern Web Stack' Flywheel and AI Primitives

A critical observation in the report is the 'flywheel' effect surrounding the modern web stack. Libraries like **Tailwind**, **Radix UI**, and **Next.js** have become so dominant in the training data for LLMs that the AI is significantly better at writing code using these specific tools. This creates a feedback loop: teams use these tools because the AI supports them, which generates more code for the AI to learn from, making other libraries even harder to adopt. Haney suggests we may have reached 'Peak Library,' where the primitives of the web are now effectively locked in by AI optimization.

Paper’s partnership with the **Tailwind CSS** team reflects this reality. By integrating Tailwind as a first-class citizen—using its tokens and theming logic as the design tool’s native engine—the gap between design and engineering vanishes. This allows designers to work with the same 'primitives' that the AI agent and the production code use, ensuring that every design choice is technically idiomatic from the start.

### Advice for the AI-Era Designer

Haney concludes with advice for designers feeling 'FOMO' or overwhelmed by the pace of change. He emphasizes that while the tools are changing, the core craft of **problem-solving** remains the same. Designers should 'lean in' and spend time tinkering, not because they need to replace their old skills, but to find the 'joy in exploration.' He notes that even the most advanced AI researchers feel 'behind,' suggesting that the current moment is an era of universal experimentation where no one has all the answers yet.

## Context

Steven Haney is the founder of Paper, a next-generation design tool, and possesses a rare hybrid background as both a high-level designer and engineer. The host, Rid, runs Dive Club, a premier community for product designers. This conversation takes place in early 2026, a pivotal moment where the initial 'AI hype' is being replaced by institutionalized workflows in major tech companies. The video is a response to the ongoing debate between 'traditional' vector-based design (represented by Figma) and the rise of 'AI-aided building' (represented by Cursor). It is essential viewing for design leaders trying to set team strategy and individual designers looking to stay relevant as 'stateful prototyping' becomes a standard requirement in the industry. It provides a rare look at how companies like Shopify and Atlassian are structured to accommodate AI without breaking production stability.