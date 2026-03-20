---
metadata:
  videoId: "h8Pz51ZEW5U"
  title: "They cut Node.js Memory in half 👀"
  description: "Node's getting faster.


    Thank you PostHog for sponsoring! Check them out at: https://soydev.link/posthog


    SOURCES

    https://blog.platformatic.dev/we-cut-nodejs-memory-in-half

    https://x.com/matteocollina/status/2023805914940096583


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT28M51S"
  publishedAt: "2026-02-26T11:52:54Z"
  thumbnailUrl: "https://i.ytimg.com/vi/h8Pz51ZEW5U/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=h8Pz51ZEW5U"
processedAt: "2026-03-10T15:14:59.140Z"
source: "youtube"
tldr: "Node.js memory usage can be cut by ~50% via a Docker image swap to Node Caged, which enables V8's pointer compression, reducing pointer size from 64-bit to 32-bit with only a 2-4% latency increase, thanks to a collaboration between Cloudflare, Agalia, and Node.js maintainers."
tools:
  - name: "Node.js"
    url: null
  - name: "Docker"
    url: null
  - name: "V8"
    url: null
  - name: "Next.js"
    url: null
  - name: "Kubernetes"
    url: null
  - name: "AWS EKS"
    url: null
  - name: "PostHog"
    url: "soyb.link/postthog"
  - name: "Supabase"
    url: null
  - name: "Stripe"
    url: null
  - name: "Cloudflare Workers"
    url: null
  - name: "Bun"
    url: null
  - name: "Watt"
    url: null
  - name: "NAN (Native Abstractions for Node)"
    url: null
  - name: "Node API (NAPI)"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Web Development"
tags:
  - "docker"
  - "nodejs"
  - "performance"
  - "web-development"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 23796
  outputTokens: 1192
  totalTokens: 24988
  processingTimeMs: 38452
tagsNormalizedAt: "2026-03-10T16:42:12.776Z"
---

## Key Takeaways

A new Node.js Docker image enables a major memory optimization. **Pointer compression**, a V8 feature, halves memory usage by storing 32-bit offsets instead of 64-bit addresses. This was enabled after Cloudflare, Agalia, and Node.js solved the historical '4GB cage' limitation per isolate. Real-world benchmarks on a Next.js app show 50% heap reduction with minimal latency impact (2-4% avg increase, 7% P99 improvement).

## Summary

**Pointer Compression in V8** is a method for reducing memory references in the JavaScript heap. Instead of using full 64-bit memory addresses, V8 stores 32-bit offsets relative to a fixed base address. This cuts each pointer from 8 bytes to 4 bytes, leading to approximately 50% memory savings for applications with many objects, arrays, and closures.

**Historical Barriers and the Solution**
Node.js did not enable this by default for two key reasons. First, the **'4GB cage' limitation** meant all worker threads in a process shared a single 4GB memory space. Second, there were concerns about CPU overhead from compressing and decompressing pointers on each heap access.

A collaboration between **Cloudflare**, **Agalia**, and the **Node.js** project solved these issues. They introduced **isolate groups** in V8, allowing each worker thread (isolate) to have its own 4GB cage. Performance testing showed the CPU overhead was minimal—akin to an L1 cache hit—and was dwarfed by other real-world app operations like I/O and framework logic.

**Node Caged: The Easy Path to Adoption**
Because enabling pointer compression requires compiling Node with a specific flag, the team created **Node Caged**, a Node 25 Docker image with the feature pre-enabled. This allows teams to adopt it with a simple one-line Docker image swap in their deployments.

**Real-World Results and Impact**
Benchmarks on a realistic Next.js e-commerce app showed:

*   **~50% reduction in heap memory usage**.

*   **2-4% increase in average latency**.

*   **7% reduction in P99 latency** (the slowest 1% of requests got faster).

The P99 improvement is attributed to shorter and less frequent **garbage collection (GC) pauses**, as a smaller heap means the GC has less data to scan and move.

**Significant Cost and Scale Implications**
For production deployments, halving memory usage can translate to major cost savings (e.g., cutting a 6-node cluster to 3 nodes) or doubled deployment density. This is particularly impactful for:

*   **Multi-tenant SaaS platforms** (more tenants per server).

*   **Edge deployments** (Cloudflare Workers, Lambda) with strict memory limits.

*   **WebSocket applications**, where idle connections consume heap memory.

**Compatibility Notes**
The primary compatibility constraint is with native add-ons built using the legacy **NAN (Native Abstractions for Node)** API, which must be updated. Most popular packages (Sharp, SQLite3, etc.) have already migrated. You can check your project with `npm ls nan`.

## Context

JavaScript and Node.js are often criticized for high memory consumption, which directly impacts hosting costs, scalability, and deployment options, especially in memory-constrained environments like edge runtimes. This deep dive into a core V8 optimization highlights the extensive engineering work behind the JavaScript ecosystem and provides a near-effortless way for teams to potentially halve their infrastructure costs or double their application density.