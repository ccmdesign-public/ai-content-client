---
metadata:
  videoId: "OFow2aTnqB8"
  title: "Answering Your GitHub Spec Kit Questions"
  description: "Instead of me recording another demo, I thought I'd spend some time answering some of the community questions around GitHub Spec Kit and Spec-Driven Development (SDD).

    😺 GitHub repo: https://github.com/github/spec-kit

    ✍️ Blog post: https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/

    📚 Additional details: https://devblogs.microsoft.com/blog/spec-driven-development-spec-kit

    Brand-new Spec Kit documentation: https://github.github.io/spec-kit/

    GitHub Copilot CLI: https://github.com/github/copilot-cli

    For more videos:

    📽️ Under the hood of Spec Kit: https://youtu.be/o6SYjY1Bkzo

    📽️ Overview of Spec Kit: https://youtu.be/a9eR1xsfvHg

    📽️ Building a MCP registry tracker with Spec Kit: https://youtu.be/pBJYq3BE7tc

    📽️ Improvements in GitHub Spec Kit: https://youtu.be/Wg-29qf8zR4

    📽️ GitHub Spec Kit supporting all major agents: https://youtu.be/1HnTGc7tHE4

    📽️ Analyzing and clarifying with Spec Kit: https://youtu.be/YD66SBpJY2M

    📽️ Using GitHub Spec Kit for existing projects: https://youtu.be/SGHIQTsPzuY

    📽️ Using GitHub Spec Kit with GitHub Copilot CLI: https://youtu.be/7tjmA_0pl2c

    #engineering #github #speckit #opensource #technology"
  channel: "Den Delimarsky"
  channelId: "UCNHIUc6KE64sUe5G0eP70aQ"
  duration: "PT20M24S"
  publishedAt: "2025-09-30T01:46:57Z"
  thumbnailUrl: "https://i.ytimg.com/vi/OFow2aTnqB8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=OFow2aTnqB8"
processedAt: "2026-01-15T17:28:17.876Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Den Delimarsky answers top questions about GitHub Spec Kit:

  - **Spec** is the **sole source of truth**, update it with learnings; plan/tasks are flexible.

  - Leverage **Git workflows** heavily to manage LLM drift: commit specs, discard rogue code, re-prompt.

  - Spec Kit adapts to **brownfield projects** by providing context; future updates will support **monorepos** with multiple specit folders.\n"
ai:
  provider: "gemini"
  model: "gemini-2.5-flash"
  apiCalls: 3
  fallbackAttempts: 2
  inputTokens: 5197
  outputTokens: 1268
  totalTokens: 10130
  processingTimeMs: 40862
tools:
  - name: "GitHub Spec Kit"
    url: "https://github.com/github/spec-kit"
  - name: "GitHub Copilot CLI"
    url: "https://github.com/github/copilot-cli"
  - name: "Cursor"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "architecture"
  - "best-practices"
  - "copilot"
  - "git"
tagsNormalizedAt: "2026-03-01T21:19:30.261Z"
---

## Key Takeaways

The video highlights best practices and future directions for using Git

Hub Spec Kit effectively:

- The **spec document** should be treated as the **sole source of truth**, capturing final learnings and design decisions, while implementation plans and tasks are more flexible.

- When an AI agent (like Cursor) deviates or creates unwanted code, rely on **Git workflows** to revert changes and update the spec before re-prompting. Commit specs, discard uncommitted code, and iterate.

- Spec Kit can be effectively used with **existing ("brownfield") projects** by providing comprehensive context about the codebase's structure and components, allowing the LLM to integrate new features appropriately.

- For complex **monorepos**, future updates will support **multiple `.specit` folders** per sub-project (e.g., backend, frontend) to offer greater granularity and maintain specific contexts, moving beyond a single-repo, single-specit setup.

## Summary

This video addresses several key questions from the community about using Git

Hub Spec Kit, focusing on best practices, managing AI agent behavior, and adapting to various project types.

### Spec as the Sole Source of Truth

The speaker emphasizes that the **spec document** should be the **sole source of truth** for a project. While initial plans and tasks may drift during development, the spec should always be updated to reflect the final output and any learnings or decisions made during implementation. If technical details like databases or frameworks change, the **plan** should also be updated. However, tasks are highly flexible and can be recreated as needed. The priority for durability is **spec > constitution > plan > tasks**. Keeping all documentation updated is generally recommended, but the spec holds paramount importance for future reusability and clarity.

### Managing AI Agent Drift with Git

A common concern is when an AI agent, such as Cursor, starts generating code that deviates from the desired specification or creates unwanted files. The recommended approach is to **lean heavily into Git workflows**. When this occurs, first, update the **specification** to precisely define what is needed (and what is not). Then, use a **Git client** to discard any uncommitted, unwanted code changes that the agent might have generated. Ensure that the updated spec is committed and pushed to the branch. Finally, use this refined spec to re-prompt the agent, guiding it back onto the correct path. The speaker stresses the importance of committing frequently for working changes and being proficient with Git branching and staging.

### Spec Kit in Multi-Repo and Monorepo Environments

For teams using different Git repositories for various parts of an application, the speaker's experiments suggest that **one Spec Kit deployment per repository** is generally most effective. This approach contains the work within its respective repo, simplifying management. While sharing common assets like an organizational **constitution** (defining general web app build standards) can be done via **Git submodules**, specific specs for features are often unique to each repo (e.g., a mobile app vs. a web app).
For **complex monorepos** that encompass backend, frontend, and database files in a single repository, the current single `.specit` folder can be restrictive. The team is actively working on enabling **multiple `.specit` folders** within a monorepo—for instance, one for the backend and another for the frontend. This will provide necessary granularity, allowing different parts of the project to have their own specific constitutions and spec formats, while common slash commands remain consistent. A documented approach for this is forthcoming.

### Reusing Specs and Integrating with Existing Projects

The value of a well-defined spec lies in its ability to **detach implementation from definition**. For features or bug fixes originally built using Spec Kit and encoded in spec files, they can be readily **recreated or refactored** with entirely different underlying technology stacks (e.g., moving from Hugo to Jekyll). The spec acts as an "executable artifact" that can be fed to an LLM to rebuild functionality within a new codebase context.
For **existing ("brownfield") projects** not initially built with Spec Kit, new features can still be added. The key is to **provide the LLM with as much context as possible** about the project's existing structure, components, and build processes. Tools like `cloud.md` or existing agent files can supply this information. While modern LLMs are improving at dynamically inferring context, proactive provision of details significantly enhances accuracy. Engineers must still review and guide the LLM, especially in complex brownfield scenarios.

### Evolving Test-Driven Development (TDD) Defaults

A critical piece of feedback acknowledged is the heavy and often unnecessary inclusion of **Test-Driven Development (TDD)** by default in Spec Kit templates, which can be credit-expensive and time-consuming for rapid prototyping or simple features. The speaker confirms that a **TDD-less option is in development**, allowing users to opt out of default test creation. TDD will remain available for more "serious enterprise-y projects" where it is appropriate, but it will not be a baked-in requirement for every scenario.

## Context

This video is crucial for developers, product managers, and designers exploring or using AI-assisted development tools like Git

Hub Spec Kit. It addresses practical challenges and best practices for integrating LLMs into software development workflows. The discussion on managing spec drift, utilizing Git for AI-generated code, and adapting to existing or complex monorepo projects reflects the evolving landscape of AI in development. Understanding these points helps professionals leverage AI effectively, maintain code quality, and ensure project coherence in an increasingly AI-driven engineering environment.
