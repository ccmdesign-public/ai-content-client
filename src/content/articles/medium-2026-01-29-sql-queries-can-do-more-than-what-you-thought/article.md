---
title: "SQL queries can do more than WHAT YOU THOUGHT!"
author: "Learning Data"
platform: "medium"
publicationName: "Learning Data"
url: "https://medium.com/learning-data/sql-queries-can-do-more-than-what-you-thought-c271898d8ee9?source=rss----eec44e936bf1---4"
publishedAt: "2026-01-29"
tags:
  - "advanced-sql"
  - "sql-queries"
  - "postgresql"
  - "sql"
  - "sql-window-functions"
  - "data-science"
  - "education"
---

# SQL queries can do more than WHAT YOU THOUGHT!

# SQL queries can do more than WHAT YOU THOUGHT!

[Khanh Nguyen](/@khanhnguyen7802?source=post_page---byline--c271898d8ee9---------------------------------------)

13 min read·1 day ago

\--

Mid to advanced SQL queries

![]()

You might have the preconception about SQL queries being ONLY `SELECT ... FROM ... WHERE`. Now, it’s time to upgrade your SQL queries with **complex transformations**!

In this article, I will walk you through several queries and helpful techniques that are often used in SQL. *Note: This is NOT an exhaustive list. The queries can vary based on your working field. The DBMS used is Postgresql.*

## Table of Contents

1/ String manipulation & Pattern matching

2/ Date and Time manipulation

3/ Types of JOINs

4/ Grouping data

5/ Window functions

6/ Ranking functions

7/ Subqueries

## 1/ String manipulation & Pattern matching (For data cleaning)

`LIKE` and `ILIKE` (case-insensitive), with wildcards `_` *(matches exactly one character)* and `%` *(matches any sequence of characters (≥ 0)).*

### Regular Expression (regex)

-   `~` and `~*`: regex match **case-sensitive** and **case-insensitive** respectively
-   `!~`: regex no match
-   `'[abc]’`→ a or b or c 🆚`'[^abc]'` → any char **except** a, b, c
-   `'[a-z]'`→ any lowercase letter
-   `'[A-Za-z]'`→ any letter 🆚 `[0–9]`→ any digit
-   `^` → start of the string
    e.g., ‘^abc’ → starts with abc
-   `$` → end of the string

```
-- Return all names that:-- Start with K, L, or M-- Do not end with hSELECT name FROM student WHERE name ~ '^[klm]'       AND name !~ 'h$';
```

### Quantifier

-   `*` : **0** or more 🆚 `+` : **1** or more
    e.g., **a\*** → “”, “a”, “aa”
-   `?` : 0 or 1, used to check if the **preceeding element is optional**
    e.g., `'colou?r'`: letter `u` is *optional*.
-   `{n}` : exactly n 🆚 `{n,}` : n or more 🆚 `{n,m}` : between n and m
    e.g., a{3} → “aaa” 🔸a{2,4} → “aa” “aaa” “aaaa”
-   `(abc)+` : group with parentheses is **repeated
    **e.g., (no)+ → “no”, “nono”, “nonono”, …

```
-- email validation -- start of the string must be letter -- then, whatever character it is -- after '@' will be the domain name (e.g., @gmail)-- and repeated top-level domain (e.g., .co.uk) at the end of stringSELECT emailFROM usersWHERE email ~ '^[a-zA-Z][a-zA-Z0-9]{2,19}@[a-zA-Z0-9-]{2,20}(\.[a-z]{2,10})+$';
```

### String processing

-   CONCAT\_WS: concatenate string with separator
-   TRIM/LTRIM/RTRIM: trim string

```
SELECT CONCAT_WS('-', '2025', '01', '15'); --Output: 2025-01-15SELECT TRIM('x' FROM 'xxhelloxx'); --Output: helloSELECT LTRIM('---hello', '-'); --Output: helloSELECT RTRIM('hello...', '.'); --Output: hello
```

### NULL value handling

-   `COALESCE`: take a list of args and return the first non-null argument.
-   `NULLIF`: returns a null value if `argument_1` *equals to* `argument_2`; otherwise, it returns `argument_1`
-   `CASE WHEN … THEN`: conditional queries

```
-------- SELECT COALESCE (NULL, 2 , 1); -- returns 2--------SELECT amount / NULLIF(count, 0) FROM sales; -- avoid division by 0--------SELECT * FROM orders WHERE discount IS NULL; -- select null rows--------CASE      WHEN condition_1  THEN result_1      WHEN condition_2  THEN result_2      [WHEN ...]      [ELSE else_result]END
```

## 2\. Date and Time manipulation

### Add/subtract a **‘quantity unit’** with `INTERVAL`

```
SELECT date_column ± INTERVAL 'quantity unit'; -- syntax-- adds a complex interval of one year, two months, and three days to the current timestampSELECT NOW() + INTERVAL '1 year 2 months 3 days';
```

### Truncate to a specific unit

`DATE_TRUNC` truncates a timestamp value to a precision. **Use case:** *“Calculate monthly revenue”.* Instead of extracting year and month separately, just DATE\_TRUNC(‘month’, order\_date).

```
SELECT    DATE_TRUNC('month', sale_date) s,    SUM(income)FROM sales GROUP BY s
```

### Get parts of a date

The `EXTRACT()` function extracts a field from a date/time value.

```
EXTRACT(field FROM source) -- general syntaxSELECT EXTRACT(YEAR FROM TIMESTAMP '2016-12-31 13:30:15') --Output: 2016
```

### Difference between two timestamps

Use `AGE` to calculate, e.g., ages of employees or years of service.

```
AGE(timestamp,timestamp); -- AGE(timestamp) = diff(timestamp, now)SELECT AGE('2025-11-01', '2023-01-01'); -- 2 years 10 months
```

## 3\. Types of JOINs

I already had a full article about using JOINs in SQL. You can [check the article here](/towards-data-engineering/sql-joins-do-you-know-them-all-0de5cd1aee3b).

## 4\. Grouping Data

### GROUPING SETS

A `grouping set` is a set of columns by which you group using the `GROUP BY` clause. It helps get all the grouping sets using a single query.

In the example below, the query returns:

-   Sales per *(product, region)*
-   Sales per *(product)*
-   Sales per *(region)*
-   Grand total *()*

```
SELECT product, region, SUM(sales) AS total_salesFROM salesGROUP BY GROUPING SETS (  (product, region),  (product),  (region),  ());-- origin┌────────────┬─────────┬────────┐│  Product   │ Region  │ Sales  │├────────────┼─────────┼────────┤│ iPhone 15  │ US      │ 1200   ││ iPhone 15  │ EU      │ 1100   ││ AirPods    │ US      │ 300    ││ AirPods    │ EU      │ 280    ││ MacBook    │ US      │ 2200   ││ MacBook    │ APAC    │ 2100   ││ iPad       │ US      │ 900    ││ Apple TV   │ EU      │ 400    │└────────────┴─────────┴────────┘-- output┌────────────┬─────────┬─────────────┐│  Product   │ Region  │ total_sales │├────────────┼─────────┼─────────────┤│ AirPods    │ EU      │     280     │ -- (product, region)│ AirPods    │ US      │     300     │ -- (product, region)│ AirPods    │ NULL    │     580     │ -- (product)│ Apple TV   │ EU      │     400     ││ Apple TV   │ NULL    │     400     │ -- (product)│ iPad       │ US      │     900     ││ iPad       │ NULL    │     900     ││ iPhone 15  │ EU      │    1100     ││ iPhone 15  │ US      │    1200     ││ iPhone 15  │ NULL    │    2300     ││ MacBook    │ APAC    │    2100     ││ MacBook    │ US      │    2200     ││ MacBook    │ NULL    │    4300     ││ NULL       │ APAC    │    2100     │ -- (region)│ NULL       │ EU      │    1780     │ -- (region)│ NULL       │ US      │    4600     │ -- (region)│ NULL       │ NULL    │    8480     │ -- () -> grand total└────────────┴─────────┴─────────────┘
```

### ROLLUP

`ROLLUP` is a subclause of the `GROUP BY` that offers a shorthand for defining multiple **grouping sets**.

`ROLLUP` assumes a hierarchy among the input columns and generates all grouping sets that make sense considering the hierarchy.
➡️`ROLLUP` is often used to generate the **subtotals** and the **grand total** for reports.

For example, `ROLLUP (c1, c2, c3)` generates 4 grouping sets, assuming the hierarchy `c1 > c2 > c3` as follows:

```
(c1, c2, c3)(c1, c2)(c1) ()
```

Thus, acommon use of `ROLLUP` is to calculate the **aggregations of data** by *year*, *month*, and *date*, considering the hierarchy `year > month > date`.

```
SELECT product, region, SUM(sales) AS total_salesFROM salesGROUP BY ROLLUP (product, region)ORDER BY product, region;-- origin┌────────────┬─────────┬────────┐│  Product   │ Region  │ Sales  │├────────────┼─────────┼────────┤│ iPhone 15  │ US      │ 1200   ││ iPhone 15  │ EU      │ 1100   ││ AirPods    │ US      │ 300    ││ AirPods    │ EU      │ 280    ││ MacBook    │ US      │ 2200   ││ MacBook    │ APAC    │ 2100   ││ iPad       │ US      │ 900    ││ Apple TV   │ EU      │ 400    │└────────────┴─────────┴────────┘-- output ┌────────────┬─────────┬─────────────┐│  Product   │ Region  │ total_sales │├────────────┼─────────┼─────────────┤│ AirPods    │ EU      │     280     │ -- (product, region)│ AirPods    │ US      │     300     │ -- (product, region) │ AirPods    │ NULL    │     580     │ -- (product) │ Apple TV   │ EU      │     400     │ │ Apple TV   │ NULL    │     400     │ │ iPad       │ US      │     900     ││ iPad       │ NULL    │     900     ││ iPhone 15  │ EU      │    1100     ││ iPhone 15  │ US      │    1200     ││ iPhone 15  │ NULL    │    2300     ││ MacBook    │ APAC    │    2100     ││ MacBook    │ US      │    2200     ││ MacBook    │ NULL    │    4300     ││ NULL       │ NULL    │    8480     │ -- () └────────────┴─────────┴─────────────┘
```

### CUBE

In contrary to `ROLLUP`, the `CUBE` subclause generates all **possible grouping** sets based on the dimension columns specified in `CUBE`.

In general, if the number of columns specified in the `CUBE` is `n`, then you will have `2^n` combinations.

```
CUBE(c1,c2,c3)is equivalent toGROUPING SETS (    (c1,c2,c3),    (c1,c2),    (c1,c3),    (c2,c3),    (c1),    (c2),    (c3),    () )
```

## 5\. Window Functions

Window functions let you run calculations **across a set of related rows** *without collapsing rows the way* `*GROUP BY*` *does*.

`PARTITION BY` is similar to `GROUP BY`, but it doesn’t collapse rows.

```
SELECT product, region, sales,  SUM(sales) OVER (PARTITION BY product) AS product_totalFROM sales;-- output ┌────────────┬─────────┬────────┬───────────────┐│  Product   │ Region  │ Sales  │ product_total │├────────────┼─────────┼────────┼───────────────┤│ iPhone 15  │ US      │ 1200   │     2300      ││ iPhone 15  │ EU      │ 1100   │     2300      ││ AirPods    │ US      │ 300    │      580      ││ AirPods    │ EU      │ 280    │      580      ││ MacBook    │ US      │ 2200   │     4300      ││ MacBook    │ APAC    │ 2100   │     4300      ││ iPad       │ US      │ 900    │      900      ││ Apple TV   │ EU      │ 400    │      400      │└────────────┴─────────┴────────┴───────────────┘
```

### LAG

The `LAG()` function is a window function that allows you to access values from **previous rows** in a result set without the need for a self-join.
➡️ Useful for comparing values between the current row and a previous row.

The example below shows how `LAG()` works by displaying the column `previous_day_sales`.

```
SELECT Date, Product, Sales,  LAG(Sales) OVER (   -- the value to return from previous row    PARTITION BY Product    ORDER BY Date  ) AS previous_day_salesFROM sales;-- origin ┌────────────┬────────────┬───────┐│    Date    │ Product    │ Sales │├────────────┼────────────┼───────┤│ 2024-01-01 │ iPhone     │ 100   ││ 2024-01-02 │ iPhone     │ 120   ││ 2024-01-03 │ iPhone     │ 90    ││ 2024-01-01 │ AirPods    │ 50    ││ 2024-01-02 │ AirPods    │ 60    │└────────────┴────────────┴───────┘-- output┌────────────┬─────────┬───────┬────────────────────┐│ Date       │ Product │ Sales │ previous_day_sales │├────────────┼─────────┼───────┼────────────────────┤│ 2024-01-01 │ iPhone  │ 100   │ NULL               ││ 2024-01-02 │ iPhone  │ 120   │ 100                ││ 2024-01-03 │ iPhone  │ 90    │ 120                ││ 2024-01-01 │ AirPods │ 50    │ NULL               ││ 2024-01-02 │ AirPods │ 60    │ 50                 │└────────────┴─────────┴───────┴────────────────────┘
```

Another common real usage of `LAG()`: show the changes day-over-day.

```
SELECT Date, Product, Sales,  Sales - LAG(Sales) OVER (    PARTITION BY Product    ORDER BY Date  ) AS daily_changeFROM sales;-- origin ┌────────────┬────────────┬───────┐│    Date    │ Product    │ Sales │├────────────┼────────────┼───────┤│ 2024-01-01 │ iPhone     │ 100   ││ 2024-01-02 │ iPhone     │ 120   ││ 2024-01-03 │ iPhone     │ 90    ││ 2024-01-01 │ AirPods    │ 50    ││ 2024-01-02 │ AirPods    │ 60    │└────────────┴────────────┴───────┘-- output ┌────────────┬─────────┬───────┬──────────────┐│ Date       │ Product │ Sales │ daily_change │├────────────┼─────────┼───────┼──────────────┤│ 2024-01-01 │ iPhone  │ 100   │ NULL         ││ 2024-01-02 │ iPhone  │ 120   │ 20           ││ 2024-01-03 │ iPhone  │ 90    │ -30          ││ 2024-01-01 │ AirPods │ 50    │ NULL         ││ 2024-01-02 │ AirPods │ 60    │ 10           │└────────────┴─────────┴───────┴──────────────┘
```

### LEAD

The `LEAD()` window function returns the value of the cell in that column that is the specified number of rows **after the current row**.

The `ORDER BY` clause is required. There is also an *(optional)* argument that sets the value of cells where the corresponding row does not exist. The third argument will be `NULL` *by default*.

```
SELECT Date, Product, Sales,  LEAD(Sales) OVER (    PARTITION BY Product    ORDER BY Date  ) AS next_day_salesFROM sales;-- origin ┌────────────┬────────────┬───────┐│    Date    │ Product    │ Sales │├────────────┼────────────┼───────┤│ 2024-01-01 │ iPhone     │ 100   ││ 2024-01-02 │ iPhone     │ 120   ││ 2024-01-03 │ iPhone     │ 90    ││ 2024-01-01 │ AirPods    │ 50    ││ 2024-01-02 │ AirPods    │ 60    │└────────────┴────────────┴───────┘-- output ┌────────────┬─────────┬───────┬──────────────────┐│ Date       │ Product │ Sales │ next_day_sales   │├────────────┼─────────┼───────┼──────────────────┤│ 2024-01-01 │ iPhone  │ 100   │ 120              ││ 2024-01-02 │ iPhone  │ 120   │ 90               ││ 2024-01-03 │ iPhone  │ 90    │ NULL             ││ 2024-01-01 │ AirPods │ 50    │ 60               ││ 2024-01-02 │ AirPods │ 60    │ NULL             │└────────────┴─────────┴───────┴──────────────────┘
```

## 6\. Ranking Functions

### ROW\_NUMBER

`ROW_NUMBER` returns the ordinal position of the row **within the partition**. The first row is numbered 1, the second 2, and so on.

The example below assigns a **unique sequential number** to each row **within a partition**, based on the `ORDER BY`.

```
SELECT region, product, sales,  ROW_NUMBER() OVER (    PARTITION BY region -- this subclause is optional    ORDER BY sales DESC  ) AS row_numberFROM sales;-- origin┌────────────┬─────────┬────────┐│  Product   │ Region  │ Sales  │├────────────┼─────────┼────────┤│ iPhone 15  │ US      │ 1200   ││ iPhone 15  │ EU      │ 1100   ││ AirPods    │ US      │ 300    ││ AirPods    │ EU      │ 280    ││ MacBook    │ US      │ 2200   ││ MacBook    │ APAC    │ 2100   ││ iPad       │ US      │ 900    ││ Apple TV   │ EU      │ 400    │└────────────┴─────────┴────────┘-- output ┌─────────┬────────────┬────────┬────────────┐│ Region  │  Product   │ Sales  │ row_number │├─────────┼────────────┼────────┼────────────┤│ APAC    │ MacBook    │ 2100   │     1      ││ EU      │ iPhone 15  │ 1100   │     1      ││ EU      │ Apple TV   │ 400    │     2      ││ EU      │ AirPods    │ 280    │     3      ││ US      │ MacBook    │ 2200   │     1      ││ US      │ iPhone 15  │ 1200   │     2      ││ US      │ iPad       │ 900    │     3      ││ US      │ AirPods    │ 300    │     4      │└─────────┴────────────┴────────┴────────────┘
```

### RANK

`RANK` returns the **ranked position** of each row in the ordered results. Rows with equal values for the ranking criteria receive the **same rank**, with the next rank(s) skipped.
For example, in a **partition of regions** *ordered by* **sales** volume, the region with the highest sales volume is ranked 1. If multiple regions have **the same sales** volumes, they’ll be ranked the same and the next rank is skipped *(e.g., US and EU are both ranked 1 -> the subsequent rank is 3)*.

The example below is similar to using `ROW_NUMBER` since there is **no ties**.

```
SELECT region, product, sales,  RANK() OVER (    PARTITION BY region -- this subclause is optional    ORDER BY sales DESC  ) AS rankFROM sales;-- origin┌────────────┬─────────┬────────┐│  Product   │ Region  │ Sales  │├────────────┼─────────┼────────┤│ iPhone 15  │ US      │ 1200   ││ iPhone 15  │ EU      │ 1100   ││ AirPods    │ US      │ 300    ││ AirPods    │ EU      │ 280    ││ MacBook    │ US      │ 2200   ││ MacBook    │ APAC    │ 2100   ││ iPad       │ US      │ 900    ││ Apple TV   │ EU      │ 400    │└────────────┴─────────┴────────┘-- output ┌─────────┬────────────┬────────┬──────┐│ Region  │  Product   │ Sales  │ rank │├─────────┼────────────┼────────┼──────┤│ APAC    │ MacBook    │ 2100   │  1   ││ EU      │ iPhone 15  │ 1100   │  1   ││ EU      │ Apple TV   │ 400    │  2   ││ EU      │ AirPods    │ 280    │  3   ││ US      │ MacBook    │ 2200   │  1   ││ US      │ iPhone 15  │ 1200   │  2   ││ US      │ iPad       │ 900    │  3   ││ US      │ AirPods    │ 300    │  4   │└─────────┴────────────┼────────┼──────┘
```

### DENSE\_RANK

`DENSE_RANK`is the same as `RANK`, but when multiple rows have the same rank, the subsequent rank is not skipped *(e.g., US and EU are both ranked 1 -> the subsequent rank is still 2)*.

## 7\. Subqueries

### Subquery with EXISTS

`EXISTS` checks **whether the subquery returns at least one row**. As soon as **one match is found**, it returns `TRUE`.

In the example below, the query shows all customers who have placed **at least** one order since 2023. For each `customer` row, if at least one matching order exists, the customer is included, otherwise excluded.

```
SELECT customerNameFROM customers cWHERE EXISTS (  SELECT 1  FROM orders o  WHERE o.customerNumber = c.customerNumber    AND o.orderDate >= '2023-01-01');
```

### Common Table Expression (CTE)

A **common table expression** (CTE) allows you to create a temporary result set within a query.

```
-- using multiple CTEsWITH film_stats AS (    -- CTE 1: Calculate film statistics    SELECT        AVG(rental_rate) AS avg_rental_rate,        MAX(length) AS max_length,        MIN(length) AS min_length    FROM film),customer_stats AS (    -- CTE 2: Calculate customer statistics    SELECT        COUNT(DISTINCT customer_id) AS total_customers,        SUM(amount) AS total_payments    FROM payment)-- Main query using the CTEsSELECT    ROUND((SELECT avg_rental_rate FROM film_stats), 2) AS avg_film_rental_rate,    (SELECT max_length FROM film_stats) AS max_film_length,    (SELECT min_length FROM film_stats) AS min_film_length,    (SELECT total_customers FROM customer_stats) AS total_customers,    (SELECT total_payments FROM customer_stats) AS total_payments;
```

Advantages of using CTEs:

-   Improve readability
-   Ability to create **recursive queries**

### Recursive CTEs

A recursive CTE allows you to perform recursion within a query.

PostgreSQL executes a recursive CTE in the following sequence:

-   First, execute the anchor member to create the base result set **(R0)**.
-   Second, execute the recursive member with **Ri** as an input to return the result set **Ri+1** as the output.
-   Third, repeat step 2 until an empty set is returned. (termination check)
-   Finally, return the final result set that is a `UNION` or `UNION ALL` of the result sets R0, R1, … Rn.

➡️ Useful when dealing with hierarchical or nested data structures *(e.g., trees or graphs)*.

```
WITH RECURSIVE category_tree AS (  -- 1️. Anchor: root categories (anchor member)  SELECT id, category_name, parent_id,         1 AS level,         category_name AS path  FROM categories  WHERE parent_id IS NULL  UNION ALL  -- 2️. Recursive member  SELECT c.id, c.category_name, c.parent_id,    ct.level + 1 AS level,    ct.path || ' > ' || c.category_name AS path  FROM categories c  JOIN category_tree ct    ON c.parent_id = ct.id)SELECT *FROM category_treeORDER BY path;-- origin┌────┬────────────────┬───────────┐│ id │ category_name  │ parent_id │├────┼────────────────┼───────────┤│  1 │ Electronics    │ NULL      ││  2 │ Phones         │ 1         ││  3 │ Laptops        │ 1         │      │  4 │ Android        │ 2         ││  5 │ iPhone         │ 2         ││  6 │ Ultrabooks     │ 3         ││  7 │ Gaming Laptops │ 3         │└────┴────────────────┴───────────┘-- tree structure Electronics├─ Phones│  ├─ Android│  └─ iPhone└─ Laptops   ├─ Ultrabooks   └─ Gaming Laptops-- output ┌────┬────────────────┬───────────┬───────┬────────────────────────────────────┐│ id │ category_name  │ parent_id │ level │ path                               │├────┼────────────────┼───────────┼───────┼────────────────────────────────────┤│ 1  │ Electronics    │ NULL      │   1   │ Electronics                        ││ 2  │ Phones         │ 1         │   2   │ Electronics > Phones               ││ 4  │ Android        │ 2         │   3   │ Electronics > Phones > Android     ││ 5  │ iPhone         │ 2         │   3   │ Electronics > Phones > iPhone      ││ 3  │ Laptops        │ 1         │   2   │ Electronics > Laptops              ││ 6  │ Ultrabooks     │ 3         │   3   │ Electronics > Laptops > Ultrabooks ││ 7  │ Gaming Laptops │ 3         │   3   │ Electronics > Laptops > Gaming...  │└────┴────────────────┴───────────┴───────┴────────────────────────────────────┘
```

## Final Remarks

These functions are vital when you primarily work with SQL. In real life, we usually clean the data first using other tools (e.g., Python) and then use SQL only for queries. Thus, you should focus more on advanced aggregation in SQL.

## References

\[1\]: [https://neon.com/postgresql/postgresql-functions](https://neon.com/postgresql/postgresql-functions)

\[2\]: [https://www.dataquest.io/guide/sql-tutorial/](https://www.dataquest.io/guide/sql-tutorial/)

*The contents of external submissions are not necessarily reflective of the opinions or work of* [*Maven Analytics*](http://mavenanalytics.io) *or any of its team members.*

*We believe in fostering lifelong learning and our intent is to provide a platform for the data community to share their work and seek feedback from the Maven Analytics data fam.*

[*Submit your own writing here*](/learning-data/how-to-get-your-work-published-by-learning-data-with-maven-analytics-7df21e466a3e?sk=020dfac485597d602e218968d9ffb395) *if you’d like to become a contributor.*

*Happy learning!*

*\-Team Maven*