---
metadata:
  videoId: "PuH4Wq5Smwg"
  title: "The Open-Source Firebase Alternative Might Be Better (AppWrite)"
  description: "In this video, we replace Firebase with Appwrite and build a full realtime todo app from scratch to see if an open-source backend can actually match Firebase in real-world use.\ 


    This walkthrough shows you a practical alternative that you can self-host and fully own. You’ll see how Appwrite handles auth, database operations, and live sync with minimal code, and how it compares to Firebase and tools like Supabase.


    🔗 Relevant Links

    Appwrite - https://appwrite.io/

    Appwrite Repo - https://github.com/appwrite/appwrite


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack


    📌 Chapters:"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT6M30S"
  publishedAt: "2026-03-21T22:00:32Z"
  thumbnailUrl: "https://i.ytimg.com/vi/PuH4Wq5Smwg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=PuH4Wq5Smwg"
processedAt: "2026-03-24T00:32:11.811Z"
source: "youtube"
tldr: "Appwrite is an open-source alternative to Firebase and Supabase that provides similar backend features (database, auth, storage, functions) but allows self-hosting for data ownership and cost control, making it ideal for developers wanting to avoid growing cloud bills."
tools:
  - name: "Appwrite"
    url: null
  - name: "Firebase"
    url: null
  - name: "Supabase"
    url: null
  - name: "Docker"
    url: null
  - name: "React"
    url: null
  - name: "Flutter"
    url: null
  - name: "Cloudflare"
    url: null
  - name: "MariaDB"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "docker"
  - "open-source"
  - "productivity"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6235
  outputTokens: 839
  totalTokens: 7074
  processingTimeMs: 30379
tagsNormalizedAt: "2026-03-24T04:15:20.880Z"
---

## Key Takeaways

The video introduces Appwrite as a powerful, self-hosted backend platform for developers. Key takeaways include:

- **Full data ownership and control**: Self-host on your own infrastructure to own your data and avoid vendor lock-in.

- **Comprehensive feature parity**: Offers authentication, real-time database, storage, serverless functions, and messaging, matching Firebase/Supabase.

- **Cost-effective scaling**: Eliminates surprise bills and per-seat pricing, ideal for startups and growing apps.

- **Developer-friendly setup**: Quick deployment with Docker and easy integration with popular SDKs like React and Flutter.

## Summary

Appwrite is presented as a compelling open-source alternative to established Backend-as-a-Service (BaaS) platforms like Firebase and Supabase. The core value proposition is retaining the developer experience and feature set of these services while gaining full data ownership and predictable costs through self-hosting.

### Core Features and Setup

The platform bundles essential backend services: **authentication** (email, OAuth, magic links), a hybrid **database** (document and relational), **storage** with file transforms, **serverless functions** in 13+ languages, and **messaging** for push/email/SMS. A live demo shows setting up a to-do app in minutes. The process involves running a Docker command, creating a project in the Appwrite console, defining a database collection with permissions, and connecting it to a frontend via environment variables.

### Advantages and Trade-offs

The primary advantages are **cost control** (no per-seat or usage-based surprise fees) and **data sovereignty**. It's positioned for privacy-focused developers, startups watching budgets, and mobile devs using Flutter. However, trade-offs exist: it requires Docker knowledge, lacks a built-in global CDN/edge network (needing integration with services like Cloudflare), uses MariaDB instead of PostgreSQL, and requires manual scaling management for large deployments.

### Ideal Use Case

Appwrite fits developers who find Firebase becoming expensive at scale or Supabase too complex, offering a middle ground. It's a strong option for projects where reducing long-term operational costs and maintaining control are priorities over the fully managed, hands-off nature of commercial BaaS offerings.

## Context

This video addresses a common pain point in modern app development: escalating costs and loss of control when using managed backend services like Firebase as an application grows. For developers and startups, vendor lock-in and unpredictable pricing can become significant hurdles. Appwrite emerges in this context, tapping into the broader trend of open-source, self-hostable developer tools that prioritize ownership and cost predictability without sacrificing productivity. It's relevant for full-stack, mobile, and indie developers building applications where backend cost and data control are key considerations.