---
metadata:
  videoId: "PkeC2hNQ9Zw"
  title: "How I Made Claude Code WAY Better With Vercel Agent Skills"
  description: "The AI development landscape just got turned upside down. Vercel's new Agent Skills ecosystem is fundamentally changing how we work with Claude Code and other coding agents. The skills CLI tool let's you install skills with a single command, and the skills.sh marketplace let's you discover skills. But Cloudflare just dropped a competing RFC proposing (Agent Skills Discovery via Well-Known URIs) a completely different approach using .well-known URIs that could make Vercel's entire centralized directory model obsolete.


    🔗 Relevant Links

    Cloudflare proposal - https://github.com/cloudflare/agent-skills-discovery-rfc?tab=readme-ov-file

    Vercel skills - https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem

    Intro frontend design by shades 2134 - https://www.reddit.com/user/shades2134/

    Remotion example from Magnus - https://x.com/mamagnus00/status/2014459283560358034


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack


    📌 Chapters:

    0:00 Intro

    0:26 Agent Skills Recap

    2:05 Vercel's add-skill project

    2:58 Skills.sh for skill discovery

    4:00 Cloudflare's Proposal

    4:21 How Cloudflare's Proposal Works

    5:11 Problems with the proposal"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT6M27S"
  publishedAt: "2026-01-24T10:00:39Z"
  thumbnailUrl: "https://i.ytimg.com/vi/PkeC2hNQ9Zw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=PkeC2hNQ9Zw"
processedAt: "2026-01-24T16:10:07.750Z"
source: "youtube"
tldr: "Vercel's 'add skill' tool simplifies installing agent skills for AI agents like Claude by cloning repos and auto-detecting configs, but Cloudflare's proposal for skill discovery via JSON files could challenge this approach."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1804
  outputTokens: 2709
  totalTokens: 4513
  processingTimeMs: 48710
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tools:
  - name: "Claude Code"
    url: null
  - name: "Vercel Skills"
    url: "https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem"
  - name: "add-skill"
    url: null
  - name: "skills.sh"
    url: null
  - name: "Cloudflare Agent Skills Discovery"
    url: "https://github.com/cloudflare/agent-skills-discovery-rfc?tab=readme-ov-file"
  - name: "Remotion"
    url: null
  - name: "Better Stack"
    url: "https://betterstack.com/"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - claude
  - ai-coding
  - agents
  - vercel
  - automation
  - workflow
---

## Key Takeaways

Agent skills significantly boost AI agent capabilities, with Vercel's tool easing installation and Cloudflare proposing a new discovery method.

- **Agent skills** use **skills.md** files with YAML front matter and instructions, enabling **progressive disclosure** for efficient context loading.

- Vercel's **add skill** command clones repos, checks for skills.md, auto-detects installed agents, and creates symlinks, with telemetry for skill discovery on **skills.sh**.

- Cloudflare's proposal requires a **well-known URL** with an index.json file for skill listing, adding steps but offering automatic discovery, potentially impacting smaller developers.

## Summary

**Agent skills** were introduced by Anthropic to enhance Claude's capabilities on specific tasks. They work by adding a **skills.md** file in a designated directory, containing YAML front matter with name and description, followed by instructions that load into the model's context. This uses **progressive disclosure**, where only front matter is loaded initially, and more details are added if a skill is deemed relevant.

Vercel developed the **add skill** tool to simplify installing skills across multiple agents. Running `npx add skill` followed by the skill name or repo URL clones the repository, checks for a skills.md file, and if found, auto-detects installed agents by scanning configs. It then creates symlinks from the agent's skills directory to the repo location. This tool includes **telemetry** that anonymously tracks skill usage, populating **skills.sh**, a directory for discovering skills based on downloads and trends.

Cloudflare has proposed an alternative method for skill discovery. Their approach involves fetching a **lightweight JSON file** from a well-known URL that lists available skills. When an agent receives a prompt, it checks this index.json, identifies relevant skills, and retrieves associated files, caching them for future use. This adds steps like maintaining the JSON file and setting up the URL, which might be cumbersome for smaller developers compared to Vercel's Git

Hub-based system.

The video discusses the potential impact: Cloudflare's proposal could make Vercel's skills.sh obsolete if adopted, but there might be room for coexistence. Vercel's platform benefits indie developers with easy discovery, while Cloudflare's method could suit large companies. Regardless, as developers use these skills for projects, tools like **Better Stack** for error tracking and status pages become essential.

## Context

Agent skills are transforming how AI agents like Claude are extended for specialized tasks, making them more powerful and versatile. This matters because it represents a key advancement in AI tooling, where seamless integration and discovery of capabilities can significantly boost developer productivity. Developers, AI researchers, and companies leveraging AI agents should pay attention as it influences how skills are shared, standardized, and accessed in the growing ecosystem of AI-assisted development.