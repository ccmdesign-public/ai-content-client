---
title: "Part 8: Common System Design Questions: Observability, Monitoring & Operations"
author: "Frontend Canteen"
platform: "medium"
publicationName: "Frontend Canteen"
url: "https://medium.com/frontend-canteen/part-8-common-system-design-questions-observability-monitoring-operations-303329d90c4c?source=rss----8c0f5ca1523c---4"
publishedAt: "2026-03-17"
tags:
  - "engineering"
  - "monitoring"
  - "performance"
  - "web-development"
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-21T16:30:37.348Z"
---

# Part 8: Common System Design Questions: Observability, Monitoring & Operations

![Photo by Matthias Heil on Unsplash](https://cdn-images-1.medium.com/max/1024/0*q-BCfuKfaxfR12HX)

This is part 8 of the [I Answered the common System Design Questions So You Don’t Have To](https://medium.com/frontend-canteen/i-answered-the-common-system-design-questions-so-you-dont-have-to-93649fb51233) We will go over some common questions on Observability, Monitoring & Operations.

#### 1\. What should I log at each layer — and what should I never log?

The key log layers of concerns are

-   ***Presentation (Controller)***: Log request details like request id, end point, status code, user agents, user id, validation errors, versions, method, response duration etc
-   ***Business Logic (Service)***: Important user actions, decision points, state changes and business rule violations
-   ***Data Access (Persistence)***: Slow queries, connection errors, audit details and change in data
-   ***Infrastructure*** : End to end request details, external calls, connection failure, retries and timeouts
-   ***Others***: All unhandled exceptions and other key events like startup, shutdown, gc, thread dumps etc

**What to Never Log**

Do not log sensitive information that could result in security breaches or could harm the users. Some of the sensitive data are

-   Credentials, passwords, API keys, tokens, session ids, private keys
-   PII data like name, email address, phone number, home address, social security number or health information
-   Financial data like credit card numbers or bank account details
-   sensitive internal and unsafe data which can be misused

#### 2\. How do I design tracing across 50+ micro services?

***Standardization***

-   Do not give chance for inconsistent data and avoid vendor lock-in
-   Generate traces and spans by implementing OpenTelemetry SDK’s in every services
-   Send telemetry data to a collector using OpenTelemetry protocol exporter
-   Have proper naming conventions for services, operations and configurations (http.action, service.config.limit)

***Automation and Instrumentation***

-   Automatically wraps http requests, data base drivers using OpenTelemetry auto-instrumentation agents (for *java, python, go, node.js*)
-   To handle complex service-service communication and tracing use service mesh which can automatically provide tracing without much change in the application code (*Istio, Linkerd*)

***Propagation***

-   The context should be linked across network boundaries and the tracing context needs to be passed across
-   Propagate traceID’s using W3C headers like *traceparent, tracestate* etc
-   Make sure that the context is injected manually into message payloads for asynchronous communication (*Kafka,RabbitMQ*)to prevent any observability gaps.

***Scalable collections***

-   Deploy OpenTelemetry collectors or aggregators in a sidecars to process, batch traces before sending to the backend

***Storage and Visualization***

-   Use backend for storage and querying, such as *Jaeger*, *Grafana Tempo* or other commercial options like *Datadog*, *Honeycomb* or *Azure Application Insights*

***Smart Sampling***

-   Configure the OpenTelemetry collector for tail based sampling. Instead of sample from the start use the tail based sampling to keep the 100% of errors and retain only small percentage of successful requests.

***Correlation***

-   Automatically inject trace ID and Span ID into every structured log in the logging framework
-   Use a backed that supports both viewing the logs and tracing together

***Deployment***

-   Capture user requests from the edge services and start the instrumentation from API gateway
-   Create a service dependency map and dashboards to identify bottlenecks and early failures

**Things to avoid**

-   Ensure NTP synchronization across all hosts otherwise span timestamps will be out of sync resulting in clock skew
-   Ensure service names are consistent instead of appearing as *unknown* or *null*
-   Avoid over instrumentation with too many spans, causing more latency

#### 3\. How do I design metrics that actually tell me system health?

-   ***Focus on User SLO’s***: Measure what matters the most for the users like “percentage of successful requests” than “CPU Usage”
-   ***RED method***: Rate, Error, Duration
-   ***USE method***: Utilization, Saturation, Errors to track key performance indicators like uptime, latency, request volume and error rates, enabling proactive alerting and bottleneck identification.
-   ***READS approach***: Track the key minimal indicators like Request Rate, Errors, Availability, Duration/Latency and Saturation.
-   ***Monitor Saturation***: Measure memory consumption, queue length

**Steps**

-   Focus on traffic, Errors, Latency and Saturation
-   Use counters for request rates and histogram for latency to get accurate data
-   Create thresholds for alerts that link to runbooks for troubleshooting. reducing and mitigating noise
-   Build dashboards and real time visibility and hold regular reviews to adjust alerts

#### 4\. How do I design alerting that catches real issues but avoids noise?

-   ***Alert of Symptoms***: Focus on user experience like latency, error rates, or service unavailability rather than infrastructure metrics like 80% CPU
-   ***Actionable and Owned***: Every alert maps to an action and every action should be owned. Otherwise it's considered as noise.
-   ***Alert Grouping and Correlation***: Prevent alert storms but consolidate multiple relate alert together into a single incident based on shared metadata like host, environment, datacenter etc.
-   ***Tune Continuously***: Alert should be adjusted or deleted if it's constantly ignored or automatically closed. Regularly review the alert effectiveness.
-   ***Severity Hierarchy***: Classify the issues or alerts into actionable and informational to prevent deviation in action for engineering teams

#### 5\. How do I debug high tail latency in a distributed system?

**Measure and Monitor**

-   ***Focus on percentiles***: Track latency histograms for high percentiles p50, p95, p99, p99.9 for every service endpoints. Do not rely on average latency as it's a misleading info for tail latency.
-   ***Establish Baselines and SLO’s***: compare normal working latency with peak latency to establish a meaningful Service Level Objective and alert thresholds (99th percentile should be less than *400ms* for this service endpoints)
-   ***Distributed Tracing***: Track using tracing tools like Datadog or Prometheus to trace the request journey across multiple services

**Identify the bottleneck**

-   ***Analyze Slow Traces***: Isolate slow requests and examine the sequence of the calls. Compare client side span and server side span and confirm if the delay is related to network or application processing
-   ***Check for Resource contention***: If a specific pod is continuously failing or in degraded state then its a resource issue.
-   ***CPU Throttling***: Use tools like kc top pod or kc top node to check CPU limits degradation
-   ***Garbage Collection***: If the application freezes the process then GC pauses could be the reason. Monitor GC pause times as a metric.
-   ***I/O wait Latency***: Delay in disc access can cause tail latency
-   ***Identify Network Issues***: Use network tools to identify network related issues. ping or traceroute can be used to identify latency in network paths. Wireshark or tcpdump is used to get detailed packet level analysis to measure TCP handshake times and spot packet loss or congestion
-   ***Queues and Connection pools***: Request may slow down because of connection pool starvation, head of line blocking. Monitor queue length and connection pool utilization

**Implement tail tolerant strategies**

-   ***Hedged Requests***: Send a secondary request to a different replicas if the first request is slow and use whichever returns first
-   ***Optimize Network***: Reuse connections and efficient binary serialization formats to reduce overhead (HTTP/2 or gRPC)
-   ***Manage Resource contentions***: Dedicated queue or instances for latency sensitive user requests
-   ***Timeouts and Circuit Breakers***: Set realistic timeouts and use circuit breakers to fail fast and prevent cascading failures when the service is slow

#### 6\. How do I design dashboards that help during incidents?

-   ***Prioritize Important Metrics***: Focus on immediate action like active error counts, system latency or health indicators
-   ***Establish Visual Hierarchy***: Important information should be on the top left for quick visual tracking with large, bold numbers for key metrics usually a single value metrics.
-   ***Use Consistent Color Coding***: Accessible colors for representing severity and ensure color blind friendliness (red for critical, yellow for warning, green for normal)
-   ***Provide Historical Context***: Compare current real time data with historical trends to capture any spike or unusual behavior.
-   ***Keep it Simple***: Use single screen and avoid clutters or scrolling. Critical overview should be visible at a glance.
-   ***Enable Drills and Interaction***: Include drill down functionality that allows users to get to the detailed related view or logs without leaving the main view
-   ***Tailor to audience***: Create different views for different users where technical teams look for system metrics and the leaders look for business impact and incident status.

**Key components**

-   ***Real time status indicators***: High level system health like CPU, Memory, Network, IO operation etc.
-   ***Active Alert Feeds***: Categorized list of current alerts
-   ***Trend Graphs***: Line charts showing delay or errors over a period of time or last hour, day
-   ***Status***: Number of new, active and resolved incidents to track time to resolve issues/incidents

#### 7\. How do I design runbooks so on-call engineers can act fast?

**Key Steps**

-   ***Title and Trigger***: Have a clear heading to instantly identify issues and drive towards the fixes
-   ***Verification Steps***: Define the failure vs success scenarios to avoid early close of an issue without proper evidence
-   ***Step by Step Instructions***: Avoid vague language and unambiguous commands like “check if everything looks fine”
-   ***Escalations***: Mention whom and when to contact in case of issues. Also provide the current on call contact info

**Best Practices**

-   ***Keep it centralized***: Make the information readily available for access for everyone (e.g confluence, wiki, notion, slack). You may look for retention period and look for alternatives if the period is less than a year or so.
-   ***Use consistent templates***: Ensure all the runbook has a same structure like *Title, Trigger, Steps, Escalation*
-   ***Include context***: Link all the dashboards, logs, wiki’s, graphs etc
-   ***Automated progressively***: Start by listing manual steps, then automate the data gathering and eventually automate the remediation.
-   ***Iterate constantly***: Look for improvements whenever possible and consider the runbook as a living document with regular updates. Immediately update after incident for improvements.

**What to avoid**

-   ***Outdated information***: Keep the runbook updated and remove information which are not applicable anymore.
-   ***Long form narrative***: Use bullet points, checklists and code blocks instead of long boring paragraphs

#### How do I simulate failures before they hit production?

Simulating failures before production (pre-mortem) involved several methods which are listed below

-   ***Chaos Engineering***: Introduce controlled disruption to test resiliency, such as latency, throughput, container failure, blocking the network, and simulating failures.
-   ***Digital Twin Modeling***: Create a virtual replica of physical or software to run scenarios without affecting the real world operations.
-   ***Network Simulation***: Simulate latency, throughput, packet loss or high number of error rates using tools to test the application robustness.
-   ***API Mocking***: Third party service failures along with slow responses or service unavailability can be simulated to confirm how the application handles the situation.

Part 9: Evolution, Cost & Real-World Trade-offs

* * *

[Part 8: Common System Design Questions: Observability, Monitoring & Operations](https://medium.com/frontend-canteen/part-8-common-system-design-questions-observability-monitoring-operations-303329d90c4c) was originally published in [Programming Domain](https://medium.com/frontend-canteen) on Medium, where people are continuing the conversation by highlighting and responding to this story.