---
metadata:
  videoId: "voU0Rz4DrPk"
  title: "Building Custom LEGO Sets with MCP"
  description: "If you ever wanted to leverage AI to help you make use of that forgotten box of LEGO bricks in your closet, well - do I have news for you. There's an open source MCP server that I put together that does just that - AND it will render you the set as you're asking it to change the 100th floating brick.


    You can get it on GitHub: https://github.com/dend/brick-mcp-app


    You can learn more about building MCP apps here: https://modelcontextprotocol.io/extensions/apps/overview


    Music by Oleksandr Stepanov (https://pixabay.com/users/penguinmusic-24940186/) from Pixabay (https://pixabay.com/music/)


    Music also by Yurii Semchyshyn (https://pixabay.com/users/coma-media-24399569/) from Pixabay (https://pixabay.com/music/)


    #engineering #ai #mcp #tech #lego"
  channel: "Den Delimarsky"
  channelId: "UCNHIUc6KE64sUe5G0eP70aQ"
  duration: "PT27M53S"
  publishedAt: "2026-03-17T01:52:28Z"
  thumbnailUrl: "https://i.ytimg.com/vi/voU0Rz4DrPk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=voU0Rz4DrPk"
processedAt: "2026-03-24T00:56:29.746Z"
source: "youtube"
tldr: "Den Delimarsky built an open-source MCP app that uses Claude AI to design custom LEGO sets from spare parts, integrating the LDraw library with Three.js for 3D rendering and enabling natural-language iteration on builds."
tools:
  - name: "Claude"
    url: null
  - name: "Model Context Protocol (MCP)"
    url: null
  - name: "TypeScript"
    url: null
  - name: "MCP TypeScript SDK"
    url: null
  - name: "LDraw"
    url: null
  - name: "Three.js"
    url: null
  - name: "Cloudflare Tunnels"
    url: null
  - name: "npm"
    url: null
  - name: "GitHub"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Web Development"
tags:
  - "agents"
  - "claude"
  - "mcp"
  - "open-source"
  - "typescript"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 17875
  outputTokens: 1081
  totalTokens: 18956
  processingTimeMs: 225870
tagsNormalizedAt: "2026-03-24T04:13:15.285Z"
---

## Key Takeaways

This video demonstrates how to build an interactive AI-powered tool for LEGO design using the Model Context Protocol. The key insights are:

*   **MCP apps enable rich, interactive AI agents** by allowing LLMs like Claude to render and respond to user interfaces, moving beyond simple text exchanges.

*   **Integrating specialized data (LDraw) with 3D rendering (Three.js)** creates a powerful foundation for visualizing and manipulating complex objects like LEGO bricks directly in a browser or AI client.

*   **Natural language becomes a construction interface**, where users can iteratively describe, build, and refine designs (e.g., "rotate the southern slope 180°") through conversation with the AI.

*   **The system supports both automated and manual control**, allowing the AI to search parts and place bricks while users retain the ability to manually adjust and guide the process for precise outcomes.

## Summary

Den Delimarsky showcases a custom **MCP (Model Context Protocol) app** he built to solve a personal problem: using his collection of spare LEGO bricks. The app, called **Brick MCP**, allows him to use **Claude AI** to design and visualize custom LEGO sets through natural language.

### Technical Architecture

The app's core integrates several key technologies. It leverages the massive **LDraw** open-source library, which documents thousands of LEGO parts in a standardized format. This data is rendered in 3D using **Three.js**, a JavaScript library for browser-based 3D graphics. The entire application is built with **TypeScript** using the **MCP TypeScript SDK**, and it's designed to run as a server that any MCP-compatible client (like Claude Desktop) can connect to.

To make the local development server accessible to the cloud-based Claude.ai service, Den uses **Cloudflare Tunnels** to expose a public URL. This demonstrates a practical deployment pattern for local MCP apps needing to connect to hosted AI agents.

### Workflow and Interaction

The demonstration shows the complete workflow. After connecting the MCP server to Claude, Den simply asks the AI to "build a Victorian house out of bricks." Claude first reads the app's **README tool** to understand the available capabilities, which include searching the LDraw database, placing bricks, rotating them, and replacing components.

The AI then begins constructing the model in a dedicated 3D viewer within the Claude interface, placing bricks one by one or in groups. The initial result is imperfect—bricks float, rotations are wrong—but this highlights the app's power: **iterative refinement through conversation**.

Den provides natural-language feedback like, "On the southern and northern slopes, the bricks are improperly rotated. Remove them and replace with a tighter structure, rotating 180°." Claude uses the MCP tools to execute these changes. The process continues with adding decorative elements like animal mini-figs by simply asking Claude to place them, showcasing how the AI can search the vast LDraw catalog.

### Future Potential and Open Source

The project is openly available on GitHub, encouraging community contributions to improve brick placement logic, structural awareness (like support beams), and overall robustness. Den envisions future features like inventory scanning, where you could show the AI your box of bricks and ask what you can build. This project exemplifies how **MCP apps can bridge specialized domains (like LEGO design) with the conversational power of LLMs**, creating entirely new, interactive tool-building experiences.

## Context

This project sits at the intersection of several important trends: the rise of **AI agents** that can take action beyond chat, the standardization of AI tool use through protocols like **MCP**, and the democratization of complex 3D design. It matters to developers interested in building next-generation AI applications, makers and hobbyists looking for creative tools, and anyone exploring how to give LLMs rich, contextual capabilities in specialized domains. It demonstrates a practical blueprint for connecting AI to real-world data and interactive interfaces.