---
metadata:
  videoId: "hSjbxes-wnY"
  title: "The JSON First Design Workflow"
  description: "Brennan shares his new design process: asking the AI to generate realistic JSON sample data first (to account for edge cases), and then generating the UI mockups based on that data.


    👇 **Your Builder Briefing (free)**

    https://buildermethods.com - Your free, 5-minute read to keep up with the latest tools & workflows for building with AI.


    👇 **Use Agent OS** (free open source):

    https://buildermethods.com/agent-os


    👇 **Use Design OS** (free open source):

    https://buildermethods.com/design-os


    👇 **Join Builder Methods Pro**

    https://buildermethods.com/pro - The membership for professionals (and soon-to-be-pros) for building with AI.  Private discord.  Video training library.  Official support for Agent OS.


    ▶️ Related videos:


    💬 Drop a comment with your questions and requests for upcoming videos!


    Chapters:"
  channel: "Brian Casel"
  channelId: "UCSxPE9PHHxQUEt6ajGmQyMA"
  duration: "PT2M20S"
  publishedAt: "2026-02-25T15:01:17Z"
  thumbnailUrl: "https://i.ytimg.com/vi/hSjbxes-wnY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=hSjbxes-wnY"
processedAt: "2026-02-26T23:57:17.098Z"
source: "youtube"
tldr: "Brian Casel introduces a JSON-first design workflow where he uses Claude to generate realistic JSON sample data for a new feature, then uses that data to create a functional UI mockup, ensuring the design is grounded in actual content requirements before visual iteration."
tools:
  - name: "Claude"
    url: null
  - name: "React"
    url: null
  - name: "Tailwind CSS"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "claude"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2813
  outputTokens: 633
  totalTokens: 3446
  processingTimeMs: 50605
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.385Z"
---

## Key Takeaways

A JSON-first workflow uses AI to define content structure before visual design, leading to more functional and realistic prototypes.

*   **Start with JSON data generation** using Claude to create realistic sample content that defines the database model and user needs.

*   **Use the JSON to generate UI mockups** in a tool like React/Tailwind, ensuring the interface is built around actual content requirements.

*   **This sequence prevents design misalignment** by locking in functional details early, avoiding unnecessary UI elements or missing critical features.

## Summary

Brian Casel details a modern design process that begins not with visual wireframes, but with structured data. He starts by using Claude, via its web app, to have a planning conversation about a new product feature. This conversation clarifies the user's job-to-be-done and the specific functionalities required.

Once the requirements are locked in, he instructs Claude to **generate a JSON sample data structure** for the feature. This step is crucial as it creates a realistic model of the database content, complete with plausible names, descriptions, and numerical data, moving far beyond generic Lorem Ipsum placeholder text.

With this JSON data in hand, he then prompts Claude to **create a UI mockup** based on that specific data. While the AI might use tools like React and Tailwind for the output, the focus is on the mockup, not the underlying code. The resulting interface is populated with the realistic content from the JSON, making it a much more accurate and usable prototype.

The core benefit of this **JSON-first sequence** is that it grounds the design in functionality from the outset. If you skip to the UI mockup directly, the AI might add superfluous visual elements or, conversely, omit critical interactive details. By defining the data model first, every button, menu, and data point the interface needs is accounted for before a single pixel is designed, leading to a more coherent and purpose-driven final product.

## Context

This workflow addresses a common pitfall in product design: creating beautiful but non-functional prototypes. It's relevant for product managers, designers, and developers working in agile or AI-assisted environments. By starting with data structure, it aligns with modern development practices like API-first design and ensures the user interface is built to serve real content and user needs, not just aesthetic trends.