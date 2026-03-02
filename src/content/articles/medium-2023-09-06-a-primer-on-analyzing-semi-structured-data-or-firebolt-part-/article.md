---
title: "A primer on analyzing semi-structured data | Firebolt (part 1)"
author: "Select From"
platform: "medium"
publicationName: "Select From"
url: "https://selectfrom.dev/a-primer-on-nalyzing-semi-structured-data-firebolt-part-1-3d8c2abdcad7?source=rss----415fa49cac1b---4"
publishedAt: "2023-09-06"
tags:
  - "data-science"
categories:
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-01T21:19:30.680Z"
---

# A primer on analyzing semi-structured data | Firebolt (part 1)

# A primer on analyzing semi-structured data | Firebolt (part 1)

[Elijah Rivera](https://medium.com/@elijah.rivera?source=post_page---byline--3d8c2abdcad7---------------------------------------)

11 min read·Sep 5, 2023

\--

In today’s data-driven world, organizations are constantly generating, analyzing, and utilizing massive amounts of data to fuel their businesses. As the data landscape evolves, businesses encounter a wide range of data types, from structured to unstructured and everything in between. One such data type is [semi-structured](https://www.firebolt.io/blog/semi-structured-data-modeling) data, which holds a unique position in the data ecosystem, blending the features of both structured and unstructured data. In this introductory guide, we will explore the realm of semi-structured data, focusing on its handling and management in the context of databases.

Specifically, we will examine the [JSON format](https://www.firebolt.io/blog/json-the-sql-choosing-the-best-data-warehouse-for-semi-structured-data), a widely adopted standard for representing semi-structured data, and discuss how to harness its potential in building data applications. From ingesting and processing to visualizing the data with two popular frameworks, Streamlit and Metabase, this guide will provide you with the fundamental knowledge necessary to handle semi-structured data effectively.

‍

## Parts

> ***Overture****: The dataset, setup, and loading data into Firebolt*
> 
> ***Sonata****: Analyzing the raw data*
> 
> ***Minuet****: Array manipulation in SQL, including Lambda functions and flattening data*
> 
> ***Allegro****: Visualizing data with Streamlit & Metabase*
> 
> ***Finale****: Conclusions*

‍

## Overture

## The dataset

In this blog post, we will explore some of the key JSON and array functions available in SQL, including Lambda functions, and how to use them to manipulate semi-structured data. For this, we will leverage [the New York Philharmonic dataset](https://www.kaggle.com/datasets/nyphil/perf-history?select=raw_nyc_phil.json) containing all their concerts since the Philharmonic’s first concert at the Apollo Room conducted by Ureli Corelli Hil on December 7, 1842.

The dataset spans over 175 years of performance history, covering 11.000 unique works and 20.000 performances. The full dataset, when flattened, has over 800.000 rows.

Which composers are most popular? Have there been any trends in popularity by a conductor or by season? How many concerts were performed each year? We will answer all these questions and more using JSON and array functions.

![]()

Apollo Rooms venue on the left. The first page of the Philharmonic’s first concert is on the right.

## Setup

Our tech quartet is composed of the following:

-   Storage: [S3](https://aws.amazon.com/s3/) — Object storage on AWS
-   Database: [Firebolt](https://firebolt.io) — Cloud Data Warehouse for data apps
-   Visualization 1: [Streamlit](https://streamlit.io/) — Python-based framework for front-end visualization
-   Visualization 2: [Metabase](https://www.metabase.com/) — Open-source visualization tool

![]()

The raw JSON file, “raw\_nyc\_phil.json”, is loaded into AWS S3. This file is accessed from the Firebolt data warehouse in the form of an external table, “ex\_nyc\_phil”, to enable direct querying. This data can be ingested “as-is” or flattened to the “nyc\_phil” table in Firebolt to be analyzed and visualized.

## Loading data into Firebolt

Step 1a: Upload to S3. Since there is only one input file and no preprocessing is needed, we will use the AWS management console to upload [the JSON file](https://www.kaggle.com/datasets/nyphil/perf-history?select=raw_nyc_phil.json) to our bucket.

![]()

‍

Step 1b: Create a database and a C2 general-purpose engine in Firebolt for this demo. Firebolt provides various types of granular engine sizes to address various workloads. A C2 engine with 4 vCPU, and 8GB RAM is more than sufficient for this exercise.

![]()

‍

Step 2: Create an external table pointing to the file we just uploaded to S3.

```
CREATE EXTERNAL TABLE ex_nyc_phil (  raw_data TEXT)URL = 's3://<your_bucket>/'OBJECT_PATTERN = '*.json'TYPE = (JSON PARSE_AS_TEXT = 'TRUE');
```

Here’s a breakdown of the syntax:

1.  Define the table as **external**. External tables serve as connectors to your data sources (in this case, S3). External tables contain **no data**.
2.  **URL** and **OBJECT\_PATTERN** specify the S3 location and the file naming pattern
3.  **TYPE** specifies the file type Firebolt expects to ingest given the OBJECT\_PATTERN.
4.  **PARSE\_AS\_TEXT**: If **True**, Firebolt wraps the entire JSON object literal into a single column of **TYPE TEXT**. If **False**, we must map each key in a JSON object literal to a column in the table definition.

Step 3. We can either: a) ingest the data as is (one-single field containing the JSON object) in a Firebolt-managed table or b) transform the raw\_data using array and JSON functions before inserting it into a Firebolt-managed table. We will go with option b).

## Sonata: Analyzing the raw data

First, let’s ensure we can read the input data via the external table we just defined:

```
SELECT raw_data FROM ex_nyc_phil;
```

![]()

‍

[The schema](https://www.kaggle.com/datasets/nyphil/perf-history?select=raw_nyc_phil.json) of the JSON object looks like this:

```
{  "programs":[     {        "season":"1842-43",        "orchestra":"New York Philharmonic",        "concerts":[           {              "Date":"1843-02-18T05:00:00Z",              "eventType":"Subscription Season",              "Venue":"Apollo Rooms",              "Location":"Manhattan, NY",              "Time":"8:00PM"           }        ],        "programID":"5178",        "works":[           {              "workTitle":"I PURITANI",              "composerName":"Bellini, Vincenzo",              "conductorName":"Hill, Ureli Corelli",              "ID":"8838*2",              "soloists":[                 {                    "soloistName":"Otto, Antoinette",                    "soloistRoles":"S",                    "soloistInstrument":"Soprano"                 }              ],              "movement":"Elvira (aria): \"Qui la voce...Vien, diletto\""           }        ]     }  ]}
```

At the top level, we have an *array of programs*. Each program has multiple attributes:

![]()

## Minuet

## Array manipulations in SQL, including Lambda functions

Moving on to the next part of our play, we want to extract the top element: **programs**. To accomplish this, we will leverage the [JSON\_EXTRACT\_ARRAY\_RAW](https://docs.firebolt.io/sql-reference/functions-reference/json-extract-array-raw.html) function:

**JSON\_EXTRACT\_ARRAY\_RAW(, ‘<json\_pointer\_expression>’)**

```
SELECT JSON_EXTRACT_ARRAY_RAW(raw_data,'programs') AS programs_arrays  FROM ex_nyc_phil;
```

![]()

Next, we will answer some questions about the data using ARRAY functions

### How many programs has the Philharmonic played?

To find out, we can use the [**LENGTH**](https://docs.firebolt.io/sql-reference/functions-reference/length.html#length) function:

```
SELECT LENGTH(JSON_EXTRACT_ARRAY_RAW(raw_data,'programs')) AS programs_arrays FROM ex_nyc_phil;
```

![]()

Let’s now convert the above array to a standard tabular format, having each program on a separate line. To do this, we will need to use the [**UNNEST**](https://docs.firebolt.io/working-with-semi-structured-data/working-with-arrays.html#unnest) clause:

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil)SELECT programFROM programs     UNNEST(programs_arrays AS program);
```

![]()

If we perform a COUNT(\*) in the outer SELECT, we expect to see the same number of rows (13954) matching the LENGTH() of the array from above.

### What time do the concerts usually start?

The first step is to extract the “Time” attribute from the “concerts” array.

We’ll begin by extracting the *concerts* array using the JSON\_EXTRACT\_ARRAY\_RAW function and UNNEST it — similar to the *programs* array above.

## Get Elijah Rivera’s stories in your inbox

 from this writer.

We will extract the Date, eventType, Season, Venue,

Location, and Time for each concert using the JSON\_EXTRACT function.

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), concerts AS (    SELECT JSON_EXTRACT_ARRAY_RAW(program, 'concerts') as concerts_arrays    FROM programs         UNNEST(programs_arrays AS program))SELECT     JSON_EXTRACT(concert, 'Date', 'TEXT')::timestamptz as concert_date,    JSON_EXTRACT(concert, 'eventType', 'TEXT') as concert_event_type,    JSON_EXTRACT(concert, 'Venue', 'TEXT') as concert_venue,    JSON_EXTRACT(concert, 'Location', 'TEXT') as concert_location,    JSON_EXTRACT(concert, 'Time', 'TEXT') as concert_timeFROM concerts     UNNEST(concerts_arrays AS concert);
```

![]()

Back to our questions (What time do concerts usually start):

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), concerts AS (    SELECT JSON_EXTRACT_ARRAY_RAW(program, 'concerts') as concerts_arrays    FROM programs         UNNEST(programs_arrays AS program))SELECT     JSON_EXTRACT(concert, 'Time', 'TEXT') as concert_time,    count(*)FROM concerts     UNNEST(concerts_arrays AS concert)GROUP BY ALLORDER BY count(*) DESC;
```

![]()

8:00 and 8:30 pm are the most frequent options. Oddly enough, there were four times when the concert time was between 2:00 AM and 3:00 AM

![]()

### Most popular venue?

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), concerts AS (    SELECT JSON_EXTRACT_ARRAY_RAW(program, 'concerts') as concerts_arrays    FROM programs         UNNEST(programs_arrays AS program))SELECT     JSON_EXTRACT(concert, 'Venue', 'TEXT') as concert_venue,    count(*)FROM concerts     UNNEST(concerts_arrays AS concert)GROUP BY ALLORDER BY count(*) DESC;
```

![]()

### Which composers are most popular?

Similarly, we need to access the works array now instead of the concerts array.

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), works AS (    SELECT JSON_EXTRACT_ARRAY_RAW(program, 'works') as works_array    FROM programs         UNNEST(programs_arrays AS program))SELECT     JSON_EXTRACT(work, 'composerName', 'TEXT') as composer_name,    count(*)FROM works     UNNEST(works_array AS work)GROUP BY ALLORDER BY count(*) DESC;
```

![]()

### Extract all conductors’ names per season into an array.

We can either:

-   [UNNEST](https://docs.firebolt.io/sql-reference/functions-reference/array-agg.html), extract the composer name, and [ARRAY\_AGG/NEST](https://docs.firebolt.io/sql-reference/functions-reference/array-agg.html) back
-   Use [TRANSFORM](https://docs.firebolt.io/sql-reference/functions-reference/transform.html) Lambda Function.

Let’s explore both options.

Option A: [UNNEST](https://docs.firebolt.io/sql-reference/functions-reference/array-agg.html), extract the composer name, and [ARRAY\_AGG/NEST](https://docs.firebolt.io/sql-reference/functions-reference/array-agg.html) back.

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), works AS (    SELECT         JSON_EXTRACT(program, 'season', 'TEXT') AS season,        JSON_EXTRACT_ARRAY_RAW(program, 'works') as works_array    FROM programs         UNNEST(programs_arrays AS program))SELECT     season,    JSON_EXTRACT(work, 'composerName', 'TEXT') as composer_nameFROM works     UNNEST(works_array AS work)
```

![]()

Continuing on, we will group by season, and nest (into an array) the composers. Lastly, we will remove any duplicate names using the [ARRAY\_DISTINCT](https://docs.firebolt.io/sql-reference/functions-reference/array-distinct.html) function. We can optionally return the number of unique values in an array using the [ARRAY\_UNIQ](https://docs.firebolt.io/sql-reference/functions-reference/array-uniq.html) function.

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), works AS (    SELECT         JSON_EXTRACT(program, 'season', 'TEXT') AS season,        JSON_EXTRACT_ARRAY_RAW(program, 'works') as works_array    FROM programs         UNNEST(programs_arrays AS program))SELECT     season,    ARRAY_DISTINCT(NEST(JSON_EXTRACT(work, 'composerName', 'TEXT'))) as composer_names,    ARRAY_UNIQ(NEST(JSON_EXTRACT(work, 'composerName', 'TEXT'))) as composer_numberFROM works     UNNEST(works_array AS work)GROUP BY ALLORDER BY season
```

![]()

Option B: Use [TRANSFORM](https://docs.firebolt.io/sql-reference/functions-reference/transform.html) Lambda Function

TRANSFORM applies a function to each element of an array. Therefore, we don’t need to UNNEST anymore in the FROM clause. We can directly work with the array and extract the composer name in the SELECT clause.

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), works AS (    SELECT         JSON_EXTRACT(program, 'season', 'TEXT') AS season,        JSON_EXTRACT_ARRAY_RAW(program, 'works') as works_array    FROM programs         UNNEST(programs_arrays AS program))SELECT     season,    ARRAY_DISTINCT(NEST(JSON_EXTRACT(work, 'composerName', 'TEXT'))) as composer_names,    ARRAY_UNIQ(NEST(JSON_EXTRACT(work, 'composerName', 'TEXT'))) as composer_numberFROM works     UNNEST(works_array AS work)GROUP BY ALLORDER BY season
```

![]()

‍

Similarly to Option A, we can apply ARRAY\_DISTINCT and ARRAY\_UNIQ. Please note the above query doesn’t contain the GROUP BY clause. If you need to obtain one row per season, you will need to GROUP BY season, and [FLATTEN](https://docs.firebolt.io/sql-reference/functions-reference/flatten.html)( [NEST()](https://docs.firebolt.io/sql-reference/functions-reference/array-agg.html)) the composer\_name column before applying ARRAY\_DISTINCT and ARRAY\_UNIQ.

![]()

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), works AS (    SELECT         JSON_EXTRACT(program, 'season', 'TEXT') AS season,        JSON_EXTRACT_ARRAY_RAW(program, 'works') as works_array    FROM programs         UNNEST(programs_arrays AS program))SELECT     season,    ARRAY_DISTINCT(NEST(JSON_EXTRACT(work, 'composerName', 'TEXT'))) as composer_names,    ARRAY_UNIQ(NEST(JSON_EXTRACT(work, 'composerName', 'TEXT'))) as composer_numberFROM works     UNNEST(works_array AS work)GROUP BY ALLORDER BY season
```

Lambda functions can be chained together and become extremely powerful when applying changes iteratively to each element of the array. In the above case, we can apply another transformation and replace all the letters from each composer’s last name with asterisks except the first one.

```
WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), works AS (    SELECT         JSON_EXTRACT(program, 'season', 'TEXT') AS season,        JSON_EXTRACT_ARRAY_RAW(program, 'works') as works_array    FROM programs         UNNEST(programs_arrays AS program))SELECT     season,    TRANSFORM(x -> REGEXP_REPLACE(JSON_EXTRACT(x, 'composerName', 'TEXT'),'([A-Za-z])[a-z]+,\\s(.+)', '\\1***\,\\2'), works_array) as composer_nameFROM works
```

![]()

‍

If you are still wrapping your head around how Lambda functions work or are applied, you can take a look at this [blog post](https://www.firebolt.io/blog/sql-thinking-in-lambdas) that covers Lambda functions in depth.

### Identify the works which were played at piano

To find out which works were played at piano, we have to extract the instruments from the soloists’ array. We will wrap the extraction of the soloists’ array into a view.

View definition:

```
CREATE VIEW soloists AS WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), works AS (    SELECT         JSON_EXTRACT(program, 'season', 'TEXT') AS season,        JSON_EXTRACT_ARRAY_RAW(program, 'works') as works_array    FROM programs         UNNEST(programs_arrays AS program))SELECT     season,    JSON_EXTRACT(work, 'workTitle', 'TEXT') AS work_title,    JSON_EXTRACT_ARRAY_RAW(work, 'soloists') AS soloists_arrayFROM works     UNNEST (works_array AS work)
```

Query to extract the soloists’ details:

```
SELECT     season,    work_title,    soloists_array,    TRANSFORM(x -> JSON_EXTRACT(x, 'soloistName', 'TEXT'), soloists_array) as solist_names,    TRANSFORM(x -> JSON_EXTRACT(x, 'soloistRoles', 'TEXT'), soloists_array) as soloist_role,    TRANSFORM(x -> JSON_EXTRACT(x, 'soloistInstrument', 'TEXT'), soloists_array) as soloist_instrumentsFROM soloists
```

![]()

To find out the works played at Piano, we can leverage the [CONTAINS](https://docs.firebolt.io/sql-reference/functions-reference/contains.html) array function that returns a boolean if it’s a match or not.

```
WITH soloists_data AS (SELECT     season,    work_title,    soloists_array,    TRANSFORM(x -> JSON_EXTRACT(x, 'soloistName', 'TEXT'), soloists_array) as solist_names,    TRANSFORM(x -> JSON_EXTRACT(x, 'soloistRoles', 'TEXT'), soloists_array) as soloist_role,    TRANSFORM(x -> JSON_EXTRACT(x, 'soloistInstrument', 'TEXT'), soloists_array) as soloist_instrumentsFROM soloists)SELECT * FROM soloists_dataWHERE CONTAINS(soloist_instruments,'Piano')
```

![]()

### Sort the soloists’ names for each work by their instruments

To answer this question, we can reuse the view and CTE from above. We will turn our attention to a different array function: [ARRAY\_SORT](https://docs.firebolt.io/sql-reference/functions-reference/array-sort.html), which can take two arrays as input and sort one by the values in the other.

Given the following entry:

soloist\_names: Otto, Boulard, Munson, Mayer

soloist\_instruments: Soprano, Alto, Tenor, Bass

It will resort the soloist\_names array based on soloist\_instruments values, as such: Boulard, Mayer, Otto, Munson

```
WITH soloists_data AS (SELECT     season,    work_title,    soloists_array,    TRANSFORM(x -> JSON_EXTRACT(x, 'soloistName', 'TEXT'), soloists_array) as solist_names,    TRANSFORM(x -> JSON_EXTRACT(x, 'soloistRoles', 'TEXT'), soloists_array) as soloist_role,    TRANSFORM(x -> JSON_EXTRACT(x, 'soloistInstrument', 'TEXT'), soloists_array) as soloist_instrumentsFROM soloists)SELECT     solist_names,    soloist_instruments,    ARRAY_SORT(x, y -> y, solist_names, soloist_instruments) soloist_names_sorted_by_instrumentsFROM soloists_data
```

![]()

Firebolt supports a wide range of array and lambda functions similar to the above ones, that you can check by following this link to [our docs](https://docs.firebolt.io/sql-reference/functions-reference/#array-functions).

![]()

## Flattening data

Next, we’ll tackle ingestion. We will apply the same concepts from above to UNNEST all the arrays, starting with , and continuing to , and , and finally, UNNEST the *‘* arrays within works.

Finally, we will wrap the SELECT query and create a CTAS (create table as select):

```
CREATE TABLE nyc_phil AS WITH programs AS (    SELECT JSON_EXTRACT_ARRAY_RAW(raw_data, 'programs') AS programs_arrays     FROM ex_nyc_phil), concerts_works AS (    SELECT         JSON_EXTRACT(program, 'season', 'TEXT') AS season,        JSON_EXTRACT(program, 'orchestra', 'TEXT') AS orchestra,        JSON_EXTRACT_ARRAY_RAW(program, 'concerts') as concerts_array,        JSON_EXTRACT(program, 'programID', 'TEXT') as program_id,        JSON_EXTRACT_ARRAY_RAW(program, 'works') as works_array    FROM programs         UNNEST(programs_arrays AS program)), concerts_works_soloists AS (    SELECT         season,        orchestra,        JSON_EXTRACT(concert, 'Date', 'TEXT')::timestamptz as concert_date,        JSON_EXTRACT(concert, 'eventType', 'TEXT') as concert_event_type,        JSON_EXTRACT(concert, 'Venue', 'TEXT') as concert_venue,        JSON_EXTRACT(concert, 'Location', 'TEXT') as concert_location,        JSON_EXTRACT(concert, 'Time', 'TEXT') as concert_time,        program_id,        JSON_EXTRACT(work, 'workTitle', 'TEXT') as work_title,        JSON_EXTRACT(work, 'ID', 'TEXT') as work_id,        JSON_EXTRACT(work, 'conductorName', 'TEXT') as conduct_name,        JSON_EXTRACT(work, 'composerName', 'TEXT') as composer_name,        CASE WHEN JSON_EXTRACT_ARRAY_RAW(work, 'soloists') = [] THEN ['No soloists'] ELSE JSON_EXTRACT_ARRAY_RAW(work, 'soloists') END as soloists_array -- replacing empty entries where there are no soloists            FROM concerts_works        UNNEST (concerts_array as concert)        UNNEST (works_array as work))SELECT    season,    orchestra,    concert_date,    concert_event_type,    concert_venue,    concert_location,    concert_time,    program_id,    work_title,    work_id,    conduct_name,    composer_name,    JSON_EXTRACT(soloist, 'soloistName', 'TEXT') as soloist_name,    JSON_EXTRACT(soloist, 'soloistRoles', 'TEXT') as soloist_roles,    JSON_EXTRACT(soloist, 'soloistInstrument', 'TEXT') as soloist_instrumentFROM concerts_works_soloists    UNNEST (soloists_array AS soloist)
```

![]()

SELECT \* FROM nyc\_phil

![]()

So far, we have covered loading and analyzing semi-structured data with various JSON and Array functions. In Part 2, we’ll analyze and visualize the data using Streamlit and Metabase. On to [Part 2](https://www.firebolt.io/blog/a-primer-on-analyzing-semi-structured-data-part-2)!

*Originally published at* [*https://www.firebolt.io*](https://www.firebolt.io/blog/a-primer-on-analyzing-semi-structured-data-part-1)*.*