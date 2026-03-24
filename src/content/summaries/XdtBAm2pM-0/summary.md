---
metadata:
  videoId: "XdtBAm2pM-0"
  title: "This New Designer Unlocks Claude Code"
  description: "What if your ai coding agents could talk to each other? We put Claude Code and Gemini CLI in a shared chat and let them plan, build, and review a full app autonomously, this is what vibe coding looks like with multi-agent coordination.


    🔗 Links

    - Repo - https://github.com/bcurts/agentchattr

    - Our Repo With Added UI - https://github.com/ailabs-393/agentchattr

    Community with All Resources 📦: http://ailabspro.io/

    Video Code: V50


    In this video, we explore Agentchattr, an open-source tool that lets you run multiple ai coding agents side by side and have them communicate in real time through a shared chat interface. Instead of switching between tools yourself, you assign roles to each agent and let them coordinate autonomously across different channels.


    We walk through the full setup, from initializing agent sessions with tmux to configuring permissions and MCP tools so agents can operate without constant manual approval. We cover how to structure your project with planning templates like a PRD, backend spec, and UI spec, and how to use an agents.md file so that both Claude and Gemini follow the same guiding instructions regardless of their native config files.


    For anyone looking for the best ai for coding workflows that involve multiple models, this is one of the most interesting approaches we've tested. The tool supports coding with ai across Claude Code, Gemini CLI, Codex, and open-source models like Kimi and Qwen, making it one of the more flexible ai coding tools available right now. You can use an expensive model for planning and a cheaper one for implementation, which is a practical way to manage costs while still getting the best coding ai output where it matters.


    We demonstrate a full planning-to-build pipeline: one agent creates the PRD, another handles the UI spec, and a builder agent implements the backend, all coordinating through the chat. The tool also includes structured review modes where agents challenge each other's work across three phases, catching gaps that a single ai for coding session would miss. The planner then acts as an orchestrator, delegating tasks and keeping agents from overwriting each other's files.


    If you're into ai vibe coding or agentic ai workflows, this is a practical look at what multi-agent collaboration actually looks like today, the wins, the edge cases, and the setup needed to make it work. We also discuss how using dedicated work trees with one agent handling the merge and review would make ai automation with multiple agents much smoother for complex projects. Whether you're using claude code or opencode or gemini cli, coordinating them in a shared session opens up new ways to build.


    Hashtags

    #claudecode #claude #vibecoding #aiautomation #coding #opencode #agenticai #geminicli #aicoding"
  channel: "AI LABS"
  channelId: "UCelfWQr9sXVMTvBzviPGlFw"
  duration: "PT11M50S"
  publishedAt: "2026-03-20T15:24:28Z"
  thumbnailUrl: "https://i.ytimg.com/vi/XdtBAm2pM-0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=XdtBAm2pM-0"
processedAt: "2026-03-24T00:51:33.962Z"
source: "youtube"
tldr: "Agent Chatter is an open-source tool that enables real-time collaboration between different AI coding agents (Claude Code, Gemini CLI, Codex, Kimmy, Quen, GLM) using a chat interface, allowing for coordinated planning, design, and implementation of software projects."
tools:
  - name: "Claude Code"
    url: null
  - name: "Gemini CLI"
    url: null
  - name: "Codex"
    url: null
  - name: "Kimmy"
    url: null
  - name: "Quen"
    url: null
  - name: "GLM"
    url: null
  - name: "T-Max/T-Mox"
    url: null
  - name: "Next.js"
    url: null
  - name: "Airtop"
    url: null
  - name: "Agent Chatter"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "gemini"
  - "open-source"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9762
  outputTokens: 959
  totalTokens: 10721
  processingTimeMs: 31959
tagsNormalizedAt: "2026-03-24T04:12:57.401Z"
---

## Key Takeaways

Agent Chatter facilitates multi-agent AI collaboration for software development by letting specialized models work together autonomously. Key insights include: • **Cost optimization** by using expensive models (Claude) for planning and cheaper ones (Kimmy/GLM) for implementation • **Role specialization** with models like Gemini excelling at creative UI design while Claude handles stable coding • **Structured coordination** through channels, rules, and shared templates prevents conflicts and overwrites • **Review workflows** with presenter-challenger-synthesizer modes catch issues that single agents miss

## Summary

Agent Chatter addresses the challenge of coordinating different AI coding agents that have complementary strengths. While Gemini models excel at creative UI design with minimal instructions, Claude Code provides more stable tooling but lacks efficient collaboration mechanisms. This open-source tool creates a chat interface where agents can communicate directly, removing developers from manual coordination.

The platform supports popular agents including Claude Code, Gemini CLI, Codex, and open-source models like Kimmy, Quen, and GLM. It uses terminal multiplexing (T-Max/T-Mox) to run multiple agents in parallel terminal sessions, all controllable from a single chat interface. The video creator forked the original repository to add a polished visual layer while maintaining core functionality.

### Setup and Configuration

Setup requires cloning the repository and running initialization scripts for each agent. Key configuration steps include:
• Setting permissions in settings.json files to avoid manual approval for every action
• Creating agents.md templates with role rules and behavioral principles
• Using planning templates (PRD, backend.md, UI spec) available through AILABs Pro
• Assigning specific names and roles to each agent (e.g., "UI/UX expert" for Gemini)
• Configuring rules to ensure all agents reference the same guiding documents

### Workflow Implementation

The tool enables structured development workflows similar to Slack channels, with separate channels for frontend and backend. The planning process involves:
1. Presenting an app idea to the team session
2. Having the planner agent create comprehensive documentation
3. Getting human approval before implementation
4. Using MCP (Model Context Protocol) for two-way communication between agents

### Advanced Features

Agent Chatter includes several sophisticated coordination mechanisms:
• **Loop guard** prevents infinite agent-to-agent loops (default: 4 hops)
• **Three-phase review mode** with presenter, challenger, and synthesizer roles
• **Cross-validation** where agents identify and fix each other's implementation gaps
• **Automatic task assignment** based on agent specialization

The video demonstrates building a gamified typing test application where agents coordinate to create high-contrast UI elements, performance dashboards, and immersive user experiences. Despite occasional issues with agents overwriting each other's work, the system enables complex multi-agent collaboration that would be impractical to manage manually.

## Context

As AI coding assistants become more specialized, developers face challenges integrating models with different strengths into cohesive workflows. Claude Code offers stability but lacks creativity, while Gemini excels at design but has less mature tooling. This fragmentation creates manual coordination overhead. Agent Chatter matters because it enables true multi-agent AI development where specialized models collaborate autonomously, similar to how human engineering teams work. Developers who use multiple AI coding tools will benefit from reduced coordination effort and can leverage each model's unique capabilities more effectively.