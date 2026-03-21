---
title: "Firebolt vs. Clickhouse (2023) | Firebolt"
author: "Select From"
platform: "medium"
publicationName: "Select From"
url: "https://selectfrom.dev/firebolt-vs-clickhouse-2023-firebolt-d2287746b2f2?source=rss----415fa49cac1b---4"
publishedAt: "2023-09-26"
tags:
  - "analytics"
  - "data-pipeline"
  - "data-science"
  - "sql"
categories:
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-21T16:30:36.820Z"
---

# Firebolt vs. Clickhouse (2023) | Firebolt

![](https://cdn-images-1.medium.com/max/316/0*d0sGlSrGVxowYm9G.png)

### A detailed comparison

#### Compare Firebolt vs. Clickhouse by the following set of categories:

### Firebolt vs. Clickhouse — Architecture

The biggest differences among cloud data warehouses are whether they separate storage and compute, how much they isolate data and compute, and what clouds they can run on.

![](https://cdn-images-1.medium.com/max/890/1*Se4CW5UmKDSj0q3UPFhCIQ.png)

**Firebolt** is built on a natively decoupled storage & compute [architecture](https://docs.firebolt.io/architecture-overview), on AWS only. Data has to be copied outside of your VPC into the Firebolt, where both your compute and data run in a dedicated and isolated tenant. A “Firebolt Engine” can be granularly configured across # of nodes and different CPU/RAM/SSD combinations.

‍ **Clickhouse** was originally developed at Yandex, the Russian search engine, as an OLAP engine for low latency analytics. It was built as an on-premise solution with coupled storage & computing, and a large variety of tuning options in the form of indexes and and merge trees. Clickhouse’s architecture is famous for its focus on performance and low-latency queries. The tradeoff is that it is considered very difficult to work with. SQL support is very limited, and tuning/running it requires significant engineering resources.

### Firebolt vs. Clickhouse — Scalability

There are three big differences between data warehouses and query engines that limit scalability: decoupled storage and computing, dedicated resources, and continuous ingestion.

![](https://cdn-images-1.medium.com/max/890/1*kEPYUfqeQcFXUvgyzwgDKg.png)

‍**Firebolt** can handle the largest data volumes and concurrency on a single comparable cluster size, thanks to its superior hardware efficiency. Thanks to its decoupled storage & compute architecture it scales very well to large data volumes. However, resizing an engine size isn’t instant and requires orchestration if avoiding downtime is necessary. A single Firebolt engine can support hundreds of concurrent queries, avoiding the need to scale out for most use cases. Scaling horizontally for even higher concurrency is manual.

‍ **Clickhouse** doesn’t offer any dedicated scaling features or mechanisms. While it can deliver linearly scalable performance for some types of queries, scaling itself has to be done manually. Hardware is self-managed in Clickhouse. This means that to scale you would have to provision a cluster and migrate.

### Firebolt vs. Clickhouse — Performance

[Performance](https://www.firebolt.io/performance-at-scale) is the biggest challenge with most data warehouses today.
While decoupled storage and compute architectures improved scalability and simplified administration, for most data warehouses it introduced two bottlenecks; storage, and compute. Most modern cloud data warehouses fetch entire partitions over the network instead of just fetching the specific data needed for each query. While many invest in caching, most do not invest heavily in query optimization. Most vendors also have not improved continuous ingestion or semi-structured data analytics performance, both of which are needed for operational and customer-facing use cases.

![](https://cdn-images-1.medium.com/max/564/1*FmU6x9FiEUyjsN9dXy0XRA.png)

**Firebolt** is the fastest when it comes to query performance when compared to cloud data warehouses and services like Athena. Its unique approach to storage and indexing results in highly aggressive data pruning that scans dramatically fewer data compared to other technologies. While other technologies scan partitions or micro-partitions, Firebolt works with indexed data ranges, that are significantly smaller. In addition, Firebolt lets users accelerate queries further with multiple index types (Aggregating index, Join index), and using its decoupled storage & compute architecture workloads can be easily isolated to guarantee consistent performance.

‍ **Clickhouse** is famous for being one of the fastest local runtimes ever built for OLAP workloads. Its columnar storage, compression, and indexing capabilities make it a consistent leader in benchmarks. Its lack of support for standard SQL and lack of query optimizer means that it’s less suitable for traditional BI workloads and more suitable for engineering-managed workloads. While fast, it requires a lot of tuning and optimization.

### Firebolt vs. Clickhouse — Use cases

There are a host of different analytics use cases that can be supported by a data warehouse. Look at your legacy technologies and their workloads, as well as the new possible use cases, and figure out which ones you will need to support in the next few years.

![](https://cdn-images-1.medium.com/max/898/1*fNaBTuU8uIR2FMctSPEqxg.png)

‍**Firebolt** stands out by being the fastest cloud data warehouse when compared to Snowflake, Redshift, BigQuery, and Athena. It’s great for delivering sub-second analytics at scale while remaining hardware efficient and high concurrency friendly. This makes it a great choice for operational use cases and customer-facing data apps. Given that it is not as feature-rich and integration-rich as the more mature data warehouses makes it a lesser fit for a general-purpose Enterprise data warehouse. It is also not the best fit for ad-hoc use cases, because of the need to predefine indexing at the table level.

‍ **Clickhouse** was not designed to be a data warehouse, but rather a low-latency query execution runtime. Managing it typically requires significant engineering overhead. Hence, it’s a good fit for engineering-managed operational use cases and customer-facing data apps, where low latency matters. It is not a good fit for a general-purpose data warehouse, nor for Ad-Hoc analytics or ELT.

*Originally published at* [*https://www.firebolt.io*](https://www.firebolt.io/comparison/firebolt-vs-clickhouse)*.*

* * *

[Firebolt vs. Clickhouse (2023) | Firebolt](https://selectfrom.dev/firebolt-vs-clickhouse-2023-firebolt-d2287746b2f2) was originally published in [SelectFrom](https://selectfrom.dev) on Medium, where people are continuing the conversation by highlighting and responding to this story.