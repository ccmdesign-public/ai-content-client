---
title: "The New Analytics Trap: When Everyone Can Analyze Data, Fewer People Tell the Truth"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/the-new-analytics-trap-when-everyone-can-analyze-data-fewer-people-tell-the-truth-6d6e9364b04d?source=rss----b680b860beb1---4"
publishedAt: "2026-03-02"
tags:
  - "analytics"
  - "data-analysis"
  - "data-science"
  - "marketing-analytics"
  - "data"
---

# The New Analytics Trap: When Everyone Can Analyze Data, Fewer People Tell the Truth

# **The New Analytics Trap: When Everyone Can Analyze Data, Fewer People Tell the Truth**

[Ilona Hetsevich](/@ihetsevi?source=post_page---byline--6d6e9364b04d---------------------------------------)

7 min read·6 hours ago

\--

*Why your “data-driven” marketing slides are probably wrong.*

![The image was created by the author using AI.]()

It’s QBR time. A marketer presents the performance results. Somewhere in the meeting, there is a slide with a big, confident headline: **“Event Attendance increases pipeline value by 35%**.” In the bottom left corner, a short sentence explains the methodology: *“Compared the average pipeline value of accounts who attended vs accounts who did not.”* The slide is followed by a heated discussion of how we can double down on the events budget and replicate the results in EMEA.

And just like that, a decision was made based on data easily accessible to everyone, yet it isn’t entirely true. You — a data analyst — are lucky if you are invited to the call in the first place and can speak up. More than ever, these decisions are made behind closed doors — or rather, inside locked virtual meeting rooms — without ever consulting you.

Today, everyone can generate an analysis by just uploading a CSV export to an AI model. We shifted from waiting weeks for an analyst to crunch the numbers and send out the report to asking an LLM to do it in a matter of minutes. To marketers it is a huge win, for analysts — a headache.

When everyone can analyze data, we get insights faster, but we also make mistakes more quickly. **That is a hard truth about making data widely accessible.**

So how do we fix it? Let’s dig in.

### **Why Do We Run Into This Problem at All?**

AI has made analytics feel like a conversation:

-   “Calculate the pipeline for accounts that attended an event.”
-   “Compare it to accounts that didn’t.”
-   “Summarize the insight for leadership.”

The numbers in the output are correct; nobody argues. The LLM did its job.

But the real difficulty in analytics was never about getting accurate numbers. The hard part is deciding whether the logic matches a reality:

-   **There is a selection bias:** event attendance isn’t random; it is heavily shaped by targeting, ICP, ABM tiers, and even handpicked by sales. The accounts that attend are frequently higher-fit and higher-intent before they ever set foot in the room. Of course, they would generate a higher pipeline.
-   **There are hidden variables** that affect both the likelihood of attending the event and the pipeline outcome: prior engagement, funnel stage, open opportunities already in motion, sales and ABM coverage, marketing spend, existing relationship, account size… the list is long.
-   In many B2B companies, **the causality runs the other way:** when accounts are in the buying process (have an active pipeline), sales reps push harder to get them invited to events and dinners exactly because it is a strategic deal. They don’t want to lose it.
-   When running fast analysis, **non-analysts tend to make timing mistakes**: reporting Q2 pipeline for accounts who attended an event in Q2, when in reality the pipeline created in Q2 was attributed to marketing activities months/quarters ago and has nothing to do with the event in Q2.

You see the pattern here?

![The image was created by the author using AI.]()

### **The Hidden Dangers of Self-Serve Analytics**

Marketers have domain expertise; they know the context behind marketing campaigns and why the numbers have changed (like an increased promo budget or a change in a demand generation strategy). But they are not analysts. They are not supposed to know all the pitfalls of running a data analysis, definitions, grain, cohorts, time windows, exclusions, business context, and all the messy edge cases. And when they rely on AI to deliver insights, they risk building a marketing strategy based on something that never existed.

> The events slide is a perfect case study because it shows the new analytics trap: the LLM’s output seems confident, the numbers align, and the insight must be valid. But it is not.

The same pattern shows up everywhere in B2B marketing analytics:

-   Claiming ABM increased pipeline when comparing ABM-targeted Tier 1 accounts to non-targeted accounts.
-   Interpreting a spike in paid leads as the driver of a pipeline spike in the same quarter.
-   Stating “more spend brings more leads and thus more revenue” without separating volume from efficiency and incrementality.
-   Assuming conversion lift is caused by the one variable measured instead of a mix of things happening at the same time.
-   Etc.

You can input accurate data and still get a confident AI-generated insight that is wrong because the framing ignores targeting, omitted variables, selection effects, and timing.

**The mistakes made by non-analysts are not random**. Usually, I see the same mistakes again and again:

-   Declaring that “X” caused “Y” from a trend.
-   Slicing and dicing the data multiple ways until something looks good enough to share with leadership.
-   Making decisions using statistically insignificant data.
-   Picking an A/B test winner from a small sample size.
-   Not speaking the same language — marketing says Churn is 2% and Product says it’s 5% — when in reality they use a different definition of Churn in the first place.
-   Ignoring seasonality, comparing data QoQ instead of YoY.
-   Analyzing data in a vacuum, disregarding direct and indirect competitors’ activity, product releases, economic changes, etc.
-   Not being aware of changes in the data underlying data sources, in the attribution modeling, the addition of new data sources, and tracking issues.
-   And more.

### **What Happens When Insights Go Wrong**

When insights go wrong, teams end up making the wrong calls, budgets get misallocated, and revenue is left on the table. But the damage doesn’t stop there — **there are ripple effects beyond just the numbers**:

-   **Leadership stops trusting the data** and starts questioning every insight, asking to validate it with the data team. As a result, “speed to insight” loses its meaning, because the analyst needs to spend time validating the results, even when it wasn’t necessary in the first place.
-   When there are multiple people running analyses, delivering multiple “truths”, the story by the most persuasive narrator, with the strongest voice and **most plausible interpretation, wins**.
-   **The relationship between marketers and analysts falls apart**. Rather than working together, they see each other as rivals. Marketers feel they are being blocked and not trusted. While analysts feel their analytics experience is used to “babysit” and debug someone else’s work that is clearly generated by AI, rather than producing real value for the business.
-   **“Shadow analytics” grows**. People start using private spreadsheets and unapproved AI tools. Cross-departmental communication breaks down, nobody trusts the data, and everyone leaves in their own reality, with their own metrics and insights.

### **What Can We Do to Fix It?**

Of course, we cannot “lock down” data. We need to build a new way to work together.

![The image was created by the author using AI.]()

Here are 3 options to handle it:

1.  **Separate using AI for exploration from reporting presented to leadership.**

Give people freedom to explore data with AI, find trends, brainstorm together, and make low-stakes internal decisions. But require validation by the data team for anything presented to leadership, especially when it involves high-stakes or budget decisions. Their review helps catch mistakes and makes sure the numbers can be trusted.

**2\. Build guardrails to make self-service analytics safe.**

What you can do, if not already done, is to build and maintain a clear data dictionary so everyone uses the same definitions for metrics, and the next time they are in the same room, they talk about the same thing when referring to “Churn”, “Conversion”, or “Engagement”.

**3\. Ensure marketers and analysts partner together.**

Analysts should attend marketing calls regularly to stay in the know about what is happening in marketing — latest strategy changes, new campaign launches, budget adjustments — so they can explain the changes in numbers. At the same time, marketers need to understand the data before running any analysis. If a marketer cannot explain how the metric is defined, they are not ready to share the insights. What works is having regular office hours for marketers to ask questions and validate their hypotheses.

### **Final Thoughts**

Data belongs to everyone now.

**For Marketers**, this is a call to improve your skills. Prompt engineering alone isn’t enough. You need data literacy; you need to learn how to spot when something is off or too good to be true.

**For Analysts**, this is a call to let go. You can’t check every piece of data that goes out. Your value now comes from designing a framework that makes self-service analytics safe.

In the age of AI, the data itself is not particularly valuable; what matters is that you can trust the data and the insights derived from it.

Thank you a lot for reading the article to the end. If you like what you’ve read and would like to stay in touch, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/ilonahetsevich/).