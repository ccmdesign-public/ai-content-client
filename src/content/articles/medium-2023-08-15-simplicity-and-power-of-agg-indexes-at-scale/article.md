---
title: "Simplicity and Power of Agg Indexes at Scale"
author: "Select From"
platform: "medium"
publicationName: "Select From"
url: "https://selectfrom.dev/simplicity-and-power-of-agg-indexes-at-scale-315d0de2fc29?source=rss----415fa49cac1b---4"
publishedAt: "2023-08-15"
tags:
  - "data-science"
  - "curated"
---

# Simplicity and Power of Agg Indexes at Scale

# Simplicity and Power of Agg Indexes at Scale

[Elijah Rivera](https://medium.com/@elijah.rivera?source=post_page---byline--315d0de2fc29---------------------------------------)

7 min read·Aug 15, 2023

\--

Demand from engineering teams building sub-second analytics experiences has skyrocketed. Current cloud data warehouses struggle with performance when trying to address the needs of modern data applications. Firebolt is tackling the biggest challenges in this underserved, yet essential and highly demanding space, by developing a cloud data warehouse that delivers sub-second analytic experiences at scale.

One of the ways Firebolt is able to support data-driven applications is by leveraging aggregating [indexes](https://www.firebolt.io/blog/firebolt-indexes-in-action) on the tables. For example, consider an analytics company capturing data on mobile network performance and usage providing interactive customer-facing dashboards to track network performance, customer experience, and subscriber behavior. These data volumes can reach hundreds of TBs or tens of PBs with billions or hundreds of billions of rows across their tables. The company offers an advanced analytics solution to its end users, where they can slice and dice the data across multiple dimensions and measures

![]()

Sample table definition:

![]()

Traditional data warehouses aren’t equipped to provide the sub-second response that’s required to serve such customer-facing applications where the users interact with terabytes of data and expect the results in a fraction of a second. There are patterns to help increase data warehouse performance with the most common approaches being:

-   Cache results
-   Ask for less data — shrink data access with sorting, partitioning, and clustering
-   Manage summary tables or precompute aggregations as materialized views
-   Leveraging indexes

Caching results should be obvious. There’s no need to query the data if the results are already loaded. If users are executing the same queries when they open up their dashboards you can execute them ahead of time and save on compute resources by storing them in a cache. It’s not always necessary to issue the query every single time, however, users will have the ability to refresh the data, which won’t support sub-second response needed for these types of applications.

The next step is to make sure you’re asking for less data. This should always be a common practice making sure you’re not wasting unnecessary compute resources. Partitioning allows the table to be divided up into smaller segments allowing for improved performance rather than scanning unnecessary data. Clustering sorts the data based on one or more columns. As your data volumes grow it’s not always possible to query individual partitions or clusters within the expected response time to serve an interactive data application.

To help handle expensive computations you can maintain summary tables for each of your tables, which requires aggregating the raw data into a smaller dataset on predefined measures. This requires you to maintain an ETL pipeline that’s slow, expensive and lacks flexibility. The data engineers and developers will need to be aware of newly created summary tables having to rewrite their queries and losing the granularity of the original table.

Another option that is a common way of tackling this challenge is to leverage materialized views. Materialized views are precomputed views that periodically cache the results of a query for increased performance and efficiency. But materialized views have their own challenges:

-   With [Snowflake](https://www.firebolt.io/comparison/firebolt-vs-snowflake), for example, materialized views are automatically and transparently maintained, but if a query is run before the materialized view is up-to-date, Snowflake either updates the materialized view or uses the up-to-date portions of the materialized view and retrieves any required newer data from the base table. But that portion of the full query can still be slow.
-   Materialized views can also be expensive to maintain inside a data warehouse. Several Snowflake customers have mentioned that clustering keys became expensive enough for them at scale that they ended up (re)sorting outside of Snowflake, during ETL, and periodically reloading the table. Any changes to micro-partitions in the base table require eventual materialized view maintenance, whether those changes are due to reclustering or DML statements run on the base table. For example, imagine that the materialized view is clustered by an independent column, for example, postal code and the base table is not clustered. If 100 new rows are added to the base table, those might go into one or two new micro-partitions, leaving the other micro-partitions in the base table untouched. But those 100 rows might require re-writing 100 micro-partitions in the clustered materialized view.

‍

Firebolt’s approach to this problem is leveraging aggregating indexes, which are precomputed versions of your data maintained by Firebolt from the base table to accelerate queries with aggregate functions.

![]()

The benefits of an aggregating index are:

-   The unique differentiator of aggregating indexes as compared to materialized views, is that the index is updated during base table ingestion, so when ingestion is over — the index is already up to date.
-   Sorted and compressed based on its own primary index, giving it all the performance benefits of a Firebolt table for faster data access (pre-computed data and fewer data scanned per query).
-   Fewer CPU cycles spent on aggregations, helping with high concurrency
-   Simplicity and power (no need to change your queries to work) — Similarly to materialized views, Firebolt’s query optimizer also automatically rewrites the query if there’s a matching aggregating index on the table.
-   Automatically cached locally
-   Multiple aggregating indexes can exist on the same table, allowing you to create specific aggregating indexes for specific query patterns

‍

## Get Elijah Rivera’s stories in your inbox

 from this writer.

Let’s look at an example to support these types of data applications. If we go back to our mobile network analytics company, an example query would be to count all network signals across mobile operators within a large geographic area.

```
SELECT CASE  WHEN operator = '' THEN 'Other'  ELSE operator END AS operator_name, count(*) AS measure, substr(quadtree_key, 1, 4) AS quadkey_filterFROM signalsWHERE substr(quadtree_key, 1, 4) IN (  '0210',  '0211',  '0300',  '0212',  '0213',  '0302',  '0230',  '0231',  '0320' )GROUP BY 1, quadkey_filterORDER BY 1;
```

Below you can see the EXPLAIN plan and performance for this query without an aggregating index — relying solely on the primary index on the table:

![]()

Basically, what’s happening here is a full table scan, going over 700 GB of data — and showing slow results:

‍

![]()

With an aggregating index in place, we don’t require a change in the original SQL query, the only thing needed is to create and generate the aggregating index. As you can see in the EXPLAIN plan, we are now leveraging the aggregating index, and the performance is greatly improved:

‍

![]()

‍

![]()

‍

Going from around 40 seconds to 10 milliseconds (0.01 seconds), with less than one MB scanned.

The aggregating index definition for this scenario is shown below. As you can see, we add more variations of substrings on the quadtree\_key column so that we can zoom into deeper levels when we have similar aggregations across operators:

```
CREATE AND generate aggregating INDEX signals_agg_idx_3 ON signals ( SUBSTR("quadtree_key", 1, 4), SUBSTR("quadtree_key", 1, 5), SUBSTR("quadtree_key", 1, 6), SUBSTR("quadtree_key", 1, 7), SUBSTR("quadtree_key", 1, 8), "operator", COUNT(*))
```

Note that more dimension columns can be added here, as well as additional calculations (such as COUNT, AVG, etc) — meaning that you can combine more than one aggregating index if needed.

## Conclusion

Aggregations are at the heart of any interactive analytics, but they require a lot of compute. Materialized views can be costly to maintain and limited in function. Because of the limitations and costs, while many companies do use materialized view capabilities, many others resort to calculating their aggregations outside of the data warehouse using Spark or other ETL frameworks, which can take weeks to get any changes done since you have to coordinate with different teams that have to develop, test and deploy the changes.

By leveraging aggregating indexes on their tables, data engineers can do all of this by adding one line of SQL when creating their fact tables. You can have any number of aggregating indexes associated with the table. Firebolt automatically populates and maintains each aggregating index, which can include raw data, aggregations and other operators during ingestion. Unlike materialized views the cost and compute overhead are minimal and handled upfront during ingestion. There’s no need to worry about calculating costs as compared to materialized views when updates are made to the base table not knowing how many micro-partitions will need to be rewritten. Whenever an aggregating index is used, it replaces the need to access, store and compute data with cached, pre-computed results. This helps with performance and concurrency that’s required for supporting responsive customer-facing applications.

*Originally published at* [*https://www.firebolt.io*](https://www.firebolt.io/blog/simplicity-and-power-of-agg-indexes-at-scale-materialized-views-simplified)*.*