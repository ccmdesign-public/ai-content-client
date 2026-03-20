---
title: "Part 4: Common System Design Questions: Consistency, Availability & Transactions"
author: "Frontend Canteen"
platform: "medium"
publicationName: "Frontend Canteen"
url: "https://medium.com/frontend-canteen/part-4-common-system-design-questions-consistency-availability-transactions-529852027c34?source=rss----8c0f5ca1523c---4"
publishedAt: "2026-02-02"
tags:
  - "architecture"
  - "engineering"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-01T21:19:30.553Z"
---

# Part 4: Common System Design Questions: Consistency, Availability & Transactions

# Part 4: Common System Design Questions: Consistency, Availability & Transactions

[vtkrishn](/@vtkrishn?source=post_page---byline--529852027c34---------------------------------------)

9 min read·Feb 2, 2026

\--

![Photo by Khalil Radi on Unsplash]()

This is the fourth section of the [I Answered the common System Design Questions So You Don’t Have To](/frontend-canteen/i-answered-the-common-system-design-questions-so-you-dont-have-to-93649fb51233) We will go over some common questions on Consistency, Availability & Transactions.

## **Consistency, Availability & Transactions**

### 1\. When do I accept eventual consistency vs strict consistency?

***When to Accept Eventual Consistency?***

-   Mostly for OLAP systems
-   High availability and performance needs
-   Prioritize uptime over instance updates, for systems available for writes even during network partitions
-   Large scale social media like count or comment takes some time to update globally
-   Content management or caching , DNS updates, website caching, content propagation, change profile picture
-   Analytics or Reporting aggregation of large amount of data, transaction change accuracy is less critical than throughput
-   Non crucial user experience ok for stale data to be shown to user which does not lead to data loss

***When to Demand Strict Consistency?***

-   Mostly for OLTP systems
-   Financial transactions with immediate change and accurate balance and transfers
-   Inventory / book keeping to prevent double booking and selling items without stocks, global lock for updates
-   Administrative / system actions like user authentication, password changes, critical setting changes where it causes security or functional issues
-   Limited / small datasets: when system do not face large, global scale or overhead of ensuring consistency

### 2\. How do I model consistency levels across services and data stores?

***Modelling Strategies***

-   *Boundaries*: Define boundaries with service boundary following ACID strong consistency, across boundaries will be eventual consistency
-   *Identify consistency model*: Strict consistency for critical operations, inventory deductions, use eventual consistency for non critical highly available scenarios
-   *Saga pattern*: Use sequence of local transactions with compensative actions to maintain consistency across services
-   *Event driven*: services publishes events to a message bus (RabbitMQ, Kafka) which other services consumes to update their data
-   *Orchestration*: central orchestrator manages the workflow and triggers actions in other services
-   *Change Data Capture (CDC)* : Stream changes from a databases to other system for near real time consistency
-   *Idempotent consumers*: ensure receiving the same event multiple times does not result in duplicate updates
-   *Handle cache consistency*: use write through or cache aside patterns to manage consistency between data stores and caching layers

***Consistency Model Summary***

-   *Strong Consistency*: Read will always return the most recent version of the data, other servers reflects the changes immediately
-   *Sequential Consistency*: Ensure all operations across processes appears in a single unified order. all process observes same sequence of operations
-   *Causal Consistency*: Related events happens in a logical order, if two operations are not related causally, system doesnt enforce order, different users experience different sequence
-   *Eventual Consistency*: the system will eventual get the correct data even when the data is stale at some point in time
-   *Weak Consistency*: No ordering guarantee, user sees different version of data depending on which node they are connected
-   *Session Consistency*: all data and the actions for the user within a session remain consistent
-   *Monotonic Read Consistency*: Reads will get current or most recent data you will not see any older data after a new value is seen earlier
-   *Monotonic Write Consistency*: Once the write happens future writes will take place in the same order, system guarantees that the data will not be reversed to old value
-   *Read your writes Consistency*: written data by a user will see the update done by him in subsequent reads
-   *Write follows read Consistency*: A read will happen on the same data where the write happened
-   *Processor Consistency*: Processor maintains a sequence order how they see writes and read in the same order within the processor
-   *Cache Consistency*: Write operation to the same memory location happens in some sequence order

### 3\. How do I implement distributed transactions without 2PC pain?

***Key Strategies to Avoid 2PC Pain***

-   *Saga pattern*: Local small transaction for microservices. Executes compensation transaction for undoing the proceeding steps
-   *Eventual consistency*: BASE — Basically Available Soft State, Eventual Consistent — Trades high availability for partition tolerance
-   *Idempotency*: Does not lead to duplicate, corrupted data use unique ID for each operation
-   *Change data capture(CDC)*: ensure reliable message delivery to services without dual writing to a database and message broker

*Try Confirm Cancel*: In 2Phase Commit try before committing offering more control than sagas but complex implementation

*Best Practices*

-   Design for failure
-   Observability
-   Merge services if it uses single database for more tightly coupled services

### 4\. How do I design an outbox/inbox pattern for reliable events?

-   *Transactional Outbox/Inbox*: ensure reliable, at least once message delivery use db as temporary queue within a local transaction. The sender saves business data and events together background worker or CDC tool publishes them preventing data loss
-   *Inbox table*: receiver stores incoming ids in an inbox table before processing to prevent duplicate handling (Idempotency)
-   *Atomic transaction*: open db transaction update the business entitity and insert the event into output table simultaneously
-   *Outbox table*: create a table in the source database to store outgoing message (ID, payload, type, status)
-   *Message relay*: a background process service (polling or CDC) reads the unprocessed events from the outbox table and publishes them to message broker and marks them as processed

*Best Practices*

-   *Idempotency*: ensure consumer handle duplicate messages gracefully as network failure causes the relay to retry already sent message
-   *Scaling*: Select for Update skip locked to allow multiple , parallel worker instances to process the outbox table without conflicts
-   *Cleanup*: Regularly delete or archive processed messages from the outbox table to maintain performance
-   *CDC over polling*: For high throughput prefer CDC to avoid overhead of constant polling

### 5\. How do I handle “read your own writes” in a distributed system?

-   *Direct read to primary*: After user writes ensure their subsequent read request are routed to primary node for certain period
-   *Session stickiness/ Affinity*: pinning the user session to the primary node busing a session id. load balancers or application logic routes all requests from that session to the same servers
-   *Time base flagging*: Mark the user with a flag after a write: the system check the flag and directs the read to primary for predefined duration that is greater than the maximum expected replication lag, before switching back to reading from replicas

*Caching Mechanisms*

-   *Write through caching*: update both db and cache simultaneously. subsequent reads will retrieve the fresh data from the cache
-   *Invalidation on write*: After a write, invalidate the relevant entries in the cache, subsequent reads will be forced to fetch from db, ensuring get latest version
-   *Client side caching*: client temporarily caches the data that just wrote, subsequence reads is for that specific item, the client refers to local cache for short time
-   *Versioning and timestamp*: Attach version information or logical timestamp to all writes. When read is performed, the system compares the data version with the users last known version. If the data on the replica is older, the system can either fetch the data from the primary or wait for the replica to catch up
-   *Quorum based replication*: Quorum consensus — paxos, raft writes are only considered committed after a majority of nodes acknowledges them. Reads can then also require a quorum to ensure they get the most recent data
-   *Trade off*: Directing all reads to primary will be bottleneck, consider strong consistency and performance
-   *Complexity*: Implementing custom logic for session management of version checks adds complexity in the application or middleware layers
-   *Use case specific*: Post can take time to reflect the changes, but the user who is posting should see the update for themselves

### 6\. How do I reconcile divergent data across systems?

*Data Reconciliation*: Reconciling means identify discrepancies, data consistency, accuracy integrity

-   *Identify data sources and define metrics*: identify specific metrics (total sales, customer ids)
-   *Data extraction*: Extract data from different sources, single, centralized location, data warehouse or staging area to facilitate comparison
-   *Data matching*: Use common unique identifiers, transaction ids , ski number, email addresses to match records between systems
-   *Identify discrepancies*: perform automated comparisons to detect missing records, mismatches values or duplicate entries
-   *Correction and resolution*: Investigate the root cause, api , failure or human errors, and update records to bring them into alignments
-   *Validation*: Verify that the corrected data is accurate and consistent before moving it back to production, ensuring no new errors were introduced

*Automated reconciliation*: Tools and script to compare large datasets, faster and less prone to errors

*Transaction level reconciliation*: Match individual transactions to ensure detailed accuracy

*Balance level reconciliation*: compare summary totals , total daily sales, to ensure overall alignment

*Fuzzy matching*: identify potential matches

-   Reconciliation mode: temporarily pause incoming data ingestion, fetch latest data via api, compare and adjust to match the source of truth

*Best Practices*

-   *Single source of truth*: define, primary correct data for specifc entities
    implement data governance — strict standardization, formatting, and validation rules
-   *Automate validation and alerts*: Build dashboards to monitor reconciliation health, match rates, exception counts, set alerts when data out of sync
-   *Idempotent operations*: Design system allowing retries, to ensure data is not duplicated during reconciliation attempts

*Technical divergent*

-   *Merge*: combine changes,
-   *Rebase*: Apply local changes on top of remove branch history
-   *Fast forward only*: Update the branch only if there are no local changes

Consider CDC or event sourcing to maintain consistency across system

### 7\. How do I design id generation that works across regions?

-   *Cross region unique ID: D*ecentralized approach — 64 bit integer formats twitter snowflake (time stamp, data center id + sequence) or UUID’s (v4/v7)
-   *Multi master database* : Replication with offset increments or nodeid + timestamp
-   *Twitter snowflake*: generates 64 bit Id’s using

> 1 bit — unused + 41 bit — timestamp + 10 bit — machine id/region + 12 bits

-   *Sequence number*: Ensure chronological order, uniqueness, high performance without inter region communication
-   *UUID/v7–128 bit unique identifier :* Time ordered and url safe making superior random UUIDv4 for db indexing
-   *Distributed sequence generator*: use Zookeeper with coordinator id generation, latency multi write environments
-   Dataset level auto-increment with offsets: assign a starting value and offset based on the number of datacenter
-   *Datacenter 1: 1, 3, 5*
-   *Datacenter: 2, 4, 6*

*Consideration*

-   Uniqueness , ordering, time order, scalability — able to generate > 10000 ids per second without single point of failure
-   *Size*: prefer 64 bit integer to fit in most db, or 128-bit alphanumeric strings
-   *Deploy*: Deploy id generator locally within each region behind load balancer to minimize network latency: if using database driven approach ensure that the database themselves support reliable multi master replication to sync id range

### 8\. How do I reason about CAP trade-offs for a given product requirement?

In distributed systems, Network partition is unavoidable so choose between Consistency or Availability during those failures.

*Trade off*: Bad Consistency , user seeing stale data, or Bad availability — user will not be able to use the service

-   *CP Consistency + Partition Tolerance*: sacrifice availability but ensures all the nodes return the same correct data
-   *AP Availability + Partition Tolerance*: sacrifice strong consistency to ensure the service availability with stale data

Choose CP: if, data integrity is important, source of truth is critical
Choose AP, if user experience is important, stale data is acceptable

-   *Read Heavy volatile data*: User prefers fast loading, Choose AP
-   *Write Heavy transaction data*: double booking as seat is not acceptable

*Consider Tunable Consistency*

-   Cassandra, RIAK or MongoDB allows to choose a balance on a per query or peer column basis
-   *Strong consistency*: when accuracy is critical
-   *Eventual consistency*: When speed is critical

*CRDT* : use this to achieve eventual consistency while ensuring all nodes eventual reach a same state

-   *State Based* : (Replicas share entire state, merge operation)
-   *G counter*: count only allows increments for growth only
-   *PN Counter*: Positive/Negative counter, allowing increment and decrements
-   *LWW -Element-Set*: Last write wins, timestamp to maintain order, policy for conflict resolution
-   *Operation Based*: (Replicas exchange operations)
-   *G-set*: grow only set
-   *OR-set*: Observed/Removed — addition and deletion of elements
-   *CRDT counter*: counter for increments and decrements

*CRDT examples*: Counters, sets, text editing, chat application, distributed systems

### 9\. How do I design strong ordering guarantees where they really matter?

-   *Keyed Partitioning*: map related events to same key, this will force message to use same partition for sequential processing
-   *Idempotent Producers*: Set ***ack=all***, messages are written once and in order preventing re ordering for retries
-   *Transactional Outbox pattern*: Separate process to consume from outbox table to ensure no event is lost , maintains order
-   *Sequencing metadata*: If event sent concurrently, attach a sequence number or timestamp to each message. consume will reorder them correctly based on this metadata before processing
-   *Single Threaded Consumers*: Maintain only one thread or consumer instance processes messages for a given partitions to guarantee serial execution
-   *Strong consistency model*: Use DB with strong consistency, immediate , global ordered reads
-   *Scaling limitations*: Increasing partitions or consumers can break ordering
-   *Retries*: Idempotent Consumers to handle duplicate messages, to guarantee ordered , at-least-once

Part 5: [Reliability, Failures & Recovery](/frontend-canteen/part-5-common-system-design-questions-reliability-failures-recovery-97be1f1bcce8)