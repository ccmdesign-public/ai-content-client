---
title: "Building a Collaborative Document Editor Inside ChatGPT with OpenAI Apps SDK"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/building-a-collaborative-document-editor-inside-chatgpt-with-openai-apps-sdk-eb8434c0996e?source=rss----5517fd7b58a6---4"
publishedAt: "2026-01-30"
tags:
  - "javascript"
  - "openai"
  - "web-development"
  - "generative-ai-tools"
  - "saas"
  - "coding"
  - "frameworks"
---

# Building a Collaborative Document Editor Inside ChatGPT with OpenAI Apps SDK

# Building a Collaborative Document Editor Inside ChatGPT with OpenAI Apps SDK

## In this tutorial, we’ll create a collaborative document editor that ChatGPT can read and write to

[Mr. Ånand](https://astrodevil.medium.com/?source=post_page---byline--eb8434c0996e---------------------------------------)

15 min read·20 hours ago

\--

![]()

ChatGPT can now run full applications within the chat interface. You’re no longer limited to just text responses. You can add interactive editors, canvases, and real tools directly into the chat.

With the [GPT Apps SDK](https://developers.openai.com/apps-sdk/) and [Model Context Protocol](https://modelcontextprotocol.io/), you can create apps that work inside ChatGPT. It can read your UI state, trigger actions on your server, and update UI in real-time.

In this tutorial, we’ll create a collaborative document editor that ChatGPT can read and write to.

## What We’re Building

We’re building a document editor that runs inside ChatGPT. You can write in a rich text editor, ask ChatGPT to summarize what you’ve written, or tell it to add formatted content. ChatGPT reads your document, understands the content, and writes directly into it.

Here’s how it looks:

![]()

Here, we used [Velt](https://velt.dev/), which handles the collaboration. It manages live cursors, comments, and presence, keeping the document in sync across all users who have it open. This means we don’t need to build or maintain our own real-time syncing logic.

For editing, we used **TipTap**. It provides the rich text features you’d expect, such as headings, lists, and inline formatting, and works smoothly with Velt’s collaboration layer. The Model Context Protocol connects everything to ChatGPT, so document changes triggered by chat commands show up immediately for all users.

## Understanding the Foundation

Before we start coding, let’s understand how ChatGPT talks to external applications.

ChatGPT can’t directly access your local editor or modify files on your computer. It needs a bridge, that’s where the Model Context Protocol comes in. MCP is a standard way for AI assistants to connect with external tools and data sources.

Think of it like this: ChatGPT is running in OpenAI’s servers, your document editor is running in your browser, and they need a middleman to communicate. That middleman is your MCP server.

Here’s the flow:

-   You tell ChatGPT, “summarize my document.”
-   ChatGPT calls a tool on your MCP server called `get-write-content` \[*You can name it anything through code\]*
-   Your server fetches the text from the editor
-   ChatGPT receives it, processes it, and shows you a summary

The same works in reverse. When you say “write this as a bullet list,” ChatGPT calls a `write-content` tool, your server receives the formatted text, and updates the editor.

To make this work, we need a place where we can store these tools and call them.

## The MCP Server

Your MCP server is just a Node.js application that exposes functions (called “tools”) to ChatGPT. You define what each tool does and when ChatGPT should use it.

A tool looks like this:

```
{  name: "get-wite-content",  description: "Retrieves current document text for analysis",  inputSchema: { type: "object", properties: {} } // use this when you want to give input values to gpt. Like, your name, value etc...}
```

ChatGPT reads that description and decides, “*When the user asks about the document content, I should call this tool*.” The `inputSchema` tells ChatGPT what data to send, in this case, nothing, since we just want the full document.

![]()

The key is syncing the state between your editor and the MCP server. When the document changes, your server needs the updated content. When ChatGPT writes something, your editor needs to receive and render it.

## Prerequisites

You’ll need a few things before we start:

-   **Node.js 18 or newer** — For running the MCP server and building the widget
-   **pnpm** (or npm/yarn) — Package manager for dependencies
-   **Velt account** — Sign up at [console.velt.dev](https://console.velt.dev/) to get your API key
-   **ngrok account** — Get it from [ngrok.com](https://ngrok.com/) for exposing your local server
-   **ChatGPT Plus subscription** — Required to add custom apps

**For Chrome 142+ users:** You may need to disable a flag that blocks local network access. Open `chrome://flags/`, search for `local-network-access-check`, set it to **Disabled**, and restart Chrome. This lets ChatGPT load your widget from localhost.

Install and set up ngrok:

```
# macOSbrew install ngrok# Or download from ngrok.com for other platforms# Add your auth tokenngrok config add-authtoken YOUR_TOKEN
```

Get your auth token from the [ngrok dashboard](https://dashboard.ngrok.com/).

That’s the setup. Now let’s build the editor.

## System Overview & Setup

Cowrite consists of three interconnected components that enable real-time collaborative editing through AI assistance:

![]()

The system works through a clear flow: users interact with the **ChatGPT UI**, which communicates via **MCP Protocol** to the **MCP Server** (Node.js), which then manages the **Cowrite Widget** (React/Velt), where the actual editing and collaboration happen.

## Project Setup

The quickest way to get started is by cloning the [repository](https://github.com/Studio1HQ/co-write). This gives you the complete setup with all components pre-configured:

```
git clone https://github.com/Studio1HQ/co-writecd co-writepnpm install
```

Next, create a `**.env**` file in the root directory and add your Velt API key:

```
VITE_VELT_API_KEY=your_velt_api_key_here
```

You can get your API key from [**console.velt.dev**](https://console.velt.dev/) after signing up.

Now install the server dependencies:

```
cd cowrite_serverpnpm installcd ..
```

That’s it! You’re ready to run the application (we’ll cover this in the upcoming section).

**Building from scratch?** If you prefer understanding each piece by setting it up manually, you’ll need these core packages:

**Frontend dependencies:**

```
pnpm add react@19 react-dom@19pnpm add @tiptap/react@3.14.0 @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-placeholderpnpm add @veltdev/react@4.5.9 @veltdev/tiptap-crdt-react @veltdev/tiptap-velt-commentspnpm add lucide-reactpnpm add -D vite @vitejs/plugin-react typescript tailwindcss
```

**Server dependencies:**

```
cd cowrite_serverpnpm add @modelcontextprotocol/sdk
```

## Project Structure

Here’s how the codebase is organized:

```
co-write/├── src/│   └── cowrite/│       ├── cowrite.jsx          # Main editor component│       ├── Header.jsx           # User switcher│       ├── MenuBar.jsx          # Formatting controls│       └── mockUsers.js         # Test users│├── cowrite_server/│   └── src/│       └── server.ts            # MCP server (3 tools)│├── assets/                      # Built widget files <- these will auto create when we run the build command│   └── cowrite.html│└── .env                         # Velt API key
```

**Key files you’ll be working with:**

-   `**cowrite.jsx**` - Editor setup, Velt integration, and content synchronization
-   `**server.ts**` - Tool definitions and request handlers for AI actions
-   `**build-all.mts**` - Bundles React components into a single HTML file

The `**src/cowrite**` directory contains the editor UI, while `**cowrite_server**` handles the MCP protocol implementation that bridges ChatGPT with your editor.

## Building the Collaborative Editor

The editor needs to handle three things: text editing, real-time collaboration, and syncing with the MCP server so ChatGPT can read and modify documents.

Let’s start with the editor.

## Editor Setup

Create `src/cowrite/cowrite.jsx` and set up TipTap:

```
import { useEditor, EditorContent } from "@tiptap/react";import StarterKit from "@tiptap/starter-kit";import Underline from "@tiptap/extension-underline";import Placeholder from "@tiptap/extension-placeholder";function CowriteEditor() {  const editor = useEditor({    extensions: [      StarterKit.configure({        history: false, // Disable when using CRDT      }),      Underline,      Placeholder.configure({        placeholder: "Start writing your document...",      }),    ],    content: "",    editorProps: {      attributes: {        class: "prose prose-sm sm:prose lg:prose-lg focus:outline-none",      },    },  });  return (    <div className="editor-wrapper">      <EditorContent editor={editor} />    </div>  );}
```

TipTap’s `**StarterKit**` gives us bold, italic, headings, lists, blockquote, and code blocks. We disable `**history**` because [Velt's CRDT](https://docs.velt.dev/realtime-collaboration/crdt/setup/tiptap) will manage undo/redo across all users, running both would cause conflicts. The `**prose**` classes add readable typography.

## Real-time Sync with Velt

Now we add Velt’s CRDT extension to sync content between users:

```
import { useVeltTiptapCrdtExtension } from "@veltdev/tiptap-crdt-react";import { VeltProvider } from "@veltdev/react";function CowriteEditor() {  const { VeltCrdt, isLoading } = useVeltTiptapCrdtExtension({    editorId: "cowrite-doc-prod",    initialContent: "<p></p>",  });  const editor = useEditor({    extensions: [      StarterKit.configure({ history: false }),      Underline,      Placeholder.configure({        placeholder: "Start writing your document...",      }),      ...(VeltCrdt ? [VeltCrdt] : []),    ],    content: "",    editorProps: {      attributes: {        class: "prose prose-sm sm:prose lg:prose-lg focus:outline-none",      },    },  }, [VeltCrdt]);  if (isLoading) return <div>Loading editor...</div>;  return <EditorContent editor={editor} />;}export default function Cowrite() {  return (    <VeltProvider apiKey={import.meta.env.VITE_VELT_API_KEY}>      <CowriteEditor />    </VeltProvider>  );}
```

The `**editorId**` identifies the document, users editing the same document need the same ID. The spread operator `**...(VeltCrdt ? [VeltCrdt] : [])**` adds the extension only after it loads. `**VeltProvider**` authenticates with your API key.

Every keystroke now syncs across users. When two people type simultaneously, Velt’s conflict resolution merges both changes correctly.

## Live Cursors and Comments

Add presence and commenting:

```
import { VeltCursor, VeltComments, VeltCommentsSidebar } from "@veltdev/react";import { TiptapVeltComments } from "@veltdev/tiptap-velt-comments";import { BubbleMenu } from '@tiptap/react';import { MessageCircle } from "lucide-react";import { addComment, renderComments } from "@veltdev/tiptap-velt-comments";function CowriteEditor() {  const { client } = useVeltClient();  //...  useEffect(() => {    if (editor && commentAnnotations?.length) {      renderComments({ editor, commentAnnotations });    }  }, [editor, commentAnnotations]);  useEffect(() => {    const initializeVelt = async () => {      await client.identify(currentUser, {        forceReset: true,      });      await client.setDocument("cowrite-doc-prod", {        documentName: "Cowrite Collaborative Document",      });      setVeltReady(true);    };    if (client) initializeVelt();  }, [client, currentUser]);  return (    <>      {veltReady && <VeltCursor />}      {editor && (        <BubbleMenu          editor={editor}          tippyOptions={{ duration: 100, placement: 'top' }}        >          <button            onClick={(e) => {              e.preventDefault();              addComment({ editor });            }}          >            <MessageCircle size={16} />            <span>Comment</span>          </button>        </BubbleMenu>      )}      <EditorContent editor={editor} />      {veltReady && <VeltComments textMode={false} />}      {veltReady && <VeltCommentsSidebar />}    </>  );}
```

The first `**useEffect**` renders existing comments when the editor loads. The second initializes Velt - identifying the current user and linking this editor to a specific document. The `**veltReady**` flag ensures components render only after initialization completes.

`**BubbleMenu**` shows a floating comment button when users select text. The three Velt components (`**VeltCursor**`, `**VeltComments**`, `**VeltCommentsSidebar**`) display live cursors, inline comment threads, and a comment panel.

**Important:** Whitelist these domains in your [**Velt Console**](https://console.velt.dev/) under Settings → Allowed Origins for ChatGPT integration:

```
.oaiusercontent.comhttps://chatgpt.com
```

![]()

Without this, ChatGPT won’t be able to send requests to your editor through the MCP protocol.

## Content Sync to Server

ChatGPT needs access to document content. We’ll send snapshots to the MCP server:

```
const sendDocumentContent = async () => {  if (!editor) return;const html = editor.getHTML();  const plainText = editor.getText();  const wordCount = plainText.split(/\s+/).filter(Boolean).length;  const charCount = plainText.length;  try {    await fetch("http://localhost:8000/api/document-content", {      method: "POST",      headers: { "Content-Type": "application/json" },      body: JSON.stringify({        sessionId: "default",        html,        plainText,        wordCount,        charCount,      }),    });  } catch (error) {    console.error("Failed to sync document content:", error);  }};useEffect(() => {  if (!editor) return;  sendDocumentContent();  let timeoutId;  const handleUpdate = () => {    clearTimeout(timeoutId);    timeoutId = setTimeout(() => {      sendDocumentContent();    }, 2000);  };  editor.on("update", handleUpdate);  const handleBlur = () => {    clearTimeout(timeoutId);    sendDocumentContent();  };  editor.on("blur", handleBlur);  return () => {    clearTimeout(timeoutId);    editor.off("update", handleUpdate);    editor.off("blur", handleBlur);  };}, [editor]);
```

We extract both HTML (with formatting) and plain text (easier for AI processing), plus metadata. The `**useEffect**` sets up three sync triggers:

-   immediate on load,
-   debounced on updates (waits 2 seconds after typing stops), and
-   immediate on blur (when focus leaves the editor).

This keeps ChatGPT updated without flooding the server during active typing.

The frontend is done. Before moving to the server, you can preview the UI locally to test or customize it.

## Testing the UI Locally

To see the editor before connecting to ChatGPT, run these commands:

```
# Build the widgetnpm run build--------------------------------# Serve it locallynpm run serve
```

This creates an `**assets/**` folder with `**cowrite.html**`. Open it in VS Code, right-click the file, and select **"Open with Live Server"** (requires the [**Live Server extension**](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

![]()

You’ll see the TipTap editor with Velt collaboration features working. Make UI changes in your code, rebuild, and refresh to see updates. This is useful for tweaking styles or testing features before the ChatGPT integration.

Now let’s build the server that connects this to ChatGPT.

## Building the MCP Server

The MCP server bridges ChatGPT and your editor. It receives requests from ChatGPT, translates them into editor operations, and sends back results.

## Server Setup

The server needs two things: the widget HTML and a way to store document state.

Create `cowrite_server/src/server.ts`:

```
import { createServer } from "node:http";import { Server } from "@modelcontextprotocol/sdk/server/index.js";import * as fs from "node:fs";import * as path from "node:path";const ASSETS_DIR = path.resolve(__dirname, "..", "..", "assets");const documentStates = new Map<string, any>(); // Stores document snapshotsfunction readWidgetHtml(componentName: string): string {  const directPath = path.join(ASSETS_DIR, `${componentName}.html`);  if (fs.existsSync(directPath)) return fs.readFileSync(directPath, "utf8");  // Fallback: versioned builds like cowrite-abc123.html  const candidates = fs.readdirSync(ASSETS_DIR)    .filter(file => file.startsWith(`${componentName}-`) && file.endsWith(".html"));  if (candidates.length) {    return fs.readFileSync(path.join(ASSETS_DIR, candidates[candidates.length - 1]), "utf8");  }  throw new Error(`Widget HTML not found for "${componentName}"`);}const cowriteWidget = {  id: "cowrite",  templateUri: "ui://widget/cowrite.html",  html: readWidgetHtml("cowrite"),};
```

`**readWidgetHtml**` finds the built-in widget in `**assets/cowrite.html**` , and `**documentStates**` caches content from the editor so ChatGPT can read it later.

## The Three Tools

The server exposes three MCP tools:

## Get Mr. Ånand’s stories in your inbox

 from this writer.

Tool Purpose Key Detail `cowrite-open` Opens editor widget `resultCanProduceWidget: true` It means the UI that will be visible on GPT `cowrite-get-content` Reads document Returns HTML/plaintext/both `cowrite-write-content` Writes to editor Uses `structuredContent`

Each tool has two parts: a definition (what ChatGPT sees) and a handler (what runs when called).

**1\. cowrite-open**

This tool opens the widget.

**Tool definition:**

```
{  name: "cowrite-open",  description: "Open the Cowrite collaborative document editor", // Make sure your description always stays starightforward and clear so gpt can understands it properly.  _meta: {    "openai/outputTemplate": cowriteWidget.templateUri,    "openai/widgetAccessible": true,    "openai/resultCanProduceWidget": true,  },  annotations: { readOnlyHint: true },}
```

The `**_meta**` fields tell ChatGPT this tool produces a widget and where to find the HTML template.

**Handler:**

```
if (toolName === "cowrite-open") {  return {    content: [{ type: "text", text: "Opening Cowrite..." }],    _meta: {      "openai/toolInvocation/invoking": "Loading editor",      "openai/toolInvocation/invoked": "Cowrite ready",    },  };}
```

**2\. cowrite-get-content**

This tool reads the cached document from `**documentStates**`.

**Tool definition:**

```
{  name: "cowrite-get-content",  description: "Get current document content",  inputSchema: {    type: "object",    properties: {      format: {        type: "string",        enum: ["html", "plaintext", "both"],        description: "Format to return. Default is 'both'.",      },    },  },  annotations: { readOnlyHint: true },}
```

**Handler:**

```
if (toolName === "cowrite-get-content") {  const { format = "both" } = request.params.arguments ?? {};  const cachedDoc = documentStates.get("default");if (!cachedDoc || cachedDoc.html === "<p></p>") {    return { content: [{ type: "text", text: "Document is empty" }] };  }  // Return based on format (implementation details omitted for brevity)  return { content: [{ type: "text", text: cachedDoc.plainText }] };}
```

**3\. cowrite-write-content**

This tool is different, it doesn’t just return text, it sends instructions to the widget.

**Tool definition**

```
{  name: "cowrite-write-content",  description: "Write content into the document",  inputSchema: {    type: "object",    properties: {      content: { type: "string", description: "Content to write" },      format: {         type: "string",         enum: ["paragraph", "heading", "list", "auto"],        description: "Format. Default is 'auto'."       },      append: {         type: "boolean",         description: "Append or replace. Default is true."       },    },    required: ["content"],  },  _meta: {    "openai/outputTemplate": cowriteWidget.templateUri,    "openai/widgetAccessible": true,  },}
```

**Handler:**

```
if (toolName === "cowrite-write-content") {  const { content, format = "auto", append = true } = request.params.arguments ?? {};return {    content: [{ type: "text", text: "Writing to document..." }],    structuredContent: { action: "write-content", content, format, append },  };}
```

The key is `**structuredContent,**` the widget receives this via `**window.openai.toolOutput**`, parses the action and parameters, then inserts the content into the editor.

At this point, the editor works and stays in sync for everyone, but there’s a gap. ChatGPT doesn’t know what’s inside the document. When you ask “summarize my document,” ChatGPT needs access to the current content, but that data lives in the browser.

That’s where the server comes in. The server needs a way to receive the document’s state from the widget so ChatGPT can access it when handling tool calls.

We’ve covered how the server sends data to the widget (via `**structuredContent**` in tool responses). Now we need the reverse, the widget sending data to the server.

Remember the `**sendDocumentContent()**` function we wrote earlier? It sends document snapshots to the server every 2 seconds. The server caches these snapshots in memory, so when ChatGPT calls `**cowrite-get-content**`, it can return the data instantly without waiting for the widget to respond.

## Document State API Endpoint

The server needs an HTTP endpoint to receive content updates from the widget:

```
const httpServer = createServer(async (req, res) => {  const url = new URL(req.url!, `http://${req.headers.host}`);if (req.method === "POST" && url.pathname === "/api/document-content") {    let body = "";    req.on("data", chunk => { body += chunk; });    req.on("end", () => {      try {        const data = JSON.parse(body);        documentStates.set(data.sessionId || "default", {          ...data,          timestamp: Date.now(),        });        res.writeHead(200, { "Access-Control-Allow-Origin": "*" });        res.end(JSON.stringify({ success: true }));      } catch (error) {        res.writeHead(400);        res.end("Invalid JSON");      }    });    return;  }  // Handle SSE and MCP endpoints...});const port = Number(process.env.PORT ?? 8000);httpServer.listen(port, () => {  console.log(`Cowrite MCP server listening on http://localhost:${port}`);});
```

This endpoint receives the document snapshots we’re sending from the editor’s `**sendDocumentContent**` function. The server stores them in the `**documentStates**` Map, making them available when ChatGPT calls `**cowrite-get-content**`.

## ChatGPT ↔ Widget Integration

Now that we have the server and tools set up, let’s connect ChatGPT to the editor. When ChatGPT calls `cowrite-write-content`, the widget receives the response and inserts formatted content.

## Receiving Tool Responses

The widget listens for OpenAI events using React’s `useEffect`:

```
useEffect(() => {  const handleOpenAIEvent = (event) => {    const toolOutput = event.detail.globals.toolOutput;if (toolOutput?.action === 'write-content') {      const { content, format, append } = toolOutput;      // Auto-detect format based on content patterns      const htmlContent = formatContent(content, format);      // Insert or replace content in editor      if (append) {        editor.chain().focus().insertContent(htmlContent).run();      } else {        editor.chain().setContent(htmlContent).run();      }      // Sync changes to server and collaborators      sendDocumentContent();    }  };  // Register listener when component mounts  window.addEventListener('openai:set_globals', handleOpenAIEvent);  // Clean up when component unmounts  return () => {    window.removeEventListener('openai:set_globals', handleOpenAIEvent);  };}, [editor]);
```

The `window.openai.toolOutput` contains the `structuredContent` we returned from the server, specifically the `action`, `content`, `format`, and `append` parameters.

## Auto-Format Detection

The `formatContent` helper auto-detects patterns:

-   `Task 1` → Bullet list (`<ul>`)
-   `1. First` → Numbered list (`<ol>`)
-   `# Title` → Heading (`<h1>`)
-   Multiple paragraphs → Wrapped in `<p>` tags

Full implementation available in the [GitHub repo](https://github.com/Studio1HQ/co-write).

## Complete Flow

![]()

**Reading flow:** User asks for a summary → ChatGPT calls `cowrite-get-content` → Server returns cached content → ChatGPT processes and displays summary.

**Writing flow:** User requests content → ChatGPT calls `cowrite-write-content` → Server returns `structuredContent` → Widget receives via `window.openai.toolOutput` → Editor formats and inserts → Velt syncs to all collaborators.

## Testing & Connecting to ChatGPT

With the code in place, let’s connect everything to ChatGPT and see it work.

### Running the Servers

You need three terminals running simultaneously, one for the widget, one for assets, and one for the MCP server.

**Terminal 1: Build the Frontend**

```
# In project rootpnpm run build
```

This compiles your widget into the `assets/` folder. Run this once, or whenever you modify frontend code.

**Start the Asset Server (same terminal)**

```
pnpm run serve
```

This starts a static server on `http://localhost:4444` that serves your widget files. You should see:

```
Serving on http://localhost:4444
```

**Terminal 2: Start the MCP Server**

```
cd cowrite_serverpnpm start
```

Your MCP server runs on `http://localhost:8000`. You should see:

```
Cowrite MCP server listening on http://localhost:8000
```

Keep all terminals running. ChatGPT will call tools on the MCP server, which loads the widget from the asset server.

## Exposing with ngrok

ChatGPT can’t access localhost, so we need public URLs. Install [ngrok](https://ngrok.com/) if you haven’t already, then expose your MCP server:

**Terminal 3: Create Public Tunnel**

```
ngrok http 8000
```

Copy the **HTTPS URL** from the output (looks like `https://abc123.ngrok-free.app`). This is your public MCP endpoint.

**Important:** Your asset server (`localhost:4444`) stays local, only the MCP server needs to be public. The MCP server tells ChatGPT where to load the widget from.

## Connecting to ChatGPT

Open [ChatGPT](https://chatgpt.com/) and enable the connector:

1.  Go to **Settings → Connectors → Enable Developer Mode**

![]()

1.  Navigate back to **Connectors** and click **Create**

![]()

1.  Fill in the details:

-   **Name:** Cowrite
-   **Description:** Collaborative document editor with real-time sync
-   **MCP Server URL:** `https://abc123.ngrok-free.app/mcp` (your ngrok URL + `/mcp`)
-   **Authentication:** None
-   **Trust this provider:** ✅ Check this box

![]()

1.  Click **Create**

ChatGPT now knows about your editor and can call its tools.

## Testing It Out

Start a new chat and try these commands:

-   “Open Cowrite”
-   “Write a bullet list with three meeting action items.”
-   “Summarize the document.” etc…

ChatGPT calls the tools accordingly and does the action.

## What You’ve Built

You now have a collaborative editor that ChatGPT can read and write to. Users can work together in real-time, and ChatGPT acts as another collaborator, summarizing content, drafting sections, or formatting notes on command.

The key pieces:

-   **TipTap + Velt** handle editing and real-time sync
-   **MCP server** bridges ChatGPT and your editor
-   **Three tools** let ChatGPT open, read, and write content
-   **Auto-formatting** converts ChatGPT’s text into clean HTML

## Try It Yourself

The full code is on **GitHub**. Clone it, run the server, and connect it to ChatGPT. To take it further:

**Add more tools** for advanced commands like “convert this to a table” or “extract action items from meeting notes.” Define tools that match your workflow, and ChatGPT will figure out when to use them.

## Resources

-   [**TipTap documentation**](https://tiptap.dev/docs) — Editor features and extensions
-   [**Velt collaboration SDK**](https://docs.velt.dev/) — Real-time sync and comments
-   [**Velt-TipTap Setup**](https://docs.velt.dev/realtime-collaboration/crdt/setup/tiptap) — Realtime editor sync
-   [**Model Context Protocol spec**](https://modelcontextprotocol.io/) — Build your own tools
-   [**OpenAI Apps SDK**](https://developers.openai.com/apps-sdk/quickstart) — Widget integration guide
-   [**Common Issues**](https://github.com/Studio1HQ/co-write/tree/main?tab=readme-ov-file#common-issues) — Check the Readme for some issues

Adapt it to your workflow, and ship your own ChatGPT integration.

Thankyou for reading! If you found this article useful, share it with your peers and community.

**If You ❤️ My Content! Connect Me on** [**Twitter**](https://mobile.twitter.com/Astrodevil_)

> ***Check SaaS Tools I Use*** *👉🏼*[*Access here!*](https://bento.me/codesastro)
> 
> ***I am open to collaborating on Blog Articles and Guest Posts🫱🏼‍🫲🏼*** *📅*[*Contact*](https://mobile.twitter.com/Astrodevil_) *Here*