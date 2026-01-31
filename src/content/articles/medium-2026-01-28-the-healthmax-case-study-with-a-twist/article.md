---
title: "The HealthMax Case Study (With a Twist)"
author: "Learning Data"
platform: "medium"
publicationName: "Learning Data"
url: "https://medium.com/learning-data/the-healthmax-case-study-with-a-twist-19b62735f995?source=rss----eec44e936bf1---4"
publishedAt: "2026-01-28"
tags:
  - "data"
  - "data-science"
  - "education"
---

# The HealthMax Case Study (With a Twist)

# **The HealthMax Case Study (With a *Twist*)**

[Yovani Pillay](/@yovanipillay?source=post_page---byline--19b62735f995---------------------------------------)

10 min read·2 days ago

\--

## **Happy New Year to Everyone**

Before I begin with this blog post, I just want to wish all my amazing subscribers, and to anyone stopping by to read my post today, a Happy New Year. I wish you immense joy, good health, and success in the year ahead.

![Image created with ChatGPT.]()

Looking back, 2025 has been a journey of growth, challenges, and small victories that reminded me of how important it is to stay curious, humble and grateful.

Being an external contributor for Learning Data has been one of my favorite ways to connect, reflect, and share ideas with the Maven Analytics and broader data community. I’m truly thankful for everyone who’s been part of this journey.

Here’s to fresh beginnings, new opportunities, and more knowledge being shared. Let’s make this year one to remember!

Now, on to today’s post…

## **What is NRM and The HealthMax Case Study?**

During last year’s Open Access period held by DataCamp, I decided to explore some of their projects and case studies.

One that particularly grabbed my attention was a Net Revenue Management (NRM) case study in Excel by instructor Gauthier Georgis. The link to this case study can be found [here](https://app.datacamp.com/learn/courses/case-study-net-revenue-management-in-excel).

This case study drew my attention because, as a former Food Scientist, I was already acquainted with the Marketing Mix (also known as the 4 Ps) from a Food Product Development course that I undertook during my B. Tech. degree.

![Image created with ChatGPT.]()

The five pillars of NRM are:

· Brand portfolio pricing (Price)

· Pack price architecture (Product and Price)

· Mix management (Place)

· Promotion management (Promotion)

· Trade terms management (Place, in terms of distribution/trade conditions)

It goes far beyond a traditional pricing strategy. Instead, it’s a smart, comprehensive approach to managing net revenue that sustains operations and production.

Success in NRM requires a holistic, tailored strategy designed specifically for the unique dynamics of CPG and FMCG businesses.

The main goal of NRM is to maximize net revenue and profit. In other words, improving the business’s top and bottom line.

In this case study, you play the role of a Category Manager for a fictitious FMCG company, HealthMax — a market leader in the Shampoo industry. You are being asked to analyze the available market and come up with actionable insights to grow the business.

As you progress through your analysis, there are certain requests and considerations that HealthMax’s Management asks you to fulfil.

Your goal is to compare the performance of HealthMax vs. its competitors and propose recommendations to management on how to improve the business.

### **The *Twist***

I am not going to do a deep dive into this case study because I think most people have already delved into this. I instead want to focus on one element that I thought was worth improving on, and that is the line chart.

Having looked through various student project portfolios online for inspiration, I realized that nobody decided to challenge the line chart showing “Shampoo Brand Market Evolution”. So, I decided to take on this challenge, and to my surprise, it was A LOT harder than I thought!

After determining the market share of each brand, we end up with a line chart that looks like this. Now, this is correct, but for me personally, it looks too busy and chaotic.

Even greying out the brands with little to no market share still looked a bit distracting and didn’t do much justice…

![Image by author: Original cluttered chart.]()

My approach to neaten up this line chart was to display the “Top 5 Brands” individually, grouping the other brands into an “Other Brands” category.

Since HealthMax’s brands (Shinez and Starbust) were consistently in the Top 5 between 2018 and 2023, I thought it would make sense to focus on HealthMax’s closest competitors as opposed to all of them.

The “Other Brands” category would consist of the remaining 20 brands, which have little to no market share in a specific \[Region\]s. After all, the goal is to compare the performance of HealthMax’s brands vs. its competitors’ brands.

Instead of plotting all 25 brands, I chose to focus on 6 single series for the line chart. But, achieving this was challenging through basic and intermediate knowledge of Excel…

The biggest limitation that standard PivotTables have is that they are static. For example, I have a slicer showing the Center, North and South regions. If I were to make no selection on my slicer, this would indicate that I’m showing All Regions.

I want to show the individual “Top 5 Brands” by total revenue for All Regions as well as for each specific region or combination of any selected region. If I grouped the “Other Brands”, leaving the “Top 5 brands” as individual series in All Regions, for example, I would end up with a PivotTable showing me the “Top 5 Brands” for All Regions and have “Other Brands” grouped as another category.

The problem occurs when I change the region on my slicer. In the videos below, I demonstrate how the individual “Top 5 Brands” will not change according to my new region selection. We still see the same individual “Top 5 Brands” as we did for All Regions, which is incorrect.

[

## Static PivotTable

screenrec.com

](https://screenrec.com/share/jH5E6gQIGy?source=post_page-----19b62735f995---------------------------------------)

The ungrouped PivotTable shows us the correct values, and this is what should be reflected in both the PivotTable and line chart when any region is selected.

[

## True Value PivotTable

screenrec.com

](https://screenrec.com/share/Mk3YABaDx8?source=post_page-----19b62735f995---------------------------------------)

My initial thoughts were to use helper columns, where I created two helper columns before trying to use the GROUPBY function in the hopes that it would create a more dynamic version of a PivotTable.

![Image by author: Helper columns approach used.]()

For column G (Rank), I used the following formula:

```
=SUMPRODUCT((SUMIF([Brand],[Brand],[Values Month])>SUMIF([Brand],[@Brand],[Values Month]))/COUNTIF([Brand],[Brand]))+1
```

For column H (Brand Category), I used this formula:

```
=IF([@Rank]<=5,[@Brand],"Other Brands")
```

These two columns got me very close to what I was trying to achieve. I got the correct results when I selected All Regions (no selection on the slicer) and for the Center region. But, for North and South, the Top 3 ranks appeared to be correct, but ranks 4 and 5 were wrong.

Additionally, they were extremely inefficient to run, often causing my Desktop App to become non-responsive. Overall, these methods lack some sort of interactivity/logic for the slicers to act appropriately.

Determined to find a solution and broaden my understanding for more advanced techniques, I decided to reach out to the broader data community for help.

I’m extremely grateful for the help and guidance that I received from Franck Binde (Maven Analytics community) and Lorenzo (Microsoft Excel Tech Community).

Franck suggested that I use a combination of PivotTable features and native Excel formulas. Here are the steps he suggested I try:

1\. Use a pivot table to display our values by Brand.

2\. Drag another instance of our values, and summarize them by rank (descending order).

3\. Using native Excel functions, create a category/group based on the rank. If the rank is higher than n, place the brand in a specified category. Otherwise, place it in another category.

4\. The next step would be to GROUPBY category so that when we try using a slicer, the values, rank, and related categories would be updated.

Visually, on the PivotTable layout, this was correct. However, when I tried to group the ranked category using GROUPBY, it gave me very similar answers to the helper columns approach I initially tried.

![Image by author: This approach was correct visually, but it somehow gave me similar answers to the helper columns approach.]()

### **Building the Dynamic PivotTable and Report**

After posting this on the Microsoft Excel Tech Community, a kind volunteer by the username of Lorenzo stepped in to help provide the solution I was trying to seek.

Building on the logic with my helper columns, Lorenzo suggested a mix of CUBE/MDX and Excel 365 formulas with helper worksheets. Here’s how we went about it:

**Step 1: Capturing User Selections**

```
=CUBESET("ThisWorkbookDataModel", Slicer_Year, "SET Slicer_Year")
```

When users click items in the Year slicer, this formula captures those selections. E.g., Think of it as a notebook that writes down: “The user wants to see 2021 and 2022.”

```
=CUBERANKEDMEMBER( "ThisWorkbookDataModel", SET_SlicerYear, SEQUENCE(, CUBESETCOUNT( SET_SlicerYear ) ) )
```

This formula takes what was written in the notebook and displays it as an actual list you can work with. If three years are selected, this creates a nice vertical list of those three years.

```
=IF(INDEX(Selected_Years, 1, 1) = "All", LET(setYear, CUBESET("ThisWorkbookDataModel", "[TableSource].[Year].Children") CUBERANKEDMEMBER("ThisWorkbookDataModel", setYear, SEQUENCE(CUBESETCOUNT(setYear)))), TRANSPOSE( Selected_Years ))
```

This is the “smart switch” formula. It asks: “Did the user select ‘All’ years?”

-   If yes, it fetches every year available in our data
-   If not, it just uses the specific years they picked

The same logic applies to regions, giving users flexibility without breaking the formulas.

![Image by author: CUBE formulas used to create slicer selections based on year and region.]()

**Step 2: Creating the Master Filter**

```
=LET(years, VALUE(Years_ToReport), regions, Selected_Regions, arrFilter, …)
```

This creates an array of numbers where:

-   Non-zero = “This row matches the user’s year AND region selections — include it!”
-   Zero = “This row doesn’t match — exclude it”

This multiplies the year matches by the region matches. If either one is zero (no match), the whole thing becomes zero (excluded). Both must match to pass through.

**Step 3: Grouping and Totaling by Brand**

```
=GROUPBY(TableSource[Brand], TableSource[Values Month], SUM, 0, 0, -2, arrSlicer_Filters)
```

This formula does what you’d manually do with a PivotTable:

-   Groups all data by brand name
-   Adds up the monthly values for each brand
-   BUT only for rows that passed through our slicer/filter

![Image by author: A two-column list showing each brand and its total (based on filtered data).]()

**Step 4: Identifying Our Top Brands**

```
=TAKE(CHOOSECOLS(Brand_GrandTotals, 1), 5)
```

This grabs just the brand names from our totals and picks the first 5. This helps us to identify which brands are getting the spotlight in our report.

![Image by author: Brand_GrandTotals were sorted in descending order, so “first 5” means “Top 5 Brands”.]()

**Step 5: Finding Column Positions Dynamically**

```
=HSTACK(XMATCH(…Brand…), XMATCH(…Year…), XMATCH(…Values Month…))
```

This formula finds where our important columns are located. Why does this matter?

If someone rearranges our table columns next month, our formulas won’t break. Instead of saying “Brand is in column 1” (which might change), this formula figures out “Where is Brand now?” and remembers it.

![Image by author: Dynamic column positions.]()

**Step 6: Creating the Pivot View for Top 5 Brands**

```
=LET(arrTopBrand, FILTER(…), PIVOTBY(…))
```

This was done in two parts:

**Part A — Filter to Top 5:** Takes only rows where the brand is in our Top 5 list AND matches our year/region filters

**Part B — Pivot the Data:** Arranges it in a grid format:

-   Brands down the left
-   Years across the top
-   Values in each cell

This gives us that classic “performance dashboard” view.

**Step 7: Building the Complete Picture with “Others”**

```
=LET(Top5Values, DROP(DROP(…)), arrOthers, FILTER(…), …)
```

This is the most complex formula, but here’s what it accomplishes:

**Part A:** Extracts only the numbers from the Top 5 pivot (removes headers and totals)

**Part B:** Filters our data for brands that are NOT in the Top 5

**Part C:** Groups all those “Other” brands together and calculates their totals by year

**Part D:** Stacks the Top 5 numbers with the “Others” row

**Part E:** Converts everything to percentages by dividing each cell by its row total

![Image by author: A complete table showing Top 5 brands vs. Other Brands, with percentages showing what proportion of each brand’s performance came from each year.]()

**Step 8: The Master Function**

```
=CUBE365_BRAND_REPORT()
```

This function packages all the above steps into one reusable function. Instead of having multiple complex formulas scattered across cells and different worksheets, calling this function gives us the complete report.

[

## Completed Dynamic Chart & PivotTable

screenrec.com

](https://screenrec.com/share/fY45gmK2pC?source=post_page-----19b62735f995---------------------------------------)

### Pros and Cons of This Solution

-   There isn’t a fallback check anywhere. E.g., if based on slicer selection and there’s less than 5 brands to report on, you’ll likely get errors.
-   Identification of the Top 5 Brands is based on their Grand Total, according to the filtered \[Year\]s & \[Region\]s. Easy to change according to All \[Year\]s and All \[Region\]s in TableSource (our tabular data source).
-   Figures are displayed as % of Row Total, as desired for showing the market share of brands.

### **Final Thoughts**

This was a fun, yet challenging exercise that broadened my understanding of Excel CUBE and MDX functions to create dynamic PivotTables and charts. If anything, this was only the beginning, and this case study has inspired me to explore Advanced Excel more deeply.

I am open to learning and would love to hear your thoughts and suggestions about how we could improve this solution. Please feel free to drop a reply below, or feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/yovanipillay/).

*The contents of external submissions are not necessarily reflective of the opinions or work of* [*Maven Analytics*](http://mavenanalytics.io) *or any of its team members.*

*We believe in fostering lifelong learning and our intent is to provide a platform for the data community to share their work and seek feedback from the Maven Analytics data fam.*

[*Submit your own writing here*](/learning-data/how-to-get-your-work-published-by-learning-data-with-maven-analytics-7df21e466a3e?sk=020dfac485597d602e218968d9ffb395) *if you’d like to become a contributor.*

*Happy learning!*

*\-Team Maven*