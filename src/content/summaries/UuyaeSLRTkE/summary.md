---
metadata:
  videoId: "UuyaeSLRTkE"
  title: "\"okay, but I want Gemini3 to perform 10x for my specific use case\" - Here is how"
  description: "Best Claude/Gemini prompt collection: https://clickhubspot.com/f99e63


    🔗 Links

    - Try Superdesign agent: http://superdesign.dev/

    - Get the UI design prompt: https://www.aibuilderclub.com/

    - Follow me on twitter: https://twitter.com/jasonzhou1993


    ⏱️ Timestamps

    0:00 Gemini3 prompt examples

    0:32 How Anthropic 10x Sonnet 4.5 frontend design skill

    04:55 3 step prompt guide process

    07:25 Case study - train model excalidraw generation



    👋🏻 About Me

    My name is Jason Zhou, a product designer who shares interesting AI experiments & products. Email me if you need help building AI apps! ask@ai-jason.com


    #cursor #generativeai #gpt5 #autogen #gpt4 #playwright  #ai #artificialintelligence #tutorial #stepbystep #openai #llm #chatgpt  #largelanguagemodels #largelanguagemodel #bestaiagent #chatgpt #agentgpt #agent #babyagi #vercelaisdk"
  channel: "AI Jason"
  channelId: "UCrXSVX9a1mj8l0CMLwKgMVw"
  duration: "PT12M33S"
  publishedAt: "2025-11-23T10:45:05Z"
  thumbnailUrl: "https://i.ytimg.com/vi/UuyaeSLRTkE/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=UuyaeSLRTkE"
processedAt: "2026-01-12T23:31:59.609Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
playlistName: "AI Summaries"
category: "ai"
tldr: "Maximize **Gemini 3** and reasoning models by moving beyond context-heavy prompting toward systematic steerability.\ 

  - **Identify Convergent Defaults**: Target the model's 'boring' baseline behaviors

  - **Root Cause Analysis**: Use 'debug mode' to understand why the model fails

  - **Right Altitude**: Provide logical reasoning principles rather than rigid, over-fitted rules\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3220
  outputTokens: 859
  totalTokens: 5383
  processingTimeMs: 14759
tools:
  - name: "Gemini 3"
    url: null
  - name: "Anthropic Sonnet"
    url: null
  - name: "Superdesign"
    url: "http://superdesign.dev/"
  - name: "Excalidraw"
    url: null
  - name: "HubSpot"
    url: "https://clickhubspot.com/f99e63"
  - name: "Cursor"
    url: null
  - name: "AutoGen"
    url: null
  - name: "Playwright"
    url: null
  - name: "Vercel AI SDK"
    url: null
  - name: "AI Builder Club"
    url: "https://www.aibuilderclub.com/"
categories:
  - "AI & Machine Learning"
  - "Programming"
tags:
  - "ai-coding"
  - "best-practices"
  - "gemini"
  - "llm"
  - "prompt-engineering"
tagsNormalizedAt: "2026-03-01T21:19:30.444Z"
---

## Key Takeaways

Gemini 3's reasoning architecture changes how users must interact with AI to achieve high-performance results.

* **Reasoning Tokens** change the game; unlike standard LLMs, providing too much context can cause Gemini 3 to over-analyze and degrade in performance.

* **Convergent Defaults** are the 'safe' but generic choices models make by default; identifying these is the first step to 10x output.

* **Right Altitude Prompting** involves giving the AI the 'why' behind a desired behavior rather than just a checklist of 'what' to do, preventing overfitting.

* **Systematic Iteration** using a 'debug mode' allows you to pinpoint specific knowledge gaps in the model's training data to provide better alternatives.

## Summary

The video explores how to optimize **Gemini 3**, a reasoning-heavy model that behaves differently than previous generations. Jason highlights that while Gemini 3 has incredible coding and design capabilities, it is highly sensitive to the 'altitude' of instructions. Because it generates **internal reasoning tokens**, long and overly complex prompts can actually hinder its performance by forcing it to over-process irrelevant variables. Instead, the focus should be on creating concise, highly steerable prompts.

### Overcoming Generic Outputs
Jason introduces the concept of **Convergent Defaults**—the tendency for models to revert to safe, boring design or logic choices (like using 'Roboto' fonts or generic layouts) because they dominate the training data. To fix this, he references Anthropic's method of building 'skills.' This involves identifying exactly where the model's default behavior falls short—such as typography or animation—and providing concrete, high-quality alternatives within the system prompt.

### The Three-Step Optimization Process
To systematically improve model output for specific use cases like **Excalidraw wireframing**, Jason outlines a three-step loop:
1. **Identify Gaps**: Run the model with minimal instructions to see where it defaults to incorrect or generic patterns.
2. **Root Cause Analysis**: Use a 'debug mode' by asking the model to explain its reasoning (e.g., 'Why did you set the width to zero?') without generating a new output. This reveals defects in the model's internal logic.
3. **Provide Logical Alternatives**: Instead of creating a list of 50 rigid rules, provide the **underlying principle** or reasoning the model should follow. This keeps the prompt at the 'right altitude,' making it robust enough for long-tail scenarios without overfitting.

### Practical Applications
By applying these techniques, Jason demonstrates how to turn a mediocre UI generator into a high-end design agent. He highlights the importance of using **XML formatting** for better context handling and shows how these methods are used in his tool, Superdesign.dev, to create creative, professional-grade wireframes and UI components. He also notes that these principles apply to business workflows, such as using **Hub

Spot connectors** to ground model outputs in real CRM context for personalized results.

## Context

As the industry shifts toward reasoning-focused models like Gemini 3 and OpenAI's o1, traditional prompt engineering—which often relied on massive context 'stuffing'—is becoming obsolete. This video is crucial for developers and AI implementers who find that their agents are producing 'average' or 'generic' results despite using powerful models. It connects to the broader trend of 'AI Skills' and modular prompting, where specific, highly-tuned instructions are treated as reusable software components to achieve professional-grade performance in specialized fields like UI/UX design and data analysis.
