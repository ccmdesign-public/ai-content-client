---
metadata:
  videoId: "9iUd2Ik-bBI"
  title: "My new app is really stupid (I wrote none of the code)"
  description: "So I made a new thing...


    Thank you Blacksmith for sponsoring! Check them out at: https://soydev.link/blacksmith


    Enjoy: https://quipslop.com/

    Check out the 24/7 twitch stream: https://www.twitch.tv/quipslop


    Also go checkout t3 chat: https://t3.chat/settings/subscription?discount=LAUNCHWEEK


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT12M16S"
  publishedAt: "2026-02-25T11:17:04Z"
  thumbnailUrl: "https://i.ytimg.com/vi/9iUd2Ik-bBI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=9iUd2Ik-bBI"
processedAt: "2026-03-10T15:16:30.084Z"
source: "youtube"
tldr: "Theo built Quip Slop, an AI-powered comedy game inspired by Quiplash where multiple LLMs compete to generate and vote on funny responses, then live-streamed the chaotic development process including CLI creation, web UI integration, and Twitch streaming via FFmpeg and canvas capture."
tools:
  - name: "Bun"
    url: null
  - name: "Railway"
    url: null
  - name: "FFmpeg"
    url: null
  - name: "Puppeteer"
    url: null
  - name: "Chromium"
    url: null
  - name: "OpenRouter"
    url: null
  - name: "Blacksmith"
    url: "https://soyv.link/blsmith"
  - name: "Twitch"
    url: null
  - name: "T3 Chat"
    url: null
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "Web Development"
tags:
  - "ai-general"
  - "chatgpt"
  - "llm"
  - "nodejs"
  - "prompt-engineering"
  - "startup"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 11287
  outputTokens: 1206
  totalTokens: 12493
  processingTimeMs: 58249
tagsNormalizedAt: "2026-03-10T16:48:05.454Z"
---

## Key Takeaways

The video details the chaotic yet successful creation of an AI comedy game and its technical implementation.

*   **AI comedy competition**: Quip Slop is a game where one LLM generates prompts and others compete to give the funniest response, with models and viewers voting to determine a winner.

*   **Overcoming LLM limitations**: To fix repetitive prompts, Theo dynamically shuffled 870+ example prompts into unique 60-80 prompt system contexts for each run, significantly improving output variety.

*   **Complex live-streaming pipeline**: The project streams to Twitch by rendering a pixel-perfect canvas in a headless browser (via Puppeteer), capturing the canvas stream with MediaRecorder, and piping it to Twitch via a custom FFmpeg command.

*   **Rapid community engagement & scaling issues**: The project immediately gained traction with thousands of Twitch viewers and many GitHub PRs/issues, but also faced DDoS attacks and accidental environment variable leaks.

## Summary

Theo introduces Quip Slop, a side project he's been 'vibe coding'—an AI-powered game designed to determine which large language model is the funniest. The game is directly inspired by Quiplash from Jackbox Games, but with AI agents as the players.

### Game Mechanics & AI Implementation

The core gameplay loop involves one LLM generating a humorous fill-in-the-blank or question prompt. Two other, randomly selected models then compete to provide the funniest response to that prompt. After the responses are generated, *all* the other models (and live Twitch viewers) vote on the winner. The winning model gets a point and is ranked on a leaderboard. Theo spent significant effort crafting and iterating on the **system prompts** for both prompt generation and response phases to ensure creativity, conciseness, and adherence to the game's format.

A major initial challenge was the lack of variety in the AI-generated prompts. Providing a static set of example prompts led to repetitive outputs (e.g., multiple prompts about grandmas or funeral homes). Theo's clever solution was to compile a massive list of over 870 example prompts, then for each game round, **randomly shuffle and select 60-80 of them** to form a unique system prompt context. This simple but effective technique dramatically increased the diversity and quality of the prompts.

### Technical Development Journey

Theo started development with a **CLI application** to validate the core game logic and AI interactions before dealing with the complexity of a user interface. Once the CLI was reliable, he built a web UI with a WebSocket server (hosted on Railway using Bun) to handle real-time voting and game state.

The most complex technical hurdle was creating a **live Twitch stream** of the game. Since you cannot simply send a webpage to Twitch, Theo engineered a custom streaming pipeline:

*   A headless Chromium instance (via Puppeteer) loads the game's canvas-based UI.

*   JavaScript in the browser uses `canvas.captureStream()` and the **MediaRecorder API** to capture video data from the canvas.

*   This video stream is sent via a WebSocket to a Node.js process.

*   A custom **FFmpeg** command receives the stream and broadcasts it directly to Twitch. Theo used a 'dry run' mode with `ffplay` to visually debug the stream locally.

### Launch Chaos & Community Response

The launch was met with immediate and overwhelming scale. The Twitch stream attracted over 10,000 concurrent viewers (including fake users from a 'dodo' attack) and the project's GitHub repository was flooded with **19 PRs and 11 issues** within a very short timeframe. The rapid scaling also exposed vulnerabilities, including accidental **environment variable leaks** (like a Twitch stream key) due to the nature of the 'vibe coded' project structure. Despite the chaos, the core system held up, demonstrating the viability of the concept and the technical implementation.

## Context

This project sits at the intersection of AI experimentation, developer tooling, and live-streamed content creation. It demonstrates how modern developers can rapidly prototype and deploy complex, multi-faceted applications that combine AI APIs, real-time web technologies, and media streaming. The immediate community engagement and scaling challenges provide a real-world case study in launching an AI-native application to a large audience. It's relevant for developers interested in generative AI applications, real-time systems, and the practical realities of going from a 'vibe coded' idea to a live product.