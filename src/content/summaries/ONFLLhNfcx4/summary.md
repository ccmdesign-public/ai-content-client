---
metadata:
  videoId: "ONFLLhNfcx4"
  title: "Electrobun: No Node, No Chromium, Just Pure Bun Performance"
  description: "Electrobun is a cross-platform desktop app framework that delivers apps 6x smaller than Electron while maintaining native performance. Created by Yoav from Blackboard, this Bun-based framework uses native webviews instead of shipping Chromium, resulting in 68MB desktop apps compared to Electron's 200MB+ bundles. It let's you use any JavaScript React, Svelte, Vue, or Angular, and there have already been some great apps built with it like a hybrid browser/terminal/editor, text-to-speech app, and Doom running with WebGPU. Despite being a newer project with some documentation gaps, Electrobun offers Bun developers a compelling path to desktop app development with significantly smaller bundle sizes and native speed.


    🔗 Relevant Links

    Electrobun Repo - https://github.com/blackboardsh/electrobun?tab=readme-ov-file


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

    0:31 What is Electrobun

    1:12 Create React Vite Project with Electrobun

    2:35 Why Electrobun shows a blank screen (fix)

    3:46 Electrobun vs Electron app size

    4:16 Fixing cross platform issues with CEF

    4:33 Extra Electrobun Features like (OOPIF, TypedRPC, ZSTD)

    4:49 Issues with Electrobun

    5:06 Final Thoughts"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT5M49S"
  publishedAt: "2026-03-06T19:00:32Z"
  thumbnailUrl: "https://i.ytimg.com/vi/ONFLLhNfcx4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=ONFLLhNfcx4"
processedAt: "2026-03-07T20:42:45.976Z"
source: "youtube"
tldr: "Electrobun is a new cross-platform desktop framework that uses Bun and native OS web views instead of Node.js and Chromium, producing apps that are over 4x smaller than Electron equivalents while maintaining native performance."
tools:
  - name: "Electrobun"
    url: null
  - name: "Bun"
    url: null
  - name: "Electron"
    url: null
  - name: "Tauri"
    url: null
  - name: "React"
    url: null
  - name: "Vue"
    url: null
  - name: "SolidJS"
    url: null
  - name: "Angular"
    url: null
  - name: "Svelte"
    url: null
  - name: "TypeScript"
    url: null
  - name: "WebKit"
    url: null
  - name: "Edge WebView2"
    url: null
  - name: "WebKit GTK"
    url: null
  - name: "Chromium Embedded Framework"
    url: null
  - name: "WebGPU"
    url: null
categories:
  - "Mobile Development"
  - "Programming"
  - "Web Development"
tags:
  - "javascript"
  - "mobile-apps"
  - "nodejs"
  - "open-source"
  - "performance"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4912
  outputTokens: 943
  totalTokens: 5855
  processingTimeMs: 28501
tagsNormalizedAt: "2026-03-07T21:06:27.518Z"
---

## Key Takeaways

Electrobun is a promising desktop app framework alternative to Electron. • Uses **Bun runtime** instead of Node.js/V8, leveraging native OS web views (WebKit, Edge WebView2) for smaller bundle sizes • Produces apps **over 4x smaller** than Electron (65MB vs 271MB for Hello World) • Supports any JS framework (React, Vue, SolidJS, Angular) but has **early-stage issues** with documentation and rendering • Created because Bun's acquisition by Anthropic shifted focus away from desktop apps

## Summary

Electrobun is a cross-platform desktop application framework created by Yo from Blackboard as an alternative to Electron. It leverages the Bun JavaScript runtime and its own C++ wrappers instead of Node.js and V8, while using the system's native web view (WebKit on Mac, Edge WebView2 on Windows, WebKit GTK on Linux) rather than bundling Chromium.

The framework produces significantly smaller application bundles

- a Hello World app built with Electrobun creates a 65MB app compared to 271MB for the same app built with Electron. Developers can use any JavaScript framework they prefer, including React, Vue, SolidJS, or Angular, and the framework provides templates for common app patterns like note-taking apps, multi-window apps, and tray apps.

### Getting Started with Electrobun

To create an Electrobun app, developers need to set up an Electrobun configuration file that specifies the app name, identifier, and build entry point. The main entry file instantiates a browser window class with a title and URL. Views need to be properly configured in the config file, referencing the built HTML and JavaScript files after Bun's build process completes tree shaking and transpilation.

### Advanced Features and Considerations

Electrobun includes several advanced features: an out-of-process iframe architecture for isolated web view processes, typed RPC for interprocess communication, Zstd compression, and a self-extracting wrapper for smaller initial downloads. However, it also supports the Chromium Embedded Framework for cross-platform consistency, though this adds significant size similar to Electron.

### Current Limitations

The framework is very new (first commit in February 2026) and has some early issues including missing documentation, occasional page flashing on reloads, and inspector tools that can disrupt layouts. The creator has already built several demonstration apps including Collab (a hybrid browser/terminal/code editor), a text-to-speech app powered by Quen, and even got Doom running using WebGPU.

## Context

Electrobun addresses the long-standing problem of Electron apps being excessively large due to bundling Chromium and Node.js. With Bun's acquisition by Anthropic shifting the official team's focus toward CLI and executable improvements rather than desktop applications, Electrobun emerges as a community-driven solution for developers who want Bun's performance benefits in desktop applications. This matters for developers building cross-platform desktop tools who want smaller bundle sizes and better performance without learning Rust (as required by alternatives like Tauri).