---
metadata:
  videoId: "3vJEf_uQG34"
  title: "🔐 AZ-400 Exam Prep | Question 12 of 50"
  description: "🔐 AZ-400 Exam Prep | Question 12 of 50

    How do you authenticate Azure Pipelines to Azure Key Vault without storing secrets? The answer is Service Connections using Azure Resource Manager with Service Principals or Managed Identities — no PATs, no hardcoded credentials, no GitHub secrets.


    ✅ Master this and more with our full AZ-400 course on KodeKloud.com


    Drop a comment if you got it right! 👇


    #AZ400 #AzureDevOps #MicrosoftAzure #AzureCertification #DevOpsCertification #AzurePipelines #AzureKeyVault #ServicePrincipal #CloudSecurity #KodeKloud #ExamPrep #DevOps #AzureSecurity #MicrosoftCertification #CloudComputing #LearnAzure #DevOpsEngineer #AzureTips #CertificationPrep"
  channel: "KodeKloud"
  channelId: "UCSWj8mqQCcrcBlXPi4ThRDQ"
  duration: "PT1M10S"
  publishedAt: "2026-03-12T07:58:24Z"
  thumbnailUrl: "https://i.ytimg.com/vi/3vJEf_uQG34/hqdefault.jpg"
  youtubeUrl: "https://www.youtube.com/watch?v=3vJEf_uQG34"
processedAt: "2026-03-12T15:50:34.936Z"
source: "youtube"
tldr: "For secure authentication between Azure DevOps pipelines and Azure services like Key Vault without storing secrets in pipeline configuration, use Azure DevOps service connections with Azure Resource Manager and service principals, which avoids security risks associated with personal access tokens, hard-coded credentials, or GitHub secrets."
tools:
  - name: "Azure DevOps"
    url: null
  - name: "Azure Key Vault"
    url: null
  - name: "Azure Resource Manager"
    url: null
  - name: "GitHub Actions"
    url: null
categories:
  - "DevOps & Infrastructure"
  - "Programming"
  - "Security"
tags:
  - "authentication"
  - "azure"
  - "best-practices"
  - "ci-cd"
  - "security-general"
ai:
  provider: "openrouter"
  model: "openrouter/deepseek/deepseek-v3.2-20251201"
  apiCalls: 1
  fallbackAttempts: 0
  inputTokens: 1731
  outputTokens: 698
  totalTokens: 2429
  processingTimeMs: 24579
tagsNormalizedAt: "2026-03-12T16:12:16.103Z"
---

## Key Takeaways

This video explains the secure identity option for Azure DevOps pipelines to authenticate with Azure services without storing secrets.

*   **Azure DevOps service connections** are the correct solution for authenticating pipelines to Azure resources like Key Vault.

*   **Personal Access Tokens (PATs)** in variables, **hard-coded credentials** in YAML, and **GitHub app secrets** are all incorrect and insecure methods.

*   Service connections use **Azure Resource Manager** with **service principals** or **managed identities**, aligning with Azure DevOps security best practices by avoiding secret storage in pipelines.

## Summary

This video addresses question 12 from the AZ-400 certification exam, focusing on secure authentication for Azure DevOps pipelines. The scenario involves a team needing to authenticate their Azure pipelines to Azure services, specifically Azure Key Vault, without storing any secrets within the pipeline configuration itself.

The presenter evaluates four identity options:

*   **Option A (Personal Access Tokens in variables)**: Incorrect. Storing PATs in pipeline variables exposes secrets and is strongly discouraged from a security standpoint.

*   **Option C (Hard-coded credentials in YAML)**: Incorrect. This violates core security principles like least privilege and creates auditing challenges.

*   **Option D (GitHub app secrets)**: Incorrect. This method is specific to GitHub Actions and is not available for use within Azure DevOps pipelines.

*   **Option B (Service connections using Azure Resource Manager)**: **Correct**. Azure DevOps service connections provide the secure mechanism for this scenario.

Service connections allow pipelines to authenticate to external Azure resources by leveraging **Azure Resource Manager** with **service principals** or **managed identities**. This approach centrally manages authentication outside of the pipeline code, eliminating the need to embed secrets in variables or YAML files. This method is the recommended practice per Azure DevOps security guidelines, ensuring credentials are not exposed in the pipeline's source code or configuration.

## Context

This content is crucial for professionals preparing for the Microsoft AZ-400: Designing and Implementing Microsoft DevOps Solutions certification exam. It tests knowledge of secure identity and access management within DevOps practices on Azure. Understanding how to securely connect CI/CD pipelines to cloud resources is a fundamental skill for DevOps engineers, cloud architects, and security professionals working in Azure environments to prevent credential leaks and maintain compliance.