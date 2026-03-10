---
title: "I Finally Wrote Real Evals. Here’s the Workflow That Stuck."
author: "Generative AI"
platform: "medium"
publicationName: "Generative AI"
url: "https://generativeai.pub/i-finally-wrote-real-evals-heres-the-workflow-that-stuck-4d30467b2e7d?source=rss----440100e76000---4"
publishedAt: "2026-03-10"
tags:
  - "ai-general"
  - "engineering"
  - "llm"
  - "machine-learning"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-10T16:48:18.670Z"
---

# I Finally Wrote Real Evals. Here’s the Workflow That Stuck.

# I Finally Wrote Real Evals. Here’s the Workflow That Stuck.

[Vineeth](https://medium.com/@sksvineeth?source=post_page---byline--4d30467b2e7d---------------------------------------)

9 min read·2 hours ago

\--

*How I built a practical evaluation workflow to improve LLM and agent reliability in production.*

As a Principal ML Engineer at a global energy management company, I built an AI system that processed over 10 million financial transactions a day: flagging anomalies, surfacing compliance risks, and feeding audit workflows. When that system gave a wrong answer, it didn’t just look bad. It had potential regulatory consequences. Missed flags became audit findings. False positives consumed analyst hours we didn’t have.

Writing evals for that system taught me more about building reliable AI than anything else I’ve done. Not because the tooling was sophisticated, but because the stakes forced me to be precise about what “working” actually meant.

This is what I learned, what I’d do differently, and how I think about evals now that agents have made the problem meaningfully harder.

## Starting With Model Evals: What I Got Wrong First

For most teams, writing evals starts like this: you have a prompt, you have a response, you’re trying to measure whether the response is good. You write some tests, maybe hook up a framework like DeepEval or Promptfoo, watch a score go up, and call it done.

I did this too. Here’s what I learned from it.

![Source: Image by the author.]()

**Metrics need to reflect your actual failure modes, not generic quality signals.** When I took over a compliance monitoring system in my previous role, the team had a working eval setup: helpfulness scores, response length, and a vague coherence metric. None of it answered the actual question. *Is this system making the right call on the cases that matter?* The failure modes we cared about were hallucinated regulatory citations, false certainty on unsettled compliance questions, and missed exception clauses. None of those were being measured. The scores looked healthy. The system had real gaps. What I needed to do first was sit with the actual outputs, find the patterns in what went wrong, and build criteria around those specific failure modes.

**LLM-as-judge works well once it’s calibrated to your own judgment.** The idea is genuinely powerful: use a capable model to evaluate outputs against a rubric at scale, instead of having humans review everything. The step that makes it work is calibration. Write your judge prompt, then manually label a sample of your own outputs and compare those labels to what the judge produces. Refine until agreement is high enough for your risk tolerance. Without that step, you’re scaling your own assumptions rather than validating them. With it, LLM-as-judge becomes one of the most useful tools in the eval workflow.

**Eval frameworks are most useful once you have a strategy to implement.** Tools like RAGAS, DeepEval, and LangSmith are genuinely useful at the right stage. The teams I’ve seen use them well had already built their own eval logic, understood where it broke down, and then adopted a framework to operationalize it. The framework implemented their strategy. It didn’t supply one. My recommendation: start with your own failure criteria, build something simple, and reach for a framework when you need the operational infrastructure to run it consistently at scale.

## Moving to Agents: Why Evals Need to Evolve

Here’s where the problem gets structurally more interesting.

![Source: Image by the author.]()

Most eval thinking, including everything above, is built on a single mental model: input goes in, output comes out, and evaluate the output. That model works reasonably well when your system is a model. It breaks entirely when your system is an agent.

An agent doesn’t just respond. It plans. It decides which tools to call, in what order, with what arguments. It maintains state across multiple steps. It recovers or fails to recover when something goes wrong mid-execution. The final answer you see is the product of a chain of decisions, and evaluating only that answer is like reviewing a surgery by whether the patient walked out, without looking at what happened in the operating room.

**A model eval is a photograph. An agent eval is a film review, and you have to watch every scene.**

Making that shift is what separates eval systems that hold up in production from ones that look fine until something breaks.

## What Agent Evals Actually Need to Measure

![Source: Image by the author.]()

**Task completion rate** is where most people start. Did the agent accomplish the goal, yes or no? It’s necessary but not sufficient. A 90% completion rate tells you nothing about why 10% failed, whether those failures cluster around a specific input pattern, or whether you’re one edge case away from a cliff.

**Trajectory efficiency** catches what task completion misses. An agent that completes a task correctly in 14 tool calls when 5 would suffice isn’t performing well. It’s burning latency and compute and accumulating error surface at every unnecessary step. Efficiency is measured by comparing the agent’s actual path against the expected path on your golden test cases. There is no universal formula for the right number of steps. You define what the correct path looks like for each test case based on domain knowledge, then measure deviation from it.

```
def trajectory_efficiency(actual_steps: int, expected_steps: int) -> float:    """    Score of 1.0 means the agent matched the expected path exactly.    Below 0.6 is worth investigating: either the agent is wandering    or your expected_steps baseline needs revisiting.    """    return expected_steps / actual_steps if actual_steps > 0 else 0.0
```

The next metric gets more specific, moving from how many steps to whether each step was actually the right one.

## Get Vineeth’s stories in your inbox

 from this writer.

Remember me for faster sign in

**Tool call correctness** is where agent evals diverge most sharply from model evals. Your agent isn’t just generating text. It’s making discrete, evaluable decisions: which tool to call, what arguments to pass, when in the sequence to call it. Each of those decisions can be checked with a code assertion. One of the most common and underdiagnosed agent failure modes is argument hallucination, where the agent passes a field that doesn’t exist in the tool’s schema, or invents a value that wasn’t present in the context it was given. This is detectable programmatically, before the bad call reaches a real system.

```
def assert_no_hallucinated_args(actual_args: dict, tool_schema: dict) -> bool:    """    Returns True if every argument the agent passed is defined in the tool schema.    A False result means the agent invented fields that do not exist.    """    allowed_keys = set(tool_schema.get("properties", {}).keys())    actual_keys = set(actual_args.keys())    hallucinated = actual_keys - allowed_keys    if hallucinated:        raise AssertionError(f"Agent hallucinated tool arguments: {hallucinated}")    return True
```

Once you are confident the agent is calling the right tools with the right arguments, the next question is whether it is still solving the right problem.

![Source: Image by the author.]()

**Goal fidelity** is the hardest metric and the most critical in regulated contexts. Over a long sequence of steps, agents have a tendency toward goal drift. They optimize for completing sub-tasks in a locally sensible way that loses sight of the original objective. A compliance agent asked to identify transactions involving sanctioned entities (parties on government watchlists that companies are legally prohibited from doing business with) might correctly execute every individual step while constructing a report that doesn’t actually answer the compliance question it was given. Measuring goal fidelity means embedding checkpoints at meaningful points in the trajectory, typically using an LLM judge with a specific rubric, asking whether the agent’s current state and reasoning still reflect the original intent.

**Error recovery** tells you how the system behaves under the conditions production actually creates. Tools fail. APIs return malformed data. A well-designed agent eval suite deliberately injects these failures at specific points in the trajectory and measures the response: does the agent retry appropriately, flag the issue for human review, or proceed as if the failure didn’t happen and silently compound the error downstream. That last outcome is the one that causes incidents.

## What a Real Agent Eval Looks Like End to End

Putting this together, here’s what a golden test case looks like for a compliance workflow. Not just input and output, but the full expected trajectory with checkpoints built in:

```
Input: "Flag transactions involving counterparties on the OFAC SDN list"(OFAC SDN: the U.S. Treasury's list of sanctioned individuals and entities that companies are legally prohibited from transacting with)Expected trajectory: Step 1 fetch_transactions(date_range="last_30_days") Step 2 lookup_watchlist(source="ofac_sdn", format="structured") Step 3 cross_reference(transactions=T, watchlist=W) Step 4 generate_report(flagged=results, include_match_confidence=True)Eval checkpoints: [Code assertion] watchlist lookup happens before cross-reference [Code assertion] every flagged entity appears in the actual OFAC list [Code assertion] no hallucinated arguments in any tool call [LLM judge] match confidence scores are consistent with match quality [LLM judge] final report answers the original compliance question, not a proxy for it
```

![Source: Image by the author.]()

The checkpoints are designed *before* the agent is built. That process, deciding what correct behavior looks like at each step, is where the real eval thinking happens. The code is just capturing it.

## Keeping Evals Current Over Time

At my previous company, we had a compliance monitoring system in production for 6 months with a solid eval suite. When we expanded its scope to cover a new regulatory domain, the eval scores held steady. A routine manual review session surfaced what the metrics had missed entirely: the model was citing guidance that had been superseded by updated regulatory rules. The helpfulness score never moved. That experience made the lesson concrete for me. Evals need to evolve alongside the product and the environment it operates in, not just when the model or prompts change.

For agents, this problem is structurally worse. Agents depend on external systems like APIs, databases, and tools that evolve independently of your model or prompts. A tool that silently changes its response schema. A retrieval system updated with new documents that shift what gets surfaced. An API that starts returning paginated results where it previously returned everything at once. Any of these can degrade agent performance in ways that output-level metrics won’t surface until something downstream breaks.

The discipline is the same as for model evals, but the surface area is larger. Treat changes to external dependencies the way you treat prompt changes: as interventions that require re-running your eval suite before they reach production. And maintain the habit of reviewing full traces, not just outputs. When you read an agent’s complete decision sequence, you see drift that aggregate scores never show.

## The One Thing That Doesn’t Change

Everything above, the metrics, the code, the trajectory design, the drift management, is execution. It matters. But none of it works without the prerequisite.

The prerequisite is clarity about what failure looks like in your specific system, for your specific users, in your specific domain. Not what failure looks like for LLMs in general. Not what DeepEval’s default metrics are calibrated to catch. What *your* system gets wrong, and why it matters.

That clarity comes from one place: direct, manual contact with real outputs and real failures. Sit with your data before you build your eval infrastructure. Read the outputs. Look at the traces. Write down what bothers you in plain language.

With models, that process defines the criteria you are measuring. With agents, it does that and also defines the trajectory that correct behavior should follow.

The sophistication can come later. The clarity has to come first. Moving from models to agents doesn’t change that principle. It just raises the cost of skipping it.

*Sai Vineeth is a Principal ML Engineer and an IEEE Senior Member. He has built anomaly detection and AI governance systems at scale in regulated industries and is building* [*BiasOps*](https://biasops.ai)*, exploring AI governance infrastructure as policy-as-code. He writes about building AI systems that hold up in production.*

![]()

This story is published on [Generative AI](https://generativeai.pub/). Connect with us on [LinkedIn](https://www.linkedin.com/company/generative-ai-publication) and follow [Zeniteq](https://www.zeniteq.com/) to stay in the loop with the latest AI stories.

Subscribe to our [newsletter](https://www.generativeaipub.com/) and [YouTube](https://www.youtube.com/@generativeaipub) channel to stay updated with the latest news and updates on generative AI. Let’s shape the future of AI together!

![]()