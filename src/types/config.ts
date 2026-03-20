export interface AppConfig {
  youtubeApiKey: string;
  youtubePlaylistId: string;
  geminiApiKey: string;
  geminiModel: string;
  openRouterApiKey?: string;
  groqApiKey?: string;
  processingMode: 'transcript' | 'native-video';
  maxVideosPerRun: number;
  enableProFallback: boolean;
  enableModelFallback: boolean;
  outputDir: string;
}

export interface SyncResult {
  processed: number;
  skipped: number;
  failed: number;
  errors: Array<{ videoId: string; error: string }>;
}
