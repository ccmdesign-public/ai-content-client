---
metadata:
  videoId: "MsJzacfjzp8"
  title: "OpenAI Adds Agent Skills to Codex (First Look & Walkthrough)"
  description: "Codex just got Agent Skills support—and the best part? Your existing Claude skills work out of the box. OpenAI adopted Anthropic's open Agent Skills spec, making skills portable with zero config changes.


    In this video, I walk through how to install skills in Codex using the built-in `$skill-installer`, how to transfer existing Claude skills, and demonstrate a real Claude skill running in Codex that self-corrects when it hits environment differences.


    **What You'll Learn:**

    • How to update Codex and access skills (`/skills` command)

    • Installing skills from GitHub with `$skill-installer`

    • Transferring Claude skills to Codex\ 

    • Why skills are more portable than MCP configs


    ⏱️ **TIMESTAMPS**

    0:00 – Codex Gets Agent Skills

    0:20 – What Are Skills? (Quick Recap)

    1:22 – Skill Structure Overview

    2:23 – OpenAI's Available Skills

    2:41 – Installing My Skill Evaluator from GitHub

    4:01 – Transferring Existing Claude Skills

    4:27 – Creating .codex/skills/ Folder

    4:48 – Both Tools, Same Skill

    5:40 – Running the Evaluator Skill

    6:12 – Final Thoughts: Open Standards Win


    🔗 **RESOURCES**

    Codex Skills Documentation: https://developers.openai.com/codex/skills/

    Agent Skills Spec: https://agentskills.io/specification

    My Skill Evaluator (GitHub): https://github.com/JeredBlu/eval-marketplace

    Book a call with me → https://yedatechs.com/#container06

    Sponsorship inquiries → hi@yedatechs.com


    #Codex #AgentSkills #ClaudeCode #OpenAI #Anthropic #AITools #DeveloperProductivity"
  channel: "JeredBlu"
  channelId: "UCaIm6rTg-RXb6rB19fYJgTg"
  duration: "PT6M41S"
  publishedAt: "2025-12-22T04:20:58Z"
  thumbnailUrl: "https://i.ytimg.com/vi/MsJzacfjzp8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=MsJzacfjzp8"
processedAt: "2026-01-15T17:48:13.637Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "OpenAI added **agent skills** support to Codex using the open agent skills standard, enabling easy installation of reusable workflows via CLI/extensions to reduce context bloat through **progressive disclosure**.\n"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-r1-0528:free"
  apiCalls: 5
  fallbackAttempts: 4
  inputTokens: 2535
  outputTokens: 1105
  totalTokens: 3640
  processingTimeMs: 89162
tools:
  - name: "Codex"
    url: "https://developers.openai.com/codex/skills/"
  - name: "Claude"
    url: null
  - name: "Agent Skills Spec"
    url: "https://agentskills.io/specification"
  - name: "Playwright"
    url: null
  - name: "Bright Data"
    url: null
  - name: "npm"
    url: null
  - name: "bun"
    url: null
  - name: "eval-marketplace"
    url: "https://github.com/JeredBlu/eval-marketplace"
  - name: "ChatGPT"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "automation"
  - "chatgpt"
  - "claude"
  - "llm"
tagsNormalizedAt: "2026-03-01T21:19:30.313Z"
---

## Key Takeaways

Codex now integrates agent skills for efficient AI workflows:

- **Progressive disclosure** loads only skill metadata initially, reducing context window bloat by deferring full content until needed

- Existing **Claude skills** are ~99% compatible without modification, enabling cross-platform reuse

- Install skills via **URL** (using `/skill_installer`) or **local folders** with no configuration changes required

- Built-in **skill evaluator** checks third-party skills for security risks before installation

## Summary

OpenAI has implemented **agent skills** in Codex, adopting Anthropic's open agent skills standard. Skills package instructions, scripts, and reference files into reusable workflows while combating context bloat through **progressive disclosure**—only loading skill names/descriptions initially, then expanding details when invoked. This contrasts with traditional methods like MCP servers that overload context windows upfront.

After updating Codex via npm/bun, users access two built-in skills: `skill_creator` (builds new skills) and `skill_installer` (adds third-party skills). Skills install via URL—demonstrated by adding an **agent skill evaluator** from Git

Hub—or by placing existing Claude skill folders into Codex's directory. Installed skills appear in `/skills` and activate via `$[skill_name]` commands.

Testing revealed strong compatibility:

- Playwright skills built for Claude worked immediately in Codex

- Skills self-correct when encountering platform-specific paths (e.g., redirecting file outputs)
- The evaluator skill successfully audited third-party skills using MCP tools like Bright Data

OpenAI's rapid adoption (within 2 months of Anthropic's release) signals industry alignment on solving LLM limitations through open standards.

## Context

This update addresses critical LLM constraints like **context window bloat**, where agents waste tokens loading unused tools/rules upfront. Developers building AI assistants benefit from modular, reusable skills that enhance functionality without sacrificing performance. It reflects broader industry momentum toward standardized, interoperable AI components—potentially extending to ChatGPT soon—making agent development more efficient and collaborative.
