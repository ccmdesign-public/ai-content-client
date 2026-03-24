---
metadata:
  videoId: "mVKxygo5Sdo"
  title: "Vercel accuses Cloudflare of stealing"
  description: "Vercel and Cloudflare are fighting again. This time it's about bash.


    Thank you Browserbase for sponsoring! Check them out at: https://soydev.link/browserbase


    SOURCES

    https://x.com/cramforce/status/2033285112478171373

    https://x.com/threepointone/status/2028187706786824233

    https://github.com/vercel-labs/just-bash


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT31M11S"
  publishedAt: "2026-03-19T11:49:33Z"
  thumbnailUrl: "https://i.ytimg.com/vi/mVKxygo5Sdo/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=mVKxygo5Sdo"
processedAt: "2026-03-24T21:06:59.098Z"
source: "youtube"
tldr: "Theo explains the drama between Vercel and Cloudflare after Cloudflare forked Vercel CTO's 'just-bash' package, removing security warnings and safeguards, highlighting a broader pattern of tension between the two companies over open-source etiquette, platform architecture differences, and the erosion of good-faith communication."
tools:
  - name: "just-bash"
    url: null
  - name: "TypeScript"
    url: null
  - name: "Node.js"
    url: null
  - name: "Next.js"
    url: null
  - name: "Vite"
    url: null
  - name: "Vext"
    url: null
  - name: "Pyodide"
    url: null
  - name: "Cloudflare Workers"
    url: null
  - name: "workerd"
    url: null
  - name: "Deno"
    url: null
  - name: "Docker"
    url: null
  - name: "WASM"
    url: null
  - name: "Browserbase"
    url: "https://soy.link/browserbase"
  - name: "MCP"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Programming"
  - "Web Development"
tags:
  - "agents"
  - "open-source"
  - "typescript"
  - "vercel"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 25070
  outputTokens: 1761
  totalTokens: 26831
  processingTimeMs: 60248
tagsNormalizedAt: "2026-03-24T22:59:11.754Z"
---

## Key Takeaways

Theo analyzes the escalating conflict between Vercel and Cloudflare, focusing on a recent incident where Cloudflare forked Vercel's 'just-bash' package.

*   **The core conflict stems from Cloudflare forking Vercel's 'just-bash' package**, a TypeScript-based Bash emulator for AI agents, and removing its beta warnings and key security layers, which Vercel perceived as reckless and against open-source etiquette.

*   **The fundamental architectural difference between Vercel and Cloudflare explains the divergent needs for 'just-bash'.** Vercel (running on Node.js in containers) built it for security isolation, while Cloudflare (using its workerd runtime) forked it to gain Bash-like functionality their platform inherently lacks.

*   **The incident was likely a good-faith engineering experiment by Cloudflare's Sunil Pai**, who was excited by the tool, but it escalated due to poor communication, the removal of critical caveats, and publishing under the official Cloudflare GitHub org.

*   **The drama is exacerbated by a history of bad blood**, including Cloudflare's previous 'Vext' fork of Next.js which had security issues, leading Vercel to assume bad faith and respond publicly instead of privately.

*   **The resolution involved Vercel's Malta publicly apologizing**, recognizing Sunil Pai's positive intentions and his role as a community builder, highlighting how the breakdown in private communication unnecessarily damaged relationships.

*   **The main lesson is to assume good faith and communicate privately first** before public call-outs, as most drama stems from misinterpretation and a lack of direct dialogue between the involved parties.

## Summary

### Introduction to the Drama

The video opens with Theo framing the latest clash between Vercel and Cloudflare, two major infrastructure companies with a history of public disputes. This time, the conflict centers on a specific open-source package called 'just-bash,' created by Vercel's CTO, Malte. The package is a TypeScript-based emulation of Bash, designed to allow AI agents to interact with a shell-like environment safely within a JavaScript VM, avoiding the cost and risk of spawning real Linux instances.

Theo notes that Cloudflare engineer Sunil Pai publicly praised the package, foreshadowing the coming conflict. The drama ignited when Malte published an article accusing Cloudflare of forking 'just-bash' (which is Apache 2.0 licensed) into a package called `@cloudflare/shell`, removing its beta disclaimers and critical security layers in the process.

### Vercel's Perspective and Security Concerns

Malte's article argues that forking a young, rapidly evolving project like 'just-bash' is poor open-source etiquette, as forks should be a last resort for stable or abandoned projects. More critically, he details how Cloudflare's fork stripped out 'defense-in-depth' security measures. These included code that deactivated dangerous JavaScript functions like `eval` and `Function` constructor during execution, and deep checks against prototype pollution attacks—measures essential for preventing host escape in Node.js environments.

The fork also replaced the secure Python 3 implementation with Pyodide configured in an unsafe mode, granting Python scripts full access to the JavaScript host environment. From Vercel's viewpoint, this created a dangerously misleading package that appeared production-ready and cross-platform while being potentially insecure, especially outside Cloudflare's unique runtime.

### Architectural Differences: Why 'Just-Bash' Matters

To explain the core disagreement, Theo delves into the fundamental architectural divergence between Vercel and Cloudflare. Vercel runs applications on real servers or containers (effectively Docker images) with full Node.js runtimes. Here, user or agent code could potentially break out of the application layer and run dangerous native Bash commands, accessing the underlying system. 'Just-bash' was built to create a safe, emulated Bash layer *within* the Node.js runtime to contain this risk.

In contrast, Cloudflare's platform is built on `workerd`, a V8-based runtime that uses isolates for security. Developer code runs in a heavily sandboxed environment that cannot spawn processes or access a real Bash shell at all. For Cloudflare, the value of 'just-bash' wasn't security but *functionality*—it finally allowed Bash-like operations within their constrained runtime. Therefore, the security layers Vercel built for Node.js were irrelevant or incompatible with `workerd`, which explains why Cloudflare's fork removed them.

### Unpacking Intent and Escalation

Theo then shifts to analyze intent, defending Sunil Pai as a genuine builder who was likely just excited to adapt a cool tool for Cloudflare's ecosystem. He speculates the fork might have been an automated or agent-assisted experiment that was published prematurely without proper context. The critical mistake was publishing it under the official `cloudflare` GitHub organization without clear 'experimental' labels, making it look like an official, stable product.

This action triggered Vercel's defensive response, fueled by lingering resentment from the previous 'Vext' (a fork of Next.js) incident, which shipped with security vulnerabilities. Theo argues that Vercel's public call-out, assuming bad faith, was the major misstep. A private conversation could have clarified Sunil's intentions and resolved the issue without public drama.

### Resolution and Broader Lessons

The video concludes with a positive update: Malte later posted a reflection, apologizing to Sunil Pai for the public attack and acknowledging his good intentions and valued role in the community. Theo expresses frustration that the drama overshadowed the technical innovation of 'just-bash' itself.

The core lesson, according to Theo, is the corrosive effect of assuming bad faith in the open-source community. When trust erodes, every action is misinterpreted, leading to public fights that distract from building. His final plea is for engineers and companies to default to private, direct communication ('send the DM first') before escalating conflicts publicly, preserving relationships and focusing energy on creation rather than confrontation.

## Context

Theo is a well-known software developer and content creator (t3.gg) who frequently comments on tech industry drama, developer tools, and web infrastructure with a blend of technical depth and community perspective. This video contributes to an ongoing, heated rivalry between Vercel and Cloudflare, two major players in the modern web development and edge computing space. Their competition spans performance marketing, developer experience, and now open-source practices. The incident is relevant as it highlights critical issues around open-source etiquette, the ethics of forking, platform security models, and how communication breakdowns between major tech influencers can spiral into public conflicts. Developers, platform engineers, and anyone interested in the business and community dynamics of open-source software would benefit from watching to understand the technical underpinnings of the feud and the human factors that escalated it.