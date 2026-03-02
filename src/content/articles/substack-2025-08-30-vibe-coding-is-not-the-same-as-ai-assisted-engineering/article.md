---
title: "Vibe coding is not the same as AI-Assisted engineering."
subtitle: "Can you really 'vibe' your way to production-ready software?"
author: "Addy Osmani"
platform: "substack"
publicationName: "Addy Osmani"
url: "https://addyo.substack.com/p/vibe-coding-is-not-the-same-as-ai"
publishedAt: "2025-08-30"
tags:
  - "ai-general"
  - "engineering"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.568Z"
---

# Vibe coding is not the same as AI-Assisted engineering.

**Vibe coding is not the same as AI-Assisted engineering.** A recent [Reddit post](https://www.reddit.com/r/vibecoding/comments/1myakhd/how_we_vibe_code_at_a_faang/#:~:text=Software%20development.,Go%20to%20comments%201%20Share) described how a FAANG team uses AI and it sparked an important conversation about semantics: "vibe coding" and professional "AI-assisted engineering".

![how we vibe code at faang](https://substackcdn.com/image/fetch/$s_!iddJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6122dc48-ab21-46f4-a005-f709ecb3550d_1688x1182.jpeg)

While the post was framed as an example of the former, the process it detailed - complete with technical design documents, stringent code reviews, and test-driven development - is a clear example of the latter imo. This distinction is critical because conflating the two risks both devaluing the discipline of engineering and giving newcomers a dangerously incomplete picture of what it takes to build robust, production-ready software.

**Vibe coding is great for momentum, but without structure it collapses under production demands.**

As a reminder: "vibe coding" is about fully giving in to the creative flow with an AI (high-level prompting), essentially forgetting the code exists. It involves accepting AI suggestions without deep review and focusing on rapid, iterative experimentation, making it ideal for prototypes, MVPs, learning, and what Karpathy calls "throwaway weekend projects." This approach is a powerful way for developers to build intuition and for beginners to flatten the steep learning curve of programming. It prioritizes speed and exploration over the correctness and maintainability required for professional applications.

There is a spectrum between vibe coding and doing it with a little more planning, spec-driven development, including enough context etc and what is AI-assisted engineering across the software development lifecycle.

![AI-Assisted Development Spectrum](https://substackcdn.com/image/fetch/$s_!cYxB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4bb76118-dc78-43e6-8bdb-8b9c6703753f_1536x1024.webp)

In contrast to the post, the process described in the Reddit post is a methodical integration of AI into a mature software development lifecycle. This is "AI-assisted engineering," where AI acts as a powerful collaborator, not a replacement for engineering principles. In this model, developers use AI as a "force multiplier" to handle tasks like generating boilerplate code or writing initial test cases, but always within a structured framework. **Crucially, the big difference here is the human engineer remains firmly in control, responsible for the architecture, reviewing and understanding every line of AI-generated code, and ensuring the final product is secure, scalable, and maintainable.** The 30% increase in development speed mentioned in the post is a result of augmenting a solid process, not abandoning it.

For engineers, labeling disciplined, AI-augmented workflows as "vibe coding" misrepresents the skill and rigor involved. For those new to the field, it creates the false and risky impression that one can simply prompt their way to a viable product without understanding the underlying code or engineering fundamentals. If you're looking to do this right, start with a solid design, subject everything to rigorous human review, and treat AI as an incredibly powerful tool in your engineering toolkit - not as a magic wand that replaces the craft itself.

## Vibe Coders, Rodeo Cowboys, and Prisoners

The community is split: optimists see a revolution, skeptics see old cowboy coding in new clothes. Optimists call vibe coding the next abstraction layer - like moving from assembly to Python. Outsiders will push it forward until it works.

Realists use it for spikes, but enforce discipline after. *Use AI like a junior dev: helpful, but never unsupervised.* Skeptics dismiss it as marketing spin - *If I can tell it's vibe-coded, it's bad. Good software is good software.* The consensus middle-ground is pragmatic: vibe coding is a sandbox for creativity, but scaling demands engineering.

![diagram, venn diagram](https://substackcdn.com/image/fetch/$s_!CX6m!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffa52f32d-d2fe-4c08-86f2-f99da6e28d88_1536x1536.jpeg)

*A fun Venn diagram by [Forrest Brazeal](https://forrestbrazeal.com/) contrasts three engineering personas in the age of AI assistance – "Vibe Coders," "Rodeo Cowboys," and "Prisoners" – through the metaphor of* *rope* *(freedom vs. constraint). Each archetype highlights extreme approaches that are* *unlikely to deliver production‑grade software.*

## Rope, Risk, and Developer Personas in AI Coding

In the context of software development, "rope" represents the level of freedom and risk a developer is allowed – or allows themselves – when building.

**"Rodeo Cowboys" thrive with** ***too much*** **rope**, embracing a wild-west style of coding with high risk tolerance and minimal oversight. They'll happily lasso together new features or fixes on the fly, sometimes *literally* riding on adrenaline. **"Prisoners" operate with** ***too little*** **rope**, bound by rigid constraints, heavy governance, or fear of mistakes – they move slowly and cautiously, if at all. And in between lies the modern *AI-powered* coder: **"Vibe Coders" are given** ***just enough*** **rope to hang themselves**.

They rapidly generate code by prompting AI with natural-language "vibes" and trust the output, often without fully understanding or testing it.

Each persona has a distinct relationship with AI assistance and risk:

-   **Vibe Coders** – These developers collaborate with large language models (LLMs) in a *free-flowing, conversational* manner, describing what they want and letting the AI fill in the implementation. It's an exhilarating level of freedom – *"just tell the AI to add a login page or fix this bug"*. The **upside** is speed and creativity; vibe coders act more as *orchestrators* than manual coders, focusing on ideas over syntax. But the **downside** is a lack of control. They often run with no safety harness: minimal code review, sparse tests, and blind trust in AI outputs. In other words, a *lot of rope with little guidance*, which can result in codebases that are brittle and opaque. One engineer noted that vibe coding without review is like *["an electrician just threw a bunch of cables through your walls and hoped it all worked out, instead of running them with intention"](https://www.reddit.com/r/programming/comments/1l4x5tu/the_illusion_of_vibe_coding_there_are_no/)* – things might function initially, but hidden flaws lurk behind the walls.
    
-   **Rodeo Cowboys** – The classic "cowboy coder" isn't new to software engineering, and in the AI era this persona still exists (sometimes *augmented* by AI, sometimes not). Rodeo cowboys are those developers who push code to production with daring speed and little process – they'll prototype in production, hotfix live systems at 2 AM, and generally **embrace risk in exchange for velocity**. They have **high risk tolerance** (shared with vibe coders) but may rely more on their own intuition and experience than on AI. If vibe coders are guided by AI "voices," rodeo cowboys follow their gut. They do have *some* rope constraints (even rodeos occur in fenced arenas), but often just enough rope to nearly hang themselves. The overlap of these styles is obvious: a vibe coder can *become* a rodeo cowboy when they start shipping AI-generated code directly to production in a blaze of glory. The results can be spectacular… or disastrous.
    
-   **Prisoners** – On the opposite extreme, we have engineers who are so constrained by process, bureaucracy, or self-imposed caution that they can barely move. These "prisoners" might work in heavily regulated industries or legacy systems where every line of code is a battle. They have **almost no rope** – tight guardrails, mandatory approvals, perhaps skepticism or outright bans on AI assistance. While this mindset ensures safety and predictability, it also stifles innovation. Prisoner-type developers may watch the AI revolution from the sidelines, unable to partake due to organizational rules or fear of the unknown. They won't hang themselves with rope because they're never given any slack, but they also might not deliver anything new and exciting. Interestingly, prisoners and vibe coders share one trait: **being "ordered around by disembodied voices."** In the prisoner's case, the voices are process checklists, ticketing systems, or bureaucratic policies dictating every move – whereas for vibe coders it's the AI's suggestions. Neither is truly in control.
    

In reality, engineers aren't binary labels – a single person might embody elements of all three personas depending on the project and pressures. The Venn diagram's punchline is that all three extremes fail in the long run: too much freedom *or* too many constraints both hinder sustainable engineering.

**The key is finding balance – giving developers enough rope to innovate, but not so much that they (or the codebase) end up strangled by bugs and technical debt.** The rest of this report explores why unchecked "vibe coding" has drawn sharp criticism from industry leaders and online communities, and how teams can harness AI-assisted development more responsibly.

**Bottom line from the community:** vibe coding accelerates exploration but introduces hidden liabilities that blow up in production. Recent discussions highlight recurring problems:

-   [Security flaws](https://www.vktr.com/ai-technology/vibe-coding-explained-use-cases-risks-and-developer-guidance/): API keys left in code, no input sanitization, or naive auth logic
    
-   [Fragile debugging](https://www.reddit.com/r/programming/comments/1l4x5tu/the_illusion_of_vibe_coding_there_are_no/): non-engineers hit walls when even minor changes cause cascading failures.
    

## Will you vibe code your way to production?

Across the software industry, seasoned engineering leaders are issuing a clear warning: **AI-assisted "vibe coding" may rapidly create more problems than it solves in a production codebase.** [Canva's CTO Brendan Humphreys](https://www.vktr.com/ai-technology/vibe-coding-explained-use-cases-risks-and-developer-guidance/) captured this sentiment bluntly:

> **"No, you won't be vibe coding your way to production – not if you prioritize quality, safety, security and long-term maintainability at scale."**

These tools require *careful supervision by skilled engineers*, especially for mission-critical code. In other words, AI can accelerate development, but it cannot replace the hard disciplines of software engineering. When those disciplines are skipped, the result is often a fragile system and a mountain of hidden issues, as [visualized](https://www.reddit.com/r/vibecoding/comments/1mge229/my_vibe_coding_journey/) by /r/vibecoding:

![r/vibecoding - Vibe- Coding Vibe- Debugging](https://substackcdn.com/image/fetch/$s_!GNI0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fded23f71-746e-44b2-ad4f-901483ab6f9e_640x601.jpeg)

Recent findings back up these warnings. In an August 2025 survey by [Final Round AI](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding), **18 CTOs were asked about vibe coding and 16 reported experiencing production disasters directly caused by AI-generated code**. These are tech leaders with no incentive to hype a trend – their perspective comes from hard lessons in the field. As one summary [put it](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding):

> "AI promised to make us all 10x developers, but instead it's making juniors into prompt engineers and seniors into code janitors cleaning up AI's mess."

The ability to ship features faster means little when those features are riddled with flaws that wake someone up at 2 AM.

**What kinds of failures are we talking about?** The CTOs gave examples spanning performance meltdowns, security breaches, and maintainability nightmares:

-   A **[performance disaster](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding)** was recounted by a CTO who watched an AI-generated database query *work perfectly in testing* but then bring their system to its knees in production. The query was syntactically correct (no obvious errors), so the developer assumed it was fine. But it was *woefully inefficient* at scale, something an experienced engineer or a proper code review could have caught. *"It worked for a small dataset, but as soon as real-world traffic hit, the system slowed to a crawl,"* the CTO said. The team wasted a week debugging why the app was hanging – a week they would not have lost had the code been thoughtfully designed. This highlights a key danger: **AI doesn't understand your system's architecture or non-functional requirements** unless you explicitly guide it. It can produce code that *looks* good and passes basic tests, yet falls apart under real workloads. As another leader put it, vibe coding creates an illusion of success until *"the system begins to wobble under workloads"* – then it **catastrophically fails without warning**.
    
-   A **security lapse** was described by an architect who caught a devastating bug in an AI-written authentication module. A junior developer had "vibed" their way through building a user permissions system by copy-pasting AI suggestions and Stack Overflow snippets. It passed the initial tests and even QA. But two weeks after launch, they discovered a critical flaw: **users with deactivated accounts still had access to certain admin tools**. The AI had inverted a truthy check (e.g. using a negation incorrectly), a subtle bug that slipped through. Because no one deeply understood that autogen code, the issue went unnoticed. *"It seemed to work at the time,"* the developer had said. This is a classic AI-generated mistake – logically inverted logic that a human might catch if they wrote it, but the AI's code was treated as a black box. The result was a serious security breach. A senior engineer spent two days untangling that one-line bug in a sea of AI code. The architect dubbed this **["trust debt"](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding)** – *"it puts pressure on your senior engineers to be permanent code detectives, reverse-engineering vibe-driven logic just to ship a stable update."* **In other words, every time you trust AI output without verification, you incur a debt that must be paid by someone combing through that code later to actually understand and fix it.**
    
-   A **maintainability and complexity nightmare** came from a story of an AI-generated feature that technically worked fine… until requirements changed. One team allowed a developer to vibe-code an entire user authentication flow with AI, stitching together random npm packages and Firebase rules in minutes. Initially, *"on the surface, things shipped – clients were happy, everyone's high-fiving,"* said one engineering manager. But when the team later needed to extend the auth system for new roles and region-specific privacy rules, *"it collapsed. No one could trace what was connected to what. Middleware was scattered across six files. There was* *no mental model, just vibes."* In the end, they had to **rewrite the whole thing from scratch**, because debugging the AI's spaghetti code was *["like archaeology."](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding)* This highlights how **lack of structure and consistency in AI outputs can lead to unmaintainable code.**
    
-   A **false sense of security** is another insidious danger. AI-generated code often *appears perfectly neat and even* idiomatic\*. It might pass unit tests you wrote. So developers let their guard down. One CTO observed that vibe coding's most dangerous characteristic is code that ["appears to work perfectly until it](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding) **[catastrophically fails](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding)**[."](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding) It lulls teams into production with a smile, then bites hard. Even code review can fail here: reviewing a 1000-line AI-written PR is not much easier than writing it from scratch, especially if the reviewer assumes the code is mostly correct. And if an AI is used to assist code review as well (yes, that's a thing), then we get the blind leading the blind – ["trusting machines to verify machines"](https://shiftmag.dev/the-illusion-of-vibe-coding-5297/), as one commentary put it. Maintainability suffers because no one truly owns the code's logic.
    

**The consensus from leaders is that vibe coding puts critical software qualities at risk: security, clarity, maintainability, and team knowledge.**

In summary, industry leaders aren't luddites resisting a new technology – they're the ones responsible for keeping systems running reliably. Their message is a **critical but constructive** one: *use AI to assist, not to abdicate.* Code still needs human judgment, especially if it's destined for production. As one veteran put it, **["AI tools are copilots, not autopilots."](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding)** They can help fly the plane, but a human pilot must chart the course and be ready to grab the controls when turbulence hits.

## "This isn't engineering, it's hoping."

It's not just CTOs and thought leaders sounding the alarm – the rank-and-file developer community (the ones in the trenches with AI tools daily) have been vigorously debating vibe coding throughout 2025. On [Reddit](https://www.reddit.com/r/programming/comments/1l4x5tu/the_illusion_of_vibe_coding_there_are_no/) and [Hacker News](https://news.ycombinator.com/item?id=44959069), threads about vibe coding have garnered hundreds of upvotes, with seasoned developers sharing war stories and sharp critiques, as well as a few counterexamples and success stories. The overall mood: **high skepticism of using un-reviewed AI code in serious projects, mixed with some optimism for limited use cases.**

On the critical side, developers recount how vibe coding has negatively impacted their workflows and team dynamics. A top comment on one Reddit thread [lamented](https://www.reddit.com/r/programming/comments/1l4x5tu/comment/mwd6n9j/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button):

> "I just wish people would stop pinging me on PRs they obviously haven't even read themselves, expecting me to review 1000 lines of completely new vibe-coded feature that isn't even passing CI."

The frustration here is palpable – *code review* becomes a farce if the author themselves doesn't understand the AI-generated code or bother to run tests. It shifts the burden onto unwitting teammates. Another commenter [responded](https://www.reddit.com/r/programming/comments/1l4x5tu/comment/mwdhsz8/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) that this behavior *"feels so far below the minimum bar of professionalism"*, likening it to a tradesperson doing a shoddy job that others have to fix. **Peer review and team trust break down** when one developer dumps AI output on others without due diligence.

The cultural backlash is evident – nobody wants to work with a so-called engineer whose contribution is copy-pasting from ChatGPT and shrugging when things break.

The phrase *["this isn't engineering, it's hoping"](https://shiftmag.dev/the-illusion-of-vibe-coding-5297/)* has been used in these discussions (a paraphrase of a line from the ShiftMag article). It captures the sentiment that vibe coding without proper review/testing is akin to hoping the software works by magic. Many developers point out that **coding is supposed to be an engineering discipline**, not wish fulfillment.

However, amid the criticism, there are also **counterpoints and nuanced views** emerging from the community. Not everyone is writing off vibe coding entirely; some are experimenting and finding *niche scenarios where it excels*. A highly upvoted [Hacker News comment](https://news.ycombinator.com/item?id=44959069) framed it through the classic [Innovator's Dilemma](https://news.ycombinator.com/item?id=44959069): today's experts dismiss vibe coding as a toy, but tomorrow it could evolve and render old methods obsolete. While many responses disagreed with the inevitability of that outcome, the discussion opened up a more *optimistic* perspective: maybe we're just in the early clunky phase of AI coding, and improvements in AI or methodologies will address current flaws.

A practical example was [given](https://news.ycombinator.com/item?id=44960238) by one HN user who successfully **vibe-coded a bespoke internal tool** in record time.

> "Last week I converted a bunch of Docker Compose configs to run on Terraform (Opentofu) – took me maybe an hour or two with Claude, while watching TV. Would've been a week easy if I did it the artisanal way of reading docs and Stack Overflow."

This developer wasn't building a customer-facing product, but rather automating a tedious infrastructure task. For that use-case, vibe coding was a huge win: it saved time and the code was "good enough" for an internal tool that he controlled. Many others chimed in to agree that **for small-scale or one-off scripts and glue code, vibe coding can be a massive productivity booster**. It's the classic 80/20 trade-off – if you need something quick and you're the only stakeholder, the AI can crank out a solution in minutes instead of days.

Crucially, the developer in this story *knew the limits*: he treated the AI as an assistant to speed up his own work (even multitasking entertainment while coding), and presumably he validated the output. This aligns with a refrain seen in several discussions: *"Good time saver,* *if you know what you're doing."* The implication is that an experienced dev can use vibe coding like a power tool – accelerating the grunt work – but they still architect, guide, and double-check the result. In inexperienced hands, the same power tool can wreak havoc.

There's also an interesting analogy drawn in these debates: **["Coding with agentic LLMs is just project management."](https://news.ycombinator.com/item?id=44959069)** Instead of writing code, your job becomes breaking down tasks for the AI, verifying each chunk, and integrating the results – essentially acting as a project manager for a very junior (but very fast) developer. Some developers say this *feels* easier or lazier – hence "vibe" – while others find it still requires solid development chops, just applied differently. The ones who succeed treat it systematically: break problems into small, verifiable prompts (tasks that fit in context windows), run tests at each step, and iterate. The ones who fail just throw a big vague prompt at GPT and paste whatever comes out.

**Bottom line from the community:** *Vibe coding is not a silver bullet.* Experienced devs mostly view it as a fun or useful technique for prototyping and automating trivial tasks, **not** a replacement for disciplined development on [complex systems](https://news.ycombinator.com/item?id=44959069). The hype that "LLMs will write all our software" is being met with healthy skepticism on the ground. At the same time, there's recognition that AI coding assistants are here to stay and *can* provide huge productivity boosts when [used judiciously](https://www.vktr.com/ai-technology/vibe-coding-explained-use-cases-risks-and-developer-guidance/). The focus is shifting toward **how to integrate AI into workflows without losing the rigor of software engineering** – which we'll explore next.

## Where *can* Vibe Coding help?

If pure vibe coding is risky for production, is it *good for anything*? The answer from both industry leaders and practitioners is *yes*: **vibe coding shines in certain scenarios – especially in rapid prototyping, exploratory projects, and as a creative aid – but one must know when to stop vibing and start engineering**.

Several CTOs in the [FinalRound survey](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding) acknowledged that they don't ["condemn vibe coding entirely"](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding). Instead, they **compartmentalize its use** to get the best of both worlds. [Matt Cumming](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding), founder at LittleHelp, shared that he can *"create and deploy a functional micro-SaaS web app in a day with no issues, which is insane."* Over a weekend, he took an idea from thought to a live product by leveraging AI for the heavy lifting. This kind of speed is unprecedented – essentially compressing what might be a 2–3 week MVP build into 48 hours. **For hackathons, demos, internal tools, and validating product-market fit quickly, vibe coding can be a game-changer.** It allows small teams (or even solo devs) to punch far above their weight in terms of feature output.

However – and this is a big caveat – every leader who touted such successes added *major warnings and limits*. Matt Cumming himself had learned the hard way that unleashing AI without guardrails can backfire. He described how an early project of his was *["completely destroyed by AI in a few minutes"](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding)* after a month of work, due to some AI-generated corruption or error. Chastened by that experience, he established a disciplined approach:

> "We start any AI-assisted coding by collaborating with the AI to write the functional spec and steps required in a project document. The other crucial thing I learned is to get the agent to do a security check \*on any new functionality you add."

In other words, **use the AI to help plan and review, not just to spit out code**. By having the AI outline the design first, he ensures he's thought through the architecture. By having it perform security analysis on the output, he adds an automated sanity check for vulnerabilities. His team also confines vibe coding to "throwaway projects and prototypes, not production systems that need to scale". The vibe-coded app serves as a proof of concept, which they might later *rewrite or harden* for real-world use.

Another leader, [Brett Farmiloe](https://www.finalroundai.com/blog/what-ctos-think-about-vibe-coding) (CEO at Featured), echoed this:

> "Vibe coding is great when you're starting from scratch... we built a site using v0 (an AI tool) and deployed quickly. But with our established production codebase, we only use vibe-coded components as a starting point – then technical team members take over to finish."

Both he and Cumming treat AI-generated code as **scaffolding**. It's fantastic to erect a structure rapidly, see if it holds the shape you want, but you wouldn't leave the rickety scaffolding in place for the final building. You replace or reinforce it with solid materials. **In software terms: the AI prototype must be refactored, tested, and owned by human engineers before it becomes the permanent solution.**

Another approved use case is **[legacy code refactoring](https://www.vktr.com/ai-technology/vibe-coding-explained-use-cases-risks-and-developer-guidance/)**. As noted in one analysis, some companies let AI rewrite portions of old code into newer frameworks or languages as a "head start". Since that code is going to be reviewed and tested thoroughly anyway, using AI to do the brute-force translation or rote work can save time. Similarly, AI can help squash known bug patterns: e.g. *"solve these 5 specific defects in our code"* – a targeted application rather than carte blanche generation. In these cases, the **scope is limited and the outputs are verified**, aligning more with **AI-assisted programming** than blind vibe coding.

We can summarize where vibe coding *adds the most value* in 2025:

-   **Rapid Prototyping & hackathons:** Need to demo an idea by tomorrow? AI code generation can materialize a working prototype incredibly fast. It's okay if the code is messy, as long as it showcases the concept. **Speed and iteration matter more than robustness** at this stage. Vibe coding lets you try three different approaches in a day – something traditional coding would never allow.
    
-   **One-off scripts and internal tools:** If the code doesn't need long-term maintenance and is only used by the author, the risk is relatively low. Writing a quick data analysis script, converting file formats, automating server configs – those kinds of tasks can often be safely vibe-coded because if it breaks, the person who wrote it (with AI) will fix it, and there aren't many external consequences. Basically, **personal projects or automation** are fertile ground for vibe coding, saving engineers from drudge work.
    
-   **Greenfield development (with caution):** Starting a new project from scratch is easier to vibe code than integrating AI into a sprawling legacy system. When nothing exists yet, there are fewer constraints and no established style to adhere to. A team might vibe code the first version of a new microservice or frontend app to hit an aggressive deadline, then polish it later.
    

In all these scenarios, though, it's assumed that **experienced developers are in the loop**. The people achieving success with vibe coding still apply their judgment to prompt the AI effectively and to verify the outputs. They treat it as **pair programming with a tireless but error-prone junior dev**. Contrast this with novices who might think the AI is a magic shortcut to skip learning – that approach often ends in frustration. Vibe coding, if overused by beginners, can short-circuit the learning process and produce grads who have impressive projects on their resume but lack fundamental skills – another long-term risk noted by educators. Ultimately, when paired with human experience, it can meaningfully reduce time on menial work, but you likely can’t [skip](https://www.reddit.com/r/vibecoding/comments/1mu6t8z/whats_the_point_of_vibe_coding_if_i_still_have_to/) human review and refinement entirely:

![](https://substackcdn.com/image/fetch/$s_!F8pz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F339d50d3-4daa-43c4-8392-97da564101db_1866x708.png)

**The key insight is that vibe coding can be extremely valuable as an ideation and acceleration tool, but it should almost never be the** ***last step*** **for anything that lives on.** Use it to get from zero to demo, or to churn out boilerplate, or explore multiple options. Then comes the crucial phase: *the hand-off from vibes to rigorous engineering*. How to do that effectively is our next focus.

## Spec-Driven: An antidote to prompt-chaos?

One promising development in response to the pitfalls of vibe coding is the rise of **spec-driven and ["agentic" AI coding approaches](https://medium.com/@takafumi.endo/software-3-0-blueprint-from-vibe-coding-to-verified-intelligence-swarms-23b4537f12fa)**. These methods aim to retain the productivity benefits of AI generation while introducing more structure, planning, and verification – essentially adding *rails* to the free-form vibe coding process.

**Spec-driven AI development** means starting with a clear specification or design, often created in collaboration with the AI, *before* any code is written. Instead of immediately prompting "Hey AI, build me a feature," an engineer might prompt the AI to "Help me outline the requirements and modules for this feature." By having an explicit spec (be it a written paragraph, a formal design doc, or a list of steps and functions), the developer ensures both they and the AI have a shared understanding of the goal. It's akin to writing pseudo-code or user stories first. This addresses one major issue of vibe coding: lack of direction. Writing a functional spec with the AI can keep a team on track and prevent the AI from wandering off into irrelevant complexity.

Practically, spec-driven workflow can involve **prompting the AI to generate high-level plans, interface definitions, and even test cases up front**, and iterating on those until the human is satisfied that the plan makes sense. Only then do they ask the AI to implement the pieces of that plan. This is similar to how good engineers work with juniors – you wouldn't let a junior developer code an entire subsystem solo on day one; you'd first agree on a design together. With AI, we're learning to do the same: treat it like a junior that needs a blueprint. Early evidence suggests this yields better results than ad-hoc prompting.

**[Agentic AI approaches](https://medium.com/@takafumi.endo/software-3-0-blueprint-from-vibe-coding-to-verified-intelligence-swarms-23b4537f12fa)** take this further by enabling AI to not only follow spec but also **perform some self-directed actions like running code, testing, and refining**. The term "agentic" here refers to AI agents that can take higher-level goals and then act in an autonomous, iterative way to achieve them (within bounds). For example, some tools allow the AI to do things like execute the code it wrote, observe the results, and fix errors – all without the user explicitly asking at each step.

Spec-driven and agentic approaches contrast with naive vibe coding in a few key ways:

-   **Upfront intent vs. after-the-fact fixes:** Instead of writing code and then trying to retrofit understanding (or just hoping it works), the spec-first approach encodes intent clearly from the start. The AI's output is judged against a known target. This reduces the "surprise" factor of AI code that technically does something you asked but not in the way you wanted (a common complaint when prompts are not specific enough).
    
-   **Small iterations vs. big bang:** Agentic workflows encourage small, testable increments. Rather than asking for a thousand-line program in one go, you ask for one function, see it pass tests, then proceed. Essentially, it mimics **test-driven development** but with AI as the one writing the implementation from your test descriptions. If vibe coding is like typing a novel in one prompt, spec-driven is like pair-writing it chapter by chapter with continuous editorial review.
    
-   **AI in the loop vs. human alone:** Interestingly, agentic approaches can also take *more* burden off humans in some respects by letting the AI handle tedious verification steps. For instance, if every AI-written PR must come with an explanation of *why* the changes were made, an AI agent can be tasked with generating an initial draft of that explanation, which the developer then edits for accuracy. This ensures no code is merged without context. In effect, **these approaches try to weave AI into the fabric of software development best practices – not replace them**. Instead of ignoring testing and review (as vibe coding often does), they automate parts of testing and review.
    

In practice, teams exploring these approaches use tactics like:

-   **Requiring design docs** for any major AI-generated component (even if it's one page, written with AI assistance). This ensures thought was given to how the component fits the system.
    
-   **Using AI to generate unit tests** or property-based tests for its own code, catching obvious errors immediately.
    
-   **Locking down dependencies and focusing on security**: For example, instructing the AI to *only* use approved libraries and run a security scan. As noted, one team actually uses vibe coding in a *[controlled way to intentionally generate insecure code](https://www.vktr.com/ai-technology/vibe-coding-explained-use-cases-risks-and-developer-guidance/), so they can study it and improve their security scanners* – turning the AI into a pen-testing tool rather than a production coder.
    
-   **Preferring integrated AI tools (in-IDE like Cursor or VS Code Copilot)** over copy-paste from ChatGPT. Integration means the AI suggestions are applied in a context where the developer can see the entire diff and run the code immediately, reducing the chance of inadvertently introducing something you don't notice.
    
-   **Keeping humans in the decision loop**: e.g. an AI agent might propose a code change, but it can't merge it – a human must approve. This is analogous to how continuous integration (CI) systems run tests and linters, but ultimately a dev checks the PR. The AI is a CI assistant here, not an autorobot deploying to prod on its own.
    

All these measures are attempts to **mitigate the "vibes" with actual engineering rigor**. They acknowledge that large language models are incredibly useful – they really can understand intent and produce working code for a huge variety of tasks – but they function best when **given clear direction and boundaries**. Left unguided, they'll happily drift into the weeds or produce a solution that passes superficial muster but fails in edge cases.

In essence, spec-driven and agentic methods are about **marrying the best of AI and human strengths**: humans excel at defining problems, understanding context, and making judgment calls; AIs excel at traversing solution spaces quickly, writing boilerplate, and even coordinating tasks when set up to do so. The future of AI-assisted engineering likely lies in this middle ground – not in pure prompt-and-pray vibe coding, but in *augmented workflows* where AI amplifies human design and humans reign in AI's excesses.

The way forward is hybrid: Sandbox phase: vibe freely, test ideas, build prototypes. Production phase: apply engineering discipline - testing, refactoring, design, security.

## Conclusion

**In summary, developers and teams can evolve vibe-coded prototypes into robust systems by re-injecting all the traditional software engineering practices that might have been bypassed in the rush of AI generation: design it, test it, review it, own it.**

Speeding through the first draft is fine – even commendable – as long as everyone understands that *you then switch out of "vibe mode" and into "engineering mode."* High-performing teams will likely develop an intuition for when to employ the AI fast lane and when to merge back onto the steady highway of tested, reviewed code. The end goal is the same as it's always been: deliver software that works, is secure, and can be maintained by the team.

The tools and methods are evolving, but **accountability, craftsmanship, and collaboration remain paramount in the age of AI-assisted engineering**.

*I’m excited to share I’m writing a new [AI-assisted engineering book](https://beyond.addy.ie) with O’Reilly. If you’ve enjoyed my writing here you may be interested in checking it out. I’ve included a number of free tips on the book site.*

![](https://substackcdn.com/image/fetch/$s_!wQ9T!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F86161744-11ac-4187-a945-0dc5cc7a6920_5246x3496.png)