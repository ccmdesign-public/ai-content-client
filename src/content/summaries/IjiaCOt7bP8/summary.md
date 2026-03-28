---
metadata:
  videoId: "IjiaCOt7bP8"
  title: "Agent Skills: Code Beats Markdown (Here's Why)"
  description: "Checkout DataImpulse Proxies: https://dataimpulse.com/?utm_source=youtube&utm_medium=video&utm_campaign=samwitteveenai


    In this video, I look at how you can improve your Claude/Agent skills by improving the code quality in the scripts that are in there, and I use scraping scripts as an example of this.\ 


    Twitter: https://x.com/Sam_Witteveen\ 


    🕵️ Interested in building LLM Agents? Fill out the form below

    Building LLM Agents Form: https://drp.li/dIMes


    👨‍💻Github:

    https://github.com/samwit/llm-tutorials


    ⏱️Time Stamps:00:00 Intro

    00:18 Claude Skills/ Agents Skills

    01:02 skill.sh/ Skills Marketplace

    01:38 Why Skills Work

    02:48 Skills Structure

    04:56 Scraping Skills

    06:51 Scraping Mistakes: Using Web Fetch Tool the Wrong Way

    09:58 SKILL.md is the Orchestrator

    13:42 Designing Incremental Runs"
  channel: "Sam Witteveen"
  channelId: "UC55ODQSvARtgSyc8ThfiepQ"
  duration: "PT16M18S"
  publishedAt: "2026-03-27T13:00:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/IjiaCOt7bP8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=IjiaCOt7bP8"
processedAt: "2026-03-28T17:52:16.700Z"
source: "youtube"
tldr: "Sam Witteveen explains why AI agent skills perform better using coded scripts rather than plain markdown instructions, focusing on web scraping. By executing Python or bash scripts in a sandbox, agents can reduce token usage by up to 90% (e.g., from 8,000 to 1,000 tokens). Key techniques include using pre-defined CSS selectors, parallel threading, incremental runs, and JSON formatting."
tools:
  - name: "Claude Code"
    url: null
  - name: "Gemini CLI"
    url: null
  - name: "Data Impulse"
    url: null
  - name: "Puppeteer"
    url: null
  - name: "Playwright"
    url: null
categories:
  - "AI & Machine Learning"
tags:
  - "agents"
  - "claude"
  - "prompt-engineering"
ai:
  provider: "notebooklm"
  model: "notebooklm"
  apiCalls: 1
  fallbackAttempts: 0
  processingTimeMs: 43190
tagsNormalizedAt: "2026-03-28T18:07:56.944Z"
---

## Key Takeaways

Here are the most important takeaways for building efficient AI agent skills:

* Transitioning from markdown instructions to **coded scripts** executed in a sandbox drastically reduces token consumption and improves reliability.

* Avoid raw HTML extraction; explicitly define **CSS selectors** and filter out unnecessary tags like nav or script to achieve up to a 90% token reduction.

* Enforce **JSON structured output** directly within the script to offload heavy logical lifting from the underlying LLM.

* Implement **stop conditions** and design for **incremental runs** to prevent infinite pagination loops and redundant data processing.

## Summary

Sam Witteveen explores the rapid evolution of AI agent skills, which have emerged as a powerful open standard outperforming traditional MCP systems due to their simplicity. Companies like OpenAI and DeepMind are adopting these skills to enhance their internal coding harnesses, such as anti-gravity and Gemini CLI.

### Anatomy of an Agent Skill

A robust agent skill consists of several core components designed to optimize the model's performance and efficiency.

The foundational element is the **skill.md** file, which acts as the orchestrator containing essential metadata and core instructions.

A references or assets folder provides the model with expected output examples and necessary visual images.

The most critical components are the scripts, which allow the agent to execute code directly within a secure sandbox environment using Python or bash.

### Optimizing Web Scraping Scripts

Witteveen uses web scraping as a primary example of how developers often waste tokens by relying on generic markdown instructions rather than optimized code.

When models use a raw web fetch tool to grab an entire HTML page, they consume massive amounts of context with useless formatting.

For example, scraping the front page of Hacker News can effortlessly consume over 8,000 tokens.

By writing a specific script to filter out unnecessary tags like scripts, styles, navigation bars, and footers, developers can reduce the context load to under 1,000 tokens, achieving a massive 90% reduction.

To safely execute these complex scraping tasks without getting blocked, developers can integrate reliable residential proxies like those from **Data Impulse**, which offers over 95 million ethically sourced IPs for tools like Puppeteer and Playwright.

### Advanced Scripting Best Practices

To build enterprise-grade skills, scripts must handle the heavy computational lifting so the underlying language model does not have to.

* **Pre-defined Selectors**: Instead of forcing the model to deduce the page structure on every run, use Claude once to identify the exact CSS classes and hardcode them into your scraping script.

* **Structured Outputs**: Scripts should automatically parse the scraped data and return it to the model in strict **JSON** format.

* **Parallel Execution**: Utilize threading within your scripts to run multiple searches simultaneously, avoiding costly sequential round trips to the LLM.

* **Context Management**: Implement strict stop conditions to prevent the skill from getting stuck in infinite pagination loops that flood the context window.

* **Incremental Runs**: Design scripts to check local storage for previous reports, ensuring the agent only scrapes new data rather than starting from scratch every session.

By shifting complex logic from the prompt directly to the code, developers can drastically cut token bills and create highly efficient, reliable AI applications.

## Context

As AI agents transition from experimental novelties to production-ready tools, managing context windows and API token costs has become a critical engineering challenge. Traditional markdown-based prompting often forces large language models to process excessive, unstructured data, leading to context bloat and high expenses. Understanding how to offload logic into coded sandbox scripts is essential for AI developers and engineers looking to build scalable, efficient, and reliable multi-agent systems. This shift towards standardized, script-backed agent skills marks a significant maturation in how developers orchestrate autonomous AI workflows.