/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    XAI_API_KEY: process.env.XAI_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
}

module.exports = nextConfig
