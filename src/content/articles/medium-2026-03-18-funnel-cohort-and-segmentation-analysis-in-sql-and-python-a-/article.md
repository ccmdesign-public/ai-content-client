---
title: "Funnel, Cohort & Segmentation Analysis in SQL and Python: A Product Analytics Case Study"
author: "Python in Plain English"
platform: "medium"
publicationName: "Python in Plain English"
url: "https://python.plainenglish.io/funnel-cohort-segmentation-analysis-in-sql-and-python-a-product-analytics-case-study-34f3cde77ae8?source=rss----78073def27b8---4"
publishedAt: "2026-03-18"
tags:
  - "education"
  - "python"
  - "sql"
categories:
  - "Data & Analytics"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-21T16:30:39.353Z"
---

# Funnel, Cohort & Segmentation Analysis in SQL and Python: A Product Analytics Case Study

![](https://cdn-images-1.medium.com/max/1024/1*8JSv8tjKXhT3EyEjTk6Crw.png)

Every e-commerce platform bleeds users between browsing and buying. But where exactly?

I took 320,000 user events — visits, views, cart additions, checkouts, and purchases — and ran them through SQL to answer a question every product team asks but rarely quantifies: at which step are we losing the most customers, and why?

What I found was a 5-stage funnel where nearly 75% of users never make it past browsing — and the reasons vary dramatically by device, traffic source, and region.

Here is the link to the [dataset](https://www.kaggle.com/datasets/yashch05/user-event-funnel-and-retention-analytics-dataset).

Here is the link to my [GitHub](https://github.com/devika-santhosh/ecommerce-product-analytics-sql.git) for the complete code.

#### Step 1: Data Profiling & Validation (Python)

-   Load CSV, check shape (320K rows, 12 columns)
-   Check nulls, duplicates, and data types
-   Understand event type distribution
-   Validate date range, category consistency

![](https://cdn-images-1.medium.com/max/627/1*6J7Rpg2e79tWhHzcuKsx1w.png)

There are total of 3200000 entries in the data, and among that only null values exist for price, which is around 198180.

Before diving into the nulls, I wanted to check which category has more null values.
df.groupby(‘event\_type’)\[‘price’\].apply(lambda x:x.isnull().sum())

![](https://cdn-images-1.medium.com/max/830/1*vGWuvcTvSBoNOh8okW106g.png)

Price only appears when a product enters the cart. This is normal e-commerce event logging behavior.

Takeaway: Data is clean, price is NULL for browse events (expected behavior).

#### Step 2: Data Loading (SQL)

-   Create a table schema in MySQL
-   Import CSV into the database
-   Verify row counts and data types post-load

#### Step 3: Exploratory Analysis (SQL)

The following questions were addressed while doing EDA.

Q1: Overall Event Distribution
 — How many total events and unique users exist for each event type?

Q2: Monthly User Activity
 — How many unique users are active each month?

Q3: Sessions Per User
 — What is the average number of sessions per user? (total sessions / total unique users)

Q4: Traffic Source Split
 — How many unique users come from each traffic source? What % of the total does each represent?

Q5: Device Split
 — How many unique users are on Mobile vs Web? What % of the total does each represent?

Q6: Average Order Value (AOV) by Category
 — What is the average purchase value for each product category? (only for purchase events)

#### Step 4: Funnel Analysis (SQL)

*What does Funnel Analysis mean?*

![](https://cdn-images-1.medium.com/max/1024/1*kv9jlMXPDa4KN4GAT_e9Yw.png)

Let’s review all the key questions that need to be addressed to fully understand the funnel in this dataset.

Q1: Basic Funnel — Unique Users at Each Stage
 — How many unique users reached each stage? (visit → view → add\_to\_cart → checkout → purchase)
 — Order them in funnel sequence, not by count

Q2: Stage-wise Drop-off Rate
 — What % of users moved from one stage to the next?
 — What % dropped off at each stage?

Q3: Overall Conversion Rate
 — What % of users who visited actually ended up purchasing?

Q4: Funnel by Device
 — Compare the funnel for Mobile vs Web users
 — Which device has a better conversion rate at each stage?

Q5: Funnel by Traffic Source
 — Compare the funnel across Organic, Ads, Email, and Referral
 — Which source brings the highest-converting users?

#### Step 5: Cohort Retention Analysis (SQL)

*What does cohort mean?*

A cohort is a group of users who share a common characteristic or behaviour used for analysis

![](https://cdn-images-1.medium.com/max/1024/1*qK7cKyUEbk3IwARdMKms7A.png)

Q1: Define Cohorts
 — For each user, find their first purchase month — this is their cohort
 — How many users belong to each monthly cohort?

Q2: Monthly Activity After First Purchase
 — For each user, calculate how many months after their first purchase they were active again
 — Example: first purchase in Jan, next activity in Mar → month\_diff = 2

Q3: Cohort Retention Table
 — Build a retention grid:
 — Rows = cohort month (Jan, Feb, Mar…)
 — Columns = Month 0, Month 1, Month 2…
 — Values = number of users retained (or % of cohort)

Q4: Retention Rate
 — Convert the raw counts into percentages — what % of each cohort is still active in Month 1, Month 2, etc.

#### Step 6: Segmentation & Deep Dives (SQL)

Q1: Revenue by Category
 — What is the total revenue and total orders for each category?
 — Which category generates the most revenue vs most orders? (Are they the same?)
Q2: Revenue by Traffic Source
 — What is the total revenue and AOV (average order value) per traffic source?
 — Which source brings the highest-value customers?

Q3: Revenue by Device
 — Total revenue, total orders, and AOV for Mobile vs Web
 — Which device generates more revenue per order?

Q4: Time-of-Day Purchase Patterns
 — Group purchases by hour of the day (0–23)
 — At what hours do most purchases happen? (Peak buying time)

Q5: Country-Level Performance
 — Total revenue, total orders, and AOV per country
 — Which country has the highest AOV? (Might differ from the highest total revenue)

#### Step 7: Visualization (Python)

-   Funnel bar chart

![](https://cdn-images-1.medium.com/max/1024/1*Ah2d9NSlJQGonTxjfpLeSQ.png)

-   Cohort retention heatmap

![](https://cdn-images-1.medium.com/max/1024/1*_jhQionK4SsqGYjAYUM7mg.png)

-   Conversion comparison charts

![](https://cdn-images-1.medium.com/max/1024/1*zoz11fGsCn_YBeW0_Br-kw.png)

#### Step 8: Business Recommendations

The dataset is synthetic, with an unusually high 88% conversion rate and evenly distributed segments. In a real-world scenario, we’d expect 1–3% conversion and significant variation across channels.

However, the goal of this project is to demonstrate the analytical framework — the same SQL queries and methodology apply directly to production data with real variance.

What I would investigate and recommend if this were real data:

**1\. Funnel Optimization**

The biggest absolute drop-off is at add\_to\_cart → checkout and checkout → purchase. In practice, I’d suggest testing different versions of the checkout process — like cutting down the number of form fields, letting people buy as guests without creating an account, and adding signs that show the site is safe and trustworthy.

**2\. Cohort Retention**

Retention from Month 0 to Month 1 drops to ~87%. While high for this dataset, in practice, I’d flag any cohort with Month-1 retention below \[X\]% and recommend targeted emails at Day 7 and Day 30 post-purchase.

**3\. Device Strategy**

If mobile shows lower conversion than web, I’d suggest reviewing the mobile checkout experience. Mobile typically has higher browse-to-cart drop-off due to smaller screens and payment friction.

**4\. Traffic Source ROI**

I’d look at average order value and conversion rates across different traffic sources, then compare customer acquisition cost with lifetime value for each channel. Based on that, I’d recommend shifting more budget to the channels that deliver the best return.

**5\. Peak Hours**

Purchase activity peaks at hours 1 AM and 5 PM. I’d recommend scheduling promotional emails and ad campaigns around these windows to maximize conversion.

SQL alone took us from 320,000 raw event rows to actionable recommendations. That’s the power of asking the right questions with the right framework.
Check out the full repo on the [link](https://github.com/devika-santhosh/ecommerce-product-analytics-sql.git).

If you’re working on similar problems or found this useful, I’d love to hear your thoughts.

I’m currently open to Data / Product Analyst roles — feel free to reach out [here](https://www.linkedin.com/in/devika-santhosh04/)!

* * *

[Funnel, Cohort & Segmentation Analysis in SQL and Python: A Product Analytics Case Study](https://python.plainenglish.io/funnel-cohort-segmentation-analysis-in-sql-and-python-a-product-analytics-case-study-34f3cde77ae8) was originally published in [Python in Plain English](https://python.plainenglish.io) on Medium, where people are continuing the conversation by highlighting and responding to this story.