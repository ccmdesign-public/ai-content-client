---
title: "Intruder Detection through Webpage Session Tracking"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/intruder-detection-through-webpage-session-tracking-e52a2017b8d5?source=rss----b680b860beb1---4"
publishedAt: "2026-03-21"
tags:
  - "analytics"
  - "data-science"
  - "machine-learning"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-21T16:30:37.355Z"
---

# Intruder Detection through Webpage Session Tracking

![](https://cdn-images-1.medium.com/max/1024/1*sBzb_Cs5LXLSVNdx_90RWw.png)

*My logistic regression journey from sparse site counts to a 0.94443 Kaggle score*

At first, a web browsing session seems simple: just a few visited sites, some timestamps, and subtle patterns in the click order. However, in the Alice competition, this small trail of activity leads to an interesting question:

**Did this session belong to Alice, or was it someone else using the same computer?**

This challenge is what makes the project so interesting. Instead of building the most complex model, the aim is to see how far a well-designed pipeline can go with the right **data** **representation**, **validation strategy**, and **feature engineering**.

In this project, I built a machine learning pipeline to identify whether a web browsing session belongs to **Alice** or to an **intruder**, using visited websites and session timing information. The project is based on the Kaggle competition [**“Catch Me If You Can: Intruder Detection through Webpage Session Tracking”**](https://www.kaggle.com/c/catch-me-if-you-can-intruder-detection-through-webpage-session-tracking2) **(a.k.a. “Alice”)** and focuses on solving a behavioral classification problem using **Logistic Regression** with **sparse representations** and carefully engineered temporal features.

Instead of just showing the final model, this article walks through the whole modeling process: starting from simple baseline submissions, improving the validation scheme, engineering more informative features, testing different preprocessing choices, and comparing cross-validation performance against leaderboard feedback to understand what actually improved the model.

By the end of the project, I improved the pipeline step by step into a Kaggle submission scoring **0.94443**, using a combination of:

-   **sparse site representations**
-   **CountVectorizer** and **TF-IDF**
-   **sequence n-grams**
-   **time-aware cross-validation**
-   **time-of-day and calendar-based features**
-   **careful feature scaling**
-   **regularization tuning**

More importantly, this project is about understanding **why** each experiment mattered, what worked, what failed, and how a relatively simple model can become much stronger through disciplined iteration.

### What this article covers

In this article, I walk through:

1.  **Baseline modeling** with sparse site features
2.  **Improved validation** using a correct time-aware CV strategy
3.  **Feature engineering** with temporal and session-based signals
4.  **Representation experiments** using CountVectorizer and TF-IDF
5.  **Preprocessing and regularization tuning**
6.  **Submission-by-submission results and lessons learned**

The goal is not just to show the final classifier, but to share the full machine learning workflow: from baseline construction to iterative improvement, validation, experimentation, and interpretation of results.

### Why this project matters

This project is meaningful because it tackles a real machine learning challenge: **behavioral identification from usage patterns**.

Rather than using passwords, browser fingerprints, or network metadata, the task is to recognize a user based on the structure and timing of their browsing sessions. The model needs to decide if a sequence of websites and timestamps matches Alice’s usual behavior or someone else’s activity on the same computer.

There are two main reasons why this project is important.

First, it demonstrates how effective a simple model can be when the pipeline is well-designed. By combining **sparse representations**, **feature engineering**, and **regularization**, **Logistic Regression** can work surprisingly well for this kind of problem.

Second, it teaches a lesson that applies beyond Kaggle: for time-based data, **the validation strategy can be just as important as the model itself**. Good features matter less if your evaluation method does not match the data’s structure.

That’s why this project is about more than just getting a better leaderboard score. It’s also about learning to build a more reliable machine learning workflow by improving representation, validation, and experimentation.

### Project overview

In this project, I tackle a binary classification task. Given a browsing session with up to 10 websites and their timestamps, the goal is to predict if the session belongs to **Alice** (1) or to **someone else** (0).

The dataset has **253,561 labeled training sessions** and **82,797 unlabeled test sessions**. Alice’s sessions make up only a small part of the training data (**2,297 positive examples**), so the classification problem is highly imbalanced. Because of this, **ROC-AUC** is used as the main evaluation metric since it gives more useful information than plain accuracy.

To solve the problem, I stay within one model family throughout the project: **Logistic Regression**. Instead of moving to more complex algorithms, I focus on strengthening the pipeline through better feature design, preprocessing, and validation.

Throughout the project, I tried several ideas to boost performance:

1.  **A sparse bag-of-sites baseline** built directly from visited website IDs
2.  **Text-style representations** of browsing sessions using **CountVectorizer**
3.  **TF-IDF-based features** for a more weighted sparse representation
4.  **Sequence-aware information** through **n-gram features**
5.  **Time-aware validation** using **TimeSeriesSplit**
6.  **Temporal and behavioral feature engineering**, including hour-based, calendar-based, and session-level features
7.  **Preprocessing improvements**, especially **feature scaling** for continuous variables
8.  **Regularization tuning** through the Logistic Regression parameter C

Overall, these experiments show that a simple linear model can become much more powerful when the data is well represented, and the evaluation is conducted carefully.

### Roadmap

I’ve organized this article by following the order of submission files, since each one marks a key step in the project. This should make the modeling journey easier to follow.

I begin with the earliest sparse baselines, then move into improved validation, stronger text-style representations, richer temporal feature engineering, and finally the preprocessing and tuning decisions that shaped the later submissions.

Here’s the order I’ll follow:

1.  baseline\_1.csv: a manual sparse bag-of-sites baseline
2.  baseline\_2.csv: add simple time features and tune regularization
3.  subm1.csv: switch to **CountVectorizer** with n-grams and time-aware validation
4.  subm2.csv: add time-based features to the CountVectorizer branch
5.  subm3.csv: tune the regularization strength C on the CountVectorizer branch
6.  subm01.csv: restart from a cleaner **TF-IDF**\-based baseline
7.  subm02.csv: add richer cyclical time features
8.  subm03.csv: simplify the feature set by removing redundant raw hour information
9.  subm04.csv: add unscaled session duration, leading to a sharp performance drop
10.  subm05.csv: correct that issue by scaling session duration properly
11.  subm06.csv: extend the feature set with additional calendar features
12.  subm07.csv: perform final regularization tuning on the TF-IDF branch

This isn’t just the order from the original notebook. I chose this sequence because it tells the story of how the project grew from basic sparse features into a stronger, better-validated pipeline.

### Two ideas that shaped the whole project

While the notebook covers many experiments, most improvements come down to two main ideas: **how the sessions are represented**, and **how the model is validated**.

#### 1\. Sparse representations were essential

Each browsing session has only a few visited websites, but there are many unique sites in the dataset. This means the feature matrix is very wide and mostly made up of zeros.

That makes **sparse representations** a natural fit. They allow **Logistic Regression** to remain computationally efficient while still capturing useful patterns in visited-site sequences.

Across the project, I work with three main sparse encodings:

-   a **manual CSR matrix** built directly from site IDs
-   **CountVectorizer** applied to site-ID sequences
-   **TfidfVectorizer** applied to site-name sequences

These different ways of representing the data are a big reason for the project’s progress. Most performance gains came from changing how the browsing sessions were encoded, not from changing the model family.

#### 2\. Validation had to respect time

The sessions in this competition are in chronological order, so the validation strategy has to respect the time structure of the data.

If future sessions leak into training folds used to evaluate earlier sessions, the validation score becomes too optimistic and doesn’t reflect the real competition. In this kind of problem, a strong model is not enough; the evaluation scheme also has to match how the data actually behaves.

That’s why time-aware validation is so important in this project. I use it in two stages:

-   An earlier **chronological holdout** approach for the first baselines
-   Later, **TimeSeriesSplit** for a more realistic cross-validation setup

This change is one of the most important parts of the pipeline. It makes the validation results much more reliable and helps show which improvements are real.

> Note on presentation: This article focuses on the modeling journey at the level of results and interpretation: the main experiments, what changed from one submission to the next, and what each result showed about the problem. I do not go through the full implementation line by line. The complete code, including data preparation, feature engineering, model training, validation, and submission generation, is available in the GitHub repository linked at the end of the article.

### The submission journey

The rest of this article walks through the full submission history in a clearer, more organized way.

Instead of showing the notebook as a set of separate experiments, I’ve rebuilt the modeling journey using the **12 actual submission files** that mark each key step. Each submission shows a specific modeling choice, like a new representation, a different validation setup, an added feature, or a change in preprocessing that shifted the result in a meaningful way.

For each submission, I explain:

-   What **changed** from the previous step
-   **Why** I decided to try that change
-   The **main code idea** behind the experiment
-   The **validation signal** available at that stage
-   The **leaderboard result** for that submission
-   and the **lesson learned** that shaped the next iteration

The goal isn’t just to list the submissions in order. I want to show how the project grew through experimentation, from early sparse baselines to stronger, better-validated models, and how each step helped clarify what really improved performance.

### 1) baseline\_1.csv : the first real baseline

The project begins with the most direct representation possible: each session is converted into a sparse row of **site visit counts**.

This first submission does not include any engineered time features, vectorizers, or extra preprocessing. It serves as the reference point for all later steps.

#### What changed

At this stage, nothing complex was added yet. The goal was simply to train a first meaningful model using only the visited-site information already present in each session.

#### Why I tried it

Before engineering new features, I wanted to see how much predictive signal was already contained in the websites themselves.

If a simple, sparse representation of visited sites could already separate Alice’s behavior from that of other users, that would provide a strong baseline and justify building on top of it.

#### The main code idea

The core idea was to represent each session as a **CSR sparse matrix**, where each row corresponds to a session and repeated site IDs are naturally accumulated into visit counts.

```
full_sites_sparse = csr_matrix((data, indices, indptr))model = LogisticRegression(C=1.0, solver="liblinear", random_state=17)model.fit(full_sites_sparse[:idx_split], y_train)
```

Even though the model is simple, this representation already captures an important behavioral pattern: the set of sites a user tends to visit can act as a useful fingerprint.

#### Validation takeaway

The early helper function get\_auc\_lr\_valid() evaluates the model using a **chronological 90/10 holdout**, which is more appropriate than a random split for this time-ordered dataset:

```
def get_auc_lr_valid(X, y, C=1.0, seed=17, train_ratio=0.9):    split_idx = round(X.shape[0] * train_ratio)    X_train, X_valid = X[:split_idx], X[split_idx:]    y_train, y_valid = y[:split_idx], y[split_idx:]    model = LogisticRegression(C=C, random_state=seed, solver="liblinear")    model.fit(X_train, y_train)    y_valid_pred = model.predict_proba(X_valid)[:, 1]    return roc_auc_score(y_valid, y_valid_pred)
```

In other words, the model is trained on the first 90% of sessions and evaluated on the last 10%, preserving the chronological order of the data and avoiding a validation scheme that would unrealistically mix past and future sessions.

With this setup, the baseline achieved a **ROC-AUC of 0.9195**.

#### Leaderboard score

**0.90812**

#### What I learned

This first result established an important starting point: a simple sparse linear model can already perform well on this problem.

Even without time-based features, the websites visited hold a lot of useful information about behavior. This led to the next question: if site identity alone is already strong, how much more can time-based signals add?

### 2) baseline\_2.csv: adding simple time features, scaling, and the first tuning pass

The second submission builds on the original baseline by combining sparse site features with a small set of temporal variables, making the pipeline richer and more informative.

#### What changed from the previous step

Compared to baseline\_1.csv, this version adds three new features to the sparse site-count matrix:

-   start\_month
-   start\_hour
-   morning

It also includes an initial tuning step for the Logistic Regression regularization strength C.

#### Why I tried it

Exploratory analysis suggested that **when** a session starts could matter, along with **which** sites are visited.

If Alice tends to browse at certain hours or shows different behavior in the morning, then time-based information could add to the sparse site features and improve the model.

#### What I found before the submission

This stage involved several small but important experiments that shaped the final set of features:

-   Adding start\_month **without scaling** hurt performance badly
-   scaling start\_month corrected that issue
-   n\_unique\_sites gave a slight validation drop and was removed
-   Both start\_hour and morning contributed a useful signal
-   The strongest early combination was the sparse site matrix plus scaled versions of start\_month, start\_hour, and morning

These experiments were helpful not just for improving the score, but also for showing that even a simple linear model is very sensitive to how dense continuous features are prepared.

#### The main code idea

The key step here is to scale the dense temporal features first, then combine them with the sparse site matrix using the hstack function from scipy.sparse, which stacks the feature blocks column-wise into a single design matrix.

```
scaler = StandardScaler()tmp_train_scaled = scaler.fit_transform(new_feat_train)tmp_test_scaled = scaler.transform(new_feat_test)X_train = hstack([full_sites_sparse[:idx_split], tmp_train_scaled])X_test = hstack([full_sites_sparse[idx_split:], tmp_test_scaled])lr = LogisticRegression(C=C, solver="liblinear", random_state=17).fit(X_train, y_train)
```

An important fix at this stage was fitting the scaler **only** on the **training features**, then applying it to the validation or test features. This avoids leakage and makes the evaluation more reliable.

#### Validation takeaway

With the selected feature set, the default-C version achieved a ROC-AUC of **0.95915** on the chronological holdout.

After scanning different values of C, the best holdout score improved further to **0.96121** at approximately **C = 0.16681**.

#### Leaderboard score

**0.92784**

#### What I learned

This step showed that simple temporal features were genuinely useful, but it also taught a more important methodological lesson:

> **Continuous features need to be scaled carefully when they are combined with sparse inputs in a regularized linear model.**

In other words, the improvement came not just from adding more information, but also from preparing it in a way the model could use well.

### 3) subm1.csv: rebuilding the pipeline around CountVectorizer and time-aware cross-validation

After trying the first two baselines, I stopped using the manually built sparse matrix and rebuilt the pipeline with a more flexible text-style representation.

#### What changed from the previous step

In this version, each session is turned into a space-separated string of site IDs and processed by **CountVectorizer** using 1 to 3-gram features, instead of the approach in baseline\_2.csv.

I also switched from using a single chronological holdout to **TimeSeriesSplit**, which provides a more realistic, time-aware way to validate the model.

#### Why I tried it

I had two main reasons for making this change.

First, **CountVectorizer** makes it easier to go beyond just counting individual sites and helps capture **short navigation patterns** using n-grams.

Second, **TimeSeriesSplit** is a better validation strategy for this competition than using a single fixed holdout. Because the data is time-ordered, I wanted a setup that would show how well the model could generalize across different parts of the timeline.

#### The main code idea

The main idea was to turn each session into a text-like sequence of site IDs and use **CountVectorizer** to create a sparse feature matrix with unigram, bigram, and trigram patterns.

```
vectorizer = CountVectorizer(    ngram_range=(1, 3),    max_features=50_000,    token_pattern=r"\b[1-9]\d*\b",)X_train = vectorizer.fit_transform(train_sessions)cv_scores = cross_val_score(model, X_train, y_train, cv=time_split, scoring="roc_auc")
```

One important detail is the regular expression, which leaves out padding zeros so that the vocabulary only includes real site IDs and not artificial placeholders.

This keeps the representation cleaner and more meaningful, especially when sessions are padded to a fixed length.

#### Validation takeaway

With **TimeSeriesSplit**, this version reached a **mean ROC-AUC of 0.86648 ± 0.08217**.

This validation score was lower than the earlier holdout-based results, but that was not necessarily a bad sign. It showed that the evaluation was stricter and more realistic.

#### Leaderboard score

**0.91409**

#### What I learned

This submission did not beat the strongest earlier baseline, but it introduced two ideas that became very important for the rest of the project:

-   a cleaner way to represent **sequential site patterns**
-   a more trustworthy **time-aware validation strategy**

In short, even though the score did not improve right away, this step made the whole pipeline stronger.

### 4) subm2.csv: adding time-of-day signals to the CountVectorizer branch

After setting up the CountVectorizer-based pipeline, the next step was to add back the time-based signal that had already been useful in earlier baselines.

#### What changed from the previous step

Compared to subm1.csv, this version adds four binary features based on when the session started:

-   morning
-   day
-   evening
-   night

These features are added to the sparse CountVectorizer representation, so the model can use both the site sequence and the time-of-day information.

#### Why I tried it

Earlier experiments had already shown that the time of browsing matters.

The CountVectorizer branch already captured **what happened** in a session using visited-site patterns and n-grams. This step adds information about **when it happened**, which could help distinguish Alice’s browsing behavior from other users more clearly.

#### The main code idea

The main idea was to create a few simple binary indicators from the session start hour and add them to the sparse site-sequence matrix.

```
def add_time_features(df, X_sparse):    hour = df["time1"].dt.hour    time_features = df.assign(        morning=((hour >= 7) & (hour <= 11)).astype("int8"),        day=((hour >= 12) & (hour <= 18)).astype("int8"),        evening=((hour >= 19) & (hour <= 23)).astype("int8"),        night=((hour >= 0) & (hour <= 6)).astype("int8"),    )[["morning", "day", "evening", "night"]].to_numpy()    return csr_matrix(hstack([X_sparse, time_features]))
```

This is a simple feature-engineering step, but it adds helpful behavioral context without making the model more complicated.

#### Validation takeaway

With these added time-of-day features, the time-series cross-validation score improved a lot to **0.91516 ± 0.05947**.

That was a strong signal that temporal information was not just marginally helpful, but genuinely important in this branch of the pipeline.

#### Leaderboard score

**0.93877**

#### What I learned

This was one of the clearest improvements in the whole project.

The result showed that the site-sequence representation and the temporal representation were **complementary rather than redundant**. The model benefited from knowing both **which sites appeared in the session** and **when the session took place**.

This step also reinforced a key lesson from the project: strong models often come from combining different useful signals, not just making the algorithm itself more complicated.

### 5) subm3.csv: tuning C on the CountVectorizer branch

At this stage, the CountVectorizer-based pipeline already looked strong. The next step was to revisit regularization to see if better tuning could improve performance even more.

#### What changed from the previous step

Compared to subm2.csv, this version keeps the same CountVectorizer representation and time-of-day features, but adds a more systematic search over the Logistic Regression regularization strength C.

To do that, I ran **GridSearchCV** over a logarithmic grid of C values using the same time-aware cross-validation setup.

The first run produced convergence warnings, so I increased max\_iterto 5000 and reran the search.

#### Why I tried it

Once the feature set is stable, tuning the regularization strength is more useful.

In Logistic Regression, C controls the balance between underfitting and overfitting:

-   Smaller values of C apply stronger regularization
-   Larger values of C apply weaker regularization

At this point, the representation and feature set were already strong, so it made sense to see if better regularization could improve generalization.

#### The main code idea

The main idea was to keep the pipeline the same and use **GridSearchCV** with time-aware splits to find the best value of C.

```
model = LogisticRegression(solver="liblinear", random_state=17, max_iter=5000)grid = GridSearchCV(    estimator=model,    param_grid={"C": np.logspace(-2, 2, 10)},    scoring="roc_auc",    cv=time_split,)grid.fit(X_train_new, y_train)
```

This stage did not introduce new features. Instead, it focused on making better use of the existing features by tuning the model’s regularization.

#### Validation takeaway

The best mean cross-validation score was **0.91702**, with the strongest result at approximately **C = 0.21544**.

The improvement was smaller than the jump from subm1.csv to subm2.csv, but it was still meaningful.

#### Leaderboard score

**0.94262**

#### What I learned

This step showed that tuning was still important, even after most gains came from representation and feature engineering.

The improvement was smaller than the one from adding time-of-day features, but it was real.

It also reinforced a key pattern from earlier steps: once the representation is strong, even small changes in regularization can make a measurable difference.

### A deliberate reset: moving from raw counts to a cleaner TF-IDF branch

Until now, the strongest branch in the project was the CountVectorizer pipeline built on site IDs. I also explored a second branch based on **site names** and **TF-IDF**.

This is the only place in the article where the score progression resets intentionally. That reset is not a break in the story; it reflects a real modeling decision.

#### Why reset at all?

There were a few good reasons to start a new branch:

-   **TF-IDF** can reduce the influence of globally common sites that may appear often without being especially discriminative
-   Using **site names** instead of raw numeric IDs makes the representation easier to interpret
-   The new branch provides a cleaner and more structured base for additional feature engineering

So the next submission should be seen not as a continuation of the CountVectorizer branch, but as a **fresh baseline built on a different and more interpretable feature space**.

### 6) subm01.csv: a TF-IDF baseline over site-name n-grams

This submission opens the second major branch of the project.

#### What changed from the previous step

Compared to subm3.csv, I rebuilt the session representation from scratch:

-   site IDs were mapped back to **site names**
-   zero padding was removed
-   sessions were vectorized with **TF-IDF** instead of raw counts
-   the n-gram range was expanded to **1–5**

This created a new sparse feature space based on site-name sequences instead of numeric site IDs.

#### Why I tried it

The motivation for this change was that common websites, like search engines or popular service domains, can dominate raw count-based representations without actually helping much with discrimination.

**TF-IDF** is a natural way to address this problem because it downweights terms that appear frequently across many sessions and gives relatively more importance to terms that are more distinctive.

Using site names also makes the feature space much easier to interpret than using raw ID-based sequences.

#### The main code idea

The main idea was to convert each session into a sequence of site names and then build a TF-IDF representation with longer n-grams.

```
vectorizer = TfidfVectorizer(    ngram_range=(1, 5),    max_features=50_000,    token_pattern=r"(?u)\b\S+\b",)X_train_sites = vectorizer.fit_transform(train_sessions_as_site_names)
```

One important detail here is the token\_pattern: full domain names should stay together as tokens instead of being split into smaller parts.

This makes the resulting n-grams much more meaningful for understanding browsing behavior.

#### Validation takeaway

With this TF-IDF baseline, the time-series cross-validation score was **0.86624 ± 0.07873**.

This was a clean and usable starting point for the new branch, but it did not outperform the strongest CountVectorizer-based pipeline.

#### Leaderboard score

**0.92101**

#### What I learned

This step gave me a cleaner and more interpretable baseline, even if it did not beat the best earlier branch on its own.

That was still a useful result. The point of this reset was not just to chase the best immediate score, but also to build a feature space that was easier to understand and to extend with later feature engineering.

In other words, this submission created a new foundation. It would matter more in the next steps than it did on its own.

### 7) subm02.csv: richer time features on top of TF-IDF

Once I had a solid TF-IDF baseline, I decided to reintroduce the temporal signal from an earlier version, but this time in a more refined way.

#### What changed from the previous step

In this version, compared to subm01.csv, I added a wider range of time-based features on top of the TF-IDF representation:

-   morning
-   day
-   evening
-   night
-   is\_weekend
-   cyclical hour features: hour\_sin, hour\_cos
-   and a normalized raw hour

These changes made the temporal side of the feature set more detailed than what I had in the earlier CountVectorizer branch.

#### Why I tried it

A plain numeric hour is not an ideal representation of time, because it treats the clock as if it were linear.

In reality, 23:00 and 00:00 are right next to each other, but numerically they appear far apart. The cyclical encoding fixes this by mapping hours onto a circular representation using sine and cosine.

At the same time, using broader time-of-day categories, such as morning and evening, keeps the features simple and easier to interpret.

#### The main code idea

The main idea was to engineer both coarse-grained and geometry-aware time features, then add them to the TF-IDF feature matrix.

A shortened version of that function looks like this:

```
def add_time_features_cyc(times, X_sparse, add_hour=True):    hour = times["time1"].dt.hour    weekday = times["time1"].dt.weekday    morning = ((hour >= 7) & (hour <= 11)).astype("int8").to_numpy().reshape(-1, 1)    day = ((hour >= 12) & (hour <= 18)).astype("int8").to_numpy().reshape(-1, 1)    evening = ((hour >= 19) & (hour <= 23)).astype("int8").to_numpy().reshape(-1, 1)    night = ((hour >= 0) & (hour <= 6)).astype("int8").to_numpy().reshape(-1, 1)    is_weekend = (weekday >= 5).astype("int8").to_numpy().reshape(-1, 1)    hour_sin = np.sin(2 * np.pi * hour / 24).to_numpy().reshape(-1, 1)    hour_cos = np.cos(2 * np.pi * hour / 24).to_numpy().reshape(-1, 1)    features = [X_sparse, morning, day, evening, night, is_weekend, hour_sin, hour_cos]    if add_hour:        hour_scaled = (hour / 24).to_numpy().reshape(-1, 1)        features.append(hour_scaled)    return csr_matrix(hstack(features))
```

And the function was then used like this:

```
X_train_with_times1, new_feat_names = add_time_features_cyc(    train_times,    X_train_sites,    add_hour=True,)
```

The important idea is that this step combined three kinds of temporal information in one place:

-   **binned time-of-day indicators**
-   a **weekend flag**
-   and a **cyclical encoding of hour**

That gave the model a more expressive description of when each session happened.

#### Validation takeaway

With these richer temporal features, the time-series cross-validation score increased to **0.89091 ± 0.10557**.

This result showed that the TF-IDF branch also benefited from better temporal representation, not just from the site-based features themselves.

#### Leaderboard score

**0.94175**

#### What I learned

This step showed that time features worked well in both main branches of the project.

The improvement did not come only from knowing which sites were visited in a session. It also came from representing clock time in a way that better matched how time actually behaves.

In other words, the model benefited not just from **site content** but also from a more meaningful encoding of **when** browsing occurred.

### 8) subm03.csv: removing the raw hour to reduce redundancy

This was one of the most helpful small experiments in the project.

#### What changed from the previous step

In this version, compared to subm02.csv, I kept the same time-of-day bins, weekend flag, and cyclical hour features, but removed the extra normalized raw hour.

#### Why I tried it

The raw hour feature overlaps conceptually with several features that were already present:

-   morning, day, evening, night
-   hour\_sin
-   hour\_cos

This made it likely to be redundant.

If those other encodings already captured the useful time structure, then the extra raw hour might not help much and could even add unnecessary noise.

#### The main code idea

The main change was to rebuild the time-feature block without including the raw hour.

```
X_train_with_times2, new_feat_names = add_time_features_cyc(    train_times,    X_train_sites,    add_hour=False,)
```

This is a small change, but it shows an important modeling habit: once a richer feature set is in place, it is worth checking if every part of it is still needed.

#### Validation takeaway

After removing the raw hour, the cross-validation score improved slightly to **0.89120 ± 0.10485**.

The improvement was small, but it supports the idea that the removed feature was not adding much beyond the other time encodings.

#### Leaderboard score

**0.94180**

#### What I learned

This step reinforced a helpful lesson from feature engineering:

**Adding more features does not always make a model better.**

When two or more features carry essentially the same information, the simpler version can generalize slightly better. In this case, the cyclical encoding and the broad time-of-day indicators already seemed to capture the useful time structure well enough on their own.

### 9) subm04.csv: the most educational failure (unscaled session duration)

This was the clearest failure in the project, but it turned out to be one of the most useful as well.

#### What changed from the previous step

Compared to subm03.csv, this version adds one new feature:

-   sess\_duration = the last timestamp in the session minus the first timestamp

The key detail is that this feature was added in its **raw millisecond scale**, without any normalization or standardization.

#### Why I tried it

Session duration feels like a meaningful behavioral feature.

Some users go through sessions quickly, while others spend more time browsing. In principle, this difference could help distinguish Alice’s behavior from other users.

So the feature itself was reasonable. The real issue was how it was added.

#### The main code idea

The core idea was to compute the duration of each session from its earliest and latest timestamps, then add that value directly to the existing sparse feature matrix.

```
session_duration_ms = (    (times.max(axis=1) - times.min(axis=1))    .astype("timedelta64[ms]")    .astype(int)    .to_numpy()    .reshape(-1, 1))X_train_with_duration_unscaled = hstack([X_train_with_times2, session_duration_ms])
```

The idea behind the feature was sound, but its scale was not. The raw duration values were orders of magnitude larger than the other inputs in the model.

#### Validation takeaway

The cross-validation score dropped sharply to **0.67687 ± 0.05725**.

This drop clearly showed that the problem wasn’t with the idea of session duration, but with how the feature was added.

#### Leaderboard score

**0.66528**

#### What I learned

This step was the best example in the project of how much poor preprocessing can hurt results.

A potentially useful behavioral signal ended up causing problems simply because its scale differed so much from the rest of the feature set. Instead of helping the model, it distorted the optimization and overpowered the more carefully prepared features.

In other words, this experiment didn’t show that session duration was a bad feature. It showed that **unscaled session duration** was a bad feature.

### 10) subm05.csv: the same idea, scaled correctly

After the failure in the previous step, the next move was straightforward: keep the same feature, but prepare it properly.

#### What changed from the previous step

Compared to subm04.csv, the session duration feature remains in the pipeline, but it is now standardized using **training-set statistics only** before being added to the sparse matrix.

The underlying idea stayed the same. The only thing that changed was the preprocessing.

#### Why I tried it

The previous step did not prove that session duration was useless.

It showed that **raw, unscaled session duration** was actually harmful. That’s a very different takeaway.

Since the feature itself still made sense from a behavioral perspective, it was worth trying again with the correct scaling procedure.

#### The main code idea

The key step was to fit a **StandardScaler** on the training durations only, then apply that scaler to the validation or test durations before combining the result with the existing feature matrix.

```
duration_scaler = StandardScaler()train_duration_scaled = duration_scaler.fit_transform(train_durations.to_numpy().reshape(-1, 1))test_duration_scaled = duration_scaler.transform(test_durations.to_numpy().reshape(-1, 1))X_train_with_duration_scaled = hstack([X_train_with_times2, train_duration_scaled])
```

This made the duration feature similar in scale to the other engineered features and avoided the scale mismatch that caused the previous collapse.

#### Validation takeaway

With the scaled duration feature, the cross-validation score recovered strongly to **0.89397 ± 0.10079**.

This improvement made the lesson clear: the feature wasn’t harmful on its own; it just needed to be added in the right form.

#### Leaderboard score

**0.94256**

#### What I learned

This step reinforced one of the most important lessons in the project about modeling:

**A useful feature can seem useless, or even harmful, if the preprocessing is wrong.**

The difference between subm04.csv and subm05.csv wasn’t the idea of session duration. It was how the feature was scaled.

That’s exactly the kind of distinction that good validation is supposed to help uncover: not just whether a feature helps, but whether it’s prepared in a way the model can actually use.

### 11) subm06.csv: adding calendar context

After fixing the session duration, the next step was to expand the time representation. Instead of only looking at the time of day, I also considered **where each session falls on the calendar**.

#### What changed from the previous step

This version adds three new features based on time1, compared to subm05.csv:

-   day\_of\_week
-   month
-   year\_month as a coarse trend feature

These features are added to the existing TF-IDF + time + scaled-duration matrix.

#### Why I tried it

User behavior often changes with the calendar and the time of day.

For example, browsing patterns can vary between weekdays and weekends, across different months, or as user behavior shifts over time. These signals are usually weaker than site-sequence patterns, but they can still help when combined with the rest of the pipeline.

#### The main code idea

The main idea was to derive a few simple calendar-based features from the session start time and add them to the existing feature matrix.

```
day_of_week = start_time.dt.weekday.to_numpy().reshape(-1, 1)month = start_time.dt.month.to_numpy().reshape(-1, 1)year_month = ((start_time.dt.year * 100 + start_time.dt.month) / 1e5).to_numpy().reshape(-1, 1)X_train_final = hstack([X_train_with_duration_scaled, day_of_week, month, year_month])
```

The year\_month feature is especially useful because it serves as a rough trend indicator and provides the model with longer-term temporal context.

#### Validation takeaway

After adding these calendar features, the cross-validation score improved again to **0.89564 ± 0.10010**.

The improvement was not dramatic, but it followed the same positive trend as earlier feature additions. Based on the submission history, this was the **highest leaderboard score in the project**.

#### Leaderboard score

**0.94443**

#### What I learned

This step showed that adding calendar context was quietly helpful.

The gain was smaller than the earlier jump from adding time-of-day signals, but both validation and leaderboard performance improved. This is the kind of feature addition you want in an iterative competition workflow: not flashy, but consistently helpful.

It also reinforced an important lesson from the project:

**Once the strongest signals are in place, real progress often comes from combining several small, well-chosen improvements.**

### 12) subm07.csv: final regularization tuning on the TF-IDF branch

The last submission revisits regularization one more time, this time on the project’s richest feature set.

#### What changed from the previous step

Compared to subm06.csv, this version keeps the full TF-IDF + time + duration + calendar matrix and runs a denser hyperparameter search over **100 logarithmically spaced values of** C.

#### Why I tried it

Once the feature set is stable, a more detailed regularization search is a sensible final step.

By this point, most of the structural feature engineering was already done. This made it a good time to see if the final pipeline could benefit from a more precise regularization setting.

#### The main code idea

The main idea was to perform a denser **GridSearchCV** sweep over C using the same time-aware validation setup.

```
c_values = np.logspace(-2, 2, 100)grid = GridSearchCV(    estimator=model,    param_grid={"C": c_values},    scoring="roc_auc",    cv=time_split,    n_jobs=4,)grid.fit(X_train_final, y_train)
```

This did not change the feature space. It just aimed to get the best possible performance from the final feature set.

#### Validation takeaway

The best grid-search score reached **0.89664**, and the refit model reported **0.89667 ± 0.09824** at approximately **C = 3.1993**.

The improvement was modest, but it matched the idea that a final tuning pass can still add a small gain once the rest of the pipeline is stable.

#### Leaderboard score

**0.94441**

#### What I learned

This final step confirmed a pattern that had already become clear earlier in the project:

**Hyperparameter tuning still helps, but only a little once the major gains have already come from representation and feature engineering.**

In this case, the validation score improved slightly, but the leaderboard score moved from **0.94443** to **0.94441**, which is essentially flat and slightly worse in practice. That small mismatch is a useful reminder that tiny CV gains do not always translate into leaderboard improvements.

### Submission history summary

The table below summarizes the entire submission journey in one place.

It lists the final order of submissions, the main change at each step, the most relevant validation signal at that point, and the corresponding leaderboard result.

![](https://cdn-images-1.medium.com/max/1024/1*gE7nC0jMS77TW8XyvyoEnA.png)

A quick look at the table highlights the main pattern in the project:

-   The largest improvements came from **stronger temporal features**
-   The clearest failure came from **poor feature scaling**
-   And **hyperparameter tuning** helped, but much less than representation and feature engineering

Looking at the submission history as a whole, the main lesson is clear: the biggest improvements came not from changing the model family, but from better data representation, validation, and preparation.

### What worked

Several ideas consistently improved the pipeline:

#### Time-aware validation

The project became much more reliable once the evaluation matched the time-ordered structure of the data.

Using **TimeSeriesSplit** meant training on earlier sessions and validating on later ones. That made the validation results more realistic and the experimental conclusions easier to trust.

#### Time-based features

The most consistent gains came from features derived from time1, including:

-   coarse **time-of-day bins**
-   **cyclical hour encodings**
-   **weekend flags**
-   **session duration**, once it was scaled correctly
-   and a few **calendar-based features**

One of the clearest lessons was that it mattered not just **which sites were visited**, but also **when they were visited**.

#### Sparse linear modeling

This project also showed that high-dimensional sparse data works very well with Logistic Regression.

The model stayed fast, interpretable, and competitive throughout, which made it possible to focus on improving the feature space rather than moving to a more complex algorithm.

### What did not work or did not work well enough

Not every idea improved the model. Some features did not work at all, and others were not useful enough to keep.

#### Unscaled numeric features

The clearest failure was with subm04.csv. Adding **unscaled session duration** caused both cross-validation and leaderboard performance to collapse.

A similar problem appeared earlier when start\_month was first added without scaling. These experiments showed how sensitive regularized linear models are to **feature scale**: even a useful feature can become harmful if it is introduced at the wrong magnitude.

#### Redundant time encodings

The raw hour feature did not hurt the model, but it did not add much once the model already included:

-   **time-of-day bins**
-   hour\_sin
-   hour\_cos

Removing it gave a small improvement on the TF-IDF branch. This suggests the other encodings were already capturing the important time patterns.

#### Some reasonable features simply did not help

Some ideas were worth testing, but did not pass validation.

For example, n\_unique\_sites seemed like a good behavioral feature, but in the early baseline pipeline, it did not add enough value to keep.

This was a good reminder that feature engineering is not just about adding new signals. It is also about removing features that do not help the model.

### Using validation and leaderboard together

One of the most useful lessons from this project was that **cross-validation** and **leaderboard performance** should be considered together, not as the same thing.

For the most important changes, they usually moved in the same direction:

-   stronger **time-based features** improved both
-   fixing **feature scaling** improved both
-   adding **calendar features** improved both

This consistency showed that the validation setup was working as intended.

At the same time, the relationship was not perfect. Some gains that looked meaningful in validation led to only small changes on the leaderboard. Some cleaner branches also started with weaker leaderboard scores, even when they were methodologically better.

The main lesson was not to simply trust cross-validation or the leaderboard. Instead, it is best to use each for what it does well:

> *Use a* ***time-aware, leakage-safe validation scheme*** *to guide modeling decisions. Use the* ***leaderboard*** *as a secondary reality check.*

### What I would try next

If I continued this project, I would first focus on making the current workflow cleaner and more expressive **before moving to a different model family**.

#### 1\. Leakage-safe end-to-end pipelines

A natural next step would be to wrap sparse vectorization and dense feature transformations into a formal pipeline, ensuring that each transformation is fitted strictly within the training folds.

This would make the workflow cleaner, easier to maintain, and less likely to have accidental leakage.

#### 2\. Richer sequence modeling

The current representations already capture short navigation patterns through n-grams, but there is still room to model session structure more explicitly.

Possible next ideas include:

-   position-aware features such as site1, site2, and so on
-   longer or more targeted subsequences
-   features that distinguish early-session behavior from later-session behavior

#### 3\. Higher-level site grouping

Another promising direction would be to supplement raw sites with broader categories, such as:

-   search
-   social
-   messaging
-   video
-   work-related domains

This could help the model understand behavioral intent at a higher level, not just the exact site visited.

#### 4\. Interaction-style linear features

I would also look at interaction terms between **site patterns** and **time buckets**.

For example, a certain website sequence might be much more informative in the morning than at night. This kind of interaction can still work well in a linear model.

#### 5\. A stricter comparison between the two main branches

Finally, I would compare the **CountVectorizer** and **TF-IDF** branches again using the same evaluation protocol, validation setup, preprocessing, and feature additions.

This would make it easier to see the effect of the representation itself.

I would not start by jumping to a much more complex model. This project shows there is still plenty of room to improve a careful linear baseline before trying something more advanced.

### Final conclusion

The most interesting part of this project is not just the final score, but the process that led to it.

The submission history shows this process clearly:

-   start with a sparse baseline
-   respect time in validation
-   engineer behaviorally meaningful features
-   scale continuous variables carefully
-   and only then tune regularization

That step-by-step progress mattered more than any single trick.

If there is one main lesson from this project, it is this:

> *In time-ordered tabular problems, the biggest improvements often come from better* ***representation****,* ***validation****, and* ***feature engineering,*** *not from switching to a more complex classifier.*

That is exactly what happened here.

A simple **Logistic Regression** model became much stronger because the data was represented more thoughtfully, the validation was more realistic, and the feature engineering was better. This, more than the final score, made the project worth documenting.

Thanks for making it all the way to the end! I hope you found this as fun and enlightening as I did. If you have any thoughts, questions, or ideas for taking this further, I’d love to hear from you in the comments.

**Links**

• Full notebook + code: [https://github.com/Intruder\_Detection\_through\_Webpage\_Session\_Tracking](https://github.com/Nahid-ahmdv/Intruder_Detection_through_Webpage_Session_Tracking)

• LinkedIn: [Nahid Ahmadvand](https://www.linkedin.com/in/nahid-ahmadvand-00382b365/)
• Email: [nahid.ahmadvand@sharif.edu](mailto:nahid.ahmadvand@sharif.edu)

* * *

[Intruder Detection through Webpage Session Tracking](https://medium.com/data-and-beyond/intruder-detection-through-webpage-session-tracking-e52a2017b8d5) was originally published in [Data And Beyond](https://medium.com/data-and-beyond) on Medium, where people are continuing the conversation by highlighting and responding to this story.