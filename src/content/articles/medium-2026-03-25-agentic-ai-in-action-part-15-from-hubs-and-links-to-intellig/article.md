---
title: "Agentic AI in Action — Part 15 — From Hubs and Links to Intelligent Action: Data Vault for Agentic…"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/agentic-ai-in-action-part-15-from-hubs-and-links-to-intelligent-action-data-vault-for-agentic-c74ed57622b6?source=rss----98111c9905da---4"
publishedAt: "2026-03-25"
tags:
  - "ai-general"
  - "llm"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-25T14:52:43.601Z"
---

# Agentic AI in Action — Part 15 — From Hubs and Links to Intelligent Action: Data Vault for Agentic…

### From Hubs and Links to Intelligent Action: Data Vault for Agentic AI

#### Why Data Vault’s structure naturally supports AI reasoning and investigation workflows. Demonstrated through a working example in Snowflake.

As organizations continue to explore Agentic AI, much of the discussion naturally focuses on large language models, orchestration frameworks, and the ability of intelligent systems to autonomously plan and execute tasks. While these capabilities are central to the idea of intelligent agents, they often overshadow an equally important architectural question: what type of data structure best supports an agent operating inside an enterprise environment?

Agents do not operate in isolation. They investigate, reason, and make decisions based on enterprise data. In simple demonstrations, that data may appear as a single curated dataset or a small synthetic table designed purely for illustration. In real enterprise environments, however, information is distributed across systems, entities are interconnected, and historical context often plays a crucial role in understanding business behavior. An agent investigating a suspicious invoice, analyzing customer churn patterns, or diagnosing operational anomalies must navigate relationships between entities and evaluate how those entities evolve over time.

This is where **Data Vault** becomes particularly interesting. Although Data Vault is traditionally associated with enterprise data warehousing, its structure aligns naturally with the way intelligent systems explore and reason over business data. The separation of entities, relationships, and descriptive attributes creates a model that is not only scalable for analytics but also well suited for AI-driven investigation workflows.

In this article, we explore how Data Vault concepts can be leveraged to support an agent-style investigation. Using a simple invoice anomaly scenario, we will build a small Data Vault model, populate it with multiple suppliers and invoice histories, and then expose the investigation logic through a Streamlit application that uses large language models within Snowflake Cortex to generate explanations.

### Understanding the Data Vault Model

Data Vault is a data modeling methodology designed to support scalable, auditable, and flexible enterprise data warehouses. Instead of consolidating all information into a single wide table or heavily normalized relational schema, Data Vault organizes information into three primary constructs: **Hubs, Links, and Satellites**. Each construct plays a specific role in representing business entities, their relationships, and their contextual attributes.

![](https://cdn-images-1.medium.com/max/1024/1*RmuF9KaQmThd3PqDrjDiag.png)

**Hubs** represent the core business entities of an organization. These typically correspond to stable identifiers such as customers, invoices, suppliers, orders, or shipments. Hubs store the business key along with minimal metadata required for traceability. Because hubs focus only on business keys, they remain stable even when descriptive attributes change.

**Links** represent the relationships between hubs. In most enterprise processes, entities rarely exist in isolation. An invoice belongs to a supplier, an order belongs to a customer, and a shipment is associated with an order. Links explicitly capture these relationships within the data model, allowing systems to traverse entity connections in a consistent and scalable way.

**Satellites** store the descriptive attributes and historical context associated with hubs or links. These attributes may include invoice amounts, supplier details, transaction timestamps, classifications, or status changes. Satellites preserve historical records rather than overwriting values, making them particularly useful for analytics, investigations, and anomaly detection.

When viewed through the lens of Agentic AI, Data Vault can be interpreted as a structured enterprise memory layer. Hubs define what entities exist in the business domain, links define how those entities interact, and satellites provide the contextual evidence required for reasoning.

### Why Data Vault Fits an Agentic AI Workflow

Once the structure of Data Vault is understood, a natural parallel emerges between Data Vault modeling and the way intelligent agents investigate business scenarios.

An agent investigating a business issue typically follows a reasoning pattern that involves identifying entities, navigating relationships, retrieving contextual attributes, comparing historical records, and generating a conclusion. Data Vault supports this pattern almost directly.

Hubs act as **anchors for business entities**. When an agent receives a task such as investigating an invoice, identifying a shipment issue, or analyzing a supplier transaction, the first step is locating the relevant entity. In a Data Vault model, that entity is represented by a hub table.

Links provide **navigation paths between entities**. Business investigations almost always involve relationships. An invoice is associated with a supplier, an order is associated with a customer, and a shipment is associated with an order. Links explicitly capture these connections and allow the agent to traverse them reliably.

Satellites provide **contextual evidence and historical records**. While hubs and links define structure, satellites contain the attributes that allow the agent to interpret events. This includes invoice amounts, dates, charge types, supplier contact information, and other descriptive data that may change over time. Because satellites preserve historical changes, agents can evaluate patterns across time rather than relying on a single snapshot of data.

![](https://cdn-images-1.medium.com/max/1024/1*tG1YyHtGZjdXW1N1Jze5QA.png)

Taken together, these constructs form something that begins to resemble an enterprise knowledge graph for business data. The agent can identify entities through hubs, traverse relationships through links, and retrieve contextual evidence through satellites.

### Use Case: Investigating a Supplier Invoice

To illustrate the idea, consider a simple but realistic business scenario. A supplier invoice arrives in the system and is flagged because the total amount appears unusually high compared to previous invoices from the same supplier. A finance analyst would normally investigate the invoice by reviewing the supplier’s historical invoices, checking whether the charge type is typical, and verifying that supplier details match master data.

An AI-driven investigation can follow a very similar reasoning path.

The investigation workflow looks like this:

![](https://cdn-images-1.medium.com/max/476/1*WDnJxJWjJg_BBm5S2kX9Zg.png)

This workflow maps naturally to the Data Vault model, where hubs represent the entities, links represent the relationships, and satellites provide the contextual attributes needed for comparison.

### High-Level Architecture

![](https://cdn-images-1.medium.com/max/1024/1*ncGNFlQf7AAyWbhbARUFBw.png)

The architecture illustrated above shows how Data Vault acts as the structured enterprise memory layer for the agentic investigation workflow. For this demonstration, we are implementing a focused prototype of this architecture, centering specifically on supplier and invoice data.

In this context, the Data Vault model organizes business entities through Hubs (core business keys such as invoices and suppliers), Links (relationships between those entities), and Satellites (contextual and historical attributes such as amounts, charge types, and supplier details).

When a user selects an invoice in the Streamlit investigation application, the agent retrieves the relevant entity, navigates relationships through the Data Vault structures, and gathers historical context for comparison. A rule-based analysis layer then performs deterministic checks such as unusual amounts or new charge types. These structured findings are passed to Snowflake Cortex, which generates a concise reasoning explanation.

The result is presented through the Streamlit interface, completing a full investigation loop where the agent identifies entities, analyzes relationships and history, and produces an explainable outcome.Let us now proceed with the implementation.

### Building the Data Vault Model

*(The code files can be accessed* [*here*](https://github.com/Krishsriniv/Data-Vault-Agentic-AI)*)*

We begin by creating a database and schema dedicated to the demonstration.

![](https://cdn-images-1.medium.com/max/440/1*9aOM-1_LWCei1VthL-Mn9w.png)

Next, we create the hub tables representing the primary business entities: invoices and suppliers.

![](https://cdn-images-1.medium.com/max/617/1*KQT2yNWqWoXfe1f3y6Hqpg.png)

The link table captures the relationship between invoices and suppliers.

![](https://cdn-images-1.medium.com/max/423/1*qrYht2-uW-6DmsdvYO90TA.png)

We then create satellite tables that store invoice attributes and supplier details.

![](https://cdn-images-1.medium.com/max/1024/1*pOc0qMiIMDM5hNBMe4h6Yg.png)

### Creating Realistic Invoice Histories

To make the investigation meaningful, we populate the model with three suppliers exhibiting different invoice behaviors.

![](https://cdn-images-1.medium.com/max/406/1*tmG_fl_hTU3mfmL8ZcxqnQ.png)

*Note: The SQL script included with this blog (*[Data Vault SQL Setup.sql](https://github.com/Krishsriniv/Data-Vault-Agentic-AI/blob/main/Data%20Vault%20SQL%20Setup.sql))*, populates the Data Vault hubs (invoice and supplier identifiers), links (supplier–invoice relationships), and satellite tables containing invoice attributes and supplier details. Together, these inserts create a small but structured dataset that allows the investigation agent to evaluate invoices against historical supplier behavior.*

This dataset allows the investigation agent to demonstrate three realistic outcomes: anomaly detection, normal patterns, and moderate variation.

Rather than listing every SQL insert in the article, the full statements are available in the accompanying script. The inserts follow the Data Vault structures created earlier by populating the hubs, links, and satellites with a small but realistic invoice history.

The dataset is designed to simulate three common operational patterns. The first supplier, **Global Freight Services**, contains an intentionally anomalous invoice. Two historical invoices fall within a typical range of approximately 400 CAD, while a newer invoice appears with a significantly higher amount and a different charge type. The invoice also contains a phone number that does not match the supplier master record, allowing the investigation logic to detect multiple anomalies.

The second supplier, **Northern Cargo Logistics**, represents a clean and consistent invoice history. The invoices follow similar amounts and charge types, providing an example of a normal operational pattern where the investigation should not flag any issues.

The third supplier, **AeroParts Distribution**, demonstrates moderate variation in invoice amounts while remaining within a reasonable range. This scenario helps illustrate how the investigation agent distinguishes between normal operational fluctuations and true anomalies.

We create a view that joins the Data Vault tables and provides a simplified access layer for the application.

![](https://cdn-images-1.medium.com/max/762/1*qoe-xEpz14cUfgQ45osjFg.png)

### Building the Investigation Agent with Streamlit

Once the data model is in place, we build a Streamlit application in Snowflake that performs the investigation workflow.

To create the Streamlit application, choose the database and schema that were created as part of this use case. Check the “Run on Warehouse” option and choose the Warehouse of your choice. Click Create.

![](https://cdn-images-1.medium.com/max/526/1*T1mM6EsWaGmwBtWlfOa8dA.jpeg)

Edit and Copy the contents from [Data Vault Agent Streamlit.py](https://github.com/Krishsriniv/Data-Vault-Agentic-AI/blob/main/Data%20Vault%20Agent%20Streamlit.py) into the Streamlit application editor. Run the Application.

The application acts as the orchestration layer that connects the Data Vault model, the anomaly detection logic, and the AI reasoning capability. It begins by presenting a dropdown list of available invoices, allowing the user to select an invoice for investigation.

Each method in the Streamlit application corresponds to a specific step in the investigation workflow. We will go over these. Keep the streamlit file open for easy reference, as we explore each method.

#### get\_invoice\_list()

This method retrieves the list of invoice numbers from the VW\_INVOICE\_SUPPLIER\_CONTEXT view and populates the dropdown used in the interface.

![](https://cdn-images-1.medium.com/max/523/1*1AW5SNMzs8QUlTUKzspxeA.png)

Instead of requiring users to manually enter invoice numbers, the application dynamically pulls available invoices from the dataset. This allows the user to quickly review different investigation scenarios across suppliers.

#### get\_invoice\_context(invoice\_number)

Once an invoice is selected, this method retrieves the full context for that invoice from the Data Vault-based view.

![](https://cdn-images-1.medium.com/max/644/1*wT4OIp9aSPDPsicTllqWyA.png)

Conceptually, this is where the investigation begins. The application identifies the business object being investigated and retrieves its attributes, including invoice amount, charge type, supplier ID, and supplier details. Although the application queries a consolidated view, the underlying data still originates from the Data Vault hubs, links, and satellites created earlier in the SQL script.

#### get\_historical\_invoices (supplier\_id, current\_invoice, current\_invoice\_date)

This method retrieves prior invoices from the same supplier. by extracting invoices prior to the current invoice date, so that that only invoices with an earlier invoice date are treated as historical records.

![](https://cdn-images-1.medium.com/max/769/1*U8OinLO6ZtM8C44tsLL-fA.png)

By restricting the comparison to earlier invoices, the application ensures that the agent compares the selected invoice against a valid historical baseline.

#### rule\_analysis(current, historical)

The rule analysis function applies deterministic business logic to the investigation.

![](https://cdn-images-1.medium.com/max/986/1*9PCEXrpHjJYmGd2ph7_k8A.png)

The method evaluates whether the selected invoice differs significantly from the supplier’s historical behavior. It checks whether the invoice amount is substantially higher than previous invoices, whether the charge type is new relative to the supplier’s history, and whether supplier contact details match the master supplier record.

These checks provide structured findings that ground the investigation in explainable logic before invoking the AI reasoning layer.

#### cortex\_reasoning(result)

After the structured findings are generated, they are passed to **Snowflake Cortex** for reasoning.

![](https://cdn-images-1.medium.com/max/914/1*3hivnLAionY0kyflUOwk1A.png)

The application sends the investigation context and rule-based findings to the SNOWFLAKE.CORTEX.COMPLETE function along with a prompt instructing the model to generate an explanation of the findings. *(The Streamlit application currently uses* ***Claude Sonnet 4–5****. To test other models, simply update the MODEL\_NAME declaration in the Streamlit script)*. This step transforms structured anomaly indicators into a concise business narrative that describes why the invoice may or may not be unusual.

The Streamlit interface ties these methods together into an interactive investigation workflow. The user selects an invoice from the dropdown, and the application retrieves the invoice context, analyzes prior supplier invoices, applies anomaly rules, and generates an AI explanation.

### Investigation Outcomes

Because the dataset includes suppliers with different invoice patterns, the agent produces different results depending on the selected invoice.

Selecting **INV-10452** from the dropdown list, triggers the anomaly detection logic. The invoice amount is significantly higher than previous invoices from the same supplier, the charge type is unusual, and the phone number does not match the supplier master record.

Selecting invoices from **Northern Cargo Logistics** results in a clean investigation outcome because those invoices follow consistent patterns.

Invoices from **AeroParts Distribution** demonstrate moderate variation that still falls within expected operational behavior.

This variation highlights how the agent interprets different scenarios.

The following image shows a sample output for **INV-10452**. It consists of three sections, combined into a single view in this image for readability.

![](https://cdn-images-1.medium.com/max/1024/1*CcBJmCQIkJUjKFp9R4Dw6Q.png)

Additionally, the output also includes the current invoice context along with a capture of previous invoice records that were used for this comparison.

![](https://cdn-images-1.medium.com/max/1020/1*76IsteII7WS94QJMjJaaOQ.png)

As demonstrated, Data Vault architecture and Agentic AI combine to create an invaluable, auditable system for autonomous, complex data management. This relationship establishes an intelligent loop for enterprise operations. The **Data Vault represents the robust ‘memory’,** a secure, structured repository for entire historical context. The **Agentic AI acts as the ‘brain’,** the active intelligence that dives into that memory to analyze patterns and initiate complex operations autonomously.

### Data Vault as Enterprise Memory for AI Systems

One of the most interesting takeaways from this example is how naturally Data Vault supports AI-driven decision-making.

![](https://cdn-images-1.medium.com/max/1024/1*RDOKC04OrzMCKvyw8vA0kg.png)

While the methodology was originally designed for enterprise data warehousing, its structure also functions extremely well as a structured **memory model** for intelligent systems. Hubs define what entities exist. Links define how those entities connect. Satellites provide the contextual information needed to interpret those connections. When an agent investigates a business scenario, it essentially moves through these structures in the same way a human analyst would explore related data. As organizations begin integrating AI agents into enterprise workflows, the importance of well-structured data models becomes increasingly clear.

Data Vault does more than store information. It organizes enterprise knowledge in a way that allows intelligent systems to navigate, investigate, and reason over business data. When combined with modern AI capabilities, Data Vault provides a powerful architectural foundation for building AI systems that not only analyze enterprise data, but also explain their findings in a transparent and auditable way.

The code files for this blog can be accessed [here.](https://github.com/Krishsriniv/Data-Vault-Agentic-AI)

*I share hands-on, implementation-focused perspectives on Generative & Agentic AI, LLMs, Snowflake and Cortex AI, translating advanced capabilities into practical, real-world analytics use cases. Do follow me on* [*LinkedIn*](https://www.linkedin.com/in/krishsrinivasans/) *and* [*Medium*](https://medium.com/@krish.srinivasans) *for more such insights.*

.

* * *

[Agentic AI in Action — Part 15 — From Hubs and Links to Intelligent Action: Data Vault for Agentic…](https://pub.towardsai.net/agentic-ai-in-action-part-15-from-hubs-and-links-to-intelligent-action-data-vault-for-agentic-c74ed57622b6) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.