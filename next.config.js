/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CHAT_ID: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
    BOT_TOKEN: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN,
  }
}

module.exports = nextConfig
