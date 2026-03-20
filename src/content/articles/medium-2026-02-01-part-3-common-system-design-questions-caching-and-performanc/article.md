---
title: "Part 3: Common System Design Questions: Caching and Performance"
author: "Frontend Canteen"
platform: "medium"
publicationName: "Frontend Canteen"
url: "https://medium.com/frontend-canteen/part-3-i-answered-the-common-system-design-questions-so-you-dont-have-to-ee7a48e7cd63?source=rss----8c0f5ca1523c---4"
publishedAt: "2026-02-01"
tags:
  - "architecture"
  - "engineering"
  - "performance"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-01T21:19:30.586Z"
---

# Part 3: Common System Design Questions: Caching and Performance

# Part 3: Common System Design Questions: Caching and Performance

[vtkrishn](/@vtkrishn?source=post_page---byline--ee7a48e7cd63---------------------------------------)

8 min read·Feb 1, 2026

\--

![Photo by Nicolas Hoizey on Unsplash]()

Hope you are enjoying the series for common System design questions so far. This is the third installment of the [I Answered the common System Design Questions So You Don’t Have To](/frontend-canteen/i-answered-the-common-system-design-questions-so-you-dont-have-to-93649fb51233) We will go over some common questions on Caching and Performance.

## Caching and Performance

### 1\. Where should I cache — client, edge, service, DB layer?

*Client side*

-   Static assets, images, css, java scripts
-   Offline data, user preferences cookie, cache-control
-   Service workers

*CDN/Edge Network*

-   Images, video
-   Geographically closer to users, global audience
-   e.g AKAMAI, cloud flare, AWS Cloud front

*Application / Server layer*

-   In memory db, expensive query results
-   Session data, computed data, frequently accessed business objects
-   e.g Redis Memcached, or any in memory caches

*Database layer*

-   Query results, precomputed aggregates
-   Materialized view, heavy analytics data
-   Offload heavy read operations directly from the db, speed up complex queries
-   DB buffers, query caches, specialized databases
-   Elastic search for aggregations

### 2\. How do I pick between write-through, write-back, and write-around caching?

*Write-Through Caching*

-   Data is written to both cache and the primary db, write is completed only if it does on both cache and DB
-   *Pros*: high data consistency requirement, subsequent read after read system, and frequent read operations
-   *Cons*: slow write performance because of writing on both with high network traffic and frequent calls

*Write-Back Caching*

-   Data written only to the cache, write is confirmed and completed, modified data is marked as dirty and written to the db asynchronously at a later time (when data is evicted from cache or some other time)
-   *Pros*: High write performance, best for write intensive workload, high volume writes, batch to db efficiently, low network bandwidth environments
-   *Cons*: risk of data loss, complex implementation, asynchronous sync process
    *Write-Around Caching*
-   Data is written primary to db by passing the cache and the cache is updated only if the data is read at the later time which avoids polluting cache with data which may not be accessed at the later time.
-   *Pros*: This will maintain cache integrity, only frequently accessed will be in the cache
-   *Cons*: high initial read latency, cache miss and then cache hit subsequently, read after immediate write will be slow

### 3\. How do I design cache invalidation rules that don’t become a nightmare?

-   *Granular hierarchical keys*: Use arrays instead of string to create clear hierarchy making related data easier to invalidate
-   *Composite keys*: Combine elements to create unique keys for specific date slices, ensuring only relevant data is cleared
-   *Publish and Subscribe*: When data changes in the db, the subscriber listen to and invalidate the cache entry. Centralized invalidation logic to prevent inconsistencies

*Hybrid Strategies*

-   *TTL for event failures or simple data*: Event driven logic
-   *Stale while revalidate*: Serve slightly stale data from the cache while refreshing it in the background for faster responses without cache stampede
-   *Cache Aside*: Checks cache first and then db, update the cache on write either write Through, write Back approach
-   *Russian doll caching*: Invalidate parent when child data changes

*Best practices*

-   *Avoid global purges*: invalidate specific keys
-   *Monitor metrics*: trace cache hit-miss ratios, ttl expiry and staleness to tune your strategies
-   *Handle cache stampede*: use locking or delayed refreshes when many requests hit an expired key simultaneously

*What to Avoid?*

-   *String based keys for complex data*: Guesswork and hard to manage invalidation
-   *Black box caching*: not monitoring cache behavior leads to unseen staleness
-   *commingling mutable / immutable data*: makes cache management inconsistent, pass by reference for collections. thread safety

### 4\. How do I handle cache stampede and thundering herd?

*Locking mechanisms/request coalescing*

-   Only one request is responsible for regenerating the missing cache entry
-   first request acquires the distributed lock before fetching data from the backend (SETNX command for Redis)
-   subsequent request for the same key detects the lock and wait, retry and return a stale value until the cache is populated by the winning request
    lock should have a short
-   fixed expiration time to prevent deadlocks if the rebuilding process cashes

*TTL Jitter*

-   Instead of all cached items expiring at the exact same time, add a small random offset to their ttl.
-   This staggers the expiration times, spread the cache rebuild load over a period rather than creating a sudden spikes in misses

*Stale while revalidate*

-   when a cache entry expires, the system serves the slightly stale data to the client immediately while a background process asynchronous refreshes the caches.
-   Better user experience than latency and prevents spikes

*Preemptive caching/cache warming*

-   Proactively refresh critical or frequently accessed cache entries before they expires using background jobs or scheduled tasks.
-   This ensures that data is almost available in the cache minimizing the chances of a cache misses under traffic.

*Rate limiting*

-   limit on requests to the background control simultaneous requests and prevent the database from becoming overwhelmed

*Negative Caching*

-   Cache the absence of data for a short period.
-   If a request asks for a non-existent item (e.g., a deleted user ID), the system caches that the data is missing
-   Prevents repeated database queries for the same non-existent record.

### 5\. What is my caching story for hot keys and large objects?

***Handling Hot Keys***

-   Hot keys are a small percentage of keys that receive a disproportionately high amount of traffic, potentially overwhelming individual cache nodes or the database.

*Replication / local caching*

-   Replicate the hot data across multiple cache nodes or even locally within the application instances themselves (in memory cache) to distribute the read load

*Load balancing*

-   Ensure the load balancer distributes the traffic evenly across all nodes, especially for these popular keys to avoid single node bottlenecks.
-   Consistent hashing with careful monitoring can help prevent hot shards.

Proactive Refreshing

-   Instead of waiting for the key to expire and multiple requests hitting the databases simultaneously (cache stamped) use background process to asynchronously refreshes the hot key in the cache before it expires

*Short TTL’s*

-   For rapidly changing hot data, use very short ttl values
-   This can act as a band aid to reduce load on the db while maintaining freshness

*Monitoring and detection*

-   Implement systems to monitor cache metrics.
-   Hit rates, request rates to individual keys to detect hot keys in real time and dynamically adjust caching strategies.

***Handling Large Objects***

*Storing*

-   Large objects (e.g., 100MB+) in an in-memory cache can lead to issues such as increased latency, memory pressure, and potential OutOfMemory exceptions.

*Object splitting/ partial caching*

-   split into smaller logically related chunks, each with its own key. this allows for fetching only the needed parts reducing memory usage and network transfer size.

*Tiered caching*

-   Use multi tiered caching system. store metadata or smaller frequently accessed parts of the object in a fast in memory cache and store the large actual object in slightly slower, but more cost effective store like s3, ssd cache

*Serialization Optimization*

-   Ensure efficient serialization/deserialization of large object to minimize cpu overhead and memory footprint

*Dedicated cache instance*

-   Use dedicated cache clusters with specific memory configuration and eviction policies for large objects from the general cache used for smaller items to prevent hot keys cache pollutions

*Content Delivery Networks*

-   Image, static, large files leverage CDN optimized for large objects efficiently by caching them at edge location closer to users

Overall Strategy

Cache eviction policies, apply ttls, monitor and iterate

### 6\. How do I measure whether a cache is actually helping?

*Hit Ratio*

-   *Cache hit ratio (CHR)*: formula: **Hits / (Hits + Misses)**, percentage of requests served by the cache (Hits) vs the origin (Misses), Goal is to get the higher value which is better, more hits and data served quickly

*Latency*

-   *Cache hit latency (L Hit)*: Time to get the data from the cache
-   *Cache miss latency (L Miss)*: Time to fetch data from the db after miss + write to cache
-   *Weighted Average Latency*: (Hit Rate x L Hit) + ((1 — Hit Rate) x L Miss) Speed of hit is out weighed between cost of miss, providing overall speed improvement
-   *Origin DB Strain*: monitor the number of request hitting the primary db, a good cache should reduce these request preventing overload.

The above can be measured by

-   *Application Monitoring*: caching libraries or APM tools to get stats like hits, misses and timings
-   *Performance Testing*: Run load tests with and without caching enabled to compare responses times and throughput
-   *Perf Utility*: commands like **perf record -e cache-misses** to analyze hardware cache performance for applications

If its high CHR, Low average latency, reduced DB requests and faster overall page load means its a good sign

Low CHR, High average latency, increased origin load, frequent cache invalidation adds cache overhead without delivering any benefits and is a bad sign

### 7\. How do I design pagination for massive datasets efficiently?

***Backend & Database Strategies (API/Server-Side)***

-   *Cursor based pagination*: offset use the items timestamp to fetch the next batch where **id > last\_id limit n.** This requires unique indexed column for ordering. use limits and offsets, limit 10 offset 100000 can be slow
-   *Database indexing* : for performance, index columns which can be used for sorting and filtering i.e *order by* *where* clause
-   *Data projections*: fetch only the fields needed for the current view
-   *Caching* : cache non changing result sets or entire pages to reduce load on the database
-   *Consistent ordering*: always sort data consistently. e.g by unique id

***Frontend & User Experience (UX)***

-   *Infinite Scrolling*: More seamless than traditional page numbers, load next chunks as the user scroll or do load more
-   *Limits*: Limit items per page by keeping the page size reasonable 10 or 20 for better performance and balance
-   *Hidden links*: Don’t show all links: show next and previous and few surrounding numbers
-   *Context*: show current position like 20–40 of 1000 or estimate the count
-   *URLs for SEO*: Keep meaningful urls for SEO and use urls for deep linkings but use cursor values for api calls

e.g
*GET /api/products?limit=20 (first 20 plus next\_cursor for 21st item)
GET /api/products?limit=20&after\_cursor=product\_id\_20*

### 8\. How do I design rate limiting that doesn’t break good users?

*User Information*: Identify users by

-   *user\_id* of the user
-   To track authenticated users we can use the *JWT tokens*
-   Identify the devices used for the user sessions
-   API Key account information
-   IP Address of the user

*Traffic*: Increase in the traffic burst can be identified by

-   Token bucket algorithm to rate limit and cap on the usages with burst limits
-   communicate the usage via statuses like HTTP 429 requests for exceeding limits
-   Add custom headers for tracking usages
    *Retry after, Rate limit,X-RateLimit-limit*,*X-RateLimit-Remaining*,*X-RateLimit-Reset* to show usages and quota

*Segmentation*: Categorize users by

-   free users lower limits and premium users get higher limits, different limits for resource intense or lightweight api calls for free users and restrict heavy api usages
-   Track traffic patterns set realistic limits to protect the system
-   Use asynchronous processing by using web-hooks, or status checks instead of holding expensive open connections for the users.

Thats all or now, Part 4 will be in [Consistency, Availability & Transactions](/frontend-canteen/part-4-common-system-design-questions-consistency-availability-transactions-529852027c34)