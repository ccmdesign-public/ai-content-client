---
metadata:
  videoId: "745RLzVSrWo"
  title: "This Tiny Regex Error Hijacked the AWS Console #cybersecurity #aws #hackernews"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT1M30S"
  publishedAt: "2026-01-16T20:35:48Z"
  thumbnailUrl: "https://i.ytimg.com/vi/745RLzVSrWo/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=745RLzVSrWo"
processedAt: "2026-01-17T17:05:24.571Z"
source: "youtube"
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tldr: "Researchers from Wiz exploited a **regex vulnerability** in AWS CodeBuild named 'Codeback.'

  • **Unanchored regex** on actor ID filters allowed unauthorized GitHub users to bypass security via substring matching.

  • This enabled an **Eclipse event** where brute-forced IDs gained admin access to the **AWS JavaScript SDK** repository.

  • AWS patched the flaw within 48 hours of disclosure.\n"
ai:
  provider: "gemini"
  model: "gemini-3-flash-preview"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 760
  outputTokens: 871
  totalTokens: 3721
  processingTimeMs: 20482
tools:
  - name: "AWS CodeBuild"
    url: null
  - name: "GitHub"
    url: null
  - name: "AWS JavaScript SDK"
    url: null
  - name: "Wiz"
    url: null
categories:
  - "Security"
  - "DevOps & Infrastructure"
tags:
  - aws
  - vulnerability
  - ci-cd
  - best-practices
---

## Key Takeaways

Wiz researchers demonstrated how a simple logic error in a regular expression could lead to a full compromise of a critical cloud build system.

- The vulnerability stemmed from an **unanchored regex filter** that searched for authorized Git

Hub IDs as substrings rather than exact matches.

- By creating batches of Git

Hub users, researchers achieved an **Eclipse event**, where a generated ID successfully matched a trusted substring.

- The exploit allowed the researchers to perform a **supply chain attack** by pushing code to the AWS Java

Script SDK and harvesting admin credentials.

- This case underscores that **minor coding errors** in core infrastructure can have massive, global security implications.

## Summary

### The Discovery of Codeback
Researchers from the security firm **Wiz** identified a critical vulnerability within the **AWS Code

Build** webhook system, which they named **Codeback**. The flaw resided in the mechanism used to verify Git

Hub events. To ensure security, Code

Build utilizes an **actor ID filter**, which acts as an allow-list of approved Git

Hub user IDs. Only events triggered by these specific IDs should be permitted to initiate a build process.

### The Regex Failure
The core of the issue was a fundamental error in **regular expression (regex)** implementation. The actor ID filter used an **unanchored regex**. In technical terms, 'unanchored' means the system was searching for the pattern anywhere within the string rather than requiring an exact match for the entire string. For instance, if the authorized ID was '1234', a malicious ID like '912345' would satisfy the filter because it contained the substring '1234'. By missing just two anchor characters (typically `^` and `$`), the filter became practically useless against determined attackers.

### Achieving the Eclipse Event
The researchers coined the term **Eclipse event** to describe a scenario where a malicious user ID successfully overlaps with a trusted ID due to this loose regex logic. To exploit this, the Wiz team utilized automation to create new Git

Hub users in large batches. They continued this process until they generated a user ID that triggered the substring match required to bypass the Code

Build security filter. This was essentially a brute-force approach to finding a collision within the unanchored pattern search.

### Impact and Remediation
Once the filter was bypassed, the researchers were able to submit a **pull request (PR)** to the **AWS Java

Script SDK** library. This action allowed them to execute code within the build environment to retrieve the Git

Hub credentials for the project. These credentials ultimately granted them **admin access** to the AWS Code

Build repository. Such access is catastrophic in a cloud environment, as it provides control over core build processes and sensitive secrets.

Wiz followed responsible disclosure protocols and notified Amazon. AWS acted quickly, deploying a patch to anchor the regex patterns and secure the webhook system within **48 hours**. This incident highlights that even robust systems built by tech giants like Amazon can be vulnerable to minor security flaws, such as a random insecure regex pattern.

## Context

This incident underscores the fragility of modern **cloud security** and the high stakes of **software supply chain** protection. When a service as foundational as AWS Code

Build has a logic flaw, the potential for a 'watering hole' attack—where malicious code is injected into widely used libraries—becomes a reality. This matters to Dev

Ops engineers, security researchers, and any organization relying on CI/CD pipelines for automated deployments. It serves as a critical reminder that robust security is not just about complex architectural barriers; it often comes down to the most basic components of code. The failure to use **regex anchors** to ensure exact string matching is a simple mistake that can lead to administrative-level compromise of global infrastructure.
