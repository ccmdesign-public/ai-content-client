---
title: "A deliberately non-compliant LLM?"
subtitle: "When CAXing a cyclomatic complexity module, why did the LLM generate a non-compliant cyclomatic solution, failing two tests?"
author: "Jeff Langr"
platform: "substack"
publicationName: "Jeff Langr"
url: "https://jjlangr.substack.com/p/a-deliberately-non-compliant-llm"
publishedAt: "2025-04-17"
tags:
  - "ai"
  - "software"
---

# A deliberately non-compliant LLM?

In my prior post, [CAXing a cyclomatic complexity module](https://jjlangr.substack.com/publish/posts/detail/161259213?referrer=%2Fpublish%2Fposts), the LLM generated a non-compliant cyclomatic complexity (CC) solution, failing two tests. After investigation, it turned out that I had incorrectly specified both failing examples.

![Do they look like they’re about to be non-compliant?](https://substackcdn.com/image/fetch/$s_!0NEK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff045516a-723f-42c5-97aa-59ff16044886_1024x608.png)

The LLM didn’t point out the inaccuracies in the examples. Imagine for a moment that these inaccurate tests represent “special cases overriding expected, well-known behavior”—in other words, Jeff is choosing to redefine how cyclomatic complexity is calculated for an `if-else` statement. But the LLM chose to ignore these special cases, instead generating a generally accepted solution for CC.

I thought up three potential factors that shaped the LLM’s solution (and figured there are likely more):

-   The LLM’s generated code is largely based on a well-known existing solution for CC
    
-   The LLM ignored the incorrect expectations within the errant tests, because:
    
    -   It did not apply everything stated in context (my examples)
        
    -   It chose to ignore the examples that did not reconcile with its known understanding of the problem.
        

I mean, the beauty of AI is that you can ask it why, and sometimes get a helpful answer. I fed the prior few paragraphs of this section back into the machine. It said that the LLM “**prioritizes** generating an implementation consistent with *known definitions*, not necessarily example-driven overrides—*unless the instructions explicitly demand deviation.”*

In other words, the model treats the examples as “probably aligned with the concept” rather than immutable truths.

The LLM even explained how to better prompt it by adding an explicit directive:

**“The examples override canonical behavior. Match them at all costs.”**

That’s specific to this CC exercise, but… oh, I wish I’d asked this question a long time ago! Remember that this is an exploration for both you and me.

I’ll add a more-generalized directive to MCP, and from here on out, I’ll also try to remember to tell the MCP something similar at each prompt.

The LLM described one more of its behavioral factors:

**Absence of Contradiction Handling.** The model doesn’t automatically reconcile contradictions. You might prompt: “Implement complexity, here’s how it works: … Also, here’s an example that violates those rules.” It doesn’t raise a red flag unless prompted to. No built-in consistency checker.

### Vetting Your Examples

CAX says to generate both code and tests from examples, then vet the tests. So far, I’ve not talked about the fact that your tests may be wrong in the first place.

Whether you practice TDD, test-after, or CAX, specifying things incorrectly is always a potential problem.

TDD does have the “red” or failure step in its cycle, though, in which you ensure that each test first fails before creating code to make it pass. Therein lies a small protection: If the code already exists that makes the new test pass, you get an *unexpected* “green” (passing test). That shocking moment tells you something is amiss.

But TDD fails *you* when your incorrect test fails and the logic for the correct test is already in the system: You might waste time unnecessarily changing your solution.

Regarding the Cyclomatic Complexity solution, CAX coupled with the behavior of LLMs (as described in the previous section) afforded me a protection: Some of my tests were wrong, the LLM ignored my crummy tests, and I ended up with four failing tests. Not ideal, but at least useful. I reviewed my tests as a result and spotted *my* errors.

The better route is to continue striving for 100% compliance. Maybe I really *do* want to change the definition of cyclomatic complexity. One more reminder for me to be explicit about the examples in my prompt:

**The examples represent cases that you must comply with. They may override canonical behavior. Match them at all costs.**

#### Lean on Your Team

BDD remains a useful process. Automated tests aren’t its most valuable outcome, however. The real value is in the up-front specification-by-example process that potentially involves the whole team—product folk, testing folk, design folk, developer folk, and so on. With BDD, the team refines their understanding of desired behaviors through examples.

Your LLM can act as a valuable partner, but you should still lean on the rest of your team. Involve them in crafting and reviewing examples. As in BDD, you and your team can use the CAX examples as a point of both understanding and negotiation.

#### Always Demonstrate Failure?

The TDD cycle requires a developer to write a test first, *demonstrate its failure*, write the code that gets the test to pass, and then optimize its design. Demonstrating its failure is very important to your success with TDD for a [number of reasons](https://www.ranorex.com/blog/value-failing-tests/). One reason is to help ensure that the test is legitimate—it’s possible the test isn’t even verifying the thing you think it is.

If you’re writing tests after the fact—test-after development (TAD)—you can make the same mistake: Write a defective test, watch it pass, and move on. To prevent this error, you can employ my simple rule:

Trust no test that you’ve never seen fail for the right reason.

(I’ve uttered this aphorism a lot over many years, but never hear it from anyone else before; doubtful though that I’m the first to have said it.)

The rule applies to both TDD and TAD.

So far, I’ve rarely followed the rule when practicing CAX. I haven’t felt compelled. In my head there are many reasons why it’s probably not necessary most of the time. Here’s a brief summary of some of them:

-   I’m using high-fidelity examples. They’re not hand-crafted, they’ve hopefully been reviewed by others, and the expected outcome is a statement of (what I believe to be) the truth.
    
-   I’ve manually vetted the fidelity of the tests to the examples (the **A** in CAX).
    
-   As a result of the prior two bullet points, I believe the risk of a false positive to be low, particularly when covering the solution with a dozen or more tests.
    

Still, both you and I might find it valuable to break things once in a while—an act of harmless destruction that can also be gratifying. Consider using a mutation testing tool.

#### Adding More Tests

A good follow-up at the end of a CAX cycle is to ask the LLM to come up with more examples. You can do that in the same conversation.

You can also use the feedback mechanism of providing the LLM with the very code it generated, and ask what tests it would write.

### Conclusion

Key takeaway point: Remember to reinforce to the LLM that it is to adhere to the examples above all else. If your solution resembles a known quantity, and some examples must deviate from that known quantity, point that out to the LLM.

Ultimately, your solution is only as good as the tests (based on your CAX examples) it passed. Seek one or more ways to vet the legitimacy of those examples in order to gain confidence to ship.