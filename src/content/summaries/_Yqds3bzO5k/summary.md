---
metadata:
  videoId: "_Yqds3bzO5k"
  title: "Claude Code on Mobile: The Complete Guide"
  description: "You can build from anywhere with Claude Code — your couch, a coffee shop, on a train. But most people have only seen one piece of the mobile story. In this video, I walk through every scenario for using Claude Code from your phone: continuing a desktop session on mobile with remote control, spawning new sessions from the cloud, creating a brand new GitHub repo and starting a project from scratch, and a full power-user setup that gives you complete remote access to your machine from anywhere.


    Each workflow has different tradeoffs, and I demo all four so you can see exactly how they work and when to reach for each one. Whether you just want to keep building on your commute or you need full access to your Skills and local files from the other side of the world, this video has you covered.


    👇 **Your Builder Briefing (free)**

    https://buildermethods.com - Your free, 5-minute read to keep up with the latest tools & workflows for building with AI.


    👇 **Join Builder Methods Pro**

    https://buildermethods.com/pro - The membership for pros building with AI.  Courses.  Workshops.  Private community.  Video training library.


    👇 **Try my tools** (free open source):

    https://buildermethods.com/agent-os

    https://buildermethods.com/design-os


    ▶️ Related videos:

    Claude Code: 3 Sleeper Features https://youtu.be/A_ZebzPOY1k

    Claude Code is all you need in 2026 https://youtu.be/0hdFJA-ho3c


    💬 Drop a comment with your questions and requests for upcoming videos!


    Chapters:


    0:00 Intro

    1:47 Hand-off with remote control

    5:08 New session from mobile

    7:34 Claude Code in server mode

    10:23 New project repo from mobile

    13:39 Remote access your machine"
  channel: "Brian Casel"
  channelId: "UCSxPE9PHHxQUEt6ajGmQyMA"
  duration: "PT20M56S"
  publishedAt: "2026-03-26T12:01:05Z"
  thumbnailUrl: "https://i.ytimg.com/vi/_Yqds3bzO5k/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=_Yqds3bzO5k"
processedAt: "2026-03-26T20:34:11.596Z"
source: "youtube"
tldr: "Claude Code enables full mobile development workflows: remote control for existing sessions, cloud sessions for new tasks, server mode for local access, and a power setup using Tailscale/Termius for ultimate flexibility."
tools:
  - name: "Claude Code"
    url: null
  - name: "GitHub"
    url: null
  - name: "Termius"
    url: null
  - name: "Tailscale"
    url: null
  - name: "Tmux"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-coding"
  - "claude"
  - "open-source"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 16274
  outputTokens: 775
  totalTokens: 17049
  processingTimeMs: 21966
tagsNormalizedAt: "2026-03-26T21:33:03.064Z"
---

## Key Takeaways

Claude Code now supports comprehensive mobile coding workflows, allowing developers to build from anywhere.

## Summary

The video provides a complete guide to using Claude Code for development on mobile devices, covering four distinct workflows that enable coding from anywhere.

### Quick Handoff via Remote Control

This is the simplest scenario for continuing work. Start a **Claude Code** session on your desktop, then run the **remote control** command before leaving. This allows you to monitor and continue the session from the Claude mobile app on iOS or Android. The session stays in sync between devices. You can configure remote control to be **always on** for all new sessions via the `claude config` settings.

### Starting New Sessions in the Cloud

When you're away from your desk and want to start a new task, you can use **Claude Code on the web**. From the Claude mobile app's Code section, hit the plus icon to start a new session. This spins up a cloud-based session that clones your GitHub repository and works entirely in the cloud. This is the path of least friction for quick tasks on the go. When finished, Claude automatically creates a Pull Request (PR) which you can view and merge directly from the GitHub mobile app.

### Server Mode for Local Machine Access

**Server mode** (another part of remote control) allows you to start a new session from mobile but have it run on your local machine. This gives Claude access to your local files, configurations, and installed **skills**. To use this, you must prepare your desktop by running `claude remote control` in the terminal for the specific project before leaving. This mode is more capable but requires pre-setup.

### Power User Setup for Ultimate Access

This setup bypasses the limitations of the previous methods, allowing you to connect to any project on your home machine from mobile, even if you didn't pre-setup server mode. It requires three components:

*   **Termius** (or similar terminal app): Lets you remotely SSH into your desktop machine from your phone.

*   **Tailscale**: Creates a secure virtual network so your phone can always reach your home machine from anywhere.

*   **Tmux** (optional): Keeps terminal sessions alive if your mobile connection drops.

With this setup, you can use Termius to SSH into your desktop, navigate to any project directory, and run `claude remote control` to activate server mode. Then, jump back to the Claude app to connect and work on that project with full local access.

## Context

This matters because AI-powered coding tools like Claude Code are fundamentally changing developer workflows, enabling productivity outside traditional desk-bound environments. Builders, startup founders, and anyone who wants to act on ideas immediately should care about this. It connects to broader trends in mobile-first development and the democratization of building software with AI assistance.