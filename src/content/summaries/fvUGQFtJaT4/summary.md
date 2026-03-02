---
metadata:
  videoId: "fvUGQFtJaT4"
  title: "Claude Skills - SOPs For Agents"
  description: "In this video, I look at a new announcement from Anthropic called Claude Skills, but also more generally at the concept of how frontier labs are creating standard operating procedures for agents to be able to use.\ 


    Blog for Claude Skills: https://www.anthropic.com/news/skills

    Best Practices: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices

    Github: https://github.com/anthropics/skills/


    For more tutorials on using LLMs and building agents, check out my Patreon

    Patreon: https://www.patreon.com/SamWitteveen

    Twitter: https://x.com/Sam_Witteveen


    🕵️ Interested in building LLM Agents? Fill out the form below

    Building LLM Agents Form: https://drp.li/dIMes


    👨‍💻Github:

    https://github.com/samwit/llm-tutorials


    ⏱️Time Stamps:

    00:00 Intro

    01:07 Claude Skills

    01:34 Core Patterns

    02:34 Introducing Claude Skills Blog

    10:13 Skill Authoring Best Practices"
  channel: "Sam Witteveen"
  channelId: "UC55ODQSvARtgSyc8ThfiepQ"
  duration: "PT13M21S"
  publishedAt: "2025-10-17T12:10:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/fvUGQFtJaT4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=fvUGQFtJaT4"
processedAt: "2026-01-12T23:25:36.042Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Anthropic's **Claude Skills** introduce a framework for **Standard Operating Procedures (SOPs)** within AI agents.\ 

  - **Modular Folders**: Use instructions and `skill.md` files to load context only when relevant.

  - **Portability**: Skills work across Claude Chat, API, and Claude Code.

  - **Context Engineering**: Better structured inputs reduce variability and improve agentic output.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3192
  outputTokens: 793
  totalTokens: 5302
  processingTimeMs: 14518
tools:
  - name: "Claude Skills"
    url: "https://www.anthropic.com/news/skills"
  - name: "Model Context Protocol"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Skill Creator"
    url: null
  - name: "Python"
    url: null
  - name: "GitHub"
    url: "https://github.com/anthropics/skills/"
  - name: "Gemini CLI extensions"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "prompt-engineering"
  - "python"
tagsNormalizedAt: "2026-03-01T21:19:30.532Z"
---

## Key Takeaways

Anthropic is shifting LLMs from simple chatbots to agentic platforms by integrating structured **Standard Operating Procedures (SOPs)**.

* **Claude Skills** are modular folders containing specific instructions, scripts, and resources that the model dynamically loads based on task relevance.

* The **Model Context Protocol (MCP)** provides the underlying framework for these skills, enabling seamless interaction between agents and external tools.

* **Context Engineering** is the core driver of quality; by providing structured workflows, users can significantly reduce the inherent variability of LLM outputs.

* The **platformization** of AI is accelerating, with Anthropic, Google, and OpenAI all moving toward hosting sophisticated agentic apps and plugin marketplaces.

## Summary

### The Evolution of AI SOPs
Sam Witteveen explores the concept of **Claude Skills**, framing them as the digital equivalent of a company's **Standard Operating Procedures (SOPs)**. Just as businesses use SOPs to maintain quality and consistency in manufacturing or services, AI agents require structured guidelines to function reliably. This transition marks a shift from simple prompt engineering to **context engineering**, where the goal is to provide the model with the exact information and logic it needs at the precise moment it needs it.

### Anatomy and Functionality of Skills
A "skill" is defined as a folder structure containing a `skill.md` file, which outlines the workflow, logic, and tools required for a specific task. These skills are **composable**, meaning they can stack together, and **portable**, allowing them to be used in the Claude web interface, via the API, or in coding tools like **Claude Code**. The system uses a similarity check to determine when a skill is relevant, ensuring the context window isn't cluttered with unnecessary information.

### Tools for Development
To facilitate the creation of these procedures, Anthropic has introduced a **Skill Creator**—an agent specifically designed to help users architect their own workflows. Witteveen notes that while plain English instructions are powerful, embedding **Python code** within skills often leads to more robust and predictable performance. He demonstrates how these skills can automate complex tasks, such as transforming You

Tube transcripts into formatted Linked

In content, by guiding the model through a series of predefined steps.

### The Competitive Landscape
This move by Anthropic mirrors similar developments at Google (with Gemini CLI extensions) and OpenAI. We are seeing a divergence in the major LLM APIs as they evolve into **full-on platforms** capable of hosting specialized apps. Witteveen highlights a public repository of skills released by Anthropic, noting that while some are open-source, others are strictly copyrighted, signaling a competitive "flag planting" in the emerging **context window marketplace**.

## Context

This video highlights a major trend in AI: the move from 'models' to 'systems.' As LLMs become more capable, the challenge shifts from the model's intelligence to the management of that intelligence through structured workflows. Claude Skills matter because they provide a standardized way for businesses and developers to scale AI usage without the 'wild west' unpredictability of raw prompting. For anyone building agents or looking to integrate AI into professional business processes, understanding how to codify SOPs into skills is becoming a necessary skill set. This connects to the broader trend of AI agents becoming autonomous coworkers rather than just research assistants.
