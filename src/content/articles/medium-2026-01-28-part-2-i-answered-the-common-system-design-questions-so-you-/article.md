---
title: "Part 2: I Answered the common System Design Questions So You Don’t Have To"
author: "Frontend Canteen"
platform: "medium"
publicationName: "Frontend Canteen"
url: "https://medium.com/frontend-canteen/part-2-i-answered-the-common-system-design-questions-so-you-dont-have-to-e6855fc5722e?source=rss----8c0f5ca1523c---4"
publishedAt: "2026-01-28"
tags:
  - "architecture"
  - "design-systems"
  - "engineering"
  - "web-development"
categories:
  - "Product & Design"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-01T21:19:30.555Z"
---

# Part 2: I Answered the common System Design Questions So You Don’t Have To

# Part 2: I Answered the common System Design Questions So You Don’t Have To

[vtkrishn](/@vtkrishn?source=post_page---byline--e6855fc5722e---------------------------------------)

8 min read·1 day ago

\--

![Photo by CHUTTERSNAP on Unsplash]()

This is the part 2 of the [I Answered the common System Design Questions So You Don’t Have To](/frontend-canteen/i-answered-the-common-system-design-questions-so-you-dont-have-to-93649fb51233) In this section we will go over some common questions on Data modeling and Storage.

## **Data Modeling, Storage & Indexing**

### 1\. How do I model data differently for OLTP vs OLAP workloads?

***OLTP Data Modeling***

-   System prioritized efficient data entry, updates and retrieval for day to day operations
-   Relational in nature
-   Normalization is the key
-   Involves schema design
-   Cardinality, Joins, Constraints,
-   For performance introduce index
-   Atomicity, Consistency, Isolation, Durability (ACID)
-   Transaction integrity

***OLAP Data Modeling***

-   System prioritized for historical, complex queries, reporting , analytics, data mining for large volumes of data
-   Involves dimensional models
-   Denormalized data
-   Redundancy is acceptable
-   Star schema or snowflake schema
-   Optimized for fast reads, aggregation to support analytical efficiencies
-   Fast data retrieval, analytical flexibility

### 2\. How do I decide between SQL, NoSQL, and search engines?

***When to Choose SQL?***

-   Postgres, oracle, mysql — complex structured relationships data integrity and constraints
-   ACID compliance
-   Makes complex join efficient

***When to Choose NoSQL?***

-   MongoDB, Cassandra, Redis are some examples
-   Used for Modern application
-   Optimized for read
-   Rapid development, high scalability and flexible data models
-   Unstructured or dynamic schema
-   Speed is crucial over strong consistency
-   Social network used graph db
-   Key value is used for caching
-   Documents — store for content management

***When to Choose Search Engines?***

-   Elastic, SOLR, Lucene are some examples
-   Used for optimized full text search, data analysis and relevance ranking
-   Inverted Index, BM25 algorithms are used
-   Rapid ingestion, complex aggregation

### 3\. How do I shard data — by user, tenant, region, or something else?

-   *By user or tenant:* user\_id / tenant\_id which can lead to hotspot if one user or tenant usage is more
-   *By region or geography:* Reduce latency for regional users, need careful routing logic
-   *By time or range:* good for time series data, can create hot shards if recent data is very active
-   *Hash based:* **user\_id % number of shards** , even data distribution prevent hot shards but rebalancing will be a problem and is complex to add or remove shards

***How to choose your Shard Key?***

-   Identify common access patterns look for fields in where clause, then use those as shard keys
-   Have related data located by region or country , colocate them as much as possible
-   Balance the load by avoiding concentrate too much data, single massive user can cause hot spots
-   Frequently joined tables can be shaded with the same key e.g stores, products, orders can be shared by using *shard\_id*

***How to Implement?***

-   *Row based:* Distribute based on columns across nodes, no sharding needed
-   *Schema per tenant:* Each tenant gets its own schema or database for strong isolation
-   *Directory based:* Lookup service maps shard keys to physical shards

### 4\. What does a good partition key look like in a distributed store?

***How to chose a Partition Key?***

-   *High cardinality*: Attribute with unique values like *customer\_id*, *session\_id* to spread data across many partitions
-   *Even distribution*: Avoid low hotspots, low frequency or monotonically increasing values like simple timestamps which creates hot partitions
-   *Access pattern*: Align with how query data, frequent data columns like *user\_id* is a great key. Allows for targeted queries, and minimize cross partitions which are expensive

***What are the Common Strategies used?***

-   *High cardinality*: user\_id, customer\_id, vehicle\_id
-   *Tenant Based*: tenant\_id, keep all data together, secondary key if needed
-   *Composite key*: customer#product\_id or tenant\_id#userid for finer grained distribution and grouping related data
-   *Synthetic key*: Create new key with hash by combining with other attributes when single attribute is not working

***What are the bad choices for partition key ?***

-   Low cardinality — status, country are bad choices
-   Monotonically increasing keys like time stamp or auto incrementing ids, which will create hot partitions
-   Non uniform distribution columns

### 5\. How do I avoid hot partitions and skew?

***Partition key***

-   *High cardinality*:Use unique id to spread data across partitions
-   *Composite key*: Multiple keys, user\_id-timestamp to create more uniqueness for even distribution
-   *Salting*: Add random suffixes, to skewed common keys for distinction like key\_1, key\_2 etc
-   *Range partitions*: partition by date range, ensure ranges are balanced

***Data Handling***

-   *Dynamic partitioning*: Split hot partitions or merge cool ones as needed
-   *Intelligent routing*: Direct traffic to less busy partitions
-   *Caching*: Server frequent reads from cache to reduce hot partitions
-   *Batch processing*: Group requests to minimize individual partitions
-   *Index hash keys*: Use different keys for secondary indexes to access data differently e.g Global Secondary Index for dynamoDB

### 6\. How should I index for read-heavy vs write-heavy workloads?

***Read-Heavy Workloads***

-   *More Indexes*: Index frequent queries columns , joins, where clauses, order by clauses for analytics to increases retrieval speed and optimize data
-   *Covering Indexes*: Get all directly from index instead of lookup from the table data
-   *Materialized Views*: Precompute and cache results , for speeding up reading operations
-   *Implement caching*: Introduce caching at Application or Database level
-   *Monitor or prune*: Regularly monitor index usage with EXPLAIN, ANALYZE, VACCUM to identify add, remove, rebuild and modify the index to serve the purpose of optimizing the queries

***Write-Heavy Workloads***

-   *Logging*: logging for data ingestion
-   *Minimize indexes*:INSERT, DELETE or UPDATE requires overhead for indexes or delay index creation or updates. Use partial indexes or filtered indexes if possible
-   *Storage Engines*: use write optimized storage engines
-   *Partitioning*: Optimize table structure by partitioning and distribute write load to multiple disks or servers

### 7\. How do I design soft delete, archival, and retention?

***Soft Delete Design***

-   Strategy to mark the record as deleted without actually
    deleting
-   Add a column to the main table like **deleted\_at**, **is\_deleted** boolean flag
    instead of DELETE command use UPDATE statement to update **deleted\_at** with current timestamp
-   Querying will filter based on this column
-   Easy recoverable, audit trails, user facing trash features
-   impact performance maintenance, logic to add read operation etc

***Archival Design***

-   Move old data from main storage to low performance cost storage systems
-   Create specific archive table or use separate archive databases
-   Use scheduled trigger to periodically move records that meet specific criteria
-   INSERT into archive table, then DELETE from main table
-   Archived data will have less access
-   Improved performance, reduce storage costs for active data and separate operational data for historical data

***Retention Policy Design***

-   How long data should be stored or permanently removed or destroyed
-   Compliance or legal policies
-   Soft delete — 90 days
-   Automate enforcements which will identify > 30 days and soft delete
-   Identify > 90 days rows and permanently hard delete
-   Audit trail will ensure deletion of archival and permanent purge or logged for auditing purposes, compliance and regulations
-   User can be notified of the deletion

### 8\. How do I handle multi-tenant data isolation?

***Database Strategies (Physical vs. Logical)***

-   Physical Isolation
-   Separate database
-   Separate schema
-   Separate storage or containers
-   Logical Isolation
-   Shared database, tenant id column
-   row level security — RLS

***Application-Level Safeguards (Crucial for all strategies)***

-   Tenant context can be tracked using JWT request
-   ORM integration can be used as object relation mapper or filters for TenantID to all queries
-   Data Validation hooks can be used for matching the current context
-   Avoid raw SQL which bypasses tenant checks
-   Audit or unsafe mode tracking by heavy logging, monitoring method to disable isolation for internal reporting

***Security & Compliance Layers***

-   *Authentication and Authorization*: RBAC for tenant specific logins and encryptions by TLS
-   *Cryptographic Isolation*: Tenant Specific column master keys for data encryptions
-   *Auditing*: Logging and monitoring everything
-   *Quotas*: Allocate Resource Quotas for api calls and limits on storage per tenant

### 9\. How do I design a migration strategy for a huge table?

***Pre-Migration Assessment and Planning***

-   *Analyze the table*: Understand the source data schema, indexes, constraints, size, growth rate and access patterns. identify tables with logical dependencies
-   *Define goals*: Clearly state the projects goal , scope, and acceptable downtime window
-   *Clean the data*: Identify and remove unused tables or archive old, static data to reduce the migration scope
-   *Plan the target*: Design the new schema, provision the target databases with sufficient resources (CPU, memory, storage) and pre create the schema objects (tables , indexes etc) to improve the load performance
-   *Develop the rollback plan*: Ensure you have a clear, tested rollback strategy and comprehensive data backups in case of unexpected issues.

***Choosing a Migration Strategy***

-   *Offline migration (System Blackout)*: bring down the application ,copy the data and bring the application back
-   *Master / Read replica Switch*: Setup target for read replica of the source using one way synchronization, migrate the application code to use the new environment for reads. At cutover momentarily stop writes to the source, let the replica catch up then promote the replica to the new master.
-   *Synchronized migration*: setup bi directional synchronization between the source and target. this allows both systems to be active simultaneously enabling gradual zero down time cutover by slowly directing the traffic to the new database.

***Execution Techniques for Large Tables***

-   *Partitioning/Chunking*: Split the huge table into small, manageable chunks based on data and id ranges and load these in parallel
-   *Parallel loading*: use data pump from oracle to load in parallel or custom scripts to load using multiple threads which improves performance
-   *Minimize overload*: initial load can have a disable secondary indexes, constrains and archive log generation on the target database to speed up the import process. Reenable them after the load is complete
-   *Change Data Capture (CDC)*: After an initial full load, use cds to capture and replicate the ongoing changes from the source to the target in real time. this keeps the target in sync until the final cutover
-   *Incremental backfilling*: If developing a custom solution, start by applying changes in real time and backfill historical data in the background in small manageable batches
    ***Post-Migration Validation and Optimization***
-   Data validation for consistency, row count, checksum, data integrity and constraints
-   Performance testing for optimizing slow queries
-   Monitoring the system performance and address issues
-   Decommission old table, once stable remove old tables, temporary tables, migration code and tools

### 10\. How do I safely backfill data in production?

***Preparation & Planning***

-   Backup the data before starting
-   Test in the non production environment, like staging
-   Communicate the stakeholders
-   Document the scope, reason and affected data and tables
-   Define whats the objectives and clearly state what you are trying to fix, delete or add

***Execution Strategy***

-   *Batching*: Break data into small, manageable chunks by data, ID range
-   *Throttling*: Limit the rate of data processing to prevent any database or system overload
-   *Incremental/Idempotent*: Design logic that can be rerun without creating duplicates (i.e where id > last\_id)
-   *Pagination*: Use keyset pagination based on the last processing ID for efficient iteration
-   *Run outside transactions*: avoid long running transaction that locks the tables
-   *Idempotent function*: use business logic that produces the results of how many times its run
-   *Automation*: use orchestrators like Airflow, Dagster or tools like Fivetran for large jobs

***Monitoring & Validation***

-   Monitor the performance, watch the load, memory and runtime closely
-   Data quality checks: run automated checks after each batch to ensure correctness
-   Verify the results by confirming the backfilled data and confirm it matches the expectations

***Post-Backfill***

-   Do the cleanup of the temporary tables
-   Document the completion and note the succes or any issues encountered

Stay tuned for Caching and Performance soon.