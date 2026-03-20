---
metadata:
  videoId: "d1Aditif0wI"
  title: "MCP Will Never Be The Same - Render UI With MCP Apps"
  description: "With the release of MCP Apps, you can now build rich interactive experiences on top of MCP, and have those show up in all MCP clients that implement the new spec extension.

    Learn more:

    - Documentation: https://modelcontextprotocol.io/docs/extensions/apps

    - Blog post: https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/

    #mcp #engineering #modelcontextprotocol #ai #artificialintelligence #anthropic"
  channel: "Den Delimarsky"
  channelId: "UCNHIUc6KE64sUe5G0eP70aQ"
  duration: "PT17M43S"
  publishedAt: "2026-01-26T18:00:36Z"
  thumbnailUrl: "https://i.ytimg.com/vi/d1Aditif0wI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=d1Aditif0wI"
processedAt: "2026-01-26T23:03:50.517Z"
source: "youtube"
tldr: "MCP apps, an extension to the Model Context Protocol, enable interactive UI rendering in chat interfaces, allowing developers to build visual elements like color pickers directly into AI assistants like Claude and VS Code."
tools:
  - name: "Claude"
    url: null
  - name: "Visual Studio Code"
    url: null
  - name: "Cloudflare Tunnel"
    url: null
  - name: "npm"
    url: null
  - name: "GitHub"
    url: null
  - name: "Firefox"
    url: null
  - name: "Ubuntu"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "MCP Apps"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Copilot Chat"
    url: null
  - name: "VS Code Insiders"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
  - "Web Development"
tags:
  - "claude"
  - "mcp"
  - "vscode"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5142
  outputTokens: 2670
  totalTokens: 7812
  processingTimeMs: 49656
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.440Z"
---

## Key Takeaways

MCP apps revolutionize chat interfaces by adding interactive UI capabilities.

- **MCP apps** extend the Model Context Protocol to render interactive UI elements such as charts and buttons in chat interfaces.

- Supported by major clients including **Claude** and **Visual Studio Code**, with contributions from OpenAI and MCPUI.

- Developers can quickly bootstrap apps using **skills in Claude Code** and test them with tools like **Cloudflare Tunnel**.

- The UI is **sandboxed in an iframe** for security, enabling bidirectional communication without compromising user data.

## Summary

MCP apps represent a significant evolution in the Model Context Protocol, moving beyond text-based interactions to include fully interactive user interfaces. This extension allows developers to embed visual elements like color pickers, data visualizations, and more directly into chat interfaces, enhancing the user experience.

### Building an MCP App

The video demonstrates how to create an MCP app using **Claude Code** with a built-in skill. By cloning a repository and using the skill, developers can automate the setup process. For instance, a color picker app is bootstrapped quickly, showcasing the efficiency of this approach.

### Demonstration in Clients

Once built, the app is tested in **Claude** and **Visual Studio Code**. Using **Cloudflare Tunnel**, the local app is exposed remotely and integrated into chat interfaces. In Claude, a color picker is rendered interactively, and the AI can read the selected color context. Similarly, in VS Code with Copilot chat, the same functionality works seamlessly.

### Security and Practicality

MCP apps run in a **sandboxed iframe**, ensuring security by isolating the UI from direct system access. This makes it safe for users while enabling rich interactions. The bidirectional nature allows real-time updates and tool invocations, streamlining workflows.

Developers are encouraged to explore the documentation and samples provided by the Anthropic engineering team and community to start building their own MCP apps.

## Context

This innovation is crucial as it bridges the gap between AI chat interfaces and interactive web applications, making AI tools more versatile and user-friendly. Developers, AI researchers, and product designers should pay attention, as it aligns with trends towards more integrated and visual AI experiences. It enhances productivity by reducing manual steps in data visualization and interaction.