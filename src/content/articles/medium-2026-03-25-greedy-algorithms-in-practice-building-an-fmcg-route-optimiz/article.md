---
title: "Greedy Algorithms in Practice: Building an FMCG Route Optimization Solver"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/greedy-algorithms-in-practice-building-an-fmcg-route-optimization-solver-2bf2e1e327e3?source=rss----98111c9905da---4"
publishedAt: "2026-03-25"
tags:
  - "ai-general"
  - "data-science"
  - "product-management"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Product & Design"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-25T14:52:25.473Z"
---

# Greedy Algorithms in Practice: Building an FMCG Route Optimization Solver

#### **As a product analyst, how I turned a supply chain constraint into a step by step optimization engine.**

![AI Agent for FMCG Route Optimization](https://cdn-images-1.medium.com/max/640/1*R7OAkgnFy7XWrWWlMJZfmA.png)

### Introduction: The Real Problem

When on-time delivery in a major FMCG (Fast-Moving Consumer Goods) territory sat at 72%, the immediate instinct of management was to blame the trucks, the drivers, or the dispatch process. But the real culprit was invisible to the naked eye: **no one knew what was sitting in a retailer’s stockroom until it was already empty.**

By the time a retailer realized they were out of stock and called to reorder, days of potential sales were already lost. By the time the distributor dispatched a truck to fulfill that order — guided by a static paper list and a hand-drawn map — more days were gone. Orders weren’t intelligently batched. Trucks routinely went out at 55–60% capacity. Routes were improvised by drivers on the fly, not systematically planned.

This article documents how I designed and deployed a deterministic, five-step **rule-based AI agent** to solve that exact problem. It explores what I learned about building practical applications of Artificial Intelligence that everyday field operators will actually trust, adopt, and use in the real world.

![The FMCG Route Optimization Solver Agent — initial state with 48 retail outlets loaded, The solver loads 48 retail outlets across 4 geographic zones. Each outlet is tagged with its weeks-of-cover calculation and urgency status before a single route is planned.](https://cdn-images-1.medium.com/max/1024/1*d1PSG8ES1Qj_T4t3VREfzA.png)

### Why a Rule-Based AI Agent?

The immediate temptation with complex supply chain and logistics problems is to reach for modern Machine Learning (ML) or Deep Learning models. But this context had real-world constraints:

-   The distributor was an **independent business**, not obligated to adopt opaque, complex tech tools.
-   The delivery supervisor needed to be able to **explain every routing decision** to skeptical drivers and retailers.
-   There was strictly **no historical optimal route data** to train an ML model on.
-   The tool had to run on a standard laptop with no internet connection, no server infrastructure, and minimal setup.

In this environment, a classic Artificial Intelligence approach — a heuristic, rule-based autonomous agent — was the optimal choice. Rule-based expert systems are foundational AI architectures. Every decision in the agent’s problem-solving process is entirely deterministic and auditable line by line. That transparency was a critical feature, not a limitation.

### The Sensory Input: Weeks-of-Cover Data

Before an AI agent can optimize a route, it needs sensory input to understand the state of the world — specifically, *who actually needs a delivery today*. The lead indicator we engineered for the agent is a simple “weeks-of-cover” mathematical calculation per retail outlet:

```
weeks_of_cover = current_inventory_stock / average_weekly_offtake
```

The agent classifies each outlet into one of three tiers based on this ratio

![Three Tier Logic](https://cdn-images-1.medium.com/max/1024/1*umtWT0QtKOeopw03OsiIlQ.png)

The data source for these signals: field representative stock counts collected during bi-weekly outlet visits. It was low-tech, manually entered data, but it provided a reliable state space for the agent to observe.

### The AI Agent’s 5-Step Logic Pipeline

Once the data is ingested, the AI agent executes a five-step internal heuristic pipeline to generate its output.

### Step 1 — Demand Signal Processing

Compute the weeks\_of\_cover metric per outlet. The agent's first output state is a rigidly prioritized outlet list, sorted aggressively from URGENT down to OK.

### Step 2 — Geographic Clustering

Next, the agent groups the filtered outlets by geographic zone (e.g., North, East, South, Central). It enforces a strict constraint: one truck per zone. This completely eliminates chaotic cross-territory routing at the macro cluster level, ensuring trucks don’t arbitrarily snake across the entire operational map.

### Step 3 — Greedy Load Building Heuristic

Within each geographic zone, the agent sorts outlets using a greedy heuristic approach:

1.  **Urgency tier** (URGENT must go first).
2.  **Order quantity** within the same tier (larger orders load first to maximize volumetric fill early in the process).

The agent iteratively adds outlets to the truck’s manifest until the simulated load reaches exactly **85% of physical capacity**. Overflow outlets spill over to the least-loaded truck in an adjacent zone. The fleet parameter is hard-capped at 4 trucks; the agent cannot autonomously spawn new vehicles mid-run.

The 85% algorithmic target is deeply intentional: it leaves buffer capacity for real-world ad-hoc pickups without degrading the mathematical efficiency of the route.

### Step 4 — Nearest-Neighbour Routing

Within each truck’s confirmed stop list, the agent sequences the physical travel path using the **nearest** **neighbor heuristic**:

1.  Start at the central warehouse origin point.
2.  Calculate and travel to the closest unvisited outlet node.
3.  From there, calculate the next closest unvisited outlet.
4.  Repeat this loop until all nodes are visited, then map the return to the origin.

While this does not yield a perfect global Traveling Salesman Problem (TSP) solution, local testing proved it meaningfully reduced average route time without requiring a massive compute overhead or a commercial solver license.

### Step 5 — Action Output Generation

The agent ultimately emits a structured, human-readable daily dispatch plan:

```
Truck 1 · North   · 12 stops · 296 cases · ~11.4h routeTruck 2 · East    · 12 stops · 262 cases · ~13.3h routeTruck 3 · South   · 12 stops · 248 cases · ~12.3h routeTruck 4 · Central · 12 stops · 265 cases · ~11.5h route
```

Each line is instantly readable by a human supervisor, explainable to the operations team, and perfectly auditable after execution.

### Why Heuristic AI Works Here

In many combinatorial domains, greedy algorithms fail because they make locally optimal choices without reconsidering past decisions. Here, that “weakness” is the agent’s greatest strength:

-   **Urgency is paramount.** A greedy urgency-first sort mathematically guarantees URGENT outlets are loaded before the agent considers efficiency.
-   **Tractable problem space.** With roughly 48 active outlets across 4 zones, the nearest-neighbour logic produces highly optimal routes without the massive computational overhead of deep reinforcement learning or branch-and-bound methods.
-   **Human override.** A step-by-step heuristic pipeline is extremely easy for human operators to interrupt and manually adjust. A complex neural network that spits out a single opaque answer is not.

### Results and Impact

We benchmarked the AI agent against the legacy manual baseline (which relied on random-fill loads, no urgency sorting, and no mathematical zone grouping):

![validation that better sequencing logic, not more trucks or faster drivers, was the missing variable.](https://cdn-images-1.medium.com/max/1024/1*wveNsMpvq2Jg-SuZbGSbxg.png)

### Try it Yourself

Want to see the AI agent in action? You don’t need to take my word for it. I’ve prepared a simplified version of the rule-based solver alongside an anonymized sample dataset containing synthetic demand signals and geographical coordinates.
Github Repo Link:

```
https://github.com/tav97/fmcg-route-ai-agent
```

Demo Link:

```
https://tav97.github.io/fmcg-route-ai-agent/
```

You can download the sample delivery\_demand.csv, run the minimal python script locally, and watch the agent dynamically build and sequence the routes based on the provided parameters. It's a great way to explore how these deterministic rules behave in real-time before applying them to your own domain!

### Key Takeaways for AI Applications

1.  **Measure before you optimize.** The weeks-of-cover metric had to exist before the agent could run. Without accurate sensory input, even the smartest algorithm is optimizing the wrong thing.
2.  **Explainability is a core product requirement, not a nice-to-have.** A logistics supervisor who cannot explain how a route plan was generated simply won’t use it.
3.  **Classic AI ≠ Naïve.** Applied to the right constrained problem with the optimal heuristic loops, rule-based expert systems produce incredibly robust, production-ready results faster than deep learning.
4.  **Constraints foster elegant design.** No servers, no ML libraries, no internet access — these strict operational constraints forced a highly streamlined, deterministic AI architecture that turned out to be exactly the correct solution for the business.

*The author is a supply chain strategy professional with experience in FMCG distribution optimization, demand planning, and last-mile logistics.*

*This article was written by a human author with light assistance from AI tools for editing and phrasing.*

* * *

[Greedy Algorithms in Practice: Building an FMCG Route Optimization Solver](https://pub.towardsai.net/greedy-algorithms-in-practice-building-an-fmcg-route-optimization-solver-2bf2e1e327e3) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.