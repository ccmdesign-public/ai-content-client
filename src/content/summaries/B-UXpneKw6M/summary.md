---
metadata:
  videoId: "B-UXpneKw6M"
  title: "The One Rule Claude Code's Creator Never Breaks"
  description: "This claude code tutorial reveals how Boris (the actual creator of Claude Code at Anthropic) uses it daily. Learn his claude code setup, essential claude code tips for vibe coding, and exactly how to use claude code like a pro developer.


    Links

    Claude Browser Extension Video:

    https://youtu.be/NuKrtiJqW3Y?si=7Hi_ubVdlC8jalFC


    Ralph Wiggum Plugin Video:

    https://youtu.be/MFJ0mH72_qI?si=8GN4_7kMy0D9HVip




    We sat down with Boris from Anthropic to learn the claude code skills that separate beginners from power users. This claude code tutorial covers everything from verification techniques to running parallel sessions.


    You'll discover how to use claude code as a full orchestration system, not just for coding. Boris explains his claude code agents workflow, running 5 sessions simultaneously and using background agents for long-running tasks. We cover claude code subagents for automating architecture verification, refactoring, and build validation.


    Wondering about claude code vs cursor? While cursor has its place, claude code desktop and claude code vscode integrations offer unique advantages for AI assisted development. We also address whether claude code free options exist and how to maximize value.


    Key topics include:


    The claude.md file structure Boris uses (only 2.5k tokens)

    MCP server integrations with Slack, Notion, and more

    Plan mode vs Auto Accept vs permissions management

    Using Opus 4.5 with Thinking for fewer errors

    GitHub Actions for automated PR reviews

    Verification led development with ai agents


    This isn't just prompt engineering theory. It's real artificial intelligence workflow from someone building ai tools at the frontier. Whether you're into chatgpt, cursor, openai products, or claude specifically, these coding techniques apply across the board.


    Hashtags

    #ai #vibecoding #chatgpt #cursor #coding #claude #openai #promptengineering #aiagents #artificialintelligence #aitools #claudecode #claudecodetutorial"
  channel: "AI LABS"
  channelId: "UCelfWQr9sXVMTvBzviPGlFw"
  duration: "PT9M55S"
  publishedAt: "2026-01-09T14:02:22Z"
  thumbnailUrl: "https://i.ytimg.com/vi/B-UXpneKw6M/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=B-UXpneKw6M"
processedAt: "2026-01-10T19:50:41.772Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Boris, the creator of Claude Code, follows one non-negotiable rule: **Verification-Led Development**.

  - Never let Claude work without a feedback loop, such as automated tests, bash commands, or UI simulators.

  - Maintain a dynamic `claude.md` file to prevent repetitive errors.

  - Use **Plan Mode** to finalize architecture before execution to treat the AI like a high-performing junior developer.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2952
  outputTokens: 921
  totalTokens: 4729
  processingTimeMs: 13505
tools:
  - name: "Claude Code"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "Slack"
    url: null
  - name: "Notion"
    url: null
  - name: "BigQuery"
    url: null
  - name: "GitHub Actions"
    url: null
  - name: "Sentry"
    url: null
  - name: "Visual Studio Code"
    url: null
  - name: "Ralph Wiggum Plugin"
    url: "https://youtu.be/MFJ0mH72_qI?si=8GN4_7kMy0D9HVip"
  - name: "Claude Browser Extension"
    url: "https://youtu.be/NuKrtiJqW3Y?si=7Hi_ubVdlC8jalFC"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "claude"
  - "git"
  - "testing"
  - "workflow"
tagsNormalizedAt: "2026-03-01T21:19:30.359Z"
---

## Key Takeaways

Boris emphasizes shifting from a 'prompt-and-hope' mindset to an agentic workflow that prioritizes validation and structured context.

* **Verification-Led Development** is the most critical habit; always provide Claude with a way to check its work through Python tests, Linters, or UI screenshots via browser extensions.

* The **claude.md** file serves as the 'brain' of the repository; it should be updated multiple times a week by the entire team to include text stacks, project structures, and a list of anti-patterns to avoid.

* Efficient workflows rely on **Plan Mode** for initial reasoning and **Opus 4.5** with thinking enabled, which, despite being slower, significantly reduces the 'human steering' time required to fix errors.

* Claude Code is an **Orchestrator**, not just a coding tool; by using Model Context Protocol (MCP), it can manage Slack, Big

Query, and Notion directly from the terminal.

## Summary

The creator of Claude Code, Boris, provides a masterclass in using AI agents effectively by treating them as capable but supervised junior developers. The core of his approach is **Verification**. Instead of getting frustrated when Claude makes a minor error, Boris insists that users must provide a feedback loop. This involves telling Claude to write tests alongside its code or using the **claude.md** file to define how work should be verified before it is considered finished. This prevents the 'hallucination' cycle by forcing the model to run its own code and analyze the output.

### The Role of claude.md and Configuration
A project's success with Claude Code depends heavily on the **claude.md** file. Boris suggests this should be a living document that grows with the project. It should contain the tech stack, code style conventions, and most importantly, a 'do not do' list. By adding specific errors or bad patterns encountered in previous sessions to this file, the team ensures the AI doesn't repeat the same mistakes. Furthermore, sharing **settings.json** within the `.claude` folder allows teams to synchronize permissions for terminal commands, ensuring everyone uses the same safety guardrails.

### Strategic Workflow and Model Selection
Boris outlines a specific hierarchy for interacting with the agent. He starts in **Plan Mode** to describe the task and finalize the logic. Only after the plan is verified does he switch to **Auto-accept** mode to execute file edits. Interestingly, Boris prefers using **Opus 4.5** with thinking enabled for almost all tasks. While slower than Sonnet or Haiku, the lower error rate means the developer spends less time 'steering' the model, leading to higher overall productivity. 

### Orchestration and Remote Workflows
Beyond simple coding, Boris uses Claude Code as a central command center for various workflows. Through **MCP (Model Context Protocol)**, Claude interacts with tools like Sentry, Big

Query, and Notion. This allows the AI to populate databases or analyze business data without leaving the CLI. For long-running tasks, Boris utilizes **background agents** and 'cloud sessions'—even using his phone to trigger tasks that Claude finishes in the background, eventually pushing the changes to a new Git

Hub branch for review. This 'teleporting' of sessions between cloud and local environments represents the future of mobile-to-desktop development pipelines.

## Context

As AI moves from simple chatbots to autonomous agents, the tools used to control them are becoming increasingly sophisticated. Boris, as the lead creator of Anthropic's Claude Code, provides a blueprint for 'Agentic Engineering.' This matters because it marks a shift in software development where the engineer's role moves from writing every line of code to orchestrating multiple AI agents, maintaining context via configuration files, and designing robust verification systems. This is particularly relevant for full-stack developers and teams looking to scale their output by integrating AI directly into their terminal and CI/CD pipelines.
