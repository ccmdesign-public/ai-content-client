---
metadata:
  videoId: "mwzk2rlwtZE"
  title: "Build a Real-Time AI Sales Agent - Sarah Chieng & Zhenwei Gao, Cerebras"
  description: "Learn how to build a sophisticated real-time voice sales agent that can have natural conversations with potential customers. You'll create both single-agent and multi-agent systems where specialized AI assistants handle sales, technical support, and pricing inquiries.

    https://twitter.com/SarahChieng

    Timestamps

    0:21 Introduction to the Workshop & Sales Agent Concept

    1:18 Workshop Benefits & Starter Code

    2:01 Introduction to Cerebras and its Hardware

    3:34 Cerebras Hardware Innovations (Memory Bandwidth)

    6:56 Software Innovations (Speculative Decoding)

    8:10 Recap of Hardware and Software Optimizations

    8:42 The Power of Voice Agents in Customer Interaction

    9:57 Key Capabilities of Voice Agents

    10:24 Applications of Voice Agents (Customer Service, Sales, Tech Support)

    10:39 Inside a Voice Agent: Breaking Down the Conversation

    10:46 Phase 1: Listening (Speech to Text & End of Utterance Detection)

    11:38 Phase 2: Thinking (Large Language Model & Context Pulling)

    12:04 Phase 3: Speaking (Text to Speech & Real-time Responses)

    12:26 LiveKit Agent SDK for Orchestration

    12:56 Installing Necessary Packages (LiveKit, Cartesia, OpenAI)

    13:21 Cerebras Speed Comparison

    14:07 Installing LiveKit CLI (Optional)

    14:50 Understanding LiveKit and WebRTC

    15:44 LiveKit Applications (Meetings, Call Centers, Websites)

    16:17 Integrating Cerebras, LiveKit, and Cartesia

    16:32 Step 2: Teaching the AI Sales Agent about the Business

    16:45 Minimizing Hallucinations with Custom Context

    17:10 Loading Business Information (Pricing, Product Descriptions, Objections)

    17:58 Structured Format for AI Context

    18:13 Step 3: Creating the Sales Agent (Code Walkthrough)

    18:54 Implementing the Sales Agent Class (Prompting, Context, Initialization)

    19:48 Defining the on_enter Method for Conversation Start

    20:11 Step 4: Launching and Running the Agent

    20:55 Expanding the Sales Agent: Multi-Agent Systems

    21:16 Types of Specialized Agents (Greeting, Sales, Technical, Pricing)

    22:10 Agent Handoff in Multi-Agent Systems

    22:37 Adding Tool Calling

    22:50 Conclusion & Q&A"
  channel: "AI Engineer"
  channelId: "UCLKPca3kwwd-B59HNr-_lvA"
  duration: "PT23M24S"
  publishedAt: "2026-01-16T14:00:06Z"
  thumbnailUrl: "https://i.ytimg.com/vi/mwzk2rlwtZE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=mwzk2rlwtZE"
processedAt: "2026-01-16T15:23:07.706Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Cerebras engineers demonstrate how to build high-speed, real-time voice sales agents by combining wafer-scale hardware with low-latency orchestration.

  - **Cerebras WSE-3** eliminates memory bandwidth bottlenecks to provide 20-70x faster inference than traditional GPUs

  - **LiveKit & Cartisia** facilitate sub-100ms latency using WebRTC and specialized voice synthesis

  - **Multi-agent routing** allows\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5325
  outputTokens: 946
  totalTokens: 7370
  processingTimeMs: 16166
tools:
  - name: "Cerebras Inference"
    url: null
  - name: "LiveKit"
    url: null
  - name: "WebRTC"
    url: null
  - name: "Cartesia"
    url: null
  - name: "OpenAI"
    url: null
  - name: "LiveKit Agent SDK"
    url: null
  - name: "LiveKit CLI"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Web Development"
tags:
  - "agents"
  - "api-design"
  - "llm"
  - "python"
tagsNormalizedAt: "2026-03-01T21:19:30.548Z"
---

## Key Takeaways

Building responsive AI voice agents requires a specialized stack that prioritizes low-latency throughput and structured context management.

* **Cerebras Inference** solves the "memory wall" by using on-chip SRAM for all 900,000 cores, allowing models like Llama 3.3 to run at unprecedented speeds.

* **Live

Kit Orchestration** utilizes **WebRTC** instead of HTTP to ensure audio streams remain resilient and fast enough for natural human-to-AI interaction.

* **Context Injection** is critical for sales; providing the LLM with structured product data and objection handlers minimizes hallucinations and keeps the agent on-message.

* **Speculative Decoding** is used as a software optimization, pairing a fast draft model with a large verification model to achieve the speed of the former and the accuracy of the latter.

## Summary

The workshop focuses on the transition from text-based chatbots to stateful, real-time voice agents. Sarah Chieng and Zhenwei Gao highlight that the primary barrier to natural AI conversation is latency, which they address through both hardware and software innovations.

### Hardware: The Wafer Scale Engine

Cerebras introduces the **WSE-3**, a processor the size of a dinner plate with 4 trillion transistors. Unlike NVIDIA GPUs (like the H100) that store weights and KV cache in off-chip memory, Cerebras integrates memory directly onto each of its 900,000 cores. This architecture eliminates the **memory bandwidth bottleneck**, enabling inference speeds significantly faster than traditional hardware. This speed is what allows an AI to "think" fast enough to prevent awkward silences in voice calls.

### The Voice Agent Architecture

A functional voice agent consists of three main phases: listening, thinking, and speaking.

- **Listening:** Uses **Speech-to-Text (STT)** and **Voice Activity Detection (VAD)**. A small CPU-based model predicts if a user has finished their thought to prevent the AI from interrupting the speaker prematurely.

- **Thinking:** The transcribed text is passed to an LLM (e.g., Llama 3.3). Here, the system uses **Context Loading** to provide the agent with pricing sheets and product manuals, ensuring it has domain-specific knowledge.

- **Speaking:** **Text-to-Speech (TTS)** engines like Cartisia stream audio back to the user in real-time as tokens are generated.

### Implementation and Orchestration

The presenters recommend **Live

Kit** for managing the complex orchestration of these components. Live

Kit uses **WebRTC**, a protocol designed for real-time communication, ensuring that the round-trip latency stays below 100ms. 

### Multi-Agent Systems for Scale

For enterprise applications, a single agent often lacks the context window or specialization needed for complex sales cycles. The workshop details a **multi-agent workflow**:

- **Greeting Agent:** Filters the initial intent and acts as a router.

- **Technical Specialist:** Handles API and integration deep-dives.

- **Pricing Specialist:** Manages budget, ROI calculations, and negotiations.
This handoff mechanism ensures that users always speak to the most qualified "virtual expert" for their specific query.

## Context

This workshop is highly relevant for developers and enterprises looking to automate customer-facing roles like sales, tech support, and call centers. As LLM intelligence plateaus across different providers, the competitive frontier has shifted toward speed and 'human-like' interaction. Cerebras represents a significant shift in the hardware landscape, challenging NVIDIA's dominance by optimizing specifically for the inference phase of the AI lifecycle. This reflects a broader trend toward hardware-software co-design, where specialized silicon (like WSE-3) and low-latency protocols (like WebRTC) are required to move AI from a novelty tool to a seamless, invisible part of the digital infrastructure.
