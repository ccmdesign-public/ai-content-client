---
metadata:
  videoId: "Qt3zMBH-FNg"
  title: "Gemini 3.1 Flash Live Just Changed Voice Agents Forever"
  description: "Full courses + unlimited support: https://www.skool.com/ai-automation-society-plus/about

    All my FREE resources: https://www.skool.com/ai-automation-society/about

    Apply for my YT podcast: https://podcast.nateherk.com/apply

    Work with me: https://uppitai.com/


    My Tools💻

    14 day FREE n8n trial: https://n8n.partnerlinks.io/22crlu8afq5r

    Code NATEHERK to Self-Host Claude Code for 10% off (annual plan): https://www.hostinger.com/vps/claude-code-hosting

    Voice to text: https://ref.wisprflow.ai/nateherk


    Google just dropped Gemini 3.1 Flash Live, their new speech-to-speech voice model. In this video, I break down what makes it different, try it out for free in Google AI Studio, and then use Claude Code to build two working demos: a voice agent embedded on a website and a personal assistant that connects to my calendar and ClickUp. I also cover pricing, current limitations, and what it takes to actually deploy something like this.


    Sponsorship Inquiries:

    📧 sponsorships@nateherk.com


    TIMESTAMPS\ 

    0:00 Intro

    1:01 What Is Gemini 3.1 Flash Live

    3:14 Trying It Free in Google AI Studio

    4:56 Custom Voice Agents

    6:05 Webcam & Vision Demo

    8:01 Function Calling & Tools

    10:02 Building Two Apps With Claude Code

    15:20 Pricing & Deployment

    18:30 Final Thoughts"
  channel: "Nate Herk | AI Automation"
  channelId: "UC2ojq-nuP8ceeHqiroeKhBA"
  duration: "PT18M42S"
  publishedAt: "2026-03-28T04:02:55Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Qt3zMBH-FNg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Qt3zMBH-FNg"
processedAt: "2026-03-28T17:48:00.308Z"
source: "youtube"
tldr: "Google's Gemini 3.1 Flash Live introduces native speech-to-speech architecture, eliminating transcription latency and improving multi-step function calling by 19% over Gemini 2.5 Flash. The creator demonstrates using Claude Code to build custom website and ClickUp API integrations via websockets in under 30 minutes, highlighting a paid tier cost of roughly 14 cents per 10-minute call."
tools:
  - name: "Gemini 3.1 Flash Live"
    url: null
  - name: "Gemini 2.5 Flash"
    url: null
  - name: "Claude Code"
    url: null
  - name: "Google AI Studio"
    url: null
  - name: "ClickUp"
    url: null
  - name: "11 Labs"
    url: null
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tags:
  - "agents"
  - "ai-general"
  - "automation"
  - "claude"
  - "gemini"
  - "llm"
ai:
  provider: "notebooklm"
  model: "notebooklm"
  apiCalls: 1
  fallbackAttempts: 0
  processingTimeMs: 39023
tagsNormalizedAt: "2026-03-28T18:09:21.204Z"
---

## Key Takeaways

Here are the most important takeaways regarding Google's new voice model and its integration:

* **Gemini 3.1 Flash Live** uses a native **speech-to-speech** architecture, enabling lower latency, natural interruptions, and the ability to detect emotional nuances like sarcasm.

* Developers can use **Claude Code** to quickly build custom applications, successfully creating an e-commerce widget and a **ClickUp** calendar assistant in under 30 minutes.

* Integrating the model outside of **Google AI Studio** requires managing a persistent server process using **websockets**, which is more complex than plug-and-play solutions like **11 Labs**.

* A current limitation is synchronous **function calling**, where the agent pauses in silence while waiting for a tool response instead of maintaining the conversation.

## Summary

Nate Herk explores Google's latest voice model, Gemini 3.1 Flash Live, highlighting its potential to revolutionize AI automation. The model introduces significant upgrades to natural conversation flow, real-time vision, and function calling capabilities.

### Native Audio and Vision

The most impactful change in Gemini 3.1 Flash Live is its native speech-to-speech architecture. By removing the intermediate speech-to-text transcription step, the model drastically reduces latency and enables true conversational interruptions without awkward overlap. It also gains deep contextual awareness from the raw audio, allowing it to understand vocal nuances like sarcasm and frustration that text alone cannot convey.

* The model boasts a 19% improvement in multi-step function calling compared to the previous Gemini 2.5 Flash model.

* It operates effectively in noisy environments, successfully filtering out background distractions like heavy traffic or loud restaurants.

* Real-time vision capabilities allow it to identify specific hardware, such as a **Shure MV7** microphone, or guide users through physical tasks like repairing a broken pair of scissors.

### Building with Claude Code

While developers can test the model easily and for free within **Google AI Studio**, deploying it to custom production environments requires dedicated technical integration. The creator demonstrates how to leverage **Claude Code** to rapidly prototype these custom applications. By providing the AI coding assistant with the official API documentation, he built two functioning local host demos in under 30 minutes:

* **Apex**: A mock mechanical keyboard e-commerce website featuring an embedded Gemini voice assistant widget to help customers choose products.

* **Arya**: A personal assistant integrated with **ClickUp** and a calendar API to autonomously read task queues and schedule dedicated research blocks.

Because the Gemini Live API relies on persistent websockets, deploying these tools to live production requires managing backend server processes. This makes custom implementations slightly more complex than using managed, plug-and-play voice solutions like **11 Labs**.

### Pricing and Current Limitations

The new model remains highly accessible for developers. It offers a free tier in Google AI Studio, though user data on this tier is utilized for Google's product improvement. The paid tier provides enterprise-grade privacy, context caching, and higher rate limits, with usage costing approximately 14 cents for a standard 10-minute voice call.

Despite the massive conversational advancements, the model currently has one notable limitation regarding its function calling logic. When the agent triggers an external tool or API, it pauses synchronously and waits in complete silence for the response. In the future, voice models will likely speak seamlessly while calling functions in the background to avoid these awkward pauses.

## Context

The transition to native speech-to-speech models marks a critical evolution in AI automation. By eliminating transcription latency and adding emotional intelligence, tools like Gemini 3.1 Flash Live enable businesses to deploy highly realistic customer service and sales agents that can handle interruptions naturally. This shift matters significantly for developers and agency owners, who must now learn to orchestrate persistent websocket connections to integrate these advanced multimodal models into websites and phone systems. Moving beyond simple chat interfaces to fully autonomous voice assistants unlocks entirely new paradigms for hands-free productivity and human-computer interaction.