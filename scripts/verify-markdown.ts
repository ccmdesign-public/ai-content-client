#!/usr/bin/env tsx
/**
 * Verify markdown heading formatting in summary files.
 *
 * Scans all summary.md files and reports heading issues:
 *   - Concatenated: ### HeadingContent (no separator at all)
 *   - Single newline: ### Heading\nContent (missing blank line)
 *   - Correct: ### Heading\n\nContent
 *
 * Usage:
 *   npm run verify:markdown            # report only
 *   npm run verify:markdown -- --fix   # fix issues in place
 */

import fs from 'fs/promises';
import path from 'path';

const SUMMARIES_DIR = 'src/content/summaries';

interface Issue {
  file: string;
  line: number;
  type: 'concatenated' | 'single-newline-after' | 'missing-newline-before';
  text: string;
}

interface Result {
  totalFiles: number;
  filesWithHeadings: number;
  totalHeadings: number;
  correctHeadings: number;
  issues: Issue[];
}

function findIssues(content: string, file: string): Issue[] {
  const lines = content.split('\n');
  const issues: Issue[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Concatenated heading: ### TitleSomeContent on same line
    // Match ### followed by text that contains a lowercase→uppercase transition after a word
    // Exclude known CamelCase brand names and short headings
    const withoutBrands = line.replace(/(?:OpenAI|ChatGPT|YouTube|GitHub|JavaScript|TypeScript|LinkedIn|WordPress|SaaS|BigQuery|DevOps|MacBook|iPhone|iPad|AutoML|GraphQL|DevRel|FastAPI|LangChain|LangGraph|CrewAI|DeepSeek|LaTeX|InDesign|PowerPoint|NoveltyGoogle)/g, 'XX');
    if (/^###\s+\S.*[a-z][A-Z]/.test(withoutBrands) && line.length > 80) {
      issues.push({
        file,
        line: lineNum,
        type: 'concatenated',
        text: line.length > 100 ? line.slice(0, 100) + '...' : line,
      });
      continue;
    }

    // Check lines that are headings
    if (/^#{1,6}\s/.test(line)) {
      // Missing blank line before heading (previous line is non-empty, non-heading, not frontmatter)
      if (i > 0 && lines[i - 1].trim() !== '' && !/^#{1,6}\s/.test(lines[i - 1]) && lines[i - 1] !== '---') {
        issues.push({
          file,
          line: lineNum,
          type: 'missing-newline-before',
          text: line.length > 100 ? line.slice(0, 100) + '...' : line,
        });
      }

      // Missing blank line after heading (next line is non-empty)
      if (i < lines.length - 1 && lines[i + 1].trim() !== '') {
        issues.push({
          file,
          line: lineNum,
          type: 'single-newline-after',
          text: line.length > 100 ? line.slice(0, 100) + '...' : line,
        });
      }
    }
  }

  return issues;
}

function fixContent(content: string): string {
  let result = content;

  // Fix concatenated headings: ### Some HeadingThe body text...
  // Finds heading lines with camelCase boundaries and splits at the right one
  const headingLineRe = /^(#{1,6}\s+.+)$/gm;
  result = result.replace(headingLineRe, (line) => {
    if (line.length <= 80) return line;

    // Find all camelCase split points (lowercase followed by uppercase)
    const prefix = line.match(/^#{1,6}\s+/)?.[0] || '';
    const text = line.slice(prefix.length);

    // Find candidate split points: positions where lowercase meets uppercase
    for (let i = 1; i < text.length - 1; i++) {
      const prev = text[i - 1];
      const curr = text[i];
      if (/[a-z]/.test(prev) && /[A-Z]/.test(curr)) {
        const heading = text.slice(0, i);
        const body = text.slice(i);
        // Valid split: heading text is reasonable, body is substantial
        const headingWords = heading.trim();
        const isMultiWord = /\s/.test(headingWords);
        const isSingleLongWord = !isMultiWord && headingWords.length >= 4;
        if ((isMultiWord || isSingleLongWord) && body.length > 20) {
          return `${prefix}${heading}\n\n${body}`;
        }
      }
    }
    return line;
  });

  // Ensure blank line before headings
  result = result.replace(/([^\n])\n(#{1,6}\s)/g, '$1\n\n$2');

  // Ensure blank line after headings
  result = result.replace(/^(#{1,6}\s.+)\n(?!\n)/gm, '$1\n\n');

  // Collapse excessive blank lines
  result = result.replace(/\n{3,}/g, '\n\n');

  return result;
}

async function run(): Promise<void> {
  const fix = process.argv.includes('--fix');
  const verbose = process.argv.includes('--verbose');

  const summariesPath = path.resolve(SUMMARIES_DIR);
  const folders = await fs.readdir(summariesPath);

  const result: Result = {
    totalFiles: 0,
    filesWithHeadings: 0,
    totalHeadings: 0,
    correctHeadings: 0,
    issues: [],
  };

  let fixedCount = 0;

  for (const folder of folders) {
    const summaryPath = path.join(summariesPath, folder, 'summary.md');
    try {
      const content = await fs.readFile(summaryPath, 'utf-8');
      result.totalFiles++;

      const headingCount = (content.match(/^#{1,6}\s/gm) || []).length;
      if (headingCount === 0) continue;

      result.filesWithHeadings++;
      result.totalHeadings += headingCount;

      const issues = findIssues(content, path.join(folder, 'summary.md'));
      result.issues.push(...issues);

      if (fix && issues.length > 0) {
        const fixed = fixContent(content);
        await fs.writeFile(summaryPath, fixed, 'utf-8');
        fixedCount++;
      }
    } catch {
      // No summary.md in this folder
    }
  }

  result.correctHeadings = result.totalHeadings - result.issues.length;

  // Group issues by type
  const concatenated = result.issues.filter(i => i.type === 'concatenated');
  const singleNewline = result.issues.filter(i => i.type === 'single-newline-after');
  const missingBefore = result.issues.filter(i => i.type === 'missing-newline-before');

  console.log('\n=== Markdown Heading Verification ===\n');
  console.log(`Files scanned:       ${result.totalFiles}`);
  console.log(`Files with headings: ${result.filesWithHeadings}`);
  console.log(`Total headings:      ${result.totalHeadings}`);
  console.log(`Correct:             ${result.correctHeadings}`);
  console.log(`Issues found:        ${result.issues.length}`);
  console.log('');
  console.log(`  Concatenated (### HeadingBody):  ${concatenated.length}`);
  console.log(`  Missing blank line after:        ${singleNewline.length}`);
  console.log(`  Missing blank line before:       ${missingBefore.length}`);

  if (verbose && result.issues.length > 0) {
    console.log('\n--- Issues ---\n');
    for (const issue of result.issues) {
      const tag = issue.type === 'concatenated' ? 'CONCAT'
        : issue.type === 'single-newline-after' ? 'NO-BLANK-AFTER'
        : 'NO-BLANK-BEFORE';
      console.log(`[${tag}] ${issue.file}:${issue.line}`);
      console.log(`  ${issue.text}`);
      console.log('');
    }
  }

  if (fix) {
    console.log(`\nFixed ${fixedCount} files.`);
  } else if (result.issues.length > 0) {
    console.log('\nRun with --fix to auto-repair these issues.');
    console.log('Run with --verbose to see all issues.');
  }

  // Exit with error code if issues found (useful for CI)
  if (!fix && result.issues.length > 0) {
    process.exit(1);
  }
}

run().catch(console.error);
