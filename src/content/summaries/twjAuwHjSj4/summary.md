---
metadata:
  videoId: "twjAuwHjSj4"
  title: "Vibe coding a secure agent in ADK with Antigravity"
  description: "[Lab] Building with Google Antigravity → https://goo.gle/4kXTWpN\ 

    [Lab] Securing a Multi-Agent System → https://goo.gle/4aDl2zb\ 

    [Lab]  Build a Secure Agent with Model Armor and Identity →  https://goo.gle/4cffP1z\ 


    Build a production agent using vibe coding with Antigravity. Learn how to implement critical security checkpoints using Model Armor callbacks. Working in small, test-driven phases. Aron shares how to intercept a user’s prompt before it hits the model to block injection attacks, and how to scrub the model’s response before it ever reaches the user to prevent data leakage.


    Chapters:

    0:00 - Security checkpoints in production agents\ 

    0:38 - The Plan: Integrating Model Armor with ADK callbacks\ 

    0:51 - Step 1: Input guardrails and prompt injection defense\ 

    0:58- Red Phase: Simulating malicious user input

    1:15 - Green Phase: Implementing before_model_callback\ 

    1:42 - Step 2: Output validation and data leakage prevention\ 

    1:55 - Red Phase: Mocking sensitive model responses\ 

    2:12 - Green Phase: Sanitizing output with after_model_callback\ 

    2:26 - Refactoring and consolidating security policies\ 


    More resources:

    Immersive Stream for XR documentation → https://goo.gle/4aDWshE


    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    #GoogleCloud


    Speaker: Aron Eidelman

    Products Mentioned: Google Cloud Security, Gemini CLI, Antigravity"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT3M30S"
  publishedAt: "2026-03-16T16:01:31Z"
  thumbnailUrl: "https://i.ytimg.com/vi/twjAuwHjSj4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=twjAuwHjSj4"
processedAt: "2026-03-16T16:26:51.648Z"
source: "youtube"
tldr: "This video demonstrates using test-driven 'vibe coding' with the Anti-gravity tool to build a secure AI agent in Google's ADK, implementing critical security checkpoints with Model Armor callbacks for input sanitization and output validation."
tools:
  - name: "ADK (Agent Development Kit)"
    url: null
  - name: "Anti-gravity"
    url: null
  - name: "Model Armor"
    url: null
  - name: "Agent Engine"
    url: null
  - name: "Secret Manager"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
  - "Programming"
tags:
  - "agents"
  - "ai-coding"
  - "gcp"
  - "testing"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3029
  outputTokens: 860
  totalTokens: 3889
  processingTimeMs: 87780
tagsNormalizedAt: "2026-03-16T16:36:09.720Z"
---

## Key Takeaways

This tutorial shows how to build secure AI agents using Google's development tools and test-driven principles. Key insights include: • Using **Model Armor API** within **ADK callbacks** to implement runtime security guardrails • Following the **plan-red-green-refactor** sequence for test-driven development with Anti-gravity • Implementing **before_model callback** to block prompt injection and **after_model callback** to validate outputs • Working in small, verifiable batches to maintain human oversight while leveraging AI-assisted coding

## Summary

This video tutorial from Google Cloud Tech demonstrates building a production-ready AI agent with security built in from the ground up. The presenter uses 'vibe coding'—an AI-assisted development approach—with the Anti-gravity tool within Google's Agent Development Kit (ADK) environment.

The core focus is implementing critical security checkpoints using **Model Armor callbacks**. This involves adding runtime guardrails at two key points: inspecting user input and validating model output. The ADK callback mechanism provides hooks to observe, customize, and control the agent's execution flow.

The development follows a structured **test-driven approach** with the plan-red-green-refactor sequence:

### Input Security Implementation

For the input guardrail, the team implements defense against prompt injection using Model Armor in the **before_model callback**:

- **Red phase**: Anti-gravity writes a failing test simulating an adversarial user trying to inject malicious content

- **Green phase**: The ADK agent implements the callback using Model Armor API to sanitize user prompts

- **Refactor phase**: Code is polished and context files updated for future sessions

When a policy violation is detected, the callback returns a specific response object that overrides default execution, causing the ADK agent to skip the LLM call and return a safe response immediately.

### Output Security Implementation

For output validation, the team implements the **after_model callback**:

- **Red phase**: Writing tests expecting raw model output to contain content that should be filtered

- **Green phase**: Anti-gravity writes callback logic using Model Armor's output sanitization feature

- **Refactor phase**: Consolidating Model Armor callback settings and finalizing the ADK agent definition

This approach creates checkpoints at both input and output interaction points with the model. The demonstration emphasizes how working in small batches using test-driven principles enables stable code development while maintaining continuous human verification over each increment.

The video concludes by pointing viewers to sample code and documentation, and teases future content about deploying to Agent Engine and using Secret Manager with agent identity principles.

## Context

This content matters because it addresses critical security concerns in AI agent development. As AI systems become more integrated into production environments, securing them against attacks like prompt injection and data leakage become more prevalent, developers need practical frameworks for building secure agents. The video connects to broader trends in AI safety, responsible AI development, and the growing ecosystem of tools for enterprise-grade AI applications. This is particularly relevant for developers building production AI systems, security engineers working on AI safety, and organizations implementing AI solutions that handle sensitive data or user interactions.