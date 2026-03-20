---
title: "Customer Segmentation with K-Means Clustering in Python — A Practical Guide"
author: "Data Driven Investor"
platform: "medium"
publicationName: "Data Driven Investor"
url: "https://medium.datadriveninvestor.com/customer-segmentation-with-k-means-clustering-in-python-a-practical-guide-80609a2fab3c?source=rss----32881626c9c9---4"
publishedAt: "2026-03-17"
tags:
  - "analytics"
  - "data-science"
  - "machine-learning"
  - "model-training"
  - "python"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Programming"
tagsNormalizedAt: "2026-03-19T14:28:26.873Z"
---

# Customer Segmentation with K-Means Clustering in Python — A Practical Guide

# Customer Segmentation with K-Means Clustering in Python — A Practical Guide

[Daniel Agbojo](https://medium.com/@danielagbojo2?source=post_page---byline--80609a2fab3c---------------------------------------)

3 min read·2 days ago

\--

2

Not all customers are the same. Some spend big and buy often. Others browse a lot but rarely purchase. Some are loyal; others are one interaction away from leaving.

Customer segmentation is how businesses group their customers into meaningful clusters so they can be able to tailor strategies for each group. And K-Means clustering is one of the most widely used unsupervised machine learning algorithms to do exactly this.

In this tutorial, I will walk you through building a complete segmentation pipeline in Python from data preparation to business recommendations.

**How K-Means Works (In Simple Terms)**

1.  Pick K — choose how many groups you want
2.  Place centroids — randomly position K centre points in the data
3.  Assign — each customer gets assigned to the nearest centre
4.  Move — recalculate each centre as the average of its members
5.  Repeat — keep assigning and moving until groups stabilise

The algorithm finds groupings where customers within each cluster are as similar as possible to each other.

![diagram illustrating k-means algorithm]()

**Step 1: Create the Dataset**

```
import pandas as pdimport numpy as npfrom sklearn.preprocessing import StandardScalerfrom sklearn.cluster import KMeansfrom sklearn.metrics import silhouette_scorefrom sklearn.decomposition import PCAimport matplotlib.pyplot as pltnp.random.seed(42)data = {    'CustomerID': range(1, 201),    'Annual_Income_K': np.concatenate([        np.random.normal(25, 8, 50),        np.random.normal(55, 10, 70),        np.random.normal(90, 12, 50),        np.random.normal(120, 15, 30),    ]),    'Spending_Score': np.concatenate([        np.random.normal(30, 12, 50),        np.random.normal(55, 15, 70),        np.random.normal(80, 10, 50),        np.random.normal(45, 20, 30),    ]),    'Purchase_Frequency': np.concatenate([        np.random.normal(5, 2, 50),        np.random.normal(12, 4, 70),        np.random.normal(20, 5, 50),        np.random.normal(8, 3, 30),    ]),}df = pd.DataFrame(data)df['Annual_Income_K'] = df['Annual_Income_K'].clip(10, 150)df['Spending_Score'] = df['Spending_Score'].clip(1, 100)df['Purchase_Frequency'] = df['Purchase_Frequency'].clip(1, 30)
```

**Step 2: Scale the Features**

## Get Daniel Agbojo’s stories in your inbox

 from this writer.

Remember me for faster sign in

This is crucial. K-Means uses distance to assign clusters. If income is measured in thousands and spending score is 1–100, income will dominate the clustering. StandardScaler puts all features on the same scale.

```
features = ['Annual_Income_K', 'Spending_Score', 'Purchase_Frequency']X = df[features]scaler = StandardScaler()X_scaled = scaler.fit_transform(X)p
```

**Step 3: Find the Optimal K**

How many clusters should we use? Two methods help:

The Elbow Method: Plots inertia (within-cluster variance) against K. Look for the “elbow” where adding more clusters stops helping much.

Silhouette Score: measures how well-separated clusters are. Closer to 1 is better.

```
inertias = []sil_scores = []for k in range(2, 11):    km = KMeans(n_clusters=k, random_state=42, n_init=10)    km.fit(X_scaled)    inertias.append(km.inertia_)    sil_scores.append(silhouette_score(X_scaled, km.labels_))    print(f'K={k}: Silhouette={silhouette_score(X_scaled, km.labels_):.3f}')
```

**Step 4: Apply K-Means and Profile Clusters**

```
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)df['Cluster'] = kmeans.fit_predict(X_scaled)print(df.groupby('Cluster')[features].mean().round(1))
```

Each cluster now has a distinct profile: different average income, spending, and purchase frequency. This is where data science becomes business strategy.

**Why This Matters**

This same approach works across industries: retail (product recommendations), banking (risk profiling), SaaS (tiered pricing), and even agritech (farmer segmentation by crop type and technology adoption).

The key insight is that segmentation turns a generic customer base into actionable groups, each with its own strategy.

Follow me for more practical data science tutorials.

Connect on LinkedIn: [https://www.linkedin.com/in/daniel-agbojo1/](https://www.linkedin.com/in/daniel-agbojo1/)