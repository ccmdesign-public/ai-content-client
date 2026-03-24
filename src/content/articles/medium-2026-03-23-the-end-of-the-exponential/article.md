---
title: "The End of the Exponential?"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/the-end-of-the-exponential-2288f7d3ebb6?source=rss----98111c9905da---4"
publishedAt: "2026-03-23"
tags:
  - "ai-general"
  - "leadership"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Business & Career"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-24T04:16:03.129Z"
---

# The End of the Exponential?

#### Why AI progress is becoming a problem of deployment, not just capability

![Photo by Taylor Vick on Unsplash](https://cdn-images-1.medium.com/max/1024/1*QWEhzhnhQc9lfbUggvqAfQ.jpeg)

It is the question circulating through data centers and boardrooms from Palo Alto to Shenzhen, and one that industry leaders such as Anthropic CEO Dario Amodei keep being asked in public: are we reaching the end of exponential growth in AI progress?

The phrase is easy to misread. The point is not to make a narrow mathematical claim about scaling curves, but to name the broader period in which progress seemed to compound rapidly as more compute, more data, and more capital were brought to bear. The question now is not whether progress stops. It is whether that earlier phase is giving way to a messier one, in which capability can still improve quickly but deployment is increasingly constrained by power, cost, latency, supervision, and accountability.

For several years, scaling laws trained us to expect a near-automatic trade: more data and more compute produced more capability. Bigger models were usually better models, until a few efficiency surprises reminded everyone that bigger is not the only route to better. As we move through 2026, the question is whether the old recipe is losing reliability at the margin, and what replaces it. Not whether progress continues, but what kind of progress continues, what form it takes, and what begins to bottleneck it.

#### Three constraints that do not yield to capital alone

If the easy exponential is slowing, it is not because the industry has lost interest, ambition, or money. It is because several constraints are proving harder to negotiate than the rhetoric of scale often suggests.

The first is the data constraint. The issue is not whether there is text online to draw from, but whether high-quality, rights-clear, low-duplication data can keep expanding at the same rate, especially once synthetic material increasingly enters the loop. The relevant factors are less raw volume than signal quality, provenance, and whether additional data still delivers predictable gains. Synthetic data may help in some settings, especially when systems are being tuned to reason better or explore structured problem spaces, but it is not a free substitute for rich human-generated material. Once training leans too heavily on synthetic output, the risk is not collapse so much as slow distortion: less nuance, more brittleness, and more confident wrongness.

Energy is the second constraint. Scaling is increasingly a civil engineering problem. Training and serving frontier systems draws real power at real scale, and the bottlenecks are often grid access, cooling, transformers, permits, and time-to-build. You can buy hardware faster than you can secure enough power, connect it, and bring new capacity online. Infrastructure cycles run in years, not quarters. At that point, progress is no longer bounded only by model design or capital allocation, but by the slower tempo of physical systems.

Economics is the third constraint. Even when physics permits scaling, economics may not. Frontier training runs have moved from expensive to capital-project expensive, and serving costs compound the problem when more capable systems require more compute per query. At some point, marginal gains matter more on benchmarks than in production. Better stops mattering when it is not also affordable, reliable, low-latency enough for the task, and supportable in the context where it will actually be used.

None of this implies stagnation. It implies that progress becomes less automatic and less self-propelling. The easier gains begin to fade, and the work that remains shifts toward efficiency, reliability, orchestration, and integration.

#### The optimistic counterargument: an engine swap

Industry leaders are not conceding defeat. Their view is that there is no wall, only an engine swap.

The logic is simple. The pretraining exponential, the earlier recipe of feeding models more data and more compute, may be producing weaker returns at the margin. But a different curve may open through inference-time compute, reasoning models, and better system design.

Inference, of course, is not new. What is changing is its weight in the system. As models move into everyday products and agentic workflows, more of the cost, engineering effort, and commercial value shifts from training frontier systems to serving them reliably, quickly, and at scale.

Instead of relying only on what was compressed during training, the system can spend more compute at the moment it answers. It can check intermediate steps, backtrack, use tools, retrieve documents, run calculations, test code, compare sources, and revise. The aim is not only to predict the most likely continuation, but to search for a better solution.

This is also where the discussion shifts from systems that respond to systems that carry out work. You do not only ask for an answer. You assign a goal, and the system plans steps, uses tools, manages sub-tasks, and attempts to complete the objective. On this view, capability should be judged less by parameter counts and benchmark snapshots, and more by what can be accomplished reliably in production, in the wild, with tolerable error and clear handoffs.

#### What would make the “new engine” real

The sticking point is clear. The constraints above are already measurable and already biting, while the promised pivot remains uneven.

For the engine-swap story to hold, inference-time compute has to deliver compounding gains rather than simply more expensive answers. Reasoning has to improve outcomes enough to justify the additional cost, latency, and operational complexity. Task-completing systems have to become dependable enough for consequential work, not merely able to complete impressive stretches of it under ideal conditions. Oversight, monitoring, and governance have to scale, or usefulness is capped by the cost of supervision. And the new approach has to clear its own economics, because a system that reasons beautifully but costs more than the value it creates has simply traded one wall for another.

This is why the debate is badly framed when reduced to a binary choice between wall and no wall. A more realistic expectation is that progress becomes lumpy. Breakthroughs still happen, but the binding constraints increasingly sit outside the model: in energy, data rights, latency, integration, security, liability, and the human systems needed to absorb the technology without losing control of consequences.

In practice, even when the tools improve quickly, adoption is slow, uneven, and often work-creating. Integration takes time. Oversight, exception handling, and recovery from failure scale with deployment. So do legal exposure and liability, especially when systems move from low-stakes assistance to consequential decisions and actions. The model may improve in a quarter; the organization may need years to redesign workflows, responsibilities, controls, and incentives around it.

#### What this means for managers

Whether we are approaching a wall or switching engines, one thing is clear. The era of simply adding more compute and waiting for the magic to happen is fading. The harder problems become reliability, containment, evaluation, coordination, and cost.

If we are near decisive thresholds, the key issue is not whether the curve continues. It is whether we cross those thresholds with systems that are governable, auditable, and economically deployable, not merely impressive in controlled settings.

That calls for a different scorecard. Instead of treating tokens, parameters, and benchmark wins as the main story, the relevant question becomes whether systems can do useful work repeatedly, at a price people will pay, while producing evidence that supports accountability. In other words, can the system perform in a way that another human, manager, regulator, or client can actually trust?

If the end of the exponential is coming, it may not arrive as a neat technical ceiling. It may arrive as a market repricing, in which the cost of performing an expanding set of screen-based tasks falls faster than institutions can adapt their norms, controls, and professional expectations.

The metric that matters in that world is not how fluently a model chats. It is whether a system can sustain a task, keep context, execute multi-step objectives, recover from interruptions, and hand work off cleanly with tolerable error. When that improves, even in uneven jumps, automation stops being task-level assistance and starts looking more like job-shaped bundles.

That is why the burden of proof has shifted. The central question is no longer simply what a model can produce, but whether its outputs can be deployed in workflows that are reliable, governable, and economically viable.

The wall may not be a wall at all. It may be a shift in what constrains value. Progress in capability may continue, sometimes quickly. But progress in deployment is harder won, because it depends on verification, supervision, integration, cost control, and clear responsibility when things go wrong.

If the exponential is ending anywhere, it is ending in the fantasy that better models automatically translate into usable systems. What becomes scarce is not intelligence in the abstract, but the organizational capacity to deploy it well.

![Photo by Cai Fang on Unsplash](https://cdn-images-1.medium.com/max/1024/1*0N6eFNyXtuR3SzhEsDRw3A.jpeg)

*Dr. Nicos Rossides is a CEO, educator, and author focused on business, education, and AI. He is Co-Founder and Chairman of the Advisory Board of listening247, a global insights firm, and a professor at Minjiang University’s International Digital Economy College. His books include* The Future of Work: Managing in the Age of AI*,* Eureka to Market*, and* Employee Engagement in Startups*, with* AI-Powered Insight: Marketing Research Reconfigured *(co-authored with Michalis Michael, forthcoming).*

* * *

[The End of the Exponential?](https://pub.towardsai.net/the-end-of-the-exponential-2288f7d3ebb6) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.