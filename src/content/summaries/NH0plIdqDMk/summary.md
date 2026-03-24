---
metadata:
  videoId: "NH0plIdqDMk"
  title: "What is Agentic Security Runtime? Securing AI Agents"
  description: "Ready to become a certified watsonx Generative AI Engineer - Associate? Register now and use code IBMTechYT20 for 20% off of your exam → https://ibm.biz/BdpzUG


    Learn more AI Agent Security here → https://ibm.biz/BdpzUn


    Engineers are being tasked to build AI, but they're not identity experts. Tyler Lynch explains how agentic runtime security, dynamic credentials, OAuth2, and IDP flows protect AI agents from risks like prompt injection. Learn how to secure non‑human identities and cloud workloads. 🚀


    AI news moves fast. Sign up for a monthly newsletter for AI updates from IBM → https://ibm.biz/BdpzUe


    #cybersecurity #agenticai #aisecurity"
  channel: "IBM Technology"
  channelId: "UCKWaEZ-_VweaEx1j62do_vQ"
  duration: "PT4M59S"
  publishedAt: "2026-03-22T11:00:38Z"
  thumbnailUrl: "https://i.ytimg.com/vi/NH0plIdqDMk/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=NH0plIdqDMk"
processedAt: "2026-03-24T01:27:23.578Z"
source: "youtube"
tldr: "Agentic security runtime secures AI agents by replacing static credentials with dynamic, session-bound access using OAuth 2.0 and CIBA for sensitive operations, protecting against jailbreaking and prompt injection."
tools:
  - name: "AWS Lambda"
    url: null
  - name: "PostgreSQL"
    url: null
  - name: "Salesforce"
    url: null
  - name: "Okta"
    url: null
  - name: "IBM Verify"
    url: null
categories:
  - "AI & Machine Learning"
  - "Security"
tags:
  - "agents"
  - "ai-general"
  - "authentication"
  - "llm"
  - "prompt-engineering"
  - "security-general"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 2110
  outputTokens: 1009
  totalTokens: 3119
  processingTimeMs: 21779
tagsNormalizedAt: "2026-03-24T04:12:57.398Z"
---

## Key Takeaways

This video explains how to secure AI agents with runtime security protocols that replace traditional static credentials with dynamic, user-authorized access. Key insights include:

*   **Dynamic credentials** should replace static API keys, creating just-in-time, session-bound access that's automatically revoked.

*   **OAuth 2.0** with user identity from an IDP (like Okta or IBM Verify) provides the foundation for authorizing AI agent actions on behalf of users.

*   For **sensitive operations** (like HR changes), use **OAuth 2.0 CIBA** for out-of-band user confirmation via mobile prompts, adding a critical security layer.

*   This approach **mitigates jailbreaking and prompt injection** risks by removing standing privileges and requiring user authorization for sensitive actions.

## Summary

Engineers building AI applications often lack identity expertise, creating a significant security gap. Agentic runtime security addresses this by securing how AI agents connect to external resources like databases, LLMs, and SaaS applications.

### The Problem with Static Credentials

Traditional approaches involve hard-coding static credentials (API keys, database passwords) into the AI workload. This creates **standing privileges**—if the AI agent is compromised via **jailbreaking** or **prompt injection**, attackers gain unrestricted access to all connected resources.

### The Solution: Dynamic Credentials and User Identity

The core recommendation is to build connections **dynamically at runtime per session**. This involves two key components:

*   **Dynamic Credentials**: Create **just-in-time credentials** for each required resource (e.g., PostgreSQL database access). These credentials are **time-bound** and **intent-bound** to the specific session and automatically revoked when the session ends, stripping standing privilege.

*   **User Identity via OAuth**: Most AI agents are used by people. The agent should work with an **Identity Provider (IDP)** like Okta or IBM Verify using the **OAuth 2.0 Authorization Code flow**. This allows the agent to act on behalf of an authenticated user, understanding "who" is making the request.

### Securing Sensitive Operations with CIBA

For high-risk actions—such as an HR agent onboarding or offboarding employees—an additional layer is needed: **OAuth 2.0 CIBA (Client-Initiated Backchannel Authentication)**.

CIBA acts like **passkeys for agents**. When an AI agent determines a user's request is sensitive, it initiates a CIBA flow with the IDP. This triggers a prompt **directly to the user's mobile device**, completely outside the browser context, asking for explicit approval (e.g., "Do you authorize offboarding employee X?").

This provides powerful protection. Even if a prompt injection attempts "offboard all employees," the user would receive a separate mobile prompt for *each* action, preventing automated, unauthorized bulk operations.

### Implementation

To implement agentic runtime security, developers embed this logic into their AI agent code (Python, TypeScript, etc.). The agent evaluates JSON Web Tokens (JWTs) from the IDP, creates the necessary dynamic credentials for the session, accesses the resources, and ensures automatic credential revocation. This integrated approach secures the AI agent's runtime interactions.

## Context

As companies rapidly deploy AI agents to automate tasks and interact with sensitive data and systems, traditional application security models fail. Engineers building these agents are not identity experts, yet the agents require access to critical resources. This creates a major vulnerability where compromised agents can lead to data breaches or harmful actions. Agentic runtime security addresses this gap by applying modern identity and access management principles—like least privilege and user consent—specifically to the unique, dynamic, and potentially high-risk context of AI agents. It's crucial for any organization deploying AI that interacts with business data or performs operational tasks.