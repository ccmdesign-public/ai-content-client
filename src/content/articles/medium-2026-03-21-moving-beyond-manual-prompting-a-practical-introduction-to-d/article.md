---
title: "Moving beyond manual prompting: A practical introduction to DSPy"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/moving-beyond-manual-prompting-a-practical-introduction-to-dspy-6bf4ae8082ac?source=rss----98111c9905da---4"
publishedAt: "2026-03-21"
tags:
  - "ai-general"
  - "llm"
  - "research"
categories:
  - "AI & Machine Learning"
  - "Tools & Productivity"
tagsNormalizedAt: "2026-03-23T14:40:53.875Z"
---

# Moving beyond manual prompting: A practical introduction to DSPy

### Moving Beyond Manual Prompting: A Practical Introduction to DSPy

Have you ever spent hours crafting the perfect prompt, only to have it break when you switch LLM models? Or have you watched your carefully engineered prompts not work as expected when you test them out on some new data points? I’ve been there. That’s why I decided to test out DSPy, a framework that provides a different perspective on how we build LLM applications.

![Photo by Aerps.com on Unsplash](https://cdn-images-1.medium.com/max/1024/0*Y2fJezt8gTdFsOLI)

### What is DSPy?

DSPy provides a way to programmatically obtain the desired output from an LLM, representing a departure from the conventional approach where we typically prompt LLMs when building use cases at the application layer. DSPy is an acronym for *“Declarative Self-Improving Python.”* As I have seen many put it, just as PyTorch provides an abstraction for neural networks, DSPy provides an abstraction for LLM applications. As stated in the tagline on DSPy’s homepage, it facilitates *“Programming — Not Prompting Language Models.”* Essentially, DSPy provides a structured, declarative framework for working with language models.

#### Why did I try out DSPy?

I wanted to answer a few questions I had: Does DSPy actually make building AI applications easier, or is it just another layer of abstraction? And what are some of the caveats associated with this framework? In what use cases could such a framework be the most useful?

In this blog, I’ll walk you through:
1\. Core building blocks of DSPy (Signatures, Predictors, Modules, Optimizers)
2\. Some practical examples to better understand the concepts
3\. My thoughts on when using DSPy could be beneficial

> Note: All the code shown in this blog can be found in this [repository](https://github.com/akhil-eppa/DSPy_Learning)

### What DSPy brings to the table over traditional prompt engineering

Some of the pain points of prompt engineering that I have experienced are: prompts that tend to work well with one model but break with model updates, a loop of trial and error tweaking of prompts, and the overhead attached with maintaining prompt versions across your code. DSPy has a different approach that reimagines this workflow through three key principles.

#### Declarative over imperative

Traditional prompt engineering approach:

```
You are an expert entity extractor. Please carefully analyze the following text and extract:- All person names (first and last names)- All locations (cities, countries, landmarks)- All organizations (companies, institutions)Text: {text}Provide your answer in the following format json format:```json{  "persons": [<person_1>, <person_2>, ...],  "locations": [<location_1>, <location_2>, ...],  "organizations": [<organization_1>, <organization_2>, ...]}
```

DSPy approach:

```
class EntityExtraction(dspy.Signature):    """Extract named entities from text."""    text: str = dspy.InputField()    persons: List[str] = dspy.OutputField()    locations: List[str] = dspy.OutputField()    organizations: List[str] = dspy.OutputField()
```

The difference is that DSPy allows one to programatically declare the input and output structures. A default prompt is generated, which can be optimized using DSPy to arrive at an optimized prompt.

#### Prompts as optimizable parameters

This is one of the powerful features that DSPy offers. If you have ground truth input and output data for your use case, DSPy can optimize the prompt based on your data.

To put it simply at a high level:

-   Neural networks: weights are optimized via backpropagation
-   DSPy: prompts are optimized through ground truth examples and the defined metric.

#### Structured approach for using LLMs

DSPy brings a structured programming approach to work with LLMs with:

-   Clear interfaces (signatures) and composable components
-   Type-safe inputs and outputs that are testable and maintainable
-   Structured flow to optimize LLM prompts

#### The problems DSPy aims to solve

-   **Prompt brittleness:** Change a little in the prompt, or switch the model, and the carefully crafted prompt tends to break. The DSPy solution allows for the generation and optimization of prompts automatically, and its basis is the data you provide.
-   **Model updates:** Prompts optimized for one LLM need not work well for the other, and you would need to optimize again for the new model. In DSPy, you can change the model configuration and keep the rest of the code the same. You can re-optimize the prompt for the given model.
-   **Trial and error prompt engineering:** Modifying prompts, testing variations of the prompt, and hoping for better results. Instead, DSPy provides the functionality to define your metric, provide ground truth data, and let the optimizer find the best approach.

### Getting started with DSPy

#### Installation and setup

DSPy is available for use in Python and can be installed using pip:

```
pip install -U dspy
```

DSPy works with any LLM provider. For this tutorial, I am using locally served language models through Ollama. If you prefer to use hosted models, you can refer to this [DSPy documentation](https://dspy.ai/#__tabbed_1_1).

To set the context for those who are new to Ollama, it is a tool that lets you run open-source LLMs locally — free, private, and offline. You can download Ollama from [here](https://ollama.com/download).

Once you have Ollama downloaded and installed, you will need to pull and run the model. For this demonstration, I am using Llama 3.2, so shown below are the commands for the same. You can modify the commands to use the model of your choice, but note the [size of the models](https://ollama.com/search) and whether your local hardware can support it.

```
ollama pull llama3.2ollama run llama3.2
```

Note that the pull command is optional, as Ollama pulls the model automatically if it’s not already present when you use *ollama run*. If you face an issue when executing the *ollama run* command, first ensure that the Ollama server is running locally. You can start the Ollama server locally by running

```
ollama serve
```

Now that the LLM has been set up, the first step when getting started within DSPy is to configure the language model. In DSPy, you can do so in the following way:

```
import dspylm = dspy.LM("ollama_chat/llama3.2:latest",              api_base="http://localhost:11434", api_key="")dspy.configure(lm=lm)
```

Note: Ollama models are served from port 11434 on localhost. The model name in the configuration should be adjusted based on the model being used.

Another recommended step is to disable caching during the experimentation process, as this ensures inference is obtained directly from the LLM rather than from previously cached responses.

```
# Disable cache during development and experimentationdspy.configure_cache(enable_memory_cache=False, enable_disk_cache=False)
```

#### Core components of DSPy

DSPy consists of four fundamental concepts: Signatures, Modules, Predictors, and Optimizers. Let’s understand each of them.

**Component 1: Signatures**

Signatures are blueprints for your LLM task. They define the input format and expected output format, establishing a contract for your pipeline.

Signatures can be defined as either a string or a class. Let's go through a use case to extract entities (persons, locations, and organizations) from a piece of input text using an LLM.

**String-based signature**

```
"text->persons, locations, organizations"
```

**Class-based signature (recommended)**

```
import dspyfrom typing import Listclass EntityExtraction(dspy.Signature):    """Extract named entities (persons, locations, and organizations) from the given text."""        text: str = dspy.InputField(desc="The input text to analyze for named entities")    persons: List[str] = dspy.OutputField(desc="List of person names found in the text")    locations: List[str] = dspy.OutputField(desc="List of locations/places found in the text")    organizations: List[str] = dspy.OutputField(desc="List of organizations/companies found in the text")
```

**Signatures** enable the creation of reusable, well-documented pipelines and facilitate optimization using DSPy’s built-in capabilities.

**Component 2: Predictors**

Predictors execute your signatures by generating prompts and invoking the LLM.

Some of the commonly used predictors are:

1.  ***dspy.Predict***: Direct prediction in a single LLM call
2.  ***dspy.ChainOfThought***: Uses reasoning steps to arrive at the final answer
3.  ***dspy.React***: Enables agentic style interaction and tool usage

**Example:**

```
simple_predictor = dspy.Predict("text->persons, locations, organizations")# Invoke the predictorprediction = simple_predictor(text="input_text")
```

**Component 3: Modules**

Modules are composable building blocks in DSPy. Modules are defined using *dspy.Module*. A *forward()* method must be defined within a module to specify the logic executed during inference time. To better understand this concept, consider the example below, which uses the same signature example discussed previously. This is a simple module with a single step, but modules can have multiple steps where various operations are performed before returning the output.

```
import dspyfrom typing import Listclass EntityExtraction(dspy.Signature):    """Extract named entities (persons, locations, and organizations) from the given text."""        text: str = dspy.InputField(desc="The input text to analyze for named entities")    persons: List[str] = dspy.OutputField(desc="List of person names found in the text")    locations: List[str] = dspy.OutputField(desc="List of locations/places found in the text")    organizations: List[str] = dspy.OutputField(desc="List of organizations/companies found in the text")class SimpleEntityExtractor(dspy.Module):    def __init__(self):        super().__init__()        self.extract = dspy.ChainOfThought(EntityExtraction)        # Can initialize more predictors as needed        def forward(self, text):        extraction = self.extract(text=text)        # Additional predictors or steps can be executed here                # Return structured results        return {            "persons": extraction.persons,            "locations": extraction.locations,            "organizations": extraction.organizations        }
```

Modules can chain multiple predictors, nest other modules, and include custom logic aiding in the development of multi-step workflows.

**Component 4: Optimizers**

Optimizers in DSPy iteratively improve your pipeline’s performance using training examples and metrics.

Common optimizers used are:

-   **BootstrapFewShot**: Synthesizes few-shot examples from ground truth data to use at inference
-   **MIPROv2**: Optimizes instructions and examples together based on the provided data and defined metric
-   **GEPA**: Uses textual feedback or reflection loops for automatic prompt improvement. The feedback or reflection helps identify what went wrong in failed attempts and generates textual feedback suggesting or explaining improvements, thereby enhancing the overall prompt. This feedback or reflection loop ideally requires a different or more powerful language model. It can be used in domain-specific use cases such as Finance, Legal, or Healthcare.

Overall, these optimizers are really useful when the required training data is available, but in novel scenarios where such curated data may not exist, their utility can be limited.

#### Putting it all together

With these four components, DSPy transforms your workflow:

-   **Signatures** define what you want
-   **Predictors** determine execution flow
-   **Modules** build multi-step workflows
-   **Optimizers** improve performance systematically through ground truth data and metrics

### Practical example: Entity extraction

Let’s walk through building a simple entity extraction system to see DSPy in action.

#### Step 1: Basic extraction with string-based signature

```
import dspy# Configure DSPy with Llama modellm = dspy.LM("ollama_chat/llama3.2:latest", api_base="http://localhost:11434", api_key="")dspy.configure(lm=lm)# Disable caching dspy.configure_cache(enable_memory_cache=False, enable_disk_cache=False)# Starting with a string-based signaturesimple_entity_extractor = dspy.Predict("text->persons, locations, organizations")# Extraction of output with sample text provided as inputextracted_output = simple_entity_extractor(text="TechCorp's CEO Sarah Chen met with DataSystems' Michael Torres in Riverside to discuss cloud computing.")print(extracted_output)
```

**Output:**

```
Prediction(    persons='Sarah Chen, Michael Torres',    locations='Riverside',    organizations='TechCorp, DataSystems')
```

As you can see, we get the various entities in a structured format in the output above.

**Inspecting the generated prompt**

To inspect the interaction with the predictor, we can use this utility that DSPy provides:

```
print(simple_entity_extractor.inpsect_history(n=1))
```

This would show us the last interaction with the predictor. You’ll see that DSPy generated a structured prompt based on the provided signature.

```
System message:Your input fields are:1. `text` (str):Your output fields are:1. `persons` (str): 2. `locations` (str): 3. `organizations` (str):All interactions will be structured in the following way, with the appropriate values filled in.[[ ## text ## ]]{text}[[ ## persons ## ]]{persons}[[ ## locations ## ]]{locations}[[ ## organizations ## ]]{organizations}[[ ## completed ## ]]In adhering to this structure, your objective is:         Given the fields `text`, produce the fields `persons`, `locations`, `organizations`.User message:[[ ## text ## ]]TechCorp's CEO Sarah Chen met with DataSystems' Michael Torres in Riverside to discuss cloud computing.Respond with the corresponding output fields, starting with the field `[[ ## persons ## ]]`, then `[[ ## locations ## ]]`, then `[[ ## organizations ## ]]`, and then ending with the marker for `[[ ## completed ## ]]`.Response:[[ ## persons ## ]]Sarah Chen, Michael Torres[[ ## locations ## ]]Riverside[[ ## organizations ## ]]TechCorp, DataSystems[[ ## completed ## ]]
```

#### Step 2: Moving to class-based signature

```
# Defining a class-based signature for extracting entities# We make use of the dspy.Signature base classclass EntityExtraction(dspy.Signature):    """Extract named entities (persons, locations, organizations) from the given text."""        text: str = dspy.InputField(desc="The text to extract entities from")    persons: list[str] = dspy.OutputField(desc="List of person names extracted from the text")    locations: list[str] = dspy.OutputField(desc="List of location names extracted from the text")    organizations: list[str] = dspy.OutputField(desc="List of organization names extracted from the text")
```

Let us compare how *Predict* performs in comparison to *ChainOfThought*. Since this is a very simple use case, *ChainOfThought* is overkill, but just for demonstration purposes, let us try it out.

```
# Creating the Predictorentity_extractor_predictor = dspy.Predict(EntityExtraction, cache=False)# Example texttext = "TechCorp's CEO Sarah Chen met with DataSystems' Michael Torres in Riverside to discuss cloud computing."# Extract entitiesresult_from_predictor = entity_extractor_predictor(text=text)print("Result from predictor:")print("Persons:", result_from_predictor.persons)print("Locations:", result_from_predictor.locations)print("Organizations:", result_from_predictor.organizations)
```

**Output:**

```
Result from predictor:Persons: ['Sarah Chen', 'Michael Torres']Locations: ['Riverside']Organizations: ['TechCorp', 'DataSystems']
```

Notice the output is now a properly typed list instead of a comma-separated string. Class-based signatures provide JSON schema validation and better structure.

#### Step 3: Adding ChainOfThought reasoning

We will use the same class-based signature as defined previously.

```
# Create the entity extractorentity_extractor_cot = dspy.ChainOfThought(EntityExtraction, cache=False)# Example texttext = "TechCorp's CEO Sarah Chen met with DataSystems' Michael Torres in Riverside to discuss cloud computing."result_from_cot = entity_extractor_cot(text=text)print("Result from COT:")print("Persons:", result_from_cot.persons)print("Locations:", result_from_cot.locations)print("Organizations:", result_from_cot.organizations)
```

**Output:**

```
Result from COT:Persons: ['Sarah Chen', 'Michael Torres']Locations: ['Riverside']Organizations: ['TechCorp', 'DataSystems']
```

When we inspect the generated prompt, we see that the main difference is the inclusion of a **reasoning field**, which encourages the LLM to produce more accurate output since it must justify its predictions. You can inspect the prompt again using:

```
print(entity_extractor_cot.inspect_history(n=1))
```

While reasoning is beneficial for more complex tasks, keep in mind that token consumption and latency increase due to the additional tokens generated for reasoning.

#### Step 4: Using an optimizer

Let's optimize our predictor using training examples and a metric. To demonstrate this, I have created a few synthetic data points.

**Create training examples**

```
# Creating synthetic training examples# We are setting the text field as input to the LLM in the training examples. The rest of the fields are the outputtrain_examples = [    dspy.Example(        text="Robert Martinez founded AeroTech in Riverside, California and later moved to Nevada.",        persons="Robert Martinez",        locations="Riverside, California, Nevada",        organizations="AeroTech"    ).with_inputs("text"),    dspy.Example(        text="The Global Trade Alliance held a meeting in Portland with Director-General Lisa Wong.",        persons="Lisa Wong",        locations="Portland",        organizations="Global Trade Alliance"    ).with_inputs("text"),    dspy.Example(        text="TechCorp's Sarah Chen met with DataSystems' Michael Torres in Riverside to discuss cloud computing.",        persons="Sarah Chen, Michael Torres",        locations="Riverside",        organizations="TechCorp, DataSystems"    ).with_inputs("text"),]
```

**Define a metric**

For the metric, we’ll use an F1 score averaged across all entity types:

```
def entities_f1_metric(ground_truth, pred, trace=None):    # Simple F1 metric - calculates precision, recall, and F1 for each entity type    predicted_persons = set(pred.persons)    predicted_locations = set(pred.locations)    predicted_organizations = set(pred.organizations)    ground_truth_persons = set(ground_truth.persons)    ground_truth_locations = set(ground_truth.locations)    ground_truth_organizations = set(ground_truth.organizations)    # Calculate intersection for each entity type    intersection_persons = predicted_persons.intersection(ground_truth_persons)    intersection_locations = predicted_locations.intersection(ground_truth_locations)    intersection_organizations = predicted_organizations.intersection(ground_truth_organizations)    # Calculate F1 for persons    precision_persons = len(intersection_persons) / len(predicted_persons) if predicted_persons else 0.0    recall_persons = len(intersection_persons) / len(ground_truth_persons) if ground_truth_persons else 0.0    f1_persons = 2 * (precision_persons * recall_persons) / (precision_persons + recall_persons) if (precision_persons + recall_periods) > 0 else 0.0        # Calculate F1 for locations    precision_locations = len(intersection_locations) / len(predicted_locations) if predicted_locations else 0.0    recall_locations = len(intersection_locations) / len(ground_truth_locations) if ground_truth_locations else 0.0    f1_locations = 2 * (precision_locations * recall_locations) / (precision_locations + recall_locations) if (precision_locations + recall_locations) > 0 else 0.0        # Calculate F1 for organizations    precision_organizations = len(intersection_organizations) / len(predicted_organizations) if predicted_organizations else 0.0    recall_organizations = len(intersection_organizations) / len(ground_truth_organizations) if ground_truth_organizations else 0.0    f1_organizations = 2 * (precision_organizations * recall_organizations) / (precision_organizations + recall_organizations) if (precision_organizations + recall_organizations) > 0 else 0.0        # Average F1 across all entity types (macro F1)    overall_f1 = (f1_persons + f1_locations + f1_organizations) / 3.0    return overall_f1
```

**Define and run the optimizer**

For this scenario, let us use a ***BootstrapFewShot*** optimizer that essentially includes examples (that’s why the name “few-shot”) in the inference prompt. *BootstrapFewShot* allows us to define the examples in two ways. We can either use the labeled examples from the training data we provide or we can allow the optimizer to create synthetic examples that can be included. Usually, it is beneficial to use a bigger model (teacher model) to create the synthetic examples, as this more powerful model can better capture nuances that will help guide the smaller model we use during inference.

In this case, I have set the number of bootstrapped examples to 2 and the metric threshold to 0.8, meaning any synthetic examples with an F1 score greater than 0.8 can be included as few-shot examples. There is also a parameter called max\_rounds that defines how many iterations the LLM can take to generate the synthetic examples. When it comes to the teacher model, ideally, it would be beneficial to use a bigger model to generate synthetic examples, but since this is a simple use case, I have gone with the same Llama 3 model for generating them.

```
bootstrap_optimizer = BootstrapFewShot(metric=entities_f1_metric, max_bootstrapped_demos=2, max_rounds=5, metric_threshold=0.8)optimized_extractor = bootstrap_optimizer.compile(entity_extractor_predictor, trainset=train_examples)print("Optimization complete!")
```

After the optimization is done, you can view the few-shot examples:

```
print(f"Number of demos: {len(optimized_extractor.demos)}")for i, demo in enumerate(optimized_extractor.demos):    print(f"\nDemo {i+1}:")    print(demo)
```

**Output:**

```
Number of demos: 3Demo 1:Example({'augmented': True, 'text': 'The Global Trade Alliance held a meeting in Portland with Director-General Lisa Wong.', 'persons': ['Lisa Wong'], 'locations': ['Portland'], 'organizations': ['Global Trade Alliance']}) (input_keys=None)Demo 2:Example({'augmented': True, 'text': "TechCorp's Sarah Chen met with DataSystems' Michael Torres in Riverside to discuss cloud computing.", 'persons': ['Sarah Chen', 'Michael Torres'], 'locations': ['Riverside'], 'organizations': ['TechCorp', 'DataSystems']}) (input_keys=None)Demo 3:Example({'text': 'Robert Martinez founded AeroTech in Riverside, California and later moved to Nevada.', 'persons': ['Robert Martinez'], 'locations': ['Riverside, California', 'Nevada'], 'organizations': ['AeroTech']}) (input_keys={'text'})
```

The examples with *‘augmented’: True* are synthetically generated. If you notice, they are the same as the ones in the training data. It seems like the Llama 3 model, being a less powerful model, is producing the same examples as the training samples during synthetic generation. Using a more capable model or having a larger dataset might help address this limitation.

**Comparison of baseline predictor vs optimized predictor**

Let’s test both on an unseen example:

```
new_text = """Dr. Sarah Martinez, Chief Technology Officer at Global Innovations Corp, traveled from San Francisco, California to Tokyo, Japan last Tuesday to finalize a strategic partnership with Sakura Technologies and their parent company, Mitsubishi Heavy Industries. During the three-day summit held at the Grand Hyatt Tokyo in Roppongi, she met with CEO Hiroshi Tanaka, CFO Yuki Nakamura, and Professor James O'Brien from MIT's Computer Science Department. The discussion also included representatives from the European Union's Digital Innovation Hub based in Brussels, Belgium, who joined via videoconference from their Luxembourg office. Microsoft Azure engineer Robert Chen, who previously worked at Amazon Web Services in Seattle, Washington, presented the technical architecture alongside his colleague Dr. Maria Garcia-Lopez from the Barcelona Research Center in Spain. The World Economic Forum and McKinsey & Company have both endorsed this collaboration, which aims to establish new data centers in Singapore, Dubai, and São Paulo, Brazil by Q4 2024. Former Apple executive Tim Williams, now an independent consultant based in Austin, Texas, moderated the sessions at the request of the International Technology Standards Organization (ITSO) headquartered in Geneva, Switzerland."""# Compare baseline vs optimizedprint("=== BASELINE ===")baseline_result = entity_extractor_predictor(text=new_text)print("Persons:", baseline_result.persons)print("Locations:", baseline_result.locations)print("Organizations:", baseline_result.organizations)print("\n=== OPTIMIZED ===")optimized_result = optimized_extractor(text=new_text)print("Persons:", optimized_result.persons)print("Locations:", optimized_result.locations)print("Organizations:", optimized_result.organizations)
```

**Output:**

```
=== BASELINE ===Persons: ['Dr. Sarah Martinez', 'Hiroshi Tanaka', 'Yuki Nakamura', "James O'Brien", 'Robert Chen', 'Maria Garcia-Lopez', 'Tim Williams']Locations: ['San Francisco, California', 'Tokyo, Japan', 'Grand Hyatt Tokyo', 'Roppongi', 'Brussels, Belgium', 'Luxembourg', 'Seattle, Washington', 'Barcelona', 'Singapore', 'Dubai', 'São Paulo, Brazil', 'Austin, Texas', 'Geneva, Switzerland']Organizations: ['Global Innovations Corp', 'Mitsubishi Heavy Industries', 'Sakura Technologies', 'Microsoft Azure', 'Amazon Web Services', 'MIT', "European Union's Digital Innovation Hub", 'World Economic Forum', 'McKinsey & Company', 'International Technology Standards Organization (ITSO)']=== OPTIMIZED ===Persons: ['Dr. Sarah Martinez', 'Hiroshi Tanaka', 'Yuki Nakamura', "Professor James O'Brien", 'Robert Chen', 'Dr. Maria Garcia-Lopez', 'Tim Williams']Locations: ['San Francisco, California', 'Tokyo, Japan', 'Roppongi', 'Grand Hyatt Tokyo', 'Brussels', 'Luxembourg', 'Seattle, Washington', 'Barcelona', 'Spain', 'Singapore', 'Dubai', 'São Paulo, Brazil', 'Austin, Texas', 'Geneva, Switzerland']Organizations: ['Global Innovations Corp', 'Sakura Technologies', 'Mitsubishi Heavy Industries', 'Microsoft Azure', 'Amazon Web Services', "European Union's Digital Innovation Hub", 'MIT', 'Barcelona Research Center', 'World Economic Forum', 'McKinsey & Company', 'International Technology Standards Organization (ITSO)', 'Apple']
```

Some observations:

-   The optimized predictor captures titles like “Dr.” and “Professor”.
-   Optimized predictor extracts more organizations (e.g., “Barcelona Research Center”, “Apple”)
-   Both methods mention only “MIT” as an organization, but do not include MIT’s Computer Science Department. This is a minor limitation.

Optimizers work best with validation data to measure real-world performance. They’re particularly valuable when you have a domain-specific use case you are trying to solve for.

### Using DSPy for building an agent

Building upon the basics, let’s now go through building a **query assistant agent** that:

-   Classifies the question type (factual, comparison, analytical, mathematical)
-   Selects the appropriate tool to answer it
-   Formats the response based on the question type

**Key difference from earlier examples**: Instead of a single predictor, we will use a module to define a multi-step agentic use case that reasons about what to do and calls the relevant tools

#### Setup

For this example, I am using a more capable 9B parameter gemma model through Ollama. Ensure you have the Gemma model by running the following command on your terminal.

```
ollama run gemma2:9b
```

**Configure the model to use**:

```
import dspy# Using a 9B parameter gemma2 modellm = dspy.LM("ollama_chat/gemma2:9b", api_base="http://localhost:11434", api_key="")dspy.configure(lm=lm)dspy.configure_cache(enable_memory_cache=False, enable_disk_cache=False)
```

#### Define signatures

We’ll use two signatures: one to classify the question type and provide style guidance, and another to generate the answer in the appropriate format.

```
# Defining a signature to get query type and guidance on the style to use when answering the questionclass QueryType(dspy.Signature):    """Classify the question to choose answer formatting."""    question: str = dspy.InputField(desc="The question asked by the user. Based on the question, determine the query type and guidance for answering.")    query_type: str = dspy.OutputField(desc="Based on the question, determine the query type. The query type should be one among the following: Factual One line Answer, Comparison Table, Analytical Bullet Points, Mathematical Question")    guidance: str = dspy.OutputField(desc="Any formatting instructions for the answer based on the query type.")
```

```
# Defining the signature to get final answer in the required styleclass AnswerWithStyle(dspy.Signature):    question: str = dspy.InputField(desc="The question asked by the user.")    answer: str = dspy.OutputField(desc="The answer to the question and the answer format should be aligned with the query type and formatting instructions.")
```

#### **Define tools**

Tools are Python functions that the agent can invoke. For the query assistant agent, two tools are defined: a math\_tool and a *general\_answer\_tool*.

**Math tool:**

```
# Definition of the math tool to handle simple mathematical queriesimport mathdef math_tool(expression: str) -> str:    """    Evaluate a simple math expression safely.    Supports basic operations: +, -, *, /, **, and common functions.    The input to the tool should be a string with the mathematical expression such as just "8 * 4" or "12 * (7 + 5)"    """    # Define allowed functions    safe_dict = {        "sqrt": math.sqrt,        "abs": abs,        "round": round,        "pi": math.pi,        "e": math.e,    }        try:        # Evaluate with restricted builtins        result = eval(expression, {"__builtins__": {}}, safe_dict)        return str(result)    except Exception as e:        return f"Error: {e}"
```

**General answer tool:**

```
# Defining the generic answering tool to handle generic questions. The formatting instructions will be added and passed as part of the question itselfdef general_answer_tool(question) -> str:    """    For answering non-mathematical questions, use this tool.    Provide the question as a detailed string with all details.    """    try:        # Use the configured LM to answer the question        lm = dspy.settings.lm        prompt = f"Answer the following question concisely and accurately:\n\nQuestion: {question}\n\nAnswer:"        response = lm(prompt)                # Extract the text from the response        if hasattr(response, 'choices') and len(response.choices) > 0:            return response.choices[0].message.content.strip()        elif isinstance(response, str):            return response.strip()        else:            return str(response).strip()    except Exception as e:        return f"Error: Unable to answer - {e}"
```

#### **Building the QueryAssistant module**

With the tools and signatures defined, I will now define the DSPy module that will contain the predictors. Recollect that a module in DSPy can be composed of one or more predictors. I am going with a dspy.Predict to use as the first step in the module. This module identifies the question type and guides the answer style. The second step would be to pass this to a React setup that reasons about which tool to use and invokes the appropriate tool to get the answer.

```
class QueryAssistant(dspy.Module):    def __init__(self):        super().__init__()        # Using Predict for style decider. We pass the signature and let DSPy formulate the prompt.        self.style_decider = dspy.Predict(QueryType)         # Using ReAct for the final response and tool use. We pass in the defined signature and the required tools        self.react = dspy.ReAct(AnswerWithStyle, tools=[math_tool, general_answer_tool])    def forward(self, question: str):        decision = self.style_decider(question=question)        # Get a stylized question from the style decider module        complete_question = f"Question Type: {decision.query_type}\nFormatting Instructions: {decision.guidance}\nQuestion: {question}"        return self.react(question=complete_question)
```

To set the context for those who are not familiar, the ReAct paradigm enables LLMs to:

-   **Reason** about what needs to be done
-   **Act** by calling tools or performing some operations
-   **Observe** the obtained results
-   Repeat the loop until arriving at the answer

Learn more in [this paper](https://arxiv.org/abs/2210.03629) that introduced the ReAct framework.

#### **Querying the module**

We first initialize the defined module

```
query_assistant = QueryAssistant()
```

Now let’s run a few test cases to see how it performs.

**Test 1: Factual question**

```
answer = query_assistant(question="What is the capital of France?")# Final Output: Paris
```

This was the intermediate prediction from the style decider. Note the query type and guidance it provided for our query.

```
Prediction(     query_type='Factual One line Answer',     guidance='Provide a concise, one-line answer to the question.')
```

This is the trajectory that the ReAct predictor took

```
Prediction(     trajectory={'thought_0': 'I need to ask a general knowledge tool about the capital of France.', 'tool_name_0': 'general_answer_tool', 'tool_args_0': {'question': 'What is the capital of France?'}, 'observation_0': "['Paris  \\n']", 'thought_1': 'The capital of France is Paris.', 'tool_name_1': 'finish', 'tool_args_1': {}, 'observation_1': 'Completed.'},    reasoning="The tool returned 'Paris' as the capital of France when queried.",     answer='Paris')
```

The agentic module:

1.  Identified that the question requires a “Factual One Line Answer”.
2.  Calls general\_answer\_tool
3.  Returns a concise answer

**Test 2: Mathematical question**

```
answer_2 = query_assistant(question="What is 1448*76*5?")#Final Output: 550240
```

This time, we see that the agentic module:

1.  Recognizes the provided query as a “mathematical question” and calls the math\_tool with the expression 1448\*76\*5
2.  Obtains the output from the tool, observes it, and returns it, given that the tool call is successful

To see the intermediate llm messages, you can run print(query\_assistant.inspect\_history(n=1))

> This [notebook](https://github.com/akhil-eppa/DSPy_Learning/blob/main/notebooks/dspy_query_assistant_module.ipynb) in the [repository](https://github.com/akhil-eppa/DSPy_Learning) has this complete code sample along with the outputs

**Test 3: Comparison Question**

```
answer_3 = query_assistant(question="Compare Oceans and Seas")
```

This time, we receive an output formatted as a **comparison table**:

```
| Feature        | Ocean                                     | Sea                             ||----------------|---------------------------------------------|---------------------------------|| **Size**       | Vast, covering over 70% of Earth's surface | Relatively smaller             || **Depth**      | Extremely deep, average depth ~3,688 meters | Generally shallower than oceans   || **Salinity**  | Higher average salinity (due to evaporation) | Variable salinity levels         || **Location**   | Open bodies of water, often interconnected   | Partially enclosed by land     || **Wave Activity**| Stronger wave activity due to wider fetch  | Calmer waters influenced by coastline |
```

The agentic module:

1.  Was able to reason on what to compare and how the comparison had to be presented: To comparse oceans and seas effectively, I need to gather information about their size, depth, salinity, location and wave activity. A comparison table format would be suitable for presenting this information. (One can view the full message chain using the *inspect\_history* functionality)
2.  Calls the general\_answer\_tool to get the comparison on the required aspects
3.  Formats and returns a well-structured table

**Further Examples**

For additional examples, including the usage of the agentic module for analytical questions, check out the [repository](https://github.com/akhil-eppa/DSPy_Learning) with full notebooks.

#### **Optimizing Agentic Modules**

As demonstrated in the examples above, the module we developed with DSPy handles a variety of queries effectively, but there is scope for optimization. You can further optimize agentic modules using **GEPA** (Generative Prompt Augmentation), which uses feedback loops to improve prompts iteratively. The caveat is that utilizing GEPA requires:

-   Ground truth data (labelled examples)
-   A well-defined metric function
-   A more powerful “teacher” model for feedback generation.

For a practical GEPA walk-through, see this [DSPy tutorial](https://dspy.ai/tutorials/gepa_facilitysupportanalyzer/) that delves into an example use case.

#### Debugging and observability

As you go about building complex agents, console debugging becomes impractical. DSPy provides integration with MLFlow for tracing and observability. You can trace the predictor or module using MLFlow as described in the [DSPy observability documentation](https://dspy.ai/tutorials/observability/#tracing).

#### Final thoughts

DSPy represents a paradigm shift in application development, abstracting manual prompt engineering with a structured programmatic approach.

**What DSPy does well**

-   **Reduces brittleness** through declarative signatures
-   **Enables systematic optimization** via metrics and training data
-   **Promotes maintainability** through modular, composable elements
-   **Model agnostic** code that adapts when you switch models
-   **Automatic prompt generation** means you focus on what you want, not how to engineer the prompt

**The caveats**

-   **Requires training data** for optimization, which may not exist for novel use cases
-   **Learning curve** compared to traditional prompt engineering
-   The **abstraction layer** can obscure what’s happening under the hood

**For your use case, DSPy truly shines when:**

-   You need **consistency across model changes**
-   Your application required **systematic optimization** based on real-world data
-   **Prompt brittleness could prove to be costly** in production environments
-   You want **maintainable, testable LLM application code**

**When Should You Stick With Traditional Prompting?**

When:

-   You don’t have training data or repeatable metrics
-   You need maximum control over the exact prompt wording
-   You’re building simple, one-off queries where the abstraction layer adds a complexity overhead

**The bottom line**

If you’re building LLM applications that need to be robust, maintainable, and systematically improvable, DSPy offers a compelling alternative to traditional approaches. The framework doesn’t eliminate the need to understand language models, but it provides the scaffolding to build more reliable, scalable, and maintainable systems. As you’ve seen through the entity extraction and query assistant examples, DSPy transforms LLM-based application development from an art into a science, and that’s a transformation worth considering for your use cases.

#### Resources

-   Full code notebooks: [Github Repository](https://github.com/akhil-eppa/DSPy_Learning)
-   Official DSPy docs: [dspy.ai](https://dspy.ai/)
-   ReAct Paper: [arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)
-   Ollama: [ollama.com](https://ollama.com)

* * *

[Moving beyond manual prompting: A practical introduction to DSPy](https://pub.towardsai.net/moving-beyond-manual-prompting-a-practical-introduction-to-dspy-6bf4ae8082ac) was originally published in [Towards AI](https://pub.towardsai.net) on Medium, where people are continuing the conversation by highlighting and responding to this story.