---
metadata:
  videoId: "uzmnpGmR2tg"
  title: "Let it Cook - GitHub Copilot SDK: Fresh from Scratch"
  description: "Watch as we build a GitHub Copilot SDK project from scratch. A hands-on deep dive with Burke Holland and James Montemagno exploring everything you need to get started.


    Links: https://github.com/github/copilot-sdk


    #vscode #githubcopilot"
  channel: "Visual Studio Code"
  channelId: "UCs5Y5_7XK8HLDX0SLNwkd3w"
  duration: "PT1H17M44S"
  publishedAt: "2026-03-21T04:24:56Z"
  thumbnailUrl: "https://i.ytimg.com/vi/uzmnpGmR2tg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=uzmnpGmR2tg"
processedAt: "2026-03-24T22:07:22.194Z"
source: "youtube"
tldr: "The video introduces the GitHub Copilot SDK, demonstrating how developers can build custom AI assistants using its agentic capabilities and integrate them with external platforms like Telegram. It highlights the power of leveraging the SDK for personalized workflows, emphasizing the importance of well-defined plans and iterative development with AI agents, rather than simply generating code."
tools:
  - name: "GitHub Copilot SDK"
    url: "https://github.com/microsoft/github-copilot-sdk"
  - name: "GitHub Copilot CLI"
    url: null
  - name: "Visual Studio Code"
    url: null
  - name: "Blazor"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Apple Intelligence"
    url: null
  - name: "Microsoft Foundry"
    url: null
  - name: "Telegram"
    url: null
  - name: "OpenClaw"
    url: null
  - name: "Gemini"
    url: null
  - name: "GPT"
    url: null
  - name: "Opus"
    url: null
  - name: "Work IQ"
    url: null
  - name: "Outlook"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "copilot"
  - "productivity"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 59378
  outputTokens: 1874
  totalTokens: 61252
  processingTimeMs: 45002
tagsNormalizedAt: "2026-03-24T23:00:54.100Z"
---

## Key Takeaways

- The **GitHub Copilot SDK** allows developers to embed the Copilot CLI's agentic capabilities into any application, supporting multiple programming languages (Node, Python, Go, .NET, Java).

- A key benefit is the ability to create **custom, reusable AI tools** tailored to specific workflows, such as a podcast metadata generator or a personal assistant integrated with messaging apps like Telegram.

- Effective interaction with AI agents involves a structured approach: **deep research** to provide comprehensive context, followed by a **vague initial plan** that allows the AI to clarify details, and then using **Autopilot mode** for iterative execution.

- Understanding the **"context window as a room" analogy** is crucial; frequent new sessions for different tasks prevent confusion and hallucinations, leading to more accurate results.

- **Autopilot mode** in Copilot CLI employs an iterative loop with a **confidence token** to ensure tasks are thoroughly completed, often involving adversarial review by other models to critique generated code.

- The rise of AI agents shifts the developer's focus from mere code generation to **product and architectural reasoning**, emphasizing the importance of defining *what* to build and *why*, rather than just *how*.

## Summary

### Introduction to GitHub Copilot SDK

The hosts, James, Burke, and Pierce, introduce the GitHub Copilot SDK, describing it as a tool that allows developers to embed the capabilities of the Copilot CLI into virtually any application. Burke explains that the SDK provides an agent harness, which includes system prompts, skills, MCP servers, and tools for reading and writing files. This comprehensive package enables developers to create custom AI agents that can perform a wide range of tasks. The SDK supports various programming languages, including Node, Python, Go, .NET, and Java, with the official Java SDK recently launched.

James demonstrates a practical application he built using the Copilot SDK: a podcast metadata generator. This Blazer server application takes a podcast transcript and, using the Copilot SDK, generates titles, summaries, and YouTube chapters with timestamps. He highlights that this tool, which previously took significant manual effort, now completes the task in about 15 seconds. The underlying mechanism involves creating a Copilot client, checking authentication, selecting a model, creating a session, and providing a system prompt. The SDK then streams back events and messages, allowing the application to process and display the generated content. James emphasizes that while this specific example uses his Copilot subscription, the SDK also supports bringing your own key for inference, offering flexibility for deployment in production or SaaS environments.

### Building a Personal Assistant with Copilot SDK

Burke then showcases his personal AI assistant, named Max, which runs locally on his machine and interacts via Telegram. He illustrates its capabilities by asking Max to research the last six updates for Visual Studio Code, summarize the latest features for an upcoming MVP summit, and create a PowerPoint presentation. This demonstrates the agent's ability to browse the web, synthesize information, and generate complex documents. Burke also uses Max to create a strategic plan for advocacy around the Copilot CLI, generating a Word document outlining workstreams and content areas. He notes that while the AI generates the initial draft, human oversight and tweaking are still necessary.

### The Importance of Context and Iteration with AI Agents

The discussion shifts to the optimal way to interact with AI agents, particularly regarding context windows. Burke introduces the analogy of the **"context window as a room"**: the more information (tokens) crammed into a single session, the more cluttered and prone to hallucinations the AI becomes. Pierce supports this by explaining that agents send previous messages as history with every API call, accumulating context. This can lead to conflicting instructions and confused models. The hosts recommend starting new chat sessions for distinct tasks to maintain a clean context, which has been shown to improve code retention and overall results in their internal experiments. This approach prevents the model from getting bogged down by irrelevant past interactions.

### Autopilot Mode and Strategic Planning

James explains the three modes of Copilot CLI: **Standard mode** (user-controlled approvals), **Bypass mode** (YOLO mode, auto-approves but stops for questions), and **Autopilot mode**. Autopilot mode is an advanced layer that not only bypasses approvals but also proactively answers its own questions and handles terminal input. It operates on an iterative loop, creating a to-do list, deploying sub-agents, and continuously tracking task completion with a **confidence level**. The agent will iterate until it is highly confident that all tasks are completed, even employing adversarial review from other models (like Gemini, GPT, and Opus) to critique its own work.

Burke demonstrates this by using Autopilot to build the Telegram bot. He first initiates a deep research phase on the Copilot SDK GitHub repository to ensure the AI has comprehensive knowledge. Then, using the collected research, he enters **plan mode** with a deliberately vague prompt: "I would like to build a personal assistant on top of the Copilot SDK that I can use from Telegram." This allows the AI to clarify details, such as the preferred programming language. The plan is then approved, and Autopilot takes over to execute it. The discussion emphasizes that while Autopilot accelerates code generation, the human role shifts to higher-level strategic thinking: defining *what* should be built and *why*, rather than just *how*.

### Shifting Developer Focus and Cultural Transformation

The hosts conclude by reflecting on the broader impact of AI agents on software development. They observe that with AI making code generation cheaper and faster, the value shifts from writing code to **product and architectural reasoning**. Developers spend more time in discussions about desired features, user experience, and overall system architecture. This leads to a cultural transformation where planning and design become paramount. For instance, code reviews are less about syntax and more about whether a feature *should* be implemented, considering maintainability, testing, and long-term impact. The ability for agents to even self-rebuild and fix issues further underscores this shift, empowering developers to focus on higher-order problems and innovation.

## Context

The video features James Montemagno, Burke Holland, and Pierce Boggan, all prominent figures at Microsoft involved with developer advocacy and tools. They discuss the GitHub Copilot SDK, a relatively new offering that extends the capabilities of GitHub Copilot beyond simple code completion. This discussion is relevant now as AI-powered development tools are rapidly evolving, shifting developer workflows and challenging traditional notions of productivity and software design. The target audience includes developers, team leads, and anyone interested in understanding the practical applications and strategic implications of integrating AI agents into software development processes.