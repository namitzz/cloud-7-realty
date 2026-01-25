/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Image configuration
   * - Works with Google Drive / Googleusercontent
   * - Safe for Vercel
   * - Avoids local + build-time image issues
   */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "drive.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  /**
   * Sensible defaults
   */
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;
