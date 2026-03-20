---
metadata:
  videoId: "HArvXvpx-EM"
  title: "Azure DevOps Engineer Exam: Question 7"
  description: "Azure App Service: Zero-Downtime Swaps! 🏗️


    The Challenge: Update a web app in Azure App Service with Zero Downtime.


    The Failures:

    - FTP/Direct Push: Overwrites files live—risks \"\"broken states.\"\"

    - Single-Stage Pipeline: No safety net; if the build is bad, the site goes down.

    - Restarting: Causes a guaranteed outage.


    The Win: Deployment Slots 🎯

    - The Strategy: Deploy to a Staging Slot first.

    - Warm-up: Validate the app in the staging environment while production stays live.

    - The Swap: Perform a Slot Swap. Azure reroutes traffic instantly—no downtime, no sweat.


    Exam Tip: For AZ-400, \"\"Zero Downtime\"\" for Azure App Service always equals Deployment Slots + Swap. 🚀


    #AZ400 #Azure #DevOps #AppService #CloudComputing #ZeroDowntime #CICD #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M7S"
  publishedAt: "2026-03-07T11:18:05Z"
  thumbnailUrl: "https://i.ytimg.com/vi/HArvXvpx-EM/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=HArvXvpx-EM"
processedAt: "2026-03-10T14:03:22.340Z"
source: "youtube"
tldr: "For Azure App Service web apps requiring zero-downtime production deployments, use deployment slots with swap operations between staging and production, not FTP, direct pipeline deployment, or app restarts."
tools:
  - name: "Azure App Service"
    url: null
  - name: "Azure DevOps"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "automation"
  - "azure"
  - "best-practices"
  - "ci-cd"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1694
  outputTokens: 656
  totalTokens: 2350
  processingTimeMs: 22824
tagsNormalizedAt: "2026-03-10T16:47:06.276Z"
---

## Key Takeaways

This exam question focuses on selecting the correct Azure deployment strategy for zero downtime. The key insights are:

- **Deployment slots with swap** is the correct method for near-zero downtime in Azure App Service.

- **FTP deploys**, **direct pipeline deployments**, and **app restarts** all introduce downtime risks and are incorrect.

- The swap operation is atomic and fast, allowing validation in staging before switching to production.

## Summary

This video addresses question 7 from an Azure DevOps certification exam, focusing on deployment strategies for Azure App Service web applications that require zero-downtime deployments to production.

The question presents four deployment options and asks which best meets the zero-downtime requirement. The video systematically explains why three options are incorrect and one is correct.

### Why Other Options Fail

- **Option A (FTP deploy)**: Direct FTP deployment overwrites the production slot, which is not an atomic operation. This can cause downtime and inconsistent application states during the file transfer process.

- **Option B (Direct pipeline deployment)**: Using a single-stage pipeline to deploy directly to production without a staging environment increases the risk of downtime and broken states since there's no opportunity for validation before going live.

- **Option D (Restart app service)**: Restarting the App Service after each deployment introduces a noticeable outage period, directly contradicting the zero-downtime requirement.

### The Correct Solution

- **Option C (Deployment slots with swap)**: Azure App Service deployment slots allow you to deploy to a staging slot first, validate the application there, and then perform a swap operation to move it into production. This swap is fast and atomic, typically causing near-zero downtime and meeting the requirement for zero-downtime deployments.

The video emphasizes that deployment slots provide the safety of testing in a staging environment combined with the seamless transition to production through the swap mechanism, making it the optimal choice for production deployments where availability is critical.

## Context

This content is part of Azure certification exam preparation, specifically for the Azure DevOps Engineer certification (AZ-400). Zero-downtime deployments are a critical requirement for modern web applications, especially in production environments where any interruption can impact users and business operations. Azure App Service deployment slots provide a built-in mechanism to achieve this, making them essential knowledge for cloud engineers and DevOps professionals working with Azure infrastructure. Understanding these deployment patterns is fundamental to implementing reliable CI/CD pipelines in enterprise environments.