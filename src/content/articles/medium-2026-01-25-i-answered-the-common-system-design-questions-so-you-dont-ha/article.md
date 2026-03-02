---
title: "I Answered the common System Design Questions So You Don’t Have To"
author: "Frontend Canteen"
platform: "medium"
publicationName: "Frontend Canteen"
url: "https://medium.com/frontend-canteen/i-answered-the-common-system-design-questions-so-you-dont-have-to-93649fb51233?source=rss----8c0f5ca1523c---4"
publishedAt: "2026-01-25"
tags:
  - "architecture"
  - "engineering"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-01T21:19:30.627Z"
---

# I Answered the common System Design Questions So You Don’t Have To

# I Answered the common System Design Questions So You Don’t Have To

[vtkrishn](/@vtkrishn?source=post_page---byline--93649fb51233---------------------------------------)

6 min read·4 days ago

\--

![Photo by UX Store on Unsplash]()

I recently came across a [post link](/@patwaripuneet15/the-ultimate-system-design-checklist-90-questions-to-sharpen-your-engineering-mind-8c824fad739d) that compiles the most commonly asked system design interview questions. The list is useful, but the answers are intentionally left for readers to figure out themselves. In this series, I’ll be answering those questions to create a single, consolidated resource for system design preparation.

## **Core Distributed Systems & Scalability**

### 1\. How do I decide when to split a monolith into services?

First ask the following questions

**Why we have to split?**

-   Performance and scaling issues for independent scaling needs
-   Increase productivity with development velocity
-   Complexity of the project and easier maintenance
-   Different technology needs for different systems
-   Fragility and Resilience to failure

**When not to split?**

-   Not matured enough to withstand splitting
-   Tight coupling with unclear boundaries
-   Operation overhead and infrastructure burdens

**Where to split?**

-   Business capabilities with well defined business functions and boundaries
-   Decoupling command shared services
-   Data dependency reducing the cross service integrations

**The Process**

-   Identify the target business with high value
-   Build infrastructure, api, observability and pipelines around it
-   Extract the service, slowly route through the new api service keeping the old still working
-   Replace with api’s and calls with asynchronous messaging and events
-   Try to own the data to accommodate complete autonomy for the service

### 2\. How do I design a service that can handle 10x more traffic with minimal changes?

Some of the key things to know which will help to increase the traffic and scale are

**Architecture & Infrastructure**

-   *Load Balancing*: Distribution of requests automatically based on demand
-   *Asynchronous processing*: Introduce a message queue to buffer the requests and decouples the traffic and requests without overloading the processing and handle bursts
-   *Micro services*: Independent service for scaling some part of the application separately
-   *CDN*: Offload static assets and load them quickly from edge serves closer to the load reducing the delay because of network latency

**Data & Database**

-   *Caching*: Implement caching at multiple layers for quick data retrieval and reduce DB load, slow disc access and round trips
-   *Database Scaling*: Introduce partitioning or Sharding of data accordingly
-   *Efficient queries*: DB Indexing, query optimization for effective data retrievals

**Code & Application Level**

-   *Resource Pooling*: Thread pooling, connection pooling, connection keep alive to minimize allocation overload for heavy objects
-   *Efficient Algorithm*: Optimize critical code path with better optimized sorting, searching or memoization, looping strategies
-   *Statelessness*: Design services to be stateless so that any server can handle any requests and simplify scaling needs

**Strategy**

-   *Monitor load and Test*: Identify bottlenecks by individual components(CPU, Memory, DB calls) and optimize them first before scaling
-   *Incremental changes*: Employ optimization individually and one by one, testing for performance instead of massive overhaul entirely

### 3\. What are the real trade-offs between vertical and horizontal scaling?

***Vertical Scaling (Scaling Up) —*** *Adding resources like CPU, Memory on a single system to bulk and to accommodate the business scaling needs. Its best used for early stage application where the traffic is moderate and to resolve quick fixes and immediate bottlenecks.*

Advantages

-   Simpler to implement
-   Lower initial cost
-   less architectural changes
-   strong consistency
-   fast performance boost for moderate loads

Disadvantages

-   hardware limits
-   single point of failure
-   requires downtime for upgrades
-   less cost effective on long tern
-   poor elasticity

***Horizontal Scaling (Scaling Out) —*** *Investing on cheap commodity servers to scale the demanding business needs. Its best used for large-scale applications, micro services architecture, stateless services and to serve unpredictable traffic spikes*

Advantages

-   High availability
-   Fault tolerant without single point for failure
-   Near unlimited scalability
-   Elasticity
-   better for long term cost for high growth

Disadvantages

-   Complex architecture needs
-   Potential network latency and challenges
-   Data consistency issues
-   State management
-   High initial setup cost

### 5\. How do I choose between synchronous and asynchronous communication?

***Synchronous****: Blocking requests which needs immediate response*

-   Urgency is high
-   complexity and sensitivity
-   building bonds
-   Chat systems, one on ones, quick actions and connection oriented
    like phone calls, video conference, meetings etc

***Asynchronous****: Non blocking requests which can tolerate delayed response*

-   Flexibility
-   Focus and avoid interruptions
-   Serving large audience
-   Documentation related systems involving status updates, email, response, sending notifications

### 6\. When should I use a queue vs direct RPC?

**Queue** is an ideal option for

-   Asynchronous processing
-   Load Leveling, Decoupling and Buffering
-   Resilient systems
-   Event Driven architecture

**RPC** is chosen for

-   Immediate action and feedback
-   Synchronous interaction
-   Low latency and Simple request
-   Tightly coupled services

### 7\. How do I design for back pressure in a high-traffic system?

Control the high traffic by

-   *Rate limiting / Throttling —* Token or leaky bucket algorithm to match consumer intake capacity
-   *Feedback loops* — connection from the consumer to producer asking to slow down based on consumption rate
-   *Message Queues* — Buffer the data using message broker to suport event driven architecture
-   *Load Shedding* — drop the requests when the system is at capacity
-   *Adaptive behavior* — automatically adjust delivery rates
-   *Virtual waiting rooms* — for better user experience
-   *Circuit Breaker* — stops failures to affect cascading effect on downstream services
-   *Timeouts* — time consuming services can have timeouts included
-   *Retries* — Implement retrying failed requests with exponential backoffs and jitters

### 8\. How do I protect downstream services from traffic spikes?

-   *Monitoring* — real time monitoring helps detect spikes and trigger scaling and alert
-   *Edge Protection* — Stop bad traffic early by adding CDN, Edge Ingress protection
-   *Web Application Firewalls(WAF)* — Restrict bad requests
-   *API Gateway* —429 too many requests message, based on number of requests reaching the service at a give time typically implemented by rate limiting
-   *Auto Scaling* — automatically add or remove instances based on the load. try rate limiting first for cost efficient solution
-   *Load Balancing* — distribute the traffic across available servers
-   *Queues* — Absorb the burst buffering and decoupling the requests in queue or in message for workers to process and prevent app or db overload eventually and smoothing the traffic
-   *Caching* — store frequently used data to reduce db hits
-   *Circuit breaker* — trip and stop and make it open and half open to stop further requests and result in cascading failures
-   *Bulkhead* — isolate services so one service do not slow or fail others, use a separate thread pools or resource limits
-   *Exponential backoff* — retrying with some increasing delays to prevent retry storms — constant value for delay eg. 1s, 2s,4s, 8s
-   *Jitter* — Adding randomness to the delay e.g 0.3s, 1.8s, 3.2s, 7.5s

> Full Jitter — random between 0 to exponential backoff value
> Equal Jitter — fixed minimum delay + random delay e.g exponent /2 + random (0 to exp /2)
> Decorrelated Jitter — make current delay dependent on previous delay preventing long streak of retries

### 9\. How do I design APIs so they can evolve without breaking clients?

-   *Versioning* — Employ URI Versioning in the URL, *api.test.com/v1/orders*
-   *Custom headers* — implement custom header if needed, *X-API-Version : 1*
-   *Content Negotiation* —to define the media type, *accept: application/json*
-   *Avoid Versioning if possible* — have most of the features employed in the initial version before introducing versions
-   *Additive changes only* — never remove anything, only add new functionalities, resources or optional fields
-   *Optional Fields*— Make new fields optional to avoid breaking as the client may not aware of the new changes
-   *Deprecation process* — mark as deprecated, document for 6–12 months extended period, clearly communicate to migration path for the client
    move to the alternative solution
-   *Default values for fields* — if any fields are mandatory have a sensible default value added to maintain compatibility with old clients
-   *Descriptive status codes* — use appropriate status codes e.g 300’s — resource unavailability, 400’s — client errors, 500’s — server errors
    *Documentation* — maintain through up to date api documentation by following open API standards or swagger
-   *Developer portal* — Offer dedicated portal for release notes, Change log, guides
-   *Proactive Communication* — Notify consumers in advance about upcoming changes via email, mailing lists, developer portal

Part 2 about the [Data Modeling, Storage and Indexing](/frontend-canteen/part-2-i-answered-the-common-system-design-questions-so-you-dont-have-to-e6855fc5722e)