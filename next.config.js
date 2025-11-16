/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ["res.cloudinary.com"],
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;
