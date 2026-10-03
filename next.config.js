/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {

    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,

  },
}

module.exports = nextConfig
