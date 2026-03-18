---
title: "Agentic AI in Action — Part 14 - Building a Store Performance Monitoring Agent using LLMs and Maps"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/building-a-store-performance-agent-using-llms-and-maps-to-identify-locations-that-need-attention-75649c07ffd0?source=rss----98111c9905da---4"
publishedAt: "2026-03-18"
tags:
  - "agents"
  - "ai-general"
  - "llm"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-18T12:05:37.698Z"
---

# Agentic AI in Action — Part 14 - Building a Store Performance Monitoring Agent using LLMs and Maps

# Building a Store Performance Monitoring Agent: Using LLMs and Maps to Identify Locations That Need Attention

[Krishnan Srinivasan](https://medium.com/@krish.srinivasans?source=post_page---byline--75649c07ffd0---------------------------------------)

9 min read·1 day ago

\--

*A step-by-step walkthrough showing how structured data analysis, LLM reasoning, and spatial visualization can be combined to detect underperforming stores and generate actionable insights.*

Organizations with multiple locations such as retail chains, bank branches, logistics hubs, healthcare clinics, and service centers must constantly answer a deceptively simple question: *which locations need attention right now?*

Most organizations rely on dashboards to answer this question. A regional manager might open a BI tool, compare revenue against targets, filter by city or region, and manually determine which stores are underperforming. While dashboards provide visibility, they still depend on humans to interpret the information and decide what actions should be taken.

Agentic AI offers a different approach. Instead of relying on people to interpret dashboards and identify problems, we can build agents that analyze operational data, detect underperforming locations, explain what might be going wrong, and suggest possible actions.

When these insights are visualized on a map, the results become even easier to interpret. Decision makers can immediately see where issues are emerging and prioritize interventions geographically.

In this article we will build a Store Performance Agent that analyzes store performance across several US cities. The agent will identify stores that are performing below their targets, use a large language model to generate explanations, and display the affected locations on a map.

The goal is to demonstrate a simple but powerful agentic pattern that combines structured data analysis, LLM reasoning, and spatial visualization in a way that readers can easily reproduce.

## The Agentic Pattern

Before diving into the implementation, it is useful to understand why this example represents an agentic workflow rather than a simple data analysis exercise.

Traditional analytics tools focus on presenting data to the user. They provide dashboards, charts, and reports, but the responsibility for interpreting the information still lies with the human user. An agent based system shifts this responsibility. Instead of simply displaying the data, the system actively analyzes it, identifies problems, explains potential causes, and suggests actions.

## The Three Core Tasks

In our example the agent performs three core tasks:

![]()

**First,** it analyzes store performance metrics and determines which stores are performing below expectations.
**Second,** it uses a large language model to interpret the data and explain possible reasons for the observed performance.
**Third,** it visualizes the results on a map so that operational teams can easily understand where attention is required.

## Process Flow and System Architecture

The process flow consists of four main components.

![]()

Store performance data provides the operational context. Python functions perform structured analysis such as calculating performance ratios. The large language model interprets the results and generates explanations. Finally, the results are visualized on a map to highlight where issues are occurring.

The below architecture also illustrates how the Store Performance Agent combines structured data analysis with LLM based reasoning to generate actionable insights. Store performance data such as revenue, targets, foot traffic, staffing, and competitor density is first analyzed using Python to identify underperforming locations, after which the LLM interprets the metrics to explain potential causes and recommend actions. The results are then visualized spatially on a map to highlight underperforming stores and the analysis is saved as a report file for further review.

![]()

With the architecture in place, we can now move on to the implementation. The following steps show how to build a simple Store Performance Agent that analyzes store metrics, generates insights using an LLM, and visualizes underperforming locations on a map.

## Step 1: Installing Required Libraries

We begin by installing the libraries required for this example.

The notebook uses three primary libraries. Pandas is used for data manipulation, the OpenAI client is used to interact with the language model, and PyDeck is used to visualize store locations on a map.

![]()

## Step 2: Creating a Store Performance Dataset

To demonstrate the approach, we construct a small synthetic dataset representing stores located in several major US cities including New York, Los Angeles, Chicago, Houston, and San Francisco. Each store record includes operational attributes such as revenue, revenue targets, customer foot traffic, marketing spend, staffing levels, competitor density, and customer ratings. In a real world scenario, the dataset can be expanded with additional attributes depending on the requirements of the use case.

These attributes provide context around store performance so that the analysis goes beyond simple threshold based filtering. By combining these operational signals, the agent can identify underperforming stores and the language model can generate more meaningful, data grounded explanations for why a store may be struggling.

Accordingly, the stores list defines a small synthetic dataset where each entry represents a store with its location and operational metrics.

Since the full dataset contains multiple store records, only one example is shown below, illustrating the structure for the Manhattan store. Please refer to the code set to review other records.

![]()

We then convert the dataset into a pandas DataFrame.

![]()

![]()

## Step 3: Identifying Underperforming Stores

We now calculate a performance ratio for each store. This metric compares revenue against the target revenue.

## Get Krishnan Srinivasan’s stories in your inbox

 from this writer.

Remember me for faster sign in

As seen in the code block below, stores operating below eighty percent of their target are classified as underperforming. This step represents deterministic analysis. It identifies which stores require attention but does not explain why.

![]()

![]()

## Step 4: Using an LLM to Analyze Store Performance

### LLM Setup

To enable LLM based reasoning, we initialize the OpenAI client using our API key. The key is retrieved securely from an environment variable rather than being hard coded in the notebook, which is a recommended practice for protecting credentials when working with APIs.

![]()

### **Generating Insights Using the LLM**

![]()

The analyze\_store function is responsible for sending store performance data to the language model and retrieving a structured explanation of the store’s performance.

The function receives a single store record as input and constructs a prompt that includes the store’s operational metrics such as revenue, target revenue, foot traffic, marketing spend, staffing levels, competitor density, and customer ratings. These attributes provide the context needed for the model to reason about the store’s performance.

The model receives store metrics and produces a structured explanation that includes a performance summary, potential causes, and recommended actions.

## Step 5: Generating Insights for a Store

To make the notebook more interactive and efficient, the analysis is performed for a single store at a time, instead of analyzing all stores. **When this cell is executed, the notebook will prompt you to enter a Store ID.** The script then retrieves the corresponding store from the dataset and sends its performance metrics to the language model for analysis. This approach avoids making multiple API calls and allows the user to explore individual store performance on demand.

![]()

As mentioned earlier, when this cell runs, the notebook prompts the user to enter a Store ID. The agent then retrieves the corresponding store record, sends the store data to the language model for analysis, displays the Markdown formatted insights in the notebook, and saves the generated analysis to a file such as **store\_analysis\_<store id>.txt** in the same folder where the notebook is located. Let us take a closer look at the output.

### Breaking Down the Output Sections for Store S001:

The generated output analyzes the performance of **Store S001 (New York — Manhattan)** and presents the findings across the following sections.

1.  **Store details and Performance Summary**

![]()

The agent summarizes the store performance here. It analyzed the operational metrics for the New York Manhattan store and determined that the location is significantly underperforming relative to its revenue target, generating only $42,000 against a target of $80,000, resulting in a **47.5%** shortfall. Even with 1,200 customers visiting the store and $5,000 spent on marketing, sales remain below expectations. The customer rating of 3.8/5 also suggests potential customer experience issues that may be impacting performance.

**2\. Data Driven Reasons**

![]()

By examining the supporting data, the agent reasoned that although the store receives a reasonable level of foot traffic, the conversion of visitors into sales appears to be low. It also noted that the relatively modest marketing spend, a customer rating of 3.8, and a highly competitive environment with several nearby competitors may be contributing to the performance gap.

**3\. Recommended Actions**

![]()

Based on these observations, the agent recommended actions focused on improving marketing effectiveness, enhancing the in store customer experience, strengthening staff engagement with customers, and introducing promotional strategies to increase conversions and repeat visits.

**4\. Saving the Output for Further Analysis**

Finally, the generated analysis is saved as a file named **store\_analysis\_S001.txt** allowing it to be shared, reviewed, or used for further analysis.

![]()

## Step 6: Visualizing Underperforming Stores on a Map

To make the analysis more intuitive, we visualize the underperforming stores on a map using the PyDeck library. Each store is plotted using its latitude and longitude coordinates, allowing us to see where performance issues are occurring geographically. By displaying only the stores that fall below the performance threshold, the map highlights the locations that require operational attention.

![]()

The ScatterPlotLayer places markers on the map at the coordinates of these underperforming stores. We also define the initial view of the map so that it centers roughly on the United States, ensuring that all relevant locations are visible when the visualization loads. This spatial perspective helps decision makers quickly identify regional patterns and prioritize interventions where they are needed most.

![]()

As demonstrated here, by combining structured data analysis, LLM reasoning, and spatial visualization, organizations can build agents that continuously monitor performance and surface insights that would otherwise require manual analysis.

![]()

While this example focuses on retail store performance, the same pattern can be applied to many other operational scenarios. Organizations that manage distributed assets such as bank branches, warehouses, service centers, healthcare clinics, or logistics hubs often face similar challenges in identifying which locations require attention.

By combining structured operational data, relevant performance features, LLM based reasoning, and spatial visualization, agents can help monitor performance across locations, surface emerging issues, and enable faster, more informed operational decisions. Because in complex systems, the hardest question is often the simplest one: *where should we act next?*

The notebook associated with this blog can be accessed [here.](https://github.com/Krishsriniv/store-performance-agent-using-llm-and-maps)