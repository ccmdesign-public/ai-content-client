import fs from 'fs/promises';
import path from 'path';
import YAML from 'yaml';
import type { MarkdownInput } from '~/types/summary';
import type { VideoMetadata } from '~/types/youtube';
import type { TranscriptData } from '~/types/transcript';
import { logger } from '~/server/utils/logger';

export interface MetadataExtra {
  playlistId?: string;
  playlistName?: string;
  category?: string;
  processedAt?: string;
  lengthCategory?: string;
  modelUsed?: string;
  aiProvider?: string;
  apiCalls?: number;
  fallbackAttempts?: number;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  processingTimeMs?: number;
}

export class ContentWriterService {
  constructor(private outputDir: string = 'src/content/summaries') {}

  /**
   * Write a markdown file with frontmatter to folder structure
   * Creates: {outputDir}/{videoId}/summary.md
   */
  async writeMarkdown(input: MarkdownInput): Promise<string> {
    const { videoId } = input;

    // Create video folder
    const videoDir = path.join(process.cwd(), this.outputDir, videoId);
    await fs.mkdir(videoDir, { recursive: true });

    const content = this.generateMarkdown(input);
    const filePath = path.join(videoDir, 'summary.md');

    await fs.writeFile(filePath, content, 'utf-8');

    logger.info(`Written summary for ${videoId}`, {
      filePath,
      size: content.length
    });

    return filePath;
  }

  /**
   * Write transcript data to JSON file
   * Creates: {outputDir}/{videoId}/transcript.json
   */
  async writeTranscript(videoId: string, transcript: TranscriptData): Promise<string> {
    const videoDir = path.join(process.cwd(), this.outputDir, videoId);
    await fs.mkdir(videoDir, { recursive: true });

    const transcriptPath = path.join(videoDir, 'transcript.json');
    await fs.writeFile(
      transcriptPath,
      JSON.stringify(transcript, null, 2),
      'utf-8'
    );

    logger.info(`Written transcript for ${videoId}`, {
      filePath: transcriptPath,
      segments: transcript.segments.length
    });

    return transcriptPath;
  }

  /**
   * Write metadata to YAML file
   * Creates: {outputDir}/{videoId}/metadata.yml
   */
  async writeMetadata(videoId: string, metadata: VideoMetadata, extra?: MetadataExtra): Promise<string> {
    const videoDir = path.join(process.cwd(), this.outputDir, videoId);
    await fs.mkdir(videoDir, { recursive: true });

    const metadataContent = {
      videoId: metadata.videoId,
      title: metadata.title,
      description: metadata.description,
      channel: metadata.channel,
      channelId: metadata.channelId,
      duration: metadata.duration,
      publishedAt: metadata.publishedAt,
      thumbnailUrl: metadata.thumbnailUrl,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      ...extra
    };

    const metadataPath = path.join(videoDir, 'metadata.yml');
    await fs.writeFile(
      metadataPath,
      YAML.stringify(metadataContent),
      'utf-8'
    );

    logger.info(`Written metadata for ${videoId}`, { filePath: metadataPath });

    return metadataPath;
  }

  /**
   * Check if a summary file already exists
   * Checks both new folder format and legacy flat file format
   */
  async exists(videoId: string): Promise<boolean> {
    // Check new folder format first
    const newPath = path.join(process.cwd(), this.outputDir, videoId, 'summary.md');
    try {
      await fs.access(newPath);
      return true;
    } catch {
      // Not found in new format, check legacy format
    }

    // Check legacy flat file format
    const oldPath = path.join(process.cwd(), this.outputDir, `${videoId}.md`);
    try {
      await fs.access(oldPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generate markdown content with frontmatter
   * Uses nested structure: metadata (from YouTube), ai (processing metrics)
   */
  private generateMarkdown(input: MarkdownInput): string {
    const { videoId, metadata, summary, playlist } = input;
    const { metrics } = summary;

    // Build the frontmatter object for clean YAML generation
    const frontmatter: Record<string, unknown> = {
      // Video metadata from YouTube API (nested under 'metadata')
      metadata: {
        videoId: metadata.videoId,
        title: metadata.title,
        ...(metadata.description && { description: metadata.description }),
        channel: metadata.channel,
        channelId: metadata.channelId,
        duration: metadata.duration,
        publishedAt: metadata.publishedAt,
        thumbnailUrl: metadata.thumbnailUrl,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`
      },
      // Processing info
      processedAt: new Date().toISOString(),
      source: 'youtube',
      // Playlist/category info (only include if defined)
      ...(playlist?.playlistId && { playlistId: playlist.playlistId }),
      ...(playlist?.playlistName && { playlistName: playlist.playlistName }),
      ...(playlist?.category && { category: playlist.category }),
      // AI-generated TLDR
      tldr: summary.tldr,
      // Extracted tools/resources
      tools: summary.tools || [],
      // AI processing metrics (nested under 'ai')
      ai: {
        provider: metrics.provider,
        model: summary.modelUsed,
        apiCalls: metrics.apiCalls,
        fallbackAttempts: metrics.fallbackAttempts,
        ...(metrics.inputTokens !== undefined && { inputTokens: metrics.inputTokens }),
        ...(metrics.outputTokens !== undefined && { outputTokens: metrics.outputTokens }),
        ...(metrics.totalTokens !== undefined && { totalTokens: metrics.totalTokens }),
        processingTimeMs: metrics.processingTimeMs
      }
    };

    // Use default playlistId from env if not provided
    if (!frontmatter.playlistId && process.env.YOUTUBE_PLAYLIST_ID) {
      frontmatter.playlistId = process.env.YOUTUBE_PLAYLIST_ID;
    }

    // Assemble markdown body from structured sections
    const body = this.assembleMarkdownBody(summary);

    // Generate YAML with proper formatting
    const yamlContent = YAML.stringify(frontmatter, {
      lineWidth: 0, // Don't wrap lines
      defaultStringType: 'QUOTE_DOUBLE',
      defaultKeyType: 'PLAIN'
    });

    return `---\n${yamlContent}---\n\n${body}`;
  }

  /**
   * Assemble markdown body from structured sections.
   * We control the headers, AI provides the content.
   */
  private assembleMarkdownBody(summary: MarkdownInput['summary']): string {
    const sections: string[] = [];

    // Key Takeaways section
    if (summary.keyTakeaways?.trim()) {
      sections.push(`## Key Takeaways\n\n${this.normalizeSectionContent(summary.keyTakeaways)}`);
    }

    // Summary section
    if (summary.summary?.trim()) {
      sections.push(`## Summary\n\n${this.normalizeSectionContent(summary.summary)}`);
    }

    // Context section
    if (summary.context?.trim()) {
      sections.push(`## Context\n\n${this.normalizeSectionContent(summary.context)}`);
    }

    return sections.join('\n\n');
  }

  /**
   * Normalize section content for markdown structure.
   * Focuses on structural formatting only - word-level fixes are handled upstream
   * by text-normalizer.ts in the AI services.
   */
  private normalizeSectionContent(content: string): string {
    let normalized = content.trim();

    // Ensure bullet points are on separate lines
    // Match: end of sentence/item + space + bullet marker
    normalized = normalized
      .replace(/([.!?:])(\s+)([-*])\s/g, '$1\n\n$3 ')  // After punctuation
      .replace(/([a-z])(\s+)([-*])\s/g, '$1\n\n$3 ');   // After lowercase (list continuation)

    // Ensure ### headers have blank lines before and after
    normalized = normalized.replace(/([^\n])(###\s)/g, '$1\n\n$2');

    // Fix ### headers where heading text runs directly into paragraph text
    // AI sometimes generates: "### HeadingParagraph text..." without a line break
    // Detects [a-z][A-Z] transition and splits when rest looks like paragraph text
    normalized = normalized.replace(
      /^(### .+?[a-z])([A-Z].+)$/gm,
      (match, heading, rest) => {
        // Split if rest contains sentence punctuation (strong signal of paragraph text)
        // or if rest is long enough to clearly be paragraph content
        if (/[.!?:]/.test(rest) || rest.length > 30) {
          return `${heading}\n\n${rest}`;
        }
        return match;
      }
    );

    // Collapse multiple blank lines (3+ -> 2)
    normalized = normalized.replace(/\n{3,}/g, '\n\n');

    return normalized;
  }

}

/**
 * Create content writer service instance
 */
export function createContentWriterService(outputDir?: string): ContentWriterService {
  return new ContentWriterService(outputDir);
}
