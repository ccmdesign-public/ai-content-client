---
title: "Building a React App From Scratch (No CLI Required)"
author: "CodeX"
platform: "medium"
publicationName: "CodeX"
url: "https://medium.com/codex/building-a-react-app-from-scratch-no-cli-required-0f5814502b1f?source=rss----29038077e4c6---4"
publishedAt: "2026-01-29"
tags:
  - "reactjs"
  - "software"
  - "tutorials"
---

# Building a React App From Scratch (No CLI Required)

# Building a React App From Scratch (No CLI Required)

[Vardaan Bhatia](/@vardaanbhatia?source=post_page---byline--0f5814502b1f---------------------------------------)

4 min read·18 hours ago

\--

Listen

Share

Learn how to create a React application without using Create React App or any CLI tools. This guide will help you understand what’s happening under the hood.

![Photo by Kevin Ku on Unsplash]()

## Why Build Without CLI?

While tools like Create React App are convenient, building from scratch helps you:

-   Understand the fundamental dependencies React needs
-   Learn how bundlers like Webpack work
-   Customize your build process completely
-   Reduce unnecessary bloat in your project

## Prerequisites

-   Node.js and npm installed on your machine
-   Basic understanding of JavaScript and React concepts
-   A code editor (VS Code recommended)

## Step 1: Initialize Your Project

Create a new directory and initialize npm:

bash

```
mkdir my-react-appcd my-react-appnpm init -y
```

This creates a `package.json` file that will track your dependencies.

## Step 2: Install Core Dependencies

Install React and ReactDOM:

bash

```
npm install react react-dom
```

These are the only runtime dependencies you need for a React application.

## Step 3: Install Development Dependencies

Install Webpack, Babel, and related tools:

bash

```
npm install --save-dev webpack webpack-cli webpack-dev-servernpm install --save-dev @babel/core @babel/preset-env @babel/preset-reactnpm install --save-dev babel-loader css-loader style-loadernpm install --save-dev html-webpack-plugin
```

**What each tool does:**

-   **Webpack**: Bundles your JavaScript files and assets
-   **Babel**: Transpiles modern JavaScript and JSX to browser-compatible code
-   **Loaders**: Process different file types (JS, CSS, etc.)
-   **html-webpack-plugin**: Generates HTML file with bundled scripts

## Step 4: Create Project Structure

Set up your folder structure:

```
my-react-app/├── src/│   ├── index.js│   ├── App.js│   └── index.css├── public/│   └── index.html├── package.json├── webpack.config.js└── .babelrc
```

## Step 5: Configure Babel

Create `.babelrc` in your root directory:

json

```
{  "presets": [    "@babel/preset-env",    "@babel/preset-react"  ]}
```

This tells Babel to transform JSX and modern JavaScript syntax.

## Step 6: Configure Webpack

Create `webpack.config.js` in your root directory:

javascript

```
const path = require('path');const HtmlWebpackPlugin = require('html-webpack-plugin');
```

```
module.exports = {  entry: './src/index.js',  output: {    path: path.resolve(__dirname, 'dist'),    filename: 'bundle.js',  },  module: {    rules: [      {        test: /\.(js|jsx)$/,        exclude: /node_modules/,        use: {          loader: 'babel-loader',        },      },      {        test: /\.css$/,        use: ['style-loader', 'css-loader'],      },    ],  },  plugins: [    new HtmlWebpackPlugin({      template: './public/index.html',    }),  ],  devServer: {    static: {      directory: path.join(__dirname, 'public'),    },    port: 3000,    hot: true,  },  resolve: {    extensions: ['.js', '.jsx'],  },};
```

## Step 7: Create HTML Template

Create `public/index.html`:

html

```
<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>React App From Scratch</title></head><body>  <div id="root"></div></body></html>
```

## Step 8: Create React Components

Create `src/index.js`:

javascript

```
import React from 'react';import ReactDOM from 'react-dom/client';import App from './App';import './index.css';
```

```
const root = ReactDOM.createRoot(document.getElementById('root'));root.render(  <React.StrictMode>    <App />  </React.StrictMode>);
```

Create `src/App.js`:

javascript

```
import React from 'react';
```

```
function App() {  return (    <div className="App">      <h1>Welcome to React!</h1>      <p>Built from scratch without CLI tools.</p>    </div>  );}export default App;
```

Create `src/index.css`:

css

```
* {  margin: 0;  padding: 0;  box-sizing: border-box;}
```

```
body {  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;  background-color: #f5f5f5;}.App {  max-width: 800px;  margin: 50px auto;  padding: 20px;  background: white;  border-radius: 8px;  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);}h1 {  color: #333;  margin-bottom: 10px;}p {  color: #666;  line-height: 1.6;}
```

## Step 9: Add NPM Scripts

Update your `package.json` scripts section:

json

```
"scripts": {  "start": "webpack serve --mode development --open",  "build": "webpack --mode production"}
```

## Step 10: Run Your App

Start the development server:

bash

```
npm start
```

Your app should open automatically at `http://localhost:3000`.

Build for production:

bash

```
npm build
```

This creates optimized files in the `dist` folder.

## Optional Enhancements

## Add Hot Module Replacement

Already configured in `webpack.config.js` with `hot: true`.

## Add ESLint

bash

```
npm install --save-dev eslint eslint-plugin-react
```

## Add Environment Variables

Install `dotenv-webpack`:

bash

```
npm install --save-dev dotenv-webpack
```

Add to webpack config:

javascript

```
const Dotenv = require('dotenv-webpack');
```

```
plugins: [  new Dotenv(),  // other plugins...]
```

## Common Issues & Solutions

**Issue: “Module not found” errors**

-   Check that all file paths are correct
-   Ensure file extensions match your webpack config

**Issue: JSX not transpiling**

-   Verify `.babelrc` configuration
-   Check that `babel-loader` is properly configured in webpack

**Issue: Styles not loading**

-   Ensure `style-loader` and `css-loader` are in the correct order
-   Import CSS files in your JavaScript

## Understanding What You Built

You’ve now created a React app with:

1.  **Module bundling** via Webpack
2.  **Code transpilation** via Babel
3.  **Development server** with hot reloading
4.  **Production builds** with optimization
5.  **Custom configuration** for complete control

## Next Steps

-   Add TypeScript support
-   Configure CSS preprocessors (SASS/LESS)
-   Set up testing with Jest
-   Add code splitting for better performance
-   Implement PWA features

## Conclusion

Building a React app from scratch gives you deep insights into modern JavaScript tooling. While CLI tools are great for quick starts, understanding the underlying configuration helps you debug issues and customize your setup for specific needs.

Happy coding!