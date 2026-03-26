---
metadata:
  videoId: "C3-4llQYT8o"
  title: "Paperclip: Hire AI Agents Like Employees (Live Demo)"
  description: "I sit down with Dotta, the pseudonymous co-founder of Paperclip, the open-source agent orchestrator that exploded to 30,000 GitHub stars in under three weeks. We walk through a live demo where I pick a startup idea from my idea browser and we spin up a full AI-agent company in real time — hiring a CEO, founding engineer, QA agent, video editor, and content strategist inside Paperclip. Dotta shares practical tips on agent configuration, memory systems, skill installation, and the \"Memento Man\" mental model for keeping agents on track. The conversation covers everything from token spend management and agentic design patterns to the future of importable, shareable companies and the upcoming Maximizer Mode.


    Skills to build your agent team: https://startup-ideas-pod.link/skill-suite


    Timestamps:

    00:00 Intro\ 

    02:32 What is Paperclip

    04:21 Choosing a Startup Idea for the Demo

    05:48 Setting Up your agents

    07:51 Hiring Your First Agent and Creating a Plan

    12:39 Agent Configuration and Persona Setup

    17:08 Skills: Installing and Managing Agent Capabilities

    21:02 How to Get Top-Quality Output from Agents

    24:05 Token Spend Tracking and Subscription Usage

    25:49 Agentic Design Patterns and QA Loops

    29:05 Taste and Values: What AI Still Cannot Do

    30:09 How Many Agents Run the Paperclip Project

    32:32 Routines: Automating Recurring Agent Tasks

    36:36 Who Is Using Paperclip Today

    38:57 Shareable and Importable Companies

    42:49 Maximizer Mode and What's Next

    44:29 Did Dotta Expect It to Go This Viral?


    Key Points


    * Paperclip is a bring-your-own-bot orchestrator: it works with Claude Code, Codex, OpenCode, and any model on OpenRouter, so you are not locked into a single provider.

    * AI agents are \"Memento Man\" — they wake up capable but with zero memory, so you need heartbeat checklists, persona prompts, and written context to keep them effective.

    * The biggest lever for quality output is encoding your own taste and values into agent skills and brand guides, because AI can do everything except know what you actually want.

    * Agentic design patterns like engineer-to-QA review loops matter more than one-shotting an entire startup; structure prevents compounding errors.

    * Paperclip tracks every token spent and every task completed, solving the problem of running dozens of agent windows with zero accountability.

    * Importable, shareable company templates (like Gary Tan's G-Stack or a full game studio) point toward a future where you \"aqua-hire\" proven agent teams instead of building from scratch.


    Section Summaries


    1. What Paperclip Is and Why It Exists


    Dotta built Paperclip because he was running 20–30 Claude Code windows at once and could not remember what any of them were doing. Paperclip sits between fully autonomous tools like Pulse and manual coding assistants, giving you a dashboard to define business goals, hire agents, approve work, and track spend — all in one place.


    2. Agent Configuration and the Memento Man Model


    Dotta compares AI agents to the protagonist of the movie Memento: they are highly capable but have zero persistent memory. The solution is a heartbeat checklist that tells each agent who it is, what plan to read, which assignments to check, and how to store memory using a file-based Para system. When agents make mistakes, you add rules directly to their persona prompts.


    3. Skills, Security, and Quality Control


    Skills from repositories like skills.sh extend what agents can do — for example, installing the Remotion skill so a video editor agent can produce animated content. Security is a real concern with third-party skills; badges and GitHub star counts offer directional trust signals but nothing is fully solved. Getting top-quality output still requires you to supply context, brand guides, and reference material.


    4. Taste Is the Last Human Moat


    The frontier models still lack personal taste. The real secret sauce is translating your own values — design sensibility, success criteria, brand voice — into written instructions your agents can follow. I note that this is the same skill that defined great leaders and founders long before AI existed; the vehicle has changed, but the job of communicating vision has not.



    The #1 tool to find startup ideas/trends - https://www.ideabrowser.com/


    LCA helps Fortune 500s and fast-growing startups build their future - from Warner Music to Fortnite to Dropbox. We turn 'what if' into reality with AI, apps, and next-gen products https://latecheckout.agency/


    The Vibe Marketer - Resources for people into vibe marketing/marketing with AI: https://www.thevibemarketer.com/


    FIND ME ON SOCIAL

    X/Twitter: https://twitter.com/gregisenberg

    Instagram: https://instagram.com/gregisenberg/

    LinkedIn: https://www.linkedin.com/in/gisenberg/


    FIND DOTTA ON SOCIAL

    X/Twitter: https://x.com/dotta

    Paperclip: https://paperclip.ing/

    Github: https://github.com/cryppadotta"
  channel: "Greg Isenberg"
  channelId: "UCPjNBjflYl0-HQtUvOx0Ibw"
  duration: "PT46M42S"
  publishedAt: "2026-03-26T19:00:20Z"
  thumbnailUrl: "https://i.ytimg.com/vi/C3-4llQYT8o/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=C3-4llQYT8o"
processedAt: "2026-03-26T20:39:40.451Z"
source: "youtube"
tldr: "Paperclip is an open-source AI agent orchestrator that enables users to manage 'zero human companies' by defining business goals, hiring teams of AI agents with different roles and skills, and overseeing their work through a dashboard that tracks progress, spending, and quality."
tools:
  - name: "Paperclip"
    url: null
  - name: "OpenAI"
    url: null
  - name: "Anthropic"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Cursor"
    url: null
  - name: "Codex"
    url: null
  - name: "OpenRouter"
    url: null
  - name: "OpenClaw"
    url: null
  - name: "Remotion"
    url: null
  - name: "skills.sh"
    url: null
  - name: "GitHub"
    url: null
  - name: "Discord"
    url: null
  - name: "Pulsia"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "agents"
  - "open-source"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 30194
  outputTokens: 1871
  totalTokens: 32065
  processingTimeMs: 281454
tagsNormalizedAt: "2026-03-26T21:32:53.765Z"
---

## Key Takeaways

Dota, the creator of Paperclip, demonstrates how to build and manage AI-driven companies using his viral open-source platform. The key insights include:

* **Think like a board member, not a micromanager** – define high-level business goals and let your AI CEO create plans and hire teams.

* **AI agents are like 'Memento man'** – they need clear 'heartbeat' instructions and memory systems to remember who they are and what they're supposed to do.

* **Bring your own bot** – Paperclip supports various AI models (Claude, OpenAI, OpenRouter) and integrates with existing tools like Cursor, Claude Code, and Codex.

* **Quality requires structure** – implement agentic design patterns like having engineers pass work to QA agents and create brand guides to maintain consistency.

* **Share and import proven teams** – you can import pre-built company structures from repositories to jumpstart projects rather than building from scratch.

* **The future is about managing taste and values** – AI can execute tasks but can't inherently know your values, so you must explicitly communicate them through prompts and skills.

## Summary

### Introduction to Paperclip and the Zero Human Company Vision

Dota, the creator behind the viral open-source project Paperclip, appears via AI avatar to demonstrate his platform for building 'zero human companies.' The project gained 30,000 GitHub stars in three weeks by addressing a critical gap in AI agent management. Paperclip positions itself between fully automated tools like Pulsia and manual AI coding assistants, focusing on business goal orchestration where users define objectives, hire AI agent teams, approve plans, and track execution.

The core philosophy shifts from thinking about 'jobs to be done' to 'hiring agents.' Users act as board members setting high-level goals and key results, while an AI CEO creates implementation plans, hires specialized agents (engineers, designers, marketers), and manages day-to-day operations. This approach aims to solve the common problem of losing track of what multiple AI agents are working on, how much they're spending on tokens, and what they've actually accomplished.

### Live Demonstration: Building a Finance App from Scratch

During the live demo, Dota selects 'Moola' – a finance app that builds money habits in three minutes daily – from Greg's idea browser as a case study. The process begins by defining the company's purpose in Paperclip's dashboard, then hiring the first agent (typically the CEO). Paperclip currently works best locally, though cloud deployment is planned, and integrates with existing AI coding tools like Claude Code and Codex.

Key configuration elements include:

* **Agent personas** – default CEO persona with memory systems (using Para memory system)
* **Safety considerations** – preventing secret exfiltration

* **Heartbeat instructions** – critical 'Memento man' analogy where agents need daily reminders of who they are and what to do

* **Skills integration** – adding capabilities from external repositories like skills.sh

The demonstration shows the CEO agent automatically creating a hiring plan, recruiting a founding engineer, and breaking down the roadmap into concrete tasks like setting up scaffolding, continuous integration, and building core user flows.

### Advanced Configuration and Agent Management

Paperclip's dashboard provides comprehensive oversight: tracking monthly token spend (which showed $0 during the demo since it used existing subscriptions), monitoring active tasks, and managing multiple companies simultaneously. Dota reveals he runs Paperclip itself, Forgotten Runes, and several other apps through the same interface.

Advanced features include:

* **Concurrency controls** – adjusting how many agents work simultaneously

* **Skill management** – installing and updating capabilities from external sources

* **Issue-based workflow** – all work happens through tracked issues that can be commented on, edited, and improved

* **Approval workflows** – initially requiring human approval for agent hiring, then automating as users gain confidence

The platform supports 'bring your own bot' flexibility, allowing users to employ various models (Claude Opus for CEOs, cheaper models for routine tasks, even free models from OpenRouter for appropriate work). This model-agnostic approach recognizes that different AI systems have distinct 'personalities' suited to different roles.

### Quality Assurance and Agentic Design Patterns

A significant portion of the discussion focuses on ensuring quality output from AI agents. Dota emphasizes that while AI can execute tasks, it doesn't inherently understand human values, taste, or quality standards. He introduces several key concepts:

* **Agentic design patterns** – structured ways for agents to interact (like having engineers automatically pass work to QA agents)
* **Brand guides and context** – providing detailed reference materials so agents understand desired outcomes

* **Feedback loops** – when agents produce unsatisfactory work, users should add specific rules to their configurations

* **Routines** – scheduled tasks that run automatically (like daily Discord updates on code changes)

Dota demonstrates creating a video editing agent with Remotion skills, then shows how to improve results by providing brand guidelines and clear success criteria. He also fixes a UI alignment issue in Paperclip itself by creating an issue, assigning it to the appropriate agent, and requiring QA verification – illustrating both the power and current limitations of fully autonomous operation.

### Scaling and Future Development

The Paperclip team (including co-founders with experience at Slack, Figma, and Pinterest) is actively developing several key features:

* **Maximizer mode** – unlimited token spending to complete projects regardless of cost

* **CEO chat interface** – conversational interaction instead of issue-based communication

* **Company import/export** – sharing proven organizational structures (like Gary Tan's GStack or agency repositories)
* **Evaluation tools** – performance reviews and learning from past feedback

* **Better artifact management** – organizing documents and outputs more effectively

Dota shares that early adopters are using Paperclip in diverse ways: security review companies automating client work, dentists managing foundations, roofing companies identifying leads through satellite imagery analysis, and existing businesses integrating AI agents into their operations.

### Philosophical Implications and Long-Term Vision

The conversation concludes with broader reflections on AI's impact. Dota believes Paperclip addresses a fundamental need that will persist even as models improve: managing taste, values, and organizational structure at scale. If AI eliminates many human jobs, software will still be needed to coordinate the remaining AI agents effectively.

Paperclip's open-source nature and community-driven development (with hundreds of pull requests) position it to evolve rapidly. While acknowledging that 'zero human companies' remain aspirational, Dota argues that the platform's value lies in its higher-level abstraction – focusing on 'what do you want to do?' rather than being tied to specific AI models or implementations.

## Context

Greg Isenberg hosts the Startup Ideas podcast, where he explores emerging technologies and business models with founders and innovators. In this episode, he interviews 'Dota' (an anonymous creator using an AI avatar), the developer behind Paperclip – a viral open-source project that gained 30,000 GitHub stars in three weeks. This conversation arrives at a critical moment in AI evolution, as tools like OpenAI's Symphony and Anthropic's project management features emerge, but no comprehensive solution exists for orchestrating multiple AI agents into functional organizations. The discussion is particularly relevant for entrepreneurs, developers, and business leaders exploring how to leverage AI agents for business automation, product development, and operational scaling. Viewers interested in practical AI implementation, agentic systems, and the future of automated companies will gain the most from watching the full demonstration and technical insights.