---
metadata:
  videoId: "BNTOCHRdkdc"
  title: "Claude Code Remote Control: New Session Grayed Out? Here's the Fix"
  description: "Claude Code Remote Control just got a major upgrade — you can now start brand new sessions directly from your phone, not just pick up ones you already started at your desk.


    The problem? Anthropic didn't document how to set this up, and the button to create new sessions is grayed out for most people. In this video I show you exactly what's missing and how to fix it in under 2 minutes.


    I'll walk you through why the new session button is grayed out, the one command you need to run to unlock it, the GitHub requirement they forgot to mention, and the new remote slash command support that also shipped recently.


    ⌚ TIMESTAMPS:

    0:00 - The problem: new sessions grayed out

    0:18 - Showing the issue on iPhone

    0:32 - Why it's grayed out & requirements

    0:50 - The fix: running spawn mode

    1:06 - Starting a new session from your phone

    1:26 - Up to 32 sessions per directory

    1:48 - Ending sessions with Ctrl+C

    2:08 - Bonus: slash commands now work in remote control


    🔗 RESOURCES & LINKS:

    Boris Cherny's post → https://x.com/bcherny/status/2032578639276159438

    Remote Control Server Mode Docs → https://code.claude.com/docs/en/remote-control#server-mode

    My Remote Control Setup Video → https://www.youtube.com/watch?v=Sg74Di2Yc88&t=2s

    Book a call with me → https://yedatechs.com/#discovery-call

    Sponsorship inquiries → hi@yedatechs.com

    #ClaudeCode #RemoteControl #AIAgents #Anthropic #ClaudeCodeMobile"
  channel: "JeredBlu"
  channelId: "UCaIm6rTg-RXb6rB19fYJgTg"
  duration: "PT2M24S"
  publishedAt: "2026-03-22T19:31:05Z"
  thumbnailUrl: "https://i.ytimg.com/vi/BNTOCHRdkdc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=BNTOCHRdkdc"
processedAt: "2026-03-24T01:10:36.408Z"
source: "youtube"
tldr: "To fix the grayed-out 'New Session' button in Claude Code Remote Control, you must run the 'cloud code remote control' command from your terminal in the target project directory, which enables 'spawn mode' and allows creating up to 32 sessions from mobile devices."
tools: []
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "claude"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3277
  outputTokens: 687
  totalTokens: 3964
  processingTimeMs: 26013
tagsNormalizedAt: "2026-03-24T04:13:33.141Z"
---

## Key Takeaways

This video provides a fix for a missing feature in Claude Code Remote Control.

- The **'New Session' button is grayed out** because the remote control isn't launched in the correct mode from your computer.

- Run **'cloud code remote control' from your project's terminal** to enable **spawn mode**, unlocking new session creation.

- This feature requires a **Mac, Team, or Enterprise plan** and a **GitHub connection**, and allows up to **32 concurrent sessions** per directory.

## Summary

The video addresses a common user issue where the 'New Session' button in the Claude Code mobile app's remote control interface appears grayed out, preventing users from starting fresh coding sessions away from their computer.

Previously, remote control only allowed picking up existing sessions started on a desktop. The fix involves a simple but undocumented terminal command. You must have the base Claude Code remote control configured on your computer first.

### The Solution

Navigate to your desired project directory in a terminal and execute the command `cloud code remote control`. This launches the service in **spawn mode**, a specific configuration that signals to the mobile and web apps that new sessions can be initiated for this project.

Once running, the mobile app's interface updates: the 'New Session' button is no longer grayed out. You can then tap it to instantly launch a new Claude session connected to that specific project directory on your computer, bypassing the need to first start a session on the desktop.

### Important Details and Limitations

*   You must keep the terminal session running on your computer for this to work.

*   The feature is available on **Mac, Team, and Enterprise plans**.

*   A **GitHub account must be connected** to your Claude setup.

*   You can have **up to 32 different sessions** running in a single directory.

*   To stop all active remote sessions, simply press **Ctrl+C** in the terminal where the command is running.

The video also notes recent improvements to slash commands within remote control sessions. While autocomplete for slash commands doesn't work in the mobile app, commands like `/clear` execute successfully on the connected computer.

## Context

Claude Code's remote control feature lets developers use the powerful Claude AI assistant from their phone or tablet by connecting to their coding environment on a desktop computer. This is crucial for developers who want to brainstorm, debug, or document code while away from their primary workstation. The inability to start *new* sessions from a mobile device was a significant workflow limitation, forcing users to pre-plan sessions at their desk. This fix unlocks true mobile flexibility, aligning with broader trends in AI-assisted development and remote, on-the-go productivity.