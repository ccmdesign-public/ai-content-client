---
metadata:
  videoId: "zAbQE6K0d1k"
  title: "The NPM Package Everyone Is Adding To Their Site (Web Haptics)"
  description: "Web Haptics is the tiny package that lets your website trigger haptic feedback on both Android and iOS with just one function. It has custom vibration patterns, and a clever iOS workaround that makes it all possible.\ 


    🔗 Relevant Links

    https://haptics.lochie.me/


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

    0:00

    0:43 Usage

    2:05 Customizing Vibrations

    3:11 How it Works (iOS Trick)"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT4M50S"
  publishedAt: "2026-03-03T10:01:31Z"
  thumbnailUrl: "https://i.ytimg.com/vi/zAbQE6K0d1k/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=zAbQE6K0d1k"
processedAt: "2026-03-03T15:02:43.455Z"
source: "youtube"
tldr: "Web Haptics is an NPM package that adds haptic feedback to websites for Android and iOS using a simple trigger function, with a clever iOS workaround involving invisible switches to mimic vibrations."
tools:
  - name: "Web Haptics"
    url: null
  - name: "React"
    url: null
  - name: "Vue"
    url: null
  - name: "Svelte"
    url: null
categories:
  - "Web Development"
tags:
  - "react"
  - "svelte"
  - "vue"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5076
  outputTokens: 2139
  totalTokens: 7215
  processingTimeMs: 68557
tagsNormalizedAt: "2026-03-04T16:09:03.028Z"
---

## Key Takeaways

The Web Haptics package simplifies adding haptic feedback to web applications for a more native feel.

* Provides a **trigger function** for vibrations with presets and custom patterns via arrays.

* Includes **debug mode**, **cancel function**, and **isSupported** boolean for cross-browser compatibility.

* Uses **navigator.vibrate** on Android and an **invisible switch** trick on iOS for broader device support.

* Offers framework-specific hooks for **React**, **Vue**, and **Svelte**, plus vanilla JavaScript.

## Summary

The video introduces Web Haptics, a trending NPM package that enables haptic feedback on websites, making them feel more like native apps. It has gained popularity on social media and has been adopted by sites like Poly Market.

To use it, developers can install the package and employ the **useWebHaptics** hook in React, which returns a **trigger function**, **cancel function**, and **isSupported** boolean. Setting **debug** to true allows auditory feedback during development, simulating vibrations on non-mobile devices.

Vibration patterns can be customized using built-in presets like "success" and "error" or by defining custom arrays with **delay**, **duration**, and **intensity** properties. The package's website features an interactive editor for designing and testing patterns directly on mobile devices.

A key insight is the package's workaround for iOS, which lacks support for the **navigator.vibrate** API. It simulates vibrations by programmatically clicking an invisible **switch** input multiple times to mimic the desired pattern. Developers can visualize this by enabling **showSwitch** in the hook settings.

Internally, the package checks for **navigator.vibrate** support and falls back to the switch method on iOS, ensuring compatibility across platforms with minimal code.

## Context

Haptic feedback enhances user experience by providing tactile responses, commonly found in native mobile apps. This package bridges the gap for web applications, allowing developers to create more immersive and engaging interactions. It is relevant for web developers targeting mobile users and aligns with trends towards app-like web experiences, improving usability and polish.