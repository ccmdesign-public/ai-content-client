---
metadata:
  videoId: "1_VlT1vhN04"
  title: "Anthropic Made Their OpenClaw"
  description: "Claude Dispatch is here. It let's you control your Desktop Claude instance in a  persistent conversation.\ 


    https://x.com/felixrieseberg/status/2034005731457044577


    My Dictation App: www.whryte.com

    Website: https://engineerprompt.ai/

    RAG Beyond Basics Course:

    https://prompt-s-site.thinkific.com/courses/rag

    Signup for Newsletter, localgpt: https://tally.so/r/3y9bb0


    Let's Connect:\ 

    🦾 Discord: https://discord.com/invite/t4eYQRUcXB

    ☕ Buy me a Coffee: https://ko-fi.com/promptengineering

    |🔴 Patreon: https://www.patreon.com/PromptEngineering

    💼Consulting: https://calendly.com/engineerprompt/consulting-call

    📧 Business Contact: engineerprompt@gmail.com

    Become Member: http://tinyurl.com/y5h28s6h


    💻 Pre-configured localGPT VM: https://bit.ly/localGPT (use Code: PromptEngineering for 50% off). \ 


    Signup for Newsletter, localgpt:

    https://tally.so/r/3y9bb0"
  channel: "Prompt Engineering"
  channelId: "UCDq7SjbgRKty5TgGafW8Clg"
  duration: "PT8M23S"
  publishedAt: "2026-03-18T13:15:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/1_VlT1vhN04/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=1_VlT1vhN04"
processedAt: "2026-03-24T22:17:03.223Z"
source: "youtube"
tldr: "Anthropic launched 'Dispatch' for Claude, a feature that lets users remotely control their desktop from their phone, providing persistent access to files, plugins, and browser control, effectively creating their version of an OpenClaude-like personal AI assistant."
tools:
  - name: "Claude"
    url: null
  - name: "Claude Co-Work"
    url: null
  - name: "Claude for Chrome"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-general"
  - "automation"
  - "claude"
  - "llm"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5618
  outputTokens: 1026
  totalTokens: 6644
  processingTimeMs: 40448
tagsNormalizedAt: "2026-03-24T23:00:06.062Z"
---

## Key Takeaways

Anthropic's new Dispatch feature transforms Claude into a remote-control personal AI assistant. Key insights include: • **Remote Desktop Control**: Access your computer's full system, files, and browser from your phone via a persistent Claude session. • **Targeted Strategy**: This is part of Anthropic's focused plan to dominate knowledge work by building every layer of a personal AI assistant themselves. • **Current Limitations**: Requires Max plan, desktop must be active, no proactive notifications, and single-threaded operation with security considerations.

## Summary

Anthropic has introduced a significant new feature for Claude called **Dispatch**. This functionality allows users to connect to a persistent Claude conversation running on their desktop computer through the Claude mobile app on their phone. Once connected, users can remotely assign tasks to their computer, granting the AI agent full access to system files, installed skills, plugins, and even browser control via Claude for Chrome.

The video positions Dispatch as Anthropic's answer to the emerging concept of **OpenClaude** (or 'Claudebot')—a persistent, autonomous AI agent that acts as a personal operating system. The host notes that while Claude Co-Work was initially seen as a competitor to OpenClaude, it required users to 'babysit' the system at their computer. Dispatch solves this by enabling remote access, allowing work to continue from anywhere.

### How It Works & Setup

To use Dispatch, users must have the **Claude Max plan** and update both their desktop and mobile apps. The feature then appears as a menu option. It establishes a tunnel through Anthropic's network to access the desktop session. Key settings include a 'Keep Awake' mode to prevent the computer from sleeping and the ability to enable all browser actions.

### Use Cases & Practical Application

A primary use case demonstrated is remote file retrieval. For example, while away from your computer, you could ask the phone app to find a specific document (like a bank letter) on your desktop. Claude will request permission to access specific folders, locate the file, and send it to your phone. Beyond file management, it enables remote coding tasks and general computer control.

### Limitations and Safety Considerations

The feature has several important limitations. Your desktop must be active and awake. Claude only responds to messages and cannot proactively reach out or send notifications about task completion. All interaction occurs in a **single, continuous conversation thread**, which could lead to context window issues over time and prevents managing subtasks separately. It also does not currently work with scheduled tasks.

**Safety is a major concern.** Granting an AI agent remote control of your desktop means it can read, move, delete files, and interact with services. While access is permission-based (you must specify which folders it can use), the agent could still encounter malicious links or instructions on the web. Users are advised to be very careful with the permissions they grant.

### Strategic Context and Comparison

The host argues that Anthropic is being highly intentional, building every layer of this personal assistant ecosystem themselves rather than relying on third parties. Compared to other AI labs, their updates seem part of a cohesive strategy targeting **knowledge work**. The feature is seen as a direct move in the competitive space of autonomous agents, similar to NVIDIA's Nemo Claude, which adds policy-based security guardrails.

The video concludes that while there might be future price increases (as Anthropic may be subsidizing token costs currently), the product is well-organized and represents a significant value for Max and Pro subscribers.

## Context

This development is part of the broader race to create functional, persistent AI assistants—often called 'OpenClaude' or personal AI operating systems. Companies like Anthropic and NVIDIA are building ecosystems where AI agents can autonomously perform tasks across a user's devices. This matters to professionals, knowledge workers, and tech enthusiasts because it represents a shift from reactive AI chatbots to proactive, multi-agent systems that can manage workflows, access data, and execute commands remotely, fundamentally changing how we interact with computers and get work done.