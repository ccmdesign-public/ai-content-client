---
title: "Firebolt vs. Databricks (2023) | Firebolt"
author: "Select From"
platform: "medium"
publicationName: "Select From"
url: "https://selectfrom.dev/firebolt-vs-databricks-2023-firebolt-4bc7a1f22517?source=rss----415fa49cac1b---4"
publishedAt: "2023-09-21"
tags:
  - "data-science"
  - "curated"
---

# Firebolt vs. Databricks (2023) | Firebolt

# Firebolt vs. Databricks (2023) | Firebolt

[Elijah Rivera](https://medium.com/@elijah.rivera?source=post_page---byline--4bc7a1f22517---------------------------------------)

5 min read·Sep 21, 2023

\--

## A detailed comparison

A [comparison of data warehouse](https://www.firebolt.io/resources/cloud-data-warehouse-comparison) v data lake/Lakehouse comes down to which architecture is appropriate for your specific use case. With the advent of object storage and federated query engines the lines are blurring between the two. The majority of customers have use cases that are business intelligence or data app-centric. These customers find that a data warehouse architecture with its mature ecosystem is easy to leverage. Plus, data warehouse providers are extending their capabilities to address data lakes. On the other hand, folks who built data lakes to leverage semi-structured data and machine learning typically are working towards extending into BI use cases. There is a case to be made for both, a data warehouse with fast response times and a data lake for semi-structured data analysis, as most customers need both. This comparison is provided primarily to compare common foundational elements.‍

## Firebolt vs Databricks — Architecture

The biggest differences among cloud data warehouses are whether they separate [storage and compute](https://www.firebolt.io/architecture), how much they isolate data and compute, and what clouds they can run on.

![]()

**Firebolt** is built on a natively decoupled storage & compute architecture, on AWS only. Data has to be copied outside of your VPC into the Firebolt, where both your compute and data run in a dedicated and isolated tenant. A “Firebolt Engine” can be granularly configured across # of nodes and different CPU/RAM/SSD combinations.

**Databricks** was built by the founders of Spark as an analytics platform to support machine learning use cases. It leverages the Spark framework to process data residing in a data lake and is supported on AWS, GCP and Azure. Databricks coined the marketing term “Lakehouse ‘’ architecture to illustrate the unification of data lake and data warehouse use cases. Customers still manage Spark clusters that process data residing in a Delta lake. Conversion of data to Delta Lake format is required to leverage the functionality of Delta Lake. Databricks Sql is a relatively new addition to simplify access to data stored in a data lake.

## Firebolt vs Databricks — Scalability

There are three big differences among data warehouses and query engines that limit scalability: decoupled storage and computing, dedicated resources, and continuous ingestion.

![]()

**Firebolt** can handle the largest data volumes and concurrency on a single comparable cluster size, thanks to its superior hardware efficiency. Thanks to its decoupled storage & compute architecture it scales very well to large data volumes. However, resizing an engine size isn’t instant and requires orchestration if avoiding downtime is necessary. A single Firebolt engine can support hundreds of concurrent queries, avoiding the need to scale out for most use cases. Scaling horizontally for even higher concurrency is manual.

## Get Elijah Rivera’s stories in your inbox

 from this writer.

‍ **Databricks** allow for autoscaling of clusters based on utilization. Additionally, increasing concurrency associated with a SQL endpoint can be accomplished through the addition of clusters. Query concurrency per cluster is maxed at 10. However, scaling with additional clusters for concurrency is possible. Databricks provides a choice of instance types.

## Firebolt vs Databricks — Performance

Performance is the biggest challenge with most data warehouses today.
While decoupled storage and compute architectures improved scalability and simplified administration, for most data warehouses it introduced two bottlenecks; storage, and compute. Most modern cloud data warehouses fetch entire partitions over the network instead of just fetching the specific data needed for each query. While many invest in caching, most do not invest heavily in query optimization. Most vendors also have not improved continuous ingestion or semi-structured data analytics performance, both of which are needed for operational and customer-facing use cases.

![]()

**Firebolt** is the fastest when it comes to query performance when compared to cloud data warehouses and services like Athena. Its unique approach to storage and indexing results in highly aggressive data pruning that scans dramatically less data compared to other technologies. While other technologies scan partitions or micro-partitions, Firebolt works with indexed data ranges, that are significantly smaller. In addition, Firebolt lets users accelerate queries further with multiple index types (Aggregating index, Join index), and using its decoupled storage & compute architecture workloads can be easily isolated to guarantee consistent performance.

‍ **Databricks** is designed to leverage the Spark framework for processing large volumes of data. It leverages compressed Parquet files in a Delta Lake. To reduce the amount of data processed, it uses data pruning on partitions and Parquet file metadata. Databricks does not provide any indexes.

## Firebolt vs. Databricks — Use cases

There are a host of different analytics use cases that can be supported by a data warehouse. Look at your legacy technologies and their workloads, as well as the new possible use cases, and figure out which ones you will need to support in the next few years.

![]()

**Firebolt** stands out by being the fastest cloud data warehouse when compared to Snowflake, Redshift, BigQuery, and Athena. It’s great for delivering sub-second analytics at scale while remaining hardware-efficient and high concurrency friendly. This makes it a great choice for operational use cases and customer-facing data apps. Given that it is not as feature-rich and integration-rich as the more mature data warehouses makes it a lesser fit for a general-purpose Enterprise data warehouse. It is also not the best fit for ad-hoc use cases, because of the need to predefine indexing at the table level.

**Databricks** is a mature Spark-based platform proven for processing streaming data. It is widely used for Machine Learning use cases by data scientists through the use of integrated notebooks. From a low latency query perspective, while it offers features like Delta Cache, it does not provide specialized indexes that can deliver low latency queries.

*Originally published at* [*https://www.firebolt.io*](https://www.firebolt.io/comparison/firebolt-vs-databricks)*.*