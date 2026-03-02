---
title: "From Clustering to Anomaly Detection on Olivetti Faces"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/from-clustering-to-anomaly-detection-on-olivetti-faces-984df43f37ef?source=rss----b680b860beb1---4"
publishedAt: "2026-02-22"
tags:
  - "analytics"
  - "data-science"
categories:
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-01T21:19:30.588Z"
---

# From Clustering to Anomaly Detection on Olivetti Faces

# **From Clustering to Anomaly Detection on Olivetti Faces**

[Nahid Ahmadvand](/@nahid.nm57?source=post_page---byline--984df43f37ef---------------------------------------)

13 min read·Dec 22, 2025

\--

*PCA → K-Means → “distance features” → GMM likelihood → reconstruction error*

Before deep learning became the default answer for computer vision, a lot of face-related work was all about clever tricks with **linear algebra**, **clustering**, and **density models**. These classic approaches might seem old-school now, but they’re full of insight, and honestly, they’re pretty fun to tinker with!

So I decided to dust off that “classic” toolbox and try it out on a tiny dataset. The goal isn’t to build the next state-of-the-art face recognition system! Instead, it’s to (re)discover what makes these methods tick, and maybe recover a few intuitions along the way.

Here’s what I’ll be exploring:

**Eigenfaces (PCA)**: Can we capture the essence of a face with just a few numbers?
**Clustering (K-Means):** What happens if we let the data group itself?
**Mixture models (GMMs):** How can we represent faces as overlapping blobs in high-dimensional space?
**Reconstruction-based anomaly detection:** Is it obvious when a face just doesn’t fit in?

If you want all the details (and the code), you can check out the [**GitHub repo**](https://github.com/Nahid-ahmdv/Olivetti_Faces).

This is the **Medium-article version**: focused on the story, the most interesting plots, and just enough code to show the magic.

## Results at a Glance

— With PCA, I was able to shrink each 4096-pixel face down to just 199 numbers, while still preserving 99% of the original information (variance). Not bad for some good old-fashioned linear algebra.

— When it came to clustering, the “best” result from my K-Means experiments happened when I let the algorithm pick 115 clusters (with a silhouette score of about 0.223). Not the most intuitive grouping, but sometimes the data has its own logic!

— For identity classification (aka: can we tell who’s who?):

-   Feeding PCA features into a Random Forest scored an impressive 97.5% test accuracy.
-   Relying only on K-Means cluster distances topped out at around 85%.
-   Combining both PCA and cluster distances got me to 95%, a bit of a boost, but still not quite as good as just using PCA.

— For anomaly detection (spotting the odd one out):

-   Using GMM likelihoods, I managed to flag about 60% of the “bad” faces, with only 2% false positives.
-   With PCA reconstruction error, every single anomaly was caught clean and clear.

Bottom line: Even with small data and classic techniques, there’s still a lot you can do (and some surprises along the way)!

## What This Article Covers

For this project, I’m using the classic **Olivetti Faces** dataset: 400 grayscale images, each one a 64×64 snapshot of a face. With this humble collection, we’ll build a simple but surprisingly powerful pipeline:

1.  **Compress faces with PCA** so that old-school machine learning models can work their magic without drowning in pixels.
2.  **Cluster faces with K-Means** and actually peek at what those clusters mean: are they picking up on glasses, smiles, or something else?
3.  **Turn K-Means into a feature extractor** by measuring how close each face is to every cluster center.
4.  **Fit a GMM** (Gaussian Mixture Model) to:

-   Create “average-ish” faces (think face mashups)
-   Score which faces look suspiciously different from the crowd

**5\. Compare anomaly scores**: See how the likelihood numbers from the GMM stack up against a much simpler approach just using reconstruction error.

## A Quick (Important) Note on Faces

This is a *toy* dataset, meant purely for learning and playing with classic machine learning ideas.
Real-world face recognition and anomaly detection come with serious privacy, fairness, and ethical concerns. Please treat this as an educational exercise, not a production recipe.

## 1) The Dataset: Olivetti Faces

Olivetti is one of those classic datasets that’s *way too small for any real-world deployment,* and that’s exactly what makes it perfect for learning and tinkering. You can run end-to-end experiments like PCA, clustering, and density modeling in just a few minutes, and still get visuals that make the math feel real.

A few quick stats:

-   **400** images in total
-   Each is **64×64** pixels, grayscale (that’s **4096 pixels** per face)
-   **40 different people**, with **10 images each**
-   All pixel values are already scaled to **\[0, 1\],** so no extra preprocessing is needed

Want to load it up? scikit-learn makes it easy:

```
from sklearn.datasets import fetch_olivetti_facesdata = fetch_olivetti_faces()X = data.data      # (400, 4096)y = data.target    # (400,)
```

And here’s a quick peek at what the raw data looks like:

![]()

## 2) A Clean Split (Train / Validation / Test) With No Leakage

Face datasets are extra sneaky: you’ll often find near-duplicates (same person, same pose, maybe just a blink apart). To keep things honest, I made sure to split the data so that every person is balanced across train, validation, and test. No peeking allowed!

Here’s how it breaks down:

-   **Train:** 7 images per person → 280 images
-   **Validation:** 2 images per person → 80 images
-   **Test:** 1 image per person → 40 images

To pull this off, I used `StratifiedShuffleSplit` from scikit-learn twice:

```
from sklearn.model_selection import StratifiedShuffleSplitRANDOM_STATE = 42# 1) Test: 1 image/person → 40 totalsss_1 = StratifiedShuffleSplit(n_splits=1, test_size=40, random_state=RANDOM_STATE)train_valid_idx, test_idx = next(sss_1.split(X, y))# 2) Validation: 2 images/person → 80 total (from remaining 360)sss_2 = StratifiedShuffleSplit(n_splits=1, test_size=80, random_state=RANDOM_STATE + 1)train_idx, valid_idx = next(sss_2.split(X[train_valid_idx], y[train_valid_idx]))
```

Why go through all this trouble? Because we’ll be tuning things like the number of clusters (`k` in K-Means) on the **validation** set, and we want the **test** set to give us a truly fair, final score. No “leakage,” no surprises.

## 3) PCA: The “Eigenfaces” Backbone

Each 64×64 face image has **4096 dimensions**. That doesn’t sound enormous, but it’s more than enough to cause trouble:

-   Distances between faces get noisy and less meaningful.
-   Clustering becomes shaky and unpredictable.
-   Density models (like GMMs) can get totally lost.

This is where PCA swoops in to save the day! It learns a new, lower-dimensional coordinate system that still captures almost all the important variation in your data. In classic face recognition, this is known as the **eigenfaces** approach: each PCA component is basically a “basis face,” and any image can be recreated as a blend of these core faces.

For this project, I told PCA to keep **99% of the variance (information)**. That means we shrunk our data from 4096 dimensions all the way down to just **199 components** without losing the essence of each face.

Here’s how it looks in code:

```
from sklearn.decomposition import PCApca = PCA(n_components=0.99, random_state=RANDOM_STATE)# fit on train only (important!)X_train_pca = pca.fit_transform(X_train)X_valid_pca = pca.transform(X_valid)X_test_pca  = pca.transform(X_test)print(pca.n_components_)  # 199
```

From this point forward, everything happens in PCA space. The high-dimensional pixel chaos is behind us!

## 4) K-Means Clustering in PCA Space

Now that our faces are compressed into PCA space, we can finally ask:

**Do “similar-looking” faces naturally group together, without any labels at all?**

K-Means is the classic way to try this. It’s a bit of a blunt instrument — it just slices up the space into k groups — but it’s fast, easy to understand, and sometimes surprisingly effective. The only catch: you have to decide on the right value for **k**(the number of clusters).

## 4.1) Picking a Reasonable Number of Clusters

Instead of picking k out of thin air, I decided to run a sweep:

-   Tried values from `k = 5` up to `k = 150`, in steps of 5
-   For each k, I tracked two things:
-   **Inertia**: lower is better (tighter clusters)
-   **Silhouette score**: higher is better (better-defined clusters)

Here’s the code snippet:

```
from sklearn.cluster import KMeansfrom sklearn.metrics import silhouette_scorek_values = range(5, 151, 5)silhouettes = []inertias = []for k in k_values:    km = KMeans(n_clusters=k, n_init=10, random_state=RANDOM_STATE)    labels = km.fit_predict(X_train_pca)    inertias.append(km.inertia_)    silhouettes.append(silhouette_score(X_train_pca, labels))best_k = k_values[int(np.argmax(silhouettes))]
```

So, what actually worked best? The highest silhouette score happened at:

-   **k = 115**
-   **silhouette ≈ 0.223**

That number isn’t sky-high, but honestly, that’s expected. Faces are tricky: they overlap and blend together in all sorts of ways. Still, this sweep gives us a solid sense of where the “natural” grouping peaks.

Here’s what those curves look like:

![]()

![]()

## 4.2) What Do Clusters “Look Like”?

Here’s where things get interesting: after running K-Means in PCA space, you can actually take each cluster center and transform it back into a face image.

How? Just map each centroid from PCA space back to the original pixel space:

```
centers_pca = kmeans.cluster_centers_centers_pixels = pca.inverse_transform(centers_pca)  # back to 4096 pixels
```

When you plot these centroids as images, you get something like “prototype faces”, essentially, the average look of each cluster.

Here are a few of those cluster centers for **k = 115**:

![]()

## 4.3) Clusters Aren’t Identities (But They’re Still Useful)

It’s tempting to think: “There are 40 people in the dataset, so K-Means will probably find 40 identity groups, right?”

But in reality, K-Means doesn’t really care about who’s who; it tends to split up the data based on **appearance** rather than **identity**:

-   The same person might end up in several clusters if they have different poses or expressions.
-   Meanwhile, people who look similar, maybe thanks to lighting, facial hair, glasses, or head angle, can get lumped together in a single cluster.

Still, the clusters aren’t just random noise. Some are surprisingly “pure,” dominated almost entirely by a single identity.

Here’s an example of a high-purity cluster (all the faces shown here belong to the same person):

![]()

## 4.4) A Sanity Check with t-SNE

To really see what’s going on in PCA space, I turned to t-SNE: a tool that squashes high-dimensional data down to two dimensions so we can actually look at it.

There are two especially interesting ways to color these plots:

-   By **K-Means cluster:** this shows how the unsupervised algorithm grouped the faces.
-   By **true identity:** this is what we’d ideally want to recover.

Comparing these two views tells the real story. There’s plenty of overlap: faces that look similar (in terms of lighting, pose, or accessories) often end up together, even if they belong to different people. In other words, clustering is mostly picking up on **visual similarity**, not pure identity.

![]()

![]()

## 5) Turning K-Means Into a Feature Extractor

K-Means isn’t just about assigning each face to a single cluster. It can also tell you **how close each face is to every cluster center,** basically, giving you a whole vector of “distances to prototypes” for every sample.

Here’s how that looks in code:

```
km = KMeans(n_clusters=k, n_init=10, random_state=RANDOM_STATE).fit(X_train_pca)D_train = km.transform(X_train_pca)  # shape: (n_samples, k)D_valid = km.transform(X_valid_pca)
```

Think of this as a new way to represent each face: for every centroid, you get an answer to “How close is this face to prototype #j?” It’s a neat, unsupervised way to describe the data.

To see if these distance-based features were actually useful, I tried three supervised pipelines (all using a Random Forest classifier):

1.  **Baseline:** Random Forest on the usual PCA features
2.  **K-Means distances only:** Random Forest just on the centroid-distance features
3.  **PCA + distances:** Combine both feature sets together

## So, how did they do?

**— Baseline (PCA → RF):**

-   Validation accuracy: **93.75%**
-   Test accuracy: **97.5%**

**— Distances only (best k = 120):**

-   Validation accuracy: **78.75%**
-   Test accuracy: **85%**
-   **PCA + distances (best k = 10):**
-   Validation accuracy: **91.25%**
-   Test accuracy: **95%**

So, distance-to-centroid features are *interesting,* they do add some signal. But in this case, using them alone lost too much information, and even when combined, they didn’t outperform the strong PCA baseline.

Here’s what the validation curves looked like as I swept through different values of k:

![]()

![]()

## 6) GMMs: Density Estimation + “Average-ish” Face Generation

With everything mapped into PCA space, we can bring out the big statistical guns: the **Gaussian Mixture Model** (GMM). This model tries to capture the underlying distribution of our data by fitting a bunch of overlapping “blobs” (Gaussians) to it.

I started with **40 components,** one for each identity in the dataset, and used full covariance to let each blob have its own unique shape:

```
from sklearn.mixture import GaussianMixturegmm = GaussianMixture(    n_components=40,    covariance_type="full",    reg_covar=1e-6,    n_init=3,    random_state=RANDOM_STATE,)gmm.fit(X_train_pca)
```

## 6.1) Sampling Synthetic Faces

One of the coolest things about GMMs? You can actually generate new, “average-ish” faces by sampling from the model in PCA space, then mapping those samples back to pixel space:

```
X_gen_pca, comp = gmm.sample(n_samples=20)X_gen = pca.inverse_transform(X_gen_pca)
```

Here are 20 faces created this way (the title on each is the component ID that generated it):

![]()

## 6.2) Likelihood as an Anomaly Score

A classic trick for anomaly detection goes like this:

If the model thinks a point is *really* unlikely, meaning it has a low probability under the learned distribution, it’s probably an anomaly.

To test this out, I created a small batch of **10 synthetic “bad” faces** by messing with normal images:

-   Transposed them (sort of like a weird rotation)
-   Flipped them vertically
-   Darkened them by scaling down the pixel values

Then, I ran both the original and these modified faces through the GMM and compared their log-likelihood scores (`score_samples`).

The idea: normal faces should get high scores, and oddballs should get flagged by low scores.

Here’s how those score distributions turned out:

![]()

To actually use likelihood as an anomaly detector, you need a decision rule. Here’s what I did: I looked only at the **normal** faces and set my threshold at the **2nd percentile** of their log-likelihood scores. (That means, by design, about 2% of normal faces would be flagged as anomalies, so we keep the false positives low.)

With that threshold, the GMM ended up flagging about **60%** of my modified or “bad” images.

This is a nice reality check: **likelihood is useful, but it’s not magic**. Mixture models can sometimes over- or under-estimate densities, especially in higher dimensions, and picking the right threshold depends a lot on how you calibrate with your “normal” data.

## 7) Reconstruction Error: A Simple Anomaly Detector That Worked **Extremely Well Here**

There’s another way to spot outliers, and this time, you don’t even need a fancy density model:

1.  Project the image into PCA space
2.  Reconstruct it back to pixel space
3.  Measure how much the reconstruction differs from the original

Here’s the recipe in code:

```
X_pca = pca.transform(X)X_rec = pca.inverse_transform(X_pca)mse = ((X - X_rec) ** 2).mean(axis=1)
```

The intuition: PCA learns what “normal faces” look like (the so-called “face manifold”). If you give it something weird like a rotated, flipped, or corrupted image PCA’s best guess will still look like a regular face, so the reconstruction ends up way off. That means you get a **large error**.

On my little set of synthetic anomalies, reconstruction error (MSE) did a fantastic job: it separated the “weird” faces from the normal ones almost perfectly:

![]()

With the threshold set at the **98th percentile** of normal reconstruction errors, here’s what happened:

**— All** 10 of my synthetic anomalies were flagged (fraction flagged = 1.0).

— The separation was so clean that:

-   The highest reconstruction error for a normal face was about **0.000397**
-   The lowest error for an anomaly was about **0.000811**

This kind of perfect split won’t always happen on real-world anomaly data but it really highlights why reconstruction error can be such a powerful baseline, especially when your dimensionality reduction (like PCA) does a good job capturing the “normal manifold.”

Here’s a visual: the original modified faces side-by-side with their PCA reconstructions.

![]()

![]()

## Wrap-up: Key Takeaways

**— PCA (99% variance)** made everything else possible, suddenly, clustering, mixture modeling, and reconstruction all became practical (and visualizable).

**— K-Means clusters** mostly captured *visual similarities* like pose, expression, or lighting, rather than perfectly sorting people by identity.

**— Distance-to-centroid features** are a clever trick:

-   They give you a “prototype similarity” perspective,
-   but on this dataset, they weren’t always better than just sticking with the plain PCA features.

**— GMMs** shined at:

-   generating “average-ish” synthetic faces,
-   and doing likelihood-based anomaly scoring (which worked, but wasn’t foolproof).

**— Reconstruction error** (PCA MSE) turned out to be the most reliable anomaly detector in this little experiment.

## Want to take this further?

-   Try classic eigenfaces classifiers like **linear SVM**, **logistic regression**, or **k-NN** on the PCA embeddings.
-   Score your clustering with label-aware metrics (ARI / NMI), since we actually have ground truth.
-   Swap out PCA for an **autoencoder** and compare the results on anomaly detection.
-   Tune your GMM using **BIC/AIC**, and see how things change with `full` vs `diag` covariance types.

Thanks for making it all the way to the end! I hope you found this as fun and enlightening as I did. If you have any thoughts, questions, or ideas for taking this further, I’d love to hear from you in the comments.

## Links

-   **Full notebook + code:** [https://github.com/Nahid-ahmdv/Olivetti\_Faces](https://github.com/Nahid-ahmdv/Olivetti_Faces).
-   **Email:** [nahid.ahmadvand@sharif.edu](mailto:nahid.ahmadvand@sharif.edu)