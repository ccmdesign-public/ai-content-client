---
title: "Ways To Split multiple array columns into rows in Pyspark"
author: "CodeX"
platform: "medium"
publicationName: "CodeX"
url: "https://medium.com/codex/ways-to-split-multiple-array-columns-into-rows-in-pyspark-11f16ef89295?source=rss----29038077e4c6---4"
publishedAt: "2026-01-28"
tags:
  - "education"
  - "engineering"
categories:
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-01T21:19:30.591Z"
---

# Ways To Split multiple array columns into rows in Pyspark

# Ways To Split multiple array columns into rows in Pyspark

[Aman Maheshwari](/@aman311993?source=post_page---byline--11f16ef89295---------------------------------------)

3 min read·1 day ago

\--

Listen

Share

![]()

## Split Multiple Array Columns into Rows

**explode()**:

Splits an array into multiple rows.

`explode()` creates a **new row for each element** in an array.

When an array column is passed, it generates a **new column** with array elements expanded into rows.

Each element of the array becomes **one separate row**

**Null arrays are ignored** (rows with null arrays are dropped)

**Null values inside the array are not included** in the output

Input:

```
data = [('Jaya', '20', ['SQL','Data Science']),        ('Milan', '21', ['ML','AI']),        ('Rohit', '19', ['Programming', 'DSA']),        ('Maria', '20', ['DBMS', 'Networking']),        ('Jay', '22', ['Data Analytics','ML'])]columns = ['Name', 'Age', 'Courses_enrolled']df = spark.createDataFrame(data, columns)df.display()
```

```
from pyspark.sql.functions import explodedf.select(df.Name,explode(df.Courses_enrolled)).display()
```

![]()

**There are three ways to explode an array column:**

-   explode\_outer()
-   posexplode()
-   posexplode\_outer()

**explode\_outer()**

`explode_outer()` splits the array column into **one row per array element.**

It **retains rows even when the array is null.**

**Null values are included** in the output.

Unlike `explode()`, it **does not ignore null values** present in the column.

`explode()` drops rows where the array is `null.`

**Input:**

```
data = [('Jaya', '20', ['SQL', 'Data Science']),        ('Milan', '21', ['ML', 'AI']),        ('Rohit', '19', None),        ('Maria', '20', ['DBMS', 'Networking']),        ('Jay', '22', None)]columns = ['Name', 'Age', 'Courses_enrolled']df = spark.createDataFrame(data, columns)df.display()
```

```
from pyspark.sql.functions import explode_outerdf.select(df.Name,explode_outer(df.Courses_enrolled)).display()
```

![]()

**posexplode():**

-   `posexplode()` splits the array column into **one row per array element.**
-   It **returns the position (index)** of each element in the array
-   Creates two output columns:
-   `**pos**` → position of the element in the array (0-based index)
-   `**col**` → value of the array element
-   **Null arrays are ignored** (rows with null arrays are dropped).
-   **Null values are not included** in the output.

**Input:**

```
data = [('Jaya', '20', ['SQL', 'Data Science']),        ('Milan', '21', ['ML', 'AI']),        ('Rohit', '19', None),        ('Maria', '20', ['DBMS', 'Networking']),        ('Jay', '22', None)]columns = ['Name', 'Age', 'Courses_enrolled']df = spark.createDataFrame(data, columns)df.display()
```

```
from pyspark.sql.functions import posexplodedf.select(df.Name,posexplode(df.Courses_enrolled)).display()
```

![]()

**posexplode\_outer():**

-   `posexplode_outer()` splits the array column into **one row per array element.**
-   It **returns the position (index)** of each element in the array
-   Creates two output columns:
-   `**pos**` → position of the element in the array (0-based index)
-   `**col**` → value of the array element
-   **Null arrays are retained** (rows are not dropped)
-   **Null values are also included** in the output
-   Combines the behavior of `**explode_outer()**` (keeps nulls) and `**posexplode()**` (keeps positions).
-   Useful when both **element order** and **data completeness** are required

**Input:**

```
data = [('Jaya', '20', ['SQL', 'Data Science']),        ('Milan', '21', ['ML', 'AI']),        ('Rohit', '19', None),        ('Maria', '20', ['DBMS', 'Networking']),        ('Jay', '22', None)]columns = ['Name', 'Age', 'Courses_enrolled']df = spark.createDataFrame(data, columns)df.display()
```

```
from pyspark.sql.functions import posexplode_outerdf.select(df.Name, posexplode_outer(df.Courses_enrolled)).display()
```

![]()

Thanks for taking the time to read this article. If it resonated with you, I’d love to hear your thoughts — drop a comment or show some love with a clap👏