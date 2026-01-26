---
metadata:
  videoId: "B6C-MWCFfAg"
  title: "It’s time to change your database"
  description: "There's a reason everyone's moving from Firebase, Supabase, and all the other dbs, straight to Convex


    Thank you Tuple for sponsoring! Check them out at: https://soydev.link/tuple


    SOURCES

    https://x.com/steipete/status/2008417546677219828

    https://www.youtube.com/watch?v=h6ffyfabfa8


    Want to sponsor a video? Learn more here: https://soydev.link/sponsor-me


    Check out my Twitch, Twitter, Discord more at https://t3.gg


    S/O Ph4se0n3 for the awesome edit 🙏"
  channel: "Theo - t3․gg"
  channelId: "UCbRP3c757lWg9M-U7TyEkXA"
  duration: "PT39M44S"
  publishedAt: "2026-01-13T13:07:28Z"
  thumbnailUrl: "https://i.ytimg.com/vi/B6C-MWCFfAg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=B6C-MWCFfAg"
processedAt: "2026-01-15T05:59:01.382Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Theo argues developers should switch to **Convex** from traditional databases like **Superbase** due to its superior developer experience, especially for AI-assisted app building. Convex offers generous free tiers, a code-first approach with full TypeScript type safety, automatic real-time sync, and powerful components, simplifying complex backend tasks and improving productivity.\n"
ai:
  provider: "gemini"
  model: "gemini-2.5-flash"
  apiCalls: 3
  fallbackAttempts: 2
  inputTokens: 10307
  outputTokens: 2358
  totalTokens: 16031
  processingTimeMs: 43370
tools:
  - name: "Convex"
    url: null
  - name: "Firebase"
    url: null
  - name: "Supabase"
    url: null
  - name: "Tuple"
    url: "https://soydev.link/tuple"
  - name: "Stripe"
    url: null
  - name: "R2"
    url: null
  - name: "Resend"
    url: null
  - name: "Databricks"
    url: null
  - name: "Snowflake"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Fowl"
    url: null
  - name: "Node.js"
    url: null
categories:
  - "Web Development"
  - "Data & Analytics"
tags:
  - typescript
  - nodejs
  - ai-coding
  - claude
  - sql
---

## Key Takeaways

Theo makes a compelling case for Convex as the superior application database, contrasting it with Superbase and highlighting its developer-centric design, especially for modern Type

Script and AI-assisted development.

*   **Code-First, Type-Safe Development**: Convex fully integrates the database schema, queries, and mutations directly into your codebase using Type

Script, providing **end-to-end type safety**. This eliminates the need for ORMs or separate dashboard configurations, making development predictable and significantly improving the experience for AI agents.

*   **Generous & Fair Pricing Model**: Convex offers a highly generous free tier (40 deployments, 6 team members, 25+ projects for free) and a **usage-based pricing model** that scales down to zero for inactive projects. In contrast, Superbase's project-based billing can unexpectedly convert free projects to paid, making experimentation costly.

*   **Built-in Real-time Sync and Compute**: Convex natively handles **real-time data synchronization** to clients and provides a dynamic, isolate-based compute layer co-located with the database. This architecture ensures high performance, automatic caching invalidation, and removes concerns about database sleeping, offering a fundamentally different approach to application data.

*   **Powerful Component Ecosystem**: Convex extends its functionality through **"components"**, which are pre-built, installable modules (e.g., Stripe integration, AI agent orchestration, work pools, crons, R2 file storage, collaborative editing). These act like external services integrated directly within your Convex folder, streamlining complex backend features.

*   **Seamless Developer Onboarding & Branching**: Each developer gets their own **isolated development environment** by simply running `npx convex dev`, without needing to be added to team accounts or configure dashboards. This simplifies onboarding, facilitates collaboration, and improves workflow for preview environments.

*   **Application-Focused Design**: Convex is explicitly designed as an **application database**, prioritizing user-facing app development over general-purpose analytics. While not ideal for massive ad-hoc analytical queries, it offers solutions for data export to dedicated analytics platforms like Databricks or Snowflake.

## Summary

The video "It's time to change your database" by Theo (t3.gg) is a passionate endorsement of Convex as the leading application database, particularly for developers building with Type

Script and leveraging AI tools. Theo frames the discussion by referencing a Twitter thread and a video by Robin on why he stopped using Superbase, setting the stage for a detailed comparison and a strong argument for Convex's architectural and developer experience advantages.

### The Problem with Current Database Solutions & Superbase's Limitations

Theo begins by highlighting common frustrations in database management, especially with traditional approaches and platforms like Superbase. A critical point raised from Robin's video is Superbase's **punitive pricing model**. Their free tier limits active projects, and upgrading even one project in an organization automatically converts all other free projects within that organization to paid instances, often at a minimum of $10 per month per project. This makes experimentation and hobby development financially risky. In contrast, Theo showcases his Convex dashboard, noting he has over 25 projects, all of which would be free under Convex's generous free tier (40 deployments, 6 team members). Convex's pricing is **usage-based**, meaning costs reflect actual activity, significantly reducing expenses for inactive projects and providing a much fairer model for developers.

Superbase, while open-source and built on PostgreSQL, is presented as "a different way of doing Postgres." It exposes the underlying SQL database, requiring developers to think about traditional database architecture, including row-level security (RLS) defined within the database itself. This approach, while familiar to those with SQL backgrounds, can be complex and less developer-friendly, especially for application logic and syncing data. Theo suggests that if using Superbase, it might be better treated purely as a PostgreSQL store rather than a real-time sync layer.

### Convex's Architectural & Development Model

Convex, on the other hand, is described as "a different way of doing application data." It's a heavier abstraction built on SQL but completely hides the underlying database. Developers interact with Convex solely through **Type

Script queries and mutations** defined directly within their project's `convex` folder. This **code-first approach** is a core differentiator.

For example, a `schema.ts` file defines all tables and their indexes in code. Queries and mutations are also Type

Script functions. When a developer writes a query to fetch `generations`, Convex provides **end-to-end type safety**. Any mismatch between the code's expected data structure and the actual database schema results in an immediate Type

Script error in the editor, eliminating runtime surprises and making code maintenance significantly easier. This tight integration means there's **no need for ORMs or complex migration tools**; the database schema is an inherent part of the codebase.

### Enhanced Developer Experience and AI Compatibility

A major theme throughout the video is Convex's suitability for **AI-assisted development**. Because all database logic, schema, and access rules are defined as plain Type

Script files within the project, AI agents (like Claude Code, Codeex, Cursor) can directly read, understand, and modify the entire backend infrastructure. This eliminates the "MCP jiu-jitsu" (Mental Context-Switching Problem) required to synchronize different states across dashboards, codebases, and environments. When an AI agent makes a change, running `npx convex dev` immediately deploys those changes to a development instance. Convex even auto-deploys when data consistency issues are resolved, showcasing its intelligent syncing capabilities.

Convex also boasts **built-in real-time sync**. When data changes via a mutation, Convex automatically invalidates relevant query caches and pushes updates to connected clients. This happens without any explicit configuration by the developer, making real-time applications effortless to build. Unlike traditional databases where complex joins might lead to performance issues, Convex allows for straightforward Type

Script mapping and awaiting on query results, trusting its query planner to optimize these operations.

Permissions are handled explicitly within query and mutation functions. Instead of abstract RLS rules in a dashboard, developers write conditional logic in Type

Script to determine who can access or modify what data. This makes **security transparent and auditable** within the source code.

### Actions and External Service Integrations

While queries and mutations are deterministic and interact solely with the database, Convex introduces **Actions** for non-deterministic operations or interactions with external services (e.g., calling an image generation API, sending emails). Actions are also defined as Type

Script functions and can call mutations. This clear separation ensures the core database operations remain pure, while allowing for full backend functionality. Developers can even opt for Node.js environments for specific actions if needed.

### Components: The "External Service in a Folder"

A standout feature is **Convex Components**. These are pre-built, installable modules that bundle complex capabilities and integrate directly into a project's `convex` folder, behaving like native parts of the application. Examples include:

*   **Stripe integration**: For payments.

*   **AI Agent components**: For orchestrating agent workflows.

*   **Work Pools**: For rate-limiting and managing concurrent calls to external APIs with features like queuing and retry management.

*   **Crons**: For scheduling tasks.

*   Integrations with **R2** (Cloudflare object storage) and **Resend** (transactional email).

*   A **collaborative text editor** component for real-time multi-user editing.

These components effectively bring the functionality of external service providers directly into the Convex codebase, reducing dependency on disparate services and simplifying development. AI agents can also leverage these components once introduced to them.

### Seamless Branching and Developer Onboarding

Convex simplifies **developer onboarding and environment management**. Each developer can spin up their own isolated development instance by running `npx convex dev` without needing to be added to a team account or configuring anything in a dashboard. This "personal dev account" model makes it incredibly easy for new contributors to get started and for teams to manage preview environments.

### Downsides and Use Case Specificity

Theo is transparent about Convex's limitations. It is primarily an **application database** and **not optimized for analytical queries** or tasks that require loading massive amounts of data for flexible, ad-hoc analysis (e.g., retrieving every row to count specific properties). For such use cases, Convex recommends streaming data out to dedicated analytics platforms like Databricks or Snowflake, for which they provide built-in solutions.

Furthermore, Convex's biggest strengths are realized when building with **Type

Script**. While SDKs for other languages exist, the full type-safety and developer experience are most profound within the Type

Script ecosystem. Theo argues that for user-facing applications, Type

Script is the natural choice anyway.

### Concluding Demo

To demonstrate Convex's power, Theo performs a live demo where he uses an AI agent (Claude Code) to build a full-stack image generation studio from scratch. He provides a simple prompt to the AI, which then generates the entire application code, including the Convex backend, frontend, and integration with an external image generation service (Fowl). After resolving a couple of AI-generated type errors (which Convex's tooling immediately highlighted) and an API validation error, the app is fully functional. The demo impressively showcases:

*   **AI's ability to build complex applications** quickly with Convex's code-first model.

*   **Real-time updates**: Newly generated images immediately appear in the UI.

*   **Automatic data syncing**: Deleting an image from the UI instantly removes it, reflecting the real-time capabilities.

Theo concludes by reaffirming his genuine love for Convex, emphasizing how it has made application development not just easier but significantly more enjoyable. He views it as the best tool for modern application development, urging his audience to explore it themselves.

## Context

Theo, known as t3.gg, is a highly influential figure in the Type

Script and web development community, particularly recognized for his work on the T3 Stack. He consistently advocates for developer experience and efficient tooling. This video contributes to the ongoing conversation about backend choices for modern web applications, especially in the era of serverless computing and AI-assisted development. With the increasing adoption of AI agents for coding, databases that offer a predictable, code-driven, and type-safe interface become crucial. This makes the video particularly relevant for full-stack developers, startups, and anyone looking to leverage AI in their development workflow while optimizing for developer experience and cost efficiency. Those working with Type

Script and building user-facing applications stand to benefit most from exploring Convex as presented here.
