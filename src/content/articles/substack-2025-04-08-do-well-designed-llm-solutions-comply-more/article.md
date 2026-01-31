---
title: "Do well-designed LLM solutions comply more?"
subtitle: "A Proposed LLM Experiment"
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/do-well-designed-llm-solutions-comply"
publishedAt: "2025-04-08"
tags:
  - "ai"
  - "software"
---

# Do well-designed LLM solutions comply more?

Last post I hypothesized:

*To succeed with AADV and [CAX](https://jjlangr.substack.com/p/create-assess-execute-cax), it will generally be easier if the modules you create are small and closed. The compliance gap[1](https://jjlangr.substack.com/p/do-well-designed-llm-solutions-comply#footnote-1-159615568) generally increases as modules increase in responsibility.*

The problem with running a set of experiments against that hypothesis is that there’s no definitive way to measure adherence to either SRP or OCP. “Closed” is tough since it’s predicated on change. SRP is also tough, given that it’s dependent on the subjective metric of just what constitutes a behavior.

Some objective metrics (ones deterministically calculable from code) indicate characteristics that are typical in SRP/OCP compliant designs. Cyclomatic complexity (CC) and DCOM4 are two such metrics. For example, functions with high complexity often—but not always—embed behaviors better suited in another module. DCOM4, which measures lack of cohesion (an ideal score is 1; modules with decreased cohesion generate higher scores), similarly touches on an aspect of appropriate responsibilities.

![What I love most about this generated “mad scientist:” the # of digits on each hand. 13 total?](https://substackcdn.com/image/fetch/$s_!mSWe!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ced3be8-27b4-484d-ad73-68361e45b3a5_1024x608.png)

### The Experiment

The proposed experiment will be in multiple parts:

1.  Settle on a metric involving CC and DCOM4 that fosters LLM solution generation of code adhering to the metric.
    
2.  Select 6 diverse programming problems (ideally not well-known, so that the LLM cannot just rip off code from an existing solution). For each problem:
    
    1.  Devise a baseline prompt, composed of a brief problem description and [CAX examples](https://jjlangr.substack.com/p/create-assess-execute-cax).
        
    2.  Request 100 solutions using the baseline prompt. Capture the *[compliance](https://jjlangr.substack.com/p/create-assess-execute-cax)* (% of tests passed) for each test.
        
    3.  Repeat another 100 solutions using the baseline prompt, along with a request to the LLM that the code should adhere to the metric. Capture the compliance.
        
3.  Calculate the correlation between code adhering to the AADVM metric and compliance. Provide conclusions based on (minimally) correlation, variance, outliers.
    

#### Devising a Metric

A metric, DCC (Design Complexity Composite), will be devised to measure all generated solutions. Creating its definition will be an iterative, somewhat-subjective process. An ideal DCC definition, when described as a target in prompts, would lead an LLM to generate solutions that score well on the metric—and those solutions would also align with human judgment of quality.

For each iteration *n* (where *n* = 1, 2, 3, …):

-   Define the metric DCC*n*, adapting it based on the results from the prior iteration.
    
    -   For iteration 0, DCC*0* is a blended metric that weighs CC and DCOM4 equally.
        
    -   DCOM4 is calculated at the modular level.
        
    -   `CCmod`, the cyclomatic complexity of a module, is calculated as:
        
        `0.8 × CCmax + 0.2 × CCavg`
        
        where `CCmax` is the function in the module with the highest complexity, and `CCavg` is the average complexity of all functions in the module.
        
    -   The module metric `Smod` thus is `(CCmod + DCOM4) / 2`.
        
    -   Calculate DCC*0* as the average of `Smod` across all modules.
        
-   Generate solutions to a varied set of programming challenges. For each, present a prompt to the LLM containing:
    
    -   a brief overview of the problem
        
    -   CAX examples
        
    -   design hints as appropriate. If design hints were provided in a previous iteration, provide the same design hints.
        
    -   a description of M*n* and the formula that defines it
        
-   For each programming challenge solution, calculate M*n*—irrespective of whether the test passes.
    
-   Determine the average of M*n* across all programming challenge solutions.
    
-   Repeat the process until the average DCCn improvement over the prior iteration is less than 3% for 3 consecutive iterations.
    

The official DCC metric will be the first DCCn for which the average improvement in DCC across all solutions is less than 3% for three consecutive iterations.

A set of minimally 6 programming exercises will be selected. Exercises will be selected with a bias toward less well-known problems, to reduce the LLM’s chance of retrieval-based solutions and to encourage generative reasoning.

#### Selecting Programming Exercises

As suggested, a better experiment would involve selecting programming exercises that are not well-known. I wasn’t sure how to quantify that. Per a linguist colleague with prompt engineering expertise: “Just prompt the LLM to explain its thought process to you and indicate whether or not it found the answer somewhere.” Sounds like a great idea.

A key goal for this experiment is to determine whether the LLM can translate a somewhat-SRPish metric goal into a design that complies with that metric. A preferred characteristic for an exercise, then, is that its ideal SRP-compliant solution would require multiple modules.

Programming exercise selection for the experiment will involve the following criteria:

1.  A majority of the selected programming exercises will be unfamiliar to the LLM, as claimed by the LLM.
    
2.  A majority of the selected programming exercises will foster solutions that are best resolved with multiple modules.
    

#### **Running the Experiment**

For each programming exercise:

1.  Provide CAX examples and describe the exercise briefly
    
2.  Request tests only; vet the tests
    
3.  Generate “default” solutions (i.e. with no defined metric goal):
    
    1.  Request *n* solutions (*n* likely ending up at 100)
        
    2.  Run the vetted tests against each solution
        
    3.  Capture the compliance (% of tests passing) for each solution
        
4.  Generate DCC-compliant solutions:
    
    1.  Provide the description of the DCC metric, along with any verbal hints
        
    2.  Request *n* solutions (*n* likely ending up at 100)
        
    3.  Run the vetted tests against each solution
        
    4.  Capture the compliance (% of tests passing) for each solution
        
5.  Do some calculations
    
6.  Make conclusions
    

### Constraints / Risks

-   The LLM will be prompted to generate code using prototype-based JavaScript. Promising results may lead to follow-up experiments involving class-based JavaScript, as well as other programming languages.
    
-   The selected LLM will be OpenAI. (I’m already paying for its API.) Promising results may lead to follow-up experiments using other LLMs.
    
-   The LLM may begin to internalize structural patterns from earlier generations during the experiment, potentially biasing later results. Solutions will be requested in isolated calls to mitigate prompt leakage.
    
-   Results may be biased by the choice of programming problems.
    

### Time to Build

I’ve begun generating the metric calculators for DCOM4 and CC—using CAX of course. I’ll start sharing those in the next post.

*(You’ll see a summary and updates on the research as a free subscriber. Paid subscribers will be privy to more details, including around the CAX conversations and generated code. Plus, an opportunity to discuss all this in Substack’s chat.)*

Also on the TODO list:

-   Come up with the programming problems
    
-   Generate code that requests *n* solutions from OpenAI given a prompt
    
-   Generate code that will run (generated) tests and calculate the compliance for a solution
    
-   Create a little bit of code to do the math and Pearson correlation calculations
    

Lots of dog fooding on AADV/CAX ahead for me!

Please feel welcome to send your thoughts or hit me up in chat. I welcome constructive feedback on the proposed experiment, and I could use ideas for programming problems.

If you’ve read this far, you’re likely disappointed that I’m not able to answer the teaser headline just yet. Hang in there—should have answers in a couple weeks or so!

[1](https://jjlangr.substack.com/p/do-well-designed-llm-solutions-comply#footnote-anchor-1-159615568)

The *compliance gap* is the portion of test cases a generated solution fails to satisfy, relative to the total number of tests.