---
title: "Cooked with SQL: Designing a Restaurant Data System"
author: "Learning Data"
platform: "medium"
publicationName: "Learning Data"
url: "https://medium.com/learning-data/cooked-with-sql-designing-a-restaurant-data-system-f226162ea359?source=rss----eec44e936bf1---4"
publishedAt: "2026-03-23"
tags:
  - "data-pipeline"
  - "data-science"
  - "education"
  - "sql"
categories:
  - "Data & Analytics"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-23T14:40:53.867Z"
---

# Cooked with SQL: Designing a Restaurant Data System

#### A beginner-friendly SQL project idea to kickstart your data portfolio

![](https://cdn-images-1.medium.com/max/1024/1*ShpdeEa_7pZda_ESHkGmRQ.png)

> “Learning SQL is one thing. Knowing what to build with it? That’s the real challenge.”

If you’ve ever learned SQL and thought:
 — ***“Hmm… I know SELECT, JOIN, GROUP BY… but what project should I actually build?”***

You’re not alone.

So in this project, my team and I built something simple, practical, and very relatable:

a **restaurant database system**

Because let’s be honest — everyone understands how a restaurant works 🍽️
 … and that makes it the perfect playground to learn real-world SQL.

But before we jump into SQL, let’s take a quick sneak peek at the story behind this project.

### Project Case: Rumah Makan Pondok Indah

This project was originally developed as part of a **team-based Database Design & Database Programming with SQL** implementation project during the **Fresh Graduate Academy (Digital Talent Scholarship)** program 2024.

In this project, we used:

-   **Oracle SQL Developer Data Modeler** to design the **Entity Relationship Diagram (ERD)**
-   **Oracle APEX** to implement the ERD into SQL queries and build the database system

Here, we used a real-world inspired case study: **Rumah Makan Pondok Indah**, a traditional Sundanese restaurant that offers an authentic dining experience in a warm and family-friendly atmosphere.

The restaurant is popular among families, office workers, and tourists who want to enjoy local cuisine in a comfortable setting.

However, behind the scenes, the restaurant faced several operational challenges:

-   Transaction and order data were not well organized
-   Reservation and takeaway processes were handled separately
-   Customer and staff data were difficult to manage consistently
-   Operational reporting was still inefficient

These challenges made it difficult for the business to scale and maintain service quality.

### Project Objective

Based on those problems, our team designed and built an **integrated restaurant database system** with the following goals:

-   Centralize customer, staff, and transaction data
-   Manage dine-in, reservation, and takeaway orders in one system
-   Improve data organization and accessibility
-   Support operational reporting and analysis
-   Improve overall service efficiency

In short:

> To transform manual and scattered restaurant operations into a structured, efficient, and data-driven system.

### What We Built

To achieve that, my team and I developed:

1.  A **complete ERD (Entity Relationship Diagram)**
2.  A **relational database structure**
3.  SQL implementation including:

-   Table creation & Data insertion
-   Views, Index, Sequence, and Synonym

This project was designed as an **end-to-end SQL system**, starting from business understanding all the way to technical implementation.

### Why a Restaurant?

Because restaurants have **everything you need in a database case study**:

-   Customers, Orders, Staff, Menus, Transactions, Reservations, Takeaway,… so on.

Here — *it’s basically a* ***mini version of real business operations*** *— exactly what you want in a portfolio project.*

### The Goal of This Project

We wanted to build a system that can store customer data, record transactions, manage reservations and takeaway orders, track menu items, assign staff, and support reporting.

In short — *Turn daily restaurant operations into* ***structured, queryable data.***

### Step 1 — Think Like a System Designer (Not Just SQL User)

Before writing any SQL, we stepped back and asked:

-   What data actually exists in this business?
-   How are they related?
-   What should be stored long-term?

From there, we identified the **core entities —** Customer, Staff, Menu, Transaction, Reservation, Takeaway, and Table.

Each of these entities later becomes a **table** in the database.

### Step 2 — Design the ERD (The Blueprint)

Next, we designed how everything connects using an **ERD (Entity Relationship Diagram)**.

#### Conceptual Design (ERD)

This version focuses purely on the **business logic**.

Here, we answer questions like:

-   What entities exist in this restaurant system?
-   How are customers, staff, menus, and transactions related?
-   Which relationships are mandatory, and which are optional?

At this stage, we are **not thinking about SQL, data types, or constraints yet**. We are simply modeling how the restaurant operates in real life.

![Conceptual Design (ERD)](https://cdn-images-1.medium.com/max/1024/1*JmtJhfm1Cxzz0xrQ49LVLw.png)

Here’s how to read them:

-   **Straight line ( — )** shows that a relationship exists between two entities
-   **Crow’s foot (the “chicken feet” shape)** represents **many**
-   **Single line end (|)** represents **exactly one**
-   **Broken or angled line** indicates the relationship is **optional**

We also added labels such as:

-   **“must have” / “must be”** → the relationship is **mandatory**
-   **“may have” / “may handle” / “handled by”** → the relationship is **optional**

These labels make the diagram easier to understand from a business perspective.

For example:

-   A **transaction must have a customer**
-   A **customer may have multiple transactions**
-   A **staff may handle many transactions**, but may also not handle any

This way, even someone without a technical background can understand how the system works.

One of our key design decisions was using:

✨ **Supertype–Subtype Design**

Before we go further, let’s break this down in a simple way.

-   A **supertype** is a general entity that stores common attributes.
-   A **subtype** is a more specific version of that entity with additional attributes.

In our case:

-   TransactionHeader → the main transaction entity
-   Reservation and Takeaway → specialized transaction types

So instead of creating completely separate tables for each transaction type, we grouped them under one main structure.

**Why does this matter?**

Because both reservation and takeaway are still **transactions** — they just have different attributes.

For example:

-   All transactions share: transaction ID, date, customer, staffs.
-   But only reservations have: table number & reservation time.
-   And only takeaway orders have: pickup time & takeaway notes.

This approach helps us avoid duplicated data and keeps the structure flexible as the system grows.

### Step 3 — Transform ERD into Relational Tables

Once the ERD was ready, we translated it into a **relational schema**.

#### Physical Design (Relational Schema)

![Physical Design (Relational Schema)](https://cdn-images-1.medium.com/max/1024/1*l3IrkMrgZ5nC14PcmGmhNw.png)

This is where the design becomes **technical and database-ready**.

In this stage, we define:

-   Actual table names
-   Column data types (VARCHAR2, NUMBER, DATE)
-   Primary keys and foreign keys
-   Constraints that enforce relationships

Our core tables include — Customer, Staff, Menu, TransactionHeader, TransactionDetail, Reservation, Takeaway, and Table.

**Important design concept:**

We separated ***TransactionHeader*** and ***TransactionDetail*** so that — one transaction can contain ***multiple menu items*.**

Just like when you order several dishes at a restaurant.

### Step 4 — Implementing the Database with SQL (Let’s Build It Together)

Now comes the most exciting part — turning our design into a real working system using SQL.

In this section, we’re not just showing the final result.
We’re going to **build the database step by step**, just like how we actually did it.

#### 4.1 Creating Database & Defining Relationships

In this stage, the database schema is designed and implemented by defining tables along with their relationships using **Primary Keys** and **Foreign Keys**. The general SQL structure used is:

```
CREATE TABLE table_name (    column1 datatype PRIMARY KEY,    column2 datatype,    column3 datatype,    FOREIGN KEY (columnX) REFERENCES other_table(columnY));
```

**Objective of this stage:**

-   Ensure a well-structured and consistent data model
-   Maintain data integrity through relational constraints
-   Reduce redundancy through proper normalization

A **Primary Key** is a column that **uniquely identifies each row in a table**.

A **Foreign Key** is a column that **links one table to another table**. It works by referencing a **Primary Key in another table**. This is what creates relationships like:

-   One customer → many transactions / One transaction → many items

#### 4.2 Table Structures & Data Insertion

Each table in the database is created and populated with initial data.
For each table, the following aspects are documented — *Table purpose, Table structure (**CREATE TABLE), and Data population (**INSERT INTO).*

**A. Customer**

This table will contain customer data such as Customer ID, first name, last name, gender, phone number, email address, address, and date of birth.

![Create Customer Table](https://cdn-images-1.medium.com/max/674/1*FosGwwAU58nSCfNi-jHECA.png)

***So.. What’s Happening in This Table?***

Let’s break it down together! At its core, this table stores basic customer identity information such as — Name, gender, contact details, address, and birth date.

Each customer is uniquely identified using customer\_ID, which is defined as a **Primary Key**.

This means — No two customers can have the same ID and this field cannot be empty. So every customer in the system is **uniquely traceable**.

***Next, Required vs Optional Data..***

Not all data has the same level of importance. That’s why we used NOT NULL for key identity attributes like — First name, last name and gender. Because in real-world operations, these are **essential information**.

Meanwhile, fields like — Phone, email, and address are made optional to keep the system **flexible**.

***Data Validation: Making Sure the Data Makes Sense***

Instead of just storing any input, we also added **validation rules** using CHECK constraints. This helps maintain **data quality from the start**.

For example:

-   Email must follow a valid format (must contain @ and domain)
-   Phone number must be numeric and between 10–15 digits

So the database automatically **rejects invalid input** like useremail.com or phone123

***And, How This Table Connects to the System??***

The Customer table doesn’t stand alone. It will later be connected to other core tables such as:

-   **TransactionHeader** → to record who made a purchase
-   **Reservation** → to track table bookings
-   **Takeaway** → to record takeaway orders

So every time a transaction happens in the system, we always know **which customer it belongs to**.

![Insert Customer Data](https://cdn-images-1.medium.com/max/1024/1*p9C3eRLteEmHHQgj8jooGA.png)

Then, input the data into the table according to the specifications that we set earlier. Be careful not to make any mistakes, because incorrect data types or writing will cause an error message to appear. Here are the results:

![Customer Table](https://cdn-images-1.medium.com/max/1024/1*f9VzswTMNFRf3JGLBTDI6Q.png)

**B. Staffs**

This table will contain staff data such as Staff ID, first name, last name, gender, salary, position, phone number, email address, address, and date of birth.

![Create Table Staff](https://cdn-images-1.medium.com/max/774/1*pjQOiXPjrLVmhuj2jXj5oQ.png)

![Insert Staff Data](https://cdn-images-1.medium.com/max/727/1*h9mxqkpH1rQGyylkhf1yGA.png)

The criteria and queries used are not much different from customer table. There is a primary key — Staff ID, and additional data on the salary and position of the staff member. Here are the results:

![Staff Table](https://cdn-images-1.medium.com/max/1024/1*06Ik0ovobfqdPOURJjhr4g.png)

**C. Table Infos**

This table will contain table information such as table ID and whether the table is available or unavailable.

![Create Table-Table Infos](https://cdn-images-1.medium.com/max/535/1*mW-2uuVdBZJ8-OVEUzgFuw.png)

![Insert Table-Table Infos](https://cdn-images-1.medium.com/max/558/1*crlx-YxBgH6V097duwwmxQ.png)

The primary key here is the table ID, and there is data on table availability for future reservations/use by customers. Here are the results:

![Table Infos](https://cdn-images-1.medium.com/max/966/1*9mw2NpUhbobQwvDjmYc0Iw.png)

**D. Menus**

This table will contain menu data such as Menu ID, name, description, and price.

![Create Table Menus](https://cdn-images-1.medium.com/max/620/1*NQYTpr6c0oXgVvd2TikgPg.png)

![Insert Table Menus](https://cdn-images-1.medium.com/max/809/1*kTkyALixkU9NlV6qDJeuJw.png)

The primary key data is the Menu ID, followed by other data that cannot be null, especially the price, which must be greater than or equal to 0. Here are the results:

![Table Menus](https://cdn-images-1.medium.com/max/1024/1*MQfCcKvUiJoTzTX6Tw5t8Q.png)

**E. Transaction Headers**

This table will contain Transaction Header data such as Transaction Header ID, staff ID, customer ID, transaction date, and payment method.

![Create Table Transaction Headers](https://cdn-images-1.medium.com/max/833/1*QlG6qdf15rK6N1sxVKTpdA.png)

![Insert Table Transaction Headers](https://cdn-images-1.medium.com/max/823/1*mnVTMrI-CiCx5JMNl2wDqw.png)

The primary key data is the Transaction Header ID, then other data includes staff ID and customer ID, which are foreign keys from other tables (meaning that the ID data must exist in the reference table). Then, there is transaction date data and payment methods consisting of Cash, Qris, and Debit, which cannot be null. Here are the results:

![Transaction Headers](https://cdn-images-1.medium.com/max/1024/1*j0h1Ftzzs3M0DOMsmVkP7Q.png)

**F. Reservations**

This table will contain reservation data such as Transaction Header ID, Number of people, reservation date, table ID, and Customer ID.

![Create Table Reservations](https://cdn-images-1.medium.com/max/795/1*QW5ZVBN2wY65NZPvckMsPw.png)

![Insert Table Reservations](https://cdn-images-1.medium.com/max/1018/1*iweOGPFrnoOcvRrW5FL08g.png)

The primary key data is the Transaction Header ID, followed by other data such as the number of people coming and the reservation date. There is also data as a foreign key, which is the table ID and customer ID. All data must be filled in. Here are the results:

![Reservations](https://cdn-images-1.medium.com/max/1024/1*i0fHFr-g5-KtoRTCsJAVgQ.png)

**G. Takeaways**

This table will contain Takeaways data such as Transaction Header ID, Customer ID, Number of people, and Queue.

![Create Table Takeaways](https://cdn-images-1.medium.com/max/564/1*mze-xTM-jZ2NICQIrMRf1Q.png)

![Insert Table Takeaways](https://cdn-images-1.medium.com/max/489/1*y8uk8oQ4honB-JaApVfaIA.png)

The primary key data is the Transaction Header ID, along with other data such as Queue. Then there is a foreign key, which is the customer ID. All data must be filled in. Here are the results:

![Takeaways](https://cdn-images-1.medium.com/max/1024/1*TEm2zN4H6N7wgHcc_gXeTg.png)

**H. Transaction Details**

This table will contain Transaction Details data such as Transaction Header ID, Menu ID, and Quantity.

![Create Table Transaction Details](https://cdn-images-1.medium.com/max/989/1*-PwuGNQQjmNffc1pGhlt_A.png)

![Insert Table Transaction Details](https://cdn-images-1.medium.com/max/1024/1*UZt22FzYXmWg4flWW9YwYw.png)

The primary key data is the Transaction Header ID, along with other data such as Quantity. Then there is a foreign key, which is the menu ID. All data must be filled in, and the quantity must be greater than 0. Here are the results:

![Transaction Details](https://cdn-images-1.medium.com/max/1024/1*TO9Td4AbPRPiijyS5Hi2Qw.png)

### 4.4 Querying the System — From Operational Requests to Data Insights

Now that the database is fully built and populated, the system is no longer just storing data — it’s **serving real operational needs**.

Think about it. In a real restaurant environment, data is constantly being requested:

-   The cashier needs to check the customer data
-   The manager wants to see daily transactions
-   The kitchen wants to know what items were ordered
-   The admin wants to monitor takeaway queues

Behind the scenes, all of these actions rely on SQL queries. Let’s simulate how the system responds to real-world requests.

#### Scenario 1 — Cashier Checks Customer Information

**Request: —** A customer arrives and says they’ve made previous reservations.
The cashier needs to quickly check the customer’s data in the system.

**SQL Query & Output:**

```
SELECT Customer_ID, FirstName, LastName, PhoneFROM Customer;
```

![](https://cdn-images-1.medium.com/max/1024/1*9uAJ55VEla5EDnX-16rEdA.png)

**💡 What’s happening? —** This simple SELECT query retrieves customer records from the database.

#### Scenario 2 — Manager Reviews Transaction Activity

**Request: —** The restaurant manager wants to monitor all transaction records for operational review.

**💻 SQL Query & Output:**

```
SELECT TransactionHeader_ID, TransactionDate, PaymentMethodFROM TransactionHeader;
```

![](https://cdn-images-1.medium.com/max/879/1*Rse5bFaIlK1_QhleQBWuCg.png)

**💡 Why this matters: —** This allows the system to Track daily transaction volume, Monitor payment method distribution, and Ensure transaction records are properly stored.

#### Scenario 3 — System Generates Full Transaction Breakdown

**Request: —** The manager asks:

> “What menu items were ordered in each transaction, and how much revenue did each order generate?”

This requires combining TransactionHeader, Customer, TransactionDetail & Menu.

**SQL Query & Output:**

```
SELECT     th.TransactionHeader_ID,    c.FirstName || ' ' || c.LastName AS CustomerName,    m.Name AS MenuName,    td.Quantity,    m.Price,    (td.Quantity * m.Price) AS TotalPriceFROM TransactionHeader thJOIN Customer c ON th.Customer_ID = c.Customer_IDJOIN TransactionDetail td ON th.TransactionHeader_ID = td.TransactionHeader_IDJOIN Menu m ON td.Menu_ID = m.Menu_ID;
```

![](https://cdn-images-1.medium.com/max/837/1*5U2zruDKFJVCBSXUJmPyTg.png)

**💡 What Just Happened? —** By using JOINwe connected multiple tables and reconstructed real transaction activity. Here, the query breakdown:

-   FROM TransactionHeader thStarts from the main transaction table (one row per transaction).
-   JOIN Customer cConnects each transaction to the customer who made it.
-   JOIN TransactionDetail tdExpands each transaction into item-level details (what was ordered & how many).
-   JOIN Menu mRetrieves menu names and prices for each ordered item.
-   c.FirstName || ' ' || c.LastNameCombines the first and last name into a full customer name.
-   (td.Quantity \* m.Price)Calculates total price per ordered item dynamically.

This query essentially simulates a **restaurant billing system**.

#### Scenario 4 — Monitoring Takeaway Queue

**Request: —** The staff needs to check the takeaway queue order.

**SQL Query & Output:**

```
SELECT *FROM TakeawayORDER BY QueueNumber;
```

![](https://cdn-images-1.medium.com/max/486/1*luWJRaUJ8r9Z_CGgs43-tQ.png)

**💡 Operational Impact: —** This allows Efficient queue management, Faster customer service & Clear visibility of order flow.

#### Scenario 5 — Identifying the Most Popular Menu Item

**Request: —** The restaurant manager asks:

> “Which menu item is ordered the most? I want to know what customers love the most.”

**SQL Query & Output:**

```
SELECT     m.Name AS Menu_Name,    SUM(td.Quantity) AS Total_SoldFROM Transaction_Details tdJOIN Menus m     ON td.Menu_ID = m.Menu_IDGROUP BY m.NameORDER BY Total_Sold DESC;
```

![](https://cdn-images-1.medium.com/max/578/1*OVslqcducRIG1azleTlvjg.png)

**💡 What’s Happening in This Query?**

-   JOIN connects transaction details with menu names
-   SUM(td.Quantity) calculates total units sold
-   GROUP BY m.Name aggregates data per menu item
-   ORDER BY Total\_Sold DESC ranks from most to least popular

### 4.6 Simplifying Access with Views

To make complex queries easier to use, we created **SQL Views**.

A **VIEW** is a virtual table.

It does not store data physically like a table. Instead, it stores a **saved SQL query**.

Whenever someone selects from the view, Oracle automatically runs the query behind it.

Think of it like — ***A shortcut or saved query for easier data access****.*

#### Simple View

![Create Simple View](https://cdn-images-1.medium.com/max/1024/1*4qSyqjp4lkOWfIUGB_DZGA.png)

-   CREATE OR REPLACE VIEW simple\_staff\_view AS, Creates (or updates) a virtual table named simple\_staff\_view.
-   SELECT staff\_id, first\_name, last\_name, salary, gender, position FROM staffs, Defines which columns will appear in the view, and pulls the data from the original staffs table.

***How about we input the data into the view?*** — Turns out it’s possible, let’s try it!

![](https://cdn-images-1.medium.com/max/938/1*XaUu69JWE0QLhNIrhshayQ.png)

![](https://cdn-images-1.medium.com/max/421/1*-eC3uLVknVbBYqNulZyqBQ.png)

![](https://cdn-images-1.medium.com/max/1024/1*o_6qvPFgrI1Pl_DvRCr_6w.png)

Because our view is simple with — selects from only one table, has no JOIN, has no GROUP BY, has no aggregation, and has no DISTINCT. This type of view is called an **updatable view**.

That means when you insert into the view, Oracle actually inserts the data into the original staffs table.

#### Complex View

Unlike the previous simple view, this one uses multiple tables, uses JOIN, and combines relational data. This is considered a **non-simple (complex) view**.

![Create Complex View 1](https://cdn-images-1.medium.com/max/490/1*wWXVIoHfPSQrOG6BveEabw.png)

![](https://cdn-images-1.medium.com/max/1024/1*_GFWNrOOUezaBI-bcoMgLw.png)

This complex view combines data from transaction\_headers, staffs, and customers using JOIN to create a unified transaction summary. It starts from transaction\_headers as the main table, then joins staffs using staff\_ID and joins customers using customer\_ID, linking each transaction to the staff who handled it and the customer who made it. Column aliases are used to improve clarity and readability. As a result, this view provides a clean, ready-to-use dataset for reporting and analysis without repeatedly writing multiple JOIN queries.

![Create Complex View 2](https://cdn-images-1.medium.com/max/850/1*MaMHSI7YtQLLCLzlzTGX-A.png)

![](https://cdn-images-1.medium.com/max/1024/1*m1BPn6wp1V5-NpnlLgcNqA.png)

This complex view combines data from transaction\_headers, transaction\_details, menus, and customers to create a detailed customer–menu transaction summary. It starts from transaction\_headers as the main table, then joins transaction\_details using transaction\_header\_ID to retrieve item-level order data. Next, it joins menus using menu\_ID to obtain menu names and prices, and finally joins customers using customer\_ID to attach customer information. As a result, this view reconstructs which customer ordered which menu item in each transaction, along with its price, providing a ready-to-use dataset for reporting and sales analysis without repeatedly writing complex JOIN queries.

### 4.7 Improving Performance with Index

As the data grows, query performance can slow down.

To solve this, we created an **INDEX**:

💡 Think of an index like a **table of contents in a book** — it helps the database find data faster.

![Create Index](https://cdn-images-1.medium.com/max/617/1*0u8OlPYg-WovIkUgGA8FMw.png)

![](https://cdn-images-1.medium.com/max/1024/1*_2JhK3UYyGCMwHV8qGVOlQ.png)

This query creates an index named idx\_menu\_name on the name column in the menus table. An index improves query performance by allowing the database to locate specific data faster, especially when using conditions like WHERE name = 'Paket Nasi Timbel'. Without an index, the database would scan the entire table (full table scan) to find matching rows. With the index, Oracle can directly locate the requested menu item more efficiently. This is particularly useful when the table contains a large number of records and frequent searches are performed based on menu names.

### 4.8 Automating IDs with Sequence

To avoid manual ID input and ensure uniqueness, we used **SEQUENCE**:

This automatically generates — unique IDs, consistent numbering, and scalable data entry.

![Create Sequence](https://cdn-images-1.medium.com/max/298/1*-RK2SvwDCDKZJ9sxNMsu8w.png)

![](https://cdn-images-1.medium.com/max/1024/1*GhTGAy4lpmWum-LIe56Dlw.png)

![](https://cdn-images-1.medium.com/max/1024/1*RXPPwVaxKje123XcmcqZYg.png)

This query creates a sequence named menu\_seq to automatically generate unique numbers for the menu\_id column. The sequence starts at 4 and increases by 1 each time it is used. In the INSERT statements, menu\_seq.NEXTVAL retrieves the next number, which is then combined with the letter **"M"** and formatted into values like **M004, M005**, and so on. Using a sequence ensures that each menu\_id is unique and prevents duplication when inserting new records into the menus table.

### 4.9 Making Queries Cleaner with Synonyms

Finally, we created **SYNONYMS** to simplify table references.

This allows us to write shorter and cleaner SQL queries — especially useful in large systems.

![Create Synonym](https://cdn-images-1.medium.com/max/510/1*l2i1oMcyKQu4FyDpHaAOww.png)

![](https://cdn-images-1.medium.com/max/1024/1*EZiYlyCRuMBkXu_iDY2VqQ.png)

This query creates a synonym named menu\_eks for the menus table. A synonym is an alternative name (alias) that allows you to refer to a table using a different, usually shorter or more convenient name. After creating the synonym, the query SELECT \* FROM menu\_eks; retrieves all data from the menus table through the synonym. Even though the query uses menu\_eks, it actually accesses the original menus table.

Using a synonym simplifies queries, improves readability, and can make it easier to manage database object names without changing the original table.

### What I Learned from This Project

This project taught us that SQL is not just about writing queries; it’s about **designing a system.**

Key takeaways:

-   Always start with understanding the **business problem**
-   ERD is the **foundation of everything**
-   A good structure makes SQL **much easier**
-   Small design decisions affect **long-term scalability**

### Wait..

Learning SQL can feel abstract at first.

But when you connect it to a **real-world system**, it becomes something you can **see, understand, and build**.

And that’s when it becomes really fun.

✨ If you’re building your first SQL project right now… this is your time to **start cooking your own data system hehe**

*The contents of external submissions are not necessarily reflective of the opinions or work of* [*Maven Analytics*](http://mavenanalytics.io) *or any of its team members.*

*We believe in fostering lifelong learning and our intent is to provide a platform for the data community to share their work and seek feedback from the Maven Analytics data fam.*

[*Submit your own writing here*](https://medium.com/learning-data/how-to-get-your-work-published-by-learning-data-with-maven-analytics-7df21e466a3e?source=friends_link&sk=020dfac485597d602e218968d9ffb395) *if you’d like to become a contributor.*

*Happy learning!*

*\-Team Maven*

* * *

[Cooked with SQL: Designing a Restaurant Data System](https://medium.com/learning-data/cooked-with-sql-designing-a-restaurant-data-system-f226162ea359) was originally published in [Learning Data](https://medium.com/learning-data) on Medium, where people are continuing the conversation by highlighting and responding to this story.