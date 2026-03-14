---
title: "Why your data quality problem isn’t a data problem"
author: "Learning Data"
platform: "medium"
publicationName: "Learning Data"
url: "https://medium.com/learning-data/why-your-data-quality-problem-isnt-a-data-problem-e26d4d1a9faa?source=rss----eec44e936bf1---4"
publishedAt: "2026-03-13"
tags:
  - "analytics"
  - "business"
  - "data-pipeline"
  - "data-science"
  - "education"
  - "product-management"
categories:
  - "Business & Career"
  - "Data & Analytics"
  - "Product & Design"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-14T14:32:30.419Z"
---

# Why your data quality problem isn’t a data problem

# Why your data quality problem isn’t a data problem

[Pablo Gomez](/@pablogomez17?source=post_page---byline--e26d4d1a9faa---------------------------------------)

6 min read·13 hours ago

\--

*The real reason sophisticated models fail in the enterprise, and what to do about it.*

A few years ago, a large multi-national financial institution set out to replace their legacy credit risk models with something more sophisticated.

The existing models leaned heavily on logistic regression and traditional supervised learning. Reliable and interpretable, but limited.

The goal was an ensemble approach combining random forests and gradient boosting machines, capturing non-linear relationships that legacy models simply could not see. Executive sponsorship, a dedicated team, a credible roadmap. On paper, exactly the kind of modernization story C-Suite executives love to tell. In practice, it was about to run into a wall.

## Where it started to go wrong

The first sign of trouble came before a single model had been trained.

The team had assumed that years of transactional data flowing through the institution’s loan origination and account management systems would yield a rich training set. What they found was a mess.

Source systems had been built at different times, by different teams, with different priorities. Variables carrying the same name meant different things depending on which upstream process had last touched them. Some fields were consistently populated. Others were sporadic, entered manually when someone remembered, or auto-filled with defaults that had long since lost their meaning.

The team started filtering. Records that failed quality thresholds got dropped. Then more got dropped. The dataset shrank, and kept shrinking.

What had begun as a promising volume became a narrow, heavily curated slice, and not a representative one. The customers whose data survived were not a random sample. They were the ones whose data happened to be clean: processed through more rigorous systems, handled by teams with better data discipline, or simply around long enough that gaps had been filled over time. The model was already learning something subtly wrong before anyone had written a line of training code.

Then came the second problem, and it was worse. As the team mapped their feature set, a pattern emerged that nobody had quite noticed forming.

The data they were actually using skewed heavily toward marketing systems. Not a reckless decision. The team sat organizationally closer to marketing than to risk. Those systems were familiar, better documented, easier to pull from. The credit risk systems carried heavier compliance obligations, tighter access controls, more sign-offs. Under deadline pressure, the path of least resistance had a quiet gravitational pull.

The problem was that marketing data and risk data are not the same thing governed differently. They are different things. Marketing data is built to understand customer behavior. Risk data is built to capture obligations, defaults, and financial exposure under regulatory scrutiny. Using one as a proxy for the other does not only introduce a errors, but it changes what the model is actually learning.

And then there was the timeline. The usable training data covered roughly four years. That sounds workable until you look at which four years. No 2008 financial crisis. No EU sovereign debt crisis. No systemic financial-stress events.

The model was trained on a window of relative stability, on a pre-filtered population, using data built for a different purpose. It had never actually learned credit risk. It had learned what creditworthy-looking customers behave like during calm periods, which at best, gives you incomplete information when you need a model that performs under stress.

When the model underperformed, the data science team took the blame. The methodology got reviewed. The architecture was scrutinized. Nobody asked why four years of reliable, representative, purpose-built training data had not existed in the first place. Nobody asked who owned that problem, or whether it had ever been anyone’s job to solve it.

**That is the question this article is about.**

## The real diagnosis: a definitional problem, not a technical one

The failure was not in the model architecture. It was in the definitions, or more precisely, the absence of them. In financial services, as in healthcare, retail, and logistics, data does not live in one place.

Marketing sees a customer one way. Credit risk sees the same customer differently. Finance sees them differently still. Each perspective is internally consistent. None are technically wrong. But when you build a model that straddles all of them, the inconsistencies surface fast.

This is what data quality failure actually looks like.

It rarely starts with a catastrophic event at the source. It accumulates through dozens of small decisions made by people working in good faith with the tools and access they have. No single decision is obviously wrong.

The problem is systemic, and it becomes visible only in aggregate, usually when a model fails or an audit raises flags, by which point it has been baked in for months. There was no shared data dictionary at this institution. No guidance on which systems were authoritative for which use cases. No process requiring developers to validate data sources before training began.

In that vacuum, the team made locally rational choices that added up to a globally irrational outcome.

## Why the standard fixes fall short

The instinct when data quality becomes a crisis is to reach for infrastructure. Data lakes get procured and deployed. Visualization platforms get licensed. The tools multiply.

The issue is not with the technology. The issue is that technology deployed without organizational alignment becomes expensive sprawl that people do not trust. The silos that already existed get a new layer of infrastructure stacked on top. The dashboard gets built, everyone smiles in the demo, and then nobody opens it on Monday because the numbers feel uncertain.

Treating a governance failure as a tooling problem is like responding to a staffing crisis by buying better office furniture. The organization feels like it is doing something. The underlying problem remains untouched.

Real progress requires executive accountability: not nominal sponsorship where a senior leader signs off on a strategy document and moves on, but genuine ownership of data quality as a business outcome with consequences attached. Data governance without real authority produces documents nobody reads and standards nobody follows.

## What actually helps, and what it costs

The most important intervention is the most unglamorous: establish definitions before you build systems.

What is a customer? What is revenue? What constitutes a credit default? What counts as an inbound lead? These sound simple until you discover that risk, marketing, and finance (among others) each have a different answer, all embedded in production systems running for years.

Reconciling those definitions is organizational as much as technical. It requires people from different functions to agree on things they have previously been able to avoid. It takes longer than anyone budgets for. It is also the only foundation on which reliable models can be built.

On centralized versus federated data ownership, there is no universal answer, and it truly depends on the organization and the use cases. Centralizing creates consistency but breeds resentment and bottlenecks. Full federation fragments standards over time.

The most sustainable path is a federated model with centralized principles: each domain owns its data, but everyone agrees on the non-negotiables. Getting there requires negotiation rather than mandates. Domains that feel imposed upon will circumvent standards they did not help create.

Accountability for data quality needs to sit closer to where data originates, not default to IT, where it is often delegated. The people who create data in operations, finance, risk, marketing, sales, and customer service need to own its quality.

And data scientists need a seat at governance conversations as genuine stakeholders, not implementers. They feel the consequences of poor governance most directly, in shrinking training sets, in features that do not mean what the documentation says, in models that degrade silently in production.

**If you are a data scientist reading this, stop silently absorbing bad data as an immovable constraint. Document what you are dropping and why. Quantify the impact. Make the problem visible to the people with the authority to fix it. Data quality will not become a priority until the people who suffer most from it start raising it in the right rooms**.

The model is only as good as what you feed it. And what you feed it is ultimately an organizational decision, made long before any data scientist sits down to train.

*The contents of external submissions are not necessarily reflective of the opinions or work of* [*Maven Analytics*](http://mavenanalytics.io) *or any of its team members.*

*We believe in fostering lifelong learning and our intent is to provide a platform for the data community to share their work and seek feedback from the Maven Analytics data fam.*

[*Submit your own writing here*](/learning-data/how-to-get-your-work-published-by-learning-data-with-maven-analytics-7df21e466a3e?sk=020dfac485597d602e218968d9ffb395) *if you’d like to become a contributor.*

*Happy learning!*

*\-Team Maven*