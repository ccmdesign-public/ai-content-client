---
title: "Predicting Emergency Department Wait Time with Machine Learning: My Exploration of XGBoost"
author: "Data and Beyond"
platform: "medium"
publicationName: "Data and Beyond"
url: "https://medium.com/data-and-beyond/predicting-emergency-department-wait-time-with-machine-learning-my-exploration-of-xgboost-0dc08aa46fde?source=rss----b680b860beb1---4"
publishedAt: "2026-03-08"
tags:
  - "analytics"
  - "data-science"
  - "machine-learning"
categories:
  - "AI & Machine Learning"
  - "Data & Analytics"
tagsNormalizedAt: "2026-03-08T22:16:59.989Z"
---

# Predicting Emergency Department Wait Time with Machine Learning: My Exploration of XGBoost

# Predicting Emergency Department Wait Time with Machine Learning: My Exploration of XGBoost

[Data With Clarity](/@data.with.clarity?source=post_page---byline--0dc08aa46fde---------------------------------------)

5 min read·Feb 6, 2026

\--

*This is what I learned, what worked and what didn’t.*

![]()

I wanted to explore how machine learning can be used to help emergency departments (ED) run more efficiently. This analysis asks: *Can we predict when patients in the ED will experience peak wait time (3 hours) and identify what factors planners can consider to better allocate hospital resources?*

The target outcome was defined as peak wait time, which is the total wait of at least 3 hours from registration to the time seen by a medical professional using a binary classification of peak (1) vs. non-peak (0). The threshold was based on the [average wait time for low-urgency patients](https://www.hqontario.ca/System-Performance/Time-Spent-in-Emergency-Departments?utm_source=Ontario.ca&utm_medium=Referral&utm_campaign=WT+Referral) in Ontario, Canada.

## **Data Inputs**

I started with a [public dataset from Kaggle](https://www.kaggle.com/datasets/rivalytics/er-wait-time) containing 5,000 simulated records with patient characteristics (urgency level), temporal patterns (day of the week, time of day, season), capacity factors (nurse-to-patient ratio, specialist availability, number of facility beds) and outcome measures (total wait time, patient outcome, patient satisfaction).

## **Data Exploration**

Before modelling, descriptive statistics were generated to inspect the distribution of data. No missing values were observed. Peak wait time, represents 10% of records.

```
level                        Overall        n                                                                 5000          nurse_to_patient_ratio (mean (SD))                                3.24 (1.20)   specialist_availability (mean (SD))                               3.88 (3.04)   facility_size_beds (mean (SD))                                   87.12 (58.00)  visithour (mean (SD))                                            11.50 (6.89)   hospital_name (%)                   Northside Community Hospital   999 (20.0)                                       Riverside Medical Center      1023 (20.5)                                       Springfield General Hospital   994 (19.9)                                       St. Mary’s Regional Health     995 (19.9)                                       Summit Health Center           989 (19.8)   region (%)                          Rural                         1994 (39.9)                                       Urban                         3006 (60.1)   day_of_week (%)                     Friday                         685 (13.7)                                       Monday                         768 (15.4)                                       Saturday                       701 (14.0)                                       Sunday                         725 (14.5)                                       Thursday                       706 (14.1)                                       Tuesday                        741 (14.8)                                       Wednesday                      674 (13.5)   season (%)                          Fall                          1234 (24.7)                                       Spring                        1227 (24.5)                                       Summer                        1281 (25.6)                                       Winter                        1258 (25.2)   time_of_day (%)                     Afternoon                     1502 (30.0)                                       Early Morning                  473 ( 9.5)                                       Evening                       1725 (34.5)                                       Late Morning                   770 (15.4)                                       Night                          530 (10.6)   urgency_level (%)                   Critical                      1242 (24.8)                                       High                          1245 (24.9)                                       Low                           1222 (24.4)                                       Medium                        1291 (25.8)
```

Distributions of numeric and categorical variables were also examined by peak versus non-peak values to assess group comparability.

Across categorical variables, peak wait times were mostly observed on Mondays, winters, evenings and low-urgency patients.

![]()

For numeric variables, the distribution of data for peak versus non-peak wait times were relatively similar except for nurse-to-patient ratio.

![]()

## **Model Development**

Extreme gradient boosting (XGBoost), a machine learning algorithm, was chosen because it is good at finding nonlinear patterns, which better capture a dynamic ED environment. It can handle a mix of categorical and numeric data types and surface which variables are most influential (feature importance) in predicting peak wait times. It is important to note that relationships identified are associative and not causal.

To build the model, 80% of data was used for training and 20% for testing on new data. The full dataset with different hospitals was used to expose the model to the most scenarios. Patient identifiers and outcome variables were removed (total wait time, patient satisfaction, clinical outcome) so that the model does not accidentally optimize for these rather than predict wait time peak. XGBoost requires numeric inputs so one-hot encoding was used for categorical variables (Monday is split into two columns: it is Monday, it is not Monday). This expands the predictor set, which may lead to the model’s poor application on new data (overfitting) but will help make a fair assessment of data patterns and not assume ranking of category levels.

Default XGBoost parameters were kept. Given the small dataset, modifications (hyperparameter tuning) may not help much to avoid over/underfitting.

```
# train xgboost modelparams <- list(  objective = "binary:logistic"  # all other parameters set to default)xgb_model <- xgb.train(  params = params,  data = dtrain,  nrounds = 100,  evals = list(train = dtrain, test = dtest),  early_stopping_rounds = 10,  print_every_n = 10)
```

## **Results**

### Model Evaluation

How did the model perform? Accuracy of 95% and AUROC of 98% suggests minimal overfitting, but this may also be due to rare peak events (10%). The F1 score of 78% suggests moderate balancing between precision and recall (classifying true peaks versus false alarms). The false negative rate shows that 15% of patients with peak wait time were misclassified as not.

```
Metric     Value1             Accuracy 0.95200002 Recall (Sensitivity) 0.84693883            Precision 0.71551724             F1 Score 0.77570095                AUROC 0.98070616  False Negative Rate 0.1530612
```

### Feature Importance and SHAP

SHAP values show which features or variables matter (top features influence predictions most) and direction of impact (mostly positive SHAP on the right side predict peak wait time). The dot color represents which values have a high (purple) or low (yellow) influence on predictions. Concentrated dots on the horizontal axis suggest a linear effect on predictions.

Nurse-to-patient ratio is among the top 10 features, suggesting a strong influence on predicting peak wait time. Similarly, patient and temporal factors also occurred high on the list but many show a large spread suggesting interaction effects with other factors need to be evaluated.

![Beeswarm SHAP summary plot]()

## **Reflections on Approach**

**What Worked?** The model handled nonlinear patterns expected from ED data, which traditional linear regression models may not fully capture.

**What Didn’t?** Model performance can be fine-tuned. Limited patient characteristics in the dataset may limit applicability to certain groups (less for high-urgency patients).

**What Would I Do Differently?** Compare linear regression and other machine learning algorithms. For more actionable insights, explore different wait time targets and interaction effects of predictors (what wait time threshold would be needed to augment nurses or specialists).

**Bottom line,** can XGBoost predict ED peaks? Moderately. For a hospital planner, this approach can be a starting point in exploring a forecasting tool. However, a model is only as good as the data it is fed, how much users trust the tool and how the tool translates predictions into action. Operational use would require acceptability testing, assessing fairness towards different groups and integrating into hospital workflows.

For this exploration, the goal is to learn from the data and evaluate what can be useful for operational planning to mitigate long ED wait times.

## **Technical Stack**

· R statistical software (code on my [Github](https://github.com/datawithclarity/Medium.git))

· Key R packages: xgboost, caret, SHAPforxgboost (machine learning); dplyr (data manipulation); ggplot2 (visualization)

## **References**

Gloyn T, Seo C, Godinho A, Rahul R, Phadke S, Fotheringham H, Wegier P. Using artificial intelligence to predict patient wait times in the emergency department: a scoping review. *Artif Intell Med.* 2026;171:103316. [doi:10.1016/j.artmed.2025.103316](https://doi.org/10.1016/j.artmed.2025.103316)

Wang H, Sambamoorthi N, Sandlin D, Sambamoorthi U. Interpretable machine learning models for prolonged Emergency Department wait time prediction. BMC Health Serv Res. 2025;25(1):403. [doi:10.1186/s12913–025–12535-w.](https://doi.org/10.1186/s12913-025-12535-w)

*Questions or feedback? I am learning as I go. If you tried something similar, know what works in practice or have a suggestion on what I can look into next, please share.*