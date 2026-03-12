---
metadata:
  videoId: "mpqrdghoj_Y"
  title: "Forking Chat Sessions!"
  description: "Have you tried forking chat sessions in VS Code? Create a new independent session that keeps the conversation history so you can explore alternative approaches without losing your original context. Watch the video to see how it works.

    https://aka.ms/ForkingChat"
  channel: "Visual Studio Code"
  channelId: "UCs5Y5_7XK8HLDX0SLNwkd3w"
  duration: "PT1M7S"
  publishedAt: "2026-03-10T21:40:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/mpqrdghoj_Y/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=mpqrdghoj_Y"
processedAt: "2026-03-12T16:07:00.437Z"
source: "youtube"
tldr: "Visual Studio Code now allows you to fork chat sessions in two ways: using the /fork command to duplicate an entire session, or forking from a specific checkpoint to create a new session that inherits conversation history up to that point."
tools:
  - name: "Visual Studio Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "productivity"
  - "vscode"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1762
  outputTokens: 629
  totalTokens: 2391
  processingTimeMs: 12307
tagsNormalizedAt: "2026-03-12T16:15:53.854Z"
---

## Key Takeaways

Visual Studio Code introduces powerful chat session forking capabilities for more flexible AI-assisted development workflows. • **Two forking methods**: Use `/fork` command for entire session duplication or fork from specific checkpoints • **Context preservation**: Forked sessions inherit conversation history from the original session • **Checkpoint restoration**: Restoring to checkpoints removes subsequent context, enabling focused exploration of different conversation paths

## Summary

Visual Studio Code has introduced a new feature that allows developers to fork chat sessions, creating independent sessions that inherit conversation history from the original. This functionality provides two distinct approaches to session management.

### Two Forking Methods

You can fork sessions in two ways. The first method involves typing `/fork` in the chat input box to create a completely new session that duplicates the entire conversation history. The second method allows forking from specific checkpoints within the conversation timeline.

### Checkpoint-Based Forking

The checkpoint approach enables more granular control over session branching. For example, if you navigate to a specific point in the conversation history and select "fork conversation," you create a new session that inherits only the history up to that checkpoint. This is particularly useful when you want to explore different conversational paths from a specific point without losing the original context.

### Context Management

When you fork from a checkpoint, any new information added to the conversation after that point is excluded from the forked session. The video demonstrates this with an example: after asking about cloning a repository, then asking "what is JavaScript," the AI includes both questions in its context. However, if you restore to the checkpoint before the JavaScript question and ask "what did I just ask you?" the AI will only recall the cloning question, effectively "forgetting" the subsequent context.

### Practical Applications

This feature enables developers to:

- Explore multiple solution approaches from the same starting point

- Maintain clean conversation threads for different topics

- Experiment with prompts without corrupting original sessions

- Create specialized sessions for specific tasks while preserving foundational context

## Context

This feature enhances AI-assisted development workflows in Visual Studio Code, addressing the common challenge of maintaining organized conversation histories when using AI coding assistants. Developers working with AI pair programmers need ways to branch conversations without losing valuable context, especially when exploring multiple approaches to the same problem or switching between different coding tasks. This reflects the growing sophistication of IDE-integrated AI tools beyond simple Q&A to more complex, context-aware collaboration.