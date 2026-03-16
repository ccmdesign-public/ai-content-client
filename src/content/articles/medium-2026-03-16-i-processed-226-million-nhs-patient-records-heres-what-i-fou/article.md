---
title: "I Processed 226 Million NHS Patient Records. Here’s What I Found"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/i-processed-226-million-nhs-patient-records-heres-what-i-found-c35455d3c5f1?source=rss----98111c9905da---4"
publishedAt: "2026-03-16"
tags:
  - "ai-general"
  - "data-pipeline"
  - "data-science"
  - "python"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-16T16:37:52.616Z"
---

# I Processed 226 Million NHS Patient Records. Here’s What I Found

# I Processed 226 Million NHS Patient Records. Here’s What I Found

## Building the infrastructure to understand what the data actually says and what it quietly hides

[Yusuf Ismail](https://medium.com/@yusufismail_91982?source=post_page---byline--c35455d3c5f1---------------------------------------)

6 min read·Feb 27, 2026

\--

A few weeks ago, I opened an NHS dataset and hit a wall almost immediately.

The file was there. The data existed. But raw data is never just data; it’s chaos with a spreadsheet attached. Column names inconsistent. Headers buried on row 13. Age band labels encoded with en-dashes that *look* like hyphens but aren’t. The kind of thing that fails silently, gives you wrong numbers, and lets you publish them confidently before you notice.

Here is what that looks like in practice. NHS Excel files use Unicode en-dashes (–) in age band column names like “75–79”. They look identical to hyphens. Python treats them as completely different characters. If you don’t handle them explicitly, your column names break silently, no error, just wrong output:

```
# NHS Excel files use en-dashes (\u2013), not plain hyphens# This breaks column names silently — no error, just wrong outputdf.columns = (    df.columns    .str.strip()    .str.lower()    .str.replace("\u2013", "_", regex=False)  # en-dash    .str.replace("\u2014", "_", regex=False)  # em-dash    .str.replace("\u2212", "_", regex=False)  # minus sign    .str.replace(r"[^a-z0-9_]", "_", regex=True))
```

Three characters. All are visually identical to a hyphen. All are capable of silently corrupting your analysis.

I’d been here before. With NHS dental data. With GP record transfers. With housing transactions.

Every time, the story isn’t just in what the numbers say. It’s in what you have to do before you can trust them.

So I built a pipeline.

![Source: Image by the author]()

## Why Raw Data Is Not Analysis

The NHS publishes its outpatient attendance figures publicly. Millions of rows. Every specialty. Every age group. A snapshot of who is showing up to hospitals across England, and in what volumes.

Most people download it and open Excel.

That isn’t wrong. But it isn’t infrastructure either.

If you run a pivot table on raw NHS data, you get an answer for today. If the source file changes next quarter, a renamed column, a new age band, or a different sheet name, your analysis breaks, and you have to rebuild it manually.

I wanted something reproducible. Something that could be trusted, extended, and handed to someone else without a ten-minute explanation.

So I built a **Bronze → Silver → Gold** medallion pipeline. It’s a pattern used in production data engineering, NHS analytical teams, local government, and financial institutions. Three layers. Each with a single job.

**Bronze** preserves. Copy the raw file exactly as received. Touch nothing. This is your forensic copy, the thing you return to when something breaks downstream. No cleaning. No renaming. No opinions.

**Silver** standardises. Clean the column names. Enforce data types. Handle the encoding quirks (those silent en-dashes). Add lineage, which file this came from, and when it was processed. Silver asks one question: *Can this data be trusted and reused consistently?*

**Gold** answers questions. From Silver, I produced three outputs: attendances by speciality, attendances by age band, and a Pareto analysis of speciality contribution. Each Gold script reads from Silver, produces one output, and writes one Parquet file. Fully independent of each other.

If NHS England publishes next quarter’s data tomorrow, I run five commands and get the same quality of output for the new data. Every transformation is in code. Every rule is explicit. Every output is reproducible.

That is the difference between analysis and infrastructure.

![Source: Image by the author]()

## What 226 Million Records Actually Show

The grand total from the 2024/25 outpatient attendance dataset:

**226,450,306 attendances.**

Over two hundred and twenty-six million times, someone showed up to an NHS outpatient appointment in a single financial year.

The breakdown is where it gets interesting.

**The 75–79 age group had the highest attendance of any single age band** -over 20 million attendances. Not “the elderly” as a vague category. Specifically, people in their late seventies. They are, by volume, the single biggest consumers of NHS outpatient services.

Compare that to children under one year old: 2.4 million. Teenagers — 15, 16, 17, 18 — each sitting around 1.1 to 1.5 million. The slope from youth to old age is steep, consistent, and entirely predictable. And yet the implications for service planning are rarely framed that directly.

## Get Yusuf Ismail’s stories in your inbox

 from this writer.

Remember me for faster sign in

**Allied Health Professional** is the second largest speciality by volume — 13.6 million attendances. Physiotherapy. Occupational therapy. Speech and language therapy. The specialities most likely to appear on a waiting list, most likely to be cut when budgets tighten, and most likely to be described as “non-urgent” by people who have never needed them urgently.

Nearly 14 million appointments. Every single year.

**Ophthalmology**: 9.7 million. Eyesight. Something people lose gradually, quietly, until the damage is irreversible.

**Trauma and Orthopaedics**: 7.9 million. Hips, knees, spines. The machinery of movement is wearing out across an ageing population.

Then there is the Pareto table -the output I found most revealing.

![Source: Image by the author]()

The **top 15 specialities account for 85% of all outpatient activity**. The remaining 75 specialities share the other 15%.

This is not a balanced system. It is a system under enormous concentrated pressure in a small number of clinical areas. When those areas buckle -when Allied Health or Ophthalmology wait times grow, the effect is not marginal. It touches millions of people directly.

## What the Data Can’t Tell You

This is where I want to be careful.

Attendance figures tell you who showed up. They don’t tell you who was referred and never seen. They don’t tell you about the appointment that was offered, cancelled, and never rebooked. They don’t tell you about the person who stopped chasing.

I wrote about this problem before -with NHS dental data, and with GP record transfers after my son was born. The gap between what gets measured and what actually happened to people is one of the most consequential things in healthcare analytics.

226 million attendances is a real number. But it is a floor, not a ceiling.

The people not in this dataset are the ones the system couldn’t reach, didn’t count, or chose not to measure. Understanding the data properly means understanding its edges- what it captures, and what quietly falls through.

## What This Is Building Towards

This is the first of two NHS data engineering projects I’m building publicly.

The second is currently in progress; processes NHS RTT Incomplete Pathways data. Referral to Treatment. The waiting list numbers. The ones that make the headlines and drive the political arguments and rarely get explained clearly.

That pipeline will use the same medallion architecture. Different dataset. Different Gold outputs. Different business questions.

Together, they form the foundation of a data engineering portfolio built entirely on real NHS data, with real architecture, real documentation, and real reproducibility.

## A Note on How This Was Actually Built

This pipeline was not built in a straight line.

It was built across two machines, across several weeks, with duplicate notebooks, scattered scripts, and more than one afternoon lost to “which version was I working on?”

That is the real experience of building data projects outside of a structured team. The architecture document looks clean. The Git history tells a neater story than the reality.

What matters is that it is finished, documented, reproducible, and honest about what it can and cannot tell you.

That, in the end, is what good data engineering looks like. Not perfect first attempts.

Defensible final outputs.

## The Code

The full pipeline is open source:

[**github.com/YusufIsmailayo/nhs-patient-flow-data-pipeline**](https://github.com/YusufIsmailayo/nhs-patient-flow-data-pipeline)

It includes the architecture documentation, a full data dictionary explaining every column, and all five pipeline scripts. If you work in NHS analytics, public health data, or are building your own portfolio on real datasets — feel free to use it, fork it, or reach out.

The data is public. The infrastructure should be too.

*Yusuf Ismail is a Data Engineer focused on public services and healthcare data. He writes about what the numbers look like when you go looking for them and what they look like when you find them.*