---
title: "Creating updatable calendar events in Python"
author: "Pythoneers"
platform: "medium"
publicationName: "Pythoneers"
url: "https://medium.com/pythoneers/creating-updatable-calendar-events-in-python-fda80300e835?source=rss----7a8fb64b42eb---4"
publishedAt: "2026-02-02"
tags:
  - "ci"
  - "python"
  - "python-programming"
  - "icalendar"
  - "google-calendar"
  - "community"
---

# Creating updatable calendar events in Python

# Creating updatable calendar events in Python

[UnicornOnAzur](/@unicornonazur?source=post_page---byline--fda80300e835---------------------------------------)

4 min read·Feb 2, 2026

\--

Using `ics` to make events that can be updated.

So, you just sent your custom `ics` event to someone and then noticed you messed up the end time. What do you do now? You send another invite, but now they have two events on their calendar. Luckily, there’s an easy fix to make sure the other person gets the right invite, and that’s by setting the UID.

![Image created with MagicStudio]()

## What does the manual say?

There are numerous questions only regarding how to create an update for an iCalendar event over the last two decades. Reading through some of them ([1](https://stackoverflow.com/questions/45453/icalendar-and-event-updates-not-working-in-outlook), [2](https://superuser.com/questions/1891488/can-outlook-update-existing-calendar-events-during-import), [3](https://techcommunity.microsoft.com/discussions/outlookgeneral/how-to-programatically-attach-ics-files-to-an-email-so-they-are-displaying-a-nic/4130195)) and a blog specifically focused resolving ICS problems in Outlook ([here](https://en.ittrip.xyz/ms-office/outlook/ics-file-issue-outlook)), I ended up with many possible solutions for this but the range from adding an unique UID to including multiple properties (ORGANIZER, ATTENDEE, UID, DTSTAMP, SEQUENCE). That wasn’t really helpful not to mention it didn’t explain why it worked.

Sigh, **RTFM!** The latest iCalendar specification, RFC5545, expresses this regarding unique identification of calendar events.

> The “UID” itself MUST be a globally unique identifier. \[…\] A good method to assure uniqueness is to put the domain name or a domain literal IP address of the host on which the identifier was created on the right-hand side of an “@”, and on the left-hand side, put a combination of the current calendar date and time of day (i.e., formatted in as a DATE-TIME value) along with some other currently unique (perhaps sequential) identifier available on the system (for example, a process id number).¹

From the previous version of the specification we can gather this:

> The “UID” and “SEQUENCE” properties are used to distinguish the various uses of the “REQUEST” method. If the “UID” property value in the “REQUEST” is not found on the recipient’s calendar, then the “REQUEST” is for a new “VEVENT” calendar component. If the “UID” property value is found on the recipient’s calendar, then the “REQUEST” is for a rescheduling, an update, or a reconfirm of the “VEVENT” calendar component.²

After testing some variants of these properties, I came to this:

**Google Calendar / Proton Calendar**

Having the same UID in the update seems to be sufficient.

**Outlook Calendar**

For the Outlook Calendar, at least the online version, having the same UID and adding `METHOD:REQUEST` seems to be sufficient.

If you come to different working combinations or know them for other types of calendar, please share it

## How to make this using Python?

[

## Garbage in, iCalendar out: revisited. Will it work for next year?

### Spoiler: it does ... but there was room for improvement.

medium.com

](/codetodeploy/garbage-in-icalendar-out-revisited-will-it-work-for-next-year-2fd85b3355df?source=post_page-----fda80300e835---------------------------------------)

**Create the initial event**

Using the same library (`ics`) I used for my garbage collection dates calendars, it comes down to this. Setting a unique UID can be done during creation of the `Event` object. The line containing method has to be inserted.

```
import icscalendar = ics.Calendar()calendar.events.add(ics.Event(    name="Meeting", begin="20260101T100000Z", end="20260101T110000Z", uid="test@user"))with open("original_meeting.ics", mode="w") as file:    for line in calendar.serialize_iter():        file.write(line.replace("\r\n", "\n"))        if line.startswith("DTSTART"):   # only needed for Outlook            file.write(f"METHOD:REQUEST{CRLF}")# only needed for Outlook
```

**Create an update to the event (the incorrect way)**

If we were to simply change the end time of the meeting and then write it to an `.ics` file, it would be imported to the calendar however it becomes a separate item.

```
calendar = ics.Calendar()calendar.events.add(ics.Event(    name="Meeting", begin="20260101T100000Z", end="20260101T120000Z"))
```

**Create an update to the event (the correct way)**

If we change the end time **and** supply the same UID, we get a proper update to the calendar event.

```
calendar = ics.Calendar()calendar.events.add(ics.Event(    name="Meeting", begin="20260101T100000Z", end="20260101T120000Z", uid="test"))
```

The different outcome of importing both updates is shown below. For clarity, I named the incorrect method “v2” and the correct method “v3”.

![Left the result of importing event version 1 and 2. Right the result of importing event version 1 through 3. Image created by author.]()

## To Conclude

Despite the many questions and blogging on the topic, the minimal changes required seem to be small. In the calendars I tested adding an UID and METHOD property were all that was needed.

> This story is my way to share my coding experience and the lessons I learned, and to document my solutions. All claps, comments, and highlights are appreciated, as well as sharing the story. For more code and my other links see: [https://github.com/UnicornOnAzur/.](https://github.com/UnicornOnAzur/)

\[1\] [https://www.rfc-editor.org/rfc/rfc5545](https://www.rfc-editor.org/rfc/rfc5545)

\[2\] [https://www.rfc-editor.org/rfc/rfc2446](https://www.rfc-editor.org/rfc/rfc2446)