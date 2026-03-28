---
metadata:
  videoId: "D_F8wXk0DUM"
  title: "Sora is Dead. OpenAI and the Future of AI Slop"
  description: "OpenAI kills Sora, Linear declares issue tracking dead, and the war on AI slop heats up 🔵


    This week: OpenAI scraps its Sora video platform months after launch — the iOS app, the web experience, and the developer API are all going. We dig into what actually went wrong (the unit economics were broken from day one), what it means for developers who built on top of it, and whether the superapp replacing it is a smarter bet.


    Plus: Linear's CEO declares the end of issue tracking as we know it, Meta releases a brain-scan-trained model that could transform how we test product experiences, and Wikipedia, Reddit and Spotify are all fighting back against AI slop.


    📬 Get the newsletter on Substack https://departmentofproduct.substack.com

    ➡️Follow me on Substack Notes: https://substack.com/@richholmes\ 


    🔗 Links from this episode

    Sora

    WSJ exclusive — https://www.wsj.com/tech/ai/openai-set-to-discontinue-sora-video-platform-app-a82a9e4e

    Bloomberg — https://www.bloomberg.com/news/articles/2026-03-24/openai-plans-to-discontinue-support-for-sora-ai-video-generator

    Linear & agent-first development

    Linear's vision for what comes next — https://linear.app/next

    Introducing Linear Agent — https://linear.app/changelog/2026-03-24-introducing-linear-agent

    Coinbase — the hidden tax of asking questions — https://linear.app/customers/coinbase#the-hidden-tax-of-asking-questions

    Meta TRIBE v2

    Research paper — https://ai.meta.com/research/publications/a-foundation-model-of-vision-audition-and-language-for-in-silico-neuroscience/

    Interactive demo — https://aidemos.atmeta.com/tribev2/

    The war on AI slop

    Reddit's human verification initiative — https://www.reddit.com/user/spez/comments/1s3ezrc/humans_welcome_bots_must_wear_name_tags/

    Spotify testing anti-AI-slop tool — https://techcrunch.com/2026/03/24/spotify-tests-new-tool-to-stop-ai-slop-from-being-attributed-to-real-artists/

    Data & trends

    Cisco replacing SaaS with AI agents — https://www.wsj.com/tech/ai/companies-arent-ripping-out-business-software-for-ai-heres-what-theyre-doing-instead-793c3a37


    00:00 Sora is no more

    04:26 War on AI Slop

    05:14 Linear Kills Issue Tracking

    09:23 Trends

    10:57 Closing Thoughts"
  channel: "Department of Product"
  channelId: "UCqGW5G0XWic_KSEH9IcVHAQ"
  duration: "PT11M4S"
  publishedAt: "2026-03-27T21:29:48Z"
  thumbnailUrl: "https://i.ytimg.com/vi/D_F8wXk0DUM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=D_F8wXk0DUM"
processedAt: "2026-03-28T17:02:20.362Z"
source: "youtube"
tldr: "OpenAI shut down its AI video platform Sora after just months due to unsustainable unit economics, with downloads falling 66% and compute costs reaching $15M/day, highlighting a broader 'war on AI slop' where platforms are prioritizing human authenticity."
tools:
  - name: "Sora"
    url: null
  - name: "Runway Gen 4"
    url: null
  - name: "Google Vio"
    url: null
  - name: "ChatGPT"
    url: null
  - name: "Claude"
    url: null
  - name: "Gemini"
    url: null
  - name: "Linear"
    url: null
  - name: "Cursor"
    url: null
  - name: "Figma"
    url: null
  - name: "DataDog"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
tags:
  - "agents"
  - "chatgpt"
  - "user-research"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8745
  outputTokens: 1080
  totalTokens: 9825
  processingTimeMs: 34220
tagsNormalizedAt: "2026-03-28T18:08:27.361Z"
---

## Key Takeaways

This video analyzes the failure of OpenAI's Sora video platform and broader AI industry trends. Key insights include:

• **Sora's failure stemmed from broken unit economics**: Flat $200/month subscriptions couldn't cover high video generation compute costs, leading to daily burns of $10-15M while revenue was only $2.1M lifetime.
• **The 'war on AI slop' is intensifying**: Wikipedia, Reddit, and Spotify are implementing measures against AI-generated content as consumer appetite declines for low-quality AI output.
• **AI agents are transforming product development**: Companies like Coinbase are adopting 'agent-first' approaches where AI handles routine tasks, with Linear declaring the end of traditional issue tracking.
• **Brain-scan AI models could revolutionize UX testing**: Meta's Tribe V2 foundation model predicts human brain responses to stimuli, potentially enabling simulated user testing without human participants.

## Summary

OpenAI has abruptly shut down its AI video generation platform Sora, including the iOS app, web experience, and API, just months after its highly-publicized launch. The shutdown follows a disastrous financial trajectory: downloads peaked at 3.3 million in November 2025 before plummeting 66% to 1.1 million by February 2026, while the platform generated only $2.1 million in lifetime revenue against estimated compute costs of $10-15 million per day. The core problem was Sora's pricing model—a flat $200/month subscription that worked for low-cost text generation but proved unsustainable for computationally expensive video production.

### The Broader War on AI Slop

Sora's failure coincides with a broader industry pushback against low-quality AI-generated content, or 'AI slop.' Wikipedia is banning AI-generated articles, Reddit is rolling out human verification tools, and Spotify is testing artist verification to combat AI clones. This trend suggests declining consumer appetite for easily-generated AI content and a growing preference for authenticity.

### AI Agents Reshaping Product Development

Meanwhile, AI agents are fundamentally changing how software gets built. Linear's CEO declared 'issue tracking as we know it is now finished,' arguing that traditional handoff-based development is being replaced by agent-first workflows. At Coinbase, engineers conducted a radical experiment: they deleted their development environments and wrote zero code for two weeks to understand how work gets done when AI agents handle most tasks. The result was continuous development where agents generate pull requests overnight for human review.

### Emerging Technologies: Brain-Scan AI

Meta released Tribe V2, a foundation model trained on over 1,000 hours of brain scan data from 720 people. This model can simulate how different parts of the human brain respond to video, audio, and language stimuli. For product teams, this could eventually replace traditional user testing methods like surveys and lab studies with simulated brain response predictions.

### The Economic Impact of AI Agents

Companies are already seeing significant cost savings from replacing traditional software with AI agents. Cisco replaced a presentation software tool with an AI agent, saving $5 million annually in license costs, and identified other tools that could save $50-200 million. Meanwhile, Ramped built a self-maintaining codebase where AI agents automatically detect bugs, generate fixes, and open pull requests—scaling from 10 handwritten monitors to over 1,000 AI-generated ones in weeks.

## Context

This analysis matters because it reveals critical shifts in the AI industry beyond just another failed product. Sora's collapse demonstrates that even well-funded, high-profile AI initiatives can fail due to fundamental economic realities. The broader trend toward combating 'AI slop' signals a maturation of the market where quality and authenticity are becoming differentiators. Meanwhile, the rapid adoption of AI agents in software development suggests we're entering a new era of productivity where human roles shift from doing work to managing and reviewing AI-generated work. Product managers, developers, and business leaders need to understand these dynamics to navigate the changing landscape effectively.