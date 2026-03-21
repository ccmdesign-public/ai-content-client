---
title: "Lightning Streams: PySpark Batch & Streaming Queries"
author: "Select From"
platform: "medium"
publicationName: "Select From"
url: "https://selectfrom.dev/lightning-streams-pyspark-batch-streaming-queries-f13fc6a68cb6?source=rss----415fa49cac1b---4"
publishedAt: "2023-09-26"
tags:
  - "analytics"
  - "data-pipeline"
  - "data-science"
  - "engineering"
  - "python"
categories:
  - "Data & Analytics"
  - "Programming"
tagsNormalizedAt: "2026-03-21T16:30:39.349Z"
---

# Lightning Streams: PySpark Batch & Streaming Queries

#### Loading NOAA GOES Lightning Weather Data.

![Photo by NOAA on Unsplash](https://cdn-images-1.medium.com/max/1024/0*B7MzHgzgXZnuWylw)

### **Introduction**

In this post, I show an implementations of Apache Spark™ processing engine using pyspark, the Python API. The first set of pyspark processing queries will be defined on the geospatial component of the [NOAA GOES lightning mapper dataset](https://www.goes-r.gov/spacesegment/glm.html) and the second pyspark query, a structured streaming data frame will be defined on the flash energy discharges.

*I have two different types of queries both defined with PySpark methods: using Spark query builder format I can method chain read, write, and transformation operations that get translated intelligently with Spark’s lazy evaluation engine and executed in a distributed fault-tolerant and fast manner.*

This accompanying project for this post is built on top of a previous ETL pipeline I built with Python libraries such as pandas and orchestrated with Dagster’s materialized data asset:

[Modern Data Platform Orchestration with Dagster Software-Defined Assets](https://blog.devgenius.io/modern-data-platform-orchestration-with-dagster-software-defined-assets-6a7182b0d834)

I discuss the integration of pyspark in the “Load” step of the ETL function, although pyspark is an extremely versatile unified analytics framework and can be fully integrated end-to-end in all the processing steps ranging from data ingestion to machine learning.

Below is the link to the Github repo:

[GitHub - BayoAdejare/lightning-streams](https://github.com/BayoAdejare/lightning-streams)

**Objectives:**

-   Define Spark query processes using pyspark.
-   Test the PySpark integration.
-   Orchestrate the process using Dagster’s data assets.

### **Integrating Spark Query Processing**

![Dagster, PySpark & Parquet](https://cdn-images-1.medium.com/max/917/1*6zL7sfAh3o-SY-2aQaljBw.png)

I provide a brief overview of the ETL pipeline. It is composed of three main data assets: the input **source**, the **transformation**, and the destination **sink**. The source assets are where the downloads of the GLM netCDF files from the AWS S3 bucket are handled. The transformation asset handles converting the netCDF files into a dataset of time series and geospatial data in CSV format. The sink data asset loads data from csv files into the local duckdb, OLAP persistent storage, this “load to sink” asset is where the Spark integration will be added. For the integration, I am refactoring the existing sink data asset from DuckDB/SQL methods and statements to PySpark functions and processing queries.

```
# latitude data framelat_sdf = spark.read.format('csv') \            .load("*.lat.csv", header=True, inferSchema=True) \            .withColumnRenamed("ts_date", "timestamp") \            .show()# longitude data framelon_sdf = spark.read.format('csv') \               .load("*.lon.csv", header=True, inferSchema=True) \               .withColumnRenamed("ts_date", "timestamp") \               .show()
```

The above code snippet displays the main idea for the first set of PySpark queries as a chain of SQL-like operations, that includes data reads, writes, and transformations. Spark intelligently executes the query in a fast manner and handles worker scale-out distribution.

```
# structured streaming flash energyenergy_sdf = spark.readStream.schema(energySchema) \            .option("maxFilesPerTrigger", 1) \            .format("csv") \            .load("*.ene.csv", header=True, inferSchema=True) \            .withColumnRenamed("ts_date", "timestamp") \            .writeStream.format('console') \            .trigger(processingTime="15 seconds") \            .outputMode('append') \            .start()
```

The above code snippet is the main definition of the second query, it is a PySpark structured streaming query. The query is defined similarly to its batch processing counterpart, this aids in development i.e. less context switch and simpler debugging. Other than the streaming configurations options and dataset, the main difference between the definitions of the batch query above and the streaming query below is the required (not optional) specification of the schema beforehand. However, with Spark’s intelligent query processing, there could be large differences in Spark’s actual physical execution plans for both types of queries.

### Unit Testing the Integration

I am using pytest to start building and automating the testing suite. I start by adding two tests for the PySpark unit test code. In the first pytest test, I am checking assertion on the schema for the structured streaming query function. In the second unit test, I am validating that the mocked PySpark data frames are equal. Both test, schema, and data frame, are using the assertion methods from the PySpark testing utility.

### Orchestrating Data Assets

For the orchestration, I am using Dagster’s software-defined asset to materialize the PySpark data processing assets. Essentially, the first PySpark function will input the latitude and longitude datasets joined together and transform the data frame into an output parquet format. For the second PySpark function, the structured streaming query output is also in parquet format.

### **Conclusion**

Here, I have shown code refactoring that successfully integrates Spark. The implementation defines functions and tests using PySpark and materializes the process by Dagster. Although this was only one step, integrating PySpark into the ETL workflow, has already yielded good benefits such as fast processing and it promises to yield more regarding scaling and reliability. As a side note, the method chaining dialect of Spark queries makes them highly readable.

**What’s Next?** Now that we have integrated PySpark in the loading part of the ETL pipeline, the next step could be to integrate it in the rest of the pipeline. This can inevitably result in an end-to-end batch/streaming ETL pipeline featuring Spark as the main process engine. Alternatively, I could also use [PySpark MLlib libraries](https://spark.apache.org/docs/latest/api/python/reference/pyspark.ml.html) in the machine learning components. For instance, in the [Clustering Analysis asset group](https://blog.devgenius.io/exploratory-data-analysis-with-lightning-clustering-pipeline-6a2bca17d0d3), I implement Sci-Kit Learn’s K-Means algorithm. For scalability, I could refactor this to utilize PySpark’s Clustering libraries. We can also go the other direction, and develop a CI/CD pipeline layer with the possible addition of containerization and configurations including automated tests. Either route chosen, because of its extensibility and versatility PySpark would be a main and indispensable component.

### **References**

-   [Spark Structured Streaming Guide](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)
-   [Dagster software-defined assets docs](https://docs.dagster.io/concepts/assets/software-defined-assets)
-   [Testing PySpark](https://spark.apache.org/docs/latest/api/python/getting_started/testing_pyspark.html)

*Apache Spark, Spark and the Spark logo are* [*trademarks*](https://www.apache.org/foundation/marks/) *of the* [*Apache Software Foundation (ASF)*](https://www.apache.org), all others are of their respective owners.

***Thanks*** *for reading! If you want to get in touch with me, feel free to reach me on my* [*LinkedIn Profile*](https://www.linkedin.com/in/bayo-adejare/)*. You can also view some code in my* [*GitHub*](https://github.com/BayoAdejare)*.*

* * *

[Lightning Streams: PySpark Batch & Streaming Queries](https://selectfrom.dev/lightning-streams-pyspark-batch-streaming-queries-f13fc6a68cb6) was originally published in [SelectFrom](https://selectfrom.dev) on Medium, where people are continuing the conversation by highlighting and responding to this story.