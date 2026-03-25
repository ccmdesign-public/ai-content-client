---
metadata:
  videoId: "suofdHGszEI"
  title: "AWS AI Practitioner Question 33"
  description: "Solving Bedrock issues like excessive length, competitor mentions, and hallucinations requires a targeted three-pronged strategy: Inference Parameters, Guardrails, and RAG. While Fine-tuning is expensive and System Prompts are often bypassed, setting the Max Tokens inference parameter at the API level ensures strict length control. \ 

    To block competitor names, Amazon Bedrock Guardrails provides a managed filtering layer, while Retrieval-Augmented Generation (RAG) grounds the model in your actual product data to eliminate hallucinations. This modular approach delivers professional, fact-checked results far more reliably than simply asking the model to 'behave' via a prompt.


    #AWS #GenerativeAI #AmazonBedrock #RAG #AIPractitioner #CloudComputing #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M47S"
  publishedAt: "2026-03-25T10:35:36Z"
  thumbnailUrl: "https://i.ytimg.com/vi/suofdHGszEI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=suofdHGszEI"
processedAt: "2026-03-25T14:45:23.707Z"
source: "youtube"
tldr: "To address AI-generated text issues (length, competitor mentions, hallucinations) on Amazon Bedrock, the solution is a combination of three specific techniques: setting max tokens for length control, using Guardrails for content filtering, and implementing RAG for grounding."
tools:
  - name: "Amazon Bedrock"
    url: null
  - name: "Amazon Bedrock Guardrails"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
tags:
  - "ai-general"
  - "aws"
  - "prompt-engineering"
  - "rag"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2343
  outputTokens: 491
  totalTokens: 2834
  processingTimeMs: 17004
tagsNormalizedAt: "2026-03-25T14:52:09.699Z"
---

## Key Takeaways

This video explains how to solve three common problems when generating content with Amazon Bedrock's AI models.

## Summary

The video presents a scenario where a marketing team using Amazon Bedrock encounters three specific issues with generated product descriptions: text is too long, includes competitor names, and hallucinates non-existent product features.

The presenter systematically analyzes each problem and the available solutions. Fine-tuning the foundation model is dismissed as expensive and ineffective for length control or competitor filtering. Switching to a smaller model is rejected because it doesn't solve hallucination or filtering, and may reduce quality. Using only system prompts is considered unreliable for strict enforcement, as the model can still ignore them.

The correct solution is identified as Option 2, which combines three purpose-built AWS techniques:

*   **Setting max tokens** in the inference parameters provides reliable, API-level control over output length.

*   **Using Amazon Bedrock Guardrails** with word filters reliably blocks the mention of competitor names.

*   **Implementing Retrieval-Augmented Generation (RAG)** with a product database grounds the model in real product data, preventing hallucinated features.

Each tool directly addresses one of the three distinct problems, making this the most effective and reliable combination.

## Context

This video is part of a series preparing for the AWS AI Practitioner certification exam. It demonstrates practical problem-solving for real-world AI application challenges, specifically around controlling generative AI outputs in a business context. Understanding these techniques is crucial for developers and architects implementing enterprise-grade, reliable AI solutions on AWS.