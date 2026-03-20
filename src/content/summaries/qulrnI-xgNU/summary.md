---
metadata:
  videoId: "qulrnI-xgNU"
  title: "n8n v2 + MCP: How I Build and Debug Entire Workflows (Tutorial)"
  description: "Build and debug n8n workflows using Claude Opus 4.5 (or any MCP enabled client) with this unofficial MCP server that's way more powerful than n8n's official one.\ 

    Self-host n8n on Hostinger: https://hostinger.com/jeredblu\ 

    (10% off code: JEREDBLU)\ 

    While the official server only has 3 tools, that can only work with built out workflows.

    This one can create workflows, edit them, view executions, and help you debug—all connected directly to Claude Code (or whatever agent you choose).

    I also compare it to the built in n8n Ai that only comes with the cloud version, and how I am able to achieve all that functionality and more for a fraction of the price using n8n on Hostinger.

    What You'll Learn:

    How to upgrade n8n to v2 on self-hosted instances

    How to connect the unofficial n8n MCP server via Docker

    How to install Claude Skills for n8n best practices

    Building complete workflows with Claude Code plan mode

    Debugging workflows with MCP execution access

    ⏱️ TIMESTAMPS

    0:00 – Intro

    0:34 – Official vs unofficial n8n MCP server

    2:22 – Why I switched from n8n Cloud to self-hosting

    2:30 – Setting up n8n on Hostinger

    4:06 – Upgrading to n8n v2

    5:07 – Setting up the MCP server

    5:43 – Creating the mcp.json configuration

    6:46 – Getting your n8n URL and API key

    7:23 – Installing Claude Skills for n8n

    8:03 – Building workflows with Claude Code

    9:03 – Creating a workflow

    12:03 – Debugging and refactoring tips

    13:17 – Recap and final thoughts

    🔗 RESOURCES

    My complete guide: https://github.com/JeredBlu/guides/blob/main/Building_n8n_with_agents_via_MCP_and_Skills.md

    n8n MCP Server: https://github.com/czlonkowski/n8n-mcp

    n8n Claude Skills: https://github.com/czlonkowski/n8n-skills

    Docker Desktop: https://www.docker.com/products/docker-desktop/

    Book a call with me → https://yedatechs.com/#container06

    Sponsorship inquiries → hi@yedatechs.com

    #n8n #skills #ClaudeCode #MCP #Hostinger #Automation"
  channel: "JeredBlu"
  channelId: "UCaIm6rTg-RXb6rB19fYJgTg"
  duration: "PT14M6S"
  publishedAt: "2025-12-18T15:39:32Z"
  thumbnailUrl: "https://i.ytimg.com/vi/qulrnI-xgNU/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=qulrnI-xgNU"
processedAt: "2026-01-15T17:50:22.608Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "JeredBlu demonstrates using CZ Lancowski's unofficial n8n MCP server (via Docker) with Cloud Code Opus45 to build/debug workflows efficiently, recommending Hostinger for cost-effective self-hosting.\n"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-r1-0528:free"
  apiCalls: 5
  fallbackAttempts: 4
  inputTokens: 4533
  outputTokens: 1249
  totalTokens: 5782
  processingTimeMs: 98410
tools:
  - name: "n8n"
    url: null
  - name: "Claude Opus"
    url: null
  - name: "Hostinger"
    url: "https://hostinger.com/jeredblu"
  - name: "Docker"
    url: "https://www.docker.com/products/docker-desktop/"
  - name: "n8n MCP Server"
    url: "https://github.com/czlonkowski/n8n-mcp"
  - name: "n8n Claude Skills"
    url: "https://github.com/czlonkowski/n8n-skills"
  - name: "Claude Code"
    url: null
  - name: "OpenRouter"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-coding"
  - "automation"
  - "claude"
  - "docker"
  - "workflow"
tagsNormalizedAt: "2026-03-01T21:19:30.296Z"
---

## Key Takeaways

The unofficial n8n MCP server revolutionizes workflow creation and debugging. Key insights:

- **CZ Lancowski's MCP server** enables full workflow editing, debugging, and execution analysis locally, surpassing n8n's limited official tool

- **Self-hosting on Hostinger** cuts costs by ~75% vs n8n Cloud (KVM2 plan: unlimited executions)
- **Workflow process**: Start with a PRD, use Cloud Code + MCP skills for AI-assisted building (e.g., email scam detector), then iterate via execution debugging

## Summary

### Unofficial MCP Server Setup

CZ Lancowski's Docker-based MCP server (11k Git

Hub stars) connects to n8n instances via API key and URL. It enables:

- Full workflow creation/editing

- Execution analysis and debugging

- Integration with **Cloud Code Opus45** using **n8n MCP skills** for context-aware AI assistance

Compared to n8n's official MCP (limited to 3 tools), this solution works for both cloud and self-hosted users, offering superior control.

### Hosting and Upgrades

**Hostinger** provides affordable self-hosting:

- KVM2 plan handles n8n efficiently

- Unlimited executions at ~25% of n8n Cloud's cost (use code `Jered

Blu` for 10% discount)
- Includes templates like 100+ pre-built workflows

For **n8n v2 upgrades**:
1. Check migration report for breaking changes
2. Run terminal commands: `docker compose pull`, `docker compose down`, `docker compose up -d`

### Workflow Development Process

1. **Start with a PRD**: Define requirements first (e.g., phishing email detector)
2. **AI-driven building**: Cloud Code Opus45 uses MCP tools to:

- Generate node-based implementation plans

- Auto-create workflows from PRDs

- Handle node replacements (e.g., OpenAI → Open

Router)
3. **Debugging workflow**:

- Save and exit n8n before agent edits to avoid version conflicts

- Analyze past executions via MCP server

- Refactor complex workflows using AI insights

## Context

This approach addresses key n8n pain points: limited debugging tools, cloud execution caps (~50 AI credits/month), and the absence of AI features in self-hosted versions. It empowers developers and automation engineers to build complex workflows efficiently using agentic coding trends. Self-hosted users gain cloud-like AI capabilities, while all users benefit from Hostinger's cost savings.
