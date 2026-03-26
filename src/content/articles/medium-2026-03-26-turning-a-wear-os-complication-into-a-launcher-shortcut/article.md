---
title: "Turning a Wear OS Complication Into a Launcher Shortcut"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/turning-a-wear-os-complication-into-a-launcher-shortcut-581620d9de1c?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-26"
tags:
  - "android"
  - "engineering"
  - "kotlin"
  - "web-development"
categories:
  - "Mobile Development"
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-26T21:35:10.879Z"
---

# Turning a Wear OS Complication Into a Launcher Shortcut

![](https://cdn-images-1.medium.com/max/1024/1*xcfpWu2YNgbT_LApf0KAiQ.png)

Wear OS apps often live in the background. Users install them, open them once or twice, and then forget they exist until they are needed. In one recent project, we wanted to solve that problem in the simplest possible way: by giving users a single, reliable shortcut directly on their watch face.

Instead of building a full custom experience or relying on tiles, we chose to use a complication. Complications are glanceable, fast, and already integrated into how users interact with their watches throughout the day. Our goal was straightforward: tap the complication and immediately launch the app.

In this article, I will walk through how we implemented a small image complication that acts as an app launcher. We will look at the service implementation, how the complication data is constructed, and how it is registered with the system. The focus is on clarity and practicality, using a real-world setup that worked well in production.

### Choosing a Complication as a Shortcut

On Wear OS, there are several ways to surface functionality to users. Activities require intent and attention. Tiles are powerful, but they introduce an extra swipe and a more opinionated layout. For our use case, both options felt heavier than necessary.

A complication fit naturally. It lives directly on the watch face, it is always visible, and users already understand that tapping it should trigger something useful. We were not trying to display live data or dynamic state. We simply wanted a fast entry point into the app.

Because of that, we chose a SMALL\_IMAGE complication. This type works well as an icon-only affordance and blends nicely with most watch faces. It also avoids layout complexity and keeps the implementation focused.

From a technical perspective, complications are provided by a ComplicationDataSourceService. This service is responsible for supplying both preview data and real data when the system requests it. Even though our complication is static, the same mechanism applies.

This decision shaped the rest of the implementation. Once the complication type was clear, the service became a simple provider that always returns the same data and launches the app when tapped.

### Implementing the Complication Data Source Service

Every Wear OS complication starts with a data source. This is a service that the system binds to when it needs data for a watch face. In our case, the service is intentionally simple because the data never changes.

We extend ComplicationDataSourceService and override two key methods. One is used when the system requests real complication data, and the other is used for previews inside the watch face picker.

Here is the complete service implementation exactly as used in the project:

<a href="https://medium.com/media/de53bbbfd72cc19ccf0f0a6166d54c6d/href">https://medium.com/media/de53bbbfd72cc19ccf0f0a6166d54c6d/href</a>

The onComplicationRequest method is the main entry point. When the system asks for data, we immediately respond with a ComplicationData object. There is no background work, caching, or conditional logic here.

The getPreviewData method serves a different purpose. It supplies data when the user is browsing complications in the watch face editor. Returning the same data ensures that the preview looks exactly like the real complication, which avoids confusion.

To keep things readable, all construction logic lives in getComplicationData. This makes it obvious that both preview and runtime requests share the same output and behavior.

### Building the Complication Data

The core of this approach is the ComplicationData we return. Even though the user experience is simple, the data object still needs to define three things clearly:

1.  What the complication should look like on the watch face
2.  What text is available for accessibility and UI surfaces
3.  What should happen when the user taps it

All of that happens inside getComplicationData().

#### Picking an icon and label

We start by preparing the visual identity and a human readable label:

```
val icon = Icon.createWithResource(this, R.mipmap.app_icon_round)val appName = getString(R.string.app_name)
```

The icon is the main thing the user will recognize on the watch face. The app name is not necessarily shown prominently in a SMALL\_IMAGE slot, but it still matters because complications can surface text in other contexts, and it helps with accessibility.

#### Creating the tap action

The entire point of this complication is that it behaves like a shortcut. So the most important piece is the PendingIntent that launches the app:

<a href="https://medium.com/media/df89e99ec7a88b42fa7dc9ebab9e935c/href">https://medium.com/media/df89e99ec7a88b42fa7dc9ebab9e935c/href</a>

We ask the package manager for the launch intent for our own package. That gives us the default entry activity for the app, which is exactly what users expect when they tap an app icon.

The PendingIntent wraps that launch intent so the watch face can trigger it on our behalf. The flags are important in modern Android:

-   FLAG\_UPDATE\_CURRENT ensures that if the pending intent already exists, it is updated with the latest intent details.
-   FLAG\_IMMUTABLE satisfies the security requirement introduced in newer Android versions where the mutability of pending intents must be explicit.

#### Returning SmallImageComplicationData

Finally we construct the complication data. This is where we combine the icon, the label, and the tap action:

<a href="https://medium.com/media/5eeb8cc119660a8f22eb10942165ab89/href">https://medium.com/media/5eeb8cc119660a8f22eb10942165ab89/href</a>

This is a SMALL\_IMAGE complication, so the primary content is the SmallImage. We use SmallImageType.ICON, which is a good fit for app launcher style complications because it signals the watch face to treat it like an icon rather than a photo-style image.

The PlainComplicationText gives the system a short label to associate with the complication. Depending on the watch face and UI context, this can be used for accessibility, for configuration screens, or for fallback displays.

And .setTapAction(pendingIntent) is the key line: it turns the complication from a static icon into a shortcut that launches the app.

### Registering the Service in the Manifest

The Kotlin code is only half of the setup. The system will not discover your complication provider unless the service is registered correctly in the manifest, with the right intent filter, permission, and meta-data.

Here is the exact manifest entry we used:

<a href="https://medium.com/media/8ce39cba2aded94274dac735dee09661/href">https://medium.com/media/8ce39cba2aded94274dac735dee09661/href</a>

#### Why these attributes matter

**android:permission="com.google.android.wearable.permission.BIND\_COMPLICATION\_PROVIDER"**
This is what makes the service a complication provider. It ensures only the system can bind to it. Without this permission, the watch face cannot request complication data.

**android:exported="true"**
The service must be accessible to other processes (the watch face and system UI). That is why it is exported. On modern Android, you have to be explicit about this.

**<intent-filter> with** **ACTION\_COMPLICATION\_UPDATE\_REQUEST**
This is how Wear OS identifies the service as a complication data source. When the system needs data, it uses this action to route the request.

#### Supported types and update period

**SUPPORTED\_TYPES**
We only support one type:

```
android:value="SMALL_IMAGE"
```

That keeps the provider focused and prevents watch faces from trying to use it in incompatible slots. If you later want to support more types, they need to be comma-separated, as the comment notes.

**UPDATE\_PERIOD\_SECONDS** set to **0**

This signals that the complication does not need periodic updates. That fits our shortcut use case perfectly because the data is static. The system can request data when needed, but it will not wake your app on a schedule just to refresh an icon.

### Conclusion

This complication was intentionally boring in the best way. We did not need scheduling, background refresh, or custom rendering. We just needed a watch face slot that behaved like a shortcut and felt native to Wear OS.

By implementing a ComplicationDataSourceService that always returns the same SmallImageComplicationData, we kept the runtime logic minimal and predictable. The icon and label establish identity, and the PendingIntent turns the complication into a one tap entry point into the app. The manifest entry finishes the job by making the provider discoverable, limiting supported types to SMALL\_IMAGE, and disabling periodic updates with UPDATE\_PERIOD\_SECONDS set to 0.

If you are building a Wear OS app and want a lightweight way to stay present on the watch, a complication like this is one of the simplest wins you can ship.

* * *

[Turning a Wear OS Complication Into a Launcher Shortcut](https://levelup.gitconnected.com/turning-a-wear-os-complication-into-a-launcher-shortcut-581620d9de1c) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.