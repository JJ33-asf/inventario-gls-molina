/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-supabase-storage-url.supabase.co']
  },
}

module.exports = nextConfig
