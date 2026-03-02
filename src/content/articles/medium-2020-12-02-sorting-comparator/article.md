---
title: "Sorting: Comparator"
author: "Voice of Code"
platform: "medium"
publicationName: "Voice of Code"
url: "https://medium.com/voice-of-code/sorting-comparator-21d98c192bbb?source=rss----aa394f020b61---4"
publishedAt: "2020-12-02"
tags:
  - "architecture"
  - "engineering"
  - "python"
categories:
  - "Programming"
tagsNormalizedAt: "2026-03-01T21:19:30.658Z"
---

# Sorting: Comparator

# Sorting: Comparator

[Anush krishna .V](/@anushkrishnav?source=post_page---byline--21d98c192bbb---------------------------------------)

3 min read·Jun 25, 2020

\--

[

## Sorting: Comparator | HackerRank

### Comparators are used to compare two objects. In this challenge, you'll create a comparator and use it to sort an array…

www.hackerrank.com

](https://www.hackerrank.com/challenges/ctci-comparator-sorting?source=post_page-----21d98c192bbb---------------------------------------)

![]()

Comparators are used to compare two objects. In this challenge, you’ll create a comparator and use it to sort an array. The *Player* class is provided in the editor below. It has two fields:

1.  name a string.
2.  score: an integer.

Given an array of *Player* objects, write a comparator that sorts them in order of decreasing score. If or more players have the same score, sort those players alphabetically ascending by name. To do this, you must create a *Checker* class that implements the *Comparator* interface, then write an *int compare(Player a, Player b)* method implementing the [Comparator.compare(T o1, T o2)](https://docs.oracle.com/javase/7/docs/api/java/util/Comparator.html#compare\(T,%20T\)) method. In short, when sorting in ascending order, a comparator function returns -1 if a<b , 0 if a=b , and 1 if a>b .

**Function Description**

Declare a *Checker* class that implements the *comparator* method as described. It should sort first descending by score, then ascending by name. The code stub reads the input, creates a list of Player objects, uses your method to sort the data, and prints it out properly.

**Sample Input**

```
5amy 100david 100heraldo 50aakansha 75aleksa 150
```

**Sample Output**

```
aleksa 150amy 100david 100aakansha 75heraldo 50
```

Solution:

Explanation:

As you can see, the players are first sorted by decreasing score and then sorted alphabetically by name.

\_\_repr\_\_() function returns the object representation. It could be any valid **Python** expression such as tuple, dictionary, string, etc.

Given : In short, when sorting in ascending order, a comparator function returns -1 if a<b , 0 if a=b , and 1 if a>b .

From the sample output and question statement, it's clear that we need to sort the name in ascending order and score in descending order. Use the return statement accordingly.

I would strongly urge you not to use nested if block statements in your solutions unless it's needed and there is no workaround. You can often place separate IF blocks in a particular order to get your job done as I have done in my solution.

Hope it helps :)

Follow me on :

[

## Anush Krishna - PSG College of Arts and Science - Coimbatore, Tamil Nadu, India | LinkedIn

### I want to leave a footprint before I leave this world, and the Tech world is my place, A hungry learner. An ambivert , Leader…

www.linkedin.com

](https://www.linkedin.com/in/anush-krishna-8270941a0/?source=post_page-----21d98c192bbb---------------------------------------)[

## Welcome!Learner !!

### Pickle to Geek A popular Quote attributed to Richard Feynman: " If you can't explain it to a six-year-old, you don't…

thepathtowardsdatascience.wordpress.com

](https://thepathtowardsdatascience.wordpress.com/?source=post_page-----21d98c192bbb---------------------------------------)[

## anushkrishnav - Overview

### Dismiss Sign up for your own profile on GitHub, the best place to host code, manage projects, and build software…

github.com

](https://github.com/anushkrishnav?source=post_page-----21d98c192bbb---------------------------------------)[

## anush krishna

### The latest Tweets from anush krishna (@Anush\_krishna\_v). Want to leave a foot print in this world( hopefully in mars too…

twitter.com

](https://twitter.com/Anush_krishna_v?source=post_page-----21d98c192bbb---------------------------------------)