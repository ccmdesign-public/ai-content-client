---
metadata:
  videoId: "859oJ0-xfVg"
  title: "Use agent identity with Secret Manager"
  description: "Agent Identity → https://goo.gle/49KcQwy

    Secure ADK agents with Secret Manager → https://goo.gle/3ZpgBBH

    Logging an agent → https://goo.gle/3NImQhf


    Aron demonstrates a critical step for deploying an ADK agent that uses Google Maps tool to help users. Learn how to replace an insecure pattern with a Secret Manager. A secure and convenient storage system for API keys, passwords, and other sensitive data. \ 


    Chapters:

    0:00 - Intro

    0:29 - Service accounts vs. agent identity

    1:13 - Using Secret Manager with agent identity\ 

    1:54 - Auditing and verifying access


    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    #GoogleCloud #SecretManager #ADK


    Speaker: Aron Eidelman

    Products Mentioned: Google Cloud Security"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT3M22S"
  publishedAt: "2026-03-09T16:00:26Z"
  thumbnailUrl: "https://i.ytimg.com/vi/859oJ0-xfVg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=859oJ0-xfVg"
processedAt: "2026-03-10T16:07:26.085Z"
source: "youtube"
tldr: "This video demonstrates how to securely retrieve a Google Maps API key for an ADK agent using Google Cloud's Secret Manager with agent identity, replacing insecure hardcoded keys with a production-ready least privilege model."
tools:
  - name: "Google Cloud Secret Manager"
    url: null
  - name: "Vertex AI Agent Engine"
    url: null
  - name: "Google Cloud SDK"
    url: null
  - name: "Google Maps API"
    url: null
  - name: "ADK (Agent Development Kit)"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Security"
tags:
  - "authentication"
  - "best-practices"
  - "encryption"
  - "gcp"
  - "security-general"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2965
  outputTokens: 927
  totalTokens: 3892
  processingTimeMs: 30671
tagsNormalizedAt: "2026-03-10T16:43:58.218Z"
---

## Key Takeaways

The core message is moving from insecure API key management to a secure, production-grade pattern for AI agents. Key insights include:

- **Agent Identity** is a specialized, cryptographically attested principle for Vertex AI agents, providing better security and convenience than traditional service accounts.

- **Secret Manager Integration** allows agents to securely retrieve credentials at runtime, eliminating the need for hardcoded keys.

- **Least Privilege Enforcement** is enhanced by binding IAM policies to the unique agent identity, restricting access to only necessary resources like a specific API key.

- **Unified Auditing** is achieved as all agent-initiated actions across Google Cloud services are logged under its verifiable identity.

## Summary

The video addresses a critical security flaw in a common development pattern: hardcoding API keys, such as for Google Maps, directly into an agent's source code. This insecure practice is replaced with a production-ready solution using Google Cloud's **Secret Manager**.

### The Problem and Solution

Previously, an ADK (Agent Development Kit) agent used a hardcoded Google Maps API key, which poses a significant security risk. The solution is to store this key securely in Secret Manager and have the agent retrieve it at runtime.

The key innovation is using **Agent Identity** for authentication instead of a traditional service account. When an agent is deployed to the **Vertex AI Agent Engine** runtime, a unique **agent identity** is auto-provisioned. This identity is cryptographically attested to the runtime and cannot be impersonated, offering a stronger security foundation than a shared service account.

### Implementation with Agent Identity

For the agent to access Secret Manager, its identity must be granted the `roles/secretmanager.secretAccessor` IAM role, scoped specifically to the secret containing the Maps API key. This enforces the principle of least privilege.

Once permissions are set, the agent's code uses the standard Google Cloud SDK. The **Application Default Credentials (ADC)** mechanism automatically detects and uses the agent's unique identity to authenticate requests to Secret Manager, seamlessly retrieving the secret.

### Security and Operational Benefits

This approach provides several major advantages:

- **Enhanced Security Posture**: It moves from insecure, shared keys to a model where credentials are managed centrally and accessed securely.

- **Fine-Grained Access Control**: Administrators can bind IAM policies directly to the agent's identity. For example, they can ensure a Maps agent only accesses its specific API key and is denied access to other sensitive tools or data sources, like user management functions exposed by other MCP servers.

- **Improved Auditability**: All actions the agent takes on its own authority (like fetching the API key) are logged in Google Cloud under its verifiable identity, providing clear audit trails.

- **Administrative Visibility**: Administrators can list all deployed agents and their identities via the Vertex AI Agent Engine console or REST API to review and manage access.

## Context

This topic is crucial for developers and platform engineers building and deploying AI agents in production environments. As agents become more stateful and non-deterministic, they present amplified security risks compared to traditional services. Hardcoding credentials is a widespread antipattern that leads to secret leakage and breaches. Implementing secure credential management with least-privilege access is a foundational requirement for trustworthy, scalable AI agent deployments on cloud platforms. This connects to the broader industry trend of moving beyond basic service accounts to more secure, workload-specific identities.