---
metadata:
  videoId: "gPDJtfpm4V4"
  title: "Emulate.dev - Replace API's With a Local Clone"
  description: "Emulate: https://emulate.dev

    Inbox Zero: https://getinboxzero.com


    UPDATE: they merged in my PR. Emulate now supports Gmail, Goole Calendar, and Google Drive APIs!


    I set up Emulate Dev to replace Google's API with a local clone for Inbox Zero. It runs a fully stateful, high-fidelity emulator on localhost; no network, no rate limits, no OAuth headaches. I demo the full setup from config to a working Google login against the fake server.


    00:00 What Is Emulate.dev?

    00:45 Why Local API Emulation Matters

    02:30 Setting Up Google OAuth Locally

    05:32 Live Login Demo

    06:17 Limits and Next Steps


    1️⃣ Emulate Dev creates local drop-in replacements for Google & GitHub APIs

    2️⃣ Fully stateful with an in-memory database — no external dependencies

    3️⃣ Routes API calls to localhost ports instead of real endpoints

    4️⃣ Google OAuth login works against the emulated server

    5️⃣ Gmail API coverage is limited — plan to expand or contribute upstream


    ===================

    My open source product, Inbox Zero:

    Inbox Zero organizes your inbox, drafts replies in your voice, and helps you reach inbox zero fast. Never miss an important email again.

    https://getinboxzero.com

    GitHub: https://github.com/elie222/inbox-zero ⭐

    ===================


    Follow me on X: https://x.com/elie2222

    Join the Newsletter: https://aiopensource.substack.com/


    #emulatedev #googleapi #aicoding #devtools #testing #cicd #oauth #mockapi"
  channel: "Elie Steinbock"
  channelId: "UCp48vy_SNmQ0rrqfArxnRLw"
  duration: "PT6M55S"
  publishedAt: "2026-03-26T16:15:08Z"
  thumbnailUrl: "https://i.ytimg.com/vi/gPDJtfpm4V4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=gPDJtfpm4V4"
processedAt: "2026-03-26T20:24:27.877Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Emulate.dev is a local API emulation tool that creates stateful clones of services like Vercel, GitHub, and Google APIs for testing without network dependencies, demonstrated by setting up a Google API mock that successfully handles OAuth login."
tools:
  - name: "Emulate.dev"
    url: null
  - name: "Vercel"
    url: null
  - name: "GitHub"
    url: null
  - name: "Google API"
    url: null
  - name: "Inbox Zero"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Security"
  - "Tools & Productivity"
  - "Web Development"
tags:
  - "api-design"
  - "authentication"
  - "ci-cd"
  - "testing"
  - "web-development"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6150
  outputTokens: 640
  totalTokens: 6790
  processingTimeMs: 23117
tagsNormalizedAt: "2026-03-26T21:33:01.159Z"
---

## Key Takeaways

This video demonstrates how Emulate.dev provides local API emulation for testing without external dependencies. Key insights include:

- **Local API emulation** replaces real services with stateful clones for isolated testing

- **No network requirements** enable testing in CI/CD pipelines and offline environments

- **Production fidelity** maintains realistic behavior unlike simple mocks

- **Plugin architecture** allows extending functionality for specific API needs

## Summary

The video demonstrates Emulate.dev, a tool that creates local clones of popular APIs like Vercel, GitHub, and Google services for testing purposes. The presenter sets up Emulate.dev to emulate the Google API for their Inbox Zero project, showing how it creates a fake server running on localhost that intercepts API calls.

The tool uses a **plugin-based architecture** with an in-memory database, making it lightweight and suitable for CI/CD environments. By running `npx emulate` with specific service configurations, developers can create local clones that handle authentication, rate limiting, and other API behaviors without hitting real service limits.

The demonstration shows successful **OAuth emulation** where the login flow redirects to the local emulated Google login screen instead of the real Google service. The presenter logs in using a test user (`developer@example.com`) and confirms the application works correctly with the emulated API.

While the current implementation supports basic endpoints, the presenter notes that full Gmail API support would require additional development. The video concludes by showing how environment variables can be configured to route API calls to either real services or local emulations based on the testing context.

## Context

Testing applications that integrate with third-party APIs presents significant challenges due to rate limits, authentication requirements, and network dependencies. Emulate.dev addresses these issues by providing production-fidelity API emulation that works offline, making it particularly valuable for CI/CD pipelines and development environments where consistent, fast testing is essential. This tool is especially relevant for teams building applications that depend on multiple external services and need reliable testing strategies.