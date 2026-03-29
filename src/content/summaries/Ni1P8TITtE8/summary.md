---
metadata:
  videoId: "Ni1P8TITtE8"
  title: "How to Build a production-ready RAG AI agent"
  description: "GCP credit →https://goo.gle/handson-ep2-lab2

    Codelab & source code → https://goo.gle/scholar

    Try Google ADK → https://goo.gle/4bPEHej


    In this episode, Ayo and Annie go from structured data to a fully deployed, data-aware RAG agent, and we cover a LOT of ground. Starting where they left off from last episode (BigQuery + BQML.GENERATE_TEXT), the duo now wire up the full backend for an AI agent: a vector database, an embedding pipeline, a RAG retrieval system, and a production ready Cloud Run deployment.\ 


    🛠️ *What we build:*

    * Cloud SQL for PostgreSQL with pgvector for semantic search\ 

    * A containerized Apache Beam pipeline on Dataflow to batch-process text and generate Gemini embeddings\ 

    * A RAG retrieval layer that lets the agent query vectorized knowledge\ 

    * An ADK based agent that answers questions using that knowledge\ 

    * A Cloud Run deployment with proper security and scalability settings\ 


    This is hands-on, infrastructure-meets AI content. you'll leave with a real, working pattern you can adapt for your own projects.\ 


    Chapters:

    0:00 - Intro

    1:41 - (RAG) Retrieval Augmented Generation and chunking

    4:40 - Data project overview

    4:52 - Similarity search

    6:40 - RAG in BigQuery

    11:56 - [BQML] ML Generate in Big Query

    19:46 - OLAP & OLTP

    24:21 - AI in CloudSQL\ 

    28:38 - Index using HNSW

    31:29 - Scaling with data pipeline

    36:46 - Apache Beam

    53:02 - RAG agent With CloudSQL

    1:09:52 - Flight the BOSS with A2A


    More resources:

    AI in CloudSQL→  https://goo.gle/4uRlm5v

    Apache Beam → https://goo.gle/3O6OJzY

    ADK Sample → https://goo.gle/4rQKWVn


    Watch more Hand on AI → https://goo.gle/HowToWithGemini\ 

    🔔 Subscribe to Google Cloud Tech → https://goo.gle/GoogleCloudTech


    #Gemini #GoogleCloud


    Speakers: Ayo Adedeji, Annie Wang

    Products Mentioned: Agent Development Kit, Dataflow"
  channel: "Google Cloud Tech"
  channelId: "UCJS9pqu9BzkAMNTmzNMNhvg"
  duration: "PT1H13M43S"
  publishedAt: "2026-03-28T19:00:00Z"
  thumbnailUrl: "https://i.ytimg.com/vi/Ni1P8TITtE8/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=Ni1P8TITtE8"
processedAt: "2026-03-29T00:00:37.164Z"
source: "youtube"
tldr: "Google Cloud Tech's hands-on lab demonstrates building a production-ready Retrieval-Augmented Generation (RAG) agent using BigQuery for analytical workloads and Cloud SQL for low-latency transactional search. Hosts Annie and Ayo show how to automate chunking and vector embeddings using Apache Beam and Cloud Dataflow, optimize searches with HNSW indexing, and deploy scalable agents via Cloud Run."
tools:
  - name: "BigQuery"
    url: null
  - name: "Cloud SQL"
    url: null
  - name: "Apache Beam"
    url: null
  - name: "Cloud Dataflow"
    url: null
  - name: "Cloud Run"
    url: null
  - name: "Agent Development Kit"
    url: null
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "DevOps & Infrastructure"
tags:
  - "agents"
  - "data-pipeline"
  - "gcp"
  - "rag"
ai:
  provider: "notebooklm"
  model: "notebooklm"
  apiCalls: 1
  fallbackAttempts: 0
  processingTimeMs: 75148
tagsNormalizedAt: "2026-03-29T00:01:12.432Z"
---

## Key Takeaways

Here are the most critical strategies for building production-ready RAG agents on Google Cloud.

* **Retrieval-Augmented Generation** solves AI hallucinations by grounding models with a specialized vector database, utilizing semantic similarity rather than relying on pre-trained knowledge.

* Applying **Recursive Chunking** ensures documents are split into meaningful semantic boundaries before embedding, preventing the dilution of the information's context.

* Transitioning from **BigQuery** (OLAP) to **Cloud SQL** (OLTP) is crucial for achieving the real-time, low-latency performance required by customer-facing AI agents.

* Implementing an **HNSW Index** in PostgreSQL categorizes vectors, significantly accelerating similarity search execution times from 1.4 seconds down to 0.2 seconds.

* Automating the embedding process using **Apache Beam** and **Cloud Dataflow** allows developers to scale ingestion pipelines seamlessly for both continuous streaming and batch processing.

* The **Agent Development Kit (ADK)** enables robust local testing, while deploying via **Cloud Run** facilitates complex Agent-to-Agent (A2A) communication across boundaries.

## Summary

The video presented by Google Cloud Tech hosts Annie and Ayo details a comprehensive, hands-on lab for building a production-ready Retrieval-Augmented Generation system.
Retrieval-Augmented Generation serves as a critical mechanism to solve artificial intelligence hallucinations by grounding large language models in a specialized, external knowledge base.
Instead of relying solely on a model's pre-trained knowledge, developers can retrieve specific, updated business data to augment the model's responses.
This architecture ensures that agents provide highly accurate and contextually relevant answers based on proprietary enterprise information.

### Chunking and Vector Embeddings

The foundational step in preparing unstructured data for a vector database involves a structured process known as chunking.
Encoding an entire lengthy document at once severely dilutes the semantic meaning of its contents.
To retain contextual accuracy and retrieval precision, large documents must be broken down into meaningful, localized blocks.
The lab specifically utilizes recursive chunking, which splits the input data along strict boundaries, such as periods, to create discrete semantic units.
Once the raw text is successfully chunked, Google Cloud's text embedding models, such as the text embedding 005 model, convert these segments into mathematical representations.
These multi-dimensional embeddings map the text into exactly 768 dimensions, effectively creating a semantic fingerprint of the original unstructured data.
While this specific lab uses text-only models, the hosts also highlight the newer Gemini multimodal embedding models that can simultaneously process audio, video, and images.

### Similarity Search and Distance Metrics

With the enterprise data properly embedded into a vector space, the AI system can perform highly accurate similarity searches against incoming user queries.
When a user asks a question, that specific query is instantly embedded into the exact same 768-dimensional space as the database contents.
The system then uses nearest neighbor matching algorithms to find the stored information that most closely aligns with the user's intent.
The Google Cloud engineers strongly recommend using cosine distance rather than Euclidean distance for this retrieval process.
Cosine distance effectively measures the angle of similarity between two distinct vectors.
This approach focuses entirely on contextual relevance and semantic meaning rather than being skewed by the physical magnitude or the raw length of the stored documents.

### Transitioning to Cloud SQL for Real-Time Performance

While Google BigQuery is highly effective for analytical processing and managing massive unstructured datasets, it is not optimized for real-time application layers.
BigQuery represents an OLAP (Online Analytical Processing) stream, where complex analytical workloads might legitimately take multiple seconds to compute.
For live, user-facing applications like digital customer service agents, developers must utilize an OLTP (Online Transactional Processing) database architecture like Cloud SQL.
Cloud SQL consistently delivers the low-latency, real-time results that are strictly required for immediate conversational feedback.
To natively handle vector embeddings in Cloud SQL, the developers enable the specialized pgvector extension within the PostgreSQL environment.
Furthermore, they proactively implement an HNSW (Hierarchical Navigable Small World) index to drastically optimize the similarity search process.
Instead of performing an inefficient brute-force search across the entire vector database, the HNSW index mathematically pre-categorizes the vectors.
During the live lab demonstration, implementing this precise indexing strategy reduced the similarity search execution time from 1.4 seconds down to an impressive 0.2 seconds.

### Automating Pipelines with Dataflow

Manually generating embeddings for every single new piece of data is completely unscalable in a modern production environment.
To solve this enterprise bottleneck, the hosts demonstrate how to fully automate the entire data ingestion and transformation pipeline using Apache Beam and Cloud Dataflow.
Cloud Dataflow actively manages the virtual machines that automatically extract text, process the chunking logic, generate new embeddings, and write the final vectors directly into the Cloud SQL database.
This robust architecture seamlessly supports both continuous streaming for real-time data updates and scheduled batch processing for less frequent administrative changes.
The underlying system automatically scales the necessary worker nodes based entirely on the incoming data volume to maximize cost efficiency.
The hosts also demonstrate vital error handling, showing developers how to bypass temporary region resource exhaustion by dynamically switching cloud regions.

### Agent Deployment and A2A Communication

The final stage of the complex lab involves securely connecting the optimized Cloud SQL database to an autonomous AI agent utilizing the Agent Development Kit.
Developers define the autonomous agent by providing it with a Gemini large language model to act as its cognitive brain and a custom tool that specifically allows it to execute vector searches.
Before deploying the application to production, the Agent Development Kit enables developers to run interactive testing locally using either a command-line interface or a graphical web application.
Once the logic is thoroughly validated, the AI agent is deployed into a fully managed, serverless environment using Google Cloud Run.
This serverless deployment strategy facilitates the advanced Agent-to-Agent protocol, which enables distinct AI agents operating in completely different organizational departments to communicate securely.
While deploying a monolithic multi-agent team on a single localized runtime minimizes network latency, using the communication protocol across distributed Cloud Run instances offers superior enterprise scalability.

## Context

The transition from experimental artificial intelligence models to production-ready enterprise applications heavily relies on mastering Retrieval-Augmented Generation.
As large language models become widely accessible, their primary limitation remains their tendency to hallucinate and their lack of proprietary, real-time business knowledge.
This Google Cloud technical demonstration addresses a critical gap in the industry by showing how to move beyond basic API calls and build resilient, automated data ingestion pipelines.
Data engineers, backend developers, and AI systems architects should pay close attention to the architectural shift from analytical data warehouses like BigQuery to low-latency transactional databases like Cloud SQL for real-time operations.
Understanding how to optimize vector searches with HNSW indexing and automate workflows using Cloud Dataflow is essential for scaling AI tools affordably.
As companies increasingly deploy multi-agent systems across different operational departments, mastering distributed architectures and Agent-to-Agent communication protocols will become a foundational requirement for modern software infrastructure.