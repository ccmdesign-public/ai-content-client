---
metadata:
  videoId: "xdR4XD-Q8po"
  title: "I Taught Claude to Take Notes on Itself (Now It Gets Smarter Every Session)"
  description: "WORK WITH ME

    📲 25-Min AI Strategy Call (Biz Owners/Leaders): https://go.gradientlabs.co/i-taught-claude-to-take-notes-on-itself-now-it-gets-smarter-every-session/strategy

    🔍 AI Community: https://go.gradientlabs.co/i-taught-claude-to-take-notes-on-itself-now-it-gets-smarter-every-session/community

    💪 AI Coaching: https://go.gradientlabs.co/i-taught-claude-to-take-notes-on-itself-now-it-gets-smarter-every-session/coaching

    🛠️ Custom AI Solutions: https://go.gradientlabs.co/i-taught-claude-to-take-notes-on-itself-now-it-gets-smarter-every-session/custom


    FREE STUFF

    💌 30-Day AI Insights: https://go.gradientlabs.co/i-taught-claude-to-take-notes-on-itself-now-it-gets-smarter-every-session/insights


    SOCIALS

    LinkedIn: https://www.linkedin.com/in/dylantdavis/


    Presentation (with prompts): https://d-squared70.github.io/I-Taught-Claude-to-Take-Notes-on-Itself-Now-It-Gets-Smarter-Every-Session-/


    —

    Chapters

    00:00 - Intro

    00:29 - The problem\ 

    01:41 - Three layers

    04:13 - Layer 1\ 

    06:30 - Layer 2

    13:20 - Layer 3

    16:29 - Overall system

    18:14 - Doing is being

    19:06 - Outro"
  channel: "Dylan Davis"
  channelId: "UCVzcPkOAnbnzOpJzOCDNHwQ"
  duration: "PT19M38S"
  publishedAt: "2026-03-12T18:00:57Z"
  thumbnailUrl: "https://i.ytimg.com/vi/xdR4XD-Q8po/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=xdR4XD-Q8po"
processedAt: "2026-03-13T17:35:11.761Z"
source: "youtube"
tldr: "Implement a 3-layer system for AI memory in tools like Claude Co-Work or CodeX: Layer 1 (global instructions), Layer 2 (folder-specific mission file with note-taking), and Layer 3 (context files with training materials). This enables self-improving AI by incrementally exposing data and allowing it to learn and store preferences across sessions."
tools:
  - name: "Claude"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Gemini"
    url: null
  - name: "Claude Co-Work"
    url: null
  - name: "CodeX"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "llm"
  - "productivity"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 18292
  outputTokens: 1250
  totalTokens: 19542
  processingTimeMs: 12868
tagsNormalizedAt: "2026-03-13T17:51:22.991Z"
---

## Key Takeaways

This video introduces a powerful 3-layer system to make AI tools, specifically those that can read/write files, "smarter" and self-improving over time.

* **Layer 1: Always-on Defaults** involves setting up global instructions (role, communication style, behavior rules, safety rails) in the AI's settings, keeping them concise to avoid context window issues.

* **Layer 2: Mission File** is a folder-specific `.md` file (e.g., `cloud.md` or `agents.md`) that defines the AI's purpose, outlines the folder's contents (tree), specifies rules, and includes a crucial note-taking section for self-improvement.

* **Layer 3: Training Materials** consists of **context files** within a dedicated subfolder, providing examples of "good work," preferences, and a learning section where the AI stores lessons learned, creating a compound learning effect.

## Summary

The core problem with current AI tools like **ChatGPT**, **Gemini**, and **Claude** is their limited memory, often only remembering surface-level information like your name or job title. This leads to constantly re-explaining context, hindering the AI's ability to truly become an asset. This video proposes a three-layer system to create a self-improving AI that learns and adapts across sessions.

### Layer 1: Always-on Defaults

This layer involves setting global instructions that the AI remembers across all conversations. It's accessible in the settings of tools like **Claude Co-Work** or **CodeX**. Key elements to include are your role and industry, communication style (e.g., concise, formal), optional behavior rules (e.g., ask clarifying questions), and optional safety rails (e.g., never delete files without approval). It's crucial to keep these instructions under five lines to minimize context window usage.

### Layer 2: Mission File

This is a folder-specific `.md` file, named `cloud.md` for **Claude Co-Work** or `agents.md` for **CodeX**. The AI reads this file every time it operates within that folder. It contains three main components:

*   **Purpose**: A brief description of the folder's work and relevant context.

*   **Tree**: An outline of subfolders and files within the directory, specifying their purpose.

*   **Rules**: Specific instructions the AI must follow. A critical rule is the **note-taking** section. Here, the AI is instructed to log corrections, preferences, or patterns learned during a task as one-line, dated lessons. If three or more similar lessons are learned, the AI creates a new context file and updates the tree, enabling self-improvement. The video emphasizes keeping this file under 100 lines for efficiency, as the AI accesses it frequently.

### Layer 3: Training Materials (Context Files)

This layer consists of dedicated context files, typically residing in a `context` subfolder. These files teach the AI "what good looks like" for specific tasks. Each context file has three sections:

*   **Header**: Explains the file's purpose and when the AI should use it.

*   **Content**: Contains standards, preferences, examples of high-quality work, and key vocabulary. This allows the AI to understand and replicate best practices.

*   **Learning**: Initially empty, this section is where the AI records lessons learned related to the specific context, contributing to its continuous improvement. For instance, it might note a client's preference for charts over tables.

The system leverages **progressive disclosure**, feeding the AI information incrementally as needed, rather than overwhelming its context window. This structured approach allows the AI to incrementally get smarter, transforming it from a mere tool into a valuable, self-improving asset. The video demonstrates how AI can even assist in generating these `cloud.md` and context files by providing a starting prompt and relevant project files.

## Context

Many users struggle to get consistent, high-quality results from large language models (LLMs) because these AIs often lack persistent memory beyond a single conversation or session. This leads to repetitive explanations and a slow learning curve for the AI. This video addresses this by providing a structured, multi-layered method for creating a "self-improving" AI that retains and applies learned preferences and best practices over time, making it more efficient and valuable for professional tasks. It's particularly relevant for individuals and businesses aiming to leverage AI for complex, ongoing projects.