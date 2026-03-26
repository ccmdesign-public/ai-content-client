---
metadata:
  videoId: "sLkZJ6yKXgg"
  title: "AWS AI Practitioner Question 33"
  description: "Solving Bedrock issues like excessive length, competitor mentions, and hallucinations requires a targeted three-pronged strategy: Inference Parameters, Guardrails, and RAG. While Fine-tuning is expensive and System Prompts are often bypassed, setting the Max Tokens inference parameter at the API level ensures strict length control. \ 

    To block competitor names, Amazon Bedrock Guardrails provides a managed filtering layer, while Retrieval-Augmented Generation (RAG) grounds the model in your actual product data to eliminate hallucinations. This modular approach delivers professional, fact-checked results far more reliably than simply asking the model to 'behave' via a prompt.


    #AWS #GenerativeAI #AmazonBedrock #RAG #AIPractitioner #CloudComputing #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M47S"
  publishedAt: "2026-03-26T16:01:18Z"
  thumbnailUrl: "https://i.ytimg.com/vi/sLkZJ6yKXgg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=sLkZJ6yKXgg"
processedAt: "2026-03-26T21:10:07.190Z"
source: "youtube"
tldr: "To solve three common generative AI problems in Amazon Bedrock—excessive output length, inclusion of competitor names, and hallucination of features—use a combination of max tokens inference parameters for length control, Amazon Bedrock Guardrails for content filtering, and Retrieval-Augmented Generation (RAG) for grounding in factual product data."
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
  - "llm"
  - "machine-learning"
  - "prompt-engineering"
  - "rag"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2343
  outputTokens: 829
  totalTokens: 3172
  processingTimeMs: 25491
tagsNormalizedAt: "2026-03-26T21:33:34.766Z"
---

## Key Takeaways

This video explains the correct combination of Amazon Bedrock techniques to address multiple issues in AI-generated content. The key takeaways are:

- **Address each problem with a specific tool**: Use inference parameters (max tokens) for output length control, **Amazon Bedrock Guardrails** for content filtering of competitor names, and **Retrieval-Augmented Generation (RAG)** to ground responses in factual data and prevent hallucinations.

- **Avoid less effective solutions**: Fine-tuning is expensive and doesn't solve length or filtering issues directly, switching to smaller models reduces quality without solving core problems, and system prompts are unreliable for strict enforcement.

- **The correct answer is a multi-tool approach**: Option 2—combining Guardrails, max tokens, and RAG—provides purpose-built solutions for each of the three identified problems in the exam scenario.

## Summary

This AWS AI Practitioner exam preparation video analyzes a scenario where a marketing team uses Amazon Bedrock to generate multilingual product descriptions but encounters three specific problems: outputs that are too long, inclusion of competitor names, and hallucination of non-existent product features.

The presenter methodically breaks down each problem and evaluates four potential solution combinations. For text that's too long, the team needs **output length control**. For competitor name inclusion, they require **content filtering**. For feature hallucination, they need **grounding in real product data**.

### Solution Evaluation

**Option 1: Fine-tune the foundation model on company product catalogs**
- This approach is expensive and doesn't directly address length control or competitor filtering

- Fine-tuning primarily improves model performance on specific tasks but doesn't enforce constraints

**Option 3: Switch to a smaller model with shorter default outputs**
- Smaller models don't solve hallucination or competitor filtering problems

- This approach might reduce overall output quality while failing to address core issues

**Option 4: Add system prompts instructing the model**
- System prompts can help but aren't reliable for strict enforcement

- Models can still ignore length limits and mention competitors despite prompts

### The Correct Solution

**Option 2: Use Bedrock Guardrails for word filtering, set max tokens inference parameters, and implement RAG with a product database**
- **Max tokens inference parameters** control output length at the API level

- **Amazon Bedrock Guardrails** provide reliable word filtering to block competitor names

- **Retrieval-Augmented Generation (RAG)** grounds the model in actual product data from a database, preventing hallucinated features

This combination provides three purpose-built solutions for the three identified problems, making it the most effective approach for the exam scenario and real-world applications.

## Context

This content is crucial for professionals preparing for the AWS Certified AI Practitioner exam, which validates foundational knowledge of artificial intelligence and machine learning concepts on the AWS platform. The scenario addresses common real-world challenges when implementing generative AI solutions for business applications like marketing content generation. Understanding how to combine different AWS AI services to solve multiple problems simultaneously is essential for effective AI implementation in enterprise environments, where accuracy, brand safety, and efficiency are critical requirements.