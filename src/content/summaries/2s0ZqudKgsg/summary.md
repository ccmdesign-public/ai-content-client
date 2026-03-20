---
metadata:
  videoId: "2s0ZqudKgsg"
  title: "Microsoft Certified DevOps Engineer Question 6: Code Reuse"
  description: "Azure Pipelines: Reuse Your Code! 🏗️\ 


    The Scenario: Migrating from Classic to YAML Pipelines. You need to reuse common steps (Build/Test) across multiple projects without duplicating code.


    The Solution: YAML Templates 🎯

    - The Win (Option B): Use YAML Templates.

    - How it Works: Extract common steps into a standalone YAML file. Reference this file in any pipeline across your organization.

    - The Result: \"\"Don't Repeat Yourself\"\" (DRY) pipelines that are easier to maintain and update.


    Why not others?

    - Release Definitions: Part of the legacy Classic model.

    - Classic Build Templates: Deprecated and incompatible with YAML.


    Exam Tip: For AZ-400, \"\"reusable steps in YAML\"\" always means YAML Templates. 🚀


    #AZ400 #AzureDevOps #YAML #CI CD #DevOps #CloudComputing #Automation #TechTips #KodeKloud"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M1S"
  publishedAt: "2026-03-06T04:00:05Z"
  thumbnailUrl: "https://i.ytimg.com/vi/2s0ZqudKgsg/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=2s0ZqudKgsg"
processedAt: "2026-03-10T14:06:45.520Z"
source: "youtube"
tldr: "When migrating Azure pipelines from classic to YAML and needing to reuse common steps like build and test, the correct construct to use is YAML templates, not release definitions, classic build templates, or Gantt chart plans."
tools:
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
  inputTokens: 1711
  outputTokens: 608
  totalTokens: 2319
  processingTimeMs: 52577
tagsNormalizedAt: "2026-03-10T16:42:12.208Z"
---

## Key Takeaways

This video answers a Microsoft DevOps certification question about code reuse in Azure pipelines. The key takeaways are:

- **YAML templates** are the correct Azure DevOps construct for reusing common steps (like build and test) across multiple pipelines.

- **Release definitions** and **classic build templates** are part of the deprecated classic pipeline model and are not recommended for new YAML-based designs.

- **Gantt chart plans** are project management artifacts and do not provide technical step reuse.

- Using YAML templates aligns with Azure DevOps best practices for migration.

## Summary

This video is part of an A400 certification preparation series, specifically addressing question 6 of 50. The scenario involves migrating from classic Azure pipelines to YAML-based pipelines while needing to reuse common steps—such as build, test, and package—across multiple different pipelines.

The presenter systematically evaluates the four multiple-choice options:

- **Release Definitions (A)**: Incorrect because they are part of the classic pipeline model and are not recommended for new YAML-based designs.

- **Classic Build Templates (C)**: Incorrect because they are being deprecated and are not used in YAML pipelines.

- **Gantt Chart Plans (D)**: Incorrect because they are project management artifacts and do not provide a mechanism for technical step reuse.

- **YAML Templates (B)**: Correct. YAML templates allow you to extract common steps into a reusable file, which can then be referenced across multiple pipelines. This approach promotes code reuse, reduces duplication, and aligns with Azure DevOps best practices for modern, YAML-based pipeline architecture.

The video concludes by directing viewers to the full A400 course on KodeKloud's website for more in-depth learning.

## Context

This content is crucial for IT professionals, particularly DevOps engineers and platform engineers, who are responsible for building and maintaining CI/CD pipelines. As organizations modernize their DevOps toolchains, migrating from classic, UI-based pipeline editors to code-based, declarative YAML is a common trend. Understanding the correct constructs for maintaining efficiency—like code reuse—is essential for passing certification exams and for implementing scalable, maintainable automation in production environments. This directly connects to the broader industry shift toward Infrastructure as Code (IaC) and pipeline-as-code practices.