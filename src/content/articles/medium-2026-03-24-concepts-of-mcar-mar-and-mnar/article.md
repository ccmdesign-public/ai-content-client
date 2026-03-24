---
title: "Concepts of MCAR, MAR and MNAR"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/concepts-of-mcar-mar-and-mnar-c1ec8012516b?source=rss----b680b860beb1---4"
publishedAt: "2026-03-24"
tags:
  - "analytics"
  - "data-pipeline"
  - "data-science"
  - "machine-learning"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-24T23:02:00.502Z"
---

# Concepts of MCAR, MAR and MNAR

![](https://cdn-images-1.medium.com/max/1024/1*Ok7fJ635-JMxD3-NskqHQg@2x.jpeg)

### Intro: The Missing Data Theory

Quite a number of obstacles are in the way of the data scientist whose biggest question is: “How do I extract Value from this data?” One of the big ugly frogs this data scientist has to deal with is the good ol’ missing data problem. For the most part, many data scientists default to simple missing data handling methods like mean imputation, median imputation, listwise deletion etc.( or maybe just save themselves the hassle by using algorithms that handle missing values internally e.g. XGBoost). But blindly relying on these shortcuts can be statistically risky and can end up affecting the quality of your analysis. For example, one can distort the relationship between variables, introduce bias, or reduce the statistical power of your dataset if you gamble with your choice of how to handle missing values. You might get a “working model” but lose valuable insights along the way.

*“right? so what are you saying?”*

Part of the job as a data scientist involves really knowing the characteristics of the organisational/business data you’re trying to get value from -and yes that involves **understanding the reason for missingness**. Sometimes data is missing completely at random, sometimes it’s related to other observed variables, and sometimes it’s missing for reasons we can’t see. Clearly defining this can now help one choose the right strategy to handle it as opposed blindly picking any method and hoping for the best.

**Donald Rubin** established the theoretical framework for missing data mechanisms that is still used today: Missing Completely at Random (MCAR), Missing at Random (MAR), and Missing Not at Random (MNAR).

Long story cut short: here’s what Rubin’s framework means in practice:

-   **Missing Completely at Random (MCAR):** The missingness has nothing to do with the data itself or any other variables. It’s like a random typo in your dataset-no pattern, no bias.
-   **Missing at Random (MAR):** The missingness depends on other observed variables, but not the missing values themselves. For example, younger employees might be less likely to report income.
-   **Missing Not at Random (MNAR):** The missingness depends on the value itself that’s missing. For instance, people with very high incomes may deliberately not report them. Handling MNAR often requires specialized modelling or sensitivity analyses because naïve imputation can introduce serious bias.

For a more in depth explanation, check out [Dima from Mithridata](https://medium.com/u/61c8c9832c4d)’s article

[Types of missing data in data analysis: theoretical background](https://medium.com/data-and-beyond/types-of-missing-data-in-data-analysis-theoretical-background-8b907c1ea33a)

or [Adnan Mazraeh](https://medium.com/u/4d6bb2142c5f)’s article.

[Type of missing Data](https://medium.com/@adnan.mazraeh1993/type-of-missing-data-c52b7788da52)

*“okay, how does this apply to how I handle data?”*

### Handling Mechanisms

Even though you’re a super data scientist and mostly rely on super algorithms that natively handle missing data (e.g., XGBoost), you still need to have a comprehensive understanding of strategies to combat nothingness every now and then, and sometimes missingness itself carries signals. (so yeah, you might need this for a future analysis project).

For Example,

Consider a churn prediction model for a utility company, where your dataset includes customer income, meter readings, and interaction history.

-   **Missing income data** may indicate customers who prefer not to disclose personal financial information -a distinct subgroup in its own right.
-   **Missing meter readings** could point to service issues or disengagement.
-   **No interaction history** might suggest customers who have already churned or are close to doing so.

In this scenario, dropping rows with missing values could quietly remove the very customers most likely to churn. Similarly, blindly filling gaps with mean imputation could mask statistically relevant signals

*“girl, i get it. what do i do from here?”*

#### Diagnosing Missingness

The exploration phase should involve forming a hypothesis using domain knowledge to answer the question - “what’s the likely cause for these missing information?” Usually, a professional can formulate hypotheses using domain knowledge and explore patterns in the data with visualisations or correlation analysis. Formal frameworks like **Little’s MCAR test** can now be used to validate the hypothesis. Little’s MCAR test tells you whether MCAR is plausible - if it fails, you know you’re in MAR or MNAR territory.

#### A) Little’s MCAR Test

The test produces a Chi-square statistic, which helps determine if the assumption of data being Missing Completely At Random (MCAR) holds. The results are interpreted using the p-value: if p > 0.05, we fail to reject the assumption that the data are Missing Completely At Random (MCAR), which is desirable; if p < 0.05, the data are likely not MCAR. A key limitation of the test is its sensitivity to sample size, as it may falsely reject MCAR in large datasets.

#### B) Logistic Missingness Modelling

An alternative strategy, particularly when missing values are informative, involves using the Missing Indicator Method (MIM). In this approach, you create a binary indicator variable (1 = missing, 0 = observed) for the variable with missing data and then examine whether other variables in the dataset predict this missingness. If the predictors are significant, it shows the missingness is related to observed data and thus not MCAR.

#### C) Data Splitting

Here, you divide the dataset into two groups: one with observed values and one with missing values for the variable of interest. Then, you compare the means (or other summary statistics) of another variable across these two groups. If the means are similar, it suggests that the missingness is unrelated to the observed data, supporting the assumption of Missing Completely At Random (MCAR). Conversely, if the means differ significantly, it indicates that the missingness may depend on observed data, meaning the data are not MCAR.

Once you’ve diagnosed your mechanism, you can now actually do something about it. Here’s how the handling strategies break down per mechanism:

**MCAR**

The main concern with MCAR goes beyond having bias . The issue is that removing too many rows can effectively “bleed” your dataset of valuable observations. The options here are pretty flexible:

-   **Listwise deletion**
-   **Mean/median imputation**
-   **Algorithms that handle missingness natively** (XGBoost, LightGBM) are a perfectly reasonable call too.

**MAR**

In here, the probability of missingness depends on other observed variables. And this is where the naïve shortcuts start hurting you, as ignoring those relationships during imputation distorts your results.

The recommended approach is **Multiple Imputation by Chained Equations (MICE)**. Instead of filling each gap with one value, MICE generates several plausible versions of your dataset, runs your analysis on each, and pools the results — preserving the uncertainty that comes with imputed data. Single-value imputation methods artificially inflate your confidence in the filled values, and that false confidence quietly degrades your analysis.

Other solid options:

-   **Model-based imputation** — train a model (random forest, for example) to predict the missing values using your observed variables. It naturally captures the relationships driving the MAR pattern.
-   **Maximum likelihood estimation** — skips imputation entirely and estimates model parameters directly from the incomplete data.

**MNAR**

The missing value is linked to itself - the very thing you can’t observe - so no imputation method fully handles this.

*“so what are my options here?”*

-   **Model the missingness mechanism:** Build a separate model to predict which values are missing, then incorporate that into your main analysis. This approach is technically demanding but methodologically sound.
-   **Sensitivity analysis:** Test your results under several plausible assumptions about the missing data. If your conclusions remain consistent, confidence increases; if they shift, the instability is itself a meaningful finding to report.
-   **Treat missingness as a signal:** In some cases, the fact that a value is missing is informative. Binary missingness indicators from methods like MIM can serve as features, letting the absence convey information rather than pretending you know the missing value.
-   **Improve data collection:** Sometimes the best solution is upstream -redesign surveys, capture better proxies, or adjust data collection processes to reduce the missingness at its source.

![](https://cdn-images-1.medium.com/max/1024/1*7ZH3CxF6HoLEV92MUGRC9A.png)

*what’s the takeaway here?*

The mechanism behind your missingness determines everything: whether you can delete rows, whether you need to model relationships between variables, or whether the gap itself is the signal you should be paying attention to.

Next time you open a dataset and spot those nulls - don’t just dropna() and move on. Ask why they’re there. Is it a random system glitch? A survey question people skipped? High earners quietly opting out? That question alone puts you ahead of most people who touch the same data.

The framework is simple enough to start using today:

-   Explore the pattern of missingness before you touch it
-   Form a hypothesis using what you know about the data
-   Test it-Little’s MCAR test, logistic modelling, data splitting
-   Then and only then, pick your handling strategy

* * *

[Concepts of MCAR, MAR and MNAR](https://medium.com/data-and-beyond/concepts-of-mcar-mar-and-mnar-c1ec8012516b) was originally published in [Data And Beyond](https://medium.com/data-and-beyond) on Medium, where people are continuing the conversation by highlighting and responding to this story.