---
title: "When a Simple ML Pipeline Meets Real Platform Constraints"
author: "Learning Data"
platform: "medium"
publicationName: "Learning Data"
url: "https://medium.com/learning-data/when-a-simple-ml-pipeline-meets-real-platform-constraints-c8fb4d31f105?source=rss----eec44e936bf1---4"
publishedAt: "2026-03-19"
tags:
  - "architecture"
  - "data-science"
  - "education"
  - "machine-learning"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-19T14:28:28.250Z"
---

# When a Simple ML Pipeline Meets Real Platform Constraints

# When a Simple ML Pipeline Meets Real Platform Constraints

[Subhasis Das](/@subhasisd2002?source=post_page---byline--c8fb4d31f105---------------------------------------)

3 min read·Just now

\--

Building Machine Learning Models often looks clean in tutorials. Data flows neatly, Models train smoothly, and Results appear instantly. Reality is rarely that Cooperative.

![A Visual Summary]()

During the **Databricks 14 Days AI Challenge — Advanced**, the goal was to build an End-to-End Pipeline: from Raw E-Commerce Events to a Production-Ready Prediction System. The Scope covered Data Engineering, Feature Engineering, Model Training, Experiment Tracking, and Inference. What made the exercise particularly valuable was not just the pipeline itself, but the practical issues that surfaced along the way.

### The First Roadblock: Storage Restrictions

The Free Workspace Environment did not allow enabling the **Public DBFS Root**, which meant traditional paths could not be used for Delta tables.

The Solution was to move the entire Workflow to **Unity Catalog Volumes**:

```
/Volumes/workspace/ecom/ecom_data/
```

This allowed storing Datasets, Checkpoints, and Model Artifacts in a governed storage layer. In real-world systems, similar adjustments often occur when teams move from Open File Systems to governed data platforms.

### Streaming isn’t always Streaming

While simulating structured Streaming, the Pipeline produced an Error related to Unsupported Triggers. Serverless Clusters do not allow Continuous Triggers.

The Workaround was switching to a Supported Trigger Mode:

```
query = stream_df.writeStream \    .format("delta") \    .trigger(availableNow=True) \    .start("/Volumes/workspace/ecom/ecom_data/stream_output")
```

In Production Pipelines, this pattern is actually common. Many Organizations run **Micro-Batch Streaming** rather than fully continuous Streams for Stability and Cost Control.

### MLflow and the Hidden Storage Requirement

When logging the trained model, MLflow raised an error requiring a Unity Catalog path.

The Solution was specifying a Temporary Directory within the Volume:

```
mlflow.spark.log_model(    spark_model=model,    artifact_path="purchase_prediction_model",    dfs_tmpdir="/Volumes/workspace/ecom/ecom_data/mlflow_tmp")
```

This reflects a broader principle in real platforms: **Model Artifacts must Comply with Platform Governance and Storage Policies**.

### A Subtle Spark ML Quirk

Extracting Prediction Probabilities initially failed: INVALID\_EXTRACT\_BASE\_FIELD\_TYPE

Spark Stores Probabilities as **VectorUDT**, not Arrays. The Correct Approach required Converting the Vector:

```
from pyspark.ml.functions import vector_to_array
```

```
predictions_final = predictions.select(    "user_id",    vector_to_array("probability")[1].alias("purchase_probability"),    "prediction")
```

Understanding such details is essential when building Scalable ML Pipelines on Distributed Frameworks.

### When Scale Pushes Back

Training the Recommendation Model triggered a **Model Size Overflow** due to extremely Large User and Product IDs.

Instead of forcing the Model to process the entire dataset, the Solution was to train on a focused subset:

```
top_users = interaction_df.groupBy("user_id") \    .count() \    .orderBy("count", ascending=False) \    .limit(50000)
```

This is a Practical Compromise often used in Production Systems where Memory Constraints must be respected.

## Lessons Beyond the Challenge

![Visual Summary]()

What began as a Structured Learning Exercise gradually resembled a Real Engineering Project. Each issue required adapting the Pipeline to the Platform’s onstraints rather than forcing a textbook Implementation.

In Real-World Environments, similar Challenges appear constantly: Storage Policies, Compute Restrictions, Scaling Limits, and Framework Quirks. The difference between a Prototype and a Production System often lies in how well these Constraints are handled.

By the end of the Challenge, the Pipeline evolved into a Complete Workflow: Ingesting Data, Engineering Features, Training Models, Logging Experiments, and Generating Predictions.

More importantly, it demonstrated a crucial truth about Modern Data Systems.

Building Models is only half the work.

Making them run reliably within real infrastructure is where the real engineering begins.

*The contents of external submissions are not necessarily reflective of the opinions or work of* [*Maven Analytics*](http://mavenanalytics.io) *or any of its team members.*

*We believe in fostering lifelong learning and our intent is to provide a platform for the data community to share their work and seek feedback from the Maven Analytics data fam.*

[*Submit your own writing here*](/learning-data/how-to-get-your-work-published-by-learning-data-with-maven-analytics-7df21e466a3e?sk=020dfac485597d602e218968d9ffb395) *if you’d like to become a contributor.*

*Happy learning!*

*\-Team Maven*