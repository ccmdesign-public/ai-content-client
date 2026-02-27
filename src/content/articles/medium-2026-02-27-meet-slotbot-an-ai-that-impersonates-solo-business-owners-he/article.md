---
title: "Meet SlotBot: An AI That Impersonates Solo Business Owners — Here’s What I Learned About Agentic Systems"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/meet-slotbot-an-ai-that-impersonates-solo-business-owners-heres-what-i-learned-about-agentic-systems-95316c816b71?source=rss----98111c9905da---4"
publishedAt: "2026-02-27"
tags:
  - "generative-ai-tools"
  - "ai-agent"
  - "agentic-ai"
  - "ai"
  - "research"
---

# Meet SlotBot: An AI That Impersonates Solo Business Owners — Here’s What I Learned About Agentic Systems

# 🤖Meet SlotBot: An AI That Impersonates Solo Business Owners — Here’s What I Learned About Agentic Systems

[Soultntoure](https://medium.com/@soultntoure?source=post_page---byline--95316c816b71---------------------------------------)

6 min read·Just now

\--

Picture this: you’re a solo clinician running a small practice. No receptionist, no admin team. Just you, your patients, and a WhatsApp inbox full of “Hey are you free Thursday?” messages that you answer while eating lunch, between sessions, or late at night after a long day.

Same story for barbers booking cuts, FYP supervisors managing student check-ins, freelance consultants juggling client calls. The business is simple. The scheduling overhead? Genuinely exhausting.

That’s the gap I wanted to close.

## The actual problem

The pattern is always the same: someone messages asking about a slot, the business owner mentally cross-references their calendar, replies, waits for confirmation, then creates the event. Multiply that by 10–20 messages a day and you’re burning an hour on admin that should take zero minutes.

Tools like Calendly shine when people can self‑book from a fixed menu of options. But many real‑world workflows are messier. What if your scheduling has nuance? What if a patient messages, “I need to reschedule to sometime next week, evenings preferably”?

That requires context, flexibility, and back-and-forth. No form handles that gracefully.

What I wanted to build was something in between — something that *behaves* like the business owner, holds a real conversation, understands what the person needs, checks the actual calendar, and books accordingly. No menu. No form. Just a chat.

I called it **SlotBot**.

![]()

## Thinking Like the Business Owner

Before touching any tech choices, lets us establish the design philosophy — because it drove every decision.

SlotBot doesn’t just answer scheduling questions. It *is* the business owner, digitally. You configure it with the owner’s calendar, and it operates autonomously on their behalf. The patient doesn’t know (or care) whether they’re talking to a human or an agent — they just want to know if Tuesday at 5pm is available and get it locked in.

This framing changes the requirements entirely. It’s not a lookup tool. It’s not a FAQ bot. It needs to:

-   Understand conversational, unstructured messages
-   Know what information it still needs before it can act
-   Actually write to the calendar — creating, updating, and cancelling appointments and not just suggest slots.
-   Check real calendar availability against the request

That’s a non-trivial pipeline. And a single LLM prompt can’t reliably do all of it.

## Why CrewAI

The first question I had to answer was whether we even needed an agentic framework at all. Couldn’t we just chain a few prompts together and call it done?

The short answer is: once your pipeline has memory, decision-making, and real-world actions like writing to a calendar, a single prompt stops being enough. You need structure. You need to be able to say “this step does this, that step does that, and here’s how they talk to each other” — without it turning into a mess of glue code.

That’s where **CrewAI** came in. Built by

[Tony Kip Kip](https://medium.com/u/2845ec63c0eb?source=post_page---user_mention--95316c816b71---------------------------------------)and João Moura, CrewAI is an open-source framework for building multi-agent systems — think of it as a way to organize AI into a team of specialized workers, each with a clearly defined role, working together toward a shared goal. Instead of one model trying to do everything, you break the problem into focused agents and let them collaborate.

What drew me to it specifically was how approachable it is. Agents and tasks are configured in plain YAML files, meaning the logic of what each agent does and why lives completely separately from the code that runs it. You can read a CrewAI config and understand the system without knowing anything about the underlying implementation.

It also has a feature called `ConditionalTask` — a way to add branching logic to your pipeline cleanly. In SlotBot's case, the key question mid-conversation is always: *do we have enough information to book, or do we need to ask for more?* CrewAI lets you express that decision natively, without messy if/else logic scattered through your code.

For a pipeline with real decisions to make and real APIs to call, CrewAI felt like the right tool.

## The Architecture: Four Agents, Five Tasks

![]()

Here’s what each agent does and why it exists as a separate entity:

```
# agents.yamlnlp_parser:  role: Natural Language Processing Specialist  goal: >    Parse user message to extract the intent (booking, deleting, checking)    and any meaningful entities from the input, such as name, email, date, and time.  llm: gemini/gemini-2.5-flash-lite-preview-06-17session_manager:  role: Session and Identity Management Coordinator  goal: >    Manage user identity, session state, and track all required information    for calendar operations  llm: gemini/gemini-2.5-flash-lite-preview-06-17calendar_manager:  role: Calendar Operations Specialist  goal: >    Execute calendar operations including availability checks, bookings, and cancellations.  llm: gemini/gemini-2.5-flash-lite-preview-06-17response_agent:  role: Clinical Appointment Assistant  goal: >    Serve as the final point of contact, delivering clear, concise, and professional    communication about appointment status.  llm: gemini/gemini-2.5-flash-lite-preview-06-17
```

Each agent has *one job*. The NLP parser doesn’t decide what to do with extracted info — it just extracts. The session manager doesn’t talk to the calendar — it just decides what’s missing. This Single Responsibility design made the system dramatically easier to debug and extend.

## Get Soultntoure’s stories in your inbox

 from this writer.

Remember me for faster sign in

**Why this matters:** When something breaks in a multi-agent system, you need to know *which agent* broke it. One job per agent means one place to look.

The tasks follow a sequential pipeline:

```
# tasks.yaml (abbreviated)parse_user_input:  description: >    Analyze the user's message to understand primary intent and extract    relevant entities (name, email, date, time).    Today's date is {current_date}. Resolve relative expressions like 'tomorrow'.  agent: nlp_parser  output_file: 'outputs/parsed_user_input.json'validate_session_state:  description: >    Analyze parsed input and determine next_action:    'collect_info' if required fields are missing, 'execute_operation' if ready to book.  agent: session_manager  context:    - parse_user_inputcollect_missing_information:  # ConditionalTask  description: >    Generate clear, user-friendly questions to collect any missing information.  agent: response_agent  context:    - validate_session_stateexecute_calendar_action:  # ConditionalTask  description: >    Use BookAppointmentTool or CheckAvailabilityTool based on next_action.  agent: calendar_manager  context:    - parse_user_input    - validate_session_stateformat_user_response:  description: >    Format the output from previous tasks into a clear, friendly message for the user.  agent: response_agent  context:    - execute_calendar_action    - collect_missing_information
```

The branching logic lives in the crew itself:

```
# crew.pydef should_collect_info(self, validation_output: TaskOutput) -> bool:    return self._get_next_action() == 'collect_info'def should_execute_action(self, validation_output: TaskOutput) -> bool:    return self._get_next_action() in ['check_availability', 'execute_operation']@taskdef collect_missing_information(self) -> ConditionalTask:    return ConditionalTask(        config=self.tasks_config['collect_missing_information'],        condition=self.should_collect_info,        agent=self.response_agent()    )@taskdef execute_calendar_action(self) -> ConditionalTask:    return ConditionalTask(        config=self.tasks_config['execute_calendar_action'],        condition=self.should_execute_action,        agent=self.calendar_manager(),        context=[self.parse_user_input(), self.validate_session_state()]    )
```

`collect_missing_information` and `execute_calendar_action` are mutually exclusive — only one fires per turn. `format_user_response` always runs last, pulling context from whichever of the two ran.

The full flow:

![]()

> *User message → NLP Parser → Session Manager → \[collect info OR execute action\] → Response Agent → reply*

## How it looks in practice

A patient messages: *“Can I book an appointment for next Tuesday?”*

1.  NLP parser extracts: `intent = book`, `start_time = 2025-07-22T...`, but `patient_email = null`
2.  Session manager sees the missing email. Sets `next_action = collect_info`
3.  Response agent replies: *“Of course! Could you share your email address so I can confirm the booking?”*

Next message: *“Sure, it’s* [*patient@example.com*](mailto:patient@example.com)*”*

Same pipeline runs again. This time the email is extracted. Session manager sets `next_action = execute_operation`. Calendar manager fires, calls `BookAppointmentTool`, writes the event. Response agent confirms.

Two conversational turns. Zero involvement from the actual clinician.

![]()

## What I Actually Learned

After building SlotBot, here’s what I’d take into any agentic system I build next:

✅ **Single responsibility per agent** — one job, one agent. Debugging becomes straightforward.

✅ **Branch with** `**ConditionalTask**`**, not if/else** — keep the orchestration layer clean; logic belongs in the condition function.

✅ **Type your outputs with Pydantic** — raw strings between agents are a debugging nightmare waiting to happen.

✅ **The mental model matters more than the tech** — “impersonation” forced clearer requirements than “scheduling bot” ever would have.

The hardest part wasn’t the code. It was figuring out *exactly* what the system needed to do before writing a single line. Once the design philosophy was clear, the architecture followed naturally.

## Demo

## The code

Full source on GitHub: [https://github.com/soultntoure/SlotBot](https://github.com/soultntoure/SlotBot)

If you’ve built something similar, tried a different orchestration framework, or think the architecture has obvious flaws — I genuinely want to hear it. Drop your take in the comments.