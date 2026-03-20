---
metadata:
  videoId: "vbZZ_rvxRtI"
  title: "Azure DevOps Engineer Exam: Question 8"
  description: "Reproducible Pipelines: No Agent Secrets! 🚀\ 


    The Goal: Build a pipeline that is auditable and reproducible without relying on an agent's \"local state.\"


    The Solution: Artifacts + Git 🎯

    - The Win: Store build artifacts in Azure Artifacts and version everything in Git.

    - Why it works: It removes \"\"hidden states.\"\" If an agent is deleted, your process isn't lost. Anyone can inspect Git and Azure Artifacts to see exactly what was deployed.

    - Avoid the Traps: Never rely on local disks or undocumented tools—they kill transparency and auditability.


    Exam Tip: For AZ-400, \"Reproducible/Auditable\" = Version Control + Remote Artifact Storage. 🚀


    #AZ400 #AzureDevOps #DevOps #CICD #AzureArtifacts #Automation #CloudComputing #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M7S"
  publishedAt: "2026-03-08T15:55:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/vbZZ_rvxRtI/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=vbZZ_rvxRtI"
processedAt: "2026-03-10T14:01:47.756Z"
source: "youtube"
tldr: "For an auditable and reproducible Azure DevOps pipeline that avoids agent local state, store all build artifacts in Azure artifacts and version control rather than using unconfigured self-hosted agents, local disk storage, or undocumented tools."
tools:
  - name: "Azure DevOps"
    url: null
  - name: "Git"
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
  - "git"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1699
  outputTokens: 560
  totalTokens: 2259
  processingTimeMs: 20194
tagsNormalizedAt: "2026-03-10T16:46:43.744Z"
---

## Key Takeaways

This video explains the correct practice for creating auditable and reproducible Azure DevOps pipelines. Key insights include:

- **Store build artifacts in Azure artifacts** and version control configurations in Git for full transparency

- **Avoid unconfigured self-hosted agents** which create inconsistent environments and hidden state

- **Never use local disk storage** for artifacts since they're not shareable and disappear with agent decommissioning

- **Documented, version-controlled processes** are essential for pipeline auditability and reproducibility

## Summary

This certification exam question focuses on best practices for creating auditable and reproducible pipelines in Azure DevOps.

When designing pipelines that must be auditable and reproducible while avoiding reliance on agent local state, the correct approach is **storing all build artifacts in Azure artifacts and versioning configurations in Git**. This allows anyone to inspect both the artifacts and source code to understand exactly what was deployed and when.

Several incorrect approaches are specifically called out: **Using self-hosted agents with no configuration** introduces inconsistent environments and hidden state that undermine reproducibility. **Storing build artifacts on local disk only** makes them unshareable and causes them to be lost when agents are decommissioned. **Relying on undocumented internal tools** reduces transparency and auditability, making it impossible to track changes or understand deployment history.

This approach represents a **core DevOps best practice** that ensures pipelines remain transparent, traceable, and repeatable across different environments and team members. By centralizing artifacts and maintaining version-controlled configurations, organizations can maintain compliance requirements, facilitate troubleshooting, and ensure consistent deployments.

## Context

This question is part of Azure DevOps certification preparation, specifically targeting professionals designing CI/CD pipelines that meet enterprise requirements for auditability and reproducibility. In regulated industries or organizations with strict compliance needs, pipelines must provide complete transparency into what was built, when, and how. This knowledge is essential for DevOps engineers, platform engineers, and anyone responsible for implementing robust deployment processes that can withstand audits and support troubleshooting across teams and environments.