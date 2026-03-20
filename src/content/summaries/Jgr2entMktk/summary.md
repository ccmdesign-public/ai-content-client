---
metadata:
  videoId: "Jgr2entMktk"
  title: "Secure your AI agents for production workloads"
  description: "Codelab → https://goo.gle/4atfPdd\ 

    Video for developers → https://goo.gle/3ZJ6dor

    Video for data engineers →  https://goo.gle/4tRO4CO


    How do you secure your AI agents against malicious attacks while ensuring they scale under pressure? In this episode of Agentverse, we move beyond \"it works on my machine\" to build a battle-hardened infrastructure on Google Cloud. You'll learn how to deploy open-source models using Ollama and vLLM, secure your pipeline with Model Armor, and implement full observability—all while optimizing your architecture to squeeze maximum performance out of your GPU budget.


    Chapters:

    0:00 - Intro: The Guardian, the Platform Engineer

    02:05 - Self hosted LLMs: Deploy Ollama

    05:07 - Deploy vLLM

    08:48 - Setup Model Armor

    12:04 - Build the agent pipeline

    15:00 - Observability: Metrics and tracing

    17:06 - Outro



    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    #Gemini #GoogleCloud #Agentverse


    Speaker: Debi Cabrera

    Products Mentioned:  Agentverse, Gemini, Agent Development Kit, Model Armor, Ollama, vLLM, Cloud Run"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT18M12S"
  publishedAt: "2026-03-06T17:00:35Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Jgr2entMktk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Jgr2entMktk"
processedAt: "2026-03-10T16:08:32.790Z"
source: "youtube"
tldr: "This video demonstrates a comprehensive platform engineering approach for deploying secure, scalable, and observable self-hosted AI agents on Google Cloud, using a hybrid model strategy (Ollama for dev, VLLM for prod), integrating Model Armor for security, and establishing CI/CD pipelines with observability via Prometheus and Cloud Trace."
tools:
  - name: "Google Cloud Run"
    url: null
  - name: "Ollama"
    url: null
  - name: "VLLM"
    url: null
  - name: "Google Cloud Build"
    url: null
  - name: "Google Cloud Storage"
    url: null
  - name: "Cloud Storage FUSE"
    url: null
  - name: "Google Secret Manager"
    url: null
  - name: "Google Cloud Load Balancing"
    url: null
  - name: "Model Armor"
    url: null
  - name: "Agent Development Kit (ADK)"
    url: null
  - name: "LiteLLM"
    url: null
  - name: "Prometheus"
    url: null
  - name: "Google Cloud Monitoring"
    url: null
  - name: "Google Cloud Trace"
    url: null
  - name: "OpenTelemetry"
    url: null
categories:
  - "AI & Machine Learning"
  - "DevOps & Infrastructure"
tags:
  - "agents"
  - "ci-cd"
  - "gcp"
  - "monitoring"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 9931
  outputTokens: 988
  totalTokens: 10919
  processingTimeMs: 34000
tagsNormalizedAt: "2026-03-10T16:48:06.059Z"
---

## Key Takeaways

A platform engineer's guide to building a secure, production-ready AI agent infrastructure on Google Cloud.

- **Hybrid Model Strategy:** Use **Ollama** for fast, containerized development and **VLLM** with Cloud Storage FUSE for scalable, decoupled production inference.

- **Integrated AI Security:** Deploy **Model Armor** as a security guard via a load balancer to inspect all traffic for prompt injection, jailbreaks, and PII leaks.

- **Automated CI/CD & Observability:** Create fully automated pipelines with Cloud Build and deploy deep observability using a **Prometheus** sidecar for GPU metrics and **Cloud Trace** for request tracing.

## Summary

The video outlines a mission to build a secure, scalable foundation (the 'Citadel') for AI agents, moving from development to production. The core strategy involves a hybrid approach to self-hosting LLMs to maintain data sovereignty and control costs.

### Hybrid Model Deployment

The solution uses two serving strategies. For development speed, **Ollama** is used to bake the Gemma model directly into a Cloud Run container, enabling blazing-fast cold starts. For production scale and agility, **VLLM** is deployed. Here, model weights are stored in a Cloud Storage bucket and mounted into the container using **Cloud Storage FUSE**. This decouples the serving code from the model data, allowing for fast model updates without rebuilding containers.

### Security & Traffic Management

Security is implemented as a network-layer guard. An external Application Load Balancer routes traffic, with a **URL map** directing requests to different backends (e.g., `/api` to dev, all else to prod). **Model Armor** is integrated as a **Service Extension** to inspect every prompt and response for malicious intent (jailbreaks, prompt injection) and sensitive data (PII). Malicious requests are blocked before they reach the LLM.

### Automated Agent Deployment & Observability

The agent itself, built with the **Agent Development Kit (ADK)** and **LiteLLM** as a universal adapter, is deployed via a Cloud Build CI/CD pipeline. The agent is configured to call the load balancer endpoint, ensuring all its requests pass through the security shield.

For observability, a **Prometheus** sidecar container is injected into the VLLM Cloud Run service to scrape critical metrics like GPU utilization and token generation speed. For tracing, the ADK's integration with **Cloud Trace** via **OpenTelemetry** provides a waterfall view of each agent interaction, pinpointing performance bottlenecks.

## Context

As AI agents move from prototypes to production, platform engineers face critical challenges around security, cost, scalability, and data privacy. Using third-party LLM APIs can be expensive and require sending sensitive data outside the organization's network. This video addresses these concerns by demonstrating how to build a private, secure, and cost-effective infrastructure for self-hosted AI agents, which is crucial for industries like healthcare, finance, and any organization handling internal IP.