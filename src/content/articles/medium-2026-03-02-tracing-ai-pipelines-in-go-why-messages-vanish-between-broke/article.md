---
title: "Tracing AI Pipelines in Go: Why Messages Vanish Between Brokers"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/tracing-ai-pipelines-in-go-why-messages-vanish-between-brokers-e6625c9a3131?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-02"
tags:
  - "ai"
  - "golang"
  - "kafka"
  - "observability"
  - "distributed-systems"
  - "coding"
  - "frameworks"
---

# Tracing AI Pipelines in Go: Why Messages Vanish Between Brokers

# Tracing AI Pipelines in Go: Why Messages Vanish Between Brokers

[Aryan Mehrotra](https://medium.com/@aryan_mehrotra?source=post_page---byline--e6625c9a3131---------------------------------------)

7 min read·2 days ago

\--

You have a clean distributed trace. An HTTP request hits Service A, calls Service B over gRPC, and the whole thing shows up as one beautiful waterfall in Jaeger. Then Service B publishes a message to Kafka. Service C consumes it. And your trace just… stops. Service C starts a brand new trace. Two disconnected trees. No way to follow the message.

This is one of the most frustrating problems in event-driven Go architectures. Distributed tracing works perfectly for synchronous calls — HTTP, gRPC — because the trace context rides along in headers. But message brokers sit in between. There’s no HTTP header to propagate. The consumer might run minutes later, on a different machine. Traditional parent-child span relationships don’t make sense for async messaging.

The solution exists — **OpenTelemetry span links** — but most Go developers either don’t know about them or dread implementing the carrier/propagation boilerplate for every broker. In this article, you’ll learn how span links work, how to implement them in Go, and how frameworks like [GoFr](https://gofr.dev/docs/quick-start/introduction) handle all of this automatically across Kafka, Google Pub/Sub, and AWS SQS.

## Why Parent-Child Doesn’t Work for Pub/Sub

In synchronous tracing, the relationship is obvious: Service A calls Service B, so B’s span is a **child** of A’s span. They share a trace ID. The child starts after the parent and ends before it.

But pub/sub breaks every one of those assumptions:

Synchronous (HTTP/gRPC) Asynchronous (Pub/Sub) Consumer runs immediately Consumer may run hours later One producer → one consumer One producer → many consumers Parent span still active Parent span already ended Same trace context New process, new context

If you force a parent-child relationship, your traces become misleading. The consumer span appears “inside” the producer span, but the producer finished long ago. Latency calculations are wrong. Fan-out patterns create impossibly deep trace trees.

The [OpenTelemetry messaging semantic conventions](https://opentelemetry.io/docs/specs/semconv/messaging/messaging-spans/) solve this with **span links**: the consumer span is its own root span, but it has a **link** back to the producer span. Same trace visibility, correct semantic relationship.

![Parent-child spans break for async messaging — span links preserve the causal relationship without forcing a hierarchy]()

## Implementing Span Links in Go: The Manual Way

To propagate trace context through a message broker, you need three pieces:

1\. A carrier — an adapter that lets the OpenTelemetry propagator inject/extract trace context into your broker’s message format

2\. Inject on publish — put the traceparent into the message

3\. Extract on subscribe — pull it out and create a span link

Here’s what that looks like for a generic `map[string]string` attribute system (like Google Pub/Sub):

```
// Step 1: Carrier adaptertype attributeCarrier map[string]string
```

```
func (c attributeCarrier) Get(key string) string    { return c[key] }func (c attributeCarrier) Set(key, value string)     { c[key] = value }func (c attributeCarrier) Keys() []string {    keys := make([]string, 0, len(c))    for k := range c {        keys = append(keys, k)    }    return keys}// Step 2: Inject on publishfunc injectTraceContext(ctx context.Context, attrs map[string]string) map[string]string {    if attrs == nil {        attrs = make(map[string]string)    }    otel.GetTextMapPropagator().Inject(ctx, attributeCarrier(attrs))    return attrs}// Step 3: Extract on subscribefunc extractTraceLinks(attrs map[string]string) []trace.Link {    carrier := attributeCarrier(attrs)    extractedCtx := otel.GetTextMapPropagator().Extract(context.Background(), carrier)    spanCtx := trace.SpanContextFromContext(extractedCtx)    if spanCtx.IsValid() {        return []trace.Link{{SpanContext: spanCtx}}    }    return nil}
```

Then on the publish side, you create a producer span and attach the trace context to the message:

```
ctx, span := tracer.Start(ctx, "publish", trace.WithSpanKind(trace.SpanKindProducer))defer span.End()
```

```
attrs := injectTraceContext(ctx, nil)// publish message with attrs...
```

On the subscribe side, you receive the message first, then create a consumer span with the link:

```
msg := receiveMessage() // get the message firstlinks := extractTraceLinks(msg.Attributes)
```

```
opts := []trace.SpanStartOption{    trace.WithSpanKind(trace.SpanKindConsumer),}if len(links) > 0 {    opts = append(opts, trace.WithLinks(links...))}ctx, span := tracer.Start(ctx, "subscribe", opts...)defer span.End()
```

That’s the pattern. But here’s the catch: **every broker has a different message attribute format**. Kafka uses byte headers. SQS uses `MessageAttributeValue` with a `DataType` field. Google Pub/Sub uses `map[string]string`. You need a different carrier for each one. And you need to make sure the subscribe span is created *after* the message arrives — not before — so you can access the attributes.

## Get Aryan Mehrotra’s stories in your inbox

 from this writer.

Remember me for faster sign in

Most teams either skip this entirely or implement it for one broker and forget the others.

## How GoFr Handles It Automatically

[GoFr](https://gofr.dev/docs/advanced-guide/using-publisher-subscriber) now handles span link propagation for all three major message brokers out of the box. You don’t write carrier code. You don’t change your handlers. You just publish and subscribe, and the traces connect.

The publish side injects trace context into message attributes automatically:

```
// Your GoFr handler — no tracing code neededfunc PublishOrder(ctx *gofr.Context) (any, error) {    order := map[string]string{"id": "123", "item": "widget"}    data, _ := json.Marshal(order)
```

```
err := ctx.GetPublisher().Publish(ctx, "orders", data)    return nil, err}
```

Behind the scenes, GoFr’s publish method creates a producer span with the right `messaging.system` attribute and injects `traceparent` into the message. For Google Pub/Sub, that goes into `map[string]string` attributes ([PR #3019](https://github.com/gofr-dev/gofr/pull/3019)). For SQS, it goes into `MessageAttributeValue` with `DataType: "String"` ([PR #3018](https://github.com/gofr-dev/gofr/pull/3018)). For Kafka, it goes into message headers ([PR #2952](https://github.com/gofr-dev/gofr/pull/2952)).

On the subscribe side, GoFr receives the message first, extracts the trace context from the broker-specific attribute format, and creates a consumer span with a link to the producer:

```
// Your subscriber handler — still no tracing codefunc ProcessOrder(ctx *gofr.Context) error {    var order map[string]string    err := ctx.Bind(&order)    if err != nil {        return err    }
```

```
ctx.Logger.Infof("processing order %s", order["id"])    return nil}
```

The span link happens inside GoFr’s subscribe implementation. Here’s the key change in the Google Pub/Sub subscriber — the span is now created **after** the message arrives:

```
// Inside GoFr's Google Pub/Sub Subscribe method:case m := <-g.receiveChan[topic]:    // Create span with links to producer span from message attributes    spanCtx, span := startSubscribeSpan(ctx, topic, extractMessageAttrs(m.MetaData))    defer span.End()
```

This is a subtle but critical design choice. The old code created the span before receiving the message, so it couldn’t access the trace context in the message attributes. The new code flips the order: receive first, then create the span with the link.

![Before: disconnected traces at every broker. After: span links connect producer and consumer spans across Kafka, Google Pub/Sub, and AWS SQS]()

## Why This Matters More in the Age of AI Pipelines

The services most likely to hit this tracing gap are AI inference pipelines — and they’re everywhere now.

A typical AI-powered feature looks like this: an HTTP request arrives, your service publishes a job to SQS (“classify this document”), a worker picks it up, calls an embedding API, publishes the result to Google Pub/Sub, and a downstream service writes the enriched data to a database. Three brokers, four services, one user request. Without span links, debugging “why did this classification take 8 seconds?” means correlating timestamps across four separate traces by hand.

This is the architecture pattern that’s exploding in 2026 — RAG pipelines, real-time classification, embedding generation, agent workflows — and it’s almost always event-driven. The more your system relies on async message passing between AI components, the more you need traces that don’t break at every queue boundary.

![AI inference pipeline with 4 services across SQS and Google Pub/Sub — GoFr span links make the entire pipeline visible in one Jaeger trace]()

## AI-generated pub/sub code skips tracing

Here’s the other problem. If you ask an AI coding assistant to “build a Go service that publishes to SQS,” it will give you working publish/subscribe code — but it won’t add trace context injection. I’ve tried this with every major AI tool. The generated code creates spans, yes, but disconnected ones. The carrier adapter, the inject/extract calls, the subscribe-before-span reordering — none of that shows up.

This is the same pattern from the [getting started article](/2026-02-24-gofr-getting-started-microservice.md): AI produces better code when the framework handles more. With GoFr, the AI generates a publish handler like `ctx.GetPublisher().Publish(ctx, "orders", data)` and the trace propagation is already there. The AI doesn't need to know about `TextMapCarrier` or `extractTraceLinks` because the framework owns it.

If you’re building AI pipelines with multiple message hops, this matters. Every hop where trace context isn’t propagated is a hop where your AI assistant also can’t help you debug. Connected traces mean you can paste a trace ID into your observability tool and see the entire pipeline — from the initial HTTP request through every queue, every AI inference call, every database write.

## Key Takeaways

Distributed tracing breaks at message brokers because there’s no HTTP header to carry the trace context. OpenTelemetry span links fix this by letting consumer spans link back to producer spans without forcing a parent-child hierarchy. The pattern is the same for every broker: inject `traceparent` on publish, extract it on subscribe, create a span link.

The boilerplate — carrier adapters, inject/extract functions, tests — is mechanical and broker-specific. Let AI generate it. For [GoFr](https://gofr.dev) users, it’s handled automatically across Kafka, Google Pub/Sub, and SQS. Your handlers stay clean. Your traces connect.

```
go get gofr.dev
```

• [GoFr Publisher/Subscriber guide](https://gofr.dev/docs/advanced-guide/using-publisher-subscriber)

• [Monitoring and observability](https://gofr.dev/docs/advanced-guide/monitoring-service-health)

• [GoFr quickstart](https://gofr.dev/docs)

• [GoFr on GitHub](https://github.com/gofr-dev/gofr)