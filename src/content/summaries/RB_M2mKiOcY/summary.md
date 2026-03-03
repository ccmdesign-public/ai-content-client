---
metadata:
  videoId: "RB_M2mKiOcY"
  title: "Claude Code & MCPs built my $145K marketing machine"
  description: "I sit down with Cody Schneider, growth engineer and co-founder of Graph, for a live, hands-on crash course in GTM (go-to-market) engineering powered by Claude Code. Cody walks through how he runs multiple AI agents simultaneously to handle everything from bulk Facebook ad creation and LinkedIn outreach to cold email campaigns and live data analysis — tasks that used to require a team of dozens. By the end of the episode, you'll have a full understanding of how to set up your own agent workflow, the specific tools involved, and why domain expertise paired with AI is the real competitive advantage right now.


    Cody’s GTM Toolkit:

    *AI/Agent Tools:* Claude Code, Perplexity API, OpenAI Codex


    *Marketing & Outreach:* Instantly AI (cold email), Phantom Buster (LinkedIn scraping/automation), Apollo API (data enrichment), Million Verifier (email verification), Raphonic (podcast host scraping)


    *Advertising:* Facebook Ads API, Facebook Ads Library (competitor research), Nano Banana Pro (AI image generation), Kai AI (bulk image generation), HeyGen API (UGC/video generation)

    *Infrastructure & Deployment:* Railway.com (servers, on-the-fly databases/Postgres), Vercel (deployment)


    *Data & Analytics:* Graphed / Graphed MCP (data warehouse, live data feeds), Google Analytics 4


    *CRM & Communication:* Salesforce (mentioned as comparison), Intercom, SendGrid API, Slack, Cal.com API


    *Productivity & Design:* Notion, Super Whisper (voice transcription), Claude Code front-end design skill, HTML to Canvas (for converting React components to PNGs)


    Cody's GTM Engineering Course: https://startup-ideas-pod.link/GTM-engineering


    Timestamps

    00:00 – Intro

    02:02 – What Is GTM Engineering?

    05:12 – Setting Up Your Agent Workspace & Environment File

    07:54 – Live Demo: LinkedIn Auto-Responder

    09:56 – Live Demo: Bulk Facebook Ad Generator

    12:31 – Live Demo: Cold Email Campaign Automation (Raphonic + Instantly)

    14:47 – Live Demo: Creating Notion Documents via Claude Code

    16:46 – Live Demo: Bulk Ad Creative Generator

    26:05 – Live Demo: LinkedIn Engagement Scraper to Cold Email Pipeline

    28:16 – Context Switching Across Tasks

    29:19 – Live Demo: Bulk Ad Generator

    31:41 – Live Demo: Data Analysis: Turning Off Low-Performing Ads

    35:28 – Summary of GTM Engineering Workflow

    37:48 – Deploying Agents and On-the-Fly Databases with Railway for Data Analysis

    41:28 – The Dream of Autonomous Marketing

    48:50 – Building API-First Products and Agent-Native Infrastructure


    Key Points


    * GTM engineering has evolved from Clay-style data enrichment workflows into full-stack agent orchestration — where one person running multiple Claude Code agents can replace the output of a large team.

    * The practical setup starts with a single folder containing your environment file (API keys for every tool in your stack), transcription software like Super Whisper, and Claude Code.

    * Cody demonstrates running seven or more agents simultaneously across LinkedIn outreach, Facebook ad creation, cold email campaigns, Notion document generation, and live data dashboards.

    * Code-generated ad creative (React components exported as PNGs) costs nearly nothing to produce at scale and allows rapid testing of messaging variations before investing in polished visuals.

    * Deploying proven workflows to Railway turns one-off agent tasks into always-on, autonomous processes that run 24/7.

    * Domain expertise is the real multiplier — the vocabulary you bring from your field determines the quality of output you can extract from these tools.


    The #1 tool to find startup ideas/trends - https://www.ideabrowser.com/

    LCA helps Fortune 500s and fast-growing startups build their future - from Warner Music to Fortnite to Dropbox. We turn 'what if' into reality with AI, apps, and next-gen products https://latecheckout.agency/

    The Vibe Marketer - Resources for people into vibe marketing/marketing with AI: https://www.thevibemarketer.com/


    FIND ME ON SOCIAL

    X/Twitter: https://twitter.com/gregisenberg

    Instagram: https://instagram.com/gregisenberg/

    LinkedIn: https://www.linkedin.com/in/gisenberg/


    FIND CODY ON SOCIAL:

    Cody’s startup: https://www.graphed.com/

    X/Twitter: https://x.com/codyschneiderxx

    Youtube: https://www.youtube.com/@codyschneiderx"
  channel: "Greg Isenberg"
  channelId: "UCPjNBjflYl0-HQtUvOx0Ibw"
  duration: "PT54M7S"
  publishedAt: "2026-03-02T18:10:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/RB_M2mKiOcY/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=RB_M2mKiOcY"
processedAt: "2026-03-03T15:06:13.551Z"
source: "youtube"
tldr: "Cody Schneider demonstrates how to leverage Claude Code, MCPs, and various APIs to build autonomous marketing agents that can perform tasks like generating and publishing hundreds of Facebook ads, scraping LinkedIn for engagement, and running cold email campaigns, ultimately creating a 24/7 'personal software' system that automates the 'middle work' of growth marketing."
tools:
  - name: "Claude Code"
    url: null
  - name: "Phantom Buster"
    url: null
  - name: "Instantly"
    url: null
  - name: "Refonic"
    url: null
  - name: "Railway"
    url: "https://railway.com"
  - name: "Facebook Ads API"
    url: null
  - name: "Perplexity API"
    url: null
  - name: "Million Verifier"
    url: null
  - name: "Notion"
    url: null
  - name: "React"
    url: null
  - name: "html2canvas"
    url: null
  - name: "Graph MCP"
    url: null
  - name: "Google Analytics 4"
    url: null
  - name: "PostgreSQL"
    url: null
  - name: "Apollo API"
    url: null
categories:
  - "Business & Career"
  - "AI & Machine Learning"
tags:
  - "ai-agents"
  - "growth-marketing"
  - "automation"
  - "claude-code"
  - "mcp"
  - "api-integration"
  - "autonomous-marketing"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 37595
  outputTokens: 1658
  totalTokens: 39253
  processingTimeMs: 53656
---

## Key Takeaways

Cody Schneider showcases a practical workflow for using AI agents to automate complex marketing tasks, shifting from manual execution to strategic oversight.

*   **Automate the 'Middle Work':** The core philosophy is to offload all repetitive, keyboard-touching tasks (ad creation, data analysis, outreach) to AI agents, allowing you to focus on high-level strategy and idea generation.

*   **Build 'Personal Software':** Use tools like **Claude Code** to create custom, single-purpose software agents tailored to your specific marketing workflows (e.g., a LinkedIn comment responder, a bulk Facebook ad generator).

*   **API-First Tool Selection:** The robustness of a tool's API is now a primary buying criterion. Agents interact with services like **Phantom Buster**, **Instantly**, and **Refonic** via their APIs, making the traditional UI a secondary concern.

*   **From Prototype to Perpetual Agent:** Once an agent workflow is built and tested locally, deploy it to a server (like **Railway**) to run autonomously in the background, creating a 24/7 marketing machine.

*   **Domain Knowledge is the Superpower:** Your ability to describe problems precisely using industry-specific vocabulary is what allows AI agents to produce high-quality, effective outputs, making deep expertise more valuable than ever.

*   **The Future is Autonomous Marketing:** This approach points toward a future of fully autonomous marketing systems where agents handle creative testing, performance analysis, and budget optimization in continuous loops.

## Summary

### Introduction to GTM Engineering and the Agent WorkflowCody Schneider introduces the concept of **GTM (Go-to-Market) engineering**, originally coined by Clay.com, which is rapidly evolving from simple data enrichment workflows into the practice of building autonomous agents. His core thesis is that all the 'middle work'—the repetitive tasks like creating ads, analyzing data, and managing outreach—can be delegated to AI agents. This transforms your role into an 'agent jockey' or strategist who generates ideas, passes them to agents like **Claude Code**, and polishes the final output, enabling work at a previously impossible scale.

### Foundational Setup: The Growth Agent RepositoryThe first step is creating a centralized repository (a simple folder) that houses all your agent projects and a critical `.env` file. This environment file stores all your API keys for every service in your stack (e.g., **Intercom**, **SendGrid**, **HubSpot**, **Perplexity**, **Facebook Ads API**). This setup emphasizes an **API-first mentality**; you interact with all your daily tools through their APIs, making the quality and robustness of an API a key factor in software selection. Cody also recommends tools like Super Whisper for voice transcription to speed up the building process.

### Live-Building Autonomous Marketing AgentsThe video's core is a live demonstration of building multiple agents in parallel. Cody starts by activating a pre-built agent that uses the **Claude Chrome extension** to automatically respond to people requesting a giveaway asset on a **LinkedIn** post. While that runs, he initiates the creation of a **bulk Facebook ad generator**. He instructs Claude Code to build a React-based UI that can produce 1080x1080 ad creatives as downloadable PNGs using html2canvas, based on text variations he will provide.

Simultaneously, in another window, he builds an agent to scrape podcast host emails from **Refonic**, verify them with **Million Verifier**, and add them to an **Instantly** cold email campaign. He then demonstrates using an agent to automatically create a **Notion** document based on a template for a new giveaway. This showcases the 'agent jockey' workflow, where multiple agents are spawned and managed concurrently, each handling a specific 'job to be done.'

### The Full Marketing Funnel Automation LoopCody demonstrates a complete cycle for Facebook ad automation. First, he has an agent use the **Perplexity API** to scrape **Reddit** and social media for pain points related to his product. Those pain points become text variations. He then uses the locally running bulk ad generator to create hundreds of ad image variations. Next, he has an agent use the **Facebook Ads API** to bulk upload all those creatives as drafts into a specific ad set. To analyze performance, he uses the **Graph MCP** (Model Context Protocol) to pull live data from his data warehouse (not directly from the rate-limited Facebook API) into a dashboard showing clicks, cost, and demographics. Finally, he has an agent analyze that data to identify high-CPM, low-performing ads and uses the Facebook Ads API to automatically pause them. This illustrates a potential autonomous loop: ideate -> create -> publish -> analyze -> optimize.

### Deployment, Scalability, and Future Implications
To move from a local prototype to a persistent system, Cody deploys agents to **Railway**, using its API to spin up servers on-demand. This enables creating 'on-the-fly' software and databases for specific tasks, which can be spun down after use, drastically reducing the time for data analysis projects. He predicts a shift towards 'on-the-fly UIs' and 'on-the-fly software' as the standard for forward-thinking operators. The conversation concludes with broader implications: this technology enables **autonomous marketing**, creating massive leverage for individuals and small teams but also posing a significant disruption and potential job displacement for traditional marketing roles. The ultimate advantage lies with those who combine deep domain expertise with the ability to effectively wield these new agentic tools.

## Context

Cody Schneider is a growth marketing expert and practitioner specializing in 'vibe marketing' and leveraging cutting-edge AI tools. He is a guest on Greg Isenberg's podcast, which focuses on business, marketing, and internet culture trends. This discussion is part of the rapidly evolving conversation around **AI agents**, **autonomous workflows**, and the future of work, particularly in marketing and sales. The video is highly relevant as tools like **Claude Code** and **MCPs** are making agentic AI accessible to non-engineers. It is most beneficial for marketers, growth professionals, founders, and anyone interested in practical, hands-on applications of AI to automate business processes and gain a significant productivity advantage.