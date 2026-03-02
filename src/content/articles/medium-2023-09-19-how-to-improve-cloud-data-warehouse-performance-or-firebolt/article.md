---
title: "How to Improve Cloud Data Warehouse Performance | Firebolt"
author: "Select From"
platform: "medium"
publicationName: "Select From"
url: "https://selectfrom.dev/how-to-improve-cloud-data-warehouse-performance-firebolt-9ae705224f82?source=rss----415fa49cac1b---4"
publishedAt: "2023-09-19"
tags:
  - "data-science"
categories:
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-01T21:19:30.581Z"
---

# How to Improve Cloud Data Warehouse Performance | Firebolt

# How to Improve Cloud Data Warehouse Performance | Firebolt

## Top 10 Ways to Improve Cloud Data Warehouse Performance (And how it’s done in Firebolt)

[Elijah Rivera](https://medium.com/@elijah.rivera?source=post_page---byline--9ae705224f82---------------------------------------)

22 min read·Sep 19, 2023

\--

Cloud data warehouses have completely changed the traditional analytics landscape in less than a decade. They showed us how to get rid of hardware provisioning and simplify administration with SaaS, how to achieve true elastic scale with decoupled storage-compute, and how to simplify data warehousing even more with serverless compute where all you have to do is send a query.

This decade is already bringing even more change to how business intelligence (BI) and analytics is done. Companies have started to put operational analytics directly in the hands of employees and self-service analytics in the hands of customers to help them make better, faster decisions on their own. These are not traditional analytics use cases for data warehouses. In fact, in many cases companies didn’t even consider using a data warehouse. Why? Because they were focused on performance, and data warehouses hadn’t been fast or cheap enough.

Until now.

Cloud data warehouses can actually deliver on performance. Firebolt is proof of that. How did Firebolt become so much faster? In general, how can you improve [cloud data warehouse](https://www.firebolt.io/blog/cloud-data-warehouse) performance? We get both questions a lot in meetings … well, in virtual meetings. We also answer both questions all the time. Yes, both. There are times where it makes more sense for a company to just use their existing data warehouse. So we tell them to stick with their existing data warehouse, and we give some tips and tricks we’ve learned.

We decided to pull together our top 10 answers from these conversations on how to improve performance in any cloud data warehouse, and how Firebolt implements these techniques. If you’re interested in more details with demos, you can watch the [top 10 video series](https://www.youtube.com/watch?v=1Oy2RC5rSjA&list=PLZNw4wdU2Ox8gXAQzfRD6FlOFPV0fKIb0&index=2). But in the meantime here’s our list.

-   Optimize data and queries together for performance
-   Separate workloads with decoupled storage-compute
-   Use the index Luke — shrink data access with sorting, partitioning, and indexing
-   Always at the end you must join — rewrite queries like Yoda to use pushdowns, substitutions, and “cached” results
-   Precompute aggregations as materialized views or indexes
-   Precompute joins as materialized views or indexes
-   Accelerate searches with indexing
-   Be JSON-aware for storage and queries
-   Evaluate query execution
-   Choose the best cluster for each workload
-   Ingest continuously

## 0\. Optimize data and queries together for performance

After starting to record the [top 10 video series](https://www.youtube.com/watch?v=1Oy2RC5rSjA&list=PLZNw4wdU2Ox8gXAQzfRD6FlOFPV0fKIb0&index=2) I was reminded about the best practice you should always be doing: optimizing your data and queries together to improve performance. I should add I felt a bit like a dummy for not mentioning it. Most of the people we talk to are already performing these tricks and now need to go further. But if you’re not yet using these, you should before you even consider something like Firebolt, which is also why I decided to restart the best practices numbering at 0.

The first set of best practices really apply to any type of data warehouse or database:

-   **Denormalize:** joins are one of the most expensive operations. So if you can pre-join, sort, and even index a table to support the majority of your queries, and you need the additional performance gains, you should probably do it. The downsides are the extra cost of storage (and compute if you don’t have decoupled storage-compute), and the extra (re)loading the entire table. If you have (slowly) changing dimensions in a separate dimension table, for example, it’s easy to update a dimension table. But when a dimension table becomes part of the denormalized table, changes to dimension values often leads to massive changes to the denormalized table. I’ve even seen it lead to entire weekly reloads of the table.
-   **Sort and shard**: if you aren’t yet sorting your data based on the columns used as predicates in your queries, start doing it. Look at doing it during ETL/ELT or using a built-in sorting feature if it exists. Try sorting based on the column you use the most in where clauses, then the others in order of importance. Play around with it as needed. Also see whether you can partition your data differently. Sorting and sharding is an art and a science. I’ve seen data engineers beat most algorithms because they know their data better.
-   **(Pre-) aggregate:** sometimes you don’t need the level of detail stored in a fact table. After some time having the detailed data, if no one is using it, try aggregating. Hopefully you have already built a data lake of some sort as your raw source of the truth so that you can restore the detailed data later as needed. You might be able to split off a sub-table with more detailed data. You could also consider different levels of aggregation by time (hour/day/week/month/year.)
-   **Add more materialized views or denormalized tables:** eventually just one (denormalized) table is not enough. You might have sorted on some columns for performance, only to have some queries that do not fit that particular sort order or indexing. The answer is to create another materialized view or table. Remember that you don’t need to have all the columns or detailed data in each table. Try to remove columns and aggregate to different levels with different tables, which both improves performance and saves money.
-   **Purge:** sometimes the easiest way to improve performance is to purge or vacuum old data. You can archive it, which is what we used to do with applications. Ideally you have a data lake as part of your data pipeline where you store your raw data. In that case you just drop old data from your data warehouse. You can also aggregate data for older time periods.

There are a host of other tips and tricks you can use. For example, you can add integer surrogate keys to improve join performance, or use integers as an index of sorts in general. You can periodically re-sort data. But when you get as far as you can with these best practices, or if you think these will not be enough in 1–3 years, then you need to start to consider the other top 10. The most obvious one is to move to decoupled storage-compute.

## 1\. Separate workloads with decoupled storage-compute

It used to be that you had to implement data warehouse compute and storage together on a single big cluster. You could then tune, or even replicate the data to read-only clusters. But then Snowflake, BigQuery, and Presto all introduced decoupled storage-compute around 2012. They showed us how to decouple and manage analytics workloads separately.

Data warehouse usage consists of “clusters” of different users running their queries on different subsets of data. Decoupled storage-compute lets you match dedicated compute to each cluster of usage. All you have to do is start a new cluster, and assign users and queries to it. A good cloud data warehouse handles the rest, including only fetching only the subset of data each user needs for each query.

Having multiple engines helps isolate workloads, which means you can spend on specific clusters to make specific queries faster, and support different SLAs. If you split off very specific queries and users, you can end up with a much smaller data set to scan, and much less resource contention. You may end up with lower costs as well, but that depends in part on your vendor’s pricing.

![]()

Decoupled storage-compute cloud data warehouses like Firebolt, Snowflake, and BigQuery, or warehouses built on Presto can be faster because you can dedicate any amount of compute to very specific workloads and smaller subsets of data. Redshift and older-generation data warehouses don’t let you do that. While you can segment by users, and Redshift RA3 notes can hold a subset of data, each cluster needs to be able to run all the queries for those users.

**Redshift side-note:** What should you do with Redshift since it doesn’t fully support decoupled storage-compute?

1.  Use RA3 nodes if you don’t need to load the majority of data, such as historical data.
2.  Try Redshift Spectrum to see if federated queries will be fast enough. You basically get a second cluster for different data for $5/Terabyte.
3.  Consider splitting up your data warehouse

I know this last option sounds bad to some. But it often makes more economical sense to split off some of your workload. Most of our customers do this. They don’t replace their existing data warehouse. They move a workload to Firebolt and keep their existing data warehouse running as well. It used to be that we had several OLAP servers or other databases. Today, running multiple analytics engines and data warehouses is becoming the new norm. Having a modern data pipeline that includes a data lake and ETL/ELT makes this approach much easier.

Firebolt is more flexible compared to some other decoupled storage-compute cloud data warehouses because you can create a cluster, which we call an engine, with any size node and mix of CPU/RAM/SSD, and any number of nodes. That includes 1 massive node or 128 tiny ones. It lets you choose the best combination for the best performance and price-performance.

Decoupled storage-compute is a great innovation because it helps when you have to improve the performance for specific queries in a multi-workload data warehouse. But your performance can drop if you have to fetch a lot of data from remote storage for a query. It turns out most cloud data warehouse deployments suffer from this problem. So if you want to improve performance overall, you’ll need to follow the next tips.

## 2\. Use the index Luke — shrink data access with sorting, partitioning, and indexing

I was pointed to a great site, [Use the index Luke](https://use-the-index-luke.com/), which I highly recommend. I felt I had to use it in the title because it summarized one of the best ways to improve query performance.

Decoupled storage-compute can make the network a big bottleneck. You can only move 1GB/sec (Gigabyte per second) on a 10Gbps (Gigabit per second) network, and 10GB/sec on the fastest 100Gbps option. When you’re dealing with 1TB+ (Terabyte) of data, that’s a problem. Snowflake micro-partitions, for example, are 50MB-150MB (Megabyte) uncompressed. They might take 0.01 seconds to move on a 100Gbps network. But just 1% of a 1TB table will take close to 2 minutes. You can always “warm up” the cluster after startup with some specific queries. But there are other techniques.

The most common way to improve data access performance is pruning. Most cloud data warehouses use pruning indexes that contain the min-max values in each block or partition so you only fetch the partitions you need. But that can still end up being a lot of data if your partitions are large and you only need a small fraction of the data in each partition.

The next way is to sort and partition based on the columns you use the most for your predicates. Snowflake has clustering keys. BigQuery has clustered tables. Redshift has DISTKEY and SORTKEY. This can dramatically reduce the number of partitions you need when filtering on those predicates. This is usually combined with a pruning index that tracks the min and max values of columns in each partition.

But using these features inside the data warehouse can be expensive. Many Snowflake customers I’ve talked to do their own sorting outside of Snowflake and periodically reingest the data. I have to recommend that approach with Snowflake based on their experiences.

The third way is to reduce the size of the partition or block you’re fetching. You can’t control this in most data warehouses. Redshift, for example, is better by default with its smaller 2MB block sizes. With Presto, you can control partition sizes independently since Presto is not involved with ingestion or storage. You can also push down predicates to various sources if they’re databases to reduce the data set before fetching. But with Presto deployments you often can’t control how data is written with external data sources because it’s not “your” data to control. So you don’t have many of these options, which is part of the reason Presto is often slower than most finely tuned data warehouses.

![]()

Firebolt implements all three approaches with what it calls a sparse index, which is a primary table index composed of any number of columns. During ingestion, Firebolt takes 1 or more rows at a time and sorts and compresses them as a segment based on the index in the order of the columns. Each segment actually consists of much smaller ranges of data that are written and accessed via the sparse index. For each new query, Firebolt only fetches ranges, not segments or partitions. This usually results in 10x or less data being fetched for a given query, and 10x or less data in the compute cache, which in turn makes data access and compute 10x or faster.

The only thing you need to do for a sparse index is to define it with one line of SQL.

CREATE **TABLE** fact\_round (

event\_id,
sdfsdf,
…

) PRIMARY INDEX event\_id, date, customer\_id;

## 3\. Always at the end you must join — rewrite queries like Yoda to use pushdowns, substitutions, and “cached” results

Yes, I’m sticking with the Star Wars analogies, in part because you should trust the combined force of indexing and query optimization.

Pruning partitions that are sorted based on your most common columns used in predicates (as part of your where clauses), as well as shrinking the size of each partition, helps dramatically reduce data access times. But improving the actual query itself can have just as big an impact on both on the query performance and on further reducing how much data you have to fetch.

Even if you have to manually write your own queries to improve performance, you should consider it because it can make a huge difference. But sometimes, for example with SQL generated by BI tools, it’s nearly impossible to rewrite on your own. Be sure to evaluate how your data warehouse or analytics database optimizes queries. Test it out with the BI and embedded analytics tools you plan to use.

There are some common techniques to consider:

-   **Do joins last:** As Yoda says “Always at the end must you join.” It’s not always possible, but at least try to do filtering first. The smaller the data sets, the faster the joins.
-   **Pushdown predicates:** move, or “push down” predicates or operators to execute them before expensive operations, to help shrink input data sets. In the case of decoupled storage-compute, some technologies like Presto let you do predicate pushdowns to the data source to reduce the amount of data fetched.
-   **Replace expensive operations**: there are various tricks that can be used to reduce the cost of expensive operations. For example, you can replace a full join with a semi-join and lookups using a hash index. This works for nested joins as well.
-   **Use precomputed or cached results:** You can use previously calculated results or metrics. Result set caches are one example. Materialized views are another.

Firebolt has taken several of these techniques and automated them within its query optimizer. It performs cost-based optimization using the range set that it gets back from a sparse index before fetching any data. This helps Firebolt shrink data access even more. The optimizer pushes down predicates and other operations (e.g group by or filter) multiple levels, not just one level, which is what you will find with many other optimizers. It also will swap in indexes as precomputed results. That includes using nested semi-joins and lookups in place of nested joins.

## Get Elijah Rivera’s stories in your inbox

 from this writer.

The generated queries can look complex. If you look at what seems to be a relatively simple query:

![]()

The optimized version is much longer, in part because the joins end up being replaced by semi joins and lookups. You can usually find generated queries in query explain plans or profilers.

![]()

## 4\. Precompute aggregations as materialized views or indexes

One of the most common ways to improve performance is with materialized views, which can be any combination of precomputed aggregations and joins. Let’s cover aggregations first, since many data warehouses include materialized views against single tables, as well as aggregation operations like count or sum, but do not support joins.

Creating a materialized view is definitely one approach you should consider. But materialized views have several challenges depending on which data warehouse you’re using, so make sure you know all the limitations before you get started.

-   Materialized views often do not support some of the more complicated operators like distinct count (e.g. see Snowflake’s limitations [here](https://docs.snowflake.com/en/user-guide/views-materialized.html#label-limitations-on-working-with-materialized-views).)
-   They can also have a delay because they are usually only updated “periodically” based on changes in the fact table. With Snowflake you don’t have to worry, because it automatically updates the “delta” as needed by querying the fact table live for the delta for any update that hasn’t yet happened. But that portion of the full query can be slow.
-   A materialized view in most decoupled storage-compute data warehouses is also stored in remote storage, just like any other table. This means that it has the same warmup issues when data is queried the first time.

Materialized views can also be expensive to maintain inside a data warehouse. Several Snowflake customers have mentioned to me that clustering keys became expensive enough for them at scale that they ended up (re)sorting outside of Snowflake, during ETL, and periodically reloading the table. This included clustering keys with materialized views as well. I personally have not heard of issues with Redshift DISTKEY and SORTKEY in Redshift.

My recommendation is to try both options. For example, if you’re a Snowflake customer, try clustering keys and materialized views. They are not only much simpler to implement and maintain. Materialized views are also automatically used by Snowflake’s query optimizer so you don’t have to rewrite your queries. Also make sure you try search optimization, not just clustering keys and materialized views.

You can also try using [dbt](https://www.getdbt.com/) to build the equivalent of a materialized view as a new table, and perform more transformations as well, especially since dbt also supports incremental materializations. Or you could build new tables during ETL instead of materialized views. But with all these other approaches, you will need to rewrite your queries to use the new tables.

Firebolt takes a different approach by creating an aggregating index. It’s basically a materialized view inside an index for a fact table that supports a rich set of aggregation operations, including harder ones such as distinct count. An aggregating index is:

-   Automatically and immediately updated during each write to the fact table
-   Sorted and compressed based on its own sparse index, giving it all the performance benefits of a Firebolt table for faster data access
-   Automatically used in place of the fact table by the query optimizer when it improves performance
-   Automatically cached locally

Just like a materialized view, you can add any number of aggregating indexes for each fact table as you need them to improve performance. All you need to do to create an aggregating index is add one line of SQL. From that point on, Firebolt maintains it. For each new query, the query optimizer automatically uses an aggregating index whenever it will improve query performance, without you having to rewrite your query.

CREATE **AGGREGATING INDEX** idx\_agg\_rounds ON fact\_round (

game\_code,

player\_code,

currency\_code,

**count**( **distinct** round\_id),

**sum**(credit),

**avg**(credit),

**sum**(debit),

**sum**(total\_events)

)

## 5\. Precompute joins as materialized views or indexes

Joins are one of the most expensive and slowest operations in data warehousing. Because of this, experts have come up with all kinds of optimizations and other tricks to improve join performance. The query optimization example above used both multi-level predicate pushdowns and nested semi joins and lookups in place of full nested joins of a fact table with multiple dimension tables.

You can precompute reusable parts of a join, or precompute a full join and load the result into a separate table. Most companies used to do this work outside the data warehouse and then load the results in a separate table. Databases like Apache Druid and ClickHouse focus on delivering fast queries against a denormalized fact table that is basically a series of joins done before ingestion. But more and more you’re seeing this work done inside the cloud data warehouse as ELT using SQL, in part because it’s so easy for a data engineer to implement now.

Firebolt lets you add a join index that precomputes part of the join operation. For example, it can precompute a hash index to support lookups. The example above uses an index with each dimension table. In practice, the majority of customers have not needed to add a join index to achieve second-level performance. In many cases the right sparse indexes do the trick. For example, if the sparse indexes of two fact tables include both the join key and related predicates, we have generally seen great performance. Predicates in the WHERE clause are “pushed down” to filter down the initial data sets before the join, and the sparse index helps prune down to only the subset of sorted ranges needed from each table. But join indexes have delivered significant additional performance gains when used in production.

Just like any other index, you add a join index to an existing table with one line of SQL. Firebolt then maintains it and updates it with each write to the associated table.

CREATE **JOIN INDEX** idx\_join\_games ON dim\_games
(

game\_code, - - join column

game\_studio, - -dim column
game\_currency - -dim column

)

## 6\. Accelerate searches with indexing

We often need to filter based on a partial string — first or last name, address, product name — to troubleshoot performance or even just to look up a customer, product, service, or shipment, during support.

Several data warehouses can index the full string value. You can also perform LIKE operations as well as other pattern matching, but these operations are generally not indexed in cloud data warehouses.

For example, Snowflake search optimization will help accelerate exact (full) string lookups, but its regex and other string operations are not indexed. This is similar in Firebolt, where you can use a string column within a sparse index for faster filtering. You can also perform “LIKE” or subset matches in addition to exact ones, but these are not currently indexed.

So much more is needed for unstructured data like strings. This is why Elasticsearch does so well, and why others do not. I have to rank most data warehouses poorly for this reason.

## 7\. Be JSON-aware for storage and queries

Whenever I see newer types of data, such as clickstream or mobile data, I ask about the data source, and whether data was flattened before it was loaded into the data warehouse. This type of data usually starts as JSON or some other semi-structured format. When they say no, it often means the data was flattened upstream, before the data engineers ever received it.

You can often improve performance if you don’t completely flatten JSON. Imagine several fields in a row actually being semi-structured and nested. If you completely flatten all the fields, you can end up with a massive denormalized table. A single row with three fields with 4, 10, and 15 elements each would end up as 4x10x15=600 combinations flattened. This not only makes the table much bigger. It makes it harder to calculate some metrics, like distinct count, or do more complicated compound predicates on multiple attributes. You could leave the JSON in some form of serialized text. But the larger the structure, the more text-based parsing you need to do.

The fastest performance for your queries is usually some mix of three techniques. You generally will flatten those fields needed for SQL operations (e.g. filter and group by) into columns. That allows you to take advantage of sorting, indexing, and other techniques. If you have other data that needs to be accessed after these (most common) operations, storing it as structured data, such as an array type, can be faster. For example, one customer was using conditions on multiple attributes in JSON. Flattened, it actually required a self join operation. Putting the attributes together in an array made data access relatively fast and got rid of the need for the self join.

You can then keep the rest as JSON. Several cloud data warehouses support a native JSON type now, which is usually stored as some type of serialized string. With Snowflake, for example, you can store JSON in a VARIANT column. The JSON itself, whenever it needs to be accessed, is stored and processed as a serialized string. But several optimizations have been added. Snowflake will turn several attributes that meet conditions into virtual (hidden) columns to accelerate queries that rely on those attributes, without accessing the JSON. Snowflake also creates metadata on ingestion that it uses to improve parsing performance accessing any remaining fields. Any type other than text or numeric is serialized. For those fields that aren’t automatically added as virtual columns, Snowflake still needs to load JSON into RAM, parse and process it. This can require some large nodes that only come with large virtual warehouses. Your main alternative is to pre-process the JSON during ETL/ELT into a different data model. Snowflake does support arrays (of type VARIANT), and you can manually add other fields as columns.

Firebolt provides a host of JSON functions, and adds a nested array type with array functions. It is more manual. But it gives data engineers complete flexibility to perform any combination of UNNEST and NEST with JSON during the ELT process. It means they can turn only those fields they need as columns into columns, store any JSON that is frequently accessed in the best (nested array) format, and store the rest as text. You can then write SQL using array and lambda functions to accomplish just about anything. If you’re interested in learning more you can read more on [native semi-structured analytics here](https://www.firebolt.io/resources/semi-structured-analytics).

## 8\. Evaluate query execution

Query execution is not something you can improve on your own. That’s the job of your vendor, which is why I use the word “evaluate” here. You should do benchmarks using your actual data and queries with different vendors to help you understand their differences. If you understand how query execution works, you should be able to use all the other tips here to help you improve performance.

What are the query execution optimizations you should be looking for in different vendors?

One is an **explain plan** that will help you understand how queries are optimized and executed. They help you identify any bottlenecks, so you can change your query to improve the performance. This is one technique people use a lot with Snowflake.

Another is **vectorized processing**. CPU instructions can now perform the same operation with entire columns, or vectors. This works really well for many types of filter and aggregating operations. If your query engine supports vectorized processing, make sure you are taking advantage of predicate pushdowns for these operations before doing the more expensive, slower operations. Ideally the query optimizer does it. This is one of the reasons Firebolt combines multi-level predicate and operator pushdown with query vectorization. But if it’s not automatic and performance is important, you can always resort to manual optimization.

By now many cloud data warehouses do support query vectorization, though to varying degrees. Redshift recently added query vectorization. BigQuery includes vectorization but only within BI Engine. Snowflake has had it for some time. Firebolt has had it since its first release.

## 9\. Choose the best cluster for each workload

Another trick to improve performance, which relates to the above discussion on query execution, is to change the number of nodes, and the type of each node, based on the type of workload. For more complex queries where distributing the query and data is hard, or for processing JSON, it might make sense to have larger nodes with more RAM, SSD, and CPU. For ingestion, on the other hand, having many smaller nodes can give you more connections to S3 or Kafka.

I understand it introduces some complexity for the vendor, but I am still a little surprised at how limited the node choices are across vendors. Redshift has a very reasonable list of choices. But Snowflake only lets you choose “shirt sizes” where each step up doubles the number of nodes and the total cost, and slightly increases the size of each node. It means if you need large nodes, you will need to spend much more money on a large cluster. [Athena](https://www.firebolt.io/comparison/firebolt-vs-athena) ([and Redshift](https://www.firebolt.io/comparison/athena-vs-redshift) Spectrum) is even worse because not only do you have no control over size at all. In the case of Athena, the node size is one of the reasons queries mysteriously time out (for more read [AWS Athena Error: Query exhausted at this scale factor](https://www.firebolt.io/blog/aws-athena-error-query-exhausted-resources-at-this-scale-factor).) Google BigQuery does not let you choose from different types of nodes either, although it allows you to balance on-demand with any combination of flex and flat-rate reserved slots. While it does not exhibit the same types of errors as Athena, a choice of node types and sizes would probably make a difference in performance and price-performance.

This is the reason Firebolt lets you choose from so many different node types and sizes, from 2 VPUs up to 128 with varying RAM and SSD sizes per node as well. The flexibility has helped improve performance and price-performance for each ad-hoc, ingestion, or mixed workload.

## 10\. Ingest continuously

The final trick to mention is to switch from batch to incremental or continuous ingestion. This is not about improving efficiency. Batch is generally more efficient at scale than continuous ingestion. Continuous ingestion is also harder for most data warehouses because they were historically designed for batch. What continuous ingestion does is both lower latency and smooth out loads so that you can have smaller clusters performing ingestion over time instead of one massive cluster that needs to support worst-case workloads. Sometimes the best way to make an hourly batch window for example, so that you can display hourly metrics, is to ingest incrementally or even continuously.

Continuous ingestion combined with indexing and other performance optimizations is the only way to provide (near) real-time analytics in dashboards or applications. You need both sub-second ingestion and sub-second query performance to get sub-second visibility. This means and indexing or other precomputing needs to work on write, and not be done later asynchronously using a write-ahead log, for example.

You will at some point be pushed to support some sub-second real-time analytics. So make sure you understand your data warehouse’s continuous ingestion limitations, not just its query performance.

One of the major limitations is that compressed columnar stores do not support incremental writes or updates well. Redshift has table-level limitations of 20 DML writes per queue per table. Snowflake works very well if 1 minute of latency is fast enough. But Snowflake does micro-batch, in part because it rewrites 50–150MB micro-partitions on any write. It micro-batches Kafka writes internally for this reason.

Google BigQuery is even better with second-level low latency for streaming. Your only issue with BigQuery is that you may need to buy reserved slots and then ask Google to remove the default limits as you hit them. I have to give BigQuery the best score here.

Firebolt supports incremental and continuous ingestion, and has been proven at scale. While Kafka support is not currently GA as of October 2021, the building blocks are there to support low latency streaming ingestion as well.

## Yes this one goes to 11

There is so much room for improvement. We are constantly learning about new ways to improve performance. We like to share them, and work them into Firebolt as well. So if you do have some tricks, please share them with the rest of us.

*Originally published at* [*https://www.firebolt.io*](https://www.firebolt.io/blog/top-10-ways-to-improve-cloud-data-warehouse-performance)*.*