---
title: "Milvus 2025 Roadmap — Tell Us What You Think"
author: "Vector Database AI"
platform: "medium"
publicationName: "Vector Database AI"
url: "https://medium.com/vector-database/milvus-2025-roadmap-tell-us-what-you-think-524b2f77ec36?source=rss----e87dfc9fdbb6---4"
publishedAt: "2025-04-28"
tags:
  - "ai"
  - "databases"
---

# Milvus 2025 Roadmap — Tell Us What You Think

# Milvus 2025 Roadmap — Tell Us What You Think

[Milvus](/@milvusio?source=post_page---byline--524b2f77ec36---------------------------------------)

4 min read·Apr 24, 2025

\--

![]()

Hey, Milvus users and contributors!

We’re excited to share our [**Milvus 2025 roadmap**](https://milvus.io/docs/roadmap.md) with you. 🚀 This technical plan highlights the key features and improvements we’re building to make Milvus even more powerful for your vector search needs.

But this is just the beginning — we want your insights! Your feedback helps shape Milvus, ensuring it evolves to meet real-world challenges. Let us know what you think and help us refine the roadmap as we move forward.

### The Current Landscape

Over the past year, we’ve seen many of you build impressive RAG and agent applications with Milvus, leveraging many of our popular features, such as our model integration, full-text search, and hybrid search. Your implementations have provided valuable insights into real-world vector search requirements.

As AI technologies evolve, your use cases are becoming more sophisticated — from basic vector search to complex multimodal applications spanning intelligent agents, autonomous systems, and embodied AI. These technical challenges are informing our roadmap as we continue to develop Milvus to meet your needs.

### Two Major Releases in 2025: Milvus 2.6 and Milvus 3.0

In 2025, we’re rolling out two major versions: Milvus 2.6 (Middle of CY25) and Milvus 3.0 (end of 2025).

**Milvus 2.6** focuses on core architecture improvements you’ve been asking for:

-   Simpler deployment with fewer dependencies (goodbye, deployment headaches!)
-   Faster data ingestion pipelines
-   Lower storage costs (we hear your production cost concerns)
-   Better handling of large-scale data operations (delete/modify)
-   More efficient scalar and full-text search
-   Support for the latest embedding models you’re working with

**Milvus 3.0** is our bigger architectural evolution, introducing a vector data lake system for:

-   Seamless AI service integration
-   Next-level search capabilities
-   More robust data management
-   Better handling of those massive offline datasets you’re working with

### Technical Features We’re Planning — We Need Your Feedback

Below are key technical features we are planning to add to Milvus.

| **Key Feature Area** | **Technical Features** | | — — — — — — — — — — — — — — — — — — — — | — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — | | **AI-Driven Unstructured Data Processing** | — Data-In/Out: Native integration with major model services for raw text ingestion
\- Original Data Handling: Text/URL reference support for raw data processing
\- Tensor Support: Vector list implementation (for ColBERT/CoPali/Video scenarios)
\- Extended Data Types: DateTime, Map, GIS support based on requirements
\- Iterative Search: Query vector refinement through user‘s feedback | | **Search Quality & Performance Improvements** | — Advanced Matching: phrase\_match & multi\_match capabilities
\- Analyzer Upgrade: Enhance Analyzer with expanded tokenizer support and improved observability
\- JSON Optimization: Faster filtering through improved indexing
\- Execution Sorting: Scalar field-based result ordering
\- Advanced Reranker: Model-based reranking & custom scoring functions
\- Iterative Search: Query vector refinement through user‘s feedback | | **Data Management Flexibility** | — Schema Change: Add/delete field, modify varchar length
\- Scalar Aggregations: count/distinct/min/max operations
\- Support UDF: Support user-defined function
\- Data Versioning: Snapshot-based rollback system
\- Data Clustering: Co-location through configuration
\- Data Sampling: Fast get results based on sampling data | | **Architectural Improvements** | — Stream Node: Simplified incremental data ingestion
\- MixCoord: Unified coordinator architecture
\- Logstore Independence: Reduced external dependencies like pulsar
\- PK Deduplication: Global primary key deduplication | | **Cost Efficiency & Architecture Improvements** | — Tiered Storage: Hot/cold data separation for lower storage cost
\- Data Evict Policy: Users can define their own data evict policy
\- Bulk Updates: Support field-specific value modifications, ETL, etc
\- Large TopK: Returns massive datasets
\- VTS GA: Connect to different sources of data
\- Advanced Quantization: Optimize memory consumption and performance based on quantization techniques
\- Resource Elasticity: Dynamically scale resources to accommodate varying write loads, read loads, and background task loads |

As we implement this roadmap, we’d appreciate your thoughts and feedback on the following:

1.  **Feature priorities:** Which features in our roadmap would have the most impact on your work?
2.  **Implementation ideas:** Any specific approaches you think would work well for these features?
3.  **Use case alignment:** How do these planned features align with your current and future use cases?
4.  **Performance considerations:** Any performance aspects we should focus on for your specific needs?

**Your insights help us make Milvus better for everyone. Feel free to share your thoughts on our** [**Milvus Discussion Forum**](https://github.com/milvus-io/milvus/discussions/40263) **or our** [**Discord Channel**](https://discord.com/invite/8uyFbECzPX)**.**

### Welcome to Contribute to Milvus

As an open-source project, Milvus always welcomes your contributions:

-   **Share feedback:** Report issues or suggest features through our [GitHub issue page](https://github.com/milvus-io/milvus/issues)
-   **Code contributions:** Submit pull requests (see our [Contributor’s Guide](https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md))
-   **Spread the word:** Share your Milvus experiences and [star our GitHub repository](https://github.com/milvus-io/milvus)

We’re excited to build this next chapter of Milvus with you. Your code, ideas, and feedback drive this project forward!

— The Milvus Team