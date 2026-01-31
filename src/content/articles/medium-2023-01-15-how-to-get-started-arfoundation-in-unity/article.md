---
title: "How to get started: ARFoundation in Unity"
author: "Voice of Code"
platform: "medium"
publicationName: "Voice of Code"
url: "https://medium.com/voice-of-code/how-to-get-started-arfoundation-in-unity-f0a050b3585f?source=rss----aa394f020b61---4"
publishedAt: "2023-01-15"
tags:
  - "unity3d"
  - "technology"
  - "augmented-reality"
  - "3d"
  - "developer"
  - "programming"
---

# How to get started: ARFoundation in Unity

# How to get started: ARFoundation in Unity

[Aishani Pachauri](/@aishani-pachauri?source=post_page---byline--f0a050b3585f---------------------------------------)

4 min read·Sep 2, 2021

\--

Listen

Share

![Handheld AR Application on Unity.]()

Prerequisites:

-   To have an idea of what Augmented Reality is. (Spoiler Alert: Pokémon Go! is considered the correct answer if you understand the concept)
-   Install Unity 2019.4.15f1 or above with Android/iOS build support. Add modules in Unity Hub’s Installs section.

## Why am I using ARFoundation?

When getting started with augmented reality apps in Unity, you can develop two types of AR apps: **marker-based and markerless**.

Today, we are talking about markerless AR and using ARFoundation. Now for the sake of it, I’ll describe the package using fancy terms:

> AR Foundation is a set of MonoBehaviours and APIs that allow you to work with augmented reality platforms in a multi-platform way within Unity.

Now that we have that formality out of the way, let’s discuss what the ARFoundation package actually does.

**It is a compilation of various utilities that help you detect plane surfaces, augment models and scan the environment before setting up objects to interact with.**

For building the app for android devices, we use Google’s ARCore SDK; for iOS, we use Apple’s ARKit [SDK](https://clevertap.com/blog/what-is-an-sdk/).

## Getting Started

Today, we will be building an AR app that will detect plane surfaces to place a 3D object on the detected plane.

Open Unity Hub and click on New. You will be shown various templates which may vary from version to version.

Choose 3D and after giving your project a name, click on create.

![]()

## Configure platform and player settings

Change build settings depending on the type of device you will be building the app for. In this case, we are going for android.

1.  **File->Build Settings->Select Android (under platforms)->Switch Platforms**

![]()

Next up we need to make some changes in Player Settings.

**2\. Player Settings-> Remove Vulkan from Graphics API**

**3\. Uncheck Multithreaded Rendering**

![]()

**4\. Scroll down to the Minimum API level (under Identification) and change it to Android 8.0 (minimum requirement for ARCore).**

![]()

Close Player Settings and Add Open Scenes in Build Settings and close that too.

## Installing Packages

Go to the menu and click on

1.  **Windows-> Package Manager-> Install ARFoundation & ARCore XR Plugin**

Make sure you have selected Unity Registry from the top left corner in the package manager pop-up.

![]()

Close the pop-up window and come to the hierarchy.

**2\. Delete the Main Camera.**

**3\. Right Click on Hierarchy->XR->AR Session Origin.**

Repeat the same and **add AR Session, AR Default Point Cloud and AR Default Plane.**

![]()

Go to the bottom of your screen.

**4\. In Assets, Right Click-> Create->Folder**

Name it Prefabs and **drag and drop AR Default Point Cloud and AR Default Plane in the folder.**

Delete AR Default Point Cloud and AR Default Plane from hierarchy.

![]()

Click on AR camera under AR Session Origin and set it as the Main Camera.

5\. **Inspector-> Tag->Main Camera**

![]()

**6\.** Click on AR Session Origin in Hierarchy.

**Add Component-> AR Point Cloud Manager**

Drag and drop AR Default Point Cloud to Point Cloud Prefab section under AR Point Cloud Manager (Script).

**Add Component-> AR Plane Manager**

Drag and drop AR Default Plane to Plane Prefab section under AR Plane Manager (Script).

**Add Component-> AR Raycast Manager**

## Adding Script

Now drag and drop the PlaneonPlane.cs script in the Prefabs folder which is available in ARFoundation samples. You can download it from here: [PlaneonPlane.cs](https://github.com/Aishanipach/AR_BalloonGame/blob/main/PlaceOnPlane.cs) *(Link to Github repo)*

1.  **Add Component-> PlaneonPlane (script)**

![]()

Right-click *hierarchy* and **click 3D object->Sphere**.

*Adjust size and position in Inspector for a better view in AR Camera.*

**Drag the Sphere** object from Hierarchy and place it in the **Placed Prefab of Plane On Plane (script) component of AR Session Origin**.

And you are done!

**File->Build settings-> Build and Run**

Send the .apk file to your device and test out the app!

![Plane detection through the AR app.]()

## Resources:

-   [More on ARFoundation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@1.0/manual/index.html)
-   [More on Google ARCore](https://unity3d.com/partners/google/arcore)
-   [More on ARKit](https://docs.unity3d.com/Packages/com.unity.xr.arkit@4.1/manual/index.html)