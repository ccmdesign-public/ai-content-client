---
title: "FraudFlow India: How I Used XGBoost and Gemini 2.5 Flash to Map India’s UPI Fraud Crisis"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/fraudflow-india-how-i-used-xgboost-and-gemini-2-5-flash-to-map-indias-upi-fraud-crisis-e8c5e1704cab?source=rss----b680b860beb1---4"
publishedAt: "2026-03-26"
tags:
  - "analytics"
  - "data-science"
  - "gemini"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-26T21:35:28.856Z"
---

# FraudFlow India: How I Used XGBoost and Gemini 2.5 Flash to Map India’s UPI Fraud Crisis

### **By Vipul | Senior Banking Analytics Professional | 10+ years in Credit Risk and Fraud Detection**

### The Number That Stopped Me Cold

13.42 lakh.

That is how many UPI fraud cases were reported in India in FY2024 alone. Rs.1,087 crore lost. Gone. In a single financial year.

But here is what bothered me more than the number itself.

Most banks still cannot tell you which district is going to blow up next quarter.

After spending 10+ years building credit risk models, fraud detection pipelines, and treasury analytics systems at scale — I decided to build something that could.

I built **FraudFlow India** in 2 days. Here is exactly how it works, what the AI found, and why the results scared me.

### The Problem With How Banks Track Fraud Today

Most bank fraud monitoring systems work reactively. A transaction happens. A rule fires. An alert gets generated. Someone reviews it 24–48 hours later.

What they almost never do is ask:

**“Which geography will see a surge in fraud next quarter — and why?”**

The data to answer this question exists. RBI publishes fraud monitoring returns. NPCI publishes UPI transaction volumes. NCRB tracks cybercrime by district.

The gap is not data. The gap is analytics.

That gap is exactly what FraudFlow India is designed to close.

### What I Built

FraudFlow India is a live AI-powered fraud risk map that:

-   Tracks UPI fraud evolution across 16 major districts from 2018 to 2026
-   Uses real RBI-style data (national fraud trends + district-level estimates)
-   Runs IsolationForest anomaly detection to flag statistical outliers
-   Trains an XGBoost Regressor on 8 years of district fraud trajectory
-   Queries Gemini 2.5 Flash for independent AI-powered 2026 predictions
-   Visualizes everything as an animated bar chart with district risk scores

**Live demo:** [https://huggingface.co/spaces/vb86/fraudflow-india](https://huggingface.co/spaces/vb86/fraudflow-india)

### What the Data Showed: 2018 to 2025

The 8-year trend is alarming.

2018–0.12 lakh cases, Rs.52 Cr lost, UPI at 10% adoption
2019–0.49 lakh cases, Rs.145 Cr lost, UPI at 20%
2020–1.15 lakh cases, Rs.285 Cr lost, UPI at 30%
2021–3.44 lakh cases, Rs.489 Cr lost, UPI at 45%
2022–7.25 lakh cases, Rs.573 Cr lost, UPI at 60%
2023–13.42 lakh cases, Rs.1,087 Cr lost, UPI at 75%
2024–12.64 lakh cases, Rs.981 Cr lost, UPI at 82%
2025–14.50 lakh cases, Rs.1,150 Cr lost, UPI at 85%

**120-fold increase in 7 years.**

Notice 2024 — a slight dip in both cases and amount. Initial counter-measures had some effect. RBI’s circulars, bank-level controls, and early MuleHunter.AI pilots showed early results.

But fraudsters adapted fast. 2025 saw the sharpest rebound yet.

### The Tech Stack

### Step 1: IsolationForest Anomaly Detection

Before training XGBoost, I used scikit-learn’s IsolationForest to flag which districts were statistical anomalies in the fraud data.

IsolationForest works by randomly partitioning data and checking how quickly a data point gets isolated. Anomalies (extreme values) get isolated faster than normal points. Districts that consistently showed fraud levels far above their peers got flagged as hotspots.

```
pythonfrom sklearn.ensemble import IsolationForestiso = IsolationForest(contamination=0.15, random_state=42)df_district['anomaly_score'] = iso.fit_predict(features)df_district['is_hotspot'] = df_district['anomaly_score'] == -1
```

Mumbai, Delhi, and Bengaluru were consistently flagged as hotspots across multiple years.

### Step 2: XGBoost Regression for 2026 Predictions

This is where it gets interesting.

I first tried XGBoost Classification — asking “Is this district a hotspot: Yes or No?” The problem was that Mumbai, Delhi, Bengaluru, and Pune all scored 88.2% because they all fell above the 75th percentile threshold. No differentiation.

**Classification asks: “Did these students pass?” Answer: Yes for all top 4 — no ranking.**

So I switched to XGBoost Regression — asking “What will the exact fraud index be in 2026?”

**Regression asks: “What exact marks did each student score?” Answer: 95, 84, 68, 60 — clearly differentiated.**

The 9 features I trained on were year index, district cases local, national fraud cases in lakh, national fraud amount in crore, UPI adoption percentage, year-on-year cases growth rate, district national share percentage, cumulative cases since 2018, and previous year’s fraud count

```
pythonimport xgboost as xgbxgb_model = xgb.XGBRegressor(    n_estimators=200,    max_depth=5,    learning_rate=0.05,    subsample=0.8,    colsample_bytree=0.8,    random_state=42)xgb_model.fit(X_train, y_train)
```

XGBoost predicted the 2026 fraud index for each district. I then applied min-max normalization to convert raw scores to a 0–100% risk scale:

```
pythonrisk_pct = ((predicted - min_predicted) /             (max_predicted - min_predicted)) * 100
```

**Mumbai = 100% (maximum predicted fraud index)**
**Kanpur = 0% (minimum predicted fraud index)**
**Every other city falls proportionally between them.**

### Step 3: Gemini 2.5 Flash Independent Verification

Here is what makes this project unique.

I did not use Gemini to generate the risk scores. I used it to **independently verify** what XGBoost had already found — by giving it the complete 2018–2025 district trend data and asking it to reason about 2026 hotspots from scratch.

```
pythonfrom google import genaiclient = genai.Client(api_key="YOUR_KEY")model_gemini = "gemini-2.5-flash"prompt = f"""You are an expert Indian banking fraud analyst.Given this 2018-2025 district fraud data:{all_years_summary}Predict top 3 hotspot districts for Q2-Q4 2026."""response = client.models.generate_content(    model=model_gemini,    contents=prompt)
```

Gemini’s response was independent of XGBoost. It reasoned from text patterns, growth trajectories, and contextual knowledge about Indian metros.

### The Result That Surprised Me Most

**Two completely different AI systems — one statistical, one language-based — independently arrived at the exact same top 3 cities.**

Gemini 2.5 Flash 2026 hotspot predictions:
Mumbai MH — 40% of national fraud risk
Delhi DL — 33%
Bengaluru KA — 27%

XGBoost 2026 fraud risk scores:
Mumbai MH — 100%
Delhi DL — 83%
Bengaluru KA — 66%
Pune MH — 54%
Hyderabad TG — 38%

**Two AI models. Same top 3. Every single time.**

That convergence is the signal.

### What Gemini Said About RBI’s MuleHunter.AI

Gemini’s analysis of MuleHunter.AI’s impact on 2026 fraud patterns was particularly sharp:

*“RBI’s MuleHunter.AI will significantly disrupt fraud patterns in 2026 by actively identifying and freezing mule accounts essential for money laundering. This will likely reduce the successful siphoning of fraud amounts, forcing fraudsters to devise new, less traceable methods for fund dispersal.”*

In other words — MuleHunter.AI solves one link in the fraud chain. Fraudsters will adapt. The 2026 wave will look different from 2025. More sophisticated. Less traceable.

### Gemini’s 3 Specific RBI Actions for 2026

1.  **Mandate real-time AI/ML fraud detection** across all regulated entities — not just mule account detection but identification of new modus operandi
2.  **Intensify targeted multilingual public awareness campaigns** on social engineering and safe UPI practices specifically in high-risk urban centres
3.  **Strengthen inter-agency collaboration** for rapid tracing, freezing, and repatriation of defrauded funds — and expedite prosecution

### Why I Chose XGBoost Over Other Models

This is a question I get asked often in banking analytics contexts. Here is my decision framework:

```
What is your problem?│├── Predict a NUMBER → Regression│   ├── Simple linear pattern → Linear Regression│   └── Complex non-linear pattern → XGBoost Regressor│├── Predict YES/NO or A/B/C → Classification│   ├── Simple → Logistic Regression│   └── Complex → XGBoost Classifier│└── Find hidden patterns (no labels) → Unsupervised    ├── Groups → K-Means    └── Outliers → IsolationForest
```

**Why XGBoost specifically:**

Fraud growth is non-linear. A straight line cannot capture a 120x increase that accelerates exponentially, dips in one year, then rebounds sharply. XGBoost handles this naturally through its ensemble of decision trees each correcting the errors of the previous one.

For structured tabular data under 10,000 rows with mixed numerical features — XGBoost wins almost every time. This is why it dominates Kaggle competitions and powers credit scoring models at major banks worldwide.

### Lessons for Banking Analytics Professionals

**1\. Geography matters more than transaction type**
Most fraud models focus on transaction-level features — amount, time, merchant category. FraudFlow shows that district-level trajectory data adds a powerful predictive layer that most models ignore.

**2\. Two models agreeing is stronger than one model being accurate**
When XGBoost (statistical) and Gemini (reasoning) independently flag the same cities — that convergence is more credible than either model alone. This is the ensemble principle applied at the architecture level.

**3\. The 2024 dip was a trap**
Banks that reduced fraud monitoring investment after the 2024 dip are now exposed to the 2025 rebound. Fraudsters do not stop — they adapt. Continuous monitoring is not optional.

**4\. MuleHunter.AI is necessary but not sufficient**
RBI’s MuleHunter.AI targets the cash-out phase of fraud. But sophisticated fraud rings will find new methods. Banks need to monitor for new modus operandi in parallel — not wait for the next RBI circular.

### Try It Yourself

The live demo is deployed on Hugging Face Spaces:

[**https://huggingface.co/spaces/vb86/fraudflow-india**](https://huggingface.co/spaces/vb86/fraudflow-india)

It includes:

-   Animated bar chart of district fraud evolution (2018–2025)
-   National trend chart (cases vs amount dual axis)
-   XGBoost 2026 risk scores for all 16 districts
-   Full Gemini 2.5 Flash prediction narrative
-   Top 5 hotspot districts table

### What’s Next

FraudFlow India v1 uses district-level estimates derived from national RBI data and state-level splits. Version 2 roadmap:

-   Integrate actual RBI DBIE API data when available
-   Add real-time UPI transaction volume overlays from NPCI
-   Expand to 100+ districts using NCRB cybercrime data
-   Add SHAP explainability layer to show which features drive each district’s risk score
-   Build a bank-level alert dashboard for fraud teams

### Connect With Me

If you work in banking analytics, fraud detection, credit risk, or fintech product management — I would love to discuss this further.

The tools exist. The data exists. The only thing missing is the will to build.

**LinkedIn:** [https://www.linkedin.com/in/vipul-bali-a0a68237/](https://www.linkedin.com/in/vipul-bali-a0a68237/)
**Live Demo:** [https://huggingface.co/spaces/vb86/fraudflow-india](https://huggingface.co/spaces/vb86/fraudflow-india)

*Built by Vipul | Data: RBI DBIE/NCRB | ML: XGBoost + IsolationForest | AI: Gemini 2.5 Flash | Stack: Python, Streamlit, Plotly, Hugging Face*

* * *

[FraudFlow India: How I Used XGBoost and Gemini 2.5 Flash to Map India’s UPI Fraud Crisis](https://medium.com/data-and-beyond/fraudflow-india-how-i-used-xgboost-and-gemini-2-5-flash-to-map-indias-upi-fraud-crisis-e8c5e1704cab) was originally published in [Data And Beyond](https://medium.com/data-and-beyond) on Medium, where people are continuing the conversation by highlighting and responding to this story.