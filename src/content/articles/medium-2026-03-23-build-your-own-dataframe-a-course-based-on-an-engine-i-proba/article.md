---
title: "Build Your Own DataFrame: a course based on an engine I probably shouldn’t have written"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/build-your-own-dataframe-a-course-based-on-an-engine-i-probably-shouldnt-have-written-8edee5b18524?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-23"
tags:
  - "data-pipeline"
  - "engineering"
  - "python"
  - "web-development"
categories:
  - "Data & Analytics"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-23T18:01:23.256Z"
---

# Build Your Own DataFrame: a course based on an engine I probably shouldn’t have written

Build Your Own DataFrame: a course based on an engine I probably shouldn’t have written

*A few years ago, I needed a data processing engine for a visual ETL tool I was building —* [*Flowfile*](https://github.com/Edwardvaneechoud/Flowfile) *— and against all sane practices, I just started writing one. Pure Python.* *itertools.groupby for aggregation.* *operator.itemgetter for column access, own type inference, manual memory optimization, custom everything. And now I’m turning it into a teaching tool!*

![](https://cdn-images-1.medium.com/max/1024/1*_mz0FIkpgBgA0sS8t2s7QQ.png)

It handled joins, pivots, groupby, explode, filters — a working engine built entirely on the standard library. No numpy, no C extensions, no dependencies at all.

Was this a good idea? Probably not the most efficient path. But it taught me something I couldn’t have learned any other way: I understood exactly what a dataframe library does, because I’d built every piece of one myself.

When I eventually migrated Flowfile’s engine to Polars, the pure Python engine went into a drawer. That migration was driven by something I realized about focus: you can’t do everything. Building a custom dataframe engine was a great way to learn, but it was a terrible way to ship a product. Flowfile needed things that actually mattered — the visual editor, the code generation, the user experience — not maintaining a homegrown query engine. Ironically, I’m now doing more for Flowfile than ever again. But I believe/hope (lol) they’re the important things.

Sometimes it’s fun to look back at your old code — especially the code from before AI — and see how you were solving problems back then. The old engine was all me: no Copilot, no autocomplete suggestions, just reading docs and figuring it out. I kept thinking it would be fun to turn it into something people could learn from. So I cleaned it up, published it as [pyfloe](https://github.com/Edwardvaneechoud/pyfloe), and wrote a course around it — one where the why always comes before the how.

### The problem with “how libraries work” content

Most educational content about library internals falls into two buckets.

The first is the conceptual walkthrough of production internals. “Let’s look at how Polars implements joins!” And then you’re reading about Rust iterators, SIMD intrinsics, and memory layouts — real concepts, but at a level of abstraction where it’s hard to connect the ideas back to something you could build or modify yourself. You come away knowing the pieces exist without quite seeing how they fit together.

The second is the toy example. Build a 50-line DataFrame class with \_\_init\_\_, filter, and select. Wave your hands. "Real libraries do something like this, but more complicated." Clean mental model, almost no connection to how things actually work.

Neither approach works for me. I’ve always learned the most from implementing things that needed to function — not reading about them, not building throwaway demos, but building something real enough that the architectural decisions actually matter.

### Two trees, one engine

That’s what pyfloe is. A lazy dataframe engine that implements simplified versions of the patterns behind real query engines — expression ASTs, the volcano execution model, hash joins, a rule-based optimizer — in about six files of readable Python.

Here’s what using it looks like:

```
import pyfloe as pfresult = (    pf.read_csv("orders.csv")    .filter(pf.col("amount") > 100)    .with_column("rank", pf.row_number()        .over(partition_by="region", order_by="amount"))    .select("order_id", "region", "amount", "rank")    .sort("region", "rank")    .collect())
```

If you know Polars, this looks familiar. That’s intentional.

The core insight — the thing that makes everything in pyfloe (and Polars, and Spark) click — is that the engine is built around two tree structures.

The **plan tree** describes how data flows. Each node is an operation: scan a file, filter rows, join two tables, project columns. When you call .collect(), the engine walks this tree from the root and pulls data upward.

The **expression tree** describes what to compute on each row. When you write pf.col("amount") > 100, Python's \_\_gt\_\_ method doesn't compare anything — it builds a BinaryExpr node with a Col("amount") on the left and a Lit(100) on the right.

Here’s the trick. You override \_\_gt\_\_ so it returns a new object instead of a boolean:

```
class Expr:    def __gt__(self, other):        return BinaryExpr(self, _ensure_expr(other), operator.gt, '>')
```

Now col("amount") > 100 doesn't evaluate — it builds a tree. And because that tree is data, you can walk it:

```
expr = (col("price") * col("quantity")) > 1000expr.required_columns()# → {"price", "quantity"}
```

Two columns out of fifty. The optimizer now knows it can tell the scan node to skip the other forty-eight.

Expressions live inside plan nodes. A FilterNode doesn't hold a lambda — it holds an expression tree. And because that expression is inspectable, the optimizer can figure out which columns it needs and rewrite the plan to eliminate unnecessary work.

This is the same general approach Polars uses — though Polars goes much further with cost-based optimization, parallelism, and columnar memory. The difference is that in pyfloe, you can open plan.py and read the whole thing in twenty minutes.

### What the course covers

I wrote a free course around pyfloe: [Build Your Own DataFrame](https://edwardvaneechoud.github.io/pyfloe-tutorial/introduction/).

The whole thing runs on Pyodide — Python in the browser via WebAssembly. Every module has interactive code blocks where you write actual Python, run it, and see the results. When “trying it” is just a click, more people actually try it.

Five modules, each building on the last. You start with eager vs. lazy execution and the volcano model. Then you hijack Python’s dunder methods so that col("x") + col("y") builds an inspectable tree instead of adding anything. Then you plug expressions into plan nodes, implement hash joins and aggregation, and end with the optimizer — filter pushdown and column pruning, where the plan tree and expression trees finally converge.

You build simplified versions of each layer, then compare to the real pyfloe source.

### Honest boundaries

If it needs saying: pyfloe is not competing with Polars on performance. It can’t — Python is orders of magnitude slower for this kind of work. Polars is one of those libraries that changed the way people interact with data in Python, and it’s on the forefront of how a dataframe API should work. pyfloe implements the same structures in pure Python — so you can read them, break them, and understand them.

Where it makes sense, we simplify. The optimizer is rule-based, not cost-based. Real engines like Polars estimate row counts and pick join strategies dynamically. pyfloe applies fixed rules — push filters down, prune unused columns — which is enough to show you *why* optimizers exist and how they rewrite plan trees.

The course also doesn’t try to cover everything. Streaming I/O is in a bonus section, not the main path. Five modules, focused on the core architecture.

### Why this matters to me

I like understanding how things work. That’s why I built the engine from scratch in the first place, and it’s why I turned it into a course instead of just deleting it. Flowfile ended up being the tool I actually use — a visual ETL platform where you can build pipelines, inspect data at every step, and export clean Polars code. pyfloe is the original engine that made Flowfile possible, stripped down to where you can see every moving part.

If you’re the kind of person who wants to know what a dataframe library actually does when you call .filter() or .group\_by(), the course is free and the code is all Python you can read. That's the whole pitch.

**Course:** [Build Your Own DataFrame](https://edwardvaneechoud.github.io/pyfloe-tutorial/introduction/) **Library:** [pyfloe on GitHub](https://github.com/Edwardvaneechoud/pyfloe) **The tool that started it:** [Flowfile on GitHub](https://github.com/Edwardvaneechoud/Flowfile)

* * *

[Build Your Own DataFrame: a course based on an engine I probably shouldn’t have written](https://levelup.gitconnected.com/build-your-own-dataframe-a-course-based-on-an-engine-i-probably-shouldnt-have-written-8edee5b18524) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.