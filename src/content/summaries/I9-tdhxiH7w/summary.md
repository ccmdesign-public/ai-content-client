---
metadata:
  videoId: "I9-tdhxiH7w"
  title: "The Most Powerful Claude Code Pattern I've Found"
  description: "I asked Claude a simple question. What came out was a full software development workflow.


    Two skills. Capture on one side, build on the other. Files in a folder, sub-agents doing the work, commits happening automatically. All of it built by having conversations—no code written by hand.


    This video shows you the workflow I built with Claude Code and exactly how I built it. You'll see the two-terminal setup running live: one Claude capturing ideas as I have them, one Claude working through the queue—planning when it needs to, building, testing, committing, looping.


    But the real point isn't this specific workflow. It's that Claude is really good at building tools for itself. Skills in Claude Code are just markdown files. Claude writes them. And the things you can build are limited only by what you think to ask for.


    If you're using Claude Code, Cursor, Copilot, or any AI coding assistant and you've ever thought \"I wish it could just handle this pattern for me\"—this shows you how to make that happen. Developers building with AI tools, engineers interested in agent workflows, and anyone curious about what's actually possible with Claude Code right now will find something here.


    Both skills are linked below. Take them. Read them. Make them yours.


    THE SKILL REPO

    https://github.com/bladnman/do-work


    #ClaudeCode #AICoding #Skills #Anthropic #AIAgents

    00:00 - Intro

    00:50 - The Problem

    02:33 - A Second Problem

    03:02 - The Idea

    05:19 - Fundamentals

    08:17 - The do-work Skill

    13:19 - Let's See It Cook

    16:04 - Conclusion"
  channel: "Matt Maher"
  channelId: "UC6-EGajbNF0DPD9AJ8oQC1A"
  duration: "PT17M27S"
  publishedAt: "2026-01-28T13:00:38Z"
  thumbnailUrl: "https://i.ytimg.com/vi/I9-tdhxiH7w/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=I9-tdhxiH7w"
processedAt: "2026-03-24T18:03:44.316Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "You can create a fully automated development workflow using Claude Code by building custom skills through conversation, which can manage a queue of feature requests, process them in isolated contexts, and execute changes without manual intervention."
tools:
  - name: "Claude Code"
    url: null
  - name: "GitHub"
    url: null
  - name: "Visual Studio Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "automation"
  - "claude"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 13867
  outputTokens: 770
  totalTokens: 14637
  processingTimeMs: 25381
tagsNormalizedAt: "2026-03-24T22:56:22.855Z"
---

## Key Takeaways

The core message is that Claude can build powerful automation tools for itself through natural conversation, enabling hands-off development workflows.

*   **Build workflows through conversation**: You can design complex, multi-agent systems by simply describing your desired workflow to Claude, which then writes the necessary code.

*   **Use skills as workflow automation**: Claude's **skills** feature can be used to create slash commands that manage tasks, like capturing requests or starting a work loop, far beyond simple API integrations.

*   **Atomic, context-isolated execution**: The demonstrated pattern uses a **sub-agent orchestrator** to process requests in clean, separate contexts, preventing pollution and improving reliability for atomic changes.

## Summary

The video demonstrates a powerful pattern for using Claude Code to automate software development by having it build its own task-management system. The creator started with a simple question—asking if Claude could work through a list of files—and through iterative conversation, co-designed a complete workflow.

### The Problem and Solution

Traditional AI coding often involves interrupting an agent with new ideas, which forces it to re-plan and leads to context pollution. The solution was to create a dedicated system where ideas are captured as individual request files in a `do-work` folder. A separate Claude agent, triggered by a custom skill, then processes this queue autonomously.

### How the Workflow Operates

1.  **Capture**: Using a custom `/do-work` slash command (a skill), the user quickly logs ideas or requests. The skill intelligently groups related items into single tasks to ensure cohesive changes.
2.  **Process**: A main orchestrator agent checks the queue, and for each request, it decides if planning is needed. It then spins up isolated **sub-agents** (planner, builder, evaluator) in new contexts to execute the work, ensuring no cross-task contamination.
3.  **Archive**: Completed tasks are moved to an archive with screenshots, creating an audit trail for future reference or fixes.

### Technical Architecture and Benefits

The system uses an **orchestrator pattern** where a top-level agent manages sub-agents, avoiding complex nested agent calls that can waste tokens. By processing tasks atomically in clean contexts, the success rate is high, and the system can run unattended for extended periods, handling dozens of changes. The entire system was built through conversation with Claude, requiring no manual coding from the user.

## Context

This matters because it represents a shift from using AI assistants for discrete coding tasks to having them build persistent, customized automation for your specific development process. It's relevant for developers, product managers, and anyone who repeatedly performs structured tasks and wishes to automate their workflow. This approach connects to the broader trend of using natural language to create software tools, lowering the barrier to workflow automation and personalized productivity systems.