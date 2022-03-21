/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  }
}

module.exports = nextConfig
