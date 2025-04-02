/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co', 'i.imgur.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Enable compression
  compress: true,
}

module.exports = nextConfig 