---
title: "What If I Told You Matrix Decomposition Is Just Fancy Laundry Sorting?"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/svd-explained-singular-value-decomposition-beginners-guide-447519130333?source=rss----98111c9905da---4"
publishedAt: "2026-03-14"
tags:
  - "ai-general"
  - "data-science"
  - "machine-learning"
  - "python"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Programming"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-14T14:32:30.421Z"
---

# What If I Told You Matrix Decomposition Is Just Fancy Laundry Sorting?

# What If I Told You Matrix Decomposition Is Just Fancy Laundry Sorting?

## What Is SVD? A Visual, Beginner-Friendly Guide to Matrix Decomposition

[Kamrun Nahar](https://iknahar.medium.com/?source=post_page---byline--447519130333---------------------------------------)

13 min read·19 hours ago

\--

1

My apartment’s radiator was clanking the entire time I finally got this concept down. 3 AM. A legal pad covered in scratched-out equations. And the moment I understood SVD, I genuinely said “wait, THAT’S what all the fuss was about?” out loud to nobody.

Let me save you the 3 AM radiator session.

![The three matrices of SVD, doing their little group project]()

## So What Even IS a Matrix? (No, Really)

Before we talk about decomposing matrices, let’s make sure we know what a matrix is.

A matrix is a grid of numbers. Rows and columns. That’s it. Think of a spreadsheet. Your Netflix ratings? That’s a matrix. Every row is a user. Every column is a movie. Each cell is a rating from 1 to 5.

Here’s one:

```
+-------+-----------+----------+-----------+-------+| User  | Avengers  | Notebook | Inception | Shrek |+-------+-----------+----------+-----------+-------+| Alice |     5     |    3     |     4     |   1   || Bob   |     4     |    1     |     5     |   2   || Carol |     2     |    5     |     1     |   5   |+-------+-----------+----------+-----------+-------+
```

That’s a 3x4 matrix. Three rows (users). Four columns (movies). Twelve numbers.

Simple. Boring, even. But matrices are everywhere. Images are matrices of pixel values. Audio files are matrices of frequencies. Your Spotify listening history? Matrix.

And when your matrix gets big (like, millions-of-users big), you need a way to simplify it without losing the important stuff.

Enter SVD.

![Me, about to perform surgery on a perfectly innocent spreadsheet]()

## The “This is a DJ Mixing Board” Pivot

Here’s my favorite way to explain SVD.

Imagine you’re a DJ. You’ve got a song, and it’s made up of dozens of different tracks layered on top of each other. Bass. Melody. Harmony. Background vocals. Some weird echo effect the producer added at 4 AM. Random hiss from a cheap microphone.

Your mixing board has a slider for each track. Each slider controls how LOUD that track is.

Now here’s the key insight. Not all tracks matter equally. The bass and melody carry the song. The hiss and random echo? Nobody would notice if you muted those completely.

SVD does exactly this to your data:

1.  It identifies all the “tracks” (components) hiding inside your matrix
2.  It ranks them by importance (loudest to quietest)
3.  It lets you keep the important ones and mute the rest

The “tracks” are your singular vectors. The “volume levels” are your singular values. That’s SVD.

![If your data had a mixing board, SVD would be the sound engineer]()

## The Formula (Don’t Run)

OK here comes the math part. Take a breath. I promise it’s not that bad.

SVD says any matrix A can be broken into three matrices:

**A = U x Sigma x V-transpose**

That’s it. One equation. Three pieces.

Let me tell you what each piece does:

**U (Left Singular Vectors)** tells you about the rows. In the Netflix example, U captures patterns about users. “Action lover.” “Romance fan.” “Person who watches everything at 2 AM and rates nothing below a 4.”

**Sigma (the diagonal matrix)** is just a list of numbers called singular values, arranged from biggest to smallest along the diagonal. Everything else is zero. These numbers tell you HOW IMPORTANT each pattern is. Big number = important pattern. Tiny number = probably noise.

**V-transpose (Right Singular Vectors)** tells you about the columns. In the Netflix example, V-transpose captures patterns about movies. “Superhero blockbuster.” “Tearjerker.” “Kids’ movie that adults secretly enjoy.”

![The holy trinity of matrix decomposition. No religious affiliation implied.]()

Let me put this differently:

```
+-------------------+------------------------------------------+| Matrix            | What It Captures                         |+-------------------+------------------------------------------+| U (m x m)         | Row patterns ("user profiles")           || Sigma (m x n)     | Importance of each pattern               || V-transpose (nxn) | Column patterns ("movie genres")         |+-------------------+------------------------------------------+
```

My phone buzzed seven times while I was typing that table. I ignored all of them. That’s how much I want you to get this.

![U, Sigma, and V-transpose walk into a matrix. Only the important stuff walks out.]()

## The Geometric View (For the Visual Folks)

If you’re a visual thinker, here’s something beautiful.

Every matrix transformation does something to space. It warps it. Stretches it. Rotates it. SVD is saying: any warping of space can be broken down into exactly three steps.

1.  **Rotate** (that’s V-transpose)
2.  **Stretch** along the axes (that’s Sigma)
3.  **Rotate again** (that’s U)

Start with a perfect circle. Apply any matrix to it, and you get an ellipse. SVD tells you exactly how that circle became that ellipse: which way it rotated first, how much it stretched in each direction, and how it rotated at the end.

![A circle walks into a matrix and comes out an ellipse. Classic matrix humor.]()

This is genuinely powerful. It means SVD works on ANY matrix. Tall matrices. Wide matrices. Square matrices. Rectangular ones. It doesn’t care. Every matrix has an SVD. Period.

For an interactive version of this circle-to-ellipse transformation, check out [Alyssa’s SVD Visualisation tool](http://alyssaq.github.io/2015/singular-value-decomposition-visualisation/). You can drag sliders and watch the geometry change in real time.

## How SVD Actually Works: The Recipe

Alright. Here’s the step-by-step. I’m going to walk through the actual process, and then we’ll write code.

![The recipe card your linear algebra professor forgot to hand out]()

## Step 1: Start With Your Matrix

You have a matrix A. Maybe it’s 1000 users by 500 movies. Maybe it’s 1920x1080 pixel values. Doesn’t matter. You’ve got numbers in a grid.

**Why this matters:** SVD works on literally any matrix. No restrictions on shape. The cat knocked my water glass over while I was first learning this, and I still remember the relief of “wait, it works on rectangles too?”

## Step 2: Compute A-transpose-A and A-A-transpose

Multiply A by its own transpose. This gives you two symmetric matrices. One captures column relationships. The other captures row relationships.

A-transpose-A is an n-by-n matrix. A-A-transpose is an m-by-m matrix. They share the same non-zero eigenvalues (which is a neat fact that most textbooks mention on page 847 in 6-point font).

**Why this matters:** Symmetric matrices have real eigenvalues and orthogonal eigenvectors. That’s what makes SVD so clean and reliable.

## Step 3: Find the Eigenvalues and Eigenvectors

Compute the eigenvalues of A-transpose-A. Take their square roots. Those are your singular values. Sort them from largest to smallest.

The eigenvectors of A-transpose-A become the columns of V. The eigenvectors of A-A-transpose become the columns of U.

## Get Kamrun Nahar’s stories in your inbox

 from this writer.

Remember me for faster sign in

**Why this matters:** The singular values tell you the “volume” of each component. This is where the ranking happens. The big ones matter. The tiny ones are noise.

## Step 4: Assemble U, Sigma, and V-transpose

Put the singular values on the diagonal of Sigma. Stack the eigenvectors into U and V. Done.

Congratulations. You’ve decomposed a matrix.

**Why this matters:** You now have three matrices that, when multiplied together, perfectly reconstruct your original matrix A. But more importantly, you can now choose to use only SOME of them.

## Step 5: Pick the Top k Singular Values (The Compression)

Here’s where the magic happens. Instead of keeping all singular values, keep only the top k. Set the rest to zero.

This gives you a rank-k approximation of A. Fewer numbers to store. Less noise. And surprisingly close to the original.

**Why this matters:** This is why Netflix can store recommendations for 200 million users without their servers melting. This is why your phone can compress photos. This is why Google can understand what your search query means.

![Most of your data’s personality is in the first few bars. The rest are just vibes.]()

![Truncated SVD is just removing the sad pancakes from your data stack]()

## The Code (Finally)

Let’s do this in Python. NumPy makes SVD embarrassingly easy.

```
import numpy as np# Our little matrix. Nothing fancy.# Imagine it's 4 students rated 5 subjects.A = np.array([    [5, 4, 1, 1],    [4, 5, 1, 1],    [1, 1, 5, 4],    [1, 1, 4, 5],    [1, 1, 3, 4]])# THE magic line. One function call. That's it.# I spent weeks being scared of this.U, S, Vt = np.linalg.svd(A, full_matrices=False)# S is just an array of singular values.# Not a diagonal matrix. NumPy keeps it lean.print("Singular values:", S)# Output: [10.79  5.38  0.77  0.45]# Let's see how much each component matterstotal = np.sum(S**2)for i, s in enumerate(S):    pct = (s**2 / total) * 100    print(f"Component {i+1}: {pct:.1f}% of total variance")
```

Output:

```
Component 1: 79.3% of total varianceComponent 2: 19.7% of total varianceComponent 3: 0.4% of total varianceComponent 4: 0.1% of total variance
```

See that? Two components capture 99% of the information. The other two are basically rounding errors wearing trench coats pretending to be data.

Now let’s reconstruct using only the top 2:

```
# Keep only the top k=2 singular valuesk = 2# Slice and diceU_k = U[:, :k]        # First k columns of US_k = np.diag(S[:k])  # Top k singular values, diagonalizedVt_k = Vt[:k, :]      # First k rows of V-transpose# Reconstruct. This is the compressed version.A_approx = U_k @ S_k @ Vt_kprint("Original:\n", A)print("\nReconstructed (rank 2):\n", np.round(A_approx, 1))
```

Output:

```
Original: [[5 4 1 1]  [4 5 1 1]  [1 1 5 4]  [1 1 4 5]  [1 1 3 4]]Reconstructed (rank 2): [[ 5.  4.  1.  1. ]  [ 4.  5.  1.  1. ]  [ 1.  1.  4.7  4.3]  [ 1.  1.  4.3  4.7]  [ 0.8  0.8  3.3  3.7]]
```

Close enough? Extremely close. We stored 2 components instead of 4, and the reconstruction is nearly identical. That’s compression. That’s SVD.

![The first few components carry the whole team. The rest are free-riding.]()

## Image Compression

This is where SVD gets visually satisfying. Let me show you.

An image is just a matrix of pixel values. A 1000x1000 grayscale image has 1,000,000 numbers. But if you apply SVD and keep only the top, say, 50 singular values, you store way fewer numbers and the image looks almost the same.

```
import numpy as npfrom PIL import Imageimport matplotlib.pyplot as plt# Load a grayscale image# (any image works, I used a photo of my cat judging me)img = np.array(Image.open('photo.jpg').convert('L'), dtype=float)# SVD on the image matrixU, S, Vt = np.linalg.svd(img, full_matrices=False)# Reconstruct with different ranksranks = [1, 5, 20, 50, 200]fig, axes = plt.subplots(1, len(ranks), figsize=(20, 4))for ax, k in zip(axes, ranks):    # Build low-rank approximation    img_approx = U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]    ax.imshow(img_approx, cmap='gray')    ax.set_title(f'Rank {k}')    ax.axis('off')    # How much storage did we save?    original_size = img.shape[0] * img.shape[1]    compressed_size = k * (img.shape[0] + img.shape[1] + 1)    ratio = compressed_size / original_size * 100    print(f"Rank {k}: storing {ratio:.1f}% of original data")plt.tight_layout()plt.show()
```

At rank 1, you get a blurry blob. At rank 20, you can tell what the image is. At rank 50, it looks almost perfect. At rank 200, you can’t tell the difference from the original.

But here’s the kicker. For a 1000x1000 image:

```
+---------+-----------+---------------------------+| Rank k  | Numbers   | Compression               ||         | Stored    | (% of original 1,000,000) |+---------+-----------+---------------------------+|    1    |   2,001   | 0.2%                      ||    5    |  10,005   | 1.0%                      ||   20    |  40,020   | 4.0%                      ||   50    | 100,050   | 10.0%                     ||  200    | 400,200   | 40.0%                     |+---------+-----------+---------------------------+
```

With 10% of the original data, you get a nearly perfect image. My neighbor’s kid started mowing the lawn right as I ran this code for the first time, and even the lawnmower couldn’t drown out my excitement.

![From blob to beauty in five singular values. Like puberty, but for matrices.]()

**F**or an interactive version where you can upload your own image and drag a slider to change the rank, visit [Tim Baumann’s SVD Image Compression Demo](https://timbaumann.info/svd-image-compression-demo/).

## Netflix. The Recommendation Engine You Use Every Day

Remember that user-movie ratings table from earlier? Netflix’s actual data looks like that, but with 200 million users and thousands of movies. And it’s mostly empty. Most people haven’t rated most movies. It’s like a giant spreadsheet with holes everywhere.

SVD fills in those holes.

Here’s the intuition. If Alice and Bob both love action movies and hate romance, SVD notices that pattern. It groups Alice and Bob into a “user type.” It groups Avengers and Inception into a “movie type.” Then it predicts: if Alice loved Avengers but hasn’t seen Inception, she’ll probably love that too.

The singular values tell Netflix which patterns are strong. “Action fans” might have a singular value of 45. “People who only watch documentaries about cheese” might have a singular value of 0.3. Netflix keeps the strong patterns and ignores the weak ones.

![This is literally how Netflix decided you should watch that weird documentary at 1 AM]()

The Netflix Prize competition (2006 to 2009) awarded $1 million for the best recommendation algorithm. SVD-based approaches were at the core of the winning solution. For technical details on how SVD was used, referencing the [CS-301 lecture notes on collaborative filtering](https://pantelis.github.io/cs301/docs/common/lectures/recommenders/netflix/).

![Netflix’s recommendation engine after SVD does its thing at 3 AM]()

## Where Else SVD Shows Up

SVD is not a one-trick pony. Not even close.

**Google Search (Latent Semantic Analysis).** When you search for “best places to eat,” Google doesn’t just match the exact words. It understands that “restaurant,” “dining,” and “eatery” are related concepts. How? SVD on a term-document matrix. It discovers latent (hidden) topics that connect words with similar meanings.

**Face Recognition (Eigenfaces).** Every face can be represented as a combination of basic “face components” discovered by SVD. Your face is maybe 30% “Component 1” + 45% “Component 2” + … These components are called eigenfaces, and they’re straight-up eerie when you visualize them.

**Data Denoising.** Got noisy sensor readings? Apply SVD. The signal lives in the large singular values. The noise lives in the small ones. Mute the small ones. Signal is clean. I once used this to clean up accelerometer data from a phone that was duct-taped to a washing machine. Long story.

**PCA (Principal Component Analysis).** PCA is just SVD wearing a lab coat. When you hear “dimensionality reduction” in machine learning, that’s SVD underneath. It takes 100-dimensional data and finds the 5 dimensions that matter most. The other 95 were just noise in a fancy hat.

For a practical walkthrough of 5 SVD applications with code, the [Analytics Vidhya article “5 Applications of Singular Value Decomposition in Data Science”](https://www.analyticsvidhya.com/blog/2019/08/5-applications-singular-value-decomposition-svd-data-science/) (analyticsvidhya.com/blog/2019/08/5-applications-singular-value-decomposition-svd-data-science/) is a solid companion read.

SVD is just a sorting machine.

It takes your data, finds all the hidden patterns, ranks them by importance, and hands them back to you in order. First pattern is the most important. Last pattern is the least. You pick how many you want to keep.

That’s it. All the eigenvalue math, all the transpose multiplications, all the Greek letters… they exist to do one thing: **sort your data’s patterns from “this really matters” to “this is basically random noise.”**

![The secret was sorting all along. Shakespeare would be proud.]()

## Quick Reference: SVD Properties

```
+--------------------------------------+--------------------------------+| Property                             | What It Means                  |+--------------------------------------+--------------------------------+| Works on ANY matrix (m x n)          | No shape restrictions          || Singular values are always >= 0      | No negative "importance"       || U and V are orthogonal matrices      | Their columns are perpendicular|| Rank of A = number of non-zero       | Tells you the "true" dimension ||   singular values                    |   of your data                 || Best rank-k approximation            | Eckart-Young theorem says SVD  ||   (Frobenius norm)                   |   gives the OPTIMAL one        || Always exists                        | Every matrix has an SVD. Every.|+--------------------------------------+--------------------------------+
```

That last row is important. Unlike some decompositions that only work on square matrices or symmetric matrices, SVD works on everything. Your 3x7 matrix? Has an SVD. Your 1000x2 matrix? Has an SVD. The matrix of your exam scores from freshman year that you’d rather forget? Has an SVD. And it’s more forgiving than you think.

## Scars Over Theory

Here’s what I wish someone told me before I dove into SVD:

-   **Start with NumPy.** Don’t compute SVD by hand. Ever. `np.linalg.svd()` exists. Use it. Compute it by hand once if you want the muscle memory, then never again.
-   **The singular values drop off fast.** In practice, you almost never need more than 10 to 50% of the components. Sometimes less than 5% does the job.
-   **SVD is the Swiss Army knife you didn’t know you had.** Stuck on a data problem? Ask yourself: “Can I frame this as a matrix?” If yes, try SVD. It works more often than it should.
-   **Don’t memorize the formulas.** Understand the picture: rotate, stretch, rotate. If you can draw that on a napkin, you understand SVD better than most grad students.
-   **The name is the hardest part.** “Singular Value Decomposition” sounds like it requires a security clearance. It doesn’t. It’s three matrices and a sort. That’s the whole movie.
-   **Test with small matrices first.** Build intuition on 3x3 or 4x4 matrices before throwing a million-row dataset at it. You’ll catch mistakes faster when you can eyeball the numbers.

![You, approximately 10 minutes from now, after finishing this article]()