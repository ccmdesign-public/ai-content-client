---
metadata:
  videoId: "M57MeOY-n3g"
  title: "Artie: Real Time Data Streaming For The AI Age"
  description: "In this episode of Founder Firesides, YC Managing Partner Jared Friedman talks to the founders of Artie (S23), Jacqueline Cheong and Robin Tang, who have just announced their Series A. Artie is a real-time data streaming platform for cutting edge companies, streaming up-to-date and reliable data between systems in real time."
  channel: "YC Root Access"
  channelId: "UCxIJaCMEptJjxmmQgGFsnCg"
  duration: "PT26M34S"
  publishedAt: "2026-01-26T16:00:35Z"
  thumbnailUrl: "https://i.ytimg.com/vi/M57MeOY-n3g/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=M57MeOY-n3g"
processedAt: "2026-02-23T14:19:30.011Z"
source: "youtube"
tldr: "Artie is a real-time data streaming platform that helps companies move production data between systems (like Postgres to Snowflake) with low latency, solving a hard infrastructure problem that previously required massive in-house teams and years to build, and has processed 700B+ rows for customers like Substack."
tools:
  - name: "Postgres"
    url: null
  - name: "Snowflake"
    url: null
  - name: "Databricks"
    url: null
  - name: "BigQuery"
    url: null
  - name: "Retool"
    url: null
  - name: "HubSpot"
    url: null
  - name: "Zendesk"
    url: null
  - name: "Maxwell"
    url: null
  - name: "MongoDB"
    url: null
  - name: "Kafka"
    url: null
  - name: "SQL Server"
    url: null
  - name: "Redshift"
    url: null
  - name: "Elasticsearch"
    url: null
  - name: "Snowpipe"
    url: null
  - name: "Google Sheets"
    url: null
categories:
  - "Business & Career"
  - "Data & Analytics"
tags:
  - "data-pipeline"
  - "startup"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 18256
  outputTokens: 822
  totalTokens: 19078
  processingTimeMs: 17872
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
tagsNormalizedAt: "2026-03-01T21:19:30.512Z"
---

## Key Takeaways

Artie addresses the critical need for real-time data movement in the AI era.

## Summary

Artie is a **real-time data streaming platform** built to solve a pervasive infrastructure problem: moving production data between systems (like databases and data warehouses) with low latency and high reliability. Founders Robin and Jacqueline identified this pain point after repeatedly seeing companies spend 1-2 years and large engineering teams trying to build similar internal solutions, often unsuccessfully.

The core problem is that **change data capture (CDC)** and real-time streaming are mission-critical yet extremely complex to implement at scale. Companies like Netflix and DoorDash have massive internal teams dedicated to this, but most organizations lack the resources and expertise. Artie packages this complex distributed systems capability into a product, starting with connectors like Postgres to Snowflake.

Their journey began with a **cold email to Substack**, which became their first major customer despite the high-stakes nature of the deployment. This initial success was followed by a slow but steady growth period, reaching about 7-8 customers during YC. The founders intentionally kept the team very small (just four people at $1M ARR) to maintain tight feedback loops between engineering and sales, allowing them to move quickly on feature requests.

Building Artie involved solving numerous deep technical challenges: handling **billions of rows**, ensuring **data ordering guarantees**, managing **schema evolution**, and debugging issues in underlying dependencies like Kafka SDKs. Each new customer and data source revealed new edge cases, from handling messy data to optimizing backfills for tables with 10B+ rows.

Looking forward, Artie is expanding beyond database CDC to include an **Events API** for sub-200ms latency to data warehouses and new destinations like Elasticsearch. The company recently raised a $12M Series A and plans to triple its team to support processing trillions of rows as real-time data becomes increasingly crucial for AI workloads and agentic AI use cases.

## Context

In the AI era, real-time access to fresh production data is becoming critical for analytics, experimentation, and powering AI applications. However, building reliable, low-latency data pipelines is a complex distributed systems problem that traditionally requires massive engineering investment. Artie addresses this by providing a managed platform that abstracts away this complexity, allowing companies to focus on their core products rather than infrastructure.