---
metadata:
  videoId: "bDwr_7n1AZg"
  title: "This Framework Might Be the FUTURE of Cross-Platform Apps (Dioxus)"
  description: "Build web, desktop, iOS, and Android apps from a single Rust codebase using Dioxus. In this video, we walk through what Dioxus is, how it works, and build a real cross-platform app in just a few minutes. If you’re curious about Rust, UI frameworks, or building once and shipping everywhere, this one is for you.


    🔗 Relevant Links

    Dioxus: https://dioxuslabs.com/


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

    00:00 Intro

    00:35 What Is Dioxus and Why It Matters

    01:08 What’s New in Dioxus 0.7

    01:50 Setting Up Dioxus

    02:52 Running Your First Dioxus App

    03:40 Building for iOS, Android and Web

    04:16 Fetching Data in Dioxus

    06:11 Rendering Our App

    06:30 Final Result and Thoughts"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT7M19S"
  publishedAt: "2026-01-11T02:00:44Z"
  thumbnailUrl: "https://i.ytimg.com/vi/bDwr_7n1AZg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=bDwr_7n1AZg"
processedAt: "2026-01-11T17:11:46.476Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Dioxus is a high-performance Rust framework for building native-speed web, mobile, and desktop apps from a single codebase.

  - Employs RSX (JSX-like syntax) and a component-based architecture for rapid development.

  - Version 0.7 introduces a GPU-accelerated renderer (Dioxus Native), automatic Tailwind CSS support, and integrated debugging across all platform targets.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1970
  outputTokens: 848
  totalTokens: 5604
  processingTimeMs: 24257
tools:
  - name: "Dioxus"
    url: "https://dioxuslabs.com/"
  - name: "Tailwind CSS"
    url: null
  - name: "Bevy"
    url: null
  - name: "Serde"
    url: null
  - name: "React Native"
    url: null
  - name: "Flutter"
    url: null
  - name: "Reqwest"
    url: null
  - name: "Radix UI"
    url: null
categories:
  - "Programming"
  - "Mobile Development"
tags:
  - rust
  - react-native
  - flutter
  - tailwind
  - ios
  - android
---

## Key Takeaways

Dioxus leverages the performance of Rust to provide a modern, high-speed alternative to established frameworks like Flutter and React Native.

* **True Cross-Platform Parity**: Use the **dx CLI** to deploy to web, iOS, Android, and desktop from a single codebase using a familiar component-based model.

* **Performance-First Architecture**: The new **Dioxus Native** renderer paints UIs directly on the GPU, bypassing common performance bottlenecks found in webview-based alternatives.

* **Refined Developer Experience**: Features like **Hot Reloading**, automatic **Tailwind CSS** styling, and an integrated debugger ensure a fast feedback loop during creation.

* **Deep Rust Integration**: Seamlessly utilize the broader Rust ecosystem, including **Serde** for JSON handling and the **Bevy** game engine.

## Summary

Dioxus is a rapidly maturing Rust-based UI framework designed to simplify the creation of multi-platform applications. By adopting a component-based architecture similar to React, it allows developers to build high-performance software for desktop (macOS, Windows, Linux), mobile (iOS, Android), and the web using a unified codebase. The framework utilizes **RSX**, a declarative macro that mimics HTML or JSX syntax, making it accessible to web developers while maintaining the type safety and speed of Rust.

### Architecture and New Features in 0.7
The release of version 0.7 marks a significant milestone for the ecosystem. A standout feature is **Dioxus Native**, a dedicated renderer that paints directly to the GPU. This approach ensures smooth animations and high-performance interfaces that feel more responsive than traditional webview wrappers. Additionally, the update adds support for **Radix UI** components and automatic **Tailwind CSS** integration, allowing developers to build professional, accessible designs quickly without writing complex custom CSS.

### The Development Workflow
Getting started with Dioxus is streamlined through the **Dioxus CLI**. After installing the Rust toolchain, developers can scaffold projects using the `dx new` command. The CLI manages the complexities of cross-compilation; for instance, running `dx serve --platform ios` automatically launches an i

Phone simulator and deploys the app. The framework includes **Hot Reloading** by default, allowing UI changes to be visible instantly across all targets without requiring a full manual recompile, though signature changes (like adding function parameters) trigger a fast full reload.

### Practical Data Handling
The framework is built to handle complex, asynchronous logic. In the demonstration, the creator builds a Chuck Norris joke generator to showcase how Dioxus handles external data. By integrating the **Reqwest** crate for HTTP calls and **Serde** for JSON deserialization, developers can fetch API data within reactive hooks like `use_effect`. This ensures that the UI updates immediately upon data arrival, providing a seamless user experience that matches the reactive patterns of modern web development while benefiting from the low-level efficiency of the Rust language.

## Context

In the modern development landscape, the demand for cross-platform efficiency often comes at the cost of performance or developer complexity. Dioxus is significant because it brings **Rust's memory safety and speed** to the UI layer, which has traditionally been dominated by Java

Script (React Native) or Dart (Flutter). This matters to developers who want to avoid 'Java

Script fatigue' and the overhead of virtual machines while maintaining a unified codebase. As Rust continues to grow in popularity for system and web development, Dioxus positions itself as a critical tool for building the next generation of high-performance apps that bridge the gap between web-level productivity and native-level performance.
