import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// More generous rate limiting - use most of XAI's 480 RPM
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// 7 requests per second (420 RPM) - generous but safe
export const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(7, '1 s'), // 7 requests per second
  analytics: true,
  prefix: 'ai-assessment',
})

// Even more generous for assessment completion
export const assessmentRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(15, '1 m'), // 15 requests per minute per user
  analytics: true,
  prefix: 'assessment-user',
})

// Global rate limiter for XAI API protection
export const xaiRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(400, '1 m'), // 400 requests per minute (safety buffer)
  analytics: true,
  prefix: 'xai-api',
})
