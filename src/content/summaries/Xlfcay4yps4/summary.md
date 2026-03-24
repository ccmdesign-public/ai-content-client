---
metadata:
  videoId: "Xlfcay4yps4"
  title: "Building A Halo Infinite MCP App In Less Than An Hour (With Claude Code)"
  description: "I've always wanted to view my Halo Infinite stats in Claude, but staring at tables and text descriptions just won't do, so - I embarked on a journey where I had Claude Opus 4.6 rewrite my Grunt API wrapper library (that was originally written for .NET) into TypeScript, and then promptly help me create all the scaffolding needed to see just how average of a Halo player I am - in real-time!


    You can explore more on this tinkering in my GitHub repository: https://github.com/dend/forerunner-mcp-app


    This video used a few things, if you are curious:


    - A Ubuntu installation with all the basic dev tools (git and Node)

    - Visual Studio Code Insiders (because I like living on the edge with dev tools)

    - Claude Code (and a Claude Max 20x subscription) with Opus 4.6

    - My libraries - Grunt (https://www.npmjs.com/package/@dendotdev/grunt) and Conch (https://www.npmjs.com/package/@dendotdev/conch)

    - A whole lot of patience (an hour's worth, TBH)


    #ai #claude #mcp #engineering #halo"
  channel: "Den Delimarsky"
  channelId: "UCNHIUc6KE64sUe5G0eP70aQ"
  duration: "PT43M29S"
  publishedAt: "2026-02-19T02:31:32Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Xlfcay4yps4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Xlfcay4yps4"
processedAt: "2026-03-24T00:57:54.367Z"
source: "youtube"
tldr: "The video demonstrates building a functional Halo Infinite MCP (Model Context Protocol) app with rich UI in under an hour using Claude Code, showing how developers can leverage AI agents and pre-built skills to rapidly scaffold applications that integrate complex APIs and authentication."
tools:
  - name: "Claude Code"
    url: null
  - name: "Model Context Protocol"
    url: "https://github.com/modelcontextprotocol"
  - name: "MCP Apps Extension"
    url: "https://github.com/modelcontextprotocol/ext-apps"
  - name: "Visual Studio Code"
    url: null
  - name: "Grunt API"
    url: "https://grunt-api.com"
  - name: "TypeScript"
    url: null
  - name: "Node.js"
    url: null
  - name: "npm"
    url: "https://npmjs.com"
  - name: "Azure Entra ID"
    url: null
  - name: "Forerunner MCP App"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "claude"
  - "machine-learning"
  - "mcp"
  - "typescript"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 28717
  outputTokens: 1587
  totalTokens: 30304
  processingTimeMs: 51414
tagsNormalizedAt: "2026-03-24T04:09:57.398Z"
---

## Key Takeaways

This video showcases a practical workflow for rapidly building **MCP (Model Context Protocol) apps** using AI agents like Claude Code, with a focus on creating a rich Halo Infinite stats viewer as a case study. The key insights are about developer workflow evolution rather than just the technical implementation.

## Summary

### Introduction and Project Setup

The video begins with Den Delimarsky introducing the concept of **Model Context Protocol (MCP) apps** and their evolution from theoretical demonstrations to practical applications. He explains that while his previous video covered foundational concepts, this follow-up focuses on building something "near and dear" to his heart: a Halo Infinite stats viewer. The motivation stems from wanting to quickly assess player career progression, match stats, and rich metadata like medals that are difficult to represent in plain text.

Delimarsky references his existing **OpenSpartan Workshop** desktop application, which provides these insights but requires installation. With the evolution of MCP and specifically the **MCP apps extension**, developers can now bring real UI components directly into chat interfaces like Claude, VS Code, or ChatGPT. This allows for richer, more interactive experiences without requiring standalone applications.

### Leveraging Skills and Agent Orchestration

The core methodology involves using **agent skills** – markdown documents with scripts that instruct AI agents like Claude Code on how to complete specific tasks. Delimarsky demonstrates copying an existing "create MCP app" skill from the official MCP repository and modifying it for Halo Infinite development. This customized skill includes crucial information like:

* Authentication workflows using Xbox OAuth

* Library dependencies (specifically his **Grunt** library for Halo API access)
* API conventions and data structures

* Best practices for user experience

He emphasizes that developers don't need to write boilerplate scaffolding from scratch. Instead, they can use these skills as building blocks, with the AI agent handling the initial implementation. The developer's role shifts to **orchestrating the agent** and ensuring good user experience decisions rather than writing every line of code.

### Building the Halo MCP App

Delimarsky walks through the actual creation process using Claude Code. He provides the agent with the customized skill and a prompt requesting a Halo MCP app that can track last match stats, career progression, service records, and render medals and rank icons with Halo-like styling. The agent then begins generating the project scaffolding autonomously.

After approximately 20 minutes of "cooking," Claude Code produces a functional MCP server with four tools: authentication, career stats, match stats, and service records. Delimarsky demonstrates configuring the app with his Azure/Entra ID client ID for Xbox authentication and setting up the MCP server in VS Code for testing.

### Iterative Debugging and Reference Implementation

A significant portion of the video focuses on the **iterative debugging process** where Delimarsky acts as a product manager directing Claude to fix issues. When authentication doesn't properly open the browser, he points Claude to his existing **Forerunner MCP app** implementation that handles this correctly. This pattern of referencing existing working code proves crucial for solving several issues:

* **Authentication flow improvements**: Moving from a manual URL copy-paste experience to automatic browser opening

* **Career stats for other players**: Fixing API calls that worked for the authenticated user but failed for other players

* **Medal rendering**: Addressing missing medal images by examining how his Grunt library handles medal metadata and sprites

Delimarsky emphasizes that having **reference implementations** – whether in the same language or different ones – dramatically improves the agent's ability to implement features correctly. He demonstrates how pointing Claude to documentation (grunt-api.com) and existing code helps it understand API conventions like clearance tokens for Halo's user-generated content system.

### Final Results and Developer Workflow Evolution

The finished MCP app successfully renders:

* **Career progression** with rank icons, progress percentages, and visual styling

* **Match statistics** with map details, outcomes, duration, and properly rendered medals

* **Service records** with comprehensive match history and top 50 medals color-coded by difficulty

* **Cross-player functionality** allowing queries for both the authenticated user and other players' gamertags

Delimarsky highlights how this represents an evolution in developer workflow. What might have taken 4-5 hours of manual API integration, CSS styling, and debugging was accomplished in under an hour with AI assistance. The developer's expertise shifts from writing every line of code to:

1. **Understanding good user experience** and directing the agent accordingly
2. **Providing reference implementations** and documentation
3. **Orchestrating multiple AI interactions** to solve specific problems
4. **Capturing learnings** in skills and documentation for future iterations

He concludes by encouraging developers to use the available skills, SDKs, and samples to scaffold their own MCP apps, emphasizing that they can always dive under the hood to understand how things work while benefiting from the accelerated development workflow.

## Context

Den Delimarsky is a developer and content creator with expertise in API development, gaming integrations, and emerging development workflows. He has previously built the OpenSpartan Workshop desktop application for Halo Infinite stats and maintains several open-source projects related to gaming APIs. This video contributes to the growing conversation around **AI-assisted development** and the **Model Context Protocol ecosystem**, which enables richer integrations between AI agents and external data sources. The relevance stems from the rapid adoption of MCP by major platforms like Claude, VS Code, and ChatGPT, creating new opportunities for developers to build interactive tools that live within chat interfaces. Developers interested in **AI-powered development workflows**, **MCP app creation**, or **gaming API integrations** would benefit most from watching the full video to understand the practical implementation details and workflow patterns.