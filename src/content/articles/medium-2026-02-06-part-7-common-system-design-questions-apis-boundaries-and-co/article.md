---
title: "Part 7: Common System Design Questions: APIs, Boundaries & Contracts"
author: "Frontend Canteen"
platform: "medium"
publicationName: "Frontend Canteen"
url: "https://medium.com/frontend-canteen/part-7-common-system-design-questions-apis-boundaries-contracts-87a09032e2b0?source=rss----8c0f5ca1523c---4"
publishedAt: "2026-02-06"
tags:
  - "api-design"
  - "architecture"
  - "best-practices"
  - "engineering"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-01T21:19:30.593Z"
---

# Part 7: Common System Design Questions: APIs, Boundaries & Contracts

# Part 7: Common System Design Questions: **APIs, Boundaries & Contracts**

[vtkrishn](/@vtkrishn?source=post_page---byline--87a09032e2b0---------------------------------------)

7 min read·Feb 6, 2026

\--

![Photo by Egor Komarov on Unsplash]()

This is part 7 of the [I Answered the common System Design Questions So You Don’t Have To](/frontend-canteen/i-answered-the-common-system-design-questions-so-you-dont-have-to-93649fb51233) We will go over some common questions on APIs, Boundaries & Contracts.

### 1\. How do I define clear boundaries between services?

-   *Define by Domain (Domain Driven Design)*: Bounded context consistent with business area
-   *Map Business Capabilities*: Define services based on the specific business “Order Management” or “User Profile”
-   *Single Responsibility*: Each service much have single responsibility and own its data, not directly access another services DB
-   *API Contracts and Abstractions*: Define clear, documented and versioned API’s that declare what the services does not how it does it, allowing the internal implementation to change
-   *Asynchronous Communication*: Favor asynchronous event based messaging to prevent tight coupling, which boosts reliability and scalability
-   *Independent evolution*: Ensure services, can be updated, deployed and scaled independently without breaking dependencies
-   *Avoid chatty services*: Minimize high frequency, synchronous calls between services, as this often indicates poorly designed boundaries

*Good boundaries*

-   Change in one service should not affect others
-   The service can be fully understood , developed and maintained by small team
-   Data consistency is handled through events rather than immediate, synchronous locking

### 2\. How do I design versioning for public APIs?

*Plan Versioning early*

-   *Start Beginning*: Start versioning at the beginning of API design phase
-   *Define Policy*: Establish clear riles for how you will manage versions, including support timelines, communication methods, and a deprecation process

*Choose a versioning strategy*

-   *URI Path*: Include the version number directly in the URL path, this is easy to cache and widely used
-   *Query Parameters*: Specify the version as a query parameter, which makes the url less clean
-   *Custom Request Headers*: Use custom HTTP header to indicate the desired version. Needs more complex client implementations and specialize caching configurations
-   *Content Negotiation (Accept Header)*: Use the Accept header to specify a custom media type that includes the version. *Accept: application/json, version: 1*

Use semantic versioning

-   *Major (X.0.0)*: Increment for breaking changes to the public API contractor. These changes necessitate a new public version
-   *Minor (0.Y.0)*: Increment for new, backward compatible features or functionality. These should not require a new public version
-   *Patch (0.0.Z)*: Increment for backward compatible bug fixes.

*Maintain Backward compatibility*

-   Add new end points or resources instead of modifying existing ones, introduce new optional properties with default values, rather than changing existing ones or making exiting optional fields mandatory

*Communicate Clearly*

-   *Document, publish, communicate* : Provide clear, separate documentation for all supported API version. tools like Swagger or Postman can help manage version specific documentation.
-   Maintain a detailed change log highlighting all updates, especially changes and new features. when retiring an old version, give users ample notice (6–12) months

Implement and Test

-   *Automate, Deploy and Monitor*: Implement automated regression tests for every supported version, roll out new version in phases, perhaps starting with a small group of beta users.
-   Track which versions are being used to inform deprecation timelines and focus support efforts

### 3\. How do I design tenant-level rate limits and quotas?

*Design the strategy and scope*

-   *Differential rate limits vs Quotas*: Rate limit manages instantaneous traffic, while quotas manage long term consumptions for billing or subscriptions
-   *Identify Tenants*: Use stable identifiers like *TenantId* or API Key rather than IP addresses, as IP addresses can change or map to multiple users.
-   *Set Tiered Limits*: Define different limits based on customer plans to monetize usage and ensure premium customers have priority.

*Choose Implementation Algorithms*

-   *Token Bucket*: Ideal for allowing bursts of traffic while enforcing an average rate.
-   *Fixed Window Counter*: Simple to implement but allow double traffic at the edges of the window
-   *Sliding Window Counter*: Provides more accurate throttling than fixed windows by preventing burst spikes at the edge of time frames.

*Architecture for enforcement*

-   *API Gateway*: Implement limits at API Gateway to reject unauthorized traffic before it hits backend services.
-   *Distributed Cache*: Use Redis to store counters, utilizing atomic LUA scripts to handle concurrent requests and avoid double spending tokens.
-   *Sticky Hashing*: Route specific tenants to specific “limiter shards” to minimize cross node communication and reduce latency.

*Handling Limit Violations*

-   *HTTP 429 Too many requests*: When a tenant exceeds the limit, return 429 status code.
-   *Header visibility*: Inform clients about their usage status using headers.

> X-Ratelimit-Limit: The limit ceiling value
> 
> X-Ratelimit-Remaining: Remaining request in the window
> 
> Retry-After: Seconds to wait before retrying

-   *Graceful degradation*: Implement soft limits before hard limits to provide a better user experience.

*Monitoring*

-   *Measure accuracy*: Log throttle keys and rates to analyze true positive vs false positive rates to refine configurations
-   *Adjust Traffic patterns*: Use historical data to identify spikes and adjust limits, ensuring they allow for legitimate high volume activity
-   *Configure Alerts*: Establish alter when tenant approach their quotas to allow for proactive capacity management.

*Example*

-   *Identifier*: API Key Headers
-   *Algorithm*: Token bucket stored in Redis (per tenantID)
-   *Tiered Limit*: 50 req (free users) / sec, 500 req / sec (Paid users)
-   *Action*: 429 + Retry After headers

### 4\. How do I handle partial failures in multi-service calls?

-   *Circuit Breaker*: Monitor failed requests and temporarily stops traffic to a failing services to prevent system wide overload, allowing time to recover
-   *Retries with Exponential backoff*: Automatically retry failed calls, increasing the wait time between attempts to handle temporary network or service issues
-   *Fallback Mechanism*: Return cached data, default values or reduced functionality response when a dependent service fails, rather than failing the entire requests.
-   *Timeouts*: Set strict limits on how long a service waits for a response, ensuring resources are not tier up indefinitely.
-   *Idempotency*: Ensure retrying requests does not produce unintended side effects.
-   *Asynchronous Communication*: Use message queues to decouple services, allowing processes to continue even if one component is temporarily unavailable.
-   *Bulkheads*: Isolate resources for different services so that a failure in one does not exhaust resources for others.
-   *API gateway/load balancer*: Utilize these to monitor service health and route away from unhealthy instances.

### 5\. How do I design a gateway that can evolve independently of services?

*Separate Concerns, Gateway vs Services*

-   *Keep business logic out*: the gateway should handle only routing, authentication , sql termination , rate limiting and request/response transformation.
-   *Decouple data transformation*: Use the gateway to map external restful API to internal gRPC or SOAP services. this “*Rosetta Stone*” approach allows internal services to adopt new protocols without breaking client contracts

*Implement a declarative Gateway*

-   *Configuration as code*: use declarative configuration for routes and plugins rather than hard coding routing logic
-   *Automate with CI/CD*: Manage gateway configurations through *gitpos*. This allows for safe, automated rollouts of new routing rules as services evolve.

*Use strategic decoupling patterns*

-   *Backends for frontends*: Implement specific gateways for different clients. This allows desktop team to update their service endpoints without impacting mobile, preventing a single monolithic gateway from becoming a bottleneck
-   *Adapter/Wrapper Pattern*: Use connection object, or adapter pattern within the gateway to translate client requests into the specific signatures of backend services
-   *Asynchronous communication*: Leverage message queues to decouple services, allowing gateway to pass requests asynchronously rather than waiting for slow synchronous responses.

*Manage Evolution without breaking changes*

-   *API versioning*: implement api versioning at the gateway level to support old clients while allowing backend teams to deploy new service versions
-   *Graceful degradation*: Design for failure using circuit breakers, retries, and timeouts in the gateway to manage service instability
-   *Canary Deployments*: Use the gateway to route a small percentage of traffic to new service versions, allowing safe, independent testing

*Adopt modern architecture*

-   *Service mesh interactions*: use service mesh to handle service to service communication and allow the api gateway to focus exclusively on external to internal traffic, further isolating the gateway from internal service changes
-   *Lightweight routing*: consider per pod gateway approach instead of single heavy gateway, provides greater isolation and autonomy for individual services to evolve

### 6.How do I design for backward compatibility when schemas change?

*Key Strategies*

-   *Additive changes*: add a new column instead of altering existing ones. make sure old code does not break.
-   *Utilize default value*: When adding new, required fields, assign default vales os old application can still functions
-   *Version Control*: Use version numbers for API’s and database schemas to manage changes.
-   *Expand, Migrate, Contract*: Add new fields, update application logic to read/write from both with both migration scripts, Once everything is fine remove the old fields
-   *Deprecate, don’t delete*: instead of removing fields, mark them as deprecated to give developers time to update their applications
-   *Schema Registries*: use services like confluence schema registry to check compatibility of new schema versions against old ones

*Best Practices*

-   Upgrade consumers first and then the producers
-   Test the schema changes in staging environment with small datasets first
-   Maintain clear documentation and migration guides for developers

### 7\. How do I handle “breaking change” scenarios with minimal disruption?

-   *Implement Parallel Versions*: support the old version of an api or service while launching new one, provide grace period to migrate
-   *Use Feature Toggles*: Deploy code with features disabled, allowing for activation at a later time, without new deployment
-   *Deprecation Notices*: Clearly communication changes via changelogs and emails at least one week prior
-   *Automated Testing*: Use automated monitoring to detect breaking changes in 24 hrs
-   *Semantic Versioning*: Clearly communicate the scope of changes (Major, Minor, Patch)
-   *Graceful Degradation*: Ensure the system can still function at a lower level if the new feature fails.

*Best Practices*

-   Evaluate if the change is truly necessary
-   Use API gateway to manage versions centrally
-   Document and maintain clear migration path

### 8\. How do I design a safe deprecation process?

*Key Strategies*

-   *Establish clear policy and timeline*: Create a standardized policy defining the lifecycle of deprecation. Set reasonable notice period that allows users to adjust their workflows
-   *Conduct Impact Analysis*: Identify all internal and external dependencies to understand who is using the feature and how they will be affected

*Communicate Early*

-   *Multiple Channels*: Use emails, developer newsletter, blogs, posts and in app banners to notify users
-   *Transparent Reasoning*: Explain clearly why the feature is removed
    Implement Technical Warnings:
-   *Code Level*: Use standard code annotations to inform the developers
    Api level: use deprecation and sunset HTTP header fields
-   *Logs and Banners*: Add warnings to logs and display in app, dismissible banners for the users
-   *Provide Alternatives*: Clearly document the alternative path or replacement path to make migration easy
-   *Disable for short period*: Internal disable and identify. any remaining users who missed the warnings
-   *Post deprecation plan*: Archive documentation for the deprecated future but keep it accessible for future references

*Best Practices*

-   Avoid Surprises, give users enough time to adapt
-   Consider a process for stake holders to challenge or request an extension for the deprecation
-   Handle data safely and ensure data integrity remains intact throughout the transition when migrating to new system

Part 8: Observability, Monitoring & Operations