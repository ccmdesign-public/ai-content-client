---
metadata:
  videoId: "eP0FkjIwbzg"
  title: "AI Agents Are Dangerous Without This | Gemini CLI"
  description: "🚀 FIXING AI CODING WITH HOOKS, SKILLS & PLAN MODE | Gemini CLI Advanced Features


    AI coding agents are powerful, but they often make critical mistakes like hard-coding passwords, ignoring design systems, or starting to code without planning. In this tutorial, I'll show you three advanced features in Gemini CLI that solve these problems and make your AI agent truly enterprise-ready.


    🔥 What You'll Learn:

    • Hooks - Automated scripts that enforce rules at critical moments (like blocking hard-coded secrets)

    • Skills - Reusable knowledge files that teach the agent specialized tasks (brand guidelines, 3D web experiences)

    • Plan Mode - Forces the agent to think and create a plan before writing any code


    These features transform Gemini CLI from a simple chatbot into a deterministic, enterprise-grade development tool that follows YOUR rules every single time.


    📋 CHAPTERS:


    0:00 - Introduction: The Problem with AI Coding Agents

    0:48 - Three Key Features of Gemini CLI

    0:55 - Feature 1: Hooks (Automated Scripts)

    1:17 - Feature 2: Skills (Specialized Knowledge)

    1:38 - Feature 3: Plan Mode (Think Before Coding)

    2:10 - Demo: Project Setup Overview

    2:34 - Demo: Exploring Hooks Configuration

    3:25 - Demo: Exploring Skills

    4:41 - Demo: Secret Scanner Hook in Action

    5:22 - Demo: Plan Mode in Action

    6:49 - Results: 3D Experience Added

    7:49 - Recap: Why These Features Matter

    8:09 - Closing


    ⚡ Key Takeaways:

    • Hooks run automatically at specific moments to enforce security and standards

    • Skills eliminate repetitive explanations by installing reusable knowledge

    • Plan Mode creates a collaborative workflow where the agent thinks before acting

    • Perfect for team environments and enterprise development


    💡 Tools Mentioned:

    • Gemini CLI - Google's AI coding agent

    • Spline - 3D web component library

    • Custom brand guidelines skill

    • Secret scanner hook


    🔗 Disclaimer: All opinions expressed in this video are my own and do not represent my employer.


    👍 If you found this valuable, please:

    • Hit the LIKE button

    • SUBSCRIBE for more AI development tutorials

    • Drop your questions in the COMMENTS below


    Thanks for watching! See you in the next one! 🎬


    GeminiCLI #AICoding #GoogleAI #DevelopmentTools #CodingAgent #AITools #WebDevelopment #EnterpriseDevelopment #DeveloperTools #Programming"
  channel: "AI with Surya"
  channelId: "UCz80JEs56coMRDd5OzYe_lw"
  duration: "PT8M28S"
  publishedAt: "2026-02-26T03:49:42Z"
  thumbnailUrl: "https://i.ytimg.com/vi/eP0FkjIwbzg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=eP0FkjIwbzg"
processedAt: "2026-02-27T00:32:26.474Z"
source: "youtube"
tldr: "Gemini CLI's hooks, skills, and plan mode features transform AI coding agents from unpredictable chatbots into deterministic enterprise tools by enforcing rules, embedding specialized knowledge, and requiring thoughtful planning before execution."
tools:
  - name: "Gemini CLI"
    url: null
  - name: "Spline"
    url: null
  - name: "npm"
    url: null
categories:
  - "AI & Machine Learning"
  - "Security"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "automation"
  - "gemini"
  - "productivity"
  - "security-general"
  - "terminal"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6972
  outputTokens: 761
  totalTokens: 7733
  processingTimeMs: 19338
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.513Z"
---

## Key Takeaways

The video demonstrates how three underutilized features of Google's Gemini CLI address critical problems with AI coding agents in professional settings. • **Hooks** are automated scripts that enforce rules, like scanning for hard-coded secrets before a file is written. • **Skills** are project files that teach the agent specialized knowledge (e.g., a brand's design system or 3D web libraries) once, eliminating repetitive instructions. • **Plan Mode** forces the agent to draft and get approval for a detailed plan before writing any code, promoting collaboration and reducing errors.

## Summary

The video addresses a major flaw in current AI coding agents: they often produce code that works but is insecure, inconsistent, and unplanned. For side projects this might be acceptable, but in enterprise teams, it's a critical problem.

Google's Gemini CLI, a terminal-based AI coding agent, offers three powerful features to solve this. **Hooks** are scripts that run at specific moments in the agent's workflow. The creator configures three hooks: one provides a project welcome message, another checks if the development server is running, and a third acts as a **secret scanner** that automatically blocks file writes containing hard-coded API keys or passwords, enforcing security best practices deterministically.

**Skills** are knowledge files dropped into a project. The creator shows two skills: one defining a brand's visual identity (like a preferred dark theme) and another teaching the agent how to create 3D web experiences using the Spline platform. Once installed, the agent inherently knows how to follow these guidelines without repeated prompting.

**Plan Mode** is activated by pressing Shift+Tab, forcing the agent to 'think first, code second.' When asked to enrich a landing page with 3D elements, the agent first presents a detailed plan (including colors, scene details, and layout) for user approval before executing any code. This transforms the agent from an autopilot coder into a collaborative partner.

The demonstration shows all three features working in concert on a sample web project, culminating in the agent successfully adding an interactive 3D component from Spline to the page, all while adhering to the predefined brand skill and being prevented from writing insecure code by the hook system.

## Context

As AI coding assistants like GitHub Copilot and Cursor become mainstream, a significant gap has emerged between their utility for quick prototyping and their reliability for professional, team-based development. The core issue is a lack of determinism and governance—agents often ignore project conventions, security rules, and planning. This video matters to developers, engineering managers, and DevOps professionals who want to integrate AI agents into production workflows safely. It connects to the broader trend of moving AI from a conversational toy to a governed, predictable engineering tool that can adhere to organizational standards and security policies.