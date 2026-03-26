---
metadata:
  videoId: "Vgt6Zqj_oe8"
  title: "Azure DevOps Engineer Question 23"
  description: "The best strategy to retain standard artifacts for 30 days while keeping production artifacts indefinitely is to set a global 30-day retention policy and manually mark production releases to be retained. Unlike using Azure Blob storage without a policy (unbounded costs), manual deletion (error-prone), or pipeline variables (not for enforcement), this approach leverages the native capability of Azure Pipelines to override global retention for specific runs.  This ensures that temporary build data is automatically purged while critical deployment records remain secure and accessible for as long as needed.


    #AZ400 #AzureDevOps #CICD #RetentionPolicy #CloudComputing #DevOps #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M8S"
  publishedAt: "2026-03-25T15:01:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Vgt6Zqj_oe8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Vgt6Zqj_oe8"
processedAt: "2026-03-26T21:12:48.543Z"
source: "youtube"
tldr: "For Azure DevOps pipeline artifact retention, set a global 30-day policy and override it for production releases by marking them 'retain indefinitely' to meet organizational requirements."
tools:
  - name: "Azure DevOps"
    url: null
  - name: "Azure Pipelines"
    url: null
  - name: "Azure Blob Storage"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Security"
  - "Tools & Productivity"
tags:
  - "automation"
  - "azure"
  - "best-practices"
  - "ci-cd"
  - "policy"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1688
  outputTokens: 689
  totalTokens: 2377
  processingTimeMs: 39180
tagsNormalizedAt: "2026-03-26T21:34:16.647Z"
---

## Key Takeaways

This video explains the correct Azure Pipelines configuration for artifact retention policies. Key insights include:

* The correct solution is **Option A**: set a global 30-day retention policy and mark production releases as retain indefinitely

* **Azure Pipelines supports flexible retention policies** that can be set globally and overridden for specific pipeline runs

* Alternative approaches like blob storage without policies, manual deletion, or using variables are incorrect due to cost, scalability, and enforcement issues

## Summary

This certification prep question addresses how to properly configure artifact retention in Azure Pipelines when an organization needs different retention periods for different types of artifacts.

**The Requirement:** The organization wants to keep most pipeline artifacts for only 30 days, but needs to retain production release artifacts indefinitely. This creates a dual-requirement scenario where a one-size-fits-all policy won't work.

**The Correct Solution (Option A):** Azure Pipelines provides built-in retention policy capabilities that support this exact use case. You can configure a global retention policy (in this case, 30 days) that applies to all pipeline runs by default. Then, for specific runs that need different treatment, you can override this policy by marking those runs as "retain indefinitely." Production releases would receive this special designation.

**Why Other Options Fail:**

* **Option B (Azure Blob Storage with no policy):** This doesn't enforce automatic cleanup, potentially leading to unbounded storage costs as artifacts accumulate without limit

* **Option C (Manual deletion each month):** This approach is error-prone, not scalable, and relies on human intervention which can be forgotten or mishandled

* **Option D (Pipeline variables):** Variables are designed for configuration purposes, not for enforcing retention policies, making them unsuitable for this requirement

**Implementation Approach:** When configuring Azure Pipelines, administrators would navigate to the retention policy settings, set the default retention period to 30 days, and then ensure that production release pipelines are configured to override this default with the "retain indefinitely" setting. This approach automatically cleans up non-production artifacts while preserving important production artifacts indefinitely.

## Context

This video is part of Azure DevOps certification preparation, specifically addressing the AZ-400 exam which focuses on designing and implementing DevOps solutions. Proper artifact retention strategies are critical for managing costs, compliance, and storage efficiency in CI/CD pipelines. DevOps teams need to balance keeping artifacts long enough for debugging and rollbacks while avoiding uncontrolled storage costs. This question tests understanding of Azure Pipelines' native capabilities versus alternative storage approaches.