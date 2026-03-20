---
title: "Build Microsoft Foundry Agents with Python SDK: Part 1"
author: "Generative AI"
platform: "medium"
publicationName: "Generative AI"
url: "https://generativeai.pub/build-microsoft-foundry-agents-with-python-sdk-part-1-d6ddf568a910?source=rss----440100e76000---4"
publishedAt: "2026-03-17"
tags:
  - "agents"
  - "ai-general"
  - "llm"
  - "python"
categories:
  - "AI & Machine Learning"
  - "Programming"
tagsNormalizedAt: "2026-03-19T14:28:28.979Z"
---

# Build Microsoft Foundry Agents with Python SDK: Part 1

## AGENTIC AI

# Build Microsoft Foundry Agents with Python SDK: Part 1

## Set up agents from scratch, add tools, install guardrails, etc.

[Dr. Varshita Sher](https://varshitasher.medium.com/?source=post_page---byline--d6ddf568a910---------------------------------------)

10 min read·2 days ago

\--

### Introduction

As the title suggests, we will be learning how to create agents using Foundry’s python SDK. Before we begin, some of you may ask — *what’s wrong with using the Foundry UI to create agents?*

The simple answer is — Nothing really. In fact I urge you to try creating an agent using a few clicks on the Foundry UI to understand where to see:

-   the instructions (and use AI to even write them instead of starting from scratch). For instance, here I am explicitly forcing a guided approach for my `researcher-agent`, where the agent must identify and get the topics approved before it starts generating them.

![Use AI to write the instructions for an agent]()

-   the version (and compare different agent versions to see which offers the best output). On the left, latest `v7` version: the agent uses the web search tool and follows our instructions to confirm the topics with the end users first before it starts generating the research report ; whereas in the older `v1` version on the right, it lacked access to any tool and it would start producing an output from the get go without a human-in-the-loop to verify the topics first.

![Compare different versions of an agent with the same input]()

-   the run trace to assess the input/output/tooluse, etc. This is highly beneficial for debugging agent responses if they lack quality, decent latency, or showcase signs of hallucinations.

![]()

![Run traces for each agent interaction]()

Once you’ve had a good look and feel of the playground, you are ready to move onto the next step. While you can keep using the platform’s UI for manual agent creation, the Foundry SDK allows for automation, scalability and integration into your own application.

In more practical terms, there are a few things that can only be done via the SDK:

-   [implementing custom functions as tools](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/function-calling?pivots=python) (for example: `get_user_info()`to let the agent fetch a user’s record before further processing).
-   [enriching traces with metadata](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-projects/samples/agents/telemetry/sample_agent_basic_with_console_tracing_custom_attributes.py) (for example: adding custom attributes like `customer_tier: “gold”` programatically to filter traces in portal to find specifically why “gold” tier users are experiencing high latency)
-   logging client-side traces (for ex: user\_id, app\_version, retries, queuing, time spent waiting before you even call `responses.create()`) and merging them with server side traces (response time, error rate, intermediate steps by agent, tool call, etc). Since the UI portal allows out-of-box access to server-side traces only i.e. what’s happening on the cloud platform, without the SDK, your app’s logic and foundry portal’s traces are two separate puzzles that don’t fit together. (for ex: when something goes wrong, Foundry’s server trace won’t tell you which user workflow, which app version, or which feature flag produced the call).

Later on in Part 2, we will build concrete examples of tracing agents using the SDK. In addition, we will learn how to deploy these agents in a responsible manner by leveraging the inbuilt support for guardrails and Agent 365 control panel to monitor all the published agents.

Let’s begin!

*Note: The new microsoft foundry python sdk is in public preview, meaning things are changing with every new version release. This preview is provided without a service-level agreement, and isn’t recommended for production workloads.*

### **Prerequisites**

-   Python 3.9+
-   Verify Azure CLI is authenticated

```
az account showaz login  # if not logged in already.
```

> Note: Make sure to run `az login` command in your terminal or else set environment-based credentials.

-   Required Azure role: On the Foundry resource, Contributor or Owner for management and Azure AI User for building an agent.

### **Setup**

1) Create/activate a virtual environment.

2) Install dependencies

```
pip install azure-ai-projects==2.0.0b3pip install azure-identity==1.25.1pip install python-dotenv==1.0.0pip install openai==2.18.0
```

3) Create a project on the foundry portal using [these steps](https://learn.microsoft.com/en-us/azure/foundry/tutorials/quickstart-create-foundry-resources?tabs=portal#create-a-project) and deploy a model using [these steps](https://learn.microsoft.com/en-us/azure/foundry/tutorials/quickstart-create-foundry-resources?tabs=portal#deploy-a-model).

4) Configure environment variables (create a `.env` file and set the following variables). You can follow [these steps](https://learn.microsoft.com/en-us/azure/foundry/tutorials/quickstart-create-foundry-resources?tabs=portal#get-your-project-connection-details) to fetch these two:

\- AZURE\_AI\_PROJECT\_ENDPOINT

\- AZURE\_AI\_MODEL\_DEPLOYMENT\_NAME

![Fetch the project endpoint (i.e. AZURE_AI_PROJECT_ENDPOINT) from the Azure Foundry project page]()

![Fetch the model deployment name (i.e. AZURE_AI_MODEL_DEPLOYMENT_NAME) from here]()

```
Example `.env`:AZURE_AI_PROJECT_ENDPOINT="https://<your-project-endpoint>" AZURE_AI_MODEL_DEPLOYMENT_NAME="<your-deployment-name>" # for ex: "gpt-5.2-chat"
```

### Basic Agent with no Tools

Remember the `researcher-agent` we saw at the beginning? Let’s recreate it using the foundry SDK to make things reproducible.

This will be a basic agent with no tools, this is essentially the same as calling a reasoning LLM with a very smart instruction.

```
from azure.ai.projects import AIProjectClientfrom azure.identity import DefaultAzureCredentialfrom dotenv import load_dotenvload_dotenv()user_endpoint = os.getenv("AZURE_AI_PROJECT_ENDPOINT")project_client = AIProjectClient(    endpoint=user_endpoint,    credential=DefaultAzureCredential(),)RESEARCHER_AGENT_PROMPT= """You are a researcher agent.Given a topic, you first need to frame an outline and identify 3 key sections.For each key section, find relevant information and summarize in a tabular format at the end of each section."""agent = project_client.agents.create_version(    agent_name="researcher-agent",    description="Useful for creating detailed reports.",    definition=PromptAgentDefinition(        model="gpt-5.2-chat",        instructions=RESEARCHER_AGENT_PROMPT    ),)print(f"Agent created (id: {agent.id}, name: {agent.name}, version: {agent.version})")
```

*Note: The* `*description*` *is mainly for you to remember what the agent does. Keep it short and simple as it will show up on the portal.*

## Get Dr. Varshita Sher’s stories in your inbox

 from this writer.

Remember me for faster sign in

Upon running the above code, you will see the agent visible in the foundry portal. Pay special attention to the `version` as this will keep on updating everytime you run this code with any new modifications. Let’s see it in action.

> Note: If you see this error at run time — `“ImportError: cannot import name ‘PromptAgentDefinition’ from ‘azure.ai.projects.models’”`, make sure you have the correct verison installed `pip install azure-ai-projects==2.0.0b3`.

### Agent with a WebSearch Tool

We are going to update this `researcher-agent` with a tool, specifically the [web search tool](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/web-search?pivots=python) (currently in preview). We will also update the `RESEARCHER_AGENT_PROMPT` to make use of this tool for fetching testimonials from interviews or blogs by famous people.

*Note: Apart from the websearch, Foundry offers few other tools out of the box. Complete list can be found* [*here*](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/tool-catalog#manage-tools-youve-configured)*.*

![Tools offered by Msft Foundry]()

```
RESEARCHER_AGENT_PROMPT= """You are a researcher agent.Given a topic, you first need to frame an outline and identify 3 key sections.For each key section, find relevant information and summarize in a tabular format at the end of each section.Include any testimonials from interviews or blogs by famous people."""agent = project_client.agents.create_version(    agent_name="researcher-agent",    description="Useful for creating detailed reports.",    definition=PromptAgentDefinition(        model="gpt-5.2-chat",        instructions=RESEARCHER_AGENT_PROMPT,        tools=[            WebSearchPreviewTool(                search_context_size="high",  # Supported values are low, medium, and high                user_location=ApproximateLocation(                    country="GB", city="London", region="London"                ),            )        ],    ),)print(f"Agent created (id: {agent.id}, name: {agent.name}, version: {agent.version})")
```

Few things to note:

-   `user_location` helps web search return results relevant to a user’s geography.
-   `search_context_size` controls how much context window space to use for the search.

Now when you run the code above, you will notice the `version` number has increased to `v2` (and is now ready for comparison in the portal as I mentioned at the start of the article).

### Agent Inference on User Input

To see the agents in action on real user input, you have two options — use the foundry portal or do it programtically.

Since we have already discussed the former at the start of this article, let’s try the latter with the Foundry SDK. We will first fetch the correct agent from the catalog using `project_client.agents.get()` followed by a call to the LLM with `openai_client.responses.create()`. If you have worked with the `openai` library, this setup should look familiar.

```
def run_inference(agent_name: str, content: str, tool_choice: str = "auto"):    # Get an existing agent    agent = project_client.agents.get(agent_name=agent_name)    print(f"Retrieved agent: {agent.name}")    openai_client = project_client.get_openai_client()    conversation = openai_client.conversations.create()    # Reference the agent to get a response    response = openai_client.responses.create(        # model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],        conversation=conversation.id,        tool_choice=tool_choice,        input=[            {                "role": "user",                "content": content,            }        ],        extra_body={"agent": {"name": agent.name, "type": "agent_reference"}},    )    print(f"Response output: {response.output_text}")***************************************************run_inference(agent_name="researcher-agent",              content="koala bears",              tool_choice="required")
```

Few things to note:

-   `tool_choice` can be set to `auto` or `required` depending on whether you want to enforce tool usage for the user input. (this is useful, say for instance when you are using the `file-search` tool which is pointed to HR onboarding documents for your company and you want to force the agent to use these while framing the response instead of relying on model’s inherent training knowledge)
-   Often times, it is helpful to see if the `WebSearchPreviewTool` was called with the relevant search query. Luckily for us, this info is available inside the `response` payload dictionary and can be retrieved for tracking and verification.

```
# Inspect tool calls to see the web search queryfor item in response.output or []:  if getattr(item, "type", None) == "web_search_call":      action = getattr(item, "action", None)      if action and getattr(action, "type", None) == "search":          print("Web search query:", action.query)
```

-   Likewise, all the citations/site urls that were used to frame the final answer are essential. By default, these are included at the end of the output text, but we can extract them separately too:

```
# Print all citations attached to the model’s message content (if any)for item in response.output or []:  if getattr(item, "type", None) == "message":      for part in getattr(item, "content", []) or []:          for ann in getattr(part, "annotations", []) or []:              ann_type = (                  ann.get("type")                  if isinstance(ann, dict)                  else getattr(ann, "type", None)              )              if ann_type in ("url_citation"):                  # Handle both dict annotations and SDK model objects.                  if isinstance(ann, dict):                      print(ann)                  elif hasattr(ann, "__dict__"):                      print(vars(ann))                  else:                      print(ann)
```

-   The agent determines when to use tools, meaning it may call the web search tool multiple times for a single user query.

*Pro Tip:* `*tool_choice="required”*` *guarantees at least one call, but the model can still choose to merge both claims into a single query unless you force per‑claim searches in the instructions. Here’s an example with my* `*fact-checker-agent*` *which takes as input a claim and outputs whether it is* `*true*`*,* `*false*` *or* `*mixed*` *along with evidence from the web.*

*For the input—* `*“Apple is a cheaper stock to buy than Microsoft and Koala bears population has been declining”*`*, I expected it to make two separate calls since they are unrelated topic, however in version v1, the basic instructions led to tool call only once. Henceforth, I updated the instructions in v2 with an added sentence —* `*“For each claim, make a separate web search tool call. Do NOT combine multiple claims into a single search query. If there are N claims, make N web searches.”*` *which led to two separate tool calls.*

![]()

![For the same input: v1 (on left) singe tool call ; v2 (on right) two separate tool calls with explicit instructions]()

### Adding custom guardrails to agents

By default, there are a few guardrails that apply to all foundry agents. These include content safety elements, specifically `hate`, `self-harm`, `sexual`, and `violence`. These Microsoft minimum controls cannot be deleted except by approved, managed customers.

You can, however, add more guardrails to the list. To demonstrate, I will create a new guardrail — `custom_guardrail_vs` in the foundry UI (this can be done via code too) which will focus on PII data leakage, in addition to content safety.

![Creating a custom guardrail in the foundry UI]()

Once that’s done, you are ready to attach the `RAIConfig()` to your agent by specifying the correct `rai_policy_name`.

```
from azure.ai.projects.models import RaiConfig# Replace with your RAI policy from Azure AI Foundry portalrai_policy_name = (    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/"    "Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies/{policyName}")agent = project_client.agents.create_version(    agent_name="researcher-agent",    description="Useful for creating detailed reports.",    definition=PromptAgentDefinition(        model="gpt-5.2-chat",        instructions=RESEARCHER_AGENT_PROMPT    ),    rai_config=RaiConfig(rai_policy_name=rai_policy_name))
```

*Note: If you face any trouble finding the details (such as subscriptionid, resourcegroup, etc) for framing the* `*rai_policy_name*`*, head over to the foundry UI and look for* `*AZURE_EXISTING_AIPROJECT_RESOURCE_ID*` *inside sample code.*

![]()

![Sample code for finding the rail_policy_name details]()

### Final Thoughts

And there you have it — you have successfully created your first agent with Foundry SDK. The basics discussed here would allow you to use the boilerplate code for other tools such as sharepoint connector, image generation, code interpreter, etc. (Code snippets for all tools can be found [here](https://github.com/MicrosoftDocs/azure-docs-sdk-python/blob/main/docs-ref-services/preview/ai-projects-readme.md#using-agent-tools).)

In Part 2, we will learn how to setup a multi-agent orchestration with the Foundry SDK where we will create 3 utility agents and have the main i.e. the orchestrator agent pick one or more of them at runtime to solve a problem.

Happy Learning 🚀

![]()

This story is published on [Generative AI](https://generativeai.pub/). Connect with us on [LinkedIn](https://www.linkedin.com/company/generative-ai-publication) and follow [Zeniteq](https://www.zeniteq.com/) to stay in the loop with the latest AI stories.

Subscribe to our [newsletter](https://www.generativeaipub.com/) and [YouTube](https://www.youtube.com/@generativeaipub) channel to stay updated with the latest news and updates on generative AI. Let’s shape the future of AI together!

![]()