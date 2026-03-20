---
title: "Part 6: Common System Design Questions: Async Processing, Events & Jobs"
author: "Frontend Canteen"
platform: "medium"
publicationName: "Frontend Canteen"
url: "https://medium.com/frontend-canteen/part-6-common-system-design-questions-async-processing-events-jobs-ba942b66247f?source=rss----8c0f5ca1523c---4"
publishedAt: "2026-02-04"
tags:
  - "architecture"
  - "engineering"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-01T21:19:30.642Z"
---

# Part 6: Common System Design Questions: Async Processing, Events & Jobs

# Part 6: Common System Design Questions: **Async Processing, Events & Jobs**

[vtkrishn](/@vtkrishn?source=post_page---byline--ba942b66247f---------------------------------------)

8 min read·Feb 4, 2026

\--

![Photo by ål nik on Unsplash]()

This is part 6 of the [I Answered the common System Design Questions So You Don’t Have To](/frontend-canteen/i-answered-the-common-system-design-questions-so-you-dont-have-to-93649fb51233) We will go over some common questions on Async Processing, Events & Jobs.

### 1\. When do I choose event-driven over request-response?

*Event Driven Architecture(EDA)*

-   *High scalability & Performance*: Systems with variable loads where services must scale independently
-   *Loose coupling*: When services should not depend on each others immediately availability to function
-   *Complex workflow*: Multi step processes that involve multiple downstream actions
-   *Resilience and Reliability*: If one service fails, others continue functioning, events can be retried later
-   *Auditability*: When a full history of state changes is required

*Request Response (RR)*

-   *Immediate Feedback*: User facing action requiring a direct, synchronous response (*OK/ERROR* confirmation)
-   *Strong consistency*: When data much be consistent immediately across system not eventually
-   *Low complexity*: Simple Systems where debugging asynchornous flows add unnecessary overhead.

### 2\. How do I design an event schema that can evolve safely?

-   *Additive Changes only*: add new fields rater than modifying or deleting existing ones. This ensures that old consumers can still process new messages for backward compatibility
-   *Use optional fields & defaults*: when adding fields make it optional or provide default values. this prevent deserialization errors in consumers that hasn’t updated yet
-   *Avoid renaming or removing fields*: Renaming a field breaks consumers instead add a new fields with desired name, update producers to populate both and onlyt remove old fields after all consumers have migrated
-   *Schema registry implementation*: Use schema registry (Confluent) to enforce compatibility rules (BACKWARD, FORWARD, FULL) during development and while deployment
-   *Semantic versioning*: Version your schemas (e.g v1, v2) for breaking changes, create a new event type entirely rather than patching an old one.
-   *Upcasting*: If the schema changes significantly use an upcaster in the consumption layer to transform old event structures into the new format before they reach the application logic.

*Lifecycle*

> Expand (Add) -> Migrate (Update) -> Contract (Remove)

-   *Initial schema*: v1 — *{“id”: “1001”, “name”: “Michael”}*
-   *Change: in v2* — keep name optional, add { firstName , lastName}
-   *Final Schema*: *{“id”: “1001”, “firstName” : “Michael”, lastName : “Bolt” , “name”: “Michael Bolt”}*

### 3\. How do I handle exactly-once vs at-least-once semantics in practice?

***At least once implementation***

-   High throughput , duplicates possible
-   *Mechanism*: the producer sends a message and retries until it receives an acknowledgement. If the acknowledgement fails, the message will be sent again creating duplicates
-   *Handling*: Consumers must be idempotent, every message should have a unique Id, before processing the consumer checks if the id was already processed
-   *Use cases*: logging, analytics, non critical data ingestion

***Exactly Once implementation***

-   High consistency, high complexity
-   *Mechanism*: This requires transaction processing, where producing the result and committing the source offset occur atomically. it often uses two phase commits or distributed snapshots
-   *Handling*: Utilizes build in features, such as kafka’s *isolation.level=read\_committed*
-   *Use cases*: Financial transactions, billing , updating critical state

### 4\. How do I design a job scheduler for millions of jobs/day?

-   *API server / Job Service*: Receiving job requests, validates and stores them in metadata dB
-   *Metadata Database (Persistent Storage)*: Stores the job definition, schedules and statuses in DB suitable for high read/Write loads
-   *Scheduler / Dispatcher Service*: A centra service or shared service that queries the DB for job to be run and pushes to message queue
-   *Message Queue*: Buffer the tasks between the scheduled and workers to handle spikes and decouple components
-   *Execution Workers*: Consume jobs from the queue execute them, update the status in the database. they should be designed to handle failure by retrying

*Design Key Principles*

-   *Horizontal scaling*: Add more api servers and worker nodes to distribute the load
-   *Partitioning / Sharding*: Divide the job db by time or ID to avoid bottlenecks
-   *Idempotency*: Design tasks so that running multiple times does not produce incorrect results
-   *High availability*: Use a leader election mechanism (Zookeeper or Redis locks) for dispatches to prevent multiple nodes from scheduling the same tasks
-   *Monitoring & Observability*: Track job metrics, latency and worker health

*Workflow*

-   Submit (User submit job, status PENDING)
-   Schedule (polls the dB for Job, and publish to queue)
-   Execute (worker consumes, status changed to RUNNING)
-   Finish (Update status as COMPLETED)

> for 10 million jobs per day
> 10000000 /(60x60x24) = 115 jobs per seconds

### 5\. How do I track the status of long-running jobs for users?

To track the status of long running jobs for users , implement asynchronous architecture where api requests return unique job-id immediately. use a persistent data store to record job status, progress and heartbeats, enabling users to poll an endpoint like */job/status/<job-id>*

-   *Asynchronous Processing*: use queues for background taks,s with worker nodes updating the job status in the DB
-   *Polling API*: Create an end point for clients to poll for progress (Running, completed)
-   *Database tracking*: Utilize a sql, no sql table to manage the lifecycle, (PENDING, COMPLETED, FAILED) and include a last heartbeat to identify hung jobs
-   *User feedback*: Display progress percentage and provide options to cancel/terminate jobs via a frontend UI

*Common Practice*

-   *Database table*: store job parameters and status, querying this table for updates
-   *Log Parsing*: monitor job logs for progress indicators
-   *Websocket/push*: Push status updates directly to the client instead of polling

### 6\. How do I design dead-letter queues and retry policies?

Designing dead letter queues and retry policies required implementing exponential backoff, setting finite retry limits to prevent infinite loops and isolating failed messages for later analysis. Using DLQ to capture message exceeding max retries, ensuring they are enriched with context (error code, original queue) for later debugging

*Design Retry Policies*

-   *Categorize errors*: Distinguish between transient (retryable) and permanent errors. only retry transient failures
-   *Exponential backoff*: Avoid immediate retries, which can overload systems. increase wait times between attempts exponentially (1s,2s,4s,8s)
-   *Set max retries*: Define a strict upper limit on attempt before moving to DLQ
-   *Use Jitter*: Introduce random delays to prevent “thundering heed” effect where all consumers retry simultaneously

*Designing DLQ*

-   *Create Dedicated Queues*: Create separate DLQs for different service types ,rather than single global bucket to simplify analysis
-   *Preserve Context*: When routing a message to the DLQ, add metadata like original topic, error reason, consumer ID and timestamp
-   *Set TTL*: Have TTL on DLQ messages so they eventually expire, preventing infinite storage growth
-   *Automated re-drive*: Implement automation to replay messages from the DLQ back to the main queue once the root cause is fixed
    *Best Practices*
-   Alert on growth when the DLQ depth increases which indicates a system failure
-   Monitor consumption of DLQ compared to successful processing
-   Analyze errors regularly to identify patterns in failure (consumer error or malformed data)

### 7\. How do I avoid processing the same event forever due to poison messages?

To avoid processing the same poison message forever, implement dead letter queue (DLQ) to move failing messages after a set number of retries,
typically configured via maxDeliveries or retry policies. This prevents single un processed message from blocking the consumer while allowing it to be analyzed later

*Strategies*

-   *Dead Letter Queues (DLQ)*: configure message broker to move messages to a separate queue (DLQ) after a predefined number of failed attempts (3–5 times)
-   *Retry Policies & Limits*: Set a maximum retry count (*RecieveRetryCount*) on the consumer. Once this threshold is reached, the message is discarded or moved, stopping infinite loops
-   *Idempotent Customers*: Design consumers to handle same message multiple times without changing the results (idempotency) use unique event ID’s to track if a message has already been processed
-   *Message Validation*: Implement robust schema validation before processing to catch malformed messages early
-   *Exception Handling*: Use try catch blocks to catch errors, ensuring that only specific, temporary exceptions triggers a retry, while validations errors trigger a move to the DLQ.
-   *Kafka Specific Solutions*: Use *ErrorHandlingDeserializer* combined with *DeadLetterPublishRecovered* to handle deserialization failures or update the offset to skip the message

*Best Practices*

-   Log the error and the message payload for debugging
-   Retry a limited number of times for transient errors
-   Move the message to a DLQ if retries fail
-   Acknowledge (ACK) the original message in the main queue to allow the consumer to process

### 8\. How do I design a fan-out/fan-in pipeline for heavy computations?

Breaking a larger task into smaller independent unit, distributing them across multiple worker threads or nodes and consolidating the results.
Use queue or channels to manage communication, matching the number of workers to CPU cores for optimal parallel processing

*Key Components*

-   *Work Generator (Producer)*: Creates independent task (jobs, tasks, messages) and send them to central queue
-   *Dispatcher (Fan Out)*: Distribute these task across multiple worker processes or threads to run in parallel
-   *Workers (Processors)*: Independent entities (processes or go routines) that consumes tasks from queue and perform heavy computations
-   *Collector (Fan in)*: Aggregates the results from all workers into a single output channel or database
-   *Identify Independent tasks*: Ensure the workload can be parallelized (processing 1000 images where image is processed independently)
-   *Set up communication channels*: Use queues or channels to handle data transfer between the producer and consumers
-   *Implement worker pool*: Instantiate multiple worker processes to process tasks. (could e CPU bound or threading for I/O)
-   *Merge results*: Create function that collects output from all workers channels using a *waitgroup* or similar mechanism to wait for all tasks to complete
-   *Handle Data Integrity & Errors*: use context of error handling to manage timeouts and clean up resources if a worker fails
    *Best Practices*
-   *Match worker count to CPU cores*: use *runtime.NumCPU()* or similar to match the number of worker processes to the available CPU cores to avoid overhead
-   *Use asynchronous communication*: Async messaging (SNS/SQS) avoid blocking the main thread during high load tasks
-   *Monitor performance*: log worker activity to identify bottlenecks or unevenly distributed workloads
-   *Consider Scalability*: If the workload exceeds one machine, move to a distributed system like apache Airflow or Kubernetes worker

### 9\. How do I handle ordering of events when it matters?

Critical ordering of events that requires guaranteeing that related events are processed sequentially. This can be done using Ordered Queues (Kafka Partitions or SQL FIFO) with special keys, implementing versioning or sequence number on events and leveraging idempotent consumers to handle retries

-   *Partition by key*: Route all events to same key (user\_id, order\_id) to the same partition. this will be processed in order by single consumers
-   *Use FIFO Queue*: Amazon SQS FIFO or SNS FIFI which strictly enforces the order of message delivery
-   *Sequence Number / Versioning*: Attach monotonically increasing version number or timestamp to each event. Consumers can then discard out-of-order, older events or buffer them until the missing or earlier event arrives
-   *Event Sourcing*: store all events in sequence in an immutable logs. the state of the system is them rebuilt by replaying in the same order
-   *Idempotent Consumers*: Design consumers to handle the same event multiple time without changing the results which will allow you to safely retry processing if an event arrives out of order or is delayed
-   *Partial ordering vs Total ordering*: Recognize that you often only need to order events related to specific entity rather than ordering every event across the entire system

Part 7: [APIs, Boundaries & Contracts](/frontend-canteen/part-7-common-system-design-questions-apis-boundaries-contracts-87a09032e2b0)