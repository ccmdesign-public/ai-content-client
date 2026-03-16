---
metadata:
  videoId: "HtnlUosO3XA"
  title: "Agentic Runtime Security Explained: Securing Non‑Human Identities"
  description: "Ready to become a certified watsonx Generative AI Engineer - Associate? Register now and use code IBMTechYT20 for 20% off of your exam → https://ibm.biz/BdpzUm


    Learn more AI Agent Security here → https://ibm.biz/BdpzUS


    Agentic AI is the most white hot topic in IT today. Bob Kalka and Tyler Lynch explain how agentic AI, non-human identities, IAM gaps, and runtime security risks shape real-world deployments. Learn how accountability, least privilege, and zero trust keep agentic AI secure.


    AI news moves fast. Sign up for a monthly newsletter for AI updates from IBM → https://ibm.biz/BdpzUy


    #agenticai #aisecurity #zerotrust"
  channel: "IBM Technology"
  channelId: "UCKWaEZ-_VweaEx1j62do_vQ"
  duration: "PT12M26S"
  publishedAt: "2026-03-15T11:00:34Z"
  thumbnailUrl: "https://i.ytimg.com/vi/HtnlUosO3XA/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=HtnlUosO3XA"
processedAt: "2026-03-16T15:41:16.084Z"
source: "youtube"
tldr: "Agentic AI introduces critical security risks as a non-human identity, requiring a new approach: register agents, strip static privileges, tie actions to intent, and enforce point-of-use access control via orchestration, governance, and observability."
tools: []
categories:
  - "AI & Machine Learning"
  - "Security"
tags:
  - "agents"
  - "ai-general"
  - "authentication"
  - "compliance"
  - "policy"
  - "security-general"
  - "vulnerability"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8435
  outputTokens: 862
  totalTokens: 9297
  processingTimeMs: 114757
tagsNormalizedAt: "2026-03-16T16:37:45.705Z"
---

## Key Takeaways

Securing AI agents requires a fundamental shift from traditional human-centered identity management to a dynamic, runtime-focused model. • **Agentic AI is a non-human identity** with 45-90 such identities for every human, creating massive new attack surfaces. • **Four key security holes** emerge: lack of accountability, overprivilege, delegation issues, and the 'last mile' problem to databases. • **Five imperatives** form a 'definition of done': register agents, strip privileges, tie actions to intent, enforce point-of-use access, and maintain proof of control for audits.

## Summary

The video explains that **Agentic AI** represents a new class of **non-human identity** that traditional, static identity and access management (IAM) systems cannot secure. While 80% of cyber attacks target identities, the problem is magnified by the ratio of 45-90 non-human identities for every human identity, with agentic AI being the most dramatic form.

Traditional IAM protects up to the point where a human invokes an application containing an AI agent, but critical security gaps appear beyond that point in the agent-to-backend-resource chain. The video identifies four fundamental holes:

• **Accountability**: Agents must have unique identifiers for each instance to enable tracing of actions.
• **Overprivilege**: Developers often grant broad, static privileges (like an HR agent always having onboarding rights) instead of dynamic, just-in-time privileges per session.
• **Delegation & Impersonation**: When users delegate tasks to agents, or when agents (like co-work agents on desktops) impersonate user identities, audit trails break down.
• **The Last Mile Problem**: The final connection from an agent to a sensitive database often uses shared, standing credentials with no real-time authorization check at the moment of access.

To address these, the video proposes five imperatives for bringing AI agents to market securely:

1.  **Register your agents** with unique identities and quantify their risk profile.
2.  **Strip all static privileges** and use dynamic, session-level privileges granted just-in-time.
3.  **Tie all agent actions to user intent** to solve the delegation and audit problem (e.g., knowing Tyler asked HR Agent X to offboard an employee).
4.  **Enforce access at the point of use** (the 'last hop'), performing real-time policy and risk analysis for each external connection.
5.  **Maintain proof of control** with full auditability across the entire continuum from human to non-human identity to action.

Implementing this requires three core technology pillars working together across human and non-human identities:

• **Orchestration**: An engine to manage the flow and ensure accountability between human and agent worlds.
• **Governance**: Policies applied at every step to prove who did what.
• **Observability**: Critical for collaboration between development and security (CISO) teams, comprising **posture management** (e.g., consolidating disparate secrets managers) and **threat management** (real-time detection of unregistered agents or policy violations).

## Context

As organizations rapidly deploy AI agents to automate business processes (HR, banking, infrastructure provisioning), they are creating a massive new attack surface that existing security models ignore. This is critical for CISOs, IT security teams, and developers in regulated industries like finance and healthcare, where audit trails and access control are mandatory. The discussion moves security from a static, human-centric model to a dynamic, runtime model required for autonomous AI systems operating at machine speed.