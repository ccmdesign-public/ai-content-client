---
title: "oclif, Ink, Rust, and the Framework Decision That Shapes Everything"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/oclif-ink-rust-and-the-framework-decision-that-shapes-everything-13f2c18539ec?source=rss----5517fd7b58a6---4"
publishedAt: "2026-03-26"
tags:
  - "architecture"
  - "engineering"
  - "web-development"
categories:
  - "Programming"
  - "Web Development"
tagsNormalizedAt: "2026-03-26T21:35:22.192Z"
---

# oclif, Ink, Rust, and the Framework Decision That Shapes Everything

*The CLI framework you choose locks in your interaction model, plugin strategy, and contributor experience for years. Here’s a playbook that goes beyond the basics.*

![Source: Image by barsrsind on Unpslash](https://cdn-images-1.medium.com/max/1024/1*j4_OvQ50kDT2CdU5K7r0gw.jpeg)

When Heroku open-sourced oclif in 2018, the pitch was pretty straightforward: here’s the framework we built to power the Heroku CLI, now you can use it too. I used it daily during my time with the Heroku Dev Tools team, and I watched it shape not just how commands got written, but how the entire team thought about CLI architecture. Everything from command formatting to plugin boundaries to output conventions. The framework wasn’t just parsing arguments. It was making decisions that would outlast every engineer on the team.

Most framework comparison articles line up features in a table and call it a day. But CLI developers need a playbook that goes beyond the basics. Because when it comes to deciding on the underlying architecture of your CLI, the question isn’t which framework has the best flag parser.

The question is: **what does this framework decide *for* you, and can you live with those decisions for the next three years?**

### What a CLI Framework Actually Decides for You

Pick a web framework, and you’re choosing a request routing model, a middleware pattern, and a templating approach. Pick a CLI framework, and you’re choosing something equally structural, but less obvious.

#### Command discovery and routing

Does your framework support git-style subcommands (myapp resources create) or only flat commands (myapp-create-resource)? This may seem like a cosmetic choice, and while I lament that [we generally don’t put enough thought into CLI design](https://medium.com/@montes.makes/your-cli-deserves-a-designer-and-that-designer-is-you-7da8b608ef57), this decision is deeper than that. It determines how users discover functionality, how you organize code, and whether adding a new command is a one-file change or a plumbing exercise. oclif gives you a directory-based command tree. Cobra gives you explicit command registration. Clap gives youderive macros that generate the routing at compile time. Each model has different implications for a team of five versus a team of fifty.

#### Plugin architecture (or the lack of one)

Can external teams extend your CLI without merging code into your repo? oclif was built around this. Heroku, Salesforce, and Shopify all ship CLI plugins that install independently and show up as first-class commands. Cobra has no built-in plugin model. Clap doesn’t either. If you need a plugin ecosystem, your framework options shrink fast. If you don’t, you’re paying complexity tax for infrastructure you’ll never use.

#### Startup time budget

A Node.js CLI pays a runtime tax. Even with oclif’s lazy-loading (only the executed command gets required), you’re looking at 200–500ms before any user code runs, depending on the dependency tree. A compiled Rust binary starts in single-digit milliseconds. A Go binary is somewhere in between. For a deployment CLI that runs once every few minutes, 400ms is invisible. For a tool that runs in a tight loop inside a CI pipeline, it’s the difference between a 5-minute and a 15-minute build.

#### Contributor onboarding cost

Your choice of framework determines who can contribute. TypeScript frameworks like oclif draw from the largest developer pool. Rust frameworks draw from the smallest. Go sits in the middle. This isn’t just about hiring. It’s about open-source contributions, internal team mobility, and the bus factor for your CLI codebase.

These five dimensions matter more than any feature comparison table. They’re the load-bearing decisions. Everything else is configuration.

### oclif: Built for Platform CLIs with Plugin Ecosystems

[oclif](https://oclif.io/) came out of a specific problem: Heroku needed a CLI that multiple teams could extend independently without coordinating releases. The plugin architecture is the reason the framework exists.

Here’s what a basic oclif command looks like:

```
import { Command, Flags } from '@oclif/core'export default class Deploy extends Command {  static description = 'Deploy an application'  static flags = {    app: Flags.string({ char: 'a', description: 'app name', required: true }),    remote: Flags.string({ char: 'r', description: 'git remote' }),    json: Flags.boolean({ description: 'output as JSON' }),  }  async run(): Promise<void> {    const { flags } = await this.parse(Deploy)    const result = await this.deployApp(flags.app)    if (flags.json) {      this.log(JSON.stringify(result, null, 2))    } else {      this.log(`Deployed ${flags.app} to ${result.url}`)    }  }}
```

The class-based structure looks verbose compared to a Cobra command. That’s the tradeoff. What you get: auto-generated help text, flag validation, TypeScript type safety on every flag, and a consistent structure that a new contributor can read without guessing where the business logic starts.

#### **Where oclif shines:**

The plugin system is the real differentiator. Third-party plugins install via myapp plugins install @company/plugin-name, get their own npm package lifecycle, and appear as native commands. The Salesforce CLI ships dozens of plugins this way. If your organization has multiple teams that need to extend a shared CLI, this is the only framework with a production-tested answer.

Auto-generated help covers flag descriptions, usage examples, and nested command trees with no template work. For a CLI with 50+ commands, that’s real time saved.

oclif v4.10 (current as of early 2026) supports ESM and CommonJS interoperability, Bun and tsx runtimes (faster startup than standard Node.js), configurable command discovery, and performance tracking hooks.

#### **Where oclif hurts:**

Startup time. Even with lazy command loading, a non-trivial oclif CLI takes 200–500ms before any user code runs. For interactive use, this is fine. For a tool called thousands of times in a CI matrix, it adds up. The Heroku CLI team spent significant effort optimizing this, and it’s still measurably slower than compiled alternatives.

The TypeScript assumption is baked deep. You can technically use plain JavaScript, but the framework’s ergonomics, documentation, and community all assume TypeScript. If your team doesn’t write TypeScript, oclif will feel foreign.

Overkill for small CLIs. If you’re building a tool with five commands and no plugin requirements, oclif’s scaffolding, class hierarchy, and package structure add friction without corresponding benefit. You don’t need a plugin architecture for a deployment script.

**Best for:** Platform CLIs with many subcommands, multiple contributing teams, and plugin requirements. Think Heroku, Salesforce CLI, Shopify CLI, Twilio CLI.

### Ink: React for the Terminal

[Ink](https://github.com/vadimdemedes/ink) starts from a different premise entirely. Instead of modeling commands as classes or functions, it models the terminal as a render target for React components. Your CLI output is JSX. Your state management is hooks. Your layout is Flexbox (via Meta’s Yoga engine).

This sounds like a gimmick until you see what it enables:

```
import React, { useState, useEffect } from 'react'import { render, Box, Text } from 'ink'import Spinner from 'ink-spinner'const DeployStatus = ({ app }: { app: string }) => {  const [status, setStatus] = useState('starting')  const [logs, setLogs] = useState<string[]>([])  useEffect(() => {    const stream = subscribeToDeployLogs(app)    stream.on('log', (line) => setLogs(prev => [...prev, line]))    stream.on('status', setStatus)    return () => stream.close()  }, [app])  return (    <Box flexDirection="column">      <Box>        {status === 'building' && <Spinner type="dots" />}        <Text color="cyan"> Deploying {app}: </Text>        <Text bold>{status}</Text>      </Box>      <Box flexDirection="column" marginTop={1}>        {logs.slice(-5).map((log, i) => (          <Text key={i} dimColor>{log}</Text>        ))}      </Box>    </Box>  )}render(<DeployStatus app="my-app" />)
```

In oclif or Cobra, building this would mean managing cursor positions, ANSI escape sequences, and manual re-rendering. In Ink, it’s a React component.

Claude Code is the most prominent production example of Ink in the wild. According to [The Pragmatic Engineer’s reporting](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built), Anthropic’s team chose React and Ink because the tech stack was already “on distribution” for the Claude model. TypeScript and React are technologies the model understands deeply, which means the tool that helps you write code is built with the same patterns it’s best at reasoning about. The result: streaming diffs, tool call visualizations, and task progress all rendered as composable terminal components.

#### **Where Ink shines:**

Interactive, real-time interfaces. If your CLI needs to display streaming output, progress across multiple concurrent tasks, or interactive selection UIs, Ink handles it with the same component model React developers already know. The learning curve for a React developer is minimal.

Composition scales. A complex dashboard-style CLI (think top or htop but for your platform) is manageable because you're composing components, not managing a state machine of terminal escape codes.

You can combine Ink with oclif. Shawn “swyx” Wang [demonstrated this approach](https://egghead.io/podcasts/build-custom-cli-tooling-with-oclif-and-typescript-with-shawn-swyx-wang) in his Egghead workshop: use oclif for command routing, flags, and plugin architecture, then render the output with Ink components. You get oclif’s structural benefits with Ink’s rendering power.

#### **Where Ink hurts:**

The ecosystem is thinner than you’d want. Pastel, the “Next.js for Ink” framework, went through a period of minimal maintenance before its 2.0 rewrite. Individual Ink component libraries vary in quality and maintenance status. You’ll find yourself building more from scratch than you would in a mature React web ecosystem.

React overhead for simple output. If your command prints three lines of text and exits, rendering a React component tree is absurd. Ink is a rendering framework, not a CLI framework. You still need something else for argument parsing, help generation, and command routing. Most Ink projects pair it with meow (from the same author) or oclif for that plumbing.

Testing requires the same patterns as React testing (render, assert on output), which is powerful but heavyweight for simple commands.

**Best for:** CLIs that need rich interactive interfaces, streaming output, or dashboard-style displays. Best combined with another framework (oclif for routing, Ink for rendering) rather than used alone.

### Rust (clap + ratatui): The Performance Play

The Rust CLI play is actually two libraries working in tandem. [Clap](https://github.com/clap-rs/clap) handles argument parsing and command routing. [Ratatui](https://ratatui.rs/) handles terminal UI rendering. Together, they produce single-binary CLIs that start in milliseconds and distribute without runtime dependencies.

```
use clap::{Parser, Subcommand};#[derive(Parser)]#[command(name = "myapp", about = "Platform management CLI")]struct Cli {    #[command(subcommand)]    command: Commands,}#[derive(Subcommand)]enum Commands {    /// Deploy an application    Deploy {        /// Application name        #[arg(short, long)]        app: String,        /// Output as JSON        #[arg(long)]        json: bool,    },    /// List all applications    Apps {        /// Output as JSON        #[arg(long)]        json: bool,    },}fn main() {    let cli = Cli::parse();    match cli.command {        Commands::Deploy { app, json } => {            let result = deploy_app(&app);            if json {                println!("{}", serde_json::to_string_pretty(&result).unwrap());            } else {                println!("Deployed {} to {}", app, result.url);            }        }        Commands::Apps { json } => { /* ... */ }    }}
```

The derive macro approach means your command structure is validated at compile time. Misspell a flag name? The compiler catches it. Forget to handle a subcommand? The compiler catches it. This is a genuine advantage over runtime-validated frameworks where a missing command handler is a runtime crash in production.

Clap 4.6 improved performance significantly over the 3.x series, but for most CLIs you’re waiting on network calls, not argument parsing. However, for tools that run inside tight loops or process thousands of invocations, the difference matters.

For rich TUI applications, ratatui provides widgets (tables, charts, lists, tabs, gauges) that render to the terminal via the Crossterm backend. The tradeoff: your team needs to understand Rust’s ownership model even for display logic:

```
use ratatui::{    layout::{Constraint, Layout},    widgets::{Block, Borders, Table, Row, Cell},    style::{Style, Color},};fn render_apps_table(frame: &mut Frame, apps: &[App]) {    let rows: Vec<Row> = apps.iter().map(|app| {        Row::new(vec![            Cell::from(app.name.clone()),            Cell::from(app.status.clone())                .style(match app.status.as_str() {                    "active" => Style::default().fg(Color::Green),                    "sleeping" => Style::default().fg(Color::Yellow),                    _ => Style::default(),                }),        ])    }).collect();    let table = Table::new(rows, [Constraint::Length(20), Constraint::Length(10)])        .header(Row::new(vec!["Name", "Status"]).style(Style::default().bold()))        .block(Block::default().title("Applications").borders(Borders::ALL));    frame.render_widget(table, frame.area());}
```

#### **Where Rust shines:**

Startup time. A compiled Rust CLI starts in 1–5ms. A Node.js CLI starts in 200–500ms. For developer tools that run frequently (formatters, linters, file watchers), this difference is felt on every invocation. ripgrep, fd, bat, exa, delta, starship, zoxide: the tools that developers install to replace slower alternatives are overwhelmingly written in Rust for this reason.

Single binary distribution. cargo build --release produces one binary with zero runtime dependencies. No Node.js installation. No Python virtual environment. No version conflicts. Copy the binary, run it. For tools distributed to end users who aren't developers, this eliminates an entire class of support issues.

Memory safety without garbage collection. For long-running TUI applications (monitoring dashboards, log viewers), Rust’s ownership model means predictable memory usage without GC pauses.

#### **Where Rust hurts:**

Contributor barrier. Rust’s learning curve is real. A team of JavaScript developers won’t become productive in Rust in a sprint. If your CLI is an internal tool maintained by a platform team, this limits who can fix bugs and add features. If it’s open source, it limits your contributor pool significantly.

Slower iteration cycle. Compile times for a non-trivial Rust project (especially with many dependencies like ratatui + tokio + serde + clap) can reach 30–60 seconds for a clean build. Hot-reload development workflows don’t exist the way they do in Node.js. When you’re iterating on the output format of a new command, waiting 15 seconds between changes adds friction that TypeScript developers don’t experience.

No built-in plugin architecture. Rust’s compilation model (everything links at compile time) makes runtime plugin loading possible but awkward. Dynamic loading via libloading exists, but it’s nothing like oclif’s npm-based plugin model. If you need external teams to extend your CLI, Rust makes that hard.

**Best for:** High-performance tools (formatters, linters, search), single-binary distribution requirements, system-level utilities, TUI applications. The right choice when startup time and distribution simplicity outweigh contributor accessibility.

### Cobra (Go): The Pragmatic Middle Ground

[Cobra](https://github.com/spf13/cobra) powers kubectl, the GitHub CLI, Docker CLI, Hugo, and well over 150,000 projects on GitHub. If you’ve used a CLI built in Go in the last five years, it was almost certainly built with Cobra. That adoption isn’t accidental. Cobra occupies a sweet spot that none of the other frameworks quite match: fast binaries, a large contributor pool, fast compile times, and just enough structure without framework lock-in.

```
package mainimport (    "fmt"    "os"    "github.com/spf13/cobra")var app stringvar jsonOutput boolvar deployCmd = &cobra.Command{    Use:   "deploy",    Short: "Deploy an application",    RunE: func(cmd *cobra.Command, args []string) error {        result, err := deployApp(app)        if err != nil {            return err        }        if jsonOutput {            return printJSON(result)        }        fmt.Printf("Deployed %s to %s\n", app, result.URL)        return nil    },}func main() {    rootCmd := &cobra.Command{Use: "myapp"}    deployCmd.Flags().StringVarP(&app, "app", "a", "", "app name (required)")    deployCmd.MarkFlagRequired("app")    deployCmd.Flags().BoolVar(&jsonOutput, "json", false, "output as JSON")    rootCmd.AddCommand(deployCmd)    if err := rootCmd.Execute(); err != nil {        os.Exit(1)    }}
```

The registration-based model is explicit. You construct commands, attach flags, and wire them into a tree. There are no derive macros, no class hierarchies, no directory conventions. This is Go’s philosophy applied to CLIs: obvious over clever.

Cobra v1.10 provides command registration, automatic help generation, shell completion for Bash/Zsh/Fish/PowerShell, and intelligent command suggestions (“did you mean…?”). Paired with Viper for configuration management and pflag for POSIX-compliant flag parsing, it’s a complete toolkit without being a heavy framework.

#### **Where Cobra shines:**

The contributor math. In my experience, Go is the second language of most infrastructure-oriented teams. Your platform team writes Python? They can read and modify Go. Is your infrastructure in Terraform? Same ecosystem. The contributor pool isn’t as large as TypeScript, but Go developers tend to be comfortable with CLI patterns because the language was designed for exactly this kind of systems tooling.

Compile speed is where Go separates from Rust. A clean build of a Cobra CLI with a handful of dependencies takes 3–10 seconds. An incremental build after changing one file is under a second. Compare that to Rust’s 15–60 second clean builds. When you’re iterating on a new command’s flag structure or output format, Go’s compile speed feels almost interpreted.

Single-binary distribution, like Rust. go build produces a statically linked binary with no runtime dependencies. Cross-compilation is trivial: GOOS=linux GOARCH=amd64 go build works without Docker, without a cross-compilation toolchain, without ceremony. Distributing to Linux, macOS, and Windows from a single CI pipeline is straightforward.

#### **Where Cobra hurts:**

No plugin architecture. Like Rust, Go’s compilation model doesn’t lend itself to runtime extensibility. The Go plugin package exists but is platform-limited and rarely used in practice. If you need external teams to ship CLI extensions, Cobra doesn’t have an answer.

Go’s type system is weaker than Rust’s or TypeScript’s. No sum types, limited generics (no pattern matching, no enum types). Cobra compensates with runtime validation, but you lose the compile-time guarantees that clap’s derive macros provide. A misspelled flag name in a Cobra command is a runtime bug, not a compile error.

TUI capabilities are basic compared to Ink or ratatui. Libraries like bubbletea and lipgloss (from Charm) fill this gap, but they’re separate tools, not integrated into Cobra. Building a rich interactive terminal UI in Go is possible but requires stitching together multiple libraries.

**Best for:** Infrastructure CLIs, platform tools, anything where the team already writes Go or values the compile-speed-to-binary-performance ratio. The right choice when you need fast binaries and fast iteration without the Rust learning curve.

### The Decision Framework

Here’s a breakdown of the field:

**oclif (TypeScript)**

-   Startup: 200–500ms
-   Plugins: Built-in, production-tested
-   TUI: Basic (tables, spinners)
-   Distribution: Requires Node or bundled installer
-   Contributors: Large (TypeScript devs)
-   Best examples: Heroku CLI, Salesforce CLI

**Ink (React)**

-   Startup: 200–500ms
-   Plugins: None (pair with oclif)
-   TUI: Full (React components)
-   Distribution: Requires Node
-   Contributors: Large (React devs)
-   Best example: Claude Code

**Rust (clap + ratatui)**

-   Startup: 1–5ms
-   Plugins: None (DIY)
-   TUI: Full (ratatui widgets)
-   Distribution: Single binary
-   Contributors: Small (Rust learning curve)
-   Best examples: ripgrep, bat, starship

**Cobra (Go)**

-   Startup: 10–30ms
-   Plugins: None (DIY)
-   TUI: Basic (Charm stack or DIY)
-   Distribution: Single binary
-   Contributors: Medium (Go devs)
-   Best examples: kubectl, gh, docker

Now use the decision tree, I recommend starting with your constraints:

#### **Is your team primarily TypeScript/JavaScript developers building an internal platform CLI?**

Yes: oclif. The contributor-familiarity advantage outweighs the startup-time cost for most internal tools.

#### **Is a single-binary distribution a hard requirement (end users who can’t install Node/Python)?**

Yes: Rust or Go. Both compile to standalone binaries. (Node.js tools like bun build --compile and pkg can produce single binaries too, but with larger file sizes and less mature cross-compilation.)

#### **Is startup time critical (CI pipelines, tight loops, a developer tool called hundreds of times per session)?**

Yes: Rust (clap) or Go (Cobra). Both produce fast binaries. Choose Rust if you also need a rich TUI. Choose Go if your team already writes Go or you value fast compile times over maximum runtime performance.

#### **Do you need a plugin ecosystem where external teams ship CLI extensions independently?**

Yes: oclif. Nothing else has a production-tested answer.

#### **Is your CLI primarily an interactive, real-time terminal experience (streaming, dashboards, multi-pane layouts)?**

Yes: Ink for rendering. Combine with oclif for command routing if you also need plugins and help generation.

#### **Are you building a small tool with fewer than ten commands and no plugin needs?**

oclif is overkill. Consider Commander.js (Node), Click (Python), or Cobra (Go), depending on your team’s language. Or just use clap if you want the type safety and performance.

### Honorable Mentions

[**Commander.js**](https://github.com/tj/commander.js/) is a great tool when oclif is too much. It’s a minimal argument parser for Node.js with no opinions about project structure, output rendering, or plugin systems. For a 5-command internal tool, Commander.js gets out of your way.

[**Click (Python)**](https://github.com/pallets/click) uses decorators to define commands and options, which reads cleanly and is approachable for Python teams. It’s the foundation for tools like the AWS CLI (which uses a Click-like custom framework). The tradeoff: Python startup time is worse than Node.js, and distributing Python CLIs to non-Python users remains a packaging challenge (uv and PyInstaller help, but neither fully solves cross-platform single-binary distribution).

[**Deno**](https://github.com/denoland/deno) deserves a mention for teams already in the TypeScript ecosystem who want faster startup. Deno 2.x can compile TypeScript CLIs to standalone binaries with deno compile, eliminating the Node.js runtime dependency. It's not a framework, but it changes the distribution calculus for TypeScript CLIs.

[**Bubbletea**](https://github.com/charmbracelet/bubbletea) **+** [**Lip Gloss**](https://github.com/charmbracelet/lipgloss) **(Go)** from Charm deserve a mention for teams that want rich TUI in Go. They fill the gap Cobra leaves in terminal UI, similar to how Ink complements oclif. If you’re building a Go CLI that needs more than tables and text, look here.

### The Decision That Outlasts You

Here’s what I’ve learned from watching framework choices play out over the years: the teams that chose well weren’t the ones who picked the “best” framework. They were the ones who understood what they were optimizing for and explicitly accepted the tradeoffs.

The Heroku team chose Node.js and built oclif because they had a strong JavaScript skill base, and plugin extensibility was the primary constraint. They accepted the startup time cost. The ripgrep team chose Rust because search speed was everything. They accepted the smaller contributor pool. The Kubernetes team chose Go because the ecosystem was already Go, and Cobra fit naturally. They accepted the less expressive type system.

Every framework choice is a bet on which constraints will matter most over the next three years. Startup time. Contributor pool. Plugin architecture. Distribution model. Interactive capability. Pick the two that matter most. Accept that you’ll be mediocre on the others.

*This is the second article in the “Designing the CLI” series. Previously:* [*Your CLI Deserves a Designer (And That Designer Is You)*](https://medium.com/@montes.makes/your-cli-deserves-a-designer-and-that-designer-is-you-7da8b608ef57)*. Next up: designing your CLI for its fastest-growing user base, AI agents that can’t read your spinners.*

### Sources

-   [oclif: The Open CLI Framework](https://oclif.io/) and [oclif/core on GitHub](https://github.com/oclif/core) (v4.10, Salesforce-backed)
-   [Open Sourcing oclif, the CLI Framework that Powers Our CLIs](https://engineering.salesforce.com/open-sourcing-oclif-the-cli-framework-that-powers-our-clis-21fbda99d33a/) (Salesforce Engineering)
-   [How Claude Code is built](https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built) (Gergely Orosz, The Pragmatic Engineer)
-   [Claude Code Internals, Part 11: Terminal UI](https://kotrotsos.medium.com/claude-code-internals-part-11-terminal-ui-542fe17db016) (Marco Kotrotsos)
-   [Ink: React for interactive command-line apps](https://github.com/vadimdemedes/ink) (vadimdemedes/ink on GitHub)
-   [Build Custom CLI Tooling with OClif and React-Ink](https://egghead.io/podcasts/build-custom-cli-tooling-with-oclif-and-typescript-with-shawn-swyx-wang) (Shawn “swyx” Wang, Egghead)
-   [Clap: Command Line Argument Parser for Rust](https://docs.rs/clap/latest/clap/) (v4.6, docs.rs)
-   [Ratatui: Terminal UI library for Rust](https://ratatui.rs/) (Crossterm backend)
-   [Cobra: A Commander for modern Go CLI interactions](https://cobra.dev/) (v1.10.2, spf13)
-   [Bubbletea: A TUI framework for Go](https://github.com/charmbracelet/bubbletea) and [Lip Gloss: Style definitions for terminal layouts](https://github.com/charmbracelet/lipgloss) (Charm)
-   [Evolution of the Heroku CLI: 2008–2017](https://blog.heroku.com/evolution-of-heroku-cli-2008-2017)
-   [Heroku CLI v9: Infrastructure Upgrades and oclif Transition](https://www.heroku.com/blog/heroku-cli-v9-infrastructure-upgrades-oclif-transition/)
-   [CLI Guidelines (clig.dev)](https://clig.dev/)

* * *

[oclif, Ink, Rust, and the Framework Decision That Shapes Everything](https://levelup.gitconnected.com/oclif-ink-rust-and-the-framework-decision-that-shapes-everything-13f2c18539ec) was originally published in [Level Up Coding](https://levelup.gitconnected.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.