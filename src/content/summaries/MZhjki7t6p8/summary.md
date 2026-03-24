---
metadata:
  videoId: "MZhjki7t6p8"
  title: "AI Agents for Beginners – Part 1 (Free Labs)"
  description: "🧪Hands-On Labs for Free: https://kode.wiki/4sp4FMT


    🤖 AI Agents for Beginners - Part 1 (First Half Free on YouTube!) | KodeKloud


    Want to build AI agents but don't know where to start? This is the first half of KodeKloud's\ 

    complete AI Agents for Beginners course available FREE right here on YouTube.\ 

    The full course (Part 2) is coming soon exclusively on KodeKloud.com!


    No fluff. No jargon walls. Just clear, hands-on learning from scratch starting with how\ 

    ChatGPT actually works, all the way to building tool-calling agents in Python.


    ─────────────────────────────────────────

    📌 WHAT YOU'LL LEARN IN THIS VIDEO

    ─────────────────────────────────────────

    ✅ What ChatGPT is and how GPT (Generative Pre-Trained Transformer) works

    ✅ How Large Language Models (LLMs) learn from billions of text examples

    ✅ Tokens & Tokenization - the currency of every LLM interaction

    ✅ Temperature & Sampling - controlling randomness and creativity in AI outputs

    ✅ Context Windows - the LLM's working memory and its hard limits

    ✅ Prompting Techniques - zero-shot, few-shot, chain-of-thought, and role-based prompting

    ✅ Your first LLM API call in Python (just 7 lines of code!)

    ✅ AI Workflows vs. AI Agents\ 

    ✅ When to use workflows vs. agents in production system


    🧪 FREE HANDS-ON LABS INCLUDED - https://kode.wiki/4sp4FMT

    Practice building agents in a real sandbox environment with no credit card, no surprise charges.

    API keys, cloud environments, and everything you need are already set up.


    🚧 FULL COURSE COMING SOON ON KODEKLOUD

    This video covers the first half. Part 2 will be covering agent implementation, multi-agent systems,

    memory & reasoning strategies, and the 🦀OpenClaw open-source agent case study is dropping\ 

    soon exclusively on KodeKloud.com. Subscribe so you don't miss it!


    👉 Start Learning: https://kode.wiki/4ejpqC4


    ⏱️ TIMESTAMPS

    00:00 – Introduction & Course Overview

    02:41 – What is ChatGPT? (GPT Explained)

    08:30 – How Large Language Models (LLMs) Work

    14:30 – Tokens & Tokenization

    20:17 – Temperature & Sampling

    22:53 – Context Windows

    27:52 – Prompting Techniques\ 

    35:09 – Your First LLM Call\ 

    38:35 – Lab 1: Your first API call in Python

    41:47 – When to use an LLM

    45:00 – Roles and Messages

    47:57 – Section 2: Architecture

    48:51 – What are Tools?

    51:34 – Tool Integration

    52:54 – Lab 2: Build a Tool-Calling Application

    54:59 – AI Workflows

    57:34 – Workflows vs. Agents (The Key Difference)

    1:00:58 – When to Use Workflows vs. Agents

    1:00:58 –  Conclusion


    #AIAgents #buildaiagents #LLMTutorial #AIForBeginners #ChatGPT #PromptEngineering #LargeLanguageModels #GenerativeAI #PythonAI #KodeKloud #ToolCalling #AIWorkflows #ContextWindow #Tokenization  #MachineLearning #AIEngineering #MultiAgentSystems  #DeepLearning  #AIArchitecture #GPT #AIForDevelopers #FreeAICourse #BuildAIAgents"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1H7M34S"
  publishedAt: "2026-03-23T14:30:16Z"
  thumbnailUrl: "https://i.ytimg.com/vi/MZhjki7t6p8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=MZhjki7t6p8"
processedAt: "2026-03-24T19:24:20.918Z"
source: "youtube"
tldr: "This beginner-friendly course demystifies AI agents by starting with LLM fundamentals (transformers, tokens, prompting) and progressing to building practical agents with tools, culminating in a hands-on lab where you implement a tool-calling system using the OpenAI API."
tools:
  - name: "OpenAI API"
    url: null
  - name: "OpenAI SDK"
    url: null
  - name: "GPT-4o"
    url: null
  - name: "Claude"
    url: null
  - name: "Gemini"
    url: null
  - name: "Llama"
    url: null
  - name: "OpenClaw"
    url: null
  - name: "Sora"
    url: null
  - name: "Python"
    url: null
  - name: "KodeKloud Labs"
    url: null
  - name: "KodeKloud Code Keys"
    url: null
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "agents"
  - "llm"
  - "machine-learning"
  - "prompt-engineering"
  - "python"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 40207
  outputTokens: 2241
  totalTokens: 42448
  processingTimeMs: 63452
tagsNormalizedAt: "2026-03-24T23:01:11.698Z"
---

## Key Takeaways

This is the first half of a comprehensive course designed to take beginners from zero to building functional AI agents through hands-on labs and clear explanations.

*   **LLMs are text predictors, not knowledge bases:** They generate responses by predicting the next token based on patterns learned from massive datasets, which explains their capabilities and limitations like **hallucinations**.

*   **Core LLM mechanics are practical:** Understanding **tokens** (affect cost/speed), **temperature** (controls randomness), and the **context window** (working memory) is essential for building efficient and cost-effective applications.

*   **Effective prompting is a skill:** Techniques like **system messages** (set behavior), **few-shot examples** (show desired format), and **positive framing** ('be concise' vs. 'don't be verbose') drastically improve output quality and reliability.

*   **Tools transform LLMs into agents:** An LLM alone can only generate text; giving it access to **tools** (functions for search, calculation, API calls) enables it to perform real-world tasks by deciding when to call them in a **tool-use loop**.

*   **Choose the right architecture:** **AI workflows** have predefined steps (predictable, cheaper), while **AI agents** let the LLM decide the next action dynamically (flexible, more complex). Start with a workflow and only use an agent when the path cannot be predetermined.

## Summary

### Introduction and Course Structure

Instructor Bumshad introduces the course as an effort to make AI less intimidating, starting from absolute basics and working up to building AI agents. The course is structured into fundamentals, architecture, implementation, and a case study on the open-source agent OpenClaw. Learners will build four agents (Zippy, Savvy, Meshy, Cody) and get hands-on access to lab environments with API keys and sandbox environments provided.

### LLM Fundamentals: What is GPT?

The course begins by demystifying ChatGPT, explaining it as a chat interface powered by the GPT (Generative Pre-trained Transformer) model. The **transformer architecture**, introduced in Google's 2017 "Attention Is All You Need" paper, gave AI the 'attention' mechanism to understand relationships between all words in a sentence simultaneously, leading to a dramatic improvement in language understanding.

GPT is **pre-trained** on billions of pages of text, learning patterns (not facts) by playing a 'guess the next word' game. This is why it can **generate** new text but also **hallucinate**. The evolution from GPT-1 to GPT-4o is outlined, alongside other LLM families like Claude, Gemini, and the open-source Llama.

### Understanding Scale: Why LLMs are 'Large'

LLMs are large in two ways: massive training data (GPT-3 was trained on ~125 times all of English Wikipedia) and billions of **parameters**. Parameters are internal numbers tuned during training; they start random and are 'nudged' billions of times based on prediction errors until the model understands language. More parameters generally mean better performance but also higher cost and slower speed.

Key LLM limitations are highlighted: they are bad at precise calculation, have knowledge cutoffs, and, crucially, **can only produce text** without tools.

### Practical Mechanics: Tokens, Temperature, and Context

Developers interact with LLMs via **APIs**. Text is broken into **tokens** (sometimes whole words, sometimes parts), which directly affect cost, speed, and context limits. A rule of thumb: 1 token ≈ 4 characters. Output tokens are more expensive than input tokens because they are generated sequentially.

**Temperature** (0 to 2) controls randomness. At 0, responses are deterministic; at higher values, they become more creative/variable. For agents, lower temperatures are generally better for reliable decisions.

The **context window** is the LLM's working memory, a hard limit on tokens it can process at once. It includes system instructions, conversation history, and the model's output. When exceeded, older messages are typically truncated. Larger windows (up to 1M+ tokens in modern models) enable complex tasks but increase cost per call.

### The Art of Prompting

Prompting is about shaping which patterns in the model get activated. The API uses three message **roles**: **system** (developer instructions), **user** (human input), and **assistant** (model's previous replies). Effective techniques include:

*   **Positive framing**: 'Be concise' works better than 'Don't be verbose'.

*   **Few-shot prompting**: Providing an example of the desired input/output format dramatically improves results.

*   **Chain-of-thought**: Guiding the model to reason step-by-step.

*   **Assigning a role**: 'You are a senior Python developer' activates relevant patterns.

### Hands-On Coding: Your First API Call

The theory is put into practice with a simple 7-line Python program using the **OpenAI SDK**. The code imports the library, creates a client with an API key, sends a messages list to `client.chat.completions.create()`, and prints the response. This concrete example maps every previous concept (model, tokens, temperature, prompts, context) to actual code.

### Lab: Running Your First LLM Program

Learners are guided to a free lab environment where they run the code themselves, experimenting with changing prompts and observing the direct effects of adjusting the **temperature** parameter from 0 (deterministic) to 1 (creative).

### When to Use an LLM vs. Regular Code

A critical design principle is introduced: **Use an LLM for tasks requiring judgment, language understanding, or non-deterministic output. Use regular code for deterministic tasks where the same input always produces the same output.** Using an LLM unnecessarily is slower, costs money, and can be unpredictable. The future pattern for agents is letting the LLM think and decide, while tools (regular code) execute.

### Multi-Turn Conversations and Roles

The messages list is designed for full conversations. The **system role** sets behavior invisibly to the user. The **assistant role** is used to feed the model's previous replies back into the history, simulating memory because the API is stateless. This three-role system gives developers full control over the interaction.

### Architecture: Tools and the Tool-Use Loop

This section transitions from theory to making LLMs 'do things.' A **tool** is a function (search, calculation, API call) that an LLM can call to interact with the outside world. The **tool-use loop** (or function calling) works as follows: 1) User asks a question, 2) LLM decides it needs data and outputs a structured tool call request, 3) Your code executes the function, 4) The result is sent back to the LLM, 5) LLM generates a final answer for the user. The LLM never executes code; it only requests it.

### Lab: Building a Tool-Calling Application

In a second lab, learners build a Python application where the LLM decides to call a tool. They define a tool schema (e.g., `check_calendar`), write a mock handler function, and implement the dispatcher logic. They run the loop: the LLM requests the tool, their code runs it and appends the result, and the LLM formulates the final answer.

### AI Workflows vs. AI Agents

The course distinguishes between two system design patterns. **AI workflows** have predefined steps orchestrated by developer code (e.g., sequential chains, parallel tasks, routing). **AI agents** let the LLM decide the next step dynamically based on what it discovers, operating in a loop. The choice is a spectrum. Workflows are predictable, debuggable, and cost-controlled. Agents are flexible and needed for open-ended tasks where the path can't be predetermined.

### Decision Framework: When to Use Which

A practical framework is provided: Start simple. Use a single LLM call if possible, then a workflow, and only consider an agent if needed. Ask: 1) Can I define all possible paths in advance? 2) Does the LLM need to decide what to do next? 3) Is this a well-defined, repeatable task? 4) Does cost need to be strictly controlled? The best systems often combine both, using workflows for predictable parts and agents for flexible exploration.

## Context

This video is Part 1 of the "AI Agents for Beginners" course by KodeKloud, an established platform known for its hands-on DevOps, cloud, and now AI training. Instructor Bumshad Manumbat brings KodeKloud's practical, lab-focused teaching methodology to the complex and often overwhelming field of AI. This content is highly relevant as AI agents move from research to practical implementation, creating demand for accessible, foundational knowledge. The course cuts through hype by providing a structured, ground-up understanding of the components that make agents work. It is perfectly suited for developers, engineers, or technically curious individuals with basic programming knowledge (Python is used) who want to move from using chatbots to building their own AI-powered applications and understand the architectural decisions involved.