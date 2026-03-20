---
metadata:
  videoId: "ZbKNpn0woDY"
  title: "Claude Code's New Upgrade: /btw"
  description: "🔥 Join Maker School & get customer #1 guaranteed: https://skool.com/makerschool/about

    📚 Watch my NEW 2026 Claude Code course: https://www.youtube.com/watch?v=QoQBzR1NIqI

    🎙️ Listen to my silly podcast: www.youtube.com/@stackedpod


    📚 Free multi-hour courses

    → Claude Code (4hr full course): https://www.youtube.com/watch?v=QoQBzR1NIqI

    → Vibe Coding w/ Antigravity (6hr full course): https://www.youtube.com/watch?v=gcuR_-rzlDw

    → Agentic Workflows (6hr full course): https://www.youtube.com/watch?v=MxyRjL7NG18

    → N8N (6hr full course, 890K+ views): https://www.youtube.com/watch?v=2GZ2SNXWK-c


    Summary ⤵️

    Claude Code just got /btw, a new feature that eliminates a massive amount of parallelization waste and keeps you on-task in the same thread. Also a big game-changer in terms of your ability to steer outputs.


    My software, tools, & deals (some give me kickbacks—thank you!)

    🚀 Instantly: https://link.nicksaraev.com/instantly-short

    📧 Anymailfinder: https://link.nicksaraev.com/amf-short

    🤖 Apify: https://console.apify.com/sign-up (30% off with code 30NICKSARAEV)

    🧑🏽‍💻 n8n: https://n8n.partnerlinks.io/h372ujv8cw80

    📈 Rize: https://link.nicksaraev.com/rize-short (25% off with promo code NICK)


    Follow me on other platforms 😈

    📸 Instagram: https://www.instagram.com/nick_saraev

    🕊️ Twitter/X: https://twitter.com/nicksaraev

    🤙 Blog: https://nicksaraev.com


    Why watch?

    If this is your first view—hi, I’m Nick! TLDR: I spent six years building automated businesses with Make.com (most notably 1SecondCopy, a content company that hit 7 figures). Today a lot of people talk about automation, but I’ve noticed that very few have practical, real world success making money with it. So this channel is me chiming in and showing you what *real* systems that make *real* revenue look like.


    Hopefully I can help you improve your business, and in doing so, the rest of your life 🙏


    Like, subscribe, and leave me a comment if you have a specific request! Thanks.


    Chapters

    00:00 Introduction to /btw

    01:30 How /btw Works

    03:22 Benefits of Unified Context

    04:54 Implementing /btw

    06:05 Getting Started with /btw

    07:24 Conclusion and Next Steps"
  channel: "Nick Saraev"
  channelId: "UCbo-KbSjJDG6JWQ_MTZ_rNA"
  duration: "PT5M11S"
  publishedAt: "2026-03-11T19:51:12Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ZbKNpn0woDY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ZbKNpn0woDY"
processedAt: "2026-03-12T15:36:32.013Z"
source: "youtube"
tldr: "Anthropic's new /btw command for Claude Code lets you ask side questions and give instructions without interrupting the main conversation thread, saving significant token costs by avoiding duplicate context loading and enabling parallel workflows."
tools:
  - name: "Claude Code"
    url: null
  - name: "Visual Studio Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "claude"
  - "productivity"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5186
  outputTokens: 746
  totalTokens: 5932
  processingTimeMs: 26294
tagsNormalizedAt: "2026-03-12T16:16:10.090Z"
---

## Key Takeaways

Claude Code's /btw feature is a game-changer for efficient AI-assisted coding workflows.

* **Massive token savings** – Avoids the 10k-20k token cost of opening new conversation threads for related questions.

* **Parallel conversation flow** – Enables side questions and instructions without interrupting the main task execution.

* **Unified context management** – Maintains all related work in one thread, improving response quality and reducing context switching.

## Summary

Anthropic has introduced a powerful new feature called **/btw** for Claude Code that fundamentally changes how developers interact with the AI assistant during complex tasks. Previously, asking a follow-up question about an ongoing task required opening an entirely new Claude Code session, which consumed 10,000-20,000 tokens just to reload the context. This was both expensive and disruptive to workflow.

With **/btw**, users can now type `/btw` followed by their question or instruction in the same terminal window while Claude is actively working on a main task. This opens a **side panel conversation** that runs parallel to the primary task without interrupting it. For example, if Claude is scraping 10,000 leads for a spreadsheet, you could type `/btw I meant CSV format instead` or `/btw explain how this scraping skill works` without pausing the main operation.

### How It Works Technically

* **Activation**: Type `/btw` followed immediately by your message (not pressing enter first)
* **Interface**: Opens a yellow-highlighted side panel within the same terminal window

* **Navigation**: Press space, enter, or escape to dismiss the side panel and return to main thread

* **Current limitation**: Only available in terminal version of Claude Code as of recording

### Setup Requirements

* Ensure Claude Code extension is updated to version 2.1.73 or later

* Enable "Use Terminal" in settings to access the feature

* May require uninstalling/reinstalling if update doesn't appear

* Terminal version gets new features first before GUI implementation

This feature enables **true parallelization** within a single context window, allowing developers to ask clarification questions, request format changes, or seek explanations about ongoing processes without the cognitive overhead of managing multiple instances. The result is faster iteration, lower costs, and more natural conversational flow with the AI assistant.

## Context

This feature addresses a critical pain point in AI-assisted development workflows where context management and token costs significantly impact productivity. Developers using Claude Code for complex tasks like web scraping, data processing, or code debugging often need to ask clarifying questions mid-task, but previously had to choose between interrupting progress or paying substantial token costs for duplicate context. The /btw feature represents a major step toward more natural, efficient human-AI collaboration by enabling conversational multitasking within shared context. This matters for anyone using AI coding assistants professionally, as it directly impacts both workflow efficiency and operational costs.