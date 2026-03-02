---
metadata:
  videoId: "H7Xh-x_TVdQ"
  title: "Shanon: The Open Source AI Pentester Powered By Claude Code"
  description: "Shannon AI is an open source autonomous AI pen-testing tool (or hacker) that uses Claude to find security vulnerabilities like XSS, SQL injection, and SSRF through code analysis and browser automation. In this video, I demo Shannon running on the OWASP Juice Shop app, explain how it uses Temporal for durable execution across its five pentesting phases, break down the $66 cost in Claude API credits, and compare it to the upcoming Claude Code Security feature. We'll also look at Shannon Pro's enhanced data flow analysis capabilities.


    🔗 Relevant Links

    My Shannon Reports - https://github.com/RichardBray/shannon-report

    Temporal - https://temporal.io/


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack


    📌 Chapters:

    0:00 Intro

    0:35 What is Shannon AI

    1:08 Shannon Setup and Demo on OWASP Juice Box

    2:16 What is Temporal.io?

    2:49 How Shannon Does Pentesting

    4:10 Shannon Pentest Report

    5:23 Shannon Report Deep Dive

    7:04 Shannon Pro by Keygraph

    7:37 Final Thoughts"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT8M39S"
  publishedAt: "2026-02-25T15:45:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/H7Xh-x_TVdQ/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=H7Xh-x_TVdQ"
processedAt: "2026-02-26T23:52:39.582Z"
source: "youtube"
tldr: "Shannon is an open-source AI pentester that autonomously analyzes code and exploits vulnerabilities using browser automation, providing detailed security reports with zero false positives, though it requires Claude API credits and takes 2+ hours for a full scan."
tools:
  - name: "Claude SDK"
    url: null
  - name: "Docker Compose"
    url: null
  - name: "Temporal"
    url: null
  - name: "Playwright"
    url: null
  - name: "OWASP Juice Shop"
    url: null
categories:
  - "Tools & Productivity"
tags:
  - "automation"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 7100
  outputTokens: 744
  totalTokens: 7844
  processingTimeMs: 18150
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.333Z"
---

## Key Takeaways

Shannon is an autonomous AI pentester that performs comprehensive security testing through code analysis and live exploit execution. Key insights include:

*   **Built on the Claude SDK** and requires a Claude API key (not subscription), costing ~$60 for a 2.5-hour scan of a test project

*   Uses **Temporal for durable execution** to maintain progress through crashes or API credit issues, and **Playwright for browser automation**
*   Generates **extremely detailed reports** with exploit examples (like curl commands) and zero false positives

*   **Pro version adds features** like CVSS scoring, CI/CD pipeline support, and compliance reporting (OWASP, SOC 2, PCI DSS)

## Summary

Shannon is an open-source autonomous AI penetration testing tool that performs comprehensive security assessments by analyzing source code and executing live exploits through browser automation. It detects a wide range of vulnerabilities including SQL injection, cross-site scripting (XSS), server-side request forgery (SSRF), and authentication flaws.

The tool operates through a five-phase workflow orchestrated by Temporal, which ensures durable execution even if the process is interrupted. The phases include: **pre-flight validation** (checking API credentials and Docker), **pre-recon** (code analysis for architecture mapping), **recon** (browser automation with Playwright to map functionality), **parallel vulnerability/exploit testing** (five agents running simultaneously), and **report generation**.

In a demonstration against the vulnerable OWASP Juice Shop application, Shannon took approximately 2.5 hours to complete a full scan, identifying 11 critical vulnerabilities and providing detailed reports with specific exploit examples. The cost was significant at around $60 in Claude API credits, though this is still cheaper than hiring human penetration testers.

While the open-source version is free, Shannon Pro offers additional features including CVSS scoring, API access, CI/CD integration, and compliance reporting for enterprise requirements. The tool currently depends on the Claude SDK but may potentially be adapted to other AI models in the future.

## Context

Traditional penetration testing is expensive and time-consuming, often costing thousands of dollars per engagement with lengthy turnaround times. Shannon addresses this by providing automated, AI-driven security testing that can be integrated into development workflows. This matters for startups and developers who need to identify security vulnerabilities before production releases but lack the budget for professional security services. The tool represents the growing trend of AI-powered security automation, making comprehensive testing more accessible while raising questions about cost-effectiveness compared to emerging alternatives like Claude Code Security.