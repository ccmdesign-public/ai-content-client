---
metadata:
  videoId: "zvmtHZSt8es"
  title: "Build an AI Agent knowledge base using SQL (BigQuery + Gemini)"
  description: "GCP credit →https://goo.gle/handson-ep2-lab1

    Codelab & source code →https://goo.gle/scholar

    ML in BigQuery → https://goo.gle/3O5squw


    Did you know you can call a Gemini model directly from a SQL query in BigQuery?


    In this hands-on codelab, Ayo and Annie do exactly that, and use it to solve a real problem: converting messy, unstructured text into clean, structured data at scale.\ 


    This is Episode 1 of our multi-part series where we build a fully functional, data-aware AI agent on Google Cloud.\ 


    🛠️ *What we cover:*

    * Loading raw text files from Cloud Storage as BigQuery external tables

    * Using BQML.GENERATE_TEXT to send prompts to Gemini inside SQL\ 

    * Parsing and structuring LLM output using JSON functions in BigQuery

    * Building a clean, queryable dataset ready for downstream AI pipelines This pattern is incredibly powerful for any team sitting on a mountain of unstructured documents, and wanting to make them queryable without a heavy ETL pipeline.\ 


    Chapters:

    0:00 - Intro

    1:44 - Claim GCP credit

    2:40 - Data project overview

    4:31 - Project set up

    15:00 - ELT extraction loading transform intro

    18:09 - Loading data

    26:24 - BigQuery external table

    33:52 [BQML] ML Generate In BigQuery


    Watch more Hand on AI → https://goo.gle/HowToWithGemini\ 

    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    #Gemini #GoogleCloud


    Speakers: Ayo Adedeji, Annie Wang

    Products Mentioned: Gemini, BigQuery"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT49M7S"
  publishedAt: "2026-03-28T16:00:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/zvmtHZSt8es/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=zvmtHZSt8es"
processedAt: "2026-03-28T17:59:50.365Z"
source: "youtube"
tldr: "Google Cloud's Annie and Mayo demonstrate an ETL pipeline using Google Cloud Storage, BigQuery, and Gemini 2.5 Flash. They transform unstructured text files into structured JSON data via BigQuery external tables and the ML.GENERATE_TEXT command. This allows complex SQL analytics on raw text in milliseconds without duplicating data, setting the stage for a RAG agent."
tools:
  - name: "BigQuery"
    url: null
  - name: "Google Cloud Storage"
    url: null
  - name: "Gemini 2.5 Flash"
    url: null
  - name: "Google Cloud Shell"
    url: null
  - name: "Cloud Run"
    url: null
  - name: "Cloud Build"
    url: null
  - name: "Cloud SQL"
    url: null
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "DevOps & Infrastructure"
tags:
  - "data-pipeline"
  - "gcp"
  - "gemini"
ai:
  provider: "notebooklm"
  model: "notebooklm"
  apiCalls: 1
  fallbackAttempts: 0
  processingTimeMs: 47265
tagsNormalizedAt: "2026-03-28T18:08:32.973Z"
---

## Key Takeaways

Here are the most important takeaways from this Google Cloud tutorial:

* **BigQuery External Tables** act as virtual pointers to data in **Google Cloud Storage** (GCS), enabling direct analysis without copying massive files or creating data governance issues.

* The **ETL pipeline** leverages the **Gemini 2.5 Flash** model directly within BigQuery via the **ML.GENERATE_TEXT** command to transform unstructured text files into structured **JSON** objects.

* By using the **PARSE_JSON** function, developers can normalize AI-generated JSON outputs to extract specific keys and create clean subtables for targeted analysis.

* Converting unstructured text into relational databases allows users to run complex **SQL queries** in milliseconds, bypassing the token limits and latency of standard LLM prompting.

* **Google Cloud Shell** provides a remote, persistent virtual machine with a built-in editor, streamlining the process of configuring environments and deploying images to **Cloud Run**.

## Summary

In the first episode of this two-part Google Cloud Tech series, hosts Annie and Mayo walk through building the foundation of an AI Agent knowledge base. They focus heavily on the Extract, Transform, and Load (ETL) process, demonstrating how to seamlessly convert unstructured text data into structured, queryable formats using **Google Cloud Storage** (GCS), **BigQuery**, and **Gemini**.

### Setting Up the Google Cloud Environment

The tutorial begins by provisioning a fresh Google Cloud project and leveraging **Google Cloud Shell**. Cloud Shell acts as a persistent, remote virtual machine equipped with a VS Code-like editor, making it an ideal environment for running terminal commands without local setup.

The hosts clone two repositories: one containing starter code for the data engineering tasks, and another containing an image for the "boss dungeon," which is deployed to **Cloud Run** via **Cloud Build** for a gamified exercise. Crucially, they enable essential APIs—including BigQuery, Cloud Storage, and AI Platform—and assign necessary Identity and Access Management (IAM) roles to their service accounts to ensure all services can securely communicate.

### Extraction and Loading: BigQuery External Tables

The core data problem addressed in this lab is how to handle unstructured data, such as PDFs or text logs, sitting in cloud storage. The hosts use a gamified example of unstructured "battle reports" detailing fictional fights between adventurers and monsters.

Instead of copying massive amounts of file data directly into a database, which incurs high costs and creates data governance issues, the hosts create a **BigQuery External Table**.

* This external table acts as a virtual pointer to the files stored in a GCS bucket.

* It dynamically updates: if new text files are dropped into the GCS bucket, the BigQuery external table instantly reflects the new rows upon the next query.

* This allows developers to query and manipulate the raw text of the files directly from the BigQuery console without actually moving the underlying files.

### Transformation: Prompting Gemini via SQL

Once the raw text is accessible in BigQuery, the next step is transforming it into a structured format. To achieve this, the hosts establish a connection between BigQuery and the **Gemini 2.5 Flash** model.

Using the built-in BigQuery function **ML.GENERATE_TEXT**, they execute an AI prompt directly within a SQL query. The prompt instructs Gemini to read the raw battle report text and extract specific entities—such as monster details, adventurer classes, and battle outcomes—into a strictly formatted **JSON** object.

Because the AI processes each row in parallel, the execution takes only a few seconds. The resulting output is a new BigQuery table where the unstructured text has been successfully converted into structured JSON payloads.

### Normalizing and Analyzing Structured Data

The raw JSON generated by Gemini includes extraneous metadata, such as token counts and execution times. To clean the data, the hosts use BigQuery's **PARSE_JSON** command.

They extract specific keys from the AI-generated JSON to create clean, normalized subtables for monsters, adventurers, and battles. With the data properly structured, they demonstrate the massive advantage of this ETL pipeline by asking a complex strategic question: "For each adventurer, what is the name of the most powerful monster by hit points they successfully defeated, and how long did it take?"

Instead of feeding documents one-by-one into an LLM and hoping it maintains context, they execute a standard SQL JOIN across their new subtables. The query processes the structured data and returns the exact answer in roughly 300 milliseconds.

### Preparing for Semantic Search and RAG

While transforming unstructured text into structured SQL tables unlocks powerful analytical capabilities, it cannot answer semantic questions like "Which monsters have fire capabilities?"

To address questions requiring deep contextual reasoning, the hosts tease the second part of the series. The upcoming lab will transition from BigQuery to **Cloud SQL** to explore semantic search, chunking, and embeddings, ultimately culminating in a complete Retrieval-Augmented Generation (RAG) pipeline.

## Context

Unstructured data—such as PDFs, emails, and raw text logs—accounts for the vast majority of enterprise data, yet it remains notoriously difficult to analyze at scale. Traditionally, extracting insights from these files required complex, brittle parsing scripts or expensive manual data entry. This tutorial highlights a massive shift in data engineering: using Large Language Models natively within data warehouses to seamlessly transform unstructured text into structured, queryable databases. By bridging Google Cloud Storage, BigQuery, and Gemini, developers and data scientists can build highly scalable ETL pipelines without moving data or managing complex integrations. This approach matters immensely for organizations looking to unlock the value of their unstructured archives, allowing them to apply rapid, traditional SQL analytics to qualitative text. Data engineers, AI developers, and cloud architects should care about these techniques, as integrating native AI functions directly into SQL queries represents the future of streamlined data processing.