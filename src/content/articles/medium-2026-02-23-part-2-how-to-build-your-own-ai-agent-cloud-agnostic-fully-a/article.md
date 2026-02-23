---
title: "Part 2 — How to Build Your Own AI Agent: (Cloud-Agnostic, Fully Automated, Enterprise-Ready)"
author: "Towards AI"
platform: "medium"
publicationName: "Towards AI"
url: "https://pub.towardsai.net/part-2-how-to-build-your-own-ai-agent-cloud-agnostic-fully-automated-enterprise-ready-ec3c749570ac?source=rss----98111c9905da---4"
publishedAt: "2026-02-23"
tags:
  - "ci-cd-pipeline"
  - "cloud-computing"
  - "ai-agent"
  - "agentic-ai"
  - "terraform"
  - "ai"
  - "research"
---

# Part 2 — How to Build Your Own AI Agent: (Cloud-Agnostic, Fully Automated, Enterprise-Ready)

# 📘 Part 2 — How to Build Your Own AI Agent: ***(Cloud-Agnostic, Fully Automated, Enterprise-Ready)***

## *From natural-language prompts → to Terraform module → to PR → to CI/CD → to validation*

[Cherukuri sai](https://medium.com/@cherukurisai?source=post_page---byline--ec3c749570ac---------------------------------------)

16 min read·Feb 16, 2026

\--

![]()

Most AI content explains concepts.
This guide helps you **build something real** — a fully functioning AI agent that:

-   Understands natural-language infrastructure requests
-   Generates **complete Terraform modules** (multi-file)
-   Enforces **strict enterprise standards**
-   Auto-fixes issues via LLM reasoning
-   Creates a GitHub branch
-   Commits all files
-   Opens a pull request
-   Triggers GitHub Actions
-   Runs **unit tests**
-   Runs **Terraform init + validate + plan**
-   Works in **any cloud** (AWS, Azure, GCP, etc.)
-   Works in **any pipeline** (GitHub, Harness, GitLab, Jenkins, Azure DevOps, etc.)

By the end of this article, you’ll have the blueprint of a **Digital DevOps Engineer Agent**.

## 1️⃣ What Makes This Agent Different?

It does *not* assume AWS or Azure or GCP.
If your prompt says:

> “Create AWS Lambda module” → Generates AWS Terraform
> 
> “Create Azure Storage Account module” → Generates Azure Terraform
> 
> “Create GCP Cloud Run module” → Generates GCP Terraform

It adapts automatically because it generates **pure Terraform (HCL)**.

## ✔ Cloud‑Agnostic

Works with **ANY Terraform provider**, including:

-   AWS
-   Azure
-   GCP
-   OCI
-   Cloudflare
-   Kubernetes
-   DigitalOcean
-   VMware vSphere
-   Proxmox
-   GitHub provider
-   And *every* provider on the Terraform registry

## ✔ CI/CD‑Agnostic

Runs in:

-   GitHub Actions
-   Harness
-   GitLab CI
-   Bitbucket Pipelines
-   Jenkins
-   Azure DevOps
-   CircleCI

Anywhere Python + Terraform exist — the agent works.

## ✔ Enterprise‑Grade Validation

Your standards engine validates:

> Required tags
> 
> snake\_case variable names
> 
> IAM least privilege
> 
> Secret detection
> 
> Deprecated syntax detection
> 
> VPC subnet structure
> 
> Provider best practices
> 
> Module reusability
> 
> Terraform version constraints

And does this for **every .tf file in the module**.

## ✔ Complete Multi‑File Generation

Every request generates:

```
main.tfvariables.tfoutputs.tfproviders.tfREADME.md
```

## 2️⃣ Understanding AI Agents (Enterprise Context)

An AI Agent is not just an LLM.
It is a system made of:

🔹 **Brain (LLM):** *Interprets the user’s request.*
🔹 **Memory (Context, RAG):** *Holds standards, patterns, best practices.
*🔹 **Tools (Python, Filesystem, Terraform CLI, GitHub API):** *Allows the agent to act, not just talk.
*🔹 **Reasoning Loop:** *Plan → Generate → Validate → Fix → Loop
*🔹 **Policy Layer:** *Your org’s security, naming, tagging, compliance.
*🔹 **Runtime Environment**: *GitHub Actions, Pipelines, Local runner, Cloud VMs.*

Together, they form a **Digital DevOps Engineer**.

## 3️⃣ Prerequisites

## ✔ Skills

-   Python
-   Terraform
-   GitHub
-   CI/CD
-   Prompt engineering basics

## ✔ Installations

Run:

```
pip install openai langchain python-dotenv PyGithubbrew install terraform        # Macchoco install terraform       # Windows
```

## ✔ Organization Inputs

Prepare a standards file:
**standards.md**

```
1. Tags required: environment, owner, cost_center.2. Variables must use snake_case.3. IAM must follow least privilege.4. No hardcoded secrets.5. Modules must be reusable.6. VPC must include public + private subnets.
```

This becomes your **policy engine**.

## **4️⃣ Architecture of What We’re Building**

```
User Provides Prompt        ↓┌───────────────────────────────────────────────────────┐│  Agent Pipeline (agent_real.py)                       ││  ────────────────────────────────────                 ││  1. Plan → Break request into steps (LLM)            ││  2. Generate → Create Terraform module files          ││     • main.tf (resources)                             ││     • variables.tf (inputs with validation)           ││     • outputs.tf (outputs with descriptions)          ││     • providers.tf (provider versions & config)       ││     • README.md (usage documentation)                 ││  3. Validate → Check against standards                ││     • Required tags (environment, owner, cost_center) ││     • snake_case variables                            ││     • No hardcoded secrets                            ││     • Least-privilege IAM                             ││     • No deprecated features                          ││     • Current provider best practices                 ││  4. Fix → Auto-correct issues (LLM or heuristics)     ││  5. Loop → Repeat validate/fix until clean            │└───────────────────────────────────────────────────────┘        ↓┌───────────────────────────────────────────────────────┐│  GitHub Integration (agent.py)                        ││  ─────────────────────────                            ││  • Create feature branch: ai/<slug>-YYYYMMDDHHMMSS    ││  • Commit all module files to modules/<branch>/       ││  • Open Pull Request                                  │└───────────────────────────────────────────────────────┘        ↓┌───────────────────────────────────────────────────────┐│  CI/CD Workflows (.github/workflows/)                 ││  ────────────────────────────────────                 ││  • python-tests.yml → Run validation tests            ││  • terraform.yml → init + validate + plan all modules │└───────────────────────────────────────────────────────┘        ↓   PR Ready for Review
```

## **5️⃣ Step 1: Build the Python Utility (Terraform Standards Validator)**

**Create: terraform\_standards.py
**This is **your AI enforcer**.

```
import reTERRAFORM_STANDARDS = """1. Required tags: environment, owner, cost_center.2. IAM roles must have least-privilege policies.3. Use snake_case for variables.4. No hardcoded secrets allowed.5. Modules must be reusable.6. VPC must include public + private subnets."""def validate(code: str) -> str:    issues = []    # Check for tags presence anywhere    if not re.search(r"\btags\s*=\s*\{", code):        issues.append("Missing required tags block (environment, owner, cost_center).")    else:        # Ensure required tag keys exist in any tags block        tags_blocks = re.findall(r"tags\s*=\s*\{([^}]*)\}", code, flags=re.S)        for tb in tags_blocks:            if "environment" not in tb or "owner" not in tb or "cost_center" not in tb:                issues.append("Tags block missing one of environment/owner/cost_center.")                break    # Hardcoded secret detection (common patterns)    if re.search(r"(?i)aws_secret_access_key|aws_access_key_id|secret\s*=|password\s*=|passwd\s*=|\bSECRET_", code):        issues.append("Hardcoded secret or credentials detected.")    # Detect secrets in variable defaults or variable names (e.g., default = "secret123")    if re.search(r"(?i)default\s*=\s*\".*(secret|password|passwd).*\"", code) or re.search(r"(?i)variable\s+\".*(password|secret|passwd).*\"", code):        issues.append("Hardcoded secret detected in variable default or name.")    # Variable naming heuristic: flag variables with uppercase or camelCase    if re.search(r"variable\s+\".*([A-Z].*|[a-z]+[A-Z].*)\"", code):        issues.append("Variables should use snake_case (avoid CamelCase or uppercase).")    # IAM least-privilege heuristic: look for wildcard resources or actions    if re.search(r"aws_iam_policy|aws_iam_role_policy", code):        if re.search(r'"?Resource"?\s*:\s*\[?\s*"?\*"?', code) or re.search(r'"?Action"?\s*:\s*\[?\s*"?.*\*.*"?', code):            issues.append("IAM policy uses wildcard Action or Resource; prefer least-privilege.")    # IAM role existence but missing policy    if "aws_iam_role" in code and not re.search(r"aws_iam_policy|role_policy|policy\s*=", code):        issues.append("IAM role present but no inline or attached policy found.")    # VPC subnet check    if re.search(r"resource\s+\"aws_vpc\"", code) and not re.search(r"resource\s+\"aws_subnet\".*(public|private)|public_subnet|private_subnet", code, flags=re.S):        issues.append("VPC must include both public and private subnets.")    # Module reusability: prefer modules rather than repeating resources    if re.search(r"resource\s+\"aws_vpc\".*resource\s+\"aws_vpc\"", code, flags=re.S):        issues.append("Duplicate VPC resources detected; prefer reusable modules.")    return "OK" if not issues else "\n".join(issues)if __name__ == "__main__":    sample = '''resource "aws_vpc" "main" {  cidr_block = "10.0.0.0/16"}'''    print(validate(sample))import reTERRAFORM_STANDARDS = """1. Required tags: environment, owner, cost_center.2. IAM roles must have least-privilege policies.3. Use snake_case for variables.4. No hardcoded secrets allowed.5. Modules must be reusable.6. VPC must include public + private subnets."""def validate(code: str) -> str:    issues = []    # Check for tags    if not re.search(r"\btags\s*=", code):        issues.append("Missing required tags: environment, owner, cost_center.")    # Hardcoded secret detection (simple heuristics)    if re.search(r"(?i)secret\s*=|password\s*=|passwd\s*=|\bSECRET_", code):        issues.append("Hardcoded secret detected.")    # Variable naming heuristic: flag variables with uppercase letters    if re.search(r"variable\s+\".*[A-Z].*\"", code):        issues.append("Variables should use snake_case.")    # IAM role policy check    if "aws_iam_role" in code and not ("policy" in code or "aws_iam_policy" in code):        issues.append("IAM roles must define least-privilege policy.")    # VPC subnet check    if re.search(r"resource\s+\"aws_vpc\"", code) and not re.search(r"aws_subnet|public_subnet|private_subnet", code):        issues.append("VPC must include public + private subnets.")    return "OK" if not issues else "\n".join(issues)if __name__ == "__main__":    # quick local smoke test    sample = '''resource "aws_vpc" "main" {  cidr_block = "10.0.0.0/16"}'''    print(validate(sample))
```

## **6️⃣ Step 2: Build the Agent (Brain + Tools)**

**This file does the magic:**

-   *Uses OpenAI (or Mock LLM for free testing)*
-   *Generates 5 Terraform files with* `*### FILE:*` *markers*
-   *Parses multi-file output*
-   *Validates each* `*.tf*` *file*
-   *Fixes issues using LLM or fallback heuristics*
-   *Repeats validation (max iterations)*
-   *Returns a clean, production-ready module*

![]()

Create: **agent\_real.py**

```
import osimport reimport jsonfrom dotenv import load_dotenvload_dotenv()from terraform_standards import validate, TERRAFORM_STANDARDSOPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")PROMPT_TEMPLATE = """You are an expert Terraform generator. Follow these org standards exactly:{standards}User request:{request}Produce a complete, production-ready, reusable Terraform module with proper enterprise structure.Generate the following files with clear separators:### FILE: main.tf<main resource definitions with proper tags blocks in resource blocks only>### FILE: variables.tf<all input variables with descriptions, types, defaults, and validation>### FILE: outputs.tf<all outputs with value and description only - NO tags, NO other arguments>### FILE: providers.tf<required provider versions, terraform version constraints, and provider configurations>### FILE: README.md<module documentation with description, usage example, inputs table, outputs table, requirements>CRITICAL Terraform Syntax Rules:- Tags ONLY go inside resource blocks, NOT in output/variable/provider blocks- Output blocks ONLY support: value, description, sensitive, depends_on- Variable blocks ONLY support: type, description, default, validation, sensitive, nullable- Provider blocks do NOT have tags - use default_tags in AWS provider if needed- Always close ALL braces properly - verify each opening brace has a closing brace- Use proper HCL syntax - check for missing commas, quotes, and bracesResource-Specific Requirements:- AWS Lambda: MUST specify exactly ONE of: filename (with default="lambda.zip"), s3_bucket+s3_key, or image_uri- For reusable Lambda modules, use s3_bucket + s3_key as required variables (most common pattern)- IAM roles: must have assume_role_policy with proper JSON- Security groups: must have at least one ingress or egress rule- VPCs: should include both public and private subnets- CloudWatch alarms: require comparison_operator, evaluation_periods, metric_name, namespace, period, statistic, thresholdEnsure:- Include required tags: environment, owner, cost_center in RESOURCE blocks only- Use snake_case for all variable names- No hardcoded secrets or credentials- Least-privilege IAM policies (avoid Resource = "*")- Proper variable validation and constraints- Clear descriptions for all variables and outputs- Module should be reusable across environments- Include usage examples in README- Use ONLY current, non-deprecated resource types and arguments- Follow latest provider best practices (check documentation)- Use required_providers block with version constraints- Specify minimum terraform version in providers.tf- Use terraform.workspace or variables for environment-specific values- Avoid deprecated syntax (e.g., use for_each over count when appropriate)IMPORTANT: Return ONLY raw Terraform code with ### FILE: separators.DO NOT wrap code in markdown fences like ```hcl or ```terraform.DO NOT include any code block markers or backticks.Return clean, parseable Terraform code only."""class MockLLM:    @staticmethod    def generate(prompt: str) -> str:        # Keep the previous deterministic example for local testing        from agent import MockLLM as OldMock        return OldMock.generate(prompt)def call_openai(prompt: str) -> str:    try:        from openai import OpenAI        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))        resp = client.chat.completions.create(            model=OPENAI_MODEL,            messages=[{"role": "user", "content": prompt}],            max_tokens=1500,        )        return resp.choices[0].message.content    except Exception as e:        print(f"OpenAI call failed: {e}")        return MockLLM.generate(prompt)def llm(prompt: str) -> str:    if os.getenv("OPENAI_API_KEY"):        return call_openai(prompt)    return MockLLM.generate(prompt)def generate_tf(request: str) -> dict:    """Generate Terraform module files. Returns dict of {filename: content}"""    prompt = PROMPT_TEMPLATE.format(standards=TERRAFORM_STANDARDS, request=request)    result = llm(prompt)    return parse_multi_file_response(result)def parse_multi_file_response(response: str) -> dict:    """Parse LLM response with ### FILE: separators into dict of files"""    files = {}    pattern = r"###\s*FILE:\s*([\w\.-]+)\s*\n(.*?)(?=###\s*FILE:|$)"    matches = re.findall(pattern, response, re.DOTALL | re.IGNORECASE)        if matches:        for filename, content in matches:            # Strip markdown code fences if present            cleaned_content = content.strip()            # Remove opening code fence (```hcl, ```terraform, ```)            cleaned_content = re.sub(r'^```(?:hcl|terraform)?\s*\n', '', cleaned_content)            # Remove closing code fence            cleaned_content = re.sub(r'\n```\s*$', '', cleaned_content)                        # Fix common LLM mistakes in outputs.tf            if filename.strip() == 'outputs.tf':                cleaned_content = fix_output_syntax(cleaned_content)                        files[filename.strip()] = cleaned_content.strip()    else:        # Fallback: treat entire response as main.tf        content = response.strip()        content = re.sub(r'^```(?:hcl|terraform)?\s*\n', '', content)        content = re.sub(r'\n```\s*$', '', content)        files["main.tf"] = content.strip()        return filesdef fix_output_syntax(content: str) -> str:    """Remove invalid arguments from output blocks (e.g., tags)"""    # Remove tags blocks from output definitions    # Pattern: find output blocks and remove tags = { ... } from them    def remove_invalid_output_args(match):        output_block = match.group(0)        # Remove tags blocks        output_block = re.sub(r'\s*tags\s*=\s*\{[^}]*\}\s*', '\n', output_block, flags=re.DOTALL)        # Remove other invalid args (type, default, validation, etc.)        output_block = re.sub(r'\s*type\s*=\s*[^\n]+\n', '\n', output_block)        output_block = re.sub(r'\s*default\s*=\s*[^\n]+\n', '\n', output_block)        return output_block        # Match output blocks    content = re.sub(        r'output\s+"[^"]+"\s*\{[^}]*\}',        remove_invalid_output_args,        content,        flags=re.DOTALL    )        return contentdef run_terraform_validate(files: dict) -> str:    """Run actual terraform validate on generated files"""    import tempfile    import subprocess    import shutil    from pathlib import Path        # Create temp directory    temp_dir = tempfile.mkdtemp(prefix="tf-validate-")    try:        # Write all files        for filename, content in files.items():            file_path = Path(temp_dir) / filename            file_path.write_text(content)                # Run terraform init        init_result = subprocess.run(            ["terraform", "init", "-backend=false"],            cwd=temp_dir,            capture_output=True,            text=True,            timeout=60        )                if init_result.returncode != 0:            return f"Terraform init failed:\n{init_result.stderr}"                # Run terraform validate        validate_result = subprocess.run(            ["terraform", "validate", "-json"],            cwd=temp_dir,            capture_output=True,            text=True,            timeout=30        )                if validate_result.returncode != 0:            # Parse JSON output for better error messages            try:                import json                result = json.loads(validate_result.stdout)                if not result.get("valid", False):                    errors = []                    for diag in result.get("diagnostics", []):                        severity = diag.get("severity", "error")                        summary = diag.get("summary", "")                        detail = diag.get("detail", "")                        errors.append(f"{severity.upper()}: {summary}\n{detail}")                    return "\n".join(errors)            except:                pass            return f"Terraform validation failed:\n{validate_result.stderr}"                return "OK"        except subprocess.TimeoutExpired:        return "Terraform validation timed out"    except Exception as e:        return f"Terraform validation error: {str(e)}"    finally:        # Cleanup        try:            shutil.rmtree(temp_dir)        except:            passdef validate_tf(files: dict) -> str:    """Validate all .tf files in the module"""    issues = []        # First, validate individual files against standards    for filename, content in files.items():        if filename.endswith('.tf'):            result = validate(content)            if result != "OK":                issues.append(f"{filename}: {result}")        # Cross-file validation: check for undefined variable references    defined_vars = set()    if 'variables.tf' in files:        var_matches = re.findall(r'variable\s+"([^"]+)"', files['variables.tf'])        defined_vars = set(var_matches)        # Check all .tf files for var. references    for filename, content in files.items():        if filename.endswith('.tf'):            var_refs = re.findall(r'var\.(\w+)', content)            for var_ref in var_refs:                if var_ref not in defined_vars:                    issues.append(f"{filename}: References undeclared variable 'var.{var_ref}'")        # Run actual terraform validate (most comprehensive check)    tf_issues = run_terraform_validate(files)    if tf_issues != "OK":        issues.append(f"Terraform validation: {tf_issues}")        return "OK" if not issues else "\n".join(issues)def fix_tf(files: dict, issues: str) -> dict:    """Fix issues in Terraform files"""    if os.getenv("OPENAI_API_KEY"):        # Use LLM to fix issues        files_str = "\n\n".join([f"### FILE: {name}\n{content}" for name, content in files.items()])        fix_prompt = f"""The following Terraform module has validation issues that MUST be fixed:ISSUES:{issues}CURRENT MODULE FILES:{files_str}FIX INSTRUCTIONS:1. Fix ALL issues listed above2. If a variable is referenced but not declared, add it to variables.tf with proper type and description3. If tags are in output blocks, remove them (outputs only support: value, description, sensitive)4. If provider uses undefined variables, add them to variables.tf5. Ensure all braces are properly closed6. Keep all existing working code intactIMPORTANT: Return the COMPLETE corrected module with ### FILE: separators.DO NOT use markdown code fences (no ```hcl or ```).Return raw Terraform code only."""        result = llm(fix_prompt)        if result:            return parse_multi_file_response(result)        # Heuristic fallback: fix main.tf only    import agent    if "main.tf" in files:        files["main.tf"] = agent.fix_tf(files["main.tf"], issues)    return filesdef full_pipeline(user_request: str, max_iterations: int = 3) -> dict:    """Run the full agent pipeline. Returns dict of {filename: content}"""    print(f"\n Starting pipeline for: {user_request}")        # Step 1: Generate initial code    print("\n Generating Terraform module...")    files = generate_tf(user_request)        if not files:        print(" Failed to generate initial code")        return {}        print(f" Generated {len(files)} files: {', '.join(files.keys())}")        # Step 2: Validate    print("\n Validating module...")    issues = validate_tf(files)        if issues == "OK":        print(" Validation passed!")        return files        print(f"⚠  Validation issues found:\n{issues}")        # Step 3: Auto-fix loop    iter_count = 0    while issues != "OK" and iter_count < max_iterations:        iter_count += 1        print(f"\n🔧 Auto-fix iteration {iter_count}/{max_iterations}...")                fixed_files = fix_tf(files, issues)        if fixed_files == files:            print("  No changes made by fix attempt")            break                files = fixed_files        issues = validate_tf(files)                if issues == "OK":            print(f" Validation passed after {iter_count} iteration(s)!")        else:            print(f"  Still have issues:\n{issues}")        if issues != "OK":        print(f"\n Could not fix all issues after {max_iterations} iterations")        print("Returning module with remaining issues.")        return filesdef create_pr(branch_name: str, files: dict, module_path: str = None) -> str:    """Reuse the create_pr from agent.py to avoid duplication"""    import agent    return agent.create_pr(branch_name, files, module_path)if __name__ == "__main__":    sample = "Create an AWS VPC module with public and private subnets and a basic IAM role."    print(full_pipeline(sample))
```

> *Note: Using OpenAI in the Example — But This Agent Works With Any LLM*

**Example swap: OpenAI → Gemini**

```
# Instead of OpenAI:from openai import OpenAIclient = OpenAI()# Use Gemini:import google.generativeai as genaigenai.configure(api_key=os.getenv("GEMINI_API_KEY"))model = genai.GenerativeModel("gemini-1.5-pro")response = model.generate_content(prompt)
```

## 7️⃣ Step 3 — Local Build & Testing (Optional but Highly Recommended)

*(Test the agent locally before sending code to GitHub)*

Before integrating the agent into a CI/CD pipeline or letting it create PRs, you may want to test it locally. This step lets you:

-   Validate the module generation
-   Run standards checks
-   See auto‑fixes happen in real‑time
-   Inspect generated files
-   Debug issues faster
-   Avoid unnecessary PR noise

You can skip this and rely fully on GitHub Actions —
**but local testing gives you a faster feedback loop, especially during development.**

**Run the agent locally with:**

```
python run_example.py --prompt "Create an AWS Lambda with CloudWatch monitoring"
```

This produces:

-   `main.tf`
-   `variables.tf`
-   `outputs.tf`
-   `providers.tf`
-   `README.md`

All validated and auto‑fixed before being written to:

## 8️⃣ Step 4 — Project Folder Structure

Before we move into CI/CD automation, here is the **full directory structure** of the Terraform Agent you just built.

## Get Cherukuri sai’s stories in your inbox

 from this writer.

This structure is intentionally modular, testable, and enterprise‑ready.

📁 **Project Structure**

```
terraform-agent/├── agent_real.py                # Main AI agent (LLM + validation + fixes)├── agent.py                     # PR creation + mock LLM utilities├── terraform_standards.py       # Org standards + validation engine├── run_example.py               # Local execution entrypoint├── modules/                     # Auto-created PR modules├── out/                         # Local generated modules (no PR)├── tests/                       # Full unit test suite│   ├── test_agent_pipeline.py│   └── test_terraform_standards.py└── .github/    └── workflows/        ├── python-tests.yml     # Unit tests run on every PR        ├── terraform.yml        # Terraform validate + plan workflow        └── e2e_pr.yml           # End-to-end PR generation workflow
```

## **9️⃣** Step 5 — Running the Workflow with a Prompt (CI/CD Automation)

Now that the codebase is structured correctly, you can run the entire agent and pipeline **with a single prompt** — either locally or directly inside GitHub.

You now have **two ways** to run the pipeline:

> **Option A:** Run the Agent Locally (Fast Feedback Loop)

If you want to test code generation before opening a PR:

```
python run_example.py --prompt "Create an Azure Storage Account module"
```

### This will:

1.  Generate all module files
2.  Validate them
3.  Auto-fix issues
4.  Write output to:

```
out/<branch-name>/
```

5\. (Optional) Create a PR if you pass `--create-pr`

```
python run_example.py --prompt "Create a GCP Cloud Run module" --create-pr
```

![]()

> **Option B**: Run the Entire Agent Inside GitHub Actions

You can trigger the **e2e\_pr.yml** workflow from GitHub UI.

```
name: E2E PR (manual)on:  workflow_dispatch:    inputs:      prompt:        description: 'Terraform module prompt for the agent'        required: false        default: 'Create a reusable Terraform module that create a lambda function with health check with cloudwatch alarm'        type: stringpermissions:  contents: write  pull-requests: writejobs:  e2e:    runs-on: ubuntu-latest    steps:      - uses: actions/checkout@v3      - name: Setup Python        uses: actions/setup-python@v4        with:          python-version: '3.10'      - name: Install deps        run: |          python -m pip install --upgrade pip          pip install -r requirements.txt      - name: Run example (create PR)        env:          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}          # use GH_TOKEN if provided, otherwise fall back to the Actions-provided GITHUB_TOKEN          GITHUB_TOKEN: ${{ secrets.GH_TOKEN || secrets.GITHUB_TOKEN }}          GITHUB_REPO: ${{ github.repository }}        run: |          python run_example.py --prompt "${{ github.event.inputs.prompt }}" --create-pr
```

1\. Go to
**GitHub → Actions → E2E PR (Manual Run)
**2\. Click “Run Workflow”
3\. Enter your natural language Terraform request:
Example prompt:

![]()

## 4\. Click Run Workflow

This workflow will:

✔ Run the full agent
✔ Generate module (main.tf, variables.tf, outputs.tf, providers.tf, README.md)
✔ Validate with your standards file
✔ Auto-fix any issues
✔ Create AI/-timestamp branch
✔ Commit the module
✔ Open a Pull Request
✔ Trigger **python-tests.yml**
✔ Trigger **terraform.yml**
✔ Show terraform init/validate/plan output right in the pipeline

![]()

![]()

![]()

![]()

## What Happens Automatically After PR Creation?

When the agent opens a PR, **GitHub Actions takes over**.

**✔ Workflow #1 — Unit Tests**

File: `.github/workflows/python-tests.yml`

```
name: Python Testson:  push:    branches: ["main", "master"]  pull_request:jobs:  test:    runs-on: ubuntu-latest    steps:      - uses: actions/checkout@v3      - name: Setup Python        uses: actions/setup-python@v4        with:          python-version: '3.10'      - name: Install dependencies        run: |          python -m pip install --upgrade pip          pip install -r requirements.txt      - name: Run tests        env:          PYTHONPATH: ${{ github.workspace }}        run: |          pytest -q
```

```
requirements.txtopenai>=0.27.0PyGithub>=1.59.0python-dotenv>=1.0.0pytest>=7.0.0
```

This runs:

-   Standards tests
-   Validation tests
-   Agent pipeline tests
-   Mock LLM & real LLM behavior tests

**✔ Workflow #2 — Terraform Validation**

File: `.github/workflows/terraform.yml`
This workflow:

```
name: Terraform Planon:  pull_request:jobs:  terraform:    runs-on: ubuntu-latest    steps:    - uses: actions/checkout@v3    - name: Setup Terraform      uses: hashicorp/setup-terraform@v3      with:        terraform_wrapper: false    - name: Find and Validate All Modules      run: |        echo "🔍 Finding all Terraform modules..."                # Find all directories containing .tf files        MODULE_DIRS=$(find . -type f -name "*.tf" -exec dirname {} \; | sort -u)                if [ -z "$MODULE_DIRS" ]; then          echo "ℹ️  No Terraform modules found in this PR"          echo "This is normal for PRs that don't include Terraform code"          exit 0        fi                echo "Found modules:"        echo "$MODULE_DIRS"        echo ""                # Validate each module        for dir in $MODULE_DIRS; do          echo ""          echo "📂 Module: $dir"          cd "$dir"                    echo "⚙️  Running terraform init..."          if terraform init -backend=false; then            echo "✅ Init successful"                        echo "📋 Running terraform validate..."            if terraform validate; then              echo "✅ Validation successful"            else              echo "❌ Validation failed"              exit 1            fi                        echo "📊 Running terraform plan..."            if terraform plan -input=false -out=tfplan 2>&1 | tee plan.log; then              echo "✅ Plan successful"              echo ""              echo "📄 Plan output:"              terraform show tfplan            else              PLAN_EXIT=$?              echo "⚠️  Plan failed (exit code: $PLAN_EXIT)"                            # Check if it's just missing variables (expected for reusable modules)              if grep -q "No value for required variable" plan.log; then                echo ""                echo "ℹ️  This is a reusable module that requires input variables."                echo "This is EXPECTED behavior. The module syntax is valid."                echo ""                echo "Missing variables:"                grep "variable \"" plan.log | head -10                echo ""                echo "✅ Module validation passed (plan failure due to missing vars is OK)"              else                echo ""                echo "❌ Plan failed with actual errors:"                cat plan.log                exit 1              fi            fi          else            echo "❌ Init failed"            exit 1          fi                    cd - > /dev/null        done        echo ""        echo "✅ All modules validated successfully!"
```

-   Discovers modules in the PR
-   Runs:

```
terraform initterraform validate
```

## Final Conclusion — You Just Built a Digital DevOps Engineer

This is not just an AI demo.

You now have a **fully operational, cloud‑agnostic, Terraform‑agnostic Agentic DevOps system**, capable of:

-   Understanding natural language
-   Generating Terraform modules
-   Enforcing standards
-   Auto-fixing code
-   Creating GitHub PRs
-   Passing unit tests
-   Running terraform validate + plan
-   Operating across AWS / Azure / GCP / any provider
-   Running in any pipeline

This is the future of platform engineering:

-   Consistent
-   Automated
-   Secure
-   Extensible
-   Agentic

And you’ve built the **first working version**.

Now extend it:

-   Add tfsec / tflint security scanning
-   Add Infracost cost intelligence
-   Add policy-as-code (OPA/Rego)
-   Add Slack/Jira approvals
-   Add RAG with your internal playbooks
-   Add multi-cloud capabilities
-   Add Terratest integration

> Your agent is no longer theory — **it’s an operational teammate.
> Welcome to Agentic DevOps. 🚀**

## 🛠️ **What You Can Build Next (Beyond Terraform)**

The pattern you built in Part 2 is not limited to Terraform.

*By swapping the generation prompt and your validation logic, you can build additional agents that safely accelerate development across your entire organization:*

## 🧩 Helm Agent

Generate:

-   `Chart.yaml`
-   `values.yaml`
-   templates
-   non‑privileged containers
-   resource limits
-   required annotations
-   org‑approved patterns

## 🧩 Kubernetes Manifest Agent

Generate Deployments, Services, Ingress, HPA, RBAC with:

-   Policy checks
-   OPA/Conftest validation
-   Security constraints
-   Label/annotation standards

## 🧩 CI/CD Pipeline Agent

Generate GitHub Actions / GitLab CI / Jenkins pipelines using:

-   Org‑standard workflows
-   Security gating
-   Approval flows

## 🧩 Policy‑as‑Code Agent

Generate:

-   OPA/Rego rules
-   Gatekeeper constraints
-   Governance or compliance templates

## 🧩 Any Config Agent

-   Dockerfiles
-   API Gateway configs
-   Monitoring dashboards
-   Secrets templates
-   CloudFormation
-   Kustomize

> Everything becomes **automatable** with your organizational rules.
> 
> This means your teams can drastically reduce development time while staying **secure**, **consistent**, and **aligned with internal standards**.
> 
> Your Terraform Agent is simply the *first example* of what’s possible with Agentic DevOps.

## 🔜 What’s Coming in Part 3 — Automated Copilot PR Reviews

Now that the agent can generate Terraform modules, validate them, auto‑fix issues, create PRs, and run full CI/CD checks, the next logical step is improving your **review workflow**.