/**
 * Token bucket rate limiter
 * Ensures we don't exceed API rate limits
 */
export class RateLimiter {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private maxTokens: number,
    private refillRate: number, // tokens per second
    private refillInterval: number = 1000 // milliseconds
  ) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  /**
   * Wait until a token is available, then consume it
   */
  async acquire(): Promise<void> {
    this.refill();

    while (this.tokens < 1) {
      const waitTime = this.refillInterval;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.refill();
    }

    this.tokens -= 1;
  }

  /**
   * Refill tokens based on time elapsed
   */
  private refill(): void {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const tokensToAdd = (elapsed / 1000) * this.refillRate;

    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
}

// Conservative rate limiter for Gemini API free tier
// Free tier limits: 5-15 RPM depending on model, 20-1500 RPD
// We use 2 RPM (1 every 30 seconds) to avoid quota exhaustion
export const geminiFlashLimiter = new RateLimiter(2, 0.033); // 2 tokens max, ~2/minute (1 every 30s)

// Gemini Pro rate limiter: even more conservative (5 RPM free tier)
export const geminiProLimiter = new RateLimiter(1, 0.017); // 1 token max, ~1/minute

// YouTube API rate limiter (conservative: 10 requests per second)
export const youtubeApiLimiter = new RateLimiter(100, 10);

// Groq Whisper rate limiter: 10 RPM to stay well under 20 RPM free-tier limit
export const groqWhisperLimiter = new RateLimiter(2, 0.167);
