---
metadata:
  videoId: "TmqI-pX9aho"
  title: "Google's Agent Upgrade"
  description: "In this video, we look at the recent updates to Google's Opal agent system. How it's now set up to take advantage of the Gemini 3 models and how you can use it to build simple apps and agents\ 


    Blog: https://blog.google/innovation-and-ai/models-and-research/google-labs/opal-agent/


    For more tutorials on using LLMs and building agents, check out my Patreon

    Patreon: https://www.patreon.com/SamWitteveen

    Twitter: https://x.com/Sam_Witteveen\ 


    🕵️ Interested in building LLM Agents? Fill out the form below

    Building LLM Agents Form: https://drp.li/dIMes


    👨‍💻Github:

    https://github.com/samwit/llm-tutorials


    ⏱️Time Stamps:

    00:00 Intro

    00:40 Google Labs

    02:40 Opal: Agent Step Blog

    05:49 Opal: New Tools

    07:57 Demo"
  channel: "Sam Witteveen"
  channelId: "UC55ODQSvARtgSyc8ThfiepQ"
  duration: "PT15M20S"
  publishedAt: "2026-02-27T13:30:30Z"
  thumbnailUrl: "https://i.ytimg.com/vi/TmqI-pX9aho/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=TmqI-pX9aho"
processedAt: "2026-03-10T14:51:47.564Z"
source: "youtube"
tldr: "Google Labs has significantly upgraded Opal, its no-code visual builder for AI agents, introducing features like a dynamic 'generate step' for interactive workflows, cross-session memory, dynamic routing, and 'interactive chat' for human-in-the-loop interactions. These enhancements reflect the growing capabilities of large language models like Gemini 3, allowing for more autonomous and adaptable a"
tools:
  - name: "Opal"
    url: null
  - name: "NotebookLM"
    url: null
  - name: "Pomelli"
    url: null
  - name: "Stitch"
    url: null
  - name: "Gemini"
    url: null
  - name: "Claude"
    url: null
  - name: "CrewAI"
    url: null
  - name: "LangGraph"
    url: null
  - name: "Google Calendar"
    url: null
  - name: "YouTube"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "automation"
  - "llm"
ai:
  provider: "openrouter"
  model: "openrouter/google/gemini-2.5-flash"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 11866
  outputTokens: 1256
  totalTokens: 13122
  processingTimeMs: 45000
tagsNormalizedAt: "2026-03-10T16:42:18.916Z"
---

## Key Takeaways

Google's Opal, a no-code visual builder, has received a major upgrade, transforming it into a more powerful and flexible tool for creating AI agents:

* The new **'generate step'** allows agents to proactively determine their own path and trigger appropriate tools and models, moving beyond static, 'on-rails' workflows to more **interactive experiences**.

* **Cross-session memory** enables Opals to learn and personalize over time, making agents smarter and more context-aware.

* **Dynamic routing** empowers the underlying model to make decisions about traversing workflow nodes, similar to advanced frameworks like LangGraph, but now accessible in a consumer-friendly product.

* **Interactive chat** incorporates human-in-the-loop functionality, allowing agents to ask follow-up questions and gather more information from users for improved reliability and user experience.

## Summary

Google Labs has rolled out a significant update to **Opal**, its no-code visual builder for AI agents. Initially a drag-and-drop workflow tool, Opal is evolving into a sophisticated platform for creating autonomous agents, reflecting the advancements in generative AI models like **Gemini 3**. The update introduces several key features that move agent development towards more dynamic and interactive capabilities.

### Key New Features

One of the most impactful additions is the **'generate step'**. Previously, agent workflows were often static and 'on-rails,' meaning they followed a predefined sequence. With the generate step, agents can now proactively determine the best path to achieve a goal, triggering relevant tools and models as needed. This shift is enabled by the improved decision-making and planning capabilities of newer LLMs, allowing agents to adapt and respond more flexibly.

Another crucial enhancement is the introduction of **cross-session memory**. Opals can now remember information across different user interactions, enabling them to grow smarter and offer more personalized experiences over time. While the technical implementation details are not fully disclosed, this feature is vital for building agents that can maintain context and learn from past interactions.

### Advanced Agent Capabilities

The update also brings **dynamic routing**, where the underlying model is responsible for deciding how to navigate through the various nodes and steps within a workflow. This capability, reminiscent of features found in advanced frameworks like LangGraph, is now made accessible to a broader audience through Opal's user-friendly interface. This means agents can make more intelligent choices about their execution flow based on real-time conditions and user input.

Finally, **interactive chat** integrates a crucial human-in-the-loop component. This allows agents to pause and ask users for clarification or additional information when needed, significantly enhancing the agent's reliability and ability to handle ambiguous situations. This feature transforms agent interactions into more collaborative experiences, ensuring better outcomes.

### Practical Application

The video demonstrates building an Opal to find events in a specific city. The user can define initial parameters (city name) and later refine the search by adding preferences (e.g., event types, family status). The platform automatically constructs the workflow, utilizing tools like web search, and renders the results as a webpage. This showcases how users can create complex, personalized agents without writing any code. Google Labs is actively shipping new ideas, with **NotebookLM** being a notable success, and Opal's evolution is part of Google's strategy to democratize access to generative AI, allowing users to build and share their own agents and explore practical applications of the technology.

## Context

The rapid advancements in large language models (LLMs) are fundamentally changing how AI agents are designed and built. Google's update to Opal is a significant move in this direction, democratizing access to agent creation for a broader audience. This matters because it allows individuals and businesses without deep coding expertise to leverage sophisticated AI for tasks like personalized information retrieval, automated content generation, and interactive assistance. By making agent development more accessible and enabling agents to be more autonomous and adaptive, Google is fostering innovation and exploring the practical applications of generative AI in everyday scenarios. This also helps Google gather data on popular agent use cases, which can inform future product development and model improvements.