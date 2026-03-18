---
title: "Three Agents, One Mission: Building a Real-Time Fraud Detection System with XGBoost"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/three-agents-one-mission-building-a-real-time-fraud-detection-system-with-xgboost-5cbc05c0bad0?source=rss----98111c9905da---4"
publishedAt: "2026-03-18"
tags:
  - "ai-general"
  - "data-science"
  - "machine-learning"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-18T12:05:38.292Z"
---

# Three Agents, One Mission: Building a Real-Time Fraud Detection System with XGBoost

# Three Agents, One Mission: Building a Real-Time Fraud Detection System with XGBoost

[Hafsa Rouchdi](https://medium.com/@h.rouchdi6?source=post_page---byline--5cbc05c0bad0---------------------------------------)

9 min read·10 hours ago

\--

![]()

*How a multi-agent architecture — powered by XGBoost — turns a fraud classifier into a complete, observable, and actionable detection pipeline.*

## Table of Contents

1.  [The Real Problem with Fraud Detection](#1-the-real-problem-with-fraud-detection)
2.  [The Architecture: Divide, Specialize, Collaborate](#2-the-architecture-divide-specialize-collaborate)
3.  [Setting the Stage: The Message Protocol](#3-setting-the-stage-the-message-protocol)
4.  [Agent 1: The Data Fetcher](#4-agent-1--the-data-fetcher-getting-the-data-into-the-room)
5.  [Agent 2 : The Fraud Detector: XGBoost at the Core](#5-agent-2--the-fraud-detector-xgboost-at-the-core)
6.  [Agent 3 : The Notification Sender](#6-agent-3--the-notification-sender-turning-predictions-into-action)
7.  [Bringing It Together: The FraudDetectionModel](#7-bringing-it-together-the-frauddetectionmodel)
8.  [The Dashboard: Watching the Agents Think](#8-the-dashboard-watching-the-agents-think)
9.  [Running It Yourself](#9-running-it-yourself)
10.  [What This System Gets Right : and Where to Take It Next](#10-what-this-system-gets-right--and-where-to-take-it-next)
11.  [Final Thoughts](#11-final-thoughts)

Imagine a $25,000 transaction just hit a customer’s credit card. Within milliseconds, somewhere in a data center, a system needs to decide: legitimate purchase, or fraud?

That decision can’t wait for a data scientist to run a notebook. It can’t come from a single script that loads a CSV, trains a model, and prints a score. It needs to be fast, automated, interpretable, and auditable all at once.

This is the gap that this project sets out to close. Not just another fraud classifier, but a complete **intelligent system**: three autonomous agents that divide the work, communicate in real time, and together deliver structured fraud alerts through a live interactive dashboard. The brain of the operation is **XGBoost** algorithm and by the end of this article, you’ll understand not just *how* it’s used, but *why* the whole architecture is designed the way it is.

## 1\. The Real Problem with Fraud Detection

Most tutorials treat fraud detection as a classification problem. And technically, it is. But that framing hides the harder challenge hiding underneath.

Consider the dataset at the center of this project: the well-known ULB Credit Card Fraud dataset, 284,807 transactions captured over two days in Europe. Only 492 of them are fraudulent, a fraud rate of **0.17%**. One in every 578 transactions. That level of imbalance means a model that never flags anything would be 99.83% accurate. Impressive number. Useless system.

But even after you solve the imbalance problem which XGBoost handles elegantly, more on that shortly you’re still left with a harder set of questions:

-   Who acts on a fraud prediction after the model makes it?
-   How does the fraud signal travel from the classifier to a human analyst?
-   What happens if the data loader crashes, does it take the classifier down too?
-   How do you watch the system think, in real time?

A Jupyter notebook answers none of these. A **Multi-Agent System** answers all of them.

## 2\. The Architecture: Divide, Specialize, Collaborate

Think about how a real bank’s fraud team operates. There’s someone who gathers and validates the transaction data. There’s an analyst who runs the numbers and identifies suspicious patterns. There’s a third person who takes those findings and turns them into actionable alerts : calls to customers, account freezes, incident reports. Each role is specialized. Each person hands off to the next. No single person tries to do everything at once.

This project mirrors that structure exactly. The system is built with **Mesa**, a Python framework for agent-based modeling, and it consists of three autonomous agents, each playing one role in the pipeline:

```
DataFetcherAgent  ──▶  FraudDetectorAgent  ──▶  NotificationSenderAgent   (load & validate)      (classify fraud)          (generate alerts)
```

The three agents never call each other directly. They communicate through a shared **message bus,** a list of typed `Message` objects managed by the central `FraudDetectionModel`. Each agent checks the bus on every simulation step, picks up any message addressed to it, and acts.

This decoupling is the architectural decision that makes the whole system extensible: swap the classifier, add a logging agent, replace the CSV reader with a Kafka stream, none of it requires touching more than one component.

## 3\. Setting the Stage: The Message Protocol

Before meeting the agents individually, it’s worth spending ten seconds on the glue that holds them together. Every piece of information that moves through this system is wrapped in a `Message`:

python

```
class Message:    def __init__(self, sender, receiver, content, message_type):        self.sender       = sender        self.receiver     = receiver        self.message_type = message_type  # "data_ready" | "fraud_detection" | "notification_complete"        self.content      = content
```

That’s it. Four fields. The `message_type` is what each agent checks before doing anything — if the type and receiver don't match what the agent expects, it skips the message entirely. It's a deliberately simple contract, and its simplicity is what makes the system reliable.

## 4\. Agent 1 — The Data Fetcher : Getting the Data Into the Room

The `DataFetcherAgent` has one job: load the transaction data, compute a quick statistical summary, and announce that it's ready. Here's what that announcement looks like:

python

```
# DataFetcherAgent fires a message to the shared bus after loadingmessage = Message(    sender="DataFetcher",    receiver="FraudDetector",    content={'data': self.data, 'stats': stats},    message_type="data_ready")self.model.messages.append(message)
```

Short, clean, purposeful. The `has_processed` flag prevents re-loading on every simulation step, and the stats bundle (total transactions, fraud ratio, amount distribution) travels alongside the raw data so downstream agents don't waste cycles recomputing it.

The dataset itself carries the full weight of the problem: 284,807 rows, 28 anonymized PCA features (`V1`–`V28`), plus raw `Amount` and `Time`. The class imbalance is baked in from the start.

## 5\. Agent 2 — The Fraud Detector: XGBoost at the Core

When the `data_ready` message lands, the `FraudDetectorAgent` wakes up. This is where the machine learning happens, and it starts with a preprocessing step that's easy to overlook but genuinely matters.

The 28 PCA features (`V1`–`V28`) are already in a normalized scale that's a byproduct of PCA itself. But `Amount` ranges from €0 to €25,691, and `Time` spans over 172,000 seconds. Left unscaled, these two features would dominate the model's split decisions. `StandardScaler` brings everything onto the same footing before the 30-feature matrix reaches XGBoost:

python

```
# Scale Amount and Time to match the already-normalized V1-V28 featuresdata['scaled_amount'] = self.scaler.fit_transform(data[['Amount']])data['scaled_time']   = self.scaler.fit_transform(data[['Time']])feature_cols = ['scaled_time', 'scaled_amount'] + [f'V{i}' for i in range(1, 29)]
```

With the features ready, the classifier trains on an 80/20 split:

## Get Hafsa Rouchdi’s stories in your inbox

 from this writer.

Remember me for faster sign in

python

```
self.classifier = XGBClassifier(    n_estimators=100,   # 100 boosting rounds    max_depth=4,        # shallow trees — avoids overfitting on PCA features    learning_rate=0.1,  # conservative convergence    random_state=42)self.classifier.fit(X_train, y_train)
```

**Why XGBoost?**

This wasn’t a default choice, it was a conclusion. Before building this system, I published a rigorous five-way comparison on this exact dataset, benchmarking ***Decision Tree***, ***KNN***, ***Linear SVM***, ***Random Forest***, and ***XGBoost*** across ***PR-AUC***, ***Recall***, ***F1***, and MCC rather than the misleading accuracy score.

***XGBoost*** led across all four meaningful metrics. If you’d like to see the full evaluation and the reasoning behind each design decision, the article is here: \[[*When Accuracy Lies: A Rigorous Machine Learning Approach to Credit Card Fraud Detection*](/when-accuracy-lies-a-rigorous-machine-learning-approach-to-credit-card-fraud-detection-d96737857d84)\] .

The reason XGBoost wins on this problem comes down to its architecture. Its sequential error-correction — each new tree specifically trained to fix the mistakes of all previous trees — is precisely what’s needed when the fraud signal is sparse, subtle, and buried in 30 dimensions.

After prediction, the agent extracts **feature importances** from `self.classifier.feature_importances_` and packs them into the outgoing message. These don't stay in a chart, they travel directly to the next agent, where they become part of every fraud alert.

## 6\. Agent 3 — The Notification Sender: Turning Predictions Into Action

A fraud prediction with no downstream action is just a number. The `NotificationSenderAgent` closes that gap. When the `fraud_detection` message arrives, it iterates over every flagged transaction and builds a structured, human-readable alert:

python

```
notification = {    'alert_id':       f"ALERT_{self.notifications_sent + 1:04d}",    'amount':         transaction['Amount'],    'confidence':     np.random.uniform(0.75, 0.95),    'top_indicators': self.get_top_indicators(transaction, feature_importance),}
```

The `get_top_indicators()` call is the interpretability layer: it sorts the XGBoost feature importance dictionary and returns the three most influential features for this prediction. A security analyst reading alert `ALERT_0042` doesn't just see "fraud detected", they see which features (`V14`, `V17`, or whichever PCA component scored highest) drove the model's suspicion, giving them a concrete starting point for investigation.

Severity is tiered automatically: transactions above $1,000 or with confidence above 90% are marked **Critical**, above $500 or 80% confidence are **High**, everything else is **Medium,** each with a different recommended response timeline.

## 7\. Bringing It Together: The FraudDetectionModel

The three agents don’t float in isolation. They’re created, registered, and coordinated by `FraudDetectionModel`, the Mesa model that acts as the system's runtime:

python

```
# All three agents created and registered in one placeself.data_fetcher        = DataFetcherAgent(1, self)self.fraud_detector      = FraudDetectorAgent(2, self)self.notification_sender = NotificationSenderAgent(3, self)
```

Mesa’s `RandomActivation` scheduler calls every agent's `step()` method on each simulation tick. Because each agent only activates when its expected message arrives, the full pipeline completes naturally across 3–5 steps, no manual orchestration, no hardcoded sequence. The `DataCollector` captures live metrics (fraud count, transactions processed, processing speed) at every step to feed the dashboard.

## 8\. The Dashboard: Watching the Agents Think

Running the file launches a live web dashboard built with Mesa's `ModularServer`. Eight panels update in real time as you step through the simulation:

-   **System Overview** : Live KPI counters: transactions analyzed, frauds detected, and detection rate, updated at every step.
-   **Agent Workflow** : Color-coded status cards for each agent: idle, processing, completed, or error, so you always know which stage is active.
-   **Communication Log** : An animated inter-agent message timeline showing exactly when each message was sent and what it carried.
-   **Performance Charts** : SVG bar and line charts tracking fraud alert progress and transaction throughput across simulation steps.
-   **Transaction Monitor** : A real-time feed of flagged transactions with their individual risk scores.
-   **Alert Center** : Full alert detail for every flagged transaction: amount, confidence score, top XGBoost risk indicators, and recommended actions for the security team.

The dashboard makes the invisible visible. Instead of reading a final printout, you can step through the simulation one tick at a time and watch the `DataFetcherAgent` turn green, the `FraudDetectorAgent` spin up, and the first alert materialize in the Alert Center “***all in sequence***”.

## 9\. Running It Yourself

The full project code is available on [GitHub](https://github.com/Hafsa06rd) you can clone the repository and run everything locally in just a few steps:

```
# Install dependenciespip install mesa pandas numpy xgboost scikit-learn
```

```
# Download creditcard.csv from Kaggle and place it in the project root# https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud# Run the CLI pipelinepython fraud_detection_system.py# Or launch the live dashboardpython visualization.py
```

The CLI run completes in 8 steps and prints a full summary: transactions analyzed, fraud cases detected, detection rate, processing speed, and total runtime.

## 10\. What This System Gets Right and Where to Take It Next

This architecture answers the four questions that a notebook can’t. Each agent fails independently. The message protocol makes communication auditable. The dashboard makes performance visible at every step. XGBoost provides interpretable signal, not just a score.

But there’s room to grow:

**Class imbalance tuning :** Adding `scale_pos_weight = neg_count / pos_count` to the XGBoost config would push recall higher without touching anything else. It's a one-line change with a meaningful impact on fraud capture rate.

**SHAP explanations :** The current alerts surface *global* feature importances. Per-transaction SHAP values would make each alert more precise : “V14 pushed this specific transaction toward fraud by 0.38” is a much more actionable signal than “V14 is generally important.”

**Live streaming :** Swap the CSV reader in `DataFetcherAgent` for a Kafka consumer, and the system becomes genuinely real-time. Transactions arrive as they happen; alerts fire within seconds.

**Feedback loop :** Analyst verdicts (confirmed fraud, false positive ) could feed back as labeled data, enabling continuous retraining. Right now the loop stops at alert dispatch. Closing it would make the system adaptive.

**Deployment :** Wrapping `FraudDetectionModel` in a FastAPI endpoint turns this prototype into a callable microservice. A banking platform, a compliance dashboard, a mobile app, all could interact with it through a clean REST interface.

## 11\. Final Thoughts

There’s a common ceiling in data science projects: ***you train a model, optimize it, evaluate it, and then the notebook ends***. This project deliberately pushes past that ceiling. The model is just one component in a system that ingests data, makes decisions, dispatches alerts, and shows its own work all autonomously.

Multi-agent architecture is one compelling way to build that kind of system. Each concern lives in its own agent. Communication is explicit and inspectable. The whole thing runs, observably, one step at a time.

Whether you’re exploring agent-based modeling for the first time or looking for a practical framework to wrap your next ML project, I hope this gave you something useful to build on. Questions, suggestions, and improvements are always welcome in the comments.

**Full project code:** *\[* [*GitHub*](https://github.com/Hafsa06rd) */* [*Kaggle*](https://www.kaggle.com/hafsarouchdi) *\]*

*Thanks for reading! If you found this article useful, feel free to leave a comment or connect. Feedback and questions are always welcome.*