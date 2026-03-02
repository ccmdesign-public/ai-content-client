---
title: "A Practical Perspective on Context Graph"
author: "Learning Data"
platform: "medium"
publicationName: "Learning Data"
url: "https://medium.com/learning-data/a-practical-perspective-on-context-graph-4306f9937858?source=rss----eec44e936bf1---4"
publishedAt: "2026-01-15"
tags:
  - "data-science"
  - "education"
categories:
  - "Data & Analytics"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.587Z"
---

# A Practical Perspective on Context Graph

# A Practical Perspective on Context Graph

[Likun Lin](/@ll3713?source=post_page---byline--4306f9937858---------------------------------------)

2 min read·Jan 4, 2026

\--

1

![]()

> Vertical agent systems depend on domain knowledge. One of the most critical — but often overlooked — sources of that knowledge is the **logical connection between records**, not the records themselves.

A recent article from Foundation Capital [<AI’s trillion-dollar opportunity: Context graphs>](https://foundationcapital.com/context-graphs-ais-trillion-dollar-opportunity/) highlights the importance of a new class of data structures in the agentic era, referred to as Context Graphs. Rather than reiterating a formal definition, this post offers a practical perspective grounded in real-world AI system development.

### Data Is Not Knowledge, But It Encodes Knowledge

Consider a common enterprise example: Salesforce client interaction data.

Each data typically contains a conversation note, metadata, and a timestamp. It is a perfect document for an agent that builds upon language models to perform semantic understanding and generate insight to help decision-making.

However, when we compare what an AI agent can infer from these records to what a human expert actually knows, a gap becomes evident.

Human experts do not reason over isolated, cross-sectional snapshots of information. Instead, **they build understanding incrementally over time**, integrating domain rules, prior decisions, exceptions, and outcomes. Their expertise is shaped by the decision traces — **how interactions evolve, how constraints change, and how responses adapt to context.**

### Business Processes Are Logical Systems, Not Data Pipelines

If we zoom out from a single client interaction to the enterprise level, the same principle applies.

A business process is not merely a chain of records flowing from Department A to Department D. It is a logical system of decisions connected by “Why and How” which brings **the exception logic, precedent from past decisions, cross-system synthesis and approval chains**, and stores in the Context Graph. (A similar idea was discussed in our paper released earlier 2025 [“FinRobot: Generative Business Process AI Agents for Enterprise Resource Planning in Finance”](https://arxiv.org/pdf/2506.01423))

*The contents of external submissions are not necessarily reflective of the opinions or work of* [*Maven Analytics*](http://mavenanalytics.io) *or any of its team members.*

*We believe in fostering lifelong learning and our intent is to provide a platform for the data community to share their work and seek feedback from the Maven Analytics data fam.*

[*Submit your own writing here*](/learning-data/how-to-get-your-work-published-by-learning-data-with-maven-analytics-7df21e466a3e?sk=020dfac485597d602e218968d9ffb395) *if you’d like to become a contributor.*

*Happy learning!*

*\-Team Maven*