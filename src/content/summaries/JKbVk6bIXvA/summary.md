---
metadata:
  videoId: "JKbVk6bIXvA"
  title: "I did not expect this..."
  description: "Vite's taken over basically everything in the frontend world. And now we've got vite+, fully open source


    Thank you General Translation for sponsoring! Check them out at: https://soydev.link/gt


    SOURCE

    https://voidzero.dev/posts/announcing-vite-plus-alpha


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O @Ph4seon3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT30M5S"
  publishedAt: "2026-03-17T23:40:47Z"
  thumbnailUrl: "https://i.ytimg.com/vi/JKbVk6bIXvA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=JKbVk6bIXvA"
processedAt: "2026-03-24T21:08:25.294Z"
source: "youtube"
tldr: "Theo explores VIT Plus, the newly open-sourced, all-in-one unified toolchain built on VIT, testing its capabilities for project management, migration, and performance, and concludes that while it shows immense promise for simplifying web development workflows, it's not yet mature enough for immediate widespread adoption."
tools:
  - name: "VIT"
    url: null
  - name: "VIT Plus"
    url: null
  - name: "React"
    url: null
  - name: "Astro"
    url: null
  - name: "TanStack Start"
    url: null
  - name: "SvelteKit"
    url: null
  - name: "Next.js"
    url: null
  - name: "Nuxt"
    url: null
  - name: "Vue"
    url: null
  - name: "Bun"
    url: null
  - name: "PNPM"
    url: null
  - name: "Convex"
    url: null
  - name: "CodeEx"
    url: null
  - name: "T3 Code"
    url: null
  - name: "Claude Code"
    url: null
categories:
  - "AI & Machine Learning"
  - "Web Development"
tags:
  - "ai-coding"
  - "javascript"
  - "react"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 23863
  outputTokens: 1744
  totalTokens: 25607
  processingTimeMs: 53104
tagsNormalizedAt: "2026-03-24T23:01:11.695Z"
---

## Key Takeaways

Theo provides a first-look, hands-on review of VIT Plus, the newly open-sourced successor to the VIT ecosystem, evaluating its potential to unify the fragmented web development toolchain.

*   **VIT Plus is a major shift towards unification**, aiming to consolidate package management, environment setup, testing, scaffolding, bundling, linting, and formatting into a single, cohesive toolset built on top of VIT.

*   **The initial experience reveals significant promise alongside rough edges.** Highlights include incredibly fast linting/formatting (sub-500ms), intelligent node version pinning per project, and a powerful caching task runner (`v:tasks`). Lowlights include poor initial `agents.md` templates, a lack of Bun support, and a critical flaw where `vp dev` overrides custom `dev` scripts in `package.json`.

*   **A real-world migration from a Bun-based TanStack Start project to VIT Plus is complex.** The automated `vp migrate` command fails on Bun projects and introduces breaking changes, requiring manual intervention and dependency resolution, which Theo successfully completes using the CodeEx AI assistant.

*   **The ultimate vision is compelling: a future with reduced decision fatigue.** Theo is excited by the long-term potential for VIT Plus, combined with Void Zero's deployment platform, to provide a streamlined, full-stack development experience from database to cloud runtime, but feels it's not yet ready for prime time in his own projects.

## Summary

### Introduction and First Impressions

Theo begins by contextualizing VIT Plus as a pivotal announcement from the Void Zero team. Originally announced as a private, paid version of VIT, it has now been released as an open-source MIT-licensed project. He frames it as an ambitious attempt to create a **unified toolchain** that manages packages, dependencies, environments, testing, scaffolding, bundling, linting, and formatting. Excited by this vision, he decides to test it live for the first time.

His initial setup involves creating a new project. He notes promising features like the ability to let VIT Plus manage Node.js versions (similar to `nvm` or `fnm`), which pins versions per project—a boon for team consistency and Docker environments. He is immediately impressed by the raw speed of the `vp check` and `vp lint` commands, which run across his codebase in well under half a second.

### Critical Feedback on AI Integration and Setup

Theo's first major critique centers on the auto-generated `agents.md` file, intended to guide AI assistants. He finds it overloaded with irrelevant information (like `create` commands for an already-created project) and not tailored for actual AI-assisted development. He deems it "actual garbage" that would hurt model performance and suggests it should be a concise reference or a separate skill. He also expresses disappointment that the initial project creation didn't offer framework-specific templates (like React), which he later discovers are available via shorthand commands.

### The Migration Challenge: From Bun to VIT Plus

The core of the video is a real-world test: migrating an existing project (using Bun and TanStack Start) to VIT Plus. The `vp migrate` command immediately fails because it doesn't support Bun, which Theo criticizes as a major oversight for its target bleeding-edge developer audience. He is forced to manually orchestrate the migration.

This process uncovers several pain points:

*   The migration breaks his custom `dev` script that uses `concurrently` to run multiple services.

*   More critically, he discovers that running `vp dev` ignores the `dev` script defined in `package.json` and runs VIT Plus's own dev server instead. He compares this to a widely hated behavior in Bun and insists it **must be fixed**, stating scripts in `package.json` should always take precedence.

*   The migration leaves stale `node_modules` and introduces version conflicts in TanStack dependencies, breaking the application.

To fix the broken migration, Theo uses the **CodeEx** AI assistant within **T3 Code**, which successfully diagnoses the dependency conflicts and updates the TanStack packages, restoring functionality. He contrasts this effective, UI-based AI experience with the sluggish and ineffective performance of **Claude Code** on the same task.

### Performance Analysis and the Vision

With the migrated project working, Theo tests build times. His TanStack Start app's build time improves from about 28 seconds to 22 seconds—a meaningful gain he attributes to the new Rust-based tooling and caching. He explores the `v:tasks` system, a **Turbo-like caching task runner** that intelligently orchestrates and caches tasks based on dependency graphs, which he praises as "huge."

He concludes by reflecting on the broader vision. He sees immense potential in a future where VIT Plus, combined with Void Zero's deployment platform, reduces the overwhelming **decision fatigue** of modern web development by providing a single, integrated solution from package management to cloud runtime. He has deep faith in Evan You and the team, given VIT's track record.

### Final Verdict

Despite the exciting potential and clear technical strengths (speed, caching, node management), Theo's hands-on experience leaves him with a "not yet" conclusion. The alpha-stage rough edges—particularly the script overriding, poor Bun support, and subpar AI context—mean he won't be adopting it for his projects immediately. He remains **very excited for its future** and will keep a close watch on its development, but recommends that most developers wait for these foundational issues to be resolved.

## Context

Theo, from the channel t3.gg, is a well-known developer, educator, and creator deeply embedded in the modern web ecosystem, having been an early adopter of VIT and React. This video contributes to the ongoing conversation about consolidation and simplification in the fragmented JavaScript tooling landscape, where developers juggle countless config files and tools. The relevance is high due to the recent open-sourcing of VIT Plus, a significant move by the influential Void Zero team (Evan You's company). This video is most beneficial for front-end and full-stack developers considering adopting VIT Plus, those frustrated with current tooling complexity, or anyone interested in the future direction of the VIT ecosystem and web development workflows.