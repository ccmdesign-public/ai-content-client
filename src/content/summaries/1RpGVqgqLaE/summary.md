---
metadata:
  videoId: "1RpGVqgqLaE"
  title: "MCP Tools Just Got 10x Faster In Claude Code"
  description: "Claude Code Has FINALLY Solved the MCP Context Nightmare! The team just released MCP Tool Search, a game-changing update that dynamically loads tools into context when MCP tools would otherwise consume too much space. When Claude Code detects that MCP tool descriptions would use over 10% of context, tools are loaded via search instead of being preloaded. This directly addresses a major pain point where users were running 7+ servers consuming 67k+ tokens, making MCP development far more efficient without changing how tools work for end users.


    🔗 Relevant Links

    Tweet from Claude Code Team - https://x.com/trq212/status/2011523109871108570

    Cursor MCP fix - https://cursor.com/blog/dynamic-context-discovery

    Anthropic Article - https://www.anthropic.com/engineering/advanced-tool-use

    Cloudflare Code Mode - https://blog.cloudflare.com/code-mode/


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT4M11S"
  publishedAt: "2026-01-15T22:43:15Z"
  thumbnailUrl: "https://i.ytimg.com/vi/1RpGVqgqLaE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=1RpGVqgqLaE"
processedAt: "2026-01-16T15:22:49.786Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Claude Code's new **tool search** feature reduces MCP context usage by up to 95% through progressive disclosure.

  - **Token Efficiency**: Prevents preloading 60,000+ tokens by only loading tool schemas on demand.

  - **Dynamic Discovery**: Triggers when tool definitions exceed 10% of the context window, selecting the 3-5 most relevant tools.

  - **Performance**: Minimizes model degradation caused by ex\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1282
  outputTokens: 873
  totalTokens: 2910
  processingTimeMs: 12195
tools:
  - name: "Claude Code"
    url: null
  - name: "MCP Tool Search"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "GitHub"
    url: "https://github.com/"
  - name: "Docker"
    url: "https://www.docker.com/"
  - name: "Notion"
    url: "https://www.notion.so/"
  - name: "Cloudflare Code Mode"
    url: "https://blog.cloudflare.com/code-mode/"
  - name: "Cursor"
    url: "https://cursor.com/"
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "agents"
  - "ai-coding"
  - "claude"
  - "performance"
tagsNormalizedAt: "2026-03-01T21:19:30.395Z"
---

## Key Takeaways

The implementation of **tool search** in Claude Code addresses the primary bottleneck of the Model Context Protocol (MCP): token inefficiency.

* **Context Optimization**: By replacing bulk preloading with natural language tool discovery, developers can connect dozens of MCP servers without exhausting the **context window**.

* **The 10% Rule**: Claude automatically switches to search mode when tool metadata consumes more than 10% of the available context (e.g., 20k tokens in a 200k window).

* **Progressive Disclosure**: The system only fetches full JSON schemas, descriptions, and constraints for the specific tools identified as relevant to the current prompt.

* **Architectural Debate**: Anthropic opted for a **search-based approach** over the programmatic orchestration used by competitors like Cloudflare, prioritizing discovery speed.

## Summary

The Model Context Protocol (MCP) has become a standard for connecting LLMs to external data sources like Git

Hub, Docker, and Notion. However, its biggest flaw has been **token inefficiency**. Typically, every tool's name, description, and full JSON schema must be preloaded into the context window to give the model visibility. For complex setups involving multiple servers, this can consume over 60,000 tokens before a user even sends a prompt, significantly reducing the remaining space for actual reasoning and conversation.

### The Search-Based Solution
To solve this, the Claude Code team introduced a **dynamic search** mechanism. Instead of preloading every available tool, the system monitors the context overhead. If MCP tools occupy less than 10% of the total context window, they remain preloaded. However, if they exceed that threshold, Claude switches to a **progressive disclosure** model. In this mode, the model uses natural language to identify which tools are needed and only loads the detailed schemas for the 3-5 most relevant ones. This process is similar to how agentic 'skills' are managed, keeping the model's 'working memory' focused and efficient.

### Search vs. Programmatic Orchestration
While the Claude Code team focuses on search, other players like **Cloudflare** have explored a **programmatic approach**. In that model, the LLM orchestrates tools by writing and executing code (such as Python or Type

Script) within a sandbox. This allows for complex tool chaining without individual API calls for every step. Although Claude is highly proficient at writing code, Anthropic's developers found the search-based discovery method to be more effective for their current CLI implementation. 

### Performance Implications
Even though modern models like Gemini offer massive 1-million-token windows, model performance often degrades as context fills up. By keeping the context 'lean' through tool search, Claude maintains higher accuracy and lower latency. This update makes it feasible for developers to maintain large libraries of MCP servers without the penalty of 'naming collisions' or 'command injections' that often occur when an LLM is overwhelmed by too many options simultaneously.

## Context

As LLMs transition from simple chatbots to agentic workflows, the ability to interact with external tools is critical. The Model Context Protocol (MCP) is the leading standard for this interoperability, but its 'heavy' nature previously limited its scalability. This update to Claude Code matters because it enables a 'plugin-heavy' future where developers don't have to choose between tool availability and model intelligence. It reflects a broader trend in AI engineering toward 'context management'—the art of giving models exactly what they need at the right moment, rather than overwhelming them with data, which improves both cost-efficiency and task success rates.
