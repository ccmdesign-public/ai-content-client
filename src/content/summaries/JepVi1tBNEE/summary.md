---
metadata:
  videoId: "JepVi1tBNEE"
  title: "Introducing Agent Skills in VS Code"
  description: "Unlock the power of Agent Skills in VS Code! In this video, we break down what Agent Skills are, why they’re game‑changing for developers, and how to create your first skill in minutes.


    🔎 Chapters:

    00:00 Agent Skills in VS Code

    00:41 Demo

    04:45 In Summary

    05:07 Wrap


    🔗 Links:

    Agent Skills Docs: https://code.visualstudio.com/docs/copilot/customization/agent-skills

    Agent Skills: https://agentskills.io


    🎙️ Featuring: James Montgemagno (@JamesMontemagno)


    📲 Follow VS Code:

    * X: https://x.com/code

    * Bluesky: https://bsky.app/profile/vscode.dev

    * YouTube: https://youtube.com/code

    * LinkedIn: https://www.linkedin.com/showcase/104107263

    * GitHub: https://github.com/microsoft/vscode


    #vscode #agentskills"
  channel: "Visual Studio Code"
  channelId: "UCs5Y5_7XK8HLDX0SLNwkd3w"
  duration: "PT5M11S"
  publishedAt: "2026-01-09T20:10:27Z"
  thumbnailUrl: "https://i.ytimg.com/vi/JepVi1tBNEE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=JepVi1tBNEE"
processedAt: "2026-01-10T19:52:52.655Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Agent skills are portable, action-oriented folders (instructions, scripts, and resources) that load on demand to automate domain-specific tasks.

  - They utilize an open standard compatible with VS Code, GitHub Copilot, and CLI.

  - Unlike static instructions, skills enable complex workflows like PRD drafting, image manipulation, and CI setup through progressive loading.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1473
  outputTokens: 840
  totalTokens: 3600
  processingTimeMs: 13168
tools:
  - name: "JavaScript"
    url: null
  - name: "ImageMagick"
    url: null
  - name: "Playwright"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "copilot"
  - "vscode"
  - "workflow"
tagsNormalizedAt: "2026-03-01T21:19:30.510Z"
---

## Key Takeaways

VS Code Agent Skills represent a shift from passive AI instructions to active, portable workflows that enable specialized task execution.

* **On-Demand Loading**: Unlike global custom instructions, skills are loaded "progressively" only when the agent identifies a specific task (e.g., resizing images), saving context space.

* **Open Standard**: Skills are designed to be portable across different environments, including the VS Code IDE, Git

Hub Copilot’s cloud agent, and the Command Line Interface (CLI).

* **Resource Integration**: A skill is more than text; it includes **scripts (Java

Script)**, **images**, and **automation tools** that allow the agent to interact directly with the local environment.

* **Front Matter Configuration**: Users define skills using a **skill.md** file containing metadata that tells the agent exactly when and how to trigger specific stages of a workflow.

## Summary

### Introduction to Agent Skills
VS Code has introduced **Agent Skills**, a feature designed to make AI agents more specialized and efficient. While agents are naturally smart, skills provide them with a structured folder of instructions, scripts, and resources that load only when a specific task is identified. This reduces repetition and allows for the composition of complex, domain-specific workflows without cluttering the agent's global context.

### How Skills Work and Setup
To begin using this feature, users must enable **Use Agent Skills** within their VS Code settings. Skills are organized within a dedicated skills folder. Each subfolder represents a unique skill (e.g., `PRD-writing` or `image-manipulation`). The core of any skill is a **skill.md** file, which uses **front matter** to define the skill's name and the specific triggers that prompt the agent to use it.

Beyond simple text, skills can include:

- **Java

Script files** for helper functions and logic.

- **Automation scripts** to interact with CLI tools like Image

Magick or Playwright.

- **Documentation templates** to ensure consistent output formats.

### Progressive Loading vs. Custom Instructions
A critical distinction is made between **Custom Instructions** and **Agent Skills**. Instructions are typically static coding standards applied across all sessions. In contrast, skills leverage **progressive loading**. The agent scans the available skills and only pulls the necessary data when the user’s prompt matches the skill's metadata. This keeps the agent's memory efficient while providing it with "action-oriented" capabilities.

### Practical Use Cases
The video demonstrates several real-world applications for developers:
1. **PRD Writing**: A workflow-based skill that guides the agent through context gathering, drafting, and validation stages.
2. **Image Manipulation**: A skill that integrates with **Image

Magick** to handle batch processing tasks, such as resizing a folder of images with a single natural language command.
3. **Web Testing**: Utilizing **Playwright** to interact with web pages, using included helper scripts to build and run tests automatically.

## Context

This update marks a significant shift in how developers interact with AI in the IDE. By moving from "chat-based assistance" to "agentic automation," VS Code is empowering developers to build reusable toolsets that can be shared across teams. This matters because it addresses the context window problem—rather than stuffing an AI with thousands of lines of instructions, developers can now provide a library of on-demand capabilities. It connects to the broader industry trend of AI Agents moving beyond text generation into autonomous task execution and tool-use, making AI a more integrated part of the Dev

Ops and software development lifecycle.
