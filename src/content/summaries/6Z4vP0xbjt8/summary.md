---
metadata:
  videoId: "6Z4vP0xbjt8"
  title: "Understanding A2UI: How AI Agents Build Real User Interfaces (Not Code)"
  description: "A2UI is an open protocol from Google that lets AI agents generate real, interactive user interfaces without writing code. Instead of generating React or Vue that you can't trust in production, AI describes UI as declarative JSON that your application renders using your own design system components.


    In this video, I explain:

    - Why current approaches to AI-generated UI fall short

    - How A2UI's declarative protocol actually works

    - The security model that makes it production-ready

    - How it differs from tools like Lovable and v0

    - A2UI Bridge: our open-source React implementation


    Full article: https://southleft.com/insights/ai/a2ui-how-ai-agents-build-real-user-interfaces/

    Try the live demo: https://a2ui.southleft.com/demo

    GitHub repo: https://github.com/southleft/a2ui-bridge

    Official A2UI spec: https://a2ui.org

    Google's announcement: https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/


    A2UI Bridge includes 75+ component adapters for both Mantine and ShadCN, so you can see the same AI-generated JSON rendered with different design systems.


    ---


    Southleft is a design engineering consultancy specializing in AI-powered design systems and front-end development. Learn more: https://southleft.com


    And if you're interested in learning more about AI & design systems, please sign up for our AI & Design Systems course - http://aianddesign.systems/"
  channel: "TJ Pitre"
  channelId: "UCh8sqABhksMIhyYST9MEekA"
  duration: "PT19M45S"
  publishedAt: "2026-01-07T15:56:26Z"
  thumbnailUrl: "https://i.ytimg.com/vi/6Z4vP0xbjt8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=6Z4vP0xbjt8"
processedAt: "2026-01-10T19:55:08.291Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "A2UI is an open, declarative protocol that allows AI agents to generate structured JSON “recipes” rather than raw code, enabling the real-time rendering of production-safe UI components directly from an organization's existing design system."
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 4382
  outputTokens: 832
  totalTokens: 5971
  processingTimeMs: 11637
tools:
  - name: "A2UI"
    url: "https://a2ui.org"
  - name: "A2UI Bridge"
    url: "https://github.com/southleft/a2ui-bridge"
  - name: "React"
    url: null
  - name: "Vue"
    url: null
  - name: "Shadcn"
    url: null
  - name: "Mantine"
    url: null
  - name: "v0"
    url: null
  - name: "Lovable"
    url: null
  - name: "Bolt"
    url: null
  - name: "Angular"
    url: null
  - name: "Web Components"
    url: null
categories:
  - "AI & Machine Learning"
  - "Product & Design"
  - "Web Development"
tags:
  - "agents"
  - "api-design"
  - "design-systems"
  - "react"
  - "vue"
tagsNormalizedAt: "2026-03-01T21:19:30.459Z"
---

## Key Takeaways

A2UI shifts the focus from AI-generated code to AI-orchestrated interfaces that are safe for production environments.

* **Declarative Recipes**: The AI outputs a **JSON schema** (a recipe) that describes UI intent and data, which the application then renders using its own pre-approved components.

* **Production Safety**: By separating intent from rendering, A2UI eliminates the security risks and hallucination issues associated with running arbitrary AI-generated code.

* **Design System Fidelity**: Successful implementation requires highly documented and robust **design systems**, as the AI needs a clear inventory of "ingredients" to build valid interfaces.

* **Framework Bridging**: While the core protocol focuses on Web Components, tools like **A2UI Bridge** allow developers to integrate it with React-based libraries like **Shadcn** and **Mantine**.

## Summary

TJ Pitre introduces **A2UI (Agent-to-User Interface)**, a protocol released by Google designed to solve the friction between AI agents and user interfaces. Currently, AI typically interacts with users via text or by generating code snippets that cannot be safely executed in a production environment. A2UI provides a middle ground: a declarative protocol where the AI agent generates a **JSON recipe** instead of raw code.

### The Problem with Current AI UI Generation
Standard AI tools like v0 or Bolt are excellent for prototyping, but they generate code that requires developer review before deployment. In a live application, allowing an AI to generate and execute arbitrary React or Java

Script is a significant security and stability risk. Furthermore, relying on pre-built widgets is often too rigid for the complex, dynamic workflows required in enterprise applications.

### How the A2UI Protocol Works
A2UI functions similarly to HTML as a standardized way to describe structure. When a user gives a command (e.g., "Book a flight from New Orleans to New York"), the AI agent produces a structured JSON object. This object contains:

- **Component IDs**: References to specific elements like a date picker or a flight card.

- **Properties**: Values to populate those components, such as destination names or dates.

- **Layout constraints**: Instructions on how these elements should be arranged.

The host application receives this recipe and maps the IDs to its internal **design system**. This ensures that the UI the user sees is always on-brand, accessible, and functional, as it uses the same components built and tested by the human engineering team.

### Expanding the Ecosystem
Because the official A2UI documentation currently emphasizes Web Components and Angular, Pitre highlights the development of the **A2UI Bridge**. This tool is essential for teams using React-based ecosystems. It acts as an adapter, allowing the AI to generate recipes that specifically align with popular libraries like **Shadcn** or **Mantine**. By using these bridges, developers can ensure that the AI "speaks" the same language as their frontend architecture, allowing for seamless, real-time UI generation within a chat or dashboard interface.

## Context

As AI moves from simple chatbots to autonomous agents, the industry is shifting toward "agentic workflows." A2UI is a critical development for product designers and frontend engineers who need to provide users with actionable tools rather than just text responses. It bridges the gap between the flexibility of LLMs and the rigid requirements of enterprise software security. This protocol is particularly relevant for those building complex dashboards, B2B SaaS platforms, and customer service portals where the interface needs to adapt instantly to user intent without manual coding intervention. It highlights a growing trend where design systems are no longer just static assets but are the functional vocabulary for AI agents.
