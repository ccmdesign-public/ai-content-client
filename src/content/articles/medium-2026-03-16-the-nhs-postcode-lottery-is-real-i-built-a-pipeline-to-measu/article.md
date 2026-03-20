---
title: "The NHS Postcode Lottery Is Real. I Built a Pipeline to Measure It."
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/the-nhs-postcode-lottery-is-real-i-built-a-pipeline-to-measure-it-04b343f7953e?source=rss----98111c9905da---4"
publishedAt: "2026-03-16"
tags:
  - "ai-general"
  - "data-pipeline"
  - "data-science"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-16T16:37:52.616Z"
---

# The NHS Postcode Lottery Is Real. I Built a Pipeline to Measure It.

![]()

# The NHS Postcode Lottery Is Real. I Built a Pipeline to Measure It.

## *387,162 people are waiting over a year for treatment. Where you live determines how long you wait.*

[Yusuf Ismail](https://medium.com/@yusufismail_91982?source=post_page---byline--04b343f7953e---------------------------------------)

7 min read·1 day ago

\--

Somewhere in England right now, two people are waiting for the same dermatology appointment.

One of them is a patient at Blackpool Teaching Hospitals. Their trust sees 97.3% of dermatology patients within 18 weeks. They will probably be seen soon.

The other is a patient at Salisbury NHS Foundation Trust. Their trust sees 15.8% of dermatology patients within 18 weeks.

Same condition. Same country. Same NHS. 81.5 percentage points apart.

That gap is not a rounding error. It is not a data anomaly. It is the postcode lottery, and I built a data pipeline to measure it.

## The Target Nobody Is Hitting

The NHS has a statutory target: 92% of patients should begin treatment within 18 weeks of referral. It has held this target since 2012.

As of May 2025, the national compliance rate is **59.9%**.

Not in one region. Not in one specialty. Nationally. Across England. Against a 92% target.

*This analysis covers the March–May 2025 RTT statistical releases published by NHS England, covering 140+ NHS trusts and 18 treatment specialties.*

That means roughly 4 in 10 patients are already outside the standard before they have even started treatment. And while the total number of incomplete pathways is slowly falling, the number of people waiting over a year is doing the opposite.

![Source: NHS England RTT Waiting Times Statistics, March–May 2025]()

![Source: NHS England RTT Waiting Times Statistics, March–May 2025 | Analysis: Yusuf Ismail]()

Why does this matter? Because waiting lists are not experienced nationally. They are experienced locally. For a patient, the NHS is not a national statistic. It is the trust that serves their postcode. And the data shows that where you live shapes your experience of that wait far more than the national numbers suggest.

The waiting list is shrinking. The crisis inside it is growing. In two months, 33,686 more people crossed the one-year mark.

## How I Found This

The NHS England RTT Waiting Times Statistics are published monthly, provider-level and commissioner-level Excel files, each with multi-row headers, week-band columns running from 0–1 weeks through 104+, and enough formatting quirks to make a data engineer wince.

I built a Bronze → Silver → Gold medallion pipeline to process them properly.

**Bronze** ingests the raw Excel files and preserves them exactly as received , no cleaning, no coercion, just Parquet and lineage columns. Every row knows where it came from and when it was loaded.

**Silver** standardises everything: column names to snake\_case, Unicode dashes cleaned, types enforced, artefact rows dropped. The kind of work that is invisible when it is done well and catastrophic when it is skipped.

**Gold** answers the business questions: total incomplete pathways, 18-week compliance, long waits at 52, 65 and 78 weeks, estimated median and P92 wait per trust per specialty. One script per question. One output per month. A history table that grows automatically each time new data arrives.

The initial run of the pipeline processed three months of data across 140+ NHS trusts and 18 treatment specialties across England. Adding a new month is one file drop and one pipeline run.

The pipeline is on GitHub: [github.com/YusufIsmailayo/nhs-rtt-incomplete-pathways-pipeline](https://github.com/YusufIsmailayo/nhs-rtt-incomplete-pathways-pipeline)

## Finding 1: The Specialties Nobody Is Watching

When people talk about NHS waiting lists, they usually talk about orthopaedics or cancer. But the data tells a different story about which specialties are carrying the most year-long waiters.

**Top specialties by 52w+ waits (May 2025):**

![Source: NHS England RTT Waiting Times Statistics, May 2025]()

![Source: NHS England RTT Waiting Times Statistics, May 2025 | Analysis: Yusuf Ismail]()

ENT is the worst performing specialty in England by volume of year-long waits, and barely half of ENT patients are seen within 18 weeks. 28,377 people waiting over a year for a condition affecting their hearing, their breathing, their voice.

Gynaecology at 17,978 long waits means tens of thousands of women waiting over a year for conditions that affect their daily lives, their fertility, their pain levels. That is not a statistic that should sit quietly in a spreadsheet.

## Finding 2: The Trusts at the Bottom

Performance varies significantly between trusts. The data makes that visible.

## Get Yusuf Ismail’s stories in your inbox

 from this writer.

Remember me for faster sign in

**Lowest 18w compliance by trust (May 2025):**

![Source: NHS England RTT Waiting Times Statistics, May 2025]()

The Robert Jones and Agnes Hunt is a specialist orthopaedic hospital, the kind of trust that should, in theory, be doing one thing very well. Less than half of their patients are seen within 18 weeks.

Mid and South Essex stands out for a different reason: they appear in both the worst compliance list and the worst long-waits list. 48.5% compliance and 10,273 people waiting over a year. That is a trust under sustained, systemic pressure across multiple dimensions at once.

## Finding 3: The Postcode Lottery

This is the finding that stayed with me longest.

When I ran the compliance gap analysis: best trust versus worst trust for the same specialty, the numbers were not what I expected. I expected gaps. I did not expect gaps this wide.

**Widest compliance gaps by specialty (May 2025):**

![NHS England RTT Waiting Times Statistics, May 2025]()

Rheumatology: Portsmouth at 99.8%, Hillingdon at 22.6%. If you have rheumatoid arthritis in Portsmouth, you are almost certainly seen within 18 weeks. If you have the same condition in Hillingdon, the data suggests you probably are not.

This is not about clinical quality. This is about capacity, resource allocation, geography, history. The data cannot tell you why the gap exists. But it can tell you the gap is there, and it can tell you exactly how big it is.

81.5 percentage points. In the same country. In the same year.

## Finding 4: Who Is Getting Worse

The direction of travel matters as much as the snapshot.

Between March and May 2025, these trusts added the most new year-long waiters:

![Source: NHS England RTT Waiting Times Statistics, March–May 2025]()

Mid and South Essex again. 1,307 more people crossing the one-year mark in two months, on top of the 10,273 already there.

What is notable about this list is that it includes some of the largest trusts in England. Barts Health is the biggest NHS trust by turnover. University Hospitals Birmingham serves one of the most deprived populations in the country. These are not small district generals struggling quietly. These are major teaching hospitals moving in the wrong direction.

Across the top 10 deteriorating trusts, not a single one showed improvement.

## What the Data Cannot Tell You

I want to be careful here.

A pipeline can show you that Mid and South Essex has 10,273 people waiting over a year. It cannot tell you why. It cannot tell you whether the trust is underfunded, understaffed, badly managed, or simply serving a population with unusually high need. It cannot account for the trusts that absorbed patients from other areas, or the specialties that had a particularly difficult winter.

The data shows inequality of outcome. It does not explain the cause.

What it does do — clearly, reproducibly, at scale — is make the problem visible.

## The Technical Bit (For Those Who Want It)

The pipeline handles some genuine data engineering challenges:

**Two-row Excel headers:** the RTT files use merged headers across rows 12 and 13. A single `header=` value gives you garbage. The fix is `header=[12, 13]` with MultiIndex flattening, extracting the real column name from the second level and discarding the group label from the first.

**105 week-band columns:** each row contains pathway counts for every weekly band from `>0–1` through `>104+`.
Computing 18-week compliance means summing bands where the lower bound is < 18.
Computing 52w+ means summing bands ≥ 52.
Getting the median and P92 means building a weighted cumulative distribution across all 105 bands per row.

**Snapshot architecture:** each monthly file is processed into its own Gold Parquet, then combined into a history table. Adding a new month is one file drop and one pipeline run. The history table grows automatically.

**Summary row filtering:** the Excel files include national and regional total rows alongside trust-level rows. Filtering these out correctly is what separates a clean analysis from a double-counted one.

Full pipeline, all 6 scripts, README with architecture diagram: 👉 [github.com/YusufIsmailayo/nhs-rtt-incomplete-pathways-pipeline](https://github.com/YusufIsmailayo/nhs-rtt-incomplete-pathways-pipeline)

## Closing

The NHS publishes this data every month, but most of it remains buried inside spreadsheets that few people open.

A pipeline that turns those files into something queryable does more than automate reporting; it makes the system visible. And once the data becomes visible, the conversation about waiting times can no longer rely on anecdotes alone.

387,162 people are waiting over a year. The number is rising. The gap between best and worst is 81.5 points wide.

That is not a rounding error.

*If this was useful, the first article in this series covers a 226-million record NHS outpatient attendance pipeline:* [*I Processed 226 Million NHS Patient Records. Here’s What I Found.*](https://medium.com/@yusufismail_91982/i-processed-226-million-nhs-patient-records-heres-what-i-found-c35455d3c5f1)

*Data source: NHS England RTT Waiting Times Statistics, March–May 2025.* *All analysis code available on GitHub under open licence.*