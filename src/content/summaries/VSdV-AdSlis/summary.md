---
metadata:
  videoId: "VSdV-AdSlis"
  title: "Identity for AI Agents - Patrick Riley & Carlos Galan, Auth0"
  description: "Implementing secure identity and access management for AI agents with Okta!


    https://www.linkedin.com/in/patmriley/

    https://www.linkedin.com/posts/cgcladera_auth0-for-ai-agents-secure-agentic-apps-activity-7399029829565579264-9Gdf/"
  channel: "AI Engineer"
  channelId: "UCLKPca3kwwd-B59HNr-_lvA"
  duration: "PT1H22M12S"
  publishedAt: "2026-01-14T15:03:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/VSdV-AdSlis/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=VSdV-AdSlis"
processedAt: "2026-01-14T16:48:46.785Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Auth0's Patrick Riley and Carlos Galan present a framework for securing **AI agents** by evolving traditional identity protocols.\ 

  - **Token Vault** manages upstream API access securely.

  - **Async Auth (CIBA)** enables real-time human-in-the-loop approvals for risky actions.

  - **MCP Integration** provides a standardized way to authorize tools and resources.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 15401
  outputTokens: 1261
  totalTokens: 17582
  processingTimeMs: 518135
tools:
  - name: "Auth0 AIO"
    url: null
  - name: "Token Vault"
    url: null
  - name: "Async Auth"
    url: null
  - name: "CIBA"
    url: null
  - name: "Model Context Protocol"
    url: null
  - name: "OpenFGA"
    url: null
  - name: "Next.js"
    url: null
  - name: "Okta"
    url: null
categories:
  - "Security"
  - "AI & Machine Learning"
tags:
  - agents
  - authentication
  - oauth
  - jwt
  - api-design
  - best-practices
---

## Key Takeaways

As AI agents transition from simple chatbots to autonomous actors, the security landscape must shift from basic user authentication to complex delegated authorization.

* **Identity Attribution**: Agents must know the identity of the user they represent to apply correct security policies and avoid being anonymous actors.

* **Token Vault**: A new architectural component that securely persists and manages upstream **refresh tokens**, allowing agents to maintain long-term access to third-party services like Slack or Google Calendar without user re-authentication.

* **Async Auth via CIBA**: Leveraging the Client Initiated Backchannel Authentication (CIBA) protocol allows agents to pause execution and request **explicit human approval** (via push notifications) for high-risk operations like financial transactions.

* **Model Context Protocol (MCP)**: Integrating MCP with identity providers like Auth0 allows for **Dynamic Client Registration (DCR)**, enabling agents to securely discover and authorize tools across diverse environments.

* **Fine-Grained Access (FGA)**: The authors emphasize moving beyond broad scopes to specific, resource-level permissions using **Role-Based Access Control (RBAC)** and OpenFGA concepts.

## Summary

### The Shift to Agentic Identity
The presentation begins by addressing the changing nature of AI technology, moving from interactive chatbots to fully autonomous agents. This transition introduces significant security challenges, highlighted by the **OWASP Top 10 for LLMs**. Auth0’s vision is to enable users to safely use any technology, which requires a new identity model built on four pillars: the agent must know the user's identity, act on the user's behalf via APIs, request confirmation for risky tasks, and operate under fine-grained access controls. 

### Core Architectural Features: Token Vault and Async Auth
Two major features of the new Auth0 AIO (AI Optimized) release are Token Vault and Async Auth. **Token Vault** is designed to solve the problem of managing 'upstream' resource tokens. When an agent needs to access a user's data in a third-party service (e.g., a stock portfolio or a CRM), Token Vault stores and manages the **refresh tokens**. This abstracts the complexity of token rotation and exchange away from the agent logic, ensuring the agent stays secure and available without hardcoding credentials or manual user intervention.

**Async Auth**, built on the **CIBA (Client Initiated Backchannel Authentication)** protocol, addresses the need for human supervision. Unlike traditional OAuth flows that require a browser redirect, CIBA allows the agent—operating in the background—to initiate an authorization request that triggers a notification on the user's mobile device. The user can see the specific details of the transaction (e.g., 'Buy 50 shares of AAPL') and approve or deny it. The agent receives an access token only upon successful human confirmation, effectively creating a cryptographically secure 'Human-in-the-Loop' mechanism.

### Integrating with the Model Context Protocol (MCP)
A significant portion of the workshop focuses on the **Model Context Protocol (MCP)**, a new standard for connecting AI models to data sources and tools. The speakers demonstrate how to model an MCP server as a **Resource Server** within the Auth0 ecosystem. This allows for **Dynamic Client Registration (DCR)**, where an agent can dynamically register itself and negotiate permissions with an MCP server using standard OIDC (OpenID Connect) flows. This ensures that even in decentralized tool environments, every tool execution is backed by a valid, scoped JWT (JSON Web Token).

### Practical Workshop: Building the 'Stock Trade' Agent
The speakers walk through a live coding demonstration using a Next.js application. They build an agent that connects to a fictitious 'Stock Trade' API. The demonstration progresses through several security levels:
1. **Public Access**: The agent queries public stock prices without authentication.
2. **User Identity**: Implementing a login flow so the agent knows the human user's profile.
3. **Private Data Access**: Using Token Vault to allow the agent to view the user's private stock portfolio by exchanging the user's session token for an upstream API token.
4. **Sensitive Actions**: Using Async Auth to require a push notification approval before the agent is allowed to execute a 'buy' or 'sell' order.

### Enterprise Context and the Okta Bridge
Finally, the presentation touches on the intersection of **Auth0 and Okta**. While Auth0 focuses on the developer experience and consumer-facing agents, Okta provides the enterprise identity layer. The 'bridge' between these systems allows companies to apply corporate policies to agents acting on behalf of employees. This includes mapping enterprise roles to specific agent scopes, ensuring that an employee's agent only has the permissions that the employee themselves would have within the organization’s infrastructure.

## Context

Patrick Riley and Carlos Galan are identity architects and engineers at Auth0 (by Okta). This presentation was delivered at the AI Engineer (AIE) conference in 2026, a pivotal moment for the industry as developers moved from building 'wrappers' to autonomous 'agents.' The talk is highly relevant to AI engineers, security professionals, and CTOs who are grappling with the legal and safety implications of autonomous AI. As standards like MCP (pioneered by Anthropic) gain traction, the integration of traditional identity protocols (OAuth2, OIDC, CIBA) with these new AI-specific protocols is a critical step for enterprise adoption. This video serves as both a strategic roadmap for AI security and a practical guide for implementing Auth0's latest AI-centric identity features.
