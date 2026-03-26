---
metadata:
  videoId: "UWGCKcDMS64"
  title: "Azure DevOps Engineer Question 23"
  description: "The best strategy to retain standard artifacts for 30 days while keeping production artifacts indefinitely is to set a global 30-day retention policy and manually mark production releases to be retained. Unlike using Azure Blob storage without a policy (unbounded costs), manual deletion (error-prone), or pipeline variables (not for enforcement), this approach leverages the native capability of Azure Pipelines to override global retention for specific runs.  This ensures that temporary build data is automatically purged while critical deployment records remain secure and accessible for as long as needed.


    #AZ400 #AzureDevOps #CICD #RetentionPolicy #CloudComputing #DevOps #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M8S"
  publishedAt: "2026-03-26T12:16:22Z"
  thumbnailUrl: "https://i.ytimg.com/vi/UWGCKcDMS64/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=UWGCKcDMS64"
processedAt: "2026-03-26T21:11:36.132Z"
source: "youtube"
tldr: "For Azure DevOps pipeline artifacts, set a global 30-day retention policy and mark production releases as 'retain indefinitely' to meet requirements for keeping production artifacts longer while automatically cleaning up non-production artifacts."
tools:
  - name: "Azure DevOps"
    url: null
  - name: "Azure Pipelines"
    url: null
  - name: "Azure Blob Storage"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Security"
  - "Tools & Productivity"
tags:
  - "automation"
  - "azure"
  - "ci-cd"
  - "policy"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1688
  outputTokens: 541
  totalTokens: 2229
  processingTimeMs: 7572
tagsNormalizedAt: "2026-03-26T21:34:22.334Z"
---

## Key Takeaways

This video explains the correct Azure DevOps retention strategy for pipeline artifacts. Key insights include:

*   **Set a global retention policy** (e.g., 30 days) for automatic cleanup of most artifacts.

*   **Override the policy for specific runs** by marking production releases as 'retain indefinitely'.

*   Avoid incorrect methods like using blob storage without policies, manual deletion, or pipeline variables for retention enforcement.

## Summary

This certification prep question addresses designing a retention strategy for Azure Pipeline artifacts with specific requirements: keeping general artifacts for 30 days while retaining production release artifacts indefinitely.

The correct configuration is to **set a global 30-day retention policy and mark production releases as retain indefinitely**. This approach leverages Azure Pipelines' built-in retention policy system, which allows for a default rule that can be overridden for specific, important pipeline runs.

Several incorrect options are analyzed:

*   **Storing all artifacts in Azure Blob storage with no policy** is incorrect because it lacks automatic cleanup enforcement, potentially leading to unbounded storage costs.

*   **Manually deleting artifacts each month** is error-prone and not scalable for an organization.

*   **Using pipeline variables to control retention** is incorrect because variables are intended for configuration, not for enforcing retention rules.

The solution efficiently meets the dual requirement by automating cleanup for non-production work while preserving critical production artifacts indefinitely without manual intervention.

## Context

This content is part of preparation for the Azure DevOps Engineer certification (AZ-400). Proper artifact retention is a critical operational and cost-control concern in CI/CD pipelines. Managing storage costs while preserving necessary artifacts for compliance, debugging, or rollback purposes is a common challenge for DevOps teams implementing continuous delivery. This question tests practical knowledge of Azure Pipelines' configuration capabilities for real-world scenarios.