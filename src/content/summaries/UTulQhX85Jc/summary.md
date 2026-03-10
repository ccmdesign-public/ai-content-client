---
metadata:
  videoId: "UTulQhX85Jc"
  title: "Talk to your data: Build AI agents to query databases & analyze video (Google ADK)"
  description: "Try out the Agent Development Kit (ADK) → https://goo.gle/4u2dltM


    Look, we’re all a little tired of \"cute\" AI chatbots that don't actually do anything. In this video, Ana Esqueda shows Martin Omander how to build a tool that provides real business value using the Agent Development Kit (ADK).


    We’re moving beyond the sandbox to build a Marketing Optimizer Agent that democratizes data access. Instead of writing SQL, you can just \"talk\" to your database to pull performance metrics or use Gemini’s multi-modal capabilities to analyze the narrative of a YouTube video.


    The Tech Stack:

    1️⃣ Logic: Built with the ADK and deployed to agent engine.

    2️⃣ Backend: A FastAPI app hosted on Cloud Run.

    3️⃣ Data: Direct queries to BigQuery and video analysis via Gemini.

    It’s a practical look at how to stop building toys and start building tools that combine quantitative data with qualitative insights.


    Resources

    Multi-tool sample code for ADK → https://goo.gle/46A4Goz

    Deploy your agent → https://goo.gle/4u55yLU

    BigQuery MCP server: https://goo.gle/3OUDQRQ


    Chapters:

    0:00 - Intro

    1:27 - Marketing optimizer agent

    2:07 - Ask questions about your data

    3:15 - Analyze what makes videos successful

    4:03 - Code walkthrough

    5:50 - Tech used

    6:20 - App architecture

    6:52 - How to build this yourself

    7:20 - Takeaways


    Watch more Serverless Expeditions → https://goo.gle/ServerlessExpeditions

    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    #Serverless #GoogleCloud


    Speakers: Martin Omander, Ana Esqueda

    Products Mentioned: BigQuery, Cloud Run, Agent Development Kit, Gemini"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT8M16S"
  publishedAt: "2026-03-05T17:00:50Z"
  thumbnailUrl: "https://i.ytimg.com/vi/UTulQhX85Jc/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=UTulQhX85Jc"
processedAt: "2026-03-10T16:09:35.105Z"
source: "youtube"
tldr: "Google's Agent Development Kit (ADK) enables developers to build AI agents that democratize access to company data by querying databases like BigQuery and analyzing multimedia content using Google Gemini, moving beyond simple chatbots to deliver real business insights."
tools:
  - name: "Google Agent Development Kit (ADK)"
    url: null
  - name: "Agent Engine"
    url: null
  - name: "Google Cloud Run"
    url: null
  - name: "FastAPI"
    url: null
  - name: "BigQuery"
    url: null
  - name: "Google Gemini"
    url: null
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "DevOps & Infrastructure"
tags:
  - "agents"
  - "data-science"
  - "gcp"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 6030
  outputTokens: 892
  totalTokens: 6922
  processingTimeMs: 29594
tagsNormalizedAt: "2026-03-10T16:43:24.490Z"
---

## Key Takeaways

This video demonstrates how to build practical AI agents that provide real business value by connecting to organizational data and analyzing multimedia content.

- **AI agents can democratize data access** by allowing non-technical users to query databases and get insights without writing SQL.

- **Google's Agent Development Kit (ADK)** simplifies agent creation by managing the infrastructure, letting developers focus on defining agent behavior and tools.

- **Multimodal AI (Gemini)** enables analysis of diverse data types—text, images, and video—to extract qualitative insights from marketing creatives.

- **Effective AI applications combine human and AI collaboration** to interpret data and generate actionable business recommendations.

## Summary

The video features Anna, a customer solutions engineer at Google, demonstrating a practical AI application called the **Marketing Optimizer Agent**. This agent helps advertisers analyze historical campaign data and video creatives to generate actionable insights.

### How the Agent Works

Users interact with the agent through a web interface to ask questions about their marketing data. The agent then selects appropriate tools to respond—such as querying a database for campaign performance metrics or analyzing a YouTube video's content.

A key example shown is asking the agent which marketing campaigns are running for a Pixel phone product. The agent intelligently requests missing information (like a date range), queries the database, and returns metrics like impressions, clicks, and revenue.

The agent can also perform sophisticated analysis, such as determining why a particular video ad performed well. It uses **Google Gemini** to watch the video, identify themes, emotional tone, visual and audio elements, and extract the core messaging. It then provides actionable next steps to replicate the video's success.

### Technical Architecture

- The **Agent Development Kit (ADK)** is used to build and define the agent's behavior, tools, and instructions.

- The agent is deployed to **Agent Engine** on Google Cloud, which provides a managed runtime and a playground for testing.

- End-users interact via a web app hosted on **Cloud Run**, with a **FastAPI** backend that connects to the agent in Agent Engine.

- Tools are defined as functions—one composes and executes SQL queries against databases (like **BigQuery**), while another uses the **Gemini API** to analyze video content from a URL.

### Development Insights

Anna highlights that the ADK documentation and examples were crucial for building the application. The platform manages the agent infrastructure, allowing developers to concentrate on defining what the agent does and what tools it can use. She emphasizes that AI is particularly powerful at combining quantitative data (database metrics) with qualitative data (video content analysis) to deliver comprehensive insights.

## Context

Many AI chatbot applications are novel but fail to deliver tangible business value. This video addresses that gap by showcasing a real-world application built on Google Cloud that enables data democratization and multimedia analysis. It is relevant for developers, product managers, and business leaders looking to leverage AI for practical insights, especially in marketing, analytics, and any domain where combining structured data with unstructured content (videos, images) is key to decision-making.