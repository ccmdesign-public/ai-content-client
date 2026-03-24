---
title: "Single Flight: Avoiding Duplicate Work in Backend Systems"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/single-flight-avoiding-duplicate-work-in-backend-systems-158576d81c6a?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-24"
tags:
  - "architecture"
  - "best-practices"
  - "engineering"
  - "performance"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-24T23:01:54.795Z"
---

# Single Flight: Avoiding Duplicate Work in Backend Systems

![](https://cdn-images-1.medium.com/max/1024/1*zs3EDX_8zrpyq4lIh9tZqg.png)

#### When One Request Quietly Becomes a Hundred

There are some backend problems that do not look dangerous at first. In fact, they often look completely normal.

A request comes in.
The server processes it.
A response goes out.

Simple.

But under real traffic, that same simple looking flow can become surprisingly wasteful.

Let us say your backend has an endpoint like this:

```
GET /price/BTCUSDT
```

Now imagine 200 users open their trading screen at nearly the same moment.

All 200 requests ask for the same thing.

At the application level, this might seem fine. After all, each request is valid. Each user needs the data. Each request can simply call the database or hit an external API.

But this is where the hidden inefficiency begins.

```
200 requests↓200 identical executions↓200 identical DB queries or API calls↓unnecessary load↓higher latency
```

The system is not doing 200 different pieces of work. It is doing the same work 200 times.

And this is exactly the kind of problem good backend design tries to eliminate.

This is where the SingleFlight pattern becomes useful.

#### The Core Idea

The SingleFlight pattern solves a very specific problem.

If multiple identical requests arrive at the same time, only one of them should perform the actual work.

The rest should wait for that in progress execution and reuse its result.

That is the entire idea. Completely avoid duplicate concurrent work for the same key.

A very simple mental model looks like this:

```
200 requests arrive for the same resource↓system checks whether this work is already in progress↓1 execution starts↓199 requests wait↓all receive the same result
```

This is why the pattern is called SingleFlight. Only one flight is allowed for a given piece of work at a time. Everyone else boards the same one.

#### Why This Matters More Than It First Appears

This pattern becomes especially important when the underlying work is expensive.

For example:

-   fetching market data from an exchange
-   rebuilding a cache entry
-   loading metadata from the database
-   calculating a shared aggregate

In all these cases, running the same operation repeatedly at the same moment adds no real value. It only adds pressure to the system.

Let us compare the two worlds.

#### Without SingleFlight

```
req1 → DB/API callreq2 → DB/API callreq3 → DB/API callreq4 → DB/API callreq5 → DB/API call
```

#### With SingleFlight

```
req1: DB/API call ────────── resultreq2: wait ────────────────┘req3: wait ────────────────┘req4: wait ────────────────┘req5: wait ────────────────┘
```

That second flow is much closer to what we actually want.

One execution. Shared value. Far less waste.

#### A More Intuitive Way to Think About It

Suppose five people in an office want the same printed report at the same time. A bad system would send all five people to print the same report separately. That gives you five identical copies of the same thing.

A better system would let one person print it once, and the other four simply share the same copy amongst themselves.

That is what SingleFlight does for backend operations.

“If this exact work is already happening, do not start again. Just wait and share the result.”

This is a small idea, but in high traffic systems it can make an enormous difference.

#### A Simple Node.js Implementation

The pattern is often implemented with an in memory map of currently running promises.

The key identifies the work.

The value stores the promise representing the ongoing execution.

Here is a clean implementation:

```
class SingleFlight {  private inflight = new Map<string, Promise<any>>();    async do<T>(key: string, fn: () => Promise<T>): Promise<T> {    const existing = this.inflight.get(key);    if (existing) {      return existing;    }    const promise = (async () => {      try {        return await fn();      } finally {        this.inflight.delete(key);      }    })();    this.inflight.set(key, promise);    return promise;  }}export const singleFlight = new SingleFlight();
```

The logic is straightforward.

```
request comes in↓check inflight map for key↓if found, return existing promise↓if not found, start execution↓store promise in map↓when complete, remove key
```

That is all the machinery needed. The elegance of this pattern is part of what makes it so appealing.

#### Using It in a Real Service

Now let us say we have a service that fetches a market price from an external exchange.

```
async function getPrice(symbol: string) {  return await singleFlight.do(`price:${symbol}`, async () => {    console.log("Fetching price from exchange");    return fetchPriceFromExchange(symbol);  });}
```

If multiple calls arrive together like this:

```
await Promise.all([  getPrice("BTCUSDT"),  getPrice("BTCUSDT"),  getPrice("BTCUSDT"),  getPrice("BTCUSDT"),]);
```

The actual runtime behavior looks more like this:

```
req1: fetchPriceFromExchange("BTCUSDT") ────────── resultreq2: wait ──────────────────────────────────────┘req3: wait ──────────────────────────────────────┘req4: wait ──────────────────────────────────────┘
```

Only one outbound call is made. The remaining requests reuse the same promise and receive the same result once it resolves. That is the pattern in action.

#### Where This Pattern Quietly Saves Systems

SingleFlight is one of those patterns that often does not get much attention, but once you notice it, you start seeing its usefulness everywhere.

#### 1\. Cache rebuild protection

Imagine a hot cache key expires. Suddenly many requests miss the cache at once.

Without protection:

```
cache miss↓100 requests rebuild same value↓database gets hammered
```

With SingleFlight:

```
cache miss↓1 rebuild starts↓99 requests wait↓all reuse rebuilt value
```

This is one of the most common and valuable uses of the pattern.

#### 2\. External API rate limit protection

If your service depends on an external provider, duplicate concurrent calls can quickly push you into rate limiting.

```
50 identical requests↓50 outbound API calls↓provider rate limit risk
```

SingleFlight changes the shape of the traffic:

```
50 identical requests↓1 outbound API call↓49 wait↓shared response
```

#### 3\. Shared metadata loading

Sometimes applications repeatedly load the same reference data, configuration, or asset metadata under concurrent traffic.

In those moments, this pattern acts almost like a concurrency aware memoization layer for in progress work.

#### A Very Important Limitation

The simple implementation above works only inside a single process. That distinction matters.

If your application is running on:

-   multiple pods
-   multiple containers
-   multiple servers
-   horizontally scaled instances

then each instance has its own memory and its own in flight map.

So the behavior becomes:

```
pod 1 → 1 executionpod 2 → 1 executionpod 3 → 1 execution
```

Inside each pod, SingleFlight still helps. But across the whole cluster, duplicate work can still happen.

That is why in distributed systems this pattern is often combined with Redis locks or another shared coordination mechanism.

A practical layered model looks like this:

```
request arrives↓in process SingleFlight check↓distributed lock check↓expensive work executes once↓result shared
```

So the local SingleFlight pattern is powerful, but it is not the complete story in a distributed environment.

#### Why I Like This Pattern

What makes SingleFlight interesting is not just that it saves resources. It reflects a deeper backend design principle.

Many scaling problems are not caused by slow code alone. They are caused by redundant code paths executing the same work again and again under concurrency.

SingleFlight is a good reminder that performance is often about coordination, not just speed.

Sometimes the best optimization is not making the operation faster. It is making sure only one copy of it runs in the first place.

#### Final Thought

The SingleFlight pattern is simple enough to fit in a small utility file.

But its impact can be much larger than its implementation suggests.

It helps reduce duplicate load.
It improves efficiency under concurrency.
It protects databases and external APIs.
And it gives backend systems a cleaner way to behave under pressure.

At a glance, many simultaneous requests may look like many independent pieces of work. But often, they are all asking the same question.

SingleFlight teaches the system to answer it once.

* * *

[Single Flight: Avoiding Duplicate Work in Backend Systems](https://levelup.gitconnected.com/single-flight-avoiding-duplicate-work-in-backend-systems-158576d81c6a) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.