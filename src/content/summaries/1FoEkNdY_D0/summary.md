---
metadata:
  videoId: "1FoEkNdY_D0"
  title: "AWS Solutions Architect Question of the Day | Question 24 of 65"
  description: "🔐 Who Holds the Keys? AWS KMS vs. CloudHSM!

    The Scenario: Your compliance team is laying down the law—they need \"Full Control\" over the encryption keys. This means the power to create, disable, and even schedule the destruction of keys, all while keeping a perfect paper trail.

    The Challenge: AWS has multiple ways to handle keys. Do you go with the fully managed ease of KMS, or do you need the heavy-duty isolation of CloudHSM? 🧐

    The Solution: Customer Managed Keys (CMKs) in AWS KMS 🎯

    - Customer Managed Keys (CMK): Unlike \"AWS Managed Keys,\" these give you the driver's seat. You control the key policies, rotation, and lifecycle (including scheduling deletion).

    - Auditability: Every single time a key is used to encrypt or decrypt, AWS CloudTrail logs it. Your compliance team gets a detailed report of who used which key and when.-\ 

    - The \"Full Control\" Secret: While CloudHSM offers dedicated hardware (FIPS 140-2 Level 3), for most \"Full Control\" exam questions that mention CloudTrail auditability and lifecycle management, KMS Customer Managed Keys are the scalable, cost-effective answer.

    The Big Takeaway: If the requirement is \"Full Control\" + \"CloudTrail Integration,\" think KMS Customer Managed Keys first! 🚀

    👆 Watch the full video to see why CloudHSM might be overkill (and more expensive) for this specific requirement!

    👉 Save this to crush your SAA-C03 security questions!

    #AWS #SolutionsArchitect #KMS #CloudSecurity #Encryption #CloudTrail #DataProtection #Compliance #AWSCertification #CyberSecurity #SAAC03 #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT2M47S"
  publishedAt: "2026-01-22T15:30:01Z"
  thumbnailUrl: "https://i.ytimg.com/vi/1FoEkNdY_D0/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=1FoEkNdY_D0"
processedAt: "2026-01-24T16:15:37.384Z"
source: "youtube"
tldr: "For AWS compliance requiring full key control (create/disable/delete), auditability via CloudTrail, and AWS-storage, the correct solution is customer-managed keys (CMKs) in AWS KMS."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1115
  outputTokens: 565
  totalTokens: 1680
  processingTimeMs: 13336
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
categories:
  - "DevOps & Infrastructure"
  - "Security"
tags:
  - "aws"
  - "compliance"
  - "encryption"
tagsNormalizedAt: "2026-03-01T21:19:30.395Z"
---

## Key Takeaways

This AWS certification question clarifies when to use specific key management solutions based on control, audit, and storage requirements. Key insights:

- **Customer-managed keys (CMKs)** provide full lifecycle control (create/disable/delete), Cloud

Trail integration for audit, and meet AWS infrastructure storage requirements

- **AWS-managed keys** are convenient but lack customer control over disabling/deletion

- **AWS-owned keys** are invisible to users with no audit trail

- **CloudHSM** provides full control but involves dedicated hardware management, making it overkill for basic compliance needs

## Summary

### Question Requirements Analysis

The video analyzes a certification question where a company needs: (1) full control over encryption keys (create/disable/delete), (2) auditable key usage via AWS Cloud

Trail, and (3) keys stored within AWS infrastructure (not on-premises).

### Options Evaluation

* **AWS-managed keys**: AWS controls lifecycle

- cannot disable/delete them

* **AWS-owned keys**: Completely invisible to customers with no audit trail

* **CloudHSM**: Provides full control but uses dedicated hardware modules

- overkill when FIPS standards aren't required

* **S3-managed keys (SSE-S3)**: Entirely managed by S3 with no customer lifecycle control

* **Customer-managed keys (CMKs)**: Meets all requirements

- full lifecycle management, Cloud

Trail logs all API calls (encrypt/decrypt), and keys reside in AWS KMS infrastructure

### Key Management Service (KMS) Key Types

AWS offers three KMS key types with varying control levels:

- **AWS-owned keys**: Used across multiple accounts, invisible to users

- **AWS-managed keys**: Created/managed by AWS per service, visible but AWS-controlled

- **Customer-managed keys**: Full customer control with policy configuration

### Practical Application

The minimal viable solution for these requirements is **customer-managed keys** - they provide the necessary control without unnecessary complexity or cost of CloudHSM when advanced hardware security isn't mandated.

## Context

This content matters for AWS Solutions Architect Associate certification candidates and cloud professionals designing compliant architectures. Understanding AWS key management options is crucial for meeting security and compliance requirements in regulated industries like finance and healthcare. As data protection regulations tighten globally, knowing when to use CMKs versus other key types helps balance control with operational efficiency while maintaining audit trails.