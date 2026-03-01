---
metadata:
  videoId: "t6fbNGC_48c"
  title: "SQLite is 138x Slower Than This?! (Testing Stoolap)"
  description: "In this video, we put a new Rust-powered database called Stoolap to the test to see if it can truly outperform the industry-standard SQLite in a Node.js environment. We break down the high-performance architecture behind Stoolap, including its use of NAPI-RS for shared memory and Rayon for parallel execution, while navigating the real-world hurdles of building the native driver from source. Through live benchmarks of complex analytical queries, we reveal whether the 138 times faster claims hold up and define exactly when you should stick with SQLite or upgrade to this high-speed race car for data analysis.


    🔗 Relevant Links

    Stoolap: https://stoolap.io/

    Stoolap Node.js Driver: https://stoolap.io/blog/2026/02/19/introducing-stoolap-node/


    ❤️ More about us

    Radically better observability stack: https://betterstack.com/

    Written tutorials: https://betterstack.com/community/

    Example projects: https://github.com/BetterStackHQ


    📱 Socials

    Twitter: https://twitter.com/betterstackhq

    Instagram: https://www.instagram.com/betterstackhq/

    TikTok: https://www.tiktok.com/@betterstack

    LinkedIn: https://www.linkedin.com/company/betterstack


    📌 Chapters:

    0:00 Intro

    0:25 Introducing Stoolap

    0:58 OLAP vs. OLTP Explained

    1:44 The Native Node.js Driver & NAPI-RS

    2:35 3 Reasons Why Stoolap is Fast

    3:25 Setting Up the Benchmark Test

    4:15 Troubleshooting: Building from Source

    4:53 Test 1: COUNT DISTINCT Results

    5:30 Test 2: DISTINCT + ORDER BY

    6:23 Final Verdict: Is it a SQLite Killer?

    6:53 Conclusion & Outro"
  channel: "Better Stack"
  channelId: "UCkVfrGwV-iG9bSsgCbrNPxQ"
  duration: "PT7M33S"
  publishedAt: "2026-02-27T23:22:29Z"
  thumbnailUrl: "https://i.ytimg.com/vi/t6fbNGC_48c/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=t6fbNGC_48c"
processedAt: "2026-02-28T15:56:17.413Z"
source: "youtube"
tldr: "Stewool (Stoolap) is a Rust-based embedded OLAP database with a native Node.js driver that benchmarks 4-6x faster than SQLite on analytical queries like COUNT DISTINCT, though not the claimed 138x, offering parallel execution and MVCC but requiring source builds currently."
tools:
  - name: "Stewool"
    url: null
  - name: "SQLite"
    url: null
  - name: "Node.js"
    url: null
  - name: "Napi-rs"
    url: null
  - name: "Rayon"
    url: null
  - name: "PostgreSQL"
    url: null
  - name: "DuckDB"
    url: null
categories:
  - "Data & Analytics"
  - "Programming"
tags:
  - "database"
  - "rust"
  - "nodejs"
  - "sqlite"
  - "benchmarking"
  - "olap"
  - "embedded-database"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 5583
  outputTokens: 913
  totalTokens: 6496
  processingTimeMs: 27308
playlistId: "PL-SEjLl-bojVmsXOvG-TBp7DVv0McXJzn"
---

## Key Takeaways

Stewool (often called Stoolap) is a new embedded analytical database written in Rust with a native Node.js driver that challenges SQLite's performance in specific scenarios.

- **Performance claims vs reality**: While marketed as 138x faster than SQLite, real-world benchmarks showed 4-6x speedups on analytical queries like COUNT DISTINCT with 1M rows.

- **Architectural advantages**: Uses **MVCC** for concurrent reads/writes, **Rayon** for parallel query execution across CPU cores, and a **cost-based optimizer** for query planning.

- **Native Node.js integration**: Uses **Napi-rs** to compile Rust directly into Node.js binaries, eliminating serialization overhead by sharing memory space.

- **Different use cases**: Designed for **analytical workloads** (OLAP) rather than transactional operations (OLTP), making it complementary to rather than a replacement for SQLite.

## Summary

Stewool (frequently referred to as Stoolap in the video) is an embedded OLAP (Online Analytical Processing) database engine written entirely in Rust that recently released a native Node.js driver. Unlike traditional OLTP databases like SQLite or PostgreSQL that are optimized for transactions, Stewool is designed specifically for analytical workloads where complex queries on large datasets are common.

The key architectural innovation is its **native Node.js driver** built with **Napi-rs**, which compiles the Rust engine directly into Node.js binaries. This eliminates the serialization overhead and network bridges typically required when Node.js interacts with databases written in other languages. Instead, Node.js and Rust share the same memory space, allowing direct communication without data format conversions.

Three technical features contribute to Stewool's performance: **MVCC (Multi-Version Concurrency Control)** allows multiple readers and writers to operate concurrently without locking the entire database. **Parallel execution** via the Rayon library distributes query processing across all available CPU cores. A **cost-based optimizer** analyzes data statistics to select the most efficient query execution path.

### Benchmark Results

The video conducted two benchmark tests comparing Stewool against SQLite using a Node.js project with 10,000 and 1 million rows of sales data. For COUNT DISTINCT operations, Stewool was 4x faster with 10,000 rows and 6x faster with 1 million rows

- significant but far from the claimed 138x improvement. A second test with DISTINCT plus ORDER BY operations showed only 1-1.5x speedup.

### Practical Considerations

Currently, the npm package has installation issues requiring users to **build from source** by cloning the repository and linking it manually. The author notes that SQLite still outperforms Stewool for single-row operations and transactional workloads, confirming these are complementary tools for different use cases rather than direct competitors.

## Context

As local data volumes grow and analytical queries become more complex, developers are hitting performance limits with traditional embedded databases like SQLite, which uses single-threaded file locking. The emergence of Rust-based databases with native language integrations represents a trend toward higher-performance embedded solutions that maintain SQLite's simplicity while offering modern concurrency and parallelism features. This matters for developers building data-intensive applications, analytics tools, or local-first software that requires fast complex queries without managing external database servers.