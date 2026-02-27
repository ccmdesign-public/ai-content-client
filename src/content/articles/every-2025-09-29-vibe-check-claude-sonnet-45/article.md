---
title: "Vibe Check: Claude Sonnet 4.5"
author: "Every"
platform: "every"
publicationName: "Vibe Check"
url: "https://every.to/vibe-check/vibe-check-claude-sonnet-4-5"
publishedAt: "2025-09-29"
tags:
  - "ai"
  - "news"
  - "analysis"
---

# Vibe Check: Claude Sonnet 4.5

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

* * *

Anthropic just rolled out Claude ﻿Sonnet﻿ 4.5, and, of course, we spent the weekend using it to code and running long agentic tasks with it.

The headline: It’s noticeably faster, more steerable, and more reliable than [Opus 4.1](https://every.to/vibe-check/vibe-check-genie-3-claude-4-1-gpt-oss-and-gpt-5)—especially inside Claude Code. In head-to-head tests it blitzed through a large pull request review in minutes, handled multi-file reasoning without wandering, and stayed terse when we asked it to.

It won’t dethrone [GPT-5 Codex](https://every.to/vibe-check/gpt-5-codex-knows-when-to-think-hard-and-when-not-to) for the trickiest production bug hunts, but as a day-to-day builder’s tool, it feels like an exciting jump. Here’s our day zero vibe check.

## Speed

If you’re used to using Opus in Claude Code or the Claude app, you’ll be happy: The new Sonnet 4.5 is *really* fast. **[Kieran Klaassen](https://every.to/@kieran_1355)**, general manager of **[Cora](https://cora.computer)**, said, “It feels about 50 percent faster than previous versions of Claude.”

In a head-to-head code review challenge, it finished a comprehensive code review of a new feature in a large code base in about two minutes. GPT-5 Codex took about 10 to do the same task.

Speed is a dimension of intelligence, and Sonnet 4.5’s speed makes it much easier to pair with.

## Performance

It’s quite good at long-running agentic tasks in the Claude app and in Claude Code. I fed it the three spreadsheets we use to run Every, our profit-and-loss accounting, our weekly performance tracker, and our consulting tracker—and it easily wrote a Word doc with a third-quarter investor update that I could’ve sent with only minor tweaks.

Kieran found that it solved a bug in Cora in about 20 minutes that Opus 4.1 couldn’t crack at all. He also used it to [vibe code](https://every.to/working-overtime/it-s-me-hi-i-m-the-vibe-coder) an iOS app for Cora by feeding it the current codebase and a [book on iOS programming](https://pragprog.com/titles/jmnative/hotwire-native-for-rails-developers/):

if (typeof window.posthog !== "undefined") { window.posthog.capture("post\_truncated\_for\_logged\_out\_user", { post\_id: "3770", type: "logged\_out\_preview\_paywall\_variant", forced\_variant: false, }); }