---
metadata:
  videoId: "oYE-CbgZJZ4"
  title: "Autoresearch Claude Code Hacker - Can It Breach My Vibecoded Site?"
  description: "Autoresearch Claude Code Hacker - Can It Breach My Vibecoded Site?

    👊 Become a YouTube Member to Support Me:

    https://www.youtube.com/c/AllAboutAI/join


    For Agents:

    www.skillsmd.store


    My AI Video Course:

    https://www.theaivideocourse.com/


    🔥Open GH:

    https://github.com/AllAboutAI-YT/


    Business Inquiries:

    kbfseo@gmail.com​


    DGX SPARK:


    Step 1:

    Register for Nvidia GTC here:

    https://nvda.ws/45LO50F


    Step 2

    Find a session to watch virtual here:

    https://www.nvidia.com/gtc/session-catalog/


    Step 3:

    Follow Instructions and fill out form to join here:

    https://docs.google.com/forms/d/e/1FAIpQLSeDryf1GKl8WGQmUUGVcPd1sNQNVI1FSqIowrqS-jgWK3hvQg/viewform?usp=header


    Good luck!!!!!!"
  channel: "All About AI"
  channelId: "UCR9j1jqqB5Rse69wjUnbYwA"
  duration: "PT10M19S"
  publishedAt: "2026-03-23T22:05:09Z"
  thumbnailUrl: "https://i.ytimg.com/vi/oYE-CbgZJZ4/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=oYE-CbgZJZ4"
processedAt: "2026-03-24T00:49:01.215Z"
source: "youtube"
tldr: "The video demonstrates using an AI-powered 'auto research hacker' based on Carpathia's framework and Claude Code to perform automated red team security testing on a Vibe-coded website, finding no critical vulnerabilities after 16 experiments."
tools:
  - name: "Claude Code"
    url: null
  - name: "Cursor"
    url: null
  - name: "Codex"
    url: null
categories:
  - "AI & Machine Learning"
  - "Security"
  - "Tools & Productivity"
tags:
  - "ai-coding"
  - "automation"
  - "claude"
  - "penetration-testing"
  - "security-general"
  - "vulnerability"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 8026
  outputTokens: 776
  totalTokens: 8802
  processingTimeMs: 226136
tagsNormalizedAt: "2026-03-24T04:11:21.472Z"
---

## Key Takeaways

The creator successfully tested their website's security using an AI-driven automated red teaming setup.

*   **Auto Research Hacker Framework** was adapted from Carpathia's project, creating an agent that iteratively tests attack vectors with a scoring system, keeping successful methods and discarding failures.

*   **Claude Code + Cursor Integration** provided the core AI capability for security testing, with Codex (v5.4) used to analyze results and suggest new, high-priority experiments to improve the attack strategy.

*   **Effective Security Validation** was achieved: after 16 automated experiments, the site's paywalled MD files remained secure, with only a minor, acceptable post-purchase token-sharing vulnerability identified.

## Summary

The video documents a practical experiment in AI-assisted security testing. The creator sets up an automated 'red teaming' agent to attempt to breach their own Vibe-coded website and access paywalled MD files.

### The Auto Hacker Setup

The core system is built on **Carpathia's auto research framework**. It operates in a loop: the AI agent reviews past attempts, picks a new attack ID, rewrites an attack script, runs it for a set duration (initially 2 minutes, later increased to 5), and then evaluates the results with a scoring function from 0-100. Successful attacks (higher scores) are kept, while failures are discarded, allowing the agent to learn and improve its approach over multiple iterations.

### Testing Process and Tools

The agent was equipped with specific skills defined in Claude MD files, including web application reconnaissance and request analysis using browser automation. The testing involved checking various attack surfaces like headers, APIs, Stripe integrations, and webhooks. After an initial 13-run sweep found no critical issues, the creator used **Codex (Claude 5.4)** to analyze the findings. Codex suggested new, high-priority experiments, which were then fed back into the Claude Code environment to run further tests.

### Results and Implications

After 16 total experiments, the agent concluded that accessing the protected files without a valid token was not possible given the current attack surface. The only minor finding was that a purchase token could be shared (allowing up to three downloads within 10 minutes), which the creator deemed an acceptable trade-off. The creator notes they also tested another Vibe-coded site with this setup and successfully identified a real vulnerability, validating the system's effectiveness for defensive security auditing.

## Context

This video matters because it showcases the practical application of AI for proactive cybersecurity, specifically for developers and creators building with no-code/low-code platforms like Vibe. As AI capabilities grow, automated red teaming and penetration testing become more accessible, allowing individuals and small teams to rigorously security-test their applications before public release. This connects to broader trends in AI-assisted development and DevSecOps, where AI is used not just for code generation but for ensuring code and application security.