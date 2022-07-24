/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['s3-favorit-dev.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
