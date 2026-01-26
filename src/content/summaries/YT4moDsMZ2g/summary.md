---
metadata:
  videoId: "YT4moDsMZ2g"
  title: "Building Multiple Implementations Of The Same Spec with GitHub Spec Kit"
  description: "Building a specification is not just a one-and-done affair - you can use the same content to test multiple implementation variants and see which one fits your preferences. This is a nice hidden superpower of spec-driven development - you're not constrained to just one technical version of a feature or project. The same spec can be used to produce multiple iterations.


    😺 GitHub repo: https://github.com/github/spec-kit

    ✍️ Blog post: https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/

    📚 Additional details: https://devblogs.microsoft.com/blog/spec-driven-development-spec-kit

    ⛰️ HawaiiDiff (demo project in video): https://hawaiidiff.com


    Brand-new Spec Kit documentation: https://github.github.io/spec-kit/


    For more videos:


    📽️ Under the hood of Spec Kit: https://youtu.be/o6SYjY1Bkzo

    📽️ Overview of Spec Kit: https://youtu.be/a9eR1xsfvHg

    📽️ Building a MCP registry tracker with Spec Kit: https://youtu.be/pBJYq3BE7tc

    📽️ Improvements in GitHub Spec Kit: https://youtu.be/Wg-29qf8zR4

    📽️ GitHub Spec Kit supporting all major agents: https://youtu.be/1HnTGc7tHE4

    📽️ Analyzing and clarifying with Spec Kit: https://youtu.be/YD66SBpJY2M

    📽️ Using GitHub Spec Kit for existing projects: https://youtu.be/SGHIQTsPzuY

    📽️ Using GitHub Spec Kit with GitHub Copilot CLI: https://youtu.be/7tjmA_0pl2c

    📽️ Answering your Spec Kit questions: https://youtu.be/OFow2aTnqB8

    📽️ Checklists in GitHub Spec Kit: https://youtu.be/zTiLF3-BvGs


    #engineering #github #speckit #opensource #technology"
  channel: "Den Delimarsky"
  channelId: "UCNHIUc6KE64sUe5G0eP70aQ"
  duration: "PT25M34S"
  publishedAt: "2025-10-15T04:30:58Z"
  thumbnailUrl: "https://i.ytimg.com/vi/YT4moDsMZ2g/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=YT4moDsMZ2g"
processedAt: "2026-01-15T17:26:10.012Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Den Delimarsky demonstrates how to build and compare parallel implementations of a feature using GitHub Spec Kit and Git worktrees. - **Git worktree add** enables creating separate, linked working copies of a repository for simultaneous development of different UI variations. - This allows **comparing implementations live** (e.g., dropdown vs. toggle filters) and selecting the best approach for me\n"
ai:
  provider: "gemini"
  model: "gemini-2.5-flash"
  apiCalls: 3
  fallbackAttempts: 2
  inputTokens: 5965
  outputTokens: 1219
  totalTokens: 9327
  processingTimeMs: 29113
tools:
  - name: "GitHub Spec Kit"
    url: "https://github.com/github/spec-kit"
  - name: "Git"
    url: null
  - name: "Hugo"
    url: null
  - name: "GitHub Copilot CLI"
    url: null
  - name: "Visual Studio Code"
    url: null
categories:
  - "Tools & Productivity"
  - "AI & Machine Learning"
tags:
  - git
  - vscode
  - ai-coding
  - copilot
  - workflow
---

## Key Takeaways

Here are the essential takeaways from Den Delimarsky's demonstration of building parallel feature implementations:

- Utilize **Git worktrees** (`git worktree add`) to efficiently create multiple, isolated working copies of a repository. This allows developers to work on different feature implementations or UI variations simultaneously without juggling branches in a single directory.

- Git

Hub **Spec Kit** streamlines specification-driven development by using LLMs to generate detailed specs, plans, and tasks. It supports an **additive workflow** for integrating new features into existing projects seamlessly.

- The process enables **live comparison** of alternative implementations (e.g., checkbox dropdown vs. toggle filters) running side-by-side locally, facilitating a data-driven decision on which version to proceed with.

- This approach fosters **rapid experimentation** and iteration, allowing teams to explore multiple design choices for a single feature based on a shared core specification before committing to a final solution.

## Summary

Den Delimarsky presents a powerful workflow for developing **parallel implementations of the same specification** using Git

Hub Spec Kit and Git's `worktree` functionality. He illustrates this by adding a new filter feature to an existing static website, Hawaii diff, which aggregates webcam views from Monaca. The challenge is to implement a filter for camera snapshots, but there are multiple potential UI/UX approaches, and the goal is to evaluate them side-by-side.

### Spec Kit Workflow for New Features
The process begins with `specit specify`, prompting the LLM to generate a specification for the desired filter capability. Spec Kit automatically creates a new feature branch and populates it with a detailed `spec.md`, functional requirements (e.g., text search, real-time filtering, case-insensitivity), success criteria, a plan, and tasks. This **additive workflow** is particularly useful for modernizing or adding features to existing projects, as the LLM intelligently focuses on the new capability rather than a full project setup. For instance, initial tasks only verify the Hugo build, rather than re-initializing the entire site.

During the clarification phase, choices are made regarding UI elements. For the filter, the initial decision was a "drop-down menu with checkboxes inside." However, the video's core concept explores how to research and implement alternatives in parallel without complex branch switching or manual copying.

### Leveraging Git Worktrees for Parallel Development
The key to enabling parallel implementations lies in **Git worktrees**. Instead of constantly switching branches or copying project folders, the command `git worktree add -b <new-branch-name> <new-folder-name> <base-branch>` creates a new, separate working copy of the repository, linked to the same Git history but residing in a different directory on a new branch. In the demo, the original branch (`002 I want to`) and its associated project folder are maintained for the initial implementation (dropdown with checkboxes). A new worktree (`filter alt`) is created from this base branch for the alternative implementation.

### Iteration and Comparison
With two separate worktrees, the developer can open both in parallel (e.g., in two VS Code instances). The specification in the "filter alt" worktree is then modified, changing the filter design from "checkboxes in a dropdown" to "toggle buttons" (pills/chips). Spec Kit's LLM automatically updates the `spec.md`, plan, and tasks in this isolated worktree to reflect the new UI approach.

Once both worktrees have their respective specifications and tasks updated, `specit implement` can be run in each. This allows the LLM to generate the code for both variations concurrently. The true power of this method is revealed when both implementations are run locally (e.g., using `hugo server` on different ports). The video shows the two versions side-by-side: one with a text search and a dropdown with checkboxes, and the other with a text search and clickable toggle buttons. This direct visual comparison facilitates an informed decision on which implementation best meets the user's needs or aesthetic preferences.

The video also briefly touches on an upcoming Spec Kit update that will improve branch naming conventions, moving from generic names like "002 I want to" to more descriptive ones like "homepage-filter," further enhancing organization for parallel development. This workflow significantly speeds up experimentation and reduces the overhead traditionally associated with testing multiple feature designs.

## Context

This video is highly relevant for developers and product teams seeking to enhance their **software development efficiency** and **iterative design processes**. By demonstrating the power of **Git worktrees** combined with **LLM-driven specification development (Spec Kit)**, it addresses the common challenge of exploring multiple implementation approaches for a single feature without incurring significant overhead.

This methodology matters because it enables **rapid experimentation** and A/B testing of different UI/UX designs or technical solutions early in the development cycle. It empowers teams to make data-informed decisions by visually comparing live, parallel implementations, thereby reducing rework and improving product quality. This approach aligns with broader trends in agile development, MLOps, and the increasing adoption of AI-assisted coding, making it invaluable for anyone looking to optimize their development workflow and ensure the best possible user experience.
