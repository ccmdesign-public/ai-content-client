---
metadata:
  videoId: "rmOFxbdY4oU"
  title: "The more I told Claude, the worse it got. Here's what I do now."
  description: "WORK WITH ME

    📲 25-Min AI Strategy Call (Biz Owners/Leaders): https://go.gradientlabs.co/the-more-i-told-claude-the-worse-it-got-heres-what-i-do-now/strategy

    🔍 AI Community: https://go.gradientlabs.co/the-more-i-told-claude-the-worse-it-got-heres-what-i-do-now/community

    💪 AI Coaching: https://go.gradientlabs.co/the-more-i-told-claude-the-worse-it-got-heres-what-i-do-now/coaching

    🛠️ Custom AI Solutions: https://go.gradientlabs.co/the-more-i-told-claude-the-worse-it-got-heres-what-i-do-now/custom


    FREE STUFF

    💌 30-Day AI Insights: https://go.gradientlabs.co/the-more-i-told-claude-the-worse-it-got-heres-what-i-do-now/insights


    SOCIALS

    LinkedIn: https://www.linkedin.com/in/dylantdavis/


    Presentation (with prompts): https://d-squared70.github.io/The-more-I-told-Claude-the-worse-it-got.-Here-s-what-I-do-now./


    —

    Chapters

    00:00 - Intro

    00:23 - The problem

    01:10 - Skills

    04:32 - When to use skills

    05:36 - Creating skills

    09:09 - Too many skills

    11:49 - Take action

    12:24 - Recap

    13:23 - Outro"
  channel: "Dylan Davis"
  channelId: "UCVzcPkOAnbnzOpJzOCDNHwQ"
  duration: "PT14M5S"
  publishedAt: "2026-03-24T18:00:54Z"
  thumbnailUrl: "https://i.ytimg.com/vi/rmOFxbdY4oU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=rmOFxbdY4oU"
processedAt: "2026-03-24T18:54:30.650Z"
source: "youtube"
tldr: "Overloading AI instructions degrades output; use 'skills' (on-demand folders with a skill.md file) for repetitive, strict-format tasks, created via three AI-assisted methods: complete-and-capture, reverse interview, or answering three key questions."
tools:
  - name: "Claude"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Gemini"
    url: null
  - name: "Cursor"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Claude Co-Work"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "automation"
  - "chatgpt"
  - "claude"
  - "llm"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 13118
  outputTokens: 1103
  totalTokens: 14221
  processingTimeMs: 289376
tagsNormalizedAt: "2026-03-24T22:58:30.518Z"
---

## Key Takeaways

This video explains the 'skills' concept to overcome AI's limited working memory when given long instructions.

*   **Too many instructions hurt AI performance** because they fill the model's 'head', leaving less capacity for actual reasoning.

*   **'Skills' are on-demand resources** (a folder with a skill.md file and optional subfolders) that the AI loads only when needed, preserving its working memory.

*   **Use skills for repetitive, strict-format tasks** (e.g., proposals, SOPs) done more than 3 times a week; use general instructions for loose-format or one-off tasks.

*   **AI can create skills for you** using three methods: capturing a successful chat, a reverse interview, or answering 'what it does', 'when to use it', and 'what good looks like'.

## Summary

A common mistake when using AI assistants like Claude or ChatGPT is to keep adding detail to system instructions, believing it will improve results. However, there's a point of diminishing returns where longer instructions actually degrade the AI's output quality. This happens because all instructions are loaded into the model's context window (its 'working memory') every time, leaving less space for it to think about your actual request.

To solve this, major AI labs (OpenAI, Anthropic, Google) have introduced a concept called **'skills'**. A skill is a self-contained, reusable module that the AI loads **on-demand**, not all at once. It's simply a folder containing a mandatory `skill.md` file (with a crucial 1-2 sentence description) and optional subfolders for references, scripts, or assets.

### How Skills Work with Instructions

Think of your main **instructions as the manager**: they set the AI's overall purpose and rules, and contain callouts to available skills. A **skill is the specialist**: it's only loaded when the AI determines it's needed for a specific, repetitive task (like writing an SOP or a formatted proposal). This on-demand loading prevents context overload.

### When to Use a Skill vs. Instructions

Use a skill when a task is:

*   **Repetitive** (done more than 3 times a week)
*   Has a **strict format or process** (e.g., company-branded documents)
Use standard instructions for:

*   Repetitive but loose-format tasks (brainstorming, research)
*   One-off tasks, whether strict or loose

### Three Ways to Create Skills (Using AI)

You don't have to build skills manually; AI can create them.
1.  **Complete & Capture**: After a successful AI conversation, paste a prompt asking the AI to turn that entire process into a reusable skill.
2.  **Reverse Interview**: In a new chat, tell the AI you need a skill for [task]. It will then interview you with 15-20 questions to extract the process and build the skill.
3.  **Three-Question Method**: Provide detailed, dictated answers to: "What does this skill do?", "When should I use it? (include trigger phrases)", and "What does good output look like? (provide an example)".

### Managing Your Skills

Creating too many similar skills can confuse the AI. The sweet spot is 5-10 skills per major task area. To manage skills:

*   **Run an AI audit**: Ask the AI to review all skill descriptions, flag similar ones, and suggest merges or clearer, distinct descriptions.

*   **Use project-specific skills in desktop agents** (like Cursor or Claude Code): Store skills in specific project folders so the AI only sees relevant ones, reducing confusion.

## Context

This matters because as professionals integrate AI more deeply into workflows, they hit a wall where adding more guidance makes the AI perform worse, not better. Understanding the 'skills' paradigm is key to building reliable, high-quality AI assistants for repetitive business tasks like document generation, data formatting, and process automation. It's a fundamental shift from monolithic prompts to modular, context-aware AI toolkits.