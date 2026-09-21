/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  }
};

module.exports = nextConfig;
