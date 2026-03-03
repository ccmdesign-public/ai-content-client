---
metadata:
  videoId: "HuYiv-D3KD0"
  title: "AWS Solutions Architect Question of the Day | Question 20 of 65"
  description: "AWS Solutions Architect Question of the Day | Question 20 of 65

    🔥 Concept Focus: DDoS vs Application Attacks

    - In AWS security design, treat these as two separate problems:

    - Volumetric / DDoS attacks → handled at the network & edge layer

    - SQL injection & malicious requests → handled at the application layer with inspection and rules

    High-traffic architectures usually combine an edge-based DDoS service with a web application firewall in front of the load balancer or CDN.

    👉 Follow this pattern whenever you see “DDoS + SQL injection” in exam questions.

    👉 Ready to ace your AWS Solutions Architect certification? Enroll in our comprehensive course with hands-on labs, practice exams, and expert guidance: https://kode.wiki/3YIuZUE

    #AWS #WebSecurity #AppSec #CloudArchitecture #CertificationPrep"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT2M28S"
  publishedAt: "2026-01-19T16:00:23Z"
  thumbnailUrl: "https://i.ytimg.com/vi/HuYiv-D3KD0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=HuYiv-D3KD0"
processedAt: "2026-01-20T17:07:06.497Z"
source: "youtube"
tldr: "For comprehensive flash sale protection against DDoS attacks at the network layer and SQL injection at the application layer, implement AWS Shield Advanced for DDoS mitigation and AWS WAF with SQL injection rules on CloudFront/ALB for application security."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1040
  outputTokens: 687
  totalTokens: 1727
  processingTimeMs: 19752
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tools:
  - name: "AWS Shield Advanced"
    url: null
  - name: "AWS WAF"
    url: null
  - name: "Security Groups"
    url: null
  - name: "Network ACLs"
    url: null
  - name: "Amazon GuardDuty"
    url: null
  - name: "Application Load Balancer"
    url: null
  - name: "Amazon CloudFront"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Security"
tags:
  - "architecture"
  - "aws"
  - "vulnerability"
tagsNormalizedAt: "2026-03-01T21:19:30.426Z"
---

## Key Takeaways

This video explains a two-layer AWS security solution for e-commerce protection during high-traffic events:

*   **AWS Shield Advanced** is the mandatory solution for **network-layer DDoS protection**, providing volumetric attack mitigation, 24/7 support from AWS DDoS Response Team, and cost protection.

*   **AWS WAF (Web Application Firewall)** with SQL injection rules is required for **application-layer security**, inspecting HTTP requests to detect and block malicious payloads like SQL injection attempts.

*   Security Groups, NACLs, and Guard

Duty are insufficient for this specific threat profile because they lack deep packet inspection for application attacks or real-time blocking capabilities.

## Summary

The video presents a certification question where an e-commerce company preparing for a flash sale needs protection against two specific threat vectors: **volumetric DDoS attacks** at the network layer and **SQL injection attempts** at the application layer. Their infrastructure uses an Application Load Balancer with Amazon Cloud

Front.

### Analyzing the Incorrect Options

Several AWS services are ruled out because they don't address the specific requirements:

*   **Security Groups and Network ACLs (NACLs)** operate at lower network layers (IP/port level) and cannot inspect application payloads to detect SQL injection patterns.

*   **Amazon Guard

Duty** is a **detective** threat intelligence service that alerts on suspicious activity but does not actively **block** requests in real-time.

### The Correct Two-Layer Solution

The correct architecture requires two complementary services that work at different layers of the OSI model:

1.  **AWS Shield Advanced for Network Layer DDoS Protection**
    This managed service is purpose-built to absorb and mitigate large-scale distributed denial-of-service attacks. Key benefits include automatic attack mitigation, access to the AWS DDoS Response Team (DRT) for 24/7 support, and **cost protection** that shields you from scaling costs incurred during an attack.

2.  **AWS WAF for Application Layer Security**
    The **Web Application Firewall (WAF)** is deployed on Cloud

Front and the ALB to inspect incoming HTTP/HTTPS traffic. By applying managed **SQL injection match rules**, AWS WAF can identify and block malicious request patterns that aim to exploit database vulnerabilities, providing the necessary application-layer filter.

**The core principle is that Shield stops the traffic flood (DDoS), while WAF stops the poisoned requests (SQL injection).** For a complete defense-in-depth strategy during a high-risk event like a flash sale, implementing both services is essential.

## Context

This content is crucial for IT professionals, especially those pursuing the AWS Solutions Architect Associate certification. It demonstrates how to architect for real-world security scenarios, moving beyond theoretical knowledge to applied, layered defense strategies. Understanding the distinct roles of AWS security services (preventative vs. detective, network vs. application layer) is fundamental for designing resilient cloud architectures that protect business-critical applications during peak traffic events.