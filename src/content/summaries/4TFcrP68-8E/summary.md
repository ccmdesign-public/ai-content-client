---
metadata:
  videoId: "4TFcrP68-8E"
  title: "AWS Solutions Architect Question of the Day | Question 21 of 65"
  description: "Struggling with automatic credential rotation? Let's break it down step by step!


    The scenario: A company needs to rotate RDS MySQL credentials every 30 days automatically.


    The challenge: How do you design this securely without downtime or exposing passwords to developers?


    The solution: AWS Secrets Manager 🔐


    👉 Ready to ace your AWS Solutions Architect certification? Enroll in our comprehensive course with hands-on labs, practice exams, and expert guidance: https://kode.wiki/3YIuZUE


    💾 Save this series for your certification journey!


    #AWS #CloudComputing #SecretsManager #AWSSolutions #CloudCertification #SolutionsArchitect #CloudSecurity #CloudCareer #ITJobs #TechLearning #CertificationPrep #CloudEngineer #CareerDevelopment #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT2M14S"
  publishedAt: "2026-01-20T06:03:28Z"
  thumbnailUrl: "https://i.ytimg.com/vi/4TFcrP68-8E/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=4TFcrP68-8E"
processedAt: "2026-01-20T17:06:16.234Z"
source: "youtube"
tldr: "For AWS RDS MySQL database credentials requiring **automatic rotation every 30 days without downtime**, use **AWS Secrets Manager** with its built-in RDS rotation Lambda; avoid manual solutions like Parameter Store, environment variables, or S3 files."
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 955
  outputTokens: 783
  totalTokens: 1738
  processingTimeMs: 23279
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tools:
  - name: "AWS Secrets Manager"
    url: null
  - name: "AWS Systems Manager Parameter Store"
    url: null
  - name: "Amazon RDS"
    url: null
  - name: "MySQL"
    url: null
  - name: "AWS Lambda"
    url: null
  - name: "Amazon EC2"
    url: null
  - name: "Amazon S3"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Security"
tags:
  - "aws"
  - "best-practices"
  - "encryption"
tagsNormalizedAt: "2026-03-01T21:19:30.342Z"
---

## Key Takeaways

This video explains the correct AWS service for managing rotating database credentials with specific security requirements. Key insights include:

*   **AWS Secrets Manager** is the definitive solution for **automatically rotating RDS database credentials** on a schedule (e.g., every 30 days) without application downtime.

*   **AWS Systems Manager Parameter Store**, while cheaper and suitable for encrypted secrets, lacks built-in automatic rotation, requiring manual intervention.

*   **Environment variables** and **encrypted S3 files** are poor choices as they require manual updates or redeployments, risking downtime and failing the security requirement of hiding plain-text passwords from developers.

## Summary

This video walks through an AWS Solutions Architect Associate certification question focused on secure secret management for a legacy application migration.

### The Problem Scenario
A company is migrating an application using Amazon RDS MySQL to AWS. The security team mandates that database credentials must **rotate automatically every 30 days** without causing application downtime. Furthermore, developers should not have access to view the actual plain-text passwords.

The core requirements identified are:

*   Management of sensitive secrets (database credentials).

*   **Automatic, scheduled rotation** without manual intervention.

*   Native integration with **RDS MySQL**.

### Evaluating the Options
Four potential solutions are presented and analyzed:

1.  **AWS Systems Manager Parameter Store (Secure String) with a custom Lambda**: This stores secrets securely but **lacks built-in automatic rotation**. Implementing rotation requires manual coding and management, so it does not meet the requirement.

2.  **Environment Variables on EC2 Instances**: Updating these requires a monthly deployment, which is manual, can cause downtime, and exposes credentials in plain text during updates.

3.  **AWS Secrets Manager with Automatic Rotation**: This is the correct answer. Secrets Manager is **designed for this exact use case**, offering:

*   **Built-in, configurable automatic rotation** (e.g., every 30 days).

*   A **native rotation Lambda function for RDS databases** (including MySQL), requiring no custom code.

*   Seamless integration where the application retrieves the current secret version, ensuring **zero downtime** during rotation.

*   Developers only need permissions to *retrieve* the secret, not view its plain-text value.

4.  **Encrypted File in Amazon S3**: Like option one, this requires **manual updates** every 30 days. S3 is not designed for secrets management or automatic rotation workflows.

### The Verdict
When the requirements include **"automatic rotation" plus "database credentials," AWS Secrets Manager is the prescribed AWS service**. Parameter Store is a valid, lower-cost alternative for *static* secrets, but it cannot fulfill the automatic rotation requirement. The key takeaway is to match the service's core features—Secrets Manager's rotation capability—to the specific operational and security constraints of the problem.

## Context

This question is critical for the AWS Solutions Architect Associate certification and real-world cloud architecture. It tests understanding of **AWS's managed services for security and compliance**, specifically differentiating between services for static vs. dynamically rotating secrets. As companies migrate legacy applications to the cloud, securely managing credentials without refactoring entire applications is a common challenge. This knowledge is essential for architects and Dev

Ops engineers designing secure, maintainable, and compliant systems on AWS.