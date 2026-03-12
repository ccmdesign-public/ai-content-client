---
metadata:
  videoId: "oa-TaqaBnSE"
  title: "How I am using Claude cowork"
  description: "In todays video we are diving into Claude cowork and how I use it. I am no expert but I wanted to show you just how I use the app to get more done.


    My links

    My newsletter: https://www.mindfullyproductive101.com/


    Want to support my work: https://buymeacoffee.com/danielpourasg


    My personal website: https://danielpourasg.com/


    Join my discord channel: https://discord.gg/tbYuCKks9f


    Check out my podcast: https://open.spotify.com/show/6oYAkyXTN5ISfG1vrWj17A


    Check out my substack: https://danielpourasgharian.substack.com/subscribe


    X:https://x.com/danielpasg?s=21&t=RE_1yTx7g_JRNa8L9k9q9A


    Instagram:https://www.instagram.com/danielpourasg/


    Bluesky: https://bsky.app/profile/danielpourasg.com


    Threads:https://www.threads.net/@danielpourasg?xmt=AQGzLWAhXHzYnAui3nvOqF_LIL_f_0o7o7LF7kNbUg3uW6U


    Linkedin: https://www.linkedin.com/in/daniel-pour-asgharian-196960195/


    Building in public: https://dpa.voicenotes.com/


    0:00 - intro

    01:03 - social media scheduling

    07:00 - Project overview"
  channel: "DPA"
  channelId: "UCAFlCmAJU5IxfEwYEaiCFHA"
  duration: "PT11M54S"
  publishedAt: "2026-03-09T16:01:17Z"
  thumbnailUrl: "https://i.ytimg.com/vi/oa-TaqaBnSE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=oa-TaqaBnSE"
processedAt: "2026-03-11T15:40:01.652Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "The creator uses Claude cowork with MCP connectors to automate weekly social media scheduling from Linear to Typefully and to manage personal projects via a markdown file, saving significant time while noting token usage concerns."
tools:
  - name: "Claude cowork"
    url: null
  - name: "Linear"
    url: null
  - name: "Typefully"
    url: null
  - name: "MCP (Model Context Protocol)"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "claude"
  - "content-creation"
  - "mcp"
  - "productivity"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7562
  outputTokens: 786
  totalTokens: 8348
  processingTimeMs: 63716
tagsNormalizedAt: "2026-03-12T16:12:16.703Z"
---

## Key Takeaways

This video demonstrates two practical, time-saving workflows using Claude cowork's agent-like capabilities.

## Summary

The video's creator, while not an expert, shares two primary ways they use Claude cowork to automate tasks they would otherwise neglect.

### Social Media Scheduling Automation

The first workflow automates social media post scheduling. Throughout the week, the creator adds post ideas as issues in **Linear**, tagging them (e.g., with 'X'). Once a week, they run a Claude cowork prompt that uses two **MCP (Model Context Protocol) connectors**: one for Linear and one for **Typefully**.

The agent performs a multi-step process:

*   Finds all non-done Linear issues tagged for social media.

*   Fixes grammar in the post descriptions.

*   Schedules the posts in Typefully for the upcoming week.

*   Correctly handles @mentions within the posts.

The creator emphasizes they can start this task and then work on something else, allowing the AI to handle the tedious work. They note the output is very good but sometimes requires minor manual tweaks, which they expect to reduce as they refine their prompts.

### Personal Project Management

The second use case is for personal project oversight. The creator maintains a **markdown file** that lists all active projects, 'always-on' streams, and deadlines. They use Claude cowork to interact with this file conversationally.

For example, they can tell Claude a project is finished, and it will:

*   Update the markdown file, moving the project from 'active' to 'archive'.

*   Adjust project counts and deadline notes.

*   Offer to mark corresponding tasks as done in Linear (if connected).
This acts as a simple, AI-powered project dashboard that helps prevent burnout by providing visibility into workload.

### Important Considerations

Two critical practical points are highlighted:

*   **Token Usage:** Using MCP connectors and large context files can consume many tokens. The creator monitors usage limits, noting that their weekly social media scheduling task used only 2% of their weekly limit, while a session used 30% of a shorter-term limit.

*   **Realistic Expectations:** The creator is a believer in AI but cautions against overhyping current tools. They view Claude cowork as a significant step toward making AI genuinely useful for productivity by automating tasks the user wouldn't do otherwise, freeing up time for more valuable work.

## Context

Claude cowork represents a shift from simple AI chatbots to persistent, agent-like assistants that can perform multi-step tasks using external tools via MCP connectors. This matters for professionals, creators, and anyone looking to automate repetitive digital workflows. It connects to the broader trend of AI moving beyond conversation into actionable automation, though practical considerations like cost (token usage) and the need for human oversight remain crucial.