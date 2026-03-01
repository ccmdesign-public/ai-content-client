---
metadata:
  videoId: "rtTuXAvS2yw"
  title: "Claude Code AI Agent Controls Claude Code On Twitch"
  description: "NVIDIA GTC is the premier global AI conference, where developers, researchers, and business leaders come together to explore the next wave of AI innovation.\ 


    Join it virtually with the link https://nvda.ws/45LO50F, attend at least one session and win NVIDIA DGX Spark


    DGX SPARK Giveaway Form (More info coming):

    https://docs.google.com/forms/u/6/d/1k3YnryDHjRgo0F9YjqUTO8hFSdvhRZSOrDvGrekhHIA/edit


    Claude Code AI Agent Controls Claude Code On Twitch


    Stream:

    https://www.twitch.tv/ejae_dev


    👊 Become a YouTube Member to Support Me:

    https://www.youtube.com/c/AllAboutAI/join


    For Agents:

    www.skillsmd.store


    My AI Video Course:

    https://www.theaivideocourse.com/


    🔥Open GH:

    https://github.com/AllAboutAI-YT/


    Business Inquiries:

    kbfseo@gmail.com"
  channel: "All About AI"
  channelId: "UCR9j1jqqB5Rse69wjUnbYwA"
  duration: "PT16M7S"
  publishedAt: "2026-02-28T18:56:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/rtTuXAvS2yw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=rtTuXAvS2yw"
processedAt: "2026-03-01T15:31:22.721Z"
source: "youtube"
tldr: "A developer demonstrates an AI agent that controls nested Claude Code instances in terminal multiplexers (T-max), executes viewer-suggested projects like a particle galaxy and C++ snake game, and autonomously streams the process to Twitch using FFmpeg."
tools:
  - name: "Claude Code"
    url: null
  - name: "FFmpeg"
    url: null
  - name: "Twitch"
    url: null
  - name: "Three.js"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-agent"
  - "claude-code"
  - "live-coding"
  - "twitch-integration"
  - "terminal-multiplexer"
  - "autonomous-coding"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 12131
  outputTokens: 728
  totalTokens: 12859
  processingTimeMs: 23048
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

This video showcases an advanced AI agent setup for autonomous coding and live streaming. Key insights include: • **Nested AI control** via terminal multiplexers allows a primary agent to spawn and manage multiple Claude Code instances. • **Twitch integration** enables real-time viewer interaction, where chat suggestions are parsed and queued for autonomous project execution. • **Parallel execution** is demonstrated with separate terminals for writing code, testing, and research, all while streaming via FFmpeg.

## Summary

The video presents a complex project where an AI agent running on a Mac Mini controls nested instances of Claude Code, an AI coding assistant. The core setup involves using **T-max** (a terminal multiplexer) to open multiple terminal sessions. Within these, the primary agent spawns additional Claude Code instances, creating a nested control structure. This allows the agent to manage parallel workflows—like having one terminal write code while another tests or researches algorithms.

The system is integrated with **Twitch** for live streaming and viewer interaction. A custom agent monitors the chat, parses viewer messages for project suggestions (e.g., "create a snake game in C++ with a GUI"), and adds valid requests to a JSON queue. The agent then autonomously executes these projects in the nested terminals.

For streaming, the setup uses **FFmpeg** instead of Twitch's browser-based tools. This allows for direct, programmatic control of the stream, including custom overlays, background music playlists, and visual filters (like chromatic aberration and scan lines) to create a 'hacker' aesthetic. The stream's RTMPS URL and key are configured within the FFmpeg command.

The demonstration includes live examples: building an HTML particle galaxy with 5,000 particles and a C++ snake game with a canvas-based GUI. The agent shows iterative debugging, such as fixing AI pathfinding logic (using BFS) for the snake game. Throughout, the agent maintains the stream, closes finished projects, and starts new ones from the queue, showcasing a fully autonomous, interactive coding livestream powered by AI.

## Context

This project represents the cutting edge of **agentic AI** and human-AI collaboration in software development. It matters to developers, AI researchers, and live streamers exploring how AI can autonomously handle complex, multi-step tasks while engaging a live audience. It connects to broader trends in AI-powered development tools, interactive live coding, and the automation of creative and technical workflows, pushing the boundaries of what autonomous agents can achieve in real-time, public-facing environments.