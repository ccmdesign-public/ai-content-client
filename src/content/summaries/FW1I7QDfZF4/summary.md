---
metadata:
  videoId: "FW1I7QDfZF4"
  title: "Stop Making Mockups  Start Making PRs"
  description: "Brian explains why static mockups and specs are obsolete compared to generating \"Claude Code prototypes\" directly in Slack that run on the actual codebase.


    👇 **Your Builder Briefing (free)**

    https://buildermethods.com - Your free, 5-minute read to keep up with the latest tools & workflows for building with AI.


    👇 **Use Agent OS** (free open source):

    https://buildermethods.com/agent-os


    👇 **Use Design OS** (free open source):

    https://buildermethods.com/design-os


    👇 **Join Builder Methods Pro**

    https://buildermethods.com/pro - The membership for professionals (and soon-to-be-pros) for building with AI.  Private discord.  Video training library.  Official support for Agent OS.


    ▶️ Related videos:


    💬 Drop a comment with your questions and requests for upcoming videos!


    Chapters:"
  channel: "Brian Casel"
  channelId: "UCSxPE9PHHxQUEt6ajGmQyMA"
  duration: "PT1M18S"
  publishedAt: "2026-02-26T15:00:26Z"
  thumbnailUrl: "https://i.ytimg.com/vi/FW1I7QDfZF4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=FW1I7QDfZF4"
processedAt: "2026-02-26T23:55:53.595Z"
source: "youtube"
tldr: "The Anthropic team accelerates feature development by using Claude to generate actual pull request prototypes against their production codebase instead of creating static mockups, PRDs, or isolated prototypes, enabling teams to react to working software in context."
tools:
  - name: "Figma"
    url: null
  - name: "Slack"
    url: null
  - name: "Claude"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
tags:
  - "ai-coding"
  - "prototyping"
  - "product-development"
  - "claude"
  - "pull-requests"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2003
  outputTokens: 707
  totalTokens: 2710
  processingTimeMs: 73316
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

The core message is to replace abstract planning documents with concrete, executable prototypes. • **Skip abstract artifacts** like PRDs, specs, and Figma mockups that are open to interpretation and don't show real behavior. • **Generate real PRs with AI**: When someone has a feature idea, they tag Claude in Slack to request a first-pass pull request built against the production codebase. • **React to working code**: Teams can pull down, run, and evaluate the prototype using real components and patterns, dramatically speeding up feedback and iteration.

## Summary

Traditional feature development often starts with abstract planning artifacts—meetings, Product Requirements Documents (PRDs), specifications, or Figma mockups. Sometimes a product manager might create a quick, isolated "vibe-coded" prototype. The fundamental problem with all these approaches is that **none of it is real**. A mockup cannot demonstrate actual behavior, a PRD is open to interpretation, and a disconnected prototype bears little functional or visual resemblance to the live product, as it's built in isolation from the actual codebase, design system, and architecture.

The team at Anthropic employs a radically different, more efficient method. When a team member has a feature idea, they bypass all the preliminary documentation. Instead, they **tag Claude directly in Slack** and ask it to create a **first-pass prototype**. Crucially, this isn't a throwaway demo or a sketch in a sandbox environment. Claude generates an **actual pull request (PR)** built directly against their **production codebase**.

This approach yields a prototype composed of **real code** that uses the team's **real components** and follows their **real development patterns**. While the product team may not ship this initial PR as-is, it provides a tangible, working foundation. It is **dramatically more productive** for engineers and product managers to **react to a working version** in the actual application context than to interpret abstract documents or static images. They can pull down the branch, run the code, and see exactly how the feature behaves. This concrete starting point provides immediate clarity, allowing the team to iterate properly or rebuild with a precise understanding of the desired outcome.

## Context

This matters because it addresses a chronic inefficiency in software product development: the translation gap between idea and implementation. Abstract plans and mockups create misalignment and rework. Product managers, engineers, and designers in tech companies should care, as this method leverages modern AI coding assistants to bridge that gap, creating a shared, executable source of truth early in the process. It connects to broader trends in AI-augmented development and shifting left on prototyping to accelerate feedback cycles and reduce wasted effort.