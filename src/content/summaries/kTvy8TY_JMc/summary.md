---
metadata:
  videoId: "kTvy8TY_JMc"
  title: "Prompt to Automate Some CLAUDE.md Rules #claudecode"
  description: "More of my AI Coding experiments on my website: https://aicodingdaily.com?mtm_campaign=youtube-channel-default-link"
  channel: "AI Coding Daily"
  channelId: "UCIuDdCJXnKZb4CUzhVO-DcQ"
  duration: "PT1M47S"
  publishedAt: "2026-02-23T12:30:17Z"
  thumbnailUrl: "https://i.ytimg.com/vi/kTvy8TY_JMc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=kTvy8TY_JMc"
processedAt: "2026-03-10T16:18:46.185Z"
source: "youtube"
tldr: "A prompt can identify which CLAUDE.md rules should be automated outside the AI assistant (e.g., via Laravel Pint, PHPStan, Larastan, or Pest tests) to guarantee execution, potentially shortening the file by 22 lines/800 tokens and increasing reliability."
tools:
  - name: "Laravel Pint"
    url: null
  - name: "PHPStan"
    url: null
  - name: "Larastan"
    url: null
  - name: "Pest"
    url: null
  - name: "Laravel Boost"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "best-practices"
  - "productivity"
  - "prompt-engineering"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1936
  outputTokens: 872
  totalTokens: 2808
  processingTimeMs: 28551
tagsNormalizedAt: "2026-03-10T16:49:06.369Z"
---

## Key Takeaways

This video demonstrates how to use AI to audit and automate CLAUDE.md coding rules for better reliability.

* **Identify automatable rules** with a specific prompt to find instructions better handled by external tools.

* **Automate formatting and analysis** using tools like Laravel Pint for code styling and PHPStan/Larastan for type checking.

* **Increase reliability** by moving rules from CLAUDE.md to automated hooks or CI processes, ensuring they always execute.

## Summary

The video addresses a key limitation of using CLAUDE.md files with AI coding assistants: not all instructions within them are guaranteed to be executed. It presents a solution based on a prompt suggested by Matio, designed to analyze a CLAUDE.md file and identify which rules can be automated externally.

**Applying the Prompt to a Laravel Project**
The creator tested this prompt on a large CLAUDE.md file generated for a Laravel project using Laravel Boost. The analysis yielded concrete recommendations for automation.

*   The first major recommendation was to automate code formatting and styling using **Laravel Pint**. This could be set up as a hook within the AI coding environment (like Cline or Cursor's 'cloud code') or as a pre-commit hook. This ensures formatting is applied every time code is written or edited.

*   The second recommendation involved using static analysis tools like **PHPStan** or **Larastan** for PHP projects. These tools can automatically enforce rules concerning return types, type hints, and relationship methods, covering a significant portion of typical CLAUDE.md instructions.

**Smaller, Configurable Rules**
The prompt also identified smaller, project-specific rules that could be automated. For example:

*   Rules like "always use curly braces" can be configured directly in Laravel Pint's JSON configuration file.

*   A rule to "not allow empty constructor methods" can also be enforced as a Pint rule.

**Moving Beyond Linting to Testing**
Some architectural or business logic rules within CLAUDE.md can be moved into **automated tests** using a framework like **Pest**. This provides an even stronger guarantee that certain conditions or patterns are maintained.

**The Outcome and Core Benefit**
In this case, implementing the recommendations would shorten the CLAUDE.md file by approximately 22 lines or 800 tokens. However, the presenter emphasizes that the primary goal is not a shorter file, but **greater reliability**. By shifting instructions from the AI's context window to automated tools that run locally or in a CI/CD pipeline, compliance with those rules becomes guaranteed, not just suggested.

## Context

This matters because as developers integrate AI coding assistants (like Claude Code) into their workflow, they often use CLAUDE.md files to define project-specific rules and patterns. However, reliance on the AI to remember and apply all these rules is unreliable. This video shows a pragmatic method to audit those instructions and offload enforceable ones to dedicated, reliable tooling, blending AI-assisted development with robust software engineering practices. It's relevant for any developer or team using AI coding tools who wants to improve code quality and consistency.