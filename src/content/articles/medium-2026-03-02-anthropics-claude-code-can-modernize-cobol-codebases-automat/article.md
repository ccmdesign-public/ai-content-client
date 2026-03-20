---
title: "Anthropic’s Claude Code can modernize COBOL codebases automatically — surely this is just the…"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/on-february-23-2026-anthropic-announced-that-claude-code-can-modernize-cobol-codebases-e0baafb37682?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-02"
tags:
  - "claude"
  - "engineering"
  - "web-development"
categories:
  - "AI & Machine Learning"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-04T16:12:55.317Z"
---

# Anthropic’s Claude Code can modernize COBOL codebases automatically — surely this is just the…

# Anthropic’s Claude Code can modernize COBOL codebases automatically — surely this is just the beginning.

[Enis Olgac](https://medium.com/@enis.olgac?source=post_page---byline--e0baafb37682---------------------------------------)

6 min read·6 days ago

\--

![Same fries. Same ketchup. Different structure— Ursus Wehrli, Die Kunst, aufzuräumen © 2011 Kein & Aber AG Zürich — Berlin. Used with permission.]()

On February 23, 2026, Anthropic announced that Claude Code can modernize COBOL codebases automatically. For most people, that was news. For me, it was a déjà vu.

## This Is Just the Beginning

Claude Code is remarkable at what it does. It can read code, describe what it sees, suggest transformations, and communicate its actions fluently. But fluent description is not the same as structural reasoning. An LLM trained on code can frame what it has done — it cannot, without the right mathematical foundation, prove that what it has done is correct.

Every arbitrary program can be extracted as a control-flow graph. For program understanding, modernization and debugging there are four prerequisites:

-   The graph must be decomposed into laminar subgraphs that encapsulate local complexity. The resulting decomposition is unique, except for the ordering of siblings that are mutually unreachable — a homomorphism. This is not a matter of choice. It is inherent to the graph.
-   Those decompositions must be available for computation without repeated traversal.
-   They must be bidirectionally navigable — forward to trace effects, backward to trace causes.
-   Flexible queries must be supported, including logical combinations.

Without these, COBOL modernization cannot guarantee that a decomposition is complete, that a reachability claim is exact, or that a backward trace terminates at the true root cause rather than a plausible-sounding one.

Our research, documented in the whitepaper *Structure and Topology of Directed Graphs: An Incremental Encoding*, shows that these four conditions are mathematically sound and efficiently achievable.

This is not a criticism of Claude Code. It is a statement about what structural mathematics provides that language models alone cannot: proof. The structural and topological ordering framework, formalised in the whitepaper, does not describe the structure of a control-flow graph — it proves it. O(1) reachability is not an approximation. Complementary rejection of false positives is not a heuristic. The four conditions for genuine program understanding — laminar decomposition, computational availability, bidirectional navigability, flexible queries — are not design goals. They are mathematical requirements, and this structural ordering satisfies all four by construction.

The vision, then, is not Claude Code replacing structural analysis. It is Claude Code as the interface to structural analysis — translating between the engineer’s intent and the mathematical substrate that makes correct reasoning possible. Natural language in, verified structural claims out.

That combination — rigorous structural mathematics plus natural language interface — is what the field has needed since 1987. I know, because I built the structural half of it then: Semantic Code ANalysis Prime, SCAN’. That is the history worth telling.

## SCAN’: What I Built at IBM Böblingen

While working in Product Assurance at IBM Böblingen, I wrote SCAN’ — Semantic Code ANalysis Prime. It was a prototype knowledge-based re-engineering tool, implemented in VM/PROLOG on IBM VM/SP mainframes, designed to perform goal-oriented semantic reading of S/370 assembler programs automatically.

What it did:

-   Extracted control-flow from assembler programs and represented it as symbolic directed graphs
-   Generated forward and backward dominance trees to identify subprogram boundaries automatically
-   Recognised structured blocks — If-Then, If-Then-Else, Select, Loop — using PROLOG rules that were direct translations of mathematical definitions
-   Performed symbolic execution, replacing register-level instructions with high-level symbolic expressions
-   Translated the result to a higher-level language (PL/AS)
-   Answered goal-oriented semantic queries without re-executing the source

Phase 1 was completed in under eight person-months. Performance: 30 CPU seconds per 1,000 executable statements on an IBM 3081K.

## Get Enis Olgac’s stories in your inbox

 from this writer.

Remember me for faster sign in

Then I had to transfer the prototype. IBM implemented it as ASMPUT — the “Program Understanding Tool” in the HLASM Toolkit Feature, announced December 12, 1995. The mathematics behind it became US Patent 5,878,407 (“Storage of a Graph”, IBM assignee, granted 1999): three indices per vertex enabling O(1) reachability queries by integer comparison alone.

*In memoriam: Walter G. Wilson, IBM researcher, who wrote the original SCAN.*

## Why It Failed — And Why That Matters Now

ASMPUT proved the concept was sound. IBM built it, shipped it, and eventually retired it — not because the idea was wrong, but because two things were missing: the mathematics to handle arbitrary control-flow graphs, and the language capability to communicate with engineers in natural language. Both gaps are now closing, but they are closing independently, and that distinction matters.

ASMPUT did the structural work correctly for well-nested control-flow graphs. It extracted control-flow, recognised structured blocks, and produced something a human could navigate. The mathematics, formalised in US Patent 5,878,407, was complete and correct within that domain. But two things were missing: better algorithms to handle arbitrary directed graphs — ill-nested configurations, multiple exits, exception handlers — and any means of communicating the structure to engineers in a form they could reason with interactively. ASMPUT could show you a picture. It could not discuss what the picture meant.

My working principle has always been: let the computer do what it can do better, but under the supervision of a human who integrates meaning and judgment. For that supervision to be real rather than ceremonial, two further conditions must hold.

First, both parties must share a vocabulary. Not the jargon the tool was trained on, and not the informal terms the engineer happens to use, but the precise terminology that the structure itself defines. If the tool calls something a “module”, the engineer calls it a “loop body”, and the mathematics calls it an “interval”, supervision breaks down — not from lack of effort but from lack of a common reference. The canonical decomposition that this structural ordering produces can resolve this: the terminology is not agreed upon by convention, it is derived from the structure and topology. An interval is an interval because the mathematics says so, not because we chose to call it that.

Second, both parties must be able to navigate the same mental model. A canonical decomposition is also a canonical geometry: left and right, up and down, collapse and expand are not arbitrary UI decisions but reflections of mathematical structure. A predominator is above because it structurally precedes. A laterally reachable vertex precedes a directly descended one because it becomes reachable earlier. When the human says “go up” and the tool goes up, they are referring to the same thing — not by convention but by necessity.

The performance gap makes all of this more urgent than it might appear. The analysis that takes a human days, SCAN’ completed in seconds in 1987. Today we are at the subsecond level. The machine is accelerating; the human’s task, if anything, is getting harder — more complex codebases, more layers of abstraction, decades of accumulated legacy with no surviving documentation. The only way human supervision remains meaningful as the machine gets faster is if the communication between them is precise, canonical, and grounded in the same mathematics.

People often ask what mathematics is good for. Here is a working answer: it is good for untangling things using unambiguous terms. Every other approach to program understanding — informal documentation, naming conventions, architectural diagrams — introduces new ambiguity as it tries to reduce existing complexity. Mathematics does not. An interval is an interval. A predominator is a predominator. The untangling is exact.

## The Mathematics Has Not Stood Still

The work did not stop with ASMPUT. Over the following three decades I continued developing the mathematical foundations.

Two peer-reviewed publications formalised the graph theory: [*Topology and Structure of Directed Acyclic Graphs (Springer, FICC 2021*](https://www.intechopen.com/chapters/1219247)*)* and *T*[*opology and Structure of Directed Trees: An Incremental Encoding (IntechOpen, December 2025)*.](https://www.intechopen.com/chapters/1219247)

These culminate in a current unpublished whitepaper: Structure and Topology of Directed Graphs: An Incremental Encoding.

This structure exists a priori — it is not imposed by representation choices but forced by directionality itself. Where there is an agreed-upon direction, there are cause and effect chains. And directionality is unidirectional: the existence of a path from A to B says nothing about the existence of a path from B to A. But it can be interpreted bidirectionally. The challenge has always been explicating it efficiently.

The solution is a structural vertex ordering: for any vertex v, vertices reachable from earlier sources precede vertices reachable exclusively through v. The result is that every vertex is introduced as early as possible but as late as necessary — not by design, but by mathematical consequence. Applied recursively at every level, this completely determines the graph’s inherent structure. A ~50 lines of operational code maintains this ordering incrementally. The resulting encoding facilitates reachability queries in O(1) via dual domination perspectives that emerge by mathematical necessity, not algorithmic choice.

For program understanding and debugging, this matters concretely. The structural ordering satisfies all four conditions set out above. The structure was always there. We now have the mathematics to explicate it and the inference capability to reason about it.

The mathematics is now complete. The interface now exists. What remains is connecting them.

The full 38-year intellectual lineage, with verified bibliographic details and public links, is documented here:

[*https://gist.github.com/EnisOlgac/cba0451b9ef6fe7fd805b7b85f809074*](https://gist.github.com/EnisOlgac/cba0451b9ef6fe7fd805b7b85f809074)

Enis Olgac
Independent Researcher
Böblingen, Germany