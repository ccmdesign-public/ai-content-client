---
title: "SQL: Thinking in Lambdas (lambda SQL) | Firebolt"
author: "Select From"
platform: "medium"
publicationName: "Select From"
url: "https://selectfrom.dev/sql-thinking-in-lambdas-lambda-sql-firebolt-72f0dfeffa2c?source=rss----415fa49cac1b---4"
publishedAt: "2023-08-29"
tags:
  - "data-science"
categories:
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-01T21:19:30.669Z"
---

# SQL: Thinking in Lambdas (lambda SQL) | Firebolt

# SQL: Thinking in Lambdas (lambda SQL) | Firebolt

[Elijah Rivera](https://medium.com/@elijah.rivera?source=post_page---byline--72f0dfeffa2c---------------------------------------)

6 min read·Aug 29, 2023

\--

Many programming languages are imperative — you need to tell the compiler **how** to operate to get what you want by providing the instructions in order.

SQL, on the other hand, is declarative. You specify what you want — how the final result set should look like, but not necessarily what steps it needs to take. It’s up to the database’s query optimizer to determine what indexes it should leverage and in which order it should execute the various parts of the query to get back your desired output.

To differentiate between the two approaches, let’s look at an example. Given a list of cars, we are interested in finding all the sedan cars. In an imperative world, this might be written as:

```
def get_sedans(cars):   sedans = []   for car in cars:       if car['car_type'] == 'sedan':           sedans.append(car['car_model'])   return sedans
```

In the SQL context, we are not concerned about the steps we need to take to fetch the data. The above code can be written as:

```
SELECT car_model FROM cars WHERE car_type = 'sedan';
```

But this declarative purity of SQL has been gradually eroded over time. Since its inception, the SQL language has been extended in various ways to meet the complexity of real-world use cases.

One such example is handling arrays in databases. Arrays represent a collection of similarly shaped items that need to be put through a similar process. There are several cases why we would want to keep data stored as arrays in a database:

-   Maintain items in a predictable order. For example, replicating a checkout line having the customers in a queue is a good example of using an array.
-   Reference array elements by their position in order using the array index.
-   Perform calculations over the elements of an array. Using the same grocery example from above, calculate the total cost of a grocery basket for a customer.
-   Store all relevant attributes of an item, regardless of their granularity, in a single table, instead of expanding the data model with additional tables. This is a key aspect I have struggled with several times when using [star schemas](https://en.wikipedia.org/wiki/Star_schema). After the dimension model has been set up, one (or several) dimensions might require a new attribute at a different level of granularity. You can either opt for a snowflake model by extending your data model or store it in a structure, like an array or json data type, that allows you to maintain the granularity of your dimension, store all details, and avoid additional joins.
-   Store all versions of a record in a single line. If you’ve implemented [SCD2](https://en.wikipedia.org/wiki/Slowly_changing_dimension#Type_2:_add_new_row) before, you know how painful it can get to maintain and debug it. Using arrays, you can store only the attribute that is changing as a new element of the array in one single line instead of duplicating the whole table row at each change of an attribute.
-   Allow for more complex data structures with correlated elements to be stored in databases, such as an array of arrays.

Now that we understand the importance of arrays, how can we perform operations on arrays in databases? The most common way is to use out-of-the-box array functions, such as ARRAY\_FIRST or ARRAY\_COUNT, but eventually, you will need more expressiveness to handle more complex operations.

An alternative is using the UNNEST table function. The UNNEST takes as input an array and returns a table that includes a row for each element of the array. After UNNESTing, you can use regular SQL functions to operate on the flatten resultset.

What happens when you have more nested structures, such as an array of arrays or multiple correlated arrays in a table? Do you keep on UNNESTing, or is there a more easy-to-use, elegant approach to querying it?

## Enter Lambda functions (in SQL)

[Lambda functions](https://www.firebolt.io/blog/sql-thinking-in-lambdas) allow you to apply user-defined functions on arrays. The function iterates through the elements of an array and applies the user-provided transformation/expression. The function can take any number of array parameters. The expression doesn’t have to be stored or defined before using it.

The general form of a lambda function is:

ARRAY\_FUNC(, arr\[, arr1, arr2…\])

The best way to learn is often by doing, so let’s revisit our car example using Lambda functions. Instead of storing every car model as separate rows, we will keep all models of a car’s make into an array and the associated car types into another array.

![]()

Create and populate the table in SQL:

```
CREATE DIMENSION TABLE cars (    car_make varchar,    car_model array(varchar),    car_type array(varchar));INSERT INTO cars(car_make, car_model, car_type)VALUES('tesla', ['model s', 'model 3', 'model X', 'model Y'], ['sedan', 'sedan', 'SUV', 'SUV']);
```

We will answer five questions to exemplify the power of lambda functions:

1.  Can we extract all car models where the car type is sedan?

We can use the FILTER array function and pass in as parameters the car model and car type:

```
SELECT car_make, FILTER(x,y -> y = 'sedan', car_model, car_type) as sedansFROM cars;
```

![]()

Let’s understand how it works in more depth. We want to get all car models where car type = ‘sedan’, therefore:

-   We need a filter operation.
-   We need both the car\_model and car\_type columns as inputs/
-   The two inputs will be positionally replaced in the lambda expression (x, y -> y = ‘sedan’) as following: **x = car\_model, y = car\_type**.
-   We will apply the filter on y **(car\_type) = ‘sedan’.**

![]()

2\. What if we had the release dates for every model, can we extract the latest release model for each car make?

## Get Elijah Rivera’s stories in your inbox

 from this writer.

Let’s first add the car\_release column and update it’s content with the following:

```
car_release = ['2012-06-22', '2017-07-28','2012-02-09','2020-03-13']
```

To get what we want, we need to:

-   Sort the car\_model array based on car\_release dates
-   Extract the last element from the car\_model array

```
SELECT car_make, ELEMENT_AT(ARRAY_SORT(x,y -> y, car_model, car_release), -1) as latest_releaseFROM cars;
```

![]()

3\. Next question! Can we remove every instance of the word ‘model’ from the car\_model array values?

In this case, we can use the transform function, which returns an array by applying a function (replace) on each element of the array (car\_model)

```
SELECT car_model, TRANSFORM(x -> REPLACE(x, 'model ', ''), car_model) car_model_replacedFROM cars;
```

![]()

4\. Were any car models released after 2011 ending with the letter X?

We can use the ANY\_MATCH() function since we are not interested in the exact number of models released after 2018, only if we had at least a model released after 2018.

```
SELECT car_make, ANY_MATCH(x,y -> x like '%X' AND year(y) > 2011, car_model, car_release) AS models_after_2011_flagFROM cars;
```

‍

![]()

‍5. Looking good so far, but can we operate on nested arrays?

Let’s create a new column car\_model\_type as array(array(varchar)) by combining the two existing columns car\_model and car\_type together.

```
car_model_type = [['model s', 'sedan'], ['model 3', 'sedan'], ['model X', 'SUV'], ['model Y', 'SUV']]
```

We will access only the car model’s data, replace the value ‘3’ with ‘three’ using a case statement, and concatenate back with the car type.

```
SELECT TRANSFORM(x -> (case when x[1] like '%3' then 'model three' else x[1] end) || ' - ' || x[2] , car_model_type) as car_model_fullFROM cars
```

![]()

Congratulations! This sums our first interactions with the lambda functions in a SQL context. The examples above just scratch the surface of what you can do with lambda functions. At Firebolt, we have seen firsthand in real-world scenarios that the power of lambda functions comes from the ability to combine several array functions while passing in complex data structures, such as nested arrays, as inputs to these functions.

## Conclusion

Lambda functions help you navigate the world of arrays with ease — all using SQL and without the need to define new types of objects.

*Originally published at* [*https://www.firebolt.io*](https://www.firebolt.io/blog/sql-thinking-in-lambdas)*.*