---
title: "The Geometric Interpretation Of Linear Regression"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/the-geometric-interpretation-of-linear-regression-5a4bffc7330f?source=rss----98111c9905da---4"
publishedAt: "2026-03-28"
tags:
  - "ai-general"
  - "data-science"
  - "machine-learning"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-28T18:10:03.270Z"
---

# The Geometric Interpretation Of Linear Regression

When we first learn linear regression, we think of it like this: we have data points scattered on a plane, we draw a line through them, and we adjust the line until the total squared error is as small as possible. We take a derivative, set it to zero, and out pops the formula for the best-fit line.

This picture works. But it hides something beautiful. Let me explain.

Suppose we want to predict a quantity y based on several input quantities x₁ , x₂ , … , xₚ . We have data from *n* past observations: for each observation *i ,* you know the inputs

![](https://cdn-images-1.medium.com/max/122/0*qmzeOt6crgXW-RfS)

and the actual outcome yᵢ .

We assume the relationship is linear in the parameters:

![](https://cdn-images-1.medium.com/max/311/0*Q0d6ETpsueitrIgb)

where *εᵢ​* is a random error term- noise, unobserved variables, model misspecification, the universe’s refusal to be perfectly linear. The goal is to estimate β₀, β₁, …, βₚ​ from the data.

For any choice of parameters, the predicted value for observation *i* is:

![](https://cdn-images-1.medium.com/max/220/0*dJdWTzptbiSIS-eM)

and the residual is:

![](https://cdn-images-1.medium.com/max/88/0*rX4ZZYtOYBow6Ug-)

We want parameters that make all these residuals small simultaneously, so we minimize the sum of squared residuals:

![](https://cdn-images-1.medium.com/max/419/0*CGFIy2wM2kurMF5A)

Now, you could take p + 1 partial derivatives, set them all to zero, and solve. But the resulting system of equations is notationally painful. Matrices clean this up. We stack the observations into a vector y ∈ Rⁿ , the parameters into β ∈ R⁽ᵖ⁺¹⁾, and build the design matrix:

![](https://cdn-images-1.medium.com/max/282/0*VSzbHWyPmV8Sem01)

The column of ones handles the intercept. You can verify that the *i*\-th component of Xβ is ŷ*ᵢ ,* so the entire model collapses to y = Xβ + ε , and the sum of squared residuals becomes || y — Xβ ||² .

This is where most treatments take the derivative of || y — Xβ ||² with respect to β, set it to zero, and arrive at the normal equations. It works. But there is a far more revealing path- one that requires no calculus at all.

We adopt a completely different viewpoint: **Think of each observation as a dimension.**

If we have *n* observations, we work in Rⁿ. The response vector y = (y₁, y₂, … , yₙ)ᵀ is one geometric object, encoding all our observed responses simultaneously.

This seems strange at first. We’re treating observations as dimensions rather than as points. But this viewpoint is what makes everything click.

We’ve written X as a matrix of rows- one row per observation. But now read it column by column:

![](https://cdn-images-1.medium.com/max/408/0*6nymW6Qg75n7KN8Q)

Each column X₍ᵢ₎​ is a vector in Rⁿ and contains all n observations of the i-th feature.

So where do our predictions live?

The column space of X, denoted C(X), is the set of all linear combinations of these column vectors:

![](https://cdn-images-1.medium.com/max/462/0*BV0d8Zi_yqr-vHXF)

or equivalently,

![](https://cdn-images-1.medium.com/max/212/0*ybrf9O9t81nJWY46)

Now here’s the crucial observation. For any choice of β, the *i*\-th component of Xβ is:

![](https://cdn-images-1.medium.com/max/284/0*qqgE-Mm3v-6_Fp7U)

This is exactly the predicted value for observation *i*. So the vector Xβ is precisely the vector of all predictions ŷ. So every possible prediction vector that our linear model can produce lies in C(X). This is a linear subspace of Rⁿ; it contains the zero vector, and it’s closed under addition and scalar multiplication. If X has full column rank, then dim⁡(C(X)) = p+1. Also, we typically have n ≫ p+1. Many more observations than parameters. So we can visualize C(X) as a “small” subspace sitting inside the much “larger” space Rⁿ.

Now let’s look at the original optimization problem. It said: find β minimizing

![](https://cdn-images-1.medium.com/max/93/0*rLxPb_du34blf38p)

But look at what this sum actually is:

![](https://cdn-images-1.medium.com/max/186/0*6sYw_AWZitSSXYNy)

The sum of squared residuals is the squared Euclidean distance from y to ŷ in Rⁿ. **So minimizing the sum of squared residuals is the same thing as finding the point ŷ ∈ C(X) that is closest to y**.

So we have a point and a subspace, and we want the nearest point on the subspace. And this problem has a clean, classical answer from linear algebra.

Think of it in 3D first: if you have a plane through the origin and a point above the plane, the closest point on the plane is found by dropping a perpendicular from the point straight down to the plane. The connecting line- the residual- hits the plane at a right angle.

This is exactly what happens in Rⁿ. By the Projection Theorem, the unique closest point ŷ ∈ C(X) to y is characterized by a single elegant condition:

![](https://cdn-images-1.medium.com/max/117/0*l81nYgavVrBUXwmj)

The residual vector e =​ y — ŷ must be orthogonal to the entire column space. ŷ​ is called the **orthogonal projection** of y onto C(X).

*This* is the geometric heart of linear regression.

![](https://cdn-images-1.medium.com/max/1024/1*N3o267q0HvTt4_dNYv7PwQ.png)

Now comes the payoff. We can derive the famous normal equations purely from the orthogonality condition, with no derivatives at all.

We need e ⊥ C(X), meaning e is perpendicular to every vector in the column space. But C(X) is spanned by the columns of X, so it suffices to check perpendicularity against each column:

![](https://cdn-images-1.medium.com/max/302/0*ux-q3k6fa1jnpmgO)

Perpendicularity to the basis implies perpendicularity to the whole space.
For each column j,

![](https://cdn-images-1.medium.com/max/67/0*tAd_fJ5wRE5ncuRm)

Stacking these equations:

![](https://cdn-images-1.medium.com/max/98/0*gs-arwYSVY4T8JM3)

But the left matrix- where each row is a transposed column of X- is exactly Xᵀ. So:

![](https://cdn-images-1.medium.com/max/66/0*KAhrda7sAnPZguet)

Now substitute e = y − ŷ = y − Xβ̂ :

![](https://cdn-images-1.medium.com/max/131/0*g_-ObfcEP6bYgrlf)

![](https://cdn-images-1.medium.com/max/143/0*ev2Fzf3Y86yML8SC)

![](https://cdn-images-1.medium.com/max/113/0*CwRQLSWEa843zg66)

These are the normal equations- the same equations you’d get by differentiating the loss function and setting the gradient to zero. But we derived them from a single geometric principle: **the residual is perpendicular to the column space**.

If X has full column rank, the normal equations give

![](https://cdn-images-1.medium.com/max/143/0*MAHyrqOApwQU_lWt)

So:

![](https://cdn-images-1.medium.com/max/208/0*9CvUQ7B8u_WkvFyr)

We define the hat matrix:

![](https://cdn-images-1.medium.com/max/153/0*7HDcyoJbm7BszdxM)

Then ŷ = Hy. The matrix H maps any vector in Rⁿ to its orthogonal projection onto C(X).

H is a projection matrix, meaning it satisfies two properties:
i) Idempotence, i.e, H² = H. Why? Because projecting twice is the same as projecting once- if a vector is already on the subspace, projecting it again changes nothing.
ii) Symmetry, i.e, Hᵀ = H. This is what makes the projection orthogonal rather than oblique.
Both these properties can be verified for H.

This geometric perspective is profound because it reveals that linear regression is fundamentally a problem from linear algebra, specifically, orthogonal projection onto a subspace.

Reference:
Gilbert Strang, *Introduction to Linear Algebra-* Chapter 4 on orthogonality and projections.
Trevor Hastie, Robert Tibshirani, and Jerome Friedman, *The Elements of Statistical Learning-* Chapter 3 on linear methods for regression.

* * *

[The Geometric Interpretation Of Linear Regression](https://pub.towardsai.net/the-geometric-interpretation-of-linear-regression-5a4bffc7330f) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.