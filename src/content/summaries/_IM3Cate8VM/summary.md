---
metadata:
  videoId: "_IM3Cate8VM"
  title: "Agent Skills Will Change How You Work — Here's Why | Antigravity"
  description: "Agent Skills: Personalizing AI Output


    Stop wasting time pasting the same instructions into every AI chat! Learn how to use Agent Skills to teach your AI assistant your brand, style, and preferences once—and have it follow them automatically every time.


    In this video, I'll show you exactly what Agent Skills are, how they work, and how to create them from scratch. You'll see real examples of how skills can transform generic AI outputs into personalized, on-brand results that match your company's aesthetic and guidelines.


    What You'll Learn:

    ✅ What Agent Skills are and why they matter

    ✅ The simple format behind skills (hint: it's just a markdown file!)

    ✅ Where to store skills (project-level vs global)

    ✅ How to create skills with AI assistance

    ✅ Real-world demos: custom dashboards and HR onboarding


    Chapters:

    0:00 Introduction

    1:22 What Are Agent Skills?

    2:37 Where Skills Live

    3:41 Demo: Creating a Dashboard Without Skills

    5:30 Demo: Creating a Skill for Branding

    7:38 Demo: HR Onboarding Skill

    10:10 Conclusion & Key Takeaways


    Whether you're building websites, creating presentations, or onboarding team members, Agent Skills will save you hours of repetitive work and ensure consistent, high-quality results every time.


    Disclaimer: All opinions expressed in this video are my own and do not belong to my employer.


    If you found this helpful, please like and subscribe for more AI tips and tutorials!


    AI #AgentSkills #Productivity #AITools #Automation"
  channel: "AI with Surya"
  channelId: "UCz80JEs56coMRDd5OzYe_lw"
  duration: "PT10M51S"
  publishedAt: "2026-03-02T01:00:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/_IM3Cate8VM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=_IM3Cate8VM"
processedAt: "2026-03-02T16:25:54.299Z"
source: "youtube"
tldr: "AI agent skills are an open standard that teach agents specific tasks through a simple markdown file (skill.md), enabling consistent brand adherence and team onboarding without repetitive prompting, saving time and context tokens."
tools:
  - name: "Antigravity"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Cursor"
    url: null
  - name: "GitHub Copilot"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "productivity"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8274
  outputTokens: 1009
  totalTokens: 9283
  processingTimeMs: 96215
tagsNormalizedAt: "2026-03-04T16:09:55.664Z"
---

## Key Takeaways

The video introduces agent skills as a solution to repetitive AI prompting and generic outputs. Key takeaways include: • **Skills are reusable instructions** stored in a `skill.md` file that agents can reference to learn your brand, style, and processes. • They **save context window and budget** by eliminating repetitive instructions and manual corrections. • Skills can be **project-specific or global**, traveling with your project or following you across all work in tools like Antigravity. • The format is **simple and open**, working across platforms like Claude Code, Cursor, and GitHub Copilot, and you can build them using your AI agent.

## Summary

The video demonstrates how AI agent skills transform how we work with AI assistants by creating reusable, shareable knowledge modules.

**The Problem with Current AI Use**
Most people paste the same instructions into every chat and fix the same mistakes repeatedly. This is inefficient, consumes valuable context window space, and leads to generic outputs that don't align with personal or company branding, styles, or conventions.

**What is a Skill?**
A **skill** is an open standard for teaching an agent how to perform a specific task. It's implemented as a simple folder containing a `skill.md` file. This file has two critical parts:
1.  **Name and Description (YAML):** This is the 'hook' that the agent scans to decide if the skill is relevant to the current task.
2.  **Instructions:** This includes the approach, best practices, team conventions, examples of good outputs, and can reference additional resources (scripts, templates) in the same folder.

**Where Skills Live**
Skills exist in two locations:

- **Project-specific (`agent/skills/`):** These travel with the project repository, ensuring anyone who clones the repo automatically gets the skills. Ideal for project-specific development processes, testing conventions, or API patterns.

- **Global (User directory):** These follow the user across all projects in Antigravity. Ideal for personal tools, favorite frameworks, or patterns you want available everywhere.

**Demonstration: From Generic to Branded**
The host shows a before-and-after using Antigravity. First, asking the agent to create an executive dashboard results in a generic, unbranded page. Then, they create a 'brand guideline' skill specifying their company's aesthetic (AI with Surya) – colors, fonts, glassmorphism style. When the same dashboard prompt is run again, the agent references the skill and produces a perfectly branded output automatically.

**Demonstration: Team Onboarding**
A second example creates an 'HR Onboarding' skill containing project structure, tech stack, and pull request guidelines. A new team member can then ask the agent, "Where are the API routes?" and receive a precise, context-aware answer drawn from the skill, eliminating the need to search wikis or interrupt colleagues.

**The Bigger Picture**
Skills represent a shift from one-off prompting to building a **reusable knowledge base** for your AI agent. The format is an open standard, meaning skills built for Antigravity can work in other platforms like Claude Code and Cursor. The community has already created hundreds of skills. The rule of thumb: if you find yourself pasting the same thing into every new chat, it's a candidate for a skill.

## Context

This topic matters because as AI agents become integral to development, design, and business workflows, efficiency and consistency are paramount. Manually guiding an agent for every task wastes time and money (through context token usage). Skills solve this by allowing users to encode their unique requirements—brand identity, team processes, coding conventions—once, making the agent instantly effective and aligned. This is crucial for developers, product teams, and businesses scaling their use of AI, moving from generic assistants to personalized, context-aware co-pilots that truly understand how you work.