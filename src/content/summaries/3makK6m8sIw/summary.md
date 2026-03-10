---
metadata:
  videoId: "3makK6m8sIw"
  title: "How to get started with Storage Intelligence"
  description: "Start a 30 day trial today. → https://goo.gle/3MDUFQr


    Learn how to use Storage Intelligence to gain visibility into your Google Cloud Storage environment and eliminate costly storage sprawl. This demo shows you how to identify duplicate files, find cold buckets from abandoned projects, and resolve regional misalignment using BigQuery and Looker. By following this workflow, you can scan billions of objects at scale to find actionable insights and reduce your cloud costs today."
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT4M35S"
  publishedAt: "2026-03-09T19:00:08Z"
  thumbnailUrl: "https://i.ytimg.com/vi/3makK6m8sIw/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=3makK6m8sIw"
processedAt: "2026-03-10T16:06:22.733Z"
source: "youtube"
tldr: "Google Cloud Storage Intelligence helps manage cloud storage sprawl by using BigQuery to centralize metadata and specialized views, enabling you to find and fix duplicate files, cold buckets, and regional misalignments across your entire organization."
tools:
  - name: "Google Cloud Storage"
    url: null
  - name: "Storage Intelligence"
    url: null
  - name: "BigQuery"
    url: null
  - name: "Looker"
    url: null
categories:
  - "Data & Analytics"
  - "DevOps & Infrastructure"
tags:
  - "analytics"
  - "data-pipeline"
  - "gcp"
  - "monitoring"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 3929
  outputTokens: 746
  totalTokens: 4675
  processingTimeMs: 24661
tagsNormalizedAt: "2026-03-10T16:47:59.827Z"
---

## Key Takeaways

Storage Intelligence provides a data-driven workflow to solve common cloud storage problems and optimize costs.

*   **Centralized Metadata Analysis:** It aggregates metadata for all objects across your organization into BigQuery, enabling powerful queries at scale.

*   **Specialized Views for Specific Problems:** Use the **object attributes view** to find duplicates, the **bucket activity view** to identify cold buckets, and the **bucket region activity view** to spot regional access misalignments.

*   **Actionable Output:** The query results are actionable manifests that can feed directly into batch operations for cleanup, such as deleting duplicate files.

## Summary

Cloud storage sprawl is inevitable, leading to duplicate files, abandoned project buckets, and multi-region buckets accessed only locally. Google Cloud's **Storage Intelligence** provides a systematic workflow to identify and remediate these issues.

### Getting Started with Storage Intelligence

First, configure Storage Intelligence from the Cloud Storage console by creating a dataset with a descriptive name and scoping it to your entire organization. Link this dataset to **BigQuery**, where the analysis happens. Initial data population can take up to 48 hours.

### Solving Three Core Problems

Once configured, you gain access to a library of specialized BigQuery views.

*   **Finding Duplicates:** Query the **object attributes view**, grouping objects by matching metadata like size, MD5 checksum, or name. This scans metadata for potentially billions of objects to generate a list of duplicates across different buckets. The output is a manifest usable for batch deletion operations.

*   **Identifying Cold Buckets:** Use the **bucket activity view** to find buckets with zero total requests. These unmanaged buckets represent both a cost optimization opportunity and a security governance risk.

*   **Spotting Regional Misalignment:** The **bucket region activity view** (often visualized via a pre-built **Looker** template dashboard) compares where a bucket is stored versus where it's accessed from. This helps identify multi-region buckets that are accessed almost exclusively from one region, indicating a candidate for bucket relocation.

The same Storage Intelligence workflow, powered by centralized metadata in BigQuery, provides verifiable insights to answer a wide range of questions about your storage state and drive cost savings and governance improvements.

## Context

As organizations scale their cloud usage, managing storage becomes increasingly complex and costly. 'Storage sprawl'—accumulating duplicate, abandoned, or misconfigured data—is a common challenge that leads to unnecessary expenses and security risks. This video is crucial for cloud architects, DevOps engineers, FinOps practitioners, and anyone responsible for managing and optimizing Google Cloud Storage at an organizational level, providing a concrete method to regain control and reduce waste.