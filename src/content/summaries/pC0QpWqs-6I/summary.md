---
metadata:
  videoId: "pC0QpWqs-6I"
  title: "Azure DevOps Engineer Exam: Question 21"
  description: "Azure Pipelines: Mastering Stage Order! 🚀 #shorts

    Goal: Ensure your Production stage triggers automatically—but only after the Test stage succeeds.


    The Solution: dependsOn 🎯


    - The Winner: Use the dependsOn property in your YAML stage definition.


    - The Logic: It creates a functional link where \"\"Stage B\"\" waits for \"\"Stage A\"\" to finish with a Succeeded status.


    Why not others? Manual approvals stop automation, standalone pipelines lack native tracking, and parallel jobs run simultaneously, breaking your deployment flow.


    Exam Tip: For AZ-400, \"\"sequential stages\"\" or \"\"success dependencies\"\" = dependsOn. 🛠️


    #AZ400 #AzureDevOps #YAML #CI/CD #PipelineAutomation #DevOps #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M14S"
  publishedAt: "2026-03-23T07:33:44Z"
  thumbnailUrl: "https://i.ytimg.com/vi/pC0QpWqs-6I/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=pC0QpWqs-6I"
processedAt: "2026-03-24T19:26:12.196Z"
source: "youtube"
tldr: "In Azure Pipelines, to ensure a production stage only runs after a test stage succeeds, use the declarative `dependsOn` dependency model, not manual approvals, separate pipelines, or parallel jobs."
tools:
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
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1751
  outputTokens: 570
  totalTokens: 2321
  processingTimeMs: 22075
tagsNormalizedAt: "2026-03-24T22:59:02.157Z"
---

## Key Takeaways

This video explains the correct mechanism for enforcing stage dependencies in Azure DevOps multi-stage YAML pipelines.

*   The correct answer is **B: pipeline stage dependency using `dependsOn`**.

*   **Manual approvals** (Option A) are orthogonal to automatic success dependencies and introduce a human step.

*   **Separate standalone pipelines** (Option C) do not enforce intrinsic ordering and require manual coordination.

*   **Parallel pipeline jobs** (Option D) execute concurrently and violate the 'after test stage' requirement.

## Summary

This certification prep question focuses on enforcing execution order and success dependencies between stages in an Azure DevOps multi-stage YAML pipeline.

The scenario describes a pipeline with stages to build an app, run tests, and then deploy to test and production environments. The critical requirement is that the production stage must only run if the test stage completes successfully.

The video systematically eliminates incorrect options. Option A (manual approval) is rejected because it adds a human intervention step and is not designed for automatic dependency enforcement based on stage success. Option C (separate pipelines) is incorrect as it breaks the pipeline into disjointed parts, losing built-in dependency management and requiring external coordination. Option D (parallel jobs) is wrong because parallel execution contradicts the sequential requirement of running production *after* test.

The correct solution, Option B, leverages Azure Pipelines' native **`dependsOn`** keyword within the YAML definition. This allows you to declaratively specify that the production stage depends on the successful completion of the test stage. This model is the preferred, built-in method for controlling stage order and success-based triggers in a multi-stage pipeline, ensuring reliability and automation.

## Context

This content is part of preparation for the Azure DevOps Engineer certification (AZ-400), which validates skills in designing and implementing DevOps practices. Understanding how to properly structure CI/CD pipelines with dependencies is a core competency for DevOps professionals working with Azure. It ensures deployments are reliable, automated, and follow best practices by preventing production releases from occurring if earlier quality gates (like tests) fail.