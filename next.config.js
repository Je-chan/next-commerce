/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['picsum.photos', 'raw.githubusercontent.com'],
  },
}

module.exports = nextConfig
