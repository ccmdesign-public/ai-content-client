export interface TranscriptSegment {
  start: number;      // Start time in seconds
  duration: number;   // Duration in seconds
  text: string;       // Segment text
}

export interface TranscriptData {
  videoId: string;
  language: string;
  source: 'caption-extractor' | 'yt-dlp' | 'groq-whisper';
  segments: TranscriptSegment[];
  fullText: string;   // Concatenated text for AI processing
  fetchedAt: string;  // ISO timestamp
}
