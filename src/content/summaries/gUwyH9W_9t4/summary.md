---
metadata:
  videoId: "gUwyH9W_9t4"
  title: "🚀Claude Skills Got An UPDATE | Check Your Skills Now!"
  description: "This video discusses the challenges of trusting AI skills, noting that while 86% of engineers use AI daily, only 6% fully trust its output. It highlights that current claude code skills fail on over half of prompts and introduces methods like ab testing and automated description fixes. The content also touches on the importance of understanding the type of skill being tested before evaluation and promotes \"DIY Smart Code\" as a solution for improving ai tools skill development and testing.


    ----

    Learn Agentic Coding with Dynamous AI - Daily Events and Workshops (https://dynamous.ai/?code=646a60) - 10% off with our link: https://shorturl.smartcode.diy/dynamous_ai_10_percent_discount

    ----


    Chapters

    0:00 The New Claude Code Skill Evals

    0:14 The Trust Gap: 86% Use AI, Only 6% Trust It (2026 Survey)

    0:50 Capability Uplift vs Encoded Preference: Two Kinds of Claude Code Skills

    1:42 What Are Evals: Jest for AI Skills (Executor + Grader Pipeline)

    2:25 The PDF Bug: How One Eval Jumped Pass Rate from 40% to 95%

    3:05 Parallel Evaluation: Why Sequential Testing Gives Wrong Results

    3:44 Blind A/B Comparator: Double-Blind Clinical Trials for AI Output

    5:00 Benchmark Mode + CI Pipeline: GitHub Actions for AI Skills

    5:46 Description Optimization: 5 of 6 Anthropic Skills Had Broken Triggers

    6:36 The Future: When Skills Become Specs (Anthropic's Vision)

    7:08 How to Install skill-creator and Run Your First Eval



    Key Concepts:

    - Skill Creator Evals: Define test prompts with success criteria, run them against your skill, get pass/fail verdicts with evidence. Think Jest for AI skills.

    - Parallel Multi-Agent Evaluation: Each eval runs in an isolated agent context — no cross-contamination from sequential runs. Clean results every time.

    - Blind Comparator Agent: A/B tests two skill versions without knowing which is which. Eliminates confirmation bias with objective, reproducible judging.

    - Benchmark Mode: Tracks pass rate, elapsed time, and token usage per eval run. Plug into CI to catch regressions on every model update.

    - Description Optimization: Analyzes your SKILL.md description against 20 test queries (10 should-trigger, 10 should-not) and rewrites to reduce false positives/negatives.


    Skill Creator Features Covered:

    - /plugin install skill-creator@claude-plugins-official

    -  /skill-creator eval (single eval mode)

    -  /skill-creator benchmark (pass rate, time, tokens)

    -  /skill-creator compare (blind A/B comparator)

    -  /skill-creator improve (description optimization loop)

    - Eval Viewer (interactive HTML results UI)

    - 4 specialized sub-agents: Executor, Grader, Comparator, Analyzer


    Resources and Links:

    - Improving Skill Creator (Anthropic Official Blog): https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills

    - Claude Code Skills Documentation: https://docs.anthropic.com/en/docs/claude-code/skills

    - Skill Creator Plugin (GitHub): https://github.com/anthropics/skills

    - Vercel Agent Eval Study (56% Skill Failure Rate): https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals

    - Stack Overflow 2025 Developer Survey (AI Trust Data): https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/

    - 86% Use AI, 6% Trust It (2026 Engineer Survey): https://allwork.space/2026/02/86-of-u-s-engineers-use-ai-but-only-6-fully-trust-it-2026-survey-finds/

    - Measuring Skill Activation with Sandboxed Evals: https://scottspence.com/posts/measuring-claude-code-skill-activation-with-sandboxed-evals

    - SkillsBench Research Paper (Curated vs Self-Generated): https://arxiv.org/abs/2602.12670


    ---


    Should AI skills ship without tests, or is untested AI the new technical debt? Drop your take below.


    #ClaudeCode #SkillCreator #SkillCreatorEvals #Anthropic #AISkills #AgentSkills #ClaudeCodeSkills #AITesting #EvalFramework #DevTools #AIBenchmark #DeveloperProductivity #AgenticAI #AIQuality #ClaudeCodePlugins #SkillsMD #AIDevTools #LLMTesting #AIReliability #ContinuousIntegration #BlindTesting #ABTesting #AIEngineering #OpenSource #TypeScript"
  channel: "DIY Smart Code"
  channelId: "UC_a85mUHqsy5j0CYCgLnkEQ"
  duration: "PT7M34S"
  publishedAt: "2026-03-04T15:33:49Z"
  thumbnailUrl: "https://i.ytimg.com/vi/gUwyH9W_9t4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=gUwyH9W_9t4"
processedAt: "2026-03-08T21:39:03.571Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Anthropic's Skill Creator tool now offers unit testing for Claude AI skills, revealing that 86% of engineers use AI but only 6% trust its output, with skills silently failing on over half of prompts, and the tool provides parallel evaluation, blind A/B testing, and automated description fixes to solve this."
tools:
  - name: "Skill Creator"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "claude"
  - "prompt-engineering"
  - "testing"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5163
  outputTokens: 957
  totalTokens: 6120
  processingTimeMs: 45537
tagsNormalizedAt: "2026-03-08T22:16:05.135Z"
---

## Key Takeaways

The video details Anthropic's new unit testing framework for Claude AI skills, designed to address widespread trust and reliability issues.

*   **Skills are failing silently**: A Vercel study showed an agent with a skill performed identically to one without in 53% of cases, as the skill was never called due to poor descriptions or implementation.

*   **Testing is essential and now automated**: Skill Creator allows you to define test prompts and success criteria, then runs **parallel evaluations** in isolated contexts and performs **blind A/B comparisons** to objectively measure improvements.

*   **Skill descriptions are critical code**: The short description in a skill's `.md` file is the most important line, acting as routing logic. Skill Creator now analyzes and iteratively rewrites descriptions to fix triggering issues.

*   **Focus on encoded preference skills**: Skills that encode your specific workflow, brand voice, or process (like NDA summaries) hold long-term value, unlike temporary capability uplift skills that become obsolete with model updates.

## Summary

The video introduces a significant update to Anthropic's ecosystem for building reliable Claude AI skills, centered on the new **Skill Creator** tool. It addresses a critical problem: while 86% of engineers use AI daily, only 6% fully trust its output, largely because custom skills fail silently on more than half of the prompts they should handle.

### The Testing Problem and Solution

A cited Vercel study demonstrated the issue starkly—an agent with access to a skill performed identically (53% same score) to an agent with no documentation because the skill was never invoked in over half of test cases. **Skill Creator** solves this by bringing a unit testing paradigm to AI skills. You define a test prompt and describe what good output looks like. The tool then runs your skill against it, with a separate 'grader' agent determining pass/fail with evidence.

The pipeline ensures **clean, parallel execution**. Instead of running tests sequentially (where context bleeds between runs), Skill Creator runs multiple evaluations simultaneously in isolated 'glass wall' contexts. This prevents contamination and delivers real, measurable benchmarks for pass rate, elapsed time, and token usage.

### Beyond Basic Testing: A/B and Descriptions

For validating improvements, the tool includes a **comparator agent** that performs blind A/B testing. It takes outputs from two skill versions without labels and judges them objectively, eliminating confirmation bias—like a double-blind clinical trial for your AI.

Perhaps the most surprising insight is the critical role of the **skill description**. The short paragraph at the top of a skill file is not cosmetic; it's the routing logic that determines if Claude ever loads the skill. A bad description is a broken import statement. Skill Creator now analyzes descriptions against 20 test queries (10 that should trigger the skill, 10 that should not) and can run up to five iterations to rewrite and optimize them, reducing false positives and negatives.

### The Future of Skills

Anthropic observes the line between skill implementation and specification blurring. As models get smarter, the *how* becomes less important than the *what*. The future may see skills evolving into pure specifications of desired outcomes, with the model determining the implementation. For now, Skill Creator provides the essential toolkit—testing, benchmarking, and description optimization—to build AI skills you can actually prove work.

## Context

This video is crucial for developers, product teams, and anyone building production applications with Claude's AI skills. As AI integration becomes standard, the gap between usage and trust is a major barrier to adoption. Unreliable, silently failing skills undermine product quality and user confidence. This update provides the rigorous testing and validation framework needed to transition AI features from experimental prototypes to dependable, shippable components, aligning AI development with established software engineering best practices like CI/CD and quality assurance.