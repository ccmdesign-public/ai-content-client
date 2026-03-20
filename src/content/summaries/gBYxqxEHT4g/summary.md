---
metadata:
  videoId: "gBYxqxEHT4g"
  title: "Azure DevOps Engineer Exam: Question 10"
  description: "Parallel Cross-Platform Testing! 💻 #shorts


    Goal: Run tests on Windows, Linux, and macOS simultaneously to slash pipeline duration.


    The Solution: Parallel Jobs 🎯


    - The Win: Use Parallel Jobs with different agent pools.


    - How it Works: Define a strategy: matrix in YAML to target specific pools (e.g., windows-latest, ubuntu-latest).


    - The Result: Total platform validation in the time it takes for a single run.


    Why not others?


    - Single Agent: Slow; runs sequentially only.


    - Classic Builds: Inflexible compared to YAML.


    - No Jobs: Invalid; YAML requires jobs to execute.


    Exam Tip: For AZ-400, \"\"multi-platform + parallel\"\" = Parallel Jobs with Matrix. 🚀


    #AZ400 #AzureDevOps #CICD #ParallelTesting #DevOps #Automation #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M1S"
  publishedAt: "2026-03-09T12:59:51Z"
  thumbnailUrl: "https://i.ytimg.com/vi/gBYxqxEHT4g/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=gBYxqxEHT4g"
processedAt: "2026-03-10T13:59:00.785Z"
source: "youtube"
tldr: "To run platform-specific tests in parallel across Windows, Linux, and Mac OS in Azure DevOps, use parallel jobs with different agents, as classic builds, single agents, or YAML pipelines without jobs cannot achieve this."
tools:
  - name: "Azure DevOps"
    url: null
  - name: "Azure Pipelines"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Tools & Productivity"
tags:
  - "automation"
  - "azure"
  - "ci-cd"
  - "testing"
  - "workflow"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1678
  outputTokens: 493
  totalTokens: 2171
  processingTimeMs: 17461
tagsNormalizedAt: "2026-03-10T16:48:24.100Z"
---

## Key Takeaways

This video explains the correct Azure DevOps feature for running cross-platform tests in parallel.

## Summary

The question addresses a common scenario in Azure DevOps: designing a pipeline to run tests on multiple platforms (Windows, Linux, and Mac OS) in parallel to reduce overall execution time.

**Key Solution:** The correct answer is **parallel jobs with different agents**. This Azure Pipelines feature allows jobs to run simultaneously on distinct agent pools, each configured for a specific operating system. This directly enables the parallel execution of platform-specific tests.

**Why Other Options Are Incorrect:**
*   **Classic builds with no parallelism (Option B):** Classic builds do not support YAML-style parallel jobs and offer less flexibility for modern CI/CD workflows.

*   **Single agent builds with no stages (Option C):** A single agent can only run one job at a time, making it impossible to execute tests for different platforms concurrently.

*   **Pipeline YAML with no jobs (Option D):** A YAML pipeline definition without any jobs is invalid and cannot execute any tasks.

This approach aligns with Azure DevOps best practices for efficient, cross-platform continuous integration, where leveraging parallel infrastructure is key to speed.

## Context

This video is part of a certification preparation series for the Azure DevOps Engineer exam (AZ-400). It tests practical knowledge of Azure Pipelines for implementing efficient Continuous Integration/Continuous Deployment (CI/CD) strategies. Understanding how to architect pipelines for parallelism, especially across different operating systems, is a critical skill for DevOps engineers working in heterogeneous environments to accelerate software delivery.