---
metadata:
  videoId: "Tr1uVFYepME"
  title: "An MCP feature you didn't know you needed"
  channel: "Visual Studio Code"
  channelId: "UCs5Y5_7XK8HLDX0SLNwkd3w"
  duration: "PT1M46S"
  publishedAt: "2026-03-26T14:00:43Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Tr1uVFYepME/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Tr1uVFYepME"
processedAt: "2026-03-26T21:32:13.035Z"
source: "youtube"
tldr: "Visual Studio Code's MCP (Model Context Protocol) server includes an 'elicitation' feature that lets users visually sketch UI layouts and configure sites via forms, with the server using sampling to generate content directly."
tools:
  - name: "Visual Studio Code"
    url: null
  - name: "Model Context Protocol (MCP)"
    url: null
  - name: "Figma"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
  - "Tools & Productivity"
tags:
  - "automation"
  - "mcp"
  - "ui"
  - "vscode"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2322
  outputTokens: 865
  totalTokens: 3187
  processingTimeMs: 28735
tagsNormalizedAt: "2026-03-26T21:33:02.345Z"
---

## Key Takeaways

The video demonstrates an under-the-radar MCP feature in VS Code that enhances AI-assisted development workflows. Key insights include:

*   **Elicitation for UI Design:** The MCP server hosts a web page where users can **visually sketch layouts** (e.g., rectangles for content, nav bars, sidebars), which are then returned as a resource from the tool call.

*   **Form-Based Configuration:** Another mode of elicitation presents a **form-based interface** to configure site properties (e.g., site type, content, features like contact forms) before generation.

*   **AI-Powered Content Generation:** The MCP server uses its **sampling feature** to make requests to an underlying AI model, which then generates the final content based on the user's design and configuration inputs.

## Summary

The video showcases a specific feature of the Model Context Protocol (MCP) server integration within Visual Studio Code, referred to as 'elicitation.' This feature, described as 'newish' as of November, provides a novel interface for interacting with AI during development tasks, specifically for website creation.

**Visual Layout Sketching**
The first part of the demonstration focuses on UI design. When activated, the feature opens a web page hosted by the MCP server. This page functions as a simple canvas where the user can sketch a website layout using basic shapes. The presenter illustrates this by drawing a rectangle for main content and adding elements for a navigation bar and a sidebar. Once the sketch is finalized, this visual design is sent back into the VS Code environment as a resource from the tool call, ready to inform the next steps.

**Asset Management and Form-Based Configuration**
The feature also hints at integration with design assets. The presenter mentions that if you have assets from tools like Figma, you can save and download them into your project folder. The workflow then shifts to site configuration. A different 'node of elicitation' is shown, which is a form-based interface. This form prompts the user to specify details such as:

*   Site type (e.g., 'creative site')
*   Structure (e.g., 'single page site')
*   Content parameters

*   Feature selections (e.g., adding a contact form)

This structured input gathers the requirements for the site to be built.

**AI-Driven Content Generation**
The final step is content generation. After the layout is sketched and the site is configured via the form, the user instructs the system to generate the content. The video explains that the MCP server then utilizes its 'sampling feature.' This means the server autonomously makes requests back to the connected AI model, using the gathered design and configuration data as context. The model processes this information and generates the corresponding website content, completing the assisted development cycle.

## Context

This feature is significant as it represents a move towards more intuitive, multi-modal interfaces for AI-assisted development within integrated development environments (IDEs). Instead of relying solely on text prompts, developers can use visual sketches and structured forms to communicate intent to an AI agent via the MCP protocol. This lowers the barrier for rapid prototyping and ideation, making AI tools more accessible for design and front-end tasks. It matters to developers, designers, and product builders who are exploring how to integrate AI co-pilots more seamlessly and effectively into their creative and technical workflows.